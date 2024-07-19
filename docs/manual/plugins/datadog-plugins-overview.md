# Datadog Plugins

:::enterprise
:::

## Overview 
![](/assets/img/datadog-icon.png)

Runbook Automation integrates with Datadog through a variety of plugins listed below.
By integrating Runbook Automation with Datadog, users can automate workflows in Datadog in response to alerts or automate diagnostics and remediation in their environment. 
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
</details>
<br>
<em>Click to expand to see the full list of Runbook Automation plugins for Datadog.</em>

## Configuration

### Generate Datadog API & App Keys

Follow [this documentation](https://docs.datadoghq.com/account_management/api-app-keys/) from Datadog to generate an API Key and an Application ("App") Key. 
Define the **Scopes** of the App Key based on the Plugins you intend to use.  Save the API and App Keys to a secure location so that they may be used in the next section.

### Configure Plugin Suite in Runbook Automation

Authentication for the Datadog plugins can be configured for the entire system or for an individual project.

#### Project Level Configuration

1. In the specific project, click on **Project Settings** in the lower left.
2. Click on **Edit Configuration** then click on **Plugins**.
   ![Plugin Suite Project Settings](/assets/img/plugin-groups-project-settings.png)<br>
3. Click on **+PluginGroup**.
4. Select **Datadog** from the list.
5. Click **Select...** next to the **App Key** field.
6. Click **+ Add or Upload a Key**.
7. Select **Password** for the **Key Type**.
8. Enter the App Key into the **Enter Text** field.
9. Provide a name for the secret, such as **`datadog-app-key`**:
    ![Datadog App Key](/assets/img/datadog-app-key.png)
10. Click **Save** to save the secret into Key Storage and click **Save** again to use the newly create key for the plugin.
11. Repeat steps **5** through **10** for the **API Key** field and using the **API Key** generated in the prior section.
12. If your Datadog instance does not use **`https://app.datadoghq.com`** as its URL, then select the **Site URL** dropdown and select the URL that matches your Datadog instance:
    ![Datadog Plugin Suite Project](/assets/img/datadog-plugin-suite-project.png)
13. Click **Save** to commit the plugin suite configuration. Click **Save** to commit the Project Configuration update.

### System Level Configuration

Use the following steps to configure authentication for the Datadog plugins for the whole Runbook Automation system.

1. Click on the **System Menu** (gear icon) in the upper right.
2. Click on **System Configuration**.
3. Navigate to the **Datadog** section and click on the **Pencil Icon** in the upper right:
   ![Edit Plugin Suite Sysytem Level](/assets/img/datadog-edit-system-plugin-suite.png)
4. Click **Select...** next to the **App Key** field.
5. Click **+ Add or Upload a Key**.
6. Select **Password** for the **Key Type**.
7. Enter the App Key into the **Enter Text** field.
8. Provide a name for the secret, such as **`datadog-app-key`**:
   ![Datadog App Key](/assets/img/datadog-app-key.png)<br><br>
9. Click **Save** to save the secret into Key Storage and click **Save** again to use the newly create key for the plugin.
10. Repeat steps **5** through **10** for the **API Key** field and using the **API Key** generated in the prior section.
11. If your Datadog instance does not use **`https://app.datadoghq.com`** as its URL, then select the **Site URL** dropdown and select the URL that matches your Datadog instance:
    ![Datadog Plugin Suite System](/assets/img/datadog-system-plugin-suite.png)
12. Click **Save** to commit the plugin suite configuration update.