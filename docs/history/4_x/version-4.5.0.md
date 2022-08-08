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

### Highlights

* **Sumo Logic Job Step Plugins:** Now Sumo Logic users can automate operational tasks - such as retrieving logs for incident diagnostics - by integrating with a Sumo Logic instance.

* **ECS Node Executor Plugin:** Users can now run commands across multiple ECS containers in a single Job Step or from the Commands tab.  This makes it easier to accomplish tasks such as retrieving time-critical diagnostics during an incident before containers are redeployed.

* **AWS Fargate Node Executor:**

### Additional Updates

* Allow use of EC2 instance or ECS container Profile credentials  for authentication in all AWS plugins
* Set Runner on by Default in Docker Remco
* Sumologic Job Step Plugins
* Fix: Jobs not running after removing a project from a System Calendar
* Fix: Azure Log Storage generating duplicate folders for executions
* Loop Script Plugins
* Fix: Dependency Graph gets truncated in some views
* Fix: Cyberark Plugin now properly serializes return payload from API
* AWS Fargate Node Executor


## Rundeck Open Source Product Updates

* [Changed default SCM SSH authentication to SSHJ](https://github.com/rundeck/rundeck/pull/7763) This fix addresses the new GitHub security requirements and allows SCM to use GitHub as a source.
* [Upgrade grails to 5.1.9](https://github.com/rundeck/rundeck/pull/7829)
* [Upgrade spring to 5.3.20](https://github.com/rundeck/rundeck/pull/7823)
* [Fix: Unable to update Webhooks when changing handler settings in 4.4.0](https://github.com/rundeck/rundeck/pull/7820)
* [Fix: Log limit action does not work properly when global and job limit action are configured ](https://github.com/rundeck/rundeck/pull/7809)
* [Fix:  Member info not visible on Job tab in Cluster Manager](https://github.com/rundeck/rundeck/pull/7806)
* [Fix: Date Format differences in Context Variable output](https://github.com/rundeck/rundeck/pull/7805)
* [Fix Deprecated dot notation navigation issue for logviewer](https://github.com/rundeck/rundeck/pull/7796)
* [Fix: Schedule shown incorrectly when editing jobs with complex CRON statements.](https://github.com/rundeck/rundeck/pull/7794)
* [Fix: Broken password configuration path error message ](https://github.com/rundeck/rundeck/pull/7791)
* [Fix: System Report &#39;Allocated Memory&#39; display broken in the GUI](https://github.com/rundeck/rundeck/pull/7789)
* [Show proper error message when an existing filter with same name is already present](https://github.com/rundeck/rundeck/pull/7788)
* [Package Updates to address new CVEs](https://github.com/rundeck/rundeck/pull/7787)
* [Fix: Notification Property Value type when SCM Export is done in YAML format.](https://github.com/rundeck/rundeck/pull/7785)
* [Fix: Health Status Enhancers affects performance with lots of nodes.](https://github.com/rundeck/rundeck/pull/7780)
* [Fix: Incorrect &quot;Forward Slash&quot; parsing in File/URL Step](https://github.com/rundeck/rundeck/pull/7779)
* [Remove &quot;project FS importer&quot; code (disabled since 3.4)](https://github.com/rundeck/rundeck/pull/7778)
* [Fix: `instanceNameLabelColor` setting to apply properly on login page.](https://github.com/rundeck/rundeck/pull/7770)
* [Fix: Node tags being showed all in uppercase without distinction](https://github.com/rundeck/rundeck/pull/7768)
* [Update ExecReport table for better queries to improve execution cleanup peformance](https://github.com/rundeck/rundeck/pull/7735)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A4.5.0+is%3Aclosed)


## Staff Contributors

* Greg Schueler (gschueler)
* Alberto Hormazabal Cespedes (ahormazabal)
* Alexander Abarca (alexander-variacode)
* Antony Velasquez Ruiz (avelasquezr)
* Carlos Eduardo (carlosrfranco)
* Christopher McCarroll-Gilbert (chrismcg14)
* Darwis Narvaez (DarwisNarvaezDev)
* Eric He (ehe-pd)
* Forrest Evans (fdevans)
* Imad Jafir (imad6639)
* Jake Cohen (jsboak)
* Jason Qualman (qualman)
* Jeremy Olexa (jolexa)
* Jesus Osuna (Jesus-Osuna-M)
* Leonel Juarez (L2JE)
* Luis Toledo (ltamaster)
* Michael Catanese (mcat115)
* Miguel Ramos (mishingo)
* Osman Albarran (Oalbarran94)
* Rodrigo Navarro (ronaveva)
* Stephen Joyner (sjrd218)
