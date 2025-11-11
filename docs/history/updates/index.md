---
title: Recent Development Updates
description: Latest merged changes from the Rundeck development team
date: 2025-11-11T20:27:05.270Z
feed: true
index: true
---

# Recent Development Updates

Stay up to date with the latest changes and improvements from the Runbook Automation development team.  

This page shows recently merged pull requests from both the Runbook Automation product repository and the open source Rundeck repository merged since the last self-hosted release of [5.17.0](/history/5_x/version-5.17.0.md) on November 4, 2025.


**Last SaaS Deployment:** November 10, 2025


## Recent Changes


#### ::circle-dot:: Multiline Job Options (Beta)  [PR #9822](https://github.com/rundeck/rundeck/pull/9822)


  Adds support for Multiline Job Options as a new choice in the &quot;Option Type&quot; dropdown. This allows users to create job options that can accept multi-line text input instead of being limited to single-line text fields.

#### ::circle-dot:: Update Key Value Data with new Match Substrings checkbox  [PR #9873](https://github.com/rundeck/rundeck/pull/9873)


  This fix addresses an issue where the Key Value Data log filter required regex patterns to match the entire log line due to its use of `Matcher.matches()`. Users found that patterns working in external tools failed in Rundeck because they didn&#39;t consume the full line. To resolve this, we&#39;ve added a new matchSubstrings configuration property that allows users to toggle between full-line matching (using `matches()`) and substring matching (using `find()`). This provides the flexibility to use partial patterns like `^.*&#92;.[A-Z]([0-9]+)&#92;.` without requiring them to match the entire line, while maintaining backward compatibility by defaulting to the original full-line matching behavior.

#### ::circle-dot:: Update nimbusJose for CVE-2025-53864 


#### ::circle-dot:: Update nimbusJose for CVE-2025-53864  [PR #9876](https://github.com/rundeck/rundeck/pull/9876)


#### ::circle-dot:: Fix project export using CLI  [PR #9872](https://github.com/rundeck/rundeck/pull/9872)


  This PR fixes an error in the project export functionality when using the Rundeck CLI by ensuring proper cleanup of resources even when file streaming fails.

#### ::circle-dot:: Bouncy Castle 1.79 for CVE-2025-8916 


#### ::circle-dot:: Fix CVE-2025-8916  [PR #9863](https://github.com/rundeck/rundeck/pull/9863)


#### ::circle-dot:: SSM cannot run job for more than 1 hour 


  Adds configurable SSM execution timeout functionality to allow AWS SSM jobs to run beyond the default 1-hour limit. The changes introduce a new ssm-execution-timeout configuration property that defaults to 3600 seconds (1 hour) but can be adjusted as needed.




## Subscribe to Updates

Stay informed about Rundeck development by subscribing to a feed:

- [RSS Feed](/feeds/development.xml)
- [Atom Feed](/feeds/development-atom.xml)

These feeds are updated after each deployment to our production Runbook Automation SaaS solution. They highlight changes that may not be available in our Self Hosted Releases yet.

## About These Updates


The development updates are automatically generated from both our private repository for the commercial product and the public open source repository to provide complete visibility into changes deployed to the SaaS platform. They provide insight into active development features available in the Runbook Automation SaaS solution and will be released with the next Self Hosted release.

**Note**: These updates only reflect changes deployed to our SaaS platform. Self-hosted customers should refer to the [Release Notes](/history/) section for version-specific updates applicable to their installation.

---

**List Last updated:** 2025-11-11


