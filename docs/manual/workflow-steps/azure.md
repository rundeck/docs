# Azure Job Steps

Azure is Microsoft's web services product. It is a cloud computing platform that offers a variety of services including but not limited to storage, networking and analytics. Azure's integration with Rundeck allows you to edit and utilized your Azure services in a Rundeck job. 

## Azure / Storage / Copy

This job step allows users to copy files to and from their Azure storage. For example, files can be transferred from Azure to a Rundeck server or a specific node and from a node to Azure storage.

![Azure - Copy](~@assets/img/azure_copy.png)

- **Storage Account**
: the name of the Azure storage account you wish to use

- **Access Key**
: the file containing access key used to authenticate your account

- **Source**
: the path to the file you want to copy. It can be either an Azure URI or a local path (azure://container/path/file.ext or file://some/path/file.ext)

- **Destination**
: the path to where you want the file to be copied to. It can be either an Azue URI or a local path (azure://container/path/file.ext or file://some/path/file.ext)

## Azure / Storage / Delete

![Azure - Delete](~@assets/img/azure_delete.png)

- **Storage Account**
: the Azure storage account you wish to use

- **Access Key**
: the file containing access key used to authenticate your account

- **Container Name**
: the name of the Azure container that the file you want to delete is in

- **Blob Path**
: the path to the file that you want to delete. If the file is in a subfolder include the whole path like 'path/file.ext'

## Azure / Storage / List

![Azure - List](~@assets/img/azure_list.png)

- **Storage Account**
: the Azure storage account you wish to use

- **Access Key**
: the file containing access key used to authenticate your account

- **Container Name**
: the name of the Azure container that the you want to see the contents of

## Azure / VM / Create

![Azure - Create VM](~@assets/img/azure_create1.png)

- **Client ID**
: provide the Azure client ID

- **Tenant ID**
: provide the Azure tenant ID

- **Subscription ID**
: provide the Azure subscription ID

- **Key**
: the file that contains the Azure access key

- **Certificate Path**
: the file path to the Azure certificate

- **Certificate Password**
: the password for the Azure certificate

![Azure - Create VM - VM Properties](~@assets/img/azure_create2.png)

- **Region**
: the Azure region for the Virtual Machine

- **Name**
: the name for the new Virtual Machine

- **UserName**
: the username used to login on the new Virtual Machine

- **Password**
: the password used to login on the new Virtual Machine

- **Resource Group**
: the resource group of the new Virtual Machine

- **Create resource group**
: If checked, this will create a new resource group that the VM is in

- **VM Size**
: the size of the new Virtual Machine (from a list of preset options)

- **OS Type**
: the operating system you want on the new Virtual Machine (Linux or Windows)

![Azure - Create VM - Network Options](~@assets/img/azure_create3.png)

- **Primary Network**
: the IP address of the primary network

- **Network Type**
: the network type (public or private)

## Azure / VM / List

![Azure - List VM - Credentials](~@assets/img/azure_list2.png)

- **Client ID**
: provide the Azure client ID

- **Tenant ID**
: provide the Azure tenant ID

- **Subscription ID**
: provide the Azure subscription ID

- **Key**
: the file that contains the Azure access key

- **Certificate Path**
: the file path to the Azure certificate

- **Certificate Password**
: the password for the Azure certificate

![Azure - List VM - VM Properties](~@assets/img/azure_list3.png)

- **Region**
: the region of the VMs you want listed

- **Tag Name**
: the tag for the names of VMs you want listed

- **Region**
: the tag value for the regions you want VMs listed within

- **Resource Group**
: the resource group for the VMs you want listed

## Azure / VM / Start

![Azure - Start VM - Credentials](~@assets/img/azure_start1.png)

- **Client ID**
: provide the Azure client ID

- **Tenant ID**
: provide the Azure tenant ID

- **Subscription ID**
: provide the Azure subscription ID

- **Key**
: the file that contains the Azure access key

- **Certificate Path**
: the file path to the Azure certificate

- **Certificate Password**
: the password for the Azure certificate

![Azure - Start VM - VM Properties](~@assets/img/azure_start2.png)

- **Resource Group**
: the resource group of the VM you wish to start

- **Name**
: the name of the VM you wish to start

## Azure / VM / Stop

![Azure - Stop VM - Credentials](~@assets/img/azure_stop1.png)

- **Client ID**
: provide the azure client ID

- **Tenant ID**
: provide the Azure tenant ID

- **Subscription ID**
: provide the Azure subscription ID

- **Key**
: the file that contains the Azure access key

- **Certificate Path**
: the file path to the Azure certificate

- **Certificate Password**
: the password for the Azure certificate

![Azure - Stop VM - VM Properties](~@assets/img/azure_stop2.png)

- **Resource Group**
: the resource group of the VM you wish to start

- **Name**
: the name of 