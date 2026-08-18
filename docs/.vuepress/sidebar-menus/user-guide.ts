export default [{
  text: 'User Guide',
  collapsible: false,
  link: '/manual/',
  children: [
    { link: '/manual/', text: 'User Guide Overview' },
    {
      text: "Projects",
      collapsible: true,
      link: '/manual/projects/',
      children: [
        '/manual/projects/',
        '/manual/projects/project-create',
        '/manual/projects/configuration',
        {
          text: 'SCM',
          collapsible: true,
          children: [
            '/manual/projects/scm/',
            '/manual/projects/scm/git',
            '/manual/projects/scm/job-replication'
          ]
        },
        '/manual/projects/project-readme',
        '/manual/projects/project-motd',
        '/manual/projects/plugin-control',
        '/manual/projects/project-archive',
        '/manual/projects/project-delete',
        '/manual/projects/execution-history-cleaner',
        '/manual/project-settings'
      ]
    },
    {
      text: 'Jobs',
      collapsible: true,
      link: '/manual/jobs/index.md',
      children: [
        { text: 'Overview', link: '/manual/jobs/index.md' },
        '/manual/jobs/creating-jobs',
        '/manual/jobs/ai-generated-runbooks.md',
        '/manual/jobs/job-workflows',
        '/manual/jobs/job-options',
        '/manual/jobs/job-notifications',
        '/manual/jobs/job-variables',
        {text: 'Conditional Logic', link: '/manual/jobs/conditional-logic'},
        {
          text: 'Job Step Plugins',
          link: '/manual/jobs/job-plugins/index.md',
          collapsible: true,
          children: [
            { text: 'Overview', link: '/manual/jobs/job-plugins/index.md' },
            {
              text: 'Node Steps',
              collapsible: true,
              children: [
                { text: 'AWS EC2', link: '/manual/jobs/job-plugins/node-steps/aws', icon: '/assets/img/aws-icon.png' },
                { text: 'AWS ECS', link: '/manual/jobs/job-plugins/node-steps/aws-ecs', icon: '/assets/img/aws-icon.png' },
                { text: 'AWS Lambda', link: '/manual/jobs/job-plugins/node-steps/aws-lambda', icon: '/assets/img/aws-icon.png' },
                { text: 'AWS S3', link: '/manual/jobs/job-plugins/node-steps/aws-s3', icon: '/assets/img/aws-icon.png' },
                { text: 'Azure Storage', link: '/manual/jobs/job-plugins/node-steps/azure-storage', icon: '/assets/img/azure-logo.png' },
                { text: 'Azure VM', link: '/manual/jobs/job-plugins/node-steps/azure', icon: '/assets/img/azure-logo.png' },
                { text: 'Command', link: '/manual/jobs/job-plugins/node-steps/builtin.md#command-step', icon: '/assets/img/command-icon.png' },
                { text: 'Copy File', link: '/manual/jobs/job-plugins/node-steps/builtin.md#copy-file-step', icon: '/assets/img/file-icon.png' },
                { text: 'Data Step', link: '/manual/jobs/job-plugins/node-steps/builtin.md#data-node-step', icon: '/assets/img/pd-icon.png' },
                { text: 'Datadog', link: '/manual/jobs/job-plugins/node-steps/datadog', icon: '/assets/img/datadog.svg' },
                { text: 'Docker', link: '/manual/jobs/job-plugins/node-steps/docker', icon: '/assets/img/docker-logo.png' },
                { text: 'Google Cloud Compute', link: '/manual/jobs/job-plugins/node-steps/gcp', icon: '/assets/img/gcp-icon.png' },
                { text: 'HTTP Request', link: '/manual/jobs/job-plugins/node-steps/builtin.md#http-request-node-step', icon: '/assets/img/http-icon.png' },
                { text: 'Kubernetes (Commercial)', 
                  link: '/manual/jobs/job-plugins/node-steps/kubernetes-overview.md',
                  collapsible: true,
                  icon: '/assets/img/kubernetes-icon.png',
                  children: [
                    { text: 'Overview', link: '/manual/jobs/job-plugins/node-steps/kubernetes-overview.md', icon: '/assets/img/kubernetes-icon.png' },
                    { text: 'Kubernetes Debug', link: '/manual/jobs/job-plugins/node-steps/kubernetes-debug-plugins', icon: '/assets/img/kubernetes-icon.png' },
                    { text: 'Kubernetes Deployments', link: '/manual/jobs/job-plugins/node-steps/kubernetes-deployment-plugins', icon: '/assets/img/kubernetes-icon.png' },
                    { text: 'Kubernetes Job', link: '/manual/jobs/job-plugins/node-steps/kubernetes-job-plugins', icon: '/assets/img/kubernetes-icon.png' },
                    { text: 'Kubernetes Pod', link: '/manual/jobs/job-plugins/node-steps/kubernetes-pod-plugins', icon: '/assets/img/kubernetes-icon.png' },
                    { text: 'Kubernetes Service', link: '/manual/jobs/job-plugins/node-steps/kubernetes-service-plugins', icon: '/assets/img/kubernetes-icon.png' },
                    { text: 'Kubernetes StatefulSet', link: '/manual/jobs/job-plugins/node-steps/kubernetes-statefulset-plugins', icon: '/assets/img/kubernetes-icon.png' },
                    { text: 'Kubernetes Cluster Create Object', link: '/manual/jobs/job-plugins/node-steps/kubernetes-create-object', icon: '/assets/img/kubernetes-icon.png' },
                    { text: 'Kubernetes Cluster Delete Object', link: '/manual/jobs/job-plugins/node-steps/kubernetes-delete-object', icon: '/assets/img/kubernetes-icon.png' },
                    { text: 'Kubernetes Cluster Describe Object', link: '/manual/jobs/job-plugins/node-steps/kubernetes-describe-object', icon: '/assets/img/kubernetes-icon.png' },
                    { text: 'Kubernetes Cluster List Objects', link: '/manual/jobs/job-plugins/node-steps/kubernetes-list-objects', icon: '/assets/img/kubernetes-icon.png' },
                    { text: 'Kubernetes Cluster Object Logs', link: '/manual/jobs/job-plugins/node-steps/kubernetes-object-logs', icon: '/assets/img/kubernetes-icon.png' },
                    { text: 'Kubernetes Cluster Run Command', link: '/manual/jobs/job-plugins/node-steps/kubernetes-run-command', icon: '/assets/img/kubernetes-icon.png' },
                    { text: 'Kubernetes Cluster Run Script', link: '/manual/jobs/job-plugins/node-steps/kubernetes-run-script', icon: '/assets/img/kubernetes-icon.png' },
                    { text: 'Kubernetes Cluster Update Object', link: '/manual/jobs/job-plugins/node-steps/kubernetes-update-object', icon: '/assets/img/kubernetes-icon.png' }
                  ],
                },
                { text: 'Jira', link: '/manual/jobs/job-plugins/node-steps/jira', icon: '/assets/img/jira-icon.svg' },
                { text: 'Local Command Step', link: '/manual/jobs/job-plugins/node-steps/builtin.md#local-command-step', icon: '/assets/img/command-icon.png' },
                { text: 'Loop Script', link: '/manual/jobs/job-plugins/node-steps/loop-plugins', icon: '/assets/img/pd-icon.png' },
                { text: 'nixy', link: '/manual/jobs/job-plugins/node-steps/nixy', icon: '/assets/img/unix-icon.png' },
                { text: 'Oracle Cloud', link: '/manual/jobs/job-plugins/node-steps/oracle', icon: '/assets/img/oracle-icon.png' },
                { text: 'PS1 File Grep', link: '/manual/jobs/job-plugins/node-steps/ps1-file-grep.md', icon: '/assets/img/powershell-icon.png' },
                { text: 'PS1 File Wait', link: '/manual/jobs/job-plugins/node-steps/ps1-file-wait.md', icon: '/assets/img/powershell-icon.png' },
                { text: 'PS1 Remove Scheduled Job', link: '/manual/jobs/job-plugins/node-steps/ps1-scheduled-jobs-remove.md', icon: '/assets/img/powershell-icon.png' },
                { text: 'PS1 Scheduled Jobs', link: '/manual/jobs/job-plugins/node-steps/ps1-scheduled-jobs-list.md', icon: '/assets/img/powershell-icon.png' },
                { text: 'Script', link: '/manual/jobs/job-plugins/node-steps/builtin.md#script-step', icon: '/assets/img/code-icon.png' },
                { text: 'Script File', link: '/manual/jobs/job-plugins/node-steps/builtin.md#script-file-step', icon: '/assets/img/code-icon.png' },
                { text: 'Script URL', link: '/manual/jobs/job-plugins/node-steps/builtin.md#script-url-step', icon: '/assets/img/code-icon.png' },
                { text: 'Sensu', link: '/manual/jobs/job-plugins/node-steps/sensu', icon: '/assets/img/sensu-icon.jpg' },
                { text: 'SQL', link: '/manual/jobs/job-plugins/node-steps/sqlrunner', icon: '/assets/img/sql-icon.png' },
                { text: 'VMware', link: '/manual/jobs/job-plugins/node-steps/vmware', icon: '/assets/img/VMware-logo.png' }
              ]
            },
            {
              text: 'Workflow Steps',
              collapsible: true,
              children: [
                { text: 'Ansible Module', link: '/manual/jobs/job-plugins/workflow-steps/builtin.md#ansible-module', icon: '/assets/img/ansible-icon.png' },
                { text: 'Ansible Playbook', link: '/manual/jobs/job-plugins/workflow-steps/builtin.md#ansible-playbook', icon: '/assets/img/ansible-icon.png' },
                { text: 'Ansible Playbook Inline', link: '/manual/jobs/job-plugins/workflow-steps/builtin.md#ansible-playbook-inline', icon: '/assets/img/ansible-icon.png' },
                { text: 'AWS Athena', link: '/manual/jobs/job-plugins/workflow-steps/amazon-athena', icon: '/assets/img/aws-icon.png' },
                { text: 'AWS Autoscaling-Groups', link: '/manual/jobs/job-plugins/workflow-steps/aws-autoscaling-groups', icon: '/assets/img/aws-icon.png' },
                { text: 'AWS CloudWatch', link: '/manual/jobs/job-plugins/workflow-steps/aws-cloudwatch', icon: '/assets/img/aws-icon.png' },
                { text: 'AWS ECS & Fargate', link: '/manual/jobs/job-plugins/workflow-steps/aws-ecs-fargate', icon: '/assets/img/aws-icon.png' },
                { text: 'AWS EC2', link: '/manual/jobs/job-plugins/workflow-steps/aws', icon: '/assets/img/aws-icon.png' },
                { text: 'AWS ELB', link: '/manual/jobs/job-plugins/workflow-steps/aws-elb-workflow-plugin', icon: '/assets/img/aws-icon.png' },
                { text: 'AWS Lambda', link: '/manual/jobs/job-plugins/workflow-steps/aws-lambda', icon: '/assets/img/aws-icon.png' },
                { text: 'AWS RDS', link: '/manual/jobs/job-plugins/workflow-steps/aws-rds', icon: '/assets/img/aws-icon.png' },
                { text: 'AWS VPC', link: '/manual/jobs/job-plugins/workflow-steps/aws-vpc', icon: '/assets/img/aws-icon.png' },
                { text: 'Azure VM', link: '/manual/jobs/job-plugins/workflow-steps/azure.md#azure-vm-create', icon: '/assets/img/azure-logo.png' },
                { text: 'Executions Delete', link: '/manual/jobs/job-plugins/workflow-steps/builtin.md#executions-delete', icon: '/assets/img/pd-icon.png' },
                { text: 'Executions Retry', link: '/manual/jobs/job-plugins/workflow-steps/builtin.md#executions-retry', icon: '/assets/img/pd-icon.png' },
                { text: 'Executions Search', link: '/manual/jobs/job-plugins/workflow-steps/builtin.md#executions-search', icon: '/assets/img/pd-icon.png' },
                { text: 'Executions Wait Result', link: '/manual/jobs/job-plugins/workflow-steps/builtin.md#executions-wait-result', icon: '/assets/img/pd-icon.png' },
                { text: 'Flow Control', link: '/manual/jobs/job-plugins/workflow-steps/builtin.md#flow-control', icon: '/assets/img/pd-icon.png' },
                { text: 'Global Variable', link: '/manual/jobs/job-plugins/workflow-steps/builtin.md#global-variable', icon: '/assets/img/pd-icon.png' },
                { text: 'Google Cloud Compute', link: '/manual/jobs/job-plugins/workflow-steps/gcp.md#gcp-vm-start', icon: '/assets/img/gcp-icon.png' },
                { text: 'Google Cloud SQL', link: '/manual/jobs/job-plugins/workflow-steps/gcp.md#gcp-sqlinstance-restart', icon: '/assets/img/gcp-icon.png' },
                { text: 'Google Cloud VPC', link: '/manual/jobs/job-plugins/workflow-steps/gcp.md#gcp-enable-vpc-network-peering', icon: '/assets/img/gcp-icon.png' },
                { text: 'Data Step', link: '/manual/jobs/job-plugins/workflow-steps/builtin.md#data-step', icon: '/assets/img/pd-icon.png' },
                { text: 'Datadog', link: '/manual/jobs/job-plugins/workflow-steps/datadog', icon: '/assets/img/datadog-icon.png' },
                { text: 'File Transfer', link: '/manual/jobs/job-plugins/workflow-steps/file-transfer', icon: '/assets/img/file-icon.png' },
                { text: 'Github', link: '/manual/jobs/job-plugins/workflow-steps/github', icon: '/assets/img/github-icon.png' },
                { text: 'HTTP Request', link: '/manual/jobs/job-plugins/workflow-steps/http-request', icon: '/assets/img/http-icon.png' },
                { text: 'Jira', link: '/manual/jobs/job-plugins/workflow-steps/jira', icon: '/assets/img/jira-icon.svg' },
                { text: 'Job State Conditional', link: '/manual/jobs/job-plugins/workflow-steps/builtin.md#job-state-conditional', icon: '/assets/img/pd-icon.png' },
                { text: 'Log Data', link: '/manual/jobs/job-plugins/workflow-steps/builtin.md#log-data-step', icon: '/assets/img/pd-icon.png' },
                { text: 'Loop Script', link: '/manual/jobs/job-plugins/workflow-steps/loop-plugins', icon: '/assets/img/pd-icon.png' },
                { text: 'MongoDB Command Runner', link: '/manual/jobs/job-plugins/workflow-steps/mongodb', icon: '/assets/img/mongodb-logo.png' },
                { text: 'Oracle', link: '/manual/jobs/job-plugins/workflow-steps/oracle', icon: '/assets/img/oracle-icon.png' },
                { text: 'PagerDuty', link: '/manual/jobs/job-plugins/workflow-steps/pagerduty', icon: '/assets/img/pd-icon.png' },
                { text: 'Progress Badge', link: '/manual/jobs/job-plugins/workflow-steps/progress-badge', icon: '/assets/img/pd-icon.png' },
                { text: 'Refresh Project Nodes', link: '/manual/jobs/job-plugins/workflow-steps/builtin.md#refresh-project-nodes', icon: '/assets/img/pd-icon.png' },
                { text: 'RSS Feed', link: '/manual/jobs/job-plugins/workflow-steps/rss-feed-plugin', icon: '/assets/img/rss-icon.png' },
                { text: 'Sensu', link: '/manual/jobs/job-plugins/workflow-steps/sensu', icon: '/assets/img/sensu-icon.jpg' },
                { text: 'ServiceNow', link: '/manual/jobs/job-plugins/workflow-steps/servicenow', icon: '/assets/img/snow-icon.png' },
                { text: 'Sumo Logic', link: '/manual/jobs/job-plugins/workflow-steps/sumo-logic', icon: '/assets/img/sumo-icon.png' },
                { text: 'VMware', link: '/manual/jobs/job-plugins/workflow-steps/vmware', icon: '/assets/img/VMware-logo.png' },
                { text: 'WinRM', link: '/manual/jobs/job-plugins/workflow-steps/winrm-check', icon: '/assets/img/windows-logo.png' }
              ]
            }
          ]
        },
        {
          text: 'Execution Control & Recovery (Commercial)',
          collapsible: true,
          children: [
            '/manual/jobs/job-queue.md',
            '/manual/jobs/job-resume.md',
            '/manual/jobs/job-retry-failed-nodes.md',
          ]
        },
        {
          text: 'Log Filters',
          collapsible: true,
          link: '/manual/log-filters/',
          children: [
            '/manual/log-filters/',
            '/manual/log-filters/key-value-data.md',
            '/manual/log-filters/quiet-output.md',
            '/manual/log-filters/progress-badge.md',
            '/manual/log-filters/highlight-output.md',
            '/manual/log-filters/render-formatted-data.md',
            '/manual/log-filters/mask-passwords.md',
            '/manual/log-filters/json-jq.md',
            '/manual/log-filters/multi-line-regex.md',
            '/manual/log-filters/loop-plugins.md'
          ]
        },
        {
          text: 'Notifications',
          collapsible: true,
          link: '/manual/notifications/interface-instructions.md',
          children: [
            '/manual/notifications/interface-instructions.md',
            '/manual/notifications/email.md',
            '/manual/notifications/pagerduty.md',
            '/manual/notifications/slack.md',
            '/manual/notifications/datadog.md',
            '/manual/notifications/sensu.md',
            '/manual/notifications/servicenow.md',
            '/manual/notifications/webhooks.md',
            '/manual/notifications/jira.md'
          ]
        },
        {
          text: 'Job Analytics & Reporting',
          collapsible: true,
          children: [
            '/manual/jobs/result-data.md',
            '/manual/jobs/roi-metrics.md',
          ]
        },
        {
          text: 'Workflow Strategies',
          link: '/manual/jobs/workflow-strategies/index.md',
          collapsible: true,
          children: [
            { text: 'Node First, Sequential, Parallel', link: '/manual/jobs/workflow-strategies/index.md' },
            { text: 'Ruleset (Commercial)', link: '/manual/jobs/workflow-strategies/ruleset.md' }
          ]
        }
      ]
    },
    {
      text: 'Nodes',
      collapsible: true,
      link: '/manual/05-nodes',
      children: [
        {text: "Overview", link: '/manual/05-nodes'},
        {
          text: 'Node Sources',
          collapsible: true,
          link: '/manual/projects/resource-model-sources/',
          children: [
            '/manual/projects/resource-model-sources/',
            '/manual/projects/resource-model-sources/aws',
            '/manual/projects/resource-model-sources/aws-eks',
            '/manual/projects/resource-model-sources/azure',
            '/manual/projects/resource-model-sources/azure-aks',
            '/manual/projects/resource-model-sources/datadog',
            { text: 'Docker', link: '/manual/projects/resource-model-sources/docker' },
            '/manual/projects/resource-model-sources/ecs-fargate',
            '/manual/projects/resource-model-sources/gcp',
            '/manual/projects/resource-model-sources/gcp-gke',
            '/manual/projects/resource-model-sources/kubernetes',
            '/manual/projects/resource-model-sources/builtin',
            '/manual/projects/resource-model-sources/cluster',
            '/manual/projects/resource-model-sources/oracle',
            '/manual/projects/resource-model-sources/node-wizard',
            '/manual/projects/resource-model-sources/resource-editor',
            '/manual/projects/resource-model-sources/sensu',
            '/manual/projects/resource-model-sources/servicenow',
            '/manual/projects/resource-model-sources/http-json',
            '/manual/projects/resource-model-sources/vmware'
          ]
        },
        {
          text: 'Node Execution',
          collapsible: true,
          link: '/manual/projects/node-execution/',
          children: [
            {text: "Overview", link: '/manual/projects/node-execution/'},
            '/manual/projects/node-execution/ssh',
            '/manual/projects/node-execution/openssh',
            '/manual/projects/node-execution/bastionssh',
            '/manual/projects/node-execution/powershell',
            '/manual/projects/node-execution/aws-ssm',
            '/manual/projects/node-execution/aws-ecs',
            '/manual/projects/node-execution/script',
            '/manual/projects/node-execution/builtin'
          ]
        },
        '/manual/node-enhancers.md',
        '/manual/11-node-filters.md',
      ]
    },
    {
      text: 'Commands',
      link: '/manual/06-commands',
      collapsible: true,
    },
    {
      text: 'Activity',
      link: '/manual/08-activity',
      collapsible: true,
      children: [
        {text: "Overview", link: '/manual/08-activity'},
        '/manual/07-executions'
      ]
    },
    {
      text: 'Webhooks',
      collapsible: true,
      link: '/manual/webhooks',
      children: [
        {text: "Overview", link: '/manual/webhooks'},
        {
          text: 'Webhooks Handlers',
          children: [
            '/manual/webhooks/advanced-run-job',
            '/manual/webhooks/pagerduty-run-job',
            '/manual/webhooks/datadog-run-job.md',
            '/manual/webhooks/aws-sns-webhook',
            '/manual/webhooks/github-webhook',
            '/manual/webhooks/run-job.md',
            '/manual/webhooks/log-events.md'
          ]
        },
      ]
    },
    {
      text: 'Schedules (Commercial)',
      collapsible: true,
      link: '/manual/schedules/project-schedules',
      children: [
        {text: "Overview", link: '/manual/schedules/project-schedules'},
        '/manual/schedules/missedjobfires.md'
      ],
    },
    {
      text: 'Calendars (Commercial)',
      collapsible: true,
      link: '/manual/calendars',
      children: [
        {text: "Overview", link: '/manual/calendars'},
        '/manual/calendars/system-calendars.md',
        '/manual/calendars/project-calendars.md',
        '/manual/calendars/import-export.md'
      ]
    },
    {
      text: 'Health Checks',
      collapsible: true,
      link: '/manual/healthchecks',
      children: [
        {text: "Overview", link: '/manual/healthchecks'},
        '/manual/healthcheckplugins/datadog.md',
        '/manual/healthcheckplugins/sensu.md',
        '/manual/healthcheckplugins/azure-healthcheck.md',
        '/manual/healthcheckplugins/aws-ec2-healthcheck.md',
        '/manual/healthcheckplugins/gcp-compute-healthcheck.md'
      ]
    },
    {
      text: 'Tour Manager (Commercial)',
      collapsible: true,
      link: '/manual/tour-manager.md',
      children: [
        {text: "Overview", link: '/manual/tour-manager.md'},
      ]
    },
    {
      text: 'System Menu',
      collapsible: true,
      link: '/manual/system-configs',
      children: [
        {text: "Overview", link: '/manual/system-configs'},
        '/manual/user-management/user-mgmt',
        '/manual/user-management/password-reset',
        '/manual/user-management/user-classes',
        '/manual/system-report',
        '/manual/configuration-mgmt/configmgmt'
      ]
    },
    {
      text: 'Key Storage',
      collapsible: true,
      link: '/manual/key-storage/index',
      children: [
        {text: "Overview", link: '/manual/key-storage/index'},
        '/manual/key-storage/enterprise-runner-key-storage.md',
        {
          text: 'Key Storage Plugins',
          collapsible: true,
          children: [
            { link: '/manual/key-storage/storage-plugins/aws-secrets-manager.md', text: 'AWS Secrets Manager (Commercial)' },
            { link: '/manual/key-storage/storage-plugins/azure-vault.md', text: 'Azure Key Vault (Commercial)' },
            { link: '/manual/key-storage/storage-plugins/cyberark-storage.md', text: 'CyberArk (Commercial)' },
            { link: '/manual/key-storage/storage-plugins/thycotic-storage.md', text: 'Delinea (Commercial)' },
            { link: '/manual/key-storage/storage-plugins/vault.md', text: 'HashiCorp Vault' }
          ]
        },
      ]
    },
    { link: '/manual/10-user.md', text: 'Profile Menu' },
    {
      text: 'Plugins',
      collapsible: true,
      link: '/manual/plugins/index',
      children: [
        { text: 'Overview', link: '/manual/plugins/index' },
        { text: 'AWS', link: '/manual/plugins/aws-plugins-overview.md' },
        { text: 'Azure', link: '/manual/plugins/azure-plugins-overview.md' },
        { text: 'Datadog', link: '/manual/plugins/datadog-plugins-overview.md' },
        { text: 'Google Cloud', link: '/manual/plugins/gcp-plugins-overview.md' },
        { text: 'Jira', link: '/manual/plugins/jira-plugins-overview.md' },
        { text: 'Kubernetes (Commercial)', link: '/manual/plugins/kubernetes-plugins-overview.md' },
        { text: 'Kubernetes (Open Source)', link: '/manual/plugins/kubernetes-open-source.md' },
        { text: 'PagerDuty', link: '/manual/plugins/pagerduty-plugins-overview.md' },
        { text: 'Sensu', link: '/manual/plugins/sensu-plugins-overview.md' },
        { text: 'ServiceNow', link: '/manual/plugins/servicenow-plugins-overview.md' },
        { text: 'Full List', link: '/manual/plugins/full-list' }
      ]
    },
    {
      text: 'Integrations',
      collapsible: true,
      link: '/manual/integrations/index.md',
      children: [
        '/manual/integrations/servicenow-app.md'
      ]
    },
    { link: '/manual/nextui.md', text: 'NextUI (Modern UI)' },
  ]
}]
