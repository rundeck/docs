---
title: "4.14.0 Release Notes"
date: 2023-06-15
image: /images/chevron-logo-red-on-white.png
feed:
  description: "Plugins and Ad-Hoc Commands on the Enterprise Runner, plus more Plugin enhancements."
---
# 4.14.0 Release Notes

Name: <span style="color: red"><span class="glyphicon glyphicon-headphones"></span> "Wyvern red headphones"</span>

Release Date: June 15th, 2023

- [Download the Releases](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/index.md)

## Overview

Check out the new features and enhancements for PagerDuty Runbook Automation, and Rundeck Community included in this release.This release includes new enhancements to the user experience, bug fixes around CyberArk, and new versioning for Twistlock security.
View our [Twitch stream review](https://www.twitch.tv/pdcommunity) of this release live.

## Highlights

* Enhanced user experience for managing large projects. Previously, when removing existing projects from the system, users would have to wait for the delete operation to complete.  For large projects – such as those with 100,00 executions – this could take upwards of 25 minutes or more. Now, when users delete a project, the operation takes place in the background, eliminating user wait times for the delete operation to complete.
* Major bug fixes for CyberArk. Two major fixes were implemented that make the Key Storage integration with CyberArk more reliable for the user.
* Improved security with additional vulnerability scanning coverage. 45 new CVEs have been addressed.

### Additional Enterprise Updates

* Fix: Cyberark key storage plugin exceptions on startup and null initialization
* Fix: ECS plugin updated
* Fix: SSO error causes "White label" error page  release-notes/include to-jira
* Update Azure plugin group name to be capitalized like other plugin groups
* Job Runner user-class allowed to read Nodes

## Rundeck Open Source Product Updates

* [Upgrade to spring boot 2.7.12](https://github.com/rundeck/rundeck/pull/8389)
* [Fix: references to ctxProject.](https://github.com/rundeck/rundeck/pull/8388)
* [Fix: notifications not triggering](https://github.com/rundeck/rundeck/pull/8383)
* [Fix: RSS feed generation not working](https://github.com/rundeck/rundeck/pull/8089)
* [Fix: Job Step plugin that uses ${config.*} variables within are no longer resolving](https://github.com/rundeck/rundeck/pull/8352)
* [Fix: Key Storage Making Call to List Keys Twice](https://github.com/rundeck/rundeck/pull/8346)
* [Fix: Import status not consistent in cluster after importing jobs through UI](https://github.com/rundeck/rundeck/pull/8382)
* [Fix: SCM Options in Job Menu Not Loading](https://github.com/rundeck/rundeck/pull/8366)
* [Fix: SCM General Disconnection Issues](https://github.com/rundeck/rundeck/pull/8300)
* [Fix: SCM import plugin does not refresh status in API unless GUI is refreshed](https://github.com/rundeck/rundeck/pull/8253)
* [Fix: Successful remote job import from API but getting error in SCM API response](https://github.com/rundeck/rundeck/pull/8285)
* [Upgrade ansible plugin to v3.2.5 and sshj plugin to 0.1.7](https://github.com/rundeck/rundeck/pull/8379)
* [AzureObjectStore update to exclude json-smart and upgrade nimbus-jose](https://github.com/rundeck/rundeck/pull/8371)
* [Improve UI performance with local assets support in UI plugins by using asset: prefix](https://github.com/rundeck/rundeck/pull/8370)
* [Update aws-s3-model-source plugin version 1.0.8](https://github.com/rundeck/rundeck/pull/8369)
* [Upgrade to spring-boot 2.7.11](https://github.com/rundeck/rundeck/pull/8364)
* [Upgrade libraries azure plugin libraries for azure 1.41.4 and azure-storage to 8.6.6](https://github.com/rundeck/rundeck/pull/8362)
* [Update Postgres driver version to 42.3.8](https://github.com/rundeck/rundeck/pull/8361)
* [Add additional DB index to improve performance](https://github.com/rundeck/rundeck/pull/8354)
* [Add database changeset preconditions](https://github.com/rundeck/rundeck/pull/8354)
* [Put webpack copied jquery autocomplete asset in the vendor folder.](https://github.com/rundeck/rundeck/pull/8328)
* [Minor improvements on spring security plugin config.](https://github.com/rundeck/rundeck/pull/8321)
* [Turn off storage rewrite by default](https://github.com/rundeck/rundeck/pull/8316)
* [Convert project node source edit page to Vue](https://github.com/rundeck/rundeck/pull/8308)
* [Java11 compatibility core](https://github.com/rundeck/rundeck/pull/8306)
* [Change user summary UI attach to use ui-socket](https://github.com/rundeck/rundeck/pull/8296)
* [Deferred project delete](https://github.com/rundeck/rundeck/pull/8265)
* [Add OpenAPI Spec annotations](https://github.com/rundeck/rundeck/pull/8196)
  
[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A4.14.0+is%3Aclosed)

## Community Contributors

Submit your own Pull Requests to get recognition here!

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
* Jesus Osuna ([Jesus-Osuna-M](https://github.com/Jesus-Osuna-M))
* Leonel Juarez ([L2JE](https://github.com/L2JE))
* Luis Toledo ([ltamaster](https://github.com/ltamaster))
* Osman Albarran ([Oalbarran94](https://github.com/Oalbarran94))
* Rodrigo Navarro ([ronaveva](https://github.com/ronaveva))
* Stephen Joyner ([sjrd218](https://github.com/sjrd218))
