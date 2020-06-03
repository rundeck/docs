export default ({
    Vue, // the version of Vue being used in the VuePress app
    options, // the options for the root Vue instance
    router, // the router instance for the app
    siteData, // site metadata
    isServer // is this enhancement applied in server-rendering or client
}) => {
  /** Update service workers on navigation */
  router.afterEach( (to, from) => {
      if (typeof navigator === 'undefined')
        return

      navigator.serviceWorker.getRegistrations().then( regos => {
          regos.forEach(r => {
              r.update()
          })
      })
  })
}