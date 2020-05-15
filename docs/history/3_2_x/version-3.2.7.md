# Release 3.2.7

Name: <span style="color: deepskyblue"><span class="glyphicon glyphicon-plane"></span> "nacho deepskyblue plane"</span>

## Issues

[Milestone 3.2.7](https://github.com/rundeck/rundeck/milestone/141)

* [Fix execution stats lockmode](https://github.com/rundeck/rundeck/pull/6054)
* [Docker - Fix default value for config storage converter path](https://github.com/rundeck/rundeck/pull/6039)
* [Docker - Refresh base image and update remco](https://github.com/rundeck/rundeck/pull/6038)
* [Update grails spring security plugin to 3.3.1](https://github.com/rundeck/rundeck/pull/6027)
* [Add the ability to refresh the user summary page using the event bus](https://github.com/rundeck/rundeck/pull/6024)
* [Prevent attempt to schedule jobs on a quartz scheduler that is shutdown](https://github.com/rundeck/rundeck/pull/6013)
* [Update user summary menu item to use a spring bean.](https://github.com/rundeck/rundeck/pull/6012)
* [Fixing the job import process where the ruleset strategy was not saved correctly](https://github.com/rundeck/rundeck/pull/6010)
* [Fix imported jobs referenced by UUID instead of name](https://github.com/rundeck/rundeck/pull/6007)
* [Handle tags with null values on parser of node resource files in json format](https://github.com/rundeck/rundeck/pull/6006)
* [Fix asUser on retry job](https://github.com/rundeck/rundeck/pull/6002)
* [Jobs migrated from Rundeck2 to Rundeck 3 have "search by UUID" option set by default.](https://github.com/rundeck/rundeck/issues/6001)
* [Clean up duplicate LogFileStorageRequest entries at startup](https://github.com/rundeck/rundeck/pull/5995)
* [Project storage SPI](https://github.com/rundeck/rundeck/pull/5994)
* [Docker - Refresh image](https://github.com/rundeck/rundeck/issues/5993)
* [Fix #5938 error when logging in with empty credentials.](https://github.com/rundeck/rundeck/pull/5990)
* [resource model Format: resourcejson does not load big files](https://github.com/rundeck/rundeck/issues/5988)
* [Fix #5979 update ui-trellis to support markdown extended property descriptions](https://github.com/rundeck/rundeck/pull/5983)
* [Add an invalid key pattern to avoid characters like space on log filter key](https://github.com/rundeck/rundeck/pull/5981)
* [Remove legacy node config UI](https://github.com/rundeck/rundeck/pull/5980)
* [Docker - Make /etc/passwd group writable](https://github.com/rundeck/rundeck/pull/5944)
* [Rd authorization libs](https://github.com/rundeck/rundeck/pull/5919)
* [Upgrade vue-scrollto from 2.15.0 to 2.17.1](https://github.com/rundeck/rundeck/pull/5825)
* [Upgrade vue-fuse from 2.0.2 to 2.2.0](https://github.com/rundeck/rundeck/pull/5824)
* [Upgrade vue2-filters from 0.3.0 to 0.9.1](https://github.com/rundeck/rundeck/pull/5823)
* [Bugfix: close logread in tailExecutionOutput](https://github.com/rundeck/rundeck/pull/5695)
* [Retry Execution API: api/33/\[JOBID\]/retry/\[EXECID\] requires runAs permission](https://github.com/rundeck/rundeck/issues/5670)
* [Docker - Set uid in passwd for OpenShift support](https://github.com/rundeck/rundeck/pull/5440)
* [Beta Execution output viewer](https://github.com/rundeck/rundeck/pull/5394)

## Contributors

* Christoph Hille (hille721)
* David Terrell (dbt)
* Greg Schueler (gschueler)
* Jaime (jtobard)
* Luis Toledo (ltamaster)
* Greg Zapp (ProTip)
* Stephen Joyner (sjrd218)
* carlos

## Bug Reporters

* ProTip
* carlosrfranco
* cwaltherf
* dbt
* elioe
* gschueler
* hille721
* jairov4
* jtobard
* ltamaster
* sjrd218