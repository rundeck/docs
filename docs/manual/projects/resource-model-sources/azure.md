# Azure Node Source
The Azure Resource Model Source Plugin provides the Azure VMs as nodes on a Rundeck Server.

## Authentication

Follow the steps outlined in the [**Azure Plugins Overview**](/manual/plugins/azure-plugins-overview) to configure authentication for Azure Job steps.
Credentials can be configured on a per Job Step basis, Project basis, or for the entire Runbook Automation system.

The source code lives at [https://github.com/rundeck-plugins/rundeck-azure-plugin](https://github.com/rundeck-plugins/rundeck-azure-plugin).

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

### Other Settings:

Mapping and filter settings

- **Mapping Params**: Custom mapping settings. Property mapping definitions. Specify multiple mappings in the form "attributeName.selector=selector" or "attributeName.default=value", separated by ";"
- **Resource Groups**:  Filter using a list of allowed resource groups separated by semicolons (`;`). Eg: `RG1; RG2; RG3`.
- **Only Running Instances**: Filter for the "Running" instances. If false, all instances will be returned.

### Mapping

Map the Azure VM properties to Rundeck Node definition

#### Default Mapping

```
nodename.selector                   =    name
hostname.selector                   =    hostname
description.selector                =    short_description
osName.selector                     =    osName
osVersion.selector                  =    osVersion
osFamily.selector                   =    osFamily
username.selector                   =    username
region.selector                     =    azure_region
resourceGroup.selector              =    azure_resourceGroup
status.selector                     =    azure_status
id.selector                         =    azure_id
node-executor.selector              =    node_executor
file-copier.selector                =    file_copier
vmId.selector                       =    azure_vmId
tags.selector                       =    tags

image:type.selector                 =    azure_image_type
image:offer.selector                =    azure_image_offer
image:sku.selector                  =    azure_image_sku
image:version.selector              =    azure_image_version
osDisk:osType.selector              =    azure_osDisk_osType
osDisk:name.selector                =    azure_osDisk_name
osDisk:createOption.selector        =    azure_osDisk_createOption
osDisk:diskSizeGB.selector          =    azure_osDisk_diskSizeGB

plan:name.selector                  =    azure_plan_name
plan:product.selector               =    azure_plan_product
plan:publisher.selector             =    azure_plan_publisher

size:name.selector                              =    azure_size_name
size:numberOfCores.selector                     =    azure_size_numberOfCores
size:memoryInMB.selector                        =    azure_size_memoryInMB
size:maxDataDiskCount.selector                  =    azure_size_maxDataDiskCount
size:azure_size_resourceDiskSizeInMB.selector   =    azure_size_azure_size_resourceDiskSizeInMB

provisioningState:code.selector                 =    azure_provisioningState_code
provisioningState:displayStatus.selector        =    azure_provisioningState_displayStatus
provisioningState:message.selector              =    azure_provisioningState_message
provisioningState:time.selector                 =    azure_provisioningState_time

```

### Adding Tags from Azure VM Tags

You can add Rundeck's node tags using Azure VM tags.

For example, create an Azure VM tags like:

- Rundeck-Tags=sometag1,sometag2

`sometag1` and `sometag2` will be added as tags on Rundeck nodes

### Adding custom tags from Azure VM files

You can add extra tags using the azure fields available (right column on the default mapping).

For example, adding extra tags based on the VM resource group and status:

```
tags.selector=azure_resourceGroup,azure_status;
```

### Adding custom attribute based on Azure VM Tags

Also, you can add extra nodes attributes using Azure VM tags.

For example, creating the following tags on the Azure VM, you can map those tags to a rundeck node attribute:

- Rundeck-node-executor=winrm-exe
- Rundeck-file-copier=winrm-filecopier
- Rundeck-winrm-password-storage-path=keys/node/windows.password

As you see, the Azure VM tags must start with **Rundeck-**

Then to map those tags to nodes attribute use:

```
node-executor.selector=node-executor;
file-copier.selector=node-executor;
winrm-password-storage-path.selector=winrm-password-storage-path
```
