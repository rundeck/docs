# Preview Release 3.3.0

Name: <span style="color: peru"><span class="glyphicon glyphicon-flash"></span> "onion ring peru flash"</span>

## Overview
**Welcome to the preview release of Rundeck 3.3.0.**

This release includes a long list of feature releases for our Enterprise and Open Source versions and fixes throughout the 3.2.x series.

## Enhancements

### Enhanced Scheduling Options
#### Schedules
[Schedules](/manual/schedules/project-schedules) can be decoupled from jobs to make managing schedule changes easier.

#### Calendars
[Calendars](/manual/calendars) offer blackout/allowed job run dates and times.

### User Guidance Tours
[HTTP Tours](/manual/tour-manager) can now be built and managed in product.

### Improved Log Viewer
An Enhanced Log Viewer loads job activity 1000% faster with improved usability options.

### Local User Management
- New User Management Wizard for local Rundeck user accounts.

### Node Management
- New Node Wizard for creating node entries local to Rundeck.

### Job Tags
- Job tags to refine searching for your important jobs.

### Extensive Backend Enhancements
- Backend updates to Grails 4/Gradle 5 which now support Java 11.
- Spring Security 5 upgrade including [OAuth2 updates](/administration/security/sso). (Be sure to read docs for the changes required)
- Logging system is [Log4J2](https://logging.apache.org/log4j/2.x/) (Be sure to read docs for changes required)

#### Docker
- Ubuntu backend updated to current LTS version
- Option to use Open JDK 11 in some builds

### API Changes
- A new License Status API has been added to allow programmatic checking of your instance license status.


### Documentation
A significant documentation revamp was done as part of the 3.3.x release.  It can be [found here](https://docs.rundeck.com/) and covers all the new features and funtionality.

## Upgrading
See [Upgrading to Rundeck 3.3](/upgrading/upgrading-to-rundeck-3.3.html) for details about how to upgrade from 3.2.  If you are upgrading from a version prior to 3.2 be sure to [start here](/upgrading/).


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
