export default [{
  text: 'User Guide',
  collapsible: false,
  link: '/manual/',
  children: [
    { link: '/manual/', text: 'User Guide Overview'},
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
        {
          text: 'Resource Model Sources',
          collapsible: true,
          children: [
            '/manual/projects/resource-model-sources/',
            '/manual/projects/resource-model-sources/aws',
            '/manual/projects/resource-model-sources/azure',
            '/manual/projects/resource-model-sources/datadog',
            '/manual/projects/resource-model-sources/ecs-fargate',
            '/manual/projects/resource-model-sources/gcp',
            '/manual/projects/resource-model-sources/kubernetes',
            '/manual/projects/resource-model-sources/builtin',
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
          children: [
//            '/manual/projects/node-execution/',
            '/manual/projects/node-execution/aws-ecs',
            '/manual/projects/node-execution/aws-ssm',
            '/manual/projects/node-execution/bastionssh',
            '/manual/projects/node-execution/builtin',
            '/manual/projects/node-execution/openssh',
            '/manual/projects/node-execution/powershell',
            '/manual/projects/node-execution/script',
            '/manual/projects/node-execution/ssh'
          ]
        }
      ]
    },
    {
      text: 'Jobs',
      collapsible: true,
      link: '/manual/jobs/index.md',
      children: [
        {text: 'Overview', link:'/manual/jobs/index.md'},
        '/manual/jobs/creating-jobs',
        '/manual/jobs/job-workflows',
        '/manual/jobs/job-options',
        '/manual/jobs/job-notifications',
        {
            text:'Job Step Plugins',
            link: '/manual/jobs/job-plugins/index.md',
            collapsible: true,
            children: [
                {text: 'Overview', link: '/manual/jobs/job-plugins/index.md'},
                {
                    text: 'Node Steps',
                    collapsible: false,
                    children: [
                        {text: 'AWS EC2', link: '/manual/jobs/job-plugins/node-steps/aws', icon: '/assets/img/aws-icon.png'},
                        {text: 'AWS S3', link: '/manual/jobs/job-plugins/node-steps/aws-s3', icon: '/assets/img/aws-icon.png'},
                        {text: 'Azure VM', link: '/manual/jobs/job-plugins/node-steps/azure', icon: '/assets/img/azure-logo.png'},
                        {text: 'Command', link: '/manual/jobs/job-plugins/node-steps/builtin.md#command-step', icon: '/assets/img/command-icon.png'},
                        {text: 'Copy File', link: '/manual/jobs/job-plugins/node-steps/builtin.md#copy-file-step', icon: '/assets/img/file-icon.png'},
                        {text: 'Data Step', link: '/manual/jobs/job-plugins/node-steps/builtin.md#data-node-step',icon: '/assets/img/pd-icon.png'},
                        {text: 'Datadog', link: '/manual/jobs/job-plugins/node-steps/datadog', icon: '/assets/img/datadog.svg'},
                        {text: 'Docker', link: '/manual/jobs/job-plugins/node-steps/docker', icon: '/assets/img/docker-logo.png'},
                        {text: 'Google Cloud Compute', link: '/manual/jobs/job-plugins/node-steps/gcp', icon: '/assets/img/gcp-icon.png'},
                        {text: 'HTTP Request', link: '/manual/jobs/job-plugins/node-steps/builtin.md#http-request-node-step', icon: '/assets/img/http-icon.png'},
                        {text: 'Kubernetes Debug', link: '/manual/jobs/job-plugins/node-steps/kubernetes-debug-plugins', icon: '/assets/img/kubernetes-icon.png'},
                        {text: 'Kubernetes Deployments', link: '/manual/jobs/job-plugins/node-steps/kubernetes-deployment-plugins', icon: '/assets/img/kubernetes-icon.png'},
                        {text: 'Kubernetes Job', link: '/manual/jobs/job-plugins/node-steps/kubernetes-job-plugins', icon: '/assets/img/kubernetes-icon.png'},
                        {text: 'Kubernetes Pod', link: '/manual/jobs/job-plugins/node-steps/kubernetes-pod-plugins', icon: '/assets/img/kubernetes-icon.png'},
                        {text: 'Kubernetes Service', link: '/manual/jobs/job-plugins/node-steps/kubernetes-service-plugins', icon: '/assets/img/kubernetes-icon.png'},
                        {text: 'Kubernetes StatefulSet', link: '/manual/jobs/job-plugins/node-steps/kubernetes-statefulset-plugins', icon: '/assets/img/kubernetes-icon.png'},
                        {text: 'Jira', link: '/manual/jobs/job-plugins/node-steps/jira', icon: '/assets/img/jira-icon.svg'},
                        {text: 'Local Command Step', link: '/manual/jobs/job-plugins/node-steps/builtin.md#local-command-step', icon: '/assets/img/command-icon.png'},
                        {text: 'Loop Script', link: '/manual/jobs/job-plugins/node-steps/loop-plugins',icon: '/assets/img/pd-icon.png'},
                        {text: 'Oracle Cloud', link: '/manual/jobs/job-plugins/node-steps/oracle', icon: '/assets/img/oracle-icon.png'},
                        {text: 'PS1 File Grep', link: '/manual/jobs/job-plugins/node-steps/ps1-file-grep.md', icon: '/assets/img/powershell-icon.png'},
                        {text: 'PS1 File Wait', link: '/manual/jobs/job-plugins/node-steps/ps1-file-wait.md', icon: '/assets/img/powershell-icon.png'},
                        {text: 'PS1 Remove Scheduled Job', link: '/manual/jobs/job-plugins/node-steps/ps1-scheduled-jobs-remove.md', icon: '/assets/img/powershell-icon.png'},
                        {text: 'PS1 Scheduled Jobs', link: '/manual/jobs/job-plugins/node-steps/ps1-scheduled-jobs-list.md', icon: '/assets/img/powershell-icon.png'},
                        {text: 'Script', link: '/manual/jobs/job-plugins/node-steps/builtin.md#script-step', icon: '/assets/img/code-icon.png'},
                        {text: 'Script File', link: '/manual/jobs/job-plugins/node-steps/builtin.md#script-file-step', icon: '/assets/img/code-icon.png'},
                        {text: 'Script URL', link: '/manual/jobs/job-plugins/node-steps/builtin.md#script-url-step', icon: '/assets/img/code-icon.png'},
                        {text: 'Sensu', link: '/manual/jobs/job-plugins/node-steps/sensu', icon: '/assets/img/sensu-icon.jpg'},
                        {text: 'SQL', link: '/manual/jobs/job-plugins/node-steps/sqlrunner', icon: '/assets/img/sql-icon.png'},
                        {text: 'VMware', link: '/manual/jobs/job-plugins/node-steps/vmware', icon: '/assets/img/VMware-logo.png'}
                        ]
                    },
                {
                    text: 'Workflow Steps',
                    collapsible: false,
                    children: [
                        {text: 'Ansible Module', link: '/manual/jobs/job-plugins/workflow-steps/builtin.md#ansible-module', icon: '/assets/img/ansible-icon.png'},
                        {text: 'Ansible Playbook', link: '/manual/jobs/job-plugins/workflow-steps/builtin.md#ansible-playbook', icon: '/assets/img/ansible-icon.png'},
                        {text: 'Ansible Playbook Inline', link: '/manual/jobs/job-plugins/workflow-steps/builtin.md#ansible-playbook-inline', icon: '/assets/img/ansible-icon.png'},
                        {text: 'AWS Athena', link: '/manual/jobs/job-plugins/workflow-steps/amazon-athena', icon: '/assets/img/aws-icon.png'},
                        {text: 'AWS CloudWatch', link: '/manual/jobs/job-plugins/workflow-steps/aws-cloudwatch', icon: '/assets/img/aws-icon.png'},
                        {text: 'AWS ECS & Fargate', link: '/manual/jobs/job-plugins/workflow-steps/aws-ecs-fargate', icon: '/assets/img/aws-icon.png'},
                        {text: 'AWS EC2', link: '/manual/jobs/job-plugins/workflow-steps/aws', icon: '/assets/img/aws-icon.png'},
                        {text: 'AWS ELB', link: '/manual/jobs/job-plugins/workflow-steps/aws-elb-workflow-plugin', icon: '/assets/img/aws-icon.png'},
                        {text: 'AWS Lambda', link: '/manual/jobs/job-plugins/workflow-steps/aws-lambda', icon: '/assets/img/aws-icon.png'},
                        {text: 'AWS RDS', link: '/manual/jobs/job-plugins/workflow-steps/aws-rds', icon: '/assets/img/aws-icon.png'},
                        {text: 'Azure Storage', link: '/manual/jobs/job-plugins/workflow-steps/azure.md#azure-storage-copy', icon: '/assets/img/azure-logo.png'},
                        {text: 'Azure VM', link: '/manual/jobs/job-plugins/workflow-steps/azure.md#azure-vm-create', icon: '/assets/img/azure-logo.png'},
                        {text: 'Executions Delete', link: '/manual/jobs/job-plugins/workflow-steps/builtin.md#executions-delete',icon: '/assets/img/pd-icon.png'},
                        {text: 'Executions Retry', link: '/manual/jobs/job-plugins/workflow-steps/builtin.md#executions-retry',icon: '/assets/img/pd-icon.png'},
                        {text: 'Executions Search', link: '/manual/jobs/job-plugins/workflow-steps/builtin.md#executions-search',icon: '/assets/img/pd-icon.png'},
                        {text: 'Executions Wait Result', link: '/manual/jobs/job-plugins/workflow-steps/builtin.md#executions-wait-result',icon: '/assets/img/pd-icon.png'},
                        {text: 'Flow Control', link: '/manual/jobs/job-plugins/workflow-steps/builtin.md#flow-control',icon: '/assets/img/pd-icon.png'},
                        {text: 'Global Variable', link: '/manual/jobs/job-plugins/workflow-steps/builtin.md#global-variable',icon: '/assets/img/pd-icon.png'},
                        {text: 'Google Cloud Compute', link: '/manual/jobs/job-plugins/workflow-steps/gcp.md#gcp-vm-start', icon: '/assets/img/gcp-icon.png'},
                        {text: 'Google Cloud SQL', link: '/manual/jobs/job-plugins/workflow-steps/gcp.md#gcp-sqlinstance-restart', icon: '/assets/img/gcp-icon.png'},
                        {text: 'Google Cloud VPC', link: '/manual/jobs/job-plugins/workflow-steps/gcp.md#gcp-enable-vpc-network-peering', icon: '/assets/img/gcp-icon.png'},
                        {text: 'Data Step', link: '/manual/jobs/job-plugins/workflow-steps/builtin.md#data-step',icon: '/assets/img/pd-icon.png'},
                        {text: 'Datadog', link: '/manual/jobs/job-plugins/workflow-steps/datadog', icon: '/assets/img/datadog-icon.png'},
                        {text: 'File Transfer', link: '/manual/jobs/job-plugins/workflow-steps/file-transfer', icon: '/assets/img/file-icon.png'},
                        {text: 'Github', link: '/manual/jobs/job-plugins/workflow-steps/github', icon: '/assets/img/github-icon.png'},
                        {text: 'Jira', link: '/manual/jobs/job-plugins/workflow-steps/jira', icon: '/assets/img/jira-icon.svg'},
                        {text: 'Job State Conditional', link: '/manual/jobs/job-plugins/workflow-steps/builtin.md#job-state-conditional',icon: '/assets/img/pd-icon.png'},
                        {text: 'Log Data', link: '/manual/jobs/job-plugins/workflow-steps/builtin.md#log-data-step',icon: '/assets/img/pd-icon.png'},//},
                        {text: 'Loop Script', link: '/manual/jobs/job-plugins/workflow-steps/loop-plugins',icon: '/assets/img/pd-icon.png'},//, icon: '/assets/img/loop-icon.png'},
                        {text: 'PagerDuty', link: '/manual/jobs/job-plugins/workflow-steps/pagerduty', icon: '/assets/img/pd-icon.png'},
                        {text: 'Progress Badge', link: '/manual/jobs/job-plugins/workflow-steps/progress-badge', icon: '/assets/img/pd-icon.png'},// icon: '/assets/img/green-check-mark.jpg'},
                        {text: 'Refresh Project Nodes', link: '/manual/jobs/job-plugins/workflow-steps/builtin.md#refresh-project-nodes', icon: '/assets/img/pd-icon.png'},// icon: '/assets/img/refresh.png'},
                        {text: 'RSS Feed', link: '/manual/jobs/job-plugins/workflow-steps/rss-feed-plugin', icon: '/assets/img/rss-icon.png'},
                        {text: 'Sensu', link: '/manual/jobs/job-plugins/workflow-steps/sensu', icon: '/assets/img/sensu-icon.jpg'},
                        {text: 'ServiceNow', link: '/manual/jobs/job-plugins/workflow-steps/servicenow', icon: '/assets/img/snow-icon.png'},
                        {text: 'Sumo Logic', link: '/manual/jobs/job-plugins/workflow-steps/sumo-logic', icon: '/assets/img/sumo-icon.png'},
                        {text: 'VMware', link: '/manual/jobs/job-plugins/workflow-steps/vmware', icon: '/assets/img/VMware-logo.png'},
                        ]
                    }
                ]
            },
        '/manual/jobs/job-queue.md',
        '/manual/jobs/job-resume.md',
        '/manual/jobs/job-retry-failed-nodes.md',
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
                            '/manual/log-filters/multi-line-regex.md'
                          ]
                },
        '/manual/jobs/result-data.md',
        '/manual/jobs/roi-metrics.md',
        '/manual/jobs/ai-generated-runbooks.md',
        {
            text: 'Workflow Strategies',
            link: '/manual/jobs/workflow-strategies/index.md',
            collapsible: true,
            children: [
                {text: 'Node First, Sequential, Parallel', link: '/manual/jobs/workflow-strategies/index.md'},
                {text: 'Ruleset (Commercial)', link: '/manual/jobs/workflow-strategies/ruleset.md'}
                ]
        }
      ]
    },
    {
      text: 'Plugins',
      collapsible: true,
      link:'/manual/plugins/index',
      children:[
        {text: 'Overview', link: '/manual/plugins/index'},
        {text: 'AWS', link: '/manual/plugins/aws-plugins-overview.md'},
        {text: 'Azure', link: '/manual/plugins/azure-plugins-overview.md'},
        {text: 'Datadog', link:'/manual/plugins/datadog-plugins-overview.md'},
        {text: 'Google Cloud', link: '/manual/plugins/gcp-plugins-overview.md'},
        {text: 'Jira', link: '/manual/plugins/jira-plugins-overview.md'},
        {text: 'Kubernetes', link: '/manual/plugins/kubernetes-plugins-overview.md'},
        {text: 'PagerDuty', link: '/manual/plugins/pagerduty-plugins-overview.md'},
        {text: 'Sensu', link: '/manual/plugins/sensu-plugins-overview.md'},
        {text: 'ServiceNow', link: '/manual/plugins/servicenow-plugins-overview.md'},
        {text: 'Full List', link: '/manual/plugins/full-list'}
      ]
    },
    {
      text: 'Nodes',
      collapsible: true,
      link:'/manual/05-nodes',
      children: [
        '/manual/05-nodes',
        '/manual/node-enhancers.md',
        '/manual/11-node-filters.md',
        {
          text: 'Health Checks',
          collapsible: true,
          link: '/manual/healthchecks',
          children: [
              '/manual/healthchecks',
              '/manual/healthcheckplugins/datadog.md',
              '/manual/healthcheckplugins/sensu.md',
              '/manual/healthcheckplugins/azure-healthcheck.md',
              '/manual/healthcheckplugins/aws-ec2-healthcheck.md',
              '/manual/healthcheckplugins/gcp-compute-healthcheck.md'
          ]
        },
        {text: "Node Sources", link: '/manual/projects/resource-model-sources/'}
      ]
    },
    {
      text: 'Key Storage',
      collapsible: true,
      link: '/manual/key-storage/index',
      children: [
        '/manual/key-storage/index',
        '/manual/key-storage/enterprise-runner-key-storage.md',
        {
          text: 'Key Storage Plugins',
          collapsible: true,
          children: [
            '/manual/key-storage/storage-plugins/thycotic-storage.md',
            '/manual/key-storage/storage-plugins/vault.md',
            '/manual/key-storage/storage-plugins/cyberark-storage.md'
          ]
        },
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
        '/manual/08-activity',
        '/manual/07-executions'
      ]
    },
    {
      text: 'Schedules (Commercial)',
      collapsible: true,
      link: '/manual/schedules/project-schedules',
      children: [
        '/manual/schedules/project-schedules.md',
        '/manual/schedules/missedjobfires.md'
      ],
    },
    {
      text: 'Tour Manager (Commercial)',
      collapsible: true,
      link: '/manual/tour-manager.md',
    },
    {
      text: 'Calendars (Commercial)',
      collapsible: true,
      link:'/manual/calendars',
      children: [
        '/manual/calendars',
        '/manual/calendars/system-calendars.md',
        '/manual/calendars/project-calendars.md',
        '/manual/calendars/import-export.md'
      ]
    },
    {
      text: 'Webhooks',
      collapsible: true,
      link: '/manual/webhooks',
      children: [
        '/manual/webhooks',
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
      text: 'Project Settings',
      collapsible: true,
      link: '/manual/project-settings',
    },
    {
      text: 'System Menu',
      collapsible: true,
      link: '/manual/system-configs',
      children: [
          '/manual/system-configs',
          '/manual/user-management/user-mgmt',
          '/manual/user-management/password-reset',
          '/manual/user-management/user-classes',
          '/manual/system-report',
          '/manual/configuration-mgmt/configmgmt'
      ]
    },
    {link: '/manual/10-user.md', text:  'Profile Menu'},
    {
      text: 'Integrations',
      collapsible: true,
      link: '/manual/integrations',
      children: [
          '/manual/integrations/servicenow-app.md'
      ]
    },
    {
      text: 'Document Formats',
      collapsible: true,
      children: [
        '/manual/document-format-reference/aclpolicy-v10.md',
        '/manual/document-format-reference/job-v20.md',
        '/manual/document-format-reference/job-yaml-v12.md',
        '/manual/document-format-reference/resource-json-v10.md',
        '/manual/document-format-reference/resource-v13.md',
        '/manual/document-format-reference/resource-yaml-v13.md',
      ]
    }
  ]
}]
