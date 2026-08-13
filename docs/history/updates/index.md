---
title: Recent Updates
description: Latest merged changes from the Rundeck development team
date: 2026-08-13T20:00:48.867Z
feed: true
index: true
---

# Recent Updates

Stay up to date with the latest changes and improvements from the Runbook Automation development team.  

This page shows recently merged pull requests from both the Runbook Automation product repository and the open source Rundeck repository merged since the last self-hosted release of [6.1.0](/history/6_x/version-6.1.0.md) on August 3, 2026.

## Recent Changes


#### ::circle-dot:: Publish rundeckpro Docker images as multi-platform (linux/amd64 + linux/arm64) 


  &lt;!-- CI/build-only change, no user-facing runtime behavior change until images are actually published multi-arch. Not marked for release notes. --&gt;

#### ::circle-dot:: Enforce project-level authorization on execution metrics API  [PR #10419](https://github.com/rundeck/rundeck/pull/10419)


  The execution metrics API (`/executions/metrics`) now enforces project-level authorization: metrics are only returned for projects the requesting user is authorized to read.

#### ::circle-dot:: Fix Remote URL option Auth Type lost after saving and reopening job  [PR #10413](https://github.com/rundeck/rundeck/pull/10413)


  Fixed: Remote URL job option&#39;s Auth Type (Bearer Token / Basic / API Key) is now correctly restored when reopening a saved job for editing.

#### ::circle-dot:: SCM: Restore plugin resilience when Git server is temporarily unreachable  [PR #10214](https://github.com/rundeck/rundeck/pull/10214)


  Fixed SCM plugin (git-export/git-import) incorrectly disabling itself when the Git server is temporarily unreachable. The plugin now recovers automatically when connectivity is restored, without requiring manual re-activation, and without repeatedly hammering the Git server during an outage — after fast retries are exhausted it polls once per `scmLoader.slowPoll.interval` (default 60s) instead of giving up. Users will see a clear &quot;Git server unavailable&quot; warning in the UI during outages instead of a stale or missing status. Also adds a configurable fetch/pull timeout for the git plugin (default 30s) to prevent a hung remote from blocking indefinitely.

#### ::circle-dot:: Allow Java 21 and 25 in preinst.sh version check  [PR #10410](https://github.com/rundeck/rundeck/pull/10410)


  Fixed RPM installation failing on hosts running Java 21 or 25 because the installer incorrectly rejected those JVM versions. The RPM pre-install check now accepts Java 17, 21, and 25, matching Rundeck&#39;s documented system requirements and allowing installation on newer Linux distributions such as RHEL/Rocky Linux 10 that no longer ship Java 17.

#### ::circle-dot:: Fix blackout calendar ignoring non-GMT schedule TimeZone 


  Fixed an issue where blackout (and allowed) calendars defined with a specific date or date range ignored the schedule&#39;s configured time zone and used the server&#39;s default time zone instead. On non-GMT schedules this caused the blackout to apply to the wrong calendar day, so jobs could run during a window that was supposed to block them. Blackout and allowed date/range calendars now correctly honor the schedule&#39;s time zone. Recurring daily, weekly, and monthly calendars were not affected.

#### ::circle-dot:: Migrate cloud-aws-plugins EC2/ECS/RDS/Lambda from AWS SDK v1 to v2 


  Updated the EC2, ECS, RDS, and Lambda AWS plugins to use AWS SDK v2, with no changes to plugin configuration. Assume-role authentication now automatically refreshes credentials, preventing expired-token failures on long-running jobs after about one hour. Also fixed the ECS &quot;Stopped Task Details&quot; step ignoring a configured access key, and updated the Lambda runtime list.




## Subscribe to Updates

Stay informed about Rundeck development by subscribing to a feed:

- [RSS Feed](https://docs.rundeck.com/docs/feeds/development.xml)
- [Atom Feed](https://docs.rundeck.com/docs/feeds/development-atom.xml)

These feeds are updated regularly to highlight changes that are available in Runbook Automation SaaS and will be included in upcoming Self Hosted releases.

## About These Updates


The development updates are automatically generated from both our private repository for the commercial product and the public open source repository. These changes have been merged since the last GA release and provide insight into what's coming in the next Self Hosted release.

**Note**: These updates reflect changes merged since the last GA release. Self-hosted customers should refer to the [Release Notes](/history/) section for version-specific updates applicable to their installation.

---

**List Last updated:** 2026-08-13


