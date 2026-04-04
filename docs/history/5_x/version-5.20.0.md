---

title: "5.20.0 Release Notes"
date: 2026-04-02
image: /images/chevron-logo-red-on-white.png
description: "Rundeck | Runbook Automation Releases 5.20.0 - Conditional Logic, NextUI, and Dutch Language support"
feed:
 enable: true
 description: "Rundeck | Runbook Automation Releases 5.20.0 - Conditional Logic, NextUI, and Dutch Language support"

---

# 5.20.0 Release Notes

## Overview

Rundeck 5.20.0 introduces **[Conditional Logic Steps](/manual/jobs/conditional-logic.md)**, an Early Access feature that brings intelligent decision-making directly into your workflows. Build dynamic automation that branches based on job options, node attributes, and runtime data without requiring external scripts or complex workarounds. Configure conditions using a visual editor with AND/OR logic, multiple operators, and support for both node-level and workflow-level execution.

This release also enhances the user experience with a redesigned **Next UI settings modal** that makes it easier to discover and enable the modern interface, plus adds **Dutch language support** contributed by the community, expanding Rundeck's accessibility to Dutch-speaking teams worldwide.

<!-- <VidStack src="youtube/REPLACE" poster="https://img.youtube.com/vi/REPLACE/maxresdefault.jpg"/> -->


## Runbook Automation Updates

##### ::circle-dot:: Add Filename to Runner API output
  
Include the filename in the API output for Runner creation.

##### ::circle-dot:: Implement conditional workflow logic
  
Introduces backend support for Conditional Logic workflow steps, enabling dynamic workflow execution based on runtime conditions such as job options, node attributes, and prior step outputs.


## Rundeck Open Source Product Updates

#####  ::circle-dot:: [Improve Next Ui management](https://github.com/rundeck/rundeck/pull/9981)
  
A new settings modal replaces the previous theme dropdown, providing a unified interface for switching themes and toggling Next UI mode, with visual indicators and notifications to help users understand when Next UI is available and active. Administrators can optionally enable Next UI by default for all users via system configuration.

#####  ::circle-dot:: [Update to commons-lang3 for CVE-2025-48924](https://github.com/rundeck/rundeck/pull/9990)
  
Updated Apache Commons Lang library to the latest version (commons-lang3) to address CVE-2025-48924, ensuring continued security and compatibility with modern Java standards.

#####  ::circle-dot:: [Upgrade Jackson to 2.18.6 to mitigate CWE-770](https://github.com/rundeck/rundeck/pull/9997)
  
Updated Jackson library to version 2.18.6 to address a security vulnerability (CWE-770) that could allow resource exhaustion, improving the overall security and stability of Rundeck.

#####  ::circle-dot:: [Fix command injection vulnerability in exec commands with ${option.name}](https://github.com/rundeck/rundeck/pull/10003)
  
Fixed a critical command injection vulnerability in exec commands where shell control characters in job option values were not properly escaped, now protecting against malicious input by applying shell escaping to all `${option.name}` values by default while providing a compatibility flag for edge cases.

#####  ::circle-dot:: [Add Dutch (nl_NL) UI translations and locale wiring](https://github.com/rundeck/rundeck/pull/9983)
  
Rundeck now supports Dutch (nl_NL) as a user interface language. Users can select Dutch from their profile settings to view Jobs, Activity, Notifications, Nodes, Storage, Webhooks, and Project Configuration screens in Dutch, making Rundeck more accessible to Dutch-speaking teams.

#####  ::circle-dot:: [Fix bug where editing a step deletes log filters previously added](https://github.com/rundeck/rundeck/pull/10025)
  
- Fixed a bug in nextUi mode, where editing steps could remove existing **log filters**.

#####  ::circle-dot:: [Add metaExclude for the endpoint browse/job meta API and skip retrieval of execution stats in job list page when NextUi=true](https://github.com/rundeck/rundeck/pull/10026)
  
- **API v58**: Optional **`metaExclude`** query parameter for **jobs browse** and **job meta** endpoints: comma-separated metadata names to omit after resolving **`meta`** (when **`meta`** includes **`*`**, names are taken from all registered job metadata components, then exclusions are applied).
- **Next UI / job browse**: Browse and lazy job meta requests now omit **`stats`** by default via **`metaExclude=stats`**, improving job list load time on instances with very large execution history.


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A5.20.0+is%3Aclosed)





## Links

- Download the Releases: [Open Source](https://www.rundeck.com/community-downloads/5.20.0) | [Self-Hosted](https://www.rundeck.com/enterprise-downloads/5.20.0)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/index.md)
- [Catch us on LinkedIn for the Live Stream Release Videos](https://www.linkedin.com/company/pagerduty/events)

## Version Info

Name: <span style="color: rebeccapurple"><span class="glyphicon glyphicon-pushpin"></span> "Parinacota rebeccapurple pushpin"</span>

Release Date: April 2nd, 2026


## Community Contributors

Submit your own Pull Requests to get recognition here!



## Staff Contributors

* Greg Schueler ([gschueler](https://github.com/gschueler))
* Carlos Eduardo ([carlosrfranco](https://github.com/carlosrfranco))
* Forrest Evans ([fdevans](https://github.com/fdevans))
* Jaime Tobar ([jtobard](https://github.com/jtobard))
* Jake Cohen ([jsboak](https://github.com/jsboak))
* Jaya Singh ([jayas006](https://github.com/jayas006))
* Jesus Osuna ([Jesus-Osuna-M](https://github.com/Jesus-Osuna-M))
* José Vásquez ([hiawvp](https://github.com/hiawvp))
* Luis Toledo ([ltamaster](https://github.com/ltamaster))
* Rodrigo Navarro ([ronaveva](https://github.com/ronaveva))
* Sarah Martinelli Benedetti ([smartinellibenedetti](https://github.com/smartinellibenedetti))