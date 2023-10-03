export default[{
  text: 'About',
  collapsible: false,
  headerDepth: 2,
  children: [
    '/about/introduction.md',
    {
       text: 'Process Automation',
       collapsible: true,
       link: '/about/enterprise/',
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
