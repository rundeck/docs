---

title: "4.11.0 Release Notes"
date: "2023-03-08"
image: /images/chevron-logo-red-on-white.png
feed:
 enable: true
 description: "Version 4.11.0 is here. More Plugin Suites and JSON Job Exports.  Check Release Notes for more info."

---

# 4.11.0 Release Notes

Name: <span style="color: coral"><span class="glyphicon glyphicon-briefcase"></span> "Satyr coral briefcase"</span>
Release Date: March 8th, 2023

- [Download the Releases](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/)

## Overview

Check out the new features and enhancements for PagerDuty Process Automation (formerly Rundeck Enterprise) and PagerDuty Runbook Automation and Rundeck Community included in this release.

## Process Automation Updates

> Also includes all Open Source updates from below

### Highlights


### Additional Updates


* Upgrade commons-fileupload to address CVE-2023-24998
* Status Symbol is not required on Progress Badge.  Fixes issues with migration from previous versions.
* Bundel Kubernetes and Docker plugins into Enterprise Build
* Fix: Improve Error Output for Update Escalation PD Step
*  EC2 Health Check now included in AWS Plugin Group
* Add ServiceNow Plugin Suite
* Fix: Cyberark Keys to Key Provider Path
* Add Jira Plugin Suite
* Add Note to ServiceNow workflow/notification plugin steps
* Fix: Autotakeover not working when restarting with new uuids


## Rundeck Open Source Product Updates

* [upgrade sshj-plugin to 0.1.6](https://github.com/rundeck/rundeck/pull/8172)
* [AD paged results default](https://github.com/rundeck/rundeck/pull/8168)
* [Fix: Webhooks not showing proper information After Create](https://github.com/rundeck/rundeck/pull/8167)
* [Fix: ExecutionLifecycle component is not loaded when a job is imported](https://github.com/rundeck/rundeck/pull/8165)
* [Upgrade commons-fileupload to address CVE-2023-24998](https://github.com/rundeck/rundeck/pull/8161)
* [Add a defaultEnabled flag in feature service](https://github.com/rundeck/rundeck/pull/8158)
* [Establish new section in execution head page for feature use.](https://github.com/rundeck/rundeck/pull/8157)
* [No Message On GUI For Scheduled Job On Unhealthy Runner](https://github.com/rundeck/rundeck/pull/8152)
* [Change FeatureService to use an interface instead of the Features enum](https://github.com/rundeck/rundeck/pull/8150)
* [: Allow Roles pagination when using Active Directory](https://github.com/rundeck/rundeck/pull/8144)
* [Fix error handling on job component failure](https://github.com/rundeck/rundeck/pull/8141)
* [Update chromedriver to 109](https://github.com/rundeck/rundeck/pull/8137)
* [Update error message for runner not found](https://github.com/rundeck/rundeck/pull/8136)
* [Consolidate UI Build using UI-Trellis](https://github.com/rundeck/rundeck/pull/8053)
* [Add Job Export in JSON format](https://github.com/rundeck/rundeck/pull/8040)
* [Cleanup: Remove unnecessary OpenAPI flags](https://github.com/rundeck/rundeck/pull/8029)
* [Allow hot reload of SSO settings](https://github.com/rundeck/rundeck/pull/7997)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A4.11.0+is%3Aclosed)

## Community Contributors

* David Darby ([ddarby-hike](https://github.com/ddarby-hike))
* David Garces ([jgarces-pd](https://github.com/jgarces-pd))
* Oswaldo Peralta ([runwaldo](https://github.com/runwaldo))


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
* Miguel Ramos ([mishingo](https://github.com/mishingo))
* Osman Albarran ([Oalbarran94](https://github.com/Oalbarran94))
* Rodrigo Navarro ([ronaveva](https://github.com/ronaveva))
* Stephen Joyner ([sjrd218](https://github.com/sjrd218))
