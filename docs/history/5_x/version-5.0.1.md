---

title: "5.0.1 Release Notes"
date: 2024-01-09
image: /images/chevron-logo-red-on-white.png
feed:
 enable: true
 description: "Important Fixes | New Signing Key"

---

# 5.0.1 Release Notes

Name: <span style="color: coral"><span class="glyphicon glyphicon-bell"></span> "Denali coral bell"</span>
Release Date: January 9th, 2024

- [Download the Releases](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/)

## Overview

Check out the new features and enhancements for PagerDuty Process Automation (formerly Rundeck Enterprise) and PagerDuty Runbook Automation and Rundeck Community included in this release.

### Highlights

This release fixes some key issues found in the 5.0.0 release.  This release fixes the following issues:
- The JSON/JQ Log Filter was not properly capturing data into workflow variables.
- Certain data context variables were not being passed properly to the Enterprise Runner resulting in jobs failing to execute.

There is a **new signing key** to validate binaries starting with version 5.0.1.  The new key can be downloaded [here](https://docs.rundeck.com/keys/BUILD-GPG-KEY-20240108.key)

## Rundeck Open Source Product Updates

* [Update Jgit version for CVE-2023-4759](https://github.com/rundeck/rundeck/pull/8809)
* [fix: step labels unavailable for workflow strategy](https://github.com/rundeck/rundeck/pull/8797)
* [Fix replace token for command plugin](https://github.com/rundeck/rundeck/pull/8791)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A5.0.1+is%3Aclosed)

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
