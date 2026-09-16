---
title: Recent Updates
description: Latest merged changes from the Rundeck development team
date: 2026-09-16T23:24:49.370Z
feed: true
index: true
---

# Recent Updates

Stay up to date with the latest changes and improvements from the Runbook Automation development team.  

This page shows recently merged pull requests from both the Runbook Automation product repository and the open source Rundeck repository merged since the last self-hosted release of [6.2.1](/history/6_x/version-6.2.1.md) on September 9, 2026.

## Recent Changes


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

**List Last updated:** 2026-09-16


