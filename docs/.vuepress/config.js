const path = require("path");

// sidebars
const sidebarAdmin = require('./sidebar-menus/administration')
const sidebarUpgrading = require('./sidebar-menus/upgrading')
const sidebarUserGuide = require('./sidebar-menus/user-guide')
const sidebarCommandLineTools = require('./sidebar-menus/command-line-tools')
const sidebarEnterprise = require('./sidebar-menus/enterprise')
const sidebarDeveloper = require('./sidebar-menus/plugin-development')
const sidebarTutorials = require('./sidebar-menus/tutorials')
const sidebarHistory = require('./sidebar-menus/history')
// navbars
const navbarUserGuide = require('./navbar-menus/user-guide')
const navbarTutorials = require('./navbar-menus/tutorials')
const navbarAdmin = require('./navbar-menus/administration')
const navbarEnterprise = require('./navbar-menus/enterprise')
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
  base: `/${setup.base}/`,
  configureWebpack: {
    resolve: {
      alias: {
        '@assets': path.resolve(__dirname, "../assets")
      }
    }
  },
  head: [
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
    ]
  ],
  themeConfig: {
    logo: '/images/rundecklogo-black.png',
    repo: 'rundeck/docs',
    docsDir: 'docs',
    docsBranch: setup.branch,
    editLinks: true,
    apiVersion: setup.apiVersion,
    version: setup.rundeckVersion,
    versionFull: setup.rundeckVersionFull,
    algolia: {
      appId: 'GRSXNRCDRG',
      apiKey: '50ca83cbf53e21e93a02dc46488b12e0',
      indexName: 'prod_rundeck_docs',
      algoliaOptions: {
        hitsPerPage: 10,
        facets: [ "version" ],
        facetFilters: [ `version:${setup.base}` ]
      },
    },
    searchMaxSuggestions: 10,
    lastUpdated: 'Last Updated', // string | boolean
    nav: [{
        text: 'User Guide',
        items: navbarUserGuide
      },
      {
        text: 'Tutorials',
        items: navbarTutorials
      },
      {
        text: 'Administration',
        items: navbarAdmin
      },
      {
        text: 'Enterprise',
        items: navbarEnterprise
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
      '/enterprise/': sidebarEnterprise,
      '/manual/command-line-tools/': sidebarCommandLineTools,
      '/manual': sidebarUserGuide,
      '/tutorials/': sidebarTutorials,
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
