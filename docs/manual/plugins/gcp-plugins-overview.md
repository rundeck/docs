# Google Cloud Platform Plugins

:::enterprise
:::

## Overview
![](/assets/img/gcp-icon.png)

Process Automation integrates with Google Cloud through a variety of plugins listed below.
By integrating Process Automation with Google Cloud, users can automate and provide self-service interfaces for operations of their infrastructure and applications.
These integrations allow operations teams to provide self-service mechanisms to users throughout the business, as well as setup event-driven automation for workflows with Google Cloud.

<details><summary> <font size="5">Google Cloud Plugins</font>
</summary>

|Plugin Name| Plugin Type| Description|
|:---------------------------------------------------------|:---------------------------------------------------------:|:---------------------------------------------------------|
|[**Start VM**](/manual/workflow-steps/gcp.html#gcp-vm-start)|Workflow Step|Start a Google Compute instance.|
|[**Stop VM**](/manual/workflow-steps/gcp.html#gcp-vm-stop)|Workflow Step|Stop a Google Compute instance.|
|[**Restart VM**](/manual/workflow-steps/gcp.html#gcp-vm-restart)|Workflow Step|Restart a Google Compute instance.|
|[**Delete VM**](/manual/workflow-steps/gcp.html#gcp-vm-delete)|Workflow Step|Delete a Google Compute instance.|
|[**Restart SQL Instance**](/manual/workflow-steps/gcp.html#gcp-sqlinstance-restart)|Workflow Step|Restart a Google Cloud SQL instance.|
|[**Capture VM Snapshot**](/manual/workflow-steps/gcp.html#gcp-vm-capture-snapshot)|Workflow Step|Capture a snapshot of a Google Compute instance.|
|[**Update Autoscaling Policy**](/manual/workflow-steps/gcp.html#gcp-vm-update-autoscaling-policy)|Workflow Step|Update an autoscaling policy of Google Compute instances.|
|[**Enable VPC Network Peering**](/manual/workflow-steps/gcp.html#gcp-enable-vpc-network-peering)|Workflow Step|Enable VPC connections between networks using VPC peering.|
|[**Create Resource**](/manual/workflow-steps/gcp.html#gcp-create-resource)|Workflow Step|Create a new Google Compute instance.|
|[**Configure VPC Log**](/manual/workflow-steps/gcp.html#gcp-configure-vpc-log)|Workflow Step|Enable flow logs for GCP Compute instance.|
|[**Compute VM Node Source**](/manual/projects/resource-model-sources/gcp)|Node Source|Retrieve Google Compute instances and populate them into the Node Inventory.|
|[**Compute VM Health Check**](/manual/healthcheckplugins/gcp-compute-healthcheck)|Health Check|Provide health status on Compute instance based on whether the instance is running.|
|[**Start VM**](/manual/node-steps/gcp.html#gcp-vm-start)|Node Step|Start a Google Compute instance.|
|[**Stop VM**](/manual/node-steps/gcp.html#gcp-vm-stop)|Node Step|Stop a Google Compute instance.|
|[**Restart VM**](/manual/node-steps/gcp.html#gcp-vm-restart)|Node Step|Restart a Google Compute instance.|
|[**Delete VM**](/manual/node-steps/gcp.html#gcp-vm-delete)|Node Step|Delete a Google Compute instance.|
</details>
<br>
<em>Click to expand to see the full list of Process Automation plugins for Google Cloud.</em>

## Setup

### GCP Service Account Keys

This section outlines how to retrieve the Service Account keys from Google Cloud. The background for these steps is covered in detail on Google's support site here: [Creating and Managing Service Account Keys](https://cloud.google.com/iam/docs/creating-managing-service-account-keys).

1. Login to your Google Cloud Console at [https://console.cloud.google.com](https://console.cloud.google.com)
2. Navigate to _IAM & Admin_ > _Service Accounts_<br>
   ![Service Accounts Menu](/assets/img/howto-gcp-svcacctmenu.png)<br><br>
3. Click the **Create Service Account** button to start the wizard<br>
   ![Create Service Account](/assets/img/howto-gcp-createsvcacct.png)<br><br>
4. Assign the account a **Name** and **ID**.
5. When selecting **Roles** ensure the role(s) provide enough access to Process Automation to perform the desired tasks.
6. Click **Done**
7. Click on the newly created account and navigate to the **Keys** tab.
8. Click **Add Key** > **Create new key**
9. Choose **JSON** for _Key Type_ and click **Create**
10. Save the JSON file somewhere safe where it can be used in a future step.

#### Project ID

While in the Google Cloud Console, click on the project list in the upper left, next to **Google Cloud**:
![GCP Project List](/assets/img/gcp-project-list.png)

From the popup, copy the **Project ID** from the **ID** column:
![GCP Project ID](/assets/img/gcp-project-id.png)

### Configure Google Cloud Plugin Suite in Process Automation

Authentication for the Google Cloud plugins can be configured for the entire system or for an individual project. 
Credentials can be optionally be overwritten on a per-plugin basis, such as an individual Job Step.

### Project Level Configuration
Use the following steps to configure authentication for the Google Cloud plugins for a specific project:

1. In the specific project, click on **Project Settings** in the lower left.
2. Click on **Edit Configuration** then click on **Plugins**.
   ![Plugin Suite Project Settings](/assets/img/plugin-groups-project-settings.png)<br>
3. Click on **+PluginGroup**.
4. Select **GCP** from the list.
5. Click **Select** next to the **Key File** field.
6. Click **+ Add or Upload a Key**
7. For the **Key Type** dropdown, choose the **Private Key** option.
8. Click the **Enter text** dropdown and choose the **Upload file** option:
    ![GCP Upload File](/assets/img/gcp-upload-file.png)
9. Click on **Choose File** and select the `.json` file saved from the prior section.
10. Click **Save** to add this secret to Key Storage.
11. Click **Save** to now use the saved secret from Key Storage.
12. Enter the **Project ID** captured from the prior section into the **Project ID** field.
13. Select the **Zone** to set the default zone used by the plugins.
    ![GCP Project Config](/assets/img/gcp-plugins-project-config.png)
14. Click **Save** for the plugin configuration.
15. Click **Save** for the Project Settings.

### System Level Configuration

Use the following steps to configure authentication for the Google Cloud plugins for the whole Process Automation system.

1. Click on the **System Menu** (gear icon) in the upper right.
2. Click on **System Configuration**.
3. Navigate to the **GCP** section and click on the **Pencil Icon** in the upper right:
   ![Edit Plugin Suite Sysytem Level](/assets/img/gcp-edit-plugingroup-system.png)
4. Click **Select** next to the **Key File** field.
5. Click **+ Add or Upload a Key**
6. For the **Key Type** dropdown, choose the **Private Key** option.
7. Click the **Enter text** dropdown and choose the **Upload file** option:
   ![GCP Upload File](/assets/img/gcp-upload-file.png)
8. Click on **Choose File** and select the `.json` file saved from the prior section.
9. Click **Save** to add this secret to Key Storage.
10. Click **Save** to now use the saved secret from Key Storage.
11. Enter the **Project ID** captured from the prior section into the **Project ID** field.
12. Select the **Zone** to set the default zone used by the plugins:
    ![GCP System Config](/assets/img/gcp-system-config.png)
13. Click **Save** to commit these changes to the **System Configuration**.