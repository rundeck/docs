---

title: "6.0.0 Release Notes"
date: 2026-06-29
image: /images/chevron-logo-red-on-white.png
description: "Rundeck | Runbook Automation Releases 6.0.0"
feed:
 enable: true
 description: "6.0 Release - Java 17, MySQL 8.4, and more"

---

# 6.0.0 Release Notes

## Overview

Rundeck 6.0.0 represents a major milestone with the upgrade to Grails 7, Spring Boot 3, and Java 17 support. This modernization brings significant improvements across performance, security, and user experience.

### What's New

**Java 17 and Java 25 Support** - Rundeck 6.0 requires Java 17 as the minimum runtime and introduces support for Java 25, enabling you to run on the latest Java versions with improved performance and security features.

**Modernized Monitoring** - The monitoring infrastructure has been upgraded to Spring Boot Actuator with native Prometheus support, replacing the legacy Dropwizard metrics endpoints. This provides better integration with modern observability stacks and more granular metrics for troubleshooting and capacity planning.

**Enhanced Database Support** - MySQL 8.4 is now fully supported with improved compatibility and performance. Database support has been updated to ensure compatibility with modern database features and security requirements.

**Improved Security** - Over 20 CVEs have been addressed in this release through dependency upgrades and security patches. The modern framework allowed us to resolve previously blocked security issues that required Grails 7.

### Performance Improvements

In combination with Java 25 support and the new framework, we are seeing significant performance improvements. Each customer's environment is unique, so individual benefits will vary based on workload patterns and infrastructure configuration.

### Security Enhancements

This release improves security by patching and addressing over 20 different CVEs. The modern framework also allowed us to mitigate some previously open issues that were blocked on older dependencies requiring Grails 7.

Key security features in this release include:
- **Password reset links now automatically expire** after a configurable period (7 days by default), limiting the window of opportunity for unauthorized password resets
- **Password policy enforcement from System Configuration** now correctly prioritizes database settings over file-based configuration, ensuring policies set through the UI are properly enforced

<!-- <VidStack src="youtube/REPLACE" poster="https://img.youtube.com/vi/REPLACE/maxresdefault.jpg"/> -->

## Runbook Automation Updates

##### ::circle-dot:: Password reset links now automatically expire
  
Password reset links now automatically expire after a configurable period (7 days by default), improving security by limiting the window of opportunity for unauthorized password resets. If a user attempts to use an expired reset link, they&#39;ll simply need to request a new one—no manual cleanup or administrative action required.

##### ::circle-dot:: Fix search not working in User Management tables
  
Fix User Management search — typing in the search box in the User Classes, Manage Local Users, and Manage Local Groups tabs now correctly filters rows by all searchable columns, including User Class name and Group Name.

##### ::circle-dot:: Fix project runner replica list gated on delete permission
  
Fixed a bug where **viewing runner replicas** in a project incorrectly required **delete** permission on project runners in addition to read. **Read access alone is now enough** to see replica information in Runner Management, so least-privilege ACLs work as administrators expect.

##### ::circle-dot:: Execution log runner UI (i18n + badge settings)
  
Execution log: runner plugin registers i18n for the “Display Runner Badge” setting; fixes missing translation key and non-functional toggle when combined with updated ui-trellis LogViewer `addUiMessages` provider.

##### ::circle-dot:: Fix OIDC login broken after Grails 7: restore ROLE_USER authority
  
Fixed an issue where users were unable to log in through OIDC single sign-on (such as Okta) after upgrading, caused by a change in the underlying Spring Security framework that assigned the wrong default role. OIDC/Okta SSO login now works correctly again, with users receiving the expected `ROLE_USER` access along with their provider group memberships.


## Rundeck Open Source Product Updates

#####  ::circle-dot:: [NextUI: Vue migration for User and System Configuration menus](https://github.com/rundeck/rundeck/pull/9899)
  
The System and User Config pages have been migrated to Vue part of our NextUI project.  Our NextUI pages are newly updated pages that users can enable using the selector in the bottom right.

#####  ::circle-dot:: [Upgrade to Grails 7.0.9, Spring Boot 3.5.11, Groovy 4.0.30, Java 17](https://github.com/rundeck/rundeck/pull/9922)
  
Initial Grails 7 Upgrade for Rundeck Core.  Versions and code from this pull request have been improved and updated since merge, but this is the original PR for the 6.0 upgrade.

#####  ::circle-dot:: [Bump Jetty to 12.0.33 for CVE-2026-2332 (CWE-444 request smuggling)](https://github.com/rundeck/rundeck/pull/10050)

#####  ::circle-dot:: [Eliminate Jasypt dependency and upgrade BouncyCastle to 1.84](https://github.com/rundeck/rundeck/pull/10094)
  
Rundeck&#39;s storage encryption has been upgraded to use modern AES-256-GCM authenticated encryption, replacing the legacy Jasypt library and resolving security vulnerability CVE-2026-5588 by upgrading BouncyCastle to version 1.84. This enhancement provides stronger encryption for stored credentials and keys while maintaining full backward compatibility—existing encrypted data continues to work and is automatically migrated to the new encryption format when next updated, requiring no manual intervention or downtime.

#####  ::circle-dot:: [Make script editor min/max lines configurable via System Configuration](https://github.com/rundeck/rundeck/pull/10137)

#####  ::circle-dot:: [Conditional step with multiple sub-steps breaks job output](https://github.com/rundeck/rundeck/pull/10140)
  
This fixes some issues with the Job Output view when there are multiple sub steps in a Conditional Step.

#####  ::circle-dot:: [Remove Community News Subscribe Button](https://github.com/rundeck/rundeck/pull/10148)
  
The news subscribe button has been removed as a product feature.  You can sign up for Release Notes emails at https://www.rundeck.com/release-notes-signup or join us in the [community forums](https://community.pagerduty.com/).

#####  ::circle-dot:: [Fix/add created by field](https://github.com/rundeck/rundeck/pull/10150)
  
Job creation tracking now permanently preserves the original job creator&#39;s identity. When viewing job details, you&#39;ll see who originally created the job, even if the job has been modified by other users over time. This enhancement improves audit trails and accountability by ensuring the original creator information is never lost during job updates or imports.

#####  ::circle-dot:: [Fix cluster member state showing as unknown on Job page](https://github.com/rundeck/rundeck/pull/10172)

#####  ::circle-dot:: [Restore step property value colors for dark background contexts](https://github.com/rundeck/rundeck/pull/10153)
  
Fixed a regression in 5.20.0 where step configuration property values in the workflow editor step cards appeared invisible or hard to read due to dark color overrides that conflicted with the dark-background step list UI. Values now render in the original readable green color (Bootstrap `text-success`) as in previous versions.

#####  ::circle-dot:: [Fix cron expression selector not updating in Execution History Clean](https://github.com/rundeck/rundeck/pull/10154)
  
Fix cron expression selector in Project Settings &gt; Execution History Clean. Selecting a predefined cron option now correctly updates the schedule input field.

#####  ::circle-dot:: [Improve Dutch translations to be better understandable - Community Submission](https://github.com/rundeck/rundeck/pull/10164)
  
Community Submission from @TheSander562.  Enhancement for dutch speaking people so the words and sentences makes sense when reading them in Rundeck.

#####  ::circle-dot:: [Update follow-redirects for CVE-2026-40895](https://github.com/rundeck/rundeck/pull/10169)
  
Updates the follow-redirects dependency to version 1.16.0 to address security vulnerability CVE-2026-40895.

#####  ::circle-dot:: [Update commons-compress to 1.28.0 to fix CVE-2025-48924](https://github.com/rundeck/rundeck/pull/10165)
  
Updated Apache Commons Compress to version 1.28.0 to address CVE-2025-48924, which resolves a vulnerability in the transitively included commons-lang3 dependency.

#####  ::circle-dot:: [Upgrade mina-core to 2.2.7 to fix CVE-2026-42779](https://github.com/rundeck/rundeck/pull/10118)

#####  ::circle-dot:: [Make UUID field read-only in job Other tab](https://github.com/rundeck/rundeck/pull/10146)
  
UUID is no longer be editable on Jobs Other tab

#####  ::circle-dot:: [Upgrade log4J to 2.25.4](https://github.com/rundeck/rundeck/pull/10086)
  
Fix CVE-2026-34478 and CVE-2026-34480 by upgrading to 2.25.4


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A6.0.0+is%3Aclosed)





## Links

- Download the Releases: [Open Source](https://www.rundeck.com/community-downloads/6.0.0) | [Self-Hosted](https://www.rundeck.com/enterprise-downloads/6.0.0)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/index.md)
- [Catch us on LinkedIn for the Live Stream Release Videos](https://www.linkedin.com/company/pagerduty/events)

## Version Info

Name: <span style="color: brown"><span class="glyphicon glyphicon-apple"></span> "Auriga brown apple"</span>

Release Date: June 29th, 2026


## Community Contributors

Submit your own Pull Requests to get recognition here!

* Sander Lambrechts ([TheSander562](https://github.com/TheSander562))


## Staff Contributors

* Greg Schueler ([gschueler](https://github.com/gschueler))
* Carlos Eduardo ([carlosrfranco](https://github.com/carlosrfranco))
* Forrest Evans ([fdevans](https://github.com/fdevans))
* Jaime Tobar ([jtobard](https://github.com/jtobard))
* Jake Cohen ([jsboak](https://github.com/jsboak))
* Jaya Singh ([jayas006](https://github.com/jayas006))
* Jesus Osuna ([Jesus-Osuna-M](https://github.com/Jesus-Osuna-M))
* Luis Toledo ([ltamaster](https://github.com/ltamaster))
* Rodrigo Navarro ([ronaveva](https://github.com/ronaveva))
* Sarah Martinelli Benedetti ([smartinellibenedetti](https://github.com/smartinellibenedetti))