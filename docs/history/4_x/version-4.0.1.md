# 4.0.1 Release Notes

Name: <span style="color: brown"><span class="glyphicon glyphicon-apple"></span> "Kraken brown apple"</span>
Release Date: April 4, 2022

- [Download Rundeck](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/index.md)

# Rundeck 4.0.1 Release Notes

This hotfix version includes updates related to [vulnerabilities in Spring Framework announced here](https://spring.io/blog/2022/03/31/spring-framework-rce-early-announcement).

This fix brings the version of Grails up to `5.1.6` and Spring Framework up to `5.3.18` to address [CVE-2022-22965](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2022-22965)

The specific Pull Requests can be reviewed using [this link](https://github.com/rundeck/rundeck/compare/release/4.0.0...release/4.0.1).

:::danger
Warning:  This release contains a bug that will cause issues in environments using a Load Balancer in front of Rundeck and running on https.  If your environment leverages a load balancer (NGINX, ELB, etc) and the `server.useForwardHeaders=true` is set there may be a situation where this version reverts to using `http` instead of `https`.

[Rundeck 4.1.0 fixes this bug](/history/4_x/version-4.1.0.md). That version also includes the Spring4Shell fixes covered in 4.0.1.
:::

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
