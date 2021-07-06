# Release 3.3.2

Name: <span style="color: plum"><span class="glyphicon glyphicon-glass"></span> "onion ring plum glass"</span>

- [Download Rundeck](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)

## Overview
This release introduces the ability to use Secure Options in [Remote Job Executions](https://docs.rundeck.com/docs/administration/configuration/remote-job-execution.html).  The Enterprise version supports remote execution of jobs within a cluster so that jobs can be forwarded to other cluster members instead of being run locally.  Secure Job Options would cause those forwarded jobs to fail.  Now the option values are passed securely between the cluster members and the jobs will run.  

This release also builds on our original 3.3.0 release and improves the speed of Rundeck by introducing additional caching and other performance enhancements.


## Issues

* [Fix logging system initialization when running jar](https://github.com/rundeck/rundeck/pull/6369)
* [Display message when no log output is available](https://github.com/rundeck/rundeck/pull/6356)
* [SCM and Git plugin fixes](https://github.com/rundeck/rundeck/pull/6353)
* [SCM and Git plugin fixes](https://github.com/rundeck/rundeck/pull/6350)
* [SCM and Git plugin fixes](https://github.com/rundeck/rundeck/issues/6349)
* [Remove the @Transactional from JobEventsService](https://github.com/rundeck/rundeck/pull/6347)
* [Docker - Add version and commit labels to docker image](https://github.com/rundeck/rundeck/pull/6342)
* [Add JCache configuration that is roughly equivalent to the former ehcache configuration](https://github.com/rundeck/rundeck/pull/6339)
* [Issue 1137 \[WIP\]: ACL evaluation cache system](https://github.com/rundeck/rundeck/pull/6331)
* [Restores the ability to specify the server config dir with the command line option -c](https://github.com/rundeck/rundeck/pull/6329)
* [configdir command line option not working in version 3.3.0 or 3.3.1](https://github.com/rundeck/rundeck/issues/6327)
* [Git import triggers an error on service.log](https://github.com/rundeck/rundeck/issues/6310)
* [Core config enhancements](https://github.com/rundeck/rundeck/pull/6301)
* [Issue 1137 \[WIP\]: Creating a cache to store the list of project names for which the current user is authorized to create a job.](https://github.com/rundeck/rundeck/pull/6298)
* [Remove reference to plugin that doesn't exist.](https://github.com/rundeck/rundeck/pull/6297)
* [Flaky test race condition in LogFileStorageServiceSpec](https://github.com/rundeck/rundeck/pull/6285)

## Contributors

* Greg Schueler (gschueler)
* Greg Zapp (ProTip)
* Nicole Valenzuela (nvalenzuela20)
* Stephen Joyner (sjrd218)
* carlos

## Bug Reporters

* G3NSVRV
* ProTip
* carlosrfranco
* gschueler
* mcassaniti
* sjrd218
