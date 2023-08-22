# Node Sources Overview

## What is a Node Source?

A Node Source _(also referenced as Resource Model Source in some docs)_ is a way to share information about your infrastructure to Rundeck as [Nodes](/manual/05-nodes.html#overview).

Sources for Node data are commonly third-party systems such as [Amazon EC2](/manual/projects/resource-model-sources/aws.html) or [ServiceNow CMBD](/manual/projects/resource-model-sources/servicenow.html), accessed through their API, but could also be [static files or scripts](/manual/projects/resource-model-sources/builtin.html) maintained specifically for this purpose. Some data providers can be accessed directly from the automation interface using the [Resource Editor](/manual/projects/resource-model-sources/resource-editor.html). 

## Adding Nodes to a Project

To add Nodes to a project, add one or more Node Sources to a project 

1. Click the *Project Settings* gear at the bottom left then *Edit Nodes*<br>
   ![Project Settings Menu](~@assets/img/project-nodes.png)
2. Under Edit Nodes, select *Sources* and *Add a new Node Source+*<br>
   ![Adding a new Node Source](~@assets/img/edit-nodes.png)
3. If using an Enterprise Runner to discover nodes, then select the appropriate Runner Tag using the **Runner Selector**:<br>
   ![Node Source Runner Selector](@assets/img/node-source-runner-selector.png)

    As of version **`4.16.0`**, the following Node Sources are available to use through the Enterprise Runner:
    * **Ansible Inventory**
    * **VMware**
    * **Kubernetes**
    * **Docker**
    * **File**
    * **Script**

:::tip When to use a Runner
Use a remote Enterprise Runner when the node inventory is not directly accessible by the Process Automation cluster or by Runbook Automation.
For Example, if the node inventory is stored in an Ansible Inventory file, or is available from the vSphere API, but Runbook Automation does not have
direct access to these endpoints, then an Enterprise Runner is the recommended mode of discovery.
:::

:::warning Node Sources Available on Runner
If a Node Source is selected that is not in this list, the following error will appear after the node source tries to gather resources: `Reason: The datadog-resource-model plugin was not found on Runner ID = US-WEST-1-QA. You may need to upgrade your Runner or select a different Runner.` In a future version the Node Source configuration will dynamically know which runners support which Node Source plugins.
:::


## Node Source Data Formats

Rundeck makes use of common data formats ([XML](/manual/document-format-reference/resource-v13.html), [JSON](/manual/document-format-reference/resource-json-v10.html) & [YAML](/manual/document-format-reference/resource-yaml-v13.html). Though third-party software may produce these formats natively, it is typical to have to massage the output of one system into the appropriate format to be consumed by Rundeck. Since URLs and HTTP are a lowest-common-denominator for communication, Rundeck only requires that the data Providers make this data available as a file at a URL or on the local disk.<br>

## Managing nodes with mixed Operating Systems

### How do mixed nodes work in a project?
The servers and devices that are managed by Rundeck (or PagerDuty Process Automation) are referred to as nodes.  Those nodes have some individual attributes that will be unique and other attributes that can be designated per project.  In any case where a node has a unique value for an attribute, that overrides an existing project default value.  A project configuration has a default node executor and file copier applicable for all project nodes. This is effective if all nodes are using the same auth/network protocol like [SSH](/learning/howto/ssh-on-linux-nodes.html#using-ssh-on-linux-unix-nodes) or [WinRM](https://github.com/rundeck-plugins/py-winrm-plugin). However, some environments are built with mixed operating systems including Linux, UNIX, and Windows.  In an environment with mixed operating systems, some jobs and commands can run in both environments.<br>
Nodes are defined in each project and can be configured or defined in various ways.  Ideally, most or all nodes will come from a dynamic [node model source](/manual/projects/resource-model-sources/), such as [Amazon EC2](https://docs.rundeck.com/docs/manual/projects/resource-model-sources/aws.html) (Process Automation only) or [Oracle Cloud Infrastructure](/manual/projects/resource-model-sources/oracle.html).  It is also possible to define nodes with a more static source such as a [.yaml file](/manual/document-format-reference/resource-yaml-v13.html) or using the [Node Wizard](/manual/projects/resource-model-sources/node-wizard.html) (Process Automation only).<br>

### An example XML source with mixed nodes
When defining a model source, a single default node executor and file copier is designated for the majority of nodes.  For this example, that default is globally defined as SSH, SSHJ, or OpenSSH.  After creating the project and defining the [model source](/learning/howto/ssh-on-linux-nodes.html), this example overrides that default when adding definitions for a Windows-based target node. In the [xml definition](/manual/document-format-reference/resource-v13.html#resource-xml) below, the `node-executor` and `file-copier` node attributes set specific default node executors and file copiers for the specific Windows node.  Note that the Linux nodes don’t have those attributes because they get those from the default project settings.  Each node with those attributes defined will override the project defaults.<br>

```
<?xml version="1.0" encoding="UTF-8"?>
<project>
 <node name="node00"
   description="Linux Node 00"
   tags="db"
   hostname="192.168.56.20"
   osArch="amd64"
   osFamily="unix"
   osName="Linux"
   osVersion="3.10.0-1062.4.1.el7.x86_64"
   username="vagrant"
   ssh-key-storage-path="keys/rundeck" />

 <node name="node01"
   description="Linux Node 01"
   tags="db"
   hostname="192.168.56.21"
   osArch="amd64"
   osFamily="unix"
   osName="Linux"
   osVersion="3.10.0-1062.4.1.el7.x86_64"
   username="vagrant"
   ssh-key-storage-path="keys/rundeck" />

 <node name="node02"
   description="Linux Node 02"
   tags="nas"
   hostname="192.168.56.22"
   osArch="amd64"
   osFamily="unix"
   osName="Linux"
   osVersion="3.10.0-1062.4.1.el7.x86_64"
   username="vagrant"
   ssh-key-storage-path="keys/rundeck" />

 <node name="windows"
   description="Windows Server"
   tags="ad"
   hostname="192.168.56.23"
   osArch="amd64"
   osFamily="windows"
   osName="Windows Server 2022"
   osVersion="6.3"
   username="rundeckuser"
   winrm-password-storage-path="keys/windows.password"
   winrm-authtype="basic"
   node-executor="WinRMPython"
   file-copier="WinRMcpPython"
/>
</project>
```

Based on this Node Source file, all commands/jobs dispatched to the Windows node should use the `WinRMPython` node executor and the rest of the nodes should use the default SSH node defined at the project level.