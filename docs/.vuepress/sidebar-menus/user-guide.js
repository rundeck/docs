module.exports = [{
  title: 'User Guide',
  collapsable: false,
  sidebarDepth: 1,
  children: [
    {
      title: "Projects",
      path: '/manual/projects',
      collapsable: true,
      children: [
        '/manual/projects',
        ]
    },
    {
      title: 'Jobs',
      collapsable: true,
      path: '/manual/04-jobs',
      sidebarDepth: 1,
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
        '/manual/job-plugins',
        '/manual/execution-lifecycle/job-resume.md',
        '/manual/execution-lifecycle/job-retry-failed-nodes.md',
        '/manual/execution-lifecycle/job-data.md',
        '/manual/jobs/job-queue.md',
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
              '/manual/healthcheckplugins/azure-healthcheck.md'
          ]
        }
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
      path: '/manual/12-webhooks',
      sidebarDepth: 2,
      children: [
        '/manual/12-webhooks',
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
