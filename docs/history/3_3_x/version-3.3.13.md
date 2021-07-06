# Release 3.3.13

Name: <span style="color: tan"><span class="glyphicon glyphicon-plane"></span> "Onion ring tan plane"</span>

- [Download Rundeck](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)

## Overview

The 3.3.13 back-ports some key security fixes from the 3.4.0 release to the 3.3.x series.  If you are using Jira workflow steps be sure to check out the [Upgrade Notes](/upgrading/upgrading-to-rundeck-3.4.md#jira-plugins-require-updated-authentication-enterprise).  It also addresses a bug in 3.3.12 when booting with certain configurations.

## Enterprise Updates

* Fix webhook debug API call when rdBase includes path (backport #1803)
* Fix #1798 old logstore repl plugin causes rundeck startup to fail (backport #1800)
* [Jira Plugin Updates](/upgrading/upgrading-to-rundeck-3.4.md#jira-plugins-require-updated-authentication-enterprise) (backport #1724)


## Core Product Updates

* [Fix: Enterprise logstorage config (backport #7106)](https://github.com/rundeck/rundeck/pull/7109)
* [Fix: bundled groovy plugins should be overwritten when extracted (backport #7089)](https://github.com/rundeck/rundeck/pull/7090)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A3.3.13+is%3Aclosed)

## Contributors

* Imad Jafir (imad6639)
* Greg Schueler (gschueler)
* Luis Toledo (ltamaster)
* Rodrigo Navarro (ronaveva)
* Carlos Eduardo (carlosrfranco)
* Miguel Ramos (mishingo)
* Stephen Joyner (sjrd218)
* Greg Zapp (ProTip)
* Christopher McCarroll-Gilbert (chrismcg14)
* Jason Qualman (qualman)
* Alberto Hormazabal Cespedes (ahormazabal)
* Forrest Evans (fdevans)
