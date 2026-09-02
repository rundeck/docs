---
title: Recent Updates
description: Latest merged changes from the Rundeck development team
date: 2026-09-02T23:04:37.791Z
feed: true
index: true
---

# Recent Updates

Stay up to date with the latest changes and improvements from the Runbook Automation development team.  

This page shows recently merged pull requests from both the Runbook Automation product repository and the open source Rundeck repository merged since the last self-hosted release of [6.1.0](/history/6_x/version-6.1.0.md) on August 3, 2026.

## Recent Changes


#### ::circle-dot:: Sync activity filters into the URL so browser back/forward preserves them  [PR #10547](https://github.com/rundeck/rundeck/pull/10547)


  Fixed the Activity page so that applied filters are preserved when navigating back from viewing an execution, instead of being silently reset.

#### ::circle-dot:: Fix grails.* config keys being ignored in rundeck-config.groovy  [PR #10538](https://github.com/rundeck/rundeck/pull/10538)


  Fixed `rundeck-config.groovy` so that `grails.serverURL` and other `grails.*` settings are correctly honored instead of being silently ignored.

#### ::circle-dot:: Raise default ACE code editor min lines from 12 to 20  [PR #10536](https://github.com/rundeck/rundeck/pull/10536)


  Raised the default minimum visible lines for the ACE code/script editor from 12 to 20. The minimum (and maximum) can still be customized via System Configuration → GUI.

#### ::circle-dot:: Remove identity id generator from User domain to fix login constraint violation  [PR #10546](https://github.com/rundeck/rundeck/pull/10546)


  Fixed a login failure (`null value in column &quot;id&quot; of relation &quot;rduser&quot;`) that could occur for new users on Rundeck installations that have been upgraded across multiple releases, particularly on PostgreSQL.




## Subscribe to Updates

Stay informed about Rundeck development by subscribing to a feed:

- [RSS Feed](https://docs.rundeck.com/docs/feeds/development.xml)
- [Atom Feed](https://docs.rundeck.com/docs/feeds/development-atom.xml)

These feeds are updated regularly to highlight changes that are available in Runbook Automation SaaS and will be included in upcoming Self Hosted releases.

## About These Updates


The development updates are automatically generated from both our private repository for the commercial product and the public open source repository. These changes have been merged since the last GA release and provide insight into what's coming in the next Self Hosted release.

**Note**: These updates reflect changes merged since the last GA release. Self-hosted customers should refer to the [Release Notes](/history/) section for version-specific updates applicable to their installation.

---

**List Last updated:** 2026-09-02


