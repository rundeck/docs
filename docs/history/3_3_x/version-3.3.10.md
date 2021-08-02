# Release 3.3.10

Name: <span style="color: skyblue"><span class="glyphicon glyphicon-paperclip"></span> "Onion ring skyblue paperclip"</span>

- [Download Rundeck](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)

## Overview
This is a small release to address minor bugs and issues.  We are working some awesome new enhancements and a significant release around the end of March.

## Enterprise Updates

* Fix: Dynamic properties for DataDog Incidents
* Fix: Health Checks show inappropriate last refresh date
* New/Updated ServiceNow&reg; Plugin - Options Plugin fixed - Fixes for Incident View with linked table reference fields.


## Core Product Updates

* [Fix 1369: duplicate secure option doesn't work correctly](https://github.com/rundeck/rundeck/pull/6784)


## Contributors

* Greg Schueler (gschueler)
* Christopher McCarroll-Gilbert (chrismcg14)
* Nicole Valenzuela (nvalenzuela20)
* Luis Toledo (ltamaster)
* Greg Zapp (protip)

Released: March 1st, 2021

:::danger Remember!!
**For MySQL users**: Starting with Rundeck `3.3.4` the MySQL JDBC driver is no longer be
bundled with the distributions. See the [Upgrade Guide](/upgrading/upgrading-to-rundeck-3.3.4.md)
for instructions to ensure your Rundeck installation can still connect to MySQL after upgrading.
:::
