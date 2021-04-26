//Meta Information
const autometa_options = {
    site: {
        name   : 'Rundeck Docs',
        twitter: 'rundeck',
    },
    canonical_base: 'https://docs.rundeck.com',
}

function getPlugins(setup) {
    const plugins = [
        'vuepress-plugin-element-tabs',
        [
        'autometa', {
            autometa_options
        }
        ],
        [
        'vuepress-plugin-canonical',
        {
            baseURL: 'https://docs.rundeck.com', // base url for your canonical link, optional, default: ''
            stripExtension: true // strip '.html' , optional, default: false
        }
        ],
        [
        'vuepress-plugin-container',
        {
            type: 'enterprise',
            defaultTitle: {
            '/':'Available in Rundeck Enterprise'
            },
        },
        ],
        [
        'vuepress-plugin-container',
        {
            type: 'tutorial',
            defaultTitle: {
            '/':'This tutorial is based on example code described on the Learning Rundeck page.'
            },
        },
        ],
        [
        'vuepress-plugin-container',
        {
            type: 'incubating',
            defaultTitle: {
            '/':'Incubating: this API may change in a future release.'
            },
        },
        ]
    ]

    if (setup.base == 'docs')
        plugins.unshift([
        '@vuepress/pwa',
        {
            serviceWorker: true,
            updatePopup: true,
            generateSWConfig: {
            globIgnores: ['**/gtm.js']
            }
        }
        ])

    return plugins
}

module.exports = getPlugins