---
title: Recent Updates
description: Latest merged changes from the Rundeck development team
date: 2026-06-24T18:55:04.268Z
feed: true
index: true
---

# Recent Updates

Stay up to date with the latest changes and improvements from the Runbook Automation development team.  

This page shows recently merged pull requests from both the Runbook Automation product repository and the open source Rundeck repository merged since the last self-hosted release of [5.20.1](/history/5_x/version-5.20.1.md) on May 4, 2026.

## Recent Changes


#### ::circle-dot:: Audit failed login attempts when using rundeck.jaaslogin=true  [PR #10212](https://github.com/rundeck/rundeck/pull/10212)


  Fixed: Failed login attempts are now audited when Rundeck is configured with `rundeck.jaaslogin=true`. Previously, JAAS authentication failures were silently dropped from the audit log.


  [RUN-4214]: https://pagerduty.atlassian.net/browse/RUN-4214?atlOrigin=eyJpIjoiNWRkNTljNzYxNjVmNDY3MDlhMDU5Y2ZhYzA5YTRkZjUiLCJwIjoiZ2l0aHViLWNvbS1KU1cifQ

#### ::circle-dot:: Fix inline script step with Args not working with AWS SSM 


  Fixed a bug where inline script steps with `args` configured would fail with an S3 403 error when using the AWS SSM node executor. Script arguments are now correctly passed to the SSM `commandLine` parameter instead of being appended to the S3 URI.

#### ::circle-dot:: Fix cannot manage user class for usernames containing slashes 


  Fix User Class management for usernames containing `/` (e.g. pronouns like `He/Him`). Assigning and removing User Class assignments now works correctly for these users.

#### ::circle-dot:: Fix PagerDuty Notification Start Incident Workflow trigger 


  Fixed an issue where PagerDuty &quot;Start Incident Workflow&quot; notifications failed to trigger because the configured Incident ID and Incident Workflow ID were not being read correctly. These notifications now work as expected, and a clear error is logged if either required value is missing.

#### ::circle-dot:: Fix OIDC login broken after Grails 7: restore ROLE_USER authority 


  Fixed an issue where users were unable to log in through OIDC single sign-on (such as Okta) after upgrading, caused by a change in the underlying Spring Security framework that assigned the wrong default role. OIDC/Okta SSO login now works correctly again, with users receiving the expected `ROLE_USER` access along with their provider group memberships.

#### ::circle-dot:: Fix legacy MySQL JDBC driver class at startup 


  Fixed a startup failure that occurred after upgrading when the database configuration still referenced the legacy MySQL JDBC driver class (`com.mysql.jdbc.Driver` or `com.mysql.cj.jdbc.Driver`). Rundeck now automatically substitutes the bundled MariaDB driver in these cases so the server starts successfully, and logs a warning directing operators to update their configuration.

#### ::circle-dot:: Fix KeyStorageSelector state not resetting on reopen  [PR #10155](https://github.com/rundeck/rundeck/pull/10155)


  Fix PagerDuty V3 webhook: selecting a key from the Key Storage selector now correctly populates the Shared Secret Key field.
  
  
  [RUN-2811]: https://pagerduty.atlassian.net/browse/RUN-2811?atlOrigin=eyJpIjoiNWRkNTljNzYxNjVmNDY3MDlhMDU5Y2ZhYzA5YTRkZjUiLCJwIjoiZ2l0aHViLWNvbS1KU1cifQ

#### ::circle-dot:: Fix job import resetting dispatch mode when node filter is empty  [PR #10171](https://github.com/rundeck/rundeck/pull/10171)


  Fixed an issue where jobs configured as &quot;Dispatch to nodes&quot; with an empty node filter were silently converted to &quot;Execute locally&quot; after export + reimport (via YAML, XML, Job Actions upload, SCM import, project archive import, or Terraform provider).

#### ::circle-dot:: Fix Remote URL auth headers not appended when fetching option values  [PR #10152](https://github.com/rundeck/rundeck/pull/10152)


  Fixed a regression where Remote URL job options configured with API Key or Basic authentication were not sending the configured authentication headers or query parameters when fetching option values, causing the option dropdown to fail to load with an authentication error.


  [RUN-4436]: https://pagerduty.atlassian.net/browse/RUN-4436?atlOrigin=eyJpIjoiNWRkNTljNzYxNjVmNDY3MDlhMDU5Y2ZhYzA5YTRkZjUiLCJwIjoiZ2l0aHViLWNvbS1KU1cifQ

#### ::circle-dot:: remove usernames from system report 


#### ::circle-dot:: fixes bulk edit when using nextui  [PR #10189](https://github.com/rundeck/rundeck/pull/10189)


  Fixed the layout of the bulk edit controls on the Jobs page when using the next-generation UI, correcting the alignment and structure of the header so bulk actions display properly.

#### ::circle-dot:: Fix node filter attributes incorrectly wrapped in double quotes  [PR #10157](https://github.com/rundeck/rundeck/pull/10157)


  Fix node filter: saving a filter with multiple attributes (e.g. `osFamily: unix name:localhost`) no longer incorrectly wraps them in double quotes. Pre-quoted values are also preserved correctly when re-loading a saved filter.
  
  
  [RUN-3050]: https://pagerduty.atlassian.net/browse/RUN-3050?atlOrigin=eyJpIjoiNWRkNTljNzYxNjVmNDY3MDlhMDU5Y2ZhYzA5YTRkZjUiLCJwIjoiZ2l0aHViLWNvbS1KU1cifQ

#### ::circle-dot:: Improve audit log userInfo.username showing null or anonymous for job runs  [PR #10168](https://github.com/rundeck/rundeck/pull/10168)


  Fix audit log `userInfo.username` for job run events. Scheduled jobs no longer show `null` and API/webhook-triggered jobs no longer show `__grails.anonymous.user__` — both now correctly reflect the user associated with the execution.


  [RUN-3774]: https://pagerduty.atlassian.net/browse/RUN-3774?atlOrigin=eyJpIjoiNWRkNTljNzYxNjVmNDY3MDlhMDU5Y2ZhYzA5YTRkZjUiLCJwIjoiZ2l0aHViLWNvbS1KU1cifQ

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

**List Last updated:** 2026-06-24


