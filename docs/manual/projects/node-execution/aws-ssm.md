#  AWS Systems Manager (SSM) Node Executor Plugins
::: enterprise
:::

## Description
The Node Executor and File Copier plugins use [AWS's Systems Manager](https://aws.amazon.com/systems-manager/) (previously named "SSM") to send commands, files and scripts to remote nodes. Specifically, they make use of System Manager's [Run Command](https://docs.aws.amazon.com/systems-manager/latest/userguide/execute-remote-commands.html).

**From AWS's Documentation:**
_Using Run Command, a capability of AWS Systems Manager, you can remotely and securely manage the configuration of your managed nodes. A managed node is any Amazon Elastic Compute Cloud (Amazon EC2) instance, edge device, or on-premises server or virtual machine (VM) in your hybrid environment that has been configured for Systems Manager._

This means that Rundeck does **not** need direct connectivity to the remote infrastructure. Rather, Rundeck sends commands to the Systems Manager service, and then the Systems Manager agents _pull_ their tasks onto their host EC2s.

The File Copier plugin uses Systems Manager _and_ S3 to copy files to remote nodes as well as run scripts on remote nodes.

## Configuration and Credential Settings

There are three components of the setup for using SSM with Process Automation:
1. SSM and IAM setup on the remote EC2 nodes.
2. IAM permissions for Process Automation.
3. S3 Bucket setup. Required for sending scripts and files to EC2s, but not required for sending individual commands.

### SSM Setup on Remote EC2 Nodes
1. Ensure the SSM Agent is running on remote EC2 instances. This can be done following [this AWS documentation](https://docs.aws.amazon.com/systems-manager/latest/userguide/ssm-agent-status-and-restart.html).
2. Associate an IAM role with the remote EC2 instances that allows for the SSM agent to retrieve tasks from the SSM service.
   * Amazon provides a prebuilt permission policy: **AmazonSSMManagedInstanceCore** that provides the necessary permissions for this operation.
   :::tip Heads Up!
     In order to send scripts and files to EC2 instances, the SSM agents also need to be able to retrieve objects from S3. Be sure to add the **`s3:GetObject`** and **`s3:ListObject`** permissions to the remote EC2s IAM role as well.
   ```
      {  
          "Version": "2012-10-17",
          "Statement": [
              {
                  "Effect": "Allow",
                  "Action": [
                      "s3:GetObject",
                      "s3:ListBucket"
                  ],
                  "Resource": "arn:aws:s3:::automated-diagnostics/*"
              }
          ]
      }
    ```
   :::
3. Add the instances to the SSM inventory. This can be done using the [Quick Setup Host Management](https://docs.aws.amazon.com/systems-manager/latest/userguide/quick-setup-host-management.html).
4. You can test that you have configured Systems Manager correctly by manually using the [Run Command](https://docs.aws.amazon.com/systems-manager/latest/userguide/run-command.html) feature from AWS:
   <br>![aws-ssm-test-run](@assets/img/aws-ssm-test-run-command.png)<br>
   * Use the **`AWS-RunShellScript`** or **`AWS-RunPowerShellScript`** (for Windows) to test that SSM has been set up properly for the remote EC2 nodes.
<br>![aws-ssm-test-script](@assets/img/aws-ssm-test-run-script.png)<br>

Additional documentation on this setup can be found in the [Setting up AWS Systems Manager for EC2 instances](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-setting-up-ec2.html).

### IAM Permissions Setup for Process Automation

In order for Process Automation to communicate with remote EC2 instances using SSM, it needs to have permissions to send commands to the SSM service.
Amazon provides a prebuilt IAM Policy, **AmazonSSMAutomationRole** that can be used for providing the SSM permissions to Process Automation's IAM Role. 
However, it is recommended to only use this role for testing as it has fairly broad permissions. Below are instructions to use the minimum necessary permissions:

1. Create a new IAM Policy with the following permissions:
    :::warning Heads Up!
    Be sure to replace **`<<your AWS account ID>>`** with the Account ID where the remote EC2 instances reside.
    :::
    ```
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "VisualEditor0",
                "Effect": "Allow",
                "Action": "ssm:SendCommand",
                "Resource": [
                    "arn:aws:s3:::*",
                    "arn:aws:ssm:*::document/AWS-RunShellScript",
                    "arn:aws:ssm:*::document/AWS-RunPowerShellScript",
                    "arn:aws:ssm:*::document/AWS-RunRemoteScript",
                    "arn:aws:ec2:*:<<your AWS account ID>>:instance/*"
                ]
            },
            {
                "Sid": "VisualEditor1",
                "Effect": "Allow",
                "Action": [
                    "ssm:ListCommands",
                    "ssm:ListCommandInvocations",
                    "ssm:GetCommandInvocation",
                    "logs:GetLogEvents"
                ],
                "Resource": "*"
            }
        ]
    }
    ``` 
2. Attach this policy with the IAM Role that is associated with Process Automation.  If Process Automation is hosted on EC2, then follow [these steps](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html#attach-iam-role) to modify the IAM Role of an EC2. If hosted on ECS, then follow [these steps](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html#specify-task-iam-roles).
   :::warning IAM Role for ECS
   If running Process Automation on ECS, then this IAM Policy needs to be attached to the **Task Role**, _not_ the _Task Execution Role_.
    ::: 

### S3 Bucket Permissions
In order for scripts and file to be picked up by the SSM agents on the remote nodes, the files are (temporarily) passed through an S3 bucket.

1. Create an S3 bucket that has a bucket policy that allows for objects to be _uploaded_ to it by the IAM policy associated with Process Automation.
2. Include a permission statement in this policy that allows for the remote EC2 instances to _retrieve_ objects from the bucket.
3. Here is an example policy:
    :::warning Heads Up!                                                        
    Be sure to replace **`<< content >>`** with your AWS Account ID's and ARN's.
    :::                                                                         
    ```
   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Effect": "Allow",
               "Principal": {
                   "AWS": "arn:aws:iam::<<remote EC2 nodes AWS account ID>>:role/<<ARN associated with remote EC2s>>"
               },
               "Action": [
                   "s3:GetObject",
                   "s3:ListBucket"
               ],
               "Resource": "arn:aws:s3:::automated-diagnostics/*"
           },
           {
               "Effect": "Allow",
               "Principal": {
                   "AWS": "arn:aws:iam::<<Process Automation AWS account ID>>:role/<<ARN associated with Process Automation>>"
               },
               "Action": [
                   "s3:PutObject"
               ],
               "Resource": "arn:aws:s3:::automated-diagnostics/*"
           }
       ]
   }
   ```                               
                               

:::tip Tip!
You can test that the S3 permissions have been set up correctly by executing a simple script on the remote EC2s through the Systems Manager interface:
Follow the instructions outlined in [this AWS documentation](https://docs.aws.amazon.com/systems-manager/latest/userguide/integration-s3.html) to set up and run the test.
:::

## Setup Within Process Automation

### AWS Authentication
Follow the instructions outlined in the [AWS Plugins Overview](/docs/manual/plugins/aws-plugins-overview.html) to authenticate Process Automation with AWS.

### Node Discovery
In order to target the EC2 instances, they need to be populated into Process Automation's node inventory. 
It is recommended to use the [**EC2 Node Source**](/docs/manual/projects/resource-model-sources/aws.html#amazon-ec2-node-source).

:::warning When not using the EC2 Node Source
If the EC2 Node Source is not being used for node discovery, then be sure that the following **node-attributes** are added to the nodes:
1. **`instanceId`** - This is the EC2 instance-id from AWS.
2. **`region`** - This is the AWS region where the EC2 resides.
Node Attributes can be added when defining a resource-model source [manually](/docs/administration/configuration/plugins/bundled-plugins.html#built-in-resource-model-formats)
or by using the [Attribute Match](/manual/node-enhancers.html#attribute-match) node enhancer.
:::

### Enable SSM Node Executor

The SSM Node Executor can be set as the **Default Node Executor** - thereby making it the standard node executor for the whole project:

1. Navigate to 

In order for SSM Node Executor to send commands to remote nodes, the following properties must be set on the nodes in Process Automation:
1. **`instanceId`** - This is the EC2 instance-id from AWS.  If using the [AWS EC2 Node Source](/administration/projects/resource-model-sources/aws.html#amazon-ec2-node-source), then this property will be automatically applied.<br><br>
2. **`region`** - This is the AWS region where the EC2 resides. If using the AWS EC2 Resource Model plugin, then this property will be automatically applied. If you are not using the AWS EC2 Resource Model plugin, then you can add it using the [Attribute Match](/manual/node-enhancers.html#attribute-match) node enhancer.<br><br>
3. 
   <br><br>
   * If Rundeck is running on an EC2 and has an IAM Role applied with the correct permissions - such as the **AmazonSSMAutomationRole**, then the AWS credentials **do not** need to be added into Rundeck. [Here](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html) is the AWS documentation on applying IAM roles to EC2. <br><br>
   * As Node-attributes, these can be applied via the **Mapping Params** field in the [EC2 Node Source](/administration/projects/resource-model-sources/aws.html#amazon-ec2-node-source) plugin.
     The node-attributes are **`ssm-accessKeyId`** and **`ssm-secretKey`** (this is pointing to a path in Key Storage, so be sure to save your AWS Secret Key in Key Storage, _not_ as a node-attribute). These can also be set at the project or framework levels (e.g. `project.ssm-accessKeyId` and `project.ssm-secretKey`):
     <br><br>![ec2-mapping-params](@assets/img/aws-ssm-ec2-mapping-params.png)<figcaption>Optionally Set AWS credentials in EC2 Node Source</figcaption><br>
   * The credentials can also be set via the [Default Node Executor](/manual/project-settings.html#edit-configuration):
     <br><br>![default-node-executor](@assets/img/aws-ssm-default-node-executor.png)<figcaption>Optionally Configure Credentials via Default Node Executor</figcaption><br>
4. **Optional Node Executor Settings:**<br><br>
   1. The log output from AWS Systems Manager's Run Command is truncated to 2500 characters. To see the full log-output for logs longer than 2500 characters, you can have SSM use a CloudWatch log bucket to retrieve the full log output.  
      To set this up, add the following property in Rundeck as node-attributes: `cloudwatch-log-group`. This can also be set at the project and framework levels (e.g. `project.cloudwatch-log-group`) or in the Default Node Executor. You must also add the **`CloudWatchAgentServerPolicy`** IAM Policy to your Managed Instances (EC2's) in AWS.  More detailed documentation on this can be found [here](https://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-rc-setting-up-cwlogs.html).<br><br>
   2. In the event that log output takes a while to start appearing, it can be useful to delay when Rundeck attempts to retrieve the logs from SSM.  Optionally add the `log-retrieve-delay` property as a node-attribute and set the value to be the number of seconds to wait before retrieving logs.
      This property can also be set at the project and framework levels (e.g. `project.log-retrieve-delay`) or via the Default Node Executor.

### File Copier
The SSM File Copier uses both Systems Manager's Run Command as well as S3. The plugin requires the following properties to be set:
1. `ssm-copier-accessKeyId` and `ssm-copier-secretKey`. These can be set as Node Attributes or at the project or framework levels (e.g. `project.ssm-copier-accessKeyId` and `project.ssm-copier-secretKey`). They can also be set in the Default File Copier (for a given project).  They **do not** need to be set if an IAM Policy has been added to the EC2 that Rundeck is running on.  The permissions associated with these credentials (or IAM Role) must include policies to run commands on remote nodes using SSM _and_ to read and write to a specified S3 bucket.<br><br>
2. `ssm-copier-bucket` is the S3 bucket that will be used to copy the file from Rundeck to the remote nodes. This can be set as a Node Attribute, in the Default File Copier, or at the project or framework levels (e.g. `project.ssm-copier-bucket`).

The (remote) EC2 instances also need the following permissions `s3:ListBucket` and `s3:GetObject` so that they can pull the script that is dispatched to the S3 bucket. For more information on how this operation works, see [this documentation](https://docs.aws.amazon.com/systems-manager/latest/userguide/integration-s3.html).

### See it in Action
This plugin is used in one of the prebuilt Jobs in our [**_Automated Diagnostics Solution_**](/learning/solutions/automated-diagnostics/solution-overview).
Try out the Solution to see how this plugin can be used as part of incident-response workflows.
