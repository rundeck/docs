---

title: "5.10.0 Release Notes"
date: 2025-03-05
image: /images/chevron-logo-red-on-white.png
description: "Rundeck | Runbook Automation Releases 5.10.0 - Java 17 Support and Enhanced Runner Setup"
feed:
 enable: true
 description: "Java 17 Support and Enhanced Runner Setup"

---

# 5.10.0 Release Notes

## Overview

## Official Support for Java 17

Rundeck and Enterprise Runners on version 5.10.0 now support Java 17, bringing significant advantages to enterprise customers through its Long Term Support (LTS) status and enhanced performance capabilities. With Java 17 LTS support extending until September 2029, organizations can confidently deploy Rundeck knowing they have a stable, supported foundation for years to come. The upgrade delivers notable performance improvements through enhanced G1 Garbage Collection, resulting in more predictable pause times and better memory management. Users will experience faster startup times and reduced memory footprint, particularly beneficial for containerized deployments and cloud environments. Existing Rundeck deployments running on Java 11 can be upgraded seamlessly to Java 17, maintaining backward compatibility with existing automation workflows and custom plugins.

## Enhanced Runner Install Experience

Enterprise Runners provide the crucial mechanism for securely dispatching automation to infrastructure within your environments. As Runners are regularly created by both new and existing users, the installation experience is critical for reducing the time to get up and running with Runbook Automation. With this latest release, we have significantly improved the process to create and install new Runners. Users now select the platform type for their Runners  – such as Linux, Windows, Docker or Kubernetes – and then they are presented with the necessary commands to immediately install the Runner of the chosen type. This significantly reduces the steps required to stand up new Runners and enables new teams to get started within their Runbook Automation Projects with greater ease. <br>
For full details on the enhanced Runner install experience, please refer to the [Creating Runners](/administration/runner/runner-installation/creating-runners.md) documentation.

![Runner Install](/assets/img/relnotes-510-runnerinstall.png)<br>

## Runbook Automation Updates

> Also includes all Open Source updates from below

### Additional Updates

* Update netty-handler for CVE-2025-24970
* Fix: ServiceNow Assignment Group is not working in job step plugins
* Fix: SSH-J Node Executor CopyFileFailed for recursive copies
* New method of polling for runner reports to cleanup records
* Upgrade okio version to address CVE-2023-3635
* Upgraded google cloud container version to address CVE-2024-7254
* Azure Vault Key Storage Plugin


## Rundeck Open Source Product Updates

* [Fix: Activity filter has an extra &gt; character](https://github.com/rundeck/rundeck/pull/9578)
* [Fix: SSH-J Plugin CopyFileFailed for recursive copy](https://github.com/rundeck/rundeck/pull/9577)
* [Group properties in Node Source configuration](https://github.com/rundeck/rundeck/pull/9558)
* [Cache some API responses in GUI](https://github.com/rundeck/rundeck/pull/9557)
* [Fix: Result data set not included in error handler context](https://github.com/rundeck/rundeck/pull/9542)
* [Deprecate `azure-object-store-plugin`](https://github.com/rundeck/rundeck/pull/9530)
* [Code Injection Vulnerability via Project Name Label](https://github.com/rundeck/rundeck/pull/9528)
* [Update jsch library](https://github.com/rundeck/rundeck/pull/9514)

[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A5.10.0+is%3Aclosed)

## Links

- Download the Releases: [Open Source](https://www.rundeck.com/community-downloads/5.10.0) | [Self-Hosted](https://www.rundeck.com/enterprise-downloads/5.10.0)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/index.md)
- [Catch us on Twitch for the Live Stream Release Video](https://www.twitch.tv/pagerduty)

## Version Info

Name: <span style="color: slategray"><span class="glyphicon glyphicon-tent"></span> "K2 slategray tent"</span>

Release Date: March 5th, 2025


## Community Contributors

Submit your own Pull Requests to get recognition here!

*  ([trodriguezpd](https://github.com/trodriguezpd))
* Nicholas Worthington ([ngwmddgh](https://github.com/ngwmddgh))
* Bruno Dias ([brmdias](https://github.com/brmdias))
* Rui Melo Amaro ([rmeloamaro](https://github.com/rmeloamaro))


## Staff Contributors

* Greg Schueler ([gschueler](https://github.com/gschueler))
* Alexander Abarca ([alexander-variacode](https://github.com/alexander-variacode))
* Alexander Grachtchouk ([mrdubr](https://github.com/mrdubr))
* Carlos Eduardo ([carlosrfranco](https://github.com/carlosrfranco))
* Christopher McCarroll-Gilbert ([chrismcg14](https://github.com/chrismcg14))
* Charlie Crawford ([ChuckCrawford](https://github.com/ChuckCrawford))
* Forrest Evans ([fdevans](https://github.com/fdevans))
* Jake Cohen ([jsboak](https://github.com/jsboak))
* Jaya Singh ([jayas006](https://github.com/jayas006))
* Jason Brooks ([jbrookspd](https://github.com/jbrookspd))
* Jesus Osuna ([Jesus-Osuna-M](https://github.com/Jesus-Osuna-M))
* José Vásquez ([hiawvp](https://github.com/hiawvp))
* Luis Toledo ([ltamaster](https://github.com/ltamaster))
* Rodrigo Navarro ([ronaveva](https://github.com/ronaveva))
* Sarah Martinelli Benedetti ([smartinellibenedetti](https://github.com/smartinellibenedetti))