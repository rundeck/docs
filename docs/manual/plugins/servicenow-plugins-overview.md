# ServiceNow Plugins

## Overview

Runbook Automation integrates with ServiceNow through a variety of plugins listed below.
By integrating Runbook Automation with ServiceNow, users can automate many of their operations around Incidents, Change Requests, Service Requests, Tasks and much more.
These integrations allow operations teams to provide self-service mechanisms to users throughout the business, as well as setup event-driven automation for workflows that involve ServiceNow.

<details><summary> <font size="5">ServiceNow Plugins</font>
</summary>

|Plugin Name| Plugin Type| ServiceNow Table|
|:---------------------------------------------------------|---------------------------------------------------------|:---------------------------------------------------------:|
|[**Update Incident State**](/manual/workflow-steps/servicenow.html#servicenow-incident-update-state)|Job Step|Incident|
|[**Check Incident Assigned**](/manual/workflow-steps/servicenow.html#servicenow-incident-check-assigned)|Job Step|Incident|
|[**Check Incident State**](/workflow-steps/servicenow.html#servicenow-incident-check-state)|Job Step|Incident|
|[**Comment Incident**](/manual/workflow-steps/servicenow.html#servicenow-incident-comment)|Job Step|Incident|
|[**Create Incident**](/manual/workflow-steps/servicenow.html#servicenow-incident-create)|Job Step|Incident|
|[**Edit Incident**](/manual/workflow-steps/servicenow.html#servicenow-incident-edit)|Job Step|Incident|
|[**View Incident**](/manual/workflow-steps/servicenow.html#servicenow-incident-view)|Job Step|Incident|
|[**Check Change State**](/manual/workflow-steps/servicenow.html#servicenow-change-check-state)|Job Step|Change|
|[**Update Change State**](/manual/workflow-steps/servicenow.html#servicenow-change-update-state)|Job Step|Change|
|[**Create Change Request**](/manual/workflow-steps/servicenow.html#servicenow-change-create)|Job Step|Change|
|[**Create Incident**](/manual/notifications/servicenow.html#servicenow-incident-create)|Notification|Incident|
|[**Comment Incident**](/manual/notifications/servicenow.html#servicenow®-notification-plugins)|Notification|Incident|
|[**Create Change Request**](/manual/notifications/servicenow.html#servicenow-change-create)|Notification|Change|
|[**ServiceNow Node Source**](/manual/projects/resource-model-sources/servicenow.html#servicenow-node-source-enterprise)|Node Source|CMDB|
</details>
<br>
<em>Click to expand to see the full list of Runbook Automation plugins for ServiceNow</em>

## Setup

Authentication for the ServiceNow plugins can be configured for the entire system or for an individual project.

### Add ServiceNow Account Password to Key Storage

**System Key Storage**
<br>Place the ServiceNow credentials into the System Key Storage if all Runbook Automation Projects will share the same ServiceNow credentials.
1. Click on the **System Menu** (gear icon) in the upper right.
2. Click on **Key Storage**
3. Click **+Add or Upload a Key**. Select **Password** for the Key Type.
4. Paste the ServiceNow password into the field.
5. Click **Save**:
![Add Password to Key Storage](/assets/img/servicenow-add-pw-keystorage.png)

**Project Key Storage**
<br>Place the ServiceNow credentials into the Project Key Storage if only a specific project should use these ServiceNow credentials.
1. In the specific project, click on **Project Settings** in the lower left.
2. Click on **Key Storage**.
3. Click **+Add or Upload a Key**. Select **Password** for the Key Type.
4. Paste the ServiceNow password into the field.
5. Click **Save**.

### Project Level Configuration

Use the following steps to configure authentication for the ServiceNow plugins for a specific project.

1. In the specific project, click on **Project Settings** in the lower left.
2. Click on **Edit Configuration** then click on **Plugins**.
   ![Plugin Suite Project Settings](/assets/img/plugin-groups-project-settings.png)<br>
3. Click on **+PluginGroup**.
4. Select **ServiceNow** from the list.
5. Add your ServiceNow instance URL to the **Server URL** field.
6. Place an active ServiceNow username into the **User name** field. This user must have sufficient permissions to perform the actions that will be automated by Runbook Automation.
7. Click **Select** next to the **Password Key Storage Path** field and find the ServiceNow password from the prior section stored in Key Storage.
8. Click **Save** for the plugin configuration.
9. Click **Save** for the Project Settings:
   ![Saving Plugin suite settings](/assets/img/servicenow-save-plugin-suite-project.png)<br>

### System Level Configuration

Use the following steps to configure authentication for the ServiceNow plugins for the whole Runbook Automation system.

1. Click on the **System Menu** (gear icon) in the upper right.
2. Click on **System Configuration**.
3. Navigate to the **ServiceNow** section and click on the **Pencil Icon** in the upper right:
   ![Edit Plugin Suite Sysytem Level](/assets/img/servicenow-edit-system-plugin-suite.png)
4. Add your ServiceNow instance URL to the **Server URL** field.
5. Place an active ServiceNow username into the **User name** field. This user must have sufficient permissions to perform the actions that will be automated by Runbook Automation.
6. Click **Select** next to the **Password Key Storage Path** field and find the ServiceNow password from the prior section stored in Key Storage.
7. Click **Save** for the plugin configuration:
   ![Save ServiceNow Plugin System Config](/assets/img/servicenow-save-system-plugin-suite.png)