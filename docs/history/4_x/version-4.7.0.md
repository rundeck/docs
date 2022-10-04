# Release 4.7.0

Name: <span style="color: yellowgreen"><span class="glyphicon glyphicon-gift"></span> "Orc yellowgreen gift"</span>
Release Date: PUTADATEHERE

- [Download the Releases](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/)

## Overview

Check out the new features and enhancements for PagerDuty Process Automation (formerly Rundeck Enterprise) and PagerDuty Runbook Automation and Rundeck Community included in this release.

## Process Automation Updates

> Also includes all Open Source updates from below

### Highlights

**ROI Metrics Data (incubating)** - Process Automation provides value with each workflow execution. Users report saving time, money, and often a combination of both. Now, Process Automation users have a way to track time and money saved, as well as begin to see insights into the effectiveness of teams and projects.

The ROI Metrics integration tracks user-defined value of each job execution and stores key value pairs against jobs to help you understand the ROI per job execution. The metrics accessible via API for further analysis. Find out more [here](/manual/execution-lifecycle/roi-metrics.md).

**CloudWatch Logs Saved Query plugin** - This new plugin can help users improve incident response and streamline reporting. Amazon customers often save queries for CloudWatch Logs Insights for common reporting and investigation tasks. Now, Runbook Automation and Process Automation customers can use this plugin to execute saved queries as Job steps within their automated runbooks. This allows domain-experts to delegate queries to others as self-service. For incident response, this plugin also helps automate diagnostics by giving responders the ability to pull logs into a PagerDuty incident without escalating to experts. Full details and documentation for the new plugin can be found [here](/manual/workflow-steps/aws-cloudwatch.md).

**Enhanced Progress Badge Plugin** - The Progress Badge plugin can create graphic badges that render on the Log Output tab. Now, the enhanced Progress Badge allows users to present simplified log-output text to other job-steps and provides the option to include emoticon status-symbols. For users implementing Automated Diagnostics, this gives domain-experts the ability to simplify diagnostics in an easier to consume way. Find the full documentation for the enhanced plugin [here](/manual/log-filters/progress-badge.md).

## Rundeck Open Source Product Updates

* [Improvements on job file option input sanitation](https://github.com/rundeck/rundeck/pull/7911)
* [fix bugs with AuthToken refactor](https://github.com/rundeck/rundeck/pull/7910)
* [Adding job start failure metric.](https://github.com/rundeck/rundeck/pull/7909)
* [Add error code parameter to login error page for custom message support](https://github.com/rundeck/rundeck/pull/7906)
* [change lombok from annotationProcessor to implementation to resolve i…](https://github.com/rundeck/rundeck/pull/7901)
* [[QA 4.6.1] Minor GUI Bug on WH Dropdown](https://github.com/rundeck/rundeck/pull/7899)
* [fix: dev-mode: failing ui pseudo-test](https://github.com/rundeck/rundeck/pull/7892)
* [project menu dropdown create project doesnt work with an app context path](https://github.com/rundeck/rundeck/pull/7890)
* [Failed to Import project, error 500 whitelabel on screen](https://github.com/rundeck/rundeck/pull/7887)
* [Unable to edit job when SCM is still activated](https://github.com/rundeck/rundeck/pull/7885)
* [rundeck.gui.helpLink property replace the doc link instead of support link](https://github.com/rundeck/rundeck/pull/7880)
* [Customizing UI with client logo resize login form, push login button to bottom without scroll](https://github.com/rundeck/rundeck/pull/7878)
* [Fix flaky test for avg duration notification](https://github.com/rundeck/rundeck/pull/7876)
* [fix: validation added to prevent invalid captured pattern](https://github.com/rundeck/rundeck/pull/7873)
* [Fixes imports that were missing](https://github.com/rundeck/rundeck/pull/7871)
* [Migrating components to app.ts](https://github.com/rundeck/rundeck/pull/7870)
* [Add changes needed for ROI Plugin](https://github.com/rundeck/rundeck/pull/7866)
* [Auth Token data-spi ](https://github.com/rundeck/rundeck/pull/7837)

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
