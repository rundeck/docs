# 4.2.1 Release Notes

Name: <span style="color: red"><span class="glyphicon glyphicon-globe"></span> "Liger red globe"</span>
Release Date: May 11, 2022

- [Download Rundeck](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/)

:::danger
 Due to [CVE-2022-31044](/history/cves/cve-2022-31044.md) this version has been superseded by version [4.2.2](version-4.2.2.md).
:::

## Overview

This release fixes a bug in the [4.2.0 Release](version-4.2.0.md) with the EC2 Node Source.  If the `endpoint` setting was blank in 4.2.0 errors would occur due to no default value being applied.

[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A4.2.1+is%3Aclosed)

If you have already upgraded to 4.2.0, this hotfix is only necessary if your environment is actively using the EC2 Node Source.

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
* Forrest Evans (fdevans)
* Darwis (DarwisNarvaezDev)
* Antony Velasquez Ruiz (avelasquezr)
