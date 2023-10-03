# Azure Node Steps (Enterprise)

## Getting Started

Follow the steps outlined in the [**Azure Plugins Overview**](/manual/plugins/azure-plugins-overview) to configure authentication for Azure Job steps.
Credentials can be configured on a per Job Step basis, Project basis, or for the entire Process Automation system.

:::tip Rundeck OSS Installations
For Rundeck OSS installations, use the properties listed below to configure credentials at the Project or System levels.
:::

**Client ID**
: The client ID for the application with access to the tenant to view VMs from.

- **Project setting**: `project.azure.clientId`
- **Framework Setting**: `azure.clientId`

**Tenant ID**
: The tenant (organization) in which the VMs live

- **Project setting**: `project.azure.tenantId`
- **Framework Setting**: `azure.tenantId`

**Subscription ID**
: The subscription ID for the application with access to the tenant to view VMs from.

- **Project setting**: `project.azure.subscriptionId`
- **Framework Setting**: `azure.subscriptionId`

**Azure Access Key**
: The access key for the Azure application that contains access to the proper VMs.

- **Project setting**: `project.azure.keyPath`
- **Framework Setting**: `azure.keyPath`

:::tip
It is important to configure the azure resource model plugin before using these steps: [Azure Resource Model](/manual/projects/resource-model-sources/azure.md#azure-enterprise)
:::

### Azure / Node / Delete

![Azure - Delete Node](/assets/img/azure-node-delete.png)

- **Async**
: Should be set to true if the vm should be deleted asynchronously.

:::danger
 Be very careful when using this step.  It would be possible to remove a lot of instances by mistake if the node filter is too broad.
:::

### Azure / Node / Start

![Azure - Delete Node](/assets/img/azure-node-start.png)

- **Async**
: Should be set to true if the vm should be started asynchronously.

### Azure / Node / Stop

![Azure - Delete Node](/assets/img/azure-node-stop.png)

- **Async**
: Should be set to true if the vm should be stopped asynchronously.

### Azure / Node / Restart

![Azure - Delete Node](/assets/img/azure-node-restart.png)

- **Async**
: Should be set to true if the vm should be restart asynchronously.

### Azure / Node / Capture

![Azure - Delete Node](/assets/img/azure-node-capture2.png)

- **Async**
: Should be set to true if the vm should be captured asynchronously.

- **containerName**
: destination container name to store the captured VHD

- **vhdPrefix**
: the prefix for the VHD holding captured image.

- **overwriteVhd**
: whether to overwrites destination VHD if it exists. If set to true, it will be overwritten.
