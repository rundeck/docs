# Release 3.3.0

Name: <span style="color: peru"><span class="glyphicon glyphicon-flash"></span> "onion ring peru flash"</span>

- [Download Rundeck](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)

## Overview

This release includes a long list of useful feature enhancements for our Enterprise and Open Source versions of Rundeck.  **Enhanced Scheduling Options** take job schedules from simple time based runs to comprehensive schedule based executions.  **Guided Tours** are now natively available in the product to guide users through Rundeck processes.  New plugins for managing users, managing nodes, and organizing jobs also streamline administration tasks.  Rundeck 3.3.0 has a whole new engine behind the scenes (Grails 4, Log4J2, Gradle 5, OAuth2, Spring 5, etc.) and now **supports Java 11**.

## Enhancements

### Enhanced Scheduling Options (Enterprise)
#### Schedules
[Schedules](/manual/schedules/project-schedules) can be configured independently from jobs as stand-alone schedules to centralize the management of how often jobs run.

![Schedule Creation](~@assets/img/project-schedules-create-form.png)

#### Calendars
[Calendars](/manual/calendars) takes the Schedules offering to a level above time based execution to true Schedule based executions.  Define Ad-Hoc Calendars and let Rundeck know when a job is allowed to run or might be blacked out.

![Calendars List](~@assets/img/relnotes-330-calendars.png)

### Guided Tour Manager (Enterprise)
A new Rundeck [Guided Tours Manager](/manual/tour-manager) provide an authoring environment to build customizable, interactive walk-throughs to end users to help demonstrate Rundeck processes.  Tours can be used as guidance for first-time users getting familiar with the system, or provide step-by-step instructions for how to execute longer processes.  Tours can now be managed in product with a new UI/Markdown editor to design tour definitions. Guided Tours can be built as System Tours and are available to all projects or Project Tours and tied to that individual project.  As part of this Enterprise update Tours are stored in the Rundeck database so they are easily shared to all members in clustered environments.

![Tours Example](~@assets/img/relnotes-330-tourdemo.gif)

### New Log Viewer
A completely re-architected Log Viewer loads job activity faster with improved usability options.  Along with significant performance improvements the new log viewer includes light/dark theme options, and no longer takes over the browser while loading large job output.  There is also the ability to send a URL that link directly to specific lines in the output to streamline collaborative troubleshooting.

![Log Viewer](~@assets/img/relnotes-330-eventview.png)

### User/Group Management Wizard (Enterprise)
Rundeck user accounts can now be added/managed directly in the Enterprise version of Rundeck. Define local users and groups quickly and easily from the new [User Manager](/manual/user-management/user-mgmt.html#manage-local-users) administration interface.

![User Manager Screen](~@assets/img/usermgr-manage-users.png)

### Node Wizard Plugin (Enterprise)
New [Node Wizard plugin](/manual/projects/resource-model-sources/node-wizard) is built-in to Rundeck Enterprise for managing node entries local to Rundeck.  The node data is stored in the Rundeck database for easy sharing in clustered environments.  The plugin can still merge values with other Node Sources but offer direct value settings with a friendly GUI based interface.  No need to write complicated JSON/YAML for local Node Sources!

![Node Editor](~@assets/img/relnotes-330-nodeedit.png)

### Job Tags
Use Job Tags to take your Runbook organization to a new level.  Quickly find jobs based on keywords chosen for each job.

### API Enhancements
A new License Status API has been added to allow programmatic checking of your instance license status.

### Extensive Engine Enhancements
Significant updates to the backend offer performance increases and improved security options.  Below are the high level highlights:

- Backend updated to Grails 4 which now support Java 11.
- Spring Security 5 upgrade including [OAuth2 updates](/administration/security/sso). (Be sure to read [docs for changes required when upgrading](/upgrading/upgrading-to-rundeck-3.3.html))
- Logging system upgraded to [Log4J2](https://logging.apache.org/log4j/2.x/) (Be sure to read [docs for changes required when upgrading](/upgrading/upgrading-to-rundeck-3.3.html))

### Docker Updates
- Base image updated to **Ubuntu 18.04 LTS**
- **OpenJDK 11** is the installed JVM

From `3.3.0` and on the official Docker images will be based on Ubuntu 18.04 and OpenJDK 11.

With open JDK 11 a new, more flexible max heap setting is available:  
`JVM_MAX_RAM_PERCENTAGE`  

This will set the max heap size to a percentage of the available RAM in the running container.
The default is `75%`.

### Documentation
A significant documentation revamp was done as part of the 3.3.x release.  It can be [found here](https://docs.rundeck.com/) and covers all the new features and functionality.

## Upgrading
See [Upgrading to Rundeck 3.3](/upgrading/upgrading-to-rundeck-3.3.html) for details about how to upgrade from 3.2.  If you are upgrading from a version prior to 3.2 be sure to [start here](/upgrading/).

## Notices
Notices for future changes that may require code changes.

::: warning
API version `{{{ apiDepVersion }}}` will become the minimum version in a future release: Rundeck `{{{ apiDepRelease }}}`.

Clients specifying API versions below the Deprecation version should upgrade to use it as the minimum version before then.
:::

## Additional Improvements

[Milestone 3.3.0-M1](https://github.com/rundeck/rundeck/milestone/144)

* [Better spring security integration.](https://github.com/rundeck/rundeck/pull/6105)
* [Fix issue/1019 where running jobs is aways zero even if there are jobs running.](https://github.com/rundeck/rundeck/pull/6100)
* [Tours enhancement](https://github.com/rundeck/rundeck/pull/6096)
* [Avoiding loading all plugins whenever a method needs to search for a plugin description](https://github.com/rundeck/rundeck/pull/6091)
* [Ability to load framework properties from the app config sources.](https://github.com/rundeck/rundeck/pull/6090)
* [Update docker to use log42.](https://github.com/rundeck/rundeck/pull/6087)
* [Fix the Japanese translation of "retry"](https://github.com/rundeck/rundeck/pull/6085)
* [Docker - Update to Ubuntu 18.04 and OpenJDK 11](https://github.com/rundeck/rundeck/pull/6083)
* [Use spring loaded instead of dev tools](https://github.com/rundeck/rundeck/pull/6080)
* [Build ui-trellis as subproject](https://github.com/rundeck/rundeck/pull/6079)
* [FileSystem Key Storage permissions ](https://github.com/rundeck/rundeck/pull/6072)
* [Fix java 11 illegal reflective access warnings](https://github.com/rundeck/rundeck/pull/6071)
* [Fix #6065 plugin values should be shown in multivalued list](https://github.com/rundeck/rundeck/pull/6066)
* [Migrate Vue build to @vue/cli](https://github.com/rundeck/rundeck/pull/6064)
* [Fix incorrect height for sidebar wrapper](https://github.com/rundeck/rundeck/pull/6063)
* [App version display update](https://github.com/rundeck/rundeck/pull/6062)
* [Log 4j2 support](https://github.com/rundeck/rundeck/pull/6052)
* [Grails 4 Upgrade](https://github.com/rundeck/rundeck/pull/6051)
* [Fix an issue that caused job execution to get stuck inside a loop when an exception was thrown from a log event call](https://github.com/rundeck/rundeck/pull/6050)
* [Docker - Update Ubuntu LTS to 18.04](https://github.com/rundeck/rundeck/issues/6032)
* [Remove rd-acl](https://github.com/rundeck/rundeck/pull/5920)
* [Rundeck secrets are group and world readable](https://github.com/rundeck/rundeck/issues/3017)
* [Main screen sticks when non-admin user log in](https://github.com/rundeck/rundeck/issues/6099)
* [Fix for rundeckpro/969 job list paging](https://github.com/rundeck/rundeck/pull/6176)
* [Fix #6174 broken ui without legacy feature flag config](https://github.com/rundeck/rundeck/pull/6175)
* [Docker - Add supplemental roles to ldap config](https://github.com/rundeck/rundeck/pull/6172)
* [Fix for the 404 causing a 500 issue](https://github.com/rundeck/rundeck/pull/6169)
* [Docker - Process passwd update through /tmp for random uid](https://github.com/rundeck/rundeck/pull/6168)
* [tours enhancement 3](https://github.com/rundeck/rundeck/pull/6166)
* [Set project storage to use db by default](https://github.com/rundeck/rundeck/pull/6162)
* [Fix #6160 ui plugin detail not showing](https://github.com/rundeck/rundeck/pull/6161)
* [Fix #6158 should not set incorrect project.name](https://github.com/rundeck/rundeck/pull/6159)
* [Filesystem project storage: project.name property can get set incorrectly](https://github.com/rundeck/rundeck/issues/6158)
* [New Execution viewer release work](https://github.com/rundeck/rundeck/pull/6157)
* [Quell a common grails/spring bean warning](https://github.com/rundeck/rundeck/pull/6156)
* [fix issue 5730: It's a workaround to allow calc metrics when database does not support sql contained within the criteria.](https://github.com/rundeck/rundeck/pull/6155)
* [Add creation of rd_base/server/lib directory](https://github.com/rundeck/rundeck/pull/6154)
* [Webhook save must flush the session](https://github.com/rundeck/rundeck/pull/6152)
* [Upgrade py-winrm-plugin to 2.0.7](https://github.com/rundeck/rundeck/pull/6147)
* [Fix #6139 500 error manually setting project exec disabled property](https://github.com/rundeck/rundeck/pull/6142)
* [Respond with correct content type if server error encountered during request ](https://github.com/rundeck/rundeck/pull/6137)
* [Add webhook plugin ability to write to the response stream](https://github.com/rundeck/rundeck/pull/6133)
* [Webhook UUID validation fix (via @laubstein)](https://github.com/rundeck/rundeck/pull/6131)
* [Accept Environment variables optional for jsch executor. fix #4137](https://github.com/rundeck/rundeck/pull/6130)
* [Handle quartz scheduler failures and log as warning](https://github.com/rundeck/rundeck/pull/6127)
* [Support api versions in semver style format. Update to v35.1](https://github.com/rundeck/rundeck/pull/6126)
* [New Tours fixes](https://github.com/rundeck/rundeck/pull/6124)
* [Fix issue 1020 - Error handler on failed steps should be executed only in failed nodes](https://github.com/rundeck/rundeck/pull/6118)
* [Docker - Optional bindPassword variable for jass-loginmodule](https://github.com/rundeck/rundeck/pull/6103)
* [Add default result for git-import pull action](https://github.com/rundeck/rundeck/pull/6098)
* [Fixes empty job activity list and webhook RunJob plugin](https://github.com/rundeck/rundeck/pull/6000)
* [Webhook job plugin not allowing custom uuid](https://github.com/rundeck/rundeck/issues/5998)
* [Tour Enhancements in Support of U&U15](https://github.com/rundeck/rundeck/issues/5948)
* [Docker - Fix templating errors in jaas-login module](https://github.com/rundeck/rundeck/pull/5732)
* [Container JAAS_LDAP optional settings do not result in a valid configuration file](https://github.com/rundeck/rundeck/issues/5731)
* [Use typed configuration for Rundeck configs.](https://github.com/rundeck/rundeck/pull/5405)
* [Failed: SSHProtocolFailure: channel is not opened .... JSCH default timeout ](https://github.com/rundeck/rundeck/issues/4137)
* [Fix #4085 empty log file causes NaN in percentLoaded value](https://github.com/rundeck/rundeck/pull/6208)
* [Docker - HOME envar is not set](https://github.com/rundeck/rundeck/issues/6191)
* [Docker - Update server session timeout key](https://github.com/rundeck/rundeck/pull/6190)
* [Fix: schedule takeover results in 0 jobs when it should match](https://github.com/rundeck/rundeck/pull/6186)
* [Fix for LogFileStorage save issue](https://github.com/rundeck/rundeck/pull/6185)
* [Add ability to toggle the workflow config 973 fix in docker.](https://github.com/rundeck/rundeck/pull/6183)
* [Docker - Environment Variable $HOME not set](https://github.com/rundeck/rundeck/pull/6164)
* [rd adhoc fails "com.fasterxml.jackson.core.JsonParseException: Non-standard token 'NaN'"](https://github.com/rundeck/rundeck/issues/4085)

## Contributors

* arthurvanduynhoven
* carlos
* Carlos Eduardo (carlosrfranco)
* Christoph Hille (hille721)
* Forrest Evans (fdevans)
* Greg Schueler (gschueler)
* Greg Zapp (ProTip)
* Jaime Tobar (jtobard)
* Laubstein (laubstein)
* ltamaster
* Muneyuki Noguchi (mnogu)
* Nick Cammorato (cammoraton)
* niravassar
* ProTip
* Stephen Joyner (sjrd218)

## Bug Reporters

* cammoraton
* carlosrfranco
* gmr
* gschueler
* hille721
* jessemarple
* jtobard
* laubstein
* ltamaster
* MegaDrive68k
* mnogu
* ProTip
* sebastianbello
* ShedPlant
* sjrd218
