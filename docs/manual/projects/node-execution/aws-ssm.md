#  AWS Systems Manager (SSM) Node Executor Plugins
::: enterprise
:::

## Overview
The Node Executor and File Copier plugins use [AWS Systems Manager](https://aws.amazon.com/systems-manager/) to send commands, files and scripts to remote nodes.

Using the SSM plugins allows for Runbook Automation to communicate with EC2 instances through the SSM service, rather than another communication protocol - such as SSH. 
Runbook Automation sends commands to the Systems Manager service, and then the Systems Manager agents _pull_ their tasks onto their host EC2s. In addition, S3 is used to pass scripts and files to remote nodes.

![Basic Architecture of Runbook Automation with SSM](/assets/img/ssm-node-executor-architecture.png)

## Configuration and Credential Settings

There are three components of the setup for using SSM with Runbook Automation:
1. SSM and IAM setup on the remote EC2 nodes.
2. IAM permissions for Runbook Automation.
3. S3 Bucket setup. Required for executing scripts and sending files to EC2s, but not required for sending individual commands.

### SSM Setup on Remote EC2 Nodes
1. Ensure the SSM Agent is running on remote EC2 instances. This can be done following [this AWS documentation](https://docs.aws.amazon.com/systems-manager/latest/userguide/ssm-agent-status-and-restart.html).
2. Associate an IAM role with the remote EC2 instances that allows for the SSM agent to retrieve tasks from the SSM service.
   * AWS provides a prebuilt policy: **AmazonSSMManagedInstanceCore** that provides the necessary permissions for this operation.
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
                  "Resource": "arn:aws:s3:::<<YOUR S3 BUCKET>>/*"
              }
          ]
      }
    ```
   :::
3. Add the instances to the SSM inventory. This can be done using the [Quick Setup Host Management](https://docs.aws.amazon.com/systems-manager/latest/userguide/quick-setup-host-management.html).
4. You can test that you have configured Systems Manager correctly by manually using the [Run Command](https://docs.aws.amazon.com/systems-manager/latest/userguide/run-command.html) feature from AWS:
   <br>![aws-ssm-test-run](/assets/img/aws-ssm-test-run-command.png)<br>
   * Use the **`AWS-RunShellScript`** or **`AWS-RunPowerShellScript`** (for Windows) to test that SSM has been set up properly for the remote EC2 nodes.
<br>![aws-ssm-test-script](/assets/img/aws-ssm-test-run-script.png)<br>

Additional documentation on this setup can be found in the [Setting up AWS Systems Manager for EC2 instances](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-setting-up-ec2.html).

### IAM Permissions Setup for Runbook Automation

In order for Runbook Automation to communicate with remote EC2 instances using SSM, it needs to have permissions to send commands to the SSM service.
Amazon provides a prebuilt IAM Policy, **AmazonSSMAutomationRole** that can be used for providing the SSM permissions to Runbook Automation's IAM Role. 
However, it is recommended to **only use this role for testing** as it has fairly broad permissions. 

Here are steps to use a more secure permissions set:

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
2. Attach this policy with the IAM Role that is associated with Runbook Automation.  If Runbook Automation is hosted on EC2, then follow [these steps](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html#attach-iam-role) to modify the IAM Role of an EC2. If hosted on ECS, then follow [these steps](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html#specify-task-iam-roles).
   :::warning IAM Role for ECS
   If running Runbook Automation on ECS, then this IAM Policy needs to be attached to the **Task Role**, _not_ the _Task Execution Role_.
    ::: 

### S3 Bucket Permissions
In order for scripts and files to be picked up by the SSM agents on the remote nodes, the files are (temporarily) passed through an S3 bucket.

1. Create an S3 bucket that has a bucket policy that allows for objects to be _uploaded_ to it by the IAM policy associated with Runbook Automation.
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
                   "AWS": "arn:aws:iam::<<Runbook Automation AWS account ID>>:role/<<ARN associated with Runbook Automation>>"
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
You can test that the S3 permissions have been set up correctly by executing a simple script on the remote EC2s through the Systems Manager interface.
Follow the instructions outlined in [this AWS documentation](https://docs.aws.amazon.com/systems-manager/latest/userguide/integration-s3.html) to set up and run the test.
:::

## Setup Within Runbook Automation

### AWS Authentication
Follow the instructions outlined in the [AWS Plugins Overview](/manual/plugins/aws-plugins-overview.md) for Runbook Automation to authenticate with AWS.

### Node Discovery
In order to target the remote EC2 instances, they need to be populated into Runbook Automation's node inventory. 
It is recommended to use the [**EC2 Node Source**](/manual/projects/resource-model-sources/aws.md#amazon-ec2-node-source).

:::warning When not using the EC2 Node Source
If the EC2 Node Source is not used for node discovery, then be sure that the following **node-attributes** are added to the nodes:
1. **`instanceId`** - This is the EC2 instance-id from AWS.
2. **`region`** - This is the AWS region where the EC2 resides.

Node Attributes can be added when defining a resource-model source [manually](/administration/configuration/plugins/bundled-plugins.md#built-in-resource-model-formats)
or by using the [Attribute Match](/manual/node-enhancers.md#attribute-match) node enhancer.
:::

### Enable SSM Node Executor

**Project Wide Setting**<br>
The SSM Node Executor can be set as the **Default Node Executor** - thereby making it the standard node executor for the whole project:

1. Navigate to **Project Settings** -> **Edit Configuration** -> **Default Node Executor**.
2. Select the dropdown on the left and select **AWS / SSM / Node Executor**:
    ![](/assets/img/ssm-select-default-node-executor.png)
3. If Runbook Automation is authenticated with AWS through an associated IAM Role, then all the fields can be left as their defaults. Otherwise, fill in the **Access Key ID** and **Secret Key** fields.
4. See below for using **CloudWatch Logs** for larger log-output.
5. Optionally modify the **Log Filter Delay** property to be the number of seconds to wait before retrieving logs.
<br><br>

**Individual Nodes and Node Sources Setting**       
The SSM Node Executor can alternatively be configured on a per **Node Source** or per node basis.<br>
To do so, add **`node-executor=awsssmexecutor`** as a node-attribute to the nodes.

* For the **EC2 Node Source**, this can be done using the **Mapping Params** field:<br>
**`node-executor.default=awsssmexecutor`** and **`file-copier.default=aws-ssm-copier`**
  ![ec2-mapping-params](/assets/img/aws-ssm-ec2-mapping-params.png)

### Enable SSM File Copier

The SSM File Copier is used to execute scripts and transfer files to EC2 instances. Similar to the SSM Node Executor, it can be configured for an entire project or on per Node Source basis.

**Project Wide Setting**<br>
The SSM File Copier can be set as the **Default File Copier** - thereby making it the standard File Copier for the whole project:

1. Navigate to **Project Settings** -> **Edit Configuration** -> **Default File Copier**.
2. Select the dropdown on the left and select **AWS / SSM / File Copier**.
3. Place the name of the S3 bucket into the **Bucket Name** field.
4. If Runbook Automation is authenticated with AWS through an associated IAM Role, then the credential fields can be left blank. Otherwise, fill in the **Access Key ID** and **Secret Key** fields.

**Individual Nodes and Node Sources Setting**       
The SSM File Copier can alternatively be configured on a per **Node Source** or per node basis. To do so, add **`file-copier=aws-ssm-copier`** and **`ssm-copier-bucket=S3 bucket name`** as a node-attribute to the nodes.

## Using SSM for Commands and Scripts
Once the setup is complete, commands that are executed on the specified EC2s - either through the [**Commands**](/manual/06-commands.md#commands-tab-overview) tab or through the **Remote Command** step - will automatically execute through SSM.
Similarly, scripts that are executed using the **Incline Script** Job step will take place using SSM with S3 as the pass-through mechanism.

## Using CloudWatch Logs (Optional)
The example policies in the prior sections enable Runbook Automation to retrieve logs directly from SSM.  
However, these logs are truncated to 48,000 characters. To view logs that are longer than this limit, CloudWatch logs are used.  

### SSM Agent Permissions for Cloudwatch

In order for the log output to be sent to CloudWatch, the SSM agents on the remote EC2 instances need permissions to communicate with CloudWatch.

Add the following IAM permissions to the IAM Role that is associated with the remote EC2 instances:
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "logs:DescribeLogGroups",
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:DescribeLogStreams",
                "logs:PutLogEvents"
            ],
            "Resource": "*"
        }
    ]
}
```

Next, add the following permissions to the IAM Role that is associated with Runbook Automation: **`logs.GetLogEvents`**.

### Enable CloudWatch Configuring in Runbook Automation
To use Cloudwatch logs for all SSM output across all nodes that use SSM within the project, specify the **CloudWatch Log Group** in the Node Executor. 
Alternatively, add the following to the **Mapping Params** **`cloudwatch-log-group.default=<<CloudWatch Log Group Name>>`** on the node source or with **`cloudwatch-log-group=<<CloudWatch Log Group Name>>`** as a node-attribute.

## See it in Action
This plugin is used in one of the prebuilt Jobs in our [**_Automated Diagnostics Solution_**](/learning/solutions/automated-diagnostics/index.md).
Try out the Solution to see how this plugin can be used as part of incident-response workflows.
