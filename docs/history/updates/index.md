---
title: Recent Updates
description: Latest merged changes from the Rundeck development team
date: 2026-01-29T22:39:18.163Z
feed: true
index: true
---

# Recent Updates

Stay up to date with the latest changes and improvements from the Runbook Automation development team.  

This page shows recently merged pull requests from both the Runbook Automation product repository and the open source Rundeck repository merged since the last self-hosted release of [5.18.0](/history/5_x/version-5.18.0.md) on December 16, 2025.

## Recent Changes


#### ::circle-dot:: Implement performance optimization for the Job UI Metrics 


  Significantly improved the performance of Job UI Metrics by introducing batch processing that fetches metrics for all jobs in a single API call instead of making individual requests for each job, reducing page load times from minutes to seconds in projects with many jobs and eliminating timeout issues caused by excessive database queries.

#### ::circle-dot:: Bump Azure Storage Plugin version to 1.0.4 


  Bump aiohttp to 3.13.3 minimum for CVE-2025-69223, CVE-2025-69227, and CVE-2025-69228

#### ::circle-dot:: Update Remco to newer commit that remediates some CVEs  [PR #9936](https://github.com/rundeck/rundeck/pull/9936)


  Enhanced Docker image security by updating Remco (the configuration management tool) to a newer version that remediates three security vulnerabilities (CVE-2025-4673, CVE-2025-22872, and CVE-2025-47906), strengthening the security posture of Rundeck container deployments.

#### ::circle-dot:: Allow executions up to 12 hours for AWS SSM using AssumeRole 


  Enhanced AWS SSM node executor to support execution durations up to 12 hours when using AssumeRole authentication, enabling longer-running operations for cross-account AWS deployments. The system now automatically validates and adjusts timeout values to ensure compliance with AWS service limits, preventing execution failures due to timeout configuration errors.

#### ::circle-dot:: Hashicorp Vault integration modification time issue 


  Fixed an issue where Vault keys displayed incorrect modification and creation timestamps in Rundeck due to missing metadata.

#### ::circle-dot:: Issues with Ansible inline workflow executions where it shows an unwanted output  [PR #9940](https://github.com/rundeck/rundeck/pull/9940)


  Resolved an issue where Ansible inline workflow executions displayed unwanted output by properly sanitizing group names to comply with Ansible requirements, filtering out reserved host attributes that could conflict with Ansible&#39;s internal variables, and ensuring only valid host entries are processed during execution.

#### ::circle-dot:: Promote workflow tab out of alphaUi  [PR #9928](https://github.com/rundeck/rundeck/pull/9928)


  &lt;!-- If you have suggested content that would describe this PR to other Rundeck community users, please enter it here.--&gt;
  Promote workflow tab out from alpha state. The updated ui will be accessible for all users with the nextUi flag enabled.




## Subscribe to Updates

Stay informed about Rundeck development by subscribing to a feed:

- [RSS Feed](https://docs.rundeck.com/docs/feeds/development.xml)
- [Atom Feed](https://docs.rundeck.com/docs/feeds/development-atom.xml)

These feeds are updated regularly to highlight changes that are available in Runbook Automation SaaS and will be included in upcoming Self Hosted releases.

## About These Updates


The development updates are automatically generated from both our private repository for the commercial product and the public open source repository. These changes have been merged since the last GA release and provide insight into what's coming in the next Self Hosted release.

**Note**: These updates reflect changes merged since the last GA release. Self-hosted customers should refer to the [Release Notes](/history/) section for version-specific updates applicable to their installation.

---

**List Last updated:** 2026-01-29


