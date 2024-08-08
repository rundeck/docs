---

title: "5.5.0 Release Notes"
date: 2024-08-08
image: /images/chevron-logo-red-on-white.png
feed:
 enable: true
 description: ""

---

# 5.5.0 Release Notes

Name: <span style="color: orchid"><span class="glyphicon glyphicon-tower"></span> "Fairweather orchid tower"</span>
Release Date: August 8th, 2024

- [Download the Releases](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/)
- [Catch us on Twitch for the Live Stream Release Video](https://www.twitch.tv/pagerduty)

## Overview

Check out the new features and enhancements for PagerDuty Runbook Automation commercial offerings and Rundeck Community included in this release.

### Highlights

#### Automatic Runner Selection for Job Execution
The Enterprise Runner is most commonly used to dispatch automation to nodes within environments that are not directly accessible by Runbook Automation (cloud or self hosted).  With this latest enhancement, users can assign subsets of their node inventory to each Runner so that the Runners used for Job execution are dynamically selected.  This reduces the complexity of Job authoring and enables customers to target multiple environments with a single Job execution.

Full documentation on the Runner’s Remote Node Dispatch can be found [here](/administration/runner/runner-management/node-dispatch.html).

#### Runners as Nodes
There are many cases where users need to execute automation tasks on the Runner’s host.  A frequent example of this includes retrieving an artifact, script, or Ansible playbook from Git.  It is also common for customers with a physically distributed footprint - such as in retail, hospitality, or food & beverage - to place a single Runner in each location and then target each location with automation.  Previously, the configuration and execution of automation for these use-cases was complex and non-intuitive.

With this release, Runner’s hosts are natively added as nodes to the Node Inventory and can be targeted with automation. This reduces the time to set up your Project for automation and simplifies the Job creation and execution. Full documentation on the Runners as Nodes can be found [here](/administration/runner/runner-management/node-dispatch.html).


## Runbook Automation Updates

> Also includes all Open Source updates from below

### Additional Updates


* Resource Model Runner filter is not displayed as expected
* PagerDuty webhook plugin should return 400 on mismatched signature instead of 500
* Fix: Runner - Cyberark Key Storage Plugin Doesn&#39;t Work with CCP Mde


## Rundeck Open Source Product Updates

* [Fix report delete by execution ID](https://github.com/rundeck/rundeck/pull/9259)
* [Look up execution by id if uuid not in report](https://github.com/rundeck/rundeck/pull/9257)
* [Fix for group selection on old UI](https://github.com/rundeck/rundeck/pull/9249)
* [Add runner acl admin permissions in docker image](https://github.com/rundeck/rundeck/pull/9242)
* [Moves requestId interface to core module.](https://github.com/rundeck/rundeck/pull/9239)
* [Fix typescript issues to use NodeTable and NodeFilterInput components in another enterprise component](https://github.com/rundeck/rundeck/pull/9235)
* [Improve validation of project archive import](https://github.com/rundeck/rundeck/pull/9232)
* [Fix get reports](https://github.com/rundeck/rundeck/pull/9231)
* [Fix node filter input text not showing in execute job modal](https://github.com/rundeck/rundeck/pull/9224)
* [Upgrade ansible plugin to 4.0.4](https://github.com/rundeck/rundeck/pull/9223)
* [Bring in uiv translations](https://github.com/rundeck/rundeck/pull/9220)
* [Add JMX metrics for Authorization Success and Fail](https://github.com/rundeck/rundeck/pull/9219)
* [Convert details tab to vue](https://github.com/rundeck/rundeck/pull/9217)
* [Add JMX metrics for to track user login and logout](https://github.com/rundeck/rundeck/pull/9215)
* [Jobs scheduled at Project level continue to run when disabled by a Not Owner cluster member](https://github.com/rundeck/rundeck/pull/9214)
* [Move SSHJ and JSCH functional executor tests to core](https://github.com/rundeck/rundeck/pull/9212)
* [Initial request id support](https://github.com/rundeck/rundeck/pull/9210)
* [Fix API calls returning 500 where 400 is more appropriate](https://github.com/rundeck/rundeck/pull/9208)
* [Add JMX metric that reports the quartz thread pool size](https://github.com/rundeck/rundeck/pull/9203)
* [: Add isConfigured check to the StoragePlugin](https://github.com/rundeck/rundeck/pull/9200)
* [Add jetty jmx metrics](https://github.com/rundeck/rundeck/pull/9191)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A5.5.0+is%3Aclosed)

## Ansible Plugin Updates
* [Error using new ansible inventory list with empty inventory (defined in ansible.cfg)](https://github.com/rundeck-plugins/ansible-plugin/pull/383)
* [Enh: Added yaml data size parameter at model source](https://github.com/rundeck-plugins/ansible-plugin/pull/382)
* [Fix: Ansible model source - limit error](https://github.com/rundeck-plugins/ansible-plugin/pull/378)
* [Fix: Ansible model source - limit error](https://github.com/rundeck-plugins/ansible-plugin/pull/377)
* [add a functional test for larges inventories](https://github.com/rundeck-plugins/ansible-plugin/pull/376)
* [fix when master password configured](https://github.com/rundeck-plugins/ansible-plugin/pull/375)




## Community Contributors

Submit your own Pull Requests to get recognition here!

* Ginfranco Groppo ([gian4820](https://github.com/gian4820))
* Oswaldo Peralta ([runwaldo](https://github.com/runwaldo))


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
