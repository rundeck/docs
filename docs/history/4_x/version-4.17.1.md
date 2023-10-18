---

title: "4.17.1 Release Notes"
date: 2023-10-16
image: /images/chevron-logo-red-on-white.png
feed:
 description: "Bug fix release with improvements to Enterprise Runner"

---

# 4.17.1 Release Notes

Name: <span style="color: slategray"><span class="glyphicon glyphicon-flash"></span> "Basilisk slategray flash"</span>
Release Date: October 16, 2023

- [Download the Releases](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/)
- [Watch the Live Stream Release Recap](https://www.youtube.com/watch?v=OiS2a962pAE)

<YouTube id="OiS2a962pAE"/>

## Overview

Check out the new features and enhancements for PagerDuty Process Automation (formerly Rundeck Enterprise) and PagerDuty Runbook Automation and Rundeck Community included in this release.

## Process Automation Updates

> Also includes all Open Source updates from below

### Highlights

 This is a smaller point release of our 4.17.0 version that fixes some urgent bugs and a CVE that came up on our scans.

### Additional Updates

* Upgrade Jetty due CVE-2023-36478
* Fix: System calendar not appearing
* Fix: Issue with job reference using group/name with Runners
* Fix: Schedules Not Paginated
* Update: Default unix node executor/file copier in Node Wizard to SSHJ
* Fix: ECS Stop Task Plugin uses correct stop code now

## Rundeck Open Source Product Updates

* [Upgrade Jetty due CVE-2023-36478](https://github.com/rundeck/rundeck/pull/8614)
* [Manual backport](https://github.com/rundeck/rundeck/pull/8596)
* [Fix log viewer progress bar](https://github.com/rundeck/rundeck/pull/8589)
* [Disable resource model runner selector for only local plugins](https://github.com/rundeck/rundeck/pull/8560)

[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A4.17.1+is%3Aclosed)

## Enterprise Runner Updates

**Bundled Runner Version:** 0.1.52

## Community Contributors

Submit your own Pull Requests to get recognition here!
* Lucas Canavosio ([lcanavosio](https://github.com/lcanavosio))
* Reiner ([MegaDrive68k](https://github.com/MegaDrive68k))
* Matthew Evans ([x86txt](https://github.com/x86txt))
* Jeremy Olexa ([jolexa](https://github.com/jolexa))
* Programster ([programster](https://github.com/programster))


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
* Sarah Martinelli Benedetti ([smartinellibenedetti](https://github.com/smartinellibenedetti))
* Stephen Joyner ([sjrd218](https://github.com/sjrd218))
