# Release 4.8.0

Name: <span style="color: green"><span class="glyphicon glyphicon-knight"></span> "Phoenix green knight"</span>
Release Date: November 10, 2022

- [Download the Releases](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/)

## Overview

Check out the new features and enhancements for PagerDuty Process Automation, PagerDuty Runbook Automation, and Rundeck Community included in this release. This release includes a new plugin that shows queries status pages from cloud providers and SaaS tools to help users quickly understand if a performance degradation is due to a third party and a number of security and compliance updates and bug fixes.

View our Twitch stream review of this release live on Wednesday, November 15 at 10AM Pacific. [Here’s the event link](https://www.twitch.tv/pagerduty/schedule?seriesID=792f972e-f876-4135-b6c2-6ea30a5c0330).

### Highlights

**RSS Feed Plugin** - Our new [RSS Feed Plugin](/manual/workflow-steps/rss-feed-plugin.md) helps users quickly understand whether an incident is due to an internal issue or a third-party. The RSS Feed Plugin allows users to query and parse RSS feeds for events from SaaS tools and public cloud providers. For users deploying the [Automated-Diagnostics Solution](/learning/solutions/automated-diagnostics/solution-overview.md), this plugin provides a logical first step for implementation.

**Job Resume now works with Parallel/Ruleset strategies** - It's now possible to execute previously failed step(s) with the same inputs on Parallel and Ruleset execution strategies.  When enabled on a Job, the plugin will record the internal Workflow State as the Execution progresses. When one or more steps fail, the Workflow State prior to executing the failed step(s) is recorded and stored and can be restarted if needed.  [Check out all the details here](/manual/execution-lifecycle/job-resume.md).

_Patched CVE-2022-42889_ - A recent security announcement was released for Apache’s common-text library. Rundeck and Process Automation products were not using the library in a vulnerable way, but we still went ahead and made updates to the patched versions to reduce false positives for customers that might be scanning for vulnerabilities.

### Process/Runbook Automation Updates

* The [ServiceNow Application](/manual/integrations/servicenow-app.md) is now certified for the Tokyo Release.
* Update base Ubuntu packages on docker build
* Fix: CVE-2022-42889: Apache commons-text library
* Fix: ROI Metrics Output inconsistent with multiple jobs running
* Fix: Execution history cleaner not working if member UUID changes
* Fix: app start fails when disabling calendars and project schedules
* Implement [RSS Feeds Plugin](/manual/workflow-steps/rss-feed-plugin.md)
* Update [Job Resume to work with Parallel/Ruleset strategies](/manual/execution-lifecycle/job-resume.md)

## Rundeck Open Source Product Updates

* [Revert &quot;Upgrade Jquery and add Jquery migrate&quot;](https://github.com/rundeck/rundeck/pull/7987)
* [Update ubuntu packages on docker build](https://github.com/rundeck/rundeck/pull/7983)
* [Upgrade-Linux-Package-libksba8-To-Latest-Version](https://github.com/rundeck/rundeck/pull/7981)
* [Target new version of py winrm](https://github.com/rundeck/rundeck/pull/7980)
* [Convert AuthToken criteria queries in UserController to use data API](https://github.com/rundeck/rundeck/pull/7979)
* [update jx-db to 2.13.4.2](https://github.com/rundeck/rundeck/pull/7977)
* [rse-104: fix: jobs tags included when exporting yaml file with rd-cli](https://github.com/rundeck/rundeck/pull/7976)
* [Fix: Proper Inline Icon Rederization within Dropdowns](https://github.com/rundeck/rundeck/pull/7975)
* [CVE-2022-42889: commons-text library](https://github.com/rundeck/rundeck/pull/7972)
* [Fix: Activity Tab no progress percentage displayed in a Progress-bar](https://github.com/rundeck/rundeck/pull/7971)
* [Allow form data in webhooks](https://github.com/rundeck/rundeck/pull/7969)
* [Fix: select-all-function](https://github.com/rundeck/rundeck/pull/7967)
* [Fix: Custom Replacement in Key-Value Log Filter Plugin](https://github.com/rundeck/rundeck/pull/7966)
* [Fix: Log error when SCM tries to reconnect](https://github.com/rundeck/rundeck/pull/7962)
* [Fix: Long node names overlapping each other](https://github.com/rundeck/rundeck/pull/7956)
* [Upgrade Jquery and add Jquery migrate](https://github.com/rundeck/rundeck/pull/7953)
* [Fix: Execution history cleaner not working if member UUID changes](https://github.com/rundeck/rundeck/pull/7952)
* [Fix: Fix to the text-overflow on the WH&#39;s hadler plugin list](https://github.com/rundeck/rundeck/pull/7950)
* [MOTD (Message of the day) not displayed (Rundeck OSS)](https://github.com/rundeck/rundeck/pull/7935)
* [WF engine updates](https://github.com/rundeck/rundeck/pull/7931)
* [fix: allowing user to see logs after the job is deleted](https://github.com/rundeck/rundeck/pull/7929)
* [Add note about new example plugins repo](https://github.com/rundeck/rundeck/pull/7891)
* [ Fix Autocomplete job context variables in job notifications](https://github.com/rundeck/rundeck/pull/7886)
* [change session id after login](https://github.com/rundeck/rundeck/pull/7884)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A4.8.0+is%3Aclosed)

## Ansible Plugin Updates


## Community Contributors

* Miguel Ramos ([mishingo](https://github.com/mishingo))
* Alberto Hormazabal ([ahormazabal](https://github.com/ahormazabal))
* Eric He ([ehe-pd](https://github.com/ehe-pd))
* Jason Qualman ([qualman](https://github.com/qualman))
* Stephen Joyner ([sjrd218](https://github.com/sjrd218))
* Greg Schueler ([gschueler](https://github.com/gschueler))
* Osman Albarran ([Oalbarran94](https://github.com/Oalbarran94))
* Darwis Narvaez ([DarwisNarvaezDev](https://github.com/DarwisNarvaezDev))
* Jesus Osuna ([Jesus-Osuna-M](https://github.com/Jesus-Osuna-M))
* Antony Velasquez Ruiz ([avelasquezr](https://github.com/avelasquezr))
* Leonel Juarez ([L2JE](https://github.com/L2JE))
* Luis Toledo ([ltamaster](https://github.com/ltamaster))
* Forrest Evans ([fdevans](https://github.com/fdevans))
* Jake Cohen ([jsboak](https://github.com/jsboak))


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
