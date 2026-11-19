---
title: Recent Updates
description: New features and fixes available in Runbook Automation SaaS ahead of the next self-hosted release
date: 2026-11-04T21:45:52.529Z
feed: true
index: true
---

# Recent Updates

Runbook Automation SaaS receives new features and fixes in regular updates. The updates below are already live in SaaS and will be included in the next self-hosted release of Runbook Automation and Rundeck.

For everything in the current self-hosted version, see the [6.3.0 release notes](/history/6_x/version-6.3.0.md).

## Available Now in SaaS


### ::circle-dot:: Bypass the replica query cache 


  Cluster members no longer fail job start or runner health checks when another member has deleted a runner replica.

### ::circle-dot:: Restrict Git SCM remotes and hide transport errors  [PR #10688](https://github.com/rundeck/rundeck/pull/10688)


  Git SCM import and export can optionally restrict remote URL schemes and reject hosts that resolve to non-public addresses. Both controls are off by default, so existing Git remotes keep working. Git transport errors shown in the UI and API are now a generic message.

### ::circle-dot:: Keep exit code for workflow step plugins on remote runner 


  Error handlers on failed workflow step plugins (local or remote runner) can now read `${result.resultCode}`.

### ::circle-dot:: Keep failureData when a workflow step plugin fails  [PR #10691](https://github.com/rundeck/rundeck/pull/10691)


  Fixed: when a workflow step plugin (for example a script-based workflow step such as a local script step) failed with a non-zero exit code, its error handler could not read the exit code: `${result.resultCode}` was empty. A handler that exported it, such as a Global Variable step, failed with `Empty value`, so the exit code could not be passed to later steps or back to a parent job through a job reference.
  
  Error handlers on failed workflow step plugins now get the step&#39;s exit code in `${result.resultCode}`, the same as Command and Script node steps. This works on the local runner and on remote runners.
  
  Note: with &quot;If a step fails: Run remaining steps&quot; (keepgoing) enabled, a successful error handler marks the failed step as successful. This is existing behavior. Before this fix, such handlers often failed because of the empty value, so the step stayed failed.




## Subscribe to Updates

Stay informed about Rundeck development by subscribing to a feed:

- [RSS Feed](https://docs.rundeck.com/docs/feeds/development.xml)
- [Atom Feed](https://docs.rundeck.com/docs/feeds/development-atom.xml)

The feeds are updated as new features and fixes reach Runbook Automation SaaS.

## About These Updates

This page is generated from changes in both the Runbook Automation product and the open source Rundeck project. It gives self-hosted customers an early look at what is coming in their next upgrade. For version-specific details, see the [Release Notes](/history/).

---

**List Last updated:** 2026-11-04


