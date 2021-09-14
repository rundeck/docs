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
        ['/learning/howto/overview.md','Overview'],
        ['/learning/howto/welcome-project-starter.md','Welcome Projects'],
        {
          title: 'Administration',
          collapsable: true,
          sidebarDepth: 0,
          children: [
              '/learning/howto/migrate-to-rundeck-packages-repo.md',
              '/learning/howto/install-centos.md',
              '/learning/howto/migrate-to-mysql.md',
              '/learning/howto/use-terraform-provider.md'
          ]
        },
        {
          title: 'Managing Nodes',
          collapsable: true,
          sidebarDepth: 0,
          children: [
              '/learning/howto/ssh-on-linux-nodes.md',
              '/learning/howto/configuring-windows-nodes.md'
          ]
        },
        {
          title: 'Writing Jobs',
          collapsable: true,
          sidebarDepth: 0,
          children: [
              '/learning/howto/use-example-jobs.md',
              '/learning/howto/passing-variables.md',
              '/learning/howto/calling-apis.md'
          ]
        },
        {
          title: 'Integrating',
          collapsable: true,
          sidebarDepth: 0,
          children: [
              '/learning/howto/using-webhooks.md',
              '/learning/howto/pagerduty-notification.md',
              '/learning/howto/using-ansible.md',
              '/learning/howto/config-sn-nodesource.md',
              '/learning/howto/configure-gcp-plugins.md'
          ]
        },
        {
          title: 'Customizing',
          collapsable: true,
          sidebarDepth: 0,
          children: [
            '/learning/howto/custom-script-plugin-hello-world.md',
            '/learning/howto/java-plugin.md'
          ]
        },
        {
          title: 'Contributing',
          collapsable: true,
          sidebarDepth: 0,
          children: [
            '/learning/howto/update-rundeck-docs.md'
          ]
        }
      ]
    },
  ]
}]
