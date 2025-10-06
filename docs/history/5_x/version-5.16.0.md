---

title: "5.16.0 Release Notes"
date: 2025-10-06
image: /images/chevron-logo-red-on-white.png
description: "Rundeck | Runbook Automation Releases 5.16.0 | Major Enterprise Runners update"
feed:
 enable: true
 description: "Runner Replicas is available!"

---

# 5.16.0 Release Notes

## Overview

### Runner Replicas
Runner Replicas transforms Enterprise Runners from single points of execution into distributed, fault-tolerant services by enabling multiple Runner instances - referred to as Replicas - to operate as a unified logical unit. 
Administrators can now deploy multiple Replicas of the same Runner across different hosts - either virtual machines or containers. Intelligent load balancing distributes job executions across healthy replicas while maintaining execution affinity for jobs that require filesystem consistency. 
<br>![Replicas](/assets/img/us-west-replicas.png)
This enhancement eliminates single points of failure in the automation infrastructure, provides horizontal scalability for high-demand scenarios, and enables zero-downtime maintenance for patching, upgrading, or restarting individual Replica hosts while other Replicas seamlessly handle the workload, ultimately delivering the reliability and scale that mission-critical automation workflows demand.

## Runbook Automation Updates


### Additional Updates


* Fixes for CVE-2020-26939
* Bundle the new S3 plugins into rundeckpro


## Rundeck Open Source Product Updates

* [Add job creation time to API v55+ responses](https://github.com/rundeck/rundeck/pull/9808)
* [separated query from the Run Later Job for the Job Takeover process](https://github.com/rundeck/rundeck/pull/9805)
* [Update selenium driver](https://github.com/rundeck/rundeck/pull/9793)
* [Update NPM packages for renovate](https://github.com/rundeck/rundeck/pull/9792)
* [Exclude CVE-2025-41242](https://github.com/rundeck/rundeck/pull/9788)
* [Bump kotlin in testRuntime for CVE-2020-29582](https://github.com/rundeck/rundeck/pull/9733)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A5.16.0+is%3Aclosed)

## Ansible Plugin Updates




## Links

- Download the Releases: [Open Source](https://www.rundeck.com/community-downloads/5.16.0) | [Self-Hosted](https://www.rundeck.com/enterprise-downloads/5.16.0)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/index.md)
- [Catch us on LinkedIn for the Live Stream Release Videos](https://www.linkedin.com/company/pagerduty/events)

## Version Info

Name: <span style="color: palevioletred"><span class="glyphicon glyphicon-book"></span> "Mauna Kea palevioletred book"</span>

Release Date: October 6th, 2025


## Community Contributors

Submit your own Pull Requests to get recognition here!

* Takafumi Noguchi ([tknog-pd](https://github.com/tknog-pd))
* JP Lassnibatt ([jplassnibatt](https://github.com/jplassnibatt))


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