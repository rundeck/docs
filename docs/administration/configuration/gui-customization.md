# GUI Customization

::: warning
As of version 3.4.0 some of these setting may not work as intended.  We will be testing and improving this list over the 3.4.x series.
:::

You can modify some display features of the Rundeck GUI by setting
these properties in the [rundeck-config.properties](/administration/configuration/config-file-reference.md#rundeck-config.properties) file:

### rundeck.gui.logo
- Example: ```rundeck.png```
- min version: 3.0.1

Requires staticUserResources to be enabled. Sets the user's logo (e.g. company/org logo) on the login, logout pages and in the header of the application


### rundeck.gui.logoSmall
- Example: ```rundeck.small.png```
- min version: 3.0.1

Requires staticUserResources to be enabled. Sets a small user's logo (e.g. company/org logo) to be used in place of the larger logo in the header of the application.


### rundeck.gui.sidebarColor
- Example: ```#2910f8```
- min version: 3.0.2

Sets the background color of the navigation sidebar.


### rundeck.gui.sidebarTextColor
- Example: ```#fffdfa```
- min version: 3.0.2

Sets the text color of the navigation sidebar.


### rundeck.gui.sidebarTextActiveColor
- Example: ```#000000```
- min version: 3.0.2

Sets the active text/link color of the navigation sidebar.


### rundeck.gui.instanceName
- Example: ```Ops Management Console> Prod, Ops Staging```
- min version: 3.0.3

Sets the instance name


### rundeck.gui.instanceNameLabelColor
- Example: ```#2910f8```
- min version: 3.0.3

Sets the instance label color


### rundeck.gui.instanceNameLabelTextColor
- Example: ```#64fe31```
- min version: 3.0.3

Sets the instance label text color


### rundeck.gui.title
- Example: ```Test App```
- min version: 2.x

Title shown in app header


### rundeck.gui.staticUserResources.enabled
- Example: ```TRUE```
- min version: 2.x

Enable serving static files from $RDECK_BASE/user-assets dir. This must be set to true if using a custom logo.

### rundeck.feature.pagedjoblist.enabled
- Example: ```TRUE```
- min version: 3.2.6 Enterprise

Enables the option of a job list UI for a project that is capable of listing tens of thousands of jobs in a project.
This UI does not support bulk operations or SCM operations and does not display jobs in a grouped layout, but is significantly faster than the default job list UI.

When this property has been enabled, a new project configuration property will be added to the project `User Interface` configuration tab called `Default Job List`
You can use the drop-down menu to toggle the job list component for the project.

![Figure: Select Project Job List Component](~@assets/img/configure-default-job-list.png)

### rundeck.gui.defaultJobList
- Example: ```grouped```
- min version: 3.2.6 Enterprise

Sets the default job list type for all projects in Rundeck.
The two options are `grouped` and `paged`.
`grouped` is the default job list that Rundeck has always used.
`paged` is the new job list that can handle very large numbers of jobs in a project.

### rundeck.gui.paginatejobs.enabled
- Example: ```TRUE```
- min version: 2.x

Paginate job list when listing project jobs


### rundeck.gui.paginatejobs.max.per.page
- Example: ```TRUE```
- min version: 2.x

Number of jobs per page to display when job pagination is enabled


### rundeck.gui.titleLink
- Example: ```http://rundeck.org```
- min version: 2.x

URL for the link used by the app header icon.


### rundeck.gui.helpLink
- Example: ```http://rundeck.org/docs```
- min version: 2.x

URL for the help link in the app header.


### rundeck.gui.realJobTree
- Example: ```false (Default: true```
- min version: 2.x

Displaying a real tree in the Jobs overview instead of collapsing empty groups.


### rundeck.gui.startpage
- Example: ```(Default: projectHome)```
- min version: 2.x

Change the default page shown after choosing a project. Values: 'adhoc', 'configure', 'createJob', 'events', 'home', 'jobs', 'nodes', 'projectHome' or 'uploadJob'.


### rundeck.gui.execution.tail.lines.default
- Example: ```(Default: 20)```
- min version: 2.x

Change the default number of lines shown in the execution page in tail mode view.


### rundeck.gui.execution.tail.lines.max
- Example: ```(Default: 100)```
- min version: 2.x

Change the maximum number of lines shown in the execution page in tail mode view.


### rundeck.gui.enableJobHoverInfo
- Example: ```(Default: true)```
- min version: 2.x

Shows job information when the user hovers over a job name in various pages.


### rundeck.gui.login.welcome
- Example: ```(Default: blank)```
- min version: 2.x

Text displayed in the login page.


### rundeck.gui.login.welcomeHtml
- Example: ```(Default: blank)```
- min version: 2.x

HTML displayed on the login page. The HTML will be sanitized before display.


### rundeck.gui.login.footerMessageHtml
- Example: ```(Default: blank)```
- min version: 2.x

HTML displayed on the login page below the login form. The HTML will be sanitized before display.


### rundeck.gui.login.disclaimer
- Example: ```(Default: blank)```
- min version: 3.0.8

HTML displayed on the login page below the login form element but seperate from the login form element. The HTML will be sanitized before display.


### rundeck.gui.errorpage.hidestacktrace
- Example: ```(Default: false)```
- min version: 2.x

Hide Java stacktraces from the end true/false user when an error occurs.


### rundeck.gui.job.description.disableHTML
- Example: ```(Default: false)```
- min version: 2.x

Disable extended Job description true/false and Option description rendering as HTML.


### rundeck.gui.clusterIdentityInHeader
- Example: ```(Default: false)```
- min version: 2.x

When cluster mode is enabled, true/false display server name/ID in header.


### rundeck.gui.clusterIdentityInFooter
- Example: ```(Default: true)```
- min version: 2.x

When cluster mode is enabled, true/false display server name/ID in footer.


### rundeck.gui.userSummaryShowLoginStatus
- Example: ```(Default: false)```
- min version: 3.2.x

Enables login status in user summary page.


### rundeck.gui.userSummaryShowLoggedUsersDefault
- Example: ```(Default: false)```
- min version: 3.2.x

Sets the default value for users logged status to show on summary page (it will only work with rundeck.gui.userSummaryShowLoginStatus=true).

### rundeck.gui.matchedNodesMaxCount
- Example: ```(Default: 100)```
- min version: 3.4.4

Sets the maximum number of nodes to be displayed on [Matched Nodes](/manual/creating-jobs.md#node-dispatching-and-filtering) session in job edit page.


## Other Customizations
The `rundeck.gui.errorpage.hidestacktrace` can also be set to true via a Java system property defined at system startup:
`-Dorg.rundeck.gui.errorpage.hidestacktrace=true`.

## Localization

See [Localization](/administration/configuration/localization.md).
