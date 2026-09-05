# Azure Workflow Steps

The Microsoft Azure cloud computing platform that offers a variety of services including but not limited to storage, networking and analytics. Azure's integration with Runbook Automation allows you to edit and utilize your Azure services in a Runbook Automation job.

## Authentication

Follow the steps outlined in the [**Azure Plugins Overview**](/manual/plugins/azure-plugins-overview) to configure authentication for Azure Job steps. 
Credentials can be configured on a per Job Step basis, Project basis, or for the entire Runbook Automation system.


:::tip
Looking for Create, List, Start, Delete, Stop, or Restart? Those are Node Steps — see [Azure Node Steps](/manual/jobs/job-plugins/node-steps/azure.md).
:::

## Azure / VM / Capture Snapshot

This job step allows users to capture a snapshot of a Virtual Machine hosted by Azure.

![Azure VM Capture Snapshot step configuration](/assets/img/azure-vm-capture-snapshot.png)

- **Client ID**
: Azure Client ID.

- **Tenant ID**
: Azure Tenant ID.

- **Subscription ID**
: Azure Subscription ID.

- **Key**
: Azure Access Key.

- **Certificate Path**
: (Optional if the access key is not defined) Azure certificate file path.

- **Certificate Password**
: (Optional if the access key is not defined) Azure certificate password.

- **Resource Group**
: The Azure Resource Group the VM belongs to.

- **Name**
: The name of the VM to capture.

- **Container Name**
: Azure container name to store the captured VHD.

- **VHD prefix**
: The prefix to add to the captured VHD.

- **Overwrite existing snapshot ?**
: Will overwrite the existing snapshot if one already exists.

- **Async**
: Should be set to true if the snapshot should be captured asynchronously.

## Azure / VM / Managed Disk Capture Snapshot

This job step allows users to capture a snapshot of a Virtual Machine's managed disk hosted by Azure.

![Azure VM Managed Disk Capture Snapshot step configuration](/assets/img/azure-vm-managed-disk-capture-snapshot.png)

- **Client ID**
: Azure Client ID.

- **Tenant ID**
: Azure Tenant ID.

- **Subscription ID**
: Azure Subscription ID.

- **Key**
: Azure Access Key.

- **Certificate Path**
: (Optional if the access key is not defined) Azure certificate file path.

- **Certificate Password**
: (Optional if the access key is not defined) Azure certificate password.

- **Resource Group**
: The Azure Resource Group the VM belongs to.

- **Snapshot Name**
: Name of the snapshot.

- **DISK ID**
: Disk ID of the VM's OS disk.
