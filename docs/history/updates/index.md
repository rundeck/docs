---
title: Recent Updates
description: Latest merged changes from the Rundeck development team
date: 2026-06-04T13:50:01.047Z
feed: true
index: true
---

# Recent Updates

Stay up to date with the latest changes and improvements from the Runbook Automation development team.  

This page shows recently merged pull requests from both the Runbook Automation product repository and the open source Rundeck repository merged since the last self-hosted release of [5.20.1](/history/5_x/version-5.20.1.md) on May 4, 2026.

## Recent Changes


#### ::circle-dot:: Fix cluster member state showing as unknown on Job page  [PR #10172](https://github.com/rundeck/rundeck/pull/10172)


#### ::circle-dot:: Fix cron expression selector not updating in Execution History Clean  [PR #10154](https://github.com/rundeck/rundeck/pull/10154)


  Fix cron expression selector in Project Settings &gt; Execution History Clean. Selecting a predefined cron option now correctly updates the schedule input field.

  [RUN-4291]: https://pagerduty.atlassian.net/browse/RUN-4291?atlOrigin=eyJpIjoiNWRkNTljNzYxNjVmNDY3MDlhMDU5Y2ZhYzA5YTRkZjUiLCJwIjoiZ2l0aHViLWNvbS1KU1cifQ

#### ::circle-dot:: Fix search not working in User Management tables 


  Fix User Management search — typing in the search box in the User Classes, Manage Local Users, and Manage Local Groups tabs now correctly filters rows by all searchable columns, including User Class name and Group Name.

#### ::circle-dot:: Restore step property value colors for dark background contexts  [PR #10153](https://github.com/rundeck/rundeck/pull/10153)


  Fixed a regression in 5.20.0 where step configuration property values in the workflow editor step cards appeared invisible or hard to read due to dark color overrides that conflicted with the dark-background step list UI. Values now render in the original readable green color (Bootstrap `text-success`) as in previous versions.

  [RUN-4404]: https://pagerduty.atlassian.net/browse/RUN-4404?atlOrigin=eyJpIjoiNWRkNTljNzYxNjVmNDY3MDlhMDU5Y2ZhYzA5YTRkZjUiLCJwIjoiZ2l0aHViLWNvbS1KU1cifQ

#### ::circle-dot:: Improve Dutch translations to be better understandable - Community Submission  [PR #10164](https://github.com/rundeck/rundeck/pull/10164)


  Community Submission from @TheSander562.  Enhancement for dutch speaking people so the words and sentences makes sense when reading them in Rundeck.

#### ::circle-dot:: Update follow-redirects for CVE-2026-40895  [PR #10169](https://github.com/rundeck/rundeck/pull/10169)


  Updates the follow-redirects dependency to version 1.16.0 to address security vulnerability CVE-2026-40895.

#### ::circle-dot:: Update commons-compress to 1.28.0 to fix CVE-2025-48924  [PR #10165](https://github.com/rundeck/rundeck/pull/10165)


  Updated Apache Commons Compress to version 1.28.0 to address CVE-2025-48924, which resolves a vulnerability in the transitively included commons-lang3 dependency.

#### ::circle-dot:: Fix/add created by field  [PR #10150](https://github.com/rundeck/rundeck/pull/10150)


  Job creation tracking now permanently preserves the original job creator&#39;s identity. When viewing job details, you&#39;ll see who originally created the job, even if the job has been modified by other users over time. This enhancement improves audit trails and accountability by ensuring the original creator information is never lost during job updates or imports.

#### ::circle-dot:: Conditional step with multiple sub-steps breaks job output  [PR #10140](https://github.com/rundeck/rundeck/pull/10140)


  This fixes some issues with the Job Output view when there are multiple sub steps in a Conditional Step.

#### ::circle-dot:: Make script editor min/max lines configurable via System Configuration  [PR #10137](https://github.com/rundeck/rundeck/pull/10137)


#### ::circle-dot:: Remove Community News Subscribe Button  [PR #10148](https://github.com/rundeck/rundeck/pull/10148)


  The news subscribe button has been removed as a product feature.  You can sign up for Release Notes emails at https://www.rundeck.com/release-notes-signup or join us in the [community forums](https://community.pagerduty.com/).

#### ::circle-dot:: Make UUID field read-only in job Other tab  [PR #10146](https://github.com/rundeck/rundeck/pull/10146)


  UUID is no longer be editable on Jobs Other tab

#### ::circle-dot:: NextUI: Vue migration for User and System Configuration menus  [PR #9899](https://github.com/rundeck/rundeck/pull/9899)


#### ::circle-dot:: Eliminate Jasypt dependency and upgrade BouncyCastle to 1.84  [PR #10094](https://github.com/rundeck/rundeck/pull/10094)


  Rundeck&#39;s storage encryption has been upgraded to use modern AES-256-GCM authenticated encryption, replacing the legacy Jasypt library and resolving security vulnerability CVE-2026-5588 by upgrading BouncyCastle to version 1.84. This enhancement provides stronger encryption for stored credentials and keys while maintaining full backward compatibility—existing encrypted data continues to work and is automatically migrated to the new encryption format when next updated, requiring no manual intervention or downtime.

#### ::circle-dot:: Upgrade mina-core to 2.2.7 to fix CVE-2026-42779  [PR #10118](https://github.com/rundeck/rundeck/pull/10118)





## Subscribe to Updates

Stay informed about Rundeck development by subscribing to a feed:

- [RSS Feed](https://docs.rundeck.com/docs/feeds/development.xml)
- [Atom Feed](https://docs.rundeck.com/docs/feeds/development-atom.xml)

These feeds are updated regularly to highlight changes that are available in Runbook Automation SaaS and will be included in upcoming Self Hosted releases.

## About These Updates


The development updates are automatically generated from both our private repository for the commercial product and the public open source repository. These changes have been merged since the last GA release and provide insight into what's coming in the next Self Hosted release.

**Note**: These updates reflect changes merged since the last GA release. Self-hosted customers should refer to the [Release Notes](/history/) section for version-specific updates applicable to their installation.

---

**List Last updated:** 2026-06-04


