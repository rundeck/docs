const RUNDECK_VERSION='3.1.1'
const RUNDECK_VERSION_FULL='3.1.1-20190919'
const API_VERSION='33'

const REPO_BRANCH='3.1.x'

const setup = {
    base: process.env.DOC_BASE,
    branch: process.env.DOC_BRANCH || REPO_BRANCH,
    apiVersion: API_VERSION,
    rundeckVersion: process.env.RUNDECK_VERSION || RUNDECK_VERSION,
    rundeckVersionFull: process.env.RUNDECK_VERSION_FULL || RUNDECK_VERSION_FULL
}

module.exports = setup