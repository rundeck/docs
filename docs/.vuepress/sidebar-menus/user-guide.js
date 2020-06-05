module.exports = [{
  title: 'User Guide',
  collapsable: false,
  sidebarDepth: 1,
  children: [
    '/manual/01-introduction',
    '/manual/02-getting-help',
    '/manual/03-getting-started',
    {
      title: 'Jobs',
      collapsable: true,
      sidebarDepth: 1,
      children: [
        '/manual/04-jobs',
        '/manual/creating-jobs',
        '/manual/job-workflows',
        '/manual/job-options',
        '/manual/job-plugins',
        '/manual/execution-lifecycle/job-resume.md',
        '/manual/execution-lifecycle/job-retry-failed-nodes.md',
      ]
    },
    {
      title: 'Nodes',
      collapsable: true,
      sidebarDepth: 1,
      children: [
        '/manual/05-nodes',
        '/manual/11-node-filters.md',
        '/manual/healthchecks',
      ]
    },
    '/manual/06-commands',
    {
      title: 'Activity',
      collapsable: true,
      sidebarDepth: 1,
      children: [
        '/manual/08-activity',
        '/manual/07-executions'
      ]
    },
    ['/manual/schedules/project-schedules', 'Schedules (Enterprise)'],
    {
      title: 'Calendars (Enterprise)',
      collapsable: true,
      sidebarDepth: 1,
      children: [
        '/manual/calendars.md',
        '/manual/calendars/system-calendars.md',
        '/manual/calendars/project-calendars.md',
        '/manual/calendars/import-export.md'
      ]
    },
    {
      title: 'Webhooks',
      collapsable: true,
      sidebarDepth: 2,
      children: [
        '/manual/12-webhooks.md',
        {
          title: 'Webhooks Handlers',
          sidebarDepth: 2,
          children: [
            '/manual/webhooks/run-job.md',
            '/manual/webhooks/advanced-run-job',
            '/manual/webhooks/pagerduty-run-job'
          ]
        },
      ]
    },
    {
      title: 'Tour Manager (Enterprise)',
      collapsable: true,
      sidebarDepth: 2,
      children: [
        '/manual/tour-manager.md'
      ]
    },
    {
      title: 'Project Settings',
      collapsable: true,
      sidebarDepth: 1,
      children: [
          '/manual/project-settings'
      ]
    },
    {
      title: 'System Configurations',
      collapsable: true,
      sidebarDepth: 1,
      children: [
          '/manual/system-configs',
          '/manual/user-management/user-mgmt'
      ]
    },
    ['/manual/10-user.md', 'Profile Menu'],
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
