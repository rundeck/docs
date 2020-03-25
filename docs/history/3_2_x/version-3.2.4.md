# Release 3.2.4

Name: <span style="color: chartreuse"><span class="glyphicon glyphicon-paperclip"></span> "nacho chartreuse paperclip"</span>

## Overview

This release brings some impressive new performance enhancements to the Jobs Listing page, more granular ACL options and the ability to Retry a job on failed nodes. Version 3.2.4 will offer an 80% improvement in Job List performance, especially for those projects with a large number of jobs.

Also in this release a new ACL permission to allow or restrict Job Execution History separately from actions that can be done on a job. This opens the ability to share job results without allowing any other access to the job itself. [Here’s the documentation](https://docs.rundeck.com/3.2.x/administration/security/authorization.html#project-scope-resources-and-actions) on for using this new ACL action called `view_history`.

We have also included in this release a new Enterprise Job Execution Plugin that enhances the [Job Retry Options](https://docs.rundeck.com/docs/manual/creating-jobs.html#retry) already included in Rundeck. With this plugin Retries will only be attempted on Nodes that failed or were not started. [Read more and see an example here.](https://docs.rundeck.com/3.2.x/manual/execution-lifecycle/job-retry-failed-nodes.html)

## Upgrading

See [Upgrading to Rundeck 3.2](/upgrading/upgrading-to-rundeck-3.2.html).

## Issues

[Milestone 3.2.4](https://github.com/rundeck/rundeck/milestone/138)

- [Fix orchestrator issue](https://github.com/rundeck/rundeck/pull/5879)
- [Orchestrator error updating a job in 3.2.4-SNAPSHOT](https://github.com/rundeck/rundeck/issues/5876)
- [Fix #5868 git import should not fail](https://github.com/rundeck/rundeck/pull/5869)
- [Remove random 'e' character](https://github.com/rundeck/rundeck/pull/5851)
- [Fixes #2668 by preventing an endless loop ](https://github.com/rundeck/rundeck/pull/5850)
- [Fix #5063 show error in job exec popup](https://github.com/rundeck/rundeck/pull/5840)
- [Fix #5830 select values should not be encoded](https://github.com/rundeck/rundeck/pull/5838)
- [fix #5835 handle registerLogin optimistic locking failure](https://github.com/rundeck/rundeck/pull/5837)
- ["Regular expression" textbox shows HTML Code instead of "\" (SCM Import configuration)](https://github.com/rundeck/rundeck/issues/5830)
- [adds ProjectComponent for archive import/export, refactor Webhooks data to use it](https://github.com/rundeck/rundeck/pull/5813)
- [Fixes #5809 by not executing a criteria query when the "in" criteria will be an empty list.](https://github.com/rundeck/rundeck/pull/5811)
- [fix Nullpointer exception on api call](https://github.com/rundeck/rundeck/pull/5798)
- [Some improvements to job list page speed with many jobs](https://github.com/rundeck/rundeck/pull/5779)
- [Joblifecycle plus job without options doesn't show error messages](https://github.com/rundeck/rundeck/pull/5778)
- [Joblifecycle plus job without options doesn't show error messages](https://github.com/rundeck/rundeck/issues/5776)
- [upgrade attribute-match-node-enhancer plugin ](https://github.com/rundeck/rundeck/pull/5774)
- [Fixes #5727 by using the plugin registry source that includes groovy plugin metadata.](https://github.com/rundeck/rundeck/pull/5773)
- [Update asset pipeline plugin for gradle and grails.](https://github.com/rundeck/rundeck/pull/5746)
- [saving the correct list of Succeeded Node](https://github.com/rundeck/rundeck/pull/5738)
- [job definition io component extension](https://github.com/rundeck/rundeck/pull/5734)
- [Refactoring context variables for email and plugins notification ](https://github.com/rundeck/rundeck/pull/5729)
- [adding some small changes to the edit project form for UI plugin](https://github.com/rundeck/rundeck/pull/5659)
- [Fix #4704 Creating a new permission to allow or deny view executions history limiting by job groups](https://github.com/rundeck/rundeck/pull/5281)
- [No error message in job execution popup](https://github.com/rundeck/rundeck/issues/5063)
- [Request to limit the Activity view for job executions (kind: event) based on job groups](https://github.com/rundeck/rundeck/issues/4704)

## Contributors

- Daniel Abbatt (danielabbatt)
- Greg Schueler (gschueler)
- Jaime Tobar (jtobard)
- Jesse Marple (jessemarple)
- Luis Toledo (ltamaster)
- Stephen Joyner (sjrd218)
- carlosrfranco
- robertopaez

## Bug Reporters

- MegaDrive68k
- carlosrfranco
- cwaltherf
- danielabbatt
- gschueler
- jtobard
- ltamaster
- luisrivas35
- robertopaez
- ronaveva
- sjrd218
