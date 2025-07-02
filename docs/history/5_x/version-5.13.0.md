---

title: "5.13.0 Release Notes"
date: 2025-06-25
image: /images/chevron-logo-red-on-white.png
description: "Rundeck | Runbook Automation Releases 5.13.0 - New Job Metrics and ROI Graphs"
feed:
 enable: true
 description: "New Job Metrics and ROI Graphs"

---

# 5.13.0 Release Notes

## Overview

<VidStack src="youtube/NLP84gRPDC0" poster="https://img.youtube.com/vi/NLP84gRPDC0/maxresdefault.jpg"/>

::: danger Important Security Update

:::
A security vulnerability was identified and patched in the Enterprise Runner component where certain password patterns containing regex special characters (particularly multiple '+' characters) could bypass the password masking mechanism, potentially exposing sensitive information in error logs. This issue affected Enterprise Runner versions used with Process Automation 4.14.0 through 5.12.0, but did not impact Open Source Rundeck or the Process Automation server itself. The vulnerability has been remediated in version 5.13.0, which includes fixes in both the server and runner components to prevent exposure of secrets containing regex special characters. *Process Automation Self Hosted customers should upgrade both their server and all Enterprise Runners* to version 5.13.0 or later for complete remediation.  Process Automation SaaS servers are already updated, customers should proceed directly to upgrading all their Enterprise Runners.

[Full details on this page](/history/cves/2025-06-runner-security.md)

### Job Metrics
The Job Metrics plugin provides comprehensive visualization and analysis of your Rundeck job execution patterns, success rates, and timing trends through an intuitive dashboard interface.

![Job Metrics Example](/assets/img/relnotes-5130-alljobs.png)<br>

![Job Metrics Job Data](/assets/img/relnotes-5130-jobdata.png)<br>

### ROI Metrics

The ROI Summary plugin brings your automation's financial impact to life through intuitive visualizations and real-time calculations, helping teams quantify and demonstrate the value of their automation initiatives.

![Job Metrics Example](/assets/img/relnotes-5130-roisummary.png)<br>

![Job Metrics Job Data](/assets/img/relnotes-5130-roijob.png)<br>


### Webhook Audit Listener

The [Webhook Audit Listener plugin](/administration/security/audit-stream-plugin.md) enables real-time streaming of Rundeck audit events to external systems through configurable webhook endpoints. This allows teams to integrate Rundeck’s audit trail with external monitoring, logging, or security platforms.

## Runbook Automation Updates

> Also includes all Open Source updates from below

### Additional Updates


* Add new UI for Job Metrics and ROI Metrics graphs
* Fix: Ansible Model Sources return host vars data in key=value format when &quot;Gather Facts&quot; is set to &quot;no&quot;
* Fix: Webhook events don&#39;t get deleted properly from DB
* Update vault-storage plugin version to 1.3.14 for CVE-2019-17571
* Add MongoDB Node Step to allow Runner functionality


## Rundeck Open Source Product Updates

* [Added new ansible-plugin release](https://github.com/rundeck/rundeck/pull/9675)
* [Fix: DELETE query type for stored events is ignored](https://github.com/rundeck/rundeck/pull/9668)
* [Update multiline-regex-datacapture-filter plugin to 1.1.2 for CVE-2019-17571](https://github.com/rundeck/rundeck/pull/9664)
* [Allow Audit Events Plugins to refresh config](https://github.com/rundeck/rundeck/pull/9658)
* [Upgrade Gradle to 7.6.2](https://github.com/rundeck/rundeck/pull/9657)
* [Upgrade asset-pipeline-grails lib version to 3.4.7](https://github.com/rundeck/rundeck/pull/9656)
* [upgrade go](https://github.com/rundeck/rundeck/pull/9652)
* [Fix/Add 72-char limit for BCRYPT passwords to address CVE-2025-22228](https://github.com/rundeck/rundeck/pull/9651)
* [Upgrade sshj plugin version for Security Fixes](https://github.com/rundeck/rundeck/pull/9649)
* [Update attribute match plugin to 0.2.1](https://github.com/rundeck/rundeck/pull/9648)
* [fix: blank string value for &quot;Options&quot; property type causes Exception](https://github.com/rundeck/rundeck/pull/9647)
* [Add project name to params to get plugin details](https://github.com/rundeck/rundeck/pull/9636)
* [Add autocomplete behavior to inputs and scripts](https://github.com/rundeck/rundeck/pull/9632)
* [NextUI: Add job activity list menu action ](https://github.com/rundeck/rundeck/pull/9615)
* [Upgrade selenium version to 4.31.0](https://github.com/rundeck/rundeck/pull/9323)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A5.13.0+is%3Aclosed)

## Ansible Plugin Updates
* [Fix: Ansible Model Sources return host vars data in key=value format when &quot;Gather Facts&quot; is set to &quot;no&quot;](https://github.com/rundeck-plugins/ansible-plugin/pull/411)


## Links

- Download the Releases: [Open Source](https://www.rundeck.com/community-downloads/5.13.0) | [Self-Hosted](https://www.rundeck.com/enterprise-downloads/5.13.0)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/index.md)
- [Catch us on LinkedIn for the Live Stream Release Videos](https://www.linkedin.com/company/pagerduty/events)

## Version Info

Name: <span style="color: red"><span class="glyphicon glyphicon-headphones"></span> "Kirkjufell red headphones"</span>

Release Date: June 25th, 2025


## Community Contributors

Submit your own Pull Requests to get recognition here!

* Rui Melo Amaro ([rmeloamaro](https://github.com/rmeloamaro))


## Staff Contributors

* Greg Schueler ([gschueler](https://github.com/gschueler))
* Alexander Abarca ([alexander-variacode](https://github.com/alexander-variacode))
* Alexander Grachtchouk ([mrdubr](https://github.com/mrdubr))
* Carlos Eduardo ([carlosrfranco](https://github.com/carlosrfranco))
* Eduardo Baltra ([edbaltra](https://github.com/edbaltra))
* Forrest Evans ([fdevans](https://github.com/fdevans))
* Jake Cohen ([jsboak](https://github.com/jsboak))
* Jaya Singh ([jayas006](https://github.com/jayas006))
* Julianna Green ([juliannagreen1](https://github.com/juliannagreen1))
* Jason Brooks ([jbrookspd](https://github.com/jbrookspd))
* Jesus Osuna ([Jesus-Osuna-M](https://github.com/Jesus-Osuna-M))
* José Vásquez ([hiawvp](https://github.com/hiawvp))
* Luis Toledo ([ltamaster](https://github.com/ltamaster))
* Rodrigo Navarro ([ronaveva](https://github.com/ronaveva))
* Sarah Martinelli Benedetti ([smartinellibenedetti](https://github.com/smartinellibenedetti))