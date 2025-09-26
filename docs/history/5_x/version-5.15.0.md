---

title: "5.15.0 Release Notes"
date: 2025-09-02
image: /images/chevron-logo-red-on-white.png
description: "Rundeck | Runbook Automation Releases 5.15.0 | Security Fixes and Community Updates"
feed:
 enable: true
 description: "Security focused improvements with some community submissions!"

---

# 5.15.0 Release Notes

<VidStack src="youtube/LLkpNPuQiKk" poster="https://img.youtube.com/vi/LLkpNPuQiKk/maxresdefault.jpg"/>

## Overview

We always appreciate Community submissions. As part of this release we have 6 contributors that provided enhancements alongside our dedicated staff team.

This release focuses heavily on security improvements and product modernization, addressing multiple CVE findings including CVE-2025-55163, CVE-2024-21538, CVE-2022-38749, and several others. Key security enhancements include forced re-authentication capabilities and comprehensive dependency updates.

Beyond security, this release includes important user experience improvements such as fixes for job loading in the Next UI, enhanced node filtering behavior, and finalized French translations. We've also made significant infrastructure improvements by removing legacy GSP pages that have been converted to Vue components and updating various plugins and dependencies.

## Runbook Automation Updates

> Also includes all Open Source updates from below

### Additional Updates


* Additional fixes to address CVE-2025-55163 findings
* Fix: Force cross-spawn patched versions to fix CVE-2024-21538
* Force Re-authentication regardless of activity status
* Fixes for CVE-2025-55163
* Finish CVE-2024-57699 mitigation
* Fix CVE-2022-38749 - Groovy 3.0.25
* Update snakeyaml to fix CVE-2022-38749
* CVE-2025-48734 Mitigation - Common Beans 1.11.0
* CVE-2024-25710 - High - Review/Resolve
* Update Quartz for CVE-2019-5427
* Upgrade WireMock to fix CVE-2024-8184
* CVE-2020-26939
* CVE-2024-47554


## Rundeck Open Source Product Updates

* [Fix jobs not loading in nextUI ](https://github.com/rundeck/rundeck/pull/9780)
* [Back previous behavior for node filtering combining two filters by clicking on it](https://github.com/rundeck/rundeck/pull/9775)
* [Finalize French translations](https://github.com/rundeck/rundeck/pull/9772)
* [Fix for CVE-2025-4949 - jgit](https://github.com/rundeck/rundeck/pull/9769)
* [Fix: Force cross-spawn patched versions to fix CVE-2024-21538](https://github.com/rundeck/rundeck/pull/9768)
* [Fix CVE-2022-38749](https://github.com/rundeck/rundeck/pull/9759)
* [Fix: repeated exceptions after SCM is disabled](https://github.com/rundeck/rundeck/pull/9756)
* [Child processes not being killed on Windows OS nodes](https://github.com/rundeck/rundeck/pull/9747)
* [Update Quartz for CVE-2019-5427](https://github.com/rundeck/rundeck/pull/9745)
* [Update openshh-node-execution plugin version](https://github.com/rundeck/rundeck/pull/9744)
* [update commons-compress version](https://github.com/rundeck/rundeck/pull/9743)
* [Additional Fixes for CVE-2025-48976](https://github.com/rundeck/rundeck/pull/9742)
* [Update execution metrics](https://github.com/rundeck/rundeck/pull/9741)
* [Cleanup: Remove old gsp pages that were converted to Vue](https://github.com/rundeck/rundeck/pull/9739)
* [cleanup: remove &#39;filterPref&#39; logic](https://github.com/rundeck/rundeck/pull/9738)
* [CVE-2024-47554](https://github.com/rundeck/rundeck/pull/9736)
* [Enh/Add logger.cleanup on Remco log4j template](https://github.com/rundeck/rundeck/pull/9716)
* [Job editor card header section in vue](https://github.com/rundeck/rundeck/pull/9713)
* [chore(deps): Bump jgit to 6.10.1.202505221210-r](https://github.com/rundeck/rundeck/pull/9699)
* [Update dependency org.seleniumhq.selenium:selenium-java to v4.34.0](https://github.com/rundeck/rundeck/pull/9505)
* [Update French Translations - From community](https://github.com/rundeck/rundeck/pull/9184)

[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A5.15.0+is%3Aclosed)

## Links

- Download the Releases: [Open Source](https://www.rundeck.com/community-downloads/5.15.0) | [Self-Hosted](https://www.rundeck.com/enterprise-downloads/5.15.0)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/index.md)
- [Catch us on LinkedIn for the Live Stream Release Videos](https://www.linkedin.com/company/pagerduty/events)

## Version Info

Name: <span style="color: fuchsia"><span class="glyphicon glyphicon-sunglasses"></span> "Matterhorn fuchsia sunglasses"</span>

Release Date: September 2nd, 2025


## Community Contributors

Submit your own Pull Requests to get recognition here!

* Lucas Migliorini ([luqpy](https://github.com/luqpy))
* Christian Schulze-Wiehenbrauk ([Ntr0](https://github.com/Ntr0))
* Clément Mazzella ([mazzella-c](https://github.com/mazzella-c))
* JP Lassnibatt ([jplassnibatt](https://github.com/jplassnibatt))
* Bruno Dias ([brmdias](https://github.com/brmdias))
* Rui Melo Amaro ([rmeloamaro](https://github.com/rmeloamaro))


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