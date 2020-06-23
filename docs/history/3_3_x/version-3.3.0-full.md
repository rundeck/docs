# Draft Notes - Release 3.3.0

Name: <span style="color: peru"><span class="glyphicon glyphicon-flash"></span> "onion ring peru flash"</span>

## Overview
**Welcome to the preview release of Rundeck 3.3.0.**

This release includes a long list of feature releases for our Enterprise and Open Source versions and fixes throughout the 3.2.x series.

## Enhancements

### Enhanced Scheduling Options
#### Schedules
[Schedules](/manual/schedules/project-schedules) can be configured independently from jobs as stand-alone schedules to centralize the management of how often jobs run.

![Schedule Creation](~@assets/img/project-schedules-create-form.png)

#### Calendars
[Calendars](/manual/calendars) takes the Schedules offering to a level above time based execution to true Schedule based executions.  Define Ad-Hoc Calendars and let Rundeck know when a job is allowed to run or might be blacked out.

![Calendars List](~@assets/img/relnotes-330-calendars.png)

### Guided Tours
Rundeck [Guided Tours](/manual/tour-manager) provide customizable, interactive walk-throughs to end users to help demonstrate Rundeck processes.  They can be used as guidance for first-time users getting familiar with the system, or provide step-by-step instructions for how to execute longer processes.  Managed in product with a new UI manager tour definitions can be built as System Tours and are available to all projects or Project Tours and tied to that individual project.  Tours are stored in the Rundeck database so they are easily shared to all members in clustered environments.

![Tours Example](~@assets/img/relnotes-330-tours.png)

### New Log Viewer
An enhanced Log Viewer loads job activity 1000% faster with improved usability options.  Along with significant performance improvements the new log viewer includes light/dark theme options, and no longer takes over the browser while loading large job output.

![Log Viewer](~@assets/img/relnotes-330-eventview.png)

### User/Group Management Wizard
Rundeck user accounts can now be added/managed directly in the Enterprise version of Rundeck. Define local users and groups quickly and easily from the new [User Manager](/manual/user-management/user-mgmt.html#manage-local-users) administration interface.

![User Manager Screen](~@assets/img/usermgr-manage-users.png)

### Node Wizard Plugin
New [Node Wizard plugin](/administration/projects/resource-model-sources/node-wizard) is built-in to Rundeck Enterprise for managing node entries local to Rundeck.  The plugin can still merge values with other Node Sources but offer direct value settings with a friendly GUI based interface.  No need to write complicated JSON/YAML for local Node Sources!

![Node Editor](~@assets/img/relnotes-330-nodeedit.png)

### Job Tags
Use Job tags to refine searching for your important jobs.  ***!!! Would also like content about the two job view options here***

### API Enhancements
A new License Status API has been added to allow programmatic checking of your instance license status.

### Extensive Engine Enhancements
- Backend updates to Grails 4/Gradle 5 which now support Java 11.
- Spring Security 5 upgrade including [OAuth2 updates](/administration/security/sso). (Be sure to read [docs for changes required when upgrading](/upgrading/upgrading-to-rundeck-3.3.html))
- Logging system upgraded to [Log4J2](https://logging.apache.org/log4j/2.x/) (Be sure to read [docs for changes required when upgrading](/upgrading/upgrading-to-rundeck-3.3.html))

#### Docker Updates
- Ubuntu backend updated to current LTS version
- Option to use Open JDK 11 in some builds

### Documentation
A significant documentation revamp was done as part of the 3.3.x release.  It can be [found here](https://docs.rundeck.com/) and covers all the new features and funtionality.

## Upgrading
See [Upgrading to Rundeck 3.3](/upgrading/upgrading-to-rundeck-3.3.html) for details about how to upgrade from 3.2.  If you are upgrading from a version prior to 3.2 be sure to [start here](/upgrading/).

## Notices
Notices for future changes that may require code changes.

::: warning
  API Deprecation Notice.
:::

## Additional Improvements

[Milestone 3.3.0](https://github.com/rundeck/rundeck/milestone/144)

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
* [fix: incorrect height for sidebar wrapper](https://github.com/rundeck/rundeck/pull/6063)
* [Log 4j2 support](https://github.com/rundeck/rundeck/pull/6052)
* [Grails 4 Upgrade](https://github.com/rundeck/rundeck/pull/6051)
* [Fix an issue that caused job execution to get stuck inside a loop when an exception was thrown from a log event call](https://github.com/rundeck/rundeck/pull/6050)
* [Docker - Update Ubuntu LTS to 18.04](https://github.com/rundeck/rundeck/issues/6032)
* [Remove rd-acl](https://github.com/rundeck/rundeck/pull/5920)
* [Rundeck secrets are group and world readable](https://github.com/rundeck/rundeck/issues/3017)

## Contributors

* Carlos Eduardo (carlosrfranco)
* Forrest Evans (fdevans)
* Greg Schueler (gschueler)
* Muneyuki Noguchi (mnogu)
* Greg Zapp (ProTip)
* Stephen Joyner (sjrd218)
* carlos
* niravassar

## Bug Reporters

* ProTip
* carlosrfranco
* gmr
* gschueler
* ltamaster
* mnogu
* sjrd218
