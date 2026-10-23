---

title: "6.3.0 Release Notes"
date: 2026-10-22
image: /images/chevron-logo-red-on-white.png
description: "Rundeck | Runbook Automation Releases 6.3.0 - Canadian time zone updates, webhook token hashing, plugin upload hardening, and PagerDuty plugin improvements"
feed:
 enable: true
 description: ""

---

# 6.3.0 Release Notes

## Overview

Rundeck 6.3.0 makes Conditional Logic generally available, and also focuses on security hardening, upcoming timezone changes, and reliability fixes.

::: warning Security update: eMudhra intermediate CA
If you run Rundeck or Runbook Automation from the official Docker images, upgrade to 6.3.0 and redeploy. SaaS is not affected. This release ships a few days ahead of schedule with patched Docker images that no longer trust the compromised eMudhra intermediate certificate authority certificates. This is not a vulnerability in Rundeck or Runbook Automation code, and there is no known exploitation. See the [security advisory](../cves/2026-10-emudhra-ca.md) for details and verification steps.
:::

**Conditional Logic is now Generally Available.** In Runbook Automation, Conditional Logic steps are now enabled by default, with no configuration change required. Use them to branch a workflow at runtime based on option values, node attributes, or outputs from earlier steps, without writing if/then logic in scripts or maintaining separate jobs for each scenario. On 5.20.0 through 6.2.x this feature was Early Access behind a feature flag. To turn it off, set `rundeck.feature.earlyAccessJobConditional.enabled=false` and restart. See [Conditional Logic Steps](../../manual/jobs/conditional-logic.md) and the [how-to guide](../../learning/howto/using-conditional-logic.md).

**Use step outputs without log filters.** As part of Conditionals in Runbook Automation, step plugins can now declare outputs with the `@PluginOutput` annotation. Their values are saved as variables in the job's global context, where later steps and Conditional Logic can use them without a log filter to capture them. More than 20 built-in plugins already expose outputs. In the Conditional Logic editor, the **Field** dropdown now includes a **Prior Steps** tab that lists the eligible earlier steps and their outputs. Plugin developers can see [Exposing Step Outputs](../../developer/step-plugins.md#exposing-step-outputs-for-conditional-logic).

**Prepare for the November 2026 Canadian time zone changes.** Alberta, the Northwest Territories, and Manitoba stop observing daylight saving time on November 1, 2026. This release updates the timezone data bundled with the web UI and the Java runtime in the official Docker images. If you run Docker, upgrade and restart before November 1 so schedules are recalculated. If you install Rundeck on your own OS (DEB/RPM/WAR) or use self-hosted runners, read the [timezone note](#web-ui-time-zone-data-updated-for-2026-canadian-dst-changes) below: server-side scheduling depends on your Java runtime's timezone data, which may need a separate update or a temporary workaround.

**Security improvements.** Webhook auth tokens are now hashed at rest and migrated automatically on startup. The plugin upload and install flow has been hardened against unvalidated files, path traversal, and local file URLs. Several third-party dependency CVEs are also resolved (reactor-core, Apache Ant, Apache Ivy).

**Runbook Automation updates.** The PagerDuty plugins receive a round of fixes and new options, the Azure Resource Model node source can now be disabled without being deleted, and the cluster info and member API endpoints are promoted from incubating to versioned (v60) endpoints.

**Other highlights:**

- Job pages warn you when a scheduled job's saved user is no longer authorized to run it.
- SCM import and export status resolves much faster for large projects with deep git history.
- A new LDAP option, `forceBindingLoginNoAnonymousSearch`, supports directories that disallow anonymous or bind-user search, and LDAP user attributes (first name, last name, email) now sync correctly from Active Directory.
- Dark mode fixes for badges, buttons, popovers, and browser-native controls.

::: warning Behavior change
`${job.serverUrl}` no longer ends with a trailing slash. Job steps that use `${job.serverUrl}api/...` must be updated to `${job.serverUrl}/api/...`.
:::

<!-- <VidStack src="youtube/REPLACE" poster="https://img.youtube.com/vi/REPLACE/maxresdefault.jpg"/> -->

## Runbook Automation Updates

##### ::circle-dot:: PagerDuty plugin fixes and enhancements
  
Fixed several bugs in the PagerDuty plugins (multi-byte characters and empty notes in &quot;Add Note&quot;, a response-parsing crash in &quot;Update Incident&quot; after setting Priority, malformed Authorization headers in &quot;Send a Change Event&quot; and &quot;Add Responders&quot;), removed an unused API Key field from &quot;Send a Change Event&quot;, added `include[]` option checkboxes to &quot;Get Incident&quot; and a Priority field to &quot;Update Incident&quot;, and pretty-printed JSON in debug-mode HTTP logs.

##### ::circle-dot:: Add Disable option to Azure Resource Model node source
  
Added a **Disable** option to the Azure Resource Model node source so you can turn off a misconfigured or unwanted node source without deleting it. When disabled, Rundeck skips Azure API calls and the source contributes no nodes; disabled entries appear greyed out in the node sources list. Defaults to off so existing configurations are unchanged.

##### ::circle-dot:: Promote incubating cluster API endpoints to official, versioned endpoints
  
Promoted the incubating cluster info/member API endpoints to official, versioned (v60) endpoints, with typed response DTOs.


## Rundeck Open Source Product Updates

#####  ::circle-dot:: [Web UI time zone data updated for 2026 Canadian DST changes](https://github.com/rundeck/rundeck/pull/10695)
  
**Fixed:** Updated the timezone library bundled with the web UI (moment 2.31.0, moment-timezone 0.6.5 with IANA tzdb 2026e). Dates and times on the web UI pages that use it (job scheduler, date/time picker and run-later, activity, job and execution views) are now correct for the 2026 Canadian time zone changes that take effect November 1, 2026: British Columbia (`America/Vancouver`), Alberta (`America/Edmonton`), Northwest Territories (`America/Inuvik`), and Manitoba (`America/Winnipeg`).

**Note — may still be affected:** This change covers only the timezone data bundled with the web UI. **Server-side job scheduling** uses the timezone data of the Java runtime that Rundeck runs on, and that depends on how Rundeck is installed:
- **Official Docker images:** fixed separately (see below), which patches the image&#39;s Java runtime to tzdb 2026e. Restart or redeploy on the updated image before November 1 so schedules are recalculated.
- **Installs on your own OS (DEB/RPM/WAR) and self-hosted runners:** these use whatever Java runtime is installed on that host. As of mid-October 2026, no published Java build includes tzdb 2026e, and installing the OS `tzdata` package doesn&#39;t update Java. Use the vendor&#39;s timezone updater tool, or temporarily schedule affected jobs in an equivalent fixed-offset zone until the vendor ships 2026e.

Until the Java runtime has tzdb 2026e or later, scheduled jobs in `America/Edmonton`, `America/Inuvik`, or `America/Winnipeg` (and `America/Vancouver` on runtimes older than 2026b) may run one hour off from November 2, 2026. Interim workaround: schedule those jobs in an equivalent fixed-offset zone (`America/Regina` for Alberta and the Northwest Territories, `America/Panama` for Manitoba), and switch back once the runtime is updated.

#####  ::circle-dot:: [Docker images updated with 2026 Canadian time zone data](https://github.com/rundeck/rundeck/pull/10698)
  
**Fixed:** The official Docker images now include IANA tzdb 2026e timezone data for the Java runtime. Scheduled jobs in `America/Edmonton`, `America/Inuvik` and `America/Winnipeg` (Alberta, Northwest Territories, Manitoba) keep firing at the correct local time after these provinces stop observing DST on November 1, 2026. Restart or redeploy Rundeck on the updated image before November 1 so schedules are recalculated.

#####  ::circle-dot:: [Fix rundeck-cli session login behind a TLS-terminating reverse proxy](https://github.com/rundeck/rundeck/pull/10596)
  
Fixed a regression where Rundeck could mark the session cookie `Secure` even when this server&#39;s own listener is plain HTTP (deployments behind a TLS-terminating reverse proxy with forwarded headers enabled), which broke session/cookie-based authentication for clients like `rundeck-cli` connecting directly to that HTTP port.

#####  ::circle-dot:: [Fix parse error when creating system ACLs with a YAML body and JSON response](https://github.com/rundeck/rundeck/pull/10537)
  
Fixed a regression where creating system ACL policies via the API or `rd` CLI with a YAML request body and a JSON Accept header could fail with a parse error even though the ACL was created successfully. The server now returns JSON when requested via the Accept header instead of defaulting to the request body&#39;s content type.

#####  ::circle-dot:: [Docker image now honors `RUNDECK_METRICS_LEGACY_ENABLED`](https://github.com/rundeck/rundeck/pull/10531)
  
Fixed the official Docker image so that `RUNDECK_METRICS_LEGACY_ENABLED` is honored, enabling the legacy `/metrics/*` endpoints when set.

#####  ::circle-dot:: [Faster SCM import and export status for large repositories](https://github.com/rundeck/rundeck/pull/10629)
  
SCM git import and export now resolve job status with a single repository history walk per HEAD instead of one walk per job, and the SCM loader no longer runs catch-up cycles back-to-back when a cycle exceeds `rundeck.scmLoader.interval`. Large projects tracking repositories with deep history see import status refresh in seconds instead of minutes.

#####  ::circle-dot:: [Webhook auth tokens are now hashed at rest](https://github.com/rundeck/rundeck/pull/10477)
  
Webhook auth tokens are now hashed at rest (SHA-256), matching every other API token type. Existing webhook tokens are automatically migrated on next server startup; no action is required and existing webhook URLs continue to work unchanged.

#####  ::circle-dot:: [Fix LDAP sync of first name, last name, and email from Active Directory](https://github.com/rundeck/rundeck/pull/10532)
  
Fixed LDAP authentication (`JettyCachingLdapLoginModule`) so that first name, last name, and email are correctly synced from directories (e.g. Active Directory) that require attributes to be explicitly requested in the search, rather than silently syncing `null` values.

#####  ::circle-dot:: [Workflow Strategy help text no longer saved into job definitions](https://github.com/rundeck/rundeck/pull/10539)
  
Fixed the Workflow Strategy configuration so its descriptive help text is no longer saved into the job definition and exported YAML as raw HTML. This will not fix existing jobs, but opening and resaving the job manually will fix the issue.

#####  ::circle-dot:: [Fix Nodes page 500 error when a node source fails to load](https://github.com/rundeck/rundeck/pull/10592)
  
Fixed: the Nodes page could return an HTTP 500 instead of a normal error indicator when a node source failed to load.

#####  ::circle-dot:: [Strip trailing slash from job.serverUrl context variable](https://github.com/rundeck/rundeck/pull/10594)
  
The `${job.serverUrl}` job context variable no longer ends with a trailing slash, so it can be safely concatenated with an absolute path (for example `${job.serverUrl}/api/50/projects`). Job steps that previously relied on the trailing slash (`${job.serverUrl}api/...`) must add the slash explicitly.

#####  ::circle-dot:: [Warn when a scheduled job&#39;s saved user can no longer run it](https://github.com/rundeck/rundeck/pull/10670)
  
Job pages now show a warning when a scheduled job&#39;s saved user is no longer authorized to run it.

#####  ::circle-dot:: [Fix reactor-core CVEs (CVE-2026-47857, CVE-2026-47863)](https://github.com/rundeck/rundeck/pull/10606)
  
Fixed CVE-2026-47857 and CVE-2026-47863 by upgrading the transitively-included reactor-core
dependency to 3.8.7.

#####  ::circle-dot:: [Fix CVE-2026-78254 in Apache Ant](https://github.com/rundeck/rundeck/pull/10618)
  
Fixed CVE-2026-78254 by upgrading the bundled Apache Ant dependency to 1.10.18.

#####  ::circle-dot:: [Dark mode: badges, default labels and unstyled secondary buttons](https://github.com/rundeck/rundeck/pull/10624)
  
Fixed dark mode rendering of status badges, default labels, and several secondary buttons (plugin Uninstall, job search Cancel/Clear, bulk edit Select All/None) that kept light backgrounds or unstyled native chrome in dark mode.

#####  ::circle-dot:: [Dark mode: declare color-scheme and fix light popover arrow](https://github.com/rundeck/rundeck/pull/10639)
  
Dark mode now renders browser-native chrome (scrollbars, checkboxes, radios, native select popups) in dark, and popover arrows no longer show as light bars at the bottom edge of dark popovers.

#####  ::circle-dot:: [Fix plugin upload security issues](https://github.com/rundeck/rundeck/pull/10602)
  
Fixed several security issues in the plugin upload/install flow: `.groovy` plugin files are no longer accepted without validation, uploaded/installed filenames are sanitized against path traversal, plugin install/uninstall authorization now correctly checks the `plugin` resource kind, and `installPlugin` no longer accepts local `file:` URLs.

#####  ::circle-dot:: [Fix CVE-2026-26032 in Apache Ivy](https://github.com/rundeck/rundeck/pull/10595)
  
Fixed CVE-2026-26032 by upgrading the transitively-included Apache Ivy dependency to 2.6.0.

#####  ::circle-dot:: [Add forceBindingLoginNoAnonymousSearch LDAP option](https://github.com/rundeck/rundeck/pull/10530)
  
Added a new LDAP JAAS module option, `forceBindingLoginNoAnonymousSearch`, for use with `forceBindingLogin`. When enabled, Rundeck authenticates against LDAP servers that don&#39;t allow anonymous or bind-user search by constructing the user&#39;s bind DN directly from `userRdnAttribute`/`userBaseDn` instead of searching for it first.


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A6.3.0+is%3Aclosed)


## Links

- Download the Releases: [Open Source](https://www.rundeck.com/community-downloads/6.3.0) | [Self-Hosted](https://www.rundeck.com/enterprise-downloads/6.3.0)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/index.md)
- [Catch us on LinkedIn for the Live Stream Release Videos](https://www.linkedin.com/company/pagerduty/events)

## Version Info

Name: <span style="color: turquoise"><span class="glyphicon glyphicon-lamp"></span> "Centaurus turquoise lamp"</span>

Release Date: October 22nd, 2026


## Community Contributors

Submit your own Pull Requests to get recognition here!

* Luis Alamo ([luismalamoc](https://github.com/luismalamoc))
* David Darby ([ddarby-hike](https://github.com/ddarby-hike))
* Jauregui ([jauregui82](https://github.com/jauregui82))


## Staff Contributors

* Greg Schueler ([gschueler](https://github.com/gschueler))
* Carlos Eduardo ([carlosrfranco](https://github.com/carlosrfranco))
* Forrest Evans ([fdevans](https://github.com/fdevans))
* Jaime Tobar ([jtobard](https://github.com/jtobard))
* Jesus Osuna ([Jesus-Osuna-M](https://github.com/Jesus-Osuna-M))
* Luis Toledo ([ltamaster](https://github.com/ltamaster))
* Nicolás Jesús Cofré Ortiz ([ncofreortiz-hub](https://github.com/ncofreortiz-hub))
* Rodrigo Navarro ([ronaveva](https://github.com/ronaveva))
* Sarah Martinelli Benedetti ([smartinellibenedetti](https://github.com/smartinellibenedetti))