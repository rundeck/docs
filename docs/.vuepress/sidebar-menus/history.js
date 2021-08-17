const getChildren = require('../getHistory')

module.exports = [
  {
    title: 'Release Notes',
    collapsable: false,
    sidebarDepth: 2,
    path: '/history/',
    children: [
      ...getChildren('docs/history'),
      {
        title: "Security Advisories",
        collapsable: true,
        sidebarDepth: 1,
        path: '/history/CVEs/',
        children: getChildren('docs/history', 'CVEs'),
      },
      {
        title: '3.4.x',
        collapsable: true,
        sidebarDepth: 2,
        path: '/history/',
        children: getChildren('docs/history', '3_4_x'),
      },
      {
        title: '3.3.x',
        collapsable: true,
        sidebarDepth: 2,
        path: '/history/',
        children: getChildren('docs/history', '3_3_x'),
      },
      {
        title: '3.2.x',
        collapsable: true,
        sidebarDepth: 2,
        path: '/history/',
        children: getChildren('docs/history', '3_2_x'),
      },
      {
        title: '3.1.x',
        collapsable: true,
        sidebarDepth: 2,
        path: '/history/',
        children: getChildren('docs/history', '3_1_x'),
      },
      {
        title: '3.0.x',
        collapsable: true,
        sidebarDepth: 2,
        path: '/history/',
        children: getChildren('docs/history', '3_0_x'),
      },
      {
        title: '2.x',
        collapsable: true,
        sidebarDepth: 2,
        path: '/history/',
        children: getChildren('docs/history', '2_x'),
      },
      {
        title: '1.x',
        collapsable: true,
        sidebarDepth: 2,
        path: '/history/',
        children: getChildren('docs/history', '1_x'),
      }
    ],
  },

]
