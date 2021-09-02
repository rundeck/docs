# Release 3.4.3

Name: <span style="color: burlywood"><span class="glyphicon glyphicon-camera"></span> "Papadum burlywood camera"</span>

- [Download Rundeck](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)

## Overview

Check out the new features and enhancements for Rundeck Enterprise and Rundeck Community included in this release. This is a smaller release, with two important security fixes. Look out for new enhancements and a significant release in the coming months.

## Security Fixes

* [CVE-2021-39132: YAML deserialization can run untrusted code.](/history/CVEs/CVE-2021-39132.md)
* [CVE-2021-39133: Cross-Site Request Forgery (CSRF) can run untrusted code on Rundeck server](/history/CVEs/CVE-2021-39133.md)


## Enterprise Updates

* [Azure Node Health Check Plugin](/manual/healthcheckplugins/azure-healthcheck.md) - The Azure Node Health Check plugin will provide a "healthy" status to instances that are currently running.  This pairs well with the new [Azure Steps from the 3.4.2 release](/history/3_4_x/version-3.4.2.md) to only run jobs on nodes that are actually running.
* Fix dynamic properties error on startup
* Fix issue when scheduled jobs runs twice in a cluster


## Core Product Updates

* [Fix: unable to upload an ACL policy file with the GUI](https://github.com/rundeck/rundeck/pull/7220)
* [Add plugin security feature check to installPlugin endpoint](https://github.com/rundeck/rundeck/pull/7213)
* [Job tags not copied when duplicating job ](https://github.com/rundeck/rundeck/pull/7205)
* [Fix/issue 1899 Wrong value after changing option type](https://github.com/rundeck/rundeck/pull/7201)
* [Fix issue when scheduled jobs runs twice in a cluster](https://github.com/rundeck/rundeck/pull/7192)
* [Add pluginSecurity feature to disable plugin uploads](https://github.com/rundeck/rundeck/pull/7185)



[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A3.4.3+is%3Aclosed)

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
