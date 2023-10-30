export default [{
  text: 'Administration Guide',
  collapsible: false,
  children: [
        {
          text: 'Rundeck / Process Automation',
          collapsible: true,
          children: [
              {
                text: 'Installation',
                collapsible: true,
                link: '/administration/install/index',
                children: [
                  '/administration/install/index',
                  '/administration/install/system-requirements',
                  '/administration/install/jar',
                  '/administration/install/linux-deb',
                  '/administration/install/linux-rpm',
                  '/administration/install/tomcat',
                  '/administration/install/aws',
                  '/administration/install/windows',
                  '/administration/install/source',
                  '/administration/install/docker'
                ]
              },
              {
                text: 'Upgrading',
                collapsible: false,
                link: '/upgrading/',
                children: [
                  '/upgrading/',
                  '/upgrading/upgrading',
                  '/upgrading/upgrading-to-4.8.md',
                  '/upgrading/upgrading-to-4.1.md',
                  '/upgrading/upgrading-to-4.md',
                  '/upgrading/upgrading-to-rundeck-3.4.md',
                  '/upgrading/upgrading-to-rundeck-3.3.4.md',
                  '/upgrading/upgrading-to-rundeck-3.3.md',
                  '/upgrading/upgrading-to-rundeck-3.2.md',
                  '/upgrading/upgrading-to-rundeck-3.1.md',
                  '/upgrading/upgrading-to-rundeck3'
                ]
              },
              {
                text: 'Licensing',
                collapsible: true,
                link: '/administration/license',
              },
              {
                text: 'Runner',
                collapsible: true,
                link: '/administration/runner/',
                children: [
                  '/administration/runner/',
                  '/administration/runner/runner-intro.md',
                  '/administration/runner/runner-setup.md',
                  '/administration/runner/runner-install.md',
                  '/administration/runner/runner-config.md',
                  '/administration/runner/runner-using.md',
                  '/administration/runner/runner-advancedsetup.md',
                  '/administration/runner/runner-logging.md',
                  '/administration/runner/runner-faq.md'
                ]
              },
              {
                text: 'Configuration',
                collapsible: true,
                link: '/administration/configuration/',
                children: [
                  '/administration/configuration/',
                  {
                    text: 'Database',
                    collapsible: true,
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
                    text: 'Docker',
                    collapsible: true,
                    children: [
                      {link: '/administration/configuration/docker', text: 'Configuration Reference'},
                      {link: '/administration/configuration/docker/extending-configuration.md', text: 'Extending Configuration'}
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
                    text: 'Plugins',
                    collapsible: true,
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
                text: 'Maintenance',
                collapsible: true,
                link: '/administration/maintenance/',
                children: [
                  '/administration/maintenance/',
                  '/administration/maintenance/startup',
                  '/administration/maintenance/logs',
                  '/administration/maintenance/backup',
                  '/administration/maintenance/tuning-rundeck'
                ]
              },
              {
                text: 'Clustering',
                collapsible: true,
                link: '/administration/cluster/',
                children: [
                  '/administration/cluster/',
                  {
                    text: 'Load Balancer',
                    collapsible: true,
                    children: [
                      '/administration/cluster/loadbalancer/',
                      '/administration/cluster/loadbalancer/health-check',
                      '/administration/cluster/loadbalancer/aws-alb',
                      '/administration/cluster/loadbalancer/aws-elb',
                      '/administration/cluster/loadbalancer/haproxy',
                      '/administration/cluster/loadbalancer/iis',
                      '/administration/cluster/loadbalancer/NGINX'
                    ]
                  },
                  {
                    text: 'Log Store',
                    collapsible: true,
                    children: [
                      '/administration/cluster/logstore/',
                      '/administration/cluster/logstore/azure',
                      '/administration/cluster/logstore/s3'
                    ]
                  },
                  '/administration/cluster/autotakeover/',
                  '/administration/cluster/loadbalancer/reverse_proxies',
                  '/administration/configuration/remote-job-execution',
                  '/administration/cluster/replication/'
                ]
              }
            ]},
    {
      text: 'Security',
      collapsible: true,
      link: '/administration/security/default-users',
      children: [
        '/administration/security/default-users',
        '/administration/security/authentication',
        '/administration/security/authorization',
        '/administration/security/acl-policy-editor',
        '/administration/security/ssl',
        {
          text: 'SSO',
          collapsible: true,
          link: '/administration/security/sso',
          children: [
              '/administration/security/sso/azure-sso.md',
              '/administration/security/sso/okta.md',
              '/administration/security/sso/ping.md'
          ]
        },
        '/administration/security/webapp-http-headers',
        '/administration/security/project-acl',
        '/administration/security/password-security',
        '/administration/security/ratelimiting',
        '/administration/security/blocklist',
        '/administration/security/audit-trail'
      ]
    }
  ]
}]
