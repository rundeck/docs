module.exports = [{
  title: 'Administration Guide',
  collapsable: false,
  children: [
        {
          title: 'Rundeck Enterprise',
          collapsable: true,
          sidebarDepth: 1,
          children: [
              {
                title: 'Installation',
                collapsable: true,
                path: '/administration/install/installing-rundeck',
                sidebarDepth: 1,
                children: [
                  '/administration/install/installing-rundeck',
                  '/administration/install/system-requirements',
                  '/administration/install/jar',
                  '/administration/install/linux-deb',
                  '/administration/install/linux-rpm',
                  '/administration/install/tomcat',
                  '/administration/install/windows',
                  '/administration/install/source',
                  '/administration/install/docker',
                  '/administration/architecture-and-deployment/aws'
                ]
              },
              {
                title: 'Upgrading',
                collapsable: false,
                path: '/upgrading/',
                sidebarDepth: 1,
                children: [
                  '/upgrading/',
                  '/upgrading/upgrading',
                  '/upgrading/upgrading-to-rundeck-3.4.md',
                  '/upgrading/upgrading-to-rundeck-3.3.4.md',
                  '/upgrading/upgrading-to-rundeck-3.3.md',
                  '/upgrading/upgrading-to-rundeck-3.2.md',
                  '/upgrading/upgrading-to-rundeck-3.1.md',
                  '/upgrading/upgrading-to-rundeck3'
                ]
              },
              {
                title: 'Licensing',
                collapsable: true,
                path: '/administration/license',
                sidebarDepth: 2
              },
            ]},
    {
      title: 'Configuration',
      collapsable: true,
      path: '/administration/configuration/',
      sidebarDepth: 2,
      children: [
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
        {
          title: 'Docker',
          collapsable: true,
          children: [
            ['/administration/configuration/docker', 'Configuration Reference'],
            ['/administration/configuration/docker/extending-configuration.md', 'Extending Configuration']
          ]
        },
        '/administration/configuration/hashicorp-consul',
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
        '/administration/security/sso',
        '/administration/security/webapp-http-headers',
        '/administration/security/project-acl'
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
            '/administration/projects/resource-model-sources/gcp',
            '/administration/projects/resource-model-sources/oracle',
            '/administration/projects/resource-model-sources/datadog',
            '/administration/projects/resource-model-sources/servicenow',
            '/administration/projects/resource-model-sources/vmware',
            '/administration/projects/resource-model-sources/sensu',
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
    },
    {
      title: 'Enterprise Runner',
      collapsable: true,
      path: '/administration/runner/',
      sidebarDepth: 2
    },
    {
      title: 'Key Storage',
      collapsable: true,
      path: '/administration/key-storage/key-storage',
      sidebarDepth: 1,
      children: [
        '/administration/key-storage/key-storage',
        {
          title: 'Key Storage Plugins',
          collapsable: true,
          path: '/administration/key-storage/storage-plugins',
          children: [
            '/administration/key-storage/storage-plugins/thycotic-storage.md',
            '/administration/key-storage/storage-plugins/vault.md',
            '/administration/key-storage/storage-plugins/cyberark-storage.md'
          ]
        },
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
      title: 'Clustering',
      collapsable: true,
      path: '/administration/cluster/',
      children: [
        '/administration/cluster/',
        {
          title: 'Load Balancer',
          collapsable: true,
          children: [
            '/administration/cluster/loadbalancer/',
            '/administration/cluster/loadbalancer/health-check',
            '/administration/cluster/loadbalancer/aws-alb',
            '/administration/cluster/loadbalancer/aws-elb',
            '/administration/cluster/loadbalancer/haproxy',
            '/administration/cluster/loadbalancer/iis',
            '/administration/cluster/loadbalancer/NGINX',

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
        '/administration/cluster/autotakeover/',
        '/administration/configuration/remote-job-execution',
        '/administration/cluster/replication/'
      ]
    }
  ]
}]
