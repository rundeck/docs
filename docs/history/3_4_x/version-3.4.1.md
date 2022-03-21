# Release 3.4.1

Name: <span style="color: blue"><span class="glyphicon glyphicon-briefcase"></span> "Papadum blue briefcase"</span>
Release Date: July 16, 2021

- [Download Rundeck](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)

## Overview
Check out the new features and enhancements for both Rundeck Enterprise and Open Source in this release.

### CyberArk Key Storage Plugin (Enterprise)

Keep your business and its most valuable assets secure. Preventing malicious account or credential access starts with sound privileged access management. The new [CyberArk plugin ](/manual/key-storage/storage-plugins/cyberark-storage.md)joined existing Rundeck plugins with [Thycotic](/manual/key-storage/storage-plugins/thycotic-storage.md) and [HashiCorp Vault](/manual/key-storage/storage-plugins/vault.md) to provide Rundeck users more options for secrets management. The CyberArk Key Storage Plugin can be used as a Key Storage backend for Rundeck. Use secrets from CyberArk in your automation scripts, Rundeck configuration, etc.

### New Webhook UI!  

Building on the great foundation of the UI improvements in 3.4.0, we have updated the Webhooks UI to fit our new UI design.

![Webhooks UI](@assets/img/relnotes-341-webhooksui.gif)

### Lots of Bug Fixes!

Check out the list below to see what made it into this version.

## Enterprise Updates

* Cyberark Key Storage Plugin
* Enh: Allow Users created in User Manager to change their own password
* Fix: Import all groups when configuring OKTA SSO
* Fix: Powershell Plugin - Add the option to change console encoding to utf-8


## Core Product Updates

* [Fix issue on exported data vars for job references not being exported](https://github.com/rundeck/rundeck/pull/7143)
* [Fix 3.4.0 UI regressions](https://github.com/rundeck/rundeck/pull/7140)
* [Re-Design Webhooks screen](https://github.com/rundeck/rundeck/pull/7134)
* [Fix: UI Bug with Projects list that hinders display over 15 projects in a list.](https://github.com/rundeck/rundeck/pull/7133)
* [Update issue templates](https://github.com/rundeck/rundeck/pull/7129)
* [Fix: Unable to edit a job after removing a plugin used in that job](https://github.com/rundeck/rundeck/pull/7126)
* [Fix: optionValuePlugins list disappears when when a validation errors](https://github.com/rundeck/rundeck/pull/7121)
* [Scope Ace setup to execution plugin tab](https://github.com/rundeck/rundeck/pull/7120)
* [Add UI profile and search to plugin list endpoint](https://github.com/rundeck/rundeck/pull/7118)
* [Adding maxsize and expiration time for fileUploadService config on RundeckConfigBase](https://github.com/rundeck/rundeck/pull/7115)
* [Fix: Dropdown context menu to be shown in the Notification edit modal](https://github.com/rundeck/rundeck/pull/7108)
* [Access control did not allow users to toggle execution enabled/disabled option even if allowed by ACL policy](https://github.com/rundeck/rundeck/pull/7095)
* [Bump the Rundeck client version to 0.2.3](https://github.com/rundeck/rundeck/pull/7093)
* [Allowed apostrophe character on first name and last name fields](https://github.com/rundeck/rundeck/pull/7060)
* [Export Variables available to Notifications](https://github.com/rundeck/rundeck/pull/7045)
* [Fix: git build info is cached and not cleaned](https://github.com/rundeck/rundeck/pull/7021)
* [Fix: Unable to edit a job after removing a plugin used in that job.](https://github.com/rundeck/rundeck/pull/7009)
* [Fix: Add support for unquoted options (rundeck will supply the value as-is)](https://github.com/rundeck/rundeck/pull/6823)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A3.4.1+is%3Aclosed)

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
* Umberto Nicoletti (unicolet)
