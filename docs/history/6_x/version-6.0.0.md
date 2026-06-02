---

title: "6.0.0 Release Notes"
date: 2026-06-02
image: /images/chevron-logo-red-on-white.png
description: "Rundeck | Runbook Automation Releases 6.0.0 - <DESCRIPTION>"
feed:
 enable: true
 description: ""

---

# 6.0.0 Release Notes

## Overview

- Java 17 minimum with support for Java 25
- Significant performance improvements
- Modernized monitoring (Prometheus)
- Oracle 12c minimum version
- MySQL 8.4 support
- Lots More


## Runbook Automation Updates

##### ::circle-dot:: Fix project runner replica list gated on delete permission
  
Fixed a bug where **viewing runner replicas** in a project incorrectly required **delete** permission on project runners in addition to read. **Read access alone is now enough** to see replica information in Runner Management, so least-privilege ACLs work as administrators expect.

##### ::circle-dot:: Fix search not working in User Management tables
  
Fix User Management search — typing in the search box in the User Classes, Manage Local Users, and Manage Local Groups tabs now correctly filters rows by all searchable columns, including User Class name and Group Name.


## Rundeck Open Source Product Updates

#####  ::circle-dot:: [Upgrade log4J to 2.25.4](https://github.com/rundeck/rundeck/pull/10086)
  
Fix CVE-2026-34478 and CVE-2026-34480 by upgrading to 2.25.4

#####  ::circle-dot:: [Upgrade mina-core to 2.2.7 to fix CVE-2026-42779](https://github.com/rundeck/rundeck/pull/10118)

#####  ::circle-dot:: [Make UUID field read-only in job Other tab](https://github.com/rundeck/rundeck/pull/10146)
  
UUID is no longer be editable on Jobs Other tab

#####  ::circle-dot:: [Improve Dutch translations to be better understandable - Community Submission](https://github.com/rundeck/rundeck/pull/10164)
  
Community Submission from @TheSander562.  Enhancement for dutch speaking people so the words and sentences makes sense when reading them in Rundeck.

#####  ::circle-dot:: [Update commons-compress to 1.28.0 to fix CVE-2025-48924](https://github.com/rundeck/rundeck/pull/10165)
  
Updated Apache Commons Compress to version 1.28.0 to address CVE-2025-48924, which resolves a vulnerability in the transitively included commons-lang3 dependency.

#####  ::circle-dot:: [Update follow-redirects for CVE-2026-40895](https://github.com/rundeck/rundeck/pull/10169)
  
Updates the follow-redirects dependency to version 1.16.0 to address security vulnerability CVE-2026-40895.

#####  ::circle-dot:: [Restore step property value colors for dark background contexts](https://github.com/rundeck/rundeck/pull/10153)
  
Fixed a regression in 5.20.0 where step configuration property values in the workflow editor step cards appeared invisible or hard to read due to dark color overrides that conflicted with the dark-background step list UI. Values now render in the original readable green color (Bootstrap `text-success`) as in previous versions.


#####  ::circle-dot:: [Fix cron expression selector not updating in Execution History Clean](https://github.com/rundeck/rundeck/pull/10154)
  
Fix cron expression selector in Project Settings &gt; Execution History Clean. Selecting a predefined cron option now correctly updates the schedule input field.


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A6.0.0+is%3Aclosed)





## Links

- Download the Releases: [Open Source](https://www.rundeck.com/community-downloads/6.0.0) | [Self-Hosted](https://www.rundeck.com/enterprise-downloads/6.0.0)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/index.md)
- [Catch us on LinkedIn for the Live Stream Release Videos](https://www.linkedin.com/company/pagerduty/events)

## Version Info

Name: <span style="color: brown"><span class="glyphicon glyphicon-apple"></span> "Auriga brown apple"</span>

Release Date: June 2nd, 2026


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