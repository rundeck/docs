---
title: Recent Updates
description: Latest merged changes from the Rundeck development team
date: 2026-08-20T21:54:14.540Z
feed: true
index: true
---

# Recent Updates

Stay up to date with the latest changes and improvements from the Runbook Automation development team.  

This page shows recently merged pull requests from both the Runbook Automation product repository and the open source Rundeck repository merged since the last self-hosted release of [6.1.0](/history/6_x/version-6.1.0.md) on August 3, 2026.

## Recent Changes


#### ::circle-dot:: Generate API and webhook tokens using a CSPRNG  [PR #10436](https://github.com/rundeck/rundeck/pull/10436)


  &lt;!-- If you have suggested content that would describe this PR to other Rundeck community users, please enter it here.--&gt;
  Fixed: API and webhook auth tokens are now generated using a cryptographically secure random number generator (CSPRNG) instead of a non-cryptographic PRNG.

#### ::circle-dot:: Fix plaintext password storage in JettyCompatibleSpringSecurityPasswordEncoder  [PR #10475](https://github.com/rundeck/rundeck/pull/10475)


  Fixed: user account passwords authenticated via the realm.properties (non-JAAS) path are now hashed with BCrypt when set/changed, instead of being stored in plaintext.

  🤖 Generated with [Claude Code](https://claude.com/claude-code)

#### ::circle-dot:: Fix CVE-2026-64607 in httpclient5 buildscript classpath  [PR #10474](https://github.com/rundeck/rundeck/pull/10474)


  This release addresses CVE-2026-64607 in Apache HttpClient 5 build dependencies (Medium severity). The affected library is used during build only and is not shipped as part of the Rundeck application package.

#### ::circle-dot:: Normal users are not able to see job history any more  [PR #10476](https://github.com/rundeck/rundeck/pull/10476)


  Fixed a bug where users whose ACL granted only the job `view` action (without `read` or
  `view_history`) could not see execution history from the executions API, even though the
  correct total count was reported.

#### ::circle-dot:: Add certRoleName config metadata for Vault storage cert auth 


  Added an optional **Cert Role Name** setting for Vault Key Storage when using TLS certificate authentication. Some Vault deployments require an explicit certificate role name in the login request and return permission denied without it; you can now configure this in System Configuration under Key Storage (Advanced). When left unset, Vault certificate authentication behaves as before.

#### ::circle-dot:: Add Japanese (ja) translations for Rundeck Pro UI 


  Added Japanese (ja) translations for Rundeck Pro&#39;s Enterprise UI, including calendars, cluster management, runners, licensing, security, job favorites, and other Pro-specific features. Add `?lang=ja` to a project URL to switch to Japanese for the session. Some areas are not yet translated, including parts of the Runner UI and OSS screens such as Dashboard and Project Settings.

#### ::circle-dot:: Recognize JDBC/native Jetty JAAS role principals  [PR #10454](https://github.com/rundeck/rundeck/pull/10454)


  Fixed a bug where users authenticating via JAAS with a native Jetty login module (e.g.
  `JDBCLoginModule`) could log in successfully but were assigned no roles, blocking all project
  access. Roles are now correctly granted for these login modules, matching the behavior already
  restored for LDAP in 6.0.1.

#### ::circle-dot:: Fix execution summary Start Time column Showing Step Identifiers  [PR #10440](https://github.com/rundeck/rundeck/pull/10440)


  Fixed an issue on the Execution Summary page where the Start Time column for collapsed node rows showed step identifiers (such as &quot;Step: 2/1&quot;) instead of an actual timestamp when viewing conditional or branching workflows. The Start Time column now displays the node&#39;s earliest step start time.

#### ::circle-dot:: windows-cmd-quoting 


  Fixed an issue where Windows job commands failed when expanded job options or global variables contained spaces or special characters and the remote shell was cmd.exe (including WinRM with the cmd shell and SSH to Windows nodes). After a Rundeck 6.0 security change, those values were quoted with single quotes, which cmd.exe does not treat as string delimiters—breaking commands such as `powershell -File` when the script path contained spaces (for example, paths ending in `.ps1&#39;`). Windows argument quoting now uses proper double-quote escaping so values are passed as a single argument while preserving injection protections against shell metacharacters such as `|`, `&gt;`, and `&amp;&amp;`.

#### ::circle-dot:: Migrate bundled AWS Plugins from AWS SDK v1 to v2 


  Completed the migration of Rundeck Pro AWS cloud plugins to AWS SDK v2 for the remaining services—including SSM run commands, S3, Athena, load balancers, EKS, Autoscaling, and CloudWatch Logs—following the earlier EC2, ECS, RDS, and Lambda migration. AWS integrations in cloud-aws-plugins now use the current SDK throughout, improving compatibility with modern AWS APIs and credential handling including SSM assume-role.

#### ::circle-dot:: Update nanoid for CVE-2026-67213  [PR #10438](https://github.com/rundeck/rundeck/pull/10438)


  This release addresses CVE-2026-67213 by updating the nanoid JavaScript dependency used in the Rundeck web UI to version 3.3.17, fixing a denial-of-service vulnerability that could cause excessive CPU use during ID generation.

#### ::circle-dot:: Fix CVE-2026-71497 by forcing jsoup 1.23.1  [PR #10439](https://github.com/rundeck/rundeck/pull/10439)


  Upgraded jsoup to 1.23.1 to address CVE-2026-71497 in OpenAPI tooling dependencies.

#### ::circle-dot:: Azure Key Vault: preserve all *:encrypted flags 


  Fixed an issue where secrets stored in Azure Key Vault could become undecryptable on Rundeck 6.0, causing jobs to fail with invalid environment variable values when reading Key Storage entries. When a secret carried more than one encryption metadata flag, only the first flag was preserved in Azure tags, which could drop the active encryption converter&#39;s marker and leave Rundeck returning raw ciphertext instead of the decrypted value. All encryption flags are now preserved when secrets are written to and read from Azure Key Vault. Secrets already saved with a missing flag must be re-saved through Rundeck or have the missing tag restored manually in Azure Key Vault.

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

#### ::circle-dot:: Fix project home executions stat links missing last-day filter  [PR #10402](https://github.com/rundeck/rundeck/pull/10402)


  Fixed: the &quot;Executions in the last Day&quot; stat on the project home/list pages now links to the
  Activity page pre-filtered to the last day, instead of showing all-time executions.




## Subscribe to Updates

Stay informed about Rundeck development by subscribing to a feed:

- [RSS Feed](https://docs.rundeck.com/docs/feeds/development.xml)
- [Atom Feed](https://docs.rundeck.com/docs/feeds/development-atom.xml)

These feeds are updated regularly to highlight changes that are available in Runbook Automation SaaS and will be included in upcoming Self Hosted releases.

## About These Updates


The development updates are automatically generated from both our private repository for the commercial product and the public open source repository. These changes have been merged since the last GA release and provide insight into what's coming in the next Self Hosted release.

**Note**: These updates reflect changes merged since the last GA release. Self-hosted customers should refer to the [Release Notes](/history/) section for version-specific updates applicable to their installation.

---

**List Last updated:** 2026-08-20


