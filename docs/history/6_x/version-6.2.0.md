---

title: "6.2.0 Release Notes"
date: 2026-09-02
image: /images/chevron-logo-red-on-white.png
description: "Rundeck | Runbook Automation Releases 6.2.0 - Conditional AND/OR, AWS SDK v2, and Security Fixes"
feed:
 enable: true
 description: "Conditional AND/OR, AWS SDK v2, and Security Fixes"

---

# 6.2.0 Release Notes

::: tip Rundeck/RBA MCP Server
The [Rundeck MCP Server](/mcp/index.md) is now available. It is distributed separately from 6.2.0 and works with Rundeck 6.1.0 or later. The server connects MCP-compatible AI assistants (Claude Desktop, Claude Code, Cursor, VS Code, and others) to your Rundeck or Runbook Automation instance so you can query projects, generate and validate jobs, manage ACLs, and provision runners from chat, authenticated with your own API token.
:::

## Overview

<!-- <VidStack src="youtube/REPLACE" poster="https://img.youtube.com/vi/REPLACE/maxresdefault.jpg"/> -->

Rundeck 6.2.0 continues the **[Conditional Logic Steps](/manual/jobs/conditional-logic.md)** Early Access work from [6.1.0](/history/6_x/version-6.1.0.md) with a toggle that swaps AND/OR grouping in a Conditional step. By default, conditions within a set are combined with AND and sets are combined with OR; you can now invert that to OR within a set and AND across sets, so more complex branching can be expressed without nested conditionals or Job Reference workarounds.

This release also completes the AWS SDK v2 migration for the remaining Rundeck Pro AWS plugins (SSM, S3, Athena, load balancers, EKS, Autoscaling, and CloudWatch Logs), following the EC2, ECS, RDS, and Lambda work earlier in the cycle. AWS integrations now use the current SDK throughout, including assume-role credential refresh on long-running jobs. Enterprise UI strings are now available in Japanese (`?lang=ja`).

Beyond these highlights, 6.2.0 includes security hardening (Secure session cookies on HTTPS, cryptographically generated API and webhook tokens, BCrypt hashing for realm.properties passwords, optional option-input allowlists, and CVE updates) and customer-focused fixes for Windows cmd.exe quoting, Azure Key Vault secret decryption, blackout calendar time zones, Git SCM connectivity, and native Prometheus execution metrics.

## Runbook Automation Updates

##### ::circle-dot:: Swapping and/or logic in a Conditional step

Conditional workflow steps now include an AND/OR toggle to invert how conditions are combined. By default, every condition in a set must match and matching any set is enough; with the toggle enabled, any condition in a set can satisfy that set and every set must match. Existing conditional steps are unchanged unless you turn the toggle on.

##### ::circle-dot:: Migrate bundled AWS Plugins from AWS SDK v1 to v2
  
Completed the migration of Rundeck Pro AWS cloud plugins to AWS SDK v2 for the remaining services—including SSM run commands, S3, Athena, load balancers, EKS, Autoscaling, and CloudWatch Logs—following the earlier EC2, ECS, RDS, and Lambda migration. AWS integrations in cloud-aws-plugins now use the current SDK throughout, improving compatibility with modern AWS APIs and credential handling including SSM assume-role.

##### ::circle-dot:: Add Japanese (ja) translations for Rundeck Pro UI
  
Added Japanese (ja) translations for Rundeck Pro&#39;s Enterprise UI, including calendars, cluster management, runners, licensing, security, job favorites, and other Pro-specific features. Add `?lang=ja` to a project URL to switch to Japanese for the session. Some areas are not yet translated, including parts of the Runner UI and OSS screens such as Dashboard and Project Settings.

##### ::circle-dot:: Add certRoleName config metadata for Vault storage cert auth
  
Added an optional **Cert Role Name** setting for Vault Key Storage when using TLS certificate authentication. Some Vault deployments require an explicit certificate role name in the login request and return permission denied without it; you can now configure this in System Configuration under Key Storage (Advanced). When left unset, Vault certificate authentication behaves as before.

##### ::circle-dot:: Azure Key Vault: preserve all *:encrypted flags
  
Fixed an issue where secrets stored in Azure Key Vault could become undecryptable on Rundeck 6.0, causing jobs to fail with invalid environment variable values when reading Key Storage entries. When a secret carried more than one encryption metadata flag, only the first flag was preserved in Azure tags, which could drop the active encryption converter&#39;s marker and leave Rundeck returning raw ciphertext instead of the decrypted value. All encryption flags are now preserved when secrets are written to and read from Azure Key Vault. Secrets already saved with a missing flag must be re-saved through Rundeck or have the missing tag restored manually in Azure Key Vault.

##### ::circle-dot:: Fix Windows cmd.exe quoting for job options with spaces
  
Fixed an issue where Windows job commands failed when expanded job options or global variables contained spaces or special characters and the remote shell was cmd.exe (including WinRM with the cmd shell and SSH to Windows nodes). After a Rundeck 6.0 security change, those values were quoted with single quotes, which cmd.exe does not treat as string delimiters—breaking commands such as `powershell -File` when the script path contained spaces (for example, paths ending in `.ps1&#39;`). Windows argument quoting now uses proper double-quote escaping so values are passed as a single argument while preserving injection protections against shell metacharacters such as `|`, `&gt;`, and `&amp;&amp;`.

##### ::circle-dot:: Migrate cloud-aws-plugins EC2/ECS/RDS/Lambda from AWS SDK v1 to v2
  
Updated the EC2, ECS, RDS, and Lambda AWS plugins to use AWS SDK v2, with no changes to plugin configuration. Assume-role authentication now automatically refreshes credentials, preventing expired-token failures on long-running jobs after about one hour. Also fixed the ECS &quot;Stopped Task Details&quot; step ignoring a configured access key, and updated the Lambda runtime list.

##### ::circle-dot:: Fix blackout calendar ignoring non-GMT schedule TimeZone
  
Fixed an issue where blackout (and allowed) calendars defined with a specific date or date range ignored the schedule&#39;s configured time zone and used the server&#39;s default time zone instead. On non-GMT schedules this caused the blackout to apply to the wrong calendar day, so jobs could run during a window that was supposed to block them. Blackout and allowed date/range calendars now correctly honor the schedule&#39;s time zone. Recurring daily, weekly, and monthly calendars were not affected.


## Rundeck Open Source Product Updates

#####  ::circle-dot:: [fix(user-management): use substring match for User Management search filters](https://github.com/rundeck/rundeck/pull/10361)
  
Fixed User Management search so login, session ID, and hostname filters match partial text (case-insensitive) instead of requiring the exact full string. Users can now find accounts by typing part of a login — for example, searching by first name when the login is stored as &quot;First Last&quot; — consistent with search behavior elsewhere in Rundeck.

#####  ::circle-dot:: [[PS-1689] Auto-enable Secure flag on JSESSIONID cookie for https deployments](https://github.com/rundeck/rundeck/pull/10457)
  
Session cookies are now automatically marked `Secure` when Rundeck&#39;s configured server URL uses `https`, closing a gap where session cookies could be transmitted over an insecure connection. HTTP-only deployments are unaffected.

#####  ::circle-dot:: [Fix email notification content hidden on mobile clients](https://github.com/rundeck/rundeck/pull/10400)
  
Fixed job notification emails so Job Description, Nodes, and Log Output stay visible on mobile and touch-based mail clients, where hover-based expand/collapse previously hid that content permanently. Also fixed the job title link in notification emails to use a full URL so it opens correctly when clicked from an email client.

#####  ::circle-dot:: [Add configurable option-input validation allowlist](https://github.com/rundeck/rundeck/pull/10429)
  
Added an optional allowlist pattern, configurable at the project or system level, to validate job option values before execution. When enabled, values must fully match the configured regex or the job is rejected before it runs, reducing command-injection risk when options are interpolated into scripts (including webhook-triggered runs). Disabled by default; behavior is unchanged when no pattern is configured.

#####  ::circle-dot:: [Reduce database CPU on the job-execution path: rduser column projection and scheduled_execution_stats index](https://github.com/rundeck/rundeck/pull/10431)
  
Reduced database CPU on high-traffic job execution paths by loading only the user fields needed for token authentication, execution context, and notifications instead of entire user records. Also added a missing index on scheduled job statistics lookups by job UUID to avoid full table scans when reading job stats.

#####  ::circle-dot:: [Fix execution metrics SQL time-parse errors on MySQL/MariaDB](https://github.com/rundeck/rundeck/pull/10432)
  
Fixed SQL time-parse errors logged on every call to the execution metrics API when using MySQL, MariaDB, or Oracle databases. Metrics data was still returned correctly via a fallback path, but server logs were spammed and response times were slower than necessary. Duration aggregation now uses database-appropriate queries for these backends.

#####  ::circle-dot:: [Fix git-export SSH fetch failing with ConnectionException: Stream closed](https://github.com/rundeck/rundeck/pull/10506)
  
Fixed an intermittent issue where Git SCM export and import operations over SSH could fail with a &quot;Stream closed&quot; connection error during fetch or remote listing, preventing synchronization with Git repositories used for project jobs and configuration.

#####  ::circle-dot:: [Fix nested attributes sub-object ignored in JSON node source](https://github.com/rundeck/rundeck/pull/10237)

#####  ::circle-dot:: [Add native Prometheus execution metrics (Micrometer)](https://github.com/rundeck/rundeck/pull/10486)
  
Rundeck now natively emits per-project/status execution counts and durations, a running-executions gauge, and system/execution-mode gauges on `/monitoring/prometheus`, without requiring an external exporter.

#####  ::circle-dot:: [Update nanoid for CVE-2026-67213](https://github.com/rundeck/rundeck/pull/10438)
  
This release addresses CVE-2026-67213 by updating the nanoid JavaScript dependency used in the Rundeck web UI to version 3.3.17, fixing a denial-of-service vulnerability that could cause excessive CPU use during ID generation.

#####  ::circle-dot:: [Generate API and webhook tokens using a CSPRNG](https://github.com/rundeck/rundeck/pull/10436)
  
Fixed: API and webhook auth tokens are now generated using a cryptographically secure random number generator (CSPRNG) instead of a non-cryptographic PRNG.

#####  ::circle-dot:: [Recognize JDBC/native Jetty JAAS role principals](https://github.com/rundeck/rundeck/pull/10454)
  
Fixed a bug where users authenticating via JAAS with a native Jetty login module (e.g.
`JDBCLoginModule`) could log in successfully but were assigned no roles, blocking all project
access. Roles are now correctly granted for these login modules, matching the behavior already
restored for LDAP in 6.0.1.

#####  ::circle-dot:: [Fix CVE-2026-64607 in httpclient5 buildscript classpath](https://github.com/rundeck/rundeck/pull/10474)
  
This release addresses CVE-2026-64607 in Apache HttpClient 5 build dependencies (Medium severity). The affected library is used during build only and is not shipped as part of the Rundeck application package.

#####  ::circle-dot:: [Fix CVE-2026-71497 by forcing jsoup 1.23.1](https://github.com/rundeck/rundeck/pull/10439)
  
Upgraded jsoup to 1.23.1 to address CVE-2026-71497 in OpenAPI tooling dependencies.

#####  ::circle-dot:: [Fix plaintext password storage in JettyCompatibleSpringSecurityPasswordEncoder](https://github.com/rundeck/rundeck/pull/10475)
  
Fixed: user account passwords authenticated via the realm.properties (non-JAAS) path are now hashed with BCrypt when set/changed, instead of being stored in plaintext.

#####  ::circle-dot:: [Normal users are not able to see job history any more](https://github.com/rundeck/rundeck/pull/10476)
  
Fixed a bug where users whose ACL granted only the job `view` action (without `read` or
`view_history`) could not see execution history from the executions API, even though the
correct total count was reported.

#####  ::circle-dot:: [Fix execution summary Start Time column Showing Step Identifiers](https://github.com/rundeck/rundeck/pull/10440)
  
Fixed an issue on the Execution Summary page where the Start Time column for collapsed node rows showed step identifiers (such as &quot;Step: 2/1&quot;) instead of an actual timestamp when viewing conditional or branching workflows. The Start Time column now displays the node&#39;s earliest step start time.

#####  ::circle-dot:: [Fix project home executions stat links missing last-day filter](https://github.com/rundeck/rundeck/pull/10402)
  
Fixed: the &quot;Executions in the last Day&quot; stat on the project home/list pages now links to the
Activity page pre-filtered to the last day, instead of showing all-time executions.

#####  ::circle-dot:: [Enforce project-level authorization on execution metrics API](https://github.com/rundeck/rundeck/pull/10419)
  
The execution metrics API (`/executions/metrics`) now enforces project-level authorization: metrics are only returned for projects the requesting user is authorized to read.

#####  ::circle-dot:: [Fix Remote URL option Auth Type lost after saving and reopening job](https://github.com/rundeck/rundeck/pull/10413)
  
Fixed: Remote URL job option&#39;s Auth Type (Bearer Token / Basic / API Key) is now correctly restored when reopening a saved job for editing.

#####  ::circle-dot:: [SCM: Restore plugin resilience when Git server is temporarily unreachable](https://github.com/rundeck/rundeck/pull/10214)
  
Fixed SCM plugin (git-export/git-import) incorrectly disabling itself when the Git server is temporarily unreachable. The plugin now recovers automatically when connectivity is restored, without requiring manual re-activation, and without repeatedly hammering the Git server during an outage — after fast retries are exhausted it polls once per `scmLoader.slowPoll.interval` (default 60s) instead of giving up. Users will see a clear &quot;Git server unavailable&quot; warning in the UI during outages instead of a stale or missing status. Also adds a configurable fetch/pull timeout for the git plugin (default 30s) to prevent a hung remote from blocking indefinitely.


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A6.2.0+is%3Aclosed)





## Links

- Download the Releases: [Open Source](https://www.rundeck.com/community-downloads/6.2.0) | [Self-Hosted](https://www.rundeck.com/enterprise-downloads/6.2.0)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/index.md)
- [Catch us on LinkedIn for the Live Stream Release Videos](https://www.linkedin.com/company/pagerduty/events)

## Version Info

Name: <span style="color: rebeccapurple"><span class="glyphicon glyphicon-glass"></span> "Cassiopeia rebeccapurple glass"</span>

Release Date: September 2nd, 2026


## Community Contributors

Submit your own Pull Requests to get recognition here!

*  ([jgarces-pd](https://github.com/jgarces-pd))
* NachoDolce ([nachodolce](https://github.com/nachodolce))


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