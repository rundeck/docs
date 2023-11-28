---

title: "5.0.0 Release Notes"
date: 2024-12-06
image: /images/chevron-logo-red-on-white.png
feed:
 enable: true
 description: "Version 5.0 is Available now."

---

# 5.0.0 Release Notes

Name: <span style="color: brown"><span class="glyphicon glyphicon-apple"></span> "Denali brown apple"</span>
Release Date: December 6th, 2023

- [Download the Releases](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)

::: warning Upgrade Steps
Be sure to follow the [Upgrade instructions](/upgrading/) when moving to version 5.0 or higher.  There are new minimum Java versions and other important information.
:::

## Overview

Rundeck/Process Automation 5.0 is here! This release updates the underlying foundations of the Rundeck/Process Automation platform to open up more opportunities for enhancements and improvements in the 5.x series.

## Improvements

* Runner Key Storage GUI for Resource Model Sources
* Performance improvement to Jobs List of up to 85% after conversion to Node and refactoring loading process.
* Java 11 is now the minimum required version, and we are currently working on certifying Java 17.

## “Under the hood” updates

Our major version releases always center around updates to the foundational libraries we use to build Rundeck. The following highlights some of those new versions. The result is a more stable, extensible and secure product from the extensive library updates included.

* Grails 6 is now the foundation for Rundeck and Process Automation products.
* Builds are now completed using Node 18
* Started conversion of pages from old UI code to Vue.  This effort will be on-going through the 5.x series and bring performance improvements.

## Deprecations

* Remove Job and Report saved filters from being stored in the database.
* Remove Node filters from being stored in the database. They are now only stored locally on the browser.
* Minimum API version is now `14`.

## Additional Improvements

* Upgrade H2 database to resolve CVE-2022-45868.  (Please see Upgrade Notes if using H2.)
* Clearer logging messaging when running into Database Lock issues.
* `rdCLI` tools now supports JSON job definitions.


> Also includes all Open Source updates from below

## Rundeck Open Source Product Details

* [Upgrade to micronaut 3.10.3 &amp; netty-codec 4.1.100.Final](https://github.com/rundeck/rundeck/pull/8704)
* [Fix liquidbase checksum error](https://github.com/rundeck/rundeck/pull/8698)
* [Add specific message when facing a liquibase LockException](https://github.com/rundeck/rundeck/pull/8696)
* [Fix: Node wizard and resourceyaml sources cannot store +4K lines of node entries ](https://github.com/rundeck/rundeck/pull/8690)
* [Prevent markdown-view from applying its default theme](https://github.com/rundeck/rundeck/pull/8689)
* [Convert Node view pages to Vue](https://github.com/rundeck/rundeck/pull/8688)
* [Convert Edit Readme/MOTD Page to Vue](https://github.com/rundeck/rundeck/pull/8687)
* [Fix: Job option description too long](https://github.com/rundeck/rundeck/pull/8685)
* [CircleCI: Store generated rpm and deb as build artifacts](https://github.com/rundeck/rundeck/pull/8684)
* [Fix: API listing running executions fail using wildcards](https://github.com/rundeck/rundeck/pull/8662)
* [Add runner key storage GUI for node sources](https://github.com/rundeck/rundeck/pull/8650)
* [Grails 6 Upgrade](https://github.com/rundeck/rundeck/pull/8648)
* [Remove XML API support](https://github.com/rundeck/rundeck/pull/8586)
* [Integrate rundeck-plugins/job-kill-handler-addon into Rundeck Core](https://github.com/rundeck/rundeck/pull/8584)
* [API Minimum version 14](https://github.com/rundeck/rundeck/pull/8581)
* [Fix variable expansion for DYNAMIC_FORM property values](https://github.com/rundeck/rundeck/pull/8575)
* [Remove Job and Report filters saved in DB](https://github.com/rundeck/rundeck/pull/8562)
* [Remove database storage for &quot;Node Filters&quot;](https://github.com/rundeck/rundeck/pull/8558)
* [Fix: Project Components not exported when using export to another instance](https://github.com/rundeck/rundeck/pull/8504)
* [Upgrade H2 database to resolve CVE-2022-45868 (see upgrade notes)](https://github.com/rundeck/rundeck/pull/8420)

[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A5.0.0+is%3Aclosed)

## Ansible Plugin Updates
* [Fix: Error handler not working as expected with Ansible Node Step](https://github.com/rundeck-plugins/ansible-plugin/pull/343)
* [Fixing ANSIBLE_BINARIES_DIR_PATH resolution](https://github.com/rundeck-plugins/ansible-plugin/pull/342)
* [Dedicated log filter plugin to capture the output of ansible set_stats module](https://github.com/rundeck-plugins/ansible-plugin/pull/341)

## Enterprise Runner Updates

**Bundled Runner Version:** 0.1.54

## Community Contributors

Submit your own Pull Requests to get recognition here!

* SimonC ([Simon-cto](https://github.com/Simon-cto))
*  ([rmeloamaro](https://github.com/rmeloamaro))


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
