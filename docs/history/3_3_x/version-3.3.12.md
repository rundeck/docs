# Release 3.3.12

Name: <span style="color: springgreen"><span class="glyphicon glyphicon-piggy-bank"></span> "Onion ring springgreen piggy-bank"</span>

- [Download Rundeck](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)

:::danger Package repositories have moved!
  Please read [the new instructions for downloading Rundeck](/learning/howto/migrate-to-rundeck-packages-repo.md) from our new package repositories.
:::

## Overview

This small release updates package dependencies to enhance the security of Rundeck and addresses some cosmetic fixes.

Security Updates:
- Apache JDBC files updated to 9.0.44. _Note: These files are not vulnerable. Updating helps reduce false positive findings in some security scans._
- Updated http-client 3.1 across multiple libraries. [See CVE](https://nvd.nist.gov/vuln/detail/CVE-2012-5783)


## Core Product Updates

* [Add Style for Fixed Table and Word Breaks](https://github.com/rundeck/rundeck/pull/7080)
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


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A3.3.11+is%3Aclosed)


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
