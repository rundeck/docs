---

title: "4.17.2 Release Notes"
date: ""
image: /images/chevron-logo-red-on-white.png
feed:
 enable: true
 description: ""

---

# 4.17.2 Release Notes

Name: <span style="color: turquoise"><span class="glyphicon glyphicon-gift"></span> "Basilisk turquoise gift"</span>
Release Date: PUTADATEHERE

- [Download the Releases](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/)

## Overview

Check out the new features and enhancements for PagerDuty Process Automation (formerly Rundeck Enterprise) and PagerDuty Runbook Automation and Rundeck Community included in this release.

## Process Automation Updates

> Also includes all Open Source updates from below

### Highlights

- first highlight
- second highlight

### Additional Updates


* S3 Log Import Issue in Clustered Environments.
* Fix: Switch to active mode with remote execution enabled kills all &quot;run job later&quot; executions
* Add assumeRoleArn property to ECS Node Source plugin and ECS Node Step plugins
* Fix: ServiceNow Quick filter not pulling all nodes after 4.17
* Azure group source plugin fix: avoid including null in groups result
* Webhook Debug Activity Not showing up in 4.17
* Fix: Performance issues - HealthStatus Node Enhancer


## Rundeck Open Source Product Updates

* [Upgrade Ansible plugin to 3.2.8](https://github.com/rundeck/rundeck/pull/8644)
* [Fix AVERAGE_DURATION_EXCEEDED execution status when using API](https://github.com/rundeck/rundeck/pull/8635)
* [Fix: Scheduled Editor not showing helper messages](https://github.com/rundeck/rundeck/pull/8630)
* [Improve Project config plugin validation issue from API request](https://github.com/rundeck/rundeck/pull/8624)
* [Update snakeyaml usage to be forward compatible with snakeyaml 2.0](https://github.com/rundeck/rundeck/pull/8621)
* [Avoid NPE if UserGroupSourcePlugin returns a null entry](https://github.com/rundeck/rundeck/pull/8618)
* [Fix exception in job start can cause system logs to stop](https://github.com/rundeck/rundeck/pull/8611)
* [Fix: flickering execution log view](https://github.com/rundeck/rundeck/pull/8609)
* [Fix Project Component Export](https://github.com/rundeck/rundeck/pull/8607)
* [Fix: Adjust infomation on 500 error page and replace with SpaceCat](https://github.com/rundeck/rundeck/pull/8588)
* [Fix: not importing logs from s3logstore](https://github.com/rundeck/rundeck/pull/8583)
* [Fix: node step with workflow error handler missing top level step state](https://github.com/rundeck/rundeck/pull/8494)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A4.17.2+is%3Aclosed)

## Ansible Plugin Updates
* [Ansible Playbook Inline Workflow step couldn&#39;t run in a node dispatched from a Remote Runner](https://github.com/rundeck-plugins/ansible-plugin/pull/344)


## Enterprise Runner Updates

**Bundled Runner Version:** 0.1.53


## Community Contributors

Submit your own Pull Requests to get recognition here!

* Connor McBrine-Ellis ([mcbrineellis](https://github.com/mcbrineellis))
* Reiner ([MegaDrive68k](https://github.com/MegaDrive68k))
* Bruno Dias ([brmdias](https://github.com/brmdias))
* Tiago Barbosa ([t1agob](https://github.com/t1agob))

**[Terraform Provider](https://github.com/rundeck/terraform-provider-rundeck) Contributions** (Cathcing up on these... If we missed anyone please let us know)

* Nathan Neulinger ([nneul](https://github.com/nnuel))
* Sander Descamps ([sanderdescamps](https://github.com/sanderdescamps))
* Oliver Borchertborchero ([borchero](https://github.com/borchero))
* Chris M ([tebriel](https://github.com/tebriel))
* Søren Mathiasen ([sorenmat](https://github.com/sorenmat))
* Dmitriy Kostikov ([rumatavz](https://github.com/rumatavz))
* Daniel B ([dbrowneihg](https://github.com/dbrowneihg))
* Stéphane Bruckert ([stephanebruckert](https://github.com/stephanebruckert))
* Adam Brett ([adambrett](https://github.com/adambrett))



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
