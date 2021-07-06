# Release 3.3.9

Name: <span style="color: silver"><span class="glyphicon glyphicon-music"></span> "Onion ring silver music"</span>

- [Download Rundeck](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)

## Overview

Key Storage is an important part of Rundeck since it securely stores passwords and other critical data.  In this release we've added the ability to use KeyStore entries when configuring Node Source plugins.

This release also adds some User Count information to the System Report in Enterprise.  It's now easier to see how many users are configured and using Rundeck.

## Enterprise Updates

* Adds Licensing and User Counts to System Report Diagnostics
* Set node Health Checks and Health Check Enhancer to be on by default
* Fix error mapping nodes on DataDog resource model plugin
* Azure Plugin now properly imports tags from VMS

## Core Product Updates

* [Add ability for Node Sources to use Key Storage](https://github.com/rundeck/rundeck/issues/6666)
* [Fix/project acl import](https://github.com/rundeck/rundeck/issues/6761)
* [Fix community news post dates](https://github.com/rundeck/rundeck/issues/6750)
* [Fix #6614 check plugin exists instead of configuration](https://github.com/rundeck/rundeck/issues/6740)
* [Update bootstrap js to 3.3.7](https://github.com/rundeck/rundeck/issues/6739)
* [Fix SCM icons lost after 3.3.7 upgrade](https://github.com/rundeck/rundeck/issues/6735)
* [fixes rundeckpro/rundeckpro#1454, add in event bus notification when …](https://github.com/rundeck/rundeck/issues/6734)
* [Fixes webhook notification issue that use credentials in URL](https://github.com/rundeck/rundeck/issues/6732)
* [edit framework controller to accept resourceModelSources config when creating a new project](https://github.com/rundeck/rundeck/issues/6730)
* [Issues/6693 slow job list show page](https://github.com/rundeck/rundeck/issues/6725)
* [Fix to get futures schedules both via add-on (enterprise-schedules) and via job scheduling (job edit page)](https://github.com/rundeck/rundeck/issues/6723)
* [Update pywinrm plugin. Added a function to remove/replace simple quotes when execute command](https://github.com/rundeck/rundeck/issues/6712)
* [Creating a new log filter plugin to mask sensitive output log text](https://github.com/rundeck/rundeck/issues/6709)
* [Changes to allow to import nodes only separately from Configuration](https://github.com/rundeck/rundeck/issues/6701)
* [Grails plugin reorganization](https://github.com/rundeck/rundeck/issues/6697)

## Contributors

* Greg Zapp (ProTip)
* Greg Schueler (gschueler)
* Guido (guidograzioli)
* Imad Jafir (imad6639)
* Carlos Eduardo (carlosrfranco)
* Christopher McCarroll-Gilbert (chrismcg14)
* Nicole Valenzuela (nvalenzuela20)
* Stephen Joyner (sjrd218)
* Luis Toledo (ltamaster)
* Alberto Hormazabal Cespedes (ahormazabal)
* Forrest Evans (fdevans)


:::danger Remember!!
**For MySQL users**: Starting with Rundeck `3.3.4` the MySQL JDBC driver is no longer be
bundled with the distributions. See the [Upgrade Guide](/upgrading/upgrading-to-rundeck-3.3.4.md)
for instructions to ensure your Rundeck installation can still connect to MySQL after upgrading.
:::
