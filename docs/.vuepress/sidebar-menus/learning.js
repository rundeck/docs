module.exports = [{
  title: 'Learning',
  collapsable: false,
  sidebarDepth: 2,
  children: [
    '/learning/',
    '/learning/tutorial/terminology',
    {
      title: 'Tutorials',
      collapsable: true,
      path: '/learning/tutorial',
      sidebarDepth: 1,
      children: [
        '/learning/tutorial/sample'
      ]
    },
    ['/learning/howto/','How To Articles']
  ]
}]
