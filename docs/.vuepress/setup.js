import { BaseTransition } from "vue"

const RUNDECK_VERSION='5.6.1'
const RUNDECK_VERSION_FULL='5.6.1-SNAPSHOT'
const API_VERSION='48'
const API_DEP_REL='6.0.0'
const API_DEP_VER='17'
const API_MIN_VER='14'
const CLI_VERSION='2.0.8'
const GPG_KEY_DATE='20240108'

const REPO_BRANCH='4.0.x'
const rundeckVersionFull = process.env.RUNDECK_VERSION_FULL || RUNDECK_VERSION_FULL
const BASE_JDOC_URL="https://static.javadoc.io/org.rundeck"
const setup = {
    base: process.env.DOC_BASE || '',
    branch: process.env.DOC_BRANCH || REPO_BRANCH,
    apiVersion: API_VERSION,
    apiDepVersion: API_DEP_VER,
    apiDepRelease: API_DEP_REL,
    apiMinVersion: API_MIN_VER,
    rundeckVersion: process.env.RUNDECK_VERSION || RUNDECK_VERSION,
    rundeckVersionFull,
    cliVersion: process.env.CLI_VERSION || CLI_VERSION,
    gpgKeyDate: process.env.GPG_KEY_DATE || GPG_KEY_DATE,
    javaDocBase: `${BASE_JDOC_URL}/rundeck-core/${rundeckVersionFull}`,
    javaDocStorageApiBase: `${BASE_JDOC_URL}/rundeck-storage-api/${rundeckVersionFull}`
}

export default setup
