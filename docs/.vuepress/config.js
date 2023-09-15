const path = require("path");

// sidebars
const sidebarAdmin = require('./sidebar-menus/administration')
const sidebarUpgrading = require('./sidebar-menus/upgrading')
const sidebarUserGuide = require('./sidebar-menus/user-guide')
const sidebarCommandLineTools = require('./sidebar-menus/command-line-tools')
const sidebarDeveloper = require('./sidebar-menus/plugin-development')
const sidebarLearning = require('./sidebar-menus/learning')
const sidebarHistory = require('./sidebar-menus/history')
const sidebarAbout = require('./sidebar-menus/about')
// navbars
const navbarAbout = require('./navbar-menus/about')
const navbarUserGuide = require('./navbar-menus/user-guide')
const navbarLearning = require('./navbar-menus/learning')
const navbarAdmin = require('./navbar-menus/administration')
const navbarDevelopment = require('./navbar-menus/development')

const setup = require('./setup')
const getPlugins = require('./plugins')

console.log(setup)

module.exports = {
  title: 'Rundeck Docs',
  description: '',
  base: `/${setup.base ? setup.base + '/' : ''}`,
  configureWebpack: {
    resolve: {
      alias: {
        '@assets': path.resolve(__dirname, "../assets")
      }
    }
  },
  head: [
    ['script', {}, `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-5QNBBN6');
    `],
    ['script', { src: '/js/gtm.js', defer: true }]
  ],
  chainWebpack: config => {
    config.module
      .rule('md')
      .test(/\.md$/)
      .use(path.resolve(__dirname, './nunjucks'))
        .loader(path.resolve(__dirname, './nunjucks'))
        .end()
  },
  extendMarkdown: md => {
    // use more markdown-it plugins!
    md.use(require('markdown-it-include'),{
      root: path.resolve(__dirname,"../")
    })
    md.use(require('markdown-it-deflist'))
    md.use(require('markdown-it-implicit-figures'), {
      figcaption: true
    })
  },
  plugins: getPlugins(setup),
  themeConfig: {
    logo: 'https://www.rundeck.com/hubfs/Pager%20Duty%20Branding/RundeckbyPagerDuty.svg',
    repo: 'rundeck/docs',
    docsDir: 'docs',
    docsBranch: setup.branch,
    editLinks: true,
    apiVersion: setup.apiVersion,
    apiDepVersion: setup.apiDepVersion,
    apiDepRelease: setup.apiDepRelease,
    apiMinVersion: setup.apiMinVersion,
    version: setup.rundeckVersion,
    versionFull: setup.rundeckVersionFull,
    algolia: setup.base == 'docs' ? {
      appId: 'GRSXNRCDRG',
      apiKey: 'c463f74d6f36a5af808650e0f69aadfa',
      indexName: 'prod_rundeck_docs',
      algoliaOptions: {
        hitsPerPage: 10,
        facets: [ "version" ],
        facetFilters: [ `version:${setup.base}` ]
      },
    } : undefined,
    searchMaxSuggestions: 15,
    lastUpdated: 'Last Updated', // string | boolean
    nav: [
      {
        text: 'About',
        items: navbarAbout
      },
      {
        text: 'User Guide',
        items: navbarUserGuide
      },
      {
        text: 'Administration',
        items: navbarAdmin
      },
      {
        text: 'Learning',
        items: navbarLearning
      },
      {
        text: 'Development',
        items: navbarDevelopment
      }
    ],
    sidebarDepth: 2,
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
        '/api/apiDocumentation.md'
      ],
      '/': [
        ''
      ]
    }
  }
}
