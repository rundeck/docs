---
title: Recent Updates
description: Latest merged changes from the Rundeck development team
date: 2026-10-22T21:21:54.916Z
feed: true
index: true
---

# Recent Updates

Stay up to date with the latest changes and improvements from the Runbook Automation development team.  

This page shows recently merged pull requests from both the Runbook Automation product repository and the open source Rundeck repository merged since the last self-hosted release of [6.2.1](/history/6_x/version-6.2.1.md) on September 9, 2026.

## Recent Changes


#### ::circle-dot:: Restrict Git SCM remotes and hide transport errors  [PR #10688](https://github.com/rundeck/rundeck/pull/10688)


  Git SCM import and export can optionally restrict remote URL schemes and reject hosts that resolve to non-public addresses. Both controls are off by default, so existing Git remotes keep working. Git transport errors shown in the UI and API are now a generic message.

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

**List Last updated:** 2026-10-22


