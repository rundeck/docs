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
      link: '/manual/jobs',
      children: [
        '/manual/jobs',
        '/manual/creating-jobs',
        '/manual/job-workflows',
        '/manual/job-options',
        '/manual/jobs/job-notifications',
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
        '/manual/job-plugins',
        '/manual/execution-lifecycle/job-resume.md',
        '/manual/execution-lifecycle/job-retry-failed-nodes.md',
        '/manual/execution-lifecycle/result-data.md',
        '/manual/execution-lifecycle/roi-metrics.md',
        '/manual/jobs/job-queue.md',
        '/manual/jobs/ai-generated-runbooks.md'
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
        }
      ]
    },
    {
      text: 'Key Storage',
      collapsible: true,
      link: '/manual/key-storage/key-storage',
      children: [
        '/manual/key-storage/key-storage',
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
      text: 'Schedules (Enterprise)',
      collapsible: true,
      link: '/manual/schedules/project-schedules',
      children: [
        '/manual/schedules/project-schedules.md',
        '/manual/schedules/missedjobfires.md'
      ],
    },
    {
      text: 'Tour Manager (Enterprise)',
      collapsible: true,
      link: '/manual/tour-manager.md',
    },
    {
      text: 'Calendars (Enterprise)',
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
