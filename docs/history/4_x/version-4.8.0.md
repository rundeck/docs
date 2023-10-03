---

title: "4.8.0 Release Notes"
date: 2022-11-10
image: /images/chevron-logo-red-on-white.png
feed:
  description: "Version 4.8.0 is here! Check out the new RSS Feed Plugin that will help streamline Automated Diagnostics and Resume Jobs using Ruleset and Parallel Strategies."

---

# 4.8.0 Release Notes

Name: <span style="color: green"><span class="glyphicon glyphicon-knight"></span> "Phoenix green knight"</span>
Release Date: November 10, 2022

- [Download the Releases](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Watch the Live Stream Release Recap](https://youtu.be/UgOePLEIcfw)
- [Upgrade instructions](/upgrading/)

## Overview

Check out the new features and enhancements for PagerDuty Process Automation, PagerDuty Runbook Automation, and Rundeck Community included in this release. This release includes a new plugin that shows queries status pages from cloud providers and SaaS tools to help users quickly understand if a performance degradation is due to a third party and a number of security and compliance updates and bug fixes.

View our Twitch stream review of this release live on Wednesday, November 15 at 10AM Pacific. [Here’s the event link](https://www.twitch.tv/pagerduty/schedule?seriesID=792f972e-f876-4135-b6c2-6ea30a5c0330).

:::warning
If you are using password authentication with the Rundeck API, the JSESSIONID cookie will change after the first request after authentication. You will have to update your client code to follow redirects for subsequent requests. For example, when using curl you would have to use -b and -c options to update the session cookie in your next request after authentication. Alternately, you could add the -L option to the initial login POST, which will follow the redirect after login and update the session cookie.
:::
### Highlights

**RSS Feed Plugin** - Our new [RSS Feed Plugin](/manual/workflow-steps/rss-feed-plugin.md) helps users quickly understand whether an incident is due to an internal issue or a third-party. The RSS Feed Plugin allows users to query and parse RSS feeds for events from SaaS tools and public cloud providers. For users deploying the [Automated-Diagnostics Solution](/learning/solutions/automated-diagnostics/solution-overview.md), this plugin provides a logical first step for implementation.

**Job Resume now works with Parallel/Ruleset strategies** - It's now possible to execute previously failed step(s) with the same inputs on Parallel and Ruleset execution strategies.  When enabled on a Job, the plugin will record the internal Workflow State as the Execution progresses. When one or more steps fail, the Workflow State prior to executing the failed step(s) is recorded and stored and can be restarted if needed.  [Check out all the details here](/manual/execution-lifecycle/job-resume.md).

_Patched CVE-2022-42889_ - A recent security announcement was released for Apache’s common-text library. Rundeck and Process Automation products were not using the library in a vulnerable way, but we still went ahead and made updates to the patched versions to reduce false positives for customers that might be scanning for vulnerabilities.

### Process/Runbook Automation Updates

* The [ServiceNow Application](/manual/integrations/servicenow-app.md) is now certified for the Tokyo Release.
* HTTP Job Step now allows printing of status/response codes to log output.
* Fix: ECS/ELB output now clearly shows zero values
* Update base Ubuntu packages on docker build
* Fix: ROI Metrics Output inconsistent with multiple jobs running
* Fix: Result data plugin may not work with simultaneous jobs
* Fix: Execution history cleaner not working if member UUID changes
* Fix: app start fails when disabling calendars and project schedules
* Implement RSS Feeds Plugin
* Update Job Resume to work with Parallel/Ruleset strategies
* Enh: Upgrade Azure Node Source to allow getting resources from selected resource groups
* FIX: AWS EC2 Node Source Plugin now works with Service Accounts


## Rundeck Open Source Product Updates

* [Fix: CVE-2022-3515:Update for Docker Base Ubuntu Image (libksba8 to 1.3.5-2ubuntu0.20.04.1) ](https://github.com/rundeck/rundeck/pull/7981)
* [Include new version of py-winrm plugin 2.1.0 in buld](https://github.com/rundeck/rundeck/pull/7980)
* [Fix: CVE-2022-42004, CVE-2022-42003 update Rundeck (jackson-databind upgraded to 2.13.4.2)](https://github.com/rundeck/rundeck/pull/7977)
* [Fix: Jobs tags are now included when exporting yaml file with rd-cli](https://github.com/rundeck/rundeck/pull/7976)
* [Fix: Proper Inline Icon rendering within Dropdowns](https://github.com/rundeck/rundeck/pull/7975)
* [Fix: CVE-2022-42889 for Rundeck (remove commons-text dependency)](https://github.com/rundeck/rundeck/pull/7972)
* [Fix: Activity Tab no progress percentage displayed in a Progress-bar](https://github.com/rundeck/rundeck/pull/7971)
* [Allow form data to be sent to Webhooks](https://github.com/rundeck/rundeck/pull/7969)
* [Fix: Improve rendering in Job select-all option](https://github.com/rundeck/rundeck/pull/7967)
* [Fix: Custom Replacement in Key-Value Log Filter Plugin](https://github.com/rundeck/rundeck/pull/7966)
* [Fix: Log error when SCM tries to reconnect](https://github.com/rundeck/rundeck/pull/7962)
* [Fix: Long node names overlapping each other in matched nodes list](https://github.com/rundeck/rundeck/pull/7956)
* [Fix: Execution history cleaner not working if member UUID changes](https://github.com/rundeck/rundeck/pull/7952)
* [Fix: Text overflow on the webhook handler plugin list](https://github.com/rundeck/rundeck/pull/7950)
* [Fix: MOTD (Message of the day) not displayed (Rundeck OSS)](https://github.com/rundeck/rundeck/pull/7935)
* [Fix: allowing user to see logs after the job is deleted](https://github.com/rundeck/rundeck/pull/7929)
* [Add note about new example plugins repo](https://github.com/rundeck/rundeck/pull/7891)
* [Fix: Include auto-complete for job context variables in notifications](https://github.com/rundeck/rundeck/pull/7886)
* [Sec: Change session id after login to avoid fixation attacks](https://github.com/rundeck/rundeck/pull/7884)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A4.8.0+is%3Aclosed)

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
