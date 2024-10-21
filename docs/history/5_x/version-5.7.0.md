---

title: "5.7.0 Release Notes"
date: 2024-10-21
image: /images/chevron-logo-red-on-white.png
feed:
 enable: true
 description: "Security and Bug Fixes"

---

# 5.7.0 Release Notes

Name: <span style="color: yellowgreen"><span class="glyphicon glyphicon-gift"></span> "Foraker yellowgreen gift"</span>
Release Date: October 21, 2024

- Download the Releases: [Open Source](https://www.rundeck.com/community-downloads/5.7.0) | [Self-Hosted](https://www.rundeck.com/enterprise-downloads/5.7.0)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/index.md)
- [Catch us on Twitch for the Live Stream Release Video](https://www.twitch.tv/pagerduty)

## Overview

Check out the new features and enhancements for PagerDuty Runbook Automation commercial offerings and Rundeck Community included in this release.

### Highlights

- first highlight
- second highlight

## Runbook Automation Updates

> Also includes all Open Source updates from below

### Additional Updates


* Updates EC2 plugin for CVE-2020-13956
* Promote Project Runner Management to Generally Available
* Upgrade http-notification version to 1.0.9
* bouncycastle update, address CVE-2020-15522
* Resolve CVE-2022-24329
* Resolve CVE-2021-28168 
* Include more details in PD GetIncident plugin output


## Rundeck Open Source Product Updates

* [Fix: Scheduled jobs stop running on schedule after edits.](https://github.com/rundeck/rundeck/pull/9390)
* [Add fallback behaviour for localization, so that missing translations fallback to English](https://github.com/rundeck/rundeck/pull/9387)
* [Fix: Excessive logs when Rundeck loses connection to Database](https://github.com/rundeck/rundeck/pull/9382)
* [Update to bouncycastle 1.78.1, address CVE-2020-15522](https://github.com/rundeck/rundeck/pull/9378)
* [Update `object-store-plugin` dependencies to resolve CVE-2021-0341](https://github.com/rundeck/rundeck/pull/9376)
* [Provider to add cache control headers to http responses](https://github.com/rundeck/rundeck/pull/9374)
* [Adjust navbar logic, addressing the missing submenu items in the tab &quot;more items&quot;](https://github.com/rundeck/rundeck/pull/9364)
* [Fix: exitCode from script steps is not correct in context variable data](https://github.com/rundeck/rundeck/pull/9240)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A5.7.0+is%3Aclosed)

## Ansible Plugin Updates
* [Support windows authentication](https://github.com/rundeck-plugins/ansible-plugin/pull/394)


## Community Contributors

Submit your own Pull Requests to get recognition here!

* Bruno Dias ([brmdias](https://github.com/brmdias))
*  ([pdt-taz](https://github.com/pdt-taz))
* Aisling Kells ([Sway23](https://github.com/Sway23))

## Staff Contributors

* Greg Schueler ([gschueler](https://github.com/gschueler))
* Alberto Hormazabal Cespedes ([ahormazabal](https://github.com/ahormazabal))
* Alexander Abarca ([alexander-variacode](https://github.com/alexander-variacode))
* Alexander Grachtchouk ([mrdubr](https://github.com/mrdubr))
* Antony Velasquez Ruiz ([avelasquezr](https://github.com/avelasquezr))
* Carlos Eduardo ([carlosrfranco](https://github.com/carlosrfranco))
* Christopher McCarroll-Gilbert ([chrismcg14](https://github.com/chrismcg14))
* Charlie Crawford ([ChuckCrawford](https://github.com/ChuckCrawford))
* Darwis Narvaez ([DarwisNarvaezDev](https://github.com/DarwisNarvaezDev))
* Forrest Evans ([fdevans](https://github.com/fdevans))
* Imad Jafir ([imad6639](https://github.com/imad6639))
* Jake Cohen ([jsboak](https://github.com/jsboak))
* Jason Brooks ([jbrookspd](https://github.com/jbrookspd))
* Jesus Osuna ([Jesus-Osuna-M](https://github.com/Jesus-Osuna-M))
* Leonel Juarez ([L2JE](https://github.com/L2JE))
* Luis Toledo ([ltamaster](https://github.com/ltamaster))
* Oscar Cerda ([ocerda](https://github.com/ocerda))
* Rodrigo Navarro ([ronaveva](https://github.com/ronaveva))
* Sarah Martinelli Benedetti ([smartinellibenedetti](https://github.com/smartinellibenedetti))
* Stephen Joyner ([sjrd218](https://github.com/sjrd218))
