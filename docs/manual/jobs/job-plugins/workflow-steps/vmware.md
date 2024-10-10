# VMWare Workflow Steps (Enterprise)

## Clone VM Workflow Step

This workflow step plugin clones existing VMs.

Configuration

- **Source VM Name**: VM Name that will be clone
- **New VM Name**: Destination VM Name
- **DataCenter**: DataCenter Name. If the DataCenter is not set, the VM will be searching on the root folder

Authentication Options

- **URL Server**: URL of the Server, eg: https://vmware-server
- **Username**: Login Username
- **Password**: Username Password
- **Ignore SSL certificate**: Connecting with the server ignoring the SSL certificate. If this is false, you will need to add the certificate to the truststore ([see here](/manual/projects/resource-model-sources/vmware.md#connecting-using-certificate)).

## Create VM Workflow Step

This workflow step plugin creates a new VM.

Configuration

- **Source VM Name**: VM Name that will be clone
- **DataCenter Name**: DataCenter name where the new VM will be created
- **VMWare Host**: (Optional) If the host is not defined, it will take the first on the DataCenter
- **DataStore Name**: (Optional) If DataStore, it will take one from the host
- **Network Name**: Network name of the new VM
- **NIC Name**: NIC Name of the new VM
- **Memory Size (MB)**: Memory Size of the new VM
- **Number CPU**: Number CPU of the new VM
- **Guest OS ID**: Guest OS ID of the new VM
- **Disk Type**: Disk Type (persistent, independent_persistent)
- **Disk Size (MB)**: Size of the new disk (MB)
- **ISO file**: (Optional) If this field is defined, the VM will mount this disk (format "[datastore] path")
- **Power ON**: Power ON after the VM is created

Authentication Options

- **URL Server**: URL of the Server, eg: https://vmware-server
- **Username**: Login Username
- **Password**: Username Password
- **Ignore SSL certificate**: Connecting with the server ignoring the SSL certificate. If this is false, you will need to add the certificate to the truststore ([see here](/manual/projects/resource-model-sources/vmware.md#connecting-using-certificate)).

## Re-Config VM Workflow Step

This workflow step plugin re-config a VM.

Configuration

- **Source VM Name**: VM Name that will be modify
- **DataCenter Name**: DataCenter Name. If the DataCenter is not set, the VM will be searching on the root folder
- **Memory Size (MB)**: new Memory Size
- **Number CPU**: new CPU number
- **Network Operation**: Add or Remove network device
- **Network Name**: Network Name to add or remove
- **Disk Operation**: Add or Remove disk device
- **Disk Name**: Disk Name to add or remove
- **Disk Type**: Disk Type of the new disk
- **Disk Size**: Disk Size (MB) of the new disk

Authentication Options

- **URL Server**: URL of the Server, eg: https://vmware-server
- **Username**: Login Username
- **Password**: Username Password
- **Ignore SSL certificate**: Connecting with the server ignoring the SSL certificate. If this is false, you will need to add the certificate to the truststore ([see here](/manual/projects/resource-model-sources/vmware.md#connecting-using-certificate)).


## VMWare / VM / Clone / Template
Clone VM from template Workflow Step.
This workflow step plugin clones VMs from existing template.

Configuration

- **Template VM Name**: Template Name that will be clone
- **VM Name**: Destination VM Name
- **Hostname**: Vm Hostname
- **DataCenter**: DataCenter Name. If the DataCenter is not set, the VM will be searching on the root folder
- **DataStore Name**: (Optional) If DataStore, it will take one from the host
- **Memory Size (MB)**: Memory Size of the new VM
- **Number CPU**: Number CPU of the new VM
- **Disk Size (MB)**: Size of the new disk (MB)

Network Settings
- **IP**: Fixed IP
- **Gateway**: Fixed Gateway
- **Subnet Mask**: Subnet Mask
- **DNS Server**: DNS Server list, comma separated

Windows / will be applied to windows templates
- **Fullname**: Windows Full name
- **OrgName**: Organisation Name
- **ProductID**: Windows Product ID
- **Workgroup**: Windows Workgroup
- **Domain**: Domain Name
- **Domain User**: Domain User (Domain admin to register the machine on the domain)
- **Admin Password**: Domain User Password
- **TimeZone**: Time Zone ID ([list time zones ID](https://www.vmware.com/support/developer/windowstoolkit/wintk40u1/html/New-OSCustomizationSpec.html))
- **Gui Run Once**: Run Script when the machine is customized


Linux / will be applied to linux templates
- **Domain**: Domain Name
- **TimeZone**: Time Zone Name, eg: America/Los_Angeles
- **hwClockUTC**: Enable hwClockUTC

Authentication Options

- **URL Server**: URL of the Server, eg: https://vmware-server
- **Username**: Login Username
- **Password**: Username Password
- **Ignore SSL certificate**: Connecting with the server ignoring the SSL certificate. If this is false, you will need to add the certificate to the truststore ([see here](/manual/projects/resource-model-sources/vmware.md#connecting-using-certificate)).


## VMWare / VM / Customize
Customize a VM.
This workflow step plugin allows you to customize some parameters from a VM, for example set the IP address.

Configuration

- **VM Name**: Destination VM Name
- **Hostname**: Vm Hostname
- **DataCenter**: DataCenter Name. If the DataCenter is not set, the VM will be searching on the root folder

Network Settings
- **IP**: Fixed IP
- **Gateway**: Fixed Gateway
- **Subnet Mask**: Subnet Mask
- **DNS Server**: DNS Server list, comma separated

Windows / will be applied to windows templates
- **Fullname**: Windows Full name
- **OrgName**: Organisation Name
- **ProductID**: Windows Product ID
- **Workgroup**: Windows Workgroup
- **Domain**: Domain Name
- **Domain User**: Domain User (Domain admin to register the machine on the domain)
- **Admin Password**: Domain User Password
- **TimeZone**: Time Zone ID ([list time zones ID](https://www.vmware.com/support/developer/windowstoolkit/wintk40u1/html/New-OSCustomizationSpec.html))
- **Gui Run Once**: Run Script when the machine is customized


Linux / will be applied to linux templates
- **Domain**: Domain Name
- **TimeZone**: Time Zone Name, eg: America/Los_Angeles
- **hwClockUTC**: Enable hwClockUTC

Authentication Options

- **URL Server**: URL of the Server, eg: https://vmware-server
- **Username**: Login Username
- **Password**: Username Password
- **Ignore SSL certificate**: Connecting with the server ignoring the SSL certificate. If this is false, you will need to add the certificate to the truststore ([see here](/manual/projects/resource-model-sources/vmware.md#connecting-using-certificate)).
