# Configuring Google Cloud Platform Plugins

Google Cloud consists of a set of physical assets, such as computers and hard disk drives, and virtual resources, such as virtual machines (VMs), that are contained in Google's data centers around the globe.

[Read more about Google Cloud here.](https://cloud.google.com/docs/overview)

This How To will highlight some of the key steps to configuring the Google Cloud plugins included in our Rundeck Enterprise version.  The background for these steps is covered in detail on Google's support site here: [Creating and Managing Service Account Keys](https://cloud.google.com/iam/docs/creating-managing-service-account-keys).

## Pre-Requisites

This How To is based on the Rundeck Enterprise [Welcome Projects](/learning/howto/welcome-project-starter.md).

- Rundeck Welcome Project version 1.5<br>
    _(Rundeck Enterprise 3.4.4 is min product version)_
- Administrative access to a Google Cloud environment
- Create at least one [Virtual Machine Instance](https://cloud.google.com/compute/docs/instances) and note which _Zone_ it is created in.


## Creating Service Account Keys

1. Login to your Google Cloud Console at [https://console.cloud.google.com](https://console.cloud.google.com)
1. Navigate to _IAM & Admin_ > _Service Accounts_
    ![Service Accounts Menu](@assets/img/howto-gcp-svcacctmenu.png)<br><br>
1. Click the **Create Service Account** button to start the wizard
    ![Create Service Account](@assets/img/howto-gcp-createsvcacct.png)<br><br>
1. Assign the account a **Name** and **ID**.
1. When selecting **Roles** ensure the role(s) provide give the account enough access to perform the automation tasks you will want do from Rundeck.
1. Click **Done**
1. Click on the newly created account and navigate to the **Keys** tab.
1. Click **Add Key** > **Create new key**
1. Choose **JSON** for _Key Type_ and click **Create**
1. Save the JSON file somewhere safe where it can be used in a future step.

## Configuring Rundeck

:::: tabs
::: tab 1. Upload Key

1. Login to Rundeck as `admin`.
1. Open the **Welcome to Rundeck** project entry.
1. Open the **Key Storage** entry from the _Project Settings_ menu.
1. Select the `gcp-access-key.json` and click **Overwrite Key**.
1. In the dropdown select **Upload File** and choose the JSON file from the earlier steps.
1. Click **Save**

:::
::: tab 2. Configuring Node Source

1. Open the **Welcome to Rundeck** project.
1. Open **Project Settings** > **Edit Nodes**.
1. Click on the _Sources_ tab.
1. Click **Edit** on the _GCP Cloud / Resource Model_
1. Enter the **Project ID** from your GCP Project.
    ![GCP Project ID](@assets/img/howto-gcp-projectid.png)<br><br>
1. Select the **Zone** where this Node Source will gather a list of Compute VMs from.
1. Leave the **Key Path** set to `keys/project/welcome-project/gcp-access-key.json`

:::
::: tab 3. Configure Settings for Job Steps

1. Open **System Menu** (gear icon) > **System Configuration**.
1. Using the filter at the top enter `gcp` to list just the GCP Plugin Configurations.
1. Leave the **GCP Access Key Path** entry as `keys/project/welcome-project/gcp-access-key.json`.
1. Gather the **Project ID** from your GCP Project.
    ![GCP Project ID](@assets/img/howto-gcp-projectid.png)<br><br>
1. Enter a Zone that can be used by default.  Job Steps can override the zone at each step or dynamically per node on Node Steps.
1. Click **Save**

:::
::::

### Confirming GCP Plugins are working

#### Nodes

1. Navigate to the **Nodes** section in the _Welcome to Rundeck_ project.
1. Search for nodes using `tags: gcpcompute`.<br>If your Node Source is configured correctly and there are VMs in the configured zone they will be listed in the Nodes list.

![GCP Nodes](@assets/img/howto-gcp-gcpnodes.png)

#### Job Steps

After confirming Nodes are being listed choose one that can safely be restarted.  **Choose wisely**

1. Navigate to the **Jobs** section in the _Welcome to Rundeck_ project.
1. Open _Cloud Services_ > _GCP_ > _Node Steps_ > _VM_ and choose **Restart VM Instance**.
1. Select the node to be restarted and click **Run Job Now**.

![Restart GCP Node](@assets/img/howto-gcp-restartnode.png)

## More Information

- [Information about Zones in GCP](https://cloud.google.com/compute/docs/regions-zones)
