---
title: Recent Updates
description: Latest merged changes from the Rundeck development team
date: 2026-07-15T22:00:13.345Z
feed: true
index: true
---

# Recent Updates

Stay up to date with the latest changes and improvements from the Runbook Automation development team.  

This page shows recently merged pull requests from both the Runbook Automation product repository and the open source Rundeck repository merged since the last self-hosted release of [6.0.1](/history/5_x/version-6.0.1.md) on July 15, 2026.

## Recent Changes


#### ::circle-dot:: Bump linkify-it to 5.0.1+ to fix ReDoS CVEs 


  Addressed two security advisories (CVE-2026-48801 and CVE-2026-59887) in a third-party library used to render Markdown links in the Rundeck UI. The vulnerability could allow specially crafted text to consume excessive CPU and slow down the interface; this update upgrades the affected library to a fixed version.

#### ::circle-dot:: Fix System Report runner health counts always reporting 0 


  Fixed an issue where the System Report showed all runner health counts as zero (healthy, unhealthy, new, unknown, and down) even when runners were active and healthy. The report now accurately reflects each runner&#39;s current health status, so operators relying on the System Report get a correct view of their runner fleet.

#### ::circle-dot:: Add option to choose what value is used for GCP Resource Model hostname 


  The GCP resource model source now lets you choose which value is used as a discovered node&#39;s hostname—instance name, internal IP, or external IP—and set a default username for those nodes. Discovered GCP nodes also now expose both their internal IP and external IP as node attributes, making it easier to connect to instances across peered VPCs or different GCP projects.

#### ::circle-dot:: Fix Jira plugin createmeta fallback for Jira Cloud team-managed projects 


  Fixed Jira issue creation failing on Jira Cloud team-managed projects with a &quot;Failed to find issue type&quot; error even when the issue type existed. Both the Jira &quot;Create Issue&quot; workflow/job step and the Jira issue-creation notification now fall back to a supported issue-type lookup so issues are created successfully in these projects, while behavior for Jira Server / Data Center is unchanged.

#### ::circle-dot:: Fix SSM Node Executor to use regional STS endpoints for opt-in regions 


  Fixed an issue where AWS SSM node command and script execution failed in opt-in regions (such as `eu-central-2`) when using cross-account role assumption, previously returning an `InvalidClientTokenId` error. A new optional `ssm-sts-region` setting also lets operators choose which region&#39;s STS endpoint is used for authentication, while existing configurations continue to work unchanged.

#### ::circle-dot:: Add Configurable Group Name Attribute And Prefix Filter To Azure Group 


  The Azure (Entra ID) user group source can now be configured to use a specific directory attribute as the Rundeck group name (for example, `onPremisesSamAccountName` instead of the default `displayName`), and to optionally include only groups matching a name prefix. This lets administrators align group names between sign-in tokens and directory lookups—eliminating the need to maintain duplicate group names in ACLs—while existing configurations continue to behave exactly as before.

#### ::circle-dot:: Fix AWS Secrets Manager assume-role session expiry causing ExpiredTokenException 


  Fixed an issue where the AWS Secrets Manager key storage plugin, when configured with an assume-role ARN, stopped retrieving secrets after about one hour on long-running Rundeck instances and failed with `ExpiredTokenException`. The plugin now automatically refreshes the assumed-role session, so secrets remain accessible without needing to restart Rundeck.

#### ::circle-dot:: Fix inline script step with Args not working with AWS SSM 


  Fixed a bug where inline script steps with `args` configured would fail with an S3 403 error when using the AWS SSM node executor. Script arguments are now correctly passed to the SSM `commandLine` parameter instead of being appended to the S3 URI.

#### ::circle-dot:: Fix cannot manage user class for usernames containing slashes 


  Fix User Class management for usernames containing `/` (e.g. pronouns like `He/Him`). Assigning and removing User Class assignments now works correctly for these users.

#### ::circle-dot:: Fix PagerDuty Notification Start Incident Workflow trigger 


  Fixed an issue where PagerDuty &quot;Start Incident Workflow&quot; notifications failed to trigger because the configured Incident ID and Incident Workflow ID were not being read correctly. These notifications now work as expected, and a clear error is logged if either required value is missing.

#### ::circle-dot:: Fix OIDC login broken after Grails 7: restore ROLE_USER authority 


  Fixed an issue where users were unable to log in through OIDC single sign-on (such as Okta) after upgrading, caused by a change in the underlying Spring Security framework that assigned the wrong default role. OIDC/Okta SSO login now works correctly again, with users receiving the expected `ROLE_USER` access along with their provider group memberships.

#### ::circle-dot:: Fix legacy MySQL JDBC driver class at startup 


  Fixed a startup failure that occurred after upgrading when the database configuration still referenced the legacy MySQL JDBC driver class (`com.mysql.jdbc.Driver` or `com.mysql.cj.jdbc.Driver`). Rundeck now automatically substitutes the bundled MariaDB driver in these cases so the server starts successfully, and logs a warning directing operators to update their configuration.

#### ::circle-dot:: Remove usernames from System Report 


  The System Report no longer includes individual usernames or their userclass mappings. This improves privacy by ensuring user identities are not captured in generated system reports, while license allocation and usage totals continue to be reported.




## Subscribe to Updates

Stay informed about Rundeck development by subscribing to a feed:

- [RSS Feed](https://docs.rundeck.com/docs/feeds/development.xml)
- [Atom Feed](https://docs.rundeck.com/docs/feeds/development-atom.xml)

These feeds are updated regularly to highlight changes that are available in Runbook Automation SaaS and will be included in upcoming Self Hosted releases.

## About These Updates


The development updates are automatically generated from both our private repository for the commercial product and the public open source repository. These changes have been merged since the last GA release and provide insight into what's coming in the next Self Hosted release.

**Note**: These updates reflect changes merged since the last GA release. Self-hosted customers should refer to the [Release Notes](/history/) section for version-specific updates applicable to their installation.

---

**List Last updated:** 2026-07-15

