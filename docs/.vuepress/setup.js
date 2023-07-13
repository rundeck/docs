const RUNDECK_VERSION='4.15.0'
const RUNDECK_VERSION_FULL='4.15.0-SNAPSHOT'
const API_VERSION='44'
const API_DEP_REL='5.0.0'
const API_DEP_VER='14'
const API_MIN_VER='11'
const CLI_VERSION='2.0.1'

const REPO_BRANCH='4.0.x'

const setup = {
    base: process.env.DOC_BASE,
    branch: process.env.DOC_BRANCH || REPO_BRANCH,
    apiVersion: API_VERSION,
    apiDepVersion: API_DEP_VER,
    apiDepRelease: API_DEP_REL,
    apiMinVersion: API_MIN_VER,
    rundeckVersion: process.env.RUNDECK_VERSION || RUNDECK_VERSION,
    rundeckVersionFull: process.env.RUNDECK_VERSION_FULL || RUNDECK_VERSION_FULL,
    rundeckCLIVersion: process.env.CLI_VERSION || CLI_VERSION
}

module.exports = setup
