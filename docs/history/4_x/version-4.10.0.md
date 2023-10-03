---

title: "4.10.0 Release Notes"
date: 2023-02-13
image: /images/chevron-logo-red-on-white.png
feed:
 enable: true
 description: "Version 4.10.0 is here! Check out the new Plugin Group for AWS plugins."

---

# 4.10.0 Release Notes

Name: <span style="color: slategray"><span class="glyphicon glyphicon-tent"></span> "Sphinx slategray tent"</span>
Release Date: February 13, 2023

- [Download the Releases](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/)
- [Watch the Live Stream Release Recap](https://youtu.be/stDTPTNZJNM)

## Overview

::: warning
**Warning**: We have identified a bug in v4.10 and Enterprise Runners which prevents jobs correctly dispatching to the configured project Runner. _We recommend that all customers [upgrade to v4.10.1](version-4.10.1.md)_. 
:::

Check out the new features and enhancements for PagerDuty Process Automation, PagerDuty Runbook Automation, and Rundeck Community included in this release. This release includes enhancements to our AWS plugins. 

View our Twitch stream review of this release live on February 21 at 10 AM Pacific. [Here’s the event link.](https://www.twitch.tv/pagerduty/schedule)

## Process Automation Updates

### Highlights

**Enhanced AWS Plugin Suite Configuration**: We have simplified how users can authenticate and set up the integration with their AWS account by utilizing the new configuration mechanism [launched in 4.9.0](/history/4_x/version-4.9.0.md). Previously, users had to configure their AWS credentials in multiple places within the product - such as for the [AWS Job Steps](/manual/job-plugins.md), the [EC2 Node Source](/manual/projects/resource-model-sources/aws.md), [SSM Node Executor](/manual/projects/node-execution/aws-ssm.md), and [ECS Node Executor](/manual/projects/node-execution/aws-ecs.md). Now, users can define their AWS credentials in a single place - either at a Project or System level - and use all of the AWS plugins instantly.

This new enhanced configuration method also removes the need to define AWS credentials in the project-properties configuration file. Users can access an easy-to-use graphical user interface for defining the requisite properties for the integration, which simplifies the setup for new users and configuring new Projects. Click [here](/manual/plugins/aws-plugins-overview) to see the full documentation.

![AWS Plugin Config](~@assets/img/relnotes-4.10.0-awsplugingroup.png)

### Additional Updates

> Also includes all Open Source updates from below

* Improve No Runner Found error messages
* Upgrade EC2 nodes plugin to support Region setting
* Add Note field to ServiceNow plugins
* Fix: Cannot edit rulesets if the page is too heavy
* No longer require Description in Jira Plugins
* Run-1270: Add Plugin Group support for AWS Suite of plugins

## Rundeck Open Source Product Updates

* [Fix: Cannot remove notifications from a job by loading an XML file](https://github.com/rundeck/rundeck/pull/8118)
* [update ansible plugin to version 3.2.3](https://github.com/rundeck/rundeck/pull/8117)
* [Fix: User profile flash spacing](https://github.com/rundeck/rundeck/pull/8115)
* [Fix: Cannot update jobs after upgrading from 3.3 to 4.8 job (error 500)](https://github.com/rundeck/rundeck/pull/8112)
* [Implementing a component to display runner info in execution page](https://github.com/rundeck/rundeck/pull/8108)
* [Fix: Cannot Add Node Wizard Sources](https://github.com/rundeck/rundeck/pull/8100)
* [Fix: upgrade pywinrm dependancy for shift_jis encoding issue](https://github.com/rundeck/rundeck/pull/8098)
* [Change jaas-loginmodule remco template to be able to use ReloadablePropertyFileLoginModule](https://github.com/rundeck/rundeck/pull/8094)
* [Add UiSocket support for execution log](https://github.com/rundeck/rundeck/pull/8092)
* [Fix: Cannot Edit Job Schedules when Description is set.](https://github.com/rundeck/rundeck/pull/8091)
* [Add a new ExecutionLifecicleComponent](https://github.com/rundeck/rundeck/pull/8083)
* [Fix class name inconsistency in projectHome.gsp](https://github.com/rundeck/rundeck/pull/8082)
* [Update add plugin button label](https://github.com/rundeck/rundeck/pull/8080)
* [Fix: Cannot edit rulesets if the page is too heavy](https://github.com/rundeck/rundeck/pull/8076)
* [Fix &quot;Save node filter&quot; js console error](https://github.com/rundeck/rundeck/pull/8072)
* [Fixes Fix the Http Header Injection Vulnerability](https://github.com/rundeck/rundeck/pull/8070)
* [Fix: edit/view jobs when SCM Import Plugin is forbidden for user](https://github.com/rundeck/rundeck/pull/8047)
* [Fix: deb install using wrong base dir for commands](https://github.com/rundeck/rundeck/pull/8043)
* [Fix: groovy plugins with suffix matching the service should load correctly](https://github.com/rundeck/rundeck/pull/8034)
* [Generate copyright year at build time](https://github.com/rundeck/rundeck/pull/8033)
* [Change jaas-loginmodule remco template to be able to use ReloadablePropertyFileLoginModule](https://github.com/rundeck/rundeck/pull/8018)
* [Fix: Notifications payload format are not imported properly by the API and the UI](https://github.com/rundeck/rundeck/pull/8005)
* [Fix: passing groups via proxy for preauth shows dupe groups in the Rundeck Profile](https://github.com/rundeck/rundeck/pull/7982)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A4.10.0+is%3Aclosed)


## Community Contributors

* Leandro Marques ([leandromqrs](https://github.com/leandromqrs))
* KimDongMin ([haracejacob](https://github.com/haracejacob))
* ([sokato-mdsol](https://github.com/sokato-mdsol))
* Jim Yanko ([jyanko](https://github.com/jyanko))


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
* Jason Qualman ([qualman](https://github.com/qualman))
* Jesus Osuna ([Jesus-Osuna-M](https://github.com/Jesus-Osuna-M))
* Leonel Juarez ([L2JE](https://github.com/L2JE))
* Luis Toledo ([ltamaster](https://github.com/ltamaster))
* Miguel Ramos ([mishingo](https://github.com/mishingo))
* Osman Albarran ([Oalbarran94](https://github.com/Oalbarran94))
* Rodrigo Navarro ([ronaveva](https://github.com/ronaveva))
* Stephen Joyner ([sjrd218](https://github.com/sjrd218))
