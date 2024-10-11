# Release 3.4.6

Name: <span style="color: deeppink"><span class="glyphicon glyphicon-flash"></span> "Papadum deeppink flash"</span>
Release Date: November, 11 2021

- [Download Rundeck](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/)

## Overview

Check out the new features and enhancements for Rundeck Enterprise and Rundeck Community included in this release.

## Enterprise Runner (Incubating)

The Rundeck Enterprise Runner securely opens up network/communication between data centers and the Rundeck Enterprise Cluster. The Runner is a Remote Execution hub for Node Steps to run on specified endpoints, rather than from the Rundeck server itself.  [Check out the documentation here](/administration/runner/).

![Runner Architecture](/assets/img/runner-arch-diagram.png)

> This incubating feature is available for preview in this version. Try out the Enterprise Runner, free of charge, while it's incubating and let us know what you think. This feature will be licensed separately once generally available.

## ServiceNow Rundeck Application Certified on Rome (Commercial)

The [ServiceNow Rundeck Application](https://store.servicenow.com/sn_appstore_store.do#!/store/application/6e8e2effdb8f041034a5d487f49619e2/1.0.6) is now certified on Rome.

Use the ServiceNow Rundeck Application to trigger provisioning, diagnostic, and repair actions from ServiceNow ITSM workflows. Enhance ticket information and automate repetitive tasks in your IT environment.

More details on this application in our [documentation](/manual/integrations/servicenow-app.md).


## Enterprise Updates

* Include settings to configure SMTP using Configuration Management
* User Manager authz update to require &#39;user&#39; resource instead of &#39;system&#39;
* The [ServiceNow Rundeck Application](https://store.servicenow.com/sn_appstore_store.do#!/store/application/6e8e2effdb8f041034a5d487f49619e2/1.0.6) Rome certification.


## Core Product Updates

* [Fixes duplicated job scheduling after renaming job/group](https://github.com/rundeck/rundeck/pull/7350)
* [Add Copy Box for job id](https://github.com/rundeck/rundeck/pull/7348)
* [Increase Memory settings in default profile templates](https://github.com/rundeck/rundeck/pull/7347)
* [Address color issues in dark-mode tags](https://github.com/rundeck/rundeck/pull/7344)
* [Fix: Dark mode nested table bg colors](https://github.com/rundeck/rundeck/pull/7337)
* [Connect execution output viewer color theme to global theme](https://github.com/rundeck/rundeck/pull/7327)
* [New JVM flag to disable local execution](https://github.com/rundeck/rundeck/pull/7323)
* [Allow instrumentation DNS](https://github.com/rundeck/rundeck/pull/7318)
* [Resolving issue #6621 Remove Summary Keys.](https://github.com/rundeck/rundeck/pull/7315)
* [Add the ability to turn off the unprotected health endpoint.](https://github.com/rundeck/rundeck/pull/7309)
* [Check authorization for metrics servlets](https://github.com/rundeck/rundeck/pull/7307)
* [Fix: Notifications not sent on job failure](https://github.com/rundeck/rundeck/pull/7293)
* [UI: update job editor nodes section to Vue](https://github.com/rundeck/rundeck/pull/7276)
* [Fix: projectStorage feature flag cannot be disabled](https://github.com/rundeck/rundeck/pull/7266)
* [Azure object store plugin](https://github.com/rundeck/rundeck/pull/7197)
* [Fix: max pagination config not working](https://github.com/rundeck/rundeck/pull/5469)



[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A3.4.6+is%3Aclosed)

## Community Contributors

* Carlos Eduardo (carlosrfranco)
* Miguel Ramos (mishingo)
* Alexander Abarca (alexander-variacode)
* Greg Schueler (gschueler)
* Greg Zapp (ProTip)
* Luis Toledo (ltamaster)
* Jason Qualman (qualman)
* Antony Velasquez Ruiz (avelasquezr)
* Stephen Joyner (sjrd218)
* Rodrigo Navarro (ronaveva)
* Christopher McCarroll-Gilbert (chrismcg14)


## Staff Contributors

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
