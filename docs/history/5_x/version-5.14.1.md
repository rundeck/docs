---

title: "5.14.1 Release Notes"
date: 2025-08-18
image: /images/chevron-logo-red-on-white.png
description: "Rundeck | Runbook Automation Releases 5.14.1 - Node Filter Fixes"
feed:
 enable: true
 description: "Critical Bug Fix - Node List on Reference Jobs not Maintained"

---

# 5.14.1 Release Notes

## Overview

This is a critical bug fix release that addresses the following issue:

Node filter overrides in job reference steps would disappear from the GUI when editing parent jobs, with the filter field appearing empty even though filters were previously saved. Simply opening and saving a parent job (without any modifications) would clear all node filter overrides, causing child jobs to execute on all nodes instead of the intended filtered subset. This issue could lead to unintended job execution on incorrect nodes, potentially affecting production environments and job orchestration workflows.

In this version node filter overrides are properly preserved and displayed when editing parent jobs, eliminating the need for manual re-entry and preventing unintended execution scope changes.

## Rundeck Product Updates

* [Fix node filter input not updating value correctly on reference jobs](https://github.com/rundeck/rundeck/pull/9757)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A5.14.1+is%3Aclosed)


## Links

- Download the Releases: [Open Source](https://www.rundeck.com/community-downloads/5.14.1) | [Self-Hosted](https://www.rundeck.com/enterprise-downloads/5.14.1)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/index.md)

## Version Info

Name: <span style="color: yellowgreen"><span class="glyphicon glyphicon-phone"></span> "Logan yellowgreen phone"</span>

Release Date: August 18th, 2025

## Staff Contributors

* Greg Schueler ([gschueler](https://github.com/gschueler))
* Carlos Eduardo ([carlosrfranco](https://github.com/carlosrfranco))
* Eduardo Baltra ([edbaltra](https://github.com/edbaltra))
* Forrest Evans ([fdevans](https://github.com/fdevans))
* Jake Cohen ([jsboak](https://github.com/jsboak))
* Jaya Singh ([jayas006](https://github.com/jayas006))
* Jason Brooks ([jbrookspd](https://github.com/jbrookspd))
* Jesus Osuna ([Jesus-Osuna-M](https://github.com/Jesus-Osuna-M))
* José Vásquez ([hiawvp](https://github.com/hiawvp))
* Luis Toledo ([ltamaster](https://github.com/ltamaster))
* Rodrigo Navarro ([ronaveva](https://github.com/ronaveva))
* Sarah Martinelli Benedetti ([smartinellibenedetti](https://github.com/smartinellibenedetti))