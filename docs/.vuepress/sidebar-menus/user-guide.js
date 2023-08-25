module.exports = [{
  title: 'User Guide',
  collapsable: false,
  sidebarDepth: 1,
  children: [
    {
      title: "Projects",
      collapsable: true,
      path: '/manual/projects/',
      children: [
        '/manual/projects/project-create',
        '/manual/projects/configuration',
        {
          title: 'SCM',
          collapsable: true,
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
          title: 'Resource Model Sources',
          collapsable: true,
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
          title: 'Node Execution',
          collapsable: true,
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
      title: 'Jobs',
      collapsable: true,
      path: '/manual/04-jobs',
      sidebarDepth: 2,
      children: [
        '/manual/04-jobs',
        '/manual/creating-jobs',
        '/manual/job-workflows',
        '/manual/job-options',
        '/manual/jobs/job-notifications',
        {
          title: 'Log Filters',
          collapsable: true,
          path: '/manual/log-filters/',
          sidebarDepth: 1,
          children: [
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
//        {
//            title: 'Job Plugins',
//            collapsable: true,
//            path: '/manual/job-plugins',
//            sidebarDepth: 1,
//            children: [
//
//                '/manual/node-steps',
//                '/manual/workflow-steps',
//
//            ]
//        }
        '/manual/job-plugins',
        '/manual/execution-lifecycle/job-resume.md',
        '/manual/execution-lifecycle/job-retry-failed-nodes.md',
        '/manual/execution-lifecycle/result-data.md',
        '/manual/execution-lifecycle/roi-metrics.md',
        '/manual/jobs/job-queue.md',
      ]
    },
    {
      title: 'Plugins',
      collapsable: true,
      path:'/manual/plugins/plugins-overview',
      sidebarDepth: 0,
      children:[
        {title: 'AWS', path: '/manual/plugins/aws-plugins-overview.md'},
        {title: 'Azure', path: '/manual/plugins/azure-plugins-overview.md'},
        {title: 'Datadog', path:'/manual/plugins/datadog-plugins-overview.md'},
        {title: 'Google Cloud', path: '/manual/plugins/gcp-plugins-overview.md'},
        {title: 'Jira', path: '/manual/plugins/jira-plugins-overview.md'},
        {title: 'Kubernetes', path: '/manual/plugins/kubernetes-plugins-overview.md'},
        {title: 'PagerDuty', path: '/manual/plugins/pagerduty-plugins-overview.md'},
        {title: 'Sensu', path: '/manual/plugins/sensu-plugins-overview.md'},
        {title: 'ServiceNow', path: '/manual/plugins/servicenow-plugins-overview.md'}
      ]
    },
    {
      title: 'Nodes',
      collapsable: true,
      path:'/manual/05-nodes',
      sidebarDepth: 1,
      children: [
        '/manual/05-nodes',
        '/manual/node-enhancers.md',
        '/manual/11-node-filters.md',
        {
          title: 'Health Checks',
          collapsable: true,
          path: '/manual/healthchecks',
          sidebarDepth: 2,
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
      title: 'Key Storage',
      collapsable: true,
      path: '/manual/key-storage/key-storage',
      sidebarDepth: 1,
      children: [
        '/manual/key-storage/key-storage',
        '/manual/key-storage/enterprise-runner-key-storage.md',
        {
          title: 'Key Storage Plugins',
          collapsable: true,
          children: [
            '/manual/key-storage/storage-plugins/thycotic-storage.md',
            '/manual/key-storage/storage-plugins/vault.md',
            '/manual/key-storage/storage-plugins/cyberark-storage.md'
          ]
        },
      ]
    },
    {
      title: 'Commands',
      path: '/manual/06-commands',
      collapsable: true,
      sidebarDepth: 1
    },
    {
      title: 'Activity',
      path: '/manual/08-activity',
      collapsable: true,
      sidebarDepth: 2,
      children: [
        '/manual/08-activity',
        '/manual/07-executions'
      ]
    },
    {
      title: 'Schedules (Enterprise)',
      collapsable: true,
      path: '/manual/schedules/project-schedules',
      children: [
        '/manual/schedules/project-schedules.md',
        '/manual/schedules/missedjobfires.md'
      ],
      sidebarDepth: 1
    },
    {
      title: 'Tour Manager (Enterprise)',
      collapsable: true,
      path: '/manual/tour-manager.md',
      sidebarDepth: 1
    },
    {
      title: 'Calendars (Enterprise)',
      collapsable: true,
      path:'/manual/calendars',
      sidebarDepth: 2,
      children: [
        '/manual/calendars',
        '/manual/calendars/system-calendars.md',
        '/manual/calendars/project-calendars.md',
        '/manual/calendars/import-export.md'
      ]
    },
    {
      title: 'Webhooks',
      collapsable: true,
      path: '/manual/webhooks',
      sidebarDepth: 2,
      children: [
        '/manual/webhooks',
        {
          title: 'Webhooks Handlers',
          sidebarDepth: 2,
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
      title: 'Project Settings',
      collapsable: true,
      path: '/manual/project-settings',
      sidebarDepth: 2
    },
    {
      title: 'System Menu',
      collapsable: true,
      path: '/manual/system-configs',
      sidebarDepth: 1,
      children: [
          '/manual/system-configs',
          '/manual/user-management/user-mgmt',
          '/manual/user-management/password-reset',
          '/manual/user-management/user-classes',
          '/manual/system-report',
          '/manual/configuration-mgmt/configmgmt'
      ]
    },
    ['/manual/10-user.md', 'Profile Menu'],
    {
      title: 'Integrations',
      collapsable: true,
      path: '/manual/integrations',
      sidebarDepth: 1,
      children: [
          '/manual/integrations/servicenow-app.md'
      ]
    },
    {
      title: 'Document Formats',
      collapsable: true,
      sidebarDepth: 1,
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
