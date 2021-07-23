# Release 3.4.2

Name: <span style="color: brown"><span class="glyphicon glyphicon-bullhorn"></span> "Papadum brown bullhorn"</span>

- [Download Rundeck](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)

## Overview

### Job Data [Incubating] (Enterprise)

Configure Job output as structured JSON data for use on other systems.

### Azure Node Steps

Start/Stop/Restart/Delete Machine Instances.

### ServiceNow Node Source Custom Filters

Allow custom filters on ServiceNow Node Sources.

## Enterprise Updates

* Introduce Rundeck Job Data Plugin - Incubating Feature
* Fix: If 3rd party SSO is not available, rundeck wouldn't start properly.
* Azure Enterprise Node Step Enhancements
* Allow Custom filter for ServiceNow resource model
* Project dashboard updates for queued executions

## Core Product Updates

* [Fix pywinrm plugin to properly handle % characters](https://github.com/rundeck/rundeck/pull/7178)
* [Fix project export error messages](https://github.com/rundeck/rundeck/pull/7174)
* [Fix errors from 1000+ Executions on Oracle Database](https://github.com/rundeck/rundeck/pull/7173)
* [Fix to properly show SSO login button](https://github.com/rundeck/rundeck/pull/7170)
* [Improve loading speed of Project Picker and New Widget](https://github.com/rundeck/rundeck/pull/7158)
* [SCM: Reduce errors related to failed SCM plugins.](https://github.com/rundeck/rundeck/pull/7153)
* [FIX: Gracefully handle errors when execution fails to start.](https://github.com/rundeck/rundeck/pull/7150)
* [and Fixes Sort list of plugins by key order.](https://github.com/rundeck/rundeck/pull/7142)
* [Properly handle null value when resource does not have the attribute filtered by ACL rule key](https://github.com/rundeck/rundeck/pull/7137)
* [Job import does not preserve option value ordering](https://github.com/rundeck/rundeck/pull/7122)
* [Fix: Properly detect when a job was renamed in SCM Import](https://github.com/rundeck/rundeck/pull/7030)
* [Make log levels configurable on Docker Image via Remco](https://github.com/rundeck/rundeck/pull/6990)

[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A3.4.2+is%3Aclosed)

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
* Alexander Abarca (alexander-variacode)
* Alberto Hormazabal Cespedes (ahormazabal)
* Forrest Evans (fdevans)
* Adam Butler (ajxb)
* Aleksey @soar Smyrnov (soar)
