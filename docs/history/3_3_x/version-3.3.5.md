# Release 3.3.5

Name: <span style="color: red"><span class="glyphicon glyphicon-headphones"></span> "onion ring red headphones"*</span>

- [Download Rundeck](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)

:::danger Remember!!
**For MySQL users**: Starting with Rundeck `3.3.4` the MySQL JDBC driver will no longer be
bundled with the distributions. See the [Upgrade Guide](/upgrading/upgrading-to-rundeck-3.3.4.md)
for instructions to ensure your Rundeck installation can still connect to MySQL after upgrading.
:::

## Overview

This release fixes some important bugs and performance issues as well as introduces our Beta for System Report 2.0.

System Report 2.0 (Enterprise Only) is an updated version of the System Report page that includes
more Rundeck stats and lists all the configuration settings currently in use. There is even an Export
feature that our Support team can use to identify and troubleshoot issues faster. Sensitive data is
stored as either Concealed or Secured. Concealed data is hidden on first glance, but visible by
clicking a "show data" button in the UI. These are often paths, headers, or other data.
Secured entries can not be shown at all and are use for passwords and other critically sensitive information.
Both of these data types are always excluded from exports. Enterprise customers can check out the
new System Report page under the gear menu in Rundeck.

The licensing bug on RPM/Deb installations from `3.3.4` has been fixed. Rundeck installs with Server UUID
specified in `framework.properties` will now work normally with `3.3.5`.

This release also includes performance enhancements that improve the Project Listing page and overall application
startup time. Check out all the details below.

## Issues

* [Fix crontab everyday/everymonth checkbox fields always hidden](https://github.com/rundeck/rundeck/pull/6560)
* [Fix server uuid loading in rpm/deb](https://github.com/rundeck/rundeck/pull/6544)
* [Rundeck server uuid not set correctly in rpm/deb](https://github.com/rundeck/rundeck/issues/6543)
* [Update Spring framwork to 5.1.18.RELEASE](https://github.com/rundeck/rundeck/pull/6542)
* [Upgrade Spring framework version](https://github.com/rundeck/rundeck/issues/6541)
* [SetUp new schedule on specific day (or month) don't work anymore](https://github.com/rundeck/rundeck/issues/6533)
* [Add cache warmup at bootstrap time for auth and project services](https://github.com/rundeck/rundeck/pull/6527)
* [Async startup of execution history cleaner tasks](https://github.com/rundeck/rundeck/pull/6526)
* [Project list updates](https://github.com/rundeck/rundeck/pull/6523)
* [Modified css for log output when printing screen from the browser](https://github.com/rundeck/rundeck/pull/6522)
* [Allow upload of empty file to a job option](https://github.com/rundeck/rundeck/pull/6519)
* [Fix the display of Enterprise plugins when listing plugins](https://github.com/rundeck/rundeck/pull/6518)
* [Update Ldap module to try bind password from the configuration service](https://github.com/rundeck/rundeck/pull/6514)
* [Add feature toggle for sidebar project list ](https://github.com/rundeck/rundeck/pull/6513)
* [Update ContainerRoleSource to return roles from Spring Security](https://github.com/rundeck/rundeck/pull/6507)
* [Fix 500 error on exec query api for missing project](https://github.com/rundeck/rundeck/pull/6498)
* [API execution query with non-existent project returns 500 error](https://github.com/rundeck/rundeck/issues/6497)
* [Fix Activity Date Filter ](https://github.com/rundeck/rundeck/pull/6493)
* [Changing place of the hiddenField "origName" to be possible renaming options when editing a job](https://github.com/rundeck/rundeck/pull/6488)
* [Fix sidebar active indicator on webhooks page](https://github.com/rundeck/rundeck/pull/6473)
* [Nav indicator when on Webhooks points at Dashboards](https://github.com/rundeck/rundeck/issues/6472)
* [GUI: no spaces in dashboard's execution info](https://github.com/rundeck/rundeck/issues/6195)
* [Activity Date Filter not working](https://github.com/rundeck/rundeck/issues/6089)

## Contributors

* Greg Schueler (gschueler)
* Greg Zapp (ProTip)
* Rodrigo Navarro (ronaveva)
* Stephen Joyner (sjrd218)
* carlos
* ltamaster

## Bug Reporters

* PeterGarlic
* ProTip
* carlosrfranco
* gschueler
* hs-hub-world
* jplassnibatt
* ltamaster
* philjov
* ronaveva
* sjrd218
