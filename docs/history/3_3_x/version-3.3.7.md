# Release 3.3.7

Name: <span style="color: salmon"><span class="glyphicon glyphicon-lamp"></span> "onion ring salmon lamp"</span>

[Download this release](https://download.rundeck.com/3.3.7/index.html)

## Overview

:::danger Remember!!
**For MySQL users**: Starting with Rundeck `3.3.4` the MySQL JDBC driver is no longer be
bundled with the distributions. See the [Upgrade Guide](/upgrading/upgrading-to-rundeck-3.3.4.md)
for instructions to ensure your Rundeck installation can still connect to MySQL after
the upgrading.
:::

## Issues

[Milestone 3.3.7](https://github.com/rundeck/rundeck/milestone/156)

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