# Release 3.4.2

Name: <span style="color: brown"><span class="glyphicon glyphicon-bullhorn"></span> "Papadum brown bullhorn"</span>
Release Date: August 4, 2021

- [Download Rundeck](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)

## Overview

Check out the new features and enhancements for Rundeck Enterprise and Rundeck Community as well as a few incubating features included in this release. Incubating features are functionality released as ideas with the goal of getting feedback from our users. Look for posts in the [Rundeck Forums](https://community.pagerduty.com) to join the discussion about **Result Data** and **Ruleset Visualization**.

### Result Data [Incubating] (Enterprise)

The new Result Data feature brings easier to digest output data to Rundeck.

Log Output can be long, complicated, and often lacks focus. Use this feature to construct key log data into an easily consumable and consistent output format. The Result Data output is available through its own API endpoint from the Job Activity. The initial release builds JSON output either from a user defined template or from global variable namespaces.

Use cases for this feature cover a broad range of ideas like API consolidation, simplifying results for technicians, and more. Jobs can now be thought of as composable functions that return data. Share your own use case ideas as well on the [Rundeck Forums](https://community.pagerduty.com). (Look for the _Result Data - Incubating_ post)

[Check out the documentation for how to enable the incubating feature.](/manual/execution-lifecycle/job-data.html)

![Job Data Output](@assets/img/relnotes-342-jobdata.png)

### Ruleset Visualization [Incubating] (Enterprise)

Rulesets can be complicated to write. The Ruleset visualization offers a view of how the Workflow will progress based on the rules written. This feature is enabled by default on 3.4.2 and we have plans to expand the functionality in future releases. Join the discussion on the [Rundeck Forums](https://community.pagerduty.com). (Look for the _Ruleset Visualization - Incubating_ post)

![Ruleset Visualization](@assets/img/relnotes-342-rulesetvisual.gif)

[Click here learn more about the Ruleset Strategy available in Rundeck Enterprise.](/manual/workflow-strategies/ruleset.md)

### Azure Node Steps (Enterprise)

Now it's more practical to manage larger deployments in Microsoft&reg; Azure with more detailed cloud automation features. New node steps were introduced to add Cloud Automation to your Rundeck workflows. Control your imported nodes in Rundeck by using the following new job steps:

* Start a Virtual Machine
* Stop a Virtual Machine
* Restart a Virtual Machine
* Delete a Virtual Machine

### ServiceNow&reg; Node Source Custom Filters (Enterprise)

In 3.4.2, we have added the ability to specify custom filters when setting up the ServiceNow&reg; Node Source. Now it’s possible to gather the nodes you want into your Rundeck project. Use a filter against any CMDB table and gather the results as nodes from ServiceNow&reg;.

[Check out the updated documentation here](/manual/projects/resource-model-sources/servicenow.html)

## Enterprise Updates

* Fix ServiceNow Node Source does not map certain fields.
* Fix: Issue on Rundeck 3.4.0 using encrypted values (JASYPT) account lock
* Introduce Rundeck Job Data Plugin - Incubating Feature
* Fix: If 3rd party SSO is not available, rundeck wouldn&#39;t start properly.
* Azure Enterprise Node Step Enhancements
* Allow Custom filter for ServiceNow resource model
* Project dashboard updates for queued executions

### System Report
* Add new usage metrics to System Report


## Core Product Updates

* [Fix copybox to work if connection is insecure](https://github.com/rundeck/rundeck/pull/7196)
* [Fix navbar overflow during zoom](https://github.com/rundeck/rundeck/pull/7194)
* [Hotfix: Update to output new TAG](https://github.com/rundeck/rundeck/pull/7186)
* [Fix pywinrm plugin to properly handle % characters](https://github.com/rundeck/rundeck/pull/7178)
* [Fix project export error messages](https://github.com/rundeck/rundeck/pull/7174)
* [Fix errors from 1000+ Executions on Oracle Database](https://github.com/rundeck/rundeck/pull/7173)
* [Fix to properly show SSO login button](https://github.com/rundeck/rundeck/pull/7170)
* [Optional BindDN in JAAS login module template for Docker Image](https://github.com/rundeck/rundeck/pull/7163)
* [Improve loading speed of Project Picker and New Widget](https://github.com/rundeck/rundeck/pull/7158)
* [SCM: Reduce errors related to failed SCM plugins.](https://github.com/rundeck/rundeck/pull/7153)
* [FIX: Gracefully handle errors when execution fails to start.](https://github.com/rundeck/rundeck/pull/7150)
* [Fixes Sort list of plugins by key order.](https://github.com/rundeck/rundeck/pull/7142)
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
