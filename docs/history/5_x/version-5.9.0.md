---

title: "5.9.0 Release Notes"
date: 2025-02-05
image: /images/chevron-logo-red-on-white.png
description: "Rundeck | Runbook Automation Releases 5.9.0 with GA release of Dynamic Runner Management"
feed:
 enable: true
 description: ""

---

# 5.9.0 Release Notes

## Overview

<VidStack src="youtube/EQE1pUIe_Lg" poster="https://img.youtube.com/vi/EQE1pUIe_Lg/maxresdefault.jpg"/>

### Azure Key Storage

[Azure Key Storage](/manual/key-storage/storage-plugins/azure-vault.md) is released for Runbook Automation SAAS customers.  [Azure Key Vault](https://azure.microsoft.com/en-us/products/key-vault) is a cloud-based service for secure storage and management of sensitive data. It allows controlled access to confidential information such as API keys, passwords, certificates, and cryptographic keys.  This integration enables users to retrieve **secrets** from Azure Key Vault and utilize them for secure connections to various resources including virtual machines, databases, other tools, and more.  

> [Azure Key Storage](/manual/key-storage/storage-plugins/azure-vault.md) will be available for Runbook Automation Self Hosted with the version 5.10.0 release.

### Dynamic Node-Runner Association

[Automatic Runner Selection for node-dispatch](/administration/runner/runner-management/project-dispatch-configuration.md) allows users to assign a Runner to a set of nodes using a Node Filter such that any tasks dispatched to those nodes will automatically use the assigned Runner.  This dynamic association of Runners to nodes simplifies the authoring of Jobs, since users no longer need to define Runner selection as part of their Job definitions. The association between Runners and nodes also allows for a single Job execution to use multiple Runners based on the nodes being targeted.

### Runner Hosts as Nodes
Runners can now natively be added as nodes to the node inventory, providing a simpler method for executing steps on the Runner while also executing against other nodes.  This also provides for an easier setup experience for teams that are new to using Runbook Automation.  More details about the Runner as a Node can be found [here](/administration/runner/runner-management/node-dispatch.md).

:::tip Enabling Latest Runner Features
To use the latest Enterprise Runner features - such as the two highlighted above - be sure to the following config properties are set in [**System Configuration**](/manual/configuration-mgmt/configmgmt.md):

* **`rundeck.feature.runner.enabled`** = **`true`**
* **`rundeck.feature.distributedAutomation.enabled`** = **`true`**
:::


This release includes numerous security updates to address identified CVE vulnerabilities, along with various improvements to enhance product functionality.

## Runbook Automation Updates

> Also includes all Open Source updates from below

### Additional Updates

* Resolve CVE-2024-52046 - Critical
* Performance issues using ServiceNow plugin
* Update Spring to 5.3.39
* Update Ansible plugin to 4.0.7
* Jira Create Issue - Failure with required custom field that is not a string value
* Secrets cache configurable on AWS Secret Manager Plugin

## Rundeck Open Source Product Updates

* [Remove params from resource-level runner acl at system level](https://github.com/rundeck/rundeck/pull/9525)
* [Resolve CVE-2024-52046 - Critical ](https://github.com/rundeck/rundeck/pull/9521)
* [Fix SCM import when file name has quotes](https://github.com/rundeck/rundeck/pull/9513)
* [Performance issues using ServiceNow plugins](https://github.com/rundeck/rundeck/pull/9510)
* [Update JAAS/jetty combined login module to allow ignoreRoles in binding context](https://github.com/rundeck/rundeck/pull/9509)
* [Create a new endpoint to expose user/token authorizations](https://github.com/rundeck/rundeck/pull/9507)
* [Added modification to ExpandedJobGroupsSpec](https://github.com/rundeck/rundeck/pull/9502)
* [Update Spring to 5.3.39](https://github.com/rundeck/rundeck/pull/9501)
* [Fix import action of scm import plugin when importing right after enabling the plugin](https://github.com/rundeck/rundeck/pull/9498)
* [Update Ansible plugin to 4.0.7](https://github.com/rundeck/rundeck/pull/9496)
* [Use golang 1.22.2 to address CVE-2023-45288](https://github.com/rundeck/rundeck/pull/9495)
* [Update vue-i18n to version 10 and webpack 5 to latest](https://github.com/rundeck/rundeck/pull/9485)
* [Fix: JettyRolePropertyFileLoginModule supported in docker](https://github.com/rundeck/rundeck/pull/9482)
* [Add GET project/{project}/nodes/tags](https://github.com/rundeck/rundeck/pull/9481)
* [Add promoted/highlighted steps in the vue converted pieces for workflow](https://github.com/rundeck/rundeck/pull/9472)
* [Upgraded commons-io version to address cve-2024-47554](https://github.com/rundeck/rundeck/pull/9465)
* [Expose additional plugin properties in `*/plugin/list` API responses](https://github.com/rundeck/rundeck/pull/9464)
* [Remove JUnit from build distribution](https://github.com/rundeck/rundeck/pull/9463)
* [Fix execution modal when nextUi mode is enabled](https://github.com/rundeck/rundeck/pull/9459)
* [Convert workflow steps into vue](https://github.com/rundeck/rundeck/pull/9457)
* [Multi-select with all values selected should use values if job referenced or via api](https://github.com/rundeck/rundeck/pull/9455)
* [Fix: Invalid workflow step causes uncaught exception](https://github.com/rundeck/rundeck/pull/9441)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A5.9.0+is%3Aclosed)

## Ansible Plugin Updates
* [Enable custom tmp on ansible](https://github.com/rundeck-plugins/ansible-plugin/pull/405)
* [Fix - Added max aliases field to set a valid value](https://github.com/rundeck-plugins/ansible-plugin/pull/404)

## Links

- Download the Releases: [Open Source](https://www.rundeck.com/community-downloads/5.9.0) | [Self-Hosted](https://www.rundeck.com/enterprise-downloads/5.9.0)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/index.md)
- [Catch us on LinkedIn for the Live Stream Release Videos](https://www.linkedin.com/company/pagerduty/events)

## Version Info

Name: <span style="color: peru"><span class="glyphicon glyphicon-phone"></span> "Hood peru phone"</span>

Release Date: February 5th, 2025


## Community Contributors

Submit your own Pull Requests to get recognition here!

* Rui Melo Amaro ([rmeloamaro](https://github.com/rmeloamaro))
* Bruno Dias ([brmdias](https://github.com/brmdias))
*  ([trodriguezpd](https://github.com/trodriguezpd))


## Staff Contributors

* Greg Schueler ([gschueler](https://github.com/gschueler))
* Alexander Abarca ([alexander-variacode](https://github.com/alexander-variacode))
* Alexander Grachtchouk ([mrdubr](https://github.com/mrdubr))
* Carlos Eduardo ([carlosrfranco](https://github.com/carlosrfranco))
* Christopher McCarroll-Gilbert ([chrismcg14](https://github.com/chrismcg14))
* Charlie Crawford ([ChuckCrawford](https://github.com/ChuckCrawford))
* Forrest Evans ([fdevans](https://github.com/fdevans))
* Imad Jafir ([imad6639](https://github.com/imad6639))
* Jake Cohen ([jsboak](https://github.com/jsboak))
* Jason Brooks ([jbrookspd](https://github.com/jbrookspd))
* Jesus Osuna ([Jesus-Osuna-M](https://github.com/Jesus-Osuna-M))
* José Vásquez ([hiawvp](https://github.com/hiawvp))
* Luis Toledo ([ltamaster](https://github.com/ltamaster))
* Rodrigo Navarro ([ronaveva](https://github.com/ronaveva))
* Sarah Martinelli Benedetti ([smartinellibenedetti](https://github.com/smartinellibenedetti))
* Stephen Joyner ([sjrd218](https://github.com/sjrd218))
