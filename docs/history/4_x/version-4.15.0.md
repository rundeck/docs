---

title: "4.15.0 Release Notes"
date: 2023-07-25
image: /images/chevron-logo-red-on-white.png
feed:
  description: "IAM AWS Authentication for RBA and Key Storage Configuration GUI"

---

# 4.15.0 Release Notes

Name: <span style="color: fuchsia"><span class="glyphicon glyphicon-sunglasses"></span> "Banshee fuchsia sunglasses"</span>
Release Date: July 25, 2023

- [Download the Releases](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/)
- [Watch the Live Stream Release Recap](https://youtu.be/t_O6P7dPb1M)

<YouTube id="t_O6P7dPb1M" />

## Overview

Check out the new features and enhancements for PagerDuty Process Automation (formerly Rundeck Enterprise) and PagerDuty Runbook Automation and Rundeck Community included in this release.

## Process Automation Updates

> Also includes all Open Source updates from below

### Highlights

#### IAM AWS Authentication for Runbook Automation
Previously, the only supported authentication method for the [AWS plugins](/manual/plugins/aws-plugins-overview.md) with Runbook Automation was through Access Key and Secret Key.  Now, customers can leverage the cross-account, IAM based authentication method for integrating Runbook Automation with their AWS accounts.  Not only is this method more secure and easy to configure, but it also allows customers to have multiple AWS Accounts integrated with their Runbook Automation instance, thereby allowing for a centralized hub of managing resources across multiple AWS environments

![IAM AWS Auth](/assets/img/aws-iam-auth-rba.png)<br>

#### Key Storage Configuration Enhancement

Customers can now view and configure [Key Storage integrations](/manual/key-storage/key-storage.md), such as [Vault](/manual/key-storage/storage-plugins/vault.md), [Cyberark](/manual/key-storage/storage-plugins/cyberark-storage.md), and [Thycotic](/manual/key-storage/storage-plugins/thycotic-storage.md), using a new graphical user interface (GUI) which displays the various integrations available and the necessary fields for each integration.  Users no longer have to reference documentation in order to identify the required and optional fields, these are now presented to the user natively within the product. This not only simplifies the setup and management of Key Storage integrations, but also reduces the likelihood of misconfiguration.  (Existing setups will continue to work and show up in the new configuration screens upon upgrade.)

### Additional Updates

* Fixed Cyberark Logo
* Fix: PagerDuty incident Update, didn&#39;t add a resolution note
* Fix: Unscheduling a Job In Cluster now works across all members

## Enterprise Runner Updates

**Bundled Runner Version:** 0.1.46

## Rundeck Open Source Product Updates

* [SSHJ-plugin: Remove use of temporary file to authenticate with password](https://github.com/rundeck/rundeck/pull/8428)
* [Script plugins, skip exceptions for key storage conversion](https://github.com/rundeck/rundeck/pull/8426)
* [Fix: Error importing job definition from 4.5](https://github.com/rundeck/rundeck/pull/8423)
* [Add Azure icon to core plugin](https://github.com/rundeck/rundeck/pull/8422)
* [Upgrade guava due to CVE-2023-2976](https://github.com/rundeck/rundeck/pull/8421)
* [Doc: Run API on local environment](https://github.com/rundeck/rundeck/pull/8396)
* [LDAP Fix large number of groups results in truncated user list](https://github.com/rundeck/rundeck/pull/8395)
* [Fix error handling format in MenuController forecast and info endpoints](https://github.com/rundeck/rundeck/pull/8394)
* [Fix/add changeset preconditions](https://github.com/rundeck/rundeck/pull/8393)
* [fix: authz checks for project type annotations](https://github.com/rundeck/rundeck/pull/8387)
* [Update to remco 0.12.4](https://github.com/rundeck/rundeck/pull/8384)
* [Fix: unable to upload xml jobs on 4.12 being exported from 4.5](https://github.com/rundeck/rundeck/pull/8376)
* [Bump snapshot version to 4.15.0](https://github.com/rundeck/rundeck/pull/8375)
* [Key Storage plugin GUI prep for Enterprise](https://github.com/rundeck/rundeck/pull/8373)
* [Fix: Added a customizer to avoid trace method on root path](https://github.com/rundeck/rundeck/pull/8357)
* [Dynamic default values for properties plugins](https://github.com/rundeck/rundeck/pull/8356)
* [Fix: HTTP Strict Transport Security (HSTS) Header Not Used](https://github.com/rundeck/rundeck/pull/8347)
* [Fix: Error responses including stacktraces](https://github.com/rundeck/rundeck/pull/8322)
* [Fix: &quot;Active Connection is required&quot; errors when using s3 log storage](https://github.com/rundeck/rundeck/pull/8319)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A4.15.0+is%3Aclosed)

## Community Contributors

*  ([rmeloamaro](https://github.com/rmeloamaro))
*  ([tomerarazy](https://github.com/tomerarazy))
* Cris Walther ([cwaltherf](https://github.com/cwaltherf))
*  ([simon-c-msc](https://github.com/simon-c-msc))
* JP Lassnibatt ([jplassnibatt](https://github.com/jplassnibatt))

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
* Jesus Osuna ([Jesus-Osuna-M](https://github.com/Jesus-Osuna-M))
* Leonel Juarez ([L2JE](https://github.com/L2JE))
* Luis Toledo ([ltamaster](https://github.com/ltamaster))
* Osman Albarran ([Oalbarran94](https://github.com/Oalbarran94))
* Rodrigo Navarro ([ronaveva](https://github.com/ronaveva))
* Stephen Joyner ([sjrd218](https://github.com/sjrd218))
