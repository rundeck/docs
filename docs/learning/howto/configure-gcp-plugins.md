# Integrate with Google Cloud Using the Welcome Project

Google Cloud consists of a set of physical assets, such as computers and hard disk drives, and virtual resources, such as virtual machines (VMs), that are contained in Google's data centers around the globe.

[Read more about Google Cloud here.](https://cloud.google.com/docs/overview)

This How To will highlight some of the key steps to configuring the Google Cloud plugins included in our Process Automation version.  The background for these steps is covered in detail on Google's support site here: [Creating and Managing Service Account Keys](https://cloud.google.com/iam/docs/creating-managing-service-account-keys).

## Pre-Requisites

This How To is based on the Process Automation [Welcome Projects](/learning/howto/welcome-project-starter.md).

- Rundeck Welcome Project version 1.5<br>
    _(Process Automation 3.4.4 is min product version)_
- Administrative access to a Google Cloud environment
- Create at least one [Virtual Machine Instance](https://cloud.google.com/compute/docs/instances) and note which _Zone_ it is created in.


### Authentication & Configuration
Follow the steps outlined in the [**Google Cloud Integration Overview**](/manual/plugins/gcp-plugins-overview) doc to configure credentials for the GCP plugins.
Credentials can be configured on a per Project basis or for the entire Process Automation system.

## Configuring Process Automation

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
