---

title: "4.16.0 Release Notes"
date: "2023-08-24"
image: /images/chevron-logo-red-on-white.png
feed:
 enable: true
 description: "Key Storage and Node Sources on the Enterprise Runner!"

---

# 4.16.0 Release Notes

Name: <span style="color: palevioletred"><span class="glyphicon glyphicon-book"></span> "Big Foot palevioletred book"</span>
Release Date: August 24th, 2023

- [Download the Releases](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/)

## Overview

Check out the new features and enhancements for PagerDuty Process Automation (formerly Rundeck Enterprise) and PagerDuty Runbook Automation and Rundeck Community included in this release.

## Process Automation Updates

> Also includes all Open Source updates from below

### Highlights

#### Secrets Management Integrations through Enterprise Runner

With the latest release, customers can integrate the Runner with Hashicorp Vault and use secrets from Vault in their workflows and to discover nodes.  When users navigate to select keys from key Storage, there is now an option to browse and select secrets from Vault that the Runner is integrated with.  While the key names and paths are visible in the GUI, the secrets themselves are not sent to the server.  The integration between Runners and secrets-management instances now enable customers to automate workflows in secure, remote environments where they have self-hosted secrets-stores:

![Runner Key Storage](@assets/img/key-storage-runner-browse.png)

For further details on configuring and using secrets-management providers with the Enterprise Runner, see [this documentation](/docs/manual/key-storage/enterprise-runner-key-storage).

### Node Inventory Discovery through Enterprise Runner
This release enables the Runner to be used for discovering nodes and populating the node-inventory through the Runner.  When users select to add a new Node Source through the GUI, there is now an option to select a Runner to use for discovering Nodes in the remote environment.  Through existing Node Source plugins such as Ansible, VMware, Docker and Kubernetes, the Runner will retrieve and send the node data back to the server to be visible in the GUI and targeted for Job and Command execution.  This integration allows customers to automate more tasks in their secure and remote environments where inventory can only be discovered within their environment’s perimeter.

For further details on configuring and using node discovery through the Enterprise Runner, see [this documentation](/docs/manual/projects/resource-model-sources/#adding-nodes-to-a-project).

![Runner Node Sources](@assets/img/node-source-runner-selector.png)

### SSHJ Default Node Executor for New Projects
Prior to this release, the out-of-the-box Default Node Executor for projects was the JSCH plugin.  However, this plugin no longer supports the latest SSH security standards – such as the most secure RSA algorithms.  In order to support these latest standards for SSH security, new projects created within Rundeck, Process Automation OnPrem and Runbook automation will use the SSHJ plugin as the Default Node Executor.  Customers who are using the JSCH plugin are not required to switch over to SSHJ and we will continue to support the JSCH Node Executor plugin.

### Additional Updates

* Fix: System report statistics are not loading
* Support for file and script resource models to be executed in a Runner
* Fix: Cleanup misfire tracker properly when job was deleted
* Fix: AWS PluginGroup within Runbook Automation does not commit saved changes
* Update Jetty due to CVE-2023-26048 - CVE-2023-26049
* Upgrade guava due to CVE-2023-2976
* Fix Add tags with same name in project

## Rundeck Open Source Product Updates

* [Enable execution of Script file resource model in a remote runner](https://github.com/rundeck/rundeck/pull/8502)
* [Force Reloading of Runner keys](https://github.com/rundeck/rundeck/pull/8500)
* [Fix: Select the correct webhook when saving a new one](https://github.com/rundeck/rundeck/pull/8490)
* [Fix: Button border width causes misaligned input group on hi-dpi screen](https://github.com/rundeck/rundeck/pull/8486)
* [New LDAP setting for &quot;allGroups&quot; is true by default.](https://github.com/rundeck/rundeck/pull/8485)
* [Fix: Expand Timeout Variable on Scheduled Job](https://github.com/rundeck/rundeck/pull/8482)
* [Upgrade hibernate to 5.6.15 bc of compatibility issues with h2 2.0](https://github.com/rundeck/rundeck/pull/8481)
* [Fixes job deletion of a scheduled job](https://github.com/rundeck/rundeck/pull/8480)
* [Runner Key Storage GUI](https://github.com/rundeck/rundeck/pull/8479)
* [Update core storage plugins to hide password fields in UI](https://github.com/rundeck/rundeck/pull/8478)
* [Change default node executor and file copier to use SSHJ](https://github.com/rundeck/rundeck/pull/8476)
* [Fix: Execution state is not synchronized among cluster members when using shared file system log storage](https://github.com/rundeck/rundeck/pull/8472)
* [Remove un-stylish border from notifications](https://github.com/rundeck/rundeck/pull/8471)
* [Upgrade spring security due CVE-2023-34034](https://github.com/rundeck/rundeck/pull/8459)
* [Some jobs do not trigger after disabling/enabling the schedule](https://github.com/rundeck/rundeck/pull/8458)
* [Dark mode updates](https://github.com/rundeck/rundeck/pull/8454)
* [Fix: When clicking &quot;Save&quot; button at webhook can&#39;t copy the genereated string](https://github.com/rundeck/rundeck/pull/8453)
* [Update Jetty due to CVE-2023-26048 and CVE-2023-26049](https://github.com/rundeck/rundeck/pull/8452)
* [Fix: Map Different Required Authorizing Roles](https://github.com/rundeck/rundeck/pull/8450)
* [Fix stuck log output on a job with high number of nodes](https://github.com/rundeck/rundeck/pull/8444)
* [Fix: Throwing a precise message when the data column limit is reached](https://github.com/rundeck/rundeck/pull/8439)
* [Fix: rundeck.scm.startup.initDeferred config not defined in remco](https://github.com/rundeck/rundeck/pull/8437)
* [:Flag to enable/disable search for more than 1000 users](https://github.com/rundeck/rundeck/pull/8436)
* [Fixing repeating warn log messages](https://github.com/rundeck/rundeck/pull/8425)
* [Support for setting runner in Node source](https://github.com/rundeck/rundeck/pull/8413)
* [Cleanup: remove unused events fragment](https://github.com/rundeck/rundeck/pull/8326)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A4.16.0+is%3Aclosed)

## Ansible Plugin Updates
* [Node source in the runner](https://github.com/rundeck-plugins/ansible-plugin/pull/336)



## Enterprise Runner Updates

**Bundled Runner Version:** Version Not Found check for release tag

* Additional support for File and Script node source plugins
* Runner can support Key Storage plugins
* Runner can execute Node Sources
* Fix usage of maven local repository


## Community Contributors

Submit your own Pull Requests to get recognition here!

* Luis Toledo ([ltamaster](https://github.com/ltamaster))
* Eric He ([ehe-pd](https://github.com/ehe-pd))
* Carlos Eduardo ([carlosrfranco](https://github.com/carlosrfranco))
* Greg Schueler ([gschueler](https://github.com/gschueler))
* Antony Velasquez Ruiz ([avelasquezr](https://github.com/avelasquezr))
* Darwis Narvaez ([DarwisNarvaezDev](https://github.com/DarwisNarvaezDev))
* Alberto Hormazabal ([ahormazabal](https://github.com/ahormazabal))
* Rodrigo Navarro ([ronaveva](https://github.com/ronaveva))
* McG ([chrismcg14](https://github.com/chrismcg14))
* Leonel Juarez ([L2JE](https://github.com/L2JE))
* Jesus Osuna ([Jesus-Osuna-M](https://github.com/Jesus-Osuna-M))
* Osman Albarran ([Oalbarran94](https://github.com/Oalbarran94))
* Nathan Fluegel ([wayfaringson](https://github.com/wayfaringson))


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
* Stephen Joyner ([sjrd218](https://github.com/sjrd218))
