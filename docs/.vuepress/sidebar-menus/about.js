module.exports = [{
  title: 'About',
  collapsable: false,
  sidebarDepth: 2,
  children: [
    '/about/introduction.md',
    {
       title: 'Rundeck Cloud',
       collapsable: true,
       path: '/about/cloud/',
       sidebarDepth: 1,
       children: [
         ['/about/cloud/', 'Overview'],
         ['/about/cloud/cloudjobexec.md', 'Job Execution'],
         ['/about/cloud/cloudusermgmt.md','User Management'],
         ['/about/cloud/cloudfaq.md','FAQ']
       ]
    },
    {
       title: 'Rundeck Enterprise',
       collapsable: true,
       path: '/about/enterprise/',
       sidebarDepth: 1,
       children: [
         ['/about/enterprise/', 'Overview'],
         ['/about/enterprise/system-architecture.md','Architecture']
    ]},
    '/about/getting-help.md'
  ]
}]
