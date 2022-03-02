# Release 3.4.0

Name: <span style="color: aquamarine"><span class="glyphicon glyphicon-book"></span> "Papadum aquamarine book"</span>
Release Date: June 15, 2021

- [Download Rundeck](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)

::: warning
Please be sure to follow the [Upgrading Guidance](/upgrading/index.md) when upgrading to 3.4.0 from a previous version.
:::

## Overview

This release is packed with exciting new features and enhancements for both Rundeck Enterprise and Open Source. Below are some release highlights. Make sure to read the full release notes to learn more.

**UI improvements** help make Rundeck more intuitive for new users and further simplify working with Rundeck for experienced users. A **new integration with Thycotic** enables Rundeck Enterprise users to protect privileged accounts with Thycotic’s enterprise-grade privileged access management solution. New **GUI-based Configuration Management**, allows Rundeck admins to manage configurations in one screen, within the Rundeck UI. The addition of **more granular ACLs**, give Rundeck admins the ability to set ACLs on a project, allowing access to keys that the project’s users might need.

## Enhancements

### New and Improved UI

![Configuration Management](~@assets/img/relnotes-340-newui.png)

The most obvious change in our 3.4 release is the newly refreshed and rebuilt User Interface. Our team focused on Intuitive Usability to design some great new changes into the look and feel of Rundeck. These improvements on the surface are simple artistic changes, but behind them are key functional improvements that simply workflow for users. Here are some highlights:

- **New Project Menu:** The smaller size opened up a lot more work area allowing Job Writers and Rundeck admins to see more without losing access to the features they need close by. The new menu also has some key functionality to reduce scrolling for buttons as well as allow Rundeck to scale more items into the menu ensuring that all the areas available are highlighted and available on the screen.
- **Project Selector:** Quickly switching between projects was important to getting work done faster. The new Project Picker in the top navigation allows easy access to your projects at all times and includes a quick search function to find that important project faster.
- **Utility Bar:** So many systems leverage that simple bit of functionality lurking just off screen quickly ready for when you need it. The Utility Bar in Rundeck 3.4 offers the same functionality. You'll find a few widgets in this release with more to come in the future.

[Download this release](https://www.rundeck.com/downloads) and check out all the new improvements!


### Configuration Management (Enterprise)

Rundeck prides itself on offering customers the ability to turn a lot of knobs and flip a lot of switches when it comes to features and functionality. That configuration management used to happen on the server console, in text files such as `rundeck-config.properties` on the file system. Subsequently many of those settings also required a restart of Rundeck to take effect.

With version 3.4 it is now possible to configure Rundeck within the GUI and many of the settings now do not require a restart. The settings are stored in the Rundeck database so they are also shared across all your cluster members immediately. No need to worry about visiting each server console to update that certain setting for each server in your cluster.

![Configuration Management](~@assets/img/relnotes-340-config-mgmt.png)

[See the full Configuration Management documentation here.](/manual/configuration-mgmt/configmgmt.md)

### Job Queuing (Enterprise)
Some technical operations can’t be run _in parallel_. Depending on the job, if the same one was executed while the previous execution was running, that might create a little havoc on the systems being managed. With Job Queuing when one execution finishes, the next one will start. The ability to queue up all the work that needs to be done at once without risking chaos in production.

![Job Queue Config](~@assets/img/jobqueue-config.png)

[Find the Job Queue documentation here.](/manual/jobs/job-queue.md)

### Thycotic Key Storage Plugin (Enterprise)
The new Thycotic Key Storage plugin replaces the built-in Key Storage (where Rundeck keeps all your sensitive passwords and certificates) with the Thycotic backend. All your keys that are already in Thycotic are now readily accessible within Rundeck Jobs or for configuring various parts of the system.

![Thycotic Key Storage](https://thycotic.com/wp-content/uploads/2020/05/Thycotic-Logo-Full-Color.png)

[Configure Thycotic as your Key Storage Backend here.](/manual/key-storage/storage-plugins/thycotic-storage.md)

### PagerDuty V3 Webhook Signatures (Enterprise)
Rundeck 3.3.6 included a new Webhook Processor for PagerDuty V3 Webhooks. The 3.4.0 release adds new functionality to those webhook processors to add additional validation and security to your webhook calls.

[Find the PagerDuty Webhook Signatures Documentation here.](/manual/webhooks/pagerduty-run-job.md#v3-webhook-signature-verification)

### Project Based ACLs for Key Storage (Enterprise)
Rundeck 3.4 adds new functionality to the Access Control List functionality. Rundeck aims to streamline sharing your Runbook Automation Projects with all your users. Adding Project Level ACLs for the Key Storage component allows Rundeck admins to combine all the important access rights within a project definition, which streamlines adding new users with the appropriate permissions in Rundeck.

Be sure to check out the [Upgrade Notes](/upgrading/upgrading-to-rundeck-3.4.md) and Documentation for this new feature.

### Other notable improvements

- The JIRA plugins bundled with Enterprise now support tokens over passwords. [Please check the Upgrade Notes for important details about them](/upgrading/upgrading-to-rundeck-3.4.md#jira-plugins-require-updated-authentication-enterprise).
- `bcrypt` is now supported for password hashes in _realm.properties_.


### Upgrading to 3.4.0 notes

Be sure to check out all the details in our [Upgrading to 3.4 Notes](/upgrading/upgrading-to-rundeck-3.4.md). There are some *important* notes highlighted below to help prepare for upgrading from our 3.3.x series.

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


* [Fix rundeckpro-1824 ent logstorage config](https://github.com/rundeck/rundeck/pull/7106)
* [fix rundeckpro/rundeckpro#1823 check if sequences](https://github.com/rundeck/rundeck/pull/7100)
* [Remove unused duplicated theme code](https://github.com/rundeck/rundeck/pull/7066)
* [Fix: project ACL change is not refreshed in cluster](https://github.com/rundeck/rundeck/pull/7056)
* [Fix stuck progress bar on oversized logs](https://github.com/rundeck/rundeck/pull/7055)
* [Fix: url mapping for System Report Menu Item](https://github.com/rundeck/rundeck/pull/7033)
* [Fix: externally deleted job not reflected in scm import status](https://github.com/rundeck/rundeck/pull/7031)
* [SCM: Fix job sourceId not appearing in exported file path](https://github.com/rundeck/rundeck/pull/7022)
* [SCM Import: fix import of renamed jobs ](https://github.com/rundeck/rundeck/pull/7016)
* [SCM: Loader Fix and Sync Config Changes](https://github.com/rundeck/rundeck/pull/7011)
* [SCM: SCM job import action when both import/export are enabled can show incorrect status](https://github.com/rundeck/rundeck/pull/7010)
* [Fix: deleted jobs not reflected in project synch state](https://github.com/rundeck/rundeck/pull/7008)
* [Kill process when thread for local command is interrupted](https://github.com/rundeck/rundeck/pull/7007)
* [Scm enhancement cleanup](https://github.com/rundeck/rundeck/pull/7002)
* [Scm performance enhancements ](https://github.com/rundeck/rundeck/pull/6998)
* [Fix: cannot use context path url with selenium tests](https://github.com/rundeck/rundeck/pull/6997)
* [Fix: #6790 cancel job create/edit with FR/JA lang doesn&#39;t work](https://github.com/rundeck/rundeck/pull/6996)
* [Vendor and update legacy third-party javascript asset dependencies](https://github.com/rundeck/rundeck/pull/6995)
* [Enh: Add button to Commit SCM changes in jobs list page](https://github.com/rundeck/rundeck/pull/6993)
* [Scm loader process](https://github.com/rundeck/rundeck/pull/6988)
* [Fix: Create index for errorHandler on WorkflowStep table to help prevent deadlocks in MSSQL](https://github.com/rundeck/rundeck/pull/6987)
* [Including job list type on parameters when triggering job search](https://github.com/rundeck/rundeck/pull/6986)
* [Updated Messages for ja_JP (Japanese)](https://github.com/rundeck/rundeck/pull/6985)
* [Fix: #6982 plugin meta was not deleted with project](https://github.com/rundeck/rundeck/pull/6983)
* [Fix: Oracle saves empty fields as null and results in bug in comparison code](https://github.com/rundeck/rundeck/pull/6976)
* [Refactor SCM Export/Import to improve response time on job page](https://github.com/rundeck/rundeck/pull/6973)
* [Fix: &quot;Duplicate to other project&quot; option visibility](https://github.com/rundeck/rundeck/pull/6971)
* [Enh: Change default server.address to localhost instead of hostname to generate default rundeck-config.properties](https://github.com/rundeck/rundeck/pull/6967)
* [Adjust style of modal pagination](https://github.com/rundeck/rundeck/pull/6965)
* [Sec: Remove apache httpclient 3.1](https://github.com/rundeck/rundeck/pull/6963)
* [Adjust Executions Options Section](https://github.com/rundeck/rundeck/pull/6962)
* [Fix: /login/authAjax redirect loop for ajax requests](https://github.com/rundeck/rundeck/pull/6959)
* [Setup release publishing of existing artifacts via OSSHR](https://github.com/rundeck/rundeck/pull/6955)
* [Update Style of Installed Plugins ](https://github.com/rundeck/rundeck/pull/6954)
* [Enh: Adding access to Key Storage for Webhook Plugins](https://github.com/rundeck/rundeck/pull/6953)
* [Enhance SCM UI ](https://github.com/rundeck/rundeck/pull/6952)
* [Fix: run job error might not seen, replace with modal](https://github.com/rundeck/rundeck/pull/6949)
* [fix: use aclFileManager to read project acls for export](https://github.com/rundeck/rundeck/pull/6948)
* [Fixes arguments of method called to handle schedules from project config API](https://github.com/rundeck/rundeck/pull/6943)
* [retrieving scheduled executions without using cache](https://github.com/rundeck/rundeck/pull/6940)
* [Update tomcat jdbc lib to 9.0.44.](https://github.com/rundeck/rundeck/pull/6939)
* [Handles job pagination (if enabled) on referenced job picker modal](https://github.com/rundeck/rundeck/pull/6938)
* [Add indexes on Execution and LogFileStorageRequest columns that are used in queries.](https://github.com/rundeck/rundeck/pull/6929)
* [Fix for DB migration with MariaDB](https://github.com/rundeck/rundeck/pull/6927)
* [Align asset pipeline plugin versions for all grails plugins.](https://github.com/rundeck/rundeck/pull/6925)
* [fix issue with filter in NOD_FILTER being quoted](https://github.com/rundeck/rundeck/pull/6923)
* [Cleanup: jobs import api endpoint requires apiv14](https://github.com/rundeck/rundeck/pull/6922)
* [Change text shown when waiting for logs to match UI](https://github.com/rundeck/rundeck/pull/6920)
* [Move System Configuration to a menu item](https://github.com/rundeck/rundeck/pull/6919)
* [Refine Plugin Repository UI](https://github.com/rundeck/rundeck/pull/6916)
* [Remove notificationsEditorVue feature toggle, remove old notifications ui code](https://github.com/rundeck/rundeck/pull/6915)
* [fix #6889 incorrect ids for exclude filter radios](https://github.com/rundeck/rundeck/pull/6914)
* [Fix/scm clean](https://github.com/rundeck/rundeck/pull/6911)
* [scm delete nows perfoms a clean before deleting the configuration](https://github.com/rundeck/rundeck/pull/6909)
* [Set projectKeyStorage feature flag to be true by default .  Fix issu…](https://github.com/rundeck/rundeck/pull/6902)
* [Implement navbar sort priority for menu items](https://github.com/rundeck/rundeck/pull/6900)
* [More API 11 cleanup: remove &quot;xml wrapper&quot;](https://github.com/rundeck/rundeck/pull/6893)
* [Enh: Allow access to Key Storage for Node Resources Script Plugins](https://github.com/rundeck/rundeck/pull/6892)
* [Add splash screen update and stickers section](https://github.com/rundeck/rundeck/pull/6891)
* [project key storage ACL settings](https://github.com/rundeck/rundeck/pull/6886)
* [Mitigate h2 errors on shutdown](https://github.com/rundeck/rundeck/pull/6881)
* [Replacing code that fetches the list of ScheduledExecutions parents to use criteria and improve query time](https://github.com/rundeck/rundeck/pull/6871)
* [Deprecated API endpoint removal V10 and Lower](https://github.com/rundeck/rundeck/pull/6869)
* [Deprecated API endpoint removal](https://github.com/rundeck/rundeck/pull/6866)
* [Update AWS source model plugin version.](https://github.com/rundeck/rundeck/pull/6865)
* [Update base Docker image on new Ubuntu 18.04 image](https://github.com/rundeck/rundeck/pull/6861)
* [Cleanup execution mode in non-cluster mode ](https://github.com/rundeck/rundeck/pull/6859)
* [Bump Jetty to 9.4.38.v20210224](https://github.com/rundeck/rundeck/pull/6858)
* [Add group: and user: urn support for ACL subjects](https://github.com/rundeck/rundeck/pull/6849)
* [Update help text to use quotes on demarcation text](https://github.com/rundeck/rundeck/pull/6848)
* [Add bcrypt credential type for PropertyFileLoginModule](https://github.com/rundeck/rundeck/pull/6847)
* [Remove File Base Project storage capability](https://github.com/rundeck/rundeck/pull/6846)
* [Fix multiple SCM Integration Issues](https://github.com/rundeck/rundeck/pull/6839)
* [Update java access modifiers to enhance extensibility.](https://github.com/rundeck/rundeck/pull/6838)
* [Avoiding error when parsing user roles that contain commas](https://github.com/rundeck/rundeck/pull/6836)
* [Fix: use correct project auth context to eval some project access](https://github.com/rundeck/rundeck/pull/6833)
* [fix for scm ask for import action when changing repo](https://github.com/rundeck/rundeck/pull/6831)
* [Fix: 500 error for workflow API response if no read or view auth](https://github.com/rundeck/rundeck/pull/6829)
* [Fix: Job execution through the API without Node selected by default will fail if nodes required](https://github.com/rundeck/rundeck/pull/6826)
* [Scm configuration deletion](https://github.com/rundeck/rundeck/pull/6822)
* [Fixes the UserGroupSource to pass the username to the script](https://github.com/rundeck/rundeck/pull/6820)
* [Fix/pro1523](https://github.com/rundeck/rundeck/pull/6818)
* [Deprecated API: version 10 and lower](https://github.com/rundeck/rundeck/pull/6816)
* [Fix: ProjectManager fileCache config requires static config](https://github.com/rundeck/rundeck/pull/6807)
* [Fix: &quot;Show all&quot; button on Jobs list is not clickable #1464](https://github.com/rundeck/rundeck/pull/6806)
* [SCM Export: Git error 500 happening on manual pulls](https://github.com/rundeck/rundeck/pull/6804)
* [Enhance configurability of InterceptorHelper.](https://github.com/rundeck/rundeck/pull/6773)
* [Fix: &quot;Show all&quot; button is not clickable #1464](https://github.com/rundeck/rundeck/pull/6771)
* [Support multiple URL&#39;s for the grails.serverURL](https://github.com/rundeck/rundeck/pull/6760)
* [Allow dynamic attributes in updated Notification UI](https://github.com/rundeck/rundeck/pull/6752)
* [Add usersync configuration options to Docker Remco templates](https://github.com/rundeck/rundeck/pull/6745)
* [Enable Project based ACLs for Key Storage under keys/project/&lt;NAME&gt;/ paths](https://github.com/rundeck/rundeck/pull/6628)
* [DB migration plugin to streamline upgrade procedures](https://github.com/rundeck/rundeck/pull/6577)
* [Fix: #2301 Changing to keep empty option value (if no value is passed) even if the option has a default value](https://github.com/rundeck/rundeck/pull/5969)
* [Fix #7075 kill job button doesn&#39;t work](https://github.com/rundeck/rundeck/pull/7076)
* [Fix #7073 docker rolling logs not working](https://github.com/rundeck/rundeck/pull/7074)
* [Remove legacy log output feature](https://github.com/rundeck/rundeck/pull/7072)
* [initialize cmdDatavariable used in closure](https://github.com/rundeck/rundeck/pull/7048)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A3.4.0+is%3Aclosed)

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
* Loren (sornerol)
* Nicole Valenzuela (nvalenzuela20)
* Thiago Laubstein (laubstein)
* Matt Farmer (frmrm)
