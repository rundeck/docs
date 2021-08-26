# Release 3.3.14

Name: <span style="color: thistle"><span class="glyphicon glyphicon-pushpin"></span> "Onion ring thistle pushpin"</span>

- [Download Rundeck](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)

## Overview

This release contains a few minor back ported updates from Rundeck 3.4.0 series including the two security fixes listed below:

## Security Fixes

* [CVE-2021-39132: YAML deserialization can run untrusted code.](/history/CVEs/CVE-2021-39132.md)
* [CVE-2021-39133: Cross-Site Request Forgery (CSRF) can run untrusted code on Rundeck server](/history/CVEs/CVE-2021-39133.md)


## Core Product Updates

* [Fix to properly show SSO login button (backport #7170)](https://github.com/rundeck/rundeck/pull/7183)
* [Handles null value when resource does not have the attribute filtered by rule key (backport #7137)](https://github.com/rundeck/rundeck/pull/7177)
* [Fix: Properly detect when a job was renamed in SCM Import (backport #7030)](https://github.com/rundeck/rundeck/pull/7176)

[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A3.3.14+is%3Aclosed)

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
* Alexander Abarca (alexander-variacode)
* Alberto Hormazabal Cespedes (ahormazabal)
* Forrest Evans (fdevans)
