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
      title: 'Tutorial',
      collapsable: true,
      sidebarDepth: 0,
      children: [
        '/learning/tutorial/preparing',
        '/learning/tutorial/creatingnodes',
        '/learning/tutorial/commands',
        '/learning/tutorial/jobs',
        '/learning/tutorial/users',
        '/learning/tutorial/acls',
        '/learning/tutorial/conclusion'
      ]
    },
    {
      title: 'How To',
      collapsable: true,
      path: '/learning/howto/overview',
      sidebarDepth: 0,
      children: [
        '/learning/howto/overview',
        {
          title: 'Setup / Installation',
          collapsable: true,
          sidebarDepth: 0,
          children: [
              '/learning/howto/migrate-to-rundeck-packages-repo'
          ]
        },
        {
          title: 'Writing Jobs',
          collapsable: true,
          sidebarDepth: 0,
          children: [
              '/learning/howto/passing-variables',
              '/learning/howto/calling-apis'
          ]
        },
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
