---

title: "5.0.1 Release Notes"
date: 2024-01-15
image: /images/chevron-logo-red-on-white.png
feed:
 enable: true
 description: "Important Fixes | New Signing Key"

---

# 5.0.1 Release Notes

Name: <span style="color: coral"><span class="glyphicon glyphicon-bell"></span> "Denali coral bell"</span>
Release Date: January 15th, 2024

- Download the Release: [Open Source](https://www.rundeck.com/community-downloads/5.0.1) | [Self-Hosted](https://www.rundeck.com/enterprise-downloads/5.0.1)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/)

::: danger Please use version 5.0.2
We have found some issues with Log Filters and passing data to the Enterprise Runner.  Please use the [5.0.2 Release](version-5.0.2.md) when upgrading.
:::

::: warning Upgrade Steps
Be sure to follow the [Upgrade instructions](/upgrading/) when moving to version 5.0 or higher.  There are new minimum Java versions and other important information.
:::


## Overview

Check out the new features and enhancements for PagerDuty Runbook Automation and Rundeck Community included in this release.

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
