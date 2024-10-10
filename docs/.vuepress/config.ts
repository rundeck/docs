import _ from 'lodash';
import { viteBundler } from '@vuepress/bundler-vite';
import { defineUserConfig, Page } from 'vuepress';
import { hopeTheme } from "vuepress-theme-hope";
import { containerPlugin } from '@vuepress/plugin-container';
import { getDirname, path } from '@vuepress/utils';
import { openGraphPlugin } from 'vuepress-plugin-open-graph';
import { registerComponentsPlugin } from '@vuepress/plugin-register-components';
import { dateSorter } from "@vuepress/helper";
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics';


// sidebars
import sidebarAdmin from './sidebar-menus/administration'
import sidebarUserGuide from './sidebar-menus/user-guide'
import sidebarCommandLineTools from './sidebar-menus/command-line-tools'
import sidebarDeveloper from './sidebar-menus/plugin-development'
import sidebarLearning from './sidebar-menus/learning'
import sidebarHistory from './sidebar-menus/history'
import sidebarAbout from './sidebar-menus/about'
import apiMenu from './sidebar-menus/api'


import markdownItInclude from 'markdown-it-include'
import markdownItDeflist from 'markdown-it-deflist'
import markdownItImplicitFigures from 'markdown-it-implicit-figures'

// navbars
import navbarAbout from './navbar-menus/about'
import navbarUserGuide from './navbar-menus/user-guide'
import navbarLearning from './navbar-menus/learning'
import navbarAdmin from './navbar-menus/administration'
import navbarDevelopment from './navbar-menus/development'
import markdownItReplaceVars from './markdown-it-replace-vars'

//Get setup variables
const __dirname = getDirname(import.meta.url);
import setup from './setup';
console.log(setup)

export default defineUserConfig({
  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),
  debug: false,
  title: '',
  description: '',
  shouldPrefetch: false,
  base: `/${setup.base ? setup.base + '/' : ''}`,
  head: [
  ],
  extendsMarkdown: md => {
    md.use(markdownItReplaceVars, 'custom_token_replace', function (content:string) {
      return content.replace(/(?:\{\{|%7B%7B)\s*\$(\w+)\s*(?:\}\}|%7D%7D)/g, (match:string,varName:string)=> {
        return varName && setup[varName] || match
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
    debug: true,
    logo: '/images/RundeckbyPagerDuty.svg',
    repo: 'rundeck/docs',
    docsDir: 'docs',
    docsBranch: setup.branch,
    repoDisplay: true,
    darkmode: 'toggle',
    prevLink: false,
    nextLink: false,
    lastUpdated: true,
    pageInfo: false,
    contributors: false,
    plugins: {
      docsearch: {
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
      },
      redirect: {
        config: {
          '/manual/01-introduction.html' : '/introduction/introduction.html',
          '/manual/03-getting-started.html' : '/learning/index.html',
          '/manual/02-getting-help.html' : '/introduction/getting-help.html',
          '/manual/04-jobs.html' : '/manual/jobs.html',
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
          '/administration/architecture-and-deployment/system-architecture.html' : '/about/enterprise/index.html',
          '/administration/architecture-and-deployment/aws.html' : '/administration/install/aws.html',
          '/administration/projects/' : '/manual/projects/',
          '/manual/12-webhooks.html' : '/manual/webhooks.html',
          '/history/4_0_x/version-4.0.0.html' : '/history/4_x/version-4.0.0.html',
          '/manual/workflow-steps/aws-athena' : '/manual/workflow-steps/amazon-athena.html',
          '/enterprise/quickstart.html' : '/enterprise/index.html',
          '/learning/solutions/automated-diagnostics/solution-overview.html' : '/learning/solutions/automated-diagnostics/index.html',
          '/manual/plugins/plugins-overview.html' : '/manual/plugins/index.html',
          '/administration/install/installing-rundeck' : '/administration/install/index',
          '/learning/tutorial/preparing.html' : '/learning/tutorial/index.html',
          '/learning/howto/overview.html' : '/learning/howto/index.html',
          '/learning/getting-started/overview.html' : '/learning/getting-started/index.html',
          '/plugins/' : '/manual/plugins/full-list',
          '/learning/getting-started/rba/rba-welcome-overview.html' : '/learning/getting-started/rba/index.html',
          '/learning/getting-started/jobs/overview.html' : '/learning/getting-started/jobs/index.html',
          '/manual/key-storage/key-storage.html' : '/manual/key-storage/index.html',
          '/api/rundeck-api.html' : '/api/index.html',
          '/introduction/getting-help.html/manual/job-options.html' : '/manual/job-options.html#option-model-provider',
          '/introduction/getting-help.html/administration/maintenance/tuning-rundeck.html' : '/administration/maintenance/tuning-rundeck.html#quartz-job-threadcount',
          '/administration/security/sso.html' : '/administration/security/sso/index.html',
          '/manual/creating-jobs.html' : '/manual/jobs/creating-jobs.html',
          '/manual/jobs.md' : '/manual/jobs/index.md',
          '/manual/job-options.html' : '/manual/jobs/job-options.html',
          '/manual/node-steps/aws.html' : '/manual/jobs/job-plugins/node-steps/aws.html',
          '/manual/node-steps/azure.html' : '/manual/jobs/job-plugins/node-steps/azure.html',
          '/manual/node-steps/builtin.html' : '/manual/jobs/job-plugins/node-steps/builtin.html',
          '/manual/node-steps/datadog.html' : '/manual/jobs/job-plugins/node-steps/datadog.html',
          '/manual/node-steps/gcp.html' : '/manual/jobs/job-plugins/node-steps/gcp.html',
          '/manual/node-steps/jira.html' : '/manual/jobs/job-plugins/node-steps/jira.html',
          '/manual/node-steps/kubernetes-debug-plugins.html' : '/manual/jobs/job-plugins/node-steps/kubernetes-debug-plugins.html',
          '/manual/node-steps/kubernetes-deployment-plugins.html' : '/manual/jobs/job-plugins/node-steps/kubernetes-deployment-plugins.html',
          '/manual/node-steps/kubernetes-job-plugins.html' : '/manual/jobs/job-plugins/node-steps/kubernetes-job-plugins.html',
          '/manual/node-steps/kubernetes-pod-plugins.html' : '/manual/jobs/job-plugins/node-steps/kubernetes-pod-plugins.html',
          '/manual/node-steps/kubernetes-service-plugins.html' : '/manual/jobs/job-plugins/node-steps/kubernetes-service-plugins.html',
          '/manual/node-steps/kubernetes-statefulset-plugins.html' : '/manual/jobs/job-plugins/node-steps/kubernetes-statefulset-plugins.html',
          '/manual/node-steps/loop-plugins.html' : '/manual/jobs/job-plugins/node-steps/loop-plugins.html',
          '/manual/node-steps/oracle.html' : '/manual/jobs/job-plugins/node-steps/oracle.html',
          '/manual/node-steps/sensu.html' : '/manual/jobs/job-plugins/node-steps/sensu.html',
          '/manual/node-steps/sqlrunner.html' : '/manual/jobs/job-plugins/node-steps/sqlrunner.html',
          '/manual/node-steps/vmware.html' : '/manual/jobs/job-plugins/node-steps/vmware.html',
          '/manual/workflow-steps/amazon-athena.html' : '/manual/jobs/job-plugins/workflow-steps/amazon-athena.html',
          '/manual/workflow-steps/aws-cloudwatch.html' : '/manual/jobs/job-plugins/workflow-steps/aws-cloudwatch.html',
          '/manual/workflow-steps/aws-ecs-fargate.html' : '/manual/jobs/job-plugins/workflow-steps/aws-ecs-fargate.html',
          '/manual/workflow-steps/aws-elb-workflow-plugin.html' : '/manual/jobs/job-plugins/workflow-steps/aws-elb-workflow-plugin.html',
          '/manual/workflow-steps/aws-lambda.html' : '/manual/jobs/job-plugins/workflow-steps/aws-lambda.html',
          '/manual/workflow-steps/aws-rds.html' : '/manual/jobs/job-plugins/workflow-steps/aws-rds.html',
          '/manual/workflow-steps/aws.html' : '/manual/jobs/job-plugins/workflow-steps/aws.html',
          '/manual/workflow-steps/azure.html' : '/manual/jobs/job-plugins/workflow-steps/azure.html',
          '/manual/workflow-steps/builtin.html' : '/manual/jobs/job-plugins/workflow-steps/builtin.html',
          '/manual/workflow-steps/datadog.html' : '/manual/jobs/job-plugins/workflow-steps/datadog.html',
          '/manual/workflow-steps/file-transfer.html' : '/manual/jobs/job-plugins/workflow-steps/file-transfer.html',
          '/manual/workflow-steps/gcp.html' : '/manual/jobs/job-plugins/workflow-steps/gcp.html',
          '/manual/workflow-steps/github.html' : '/manual/jobs/job-plugins/workflow-steps/github.html',
          '/manual/workflow-steps/jira.html' : '/manual/jobs/job-plugins/workflow-steps/jira.html',
          '/manual/workflow-steps/loop-plugins.html' : '/manual/jobs/job-plugins/workflow-steps/loop-plugins.html',
          '/manual/workflow-steps/oracle.html' : '/manual/jobs/job-plugins/workflow-steps/oracle.html',
          '/manual/workflow-steps/pagerduty.html' : '/manual/jobs/job-plugins/workflow-steps/pagerduty.html',
          '/manual/workflow-steps/progress-badge.html' : '/manual/jobs/job-plugins/workflow-steps/progress-badge.html',
          '/manual/workflow-steps/rss-feed-plugin.html' : '/manual/jobs/job-plugins/workflow-steps/rss-feed-plugin.html',
          '/manual/workflow-steps/sensu.html' : '/manual/jobs/job-plugins/workflow-steps/sensu.html',
          '/manual/workflow-steps/servicenow-project-specs.html' : '/manual/jobs/job-plugins/workflow-steps/servicenow-project-specs.html',
          '/manual/workflow-steps/servicenow.html' : '/manual/jobs/job-plugins/workflow-steps/servicenow.html',
          '/manual/workflow-steps/sumo-logic.html' : '/manual/jobs/job-plugins/workflow-steps/sumo-logic.html',
          '/manual/workflow-steps/vmware.html' : '/manual/jobs/job-plugins/workflow-steps/vmware.html',
          '/manual/execution-lifecycle/job-resume.html' : '/manual/jobs/job-resume.html',
          '/manual/execution-lifecycle/job-retry-failed-nodes.html' : '/manual/jobs/job-retry-failed-nodes.html',
          '/manual/job-workflows.html' : '/manual/jobs/job-workflows.html',
          '/manual/execution-lifecycle/result-data.html' : '/manual/jobs/result-data.html',
          '/manual/execution-lifecycle/roi-metrics.html' : '/manual/jobs/roi-metrics.html',
          '/manual/workflow-strategies.html' : '/manual/jobs/workflow-strategies.html',
          '/manual/workflow-strategies/ruleset.html' : '/manual/jobs/workflow-strategies/ruleset.html'
       }
      },
      pwa: {
        update: 'hint',
        cacheHTML: true
      },
      prismjs: {
        light: 'night-owl'
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
        sorter: (
          pageA: Page,
          pageB: Page,
        ): number =>
          dateSorter( pageA.frontmatter.date, pageB.frontmatter.date)
      },
      components: {
          components: [
            "FontIcon",
            "PDF",
            "VidStack"
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
       '/upgrading/': sidebarAdmin,
       '/rd-cli/': sidebarCommandLineTools,
       '/manual/': sidebarUserGuide,
       '/learning/': sidebarLearning,
       '/developer/': sidebarDeveloper,
       '/history/': sidebarHistory,
       '/api/': apiMenu,
      '/': [
        ''
      ]
    }
    // }
  }, 
  {custom: true},
),
  alias: {
  "@theme-hope/components/HomePage": path.resolve(
    __dirname,
    "./components/HomePageAnnounce.vue",
  ),
  "@theme-hope/modules/sidebar/components/Sidebar": path.resolve(
    __dirname,
    "./components/SidebarAnnounce.vue",
  ),
  },
  //Plugins Config
  plugins: [
    registerComponentsPlugin({
        components: {
            RundeckSwaggerUi: path.resolve(__dirname, './components/RundeckSwaggerUI.vue'),
          },
      }),
      googleAnalyticsPlugin({
        id: 'G-05XJ24KPYH',
      }),
    openGraphPlugin({
        host: 'https://docs.rundeck.com',
        twitterSite: 'rundeck',
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
                    defaultInfo: 'Available in PagerDuty Runbook Automation Commercial products.',
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
    })   
  ],
})
