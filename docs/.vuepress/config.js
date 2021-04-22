const path = require("path");

// sidebars
const sidebarAdmin = require('./sidebar-menus/administration')
const sidebarUpgrading = require('./sidebar-menus/upgrading')
const sidebarUserGuide = require('./sidebar-menus/user-guide')
const sidebarCommandLineTools = require('./sidebar-menus/command-line-tools')
const sidebarDeveloper = require('./sidebar-menus/plugin-development')
const sidebarLearning = require('./sidebar-menus/learning')
const sidebarHistory = require('./sidebar-menus/history')
// navbars
const navbarUserGuide = require('./navbar-menus/user-guide')
const navbarLearning = require('./navbar-menus/learning')
const navbarAdmin = require('./navbar-menus/administration')
const navbarDevelopment = require('./navbar-menus/development')
//Meta Information
const autometa_options = {
  site: {
    name   : 'Rundeck Docs',
    twitter: 'rundeck',
  },
  canonical_base: 'https://docs.rundeck.com',
};


const setup = require('./setup')

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
    ['script', { src: '/js/gtm.js', defer: true }],
    ['script', { src: 'https://secure.peak2poem.com/js/195720.js' }]
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
    md.use(require('markdown-it-deflist'))
    md.use(require('markdown-it-implicit-figures'), {
      figcaption: true
    })
  },
  plugins: [
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: true,
        generateSWConfig: {
          globIgnores: ['**/gtm.js']
        }
      }
    ],
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
  ],
  themeConfig: {
    logo: '/images/rundeck-logo.svg',
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
      apiKey: '50ca83cbf53e21e93a02dc46488b12e0',
      indexName: 'prod_rundeck_docs',
      algoliaOptions: {
        hitsPerPage: 10,
        facets: [ "version" ],
        facetFilters: [ `version:${setup.base}` ]
      },
    } : undefined,
    searchMaxSuggestions: 10,
    lastUpdated: 'Last Updated', // string | boolean
    nav: [{
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
      '/administration/': sidebarAdmin,
      '/upgrading/': sidebarUpgrading,
      '/manual/command-line-tools/': sidebarCommandLineTools,
      '/manual': sidebarUserGuide,
      '/learning/': sidebarLearning,
      '/developer/': sidebarDeveloper,
      '/history/': sidebarHistory,
      '/api/': [
        '/api/rundeck-api.md'
      ],
      '/': [
        ''
      ]
    }
  }
}
