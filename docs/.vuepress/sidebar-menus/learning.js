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
      {path: '/learning/getting-started/nodes-overview.md', title: 'Introduction to Nodes'},
    	{path: '/learning/getting-started/users-overview.md', title: 'Introduction to Users'},
    	{path: '/learning/getting-started/secrets-overview.md', title: 'Introduction to Managing Secrets'},
    	{path: '/learning/getting-started/acl-overview.md', title: 'Introduction to Access Control'},
    	{
      	  title: 'Setup and Maintenance',
          collapsable: true,
      	  sidebarDepth: 1,
      	  children: [
        	{path: '/learning/getting-started/server-setup-overview.md', title: 'Overview of On Premise Server Setup'},
    		{path: '/learning/getting-started/projects-overview.md', title: 'Setting up a Project'},
    		{path: '/learning/getting-started/system-maintenance-overview.md', title: 'Overview of On Premise System Maintenance'},
    		{path: '/learning/getting-started/runners-overview.md', title: 'Working with Runners in Process Automation'},
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
        {path: '/learning/howto/overview.md', title: 'Overview'},
        {path: '/learning/howto/welcome-project-starter.md', title: 'Welcome Projects'},
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
            '/learning/howto/groovy-plugin.md',
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
            {path: '/learning/solutions/automated-diagnostics/solution-overview.md', title: 'Solution Summary'},
            {path: '/learning/solutions/automated-diagnostics/getting-started.md', title:  'Getting Started'},
            {path: '/learning/solutions/automated-diagnostics/automation-actions.md', title:  'Configuring Automation Actions'},
            {path: '/learning/solutions/automated-diagnostics/first-diagnostic-runbook.md', title:  'First Diagnostic Runbook'},
            {path: '/learning/solutions/automated-diagnostics/integrating-chat-tools.md', title:  'Integrating Chat Tools'},
            {
                title: 'Examples & Best Practices',
                path: '/learning/solutions/automated-diagnostics/examples-overview',
                collapsable: false,
                sidebarDepth: 0,
                children: [
                    {path: '/learning/solutions/automated-diagnostics/examples/public-cloud-providers.md', title: 'Public Cloud Providers'},
                    {path: '/learning/solutions/automated-diagnostics/examples/linux.md', title: 'Linux'},
                    {path: '/learning/solutions/automated-diagnostics/examples/windows.md', title: 'Windows'},
                    {path: '/learning/solutions/automated-diagnostics/examples/apis.md', title: 'SaaS & Internal API\'s'},
                    {
                        title: 'Kubernetes',
                        path: '/learning/solutions/automated-diagnostics/examples/kubernetes',
                        collapsable: true,
                        sidebarDepth: 0,
                        children: [
                            {path: '/learning/solutions/automated-diagnostics/examples/k8s-logs-events.md', title: 'Pod Logs & K8s Events'},
                            {path: '/learning/solutions/automated-diagnostics/examples/k8s-app-debug-capture.md', title:  'App Debug State Capture'}
                        ]
                    },
                    {path: '/learning/solutions/automated-diagnostics/examples/databases.md', title: 'Databases'},
                    {path: '/learning/solutions/automated-diagnostics/examples/network-devices.md', title: 'Network Devices'},
                    {path: '/learning/solutions/automated-diagnostics/examples/observability-integrations.md', title: 'Observability Integrations'}
                ]
            },
            {path: '/learning/solutions/automated-diagnostics/sending-output-to-pagerduty.md', title: 'Sending Output to PagerDuty'},
            {path: '/learning/solutions/automated-diagnostics/integrating-with-event-orchestration.md', title:  'Integrating with Event Orchestration'},
            {path: '/learning/solutions/automated-diagnostics/simplifying-diagnostics.md', title: 'Simplifying Diagnostics Output'},
            {path: '/learning/solutions/automated-diagnostics/automation-beyond-triage.md', title: 'Automation Beyond Triage'},
            {path: '/learning/solutions/automated-diagnostics/feedback-faq.md', title:  'Feedback & FAQ'}
//            {path: '/learning/solutions/auto-incident-kubernetes-logs.md', title: 'Example: Kubernetes Logs'},
//            {path: '/learning/solutions/auto-diagnostics-github-script.md', title: 'Example: Raw Scripts'}
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
