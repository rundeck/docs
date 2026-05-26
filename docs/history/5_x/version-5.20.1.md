---

title: "5.20.1 Release Notes"
date: 2026-05-04
image: /images/chevron-logo-red-on-white.png
description: "Rundeck | Runbook Automation Releases 5.20.1"
feed:
 enable: true
 description: "Bug fixes for Ansible, Job Editor, and System Config pages"

---

# 5.20.1 Release Notes

## Overview

## Runbook Automation Updates

##### ::circle-dot:: Mask key storage secrets for all provider indexes in system config
  
When multiple key storage providers are configured, sensitive settings such as tokens and passwords are now masked consistently in System Configuration and admin configuration responses, instead of sometimes appearing in clear text for providers beyond the first.

##### ::circle-dot:: Prevent saving job when workflow step is in edit mode
  
The job editor now blocks saving a job while a workflow step is still being edited, and shows a warning, so you do not lose in-progress step changes. This restores the same safeguard that existed in the previous workflow editor after the Vue workflow UI update.

##### ::circle-dot:: Execution log runner UI (i18n + badge settings)
  
Execution log: runner plugin registers i18n for the “Display Runner Badge” setting; fixes missing translation key and non-functional toggle when combined with updated ui-trellis LogViewer `addUiMessages` provider.


## Rundeck Open Source Product Updates

#####  ::circle-dot:: [EA job conditional: inline script editor cursor / font CSS](https://github.com/rundeck/rundeck/pull/10059)
  
Fixed inline script editor cursor misalignment when the early-access job conditional workflow feature is enabled.

[RUN-4273]: https://pagerduty.atlassian.net/browse/RUN-4273?atlOrigin=eyJpIjoiNWRkNTljNzYxNjVmNDY3MDlhMDU5Y2ZhYzA5YTRkZjUiLCJwIjoiZ2l0aHViLWNvbS1KU1cifQ


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A5.20.1+is%3Aclosed)





## Links

- Download the Releases: [Open Source](https://www.rundeck.com/community-downloads/5.20.1) | [Self-Hosted](https://www.rundeck.com/enterprise-downloads/5.20.1)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/index.md)
- [Catch us on LinkedIn for the Live Stream Release Videos](https://www.linkedin.com/company/pagerduty/events)

## Version Info

Name: <span style="color: red"><span class="glyphicon glyphicon-sunglasses"></span> "Parinacota red sunglasses"</span>

Release Date: May 4th, 2026


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
* Luis Toledo ([ltamaster](https://github.com/ltamaster))
* Rodrigo Navarro ([ronaveva](https://github.com/ronaveva))
* Sarah Martinelli Benedetti ([smartinellibenedetti](https://github.com/smartinellibenedetti))