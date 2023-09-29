import path from "path";
import { defaultTheme } from '@vuepress/theme-default'

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

import setup from './setup';
import getPlugins from './plugins';

console.log(setup)

export default {
  debug: true,
  title: '',
  description: '',
  shouldPrefetch: false,
  base: `/${setup.base ? setup.base + '/' : ''}`,
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
  extendMarkdown: md => {
    // use more markdown-it plugins!
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
    VERSION_FULL: setup.rundeckVersionFull
  },

  plugins: getPlugins(setup),
  theme: defaultTheme({
    logo: 'https://www.rundeck.com/hubfs/Pager%20Duty%20Branding/RundeckbyPagerDuty.svg',
    repo: 'rundeck/docs',
    docsDir: 'docs',
    docsBranch: setup.branch,
    colorMode: 'light',
    colorModeSwitch: false,
    lastUpdated: true,
    contributors: false,
    themePlugins: {
      activeHeaderLinks: true,
      externalLinkIcon: true,
    },
    //   apiVersion: setup.apiVersion,
    //   apiDepVersion: setup.apiDepVersion,
    //   apiDepRelease: setup.apiDepRelease,
    //   apiMinVersion: setup.apiMinVersion,
    //   version: setup.rundeckVersion,
    //   versionFull: setup.rundeckVersionFull,
    //   algolia: setup.base == 'docs' ? {
    //     appId: 'GRSXNRCDRG',
    //     apiKey: 'c463f74d6f36a5af808650e0f69aadfa',
    //     indexName: 'prod_rundeck_docs',
    //     algoliaOptions: {
    //       hitsPerPage: 10,
    //       facets: [ "version" ],
    //       facetFilters: [ `version:${setup.base}` ]
    //     },
    //   } : undefined,
    //   searchMaxSuggestions: 15,
    //   lastUpdated: 'Last Updated', // string | boolean
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
        '/api/rundeck-api.md'
      ],
      '/': [
        ''
      ]
    }
    // }
  })
}
