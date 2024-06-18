# 4.6.0 Release Notes

Name: <span style="color: salmon"><span class="glyphicon glyphicon-bullhorn"></span> "Ogre salmon bullhorn"</span>
Release Date: September 6, 2022

- [Download the Releases](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Watch the Live Stream Release Recap](https://youtu.be/fEHQfrTJ87Y)
- [Upgrade instructions](/upgrading/)

<VidStack src="youtube/fEHQfrTJ87Y"/>

## Overview

Check out the new features and enhancements for PagerDuty Runbook Automation and Rundeck Community included in this release. This release includes a new plugin for AWS Athena so that job definitions can include SQL queries against Amazon S3, an enhancement of the Amazon ECS node source plugin to handle multiple clusters within the same region, and a number of security and compliance enhancements and bug fixes.

## Runbook Automation Updates

> Also includes all Open Source updates from below

### Highlights

- **New plugin:** [Amazon Athena Query Job Step Plugin](/manual/workflow-steps/amazon-athena.md): The AWS Athena job steps plugin allows users to execute queries on data in S3 using AWS Athena as part of their Jobs.  Using this plugin allows domain-experts, such as BI or ML engineers, to provide a self-service interface to other individuals within the organization.  Or, as part of incident response, this plugin can be used for Automated Diagnostics and retrieve events from CloudTrail and surface those within PagerDuty Incidents.  

- **ECS Node Source Enhancements:** With the [ECS Node Source](/manual/projects/resource-model-sources/ecs-fargate.md), users can now integrate with multiple clusters in a given region.  This makes it easier to manage ECS Tasks across larger environments where it is common to have numerous clusters.  In addition, users can now filter the ECS Tasks added to the Node Inventory based on Service, Task Definition, or Container Name.  This is especially useful when there are only specific ECS Tasks that should be targeted with the [ECS Node Executor](/manual/projects/node-execution/aws-ecs.md).  For example, in a given cluster, there might be “sandbox” Tasks that do not need to be targeted with Automated-Diagnostics runbooks.  

### Additional Updates


* Fix : Runner updated to v0.1.30 for CVE-2022-0239 (okhttp lib upgrade)
* [Loop Script Plugins](/manual/workflow-steps/loop-plugins.md) - Fixups
* Changed max chars allowed on job params field from 255 to 750
* Fix: Chrome Debug console Errors
* Fix: Usability issues with [SQL Runner Plugin](/manual/node-steps/sqlrunner.md)
* New [API rate-limit](/administration/security/ratelimiting.md) algorithms to throttle abnormal client requests


## Rundeck Open Source Product Updates

* [Add audit tracking for jobs and acls](https://github.com/rundeck/rundeck/pull/7826) ([documentation](/administration/security/audit-trail.md))
* [Fix : Enable autocomplete for the token script expansion in plugins](https://github.com/rundeck/rundeck/pull/7877)
* [Fix : Allow JSON &quot;Simple List&quot; format parsing from a job option remote URL](https://github.com/rundeck/rundeck/pull/7872)
* [Fix : Non-admin user unable to get data on windows nodes through WinRM and Ansible (Upgrade Ansible to 3.2.2)](https://github.com/rundeck/rundeck/pull/7863)
* [Fix: Stop UI AJAX calls when a user is not logged in](https://github.com/rundeck/rundeck/pull/7861)
* [Fix : Job Remote Option URL &quot;retry&quot; connection parameter is not honored](https://github.com/rundeck/rundeck/pull/7856)
* [Fix: Enabling/Disabling both Scheduling and Executions at the same time using timer mode](https://github.com/rundeck/rundeck/pull/7842)
* [Fix : Update for CVE-2022-0839 (Upgrade to Liquibase 4.8.0)](https://github.com/rundeck/rundeck/pull/7831)
* [Fix: Improve query to get referenced executions](https://github.com/rundeck/rundeck/pull/7827)
* [Fix : Update for CVE-2022-24329 (Upgrade to okhttp 4.9.2)](https://github.com/rundeck/rundeck/pull/7825)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A4.6.0+is%3Aclosed)

## Ansible Plugin Updates
* [Fix: Ansible plugin using a non-admin user on winrm](https://github.com/rundeck-plugins/ansible-plugin/pull/324)

## Community Contributors

* ([AndLLA](https://github.com/AndLLA)) - Thank you for the [Learning Article](/learning/howto/apache2-proxy-gssapi.md)

## Staff Contributors

* Greg Schueler ([gschueler](https://github.com/gschueler))
* Alberto Hormazabal Cespedes ([ahormazabal](https://github.com/ahormazabal))
* Alexander Abarca ([alexander-variacode](https://github.com/alexander-variacode))
* Antony Velasquez Ruiz ([avelasquezr](https://github.com/avelasquezr))
* Carlos Eduardo ([carlosrfranco](https://github.com/carlosrfranco))
* Christopher McCarroll-Gilbert ([chrismcg14](https://github.com/chrismcg14))
* Darwis Narvaez ([DarwisNarvaezDev](https://github.com/DarwisNarvaezDev))
* Eric He ([ehe-pd](https://github.com/ehe-pd))
* Forrest Evans ([fdevans](https://github.com/fdevans))
* Imad Jafir ([imad6639](https://github.com/imad6639))
* Jake Cohen ([jsboak](https://github.com/jsboak))
* Jason Qualman ([qualman](https://github.com/qualman))
* Jesus Osuna ([Jesus-Osuna-M](https://github.com/Jesus-Osuna-M))
* Leonel Juarez ([L2JE](https://github.com/L2JE))
* Luis Toledo ([ltamaster](https://github.com/ltamaster))
* Miguel Ramos ([mishingo](https://github.com/mishingo))
* Osman Albarran ([Oalbarran94](https://github.com/Oalbarran94))
* Rodrigo Navarro ([ronaveva](https://github.com/ronaveva))
* Stephen Joyner ([sjrd218](https://github.com/sjrd218))
* Nathan Fluegel ([wayfaringson](https://github.com/wayfaringson))
* Reiner ([MegaDrive68k](https://github.com/MegaDrive68k))
