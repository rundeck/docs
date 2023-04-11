# Azure

## Overview

Process Automation integrates with Azure through a variety of plugins listed below.
By integrating Process Automation with Azure, users can automate and provide self-service interfaces for operations of their infrastructure and applications.
These integrations allow operations teams to provide self-service mechanisms to users throughout the business, as well as setup event-driven automation for workflows with Azure.

<details><summary> <font size="5">Azure Plugins</font>
</summary>

|Plugin Name| Plugin Type| Description|
|:---------------------------------------------------------|:---------------------------------------------------------:|:---------------------------------------------------------|
|[**Azure Node Source**](/manual/projects/resource-model-sources/azure)|Node Source|Retrieve Azure virtual machines for Node Inventory.|
|[**Delete Azure VM**](/manual/node-steps/azure.html#azure-node-delete)|Node Step|Delete an virtual machine.|
|[**Start Azure VM**](/manual/node-steps/azure.html#azure-node-start)|Node Step|Start (power on) an existing virtual machine.|
|[**Start Azure VM**](/manual/node-steps/azure.html#azure-node-stop)|Node Step|Stop (power off) an existing virtual machine.|
|[**Restart Azure VM**](/manual/node-steps/azure.html#azure-node-restart)|Node Step|Restarts an existing virtual machine.|
|[**Capture VM Snapshot**](/manual/node-steps/azure.html#azure-node-capture)|Node Step|Capture a snapshot of an existing virtual machine.|
|[**Storage Copy**](/manual/workflow-steps/azure.html#azure-storage-copy)|Workflow Step|Copy or get objects from Azure storage to/from Process Automation (Rundeck).|
|[**Storage Delete**](/manual/workflow-steps/azure.html#azure-storage-delete)|Workflow Step|Delete blob storage from Azure storage container.|
|[**Storage List**](/manual/workflow-steps/azure.html#azure-storage-list)|Workflow Step|List blobs from Azure storage container.|
|[**Create Azure VM**](/manual/workflow-steps/azure.html#azure-vm-create)|Workflow Step|Create a new Azure virtual machine.|
|[**List Azure VMs**](/manual/workflow-steps/azure.html#azure-vm-list)|Workflow Step|List Azure virtual machines.|
|[**Start Azure VM**](/manual/workflow-steps/azure.html#azure-vm-start)|Workflow Step|Start (power on) an Azure virtual machines.|
|[**Stop Azure VM**](/manual/workflow-steps/azure.html#azure-vm-stop)|Workflow Step|Stop (power off) an Azure virtual machines.|
|[**Azure Log Storage**](/administration/cluster/logstore/azure)|Log Storage|Send execution log files to Azure Storage Account.|
|[**VM Health Check**](/manual/healthcheckplugins/azure-healthcheck)|Health Check|Check the status of Azure virtual machines.|
|[**Azure Active Directory SSO**](/administration/security/sso/azure-sso)|Single Sign On|Use Azure Active Directory to authenticate users.|
</details>
<br>
<em>Click to expand to see the full list of Process Automation plugins for Azure.</em>

## Setup

Authentication for the Jira plugins can be configured for the entire system or for an individual project.

### Add Jira Account Password or Auth Token to Key Storage

**System Key Storage**
<br>Place the Jira credentials into the System Key Storage if all Process Automation Projects will share the same Jira credentials.
1. Click on the **System Menu** (gear icon) in the upper right.
2. Click on **Key Storage**
3. Click **+Add or Upload a Key**. Select **Password** for the Key Type.
4. Paste the Jira password or auth token into the field.
5. Click **Save**:
   ![Add Password to Key Storage](@assets/img/jira-add-pw-keystorage.png)

**Project Key Storage**
<br>Place the Jira credentials into the Project Key Storage if only a specific project should use these Jira credentials.
1. In the specific project, click on **Project Settings** in the lower left.
2. Click on **Key Storage**.
3. Click **+Add or Upload a Key**. Select **Password** for the Key Type.
4. Paste the Jira password into the field.
5. Click **Save**.

Now that the Jira password or auth token has been added to Key Storage, the plugin suite can be configured at a Project or System level:


### Project Level Configuration
Use the following steps to configure authentication for the Jira plugins for a specific project:

1. In the specific project, click on **Project Settings** in the lower left.
2. Click on **Edit Configuration** then click on **Plugins**.
   ![Plugin Suite Project Settings](@assets/img/plugin-groups-project-settings.png)<br>
3. Click on **+PluginGroup**.
4. Select **Jira** from the list.
5. Add your Jira instance URL to the **Server URL** field. For example, `https://acme-company.atlassian.net`
6. Place an active Jira username into the **Login** field. This user must have sufficient permissions to perform the actions that will be automated by Process Automation.
7. Click **Select** next to the **Password** field and find the Jira password from the prior section stored in Key Storage.
8. (Optional) If using an Auth Token is preferred over a Password, then click **Select** next to the **Auth Token** field and select the Jira auth token from Key Storage.
9. Click **Save** for the plugin configuration.
10. Click **Save** for the Project Settings:
    ![Saving Plugin suite settings](@assets/img/jira-save-plugin-suite-project.png)<br>

### System Level Configuration

Use the following steps to configure authentication for the Jira plugins for the whole Process Automation system.

1. Click on the **System Menu** (gear icon) in the upper right.
2. Click on **System Configuration**.
3. Navigate to the **Jira** section and click on the **Pencil Icon** in the upper right:
   ![Edit Plugin Suite Sysytem Level](@assets/img/jira-edit-system-plugin-suite.png)
4. Add your Jira instance URL to the **Server URL** field. For example, `https://acme-company.atlassian.net`
5. Place an active Jira username into the **Login** field. This user must have sufficient permissions to perform the actions that will be automated by Process Automation.
6. Click **Select** next to the **Password** field and find the Jira password from the prior section stored in Key Storage.
7. (Optional) If using an Auth Token is preferred over a Password, then click **Select** next to the **Auth Token** field and select the Jira auth token from Key Storage.
8. Click **Save** for the plugin configuration.
   ![Save ServiceNow Plugin System Config](@assets/img/jira-save-system-plugin-suite.png)