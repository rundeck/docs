---

title: "4.17.3 Release Notes"
date: 2021-11-13
image: /images/chevron-logo-red-on-white.png
feed:
 enable: true
 description: "Bug Fixes for Process Automation/Rundeck"

---

# 4.17.3 Release Notes

Name: <span style="color: violet"><span class="glyphicon glyphicon-glass"></span> "Basilisk violet glass"</span>
Release Date: November 13, 2023

- [Download the Releases](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/)

## Overview

This release addresses [CVE-2023-47112](/history/cves/cve-2023-47112.md) where specified job information endpoints were not properly authenticated.  Pleasae refer to [CVE-2023-47112](/history/cves/cve-2023-47112.md) for details.

Also includes other fixes for PagerDuty Process Automation (formerly Rundeck Enterprise), PagerDuty Runbook Automation and Rundeck Community included in this release.

## Process Automation Updates

* Fix: Error with authentication using assume-role if using EC2/ECS credential provider
* Fix: ERROR 500 When creating ACL on Rundeck 4.16 + Postgres/Oracle

> Also includes all Open Source updates from below

## Rundeck Open Source Product Updates

* [Fix: CVE-2023-47112 - Job information endpoints not properly authorized](https://github.com/rundeck/rundeck/pull/8668)
* [Fix runtimeException Error on Script Resource Model](https://github.com/rundeck/rundeck/pull/8658)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A4.17.3+is%3Aclosed)

## Enterprise Runner Updates

**Bundled Runner Version:** 0.1.53

## Community Contributors

Submit your own Pull Requests to get recognition here!

*  ([rmeloamaro](https://github.com/rmeloamaro))
* Jai Govindani ([jai](https://github.com/jai))
* Bruno Dias ([brmdias](https://github.com/brmdias))


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
