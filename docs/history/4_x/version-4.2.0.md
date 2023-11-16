# 4.2.0 Release Notes

Name: <span style="color: rebeccapurple"><span class="glyphicon glyphicon-glass"></span> "Liger rebeccapurple glass"</span>
Release Date: May 11, 2022

- [Download Rundeck](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/)

:::danger
 Due to [CVE-2022-31044](/history/cves/cve-2022-31044.md) this version has been superseded by version [4.2.2](version-4.2.2.md).
:::

## Overview

Check out the new features and enhancements for the commercial products (Runbook Automation and Process Automation On Prem formerly Rundeck Enterprise) and Rundeck Community included in this release. Release includes:

- New AWS ECS/Fargate Node Source.
- More security fixes from a valued community member. Thank you @paulcalabro for the Pull Requests.
- Simplified configuration for Vault and Thycotic Key Storage plugins directly in the UI.
- Lots of Bug fixes and UI updates.
- The EC2 Node Source can now pull from multiple or all regions.
>Post Release Note: There is a minor bug with the new EC2 Node Source that the **endpoint** setting must be specified.  If you are using this Node Source please ensure that is specified.  This issue is fixed in [4.2.1](version-4.2.1.md).

:::danger Reminder
When upgrading to 4.1+ and using H2 please follow the [Upgrading to 4.1](/upgrading/upgrading-to-4.1.md) notes.
:::

## Commercial Versions

* Vault Key Storage plugins can now be configured using Configuration Management UI
* Resolve CVE-2021-31684 in Azure Plugins
* NEW ECS/Fargate Resource Model Plugin
* Upgrade to Grails 5.1.7
* Fix script Health Check unauthorized detection js error
* Azure SSO GroupSource Plugin Handles paginated API calls
* Thycotic Key Storage Plugin can now use Configuration Management UI
* Allow EC2 Node Source to pull from more than one Region


## Core Product Updates

* [Fix #6960 incorrect remco template for csp form action](https://github.com/rundeck/rundeck/pull/7680)
* [Collection of UI updates and fixes](https://github.com/rundeck/rundeck/pull/7679)
* [Expose spring actuator health check endpoints](https://github.com/rundeck/rundeck/pull/7677)
* [Export to instance not working when preserving UUID](https://github.com/rundeck/rundeck/pull/7671)
* [Fix: Project Scheduling not working properly](https://github.com/rundeck/rundeck/pull/7669)
* [Ace editor no contrast in dark mode](https://github.com/rundeck/rundeck/pull/7668)
* [Fix: Job schedule error when duplicating job](https://github.com/rundeck/rundeck/pull/7665)
* [Bugfix - Expanding tokens in file workflow step](https://github.com/rundeck/rundeck/pull/7663)
* [Upgrade to Grails 5.1.7](https://github.com/rundeck/rundeck/pull/7662)
* [Fix Requirement for Restart When Key Storage Prop is Updated](https://github.com/rundeck/rundeck/pull/7661)
* [Fix: property expansion in project props should not cause exception](https://github.com/rundeck/rundeck/pull/7659)
* [Add Ellipses to Long Titles in Project Picker](https://github.com/rundeck/rundeck/pull/7652)
* [Descriptive console and API output](https://github.com/rundeck/rundeck/pull/7647)
* [Improve UI for Jobs Search Bar](https://github.com/rundeck/rundeck/pull/7644)
* [Merge Execution Mode Timer addon to rundeck repo](https://github.com/rundeck/rundeck/pull/7635)
* [Fixes org.postgresql:postgresql vulns](https://github.com/rundeck/rundeck/pull/7632)
* [Handling special characters in user:password](https://github.com/rundeck/rundeck/pull/7630)
* [Fix: GUI always displays &quot;nodes&quot; view ignoring set default value](https://github.com/rundeck/rundeck/pull/7617)
* [Special character handling fixes for remote URLs](https://github.com/rundeck/rundeck/pull/7609)
* [fix schedule crontab string should be shown in job editor](https://github.com/rundeck/rundeck/pull/7599)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A4.2.0+is%3Aclosed)

## Community Contributors

* Amir Jafarvand (ajafarvand)
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
