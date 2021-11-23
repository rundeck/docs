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
                  '/administration/install/docker'
                ]
              },
              {
                title: 'Upgrading',
                collapsable: true,
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
              {
                title: 'Enterprise Runner',
                collapsable: true,
                path: '/administration/runner/',
                sidebarDepth: 2
              },
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
                  },
                  {
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
            ]},
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
      path: '/administration/projects',
      collapsable: true,
      children: [
        '/administration/projects',
        ]
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
    }
  ]
}]
