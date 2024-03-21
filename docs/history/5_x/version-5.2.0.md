---

title: "5.2.0 Release Notes"
date: 2024-01-01
image: /images/chevron-logo-red-on-white.png
feed:
 enable: true
 description: ""

---

# 5.2.0 Release Notes

Name: <span style="color: rebeccapurple"><span class="glyphicon glyphicon-glass"></span> "Erebus rebeccapurple glass"</span>
Release Date: PUTADATEHERE

- [Download the Releases](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/)

## Overview

Check out the new features and enhancements for PagerDuty Process Automation (formerly Rundeck Enterprise) and PagerDuty Runbook Automation and Rundeck Community included in this release.

### Highlights

- first highlight
- second highlight

## Process Automation Updates

> Also includes all Open Source updates from below

### Additional Updates


* Runner logs are written to log file out of order
* Update spring to 5.3.32 because CVE-2024-22243
* Update pg driver due CVE-2024-1597
* upgrade sshj-plugin version to 0.1.11
* Fix Runner jobs timing out when under heavy output load
* Add runners statistics to system report


## Rundeck Open Source Product Updates

* [Fix for nodes not showing ](https://github.com/rundeck/rundeck/pull/8990)
* [Replace api call for fetching execution modes for nodes](https://github.com/rundeck/rundeck/pull/8988)
* [Fix Node Wizard in Vue UI](https://github.com/rundeck/rundeck/pull/8975)
* [Percentage in number showing in progress bar instead of undefined%](https://github.com/rundeck/rundeck/pull/8974)
* [Move hold method from cluster base container](https://github.com/rundeck/rundeck/pull/8973)
* [Improve test &quot;click on gutter and refresh should highlight correct line&quot;](https://github.com/rundeck/rundeck/pull/8970)
* [Move hold method from ClusterBaseContainer ](https://github.com/rundeck/rundeck/pull/8966)
* [Migrate testdeck jSecurityCheck](https://github.com/rundeck/rundeck/pull/8965)
* [Send a grails event when an execution is being aborted](https://github.com/rundeck/rundeck/pull/8958)
* [Update spring to 5.3.32 because CVE-2024-22243](https://github.com/rundeck/rundeck/pull/8957)
* [fix incorrect packaging for some tests](https://github.com/rundeck/rundeck/pull/8954)
* [refactored package structure of functional-tests](https://github.com/rundeck/rundeck/pull/8951)
* [Replaced webhook-notification-project.zip and scm tests project with directory](https://github.com/rundeck/rundeck/pull/8949)
* [Fix: Scm tests are flaky on pro](https://github.com/rundeck/rundeck/pull/8948)
* [Testdeck Fix: go edit nodes flaky tests](https://github.com/rundeck/rundeck/pull/8941)
* [Add wait on key creation](https://github.com/rundeck/rundeck/pull/8938)
* [Testdeck api tests migration scm related](https://github.com/rundeck/rundeck/pull/8937)
* [Fixed test that was using a method that was moved to jobUtils](https://github.com/rundeck/rundeck/pull/8936)
* [Update pg driver due CVE-2024-1597](https://github.com/rundeck/rundeck/pull/8933)
* [Selenium Testdeck&#39;s &quot;auto scroll on log viewer page...&quot; Flaky Test Fix](https://github.com/rundeck/rundeck/pull/8932)
* [Fix tests: remove shims for empty test sets](https://github.com/rundeck/rundeck/pull/8930)
* [Add new tests](https://github.com/rundeck/rundeck/pull/8926)
* [Migrate Scm API TESTS to new testdeck](https://github.com/rundeck/rundeck/pull/8924)
* [Cleanup: prettier for pluginConfig](https://github.com/rundeck/rundeck/pull/8923)
* [Fix: Testdeck Api Tests Migration project related tests](https://github.com/rundeck/rundeck/pull/8921)
* [TestDeck: Update api version to 47 and setup cleanup when api version is changed](https://github.com/rundeck/rundeck/pull/8916)
* [&amp; Testdeck: 13 tests converted from old framework](https://github.com/rundeck/rundeck/pull/8913)
* [Fix : Testdeck Api Tests Migration &quot;system tests&quot;](https://github.com/rundeck/rundeck/pull/8912)
* [Fix: Testdeck Api Tests Migration](https://github.com/rundeck/rundeck/pull/8911)
* [Remove old API SCM tests](https://github.com/rundeck/rundeck/pull/8907)
* [[Snyk] Fix for 1 vulnerabilities](https://github.com/rundeck/rundeck/pull/8906)
* [enable ui-trellis jest tests](https://github.com/rundeck/rundeck/pull/8904)
* [Tests: Job Scm Status Badge Selenium Tests](https://github.com/rundeck/rundeck/pull/8902)
* [Convert project node sources page to Vue](https://github.com/rundeck/rundeck/pull/8898)
* [Remove old API SCM tests](https://github.com/rundeck/rundeck/pull/8897)
* [Migration bash groovy testdesk](https://github.com/rundeck/rundeck/pull/8894)
* [Fix: Allow to update existing webhooks at project import](https://github.com/rundeck/rundeck/pull/8892)
* [Fix flaky tests](https://github.com/rundeck/rundeck/pull/8890)
* [upgrade sshj-plugin version to 0.1.11](https://github.com/rundeck/rundeck/pull/8889)
* [Update API tests harness project import](https://github.com/rundeck/rundeck/pull/8888)
* [Fix flaky tests on new Selenium Testdeck](https://github.com/rundeck/rundeck/pull/8884)
* [Testdeck: Migration: 19 tests (See desc)](https://github.com/rundeck/rundeck/pull/8878)
* [Fix: Slowness clicking the job name (migrate job scm status badge and scm action buttons to vue)](https://github.com/rundeck/rundeck/pull/8877)
* [install primevue and continuum tokens](https://github.com/rundeck/rundeck/pull/8871)
* [Migrate API to New testdeck](https://github.com/rundeck/rundeck/pull/8863)
* [Allow display of request error messages in spacecat 500 page.](https://github.com/rundeck/rundeck/pull/8861)
* [Fix: Remove dependency from rd-api-client](https://github.com/rundeck/rundeck/pull/8852)
* [Testdeck Migration: test-job-run-steps.sh &amp; test-job-run-without-deadlock.sh](https://github.com/rundeck/rundeck/pull/8850)
* [legacyXml feature flag should support defaultEnabled](https://github.com/rundeck/rundeck/pull/8845)
* [Api Tests Migrations: Refactor](https://github.com/rundeck/rundeck/pull/8838)
* [Testdeck Migration: test-job-retry.sh, test-job-run-GET-405.sh, test-job-run-later.sh](https://github.com/rundeck/rundeck/pull/8833)
* [Rdcli is not working properly updating projects on severals rundeck versions](https://github.com/rundeck/rundeck/pull/8826)
* [Testdeck Migration](https://github.com/rundeck/rundeck/pull/8824)
* [Testdeck Migration: test-job-flip-scheduleEnabled-scheduler-bug.sh, test-job-flip-scheduleEnabled.sh, test-job-long-run.sh](https://github.com/rundeck/rundeck/pull/8821)
* [ UI:Next: Project list with lazy loading](https://github.com/rundeck/rundeck/pull/8815)
* [UI:Next: jobs list SCM status fixes](https://github.com/rundeck/rundeck/pull/8814)
* [Bug/fix behavior when remotevalues reload](https://github.com/rundeck/rundeck/pull/8793)
* [UI: activity list spacing and layout fixes](https://github.com/rundeck/rundeck/pull/8792)
* [Project and Storage usage of unique value for fetch](https://github.com/rundeck/rundeck/pull/8765)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A5.2.0+is%3Aclosed)

## Ansible Plugin Updates
* [temporary files are not deleted ](https://github.com/rundeck-plugins/ansible-plugin/pull/351)




## Community Contributors

Submit your own Pull Requests to get recognition here!

*  ([smartinellibenedetti](https://github.com/smartinellibenedetti))
* McG ([chrismcg14](https://github.com/chrismcg14))
*  ([jayas006](https://github.com/jayas006))
* Jesus Osuna ([Jesus-Osuna-M](https://github.com/Jesus-Osuna-M))
* Antony Velasquez Ruiz ([avelasquezr](https://github.com/avelasquezr))
* Stephen Joyner ([sjrd218](https://github.com/sjrd218))
* Alberto Hormazabal ([ahormazabal](https://github.com/ahormazabal))
* Rodrigo Navarro ([ronaveva](https://github.com/ronaveva))
* Leonel Juarez ([L2JE](https://github.com/L2JE))
* Darwis Narvaez ([DarwisNarvaezDev](https://github.com/DarwisNarvaezDev))
* Greg Schueler ([gschueler](https://github.com/gschueler))
* Luis Toledo ([ltamaster](https://github.com/ltamaster))
* André ([muehan](https://github.com/muehan))
* José Ortiz ([JoseOrtiz](https://github.com/JoseOrtiz))
* Forrest Evans ([fdevans](https://github.com/fdevans))
* Rui Melo Amaro ([rmeloamaro](https://github.com/rmeloamaro))
* Reiner ([MegaDrive68k](https://github.com/MegaDrive68k))


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
