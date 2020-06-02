const CP = require('child_process')
const FS = require('fs')

console.log(process.cwd())

console.log(process.argv)
const TAG = process.argv[2]

let version, date, maint, env
if (TAG) {
    const capture = TAG.match(/v?(.+?)-(.+?)(?:-(.+))?$/)

    console.log(capture)

    version = capture[1]
    date = capture[2]
    maint = capture[3]

    env = {
        RUNDECK_VERSION: version,
        RUNDECK_VERSION_FULL: `${version}-${date}`
    }

    console.log(version, date, maint)
}

const branch = CP.execSync('git rev-parse --abbrev-ref HEAD').toString().trim()

const base = version || branch

env = {
    ...env,
    DOC_BASE: base
}

build(env)
syncS3(base)

if (version && !maint) {
    console.log('Releasing to /docs')
    const releaseEnv = {
        ...env,
        DOC_BASE: `docs`
    }
    build(releaseEnv)
    syncS3('docs')
}

function build(env) {
    console.log('Building with env:', env)
    CP.execSync('npm run docs:build', {stdio: "inherit", env: {...process.env, ...env}})
}

function syncS3(base) {
    if (!base) {
        console.error("Unable to sync docs to empty s3 base!")
        process.exit(1)
    }

    console.log('Syncing to s3 base:', base)
    CP.execSync(`aws s3 sync --acl public-read docs/.vuepress/dist/ s3://docs.rundeck.com/${base}/`, {stdio: "inherit"})
}