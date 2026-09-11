---
title: Recent Updates
description: Latest merged changes from the Rundeck development team
date: 2026-09-11T19:52:35.870Z
feed: true
index: true
---

# Recent Updates

Stay up to date with the latest changes and improvements from the Runbook Automation development team.  

This page shows recently merged pull requests from both the Runbook Automation product repository and the open source Rundeck repository merged since the last self-hosted release of [6.2.1](/history/6_x/version-6.2.1.md) on September 9, 2026.

## Recent Changes


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

**List Last updated:** 2026-09-11


