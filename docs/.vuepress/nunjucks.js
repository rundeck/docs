const nunjucks = require('nunjucks')
const setup = require('./setup')

nunjucks.configure({
    autoescape: false,
    tags: {
        blockStart: '{{{%',
        blockEnd: '%}}}',
        variableStart: '{{{',
        variableEnd: '}}}',
        commentStart: '{{{#',
        commentEnd: '#}}}'
      }
})

const config = {
    apiVersion: setup.apiVersion,
    apiDepVersion: setup.apiDepVersion,
    apiDepRelease: setup.apiDepRelease,
    apiMinVersion: setup.apiMinVersion,
    rundeckVersion: setup.rundeckVersion,
    rundeckVersionFull: setup.rundeckVersionFull,

    javaDocBase: `https://static.javadoc.io/org.rundeck/rundeck-core/`+setup.rundeckVersionFull,
    javaDocStorageApiBase: `https://static.javadoc.io/org.rundeck/rundeck-storage-api/`+setup.rundeckVersionFull
}

module.exports = function(source) {
    const isProd = process.env.NODE_ENV === 'production'
    const isServer = this.target === 'node'

    const rendered = nunjucks.renderString(source, config)
    return rendered
}