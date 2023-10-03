---

title: "4.9.0 Release Notes"
date: 2023-01-11
image: /images/chevron-logo-red-on-white.png
feed:
 enable: true
 description: "Version 4.9.0 is here!  Check out the new configuration method for Plugins Suites and be on the look out for major updates to the Runner functionality in a future version."

---

# 4.9.0 Release Notes

Name: <span style="color: peru"><span class="glyphicon glyphicon-phone"></span> "Quintaped peru phone"</span>
Release Date: January 11, 2023

- [Download the Releases](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/)
- [Watch the Live Stream Release Recap](https://www.youtube.com/watch?v=VIdp90P5zFk&ab_channel=PagerDutyInc)

## Overview

Check out the new features and enhancements for PagerDuty Process Automation, PagerDuty Runbook Automation, and Rundeck Community included in this release. This release introduces the beta for Plugin Suite Configuration, which simplifies the configuration of plugins.

View our Twitch stream review of this release live on January 17 at 10AM Pacific. [Here’s the event link](https://www.twitch.tv/pagerduty/schedule).

### Highlights

- **Plugin Suite Configuration**: We’ve simplified the configuration of plugins so users can build more automation faster. PagerDuty Runbook Automation and Process Automation now provide an easier interface for users to define plugin properties and reduce the number of times a user needs to define common properties across plugins. Now users have a graphical interface for configuring plugin properties at the project and system level using predefined sets of properties on a per plugin suite basis. In version 4.9.0, users can access our first predefined plugin-suite setting for the PagerDuty plugin suite and future releases will include Plugin Groups for our other plugin suites - such as Jira, ServiceNow, and AWS.<br>
Click [here](/manual/plugins) to read the full documentation.

![PD Plugin Config](/assets/img/relnotes-4.9-pd-config.png)

- This release also includes a number of backend enhancements that will lend themselves to major releases in the coming months.  Stay tuned for announcements regarding major updates to our [Runner](/administration/runner/).

:::warning
Version 4.9.0 utilizes new signing keys for our binary packages.  If your installation process includes validation of the packages using the public key please ensure you are using the new keys documented on the [Download Site](https://download.rundeck.com/)
:::

### Additional Updates

* Fix: Hashicorp Vault Issue - Cannot navigate through key storage when using approles
* Fix: Issue with Healthcheck setting values to `unknown` when cache is cleaned
* Add 30 Day User Count to System Report
* Upgrade to jQuery 3.6.1

## Rundeck Open Source Product Updates

* [Fix: Job activity tab not loading](https://github.com/rundeck/rundeck/pull/8073)
* [Package Upgrades for CVE-2022-41881](https://github.com/rundeck/rundeck/pull/8071)
* [Fix: Project Picker not loading when Projects with special characters exist](https://github.com/rundeck/rundeck/pull/8064)
* [Fix: Error choosing runner on execution runtime](https://github.com/rundeck/rundeck/pull/8063)
* [Fix: Duplicated fields on Notification settings modal](https://github.com/rundeck/rundeck/pull/8061)
* [Upgrade SSHJ Plugin version which includes enchancements and fixes](https://github.com/rundeck/rundeck/pull/8056)
* [Add secrets support for script based plugins](https://github.com/rundeck/rundeck/pull/8050)
* [Fix Missing Execution Clean History Form Display](https://github.com/rundeck/rundeck/pull/8044)
* [Job Runner Run page GUI ](https://github.com/rundeck/rundeck/pull/8041)
* [Updates to address CVE-2022-31690, CVE-2022-22978, CVE-2022-31692](https://github.com/rundeck/rundeck/pull/8039)
* [Fix:Ruleset Plugin fails to evaluate conditions if negative number are used](https://github.com/rundeck/rundeck/pull/8031)
* [Overflow Scrollbars on Login Page Removal](https://github.com/rundeck/rundeck/pull/8028)
* [Fix: Dynamic max nodes shown in rundeck GUI](https://github.com/rundeck/rundeck/pull/8026)
* [Fix: Key-Value data log filter unable to capture empty values](https://github.com/rundeck/rundeck/pull/8024)
* [Fix: Invalid property name causing errors when changing project settings](https://github.com/rundeck/rundeck/pull/8022)
* [Refactor Project to Pass through Data Provider](https://github.com/rundeck/rundeck/pull/8017)
* [Fix: Incorrect 404 page response for job edit/update page](https://github.com/rundeck/rundeck/pull/8011)
* [Enabled feature  query API endpoint](https://github.com/rundeck/rundeck/pull/8010)
* [Upgrade Moment to 2.29.4](https://github.com/rundeck/rundeck/pull/7999)
* [Upgrade to jQuery 3.6.1 ](https://github.com/rundeck/rundeck/pull/7992)
* [Job Lifecycle Components](https://github.com/rundeck/rundeck/pull/7984)
* [Runner Node Executor enhancement ](https://github.com/rundeck/rundeck/pull/7943)
* [Update French Translation Typo](https://github.com/rundeck/rundeck/pull/7917)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A4.9.0+is%3Aclosed)

## Ansible Plugin Updates


## Community Contributors

* Patrice Duroux ([peutch](https://github.com/peutch))
* Sota Kato ([tokagerous](https://github.com/tokagerous))


## Staff Contributors

* Greg Schueler ([gschueler](https://github.com/gschueler))
* Alberto Hormazabal Cespedes ([ahormazabal](https://github.com/ahormazabal))
* Alexander Abarca ([alexander-variacode](https://github.com/alexander-variacode))
* Antony Velasquez Ruiz ([avelasquezr](https://github.com/avelasquezr))
* Carlos Eduardo ([carlosrfranco](https://github.com/carlosrfranco))
* Christopher McCarroll-Gilbert ([chrismcg14](https://github.com/chrismcg14))
* Daniel Da Silva ([dldrk](https://github.com/dldrk))
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
* Nathan Fluegel ([wayfaringson](https://github.com/wayfaringson)
* Néstor Fuenzalida ([nestorfm](https://github.com/nestorfm))
* Osman Albarran ([Oalbarran94](https://github.com/Oalbarran94))
* Rodrigo Navarro ([ronaveva](https://github.com/ronaveva))
* Stephen Joyner ([sjrd218](https://github.com/sjrd218))
