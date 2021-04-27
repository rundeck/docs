module.exports = [{
  title: 'Learning',
  collapsable: false,
  sidebarDepth: 2,
  children: [
    '/learning/',
    {
      title: 'Terminology',
      collapsable: true,
      path: '/learning/tutorial/terminology',
      sidebarDepth: 2,
      children: [
        '/learning/tutorial/terminology'
      ]
    },
    {
      title: 'How To',
      collapsable: true,
      path: '/learning/howto',
      sidebarDepth: 0,
      children: [
        '/learning/howto/migrate-to-rundeck-packages-repo',
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
