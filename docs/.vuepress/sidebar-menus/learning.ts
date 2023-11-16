import getChildren from '../getChildren'

export default [{
  text: 'Learning',
  collapsible: false,
  children: [
    '/learning/',
    {
      text: 'Getting Started',
      link: '/learning/getting-started/index',
      collapsible: true,
      children: [
        { link: '/learning/getting-started/index', text: 'Overview'},
        { link: '/learning/getting-started/nodes-overview.md', text: 'Introduction to Nodes' },
        { link: '/learning/getting-started/users-overview.md', text: 'Introduction to Users' },
        { link: '/learning/getting-started/secrets-overview.md', text: 'Introduction to Managing Secrets' },
        { link: '/learning/getting-started/acl-overview.md', text: 'Introduction to Access Control' },
        {
          text: 'Setup and Maintenance',
          collapsible: true,
          children: [
            { link: '/learning/getting-started/server-setup-overview.md', text: 'Overview of On Premise Server Setup' },
            { link: '/learning/getting-started/projects-overview.md', text: 'Setting up a Project' },
            { link: '/learning/getting-started/system-maintenance-overview.md', text: 'Overview of On Premise System Maintenance' },
            { link: '/learning/getting-started/runners-overview.md', text: 'Working with Runners in Process Automation' },
          ]
        },
        {
      	  text: 'Runbook Automation',
          collapsible: true,
          link: '/learning/getting-started/rba/index',
      	  children: [
      	  	{ link: '/learning/getting-started/rba/index', text: 'Getting Started with Runbook Automation'},
      	  	{ link: '/learning/getting-started/rba/runner-setup.md', text: 'Setting up a Runner'},
      	  	{ link: '/learning/getting-started/rba/node-setup.md', text: 'Adding a Node with Runner'},
      	  ]
    	},
        {
          text: 'Tutorial',
          collapsible: true,
          link: '/learning/tutorial/index',
          children: [
            '/learning/tutorial/index',
            '/learning/tutorial/creatingnodes',
            '/learning/tutorial/commands',
            '/learning/tutorial/jobs',
            '/learning/tutorial/users',
            '/learning/tutorial/acls',
            '/learning/tutorial/conclusion'
          ]
        },
        {
          text: 'Working with Jobs',
          link: '/learning/getting-started/jobs/index',
          collapsible: true,
          children: [
            '/learning/getting-started/jobs/index',
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
      text: 'How To',
      link: '/learning/howto/index',
      collapsible: true,
      children: [
        { link: '/learning/howto/index.md', text: 'Overview' },
        { link: '/learning/howto/welcome-project-starter.md', text: 'Welcome Projects' },
        {
          text: 'ACL Recipes',
          collapsible: true,
          link: '/learning/howto/acls/',
          children: [
            ...getChildren('docs/learning/', 'howto/acls')
          ]
        },
        {
          text: 'Administration',
          collapsible: true,
          children: [
            '/learning/howto/runner-service-windows.md',
            '/learning/howto/migrate-to-rundeck-packages-repo.md',
            '/learning/howto/install-centos.md',
            '/learning/howto/migrate-to-mysql.md',
            '/learning/howto/use-terraform-provider.md',
            '/learning/howto/terraform-jobs.md',
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
          text: 'Managing Nodes',
          collapsible: true,
          children: [
            '/learning/howto/ssh-on-linux-nodes.md',
            '/learning/howto/configuring-windows-nodes.md',
            '/learning/howto/revoke-ssh-keys.md',
            '/learning/howto/how2winrm-rundeck.md'
          ]
        },

        {
          text: 'Writing Jobs',
          collapsible: true,
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
          text: 'Integrating',
          collapsible: true,
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
            '/learning/howto/how2kube.md',
            '/learning/howto/actions-with-rba.md',
            '/learning/howto/events-with-rba.md'
          ]
        },
        {
          text: 'Customizing',
          collapsible: true,
          children: [
            '/learning/howto/plugin-bootstrap.md',
            '/learning/howto/custom-script-plugin-hello-world.md',
            '/learning/howto/java-plugin.md',
            '/learning/howto/groovy-plugin.md',
            '/learning/howto/how2extenddocker.md'
          ]
        },
        {
          text: 'Contributing',
          collapsible: true,
          children: [
            '/learning/howto/update-rundeck-docs.md',
            '/learning/howto/build-rundeck.md'

          ]
        }
      ]
    },
    {
      text: 'Solutions',
      collapsible: true,
      children: [
        {
          text: 'Automated Diagnostics',
          link: '/learning/solutions/automated-diagnostics/index',
          collapsible: true,
          children: [
            { link: '/learning/solutions/automated-diagnostics/index.md', text: 'Solution Summary' },
            { link: '/learning/solutions/automated-diagnostics/getting-started.md', text: 'Getting Started' },
            { link: '/learning/solutions/automated-diagnostics/automation-actions.md', text: 'Configuring Automation Actions' },
            { link: '/learning/solutions/automated-diagnostics/first-diagnostic-runbook.md', text: 'First Diagnostic Runbook' },
            { link: '/learning/solutions/automated-diagnostics/integrating-chat-tools.md', text: 'Integrating Chat Tools' },
            {
              text: 'Examples & Best Practices',
              link: '/learning/solutions/automated-diagnostics/examples-overview.md',
              collapsible: true,
              children: [
                { link: '/learning/solutions/automated-diagnostics/examples-overview.md', text: 'Examples Overview' },
                { link: '/learning/solutions/automated-diagnostics/examples/public-cloud-providers.md', text: 'Public Cloud Providers' },
                { link: '/learning/solutions/automated-diagnostics/examples/linux.md', text: 'Linux' },
                { link: '/learning/solutions/automated-diagnostics/examples/windows.md', text: 'Windows' },
                { link: '/learning/solutions/automated-diagnostics/examples/apis.md', text: 'SaaS & Internal API\'s' },
                {
                  text: 'Kubernetes',
                  link: '/learning/solutions/automated-diagnostics/examples/kubernetes',
                  collapsible: true,
                  children: [
                    { link: '/learning/solutions/automated-diagnostics/examples/kubernetes', text: 'Kubernetes Examples' },
                    { link: '/learning/solutions/automated-diagnostics/examples/k8s-logs-events.md', text: 'Pod Logs & K8s Events' },
                    { link: '/learning/solutions/automated-diagnostics/examples/k8s-app-debug-capture.md', text: 'App Debug State Capture' }
                  ]
                },
                { link: '/learning/solutions/automated-diagnostics/examples/databases.md', text: 'Databases' },
                { link: '/learning/solutions/automated-diagnostics/examples/network-devices.md', text: 'Network Devices' },
                { link: '/learning/solutions/automated-diagnostics/examples/observability-integrations.md', text: 'Observability Integrations' }
              ]
            },
            { link: '/learning/solutions/automated-diagnostics/sending-output-to-pagerduty.md', text: 'Sending Output to PagerDuty' },
            { link: '/learning/solutions/automated-diagnostics/integrating-with-event-orchestration.md', text: 'Integrating with Event Orchestration' },
            { link: '/learning/solutions/automated-diagnostics/simplifying-diagnostics.md', text: 'Simplifying Diagnostics Output' },
            { link: '/learning/solutions/automated-diagnostics/automation-beyond-triage.md', text: 'Automation Beyond Triage' },
            { link: '/learning/solutions/automated-diagnostics/feedback-faq.md', text: 'Feedback & FAQ' }
            //            {link: '/learning/solutions/auto-incident-kubernetes-logs.md', text: 'Example: Kubernetes Logs'},
            //            {link: '/learning/solutions/auto-diagnostics-github-script.md', text: 'Example: Raw Scripts'}
          ]
        }
      ]
    },
    {
      text: 'Terminology',
      link: '/learning/tutorial/terminology',
      collapsible: true,
      children: [
        '/learning/tutorial/terminology'
      ]
    }
  ]
}]
