# Release 4.5.0

Name: <span style="color: orchid"><span class="glyphicon glyphicon-tower"></span> "Nessie orchid tower"</span>
Release Date: PUTADATEHERE

- [Download the Releases](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/)

## Overview

Check out the new features and enhancements for PagerDuty Process Automation, PagerDuty Runbook Automation, and Rundeck included in this release.

## Process Automation Updates

> Also includes all Open Source updates from below

* Allow use of EC2 instance or ECS container Profile credentials  for authentication in all AWS plugins
* Sumologic Job Step Plugins
* Azure Log Storage generates duplicated folder for executions
* Fix: Dependency Graph gets truncated in some views
* AWS Fargate Node Executor


## Rundeck Open Source Product Updates

* [Upgrade spring to 5.3.20](https://github.com/rundeck/rundeck/pull/7823)
* [Revert &quot;Add audit tracking for jobs and acls.&quot;](https://github.com/rundeck/rundeck/pull/7822)
* [BUGFIX unable to update webhook](https://github.com/rundeck/rundeck/pull/7820)
* [Enable Twistlock Scan as part of CI/CD Process](https://github.com/rundeck/rundeck/pull/7819)
* [Add audit tracking for jobs and acls.](https://github.com/rundeck/rundeck/pull/7817)
* [Config of twistlock scan](https://github.com/rundeck/rundeck/pull/7814)
* [Fix: Unable to save passwords kV version=1 hashicorp vault](https://github.com/rundeck/rundeck/pull/7812)
* [Fixed global log limit adding a Failed status on a job](https://github.com/rundeck/rundeck/pull/7809)
* [Fix:  Member info not visible on Job tab in Cluster Manager](https://github.com/rundeck/rundeck/pull/7806)
* [Fix Date Format differences in Context Variable output](https://github.com/rundeck/rundeck/pull/7805)
* [Fix global log limit issue](https://github.com/rundeck/rundeck/pull/7802)
* [Fix Deprecated dot notation navigation issue for logviewer](https://github.com/rundeck/rundeck/pull/7796)
* [Run-1014: Fix: Schedule shown incorrectly when editing jobs with complex CRON statements.](https://github.com/rundeck/rundeck/pull/7794)
* [Add audit tracking for jobs and acls.](https://github.com/rundeck/rundeck/pull/7793)
* [fixed broken error message that appears when you have not stored a password](https://github.com/rundeck/rundeck/pull/7791)
* [System Report &#39;Allocated Memory&#39; display broken in the GUI](https://github.com/rundeck/rundeck/pull/7789)
* [Show proper error message when an existing filter with same name is already present](https://github.com/rundeck/rundeck/pull/7788)
* [Package Updates to address new CVEs](https://github.com/rundeck/rundeck/pull/7787)
* [Fix Notification Property Value type when SCM Export YAML format.](https://github.com/rundeck/rundeck/pull/7785)
* [Fix bug where Health Status Enhancers affects performance with lots of nodes.](https://github.com/rundeck/rundeck/pull/7780)
* [Fix: Incorrect &quot;Forward Slash&quot; parsing in File/URL Step](https://github.com/rundeck/rundeck/pull/7779)
* [Remove &quot;project FS importer&quot; code (disabled since 3.4)](https://github.com/rundeck/rundeck/pull/7778)
* [Fix `instanceNameLabelColor` setting to apply properly on login page.](https://github.com/rundeck/rundeck/pull/7770)
* [Fix: Node tags being showed all in uppercase without distinction](https://github.com/rundeck/rundeck/pull/7768)
* [Changing default SCM SSH authentication to SSHJ](https://github.com/rundeck/rundeck/pull/7763)
* [update ExecReport table for better queries](https://github.com/rundeck/rundeck/pull/7735)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A4.5.0+is%3Aclosed)

## Ansible Plugin Updates


## Community Contributors

* Alberto Hormazabal (ahormazabal)
* Darwis Narvaez (DarwisNarvaezDev)
* Eric He (ehe-pd)
* Leonel Juarez (L2JE)
* Alexander Abarca (alexander-variacode)
* Antony Velasquez Ruiz (avelasquezr)
* Osmar Perez (perezo-pd)
* Rodrigo Navarro (ronaveva)
*  (ryunge)
* Michael Catanese (mcat115)
* Osman Albarran (Oalbarran94)
* Jesus Osuna (Jesus-Osuna-M)
* Greg Schueler (gschueler)
* Luis Toledo (ltamaster)
* Christopher McCarroll-Gilbert (chrismcg14)
* Jaime Tobar (jtobard)
* Jake Cohen (jsboak)


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
* Jesus Osuna (Jesus-Osuna-M)
* Alexander Abarca (alexander-variacode)
* Alberto Hormazabal Cespedes (ahormazabal)
* Leonel Juarez (L2JE)
* Eric He (ehe-pd)
* Forrest Evans (fdevans)
* Jake Cohen (jsboak)
* Darwis Narvaez (DarwisNarvaezDev)
* Osman Albarran (Oalbarran94)
* Antony Velasquez Ruiz (avelasquezr)
