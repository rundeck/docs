---

title: "5.18.0 Release Notes"
date: 2025-12-08
image: /images/chevron-logo-red-on-white.png
description: "Rundeck | Runbook Automation Releases 5.18.0 - <DESCRIPTION>"
feed:
 enable: true
 description: ""

---

# 5.18.0 Release Notes

## Overview

<!-- <VidStack src="youtube/REPLACE" poster="https://img.youtube.com/vi/REPLACE/maxresdefault.jpg"/> -->

Terraform Provider 1.0.0

## Runbook Automation Updates

##### ::circle-dot:: Bouncy Castle 1.79 for CVE-2025-8916

##### ::circle-dot:: SSM cannot run job for more than 1 hour
  
Adds configurable SSM execution timeout functionality to allow AWS SSM jobs to run beyond the default 1-hour limit. The changes introduce a new ssm-execution-timeout configuration property that defaults to 3600 seconds (1 hour) but can be adjusted as needed.

##### ::circle-dot:: Update nimbusJose for CVE-2025-53864

##### ::circle-dot:: Set sleep time on sftp plugin
  
Adds a configurable sleep timeout property to the File Transfer plugin, allowing users to customize the wait time after file transfer completion instead of using the hardcoded 2000ms value.  There is a new `sleepTimeout` integer property with a default value of 2000ms.

##### ::circle-dot:: Fixes datacenter value in Vmware resource model
  
This PR fixes the datacenter value retrieval in the VMware resource model by replacing hardcoded parent chain navigation (parent?.getParent()?.getName()) with a dynamic traversal approach that handles VMs at any folder depth. 

Before this fix, any nodes nested more than 2 folders would exhibit the wrong value for the attribute datacenter.

##### ::circle-dot:: Slack Notification Plugin now supports Templates
  
Refactoring and enhancement of the SlackNotificationPlugin to improve template handling, logging, and code robustness. The main changes include support for external FreeMarker templates, safer and more informative logging, and improved per-notification context management.

##### ::circle-dot:: Fix CVE-2025-55163: Upgrade google-cloud-container to 2.82.0
  
This mitigates CVE-2025-55163 (CVSS 8.7, CWE-770) by upgrading the `google-cloud-container` dependency from 2.54.0 to 2.82.0 in both the kubernetes-clusters and gcp-plugins modules.

##### ::circle-dot:: Fix CVE-2025-64756 in glob package
  
Fixed security vulnerability CVE-2025-64756 in the glob package by upgrading to version 10.5.0, which patches a command injection vulnerability in the glob CLI.

##### ::circle-dot:: Mitigate CVE-2025-12383 in jersey-client dependency
  
This PR mitigates CVE-2025-12383 (CVSS 9.4 Critical) in the jersey-client dependency used by the jira-plugins module.


## Rundeck Open Source Product Updates

#####  ::circle-dot:: [Fix CVE-2025-8916](https://github.com/rundeck/rundeck/pull/9863)

#####  ::circle-dot:: [Fix project export using CLI](https://github.com/rundeck/rundeck/pull/9872)
  
This PR fixes an error in the project export functionality when using the Rundeck CLI by ensuring proper cleanup of resources even when file streaming fails.

#####  ::circle-dot:: [Update Key Value Data with new Match Substrings checkbox](https://github.com/rundeck/rundeck/pull/9873)
  
This fix addresses an issue where the Key Value Data log filter required regex patterns to match the entire log line due to its use of `Matcher.matches()`. Users found that patterns working in external tools failed in Rundeck because they didn&#39;t consume the full line. To resolve this, we&#39;ve added a new matchSubstrings configuration property that allows users to toggle between full-line matching (using `matches()`) and substring matching (using `find()`). This provides the flexibility to use partial patterns like `^.*&#92;.[A-Z]([0-9]+)&#92;.` without requiring them to match the entire line, while maintaining backward compatibility by defaulting to the original full-line matching behavior.

#####  ::circle-dot:: [Update nimbusJose for CVE-2025-53864](https://github.com/rundeck/rundeck/pull/9876)

#####  ::circle-dot:: [Multiline Job Options (Beta)](https://github.com/rundeck/rundeck/pull/9822)
  
Adds support for Multiline Job Options as a new choice in the &quot;Option Type&quot; dropdown. This allows users to create job options that can accept multi-line text input instead of being limited to single-line text fields.

#####  ::circle-dot:: [Fix: Nodes page support for url param for filter input](https://github.com/rundeck/rundeck/pull/9881)
  
Fixed an issue where the ?filter= URL parameter was not properly setting the node filter on the Nodes page, ensuring deep links with node filters now work as expected.

#####  ::circle-dot:: [Fix the loading icon showing when a step already succeeded](https://github.com/rundeck/rundeck/pull/9884)
  
Small bug fix: When a job is running, a step that doesn&#39;t have an output shows a loading icon no matter if the step has finished running.

#####  ::circle-dot:: [Fixes missing no output message when looking at a step in the execution page ](https://github.com/rundeck/rundeck/pull/9886)

#####  ::circle-dot:: [Added new ansible-plugin release version](https://github.com/rundeck/rundeck/pull/9893)
  
- Update to the way the Ansible plugin handles ad-hoc command execution, specifically replacing the deprecated -t argument with environment variables for callback configuration, and modernizing inventory argument handling. It also adds and improves tests to ensure these changes work as intended and that user-provided environment variables are respected.

#####  ::circle-dot:: [Upgrade MSSQL JDBC to fix CVE-2025-59250](https://github.com/rundeck/rundeck/pull/9892)
  
Upgraded the Microsoft SQL Server JDBC driver from version 9.4.0.jre8 to 13.2.1.jre8 in the runner-agent module to address security vulnerability CVE-2025-59250.

#####  ::circle-dot:: [Fix OpenAPI spec for metrics endpoints](https://github.com/rundeck/rundeck/pull/9901)
  
Fixed OpenAPI documentation for metrics endpoints to properly represent them as five separate endpoints (/metrics, /metrics/metrics, /metrics/ping, /metrics/threads, /metrics/healthcheck) instead of a single endpoint with an optional parameter. This ensures the OpenAPI Explorer generates correct curl commands and includes example responses for each endpoint, improving API discoverability and developer experience.

#####  ::circle-dot:: [Allow KeyValueDataLogFilterPlugin to capture multiple values ](https://github.com/rundeck/rundeck/pull/9896)
  
Enhanced the Key Value Data Log Filter Plugin to support capturing multiple key-value pairs from a single log line through a new optional allowMultipleMatches property. This enables parsing of complex log formats containing multiple matches (e.g., &quot;user=john role=admin session=abc123&quot;) while maintaining full backward compatibility with the default single-match behavior.

#####  ::circle-dot:: [Fix CVE-2025-64756 in glob package](https://github.com/rundeck/rundeck/pull/9904)
  
Fixed security vulnerability CVE-2025-64756 in the glob package by upgrading to version 10.5.0, which patches a command injection vulnerability in the glob CLI.

#####  ::circle-dot:: [Fix Firefox scroll behavior on execution output tab](https://github.com/rundeck/rundeck/pull/9894)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A5.18.0+is%3Aclosed)





## Links

- Download the Releases: [Open Source](https://www.rundeck.com/community-downloads/5.18.0) | [Self-Hosted](https://www.rundeck.com/enterprise-downloads/5.18.0)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/index.md)
- [Catch us on LinkedIn for the Live Stream Release Videos](https://www.linkedin.com/company/pagerduty/events)

## Version Info

Name: <span style="color: brown"><span class="glyphicon glyphicon-grain"></span> "Monte Fitz Roy brown grain"</span>

Release Date: Decmber 8th, 2025


## Community Contributors

Submit your own Pull Requests to get recognition here!



## Staff Contributors

* Greg Schueler ([gschueler](https://github.com/gschueler))
* Carlos Eduardo ([carlosrfranco](https://github.com/carlosrfranco))
* Eduardo Baltra ([edbaltra](https://github.com/edbaltra))
* Forrest Evans ([fdevans](https://github.com/fdevans))
* Jaime Tobar ([jtobard](https://github.com/jtobard))
* Jake Cohen ([jsboak](https://github.com/jsboak))
* Jaya Singh ([jayas006](https://github.com/jayas006))
* Jesus Osuna ([Jesus-Osuna-M](https://github.com/Jesus-Osuna-M))
* José Vásquez ([hiawvp](https://github.com/hiawvp))
* Luis Toledo ([ltamaster](https://github.com/ltamaster))
* Rodrigo Navarro ([ronaveva](https://github.com/ronaveva))
* Sarah Martinelli Benedetti ([smartinellibenedetti](https://github.com/smartinellibenedetti))