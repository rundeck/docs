---

title: "6.1.0 Release Notes"
date: 2026-07-31
image: /images/chevron-logo-red-on-white.png
description: "Rundeck | Runbook Automation Releases 6.1.0 - <DESCRIPTION>"
feed:
 enable: true
 description: ""

---

# 6.1.0 Release Notes

## Overview

<!-- <VidStack src="youtube/REPLACE" poster="https://img.youtube.com/vi/REPLACE/maxresdefault.jpg"/> -->

## Runbook Automation Updates

##### ::circle-dot:: Fix legacy MySQL JDBC driver class at startup
  
Fixed a startup failure that occurred after upgrading when the database configuration still referenced the legacy MySQL JDBC driver class (`com.mysql.jdbc.Driver` or `com.mysql.cj.jdbc.Driver`). Rundeck now automatically substitutes the bundled MariaDB driver in these cases so the server starts successfully, and logs a warning directing operators to update their configuration.

##### ::circle-dot:: Remove usernames from System Report
  
The System Report no longer includes individual usernames or their userclass mappings. This improves privacy by ensuring user identities are not captured in generated system reports, while license allocation and usage totals continue to be reported.

##### ::circle-dot:: Fix OIDC login broken after Grails 7: restore ROLE_USER authority
  
Fixed an issue where users were unable to log in through OIDC single sign-on (such as Okta) after upgrading, caused by a change in the underlying Spring Security framework that assigned the wrong default role. OIDC/Okta SSO login now works correctly again, with users receiving the expected `ROLE_USER` access along with their provider group memberships.

##### ::circle-dot:: Add Configurable Group Name Attribute And Prefix Filter To Azure Group
  
The Azure (Entra ID) user group source can now be configured to use a specific directory attribute as the Rundeck group name (for example, `onPremisesSamAccountName` instead of the default `displayName`), and to optionally include only groups matching a name prefix. This lets administrators align group names between sign-in tokens and directory lookups—eliminating the need to maintain duplicate group names in ACLs—while existing configurations continue to behave exactly as before.

##### ::circle-dot:: Fix PagerDuty Notification Start Incident Workflow trigger
  
Fixed an issue where PagerDuty &quot;Start Incident Workflow&quot; notifications failed to trigger because the configured Incident ID and Incident Workflow ID were not being read correctly. These notifications now work as expected, and a clear error is logged if either required value is missing.

##### ::circle-dot:: Fix cannot manage user class for usernames containing slashes
  
Fix User Class management for usernames containing `/` (e.g. pronouns like `He/Him`). Assigning and removing User Class assignments now works correctly for these users.

##### ::circle-dot:: Fix inline script step with Args not working with AWS SSM
  
Fixed a bug where inline script steps with `args` configured would fail with an S3 403 error when using the AWS SSM node executor. Script arguments are now correctly passed to the SSM `commandLine` parameter instead of being appended to the S3 URI.

##### ::circle-dot:: Fix Jira plugin createmeta fallback for Jira Cloud team-managed projects
  
Fixed Jira issue creation failing on Jira Cloud team-managed projects with a &quot;Failed to find issue type&quot; error even when the issue type existed. Both the Jira &quot;Create Issue&quot; workflow/job step and the Jira issue-creation notification now fall back to a supported issue-type lookup so issues are created successfully in these projects, while behavior for Jira Server / Data Center is unchanged.

##### ::circle-dot:: Fix SSM Node Executor to use regional STS endpoints for opt-in regions
  
Fixed an issue where AWS SSM node command and script execution failed in opt-in regions (such as `eu-central-2`) when using cross-account role assumption, previously returning an `InvalidClientTokenId` error. A new optional `ssm-sts-region` setting also lets operators choose which region&#39;s STS endpoint is used for authentication, while existing configurations continue to work unchanged.

##### ::circle-dot:: Fix AWS Secrets Manager assume-role session expiry causing ExpiredTokenException
  
Fixed an issue where the AWS Secrets Manager key storage plugin, when configured with an assume-role ARN, stopped retrieving secrets after about one hour on long-running Rundeck instances and failed with `ExpiredTokenException`. The plugin now automatically refreshes the assumed-role session, so secrets remain accessible without needing to restart Rundeck.

##### ::circle-dot:: Add option to choose what value is used for GCP Resource Model hostname
  
The GCP resource model source now lets you choose which value is used as a discovered node&#39;s hostname—instance name, internal IP, or external IP—and set a default username for those nodes. Discovered GCP nodes also now expose both their internal IP and external IP as node attributes, making it easier to connect to instances across peered VPCs or different GCP projects.


## Rundeck Open Source Product Updates

#####  ::circle-dot:: [Improve audit log userInfo.username showing null or anonymous for job runs](https://github.com/rundeck/rundeck/pull/10168)
  
Fix audit log `userInfo.username` for job run events. Scheduled jobs no longer show `null` and API/webhook-triggered jobs no longer show `__grails.anonymous.user__` — both now correctly reflect the user associated with the execution.

#####  ::circle-dot:: [Fix node filter attributes incorrectly wrapped in double quotes](https://github.com/rundeck/rundeck/pull/10157)
  
Fix node filter: saving a filter with multiple attributes (e.g. `osFamily: unix name:localhost`) no longer incorrectly wraps them in double quotes. Pre-quoted values are also preserved correctly when re-loading a saved filter.

#####  ::circle-dot:: [Fixes bulk edit when using NextUI](https://github.com/rundeck/rundeck/pull/10189)
  
Fixed the layout of the bulk edit controls on the Jobs page when using the next-generation UI, correcting the alignment and structure of the header so bulk actions display properly.

#####  ::circle-dot:: [Preserve accumulated data vars when secureOption storagePath uses node variable](https://github.com/rundeck/rundeck/pull/10220)
  
Fixed an edge case where `data.*` variables set by log filter plugins (e.g. `key-value-data`) were lost in subsequent workflow steps when a secure option&#39;s storage path contained a node context variable such as `${node.name}`.

#####  ::circle-dot:: [Fix Remote URL auth headers not appended when fetching option values](https://github.com/rundeck/rundeck/pull/10152)
  
Fixed a regression where Remote URL job options configured with API Key or Basic authentication were not sending the configured authentication headers or query parameters when fetching option values, causing the option dropdown to fail to load with an authentication error.

#####  ::circle-dot:: [Fix job import resetting dispatch mode when node filter is empty](https://github.com/rundeck/rundeck/pull/10171)
  
Fixed an issue where jobs configured as &quot;Dispatch to nodes&quot; with an empty node filter were silently converted to &quot;Execute locally&quot; after export + reimport (via YAML, XML, Job Actions upload, SCM import, project archive import, or Terraform provider).

#####  ::circle-dot:: [Fix KeyStorageSelector state not resetting on reopen](https://github.com/rundeck/rundeck/pull/10155)
  
Fix PagerDuty V3 webhook: selecting a key from the Key Storage selector now correctly populates the Shared Secret Key field.

#####  ::circle-dot:: [Audit failed login attempts when using rundeck.jaaslogin=true](https://github.com/rundeck/rundeck/pull/10212)
  
Fixed: Failed login attempts are now audited when Rundeck is configured with `rundeck.jaaslogin=true`. Previously, JAAS authentication failures were silently dropped from the audit log.

#####  ::circle-dot:: [Bump py-winrm-plugin to 3.2.0](https://github.com/rundeck/rundeck/pull/10205)
  
Resolved intermittent failures of Windows (WinRM) jobs using Kerberos authentication when many executions run concurrently. Previously, running large numbers of Kerberos WinRM jobs at the same time could fail with `GSSError: Credential cache is empty` because all executions shared a single Kerberos credential cache. Each execution now uses its own isolated credential cache, so high-concurrency WinRM workloads run reliably.

#####  ::circle-dot:: [Fix StorageTreeFactory stopping at first gap in provider index sequence](https://github.com/rundeck/rundeck/pull/10225)
  
Fixed an issue where key storage providers and converters configured with non-contiguous index numbers were silently skipped, making any keys stored under the skipped providers inaccessible. Rundeck now loads every configured storage provider regardless of gaps in the index sequence, so administrators no longer need to keep provider indexes perfectly consecutive when configuring key storage outside the UI (for example, via `rundeck-config.properties` or automated/API-driven setups).

#####  ::circle-dot:: [Add default time filter to activity/executions listing](https://github.com/rundeck/rundeck/pull/10190)
  
Adds a feature flag `rundeck.feature.activityDefaultTimeFilter.enabled` that, when enabled, scopes the activity/executions page to a configurable recent time window on first load. The window defaults to the last month and is configurable via `gui.activity.defaultTimeFilter` (accepted values: `1h`, `1d`, `1w`, `1m`).

#####  ::circle-dot:: [Fix Hostname -&gt; hostname in tool tip on node filter input](https://github.com/rundeck/rundeck/pull/10162)
  
Minor fix of capitalization on the word &quot;hostname&quot;.

#####  ::circle-dot:: [Convert adhoc page to Vue SPA](https://github.com/rundeck/rundeck/pull/10138)
  
The Commands (adhoc) page has been rebuilt as a modern Vue single-page application, available when the new NextUI option is enabled. This delivers faster, more responsive command execution and a consistent look and feel with the rest of the redesigned Rundeck interface.


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A6.1.0+is%3Aclosed)





## Links

- Download the Releases: [Open Source](https://www.rundeck.com/community-downloads/6.1.0) | [Self-Hosted](https://www.rundeck.com/enterprise-downloads/6.1.0)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/index.md)
- [Catch us on LinkedIn for the Live Stream Release Videos](https://www.linkedin.com/company/pagerduty/events)

## Version Info

Name: <span style="color: olivedrab"><span class="glyphicon glyphicon-camera"></span> "Carina olivedrab camera"</span>

Release Date: July 31st, 2026


## Community Contributors

Submit your own Pull Requests to get recognition here!

*  ([ncofreortiz-hub](https://github.com/ncofreortiz-hub))
* David Darby ([ddarby-hike](https://github.com/ddarby-hike))


## Staff Contributors

* Greg Schueler ([gschueler](https://github.com/gschueler))
* Carlos Eduardo ([carlosrfranco](https://github.com/carlosrfranco))
* Forrest Evans ([fdevans](https://github.com/fdevans))
* Jaime Tobar ([jtobard](https://github.com/jtobard))
* Jake Cohen ([jsboak](https://github.com/jsboak))
* Jaya Singh ([jayas006](https://github.com/jayas006))
* Jesus Osuna ([Jesus-Osuna-M](https://github.com/Jesus-Osuna-M))
* Luis Toledo ([ltamaster](https://github.com/ltamaster))
* Rodrigo Navarro ([ronaveva](https://github.com/ronaveva))
* Sarah Martinelli Benedetti ([smartinellibenedetti](https://github.com/smartinellibenedetti))