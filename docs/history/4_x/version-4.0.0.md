# 4.0.0 Release Notes

Name: <span style="color: brown"><span class="glyphicon glyphicon-apple"></span> "Kraken brown apple"</span>
Release Date: March 22, 2022

- [Download Rundeck](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/)

# Rundeck 4.0 Release Notes

:::danger
Warning:  This release contains a bug that will cause issues in environments using a Load Balancer in front of Rundeck and running on https.  If your environment leverages a load balancer (NGINX, ELB, etc) and the `server.useForwardHeaders=true` is set there may be a situation where this version reverts to using `http` instead of `https`.

[Rundeck 4.1.0 fixes this bug](/history/4_x/version-4.1.0.md).
:::

## Rundeck Enterprise has a new Name

With the introduction of version 4.0 the Rundeck Enterprise version will be renamed to _PagerDuty Runbook Automation Self-Hosted_.  The Rundeck Cloud version announced late in 2021 is Generally Available and will be known as _PagerDuty Runbook Automation._ [Read more about Runbook Automation](/about/cloud/index.md). The Open Source version will continue to be _Rundeck._  The renames will take some time to implement, so bear with us as we update pages, documentation, and other areas of our new ecosystem.

## Enterprise Runner

With version 4.0 the [Enterprise Runner](/administration/runner/) will be Generally Available. The Enterprise Runner is built to meet the latest zero-trust security models. The Runner is deployed behind the firewall where it securely connects to nodes and executes automation tasks within the network zone. It calls back to the cluster endpoint via HTTPS to fetch the task list. This deployment model eliminates the need for SSH tunnels between zones.

## Enhanced Security Features

A variety of new features will help enhance the security of your Automation solution.

* [User Class Management](/manual/user-management/user-classes.md) is available to help manage your licensed users and what they are allowed to do.
* [Enhanced Webhook Security](/manual/webhooks.html#webhook-http-authorization-string) with Authorization strings that can be regenerated and provide another layer of security.
* [Password Complexity ](/administration/security/password-security.md)can be enabled for [User Manager](/manual/user-management/user-mgmt.md) to encourage local users to use more secure passwords.  Complexity can be set by length and guess-ability.
* [Password Reset by Email](/manual/user-management/password-reset.md) is now available for local users from [User Manager](/manual/user-management/user-mgmt.md) systems with email notifications configured.  Instead of setting a user’s password this will send them a 1 time link to set their own password.
* [Failed Login Rate Limiting](/administration/security/ratelimiting.md) will help prevent brute force attempts by locking accounts after a configurable number of failed logins.

## Plugin Enhancements

* New! [AWS Systems Manager](/manual/projects/node-execution/aws-ssm.md) plugins mean Rundeck does not need direct connectivity to remote AWS infrastructure. Rather, Rundeck sends commands to AWS Systems Manager, and Systems Manager dispatches the commands to remote nodes via the Systems Manager agents.
* [Azure Active Directory Single SignOn](/administration/security/sso/azure-sso.md) is now documented and built into Rundeck Enterprise.  
* [PagerDuty User Management Job Steps](/manual/jobs/job-plugins/workflow-steps/pagerduty.md) allow adding/removing and getting lists of your PagerDuty user accounts.
* [Thycotic Key Storage Plugin](/manual/key-storage/storage-plugins/thycotic-storage.md) can now use all password types.


## “Under the hood” updates

Along with all the new features above, our major version releases always include significant updates to the foundational libraries we use to build Rundeck.  The following highlights some of those new versions. The result is a more stable, extensible and secure product from the extensive library updates included.

* Grails 5 and Gradle 7.2 are the fundamental frameworks used to build Rundeck.
* UI is now built with Node 16
* Docker images now use Ubuntu 20.04 as the base OS.

## Feature Deprecation

Configuration through `config.groovy` will be deprecated in future versions.  The primary use for this was advanced mail configuration, which is now supported by Configuration Management or `rundeck-config.properties`.

## Version Cadence

Starting with 4.0 the product will be following a more traditional Major/Minor/Patch semantic versioning system. Previously, iterative releases were increasing on the 3rd (Patch) number.  Going forward those same releases will be iterating on the 2nd (minor) number.  This change will allow us greater flexibility to issue minor/quick patches when the need arises and align better with industry standards.

## API Changes

The new _Current API_ version number is: `41`.

[Check the API Versions page for all the details.](/api/rundeck-api-versions.md)

### Deprecations:

The API Deprecation version is now: `14`. This means that future Rundeck releases will have a minimum API version of `14`.

XML API support is now deprecated and will be removed in a future version(s). This applies to the majority of API endpoints which support XML requests/responses, however the “Job XML” format used for Job serialization is not being deprecated. API usage should be updated to use JSON.

### Promotions:

Some API endpoints previously marked as _incubating_ have now been promoted to Generally Available (GA), including Enterprise Calendar features, and Cluster Member Execution Mode toggle endpoints. Please check the API docs to see what has changed. In general, the `/incubating` URL path is now removed, and the current API version of `41` is now the required minimum for those endpoints.

## Enterprise Updates

* Fix tour manager export issues
* When a job is killed send cancel signal to Runner
* Enhanced Runner Installation and Management UI
* Include AWS SSM plugin
* Add Azure group source plugin to pull user membership for SSO
* Add clusterMode ENV vars to Docker Remco mapping
* Fix GUI issue - Node wizard - Authentication
* Add password complexity to User Manager
* Result Data Feature Finalization
* Obscure Password Input on S3 Resource Model
* Update Rundeck Enterprise official Docker base image to Ubuntu 20.04
* Allow for pulling in of all secret types by Thycotic
* PagerDuty manage users plugins

## Core Product Updates

* [Correct the parameter name of minute](https://github.com/rundeck/rundeck/pull/7586)
* [Add slack notification on main branch ci build/test failures](https://github.com/rundeck/rundeck/pull/7585)
* [Fix the crontab update issue](https://github.com/rundeck/rundeck/pull/7582)
* [Fix the crontab update bug](https://github.com/rundeck/rundeck/pull/7579)
* [Rundeck 4.0 theme names and UI JS cleanup](https://github.com/rundeck/rundeck/pull/7578)
* [Dark mode link color](https://github.com/rundeck/rundeck/pull/7576)
* [Execution mode change should allow app_admin authorization](https://github.com/rundeck/rundeck/pull/7574)
* [Remove tests from release builds](https://github.com/rundeck/rundeck/pull/7573)
* [Add feature flag to disable &quot;Job File Option&quot; uploads](https://github.com/rundeck/rundeck/pull/7569)
* [WIP: CI updates](https://github.com/rundeck/rundeck/pull/7568)
* [Use-Client-Side-FileReader-API-Load-Content-From-File](https://github.com/rundeck/rundeck/pull/7567)
* [Nested groups are not displayed by default](https://github.com/rundeck/rundeck/pull/7560)
* [Revert to default katex](https://github.com/rundeck/rundeck/pull/7559)
* [Enhance UserController to support more flexible error message](https://github.com/rundeck/rundeck/pull/7554)
* [Fix typo successful to successful in NotificationPlugin.java javadocs](https://github.com/rundeck/rundeck/pull/7550)
* [Fix English grammar typo in deleted job warning](https://github.com/rundeck/rundeck/pull/7548)
* [Rundeck Enterprise to Process Automation](https://github.com/rundeck/rundeck/pull/7540)
* [Migrate to grails 5.1.2](https://github.com/rundeck/rundeck/pull/7539)
* [Change Login/Logout Screen Logos](https://github.com/rundeck/rundeck/pull/7537)
* [Update asset plugin to the last version](https://github.com/rundeck/rundeck/pull/7534)
* [Rundeck Enterprise to PagerDuty Process Automation](https://github.com/rundeck/rundeck/pull/7533)
* [Remco mappings for GUI and Metrics settings](https://github.com/rundeck/rundeck/pull/7532)
* [Fix SSO configs. Upgrade grails spring security plugin and libs.](https://github.com/rundeck/rundeck/pull/7530)
* [Upgrade Front End to Node 16](https://github.com/rundeck/rundeck/pull/7526)
* [Using last version of assets plugin through jitpack](https://github.com/rundeck/rundeck/pull/7525)
* [UI Alignment Spacing/Layouts](https://github.com/rundeck/rundeck/pull/7524)
* [API Updates for 4.x](https://github.com/rundeck/rundeck/pull/7523)
* [Update to Node 16.13.0](https://github.com/rundeck/rundeck/pull/7522)
* [Add some ENV variables to Docker Remco mapping](https://github.com/rundeck/rundeck/pull/7519)
* [Fix vue console errors](https://github.com/rundeck/rundeck/pull/7512)
* [Unifying button colors and stylings](https://github.com/rundeck/rundeck/pull/7509)
* [Fix Execution Log output on Chrome makes Rundeck GUI unresponsive](https://github.com/rundeck/rundeck/pull/7508)
* [Obscure Password Input on S3 Resource Model](https://github.com/rundeck/rundeck/pull/7503)
* [Expand and optimize Job Edit Details tests](https://github.com/rundeck/rundeck/pull/7498)
* [Add the ability to authenticate webhooks using the Authorization header](https://github.com/rundeck/rundeck/pull/7495)
* [Ldap name and last name cannot sync](https://github.com/rundeck/rundeck/pull/7493)
* [Make official ubuntu 20.04 image the base image of rundeck ubuntu-base ](https://github.com/rundeck/rundeck/pull/7486)
* [Added Create Project button into Project Picker](https://github.com/rundeck/rundeck/pull/7481)
* [Fix/issue 5780 api gui pagination](https://github.com/rundeck/rundeck/pull/7479)
* [Allow several tokens per user for API authentication](https://github.com/rundeck/rundeck/pull/7411)
* [Convert schedules section of job edit/create to Vue](https://github.com/rundeck/rundeck/pull/7394)
* [Upgrade to grade 7.2, for grails 5](https://github.com/rundeck/rundeck/pull/7333)

[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A4.0.0+is%3Aclosed)

## Community Contributors

* Travis Yoder (trayo)
* debanne (debanne)
* sclarson (sclarson)

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
