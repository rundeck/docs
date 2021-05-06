export default ({
    Vue, // the version of Vue being used in the VuePress app
    options, // the options for the root Vue instance
    router, // the router instance for the app
    siteData, // site metadata
    isServer // is this enhancement applied in server-rendering or client
}) => {
  /** Update service workers on navigation */

  const updateWorkers = () => {
    if (typeof navigator === 'undefined')
        return

      navigator.serviceWorker.getRegistrations().then( regos => {
        regos.forEach(r => {
            r.update()
        })
    })
  }

  /** Check now */
  setTimeout(updateWorkers, 0)

  /** Check on route change */
  router.afterEach( (to, from) => {
      if (typeof navigator === 'undefined')
        return

      updateWorkers()
  })
}