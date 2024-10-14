# 4.1.0 Release Notes

Name: <span style="color: olivedrab"><span class="glyphicon glyphicon-camera"></span> "Kaiju olivedrab camera"</span>
Release Date: April 13, 2022

- [Download Rundeck](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)

:::danger
Warning: This version of Rundeck updates the libraries used for the built-in H2 database.  The new version is not compatible with the old version. There is no mechanism to migrate a database to the new version automatically without including the old, vulnerable libraries.
- If you are using H2 for data storage, the process must be done manually following the details on the [Upgrading to 4.1](/upgrading/upgrading-to-4.1.md) page.
- If you are **not** using H2 there may still be errors on boot related to H2.  More details on the [Upgrading to 4.1](/upgrading/upgrading-to-4.1.md) page.
:::

## Overview

Check out the new features and enhancements for the commercial products (Runbook Automation Self-Hosted, formerly Rundeck Enterprise, and the Runbook Automation SaaS offering) and Rundeck Community included in this release.

- H2 is updated to version 2.x to address a Critical vulnerability.
- Fixed scenario where `https` connections were reverting to `http` when running behind a load balancer.
- Grails upgraded to `5.1.6` which addresses some cosmetic logging issues in the 4.0.0 version.
- Spring Framework is upgraded to `5.3.18` to address [CVE-2022-22965](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2022-22965)


## Commercial Versions

### New Plugins

We continue to add plugins to help automate cloud operations. New plugins include:

- [Job Steps to pull AWS CloudWatch](/manual/jobs/job-plugins/workflow-steps/aws-cloudwatch.md) logs into Job Output. These new plugins retrieve diagnostic data from AWS infrastructure and applications making it easier to run automated diagnostics for AWS across multiple accounts and products.
- [AWS EC2 Node Health Check](/manual/healthcheckplugins/aws-ec2-healthcheck.md)
- [GCP Compute Node Health Check](/manual/healthcheckplugins/gcp-compute-healthcheck.md)
- Ability to set custom DataDog API URLs for customers outside the U.S.
- Private IP address is now visible on nodes from [Azure Node Source](/manual/projects/resource-model-sources/azure.md).

### Improved Configuration Management
Configuration of SSO settings in Configuration Management no longer require a restart.  Changes are also propagated to other cluster members upon saving.

## Additional Updates

* Fix Calendars Cancel button refresh issue
* Fix: CPU usage showing negative value in Cluster Manager
* Propagate system configuration refresh to other cluster members
* Remove PagerDuty Impact Metric plugin
* Fix Bug in Calendars related to quote characters in Job Options
* Upgrade grails 5.1.6 and Spring 5.3.16


## Core Product Updates

* [CVE-2020-36518 fix (recreate 7626)](https://github.com/rundeck/rundeck/pull/7628)
* [Fixes CVE-2020-36518](https://github.com/rundeck/rundeck/pull/7626)
* [Fix Duplicated ACL Policies on Export Screen in Cloud](https://github.com/rundeck/rundeck/pull/7621)
* [Update grails to 5.1.6, spring to 5.3.18](https://github.com/rundeck/rundeck/pull/7620)
* [Bump postcss to resolve build error](https://github.com/rundeck/rundeck/pull/7619)
* [Improve dark-mode markdown table visibility](https://github.com/rundeck/rundeck/pull/7613)
* [Ace editor no contrast in dark mode](https://github.com/rundeck/rundeck/pull/7612)
* [Fix: CPU usage showing negative value](https://github.com/rundeck/rundeck/pull/7608)
* [Ansible plugin moved to `rundeck-plugins` GitHub Org](https://github.com/rundeck/rundeck/pull/7607)
* [Fix Custom Logo Alignment and Sizing](https://github.com/rundeck/rundeck/pull/7606)
* [Update Sections with consistent page title formats.](https://github.com/rundeck/rundeck/pull/7598)
* [Update Javadoc in ExecutionLogger.java](https://github.com/rundeck/rundeck/pull/7593)
* [Allow old quoting behavior](https://github.com/rundeck/rundeck/pull/7592)
* [Upgrade axios from 0.18.1 to 0.21.3](https://github.com/rundeck/rundeck/pull/7588)
* [Upgrade grails 5.1.6 and Spring to 5.3.16](https://github.com/rundeck/rundeck/pull/7583)
* [Upgrade h2 library version to 2.x](https://github.com/rundeck/rundeck/pull/7577)
* [Fix can not uncheck the &quot;Keep going on success&quot; option for error handler](https://github.com/rundeck/rundeck/pull/7566)

[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A4.1.0+is%3Aclosed)

## Community Contributors

* Travis Yoder (trayo)
* Paul Calabro (paulcalabro)

## Staff Contributors

* Greg Schueler (gschueler)
* Stephen Joyner (sjrd218)
* Imad Jafir (imad6639)
* Luis Toledo (ltamaster)
* Rodrigo Navarro (ronaveva)
* Carlos Eduardo (carlosrfranco)
* Miguel Ramos (mishingo)
* Christopher McCarroll-Gilbert (chrismcg14)
* Jason Qualman (qualman)
* Alexander Abarca (alexander-variacode)
* Alberto Hormazabal Cespedes (ahormazabal)
* Leonel Juarez (L2JE)
* Eric He (ehe-pd)
* Forrest Evans (fdevans)
* Darwis (DarwisNarvaezDev)
* Antony Velasquez Ruiz (avelasquezr)
