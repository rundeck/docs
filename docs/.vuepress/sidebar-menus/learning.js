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
              '/learning/howto/workinglogs.md',
              '/learning/howto/S3-minio.md',
              '/learning/howto/how2scm.md',
              '/learning/howto/egress-proxy.md'
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
      	  title: 'Working with Jobs',
      	  collapsable: true,
      	  sidebarDepth: 0,
      	  children: [
      	 	  '/learning/howto/jobs/what-is-a-job.md',
      	 	  '/learning/howto/jobs/pieces-of-a-job.md'
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
              '/learning/howto/log4shell.md',
              '/learning/howto/use-roi-metrics.md',
              '/learning/howto/env-in-notifications.md'
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
              '/learning/howto/vault-integration.md',
              '/learning/howto/howtojenkins.md',
              '/learning/howto/how2kube.md'
          ]
        },
        {
          title: 'Customizing',
          collapsable: true,
          sidebarDepth: 0,
          children: [
            '/learning/howto/plugin-bootstrap.md',
            '/learning/howto/custom-script-plugin-hello-world.md',
            '/learning/howto/java-plugin.md',
            '/learning/howto/how2extenddocker.md'
          ]
        },
        {
          title: 'Contributing',
          collapsable: true,
          sidebarDepth: 0,
          children: [
            '/learning/howto/update-rundeck-docs.md',
            '/learning/howto/build-rundeck.md'

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
            ['/learning/solutions/automated-diagnostics/getting-started.md', 'Getting Started'],
            ['/learning/solutions/automated-diagnostics/automation-actions.md', 'Configuring Automation Actions'],
            ['/learning/solutions/automated-diagnostics/first-diagnostic-runbook.md', 'First Diagnostic Runbook'],
            ['/learning/solutions/automated-diagnostics/integrating-chat-tools.md', 'Integrating Chat Tools'],
            {
                title: 'Examples & Best Practices',
                path: '/learning/solutions/automated-diagnostics/examples-overview',
                collapsable: true,
                sidebarDepth: 0,
                children: [
                    ['/learning/solutions/automated-diagnostics/examples/public-cloud-providers.md','Public Cloud Providers'],
                    ['/learning/solutions/automated-diagnostics/examples/linux.md','Linux'],
                    ['/learning/solutions/automated-diagnostics/examples/windows.md','Windows'],
                    ['/learning/solutions/automated-diagnostics/examples/apis.md','SaaS & Internal API\'s'],
                    ['/learning/solutions/automated-diagnostics/examples/kubernetes.md','Kubernetes'],
                    ['/learning/solutions/automated-diagnostics/examples/databases.md','Databases'],
                    ['/learning/solutions/automated-diagnostics/examples/network-devices.md','Network Devices'],
                    ['/learning/solutions/automated-diagnostics/examples/observability-integrations.md','Observability Integrations']
                ]
            },
            ['/learning/solutions/automated-diagnostics/sending-output-to-pagerduty.md','Sending Output to PagerDuty'],
            ['/learning/solutions/automated-diagnostics/integrating-with-event-orchestration.md', 'Integrating with Event Orchestration'],
            ['/learning/solutions/automated-diagnostics/simplifying-diagnostics.md','Simplifying Diagnostics Output'],
            ['/learning/solutions/automated-diagnostics/automation-beyond-triage.md','Automation Beyond Triage'],
            ['/learning/solutions/automated-diagnostics/feedback-faq.md', 'Feedback & FAQ']
//            ['/learning/solutions/auto-incident-kubernetes-logs.md','Example: Kubernetes Logs'],
//            ['/learning/solutions/auto-diagnostics-github-script.md','Example: Raw Scripts']
          ]
        }
      ]
    }
  ]
}]
