---

title: "4.13.0 Release Notes"
date: 2023-05-15
image: /images/chevron-logo-red-on-white.png
feed:
  description: "Plugins and Ad-Hoc Commands on the Enterprise Runner, plus more Plugin enhancements."

---

# 4.13.0 Release Notes

Name: <span style="color: red"><span class="glyphicon glyphicon-headphones"></span> "Wyvern red headphones"</span>
Release Date: May 15th, 2023

- [Download the Releases](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/)
- [Watch the Live Stream Release Recap](https://youtu.be/e6Rs9BRljAA)

<VidStack src="youtube/e6Rs9BRljAA"/>

## Overview

Check out the new features and enhancements for PagerDuty Runbook Automation, and Rundeck Community included in this release. This release includes enhancements to the [Enterprise Runner](/administration/runner/), the SSM Node Executor plugins, and a new plugin suite. See below for the full release highlights.

View our [Twitch stream review](https://www.twitch.tv/pdcommunity) of this release live on May 16. 

## Highlights

* **Plugins on Enterprise Runner:** The [Enterprise Runner](/administration/runner/#enterprise-runner-overview) is used to automate tasks in secure, remote environments. With this latest release, the SQL Run Command, Github Run Script, VMware Node Steps, and File Transfer plugins have been added to the Runner’s capabilities. These additions enable users to more quickly author automation for their remote environments by using plugins instead of scripts and commands.
* **Ad-hoc commands through Runner:** There are cases when it is useful to quickly run on-demand commands to a selection of nodes - such as checking package version information or tmp directory files. Ad-hoc commands can now be run through the Enterprise Runner, allowing users to specify a Runner to execute commands on one or multiple nodes. This helps with both ad-hoc tasks as well as improving the setup and testing experience of the Enterprise Runner.
* **SSM across multiple AWS accounts:** The [AWS Systems Manager plugins](/manual/projects/node-execution/aws-ssm.md#aws-systems-manager-ssm-node-executor-plugins) enable users to execute commands and scripts across their EC2 instances and ECS containers. Users can now orchestrate automation across all of their AWS accounts from a single project, reducing time and potential for human error for critical tasks. Read the [technical How To article](/learning/howto/cross-account-aws-ssm.md) to learn more.
* **Sensu Plugin Suite:** The new Sensu plugin suite makes it easier for users to set up and manage the integration between Runbook Automation and Sensu.  Whereas before users would have to configure the properties for the integration of the Project or Framework configuration file, this can now be configured in the Plugin Suite user-interface (see below).

### Security Updates

* Upgrade to spring 5.3.27 as required by [CVE-2023-20863](https://github.com/advisories/GHSA-wxqc-pxw9-g2p8)
* Upgrade spring-security to 5.8.3 as required by [CVE-2023-20862](https://github.com/advisories/GHSA-x873-6rgc-94jc)

### Additional Enterprise Updates

* Cross account AWS SSM Enhancement
* Fix: Display Server Name in Cluster Manager
* Add Sensu Plugin Group


## Rundeck Open Source Product Updates

* [Correct loading indicator text](https://github.com/rundeck/rundeck/pull/8312)
* [Update to jackson 2.15.0](https://github.com/rundeck/rundeck/pull/8307)
* [Sets SameSite cookie policy to Lax as default to allow OAuth2 SSO flows](https://github.com/rundeck/rundeck/pull/8301)
* [Upgrade spring-security to 5.8.3](https://github.com/rundeck/rundeck/pull/8297)
* [PluginGroups Feature Flag Defaults to true](https://github.com/rundeck/rundeck/pull/8294)
* [Fix: Exception handling in job validation with queue+secureOpts](https://github.com/rundeck/rundeck/pull/8283)
* [Fix: Updated vue-moment dependency to latest moment version](https://github.com/rundeck/rundeck/pull/8280)
* [Upgrade spring-core CVE-2023-20863](https://github.com/rundeck/rundeck/pull/8270)
* [Fix: Misplaced SCM Tooltip on Job Show](https://github.com/rundeck/rundeck/pull/8264)
* [Fix: Remove WARN message in service.log related to SSO](https://github.com/rundeck/rundeck/pull/8261)
* [Fix: NPE Job Retry with No Failed Nodes](https://github.com/rundeck/rundeck/pull/8232)
* [Fix: Remove Webhook Debug Data](https://github.com/rundeck/rundeck/pull/8227)
* [Fix: Job definition load does not preserve option value ordering](https://github.com/rundeck/rundeck/pull/8223)
* [RES-288: SCM plugin does not release .pack files from ScmExport folder](https://github.com/rundeck/rundeck/pull/8171)
* [Enh: add multiple node wizard sources](https://github.com/rundeck/rundeck/pull/8170)
* [Fix: Enable schedules from project settings don&#39;t work as expected in clustermode](https://github.com/rundeck/rundeck/pull/8169)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A4.13.0+is%3Aclosed)


## Community Contributors

Submit your own Pull Requests to get recognition here!

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
