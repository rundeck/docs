# Release 3.2.6

Name: <span style="color: deeppink"><span class="glyphicon glyphicon-piggy-bank"></span> "nacho deeppink piggy-bank"</span>

## Upgrading
See [Upgrading to Rundeck 3.2.6](/upgrading/upgrading-to-rundeck-3.2.6.html).

## Issues

[Milestone 3.2.6](https://github.com/rundeck/rundeck/milestone/140)

* [Scheduler - Handle null trigger and do not store durably](https://github.com/rundeck/rundeck/pull/5985)
* [Fix #5894 prevent double click on run job button](https://github.com/rundeck/rundeck/pull/5974)
* [Use pessimistic locking on job stats update](https://github.com/rundeck/rundeck/pull/5971)
* [Remove remaining SCM calls prior to job list on GUI](https://github.com/rundeck/rundeck/pull/5970)
* [Fix #5081 log file storage request should be unique for execution](https://github.com/rundeck/rundeck/pull/5968)
* [Remove scm calls prior to job list.](https://github.com/rundeck/rundeck/issues/5967)
* [Fix #5943 - Avoiding creating temporary files when deleting executions](https://github.com/rundeck/rundeck/pull/5966)
* [Some fixes for saving writeable project node data](https://github.com/rundeck/rundeck/pull/5965)
* [Support windows builds](https://github.com/rundeck/rundeck/pull/5954)
* [Fix #5945 - Shared data context was not considering the base map with options attributes](https://github.com/rundeck/rundeck/pull/5946)
* [option variable not expanded in child job's mail notification](https://github.com/rundeck/rundeck/issues/5945)
* [Job Execution Cleanup process creates many tmp files](https://github.com/rundeck/rundeck/issues/5943)
* [Unable to delete global log filters (3.2.4 and 3.2.5)](https://github.com/rundeck/rundeck/issues/5941)
* [fix for issue 5889 global variables delete](https://github.com/rundeck/rundeck/pull/5939)
* [Ftr/paged job list plugin](https://github.com/rundeck/rundeck/pull/5918)
* [Quick/double clicking "Run Job" causes invalid request token to display](https://github.com/rundeck/rundeck/issues/5894)
* [500 error: More than one row with the given identifier was found: ..., for class: rundeck.LogFileStorageRequest](https://github.com/rundeck/rundeck/issues/5081)

## Contributors

* Greg Schueler (gschueler)
* Greg Zapp (ProTip)
* Jaime (jtobard)
* Stephen Joyner (sjrd218)
* carlos
* ronaveva

## Bug Reporters

* MegaDrive68k
* ProTip
* carlosrfranco
* gschueler
* jessemarple
* jimr6007
* jtobard
* ronaveva
* sjrd218