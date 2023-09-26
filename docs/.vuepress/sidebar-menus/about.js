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
         { 
          title: 'Overview',
          path: '/about/enterprise/'
        }
    ]},
    {
       title: 'Runbook Automation',
       collapsable: true,
       path: '/about/cloud/',
       sidebarDepth: 1,
       children: [
        { 
          title: 'Overview',
          path: '/about/cloud/'
        }
       ]
    },
    '/about/getting-help.md',
    '/about/licensing.md'
  ]
}]
