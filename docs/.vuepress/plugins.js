//Meta Information
import _ from 'lodash'
import codeCopyPlugin from './plugins/vuepress-plugin-code-copy';

const autometa_options = {
    site: {
        name   : 'Rundeck / Process Automation Documentation',
        twitter: 'rundeck',
    },
    canonical_base: 'https://docs.rundeck.com',
}

const feed_options = {
  canonical_base: 'https://docs.rundeck.com/docs',
  sort:  entries => _.reverse( _.sortBy( entries, 'date' ) )
};


function getPlugins(setup) {
    const plugins = [
        '@snippetors/vuepress-plugin-tabs',
        [ 'vuepress-plugin-feed2', feed_options],
        ['@vuepress/html-redirect', {
          countdown: 0
        }],
        [codeCopyPlugin, {
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
                '/':'Available in PagerDuty Process Automation Commercial products.'
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
            ],
            [
            'vuepress-plugin-container',
            {
                type: 'betafeature',
                defaultTitle: {
                '/':'BETA FEATURE'
                },
            },
            ]
        ]

    if (setup.base) {
        plugins.unshift([
            '@vuepress/pwa',
            {
                serviceWorker: true,
                updatePopup: { 
                    message: "We updated some pages! Click this to see the latest docs.", 
                    buttonText: "Refresh Now" 
                },
                generateSWConfig: {
                    globIgnores: ['**/gtm.js']
                }
            }
        ]);
    }

    return plugins;
}


export default getPlugins
