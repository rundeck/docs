---

title: "5.0.0 Release Notes"
date: 2023-12-14
image: /images/chevron-logo-red-on-white.png
feed:
 enable: true
 description: "Rundeck/Process Automation 5.0 is here!"

---

# 5.0.0 Release Notes

Name: <span style="color: brown"><span class="glyphicon glyphicon-apple"></span> "Denali brown apple"</span>
Release Date: December 14th, 2023

- [Download the Releases](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)

::: danger Please use version 5.0.2
We have found some issues with Log Filters and passing data to the Enterprise Runner.  Please use the [5.0.2 Release](version-5.0.2.md) when upgrading.
:::

::: warning Upgrade Steps
Be sure to follow the [Upgrade instructions](/upgrading/) when moving to version 5.0 or higher.  There are new minimum Java versions and other important information.
:::

## Overview

Rundeck/Process Automation 5.0 is here! This release updates the underlying foundations of the Rundeck and Process Automation platform to open up more opportunities for enhancements and improvements in the 5.x series.
 
Our major version releases typically center around updates to the foundational libraries we use to build Rundeck. The result is a more stable, extensible, and secure product from the extensive library updates.  There are also commonly breaking changes or key upgrade steps to be aware of.  For this 5.0 release, we still included some enhancements and have more planned throughout the 5.x release cycle.

### Runner Key Storage GUI for Resource Model Sources.

With [version 4.16.0](/history/4_x/version-4.16.0.md), the Enterprise Runner became capable of populating the Node Inventory with nodes that can only be accessed internally - such as VMware virtual machines and Kubernetes pods.  Now, if accessing the inventory for these nodes requires a secret - such as an API Key for VMware - that secret can be retrieved by the Runner from a self-hosted secrets management provider, such as Hashicorp Vault.  This allows users to populate the Node Inventory through the Runner - even when the source of those nodes are secured by a secret.

### Jobs List Performance

The Job Lists UI has been fully refactored on the backend, resulting in a performance improvement of up to 85%.  This will be most noticeable for Projects and a lot of grouped jobs.

### Java 11 Minimum Required
To align the product with some of the foundational updates listed below the 5.0 version now requires Java 11.

### Deprecations

Saved Job, Report, and Node filters are no longer stored in the database.  Node Filters are now stored locally on the browser and we will be updating Job and Report filters to function the same way in a future release.

Apache Tomcat is no longer a supported Application Server platform for Rundeck or Process Automation.

### API Changes

The new Current API version is now `46`. The new API depreciation version is `17`. This means that future Rundeck releases will have a minimum API version of `17`.  Customers should ensure that code using the API is updated accordingly.

XML Support on the API is being deprecated and starting with the 5.x series we will only be supporting the JSON input and output options.  (Note: Job definitions in XML format are still supported)

Check the [API Versions page](/api/rundeck-api-versions.md) for all the details.

## Runner Versioning

With this release the versioning for the Enterprise Runner is now aligned with the build version of the product.  The Runner version included in this release will be `5.0.0`

### “Under the hood” updates

- Grails 6 is now the foundation for Rundeck and Process Automation products.
- Builds are now completed using Node 18.
- Started conversion of pages from old UI code to Vue.  This effort will be on-going through the 5.x series and will bring performance improvements across the product.

### Additional Improvements/Changes

- Upgraded H2 database to resolve CVE-2022-45868.  (Please see Upgrade Notes if using H2.)
- Clearer logging messaging when running into Database Lock issues.
- The  `rdCLI` tool version 2.0.8 now supports JSON job definitions.

> Also includes all Open Source updates from below

## Rundeck Open Source Product Details

* [Upgrade to micronaut 3.10.3 &amp; netty-codec 4.1.100.Final](https://github.com/rundeck/rundeck/pull/8704)
* [Fix liquidbase checksum error](https://github.com/rundeck/rundeck/pull/8698)
* [Add specific message when facing a liquibase LockException](https://github.com/rundeck/rundeck/pull/8696)
* [Fix: Node wizard and resourceyaml sources cannot store +4K lines of node entries ](https://github.com/rundeck/rundeck/pull/8690)
* [Prevent markdown-view from applying its default theme](https://github.com/rundeck/rundeck/pull/8689)
* [Convert Node view pages to Vue](https://github.com/rundeck/rundeck/pull/8688)
* [Convert Edit Readme/MOTD Page to Vue](https://github.com/rundeck/rundeck/pull/8687)
* [Fix: Job option description too long](https://github.com/rundeck/rundeck/pull/8685)
* [CircleCI: Store generated rpm and deb as build artifacts](https://github.com/rundeck/rundeck/pull/8684)
* [Fix: API listing running executions fail using wildcards](https://github.com/rundeck/rundeck/pull/8662)
* [Add runner key storage GUI for node sources](https://github.com/rundeck/rundeck/pull/8650)
* [Grails 6 Upgrade](https://github.com/rundeck/rundeck/pull/8648)
* [Remove XML API support](https://github.com/rundeck/rundeck/pull/8586)
* [Integrate rundeck-plugins/job-kill-handler-addon into Rundeck Core](https://github.com/rundeck/rundeck/pull/8584)
* [API Minimum version 14](https://github.com/rundeck/rundeck/pull/8581)
* [Fix variable expansion for DYNAMIC_FORM property values](https://github.com/rundeck/rundeck/pull/8575)
* [Remove Job and Report filters saved in DB](https://github.com/rundeck/rundeck/pull/8562)
* [Remove database storage for &quot;Node Filters&quot;](https://github.com/rundeck/rundeck/pull/8558)
* [Fix: Project Components not exported when using export to another instance](https://github.com/rundeck/rundeck/pull/8504)
* [Upgrade H2 database to resolve CVE-2022-45868 (see upgrade notes)](https://github.com/rundeck/rundeck/pull/8420)

[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A5.0.0+is%3Aclosed)

## Ansible Plugin Updates
* [Fix: Error handler not working as expected with Ansible Node Step](https://github.com/rundeck-plugins/ansible-plugin/pull/343)
* [Fixing ANSIBLE_BINARIES_DIR_PATH resolution](https://github.com/rundeck-plugins/ansible-plugin/pull/342)
* [Dedicated log filter plugin to capture the output of ansible set_stats module](https://github.com/rundeck-plugins/ansible-plugin/pull/341)

## Community Contributors

Submit your own Pull Requests to get recognition here!

* SimonC ([Simon-cto](https://github.com/Simon-cto))
*  ([rmeloamaro](https://github.com/rmeloamaro))


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
* Sarah Martinelli Benedetti ([smartinellibenedetti](https://github.com/smartinellibenedetti))
* Stephen Joyner ([sjrd218](https://github.com/sjrd218))
