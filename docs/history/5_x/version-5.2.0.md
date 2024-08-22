---

title: "5.2.0 Release Notes"
date: 2024-04-10
image: /images/chevron-logo-red-on-white.png
feed:
 enable: true
 description: "Security Patches, Bugs Fixed, and more testing"

---

# 5.2.0 Release Notes

Name: <span style="color: rebeccapurple"><span class="glyphicon glyphicon-glass"></span> "Erebus rebeccapurple glass"</span>
Release Date: April 10th, 2024

- Download the Release: [Open Source](https://www.rundeck.com/community-downloads/5.2.0) | [Self-Hosted](https://www.rundeck.com/enterprise-downloads/5.2.0)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/)
- [Watch the Live Stream Release Recap](https://www.youtube.com/live/uWhAQuWckQ0?si=_YLNK-oohOcYKVi8)

<VidStack src="youtube/uWhAQuWckQ0"/>


## Overview

Check out the new features and enhancements for PagerDuty Runbook Automation (formerly Rundeck Enterprise) and PagerDuty Runbook Automation and Rundeck Community included in this release.

### Highlights

Our 5.2.0 release is focused on bug fixes, CVE remediation and testing.  The team spent time revamping our testing framework and migrating tests into that new model.  There is also effort being put into the UI code to modernize, and standardize it to Vue to bring performance improvements and simplify building future enhancements.

## Runbook Automation Updates

> Also includes all Open Source updates from below

### Additional Updates

* Fix: Add Projects button not shown
* Update spring to 5.3.32 because CVE-2024-22243
* Fix: Bug with Oracle migrations from previous versions
* Update pg driver due CVE-2024-1597
* Upgrade sshj-plugin version to 0.1.11
* Fix Runner jobs timing out when under heavy output load
* Add runners statistics to system report

## Rundeck Open Source Product Updates

* [Fix: Spinner always shown in nextUi jobs list](https://github.com/rundeck/rundeck/pull/9045)
* [Update to Spring 5.3.33 for CVE-2024-22259](https://github.com/rundeck/rundeck/pull/9042)
* [Upgrade spring-security to version 5.8.11](https://github.com/rundeck/rundeck/pull/9035)
* [Upgrade ansible-plugin 3.2.10](https://github.com/rundeck/rundeck/pull/9026)
* [Fix error when deleting jobs after upgrade.](https://github.com/rundeck/rundeck/pull/9012)
* [Fix: don&#39;t include UI timezone data in schedules json](https://github.com/rundeck/rundeck/pull/9008)
* [Update golang and remco](https://github.com/rundeck/rundeck/pull/9006)
* [Scheduled forecast GUI errors](https://github.com/rundeck/rundeck/pull/8998)
* [Fix npe error when wrong runner token is presented](https://github.com/rundeck/rundeck/pull/8994)
* [Percentage in number showing in progress bar instead of undefined%](https://github.com/rundeck/rundeck/pull/8974)
* [Move hold method from cluster base container](https://github.com/rundeck/rundeck/pull/8973)
* [Improve test &quot;click on gutter and refresh should highlight correct line&quot;](https://github.com/rundeck/rundeck/pull/8970)
* [Move hold method from ClusterBaseContainer ](https://github.com/rundeck/rundeck/pull/8966)
* [Send a grails event when an execution is being aborted](https://github.com/rundeck/rundeck/pull/8958)
* [Update spring to 5.3.32 because CVE-2024-22243](https://github.com/rundeck/rundeck/pull/8957)
* [Update pg driver due CVE-2024-1597](https://github.com/rundeck/rundeck/pull/8933)
* [Cleanup: prettier for pluginConfig](https://github.com/rundeck/rundeck/pull/8923)
* [Vue conversion of job option editor ](https://github.com/rundeck/rundeck/pull/8922)
* [[Snyk] Fix for 1 vulnerabilities](https://github.com/rundeck/rundeck/pull/8906)
* [Convert project node sources page to Vue](https://github.com/rundeck/rundeck/pull/8898)
* [Fix: Allow to update existing webhooks at project import](https://github.com/rundeck/rundeck/pull/8892)
* [Upgrade sshj-plugin version to 0.1.11](https://github.com/rundeck/rundeck/pull/8889)
* [Update API tests harness project import](https://github.com/rundeck/rundeck/pull/8888)
* [Fix: Slowness clicking the job name (migrate job scm status badge and scm action buttons to vue)](https://github.com/rundeck/rundeck/pull/8877)
* [Install primevue and continuum tokens](https://github.com/rundeck/rundeck/pull/8871)
* [Allow display of request error messages in spacecat 500 page.](https://github.com/rundeck/rundeck/pull/8861)
* [Fix: Remove dependency from rd-api-client](https://github.com/rundeck/rundeck/pull/8852)
* [legacyXml feature flag should support defaultEnabled](https://github.com/rundeck/rundeck/pull/8845)
* [Rdcli is not working properly updating projects on several rundeck versions](https://github.com/rundeck/rundeck/pull/8826)
* [UI:Next: Project list with lazy loading](https://github.com/rundeck/rundeck/pull/8815)
* [UI:Next: jobs list SCM status fixes](https://github.com/rundeck/rundeck/pull/8814)
* [Bug/fix behavior when remotevalues reload](https://github.com/rundeck/rundeck/pull/8793)
* [UI: activity list spacing and layout fixes](https://github.com/rundeck/rundeck/pull/8792)
* [Project and Storage usage of unique value for fetch](https://github.com/rundeck/rundeck/pull/8765)
* [Update messages_fr_FR.properties](https://github.com/rundeck/rundeck/pull/8702)

[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A5.2.0+is%3Aclosed)

## Ansible Plugin Updates
* [Using ssh-agent with passphrase is not working in Ansible Plugin](https://github.com/rundeck-plugins/ansible-plugin/pull/350)
* [Share the vault storage password with the runner](https://github.com/rundeck-plugins/ansible-plugin/pull/349)


## Community Contributors

Submit your own Pull Requests to get recognition here!

* André ([muehan](https://github.com/muehan))
* José Ortiz ([JoseOrtiz](https://github.com/JoseOrtiz))
*  ([mazzella-c](https://github.com/mazzella-c))
*  ([FriendlyTroll](https://github.com/FriendlyTroll))
* Reiner ([MegaDrive68k](https://github.com/MegaDrive68k))
* Rui Melo Amaro ([rmeloamaro](https://github.com/rmeloamaro))

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
