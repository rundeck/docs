---

title: "4.7.0 Release Notes"
date: 2022-10-06
image: /images/chevron-logo-red-on-white.png
feed:
 enable: true
 description: "Version 4.7.0 is here!  The release includes a new plugin for CloudWatch that simplifies the management of diagnostics queries, an incubating feature that helps users understand the ROI of jobs, and a number of security and compliance updates and bug fixes."

---

# 4.7.0 Release Notes

Name: <span style="color: yellowgreen"><span class="glyphicon glyphicon-gift"></span> "Orc yellowgreen gift"</span>
Release Date: October 6, 2022

- [Download the Releases](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Watch the Live Stream Release Recap](https://youtu.be/jTqfAmExg_Y)
- [Upgrade instructions](/upgrading/)

## Overview

Check out the new features and enhancements for PagerDuty Process Automation (formerly Rundeck Enterprise), PagerDuty Runbook Automation, and Rundeck Community included in this release. This release includes a new plugin for CloudWatch that simplifies the management of diagnostics queries, an incubating feature that helps users understand the return on investment (ROI) of jobs, and a number of security and compliance updates and bug fixes.

View our Twitch stream review of this release live on Wednesday, October 12 at 10AM Pacific. [Here’s the event link](https://www.twitch.tv/pagerduty/schedule?seriesID=792f972e-f876-4135-b6c2-6ea30a5c0330).

## Process Automation Updates

> Also includes all Open Source updates from below

### Highlights

**ROI Metrics Data (incubating)** - Process Automation provides value with each workflow execution. Users report saving time, money, and often a combination of both. Now, Process Automation users have a way to track time and money saved, as well as begin to see insights into the effectiveness of teams and projects.

The ROI Metrics integration tracks user-defined value of each job execution and stores key value pairs against jobs to help you understand the ROI per job execution. The metrics accessible via API for further analysis. Find out more [here](/manual/execution-lifecycle/roi-metrics.md).

**CloudWatch Logs Saved Query plugin** - This new plugin can help users improve incident response and streamline reporting. Amazon customers often save queries for CloudWatch Logs Insights for common reporting and investigation tasks. Now, Runbook Automation and Process Automation customers can use this plugin to execute saved queries as Job steps within their automated runbooks. This allows domain-experts to delegate queries to others as self-service. For incident response, this plugin also helps automate diagnostics by giving responders the ability to pull logs into a PagerDuty incident without escalating to experts. Full details and documentation for the new plugin can be found [here](/manual/workflow-steps/aws-cloudwatch.md).

**Enhanced Progress Badge Plugin** - The Progress Badge plugin can create graphic badges that render on the Log Output tab. Now, the enhanced Progress Badge allows users to present simplified log-output text to other job-steps and provides the option to include emoticon status-symbols. For users implementing Automated Diagnostics, this gives domain-experts the ability to simplify diagnostics in an easier to consume way. Find the full documentation for the enhanced plugin [here](/manual/log-filters/progress-badge.md).

### Additional Updates

* Cleanup/fix some restart flags on System Configuration entries.
* Fix: PagerDuty notifications fail if the Summary field contains unknown variables
* Fix: Unexpected FailureReason string causes node execution to result in success
* Fix: JIRA Notification Plugin Shows password in plain text
* Fix: Runner in-product downloads erroring on windows

## Rundeck Open Source Product Updates

* [Improvements on job file option input sanitation](https://github.com/rundeck/rundeck/pull/7911)
* [Adding job start failure JMX metric.](https://github.com/rundeck/rundeck/pull/7909)
* [Fix: Minor GUI Bug on Webhook Plugin dropdown](https://github.com/rundeck/rundeck/pull/7899)
* [Fix: Project menu dropdown &#39;Create project&#39; breaks with an app context path](https://github.com/rundeck/rundeck/pull/7890)
* [Fix: Improved error handling on importing a Project with missing plugins](https://github.com/rundeck/rundeck/pull/7887)
* [Fix: Removed the hardcoded &#39;Documentation&#39; string in the &#39;get help&#39; URL in the footer ](https://github.com/rundeck/rundeck/pull/7880)
* [Fix: UI update to prevent the login box from being obscured by large images](https://github.com/rundeck/rundeck/pull/7878)
* [Fix: Added regex validation to LogFilter &#39;Key Value Data&#39; capture](https://github.com/rundeck/rundeck/pull/7873)

[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A4.7.0+is%3Aclosed)

## Community Contributors

* Reiner ([MegaDrive68k](https://github.com/MegaDrive68k))
* Lucas Canavosio ([lcanavosio](https://github.com/lcanavosio))
* JP Lassnibatt ([jplassnibatt](https://github.com/jplassnibatt))

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
* Jason Brooks ([jbrookspd](https://github.com/jbrookspd))
* Jason Qualman ([qualman](https://github.com/qualman))
* Jesus Osuna ([Jesus-Osuna-M](https://github.com/Jesus-Osuna-M))
* Leonel Juarez ([L2JE](https://github.com/L2JE))
* Luis Toledo ([ltamaster](https://github.com/ltamaster))
* Miguel Ramos ([mishingo](https://github.com/mishingo))
* Osman Albarran ([Oalbarran94](https://github.com/Oalbarran94))
* Rodrigo Navarro ([ronaveva](https://github.com/ronaveva))
* Stephen Joyner ([sjrd218](https://github.com/sjrd218))
