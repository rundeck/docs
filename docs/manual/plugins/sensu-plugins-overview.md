# Sensu Plugins

## Overview

![](@assets/img/sensu-logo.png)

Process Automation integrates with Sensu through a variety of plugins listed below.
By integrating Process Automation with Sensu, users can automate and provide self-service interfaces for operations in their Sensu instance
as well as invoke automated workflows in response to Sensu alerts.

<details><summary> <font size="5">Sensu Plugins</font>
</summary>

|Plugin Name| Plugin Type| Description|
|:---------------------------------------------------------|:---------------------------------------------------------:|:---------------------------------------------------------|
|[**Get Check Info**](/docs/manual/node-steps/sensu.html#sensu-get-check-info)|Node Step|Get Check info from an Entity.|
|[**Create Silence Entry**](/docs/manual/node-steps/sensu.html#sensu-create-silence-entry)|Node Step|Create a Silence for a check of a selected entity.|
|[**Delete Silence Entry**](/docs/manual/node-steps/sensu.html#sensu-delete-silence-entry)|Node Step|Delete a Silence for a check of a selected entity.|
|[**Create Event**](/docs/manual/node-steps/sensu.html#sensu-event-create)|Node Step|Create a new Sensu event.|
|[**Run Ad Hoc Check**](/docs/manual/node-steps/sensu.html#sensu-run-ad-hoc-check)|Node Step|Create an Ad Hoc Check Execution Request.|
|[**Create Check**](/docs/manual/workflow-steps/sensu.html#sensu-check-create)|Workflow Step|Create a new Check.|
|[**Delete a Silence Check**](/docs/manual/workflow-steps/sensu.html#sensu-delete-silence)|Workflow Step|Delete a Silence for a check of a selected entity.|
|[**Create a Silence Entry**](/docs/manual/workflow-steps/sensu.html#sensu-create-silence-entry)|Workflow Step|Create a Silence for a check of a selected entity.|
|[**Sensu Node Source**](/docs/manual/projects/resource-model-sources/sensu.html#sensu-node-source)|Node Source|Populate node inventory with hosts from Sensu.|
|[**Node Health Check**](/docs/manual/healthcheckplugins/sensu.html#sensu-health-check-enterprise)|Health Check|Display node health based on host health in Sensu.|

</details>
<br>
<em>Click to expand to see the full list of Process Automation plugins for Sensu.</em>

## Setup

### Retrieve & Upload Sensu API Key

This section outlines how to save a Sensu API Key into Process Automation.

1. Generate a new Sensu API key by following the steps outlined [here.](https://docs.sensu.io/sensu-go/latest/api/core/apikeys/#create-a-new-api-key)
2. Once the new key has been generated, save it somewhere temporarily. 
3. In Process Automation, navigate to **System Menu** (gear icon) -> **Key Storage**.
4. Click **+ Add or Upload a Key**.
5. For the **Key Type** dropdown select **Password**.
6. Paste the Sensu Api Key into the **Enter Text** field.
7. Provide a name for the key in Key Storage. 
8. Click **Save.**

### Configure Sensu Plugin Suite in Process Automation

Authentication for the Sensu plugins can be configured for the entire system or for an individual project.
Credentials can be optionally be overwritten on a per-plugin basis, such as an individual Job Step.

### Project Level Configuration
Use the following steps to configure authentication for the Sensu plugins for a specific project:

1. In the specific project, click on **Project Settings** in the lower left.
2. Click on **Edit Configuration** then click on **Plugins**.
   ![Plugin Suite Project Settings](@assets/img/plugin-groups-project-settings.png)<br>
3. Click on **+PluginGroup**.
4. Select **Sensu** from the list.
5. Click **Select** next to the **Key File** field.
6. Select the Sensu API key that was placed in Key Storage in the prior section.
7. Paste the API URL for your Sensu instance into the **API URL** field:
    ![Sensu Plugin Suite Project Config](@assets/img/sensu-pluginsgroup-project.png)<br>
8. Click **Save** to add the Plugin Suite to the Project.
9. Click **Save** to commit the Project configuration changes.

### System Level Configuration

Use the following steps to configure authentication for the Sensu plugins for the whole Process Automation system.

1. Click on the **System Menu** (gear icon) in the upper right.
2. Click on **System Configuration**.
3. Navigate to the **Sensu** section and click on the **Pencil Icon** in the upper right:
4. Click **Select** next to the **API Key** field. 
5. Select the Sensu API key that was placed in Key Storage in the prior section.
6. Paste the API URL for your Sensu instance into the **API URL** field:
7. Click **Save** to add the Plugin Suite to the System Configuration.