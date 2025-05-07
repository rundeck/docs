---

title: "5.12.0 Release Notes"
date: 2025-05-07
image: /images/chevron-logo-red-on-white.png
description: "Rundeck | Runbook Automation Releases 5.12.0 - HTTP Response Range Checks and security updates."
feed:
 enable: true
 description: "HTTP Response Range Checks and security updates."

---

# 5.12.0 Release Notes

## Overview

## Improved HTTP Response Validation in the HTTP Request Plugin

The HTTP Request step plugin just got smarter! We've streamlined the configuration by removing the "Check Response?" checkbox and introduced powerful new logic for validating HTTP response codes. You can now define exact codes (e.g. 200), ranges (e.g. 200–206), wildcard groups (e.g. 2xx), or even combinations like 200,2xx,404-406. This gives you greater flexibility to define what a successful response looks like in your automation workflows. If no response codes are specified, the default behavior remains to fail on any response >= 400. This enhancement makes it easier than ever to create resilient, production-grade Jobs.

## Runbook Automation Updates

> Also includes all Open Source updates from below

### Additional Updates


* Add jira issue key to data context in Jira Create Issue plugin, fix logging typo


## Rundeck Open Source Product Updates

* [Update Jackson to v2.17.3](https://github.com/rundeck/rundeck/pull/9635)
* [Upgrade json-smart version to fix CVE-2024-57699](https://github.com/rundeck/rundeck/pull/9630)
* [Rundeck RPM package still requiring Java 11 even if Java 17 is installed](https://github.com/rundeck/rundeck/pull/9624)
* [Fix: option remote json using jsonpath should allow array result](https://github.com/rundeck/rundeck/pull/9614)
* [Convert error handlers logic to Vue](https://github.com/rundeck/rundeck/pull/9610)
* [Add method to delete api tokens by user](https://github.com/rundeck/rundeck/pull/9605)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A5.12.0+is%3Aclosed)

## Links

- Download the Releases: [Open Source](https://www.rundeck.com/community-downloads/5.12.0) | [Self-Hosted](https://www.rundeck.com/enterprise-downloads/5.12.0)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/index.md)
- [Catch us on LinkedIn for the Live Stream Release Videos](https://www.linkedin.com/company/pagerduty/events)

## Version Info

Name: <span style="color: orange"><span class="glyphicon glyphicon-flash"></span> "Kinabalu orange flash"</span>

Release Date: May 7th, 2025


## Community Contributors

Submit your own Pull Requests to get recognition here!


## Staff Contributors

* Greg Schueler ([gschueler](https://github.com/gschueler))
* Alexander Abarca ([alexander-variacode](https://github.com/alexander-variacode))
* Alexander Grachtchouk ([mrdubr](https://github.com/mrdubr))
* Carlos Eduardo ([carlosrfranco](https://github.com/carlosrfranco))
* Christopher McCarroll-Gilbert ([chrismcg14](https://github.com/chrismcg14))
* Charlie Crawford ([ChuckCrawford](https://github.com/ChuckCrawford))
* Forrest Evans ([fdevans](https://github.com/fdevans))
* Jake Cohen ([jsboak](https://github.com/jsboak))
* Jason Brooks ([jbrookspd](https://github.com/jbrookspd))
* Jesus Osuna ([Jesus-Osuna-M](https://github.com/Jesus-Osuna-M))
* José Vásquez ([hiawvp](https://github.com/hiawvp))
* Luis Toledo ([ltamaster](https://github.com/ltamaster))
* Rodrigo Navarro ([ronaveva](https://github.com/ronaveva))
* Sarah Martinelli Benedetti ([smartinellibenedetti](https://github.com/smartinellibenedetti))