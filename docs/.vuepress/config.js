const path = require("path");

// sidebars
const sidebarAdmin = require('./sidebar-menus/administration')
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


const setup = require('./setup')

console.log(setup)

module.exports = {
  title: 'Rundeck Docs',
  description: '',
  base: setup.base,
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
  themeConfig: {
    logo: '/images/rundecklogo-black.png',
    repo: 'rundeck/docs',
    docsDir: 'docs',
    docsBranch: setup.branch,
    editLinks: true,
    apiVersion: setup.apiVersion,
    version: setup.rundeckVersion,
    versionFull: setup.rundeckVersionFull,
    // algolia: {
    //   apiKey: 'b83a4def9dea3b0d8b9c7f68f5c8f3eb',
    //   indexName: 'rundeck'
    // },
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
