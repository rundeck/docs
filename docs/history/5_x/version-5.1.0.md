---

title: "5.1.0 Release Notes"
date: 2024-02-14
image: /images/chevron-logo-red-on-white.png
feed:
 enable: true
 description: ""

---

# 5.1.0 Release Notes

Name: <span style="color: olivedrab"><span class="glyphicon glyphicon-camera"></span> "Elbrus olivedrab camera"</span>
Release Date: February 14th, 2024

- [Download the Releases](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/)

## Overview

Check out the new features and enhancements for PagerDuty Process Automation (formerly Rundeck Enterprise) and PagerDuty Runbook Automation and Rundeck Community included in this release.

Note: All fixes from the [5.0.2 release](version-5.0.2.md) are included in this version.

### Highlights

#### AWS Secrets Manager

This new Key Storage integration with AWS Secrets Manager can retrieve and use secrets stored in AWS for Jobs, node discovery, and dispatch. 
The integration can connect with multiple AWS accounts and retrieve secrets from across any number of AWS regions, giving users a quick method for tying in their existing secrets management to Runbook Automation.
<br>See the full [AWS Secrets Manager documentation](/manual/key-storage/storage-plugins/aws-secrets-manager.md) for more details.<br>
![AWS Secrets](/assets/img/aws-secrets-highlight.gif)

#### CyberArk and Thycotic Key Storage plugins

The [Enterprise Runner](/administration/runner/runner-intro.md) can now integrate with CyberArk Secrets Manager and Thycotic Secret Server. 
These integrations enable customers to retrieve and use secrets within Runbook Automation (self-hosted or cloud) from a CyberArk or Thycotic instance that is not directly accessible from Runbook Automation.  
This allows customers to continue using their existing secrets-management provider and not store, copy or save those secrets within Runbook Automation. 
Full documentation for Thycotic can be found [here](/manual/key-storage/storage-plugins/thycotic-storage.md) and for Cyberark [here](/manual/key-storage/storage-plugins/cyberark-storage).

## Process Automation Updates

> Also includes all Open Source updates from Rundeck section below

* Fix error messages not showing the GUI
* AWS secret storage plugin - Support for multiple regions
* Upgrade sshj plugin to 0.1.10
* Upgrade pywinrm plugin to 2.1.3
* Upgrade Ansible plugin to 3.2.9
* Report Thycotic errors to Runner Logs
* AWS Secret Plugin
* Upgrade JSCH plugin in runner


## Rundeck Open Source Product Updates

* [Fix: legacyXml flag not working](https://github.com/rundeck/rundeck/pull/8868)
* [NPE While Reading Null Default Values for Secure Options](https://github.com/rundeck/rundeck/pull/8859)
* [Moving code to the try/catch block in order to show errors in the GUI](https://github.com/rundeck/rundeck/pull/8855)
* [Don&#39;t create a duplicate webhook when same name already exists in the project](https://github.com/rundeck/rundeck/pull/8836)
* [Fix: Job output highlight not highlighting correct line](https://github.com/rundeck/rundeck/pull/8835)
* [Upgrade sshj plugin to 0.1.10](https://github.com/rundeck/rundeck/pull/8823)
* [Upgrade pywinrm plugin to 2.1.3](https://github.com/rundeck/rundeck/pull/8813)
* [Upgrade ansible plugin to 3.2.9](https://github.com/rundeck/rundeck/pull/8807)
* [Skip rundeck.security.requiredRole if the call is from the runner](https://github.com/rundeck/rundeck/pull/8803)
* [Attach change event listener on mount instead of watch](https://github.com/rundeck/rundeck/pull/8800)
* [Fix: Wrong Value Used as Secure Option](https://github.com/rundeck/rundeck/pull/8796)
* [Brazilian Translation Updates](https://github.com/rundeck/rundeck/pull/8795)
* [Unexpected Default Value Field for Options](https://github.com/rundeck/rundeck/pull/8789)
* [Fix: Using storage plugins to load plugin group settings](https://github.com/rundeck/rundeck/pull/8787)
* [Fix: Cluster not retrying execution on another node when owner shutdown](https://github.com/rundeck/rundeck/pull/8786)
* [Allow single quotes in usernames](https://github.com/rundeck/rundeck/pull/8778)
* [Fix: Active Connection Required, StackOverflow false upload error (s3) on LogFileStorage Service](https://github.com/rundeck/rundeck/pull/8768)
* [Minor update for openapi docs](https://github.com/rundeck/rundeck/pull/8757)
* [Move JSCH plugin from bundle-in plugin to a core-plugin](https://github.com/rundeck/rundeck/pull/8748)
* [ Header for homepage VUE Conversion](https://github.com/rundeck/rundeck/pull/8747)
* [Add api endpoint for Home summary](https://github.com/rundeck/rundeck/pull/8735)
* [Fix: SCM Disabled in Cluster while Job Plugins Metadata Retrieval](https://github.com/rundeck/rundeck/pull/8730)
* [nextUI: job list page: add job filters](https://github.com/rundeck/rundeck/pull/8725)
* [Fix: No Indentation on JSON Resource Model Edit Page](https://github.com/rundeck/rundeck/pull/8719)
* [Move execution logging classes to core](https://github.com/rundeck/rundeck/pull/8710)
* [897 Follow button not working on log view page](https://github.com/rundeck/rundeck/pull/8699)
* [Transactional write to database for AuthToken and Webhook](https://github.com/rundeck/rundeck/pull/8695)
* [Fix: Asynchronous Project Import](https://github.com/rundeck/rundeck/pull/8651)
* [Update and fix brazillian translation](https://github.com/rundeck/rundeck/pull/8516)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A5.1.0+is%3Aclosed)

## Ansible Plugin Updates
* [Print an error if the node doesn&#39;t have a hostname in generate inventory](https://github.com/rundeck-plugins/ansible-plugin/pull/347)
* [Share passphrase with the runner](https://github.com/rundeck-plugins/ansible-plugin/pull/346)
* [Fix error message when attempting to read SSH private key from storage](https://github.com/rundeck-plugins/ansible-plugin/pull/345)




## Community Contributors

Submit your own Pull Requests to get recognition here!

*  ([rafawalter](https://github.com/rafawalter))
*  ([dldrk](https://github.com/dldrk))
* JP Lassnibatt ([jplassnibatt](https://github.com/jplassnibatt))
*  ([jgarces-pd](https://github.com/jgarces-pd))
* Jess Crees ([jesscrees](https://github.com/jesscrees))
* Rui Melo Amaro ([rmeloamaro](https://github.com/rmeloamaro))
*  ([FriendlyTroll](https://github.com/FriendlyTroll))
* Guillaume Lefranc ([tanji](https://github.com/tanji))


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
