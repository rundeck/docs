export default[{
  text: 'About',
  collapsible: false,
  headerDepth: 2,
  children: [
    '/about/introduction.md',
    {
       text: 'Runbook Automation Self-Hosted',
       collapsible: true,
       link: '/about/enterprise/',
       children: [
         { 
          text: 'Overview',
          link: '/about/enterprise/'
        }
    ]},
    {
       text: 'Runbook Automation SaaS',
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
    '/about/licensing.md',
    {
      text: 'Release Notes',
      link: '/history/'
    }
  ]
}]
