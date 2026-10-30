---
title: Recent Updates
description: Latest merged changes from the Rundeck development team
date: 2026-10-28T20:16:09.027Z
feed: true
index: true
---

# Recent Updates

Stay up to date with the latest changes and improvements from the Runbook Automation development team.  

This page shows recently merged pull requests from both the Runbook Automation product repository and the open source Rundeck repository merged since the last self-hosted release of [6.3.0](/history/6_x/version-6.3.0.md) on October 22, 2026.

## Recent Changes


#### ::circle-dot:: Bypass the replica query cache 


  Cluster members no longer fail job start or runner health checks when another member has deleted a runner replica.

#### ::circle-dot:: Build remco with Go 1.27.3 for CVE-2026-111943 (eMudhra)  [PR #10727](https://github.com/rundeck/rundeck/pull/10727)


  Docker images: remco is now built with Go 1.27.3 to address CVE-2026-111943. Rebuild and republish images; customers should pull updated tags.


  Made with [Cursor](https://cursor.com)

#### ::circle-dot:: Restrict Git SCM remotes and hide transport errors  [PR #10688](https://github.com/rundeck/rundeck/pull/10688)


  Git SCM import and export can optionally restrict remote URL schemes and reject hosts that resolve to non-public addresses. Both controls are off by default, so existing Git remotes keep working. Git transport errors shown in the UI and API are now a generic message.

#### ::circle-dot:: Web UI time zone data updated for 2026 Canadian DST changes  [PR #10695](https://github.com/rundeck/rundeck/pull/10695)


  **Fixed:** Updated the timezone library bundled with the web UI (moment 2.31.0, moment-timezone 0.6.5 with IANA tzdb 2026e). Dates and times on the web UI pages that use it (job scheduler, date/time picker and run-later, activity, job and execution views) are now correct for the 2026 Canadian time zone changes that take effect November 1, 2026: British Columbia (`America/Vancouver`), Alberta (`America/Edmonton`), Northwest Territories (`America/Inuvik`), and Manitoba (`America/Winnipeg`).
  
  **Note — may still be affected:** This change covers only the timezone data bundled with the web UI. **Server-side job scheduling** uses the timezone data of the Java runtime that Rundeck runs on, and that depends on how Rundeck is installed:
  - **Official Docker images:** fixed separately in #10698, which patches the image&#39;s Java runtime to tzdb 2026e. Restart or redeploy on the updated image before November 1 so schedules are recalculated.
  - **Installs on your own OS (DEB/RPM/WAR) and self-hosted runners:** these use whatever Java runtime is installed on that host. As of mid-October 2026, no published Java build includes tzdb 2026e, and installing the OS `tzdata` package doesn&#39;t update Java. Use the vendor&#39;s timezone updater tool, or temporarily schedule affected jobs in an equivalent fixed-offset zone until the vendor ships 2026e.
  
  Until the Java runtime has tzdb 2026e or later, scheduled jobs in `America/Edmonton`, `America/Inuvik`, or `America/Winnipeg` (and `America/Vancouver` on runtimes older than 2026b) may run one hour off from November 2, 2026. Interim workaround: schedule those jobs in an equivalent fixed-offset zone (`America/Regina` for Alberta and the Northwest Territories, `America/Panama` for Manitoba), and switch back once the runtime is updated.

#### ::circle-dot:: Docker images updated with 2026 Canadian time zone data  [PR #10698](https://github.com/rundeck/rundeck/pull/10698)


  **Fixed:** The official Docker images now include IANA tzdb 2026e timezone data for the Java runtime. Scheduled jobs in `America/Edmonton`, `America/Inuvik` and `America/Winnipeg` (Alberta, Northwest Territories, Manitoba) keep firing at the correct local time after these provinces stop observing DST on November 1, 2026. Restart or redeploy Rundeck on the updated image before November 1 so schedules are recalculated.

#### ::circle-dot:: Keep exit code for workflow step plugins on remote runner 


  Error handlers on failed workflow step plugins (local or remote runner) can now read `${result.resultCode}`.

#### ::circle-dot:: Keep failureData when a workflow step plugin fails  [PR #10691](https://github.com/rundeck/rundeck/pull/10691)


  Fixed: when a workflow step plugin (for example a script-based workflow step such as a local script step) failed with a non-zero exit code, its error handler could not read the exit code: `${result.resultCode}` was empty. A handler that exported it, such as a Global Variable step, failed with `Empty value`, so the exit code could not be passed to later steps or back to a parent job through a job reference.

  Error handlers on failed workflow step plugins now get the step&#39;s exit code in `${result.resultCode}`, the same as Command and Script node steps. This works on the local runner and on remote runners.

  Note: with &quot;If a step fails: Run remaining steps&quot; (keepgoing) enabled, a successful error handler marks the failed step as successful. This is existing behavior. Before this fix, such handlers often failed because of the empty value, so the step stayed failed.

  🤖 Generated with [Claude Code](https://claude.com/claude-code)




## Subscribe to Updates

Stay informed about Rundeck development by subscribing to a feed:

- [RSS Feed](https://docs.rundeck.com/docs/feeds/development.xml)
- [Atom Feed](https://docs.rundeck.com/docs/feeds/development-atom.xml)

These feeds are updated regularly to highlight changes that are available in Runbook Automation SaaS and will be included in upcoming Self Hosted releases.

## About These Updates


The development updates are automatically generated from both our private repository for the commercial product and the public open source repository. These changes have been merged since the last GA release and provide insight into what's coming in the next Self Hosted release.

**Note**: These updates reflect changes merged since the last GA release. Self-hosted customers should refer to the [Release Notes](/history/) section for version-specific updates applicable to their installation.

---

**List Last updated:** 2026-10-28


