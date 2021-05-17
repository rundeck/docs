# Release 3.3.12

Name: <span style="color: springgreen"><span class="glyphicon glyphicon-piggy-bank"></span> "Onion ring springgreen piggy-bank"</span>

[Download this release](https://download.rundeck.com/3.3.12/index.html)

## Overview

This small release updates package dependencies to enhance the security of Rundeck and some cosmetic fixes.

Related CVE
- [http-client 3.1](https://nvd.nist.gov/vuln/detail/CVE-2012-5783)


## Core Product Updates

* [Fix stuck progress bar on oversized logs](https://github.com/rundeck/rundeck/pull/7059)
* [Initialize cmdDatavariable used in closure](https://github.com/rundeck/rundeck/pull/7058)
* [Update Tomcat JDBC lib to 9.0.44](https://github.com/rundeck/rundeck/pull/7044)
* [Fix: externally deleted job not reflected in scm import status](https://github.com/rundeck/rundeck/pull/7040)
* [Fix: "Duplicate to other project" option visibility](https://github.com/rundeck/rundeck/pull/7039)
* [Fix: Oracle saves empty fields as null and results in bug in comparison code](https://github.com/rundeck/rundeck/pull/7038)
* [Fix: /login/authAjax redirect loop for ajax requests](https://github.com/rundeck/rundeck/pull/7028)
* [Event resource ACLs at project level are not being honored](https://github.com/rundeck/rundeck/pull/6992)
* [Sec: Remove apache http-client 3.1](https://github.com/rundeck/rundeck/pull/6980)
* [Fixes arguments of method called to handle schedules from project config API](https://github.com/rundeck/rundeck/pull/6974)
* [Fix: use aclFileManager to read project ACLs for export](https://github.com/rundeck/rundeck/pull/6961)


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
* Forrest Evans (fdevans)


:::warning Remember!!
**For MySQL users**: Starting with Rundeck `3.3.4` the MySQL JDBC driver is no longer be
bundled with the distributions. See the [Upgrade Guide](/upgrading/upgrading-to-rundeck-3.3.4.md)
for instructions to ensure your Rundeck installation can still connect to MySQL after upgrading.
:::
