import getChildren from '../getHistory'

export default [
  {
    text: 'Release Notes',
    collapsible: false,
    link: '/history/',
    children: [
      ...getChildren('docs/history'),
      {
        text: "Security Advisories",
        collapsible: true,
        link: '/history/CVEs/',
        children: getChildren('docs/history', 'CVEs'),
      },
      {
        text: '4.x',
        collapsible: true,
        link: '/history/',
        children: getChildren('docs/history', '4_x')
      },
      {
        text: '3.4.x',
        collapsible: true,
        link: '/history/',
        children: getChildren('docs/history', '3_4_x'),
      },
      {
        text: '3.3.x',
        collapsible: true,
        link: '/history/',
        children: getChildren('docs/history', '3_3_x'),
      },
      {
        text: '3.2.x',
        collapsible: true,
        link: '/history/',
        children: getChildren('docs/history', '3_2_x'),
      },
      {
        text: '3.1.x',
        collapsible: true,
        link: '/history/',
        children: getChildren('docs/history', '3_1_x'),
      },
      {
        text: '3.0.x',
        collapsible: true,
        link: '/history/',
        children: getChildren('docs/history', '3_0_x'),
      },
      {
        text: '2.x',
        collapsible: true,
        link: '/history/',
        children: getChildren('docs/history', '2_x'),
      },
      {
        text: '1.x',
        collapsible: true,
        link: '/history/',
        children: getChildren('docs/history', '1_x'),
      }
    ],
  },

]
