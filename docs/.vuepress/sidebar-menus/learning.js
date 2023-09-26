module.exports = [{
  title: 'Learning',
  collapsable: false,
  sidebarDepth: 2,
  children: [
    '/learning/',
    {
      title: 'Getting Started',
      collapsable: true,
      path: '/learning/getting-started/overview',
      sidebarDepth: 0,
      children: [
        ['/learning/getting-started/nodes-overview.md','Introduction to Nodes'],
    	['/learning/getting-started/users-overview.md','Introduction to Users'],
    	['/learning/getting-started/secrets-overview.md','Introduction to Managing Secrets'],
    	['/learning/getting-started/acl-overview.md','Introduction to Access Control'],
    	{
      	  title: 'Setup and Maintenance',
          collapsable: true,
      	  sidebarDepth: 1,
      	  children: [
        	['/learning/getting-started/server-setup-overview.md','Overview of On Premise Server Setup'],
    		['/learning/getting-started/projects-overview.md','Setting up a Project'],
    		['/learning/getting-started/system-maintenance-overview.md','Overview of On Premise System Maintenance'],
    		['/learning/getting-started/runners-overview.md','Working with Runners in Process Automation'],
      	  ]
    	},
    	{
      	  title: 'Runbook Automation',
          collapsable: true,
      	  sidebarDepth: 1,
      	  children: [
        	['/learning/getting-started/rba/runner-setup.md','Setting up a Runner'],
    		['/learning/getting-started/rba/node-setup.md','Adding a Node with Runner'],
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
        title: 'Working with Jobs',
        collapsable: true,
        path: '/learning/getting-started/jobs/overview',
        sidebarDepth: 2,
        children: [
           '/learning/getting-started/jobs/what-is-a-job.md',
           '/learning/getting-started/jobs/pieces-of-a-job.md',
           '/learning/getting-started/jobs/how-to-run-a-job.md',
           '/learning/getting-started/jobs/workflow-strategies.md',
           '/learning/getting-started/jobs/node-sources.md',
           '/learning/getting-started/jobs/sharing-jobs.md',
           '/learning/getting-started/jobs/job-options.md',
           '/learning/getting-started/jobs/creating-a-job.md',
           '/learning/getting-started/jobs/job-plugins.md',
           '/learning/getting-started/jobs/commercial-job-features.md'
        ]
      }
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
              '/learning/howto/elk-integration.md',
              '/learning/howto/acl_basic_examples.md',
              '/learning/howto/apache2-proxy-gssapi.md',
              '/learning/howto/workinglogs.md',
              '/learning/howto/S3-minio.md',
              '/learning/howto/how2scm.md',
              '/learning/howto/egress-proxy.md',
              '/learning/howto/how2-terra-rd-aws.md',
              '/learning/howto/how2-terra-rd-eks.md',
              '/learning/howto/troubleshooting.md'
          ]
        },
        {
          title: 'Managing Nodes',
          collapsable: true,
          sidebarDepth: 0,
          children: [
              '/learning/howto/ssh-on-linux-nodes.md',
              '/learning/howto/configuring-windows-nodes.md',
              '/learning/howto/revoke-ssh-keys.md',
              '/learning/howto/how2winrm-rundeck.md'
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
              '/learning/howto/env-in-notifications.md',
              '/learning/howto/rabbitmq-diag.md'
          ]
        },
        {
          title: 'Integrating',
          collapsable: true,
          sidebarDepth: 0,
          children: [
              '/learning/howto/using-webhooks.md',
              '/learning/howto/cross-account-aws-ssm.md',
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
                collapsable: false,
                sidebarDepth: 0,
                children: [
                    ['/learning/solutions/automated-diagnostics/examples/public-cloud-providers.md','Public Cloud Providers'],
                    ['/learning/solutions/automated-diagnostics/examples/linux.md','Linux'],
                    ['/learning/solutions/automated-diagnostics/examples/windows.md','Windows'],
                    ['/learning/solutions/automated-diagnostics/examples/apis.md','SaaS & Internal API\'s'],
                    {
                        title: 'Kubernetes',
                        path: '/learning/solutions/automated-diagnostics/examples/kubernetes',
                        collapsable: true,
                        sidebarDepth: 0,
                        children: [
                            ['/learning/solutions/automated-diagnostics/examples/k8s-logs-events.md','Pod Logs & K8s Events'],
                            ['/learning/solutions/automated-diagnostics/examples/k8s-app-debug-capture.md', 'App Debug State Capture']
                        ]
                    },
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
    },
    {
      title: 'Terminology',
      collapsable: true,
      path: '/learning/tutorial/terminology',
      sidebarDepth: 2,
      children: [
        '/learning/tutorial/terminology'
      ]
    }
  ]
}]
