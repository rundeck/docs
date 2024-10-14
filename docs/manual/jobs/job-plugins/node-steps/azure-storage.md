## Azure Storage Node Steps

Azure Storage is a cloud service for storing large amounts of unstructured data, such as text or binary data. Azure Storage is highly scalable and available, and can be accessed from anywhere in the world over HTTP or HTTPS.

The following Azure Storage plugins are available for PagerDuty Runbook Automation:

* [**Remote Copy (Azure / Storage / Remote Copy)**](#remote-copy) - Copies files between Azure Storage containers or between Azure Storage and a local filesystem.
* [**List Blobs (Azure / Storage / List Blobs)**](#list-blobs) - Lists the blobs in an Azure Storage container.
* [**Remove Blobs (Azure / Storage / Remove Blobs)**](#remove-blobs) - Removes blobs from an Azure Storage container.
* [**Remote Syncs (Azure / Storage / Remote Syncs)**](#remote-syncs) - Synchronizes files between Azure Storage containers or between Azure Storage and a local filesystem.

:::tip Open Source Plugins
The Azure Storage plugins are open source and available on [GitHub](https://github.com/rundeck-plugins/rundeck-azure-storage-plugin).
:::

### Remote Copy

The **Azure / Storage / Remote Copy** plugin is a Node Step that copies files between Azure Storage containers or between Azure Storage and a local filesystem. The plugin requires the following fields:

* **Container Name**: The name of the Azure Storage container.
* **Source**: The path to the source file or directory.
  * Reference an Azure container use the following URI pattern: `azure://path` or `azure://path/file.ext`.
* **Destination**: The path to the destination file or directory.
  * Reference an Azure container use the following URI pattern: `azure://path` or `azure://path/file.ext`.
* **Protocol**: The protocol to use for the copy operation. Options are `http` or `https`.
* **Account Name**: The Azure Storage account name.
* **Access Key**: The Azure Storage account key.

### List Blobs

The **Azure / Storage / List Blobs** plugin lists the blobs in an Azure Storage container. The plugin requires the following fields:

* **Container Name**: The name of the Azure Storage container.
* **Prefix**: The prefix to filter the blobs by.
* **Protocol**: The protocol to use for the list operation. Options are `http` or `https`.
* **Account Name**: The Azure Storage account name.
* **Access Key**: The Azure Storage account key.

### Remove Blobs

The **Azure / Storage / Remove Blobs** plugin removes blobs from an Azure Storage container. The plugin requires the following fields:

* **Container Name**: The name of the Azure Storage container.
* **Blob Name**: The name of the blob to remove.
* **Prefix**: The prefix to filter the blobs by.
* **Protocol**: The protocol to use for the remove operation. Options are `http` or `https`.
* **Account Name**: The Azure Storage account name.
* **Access Key**: The Azure Storage account key.

### Remote Syncs

The **Azure / Storage / Remote Syncs** plugin synchronizes files between Azure Storage containers or between Azure Storage and a local filesystem. The plugin requires the following fields:

* **Container Name**: The name of the Azure Storage container.
* **Source**: The path to the source file or directory.
  * Reference an Azure container use the following URI pattern: `azure://path` or `azure://path/file.ext`.
* **Destination**: The path to the destination file or directory.
  * Reference an Azure container use the following URI pattern: `azure://path` or `azure://path/file.ext`.
* **Protocol**: The protocol to use for the sync operation. Options are `http` or `https`.
* **Account Name**: The Azure Storage account name.
* **Access Key**: The Azure Storage account key.