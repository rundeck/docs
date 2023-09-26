export default[{
  text: 'About',
  collapsible: false,
  sidebarDepth: 2,
  children: [
    '/about/introduction.md',
    {
       text: 'Process Automation',
       collapsible: true,
       link: '/about/enterprise/',
       sidebarDepth: 1,
       children: [
         { 
          text: 'Overview',
          link: '/about/enterprise/'
        }
    ]},
    {
       text: 'Runbook Automation',
       collapsible: true,
       link: '/about/cloud/',
       sidebarDepth: 1,
       children: [
        { 
          text: 'Overview',
          link: '/about/cloud/'
        }
       ]
    },
    '/about/getting-help.md',
    '/about/licensing.md'
  ]
}]
