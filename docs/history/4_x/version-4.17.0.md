---

title: "4.17.0 Release Notes"
date: "2023-09-23"
image: /images/chevron-logo-red-on-white.png
feed:
 enable: true
 description: "Enteprise Runner Key Storage Enhancements and lots of bug fixes."

---

# 4.17.0 Release Notes

Name: <span style="color: sandybrown"><span class="glyphicon glyphicon-flag"></span> "Basilisk sandybrown flag"</span>
Release Date: September, 25, 2023

- [Download the Releases](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/)

## Overview

Rundeck 4.17.0 is here! Check out the new features and enhancements for PagerDuty Process Automation, PagerDuty Runbook Automation, and Rundeck Community included in this release.

## Process Automation Updates

> Also includes all Open Source updates from below

### Highlights

#### Runner secrets authentication improvements

Last release we announced support for integrating Runners with secrets-management providers that could be used in Job Step plugins. Now, the keys retrieved from this integration can be used with Node Executor and File Copier plugins as the method for connecting with remote nodes. The Runner can retrieve those secrets from providers like Vault and connect and execute commands or scripts on nodes.

#### Runner Key Storage enhancement

Previously, if a Runner was integrated with a secrets-management provider, then a Job executed through that Runner couldn’t use secrets stored in the native Key Storage. With this release, that limitation is no longer in place. Now the Job can use both the Runner (and Key retrieved through the Runner), as well as keys stored in the native Key Storage facility.

#### Cross-role and cross-account support for EC2, AWS Systems Manager

This release introduces the ability to use Runbook Automation to execute commands and scripts on EC2 instances spread across multiple AWS Accounts–all from within a single project.  By using the AssumeRole functionality that is now built into both the EC2 Node Source and SSM Node Executor plugins, Runbook Automation can now integrate with multiple AWS IAM Roles that reside in one or multiple AWS Accounts.

#### Enhanced feedback message on Enterprise Runners

Previously, if a user chose to use a Node Source that was not available on an Enterprise Runner, they would not see an error message only after they configured and then saved the Node Source. Now, users will see a message whether a given Node Source is available on their Runners when the remote Runners option is selected.

### Additional Updates

* Enhance CyberArk To Support CCP Mode 
* Upgrade runner to 0.1.51
* Fix: Stored Cross-Site Scripting (XSS) in Tour Management
* Fixed documentation bug in Athena Query Plugin
* Fix: SSO settings now reload without system restart
* Typo: ROI metrics plugin description shows wrong API url


## Rundeck Open Source Product Updates

* [Fix: Execution mode is not retained after config refresh](https://github.com/rundeck/rundeck/pull/8561)
* [Fix webhook update to keep auth config](https://github.com/rundeck/rundeck/pull/8559)
* [Fix logViewer regression](https://github.com/rundeck/rundeck/pull/8554)
* [Fix: Key Storage view does not show error when saving fails](https://github.com/rundeck/rundeck/pull/8545)
* [Fix table header in dark mode](https://github.com/rundeck/rundeck/pull/8543)
* [Update project label naming](https://github.com/rundeck/rundeck/pull/8538)
* [Fix: File System keys unreachable in Rundeck](https://github.com/rundeck/rundeck/pull/8535)
* [Add default tab name for Nodes](https://github.com/rundeck/rundeck/pull/8534)
* [Fix: Cannot Import Jobs with Blank Notification&#39;s Config](https://github.com/rundeck/rundeck/pull/8532)
* [Remove MaxMetaspaceSize flag](https://github.com/rundeck/rundeck/pull/8531)
* [Inject storage filter and fieldId to Vue](https://github.com/rundeck/rundeck/pull/8530)
* [Fix: short description not shown for node/workflow steps in workflow step create picker](https://github.com/rundeck/rundeck/pull/8526)
* [Fix SSO settings reloading](https://github.com/rundeck/rundeck/pull/8525)
* [Runner UI fixes in support of the feature in rundeckpro](https://github.com/rundeck/rundeck/pull/8521)
* [Update Ansible plugin to 3.2.7](https://github.com/rundeck/rundeck/pull/8513)
* [Runner key selector doesn&#39;t list private keys](https://github.com/rundeck/rundeck/pull/8512)
* [Fix: Key Value data log filter unable to capture empty values](https://github.com/rundeck/rundeck/pull/8511)
* [Upgrade jdbc mssql driver](https://github.com/rundeck/rundeck/pull/8487)
* [Fix: Metrics Call Fails in PSQL](https://github.com/rundeck/rundeck/pull/8462)
* [Propagate status result to log filter complete method](https://github.com/rundeck/rundeck/pull/8447)
* [Fix typescript build error](https://github.com/rundeck/rundeck/pull/8414)
* [Vue3 compat build](https://github.com/rundeck/rundeck/pull/8305)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A4.17.0+is%3Aclosed)

## Ansible Plugin Updates
* [Update AnsibleNodeExecutor.java](https://github.com/rundeck-plugins/ansible-plugin/pull/337)

## Enterprise Runner Updates

**Bundled Runner Version:** 0.1.51

## Community Contributors

Submit your own Pull Requests to get recognition here!

* J. Casalino ([thedoc31](https://github.com/thedoc31))
* Rodrigo Borchert ([rodrigoborchert](https://github.com/rodrigoborchert))
* Elio Espinel ([elioe](https://github.com/elioe))
* Lucas Canavosio ([lcanavosio](https://github.com/lcanavosio))
* Simon Cateau ([simon-c-msc](https://github.com/simon-c-msc))


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
* José Ortiz ([JoseOrtiz](https://github.com/JoseOrtiz))
* Leonel Juarez ([L2JE](https://github.com/L2JE))
* Luis Toledo ([ltamaster](https://github.com/ltamaster))
* Osman Albarran ([Oalbarran94](https://github.com/Oalbarran94))
* Rodrigo Navarro ([ronaveva](https://github.com/ronaveva))
* Sarah Martinelli Benedetti ([smartinellibenedetti](https://github.com/smartinellibenedetti))
* Stephen Joyner ([sjrd218](https://github.com/sjrd218))
