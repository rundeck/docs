---
title: "Feature setup and compatibility"
---

# Enterprise Runner - feature setup

## Pre-Requisites

The new architecture is available with v4.11+ of Runbook Automation. The new architecture is off by default and can be turned on with a system setting. The Runner authentication and communication architecture is the same between the two generations of Runners. The new Runners use new APIs, management UI, and have a new and more extensive set of plugins available. 

## Setup steps

**Rundeck / Runbook Automation 6.0+** defaults **`rundeck.feature.runner.enabled`**, **`rundeck.feature.distributedAutomation.enabled`**, and **`rundeck.feature.runnerReplicas.enabled`** to **`true`** for self-hosted Enterprise. Skip the flags below unless you are on an **older** version or need to **override** a saved **`false`**.

On **5.x** and earlier (or if Runners are off), add the following in **`rundeck-config.properties`** and restart. Docker has enabled **`runner.enabled`** since v4.5.0; SaaS enables Runner features by default.

**`rundeck.feature.runner.enabled`** = **`true`**.

For distributed automation (runner tags, project runner UI, plugins on Runners), set:

**`rundeck.feature.distributedAutomation.enabled`** = **`true`**.


## Upgrade Notes for customers previously using Runners before Runbook Automation version 4.11

This section applies only for installations that have deployed the previous generation architecture of Runbook Automation Runners (this does not apply to Automation Action Runners). You can disable the new architecture by changing the setting to false which will revert to the previous behaviors and UIs of the Runners. Toggling the feature on and off does NOT change Job or Runner data, but it does change how jobs use Runners and the Runbook Automation UI.

If you are using the previous generation of Runners before v4.11, and want to enable the new architecture please review how the new architecture behaves - [Overview](/administration/runner/index.md), [Configuration](/administration/runner/runner-config.md) and [Usage](/administration/runner/using-runners/runner-using.md) of the new Runners before making changes. The new architecture uses Runner tags that are referenced in Jobs when selecting which Runners will carry out a task instead of relying on node filters hardcoded in the Runner configuration. Once reviewed, update the configuration of your Runners and the jobs using them with the following steps:

1. Ensure **`rundeck.feature.distributedAutomation.enabled`** is **`true`** (default on **6.0+** unless overridden).
2. Upgrade the Runners to the latest version.