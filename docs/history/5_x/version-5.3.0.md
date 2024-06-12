---

title: "5.3.0 Release Notes"
date: 2024-01-01
image: /images/chevron-logo-red-on-white.png
feed:
 enable: true
 description: ""

---

# 5.3.0 Release Notes

Name: <span style="color: turquoise"><span class="glyphicon glyphicon-lamp"></span> "Etna turquoise lamp"</span>
Release Date: May 20th, 2024

- [Download the Releases](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/)
- [Catch us on Twitch for the Live Stream Release Video](https://www.twitch.tv/pagerduty)

## Overview

Version 5.3.0 is here! Check out the new features and enhancements for PagerDuty Runbook Automation (formerly Rundeck Enterprise) and Rundeck Community included in this release.

:::warning Concurrent Executions Performance Degradation
There is a bug in this release that causes execution failures when there are 10 or more concurrent executions. 
To mitigate this issue, add the following to Configuration Management or to `rundeck-config.properties`:
```
dataSource.properties.maximumPoolSize=100
```
A permanent fix will be available in the next release.
:::

## Highlights

### Project Runner Management Early Access
Users can now create, download, and manage [Enterprise Runners](/administration/runner/index.md) from within Projects. 
This gives teams more autonomy and flexibility with their automation and decreases their dependency on the tool administrators of Runbook Automation (cloud or self-hosted).

![Project Runner Management](/assets/img/project-runner-management.gif)<br>

To try out project-based Runner Management, submit the [Early Access form here](https://www.pagerduty.com/early-access/) and select **Project Runner Management**.  We will respond promptly with instructions on how to enable the feature. Read more about Runner management [here](/administration/runner/runner-management/managing-runners).

### New PagerDuty Job Steps
Among the more common use cases for Runbook Automation (cloud or self-hosted) is incident automation — either for retrieving diagnostics or carrying out remediation. To assist users with further automating the incident process, Runbook Automation can now natively invoke [PagerDuty Incident Workflows](https://support.pagerduty.com/docs/incident-workflows). 
This release includes both a Job Step and a Notification plugin to start an Incident Workflow. 
These plugins better enable users to connect the technical infrastructure processes with the communication and collaboration processes as part of their incident response.
Read more about the new plugins [here](/manual/plugins/pagerduty-plugins-overview.md).

### SFTP Option for Script Execution & File Transfer
The SSH File Transfer plugin (powered by SSHJ) now includes an option to use SFTP (Secure File Transfer Protocol) instead of SCP (Secure Copy Protocol) for securely executing scripts and transferring files.  As of recently, SFTP is the recommended method for dispatching files over networks.  In conjunction with the Enterprise Runner, this allows users to confidently execute scripts and transfer files in their most secure environments.  
We will continue to support SCP in the SSHJ plugin for the foreseeable future.  Read more about the SFTP option for our SSHJ plugin [here](/manual/projects/node-execution/ssh.md#sftp-file-copier).

Note: SCP was flagged with a Moderate level CVE by Red Hat. You can read the details of the CVE [here](https://access.redhat.com/security/cve/cve-2020-15778).

### Additional Updates

* [Configurable maximum log size for Job execution logs](/administration/configuration/config-file-reference.md#execution-log-settings)
* Performance improvement for Runbook Automation users with large numbers of Job executions through Runners.
* [Update http-step plugin to mitigate CVE-2023-24621](https://github.com/rundeck-plugins/http-step/pull/29)
* Additional plugin credentials are now treated as secrets:
  * `framework.plugin.UserGroupSource.OktaGroupSource.apiToken`
  * `rundeck.security.oauth.okta.clientSecret`
  * `rundeck.security.oauth.azure.clientSecret`
  * `framework.plugin.ExecutionFileStorage.org.rundeck.amazon-s3.AWSSecretKey`
* Additional ACL policies for project-based Runner management
* Fix: OpenSSH CopyFile not working on Docker
* Fix: duplicate user entries when using LDAP and case sensitivity
* Fix: Error when using step labels with Ruleset workflow strategy
* Fix: Autotakeover resuming executions that use a Runner
* Update Azure and SSHJ plugins to mitigate CVE-2021-29425
* Update spring to 5.3.34 to mitigate CVE-2024-22262
* Fix: log event metadata produces errors when using specific log filters
* Update nimbus-jose dependencies and constraints to mitigate CVE-2023-52428
* Fix: Docker image ignoring value of `JVM_MAX_RAM_PERCENTAGE`
* Fix: intermittent 500 errors when querying the execution metrics through the API
* Fix: Database errors when upgrading to 5.2.0 while using Microsoft SQL Server.
* Upgrade Grails to 6.1 



## Rundeck Open Source Product Updates

* [RUN:2243: Update sshj-plugin version to mitigate CVE](https://github.com/rundeck/rundeck/pull/9108)
* [testdeck schedule job](https://github.com/rundeck/rundeck/pull/9106)
* [Login counting multiple times in user classes](https://github.com/rundeck/rundeck/pull/9105)
* [Update spring to 5.3.34 address CVE-2024-22262](https://github.com/rundeck/rundeck/pull/9095)
* [add TZ to scheduled jobs in tests](https://github.com/rundeck/rundeck/pull/9092)
* [QAF-migration2](https://github.com/rundeck/rundeck/pull/9088)
* [Add functional test for ldap duplicated user fix](https://github.com/rundeck/rundeck/pull/9087)
* [unit tests for edit project file](https://github.com/rundeck/rundeck/pull/9084)
* [fix log event metadata may be incorrect](https://github.com/rundeck/rundeck/pull/9081)
* [fixes project label and description tests](https://github.com/rundeck/rundeck/pull/9077)
* [bump sshj plugin version to 0.1.12](https://github.com/rundeck/rundeck/pull/9076)
* [Make max log size configurable (whale log limit)](https://github.com/rundeck/rundeck/pull/9074)
* [Add ACL&#39;s for project runner management](https://github.com/rundeck/rundeck/pull/9073)
* [Change label and description of secureExposed option type](https://github.com/rundeck/rundeck/pull/9069)
* [Grails 6.1.2 upgrade](https://github.com/rundeck/rundeck/pull/9068)
* [OpenSSH CopyFile not working on Docker](https://github.com/rundeck/rundeck/pull/9067)
* [Remove packages that are not being used and update dependencies](https://github.com/rundeck/rundeck/pull/9064)
* [Update nimbus-jose deps and constraints for CVE-2023-52428](https://github.com/rundeck/rundeck/pull/9063)
* [Fix: Case sensitive in users when used LDAP OSS](https://github.com/rundeck/rundeck/pull/9062)
* [Fix: Users logged from LDAP are duplicate](https://github.com/rundeck/rundeck/pull/9059)
* [Fix docker image ignoring value of JVM_MAX_RAM_PERCENTAGE](https://github.com/rundeck/rundeck/pull/9052)
* [Fix hibernate user session on scm context](https://github.com/rundeck/rundeck/pull/9050)
* [Ui:Next: remove duplicated backslash on nextUi for menu/home](https://github.com/rundeck/rundeck/pull/9049)
* [Run-2255 add unit tests for RundeckInfo component](https://github.com/rundeck/rundeck/pull/9048)
* [Fix/selenium](https://github.com/rundeck/rundeck/pull/9047)
* [Update version to 5.3.0-SNAPSHOT](https://github.com/rundeck/rundeck/pull/9036)
* [QAF Migration: Default File Copier](https://github.com/rundeck/rundeck/pull/9030)
* [Tests: Added tests for job options duplication](https://github.com/rundeck/rundeck/pull/9025)
* [pt2: QAF&#39;s Oss Migration Package](https://github.com/rundeck/rundeck/pull/9024)
* [add ansible functional test using runner](https://github.com/rundeck/rundeck/pull/9023)
* [Tests: Migrated job timeout and log data wf step tests](https://github.com/rundeck/rundeck/pull/9022)
* [QAF Migration: 3 tests](https://github.com/rundeck/rundeck/pull/9021)
* [Tests: Migrated Job Reference tests from qafw](https://github.com/rundeck/rundeck/pull/9018)
* [QAF Migration Oss](https://github.com/rundeck/rundeck/pull/9017)
* [Fix: Case sensitive in users when used LDAP module OSS ](https://github.com/rundeck/rundeck/pull/9016)
* [&amp; Fix: Users logged in rundeck from LDAP are duplicate ](https://github.com/rundeck/rundeck/pull/9015)
* [QAF Migration to New Testdeck](https://github.com/rundeck/rundeck/pull/9007)
* [QAF selenium tests migration](https://github.com/rundeck/rundeck/pull/8997)
* [Fix: Flaky &quot;json resource&quot; Test](https://github.com/rundeck/rundeck/pull/8971)
* [Fix: Server Error while Metrics Request](https://github.com/rundeck/rundeck/pull/8969)
* [Fixed overlapping label and button](https://github.com/rundeck/rundeck/pull/8950)
* [Testdeck Migration: 10 Tests](https://github.com/rundeck/rundeck/pull/8901)
* [Migrate api new testdeck - config the cluster environment](https://github.com/rundeck/rundeck/pull/8844)
* [Grails 6.1 upgrade](https://github.com/rundeck/rundeck/pull/8665)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A5.3.0+is%3Aclosed)

## Ansible Plugin Updates
* [add plugin group](https://github.com/rundeck-plugins/ansible-plugin/pull/355)
* [Fix: No Syntax Highlight Between Edit Sessions Ansible Plugin](https://github.com/rundeck-plugins/ansible-plugin/pull/354)
* [Use ansible vault for temporary files](https://github.com/rundeck-plugins/ansible-plugin/pull/352)




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
* Dave Darby ([David Darby](https://github.com/ddarby-hike))
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
