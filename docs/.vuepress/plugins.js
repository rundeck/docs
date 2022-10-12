//Meta Information
const autometa_options = {
    site: {
        name   : 'Rundeck / Process Automation Documentation',
        twitter: 'rundeck',
    },
    canonical_base: 'https://docs.rundeck.com',
}

function getPlugins(setup) {
    const plugins = [
        'vuepress-plugin-element-tabs',
        ['@vuepress/html-redirect', {
          countdown: 0
          }
        ],
        [require('./plugins/vuepress-plugin-code-copy'), {
            trimContent: true,
            selector: 'div[class*="language-"], extra-class',
            backgroundColor: '#383e4a'
        }],
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
            type: 'deprecated',
            defaultTitle: {
            '/':'Deprecation Warning'
            },
        },
        ],
        [
        'vuepress-plugin-container',
        {
            type: 'enterprise',
            defaultTitle: {
            '/':'Available in PagerDuty Process Automation products'
            },
        },
        ],
        [
        'vuepress-plugin-container',
        {
            type: 'tutorial',
            defaultTitle: {
            '/':'This tutorial is based on example code in the Welcome Projects.'
            },
        },
        ],
        [
        'vuepress-plugin-container',
        {
            type: 'incubating',
            defaultTitle: {
            '/':'Incubating: This Feature or API is new! We may still have a few bugs or change some functionality in the future.'
            },
        },
        ]
    ]

    if (setup.base)
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
