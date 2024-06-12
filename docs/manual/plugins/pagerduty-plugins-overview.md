# PagerDuty Plugins

## Overview

Process Automation integrates with PagerDuty Incident Response through a variety of plugins listed below.
By integrating Process Automation with Incident Response, users can automatically update incidents, run response plays, add diagnostics and much more.

## Plugins

There are a number of PagerDuty plugins for Process and Runbook Automation:

- For job step plugins, click [here](/manual/workflow-steps/pagerduty.html).
- For notification plugins, click [here](/manual/notifications/pagerduty.html).
- For the log-filter plugin, click [here](https://support.pagerduty.com/docs/automation-actions#configure-automation-actions-log-for-runbook-and-process-automation).

## Setup

Authentication for the PagerDuty plugins can be configured for the entire system or for an individual project.

### Add PagerDuty API Key to Key Storage
In the PagerDuty web app:

1. Navigate to **Integrations ->**  **API Access Keys** and click **Create New API Key**.
2. Enter a **Description** that will help you identify the key later on. If you would like it to be read-only, check the **Read-only** option.
3. Click **Create Key**.
4. A unique **API key** will be generated. Copy it to a safe place, as you will not have access to copy this key again. Once it has been copied, click **Close**.
    * If you lose a key you will need to delete it and create a new one.

Now that the PagerDuty API Key has been created, add it to **Key Storage** - either at the System or Project level:

**System Level**
1. Click on the **System Menu** (gear icon) in the upper right.
2. Click on **Key Storage**
3. Click **+Add or Upload a Key**. Select **Password** for the Key Type.  
4. Paste the PagerDuty API Key you saved earlier into the field.
5. Click **Save**.

**Project Level**
1. In the specific project, click on **Project Settings** in the lower left.
2. Click on **Key Storage**.
3. Click **+Add or Upload a Key**. Select **Password** for the Key Type.
4. Paste the PagerDuty API Key you saved earlier into the field.
5. Click **Save**.

### Project Level Configuration

Use the following steps to configure authentication for the PagerDuty plugins for a specific project.

1. In the specific project, click on **Project Settings** in the lower left.
2. Click on **Edit Configuration** then click on **Plugins**.
![Plugin Suite Project Settings](/assets/img/plugin-groups-project-settings.png)<br>
3. Click on **+PluginGroup**.
4. Select **PagerDuty** from the list.
5. Click **Select** next to the **API Key** field and find the API Access Key stored in Key Storage.
6. (Optional) Place a valid PagerDuty email address into the **PagerDuty Email** field. Specific plugins, such as **Add Incident Note**, require this field to be provided.
7. Click **Save** for the plugin configuration.
8. Click **Save** for the Project Settings:
![Saving pluing suite settings](/assets/img/saving-plugin-suite-settings.png)<br>

### System Level Configuration

Use the following steps to configure authentication for the PagerDuty plugins for the whole Process Automation system.

1. Click on the **System Menu** (gear icon) in the upper right.
2. Click on **System Configuration**.
3. Navigate to the **PagerDuty** section and click on the **Pencil Icon** in the upper right:
![Edit Plugin Suite Sysytem Level](/assets/img/edit-plugin-suite-system-level.png)
4. Click on **Select** next to the **API Key** field and find the API Access Key stored in Key Storage.
5. (Optional) Place a valid PagerDuty email address into the **PagerDuty Email** field. Specific plugins, such as **Add Incident Note**, require this field to be provided.
6. Click **Save** for the plugin configuration:
![Save PD Plugin System Config](/assets/img/save-pd-system-plugin-config.png)
