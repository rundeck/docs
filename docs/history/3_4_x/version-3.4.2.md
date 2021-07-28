# Release 3.4.2

Name: <span style="color: brown"><span class="glyphicon glyphicon-bullhorn"></span> "Papadum brown bullhorn"</span>

- [Download Rundeck](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)

## Overview
Check out the new features and enhancements for Rundeck Enterprise and Rundeck Community included in this release.

### Job Data [Incubating] (Enterprise)

The Job Data feature brings "Output data that is easy to digest" to Rundeck.

Log Output can be long, complicated, and often lacks focus. Use this to output key log data in an easily consumable and consistent format.  The job data output is available through it’s own API endpoint from the Job Activity.  The initial release builds JSON output either from a user defined template or from global variable namespaces.

Use cases for this feature cover a broad range of ideas.  Jobs can now be thought of as composable functions that return data

[Check out the documentation for how to enable the incubating feature.](https://docs.rundeck.com/docs/manual/execution-lifecycle/job-data.html)

### Ruleset Visualization [Incubating] (Enterprise)

Rulesets can be complicated to write. The Ruleset visualization offers a view of how the Workflow will progress based on the rules written.  This feature is enabled by default on 3.4.2.

### Azure Node Steps (Enterprise)

In 3.4.1, new node steps were introduced to add more functionality to the already existing Azure Resource Model. Now you can control your imported nodes in Rundeck by using the following new job steps:

* Start a Virtual Machine
* Stop a Virtual Machine
* Restart a Virtual Machine
* Delete a Virtual Machine
* Capture Snapshot of Machine Instances

### ServiceNow Node Source Custom Filters (Enterprise)

In 3.4.1, we added the ability to specify custom filters when setting up the ServiceNow Node Source. Now, you can add any filters you may use in ServiceNow to ensure that only the nodes you want are imported into Rundeck.

[Check out the updated documentation here](https://docs.rundeck.com/docs/administration/projects/resource-model-sources/servicenow.html)

## Enterprise Updates

* Introduce Rundeck Job Data Plugin - Incubating Feature
* Fix: If 3rd party SSO is not available, rundeck wouldn&#39;t start properly.
* Azure Enterprise Node Step Enhancements
* Allow Custom filter for ServiceNow resource model
* Project dashboard updates for queued executions

### System Report
* Add new usage metrics to System Report


## Core Product Updates

* [Fix pywinrm plugin to properly handle % characters](https://github.com/rundeck/rundeck/pull/7178)
* [Fix project export error messages](https://github.com/rundeck/rundeck/pull/7174)
* [Fix errors from 1000+ Executions on Oracle Database](https://github.com/rundeck/rundeck/pull/7173)
* [Fix to properly show SSO login button](https://github.com/rundeck/rundeck/pull/7170)
* [Optional BindDN in JAAS login module template for Docker Image](https://github.com/rundeck/rundeck/pull/7163)
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
