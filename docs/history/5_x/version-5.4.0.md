---

title: "5.4.0 Release Notes"
date: 2024-06-18
image: /images/chevron-logo-red-on-white.png
feed:
 enable: true
 description: "Cyberark Integration can now use REST, Security Fixes"

---

# 5.4.0 Release Notes

Name: <span style="color: deeppink"><span class="glyphicon glyphicon-piggy-bank"></span> "Everest deeppink piggy-bank"</span>
Release Date: June 18, 2024

- Download the Release: [Open Source](https://www.rundeck.com/community-downloads/5.4.0) | [Self-Hosted](https://www.rundeck.com/enterprise-downloads/5.4.0)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/index.md)
- [Watch the Live Stream Release Recap](https://www.youtube.com/live/VqAAjBK0I5E?si=25hA6mmqyRSXh1yP)

<VidStack src="youtube/VqAAjBK0I5E"/>

## Overview

:::warning
If you have updated from a Rundeck version of 4.16.0 or earlier to version 5.4.0 there is a UI bug that prevents the display of certain execution records.  This issue is fixed with version 5.5.0 and there is no impact to the underlying data.  [Please see Release Notes for 5.5.0 here](version-5.5.0.md).
:::

Check out the new features and enhancements for PagerDuty Runbook Automation and Rundeck Community edition included in this release.

### Highlights

#### Reminder: Project Runner Management Early Access

With 5.3.0 we announced Early Access to [project-based Runner management](/history/5_x/version-5.3.0.md#project-runner-management-early-access). If you are interested in testing out the feature and providing us feedback, fill out our [Early Access form](https://www.pagerduty.com/early-access/) and we will reach out promptly.

#### CyberArk Integration Enhancements

Customers integrate Runbook Automation with secrets management providers - such as CyberArk - as a means to secure and standardize how keys and passwords are utilized within automation across their organization.  
![Cyberark REST Config](/assets/img/relnotes-540-cyberark.png)<br>
This latest release now allows users to integrate with CyberArk through a more secure method, where the CyberArk API credentials no longer need to be stored in Runbook Automation.  This allows users to follow CyberArk’s best-practices for configuring integrations.  

In addition, users can now configure separate endpoints for the Credential Provider and the API web-server in Runbook Automation – allowing for easier integration with various CyberArk deployment configurations.

## Process Automation Updates

> Also includes all Open Source updates from below

### Additional Updates


* Updated awssdk library to mitigate CVE-2024-29025
* CyberArk plugin enhancements 


## Rundeck Open Source Product Updates

* [When posting to a disabled webhook return a 404](https://github.com/rundeck/rundeck/pull/9179)
* [Change on forecast api to fetch future executions for &quot;run job later&quot;](https://github.com/rundeck/rundeck/pull/9169)
* [Fix: Main docs link goes to 404](https://github.com/rundeck/rundeck/pull/9167)
* [Restores Tomcat JDBC pool.](https://github.com/rundeck/rundeck/pull/9162)
* [Add runner permissions to admin.aclpolicy template](https://github.com/rundeck/rundeck/pull/9149)
* [update API, update tests and bump API version](https://github.com/rundeck/rundeck/pull/9143)
* [Enables building arm64 Docker images locally](https://github.com/rundeck/rundeck/pull/9141)
* [relabel property](https://github.com/rundeck/rundeck/pull/9136)
* [Login as local user doesn&#39;t evaluate case sensitive feature](https://github.com/rundeck/rundeck/pull/9123)
* [nextUI: Converted forecast page](https://github.com/rundeck/rundeck/pull/9121)
* [Feature undeck.feature.caseInsensitiveUsername.enabled doesn&#39;t show on System configuration page](https://github.com/rundeck/rundeck/pull/9120)
* [fix: npe during cleanup incomplete executions](https://github.com/rundeck/rundeck/pull/9114)
* [Update webpack 4 to 5](https://github.com/rundeck/rundeck/pull/8968)
* [Fixes on Docker images directories and permissions](https://github.com/rundeck/rundeck/pull/8841)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A5.4.0+is%3Aclosed)

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
* Forrest Evans ([fdevans](https://github.com/fdevans))
* Imad Jafir ([imad6639](https://github.com/imad6639))
* Jake Cohen ([jsboak](https://github.com/jsboak))
* Jason Brooks ([jbrookspd](https://github.com/jbrookspd))
* Jesus Osuna ([Jesus-Osuna-M](https://github.com/Jesus-Osuna-M))
* Leonel Juarez ([L2JE](https://github.com/L2JE))
* Luis Toledo ([ltamaster](https://github.com/ltamaster))
* Osman Albarran ([Oalbarran94](https://github.com/Oalbarran94))
* Rodrigo Navarro ([ronaveva](https://github.com/ronaveva))
* Sarah Martinelli Benedetti ([smartinellibenedetti](https://github.com/smartinellibenedetti))
* Stephen Joyner ([sjrd218](https://github.com/sjrd218))
