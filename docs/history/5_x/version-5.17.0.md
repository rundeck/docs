---

title: "5.17.0 Release Notes"
date: 2025-01-01
image: /images/chevron-logo-red-on-white.png
description: "Rundeck | Runbook Automation Releases <VERSION> <DESCRIPTION>"
feed:
 enable: true
 description: ""

---

# 5.17.0 Release Notes

## Overview

<!-- <VidStack src="youtube/REPLACE" poster="https://img.youtube.com/vi/REPLACE/maxresdefault.jpg"/> -->

## Runbook Automation Updates

> Also includes all Open Source updates from below

### Additional Updates


* Improvement in the create runner endpoint to validate assignedProjects prop format
* Set default runner replica type to manual if not provided in API request
* Improve the nodehealth check cache refresh
* Runner Wizard error creating runner linux+ephemeral
* Allow Script Arguements on GitHub Run Script plugin


## Rundeck Open Source Product Updates

* [OpenAPI doc improvements](https://github.com/rundeck/rundeck/pull/9852)
* [Fix example value in set-project-config documentation](https://github.com/rundeck/rundeck/pull/9851)
* [Clean up println statements from JobAuditApiSpec](https://github.com/rundeck/rundeck/pull/9850)
* [Execution view shows local timezone](https://github.com/rundeck/rundeck/pull/9848)
* [change exec cleanup to hql](https://github.com/rundeck/rundeck/pull/9845)
* [Fix valuelistdelimiter issue when using a | as separator](https://github.com/rundeck/rundeck/pull/9843)
* [Feature/Add Job Creation Date And Last Modified User Audit Tracking To Job Metadata](https://github.com/rundeck/rundeck/pull/9839)
* [Remediate CVE-2025-59952](https://github.com/rundeck/rundeck/pull/9837)
* [Fix CVE-2020-25638](https://github.com/rundeck/rundeck/pull/9824)
* [Add option based filter for jobs activity  ](https://github.com/rundeck/rundeck/pull/9823)
* [Yaml exported job delimiter issue](https://github.com/rundeck/rundeck/pull/9821)
* [Update log4j2.properties.template to add Pre authentication logs](https://github.com/rundeck/rundeck/pull/9820)
* [Fix error on project export using the UI](https://github.com/rundeck/rundeck/pull/9818)
* [Fix button to select deselect all on project export ](https://github.com/rundeck/rundeck/pull/9817)
* [force to load the orchestrator values in the execution object in Job Notification](https://github.com/rundeck/rundeck/pull/9811)
* [Error Saving config: Undefined immediately after adding Node Source](https://github.com/rundeck/rundeck/pull/9797)
* [Convert Job File Upload form to Vue](https://github.com/rundeck/rundeck/pull/9791)
* [Job Import: skip duplicate option causes 500 error](https://github.com/rundeck/rundeck/pull/9790)
* [Enh/Add logger.cleanup on Remco log4j template](https://github.com/rundeck/rundeck/pull/9770)
* [Add index for retry_execution_id in the execution table](https://github.com/rundeck/rundeck/pull/9750)
* [Add preauthentication logging configs](https://github.com/rundeck/rundeck/pull/9091)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A5.17.0+is%3Aclosed)

## Ansible Plugin Updates
* [CVE Fixes](https://github.com/rundeck-plugins/ansible-plugin/pull/418)
* [Add centralized Snyk security scanning](https://github.com/rundeck-plugins/ansible-plugin/pull/416)




## Links

- Download the Releases: [Open Source](https://www.rundeck.com/community-downloads/5.17.0) | [Self-Hosted](https://www.rundeck.com/enterprise-downloads/5.17.0)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/index.md)
- [Catch us on LinkedIn for the Live Stream Release Videos](https://www.linkedin.com/company/pagerduty/events)

## Version Info

Name: <span style="color: sandybrown"><span class="glyphicon glyphicon-flag"></span> "Mont Blanc sandybrown flag"</span>

Release Date: PUTADATEHERE


## Community Contributors

Submit your own Pull Requests to get recognition here!

*  ([jayas006](https://github.com/jayas006))
* Eduardo Baltra ([edbaltra](https://github.com/edbaltra))
* J. Casalino ([thedoc31](https://github.com/thedoc31))
* Takafumi Noguchi ([tknog-pd](https://github.com/tknog-pd))


## Staff Contributors

* Greg Schueler ([gschueler](https://github.com/gschueler))
* Carlos Eduardo ([carlosrfranco](https://github.com/carlosrfranco))
* Eduardo Baltra ([edbaltra](https://github.com/edbaltra))
* Forrest Evans ([fdevans](https://github.com/fdevans))
* Jake Cohen ([jsboak](https://github.com/jsboak))
* Jaya Singh ([jayas006](https://github.com/jayas006))
* Jason Brooks ([jbrookspd](https://github.com/jbrookspd))
* Jesus Osuna ([Jesus-Osuna-M](https://github.com/Jesus-Osuna-M))
* José Vásquez ([hiawvp](https://github.com/hiawvp))
* Luis Toledo ([ltamaster](https://github.com/ltamaster))
* Rodrigo Navarro ([ronaveva](https://github.com/ronaveva))
* Sarah Martinelli Benedetti ([smartinellibenedetti](https://github.com/smartinellibenedetti))