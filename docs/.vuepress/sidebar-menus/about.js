module.exports = [{
  title: 'About',
  collapsable: false,
  sidebarDepth: 2,
  children: [
    '/about/introduction.md',
    {
       title: 'Rundeck Enterprise',
       collapsable: true,
       path: '/about/enterprise/',
       sidebarDepth: 1,
       children: [
         ['/about/enterprise/', 'Overview']
    ]},
    {
       title: 'Rundeck Cloud',
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
