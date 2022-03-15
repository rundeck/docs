# Release 4.0.0

Name: <span style="color: aquamarine"><span class="glyphicon glyphicon-apple"></span> "Macchiato aquamarine apple"</span>
Release Date: March 23rd, 2022

- [Download Rundeck](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)

## Overview

Check out the new features and enhancements for Rundeck Enterprise and Rundeck Community included in this release.

## Enterprise Updates

* Fix tour manager export issues
* When a job is killed send cancel signal to Runner
* Enhanced Runner Installation and Management UI
* Include AWS SSM plugin
* Add Azure group source plugin to pull user membership for SSO
* Add clusterMode ENV vars to Docker Remco mapping
* Fix GUI issue - Node wizard - Authentication
* Add password complexity to User Manager
* Result Data Feature Finalization
* Obscure Password Input on S3 Resource Model
* Update Rundeck Enterprise official Docker base image to Ubuntu 20.04
* Allow for pulling in of all secret types by Thycotic
* PagerDuty manage users plugins


## Core Product Updates

* [Correct the parameter name of minute](https://github.com/rundeck/rundeck/pull/7586)
* [Add slack notification on main branch ci build/test failures](https://github.com/rundeck/rundeck/pull/7585)
* [Fix the crontab update issue](https://github.com/rundeck/rundeck/pull/7582)
* [Fix the crontab update bug](https://github.com/rundeck/rundeck/pull/7579)
* [Rundeck 4.0 theme names and UI JS cleanup](https://github.com/rundeck/rundeck/pull/7578)
* [Dark mode link color](https://github.com/rundeck/rundeck/pull/7576)
* [Execution mode change should allow app_admin authorization](https://github.com/rundeck/rundeck/pull/7574)
* [Remove tests from release builds](https://github.com/rundeck/rundeck/pull/7573)
* [Add feature flag to disable &quot;Job File Option&quot; uploads](https://github.com/rundeck/rundeck/pull/7569)
* [WIP: CI updates](https://github.com/rundeck/rundeck/pull/7568)
* [Use-Client-Side-FileReader-API-Load-Content-From-File](https://github.com/rundeck/rundeck/pull/7567)
* [Nested groups are not displayed by default](https://github.com/rundeck/rundeck/pull/7560)
* [Revert to default katex](https://github.com/rundeck/rundeck/pull/7559)
* [Enhance UserController to support more flexible error message](https://github.com/rundeck/rundeck/pull/7554)
* [Fix typo successful to successful in NotificationPlugin.java javadocs](https://github.com/rundeck/rundeck/pull/7550)
* [Fix English grammar typo in deleted job warning](https://github.com/rundeck/rundeck/pull/7548)
* [Rundeck Enterprise to Process Automation](https://github.com/rundeck/rundeck/pull/7540)
* [Migrate to grails 5.1.2](https://github.com/rundeck/rundeck/pull/7539)
* [Change Login/Logout Screen Logos](https://github.com/rundeck/rundeck/pull/7537)
* [Update asset plugin to the last version](https://github.com/rundeck/rundeck/pull/7534)
* [Rundeck Enterprise to PagerDuty Process Automation](https://github.com/rundeck/rundeck/pull/7533)
* [Remco mappings for GUI and Metrics settings](https://github.com/rundeck/rundeck/pull/7532)
* [Fix SSO configs. Upgrade grails spring security plugin and libs.](https://github.com/rundeck/rundeck/pull/7530)
* [Upgrade Front End to Node 16](https://github.com/rundeck/rundeck/pull/7526)
* [Using last version of assets plugin through jitpack](https://github.com/rundeck/rundeck/pull/7525)
* [UI Alignment Spacing/Layouts](https://github.com/rundeck/rundeck/pull/7524)
* [API Updates for 4.x](https://github.com/rundeck/rundeck/pull/7523)
* [Update to Node 16.13.0](https://github.com/rundeck/rundeck/pull/7522)
* [Add some ENV variables to Docker Remco mapping](https://github.com/rundeck/rundeck/pull/7519)
* [Fix vue console errors](https://github.com/rundeck/rundeck/pull/7512)
* [Unifying button colors and stylings](https://github.com/rundeck/rundeck/pull/7509)
* [Fix Execution Log output on Chrome makes Rundeck GUI unresponsive](https://github.com/rundeck/rundeck/pull/7508)
* [Obscure Password Input on S3 Resource Model](https://github.com/rundeck/rundeck/pull/7503)
* [Expand and optimize Job Edit Details tests](https://github.com/rundeck/rundeck/pull/7498)
* [Add the ability to authenticate webhooks using the Authorization header](https://github.com/rundeck/rundeck/pull/7495)
* [Ldap name and last name cannot sync](https://github.com/rundeck/rundeck/pull/7493)
* [Make official ubuntu 20.04 image the base image of rundeck ubuntu-base ](https://github.com/rundeck/rundeck/pull/7486)
* [Added Create Project button into Project Picker](https://github.com/rundeck/rundeck/pull/7481)
* [Fix/issue 5780 api gui pagination](https://github.com/rundeck/rundeck/pull/7479)
* [Allow several tokens per user for API authentication](https://github.com/rundeck/rundeck/pull/7411)
* [Convert schedules section of job edit/create to Vue](https://github.com/rundeck/rundeck/pull/7394)
* [Upgrade to grade 7.2, for grails 5](https://github.com/rundeck/rundeck/pull/7333)

[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A4.0.0+is%3Aclosed)

## Community Contributors

* Travis Yoder (trayo)
* debanne (debanne)
* sclarson (sclarson)

## Staff Contributors

* Greg Schueler (gschueler)
* Stephen Joyner (sjrd218)
* Imad Jafir (imad6639)
* Luis Toledo (ltamaster)
* Rodrigo Navarro (ronaveva)
* Carlos Eduardo (carlosrfranco)
* Miguel Ramos (mishingo)
* Christopher McCarroll-Gilbert (chrismcg14)
* Jason Qualman (qualman)
* Alexander Abarca (alexander-variacode)
* Alberto Hormazabal Cespedes (ahormazabal)
* Leonel Juarez (L2JE)
* Eric He (ehe-pd)
* Amir Jafarvand (ajafarvand)
* Devlin Cashman (devlincashman)
* Jeremy Olexa (jolexa)
* Osmar Perez (perezo-pd)
* Forrest Evans (fdevans)
* Jake Cohen (jsboak)
