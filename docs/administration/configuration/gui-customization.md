# GUI Customization

::: warning
As of version 3.4.0 some of these setting may not work as intended.  We will be testing and improving this list over the 3.4.x series.
:::

You can modify some display features of the Rundeck GUI by setting
these properties in the [rundeck-config.properties](/administration/configuration/config-file-reference.md#rundeck-config.properties) file:

### rundeck.gui.logo
- Example: ```rundeck.png```
- min version: 3.0.1
- Does not require restart.

Requires staticUserResources to be enabled. Sets the user's logo (e.g. company/org logo) on the login, logout pages and in the header of the application.  See `rundeck.gui.staticUserResources.enabled` for file location.


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
- Requires a restart

Enable serving static files from $RDECK_BASE/user-assets dir. This must be set to true if using a custom logo.

### rundeck.feature.pagedjoblist.enabled
- Example: ```TRUE```
- min version: 3.2.6 Enterprise

Enables the option of a job list UI for a project that is capable of listing tens of thousands of jobs in a project.
This UI does not support bulk operations or SCM operations and does not display jobs in a grouped layout, but is significantly faster than the default job list UI.

When this property has been enabled, a new project configuration property will be added to the project `User Interface` configuration tab called `Default Job List`
You can use the drop-down menu to toggle the job list component for the project.

![Figure: Select Project Job List Component](/assets/img/configure-default-job-list.png)

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
- Example: ```10```
- min version: 2.x

Number of jobs per page to display when job pagination is enabled


### rundeck.gui.titleLink
- Example: ```http://rundeck.org```
- min version: 2.x

URL for the link used by the app header icon.

### rundeck.gui.helpLinkName
- Example: ```Your custom name here```
- min version: 4.7

To customize the link's name of the "Get help" button in Rundeck's GUI Support footer.

![Figure: The "Get Help link name changed for a custom value named in the property"](/assets/img/gui-custom-helpLink-name.png)

### rundeck.gui.workflowGraph
- Example: ```false```
- min version: 4.10

Prevents the ruleset graph renderization.

![Figure: The workflow graph component changes for another more minimalistic](/assets/img/gui-workflow-graph.png)

### rundeck.gui.helpLink
- Example: ```https://yoururlhere.com```
- min version: 2.x

To customize the Url of the "Get Help" button in Rundeck's GUI Support footer.

![Figure: The "Get Help link redirects to a custom link named in the property"](/assets/img/gui-custom-helpLink.png)


### rundeck.gui.realJobTree
- Example: ```false (Default: true```
- min version: 2.x

Displaying a real tree in the Jobs overview instead of collapsing empty groups.


### rundeck.gui.startpage
- Example: ```(Default: projectHome)```
- min version: 2.x

Change the default page shown after choosing a project. Values: 'adhoc', 'configure', 'createJob', 'events', 'home', 'jobs', 'nodes', 'projectHome' or 'uploadJob'.


### rundeck.gui.enableJobHoverInfo
- Example: ```(Default: true)```
- min version: 2.x

Shows job information when the user hovers over a job name in various pages.


### rundeck.gui.login.disclaimer
- Example: ```(Default: blank)```
- min version: 3.0.8

HTML displayed on the login page below the login form element but separate from the login form element. The HTML will be sanitized before display.


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


### rundeck.gui.errorpage.hidestacktrace
- Example: ```(Default: false)```
- min version: 2.x

Hide Java stacktraces from the end true/false user when an error occurs.


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

Sets the maximum number of nodes to be displayed on [Matched Nodes](/manual/jobs/creating-jobs.md#node-dispatching-and-filtering) session in job edit page.


### rundeck.gui.keystorage.downloadenabled
- Example: ```(Default: true)```
- min version: 4.2.0

Enable/disable the public key GUI download option in the Key Storage. 
Set the value to `false` to disable the download/view option. By default, the attribute is set `true`.

## Other Customizations
The `rundeck.gui.errorpage.hidestacktrace` can also be set to true via a Java system property defined at system startup:
`-Dorg.rundeck.gui.errorpage.hidestacktrace=true`.

## Localization

See [Localization](/administration/configuration/localization.md).
