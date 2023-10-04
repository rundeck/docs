---

title: "4.12.0 Release Notes"
date: 2023-04-17
image: /images/chevron-logo-red-on-white.png
feed:
  description: "Improvements to Kubernetes, Datadog, GCP, Azure and many more enhancements!"

---

# 4.12.0 Release Notes

Name: <span style="color: orange"><span class="glyphicon glyphicon-flash"></span> "Unicorn orange flash"</span>
Release Date: April 17th, 2023

- [Download the Releases](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/)
- [Watch the Live Stream Release Recap](https://youtu.be/e6Rs9BRljAA)

<YouTube id="e6Rs9BRljAA"/>

## Overview

Check out the new features and enhancements for PagerDuty Process Automation, PagerDuty Runbook Automation, and Rundeck Community included in this release. This release includes new plugins for Kubernetes, new Plugin Suites for Google Cloud, Datadog, and Azure, performance improvements to the [Enterprise Runner](/administration/runner/runner-install.html), new authentication methods for Remote URL Job Options, and security fixes.

View our Twitch stream review of this release live on May 9. [Here’s the event link.](https://www.twitch.tv/pagerduty/schedule)

## Process Automation Updates

> Also includes all Open Source updates from below

### Highlights

**Two new Kubernetes plugins**:

* _Describe Pod_ is a Job Node Step plugin that allows users to view the status and details of pods in Kubernetes clusters. When diagnosing incidents, this plugin is useful for understanding whether the container in the pod is behaving as expected, or if there is a configuration issue with the pod. Click [here](/learning/howto/how2kube.html#managing-kubernetes-with-rundeck) for instructions to get set up with the Kubernetes plugins

* _Ephemeral Debug Container_ is also a Job Node Step plugin that allows users to attach an [ephemeral container](https://kubernetes.io/docs/concepts/workloads/pods/ephemeral-containers/) to running pods. This plugin provides a safe method for troubleshooting running pods that may not have debugging utilities in their container image. Capturing debug data from containers can reduce MTTR during incidents or time to identify issues during QA.

![](/assets/img/relnotes-412-k8s.png)

**New Plugin Suites for Google Cloud, Datadog, and Azure:** [Plugin Suites](/history/4_x/version-4.9.0.html) streamline the configuration of plugins. The Plugin Suites for Google Cloud, Datadog, and Azure reduce the number of steps required to configure plugins across an entire project—or the entire Process Automation or Runbook Automation instance. For example, previously a user would need to configure credentials for both the GCP Node Source and the GCP Job Step plugins. Now those credentials can be configured in a single location.

![](/assets/img/relnotes-412-gcp.png)

**New PagerDuty Incident Note notification plugin:** Now users can add a note to the Incident timeline in PagerDuty in response to the start, success, failure, or duration of a job. This helps users get an immediate feedback signal on the status of their Job without needing to add extra Job steps to their Job definitions.

**Enterprise Runner enhancements:** Updates to the performance of the Enterprise Runner result in faster Job execution and output. Now, when Jobs or Job steps are executed concurrently on Runners, users can expect up to an 80% reduction in perceived Job duration. This enhancement builds on top of the [new architecture for Runners](/administration/runner/runner-intro.html) that was announced in [4.11.0](/history/4_x/version-4.11.0.html). 

**Updated to Remote URL Job Options:** Now users can pre-populate Job Options Values from remote sources that require authentication. Remote URL Job Options supports multiple authentication methods for making HTTP/S calls to retrieve the list of Job Options. Users can select from the following authentication methods for the remote URL: Basic, API Key, and Bearer Token. The keys for each of these methods can be retrieved from Key Storage. Additionally, users can reference nested JSON elements from the returned payload of the remote URL. Click [here](/manual/job-options.html#remote-url-job-options) for the full documentation. 

![](/assets/img/relnotes-412-urloption.png)

#### Security fixes

RUN-1629: Upgrade core libraries for CVE-2023-20861
RUN-1615: Invalidate user sessions upon password change/reset 


### Additional Updates


* New PagerDuty Notification - Add Note to Incident
* Upgrade core libraries for CVE-2023-20861
* Run 1404: Datadog plugin group
* Run 1615: Invalidate user sessions upon password change/reset
* Change config delete endpoint to use POST
* Fix: Exec-Cleaner Delete Cluster Dead Member&#39;s Executions
* Fix: Auto Takeover when scheduling via project schedules
* Fix: Stored Cross-Site Scripting (XSS) in Tour Management
* Fix: Cyberark Plugin Throws Wrong Errors
* Add GCP plugin group
* Azure plugin group
* Add Datadog Plugin Suite


## Rundeck Open Source Product Updates

* [Revert storage.gsp](https://github.com/rundeck/rundeck/pull/8257)
* [4.12.0-rc2: disable defer for ui plugins](https://github.com/rundeck/rundeck/pull/8252)
* [Upgrade core libraries for CVE-2023-20861](https://github.com/rundeck/rundeck/pull/8228)
* [Add JSON Path Option to Remote URL Option Input](https://github.com/rundeck/rundeck/pull/8224)
* [Set Cookie SemeSite Flag To Strict](https://github.com/rundeck/rundeck/pull/8221)
* [Fix: ERROR while running a dir command in a path with Japanese files (Upgrade plugin version)](https://github.com/rundeck/rundeck/pull/8220)
* [Invalidate user sessions upon password change/reset ](https://github.com/rundeck/rundeck/pull/8217)
* [Update jquery to 3.6.4](https://github.com/rundeck/rundeck/pull/8214)
* [Fix: Job xml parsing not honoring job option list delimiter](https://github.com/rundeck/rundeck/pull/8210)
* [Fix plugin registry loading behavior](https://github.com/rundeck/rundeck/pull/8208)
* [xss activity component](https://github.com/rundeck/rundeck/pull/8206)
* [Improve Authentication Options for Remote URL Option Input](https://github.com/rundeck/rundeck/pull/8193)
* [Convert Key Storage to Vue](https://github.com/rundeck/rundeck/pull/8191)
* [Fix: Exec-Cleaner Delete Cluster Dead Member&#39;s Executions](https://github.com/rundeck/rundeck/pull/8187)
* [Add link to execution mode toggle page on passive mode display](https://github.com/rundeck/rundeck/pull/8181)
* [Fix: Cyberark Plugin Throws Wrong Errors](https://github.com/rundeck/rundeck/pull/8176)
* [Notifications fixes for Average Duration, OnRestart, etc.](https://github.com/rundeck/rundeck/pull/8156)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A4.12.0+is%3Aclosed)

## Community Contributors

* Jobin Joseph ([nixjobin](https://github.com/nixjobin))



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
* Miguel Ramos ([mishingo](https://github.com/mishingo))
* Osman Albarran ([Oalbarran94](https://github.com/Oalbarran94))
* Rodrigo Navarro ([ronaveva](https://github.com/ronaveva))
* Stephen Joyner ([sjrd218](https://github.com/sjrd218))
* Jeremy Olexa ([jolexa](https://github.com/jolexa))
