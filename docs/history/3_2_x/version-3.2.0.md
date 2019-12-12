# Release 3.2.0

Name: <span style="color: aquamarine"><span class="glyphicon glyphicon-knight"></span> "nacho aquamarine knight"</span>

## Upgrading
See [Upgrading to Rundeck 3.2](/upgrading/upgrading-to-rundeck-3.2.html).

## Enhancements

### Job Resume (Enterprise)

The new [Job Resume Plugin \(Enterprise\)](/manual/execution-lifecycle/job-resume.md) allows you to manually or automatically resume an execution at a failed step.

![Execution Plugins](~@assets/img/figure-job-resume-edit-job-execution-plugins.png)

### Node Health Checks (Enterprise)

[Node Health Checks](/manual/healthchecks.md) let you run commands or scripts to check if nodes are healthy. Filter out unhealthy nodes before executing jobs. Capture data and add it to node attributes. See Node Health status in the Node list.

![Health Checks](~@assets/img/healthchecks-health-status-ui.png)	

### Webhooks

[Webhooks](/manual/12-webhooks.md) are now enabled by default (previously incubating).  

Define webhooks in your projects that can trigger one or more jobs.

### Misc

* Webhooks are enabled by default [#5382](https://github.com/rundeck/rundeck/pull/5382)
* New ACL to allow read-only view of the Enterprise Cluster Manager [`view_cluster`](/administration/security/authorization.md#application-scope-resources-and-actions)
* Global variables can be used in option value inputs
* Log File Storage plugins now support deleting stored files when executions are deleted
* New User Summary admin page shows login status

## Development

### New Plugin Type: Execution Lifecycle

A Job-scoped plugin point that allows custom behavior:

* When a Job execution workflow is about to run: can update execution context info, or cause failure if invalid
* After workflow finishes
    
### New Plugin Type: Job Lifecycle

Job life cycle plugin offers allows custom behavior:

* Before a Job execution is created: it can prevent the execution, or update Option input values
* Before saving a job: It can be used to modify/add/remove options on the Job definition

### New Plugin Type: Password Encrypter

Allows encrypting values via the Password Utility menu item.

### New Plugin Type: Audit Listener

Allows auditing user actions: login, logout, login failure, and project access.

## API

* Job workflow API endpoint [#5408](https://github.com/rundeck/rundeck/pull/5408)

## Bug Fixes

* Fix job group expansion applying to all levels [#5345](https://github.com/rundeck/rundeck/pull/5345)
* Fix error on remote opts with enforced values for simple JSON object [#5325](https://github.com/rundeck/rundeck/pull/5325)
* Fix scrolling to bottom in log output [#5322](https://github.com/rundeck/rundeck/pull/5322)

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
