---
title: Recent Updates
description: Latest merged changes from the Rundeck development team
date: 2026-10-14T22:19:15.988Z
feed: true
index: true
---

# Recent Updates

Stay up to date with the latest changes and improvements from the Runbook Automation development team.  

This page shows recently merged pull requests from both the Runbook Automation product repository and the open source Rundeck repository merged since the last self-hosted release of [6.2.1](/history/6_x/version-6.2.1.md) on September 9, 2026.

## Recent Changes


#### ::circle-dot:: Update legacy moment-timezone to 0.6.5 (tzdb 2026e) for Canadian DST changes  [PR #10695](https://github.com/rundeck/rundeck/pull/10695)


  **Fixed:** Updated the timezone library bundled with the web UI (moment 2.31.0, moment-timezone 0.6.5 with IANA tzdb 2026e). Dates and times on the web UI pages that use it (job scheduler, date/time picker and run-later, activity, job and execution views) are now correct for the 2026 Canadian time zone changes that take effect November 1, 2026: British Columbia (`America/Vancouver`), Alberta (`America/Edmonton`), Northwest Territories (`America/Inuvik`), and Manitoba (`America/Winnipeg`).

  &gt; **Note — may still be affected:** This change covers only the timezone data bundled with the web UI. **Server-side job scheduling** uses the timezone data of the Java runtime that Rundeck runs on, and that depends on how Rundeck is installed:
  &gt; - **Official Docker images:** fixed separately in #10698, which patches the image&#39;s Java runtime to tzdb 2026e. Restart or redeploy on the updated image before November 1 so schedules are recalculated.
  &gt; - **Installs on your own OS (DEB/RPM/WAR) and self-hosted runners:** these use whatever Java runtime is installed on that host. As of mid-October 2026, no published Java build includes tzdb 2026e, and installing the OS `tzdata` package doesn&#39;t update Java. Use the vendor&#39;s timezone updater tool, or temporarily schedule affected jobs in an equivalent fixed-offset zone until the vendor ships 2026e.
  &gt;
  &gt; Until the Java runtime has tzdb 2026e or later, scheduled jobs in `America/Edmonton`, `America/Inuvik`, or `America/Winnipeg` (and `America/Vancouver` on runtimes older than 2026b) may run one hour off from November 2, 2026. Interim workaround: schedule those jobs in an equivalent fixed-offset zone (`America/Regina` for Alberta and the Northwest Territories, `America/Panama` for Manitoba), and switch back once the runtime is updated.

#### ::circle-dot:: Patch JDK tzdb to IANA 2026e in the ubuntu-base Docker image  [PR #10698](https://github.com/rundeck/rundeck/pull/10698)


  **Fixed:** The official Docker images now include IANA tzdb 2026e timezone data for the Java runtime. Scheduled jobs in `America/Edmonton`, `America/Inuvik` and `America/Winnipeg` (Alberta, Northwest Territories, Manitoba) keep firing at the correct local time after these provinces stop observing DST on November 1, 2026. Restart or redeploy Rundeck on the updated image before November 1 so schedules are recalculated.

  🤖 Generated with [Claude Code](https://claude.com/claude-code)

#### ::circle-dot:: Keep exit code for workflow step plugins on remote runner 


  Error handlers on failed workflow step plugins (local or remote runner) can now read `${result.resultCode}`.

#### ::circle-dot:: Keep failureData when a workflow step plugin fails  [PR #10691](https://github.com/rundeck/rundeck/pull/10691)


  Fixed: when a workflow step plugin (for example a script-based workflow step such as a local script step) failed with a non-zero exit code, its error handler could not read the exit code: `${result.resultCode}` was empty. A handler that exported it, such as a Global Variable step, failed with `Empty value`, so the exit code could not be passed to later steps or back to a parent job through a job reference.

  Error handlers on failed workflow step plugins now get the step&#39;s exit code in `${result.resultCode}`, the same as Command and Script node steps. This works on the local runner and on remote runners.

  Note: with &quot;If a step fails: Run remaining steps&quot; (keepgoing) enabled, a successful error handler marks the failed step as successful. This is existing behavior. Before this fix, such handlers often failed because of the empty value, so the step stayed failed.

  🤖 Generated with [Claude Code](https://claude.com/claude-code)

#### ::circle-dot:: Warn when a scheduled job&#39;s saved user can no longer run it  [PR #10670](https://github.com/rundeck/rundeck/pull/10670)


  Job pages now show a warning when a scheduled job&#39;s saved user is no longer authorized to run it.

  🤖 Generated with [Claude Code](https://claude.com/claude-code)

#### ::circle-dot:: Fix plugin upload security issues  [PR #10602](https://github.com/rundeck/rundeck/pull/10602)


  Fixed several security issues in the plugin upload/install flow: `.groovy` plugin files are no longer accepted without validation, uploaded/installed filenames are sanitized against path traversal, plugin install/uninstall authorization now correctly checks the `plugin` resource kind, and `installPlugin` no longer accepts local `file:` URLs.

#### ::circle-dot:: Prepare CI for community PR #10488  [PR #10650](https://github.com/rundeck/rundeck/pull/10650)


  Project archive imports that include project configuration, node sources, or SCM settings now require project `configure` authorization.

#### ::circle-dot:: Resolve SCM job status with one history walk per HEAD instead of one per job  [PR #10629](https://github.com/rundeck/rundeck/pull/10629)


  SCM git import and export now resolve job status with a single repository history walk per HEAD instead of one walk per job, and the SCM loader no longer runs catch-up cycles back-to-back when a cycle exceeds `rundeck.scmLoader.interval`. Large projects tracking repositories with deep history see import status refresh in seconds instead of minutes.

  🤖 Generated with [Claude Code](https://claude.com/claude-code)

#### ::circle-dot:: Migrate webhook auth tokens off LEGACY plaintext storage to SECURED (PS-1686)  [PR #10477](https://github.com/rundeck/rundeck/pull/10477)


  Webhook auth tokens are now hashed at rest (SHA-256), matching every other API token type. Existing webhook tokens are automatically migrated on next server startup; no action is required and existing webhook URLs continue to work unchanged.

#### ::circle-dot:: Add Disable option to Azure Resource Model node source 


  Added a **Disable** option to the Azure Resource Model node source so you can turn off a misconfigured or unwanted node source without deleting it. When disabled, Rundeck skips Azure API calls and the source contributes no nodes; disabled entries appear greyed out in the node sources list. Defaults to off so existing configurations are unchanged.

#### ::circle-dot:: PagerDuty plugin fixes and enhancements 


  Fixed several bugs in the PagerDuty plugins (multi-byte characters and empty notes in &quot;Add Note&quot;, a response-parsing crash in &quot;Update Incident&quot; after setting Priority, malformed Authorization headers in &quot;Send a Change Event&quot; and &quot;Add Responders&quot;), removed an unused API Key field from &quot;Send a Change Event&quot;, added `include[]` option checkboxes to &quot;Get Incident&quot; and a Priority field to &quot;Update Incident&quot;, and pretty-printed JSON in debug-mode HTTP logs.

#### ::circle-dot:: Don&#39;t persist STATIC_TEXT plugin properties into saved job config  [PR #10539](https://github.com/rundeck/rundeck/pull/10539)


  Fixed the Workflow Strategy configuration so its descriptive help text is no longer saved into the job definition and exported YAML as raw HTML.  This will not fix existing jobs, but opening and resaving the job manually will fix the issue.

#### ::circle-dot:: Explicitly request demographic/password attributes in LDAP findUser()  [PR #10532](https://github.com/rundeck/rundeck/pull/10532)


  Fixed LDAP authentication (`JettyCachingLdapLoginModule`) so that first name, last name, and email are correctly synced from directories (e.g. Active Directory) that require attributes to be explicitly requested in the search, rather than silently syncing `null` values.

#### ::circle-dot:: Fix Nodes page 500 error when a node source fails to load  [PR #10592](https://github.com/rundeck/rundeck/pull/10592)


  Fixed: the Nodes page could return an HTTP 500 instead of a normal error indicator when a node source failed to load.
  
  🤖 Generated with [Claude Code](https://claude.com/claude-code)

#### ::circle-dot:: Fix rundeck-cli session auth broken behind forwarded-headers proxy  [PR #10596](https://github.com/rundeck/rundeck/pull/10596)


  Fixed a regression where Rundeck could mark the session cookie `Secure` even when this server&#39;s own listener is plain HTTP (deployments behind a TLS-terminating reverse proxy with forwarded headers enabled), which broke session/cookie-based authentication for clients like `rundeck-cli` connecting directly to that HTTP port.

#### ::circle-dot:: Add rundeck.metrics.legacy.enabled to Docker remco config template  [PR #10531](https://github.com/rundeck/rundeck/pull/10531)


  Fixed the official Docker image so that `RUNDECK_METRICS_LEGACY_ENABLED` is honored, enabling the legacy `/metrics/*` endpoints when set.

#### ::circle-dot:: Fix CVE-2026-26032 in Apache Ivy  [PR #10595](https://github.com/rundeck/rundeck/pull/10595)


  Fixed CVE-2026-26032 by upgrading the transitively-included Apache Ivy dependency to 2.6.0.

#### ::circle-dot:: Strip trailing slash from job.serverUrl context variable  [PR #10594](https://github.com/rundeck/rundeck/pull/10594)


  The `${job.serverUrl}` job context variable no longer ends with a trailing slash, so it can be safely concatenated with an absolute path (for example `${job.serverUrl}/api/50/projects`). Job steps that previously relied on the trailing slash (`${job.serverUrl}api/...`) must add the slash explicitly.

  🤖 Generated with [Claude Code](https://claude.com/claude-code)

#### ::circle-dot:: Fix rd system acls create JsonParseException regression  [PR #10537](https://github.com/rundeck/rundeck/pull/10537)


  Fixed a regression where creating system ACL policies via the API or `rd` CLI with a YAML request body and a JSON Accept header could fail with a parse error even though the ACL was created successfully. The server now returns JSON when requested via the Accept header instead of defaulting to the request body&#39;s content type.

#### ::circle-dot:: Promote incubating cluster API endpoints to official, versioned endpoints 


  Promoted the incubating cluster info/member API endpoints to official, versioned (v60) endpoints, with typed response DTOs.

#### ::circle-dot:: Add forceBindingLoginNoAnonymousSearch LDAP option  [PR #10530](https://github.com/rundeck/rundeck/pull/10530)


  Added a new LDAP JAAS module option, `forceBindingLoginNoAnonymousSearch`, for use with `forceBindingLogin`. When enabled, Rundeck authenticates against LDAP servers that don&#39;t allow anonymous or bind-user search by constructing the user&#39;s bind DN directly from `userRdnAttribute`/`userBaseDn` instead of searching for it first.




## Subscribe to Updates

Stay informed about Rundeck development by subscribing to a feed:

- [RSS Feed](https://docs.rundeck.com/docs/feeds/development.xml)
- [Atom Feed](https://docs.rundeck.com/docs/feeds/development-atom.xml)

These feeds are updated regularly to highlight changes that are available in Runbook Automation SaaS and will be included in upcoming Self Hosted releases.

## About These Updates


The development updates are automatically generated from both our private repository for the commercial product and the public open source repository. These changes have been merged since the last GA release and provide insight into what's coming in the next Self Hosted release.

**Note**: These updates reflect changes merged since the last GA release. Self-hosted customers should refer to the [Release Notes](/history/) section for version-specific updates applicable to their installation.

---

**List Last updated:** 2026-10-14


