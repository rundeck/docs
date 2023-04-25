# Azure Plugins

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

### Create a New App Registration in Azure

Use the following steps to create and authorize an app in Azure to provide access to Process Automation plugins:

:::tip Tip
If you have already created an Azure AD application for Process Automation, skip to [Existing App Registration](#existing-app-registration).
:::

1. Sign in to the [Azure Portal](https://portal.azure.com/)
2. Select **_Azure Active Directory_**
3. Click the **+ Add** dropdown and select **App Registration**
    ![Add app reg](@assets/img/azure-add-app-reg.png)<br><br>
4. On the **Register an application** page, provide a name for your application and then select **Accounts in this organizational directory only**.
5. Click **Register**.
6. On the **Overview** page, copy the **Application (client) ID** and the **Directory (tenant) ID** and save them to a secure location.
7. Select **Certificates & secrets** and then select **New client secret**
    ![New Client Secret](@assets/img/azure-new-client-secret.png)<br><br>
8. On the **Add a client secret** panel, enter a **Description** and select an **Expires** value (in months).
    ![Client Secret Config](@assets/img/azure-client-secrets-config.png)<br><br>
9. Click **Add**.
10. Copy the **Value** and **Secret ID** from the **Certificates & secrets** page and save them to a secure location.
    :::warning Heads Up!
    Do not skip this step. These values will not be retrievable after you navigate away from this page. The **Value** is required when configuring the plugins in Process Automation.
    :::
11. Navigate to **Azure Services** > **Subscriptions** and select the link for the **Subscription name**:
    ![Subscription ID](@assets/img/azure-subscription-id.png)
12. On the **Subscriptions** page, copy the **Subscription ID** and save it to a secure location.
13. Select **Access control (IAM)** and then select **Add** > **Add role assignment**:
14. On the **Add role assignment** page, use the search field to find and select a **Role**. You must select at least a **Reader** role to continue.
15. Select **Next**.
16. On the **Members** tab, click **Select members**.
17. On the **Select members** panel, search for and select the App Registration (member) that you added in **Step 5**.
18. Review the information on the Members tab and then select Next.
19. Review the information on the Review + assign tab and then select Review + assign.

### Use Existing App Registration

**Tenant ID**: This is the ID for the trust relationship between the Azure subscription and Azure Active Directory.
1. Sign in to the [Azure portal](https://portal.azure.com).
1. Select _Azure Active Directory_.
1. Select _Properties_.
1. Then, scroll down to the _Tenant ID_ field. Your _Tenant ID_ will be in the box.

**Client ID**: This is also referred to as the _Application ID_
1. Select _Azure Active Directory_ in the left sidebar.
1. Click _Enterprise Applications_.
1. Click _All Applications_.
1. Select the application which you have created.
1. Click _Properties_.
1. Copy the _Application ID_ .

**Subscription ID**:
1. Select _Subscriptions_ in the left sidebar.
1. Select whichever subscription is needed.
1. Click on _Overview_.
1. Copy the _Subscription ID_.

**Generating Azure Client Key**
1. Sign in to the [Azure portal](https://portal.azure.com).
2. Select _Azure Active Directory_ in the left sidebar.
3. Click _App Registrations_.
4. Select the application which you have created.
5. Click on _Certificates and Secrets_.
6. Add a new _Client Secret_.
7. Provide a memorable _Key Description_ and choose an _Expiration_.
8. Click _Add_.
9. Copy and store the key value in a temporary location
:::warning Heads Up!
You won't be able to see this value again after you leave this page.
:::

### Configure Azure Plugin Suite in Process Automation

Authentication for the Azure plugins can be configured for the entire system or for an individual project. Credentials can be optionally be overwritten on a per-plugin basis, such as an individual Job Step.

### Project Level Configuration
Use the following steps to configure authentication for the Azure plugins for a specific project:

1. In the specific project, click on **Project Settings** in the lower left.
2. Click on **Edit Configuration** then click on **Plugins**.
   ![Plugin Suite Project Settings](@assets/img/plugin-groups-project-settings.png)<br>
3. Click on **+PluginGroup**.
4. Select **Azure** from the list.
5. Click **Select** next to the **Azure API Key** field.
6. Click **+ Add or Upload a Keys**
7. For the **Key Type** dropdown, choose the **Password** option.
8. Enter the **Client Secret** value from **Step 10** above.
9. Provide a **Name** for the secret and click **Save**.
10. Click **Save** to now use the saved secret from Key Storage.
11. Enter the **Tenant ID**, **Subscription ID** and **Client ID** from the prior sections into their associated fields:
    ![Azure Plugins Project](@assets/img/azure-plugingroup-project.png)
12. Click **Save** for the plugin configuration.
13. Click **Save** for the Project Settings.

### System Level Configuration

Use the following steps to configure authentication for the Azure plugins for the whole Process Automation system.

1. Click on the **System Menu** (gear icon) in the upper right.
2. Click on **System Configuration**.
3. Navigate to the **Azure** section and click on the **Pencil Icon** in the upper right:
   ![Edit Plugin Suite Sysytem Level](@assets/img/azure-edit-plugingroup-system.png)
4. Click **Select** next to the **Azure API Key** field.
5. Click **+ Add or Upload a Keys**
6. For the **Key Type** dropdown, choose the **Password** option.
7. Enter the **Client Secret** value from **Step 10** above.
8. Provide a **Name** for the secret and click **Save**.
9. Click **Save** to now use the saved secret from Key Storage.
10. Enter the **Tenant ID**, **Subscription ID** and **Client ID** from the prior sections into their associated fields:
    ![Azure PluginGroup System](@assets/img/azure-plugingroup-system-config.png)
11. Click **Save** to commit these changes to the **System Configuration**.