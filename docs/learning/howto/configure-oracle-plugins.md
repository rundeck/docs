# Configuring Oracle Cloud Infrastructure Plugins

Oracle Cloud Infrastructure (OCI) is a deep and broad platform of public cloud services that enables customers to build and run a wide range of applications in a scalable, secure, highly available, and high-performance environment. <br>_-Oracle Website_

[Read more about Oracle Cloud here.](https://www.oracle.com/cloud/)

This How To will highlight some of the key steps to configuring the Oracle Cloud plugins included in our Rundeck Enterprise version.  The background for these steps is covered in detail on Oracle's support site here: [Launching your first Linux Instance](https://docs.oracle.com/en-us/iaas/Content/GSG/Reference/overviewworkflow.htm#Tutorial__Launching_Your_First_Linux_Instance)

> Note: These instructions are based on the Welcome Project and provide an example of how to use the plugins in the easiest way.  For full documentation and implementation please refer to the User Manual.

## Pre-Requisites

This How To is based on the Rundeck Enterprise [Welcome Projects](/learning/howto/welcome-project-starter.md).

- Rundeck Welcome Project version 1.5<br>
    _(Rundeck Enterprise 3.4.4 is min product version)_
- Administrative access to an Oracle Cloud environment
- Create at least one [Virtual Machine Instance](https://docs.oracle.com/en-us/iaas/Content/Compute/Tasks/launchinginstance.htm) and note which _Zone_ it is created in.


## Creating Service Account Keys

1. Login to your Oracle Cloud Console at [oracle.com/cloud/sign-in.html](oracle.com/cloud/sign-in.html).
1. Navigate to your User Profile by clicking on the icon in the upper right and selecting `User Settings`
    [Oracle User Profile Menu](@assets/img/howto-oracle-usermenu.png)
1. Choose _API Keys_ from the menu.
1. Click **Add API Key**.
1. Select **Generate API Key Pair** and **Download the Private Key** prior to clicking the _Add_ button.
1. Copy and Paste the _Configuration File Preview_ content somewhere for use in future steps.

## Configuring Rundeck

:::: tabs
::: tab 1. Upload Key

1. Login to Rundeck as `admin`.
1. Open the **Welcome to Rundeck** project entry.
1. Open the **Key Storage** entry from the _Project Settings_ menu.
1. Select the `oracle-key.pem` and click **Overwrite Key**.
1. In the dropdown select **Upload File** and choose the `oracle-key.pem` file from the earlier steps.
1. Click **Save**

:::
::: tab 2. Configure Node Source

1. Open the **Welcome to Rundeck** project.
1. Open **Project Settings** > **Edit Nodes**.
1. Click on the _Sources_ tab.
1. Click **Edit** on the _Oracle Cloud / Resource Model_
1. Enter the **Tenant ID**
1. Enter the **User ID**
1. Enter the **Fingerprint**
2. Enter the Region value where your nodes will be gathered from.

:::
::: tab 3. Configure Settings for Job Steps

1. Open **System Menu** (gear icon) > **System Configuration**.
1. Using the filter at the top enter `oracle` to list only the Oracle Plugin Configurations.
1. Enter the **Tenant ID**
1. Enter the **User ID**
1. Enter the **Fingerprint**
1. Enter a Zone that can be used by default.  Job Steps can override the zone at each step or dynamically per node on Node Steps.
1. Click **Save**

:::
::: tab 4. Configure Health Check

1. Open the **Welcome to Rundeck** project.
1. Click on **Health Checks**
1. Click on **Configure**
1. Click on **Edit** on the _Oracle Cloud / Instance Healthcheck Plugin_
1. Enter the **Tenant ID**
1. Enter the **User ID**
1. Enter the **Fingerprint**
1. Enter the Region value where your nodes are gathered from.

:::
::::

### Confirming oracle Plugins are working

#### Nodes

1. Navigate to the **Nodes** section in the _Welcome to Rundeck_ project.
1. Search for nodes using `tags: OracleVM`.<br>If your Node Source is configured correctly and there are VMs in the configured zone they will be listed in the Nodes list.

![Oracle Nodes](@assets/img/howto-oracle-oraclenodes.png)

#### Job Steps

After confirming Nodes are being listed choose one that can safely be restarted.  **Choose wisely**

1. Navigate to the **Jobs** section in the _Welcome to Rundeck_ project.
1. Open _Cloud Services_ > _Oracle Cloud_ > _Node Steps_ > and choose **Restart Instance**.
1. Select the node to be restarted and click **Run Job Now**.

![Restart Oracle Node](@assets/img/howto-oracle-restartnode.png)

## More Information

- [Oracle Node Step Plugins](/manual/node-steps/oracle.md)
- [Oracle Workflow Step Plugins](/manual/workflow-steps/oracle.md)
- [Oracle Node Source Plugin](/manual/projects/resource-model-sources/oracle.md)
