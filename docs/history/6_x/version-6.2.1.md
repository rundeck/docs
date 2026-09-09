---

title: "6.2.1 Release Notes"
date: 2026-09-09
image: /images/chevron-logo-red-on-white.png
description: "Rundeck | Runbook Automation Releases 6.2.1 - Undeclared Options and Default Login Fixes"
feed:
 enable: true
 description: "Undeclared Options and Default Login Fixes"

---

# 6.2.1 Release Notes

## Overview

<!-- <VidStack src="youtube/REPLACE" poster="https://img.youtube.com/vi/REPLACE/maxresdefault.jpg"/> -->

Rundeck 6.2.1 is a patch for two [6.2.0](/history/6_x/version-6.2.0.md) changes that broke some existing setups.

- **Undeclared job options:** `rundeck.execution.rejectUndeclaredOptions` now defaults to `false` again. Executions that include option names the job does not declare are accepted unless you turn the check on. See [Job Option Injection Controls](/administration/configuration/config-file-reference.md#job-option-injection-controls) to understand the setting and impacts to job execution.

- **Default login:** The shipped plaintext `admin`/`admin` credential in `realm.properties` is accepted again, restoring login for default and existing installs that still use it.

If you are running 6.2.0, upgrade to 6.2.1. Changing the default admin password remains a recommended hardening step; see [PropertyFileLoginModule](/administration/security/authentication.md#propertyfileloginmodule) for how to update `realm.properties`.

## Links

- Download the Releases: [Open Source](https://www.rundeck.com/community-downloads/6.2.1) | [Self-Hosted](https://www.rundeck.com/enterprise-downloads/6.2.1)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/index.md)
- [Catch us on LinkedIn for the Live Stream Release Videos](https://www.linkedin.com/company/pagerduty/events)

## Version Info

Name: <span style="color: red"><span class="glyphicon glyphicon-globe"></span> "Cassiopeia red globe"</span>

Release Date: September 9th, 2026


## Community Contributors

Submit your own Pull Requests to get recognition here!



## Staff Contributors

* Greg Schueler ([gschueler](https://github.com/gschueler))
* Carlos Eduardo ([carlosrfranco](https://github.com/carlosrfranco))
* Forrest Evans ([fdevans](https://github.com/fdevans))
* Jaime Tobar ([jtobard](https://github.com/jtobard))
* Jesus Osuna ([Jesus-Osuna-M](https://github.com/Jesus-Osuna-M))
* Luis Toledo ([ltamaster](https://github.com/ltamaster))
* Nicolás Jesús Cofré Ortiz ([ncofreortiz-hub](https://github.com/ncofreortiz-hub))
* Rodrigo Navarro ([ronaveva](https://github.com/ronaveva))
* Sarah Martinelli Benedetti ([smartinellibenedetti](https://github.com/smartinellibenedetti))