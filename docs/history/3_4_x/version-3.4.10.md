# Release 3.4.10

Name: <span style="color: green"><span class="glyphicon glyphicon-grain"></span> "Papadum green grain"</span>
Release Date: January 18, 2022

- [Download Rundeck](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/index.md)

Check out the new features and enhancements for Rundeck Enterprise and Rundeck Community included in this release.

## Overview

This release updates both Community and Enterprise with the latest Log4J to address CVE-2021-44832 by updating it to `2.17.1`.

Our Enterprise version now has the ability to reset Local User passwords by sending them an email with a reset link rather than setting the password directly on the account.  [Check out the docs here](/manual/user-management/password-reset.md)

## Enterprise Updates

* Password Reset feature implementation
* Bugfix where Webhook debug panel(s) may be blank on some Webhook Processors
* Fix issue where Scheduler Forecast was not working properly


## Core Product Updates

* [Fix create project button position in first run](https://github.com/rundeck/rundeck/pull/7482)
* [Add command line -m option to run db migrations then stop the app](https://github.com/rundeck/rundeck/pull/7476)
* [Update log4J to 2.17.1](https://github.com/rundeck/rundeck/pull/7466)
* [Fixes Project Nav Remains when View All Projects link is clicked #](https://github.com/rundeck/rundeck/pull/7465)
* [Fix: job edit node selector not quoting right](https://github.com/rundeck/rundeck/pull/7462)
* [Export to another instance fix](https://github.com/rundeck/rundeck/pull/7436)
* [Fixed ldap user information on profile](https://github.com/rundeck/rundeck/pull/7434)
* [Fix: Job options misbehaviors when reordering/duplicating](https://github.com/rundeck/rundeck/pull/7420)
* [Updating cache to save executions and activities](https://github.com/rundeck/rundeck/pull/7407)
* [Allows file option uploaded for execution to be reused when retry execution feature is enabled.](https://github.com/rundeck/rundeck/pull/7402)
* [Plugin date parsing fails in non-english locale](https://github.com/rundeck/rundeck/pull/7400)
* [Auth resource access refactor](https://github.com/rundeck/rundeck/pull/7281)



[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A3.4.10+is%3Aclosed)

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
* Forrest Evans (fdevans)
