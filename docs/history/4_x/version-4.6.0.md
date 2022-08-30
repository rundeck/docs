# Release 4.6.0

Name: <span style="color: salmon"><span class="glyphicon glyphicon-bullhorn"></span> "Ogre salmon bullhorn"</span>
Release Date: PUTADATEHERE

- [Download the Releases](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/)

## Overview

Check out the new features and enhancements for PagerDuty Process Automation (formerly Rundeck Enterprise) and PagerDuty Runbook Automation and Rundeck Community included in this release.

## Process Automation Updates

> Also includes all Open Source updates from below

* Update runner version to 0.1.30
* Changed max chars allowed on job params field from 255 to 750
* Fix: Chrome Debug console Errors
* ECS Node Source enhancements
* Fix: Usability issues with SQL Runner
* AWS Athena query Job Steps
* New API rate-limit algorithms to throttle abnormal client requests


## Rundeck Open Source Product Updates

* [Bump version to 4.6.0](https://github.com/rundeck/rundeck/pull/7883)
* [The activity page doesn&#39;t work with running jobs / Auto-refresh doesn&#39;t work](https://github.com/rundeck/rundeck/pull/7882)
* [Add a new rendering option to support the token script expansion in plugins](https://github.com/rundeck/rundeck/pull/7877)
* [Fix : Remote options simple json sort](https://github.com/rundeck/rundeck/pull/7872)
* [Fix : Upgrade Ansible to 3.2.2 (winrm non-admin fix)](https://github.com/rundeck/rundeck/pull/7863)
* [Fix: Stop UI AJAX calls when a user is not logged in](https://github.com/rundeck/rundeck/pull/7861)
* [Fix : job-remote-option-url-retry-connection-parameter-not-honored](https://github.com/rundeck/rundeck/pull/7856)
* [Fix: Enabling/Disabling both Scheduling and Executions at the same time using timer mode](https://github.com/rundeck/rundeck/pull/7842)
* [Fix : Upgrade to Liquibase 4.8.0](https://github.com/rundeck/rundeck/pull/7831)
* [Fix : Sub Menu Position and Adjust Spacing, Font Size](https://github.com/rundeck/rundeck/pull/7830)
* [Fix: Improve query to get referenced executions](https://github.com/rundeck/rundeck/pull/7827)
* [Add audit tracking for jobs and acls](https://github.com/rundeck/rundeck/pull/7826)
* [Fix : Update okhttp to 4.9.2](https://github.com/rundeck/rundeck/pull/7825)
* [Fix : Allow job editing when SCM fails due to Key Storage path errors](https://github.com/rundeck/rundeck/pull/7786)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A4.6.0+is%3Aclosed)

## Ansible Plugin Updates
* [Fix: Ansible plugin using a non-admin user on winrm](https://github.com/rundeck-plugins/ansible-plugin/pull/324)


## Community Contributors

* Alberto Hormazabal ([ahormazabal](https://github.com/ahormazabal))
* Darwis Narvaez ([DarwisNarvaezDev](https://github.com/DarwisNarvaezDev))
* Luis Toledo ([ltamaster](https://github.com/ltamaster))
* Rodrigo Navarro ([ronaveva](https://github.com/ronaveva))
* Leonel Juarez ([L2JE](https://github.com/L2JE))
* Jesus Osuna ([Jesus-Osuna-M](https://github.com/Jesus-Osuna-M))
* Miguel Ramos ([mishingo](https://github.com/mishingo))
* Antony Velasquez Ruiz ([avelasquezr](https://github.com/avelasquezr))
* Alexander Abarca ([alexander-variacode](https://github.com/alexander-variacode))
* Michael Catanese ([mcat115](https://github.com/mcat115))
* Eric He ([ehe-pd](https://github.com/ehe-pd))
* Jake Cohen ([jsboak](https://github.com/jsboak))
* Greg Schueler ([gschueler](https://github.com/gschueler))
*  ([AndLLA](https://github.com/AndLLA))
* Nathan Fluegel ([wayfaringson](https://github.com/wayfaringson))
* Reiner ([MegaDrive68k](https://github.com/MegaDrive68k))


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
