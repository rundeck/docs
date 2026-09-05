# Azure Node Steps (Commercial)

## Getting Started

Follow the steps outlined in the [**Azure Plugins Overview**](/manual/plugins/azure-plugins-overview.md) to configure authentication for Azure Job steps.
Credentials can be configured on a per Job Step basis, Project basis, or for the entire Runbook Automation system.

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

### Azure / VM / Delete

![Azure VM Delete step configuration](/assets/img/azure-vm-delete.png)

- **Async**
: Should be set to true if the vm should be deleted asynchronously.

:::danger
 Be very careful when using this step.  It would be possible to remove a lot of instances by mistake if the node filter is too broad.
:::

### Azure / VM / Start

![Azure VM Start step configuration](/assets/img/azure-vm-start.png)

- **Async**
: Should be set to true if the vm should be started asynchronously.

### Azure / VM / Stop

![Azure VM Stop step configuration](/assets/img/azure-vm-stop.png)

- **Async**
: Should be set to true if the vm should be stopped asynchronously.

- **Deallocate**
: If enabled, deallocates the VM after it is stopped, releasing its Azure compute resources to save costs. Enabling this option forces the stop to run synchronously, overriding the **Async** setting.

### Azure / VM / Restart

![Azure VM Restart step configuration](/assets/img/azure-vm-restart.png)

- **Async**
: Should be set to true if the vm should be restart asynchronously.

:::tip
Looking for VM snapshot capture? [**Azure / VM / Capture Snapshot**](/manual/jobs/job-plugins/workflow-steps/azure.md#azure-vm-capture-snapshot) is a Workflow Step, not a Node Step — see the [Azure Workflow Steps](/manual/jobs/job-plugins/workflow-steps/azure.md) page.
:::
