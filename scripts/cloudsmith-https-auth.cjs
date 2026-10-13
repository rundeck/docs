/**
 * Preload for `vp-update`.
 *
 * vp-update looks up dist-tags with a raw https.get() and never sends the
 * Cloudsmith auth header from .npmrc. It also leaves a newline in the
 * registry URL, which Cloudsmith rejects. Patch both so version lookups
 * stay on npm.artifacts.pd-internal.com.
 */
const https = require('node:https')

const REGISTRY_HOST = 'npm.artifacts.pd-internal.com'
const token = process.env.CLOUDSMITH_NPM_TOKEN

if (!token) {
  throw new Error(
    'CLOUDSMITH_NPM_TOKEN is not set. Export your Cloudsmith token, then run npm run docs:update-package again.'
  )
}

const originalGet = https.get

// `npm config get registry` includes a trailing newline. vp-update appends `/`
// after that newline, so the dist-tags URL is rejected by Cloudsmith.
function normalizeRegistryUrl(url) {
  const parsed = new URL(url.replace(/\s+/g, ''))
  parsed.pathname = parsed.pathname.replace(/\/{2,}/g, '/')
  return parsed.toString()
}

https.get = function cloudsmithGet(url, options, callback) {
  if (typeof url !== 'string' || !url.includes(REGISTRY_HOST)) {
    return originalGet.apply(https, arguments)
  }

  url = normalizeRegistryUrl(url)

  if (typeof options === 'function') {
    callback = options
    options = {}
  } else {
    options = { ...options }
  }

  const headers = { ...options.headers }
  if (!headers.Authorization && !headers.authorization) {
    headers.Authorization = `Bearer ${token}`
  }
  options.headers = headers

  return originalGet.call(https, url, options, callback)
}
