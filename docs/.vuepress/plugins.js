//Meta Information
import _ from 'lodash'
import tabsPlugin from '@snippetors/vuepress-plugin-tabs';
import { feedPlugin } from "vuepress-plugin-feed2";
import { containerPlugin } from '@vuepress/plugin-container';
import { copyCodePlugin } from "vuepress-plugin-copy-code2";
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { path } from '@vuepress/utils'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
//import autoMetaPlugin from "vuepress-plugin-autometa";  // This plugin may not be compatible with Vue2.  Need to check Meta tags to see if they are same as 1.x versions.
import { pwaPlugin } from "vuepress-plugin-pwa2";
import { redirectPlugin } from "vuepress-plugin-redirect";

const autometa_options = {
    site: {
        name: 'Rundeck / Process Automation Documentation',
        twitter: 'rundeck',
    },
    canonical_base: 'https://docs.rundeck.com',
}

function getPlugins(setup) {
    const plugins = [
        registerComponentsPlugin({
            components: {
                RundeckSwaggerUi: path.resolve(__dirname, './components/RundeckSwaggerUi.vue'),
              },
          }),
        tabsPlugin([""]),
        redirectPlugin({
            config: {
                '/manual/01-introduction.html' : '/introduction/introduction.html',
                '/manual/03-getting-started.html' : '/learning/index.html',
                '/manual/02-getting-help.html' : '/introduction/getting-help.html',
                '/administration/configuration/license.html' : '/administration/license.html',
                '/manual/servicenow-app.html' : '/manual/integrations/servicenow-app.html',
                '/administration/security/key-storage.html' : '/manual/key-storage/key-storage.html',
                '/administration/key-storage/key-storage.html' : '/manual/key-storage/key-storage.html',
                '/administration/security/storage-plugins.html' : '/manual/key-storage/key-plugins.html',
                '/administration/key-storage/storage-plugins.html' : '/manual/key-storage/key-plugins.html',
                '/administration/security/storage-plugins/cyberark-storage.html' : '/manual/key-storage/storage-plugins/cyberark-storage.html',
                '/administration/key-storage/storage-plugins/cyberark-storage.html' : '/manual/key-storage/storage-plugins/cyberark-storage.html',
                '/administration/security/storage-plugins/thycotic-storage.html' : '/manual/key-storage/storage-plugins/thycotic-storage.html',
                '/administration/key-storage/storage-plugins/thycotic-storage.html' : '/manual/key-storage/storage-plugins/thycotic-storage.html',
                '/administration/security/storage-plugins/vault.html' : '/manual/key-storage/storage-plugins/vault.html',
                '/manual/command-line-tools/index.html' : '/rd-cli/index.html',
                '/manual/command-line-tools/rd.html' : '/rd-cli/index.html',
                '/manual/command-line-tools/rd-acl.html' : '/rd-cli/rd-ext-acl.html',
                '/history/cves/' : '/history/CVEs/',
                '/introduction/introduction.html' : '/about/introduction.html',
                '/introduction/getting-help.html' : '/about/getting-help.html',
                '/administration/architecture-and-deployment/system-architecture.html' : '/about/enterprise/index.html',
                '/administration/architecture-and-deployment/aws.html' : '/administration/install/aws.html',
                '/administration/projects/' : '/manual/projects/',
                '/manual/12-webhooks.html' : '/manual/webhooks.html',
                '/history/4_0_x/version-4.0.0.html' : '/history/4_x/version-4.0.0.html',
                '/manual/workflow-steps/aws-athena' : '/manual/workflow-steps/amazon-athena.html',
                '/enterprise/quickstart.html' : '/enterprise/index.html'
            }
          }),
        feedPlugin({
            hostname: 'docs.rundeck.com',
            rss: true,
            json: true,
            sort: entries => _.reverse(_.sortBy(entries, 'date'))
        }),
        containerPlugin(
            {
                type: 'deprecated',
                locales: {
                    '/': {
                        defaultInfo: 'Deprecation Warning',
                    }
                }
            }
        ),
        containerPlugin(
            {
                type: 'enterprise',
                locales: {
                    '/': {
                        defaultInfo: 'Available in PagerDuty Process Automation Commercial products.',
                    }
                }
            }
        ),
        containerPlugin(
            {
                type: 'tutorial',
                locales: {
                    '/': {
                        defaultInfo: 'This tutorial is based on example code in the Welcome Projects.',
                    }
                }
            },
        containerPlugin(
            {
                type: 'incubating',
                locales: {
                    '/': {
                        defaultInfo: 'Incubating: This feature or API is new! We may still have a few bugs or change some functionality in the future.',
                    }
                }
            }
        ),
            containerPlugin(
                {
                    type: 'betafeature',
                    locales: {
                        '/': {
                            defaultInfo: 'BETA FEATURE',
                        }
                    }
                }
            )
        ),
        copyCodePlugin({
            locales: {
                "/": {
                  // Override copy button label text
                  copy: "Copy Code",
                },
            }
        }),
        '@vuepress/register-components',
            {
                componentsDir: path.resolve(__dirname, './components'),
            },
            docsearchPlugin({
                // options
                locales: {
                    '/': {
                      placeholder: 'Search Documentation',
                      translations: {
                        button: {
                          buttonText: 'Search Documentation',
                        },
                      },
                    }
                },
                appId: 'GRSXNRCDRG',
                apiKey: 'c463f74d6f36a5af808650e0f69aadfa',
                indexName: 'prod_rundeck_docs',
                searchParameters: {
                    hitsPerPage: 10,
                    facetFilters: [ `version:${setup.base}` ]
                },
              })
        //    autoMetaPlugin(autometa_options),
        //    htmlRedirect({
        //     countdown: 0,
        //    })
    ]

    if (setup.base) {
        plugins.unshift([
            pwaPlugin(
            {
                update: "hint",
                favicon: '/favicon.ico',
                serviceWorker: true,
                updatePopup: { 
                    message: "We updated some pages! Click this to see the latest docs.", 
                    buttonText: "Refresh Now" 
                },
                generateSWConfig: {
                    globIgnores: ['**/gtm.js']
                }
            })
        ]);
    }

    return plugins;
}


export default getPlugins