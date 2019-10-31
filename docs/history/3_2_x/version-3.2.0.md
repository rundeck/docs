# Release 3.2.0

Name: <span style="color: aquamarine"><span class="glyphicon glyphicon-knight"></span> "nacho aquamarine knight"</span>

## Upgrading
See the upgrade documentation [here](https://docs.rundeck.com/3.1.0-rc2/upgrading/upgrade-to-rundeck-3.1.html).

## Enhancements

### Job Resume

### Docker

### Misc

## Development

### Job Life-Cycle Plugin Type
Job life cycle plugin offers the possibility to intercept the certain job events and manipulate the data/flow:
1. Before job execution: It triggers before the job execution exists and it can be used to:
    - Prevent the job to be execution by throwing an exception (JobLifecyclePluginException)
    - Prevent the job to be executed by returning "isSuccessful" false
    - Change option values in runtime by seting "isUseNewValues" true
2. Before saving a job: It can be used to modify/add/remove options to the persisted job:
    - If "isUseNewValues" returns "true" the system will replace the current job options with the ones returned by "getOptions" method

### Misc

* Job workflow API endpoint [#5408](https://github.com/rundeck/rundeck/pull/5408)

## Bug Fixes


## Issues

* [Fix test, update naming for encrypter plugin](https://github.com/rundeck/rundeck/pull/5442)
* [Allow all plugin properties to use groupName and grouping rendering options.](https://github.com/rundeck/rundeck/pull/5441)
* [Fix: error importing job xml with single exec lifecycle plugin entry](https://github.com/rundeck/rundeck/pull/5434)
* [Fixes #5121. Bump repository version.](https://github.com/rundeck/rundeck/pull/5426)
* [fixing issue using additional props on project plugin config vue ](https://github.com/rundeck/rundeck/pull/5419)
* [fix #4842 default selected validation fails if the object is not a map](https://github.com/rundeck/rundeck/pull/5412)
* [Add API endpoint for getting job workflow tree](https://github.com/rundeck/rundeck/pull/5408)
* [Lifecycle plugins update](https://github.com/rundeck/rundeck/pull/5391)
* [Fixes #5320 - adds a wordbreak to the contents of a table column](https://github.com/rundeck/rundeck/pull/5390)
* [Fix step search page content fixes #5385](https://github.com/rundeck/rundeck/pull/5386)
* [Job edit/create page source contains unnecessary embedded data](https://github.com/rundeck/rundeck/issues/5385)
* [Webhooks on by default.](https://github.com/rundeck/rundeck/pull/5382)
* [Wait for AbortResult from event bus reply. Fixes #4916.](https://github.com/rundeck/rundeck/pull/5381)
* [fix selectable run later executions on bulk delete 5373](https://github.com/rundeck/rundeck/pull/5379)
* [Fix missing import 5375](https://github.com/rundeck/rundeck/pull/5376)
* [Missing ScheduledExecution import](https://github.com/rundeck/rundeck/issues/5375)
* [Webhooks on by default](https://github.com/rundeck/rundeck/issues/5369)
* [ Move AuthConstants.java from grails app to core ](https://github.com/rundeck/rundeck/pull/5362)
* [Fix error when attempting to download text log](https://github.com/rundeck/rundeck/pull/5360)
* [Move AuthConstants class to core](https://github.com/rundeck/rundeck/issues/5354)
* [New ACL for enterprise cluster view.](https://github.com/rundeck/rundeck/pull/5349)
* [cluster view custom acl ](https://github.com/rundeck/rundeck/issues/5348)
* [Fix job group expansion applying to all levels](https://github.com/rundeck/rundeck/pull/5345)
* [Concurrency improvements for workflow state](https://github.com/rundeck/rundeck/pull/5341)
* [adding execution file storage delete](https://github.com/rundeck/rundeck/pull/5334)
* [options values can be replaced by global properties](https://github.com/rundeck/rundeck/pull/5333)
* [Fix error on remote opts with enforced values for simple JSON object](https://github.com/rundeck/rundeck/pull/5325)
* [\[RFC\] Fix scrolling to bottom in log output](https://github.com/rundeck/rundeck/pull/5322)
* [fixing readme and motd project import archive](https://github.com/rundeck/rundeck/pull/5319)
* [Option Validation with URLs not working](https://github.com/rundeck/rundeck/issues/5314)
* [README content is empty at the moment of import the project.](https://github.com/rundeck/rundeck/issues/5303)
* [purge execution logs "Execution History Clean" new feature don't work.](https://github.com/rundeck/rundeck/issues/5274)
* [Use containers instead of binaries to run minio](https://github.com/rundeck/rundeck/pull/5273)
* [ExecutionLifecyclePlugin and JobLifecyclePlugin](https://github.com/rundeck/rundeck/pull/5212)
* [Feature request: Log Execution File Storage Plugin doesn't support delete files](https://github.com/rundeck/rundeck/issues/5171)
* [\[3.2\] core refactor and job plugin](https://github.com/rundeck/rundeck/pull/5142)
* [Problem with job group expansion](https://github.com/rundeck/rundeck/issues/5119)
* [exposing password encrypt utility interface as plugin](https://github.com/rundeck/rundeck/pull/5022)
* [RDK Cluster : scheduled job on node A killed on node B : still launched](https://github.com/rundeck/rundeck/issues/4916)
* [No access to options (enforced from allowed values) when triggering by token](https://github.com/rundeck/rundeck/issues/4842)
* [Scrolling output log](https://github.com/rundeck/rundeck/issues/4047)

## Contributors

* Alberto Hormazabal
* Ben Jackson (puremourning)
* Greg Schueler (gschueler)
* Jaime Tobar (jtobard)
* Jesse Marple (jessemarple)
* Luis Toledo (ltamaster)
* Greg Zapp (ProTip)
* Stephen Joyner (sjrd218)
* robertopaez
* ronaveva

## Bug Reporters

* EugenePapkou
* MegaDrive68k
* ProTip
* ahamilto
* aznkid4ever
* cukal
* gschueler
* jessemarple
* jtobard
* ltamaster
* nmamn
* philjov
* puremourning
* robertopaez
* ronaveva
* sjrd218