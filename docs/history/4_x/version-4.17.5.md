---

title: "4.17.5 Release Notes"
date: 2024-02-26
image: /images/chevron-logo-red-on-white.png
feed:
 enable: true
 description: "Patch Postgres JDBC on 4.17.x"

---

# 4.17.5 Release Notes

Name: <span style="color: brown"><span class="glyphicon glyphicon-grain"></span> "Jörmungandr brown grain"</span>
Release Date: February 26th, 2024

- [Download the Releases](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/)

## Overview

This release patches the included Postgres JDBC Driver against the Critical [CVE-2024-1597](https://nvd.nist.gov/vuln/detail/CVE-2024-1597).

:::warning Upgrade Runners
After upgrading the server software the Enterprise Runners will also need to be patched as they contain the driver file to facilitate running the `SQL Run Step`.
:::

## Rundeck Open Source Product Updates

* [Update Postgres driver to patch CVE-2024-1597](https://github.com/rundeck/rundeck/pull/8943)
* [Rdcli is not working properly updating projects on severals rundeck versions](https://github.com/rundeck/rundeck/pull/8880)
* [Fix: Job option description too long](https://github.com/rundeck/rundeck/pull/8794)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A4.17.5+is%3Aclosed)

## Community Contributors

Submit your own Pull Requests to get recognition here!


## Staff Contributors

* Greg Schueler ([gschueler](https://github.com/gschueler))
* Alberto Hormazabal Cespedes ([ahormazabal](https://github.com/ahormazabal))
* Alexander Abarca ([alexander-variacode](https://github.com/alexander-variacode))
* Antony Velasquez Ruiz ([avelasquezr](https://github.com/avelasquezr))
* Carlos Eduardo ([carlosrfranco](https://github.com/carlosrfranco))
* Christopher McCarroll-Gilbert ([chrismcg14](https://github.com/chrismcg14))
* Darwis Narvaez ([DarwisNarvaezDev](https://github.com/DarwisNarvaezDev))
* Forrest Evans ([fdevans](https://github.com/fdevans))
* Imad Jafir ([imad6639](https://github.com/imad6639))
* Jake Cohen ([jsboak](https://github.com/jsboak))
* Jason Brooks ([jbrookspd](https://github.com/jbrookspd))
* Jesus Osuna ([Jesus-Osuna-M](https://github.com/Jesus-Osuna-M))
* Leonel Juarez ([L2JE](https://github.com/L2JE))
* Luis Toledo ([ltamaster](https://github.com/ltamaster))
* Osman Albarran ([Oalbarran94](https://github.com/Oalbarran94))
* Rodrigo Navarro ([ronaveva](https://github.com/ronaveva))
* Sarah Martinelli Benedetti ([smartinellibenedetti](https://github.com/smartinellibenedetti))
* Stephen Joyner ([sjrd218](https://github.com/sjrd218))
