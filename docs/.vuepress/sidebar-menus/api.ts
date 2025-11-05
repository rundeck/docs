export default[{
  text: 'API Documentation',
  link: '/api/',
  children: [
    {
      text: 'API Reference',
      link: '/api/',
      collapsible: true
    },
    '/api/rundeck-api-versions.md',
    '/api/api_basics.md',
    { text: 'Beta API Views',
      children: [
        {link: '/api/openapi-explorer.md', text: 'OpenAPI Explorer'},
        {link: '/api/api-spec.md', text: 'Swagger UI Spec'},
      ]
    }
  ]
}]
