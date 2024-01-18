# 4.3.0 Release Notes

Name: <span style="color: turquoise"><span class="glyphicon glyphicon-lamp"></span> "Manticore turquoise lamp"</span>
Release Date: June 1, 2022

- [Download Rundeck](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/)

:::warning
 Due to [CVE-2022-31044](/history/cves/cve-2022-31044.md) this version has been superseded by version [`4.3.2`](version-4.3.2.md).  `4.3.0` is not vulnerable to the issue, but does not remediate if 4.2.0/4.2.1 were used previously.
:::

## Overview

Check out the new features and enhancements for PagerDuty Process Automation (formerly Rundeck Enterprise) and PagerDuty Runbook Automation (announced as Rundeck Cloud) and Rundeck Community included in this release.

## AWS Plugin Enhancements
New AWS Job Step Plugins for ELB, ECS, RDS are available for Commercial product users. See details about specific plugin functionality below.

* ELB plugin lists any Target-Group instance with an "unhealthy" status check.
* ECS plugin Stops an ECS Task (Container).
* ECS plugin lists any stopped ECS Tasks and their associated error messages.
* RDS provides the RDS Instance Status, such as whether more storage is needed.

## Other Commercial Updates

* Allow editing the endpoint in Pagerduty Event API Plugins
* Native sleep plugin Workflow step
* Allow more than ~30 actions on a single webhook
* PagerDuty /Incident/Add Responders job step fails if there is no value in the &quot;User&quot; field
* Property to customize maximum resources to retrieve from Thycotic
* AWS - Execute Lambda Steps / Validate AWS Credentials Step
* Add configuration to disable &quot;Public Key&quot; GUI download option
* Improvement: Cleanup dead nodes &quot;sibling&quot; algorithm improvement

## Core Product Updates

* [Storybook Knobs Deprecated](https://github.com/rundeck/rundeck/pull/7721)
* [Fix: Webhook minimum actions error message showing incorrectly](https://github.com/rundeck/rundeck/pull/7718)
* [Fix GUI bug where tooltip in PagerDuty Webhooks blocked button.](https://github.com/rundeck/rundeck/pull/7716)
* [Update Multiline Regex Data Capture Filter to capture multiple key-value pairs.](https://github.com/rundeck/rundeck/pull/7711)
* [Fix: Bug where Ansible plugins don&#39;t show properly](https://github.com/rundeck/rundeck/pull/7704)
* [Fix local file copier config error](https://github.com/rundeck/rundeck/pull/7703)
* [Allow editing the endpoint for Pagerduty Event API Plugins](https://github.com/rundeck/rundeck/pull/7699)
* [Fix: XXSSP header is deprecated](https://github.com/rundeck/rundeck/pull/7696)
* [Avoid logging warnings by removing dot notation config value access](https://github.com/rundeck/rundeck/pull/7695)
* [Messages for WebHooks import errors and new messages for webhook toke…](https://github.com/rundeck/rundeck/pull/7694)
* [Remove unused CSS file](https://github.com/rundeck/rundeck/pull/7692)
* [Add configuration to disable &quot;Public Key&quot; GUI download option](https://github.com/rundeck/rundeck/pull/7691)
* [Update node-forge versions to address CVEs](https://github.com/rundeck/rundeck/pull/7690)
* [Only show Local Filesystem ACL summary if OpsAdmin or higher](https://github.com/rundeck/rundeck/pull/7687)
* [Fix: Cluster manager hostname disappears](https://github.com/rundeck/rundeck/pull/7685)
* [Remove options when importing Job Definitions](https://github.com/rundeck/rundeck/pull/7674)
* [Support for OpenAPI documentation Generation](https://github.com/rundeck/rundeck/pull/7672)
* [Fix: 404 page when clicking on referenced execution from a different parent](https://github.com/rundeck/rundeck/pull/7649)
* [Can&#39;t open referenced job in GUI, when has thousands of log executions](https://github.com/rundeck/rundeck/pull/7648)
* [Support import/export of multiple notifications in the same trigger](https://github.com/rundeck/rundeck/pull/7511)

[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A4.3.0+is%3Aclosed)

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
* Darwis Narvaez (DarwisNarvaezDev)
* Antony Velasquez Ruiz (avelasquezr)
* Jesus Osuna (Jesus-Osuna-M)
