# Release 3.4.1

Name: <span style="color: blue"><span class="glyphicon glyphicon-briefcase"></span> "Papadum blue briefcase"</span>

[Download Rundeck](https://download.rundeck.com/)

## Overview

### New Webhook UI!  

Building on the great foundation of the 3.4.0 improvements we have revamped the Webhooks UI. Check out the image below for a preview.

![Webhooks UI](@assets/img/relnotes-341-webhooksui.gif)

### CyberArk Key Storage Plugin

Keep your business and its most valuable assets secure. Preventing malicious account or credential access starts with sound privileged access management.  The CyberArk Key Storage Plugin can be used as a Key Storage backend for Rundeck.  Use all the secrets from CyberArk in your automation scripts, Rundeck configuration, etc.

### Lots of Bug Fixes!

Check out the list below to see what made it into this version.

## Enterprise Updates

* Cyberark Key Storage Plugin
* Enh: Allow Users created in User Manager to change their own password
* Fix: Import all groups when configuring OKTA SSO
* Fix: Powershell Plugin - Add the option to change console encoding to utf-8


## Core Product Updates

* [Fix: Unable to edit a job after removing a plugin used in that job](https://github.com/rundeck/rundeck/pull/7126)
* [Fix: optionValuePlugins list disappears when when a validation errors](https://github.com/rundeck/rundeck/pull/7121)
* [Scope Ace setup to execution plugin tab](https://github.com/rundeck/rundeck/pull/7120)
* [Add UI profile and search to plugin list endpoint](https://github.com/rundeck/rundeck/pull/7118)
* [Adding maxsize and expiration time for fileUploadService config on RundeckConfigBase](https://github.com/rundeck/rundeck/pull/7115)
* [Fix: Dropdown context menu to be shown in the Notification edit modal](https://github.com/rundeck/rundeck/pull/7108)
* [Access control did not allow users to toggle execution enabled/disabled option even if allowed by ACL policy](https://github.com/rundeck/rundeck/pull/7095)
* [Bump the Rundeck client version to 0.2.3](https://github.com/rundeck/rundeck/pull/7093)
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
