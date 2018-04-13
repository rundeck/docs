% Version 2.11.0
% greg
% 04/13/2018

Release 2.11.0-RC1
===========

Date: 2018-04-13

Name: <span style="color: Olive"><span class="glyphicon glyphicon-music"></span> "cappuccino olive music"</span>

## Upgrading from Earlier versions

* See the [Upgrading Guide](../upgrading/index.html)

## Notes

This is a prerelease of Rundeck 2.11, called "RC1".

New Features:

* SCM/Git plugin: 
	* works in Cluster mode
	* improvements to jobs page load speed
	* can disable SCM status checks in the GUI
* Projects: Set a Label to display instead of the name
* Job reference steps:
	* Can reference jobs via UUID as well as group/name, so you can rename jobs [#3115](https://github.com/rundeck/rundeck/pull/3115)
	* Deleting a job will check if any steps reference the job and warn you
	* Automatically pass job options to the job reference [#3056](https://github.com/rundeck/rundeck/pull/3056)
	* Notifications for referenced jobs are triggered
	* Statistics (success/duration) of referenced jobs are updated
	* Timeout for referenced jobs is enforced
	* Choose behavior if the referenced job is disabled: fail or pass
	* (see [#3040](https://github.com/rundeck/rundeck/pull/3040))
* Job Options: 
	* Set a Label to display instead of the name
	* Multivalue option delimiter is available in data context as `${option.name.delimiter}`/`$RD_OPTION_NAME_DELIMITER`
* Plugins: admins can disable/enable plugins for a project in the GUI or via project config [#3122](https://github.com/rundeck/rundeck/pull/3122)
* Job Node Threadcount: can use an option value
* Job Notification:
	* Can send a notification if the job duration exceeds an absolute time, or relative to the job's average [#3087](https://github.com/rundeck/rundeck/pull/3087)
	* Separate notifications for failure vs. retryable failure (i.e.) [#2864](https://github.com/rundeck/rundeck/pull/2864)
* Plugin development:
	* dynamic list of Select value inputs for Java plugins

Bug fixes:

* many

Potentially breaking changes:

* RPM spec: the `rundeck` user/group is now created within system UID ranges [#3195](https://github.com/rundeck/rundeck/pull/3195)
* ACL:
	* previously: GUI actions "Project > Edit Configuration" and "Project > Edit Nodes" required `admin` project access
	* now: only `configure` level access is required
	* NOTE: API behavior was always this way, so this change simply aligns the access requirements.
	* Potential security implications:
		* users/roles granted `configure` access to a project will now be able to modify Project Nodes or Configuration via the GUI
		* the same users/roles would already have this access if using the API
	* [#3084](https://github.com/rundeck/rundeck/pull/3084)

## Contributors

* Aaron Levy (aaronmaxlevy)
* Csongor Gyuricza (csgyuricza)
* Greg Schueler (gschueler)
* Jaime Tobar (invalid-email-address)
* Luis Toledo (ltamaster)
* RNavarro (ronave)
* Steven Grimm
* carlos (carlosrfranco)
* jtobard

## Bug Reporters

* MustaphaB1
* aaronmaxlevy
* ahonor
* carlosrfranco
* csgyuricza
* dirkniblick
* emiliohh
* giovanimarin
* gschueler
* johnpaularthur
* jtobard
* karthikaraja
* ltamaster
* makered
* mathieuchateau
* pawadski
* ronave
* sebastianbello
* sgrimm-sg
* shvytejimas
* smithtimamy
* swtch1

## Issues

[Milestone 2.11.x](https://github.com/rundeck/rundeck/milestone/65)

* [Fix git-import plugin error ](https://github.com/rundeck/rundeck/pull/3274)
* [SCM import plugin error when fetching remote changes](https://github.com/rundeck/rundeck/issues/3273)
* [Create empty resources file](https://github.com/rundeck/rundeck/pull/3271)
* [Fixing Job Filter just show 20 jobs: https://github.com/rundeck/runde…](https://github.com/rundeck/rundeck/pull/3270)
* [Fixing Scheduled jobs fail when using roleNameAttribute="distinguishe…](https://github.com/rundeck/rundeck/pull/3267)
* [Fix Bug 3256](https://github.com/rundeck/rundeck/pull/3265)
* [Disable JSON check for remote options](https://github.com/rundeck/rundeck/pull/3260)
* [Fix #3258 add user.login info to setup input](https://github.com/rundeck/rundeck/pull/3259)
* [BUG: "Description" field is blanked when "Project Name" is an invalid string](https://github.com/rundeck/rundeck/issues/3256)
* [adding passphrase storage in simple configuration GUI](https://github.com/rundeck/rundeck/pull/3255)
* [Project free form label](https://github.com/rundeck/rundeck/pull/3253)
* [Cannot create an empty resources.xml file](https://github.com/rundeck/rundeck/issues/3246)
* [Scheduled jobs fail when using roleNameAttribute="distinguishedName" in the AD configuration ](https://github.com/rundeck/rundeck/issues/3242)
* [Fix issues with test ordering](https://github.com/rundeck/rundeck/pull/3236)
* [Correct storage type from "filesystem" to "file" (Documentation only)](https://github.com/rundeck/rundeck/pull/3230)
* [Fix 500 error api response for running executions with invalid project name](https://github.com/rundeck/rundeck/pull/3228)
* [Malformed Request Breaks API](https://github.com/rundeck/rundeck/issues/3223)
* [Job Filter just show 20 jobs](https://github.com/rundeck/rundeck/issues/3221)
* [Edit job doesn't always change the schedule owner](https://github.com/rundeck/rundeck/pull/3204)
* [Changing RPM Spec file to add rundeck user and group within system UI…](https://github.com/rundeck/rundeck/pull/3195)
* [Option "label" field for display name](https://github.com/rundeck/rundeck/pull/3135)
* [Plugins control](https://github.com/rundeck/rundeck/pull/3122)
* [Job Reference by UUID](https://github.com/rundeck/rundeck/pull/3115)
* [Scm cluster config](https://github.com/rundeck/rundeck/pull/3102)
* [Average notification duration enhancement](https://github.com/rundeck/rundeck/pull/3087)
* [Fix #3012 admin access required to modify project config/nodes in gui](https://github.com/rundeck/rundeck/pull/3084)
* [Allow option value for thread count](https://github.com/rundeck/rundeck/pull/3068)
* [Checking for dynamic properties unless the step is a "plugin" type](https://github.com/rundeck/rundeck/pull/3066)
* [Customize average duration condition for the notification plugin.](https://github.com/rundeck/rundeck/issues/3064)
* [JobRef import options](https://github.com/rundeck/rundeck/pull/3056)
* [Project description](https://github.com/rundeck/rundeck/pull/3054)
* [Enhancement Request / project.ssh-key-passphrase-storage-path not shown in  "simple configuration" GUI](https://github.com/rundeck/rundeck/issues/3051)
* [Exposing the delimiter on a environment variable for multi-valued opt…](https://github.com/rundeck/rundeck/pull/3050)
* [Scm speed enhancement](https://github.com/rundeck/rundeck/pull/3046)
* [Better child job support](https://github.com/rundeck/rundeck/pull/3040)
* [Extend plugin interface to dynamically read configuration input choices](https://github.com/rundeck/rundeck/pull/3029)
* [Import options defined for Job when it is added as a workflow step](https://github.com/rundeck/rundeck/issues/3022)
* [ACLs for project admin and delete_execution are mutually exclusive](https://github.com/rundeck/rundeck/issues/3012)
* [Enhancement request: Not able to load JSON remote options - Rundeck requires the content-type header to be set to 'application/json'](https://github.com/rundeck/rundeck/issues/2922)
* [Job Timeout & Kill Job Does Not Halt Job Steps](https://github.com/rundeck/rundeck/issues/2911)
* [Separate notifications for retryable failures](https://github.com/rundeck/rundeck/pull/2864)
* [Add unicode icons to HTML page title for execution results](https://github.com/rundeck/rundeck/pull/2791)
* [Rundeck don't update job name's reference after to change job's name](https://github.com/rundeck/rundeck/issues/2701)
* [Exposing the delimiter on a environment variable for multi-valued options](https://github.com/rundeck/rundeck/issues/2554)
* [Allow option value for thread count](https://github.com/rundeck/rundeck/issues/2440)
* [How to trigger child jobs using email notifications](https://github.com/rundeck/rundeck/issues/1841)
* [SCM: not compatible with clustering/HA](https://github.com/rundeck/rundeck/issues/1622)
* [Child job notifications don't trigger](https://github.com/rundeck/rundeck/issues/1574)
* [Workflow broken after job rename](https://github.com/rundeck/rundeck/issues/1155)
* [Feature Request: When using the retry option, allow option to suppress notifications until the last execution](https://github.com/rundeck/rundeck/issues/1067)
* [Job delete/rename: should check whether any job references would break](https://github.com/rundeck/rundeck/issues/257)
