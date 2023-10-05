# 4.5.0 Release Notes

Name: <span style="color: orchid"><span class="glyphicon glyphicon-tower"></span> "Nessie orchid tower"</span>
Release Date: August 10, 2022

- [Download the Releases](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Watch the Live Stream Release Recap](https://youtu.be/tZqSPUrT5IU)
- [Upgrade instructions](/upgrading/)

<YouTube id="tZqSPUrT5IU"/>

## Overview

Check out the new features and enhancements for PagerDuty Process Automation (formerly Rundeck Enterprise) and PagerDuty Runbook Automation and Rundeck Community included in this release.

## Process Automation Updates

> Also includes all Open Source updates from below

### Highlights

* **Sumo Logic Job Step Plugins:** Now Sumo Logic users can automate operational tasks - such as retrieving logs for incident diagnostics - by integrating with a Sumo Logic instance. [[Docs](/manual/workflow-steps/sumo-logic.md)]

* **ECS Node Executor Plugin:** Users can now run commands across multiple ECS containers in a single Job Step or from the Commands tab.  This makes it easier to accomplish tasks such as retrieving time-critical diagnostics during an incident before containers are redeployed.

### Additional Updates

* Allow use of EC2 instance or ECS container Profile credentials for authentication in all AWS plugins
* Set Runner on by Default in [Docker Remco](/administration/configuration/docker/extending-configuration.md)
* Fix: Jobs not running after removing a project from a [System Calendar](/manual/calendars.md)
* Fix: [Azure Log Storage](/administration/cluster/logstore/azure.md) generating duplicate folders for executions
* [Loop Script Plugins](/manual/workflow-steps/loop-plugins.md)
* Fix: Dependency Graph gets truncated in some views
* Fix: [Cyberark Plugin](/manual/key-storage/storage-plugins/cyberark-storage.md) now properly serializes return payload from API


## Rundeck Open Source Product Updates

* [Changed default SCM SSH authentication to SSHJ](https://github.com/rundeck/rundeck/pull/7763) The [SCM integration](/manual/projects/scm/) now uses SSHJ for SSH authentication by default (previously JSCH). GitHub has tightened up their SSH key requirements and now requires SSH-RSA 2 keys. The new default for ssh-keygen via OpenSSH is not supported by JSCH.
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
* Michael Catanese ([mcat115](https://github.com/mcat115))
