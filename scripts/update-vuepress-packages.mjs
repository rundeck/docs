import { spawnSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const semver = require('semver')

const CLOUDSMITH_HOST = 'npm.artifacts.pd-internal.com'
const preload = './scripts/cloudsmith-https-auth.cjs'
const packageJsonPath = new URL('../package.json', import.meta.url)

const versionCache = new Map()

function npm(args, options = {}) {
  return spawnSync('npm', args, { encoding: 'utf8', ...options })
}

function versionsOf(name) {
  if (versionCache.has(name)) return versionCache.get(name)
  const result = npm(['view', name, 'versions', '--json'])
  if (result.status !== 0) {
    versionCache.set(name, [])
    return []
  }
  const parsed = JSON.parse(result.stdout)
  const versions = (Array.isArray(parsed) ? parsed : [parsed]).filter((version) => semver.valid(version))
  versionCache.set(name, versions)
  return versions
}

function parseSpec(spec) {
  const match = /^([~^]?)(\d+\.\d+\.\d+\S*)$/.exec(spec)
  if (!match || !semver.valid(match[2])) return null
  return { prefix: match[1], version: match[2] }
}

function isVuepressPackage(name) {
  return name === 'vue' || name === 'vuepress' || name.includes('vuepress')
}

async function unavailableReason(name, version) {
  const token = process.env.CLOUDSMITH_NPM_TOKEN
  const response = await fetch(`https://${CLOUDSMITH_HOST}/npm/${name}/${version}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
  const body = await response.text()
  if (response.status === 403 && body.includes('Cooldown')) return 'Cloudsmith cooldown is hiding it'
  return 'Cloudsmith is not serving it'
}

async function capToCloudsmith(name, spec) {
  const parsed = parseSpec(spec)
  if (!parsed) return spec
  const versions = versionsOf(name)
  if (versions.length === 0 || versions.includes(parsed.version)) return spec

  const available = versions.filter((version) => semver.lte(version, parsed.version)).sort(semver.rcompare)[0]
  if (!available) return spec

  const reason = await unavailableReason(name, parsed.version)
  console.log(`${name}@${parsed.version}: ${reason}. Using ${available}.`)
  return parsed.prefix + available
}

function vuepressPeer(name, version) {
  const result = npm(['view', `${name}@${version}`, 'peerDependencies.vuepress', '--json'])
  if (result.status !== 0) return null
  const text = result.stdout.trim()
  if (!text) return null
  return JSON.parse(text)
}

function alignToVuepress(name, spec, vuepressVersion) {
  const parsed = parseSpec(spec)
  if (!parsed || name === 'vuepress') return spec

  const currentPeer = vuepressPeer(name, parsed.version)
  if (!currentPeer || currentPeer === vuepressVersion || !semver.valid(currentPeer)) return spec

  const candidates = versionsOf(name)
    .filter((version) => semver.gte(version, parsed.version))
    .sort(semver.rcompare)

  for (const candidate of candidates.slice(0, 20)) {
    if (vuepressPeer(name, candidate) === vuepressVersion) {
      if (candidate !== parsed.version) {
        console.log(
          `${name}@${parsed.version} requires vuepress@${currentPeer}. Using ${candidate}, which requires vuepress@${vuepressVersion}.`
        )
      }
      return parsed.prefix + candidate
    }
  }

  console.warn(
    `${name}@${parsed.version} requires vuepress@${currentPeer}, and Cloudsmith has no newer release that requires vuepress@${vuepressVersion}.`
  )
  return spec
}

async function reconcilePackageJson() {
  const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf8'))
  let changed = false

  for (const field of ['dependencies', 'devDependencies']) {
    const deps = pkg[field]
    if (!deps) continue
    for (const name of Object.keys(deps)) {
      if (!isVuepressPackage(name)) continue
      const next = await capToCloudsmith(name, deps[name])
      if (next !== deps[name]) {
        deps[name] = next
        changed = true
      }
    }
  }

  const vuepressVersion = parseSpec(pkg.devDependencies?.vuepress || pkg.dependencies?.vuepress || '')?.version
  if (vuepressVersion) {
    for (const field of ['dependencies', 'devDependencies']) {
      const deps = pkg[field]
      if (!deps) continue
      for (const name of Object.keys(deps)) {
        if (!name.includes('vuepress')) continue
        const next = alignToVuepress(name, deps[name], vuepressVersion)
        if (next !== deps[name]) {
          deps[name] = next
          changed = true
        }
      }
    }
  }

  if (changed) writeFileSync(packageJsonPath, `${JSON.stringify(pkg, null, 2)}\n`)
  return changed
}

const registry = npm(['config', 'get', 'registry'])
if (registry.status !== 0) {
  console.error(registry.stderr || 'Failed to read the npm registry from npm config.')
  process.exit(registry.status || 1)
}

const registryUrl = registry.stdout.trim()
const usesCloudsmith = registryUrl.includes(CLOUDSMITH_HOST)
const env = { ...process.env }

if (usesCloudsmith) {
  if (!env.CLOUDSMITH_NPM_TOKEN) {
    console.error(
      'CLOUDSMITH_NPM_TOKEN is not set. Export your Cloudsmith token, then run npm run docs:update-package again.'
    )
    process.exit(1)
  }
  const requireArg = `--require ${preload}`
  env.NODE_OPTIONS = env.NODE_OPTIONS ? `${env.NODE_OPTIONS} ${requireArg}` : requireArg
}

const update = spawnSync('npx', ['--yes', 'vp-update', ...process.argv.slice(2)], {
  stdio: 'inherit',
  env,
})

if (!usesCloudsmith) process.exit(update.status ?? 1)

const changed = await reconcilePackageJson()
if (update.status === 0 && !changed) process.exit(0)

console.log('Installing the versions Cloudsmith will serve...')
const install = npm(['install'], { stdio: 'inherit' })
process.exit(install.status ?? 1)
