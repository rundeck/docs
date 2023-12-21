import _ from 'lodash'

import { defineUserConfig } from 'vuepress';
import { hopeTheme } from "vuepress-theme-hope";
import { containerPlugin } from '@vuepress/plugin-container';
import { docsearchPlugin } from '@vuepress/plugin-docsearch';
import { getDirname, path } from '@vuepress/utils';
import { openGraphPlugin } from 'vuepress-plugin-open-graph';
import { registerComponentsPlugin } from '@vuepress/plugin-register-components';
// import { pwaPlugin } from '@vuepress/plugin-pwa';
// import { pwaPopupPlugin } from '@vuepress/plugin-pwa-popup';
import { redirectPlugin } from "vuepress-plugin-redirect";
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics';


// sidebars
import sidebarAdmin from './sidebar-menus/administration'
import sidebarUpgrading from './sidebar-menus/upgrading'
import sidebarUserGuide from './sidebar-menus/user-guide'
import sidebarCommandLineTools from './sidebar-menus/command-line-tools'
import sidebarDeveloper from './sidebar-menus/plugin-development'
import sidebarLearning from './sidebar-menus/learning'
import sidebarHistory from './sidebar-menus/history';
import sidebarAbout from './sidebar-menus/about';

import markdownItInclude from 'markdown-it-include'
import markdownItDeflist from 'markdown-it-deflist'
import markdownItImplicitFigures from 'markdown-it-implicit-figures'

// navbars
import navbarAbout from './navbar-menus/about';
import navbarUserGuide from './navbar-menus/user-guide';
import navbarLearning from './navbar-menus/learning';
import navbarAdmin from './navbar-menus/administration';
import navbarDevelopment from './navbar-menus/development';
import markdownItReplaceVars from './markdown-it-replace-vars'

//Get setup variables
const __dirname = getDirname(import.meta.url);
import setup from './setup';
console.log(setup)

const compareDate = (
  dateA: Date | string | undefined,
  dateB: Date | string | undefined,
): number => {
  if (!dateA || !(dateA instanceof Date)) return 1;
  if (!dateB || !(dateB instanceof Date)) return -1;
  return dateB.getTime() - dateA.getTime();
};

export default defineUserConfig({
  //debug: true,
  title: '',
  debug: false,
  description: '',
  shouldPrefetch: false,
  base: `/${setup.base ? setup.base + '/' : ''}`,
  head: [
  ],
  extendsMarkdown: md => {
    md.use(markdownItReplaceVars, 'custom_token_replace', function (content) {
      return content.replace(/\{\{\s*\$(\w+)\s*\}\}/g, (a,b)=> {
          return setup[b]||a
      });
    })
    md.use(markdownItInclude, {
      root: path.resolve(__dirname, "../")
    });
    md.use(markdownItDeflist);
    md.use(markdownItImplicitFigures, {
      figcaption: true
    });
  },
  define: {
    API_VERSION: setup.apiVersion,
    API_DEP_VERSION: setup.apiDepVersion,
    API_DEP_RELEASE: setup.apiDepRelease,
    API_MIN_VERSION: setup.apiMinVersion,
    VERSION: setup.rundeckVersion,
    VERSION_FULL: setup.rundeckVersionFull,
    CLI_VERSION: setup.cliVersion
  },

  //Theme Config
  theme: hopeTheme({
    logo: 'https://www.rundeck.com/hubfs/Pager%20Duty%20Branding/RundeckbyPagerDuty.svg',
    repo: 'rundeck/docs',
    docsDir: 'docs',
    docsBranch: setup.branch,
    repoDisplay: true,
    darkmode: 'disable',
    lastUpdated: true,
    pageInfo: false,
    contributors: false,
    plugins: {
      pwa: {
        update: 'available',
        cacheHTML: true
      },
      mdEnhance: {
        tabs: true,
        codetabs: true,
      },
      feed: {
        hostname: 'https://docs.rundeck.com',
        rss: true,
        json: true,
        filter: ({ frontmatter, filePathRelative }: Page): boolean => !(frontmatter.feed === undefined || frontmatter.home || !filePathRelative || frontmatter.article === false || frontmatter.feed === false),
        sort: ({ pageA }: Page, {pageB}: Page): number => compareDate(pageA.frontmatter.date, pageB.frontmatter.date)
      },
      components: {
          components: [
            "FontIcon",
            "PDF",
            "VideoPlayer",
            "YouTube",
          ],
          componentOptions: {
            fontIcon: {
              assets: "fontawesome",
            },
            pdf: {
              pdfjs: "/assets/lib/pdfjs/",
            },
          }
      }
    },
    navbar: [
      {
        text: 'About',
        children: navbarAbout
      },
      {
        text: 'User Guide',
        children: navbarUserGuide
      },
      {
        text: 'Administration',
        children: navbarAdmin
      },
      {
        text: 'Learning',
        children: navbarLearning
      },
      {
        text: 'Development',
        children: navbarDevelopment
      }
    ],
    sidebar: {
       '/about/': sidebarAbout,
       '/administration/': sidebarAdmin,
       '/upgrading/': sidebarUpgrading,
       '/rd-cli/': sidebarCommandLineTools,
       '/manual/': sidebarUserGuide,
       '/learning/': sidebarLearning,
       '/developer/': sidebarDeveloper,
       '/history/': sidebarHistory,
       '/api/': [
        '/api/rundeck-api-versions.md',
        '/api/rundeck-api.md',
        '/api/api-spec.md'
      ],
      '/': [
        ''
      ]
    }
    // }
  }),

  //Plugins Config
  plugins: [
    registerComponentsPlugin({
        components: {
            RundeckSwaggerUi: path.resolve(__dirname, './components/RundeckSwaggerUI.vue'),
          },
      }),
    // pwaPlugin({
    //     skipWaiting: false,
    // }),
    // pwaPopupPlugin({
    // locales: {
    //     '/': {
    //         message: 'New content is available.',
    //         buttonText: 'Refresh',
    //     },
    // }
    // }),
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
    openGraphPlugin({
        host: 'https://docs.rundeck.com',
        twitterSite: 'rundeck',
      }),
    googleAnalyticsPlugin({
      id: 'G-LYC4H41P9E',
      debug: true
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
    ),
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
    ),
    registerComponentsPlugin({
        componentsDir: path.resolve(__dirname, './components'),
    }),
    docsearchPlugin({
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
        indexName: 'dev_rundeck_docs',
        searchParameters: {
            hitsPerPage: 100,
            facetFilters: [ `version:${setup.base}` ]
        },
    }),
          
  ],
})
