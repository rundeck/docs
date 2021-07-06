# Using Rundeck Webhooks

## Overview

### What is a Webhook?

Webhooks are messages sent from applications or systems when something happens.  They are a way for applications to share real time events with other applications rather than relying on polling for updates or changes.

### How would I use them?

Rundeck can be configured to receive webhook events from external systems and to run job(s) based on the information sent in the Webhook.

## Webhooks in Rundeck

Webhooks are configured within a project. The [Welcome Projects](/learning/index.md#welcome-projects) have default Webhooks included in their build.  Below are highlights for the Enterprise and Community versions.

> Note: If you haven't followed the Exercise Steps in the Tutorial we encourage starting with that walk-through and leverage our Welcome Projects for the Exercises.

:::: tabs
::: tab Enterprise Highlights

1. Click on **Webhooks** in the Project Menu and choose the `Run Jobs - Webhook Example` entry.
1. The **Post URL** is the URL that external systems would submit a POST http event to trigger this webhook.
1. Name **Run Jobs - Webhook Example**
1. On the **Handler Configuration** tab, the **Webhook Handler** is **Advanced Run Job** _(more on this in future steps)_
1. The Actions section has a single rule called `Run Job 1`
1. Expanding the rule by clicking **Edit** to see the details.
1. The rule is running a job called `Demo/Linux/Gather Linux Versions - Docker` against all nodes `(.*)`

:::
::: tab Community Highlights
1. Click on **Webhooks** in the Project Menu and choose the `Run Job - Webhook Example` entry.
1. The **Post URL** is the URL that external systems would submit a POST http event to trigger this webhook.
1. Name **Run Job - Webhook Example**
1. On the **Handler Configuration** tab, the **Webhook Handler** is **Run Job** _(more on this in future steps)_
1. The webhook is running a job called `Demo/Linux/Gather Linux Versions - Docker` against all nodes `(.*)`
:::
::::

## Webhook Handlers

In the previous step we noted the _Advanced Run Job_ (Enterprise)/_Run Job_ (Community) Webhook Handlers.
Webhook Event Handlers are custom handlers that can be developed as [Rundeck Plugins](/developer/16-webhook-plugins.md) to interact with external systems.
They can respond to authentication calls, pre-process inputs, and provide configuration defaults for specific systems.
Rundeck Enterprise includes Webhook Handlers for [PagerDuty](/manual/webhooks/pagerduty-run-job.md), [GitHub](/manual/webhooks/github-webhook.md), [AWS SNS](/manual/webhooks/aws-sns-webhook.md), [DataDog](/manual/webhooks/datadog-run-job.md) and many more.

## Enterprise Features

### Advanced Rule Processing

Below is a highlight of some of the features of Advanced Rule Processing.

Actions and conditions target jobs based on webhook event contents. Often-times webhook payloads from 3rd party systems can’t be edited or updated. If something is sending a lot of events that logic would trigger the job with every event and result in messy Activity logs. Performing logic at the Webhook step, whether the job should run, helps streamline event processing.

Run Multiple Jobs within a single Webhook. Having a single URL to set in a 3rd party solution simplifies the efforts on that side and keeps the customization within Rundeck to manage their Automation workflows.

Process batched webhook payloads. Many 3rd party webhook senders will send messages in a “batch”. This feature allows processing each entry in the batch as its own event against the rule set.

All of the solution specific Enterprise Webhook Handlers (PagerDuty, GitHub, AWS, etc.) leverage these same features.

### Webhook Debugging

>_“Why didn’t my webhook do X?!”_

Rundeck Enterprise includes a Webhook Debugger integrated with the Webhook builder. The Debugger makes troubleshooting incoming webhooks and why they did (or did not) trigger certain rules in the Advanced Rule Processing Handlers.

There is a Debug tab, but likely at this stage there are no events that have been logged to see debug information for. We will show the Debugger during the Exercise later.

## Webhook Exercise

:::: tabs
::: tab Enterprise Exercise
1. Navigate to **Webhooks** in the Project Menu.
1. Click **Create Webhook** Button.
1. In the Window on the right enter `Check Process Status` for **Name**.
1. Leave the Users and Roles field as default.
1. On the **Handler Configuration** tab, click **Choose Webhook Plugin** and select **Advanced Run Job**.
1. Click the **Add Action** Button.
1. Enter `Action 1` for the **Action Name**.
1. Click the **Choose a Job** and select the **Demo/Linux/Process Status** job.
1. Enter `.*` for the Node Filter to run against all nodes.
1. Click the **Add Option** button.
1. Enter `process` for the **Option Name** and `$.process` for the **Option Value**.
1. Click the **Add Condition** button.
1. Enter `$.process` for the **Event Field** and change the operator to **exists** and set Value to `.`.
1. Click the **Create Webhook** button.
:::
::: tab Community Exercise
1. Navigate to **Webhooks** in the Project Menu.
1. Click **Add** Button.
1. In the Window on the right enter `Check Process Status` for **Name**.
1. Leave the Users and Roles field as default.
1. On the **Handler Configuration** tab, click **Choose Webhook Plugin** and select **Run Job**.
1. Click the **Choose a Job** and select the **Demo/Linux/Process Status** job.
1. Enter `-process ${data.process}` **Options** Value.
1. Enter `.*` for the Node Filter to run against all nodes.
1. Click the **Create Webhook** button.
:::
::::

After following these steps and clicking Create Webhook the URL will be populated. Click your new Webhook on the left and copy the **Post URL** to your clipboard.

To trigger the webhook use the curl command below or your favorite webhook tool (Postman). Replace the `<<URL HERE>>` with the value from your webhook.

```
curl -X POST -H "Content-Type: application/json" -d '{"process":"java"}' <<URL HERE>>
```

Enterprise customers can use the Debug tab to see if the Advanced Processing rule was successful or not.

### Post Exercise Activity

If your Webhook was successfully run new entries will show up on the Activity Tab.

Feel free to change the `java` in the payload from the curl command to check other processes that might be running on your nodes.
