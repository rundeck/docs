---

title: "5.6.0 Release Notes"
date: 2024-09-12
image: /images/chevron-logo-red-on-white.png
feed:
 enable: true
 description: "Security and Bug Fixes"

---

# 5.6.0 Release Notes

Name: <span style="color: salmon"><span class="glyphicon glyphicon-bullhorn"></span> "Fansiban salmon bullhorn"</span>
Release Date: September 12, 2024

- Download the Releases: [Open Source](https://www.rundeck.com/community-downloads/5.6.0) | [Self-Hosted](https://www.rundeck.com/enterprise-downloads/5.6.0)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/)
- [Watch the Live Stream Release Recap](https://www.youtube.com/watch?v=AVf0Pwafza0)


<VidStack src="youtube/AVf0Pwafza0"/>


AVf0Pwafza0

## Overview

Our 5.6.0 release is focused on bug fixes, CVE remediation and testing.  We have also continued our efforts into the UI code to modernize, and standardize it to Vue. This will bring performance improvements and simplify building future enhancements.

### Additional Updates


* Update aws-java-sdk to address CVE-2024-21634
* Fix CVE-2023-5072
* Fix CVE-2023-51074
* Fix: It is now possible to change TMP dir in Runners
* HTTP request step not working in framework and project configuration level


## Rundeck Open Source Product Updates

* [Plugins control security issue](https://github.com/rundeck/rundeck/pull/9343)
* [Executions API will return referenced executions](https://github.com/rundeck/rundeck/pull/9342)
* [Update jackson databind and cbor libraries](https://github.com/rundeck/rundeck/pull/9338)
* [Add LDAP rolePagination config option for Docker](https://github.com/rundeck/rundeck/pull/9332)
* [Fix CVE-2023-51074](https://github.com/rundeck/rundeck/pull/9329)
* [Notification timeouts enabled by default.](https://github.com/rundeck/rundeck/pull/9325)
* [Fix edge case in pluginPropEdit update](https://github.com/rundeck/rundeck/pull/9317)
* [Fix: Imported command/script steps should be plugin steps](https://github.com/rundeck/rundeck/pull/9297)
* [Fix notification timeout results in hanging jobs](https://github.com/rundeck/rundeck/pull/9284)
* [Improvement on the Resource Model plugins configuration using runners](https://github.com/rundeck/rundeck/pull/9276)
* [Fix:  &quot;Job Running&quot; when job has completed for scheduled jobs.](https://github.com/rundeck/rundeck/pull/9273)
* [Fix: Text/HTML download appears garbled if execution log has unicode text](https://github.com/rundeck/rundeck/pull/9272)
* [Fix: Pagination Issue due to calculation by casting string into number](https://github.com/rundeck/rundeck/pull/9271)
* [Avoid multiple executions for same schedule](https://github.com/rundeck/rundeck/pull/9213)
* [Add LDAP rolePagination config option for docker](https://github.com/rundeck/rundeck/pull/8822)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A5.6.0+is%3Aclosed)


## Community Contributors

Submit your own Pull Requests to get recognition here!

* Matthias ([palto42](https://github.com/palto42))
* Rui Melo Amaro ([rmeloamaro](https://github.com/rmeloamaro))
* Bruno Dias ([brmdias](https://github.com/brmdias))
* Gastón Urbina ([urbinet](https://github.com/urbinet))
* Victor de Jong ([victordejong](https://github.com/victordejong))
* Adam Barrand ([abarrand](https://github.com/abarrand))


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
