---

title: "6.1.0 Release Notes"
date: 2026-08-03
image: /images/chevron-logo-red-on-white.png
description: "Rundeck | Runbook Automation Releases 6.1.0 - Conditionals, Runner Metrics, and Customer Fixes"
feed:
 enable: true
 description: "Conditionals, Runner Metrics, and Customer Fixes"

---

# 6.1.0 Release Notes

## Overview

<VidStack src="youtube/LfEOeP2p7s4" poster="https://img.youtube.com/vi/LfEOeP2p7s4/maxresdefault.jpg"/>

Rundeck 6.1.0 builds on the **[Conditional Logic Steps](/manual/jobs/conditional-logic.md)** Early Access feature introduced in [5.20.0](/history/5_x/version-5.20.0.md) by extending support to the **Node First** execution strategy. Conditional steps previously worked only with Sequential and Parallel workflows; they now work with Node First as well, so multi-node jobs that run the full workflow on one node before moving to the next can use the same if/unless branching based on job options, step outcomes, and runtime context. This release also enables **nested conditionals** for multi-level branching, and **error handlers and log filters on conditional substeps** (substep UI polish continues in a later release). Ruleset strategy remains unsupported for Conditional Logic.

This release also adds **[Runner operation metrics](/administration/runner/runner-management/monitoring-runners.md)** in the Runner Management UI. Live utilization bars show running versus max capacity for each Runner and Replica, expandable panels surface Utilization, Running, Max, Queued, and Completed counts, and a new **Busy** health status distinguishes capacity saturation from true Unhealthy or Down failures.

![In Product Runner operation metrics panel showing Utilization, Running, Max, Queued, and Completed cards](/assets/img/runner-load-metrics.png)


![Extended Runner Performance Graph Example in Grafana](/assets/img/release-610-performancegraph.png)

Beyond these highlights, 6.1.0 delivers one of the largest sets of customer-focused fixes in a single release—covering job editing and import, API compatibility, authentication and audit logging, cloud integrations (AWS, Azure, GCP, Jira, PagerDuty), and Runner reliability.

## Runbook Automation Updates

##### ::circle-dot:: Fix NextUI job favorites star losing sync with favsonly filter
  
Fixed an issue in the Next UI job list where starring or unstarring a job could leave the favorite icon out of sync with the &quot;Show Favourites&quot; filter, causing the filtered list to include jobs that were not actually favorited or omit jobs that were.

##### ::circle-dot:: Support node first strategy for Conditionals
  
**Conditional Workflow Steps now support Node First and Step First execution strategies.** Previously, conditional logic in Pro jobs was limited to Sequential and Parallel workflows, which meant multi-node jobs that run all steps on one node before moving to the next (Node First) or run each step across every node before proceeding (Step First) could not use if/unless rules to adapt the workflow at runtime. With this release, conditional steps work across all four supported strategies, so you can combine node-oriented execution patterns with the same dynamic branching based on job options, step outcomes, exported variables, and other execution context. Conditionals are evaluated as the workflow progresses, allowing later steps to react to results from earlier steps even when work is organized node-by-node or step-by-step across your infrastructure.

This release also adds **nested conditionals**, so you can place a Conditional Logic step inside another for multi-level branching without Job Reference workarounds. **Error handlers and log filters** now work on substeps within conditionals; the UI for configuring them on substeps will continue to improve in a later release. Ruleset strategy remains unsupported.

##### ::circle-dot:: Fix variable expansion for ${...} in nixy/local-script step
  
Fixed an issue where shell variable references such as `${VAR}` and `${VAR:-default}` in the *nixy / local-script step were silently stripped before the shell could evaluate them, causing those variables to resolve to empty values. Shell variables using brace syntax are now preserved for bash to expand at runtime, while Rundeck data references such as `${option.X}` and `${job.id}` continue to work as before.

##### ::circle-dot:: Runner operation metrics: Busy status, live utilization bars, and expandable stat cards
  
Runners now expose real-time operation metrics in the Runner Management UI. Each runner and replica row shows a live utilization progress bar (running / max operations) in the new **Operations** column. Clicking a row expands a panel with five stat cards — Utilization %, Running, Max, Queued, and Completed — giving operators an at-a-glance view of capacity without leaving the management page.

Runners also report a new `Busy` health status (yellow badge) when their operation queue backs up under heavy concurrent job load. Previously this showed as `Unhealthy` (red) — the same signal as a broken or offline runner — making it impossible to distinguish capacity saturation from an actual failure. Older runners that don&#39;t yet report metrics show a warning in the expand panel prompting an upgrade.

##### ::circle-dot:: Bump linkify-it to 5.0.1+ to fix ReDoS CVEs
  
Addressed two security advisories (CVE-2026-48801 and CVE-2026-59887) in a third-party library used to render Markdown links in the Rundeck UI. The vulnerability could allow specially crafted text to consume excessive CPU and slow down the interface; this update upgrades the affected library to a fixed version.

##### ::circle-dot:: Fix System Report runner health counts always reporting 0
  
Fixed an issue where the System Report showed all runner health counts as zero (healthy, unhealthy, new, unknown, and down) even when runners were active and healthy. The report now accurately reflects each runner&#39;s current health status, so operators relying on the System Report get a correct view of their runner fleet.

##### ::circle-dot:: Remove usernames from System Report
  
The System Report no longer includes individual usernames or their userclass mappings. This improves privacy by ensuring user identities are not captured in generated system reports, while license allocation and usage totals continue to be reported.

##### ::circle-dot:: Add option to choose what value is used for GCP Resource Model hostname
  
The GCP resource model source now lets you choose which value is used as a discovered node&#39;s hostname—instance name, internal IP, or external IP—and set a default username for those nodes. Discovered GCP nodes also now expose both their internal IP and external IP as node attributes, making it easier to connect to instances across peered VPCs or different GCP projects.

##### ::circle-dot:: Fix Jira plugin createmeta fallback for Jira Cloud team-managed projects
  
Fixed Jira issue creation failing on Jira Cloud team-managed projects with a &quot;Failed to find issue type&quot; error even when the issue type existed. Both the Jira &quot;Create Issue&quot; workflow/job step and the Jira issue-creation notification now fall back to a supported issue-type lookup so issues are created successfully in these projects, while behavior for Jira Server / Data Center is unchanged.

##### ::circle-dot:: Fix SSM Node Executor to use regional STS endpoints for opt-in regions
  
Fixed an issue where AWS SSM node command and script execution failed in opt-in regions (such as `eu-central-2`) when using cross-account role assumption, previously returning an `InvalidClientTokenId` error. A new optional `ssm-sts-region` setting also lets operators choose which region&#39;s STS endpoint is used for authentication, while existing configurations continue to work unchanged.

##### ::circle-dot:: Add Configurable Group Name Attribute And Prefix Filter To Azure Group
  
The Azure (Entra ID) user group source can now be configured to use a specific directory attribute as the Rundeck group name (for example, `onPremisesSamAccountName` instead of the default `displayName`), and to optionally include only groups matching a name prefix. This lets administrators align group names between sign-in tokens and directory lookups—eliminating the need to maintain duplicate group names in ACLs—while existing configurations continue to behave exactly as before.

##### ::circle-dot:: Fix AWS Secrets Manager assume-role session expiry causing ExpiredTokenException
  
Fixed an issue where the AWS Secrets Manager key storage plugin, when configured with an assume-role ARN, stopped retrieving secrets after about one hour on long-running Rundeck instances and failed with `ExpiredTokenException`. The plugin now automatically refreshes the assumed-role session, so secrets remain accessible without needing to restart Rundeck.

##### ::circle-dot:: Fix inline script step with Args not working with AWS SSM
  
Fixed a bug where inline script steps with `args` configured would fail with an S3 403 error when using the AWS SSM node executor. Script arguments are now correctly passed to the SSM `commandLine` parameter instead of being appended to the S3 URI.

##### ::circle-dot:: Fix cannot manage user class for usernames containing slashes
  
Fix User Class management for usernames containing `/` (e.g. pronouns like `He/Him`). Assigning and removing User Class assignments now works correctly for these users.

##### ::circle-dot:: Fix PagerDuty Notification Start Incident Workflow trigger
  
Fixed an issue where PagerDuty &quot;Start Incident Workflow&quot; notifications failed to trigger because the configured Incident ID and Incident Workflow ID were not being read correctly. These notifications now work as expected, and a clear error is logged if either required value is missing.

##### ::circle-dot:: Fix legacy MySQL JDBC driver class at startup
  
Fixed a startup failure that occurred after upgrading when the database configuration still referenced the legacy MySQL JDBC driver class (`com.mysql.jdbc.Driver` or `com.mysql.cj.jdbc.Driver`). Rundeck now automatically substitutes the bundled MariaDB driver in these cases so the server starts successfully, and logs a warning directing operators to update their configuration.


## Rundeck Open Source Product Updates

#####  ::circle-dot:: [Fix Hostname capitalization in tool tip on node filter input](https://github.com/rundeck/rundeck/pull/10162)
  
Minor fix of capitalization on the word &quot;hostname&quot;.

#####  ::circle-dot:: [Fixed incorrect paging on the Nodes page](https://github.com/rundeck/rundeck/pull/10234)
  
Fixed incorrect paging on the Nodes page that occurred when the number of nodes shown per page was increased via the `rundeck.gui.matchedNodesMaxCount` setting. Page counts and the pager controls at the bottom of the page now calculate correctly based on the configured page size.

#####  ::circle-dot:: [Add a new index to the execution table](https://github.com/rundeck/rundeck/pull/9964)
  
Add indexes on `execution`, `referenced_execution`, and `job_file_record` to improve the performance of execution history queries and the Execution API.

#####  ::circle-dot:: [Add date formatter for api/** endpoints](https://github.com/rundeck/rundeck/pull/10318)
  
Fixed a change in API date formatting introduced by the Grails 7 / Spring Boot 3 upgrade, where date/time fields in API responses began including milliseconds (e.g. `2026-03-25T21:16:50.123Z`). API date values are once again returned in second-precision UTC ISO-8601 format (e.g. `2026-03-25T21:16:50Z`) across both JSON and XML and for all API versions, restoring compatibility for existing API integrations.

#####  ::circle-dot:: [Fix integer overflow in API token duration validation](https://github.com/rundeck/rundeck/pull/10300)
  
Fixed a security issue in API token creation where certain invalid expiration durations could bypass maximum duration limits and result in tokens that never expire. Token expiration is now validated correctly when creating tokens through the API and user profile.

#####  ::circle-dot:: [Fix JobExec to exclude project/uuid when useName=true](https://github.com/rundeck/rundeck/pull/10350)
  
Fixed an issue where exporting and importing a project caused job reference steps configured to match jobs by name to still point at jobs in the original project instead of the imported project. Name-based job references now resolve correctly in the destination project after import, while cross-project references continue to work as before.

#####  ::circle-dot:: [Fix ${DATE:FORMAT} colon parsing and add per-token timezone support](https://github.com/rundeck/rundeck/pull/10307)
  
Fixed a bug where `${DATE:HH:mm:ss}` and other time-of-day format patterns in job argument strings were silently left unexpanded at runtime. Added support for an optional per-token timezone: `${DATE:HH:mm:ss:Asia/Tokyo}`.

#####  ::circle-dot:: [Fix OBF: obfuscated passwords in ssl.properties broken in 6.0](https://github.com/rundeck/rundeck/pull/10333)
  
Fixed an issue where Rundeck 6.0 failed to start with HTTPS when `ssl.properties` used obfuscated (`OBF:`) keystore passwords, a configuration that worked in 5.x. Obfuscated passwords in `ssl.properties` are supported again, so upgrades no longer require converting them to plain text.

#####  ::circle-dot:: [Allow Java 21 and 25 in preinst.sh version check](https://github.com/rundeck/rundeck/pull/10410)
  
Fixed RPM installation failing on hosts running Java 21 or 25 because the installer incorrectly rejected those JVM versions. The RPM pre-install check now accepts Java 17, 21, and 25, matching Rundeck&#39;s documented system requirements and allowing installation on newer Linux distributions such as RHEL/Rocky Linux 10 that no longer ship Java 17.

#####  ::circle-dot:: [Allow view_history to authorize job execution listing](https://github.com/rundeck/rundeck/pull/10386)
  
Fixed a regression in 6.0 where users granted only the `view_history` job ACL permission could not see job execution history through the executions API or `rd executions query`—the total count was returned but the execution list was always empty. Users with `view_history` (without full job `read` access) can now view execution history again, matching the behavior already supported on the History page.

#####  ::circle-dot:: [Fix: API REST metrics trigger SQL errors](https://github.com/rundeck/rundeck/pull/10186)
  
Fixed an issue where retrieving execution metrics through the REST API generated repeated SQL conversion errors in the logs when using the H2 database, ensuring clean logs and reliable metrics responses.

#####  ::circle-dot:: [Parse blankIfUnexpandable from script plugin YAML config](https://github.com/rundeck/rundeck/pull/10319)
  
Fixed an issue where shell variable references such as `${VAR}` and `${VAR:-default}` in scripts run by script-based step plugins could be stripped out before the shell had a chance to evaluate them, causing those variables to resolve to empty values. Script plugins can now preserve these expressions so they expand correctly at runtime.

#####  ::circle-dot:: [Bump attribute-match-node-enhancer to 1.0.3](https://github.com/rundeck/rundeck/pull/10331)
  
The bundled Attribute Match Node Enhancer plugin now supports attribute value substitution, letting you build new node attributes and tags from a node&#39;s existing attributes using `${attribute}` syntax (for example, `image-${ec2.imageId}` or `endpoint=${host}:${port}`). This makes it possible to derive richer, dynamic metadata for nodes without external scripting. The update also adds a new &quot;is present&quot; match operator (`~~`), so enhancement rules can target nodes based simply on whether an attribute exists, regardless of its value, complementing the existing &quot;not present&quot; (`!!`) operator.

#####  ::circle-dot:: [Persist useName in job reference step to prevent UUID reversion](https://github.com/rundeck/rundeck/pull/10314)
  
Fixed an issue in the workflow editor where a Job Reference step set to reference a job by name would revert to referencing by UUID the next time the step was edited. The name-vs-UUID selection is now saved with the step and preserved across edits.

#####  ::circle-dot:: [Fix label not being saved](https://github.com/rundeck/rundeck/pull/10235)
  
Fixed an issue where the label (description) on a Job Reference step was not saved—both when adding a new job reference step and when editing an existing one—causing the label to disappear or revert after saving. Job Reference step labels are now preserved correctly.

#####  ::circle-dot:: [Fix ACL policy API returning JSON instead of YAML](https://github.com/rundeck/rundeck/pull/10295)
  
Fixed an issue where the ACL policy API returned JSON with the policy wrapped in a `contents` field even when YAML was requested via the `Accept: application/yaml` header. The endpoint now correctly returns the raw YAML policy document again, restoring compatibility for ACL import, diff, and backup tooling that relies on YAML responses.

#####  ::circle-dot:: [Fix i18n fallback for dynamically registered plugin messages](https://github.com/rundeck/rundeck/pull/10246)
  
Fixed an issue where plugin-provided i18n messages would show raw translation keys instead of English text for users whose locale was not `en_US` and a specific key was missing in their locale&#39;s message catalogue.

#####  ::circle-dot:: [Fix compacted execution output API returning mixed-type entries array](https://github.com/rundeck/rundeck/pull/10219)
  
Fixed the compacted execution output API (`GET /api/*/execution/{id}/output?compacted=true&amp;format=json`), which previously returned a mix of full objects and bare strings in its `entries` array—causing errors in clients that expected every entry to be an object with a `log` field. As of API v59, all compacted log entries are returned as consistent objects (omitting only unchanged fields), while API v58 and earlier keep their existing behavior for backward compatibility.

#####  ::circle-dot:: [Fixes bulk edit when using NextUI](https://github.com/rundeck/rundeck/pull/10189)
  
Fixed the layout of the bulk edit controls on the Jobs page when using the next-generation UI, correcting the alignment and structure of the header so bulk actions display properly.

#####  ::circle-dot:: [Bump py-winrm-plugin to 3.2.0](https://github.com/rundeck/rundeck/pull/10205)
  
Resolved intermittent failures of Windows (WinRM) jobs using Kerberos authentication when many executions run concurrently. Previously, running large numbers of Kerberos WinRM jobs at the same time could fail with `GSSError: Credential cache is empty` because all executions shared a single Kerberos credential cache. Each execution now uses its own isolated credential cache, so high-concurrency WinRM workloads run reliably.

#####  ::circle-dot:: [Convert adhoc page to Vue SPA](https://github.com/rundeck/rundeck/pull/10138)
  
The Commands (adhoc) page has been rebuilt as a modern Vue single-page application, available when the new NextUI option is enabled. This delivers faster, more responsive command execution and a consistent look and feel with the rest of the redesigned Rundeck interface.

#####  ::circle-dot:: [Preserve accumulated data vars when secureOption storagePath uses node variable](https://github.com/rundeck/rundeck/pull/10220)
  
Fixed an edge case where `data.*` variables set by log filter plugins (e.g. `key-value-data`) were lost in subsequent workflow steps when a secure option&#39;s storage path contained a node context variable such as `${node.name}`.

#####  ::circle-dot:: [Add default time filter to activity/executions listing](https://github.com/rundeck/rundeck/pull/10190)
  
Adds a feature flag `rundeck.feature.activityDefaultTimeFilter.enabled` that, when enabled, scopes the activity/executions page to a configurable recent time window on first load. The window defaults to the last month and is configurable via `gui.activity.defaultTimeFilter` (accepted values: `1h`, `1d`, `1w`, `1m`).

#####  ::circle-dot:: [Fix StorageTreeFactory stopping at first gap in provider index sequence](https://github.com/rundeck/rundeck/pull/10225)
  
Fixed an issue where key storage providers and converters configured with non-contiguous index numbers were silently skipped, making any keys stored under the skipped providers inaccessible. Rundeck now loads every configured storage provider regardless of gaps in the index sequence, so administrators no longer need to keep provider indexes perfectly consecutive when configuring key storage outside the UI (for example, via `rundeck-config.properties` or automated/API-driven setups).

#####  ::circle-dot:: [Audit failed login attempts when using rundeck.jaaslogin=true](https://github.com/rundeck/rundeck/pull/10212)
  
Fixed: Failed login attempts are now audited when Rundeck is configured with `rundeck.jaaslogin=true`. Previously, JAAS authentication failures were silently dropped from the audit log.

#####  ::circle-dot:: [Fix KeyStorageSelector state not resetting on reopen](https://github.com/rundeck/rundeck/pull/10155)
  
Fix PagerDuty V3 webhook: selecting a key from the Key Storage selector now correctly populates the Shared Secret Key field.

#####  ::circle-dot:: [Fix job import resetting dispatch mode when node filter is empty](https://github.com/rundeck/rundeck/pull/10171)
  
Fixed an issue where jobs configured as &quot;Dispatch to nodes&quot; with an empty node filter were silently converted to &quot;Execute locally&quot; after export + reimport (via YAML, XML, Job Actions upload, SCM import, project archive import, or Terraform provider).

#####  ::circle-dot:: [Fix Remote URL auth headers not appended when fetching option values](https://github.com/rundeck/rundeck/pull/10152)
  
Fixed a regression where Remote URL job options configured with API Key or Basic authentication were not sending the configured authentication headers or query parameters when fetching option values, causing the option dropdown to fail to load with an authentication error.

#####  ::circle-dot:: [Fix node filter attributes incorrectly wrapped in double quotes](https://github.com/rundeck/rundeck/pull/10157)
  
Fix node filter: saving a filter with multiple attributes (e.g. `osFamily: unix name:localhost`) no longer incorrectly wraps them in double quotes. Pre-quoted values are also preserved correctly when re-loading a saved filter.

#####  ::circle-dot:: [Improve audit log userInfo.username showing null or anonymous for job runs](https://github.com/rundeck/rundeck/pull/10168)
  
Fix audit log `userInfo.username` for job run events. Scheduled jobs no longer show `null` and API/webhook-triggered jobs no longer show `__grails.anonymous.user__` — both now correctly reflect the user associated with the execution.


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A6.1.0+is%3Aclosed)


## Links

- Download the Releases: [Open Source](https://www.rundeck.com/community-downloads/6.1.0) | [Self-Hosted](https://www.rundeck.com/enterprise-downloads/6.1.0)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/index.md)
- [Catch us on LinkedIn for the Live Stream Release Videos](https://www.linkedin.com/company/pagerduty/events)

## Version Info

Name: <span style="color: olivedrab"><span class="glyphicon glyphicon-camera"></span> "Carina olivedrab camera"</span>

Release Date: August 3rd, 2026


## Community Contributors

Submit your own Pull Requests to get recognition here!

* David Darby ([ddarby-hike](https://github.com/ddarby-hike))


## Staff Contributors

* Greg Schueler ([gschueler](https://github.com/gschueler))
* Carlos Eduardo ([carlosrfranco](https://github.com/carlosrfranco))
* Forrest Evans ([fdevans](https://github.com/fdevans))
* Jaime Tobar ([jtobard](https://github.com/jtobard))
* Jaya Singh ([jayas006](https://github.com/jayas006))
* Jesus Osuna ([Jesus-Osuna-M](https://github.com/Jesus-Osuna-M))
* Luis Toledo ([ltamaster](https://github.com/ltamaster))
* Nicolás Jesús Cofré Ortiz ([ncofreortiz-hub](https://github.com/ncofreortiz-hub))
* Rodrigo Navarro ([ronaveva](https://github.com/ronaveva))
* Sarah Martinelli Benedetti ([smartinellibenedetti](https://github.com/smartinellibenedetti))