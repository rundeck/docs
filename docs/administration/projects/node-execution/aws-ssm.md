# AWS SSM (Enterprise)

### Description
The AWS SSM Node Executor and File Copier plugins use [AWS's Systems Manager](https://aws.amazon.com/systems-manager/) (previously named "SSM") to send commands, files and scripts to remote nodes. Specifically, they make use of System Manager's [Run Command](https://docs.aws.amazon.com/systems-manager/latest/userguide/execute-remote-commands.html).

**From AWS:**
_Using Run Command, a capability of AWS Systems Manager, you can remotely and securely manage the configuration of your managed nodes. A managed node is any Amazon Elastic Compute Cloud (Amazon EC2) instance, edge device, or on-premises server or virtual machine (VM) in your hybrid environment that has been configured for Systems Manager._

This means that Rundeck does **not** need direct connectivity to the remote infrastructure.

The File Copier plugin uses SSM _and_ S3 to copy files to remote nodes.

### Configuration and Credential Settings
#### SSM Configuration
_If you have already used Systems Manager and applied the IAM roles to your remote-nodes (EC2's) and added them as Managed Instance in Systems Manager, then you can skip this section._

Before configuring these plugins, be sure that you have completed the prerequisites outlined in the [Setting up AWS Systems Manager for EC2 instances](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-setting-up-ec2.html) documentation. The three key steps here are:
1. Ensure the SSM Agent is running on remote nodes.
2. Set up AWS IAM Roles for the target nodes _and_ for Rundeck. If Rundeck is running on an EC2, then this can be an IAM Role that is applied to Rundeck's EC2. Otherwise, these permissions will need to be associated with an Access Key and Secret Key credential pair.
3. Ensure that the remote nodes are added as Managed Nodes in Systems Manager. The fastest way to get started with Managed Nodes is using the [Quick Setup Host Management](https://docs.aws.amazon.com/systems-manager/latest/userguide/quick-setup-host-management.html).

    **Note:** You can test that you have configured Systems Manager correctly by manually using the [Run Command](https://docs.aws.amazon.com/systems-manager/latest/userguide/run-command.html) feature from AWS:
    ![AWS Run Command](~@assets/img/aws-ssm-runcommand.png)

      _Use the **AWS-RunShellScript** for testing on Linux and **AWS-RunPowerShellScript** for testing on Windows:_

    ![Run Shell Script](~@assets/img/aws-ssm-runshellscript.png)

#### Node Executor
In order for SSM Node Executor to send commands to remote nodes, the following properties must be set on the nodes in Rundeck:
1. `instanceId` - This is the EC2 instance-id from AWS.  If using the AWS EC2 Resource Model plugin, then this property will be automatically applied.
2. `region` - This is the AWS region where the EC2 resides. If using the AWS EC2 Resource Model plugin, then this property will be automatically applied. If you are not using the AWS EC2 Resource Model plugin, then you can add it using the [Attribute Match](/manual/node-enhancers.md#attribute-match) node enhancer.
3. AWS Access and Secret Keys must be configured as node-attributes or in the [Default Node Executor](/manual/project-settings.md#edit-configuration).  The node-attributes are `ssm-accessKeyId` and `ssm-secretKey` (this is pointing to a path in Key Storage, so be sure to save your AWS Secret Key in Key Storage, _not_ as a node-attribute).  These can also be set at the project or framework levels (e.g. `project.ssm-accessKeyId` and `project.ssm-secretKey`).
**Note:** These credentials do not need to be set in Rundeck if they have been configured in the AWS Credentials File on the Rundeck server, _or_ if Rundeck is running on an EC2 and has an IAM Role applied with the correct permissions. If setting the keys in the credentials file, they must be set for the Rundeck process user.

   **Optional Settings:**
   1. The log output from AWS Systems Manager's Run Command is truncated to 2500 characters. To see the full log-output for logs longer than 2500 characters, you can have SSM use a CloudWatch log bucket to retrieve the full log output.  To set this up, add the following property in Rundeck as node-attributes: `cloudwatch-log-group`. This can also be set at the project and framework levels (e.g. `project.cloudwatch-log-group`). You must also add the `CloudWatchAgentServerPolicy` IAM Policy to your Managed Instances (EC2's) in AWS.  More detailed documentation on this can be found [here](https://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-rc-setting-up-cwlogs.html).
   2. In the event that log output takes a while to start appearing, it can be useful to delay when Rundeck attempts to retrieve the logs from SSM.  Optionally add the `log-retrieve-delay` property as a node-attribute and set the value to be the number of seconds to wait before retrieving logs. This property can also be set at the project and framework levels (e.g. `project.log-retrieve-delay`).

#### File Copier
The SSM File Copier uses both Systems Manager's Run Command as well as S3. The plugin requires the following properties to be set:
1. `ssm-copier-accessKeyId` and `ssm-copier-secretKey`. These can be set as Node Attributes or at the project or framework levels (e.g. `project.ssm-copier-accessKeyId` and `project.ssm-copier-secretKey`). They can also be set in the Default File Copier (for a given project).  They **do not** need to be set if an IAM Policy has been added to the EC2 that Rundeck is running on.  The permissions associated with these credentials (or IAM Role) must include policies to run commands on remote nodes using SSM _and_ to read and write to a specified S3 bucket.
2. `ssm-copier-bucket` is the S3 bucket that will be used to copy the file from Rundeck to the remote nodes. This can be set as a Node Attribute, in the Default File Copier, or at the project or framework levels (e.g. `project.ssm-copier-bucket`).
