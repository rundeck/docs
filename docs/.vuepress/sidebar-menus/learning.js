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
              '/learning/howto/use-terraform-provider.md',
              '/learning/howto/learn-rd-cli.md',
              '/learning/howto/acl_basic_examples.md',
              '/learning/howto/apache2-proxy-gssapi.md',              
          ]
        },
        {
          title: 'Managing Nodes',
          collapsable: true,
          sidebarDepth: 0,
          children: [
              '/learning/howto/ssh-on-linux-nodes.md',
              '/learning/howto/configuring-windows-nodes.md',
              '/learning/howto/revoke-ssh-keys.md'
          ]
        },
        {
          title: 'Writing Jobs',
          collapsable: true,
          sidebarDepth: 0,
          children: [
              '/learning/howto/use-example-jobs.md',
              '/learning/howto/passing-variables.md',
              '/learning/howto/calling-apis.md',
              '/learning/howto/log4shell.md'
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
              '/learning/howto/configure-gcp-plugins.md',
              '/learning/howto/sn-midserver.md',
              '/learning/howto/rundeck-exporter.md',
              '/learning/howto/vault-integration.md'
          ]
        },
        {
          title: 'Customizing',
          collapsable: true,
          sidebarDepth: 0,
          children: [
            '/learning/howto/plugin-bootstrap.md',
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
    {
      title: 'Solutions',
      collapsable: true,
      sidebarDepth: 0,
      children: [
        {
          title: 'Automated Diagnostics',
          path: '/learning/solutions/automated-diagnostics/solution-overview',
          collapsable: true,
          sidebarDepth: 0,
          children: [
            ['/learning/solutions/automated-diagnostics/solution-overview.md','Solution Summary'],
            ['/learning/solutions/automated-diagnostics/getting-started.md', '1. Getting Started'],
            ['/learning/solutions/automated-diagnostics/tours.md', '2. Following the Tours'],
            ['/learning/solutions/automated-diagnostics/jobs.md', '3. Using the Prebuilt Jobs'],
            ['/learning/solutions/automated-diagnostics/automation-actions.md', '4. Integrating with Automation Actions'],
            ['/learning/solutions/automated-diagnostics/linux-diagnostics-example.md','5. Example: Linux Host Diagnostics'],
            ['/learning/solutions/automated-diagnostics/feedback-faq.md', '6. Feedback & FAQ']
//            ['/learning/solutions/auto-incident-kubernetes-logs.md','Example: Kubernetes Logs'],
//            ['/learning/solutions/auto-diagnostics-github-script.md','Example: Raw Scripts']
          ]
        }
      ]
    }
  ]
}]
