---
title: Recent Development Updates
description: Latest merged changes from the Rundeck development team
date: 2025-11-06T18:28:35.090Z
feed: true
index: true
---

# Recent Development Updates

Stay up to date with the latest changes and improvements from the Runbook Automation development team.  

This page shows recently merged pull requests from the Runbook Automation product repository merged since the last self-hosted release of [5.16.0](/history/5_x/version-5.16.0.md) on October 6, 2025. These changes are specific to the commercial Runbook Automation product, which is built on top of the open source Rundeck project. For updates to the open source Rundeck code, visit the [Rundeck GitHub repository](https://github.com/rundeck/rundeck).

## Subscribe to Updates

Stay informed about Rundeck development by subscribing to a feed:

- [RSS Feed](/feeds/development.xml)
- [Atom Feed](/feeds/development-atom.xml)

These feeds are updated after each deployment to our production Runbook Automation SaaS solution. They highlight changes that may not be available in our Self Hosted Releases yet.

## About These Updates


The development updates are automatically generated from our private development repository to highlight key changes happening in the SaaS solution. They provide insight into active development features available in the Runbook Automation SaaS solution and will be released with the next Self Hosted release.

**Note**: These updates only reflect changes deployed to our SaaS platform. Self-hosted customers should refer to the [Release Notes](/history/) section for version-specific updates applicable to their installation.

---

**List Last updated:** 2025-11-06

## Recent Changes


#### ::circle-check:: Update nimbusJose for CVE-2025-53864 _(Oct 29, 2025)_

#### ::circle-check:: Bouncy Castle 1.79 for CVE-2025-8916 _(Oct 23, 2025)_

#### ::circle-check:: SSM cannot run job for more than 1 hour _(Oct 23, 2025)_

  Adds configurable SSM execution timeout functionality to allow AWS SSM jobs to run beyond the default 1-hour limit. The changes introduce a new ssm-execution-timeout configuration property that defaults to 3600 seconds (1 hour) but can be adjusted as needed.

#### ::circle-check:: Improvement in the create runner endpoint to validate assignedProjects prop format _(Oct 22, 2025)_

  Fixed an issue to avoid creating a runner via API with a wrong format to the assginedProject property. Currently, the runner is being created even if this property is not correct and it causes an error when listing runner from the GUI or via API

#### ::circle-check:: Fix RSS Feeds plugin not recognizing Dates on Microsoft RSS Feeds _(Oct 22, 2025)_

  Error that occurs when processing RSS feeds that use Z as the timezone indicator instead of standard abbreviations like GMT or UTC.

#### ::circle-check:: Set default runner replica type to manual if not provided in API request _(Oct 21, 2025)_

#### ::circle-check:: Allow Script Arguments on GitHub Run Script plugin _(Oct 21, 2025)_

  Adds support for passing custom arguments to scripts executed by the GitHubScriptPlugin, allowing users to specify script arguments with shell-like quoting and escaping functionality.

#### ::circle-check:: Improve the nodehealth check cache refresh _(Oct 21, 2025)_

  Removes the automatic 30-second cache refresh mechanism for node health checks and replaces it with a GUI-based refresh approach. The change eliminates forced periodic cache reloads that occurred every 30 seconds, improving performance by relying on user-initiated refreshes instead.

#### ::circle-check:: Runner Wizard error creating runner linux+ephemeral _(Oct 8, 2025)_



