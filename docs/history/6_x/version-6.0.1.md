---

title: "6.0.1 Release Notes"
date: 2026-07-15
image: /images/chevron-logo-red-on-white.png
description: "Rundeck | Runbook Automation Releases 6.0.1 - <DESCRIPTION>"
feed:
 enable: true
 description: "LDAP Groups Fix"

---

# 6.0.1 Release Notes

## Overview

Fixed a critical issue introduced in 6.0.0 where LDAP and Active Directory users could log in successfully but were assigned no roles, leaving them with empty permissions and unable to access any projects or run jobs. Group-based roles from LDAP/AD are now correctly applied after login, restoring normal access. Local users configured via realm.properties were not affected.


## Links

- Download the Releases: [Open Source](https://www.rundeck.com/community-downloads/6.0.1) | [Self-Hosted](https://www.rundeck.com/enterprise-downloads/6.0.1)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/index.md)
- [Catch us on LinkedIn for the Live Stream Release Videos](https://www.linkedin.com/company/pagerduty/events)

## Version Info

Name: <span style="color: coral"><span class="glyphicon glyphicon-bell"></span> "Auriga coral bell"</span>

Release Date: July 15th, 2026


## Staff Contributors

* Greg Schueler ([gschueler](https://github.com/gschueler))
* Carlos Eduardo ([carlosrfranco](https://github.com/carlosrfranco))
* Forrest Evans ([fdevans](https://github.com/fdevans))
* Jaime Tobar ([jtobard](https://github.com/jtobard))
* Jaya Singh ([jayas006](https://github.com/jayas006))
* Jesus Osuna ([Jesus-Osuna-M](https://github.com/Jesus-Osuna-M))
* Luis Toledo ([ltamaster](https://github.com/ltamaster))
* Rodrigo Navarro ([ronaveva](https://github.com/ronaveva))
* Sarah Martinelli Benedetti ([smartinellibenedetti](https://github.com/smartinellibenedetti))