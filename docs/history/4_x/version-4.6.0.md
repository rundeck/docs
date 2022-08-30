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

### Highlights

- first highlight
- second highlight

### Additional Updates


* Update runner version to 0.1.30
* Loop Script Plugins - Fixups
* Changed max chars allowed on job params field from 255 to 750
* Fix: Chrome Debug console Errors
* Enhanced plugin: ECS Node Source
* Fix: Usability issues with SQL Runner
* New plugin: AWS Athena Query Job Steps
* New API rate-limit algorithms to throttle abnormal client requests


## Rundeck Open Source Product Updates

* [Fix : Enable autocomplete for the token script expansion in plugins](https://github.com/rundeck/rundeck/pull/7877)
* [Fix : Allow JSON &quot;Simple List&quot; format parsing from a job option remote URL](https://github.com/rundeck/rundeck/pull/7872)
* [Fix : Non-admin user unable to get data on windows nodes through WinRM and Ansible (Upgrade Ansible to 3.2.2)](https://github.com/rundeck/rundeck/pull/7863)
* [Fix: Stop UI AJAX calls when a user is not logged in](https://github.com/rundeck/rundeck/pull/7861)
* [Fix : Job Remote Option URL &quot;retry&quot; connection parameter is not honored](https://github.com/rundeck/rundeck/pull/7856)
* [Fix: Enabling/Disabling both Scheduling and Executions at the same time using timer mode](https://github.com/rundeck/rundeck/pull/7842)
* [Fix : Update for CVE-2022-0839 (Upgrade to Liquibase 4.8.0)](https://github.com/rundeck/rundeck/pull/7831)
* [Fix: Improve query to get referenced executions](https://github.com/rundeck/rundeck/pull/7827)
* [Add audit tracking for jobs and acls](https://github.com/rundeck/rundeck/pull/7826)
* [Fix : Update for CVE-2022-24329 (Upgrade to okhttp 4.9.2)](https://github.com/rundeck/rundeck/pull/7825)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A4.6.0+is%3Aclosed)

## Ansible Plugin Updates
* [Fix: Ansible plugin using a non-admin user on winrm](https://github.com/rundeck-plugins/ansible-plugin/pull/324)


## Community Contributors

* Luis Toledo ([ltamaster](https://github.com/ltamaster))
* Rodrigo Navarro ([ronaveva](https://github.com/ronaveva))
* Leonel Juarez ([L2JE](https://github.com/L2JE))
* Darwis Narvaez ([DarwisNarvaezDev](https://github.com/DarwisNarvaezDev))
* Jesus Osuna ([Jesus-Osuna-M](https://github.com/Jesus-Osuna-M))
* Alberto Hormazabal ([ahormazabal](https://github.com/ahormazabal))
* Alexander Abarca ([alexander-variacode](https://github.com/alexander-variacode))
* Michael Catanese ([mcat115](https://github.com/mcat115))
* Eric He ([ehe-pd](https://github.com/ehe-pd))
* Jake Cohen ([jsboak](https://github.com/jsboak))
* Greg Schueler ([gschueler](https://github.com/gschueler))
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
