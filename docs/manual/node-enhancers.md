# Node Enhancers

Rundeck offers node enhancers to help you to better organize, manage and keep up to date on the status of your nodes. There are three different node enhancers: Attribute Match, Icon and Health Check (Enterprise).  

## Attribute Match

The attribute match enhancer is a way for you to add new attributes to various nodes. This is done by finding attribute matches. So, any nodes with attributes matching the one specified will have the new attributes added to them.

![Attribute Match](/assets/img/attribute_match.png)

- **Attribute Matches**
: This is where you specify the attribute that you want to search for. By doing so, you can add new attributes to the nodes that match based off of what you input this section.

- **Attributes to Add**
: This is where you specify the new attributes that you wish to add to the nodes that matched the attributes you specified above. So, any attributes you put here will show up on all the nodes that match based off your Attribute Matches input.

- **Tags to Add**
: This is where you specify any tags you want added to the nodes that match. You can enter numerous tags, all separated by a comma.

:::tip Heads Up
If you would like to match the node name attribute, use 'nodename' instead of 'name'. The latter one works at 'Node filter' context only.
:::

### Attribute Match Examples

#### Assign a Node Executor to a Subset of Node Inventory
There are times when it is useful to declare a specific node-executor for a subset of the node inventory.  This is easily accomplished using Node Enhancers.
For example, when the [EC2 Node Source](/manual/projects/resource-model-sources/aws.html#amazon-ec2-node-source) is added, the [Default Node Executor](/manual/project-settings.html#default-node-executor-configuration) - such as **SSH** -
is automatically assigned to all the imported EC2's for that Node Source.  In order to specify that the [WinRM](/learning/howto/configuring-windows-nodes.html#basic-pywinrm-plugin-requirements) or the [Systems Manager (SSM)](/manual/projects/node-execution/aws-ssm.html#aws-systems-manager-ssm-node-executor-plugins)
node executors are used for a subset of this inventory, the following **Node Enhancer** configurations could be utilized:

**Use SSM for All Nodes with SSM in the Node Name:**<br>
* Attribute Match: **`nodename=~.*SSM.*`** <br>
* Attributes to Add:
```
node-executor=awsssmexecutor
ssm-accessKeyId=MY_AWS_ACCESS_KEY
ssm-secretKey=keys/path-to-aws-secret
file-copier=aws-ssm-copier
ssm-copier-accessKeyId=MY_AWS_ACCESS_KEY
ssm-copier-secretKey=keys/path-to-aws-secret
```

![Attribute Match Assigns Node Executor to Specific Nodes](/assets/img/node-enhancer-example.png)

**Use WinRM for All Nodes where the Operating System is Windows**<br>
* Attribute Match: **`osName==windows`** <br>
* Attributes to Add:
```
node-executor=WinRMPython
file-copier=WinRMcpPython
username=rundeck_admin
winrm-password-storage-path=keys/win_server1
winrm-cmd=CMD
```


## Icon

This node enhancer allows you to add icons to the nodes that you already have on Rundeck. In order to do so, you need to specify an attribute. By doing so, the icon will be applied only to the nodes that contain that attribute.

![Icon](/assets/img/icon_badge.png)

- **Attribute Name**
: This is where you specify the attribute name. Any node that has that attribute will have the icon applied to it.

- **Attribute Name**
: This is where you specify an exact attribute name. If there is an exact match then the icon will be added to that node/those nodes.

- **Icon Name**
: This is where you specify the icon that you want to apply to the nodes. In order to do so, you need to choose an icon from either the Font-Awesome icons or the Glyphicon icons. Depending which you choose, the name needs to start with "glyphicon-" or "fa-."

## Health Checks (Enterprise)

Our Enterprise customers also have access to a health check node enhancer. To learn more, please visit [Health Checks](/manual/healthchecks.md).
