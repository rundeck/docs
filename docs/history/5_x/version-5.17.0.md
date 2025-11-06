---

title: "5.17.0 Release Notes"
date: 2025-11-03
image: /images/chevron-logo-red-on-white.png
description: "Rundeck | Runbook Automation Releases 5.17.0 - Open API Spec Beta, and lots of bug fixes."
feed:
 enable: true
 description: "Open API Spec Beta, and lots of bug fixes"

---

# 5.17.0 Release Notes

## Overview

<VidStack src="youtube/GTK71H-S0R4" poster="https://img.youtube.com/vi/GTK71H-S0R4/maxresdefault.jpg"/>

This release introduces several key enhancements to Rundeck’s automation and runner management capabilities. The create runner endpoint now validates the assignedProjects property format, ensuring more reliable runner assignments. Default runner replica types are set to manual when not specified, simplifying API requests. Node health check cache refreshes have been improved for better system monitoring, and errors related to runner creation in the wizard (especially for Linux ephemeral runners) have been addressed. Additionally, the GitHub Run Script plugin now supports script arguments, expanding its flexibility for automation workflows.

We have recently introduced a new, [beta method for viewing our API](/api/api_basics.md#openapi-views): the OpenAPI specification file is now automatically generated from our code base, helping ensure documentation remains current. As this feature is still in beta, we are continuing to refine the official spec file over the next few releases. We welcome your feedback and encourage you to report any issues you encounter.

## Runbook Automation Updates

##### ::circle-dot:: Improvement in the create runner endpoint to validate assignedProjects prop format
  
Fixed an issue to avoid creating a runner via API with a wrong format to the assginedProject property. Currently, the runner is being created even if this property is not correct and it causes an error when listing runner from the GUI or via API

##### ::circle-dot:: Set default runner replica type to manual if not provided in API request

##### ::circle-dot:: Improve the nodehealth check cache refresh
  
Removes the automatic 30-second cache refresh mechanism for node health checks and replaces it with a GUI-based refresh approach. The change eliminates forced periodic cache reloads that occurred every 30 seconds, improving performance by relying on user-initiated refreshes instead.

##### ::circle-dot:: Runner Wizard error creating runner linux+ephemeral
  
Fixes a Runner Wizard error when creating a Linux ephemeral runner by ensuring proper state management and artifact naming.

##### ::circle-dot:: Allow Script Arguments on GitHub Run Script plugin
  
Adds support for passing custom arguments to scripts executed by the GitHubScriptPlugin, allowing users to specify script arguments with shell-like quoting and escaping functionality.


## Rundeck Open Source Product Updates

#####  ::circle-dot:: [OpenAPI doc improvements](https://github.com/rundeck/rundeck/pull/9852)
  
We working on a dynamically generated OpenAPI spec file that is hosted on our documentation site at [https://docs.rundeck.com/docs/api/](https://docs.rundeck.com/docs/api/).  Currently this functionality is Beta, but the output can be viewed their in two different viewers.  Going forward there will continue to be improvements to these specs.  For more information check out our release notes stream on the release notes page for 5.17.0.

#####  ::circle-dot:: [Execution view shows local timezone](https://github.com/rundeck/rundeck/pull/9848)
  
Improves time display formatting across the UI consistent timezone-aware time formatting for execution start/end dates and log entries.

#####  ::circle-dot:: [Feature/Add Job Creation Date And Last Modified User Audit Tracking To Job Metadata](https://github.com/rundeck/rundeck/pull/9839)
  
This helps teams see who owns each job and when it was last changed. When importing jobs, the tracking information is protected so it doesn&#39;t get overwritten.

#####  ::circle-dot:: [Remediate CVE-2025-59952](https://github.com/rundeck/rundeck/pull/9837)

#####  ::circle-dot:: [Remediate CVE-2020-25638](https://github.com/rundeck/rundeck/pull/9824)

#####  ::circle-dot:: [Update log4j2.properties.template to add Pre authentication logs](https://github.com/rundeck/rundeck/pull/9820)

#####  ::circle-dot:: [Fix button to select/deselect all on project export ](https://github.com/rundeck/rundeck/pull/9817)

#####  ::circle-dot:: [Add index for retry_execution_id in the execution table](https://github.com/rundeck/rundeck/pull/9750)
  
Adds a database index on the retry_execution_id column in the execution table to improve performance during execution cleanup operations and reduce Oracle database deadlock issues.

#####  ::circle-dot:: [Enh/Add logger.cleanup on Remco log4j template](https://github.com/rundeck/rundeck/pull/9716)
  
Adds logger configuration for the ExecutionsCleanUp job in the Remco log4j2 template for Docker images. The change enables proper logging visibility for cleanup execution history operations without requiring global log level modifications.


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A5.17.0+is%3Aclosed)





## Links

- Download the Releases: [Open Source](https://www.rundeck.com/community-downloads/5.17.0) | [Self-Hosted](https://www.rundeck.com/enterprise-downloads/5.17.0)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/index.md)
- [Catch us on LinkedIn for the Live Stream Release Videos](https://www.linkedin.com/company/pagerduty/events)

## Version Info

Name: <span style="color: sandybrown"><span class="glyphicon glyphicon-flag"></span> "Mont Blanc sandybrown flag"</span>

Release Date: November 3rd, 2025


## Community Contributors

Submit your own Pull Requests to get recognition here!

*  ([jayas006](https://github.com/jayas006))
* Lucas Migliorini ([luqpy](https://github.com/luqpy))


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