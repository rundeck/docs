---
title: Recent Updates
description: Latest merged changes from the Rundeck development team
date: 2026-05-13T16:42:38.311Z
feed: true
index: true
---

# Recent Updates

Stay up to date with the latest changes and improvements from the Runbook Automation development team.  

This page shows recently merged pull requests from both the Runbook Automation product repository and the open source Rundeck repository merged since the last self-hosted release of [5.20.0](/history/5_x/version-5.20.0.md) on April 1, 2026.

## Recent Changes


#### ::circle-dot:: [RUN-4410] Upgrade log4J to 2.25.4  [PR #10086](https://github.com/rundeck/rundeck/pull/10086)


  Fix CVE-2026-34478 and CVE-2026-34480 by upgrading to 2.25.4

#### ::circle-dot:: [RUN-4401] German (de_DE) is now available as a full UI language.  [PR #10018](https://github.com/rundeck/rundeck/pull/10018)


  German (de_DE) is now available as a full UI language. Users can choose it in their profile to localize server-rendered pages and the job editor experience, including scheduling and workflow views, and several labels that were previously English-only now use the translation system so they appear correctly in German and other locales.

#### ::circle-dot:: [RUN-3885] Fix project runner replica list gated on delete permission 


  Fixed a bug where **viewing runner replicas** in a project incorrectly required **delete** permission on project runners in addition to read. **Read access alone is now enough** to see replica information in Runner Management, so least-privilege ACLs work as administrators expect.

#### ::circle-dot:: [RUN-3192] Execution log runner UI (i18n + badge settings) 


  Execution log: runner plugin registers i18n for the “Display Runner Badge” setting; fixes missing translation key and non-functional toggle when combined with updated ui-trellis LogViewer `addUiMessages` provider.

#### ::circle-dot:: [RUN-4318] Prevent saving job when workflow step is in edit mode 


  The job editor now blocks saving a job while a workflow step is still being edited, and shows a warning, so you do not lose in-progress step changes. This restores the same safeguard that existed in the previous workflow editor after the Vue workflow UI update.

#### ::circle-dot:: [RUN-4121] Mask key storage secrets for all provider indexes in system config 


  When multiple key storage providers are configured, sensitive settings such as tokens and passwords are now masked consistently in System Configuration and admin configuration responses, instead of sometimes appearing in clear text for providers beyond the first.




## Subscribe to Updates

Stay informed about Rundeck development by subscribing to a feed:

- [RSS Feed](https://docs.rundeck.com/docs/feeds/development.xml)
- [Atom Feed](https://docs.rundeck.com/docs/feeds/development-atom.xml)

These feeds are updated regularly to highlight changes that are available in Runbook Automation SaaS and will be included in upcoming Self Hosted releases.

## About These Updates


The development updates are automatically generated from both our private repository for the commercial product and the public open source repository. These changes have been merged since the last GA release and provide insight into what's coming in the next Self Hosted release.

**Note**: These updates reflect changes merged since the last GA release. Self-hosted customers should refer to the [Release Notes](/history/) section for version-specific updates applicable to their installation.

---

**List Last updated:** 2026-05-13


