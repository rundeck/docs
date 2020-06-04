# Project Settings

Each Rundeck Project has it's own unique Configuration Page which contains lets you view and manage project settings.


## Project Configuration

NEED INFO

There are several configuration sections: Resource Model Sources, Default Node Executor, and Default File Copier sections. Each section is described below:

### Resource Model Sources Configuration

This section lets you add and modify Resource Model Sources for the project.
These sources contain the node definitions for the project.
One source will already be defined as a result of the initial project creation.
You can figure as many as you need. Rundeck will aggregate the data from each
one providing a merged view.

To add a new one, click "Add Source". You are prompted to select a type of source. The list shown will include all of the built-in types of sources, as well as any Plugins you have installed.

![Add Resource Model Source](~@assets/img/fig0706.png)

When you click "Add" for a type, you will be shown the configuration options for the type.

![Configure Resource Model Source](~@assets/img/fig0707.png)

You can then click "Cancel" or "Save" to discard or add the configuration to the list.

Each item you add will be shown in the list:

![Configured Source](~@assets/img/fig0708.png)

To edit an item in the list click the "Edit" button. To delete an item in the list click the "Delete" button.

Each type of Resource Model Source will have different configuration settings of its own. The built-in Resource Model Source providers are shown below.

You can install more sources as plugins, see [Resource Model Source Plugins](/administration/projects/resource-model-sources/builtin.md#resource-model-source-plugins).

#### File Resource Model Source

This is the File Resource Model Source configuration form:

![File Resource Model Source](~@assets/img/fig0707.png)

See [File Resource Model Source Configuration](/administration/projects/resource-model-sources/builtin.md#file-resource-model-source-configuration) for more configuration information.

#### Directory Resource Model Source

Allows a directory to be scanned for resource document files. All files
with an extension supported by one of the [Resource Model Document Formats](/administration/projects/resource-model-sources/builtin.md#resource-model-document-formats) are included.

![Directory Resource Model Source](~@assets/img/fig0709.png)

See [Directory Resource Model Source Configuration](/administration/projects/resource-model-sources/builtin.md#directory-resource-model-source-configuration) for more configuration information.

#### Script Resource Model Source

This source can run an external script to produce the resource model
definitions.

![Script Resource Model Source](~@assets/img/fig0710.png)

See [Script Resource Model Source Configuration](/administration/projects/resource-model-sources/builtin.md#script-resource-model-source-configuration) for more configuration information.

#### URL Resource Model Source

This source performs a HTTP GET request on a URL to return the
resource definitions.

![URL Resource Model Source](~@assets/img/fig0711.png)

See [URL Resource Model Source Configuration](/administration/projects/resource-model-sources/builtin.md#url-resource-model-source-configuration) for more configuration information.

### Default Node Executor Configuration

When Rundeck executes a command on a node, it does so via a "Node Executor".
The most common built-in Node Executor is the "SSH" implementation, which uses
SSH to connect to the remote node, however other implementations can be used.

Select the Default Node Executor you wish to use for all remote Nodes for the project:

![Default Node Executor Choice](~@assets/img/fig0712.png)

You can install more types of Node Executors as plugins, see [Node Execution Plugins](/manual/job-plugins.md#node-execution).

### Default File Copier Configuration

When Rundeck executes a script on a node, it does so by first copying the script as a file to the node, via a "File Copier". (It then uses a "Node Executor" to execute the script like a command.)

The most common built-in File Copier is the "SCP" implementation, which uses
SCP to copy the file to the remote node, however other implementations can be used.

Select the Default File Copier you wish to use for all remote Nodes for the project:

![Default File Copier Choice](~@assets/img/fig0713.png)

You can install more types of File Copiers as plugins, see [Node Execution Plugins](/manual/job-plugins.md#node-execution).
