---
title: Recent Updates
description: Latest merged changes from the Rundeck development team
date: 2026-03-18T17:41:58.338Z
feed: true
index: true
---

# Recent Updates

Stay up to date with the latest changes and improvements from the Runbook Automation development team.  

This page shows recently merged pull requests from both the Runbook Automation product repository and the open source Rundeck repository merged since the last self-hosted release of [5.19.0](/history/5_x/version-5.19.0.md) on February 2, 2026.

## Recent Changes


#### ::circle-dot:: Add Filename to Runner API output 


  Include the filename in the API output for Runner creation.

#### ::circle-dot:: Add Dutch (nl_NL) UI translations and locale wiring  [PR #9983](https://github.com/rundeck/rundeck/pull/9983)


  Rundeck now supports Dutch (nl_NL) as a user interface language. Users can select Dutch from their profile settings to view Jobs, Activity, Notifications, Nodes, Storage, Webhooks, and Project Configuration screens in Dutch, making Rundeck more accessible to Dutch-speaking teams.

#### ::circle-dot:: Fix command injection vulnerability in exec commands with ${option.name}  [PR #10003](https://github.com/rundeck/rundeck/pull/10003)


  Fixed a critical command injection vulnerability in exec commands where shell control characters in job option values were not properly escaped, now protecting against malicious input by applying shell escaping to all `${option.name}` values by default while providing a compatibility flag for edge cases.

#### ::circle-dot:: Implement conditional workflow logic 


  Introduces backend support for Conditional Logic workflow steps, enabling dynamic workflow execution based on runtime conditions such as job options, node attributes, and prior step outputs.

#### ::circle-dot:: Update to commons-lang3 for CVE-2025-48924  [PR #9990](https://github.com/rundeck/rundeck/pull/9990)


  Updated Apache Commons Lang library to the latest version (commons-lang3) to address CVE-2025-48924, ensuring continued security and compatibility with modern Java standards.

#### ::circle-dot:: Improve Next Ui management  [PR #9981](https://github.com/rundeck/rundeck/pull/9981)


  A new settings modal replaces the previous theme dropdown, providing a unified interface for switching themes and toggling Next UI mode, with visual indicators and notifications to help users understand when Next UI is available and active. Administrators can optionally enable Next UI by default for all users via system configuration.




## Subscribe to Updates

Stay informed about Rundeck development by subscribing to a feed:

- [RSS Feed](https://docs.rundeck.com/docs/feeds/development.xml)
- [Atom Feed](https://docs.rundeck.com/docs/feeds/development-atom.xml)

These feeds are updated regularly to highlight changes that are available in Runbook Automation SaaS and will be included in upcoming Self Hosted releases.

## About These Updates


The development updates are automatically generated from both our private repository for the commercial product and the public open source repository. These changes have been merged since the last GA release and provide insight into what's coming in the next Self Hosted release.

**Note**: These updates reflect changes merged since the last GA release. Self-hosted customers should refer to the [Release Notes](/history/) section for version-specific updates applicable to their installation.

---

**List Last updated:** 2026-03-18


