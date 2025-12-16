---
title: Recent Updates
description: Latest merged changes from the Rundeck development team
date: 2025-12-09T17:07:58.201Z
feed: true
index: true
---

# Recent Updates

Stay up to date with the latest changes and improvements from the Runbook Automation development team.  

This page shows recently merged pull requests from both the Runbook Automation product repository and the open source Rundeck repository merged since the last self-hosted release of [5.17.0](/history/5_x/version-5.17.0.md) on November 4, 2025.


**Last SaaS Deployment:** November 24, 2025


## Recent Changes


#### ::circle-dot:: Fix 500 error on duplicate user creation - return 409 Conflict with proper error message 


  **Fixed API error handling for duplicate user creation and added complete OpenAPI documentation.** The user creation API endpoint (`PUT /api/44/secure/users/create`) now properly handles duplicate username errors. Previously, attempting to create a user with an existing username returned an HTTP 500 Internal Server Error with an HTML error page. Now it correctly returns HTTP 409 Conflict with a clean JSON error message: `{&quot;err&quot;: &quot;User with username &#39;xyz&#39; already exists&quot;}`. Additionally, the endpoint now includes comprehensive OpenAPI documentation with detailed request body schemas (including the `username`, `pwd`, and `roles` fields), multiple JSON examples for basic and complete user creation, and documentation for all response codes (201, 400, 403, 409). This fix improves API reliability and makes it easier for API consumers to handle duplicate user scenarios programmatically.

#### ::circle-dot:: Enhance OpenAPI documentation for Runner Management configuration endpoint 


  Improved OpenAPI specification documentation for the Runner Management configuration endpoint, providing clearer guidance for API consumers on how to configure automatic vs manual runner assignment for projects.

#### ::circle-dot:: Enhance OpenAPI documentation for 15 API endpoints  [PR #9908](https://github.com/rundeck/rundeck/pull/9908)


  Enhanced OpenAPI specification documentation for 15 API endpoints across multiple controllers, improving clarity for API consumers and generated SDK quality. All changes are documentation-only and fully backward compatible with no breaking changes to existing API behavior.

  Key improvements include clarification of query parameter usage for Ad Hoc endpoints, addition of previously undocumented POST method support for project export endpoints, and comprehensive documentation of 404 response scenarios for execution state, SCM status, and project file endpoints.

  ---

#### ::circle-dot:: Update OCI SDK to 3.43.2 to address CVE-2024-30172 


  Updated Oracle Cloud Infrastructure (OCI) Java SDK to version 3.43.2 to address security vulnerability CVE-2024-30172. This update affects the Oracle Cloud plugins and Oracle Cloud Health Check plugin, improving the security posture of Oracle Cloud integrations.

#### ::circle-dot:: Fix webpack bundling configuration for vue3-markdown to prevent System Configuration from loading  [PR #9916](https://github.com/rundeck/rundeck/pull/9916)


#### ::circle-dot:: Regenerate Credentials button is hidden for Ephemeral Runners 


  Fixed an issue where the Regenerate Credentials button was incorrectly hidden for Ephemeral Runners in the Runner Management interface, ensuring users can now properly regenerate credentials for ephemeral runner types.

#### ::circle-dot:: Fix CVE-2025-8916 by updating dependencies and forcing BouncyCastle 1.79 


  **Security Enhancement**: Fixed CVE-2025-8916 (BouncyCastle vulnerability, CVSS 6.3) by updating OCI SDK to 3.21.0, Kubernetes client to 22.0.0, Spring Security RSA to 1.0.13, and globally forcing BouncyCastle to the patched version 1.79 across all affected components. This addresses &quot;Allocation of Resources Without Limits or Throttling&quot; vulnerabilities in 6 plugins: cloud-oraclecloud-healthcheck-plugin, kubernetes-clusters, rundeckpro-config, rundeckpro-security, runbook-automation-data-spi, and runbook-automation-utils.

#### ::circle-dot:: Update sshj to 0.40.0 for CVE-2025-8916  [PR #9907](https://github.com/rundeck/rundeck/pull/9907)


  Updated sshj dependency in the git-plugin from 0.33.0 to 0.40.0 to address CVE-2025-8916, a security vulnerability in the SSH library.

#### ::circle-dot:: Ansible Plugin Improvements 


  Update to the way the Ansible plugin handles ad-hoc command execution, specifically replacing the deprecated -t argument with environment variables for callback configuration, and modernizing inventory argument handling. It also adds and improves tests to ensure these changes work as intended and that user-provided environment variables are respected.

#### ::circle-dot:: Fix Firefox scroll behavior on execution output tab  [PR #9894](https://github.com/rundeck/rundeck/pull/9894)


#### ::circle-dot:: Mitigate CVE-2025-12383 in jersey-client dependency 


  This PR mitigates CVE-2025-12383 (CVSS 9.4 Critical) in the jersey-client dependency used by the jira-plugins module.

#### ::circle-dot:: Fix CVE-2025-64756 in glob package 


  Fixed security vulnerability CVE-2025-64756 in the glob package by upgrading to version 10.5.0, which patches a command injection vulnerability in the glob CLI.

#### ::circle-dot:: Fix CVE-2025-64756 in glob package  [PR #9904](https://github.com/rundeck/rundeck/pull/9904)


  Fixed security vulnerability CVE-2025-64756 in the glob package by upgrading to version 10.5.0, which patches a command injection vulnerability in the glob CLI.

#### ::circle-dot:: Allow KeyValueDataLogFilterPlugin to capture multiple values  [PR #9896](https://github.com/rundeck/rundeck/pull/9896)


  Enhanced the Key Value Data Log Filter Plugin to support capturing multiple key-value pairs from a single log line through a new optional allowMultipleMatches property. This enables parsing of complex log formats containing multiple matches (e.g., &quot;user=john role=admin session=abc123&quot;) while maintaining full backward compatibility with the default single-match behavior.

#### ::circle-dot:: Fix OpenAPI spec for metrics endpoints  [PR #9901](https://github.com/rundeck/rundeck/pull/9901)


  Fixed OpenAPI documentation for metrics endpoints to properly represent them as five separate endpoints (/metrics, /metrics/metrics, /metrics/ping, /metrics/threads, /metrics/healthcheck) instead of a single endpoint with an optional parameter. This ensures the OpenAPI Explorer generates correct curl commands and includes example responses for each endpoint, improving API discoverability and developer experience.

#### ::circle-dot:: Fix CVE-2025-55163: Upgrade google-cloud-container to 2.82.0 


  This mitigates CVE-2025-55163 (CVSS 8.7, CWE-770) by upgrading the `google-cloud-container` dependency from 2.54.0 to 2.82.0 in both the kubernetes-clusters and gcp-plugins modules.

#### ::circle-dot:: Upgrade MSSQL JDBC to fix CVE-2025-59250  [PR #9892](https://github.com/rundeck/rundeck/pull/9892)


  Upgraded the Microsoft SQL Server JDBC driver from version 9.4.0.jre8 to 13.2.1.jre8 in the runner-agent module to address security vulnerability CVE-2025-59250.

#### ::circle-dot:: Slack Notification Plugin now supports Templates 


  Refactoring and enhancement of the SlackNotificationPlugin to improve template handling, logging, and code robustness. The main changes include support for external FreeMarker templates, safer and more informative logging, and improved per-notification context management.

#### ::circle-dot:: Added new ansible-plugin release version  [PR #9893](https://github.com/rundeck/rundeck/pull/9893)


  - Update to the way the Ansible plugin handles ad-hoc command execution, specifically replacing the deprecated -t argument with environment variables for callback configuration, and modernizing inventory argument handling. It also adds and improves tests to ensure these changes work as intended and that user-provided environment variables are respected.

#### ::circle-dot:: Fix: Nodes page support for url param for filter input  [PR #9881](https://github.com/rundeck/rundeck/pull/9881)


  Fixed an issue where the ?filter= URL parameter was not properly setting the node filter on the Nodes page, ensuring deep links with node filters now work as expected.

#### ::circle-dot:: Fixes datacenter value in Vmware resource model 


  This PR fixes the datacenter value retrieval in the VMware resource model by replacing hardcoded parent chain navigation (parent?.getParent()?.getName()) with a dynamic traversal approach that handles VMs at any folder depth. 
  
  Before this fix, any nodes nested more than 2 folders would exhibit the wrong value for the attribute datacenter.

#### ::circle-dot:: Fixes missing no output message when looking at a step in the execution page  [PR #9886](https://github.com/rundeck/rundeck/pull/9886)


#### ::circle-dot:: Set sleep time on sftp plugin 


  Adds a configurable sleep timeout property to the File Transfer plugin, allowing users to customize the wait time after file transfer completion instead of using the hardcoded 2000ms value.  There is a new `sleepTimeout` integer property with a default value of 2000ms.

#### ::circle-dot:: Fix the loading icon showing when a step already succeeded  [PR #9884](https://github.com/rundeck/rundeck/pull/9884)


  Small bug fix: When a job is running, a step that doesn&#39;t have an output shows a loading icon no matter if the step has finished running.

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

- [RSS Feed](https://docs.rundeck.com/docs/feeds/development.xml)
- [Atom Feed](https://docs.rundeck.com/docs/feeds/development-atom.xml)

These feeds are updated after each deployment to our production Runbook Automation SaaS solution. They highlight changes that may not be available in our Self Hosted Releases yet.

## About These Updates


The development updates are automatically generated from both our private repository for the commercial product and the public open source repository to provide complete visibility into changes deployed to the SaaS platform. They provide insight into active development features available in the Runbook Automation SaaS solution and will be released with the next Self Hosted release.

**Note**: These updates only reflect changes deployed to our SaaS platform. Self-hosted customers should refer to the [Release Notes](/history/) section for version-specific updates applicable to their installation.

---

**List Last updated:** 2025-12-09


