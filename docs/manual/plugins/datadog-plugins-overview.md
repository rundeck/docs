# Jira

## Overview

Process Automation integrates with Datadog through a variety of plugins listed below.
By integrating Process Automation with Datadog, users can automate workflows in Datadog in response to alerts or automate diagnostics and remediation in their environment. 
These integrations allow operations teams to provide self-service mechanisms to users throughout the business, as well as setup event-driven automation for workflows that involve Datadog.

<details><summary> <font size="5">Datadog Plugins</font>
</summary>

|Plugin Name| Plugin Type| Description|
|:---------------------------------------------------------|:---------------------------------------------------------:|:---------------------------------------------------------|
|[**Mute Host**](/manual/node-steps/datadog.html#mute-host)|Node Step|Mute a specific host as a step in a workflow.|
|[**Unmute Host**](/manual/node-steps/datadog.html#unmute-host)|Node Step|Unmute a specific host as a step in a workflow.|
|[**Send Event**](/manual/workflow-steps/datadog.html#datadog-send-event)|Job Step|Send an event, such as an alert, to Datadog.|
|[**Create Incident**](/manual/workflow-steps/datadog.html#datadog-incidents-create-incident)|Job Step|Create an incident and Datadog.|
|[**Update Incident Status**](/manual/workflow-steps/datadog.html#datadog-incidents-update-status)|Job Step|Update the status of an incident in Datadog.|
|[**Update Incident State**](/manual/workflow-steps/datadog.html#datadog-incidents-update-state)|Job Step|Update the state of the incident in Datadog.|
|[**Add Incident Task**](/manual/workflow-steps/datadog.html#datadog-incidents-add-task)|Job Step|Add a task to a Datadog incident.|
|[**Complete Incident Task**](/manual/workflow-steps/datadog.html#datadog-incidents-complete-task)|Job Step|Complete a task in a Datadog incident.|
|[**Datadog Node Source**](/manual/projects/resource-model-sources/datadog)|Node Source|Retrieve nodes from Datadog and populate the Node Inventory.|
|[**Datadog Health Check**](/manual/healthcheckplugins/datadog)|Health Check|Update the status of nodes according to their status in Datadog.|
|[**Notification Send Event**](/manual/notifications/datadog)|Notification|Send and event to Datadog in response to Job behavior.|
|[**Datadog Webhook**](/manual/webhooks/datadog-run-job)|Webhook|Automatically run jobs in response to webhooks sent from Datadog.|
|[**
</details>
<br>
<em>Click to expand to see the full list of Process Automation plugins for Datadog.</em>