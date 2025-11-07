---
title: Recent Development Updates
description: Latest merged changes from the Rundeck development team
date: 2025-11-07T00:05:10.636Z
feed: true
index: true
---

# Recent Development Updates

Stay up to date with the latest changes and improvements from the Runbook Automation development team.  

This page shows recently merged pull requests from both the Runbook Automation product repository and the open source Rundeck repository merged since the last self-hosted release of [5.17.0](/history/5_x/version-5.17.0.md) on October 23, 2025. These updates reflect changes deployed to our Runbook Automation SaaS platform, combining both private product enhancements and public open source improvements.

## Subscribe to Updates

Stay informed about Rundeck development by subscribing to a feed:

- [RSS Feed](/feeds/development.xml)
- [Atom Feed](/feeds/development-atom.xml)

These feeds are updated after each deployment to our production Runbook Automation SaaS solution. They highlight changes that may not be available in our Self Hosted Releases yet.

## About These Updates


The development updates are automatically generated from both our private repository for the commercial product and the public open source repository to provide complete visibility into changes deployed to the SaaS platform. They provide insight into active development features available in the Runbook Automation SaaS solution and will be released with the next Self Hosted release.

**Note**: These updates only reflect changes deployed to our SaaS platform. Self-hosted customers should refer to the [Release Notes](/history/) section for version-specific updates applicable to their installation.

---

**List Last updated:** 2025-11-07

## Recent Changes


#### ::circle-dot:: Multiline Job Options (Beta) _(Nov 4, 2025)_ [PR #9822](https://github.com/rundeck/rundeck/pull/9822)


  Adds support for Multiline Job Options as a new choice in the &quot;Option Type&quot; dropdown. This allows users to create job options that can accept multi-line text input instead of being limited to single-line text fields.

#### ::circle-dot:: Update nimbusJose for CVE-2025-53864 _(Oct 29, 2025)_


#### ::circle-dot:: Bouncy Castle 1.79 for CVE-2025-8916 _(Oct 23, 2025)_


#### ::circle-dot:: SSM cannot run job for more than 1 hour _(Oct 23, 2025)_


  Adds configurable SSM execution timeout functionality to allow AWS SSM jobs to run beyond the default 1-hour limit. The changes introduce a new ssm-execution-timeout configuration property that defaults to 3600 seconds (1 hour) but can be adjusted as needed.



