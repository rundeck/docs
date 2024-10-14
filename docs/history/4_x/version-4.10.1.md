---

title: "4.10.1 Release Notes"
date: 2023-02-21
image: /images/chevron-logo-red-on-white.png
feed:
  description: "Version 4.10.1 is here. This release fixes some issues with 4.10.0.  Check Release Notes for more info."

---

# 4.10.1 Release Notes

Name: <span style="color: turquoise"><span class="glyphicon glyphicon-tower"></span> "Sphinx turquoise tower"</span>
Release Date: February 21, 2023

- [Download the Releases](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/index.md)
- [Watch the Live Stream Release Recap](https://youtu.be/stDTPTNZJNM)

<VidStack src="youtube/stDTPTNZJNM"/>

## Overview

This is a minor release that addresses some bugs and CVEs. 

Highlights:

* We fixed an issue in 4.10.0 which prevented jobs from correctly dispatching to a configured project Runner. 
*  Additionally we updated some dependency packages in the Runner software to address findings by some security scans.  The following CVEs are fixed with the Runner version in this release: [CVE-2022-42004](https://nvd.nist.gov/vuln/detail/CVE-2022-42004), [CVE-2022-42003](https://nvd.nist.gov/vuln/detail/CVE-2022-42003), and [CVE-2022-41881](https://nvd.nist.gov/vuln/detail/CVE-2022-41881). In certain environments [CVE-2022-45198](https://nvd.nist.gov/vuln/detail/CVE-2022-45198) and [CVE-2022-45199](https://nvd.nist.gov/vuln/detail/CVE-2022-45199) may be found.  These are false positives and the package is not used in the Enterprise Runner software.
* This release also fixes an issue where [Results Data](/manual/jobs/job-retry-failed-nodes.md) and [ROI Metric](/manual/jobs/roi-metrics.md) data were not showing properly in the Output logs.


## Rundeck Open Source Product Updates

* [Fix execution page UI plugins: Send event to indicate page loaded has completed](https://github.com/rundeck/rundeck/pull/8151)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A4.10.1+is%3Aclosed)


## Staff Contributors

* Greg Schueler ([gschueler](https://github.com/gschueler))
* Alberto Hormazabal Cespedes ([ahormazabal](https://github.com/ahormazabal))
* Alexander Abarca ([alexander-variacode](https://github.com/alexander-variacode))
* Antony Velasquez Ruiz ([avelasquezr](https://github.com/avelasquezr))
* Carlos Eduardo ([carlosrfranco](https://github.com/carlosrfranco))
* Christopher McCarroll-Gilbert ([chrismcg14](https://github.com/chrismcg14))
* Darwis Narvaez ([DarwisNarvaezDev](https://github.com/DarwisNarvaezDev))
* Eric He ([ehe-pd](https://github.com/ehe-pd))
* Forrest Evans ([fdevans](https://github.com/fdevans))
* Imad Jafir ([imad6639](https://github.com/imad6639))
* Jake Cohen ([jsboak](https://github.com/jsboak))
* Jason Brooks ([jbrookspd](https://github.com/jbrookspd))
* Jason Qualman ([qualman](https://github.com/qualman))
* Jesus Osuna ([Jesus-Osuna-M](https://github.com/Jesus-Osuna-M))
* Leonel Juarez ([L2JE](https://github.com/L2JE))
* Luis Toledo ([ltamaster](https://github.com/ltamaster))
* Miguel Ramos ([mishingo](https://github.com/mishingo))
* Osman Albarran ([Oalbarran94](https://github.com/Oalbarran94))
* Rodrigo Navarro ([ronaveva](https://github.com/ronaveva))
* Stephen Joyner ([sjrd218](https://github.com/sjrd218))
