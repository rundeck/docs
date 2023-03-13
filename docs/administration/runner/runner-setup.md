---
title: "Runner feature setup"
---

# Enterprise Runner - feature setup

## Pre-Requisites
The new architecture is available with v4.11+ of Process Automation. The new architecture is off by default and can be turned on with a system setting. The Runner authentication and communication architecture is the same between the two generations of Runners. The new Runners use new APIs, management UI, and have a new and more extensive set of plugins available. 

## Setup steps
If the enterprise Runners are enabled you can skip setting the runner.enabled setting. If you have not enabled the Runner feature please do so by doing the following: Add the following property in rundeck-config.properties file and restart the Process Automation. This feature has been enabled on Docker installations since v4.5.0 and is also enabled by default for Runbook Automation:

`rundeck.feature.runner.enabled=true`

To enable the new architecture, a new configuration feature flag was added to enable/disable the new UI components for managing and running jobs with Runners. The feature flag will turn on all the new UI and APIs. The flag can be added through a “custom” property in the System Configuration UI. Applying this setting does not require a restart of Process Automation.

`rundeck.feature.distributedAutomation.enabled = true`

## Upgrade Notes for customers previously using Runners before Process Automation version 4.11
This section applies only for installations that have deployed the previous generation of Process Automation Runners (this does not apply to Automation Action Runners).

If you are using the previous generation of Runners before v4.11, and want to enable the new architecture please review how the new architecture behaves - Introduction, Configuration,Setup and Use the new Runners before making changes. Once reviewed, update the configuration of your Runners and the jobs using them with the following steps:
1. Set rundeck.feature.distributedAutomation.enabled = true as described previously.
1. In the Runner Management under the System menu, select an existing Runner and “add tags”. Tags and their purpose are described in the “Configuration of Runners” section of this doc.
1. Save the configuration and follow the above steps to update all Runners.
1. Next update jobs using Runners: Edit a job that would be using Runners. In the “Nodes & Runners” tab, modify the job and select the Runnerset that will be responsible for running the job. Save the job, and repeat this step for all jobs that need to run on Runners.

The current Runners will function as expected. However, in order to use the new remote plugins (like Ansible, Kubernetes, Docker) that are bundled with the next generation Runners, a new Runner will need to be created, downloaded and installed in the environment and once the new feature flag is set.
