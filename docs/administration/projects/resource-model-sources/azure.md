# Azure Node Source
::: enterprise
:::

The Azure Resource Model Source Plugin provides the Azure VMs as nodes on a Rundeck Server.

The source code lives at [https://github.com/rundeck-plugins/rundeck-azure-plugin](https://github.com/rundeck-plugins/rundeck-azure-plugin).

### Credentials Settings

Settings related to the Azure connection

- **Client ID**: Azure Client ID.
- **Tenant ID**: Azure Tenant ID.
- **Subscription ID**: Azure Subscription ID.
- **Azure Access Key**: Azure Access Key.
- **Certificate Path**: (Optional) Azure certificate file path (if the access key is not defined).
- **Certificate Password**: (Optional) Azure certificate Password (if the access key is not defined).

### Other Settings:

Mapping and filter settings

- **Mapping Params**: Custom mapping settings. Property mapping definitions. Specify multiple mappings in the form "attributeName.selector=selector" or "attributeName.default=value", separated by ";"
- **Resource Group**: Filter using resource group
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
