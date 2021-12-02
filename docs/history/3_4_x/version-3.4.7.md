# Release 3.4.7

Name: <span style="color: deepskyblue"><span class="glyphicon glyphicon-gift"></span> "Papadum deepskyblue gift"</span>
Release Date: December, 15 2021

- [Download Rundeck](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)

## Overview

Last release of 2021

Check out the new features and enhancements for Rundeck Enterprise and Rundeck Community included in this release.

Updated Vault Plugin includes more logging and ability to support authentication to a different namespace from where the passwords are stored.

Towards the end of the year we are focusing on some tech debt and customer bugs so this release has Lots fixes and security updates with more to come after the New Year.

## Enterprise Updates

* Upgrade Hashicorp Vault plugin
* Fix: Enterprise System Config menu should be hidden without auth
* Bump spring version to provide security enhancements


## Core Product Updates

* [Fix: Project import was missing executions](https://github.com/rundeck/rundeck/pull/7401)
* [Fix display bug with Project Settings](https://github.com/rundeck/rundeck/pull/7396)
* [514: MSSQL change fields to nvarchar on workflow_step](https://github.com/rundeck/rundeck/pull/7390)
* [Fix: Job Option default values bad parsing](https://github.com/rundeck/rundeck/pull/7389)
* [upgrade to pywinrm plugin 2.0.15](https://github.com/rundeck/rundeck/pull/7387)
* [Fix: Darkmode updates and fixes](https://github.com/rundeck/rundeck/pull/7385)
* [Add warning message if changing job scheduling on a cluster](https://github.com/rundeck/rundeck/pull/7383)
* [fix: new Ace editor supports min/maxLines for auto sizing of editor](https://github.com/rundeck/rundeck/pull/7375)
* [Including runAtTime parameter on Run Job Later feature](https://github.com/rundeck/rundeck/pull/7357)
* [Bump to spring-security 5.2.0](https://github.com/rundeck/rundeck/pull/7356)
* [Allow absolute redirectUrl in preauthenticated](https://github.com/rundeck/rundeck/pull/7261)

[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A3.4.7+is%3Aclosed)

## Community Contributors

* Sylvia van Os (TheLastProject)

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
