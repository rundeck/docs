module.exports = [{
  title: 'API',
  path: '/api/',
  children: [
    "./",
    {
      title: "Resources",
      collapsable: true,
      children: [
          '/api/auth-tokens',
          '/api/jobs',
          '/api/projects'
      ]
    }
  ]
}]