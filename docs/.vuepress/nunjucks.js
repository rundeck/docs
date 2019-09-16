const nunjucks = require('nunjucks')

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
    apiVersion: 33,
    apiVersionFull: '3.1.0-20190731',

    javaDocBase: `https://static.javadoc.io/org.rundeck/rundeck-core/3.1.0-20190731`
}

module.exports = function(source) {
    const isProd = process.env.NODE_ENV === 'production'
    const isServer = this.target === 'node'

    const rendered = nunjucks.renderString(source, config)
    return rendered
}