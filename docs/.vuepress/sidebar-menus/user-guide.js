module.exports = [{
  title: 'User Guide',
  collapsable: false,
  sidebarDepth: 0,
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
      ]
    },
    '/manual/05-nodes',
    '/manual/06-commands',
    '/manual/07-executions',
    '/manual/08-activity',
    '/manual/09-configure',
    '/manual/10-user.md',
    '/manual/11-node-filters.md',
    {
      title: 'Webhooks (beta)',
      collapsable: false,
      sidebarDepth: 2,
      children: [
        '/manual/12-webhooks.md',
        {
          title: 'Webhooks Handlers',
          sidebarDepth: 2,
          children: [
            '/manual/webhooks/run-job.md',
            '/manual/webhooks/routing-run-job',
          ]
        },
      ]
    },
    {
      title: 'Document Formats',
      collapsable: true,
      sidebarDepth: 0,
      children: [
        '/manual/document-format-reference/aclpolicy-v10.md',
        '/manual/document-format-reference/job-v20.md',
        '/manual/document-format-reference/job-yaml-v12.md',
        '/manual/document-format-reference/resource-json-v10.md',
        '/manual/document-format-reference/resource-v13.md',
        '/manual/document-format-reference/resource-yaml-v13.md',
      ]
    },
  ]
}]
