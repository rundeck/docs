# Release 3.4.0

Name: <span style="color: aquamarine"><span class="glyphicon glyphicon-book"></span> "Papadum aquamarine book"</span>

[Download this release](https://download.rundeck.com/3.4.0/index.html)

## Overview

Need release overview

## Enhancements

### New and Improved UI

![Configuration Management](~@assets/img/relnotes-340-newui.png)

The most obvious change in our 3.4 release is the newly refreshed and rebuilt User Interface.  Our team focused on Intuitive Usability to design some great new changes into the look and feel of Rundeck.  These improvements on the surface are simple artistic changes, but behind them are key functional improvements that simply workflow for users.  Here are some highlights:

- **New Project Menu:** The smaller size opened up a lot more work area allowing Job Writers and Rundeck admins to see more without losing access to the features they need close by. The new menu also has some key functionality to reduce scrolling for buttons as well as allow Rundeck to scale more items into the menu ensuring that all the areas available are highlighted and available on the screen.
- **Project Selector:** Quickly switching between projects was important to getting work done faster.  The new Project Picker in the top navigation allows easy access to your projects at all times and includes a quick search function to find that important project faster.
- **Utility Bar:** So many systems leverage that simple bit of functionality lurking just off screen quickly ready for when you need it.  The Utility Bar in Rundeck 3.4 offers the same functionality. You'll find a few widgets in this release with more to come in the future.

[Download this release](https://download.rundeck.com/3.4.0/index.html) and check out all the new improvements!


### Configuration Management (Enterprise)

Rundeck prides itself on offering customers the ability to turn a lot of knobs and flip a lot of switches when it comes to features and functionality.  That configuration management used to happen on the server console, in text files such as `rundeck-config.properties` on the file system.  Subsequently many of those settings also required a restart of Rundeck to take effect.

With version 3.4 it is now possible to configure Rundeck within the GUI and many of the settings now do not require a restart. The settings are stored in the Rundeck database so they are also shared across all your cluster members immediately.  No need to worry about visiting each server console to update that certain setting for each server in your cluster.

![Configuration Management](~@assets/img/relnotes-340-config-mgmt.png)

[See the full Configuration Management documentation here.](/manual/configuration-mgmt/configmgmt.md)

### Job Queuing (Enterprise)
Some technical operations can’t be run _in parallel_.   Depending on the job, if the same one was executed while the previous execution was running, that might create a little havoc on the systems being managed.  With Job Queuing when one execution finishes, the next one will start.  The ability to queue up all the work that needs to be done at once without risking chaos in production.  

![Job Queue Config](~@assets/img/jobqueue-config.png)

[Find the Job Queue documentation here.](/manual/jobs/job-queue.md)

### Thycotic Key Storage Plugin (Enterprise)
The new Thycotic Key Storage plugin replaces the built-in Key Storage (where Rundeck keeps all your sensitive passwords and certificates) with the Thycotic backend.  All your keys that are already in Thycotic are now readily accessible within Rundeck Jobs or for configuring various parts of the system.

![Thycotic Key Storage](https://thycotic.com/wp-content/uploads/2020/05/Thycotic-Logo-Full-Color.png)

[Configure Thycotic as your Key Storage Backend here.](/administration/security/storage-plugins/thycotic-storage.md)

### PagerDuty V3 Webhook Signatures (Enterprise)
Rundeck 3.3.6 included a new Webhook Processor for PagerDuty V3 Webhooks.  The 3.4.0 release adds new functionality to those webhook processors to add additional validation and security to your webhook calls.

[Find the PagerDuty Webhook Signatures Documentation here.](/manual/webhooks/pagerduty-run-job.md#v3-webhook-signature-verification)

## Project Based ACLs for Key Storage
waiting on content

### Upgrading to 3.4.0 notes

Be sure to check out all the details in our [Upgrading to 3.4 Notes](/upgrading/upgrading-to-rundeck-3.4.md).  There are some *important* notes highlighted below to help prepare for upgrading from our 3.3.x series.

- Removed Support for File System Based project Definitions
- ACL Performance Improvement settings
- Project Based ACLs for Key Storage
- API Version 10 and lower deprecated
- MySQL 5.6 no longer supported
- New Database Migration feature that streamlines upgrades in the future.
- JIRA Plugin Authentication Updates


:::warning Remember: Package repositories have moved!
  Please read [the new instructions for downloading Rundeck](/learning/howto/migrate-to-rundeck-packages-repo.md) from our new package repositories.
:::

## Core Product Updates/Pull Requests

* [Remove unused duplicated theme code](https://github.com/rundeck/rundeck/pull/7066)
* [Fix:  project ACL change is not refreshed in cluster](https://github.com/rundeck/rundeck/pull/7056)
* [Fix stuck progress bar on oversized logs](https://github.com/rundeck/rundeck/pull/7055)
* [Fix: url mapping for System Report Menu Item](https://github.com/rundeck/rundeck/pull/7033)
* [Fix: externally deleted job not reflected in scm import status](https://github.com/rundeck/rundeck/pull/7031)
* [SCM: Fix job sourceId not appearing in exported file path](https://github.com/rundeck/rundeck/pull/7022)
* [SCM Import: fix import of renamed jobs ](https://github.com/rundeck/rundeck/pull/7016)
* [Scm:  Loader Fix  and Sync Config Changes](https://github.com/rundeck/rundeck/pull/7011)
* [Fix: SCM job import action when both import/export are enabled can show incorrect status](https://github.com/rundeck/rundeck/pull/7010)
* [Fix: deleted jobs not reflected in project synch state](https://github.com/rundeck/rundeck/pull/7008)
* [Kill process when thread for local command is interrupted](https://github.com/rundeck/rundeck/pull/7007)
* [Scm enhancement cleanup](https://github.com/rundeck/rundeck/pull/7002)
* [Scm performance enhancements ](https://github.com/rundeck/rundeck/pull/6998)
* [Fix: cannot use context path url with selenium tests](https://github.com/rundeck/rundeck/pull/6997)
* [Fix: #6790 cancel job create/edit with FR/JA lang doesn't work](https://github.com/rundeck/rundeck/pull/6996)
* [Vendor and update legacy third-party javascript asset dependencies](https://github.com/rundeck/rundeck/pull/6995)
* [Enh: Add button to Commit SCM changes in jobs list page](https://github.com/rundeck/rundeck/pull/6993)
* [Scm loader process](https://github.com/rundeck/rundeck/pull/6988)
* [Fix: Create index for errorHandler on WorkflowStep table to help prevent deadlocks in MSSQL](https://github.com/rundeck/rundeck/pull/6987)
* [Including job list type on parameters when triggering job search](https://github.com/rundeck/rundeck/pull/6986)
* [Updated Messages for ja_JP (Japanese)](https://github.com/rundeck/rundeck/pull/6985)
* [Fix #6982 plugin meta was not deleted with project](https://github.com/rundeck/rundeck/pull/6983)
* [Fix #7075 kill job button doesn't work](https://github.com/rundeck/rundeck/pull/7076)
* [Fix #7073 docker rolling logs not working](https://github.com/rundeck/rundeck/pull/7074)
* [Remove legacy log output feature](https://github.com/rundeck/rundeck/pull/7072)
* [initialize cmdDatavariable used in closure](https://github.com/rundeck/rundeck/pull/7048)




## Contributors

* Imad Jafir (imad6639)
* Greg Schueler (gschueler)
* Luis Toledo (ltamaster)
* Rodrigo Navarro (ronaveva)
* Carlos Eduardo (carlosrfranco)
* Miguel Ramos (mishingo)
* Stephen Joyner (sjrd218)
* Greg Zapp (ProTip)
* Christopher McCarroll-Gilbert (chrismcg14)
* Jason Qualman (qualman)
* Forrest Evans (fdevans)
* Hidekz Hara (hidehara)
