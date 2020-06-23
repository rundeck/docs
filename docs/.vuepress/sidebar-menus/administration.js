module.exports = [{
  title: 'Administration Guide',
  collapsable: false,
  children: [
    '/administration/overview/system-architecture',
    {
      title: 'Installation',
      collapsable: true,
      path: '/administration/install/',
      sidebarDepth: 1,
      children: [
        '/administration/install/system-requirements',
        '/administration/install/jar',
        '/administration/install/linux-deb',
        '/administration/install/linux-rpm',
        '/administration/install/tomcat',
        '/administration/install/windows',
        '/administration/install/source',
        '/administration/install/docker'
      ]
    },
    {
      title: 'Configuration',
      collapsable: true,
      path: '/administration/configuration/',
      sidebarDepth: 1,
      children: [
        '/administration/configuration/license',
        {
          title: 'Database',
          collapsable: true,
          children: [
            '/administration/configuration/database/',
            '/administration/configuration/database/mysql',
            '/administration/configuration/database/mssql',
            '/administration/configuration/database/secure_mssql',
            '/administration/configuration/database/oracle',
            '/administration/configuration/database/postgres'

          ]
        },
        '/administration/configuration/remote-job-execution',
        '/administration/configuration/email-settings',
        '/administration/configuration/gui-customization',
        '/administration/configuration/localization',
        '/administration/configuration/config-file-reference',
        '/administration/configuration/system-properties',
        '/administration/configuration/encryptable-properties',
        {
          title: 'Plugins',
          collapsable: true,
          children: ['/administration/configuration/plugins/',
            '/administration/configuration/plugins/installing',
            '/administration/configuration/plugins/plugin-types',
            '/administration/configuration/plugins/configuring',
            '/administration/configuration/plugins/bundled-plugins'
          ]
        },
        '/administration/configuration/storage-facility',
        '/administration/configuration/repository'
      ]
    },
    {
      title: 'Security',
      collapsable: true,
      path: '/administration/security/default-users',
      sidebarDepth: 1,
      children: [
        '/administration/security/default-users',
        '/administration/security/authentication',
        '/administration/security/authorization',
        '/administration/security/acl-policy-editor',
        '/administration/security/ssl',
        '/administration/security/key-storage',
        '/administration/security/sso',
        '/administration/security/webapp-http-headers'
      ]
    },
    {
      title: 'Maintenance',
      collapsable: true,
      children: [
        '/administration/maintenance/startup',
        '/administration/maintenance/logs',
        '/administration/maintenance/backup',
        '/administration/maintenance/tuning-rundeck'
      ]
    },
    {
      title: 'Upgrading',
      collapsable: true,
      path: '/upgrading/upgrading',
      children: [
        '/upgrading/upgrading',
        '/upgrading/upgrading-to-rundeck3',
      ]
    },
    {
      title: 'Cluster',
      collapsable: true,
      path: '/administration/cluster/',
      children: [
        '/administration/cluster/',
        {
          title: 'Cloud Deployment',
          collapsable: true,
          children: [
            '/administration/cluster/cloud/',
            '/administration/cluster/cloud/aws',

          ]
        },
        '/administration/cluster/autotakeover/',
        {
          title: 'Load Balancer',
          collapsable: true,
          children: [
            '/administration/cluster/loadbalancer/',
            '/administration/cluster/loadbalancer/aws-elb',
            '/administration/cluster/loadbalancer/haproxy',
            '/administration/cluster/loadbalancer/iis',

          ]
        }, {
          title: 'Log Store',
          collapsable: true,
          children: [
            '/administration/cluster/logstore/',
            '/administration/cluster/logstore/azure',
            '/administration/cluster/logstore/s3'
          ]
        },
        '/administration/cluster/replication/'
      ]
    },
    {
      title: "Projects",
      collapsable: true,
      path: '/administration/projects/',
      children: [
        '/administration/projects/project-create',
        '/administration/projects/configuration',
        {
          title: 'SCM',
          collapsable: true,
          children: [
            '/administration/projects/scm/',
            '/administration/projects/scm/git',
            '/administration/projects/scm/job-replication'
          ]
        },
        '/administration/projects/project-readme',
        '/administration/projects/project-motd',
        '/administration/projects/plugin-control',
        '/administration/projects/project-archive',
        '/administration/projects/project-delete',
        {
          title: 'Resource Model Sources',
          collapsable: true,
          children: [
            '/administration/projects/resource-model-sources/',
            '/administration/projects/resource-model-sources/node-wizard',
            '/administration/projects/resource-model-sources/aws',
            '/administration/projects/resource-model-sources/azure',
            '/administration/projects/resource-model-sources/servicenow',
            '/administration/projects/resource-model-sources/vmware',
            '/administration/projects/resource-model-sources/builtin',
            '/administration/projects/resource-model-sources/resource-editor'
          ]
        },
        {
          title: 'Node Execution',
          collapsable: true,
          children: [
            '/administration/projects/node-execution/',
            '/administration/projects/node-execution/builtin',
            '/administration/projects/node-execution/script',
            '/administration/projects/node-execution/ssh',
            '/administration/projects/node-execution/powershell',
            '/administration/projects/node-execution/bastionssh',
            '/administration/projects/node-execution/openssh'
          ]
        }
      ]
    }
  ]
}]
