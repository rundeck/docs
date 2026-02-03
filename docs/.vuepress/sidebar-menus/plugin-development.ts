export default [
  {
  text: 'Plugin Development',
  collapsible: true,
  link: '/developer/',
  children: [
    { text: 'Overview', link: '/developer/' },
    {
      text: 'Development Approaches',
      collapsible: true,
      children: [
        '/developer/java-plugin-development.md',
        '/developer/groovy-plugin-development.md',
        '/developer/script-plugin-development.md',
      ]
    },
    {
      text: 'Common Topics',
      collapsible: true,
      children: [
        '/developer/plugin-bootstrap.md',
        '/developer/plugin-properties.md',
        '/developer/plugin-groups.md',
      ]
    },
    {
      text: 'Job Execution Plugins',
      collapsible: true,
      children: [
        '/developer/step-plugins.md',
        '/developer/node-executor-plugins.md',
        '/developer/file-copier-plugins.md',
      ]
    },
    {
      text: 'Resource (Node) Discovery',
      collapsible: true,
      children: [
        '/developer/resource-model-source-plugins.md',
        '/developer/resource-model-format-plugins.md',
      ]
    },
    {
      text: 'Logging and Output',
      collapsible: true,
      children: [
        '/developer/log-filter-plugins.md',
        '/developer/logging-plugins.md',
        '/developer/content-converter-plugins.md',
      ]
    },
    {
      text: 'Notifications and Events',
      collapsible: true,
      children: [
        '/developer/notification-plugins.md',
        '/developer/webhook-plugins.md',
        '/developer/audit-events-listeners.md',
      ]
    },
    {
      text: 'Security and Storage',
      collapsible: true,
      children: [
        '/developer/storage-plugins.md',
        '/developer/storage-converter-plugins.md',
        '/developer/user-group-source-plugins.md',
      ]
    },
    {
      text: 'Orchestration and Control',
      collapsible: true,
      children: [
        '/developer/orchestrator-plugins.md',
      ]
    },
    {
      text: 'Configuration and Options',
      collapsible: true,
      children: [
        '/developer/option-values-plugins.md',
        '/developer/file-upload-plugins.md',
      ]
    },
    {
      text: 'Lifecycle Plugins',
      collapsible: true,
      children: [
        '/developer/execution-lifecycle.md',
        '/developer/job-lifecycle.md',
      ]
    },
    {
      text: 'Source Control Integration',
      collapsible: true,
      children: [
        '/developer/scm-plugins.md',
      ]
    },
    {
      text: 'User Interface',
      collapsible: true,
      children: [
        '/developer/ui-plugins.md',
      ]
    },
    {
      text: 'Tools and Utilities',
      collapsible: true,
      children: [
        '/developer/password-encrypt-utility.md',
      ]
    },
  ]
},
{
  text: 'Document Formats',
  collapsible: true,
  link: '/manual/document-format-reference/index.md',
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
