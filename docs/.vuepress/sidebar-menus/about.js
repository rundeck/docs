export default[{
  title: 'About',
  collapsable: false,
  sidebarDepth: 2,
  children: [
    '/about/introduction.md',
    {
       title: 'Process Automation',
       collapsable: true,
       path: '/about/enterprise/',
       sidebarDepth: 1,
       children: [
         ['/about/enterprise/', 'Overview']
    ]},
    {
       title: 'Runbook Automation',
       collapsable: true,
       path: '/about/cloud/',
       sidebarDepth: 1,
       children: [
         ['/about/cloud/', 'Overview']
       ]
    },
    '/about/getting-help.md',
    '/about/licensing.md'
  ]
}]
