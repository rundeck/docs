# Release 3.3.7

Name: <span style="color: salmon"><span class="glyphicon glyphicon-lamp"></span> "onion ring salmon lamp"</span>

- [Download Rundeck](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)

## Overview

### Webhooks: Enhanced Debugging Visibility

A new [Webhook Debug](/manual/webhooks/advanced-run-job.html#debugging) screen allows admins to review results from recently received webhook requests for setup and troubleshooting.  A visual rules evaluation screen highlights which conditions were met or missed.

![](~@assets/img/wh-debug-batch-sample.png)

### DataDog Incidents

New Workflows steps allow DataDog users to create / update Incidents and add Tasks to Incidents.

### Config Refresh

You can make changes in the rundeck-config.properties file and then get Rundeck to reload the config without having to restart. [Check out details here.](/administration/configuration/config-file-reference.html#live-configuration-refreshing-enterprise)

### Additional Improvements

* Option Values can now use Key Storage to access secret information.

## Issues

* [Fix values list in option form displayed misaligned in 3.3.7](https://github.com/rundeck/rundeck/pull/6653)
* [Allow option values plugins to access the key storage](https://github.com/rundeck/rundeck/pull/6642)
* [Fix multivalued options validation with no errors when another option (not multivalued) is invalid](https://github.com/rundeck/rundeck/pull/6641)
* [Add the ability to reload rundeck-config.properties](https://github.com/rundeck/rundeck/pull/6638)
* [Enhance missing schedule UI and info](https://github.com/rundeck/rundeck/pull/6632)
* [Fixing multivalued options validation with no errors but that appear as invalid when another option (not multivalued) is invalid](https://github.com/rundeck/rundeck/pull/6608)
* [Handle dynamicProperties plugin errors](https://github.com/rundeck/rundeck/pull/6603)
* [Open execution in new tab on middle-click](https://github.com/rundeck/rundeck/pull/6601)
* [Include a checkbox to enable/disable expanding tokens for "Script File or URL" node step](https://github.com/rundeck/rundeck/pull/6592)
* [EventStore and webhooks debugging](https://github.com/rundeck/rundeck/pull/6584)

## Contributors

* Greg Schueler (gschueler)
* Greg Zapp (ProTip)
* Stephen Joyner (sjrd218)
* carlos
* ltamaster

## Bug Reporters

* ProTip
* carlosrfranco
* ltamaster
* sjrd218

:::danger Remember!!
**For MySQL users**: Starting with Rundeck `3.3.4` the MySQL JDBC driver is no longer be
bundled with the distributions. See the [Upgrade Guide](/upgrading/upgrading-to-rundeck-3.3.4.md)
for instructions to ensure your Rundeck installation can still connect to MySQL after upgrading.
:::
