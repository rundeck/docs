# Nodes from diverse operating systems in the same project

## Managing nodes
The servers and devices that are managed by Rundeck (or PagerDuty Process Automation) are referred to as nodes.  Those nodes have some individual attributes that will be unique and other attributes that can be designated per project.  In any case where a node has a unique value for an attribute, that overrides an existing project default value.  A project configuration has a default node executor and file copier applicable for all project nodes. This is effective if all nodes are using the same auth/network protocol like [SSH](/learning/howto/ssh-on-linux-nodes.html#using-ssh-on-linux-unix-nodes) or [WinRM](https://github.com/rundeck-plugins/py-winrm-plugin). However, some environments are built with mixed operating systems including Linux, UNIX, and Windows.
In an environment with mixed operating systems, some jobs and commands can run in both environments. This guide demonstrates how to manage a project with multiple operating systems among the nodes.

## Model Source
Nodes are defined in each project and can be configured or defined in various ways.  Ideally, most or all nodes will come from a dynamic [node model source](/manual/projects/resource-model-sources/), such as [Amazon EC2](https://docs.rundeck.com/docs/manual/projects/resource-model-sources/aws.html) (Process Automation only) or [Oracle Cloud Infrastructure](/manual/projects/resource-model-sources/oracle.html).  It is also possible to define nodes with a more static source such as a [.yaml file](/manual/document-format-reference/resource-yaml-v13.html) or using the [Node Wizard](/manual/projects/resource-model-sources/node-wizard.html) (Process Automation only).
When defining a model source, a single default node executor and file copier is designated for the majority of nodes.  For this example, that default is globally defined as SSH, SSHJ, or OpenSSH.  After creating the project and defining the [model source](/learning/howto/ssh-on-linux-nodes.html), this example overrides that default when adding definitions for a Windows-based target node. In the [xml definition](/manual/document-format-reference/resource-v13.html#resource-xml) below, the `node-executor` and `file-copier` node attributes set specific default node executors and file copiers for the specific Windows node.  Note that the Linux nodes don’t have those attributes because they get those from the default project settings.  Each node with those attributes defined will override the project defaults.

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

Based on this node source file, all commands/jobs dispatched to the Windows node should use the `WinRMPython` node executor and the rest of the nodes should use the default SSH node defined at the project level.