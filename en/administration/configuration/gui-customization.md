% GUI Customization

You can modify some display features of the Rundeck GUI by setting
these properties in the [rundeck-config.properties](configuration-file-reference.html#rundeck-config.properties) file:

-------------------------------------------------------------------------------
**Property**                                **Description**                      **Example**
----------------------                      ----------------------------------   ----------------
`rundeck.gui.title`                         Title shown in app header            Test App

`rundeck.gui.brand.html`                    HTML used in place of title          `Test <b>App</b>`

`rundeck.gui.staticUserResources.enabled`   Enable serving static files          true
                                            from $RDECK_BASE/user-assets dir.
                                            This must be set to true if using
                                            a custom logo.

`rundeck.gui.logo`                          Logo icon path relative to           test-logo.png
                                            $RDECK_BASE/user-assets dir           

`rundeck.gui.logoHires`                     (High Res/retina) Logo icon path     test-logo@2x.png
                                            relative to $RDECK_BASE/user-assets
                                            dir. Should be 2x the specified
                                            logo-height and logo-width

`rundeck.gui.logo-width`                    Icon width for proper display (32px  32px
                                            is best)                             

`rundeck.gui.logo-height`                   Icon height for proper display (32px 32px
                                            is best)                             

`rundeck.gui.paginatejobs.enabled`          Paginate job list when listing project jobs

`rundeck.gui.paginatejobs.max.per.page`     Number of jobs per page to display when job pagniation
                                            is enabled

`rundeck.gui.titleLink`                     URL for the link used by the app     http://rundeck.org
                                            header icon.                         

`rundeck.gui.helpLink`                      URL for the "help" link in the app   http://rundeck.org/
                                            header.                              docs

`rundeck.gui.navbar.background`             Color of the background of the top   `#3C3C3C`
                                            navigation bar.

`rundeck.gui.realJobTree`                   Displaying a real tree in the Jobs   false
                                            overview instead of collapsing            
                                            empty groups. **Default: true**           

`rundeck.gui.startpage`                     Change the default page shown after
                                            choosing a project. Values: 'adhoc',
                                            'configure', 'createJob', 'events',
                                            'home', 'jobs', 'nodes', 'projectHome' or 'uploadJob'.
                                            Default: 'projectHome'.

`rundeck.gui.execution.tail.lines.default`  Change the default number of lines   50
                                            shown in the execution page in tail
                                            mode view. (Default: 20)

`rundeck.gui.execution.tail.lines.max`      Change the maximum number of lines   200
                                            shown in the execution page in tail
                                            mode view. (Default: 100)

`rundeck.gui.enableJobHoverInfo`            Shows job information when the user  false
                                            hovers over a job name in various  
                                            pages. (Default: true)

`rundeck.gui.login.welcome`                 Text displayed in the login form
                                            pages. (Default: blank)     

`rundeck.gui.login.welcomeHtml`             HTML displayed in the login form
                                            pages. The HTML will be sanitized
                                            before display. (Default: blank)
`rundeck.gui.login.footerMessageHtml`       HTML displayed in the login form
                                            pages (below the login form). The HTML will be sanitized
                                            before display. (Default: blank)                                           

`rundeck.gui.errorpage.hidestacktrace`      Hide Java stacktraces from the end   true/false
                                            user when an error occurs.
                                            Default: false.                        

`rundeck.gui.job.description.disableHTML`   Disable extended Job description     true/false
                                            and Option description rendering
                                            as HTML. (Default: false)

`rundeck.gui.clusterIdentityInHeader`       When cluster mode is enabled,        true/false
                                            display server name/ID in header.
                                            (Default: false)

`rundeck.gui.clusterIdentityInFooter`       When cluster mode is enabled,        true/false
                                            display server name/ID in footer.
                                            (Default: true)
-------------------------------------------------------------------------------

The `rundeck.gui.errorpage.hidestacktrace` can also be set to true via a Java system property defined at system startup:
`-Dorg.rundeck.gui.errorpage.hidestacktrace=true`.

## Localization

See [Localization](localization.html).
