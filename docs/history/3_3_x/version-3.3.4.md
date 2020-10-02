# Release 3.3.4

Name: <span style="color: rebeccapurple"><span class="glyphicon glyphicon-grain"></span> "onion ring rebeccapurple grain"</span>

[Download this release](https://download.rundeck.com/3.3.4/index.html)

:::danger
**For MySQL users**: Starting with Rundeck `3.3.4` the MySQL JDBC driver will no longer be
bundled with the distributions. See the [Upgrade Guide](/upgrading/upgrading-to-rundeck-3.3.4.md)
for instructions to ensure your Rundeck installation can still connect to MySQL after
the upgrading.
:::

## Overview

## Issues

[Milestone 3.3.4](https://github.com/rundeck/rundeck/milestone/152)

* [Remove MySQL JDBC driver from bundle](https://github.com/rundeck/rundeck/pull/6511)
* [Upgrade mariadb driver to 2.7.0](https://github.com/rundeck/rundeck/pull/6502)
* [Quell reflective access messages.](https://github.com/rundeck/rundeck/pull/6500)
* [Fix #6357 disabling schedule in job edit does not work](https://github.com/rundeck/rundeck/pull/6492)
* [Fix #6304 where changing only the crontab would not update the scheduled execution.](https://github.com/rundeck/rundeck/pull/6490)
* [Speed up filesystem plugin access](https://github.com/rundeck/rundeck/pull/6485)
* [Fix: project list gui config values not working](https://github.com/rundeck/rundeck/pull/6470)
* [Update notifications: enable vue ui in production, update selenium tests](https://github.com/rundeck/rundeck/pull/6464)
* [Replace git plugin icon with font icon](https://github.com/rundeck/rundeck/pull/6460)
* [Upgrade pywinrm plugin : Add flag for enabling kerberos delegation](https://github.com/rundeck/rundeck/pull/6458)
* [Enable notification plugins to access key storage](https://github.com/rundeck/rundeck/pull/6457)
* [Fix #6449 - Sync command disabled as default and without arguments](https://github.com/rundeck/rundeck/pull/6456)
* [Remove unused fonts](https://github.com/rundeck/rundeck/pull/6455)
* [Add validation warning if node executor or file copy plugins are missing](https://github.com/rundeck/rundeck/pull/6454)
* ["sync: ignoring all arguments" warning message on script step (only on 3.3.3)](https://github.com/rundeck/rundeck/issues/6449)
* [Fix importOptions flag not importing correctly when uploading a job definition](https://github.com/rundeck/rundeck/pull/6444)
* [Rundeck is not importing jobs from 2.4.x correctly](https://github.com/rundeck/rundeck/issues/6442)
* [UI Update: Notifications editor](https://github.com/rundeck/rundeck/pull/6438)
* [Node Executor or File Copier Plugin are missing #6436](https://github.com/rundeck/rundeck/pull/6437)
* [Minor product issue: If a node executor plugin is missing, the project's "Default Node Executor" section is blank](https://github.com/rundeck/rundeck/issues/6436)
* [Fix issue 5462 where SCP File Copier and SSH Node Executor have same properties which meant that the properties were not saved to the Default Node Executor when File Copier overwrote the changes. This change makes the properties to be saved, regardless of where they were changed (in File Copier or Node Executor properties).](https://github.com/rundeck/rundeck/pull/6434)
* [Fixes when send an email notification when a job is marked as "Incomplete" #6401](https://github.com/rundeck/rundeck/pull/6425)
* [Fix #6335 failOnDisable flag in jobref definition not serialized/loaded correctly](https://github.com/rundeck/rundeck/pull/6417)
* [Rundeck initialization refactoring](https://github.com/rundeck/rundeck/pull/6414)
* [Fixes when send an email notification when a job is marked as "Incomplete" #6401](https://github.com/rundeck/rundeck/pull/6407)
* [When a job is marked as "Incomplete", the global variables are not being expanded in the email notification ](https://github.com/rundeck/rundeck/issues/6401)
* [Disabled Job and Disabled Schedule not honored ](https://github.com/rundeck/rundeck/issues/6357)
* [Job import/export removes failOnDisable: true](https://github.com/rundeck/rundeck/issues/6335)
* [Updating a JOB Crontab Schedule doesn't save new value](https://github.com/rundeck/rundeck/issues/6304)

## Contributors

* Elagost (elagost)
* Greg Schueler (gschueler)
* Greg Zapp (ProTip)
* Jaime Tobar (jtobard)
* Nicole Valenzuela (nvalenzuela20)
* Stephen Joyner (sjrd218)
* carlos
* ltamaster

## Bug Reporters

* MegaDrive68k
* ProTip
* ajxb
* carlosrfranco
* gschueler
* hs-hub-world
* jtobard
* ltamaster
* nvalenzuela20
* ruiplcorreia
* sjrd218