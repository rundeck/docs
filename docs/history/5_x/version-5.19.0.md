---

title: "5.19.0 Release Notes"
date: 2026-02-02
image: /images/chevron-logo-red-on-white.png
description: "Rundeck | Runbook Automation 5.19.0 release with Ansible output fixes, Vault timestamp corrections, extended AWS SSM timeouts, Azure storage security updates, and faster Job UI metrics."
feed:
 enable: true
 description: "Rundeck | Runbook Automation 5.19.0 release with Ansible output fixes, Vault timestamp corrections, extended AWS SSM timeouts, Azure storage security updates, and faster Job UI metrics."

---

# 5.19.0 Release Notes

## Overview

This release focuses on stability, performance, and security improvements across the platform. Key updates include enhanced AWS SSM execution timeouts (up to 12 hours), significant Job UI Metrics performance optimizations, and fixes for Ansible workflow output handling and Vault timestamp issues. Security updates address multiple CVEs in the Azure Storage plugin and Docker image dependencies.

<VidStack src="youtube/YXidHZOdR1M" poster="https://img.youtube.com/vi/YXidHZOdR1M/maxresdefault.jpg"/>

## Runbook Automation Updates

##### ::circle-dot:: Hashicorp Vault integration modification time issue
  
Fixed an issue where Vault keys displayed incorrect modification and creation timestamps in Rundeck due to missing metadata.

##### ::circle-dot:: Allow executions up to 12 hours for AWS SSM using AssumeRole
  
Enhanced AWS SSM node executor to support execution durations up to 12 hours when using AssumeRole authentication, enabling longer-running operations for cross-account AWS deployments. The system now automatically validates and adjusts timeout values to ensure compliance with AWS service limits, preventing execution failures due to timeout configuration errors.

##### ::circle-dot:: Bump Azure Storage Plugin version to 1.0.4
  
Bump aiohttp to 3.13.3 minimum for CVE-2025-69223, CVE-2025-69227, and CVE-2025-69228

##### ::circle-dot:: Implement performance optimization for the Job UI Metrics 
  
Significantly improved the performance of Job UI Metrics by introducing batch processing that fetches metrics for all jobs in a single API call instead of making individual requests for each job, reducing page load times from minutes to seconds in projects with many jobs and eliminating timeout issues caused by excessive database queries.


## Rundeck Open Source Product Updates

#####  ::circle-dot:: [Update Remco to newer commit that remediates some CVEs](https://github.com/rundeck/rundeck/pull/9936)
  
Enhanced Docker image security by updating Remco (the configuration management tool) to a newer version that remediates three security vulnerabilities (CVE-2025-4673, CVE-2025-22872, and CVE-2025-47906), strengthening the security posture of Rundeck container deployments.

#####  ::circle-dot:: [Promote workflow tab out of alphaUi](https://github.com/rundeck/rundeck/pull/9928)

Promote workflow tab out from alpha state. The updated ui will be accessible for all users with the nextUi flag enabled.

#####  ::circle-dot:: [Issues with Ansible inline workflow executions where it shows an unwanted output](https://github.com/rundeck/rundeck/pull/9940)
  
Resolved an issue where Ansible inline workflow executions displayed unwanted output by properly sanitizing group names to comply with Ansible requirements, filtering out reserved host attributes that could conflict with Ansible&#39;s internal variables, and ensuring only valid host entries are processed during execution.


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A5.19.0+is%3Aclosed)


## Links

- Download the Releases: [Open Source](https://www.rundeck.com/community-downloads/5.19.0) | [Self-Hosted](https://www.rundeck.com/enterprise-downloads/5.19.0)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/index.md)
- [Catch us on LinkedIn for the Live Stream Release Videos](https://www.linkedin.com/company/pagerduty/events)

## Version Info

Name: <span style="color: olivedrab"><span class="glyphicon glyphicon-music"></span> "Olympus olivedrab music"</span>

Release Date: February 2nd, 2026


## Community Contributors

Submit your own Pull Requests to get recognition here!



## Staff Contributors

* Greg Schueler ([gschueler](https://github.com/gschueler))
* Carlos Eduardo ([carlosrfranco](https://github.com/carlosrfranco))
* Eduardo Baltra ([edbaltra](https://github.com/edbaltra))
* Forrest Evans ([fdevans](https://github.com/fdevans))
* Jaime Tobar ([jtobard](https://github.com/jtobard))
* Jake Cohen ([jsboak](https://github.com/jsboak))
* Jaya Singh ([jayas006](https://github.com/jayas006))
* Jesus Osuna ([Jesus-Osuna-M](https://github.com/Jesus-Osuna-M))
* José Vásquez ([hiawvp](https://github.com/hiawvp))
* Luis Toledo ([ltamaster](https://github.com/ltamaster))
* Rodrigo Navarro ([ronaveva](https://github.com/ronaveva))
* Sarah Martinelli Benedetti ([smartinellibenedetti](https://github.com/smartinellibenedetti))