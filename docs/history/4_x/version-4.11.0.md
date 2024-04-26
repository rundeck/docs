---

title: "4.11.0 Release Notes"
date: 2023-03-13
image: /images/chevron-logo-red-on-white.png
feed:
  description: "Version 4.11.0 is here. More Plugin Suites and JSON Job Exports.  Check Release Notes for more info."

---

# 4.11.0 Release Notes

Name: <span style="color: coral"><span class="glyphicon glyphicon-briefcase"></span> "Satyr coral briefcase"</span>
Release Date: March 13th, 2023

- [Download the Releases](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/)
- [Watch the Live Stream Release Recap](https://youtu.be/bqPzA0S7hIY)

<VidStack src="youtube/bqPzA0S7hIY"/>

::: 
Additionally, we are announcing some exciting product updates this month. [Sign up for the launch webinar](https://www.pagerduty.com/resources/webinar/bridging-network-silos-with-new-distributed-automation/?utm_medium=email&utm_source=marketo&utm_campaign=email_customers_Global-Wb-BridgeNetworkSilosDistributedAutomation-Email&utm_content=4.11_release_notes) to learn more.
:::

## Overview

Check out the new features and enhancements for PagerDuty Process Automation, PagerDuty Runbook Automation, and Rundeck Community included in this release. With the release of PagerDuty Runbook Automation 4.11.0 and PagerDuty Process Automation 4.11.0, we are introducing a new architecture for orchestrating workflows across cloud and hybrid environments through the Enterprise Runners. 
In addition, this release includes two new Plugin Suites to simplify configuration of plugins and the release of an official Docker image for the Runner.


### Highlights
The [new architecture for Runners](/administration/runner/) offers flexibility to create powerful and resilient cross-environment jobs. The new architecture separates workflow orchestration from task execution. It offers next- generation remote Runners that are now packaged with common plugins such as Ansible, Docker, and Kubernetes that execute locally within the private network. The new architecture now allows job authors to develop automated jobs that incorporate multiple environments, and job authors have the flexibility to specify where and how Runners participate in executing distributed job steps.

This release includes new Plugin Suites for ServiceNow and Jira. As a reminder, [Plugin Suites streamline the configuration](/history/4_x/version-4.9.0.md) of plugins. Now users can update plugin configurations from a single location (previously this had to be done in multiple locations). In addition, this release includes an official container image for the [Runner](/administration/runner/runner-install.md).

* The new [ServiceNow Plugin Suite](/manual/plugins/servicenow-plugins-overview.md) has a Node Source and many job steps to help pull in nodes from your CMDB and execute automation back into tables within ServiceNow. The ServiceNow Plugin Suite can be configured on a per-project basis or for the entire system. [Learn more.](/manual/plugins/servicenow-plugins-overview.md) 

![ServiceNow Plugin Config](/assets/img/relnotes-4.11.0-snplugingroup.png)

* Jira plugins, which support Jira Server and Jira Cloud, have also been added to the Plugin Suite configuration model. Now Jira plugins can be configured in the GUI at the project or System level and applied across different plugin types. To get started with the Jira Suite, click [here](/manual/plugins/jira-plugins-overview.md).

![JIRA Plugin Config](/assets/img/relnotes-4.11.0-jiraplugingroup.png)

* An official Docker container image for the Runner has been published and is available from [Dockerhub](https://hub.docker.com/r/rundeckpro/runner). The Runner allows users to execute commands, scripts and Job steps within their remote environments using a secure (outbound-only HTTPS) architecture.  With a container-version of the Runner, users can more easily deploy, maintain and scale their Runners - as well as deploy them into their containerized environments for more native automation. [Learn more](/administration/runner/#docker).

### Additional Updates

* Upgrade commons-fileupload to address CVE-2023-24998
* Status Symbol is not required on Progress Badge.  Fixes issues with migration from previous versions.
* Bundle Kubernetes and Docker plugins into Enterprise Build
* Fix: Improve Error Output for Update Escalation PD Step
* EC2 Health Check now included in AWS Plugin Group
* Add ServiceNow Plugin Suite
* Fix: Cyberark Keys to Key Provider Path
* Add Jira Plugin Suite
* Add Note to ServiceNow workflow/notification plugin steps
* Fix: Autotakeover not working when restarting with new uuids


## Rundeck Open Source Product Updates

* [Fix: Issue with SSHJ Plugin where output would be on the wrong steps.](https://github.com/rundeck/rundeck/pull/8172)
* [Fix: Webhooks not showing proper information After Create](https://github.com/rundeck/rundeck/pull/8167)
* [Fix: ExecutionLifecycle component is not loaded when a job is imported](https://github.com/rundeck/rundeck/pull/8165)
* [Upgrade commons-fileupload to address CVE-2023-24998](https://github.com/rundeck/rundeck/pull/8161)
* [Add a defaultEnabled flag in feature service](https://github.com/rundeck/rundeck/pull/8158)
* [Establish new section in execution head page for feature use.](https://github.com/rundeck/rundeck/pull/8157)
* [No Message On GUI For Scheduled Job On Unhealthy Runner](https://github.com/rundeck/rundeck/pull/8152)
* [Change FeatureService to use an interface instead of the Features enum](https://github.com/rundeck/rundeck/pull/8150)
* [Fix: Now allowed more than 100 users When using Active Directory](https://github.com/rundeck/rundeck/pull/8144)
* [Fix error handling on job component failure](https://github.com/rundeck/rundeck/pull/8141)
* [Update chromedriver to 109](https://github.com/rundeck/rundeck/pull/8137)
* [Update error message for runner not found](https://github.com/rundeck/rundeck/pull/8136)
* [Consolidate UI Build using UI-Trellis](https://github.com/rundeck/rundeck/pull/8053)
* [Add Job Export in JSON format](https://github.com/rundeck/rundeck/pull/8040)
* [Cleanup: Remove unnecessary OpenAPI flags](https://github.com/rundeck/rundeck/pull/8029)
* [Allow hot reload of SSO settings](https://github.com/rundeck/rundeck/pull/7997)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A4.11.0+is%3Aclosed)

## Community Contributors

* David Darby ([ddarby-hike](https://github.com/ddarby-hike))
* David Garces ([jgarces-pd](https://github.com/jgarces-pd))
* Oswaldo Peralta ([runwaldo](https://github.com/runwaldo))


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
* Peco Karayanev ([bproverb](https://github.com/bproverb))
* Rodrigo Navarro ([ronaveva](https://github.com/ronaveva))
* Stephen Joyner ([sjrd218](https://github.com/sjrd218))
