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
      sidebarDepth: 0,
      children: [
        '/learning/tutorial/sample'
      ]
    },
    {
      title: 'How To',
      collapsable: true,
      path: '/learning/howto',
      sidebarDepth: 0,
      children: [
        {
          title: 'Customizing',
          collapsable: true,
          sidebarDepth: 0,
          children: [
            '/learning/howto/custom-script-plugin-hello-world',
            '/learning/howto/java-plugin'
          ]
        }
      ]
    },
  ]
}]
