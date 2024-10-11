# Cross-Account Orchestration with AWS Systems Manager

## Summary
It is fairly common for companies to have multiple AWS accounts, yet have tasks that need to be implemented across the infrastructure in all accounts.
For example, there may be a need to report, patch, or deploy upgrades on all EC2 instances across all AWS accounts.

This _How To_ article outlines how to configure the [SSM Node Executor](/manual/projects/node-execution/aws-ssm) to be used across multiple AWS Accounts.
The setup walks through configuring Runbook Automation to execute commands and scripts on EC2 nodes that reside in AWS accounts that are separate from the account where Runbook Automation is running.  

:::tabs
@tab Runbook Automation
![Cross Account SSM Architecture - RBA](/assets/img/ssm-rba-architecture.png)<br>

1. Runbook Automation integrates with "Master" Account using [direct integration](/manual/plugins/aws-plugins-overview.md#aws-integration-for-runbook-automation).
2. IAM Role in Master account has Trust Relationship with IAM ARNs in remote accounts.
3. Runbook Automation uses _Assume Role_ function to adopt permissions for remote accounts.
4. Automation is dispatched to EC2's through SSM using remote account IAM role.

@tab Runbook Automation Self-Hosted
![Cross Account SSM Architecture](/assets/img/ssm-cross-account-architecture.png)<br>

1. Runbook Automation is hosted in "Master" account - on EC2, EKS or ECS.
2. Through [AWS integration](/manual/plugins/aws-plugins-overview.md#aws-integration-for-process-automation-hosted-on-ec2), Runbook Automation inherits entitlements from IAM Role associated with EC2, EKS or ECS.
3. IAM role from Master account has Trust Relationship with IAM role in remote accounts.
4. Automation is dispatched to EC2's through SSM using remote account IAM role.

:::

Here is the overview of the steps for this setup:<br>
- [Cross-Account Orchestration with AWS Systems Manager](#cross-account-orchestration-with-aws-systems-manager)
  - [Summary](#summary)
  - [Configure IAM Roles in Remote Accounts](#configure-iam-roles-in-remote-accounts)
    - [IAM Role for Remote EC2s](#iam-role-for-remote-ec2s)
    - [IAM Role for Cross Account Node Execution](#iam-role-for-cross-account-node-execution)
    - [File Copier \& Script Executor Permissions](#file-copier--script-executor-permissions)

## Configure IAM Roles in Remote Accounts

### IAM Role for Remote EC2s
In the _remote_ AWS account, follow the steps to add EC2’s to the SSM managed inventory.  If your EC2 instances have already been added to the managed inventory, then skip to **Step 4** to test **Run Command**.
1. Ensure the SSM Agent is running on remote EC2 instances. This can be done following [this AWS documentation](https://docs.aws.amazon.com/systems-manager/latest/userguide/ssm-agent-status-and-restart.html).
2. Associate an IAM role with the remote EC2 instances that allows for the SSM agent to retrieve tasks from the SSM service.
    * AWS provides a prebuilt policy: **AmazonSSMManagedInstanceCore** that provides the necessary permissions for this operation.
3. Add the instances to the SSM inventory. This can be done using the [Quick Setup Host Management](https://docs.aws.amazon.com/systems-manager/latest/userguide/quick-setup-host-management.html).
4. You can test that you have configured Systems Manager correctly by manually using the [Run Command](https://docs.aws.amazon.com/systems-manager/latest/userguide/run-command.html) feature from AWS:
   <br>![aws-ssm-test-run](/assets/img/aws-ssm-test-run-command.png)<br>
    * Use the **`AWS-RunShellScript`** or **`AWS-RunPowerShellScript`** (for Windows) to test that SSM has been set up properly for the remote EC2 nodes.
      <br>![aws-ssm-test-script](/assets/img/aws-ssm-test-run-script.png)<br>

Additional documentation on this setup can be found in the [Setting up AWS Systems Manager for EC2 instances](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-setting-up-ec2.html).

### IAM Role for Cross Account Node Execution

Still within the Remote Account, Create an **IAM policy** (that will be added to the IAM Role later) that has permissions to execute commands on the EC2’s in this account using SSM.  The primary permissions required here are:

**`ssm:SendCommand`**
**`ssm:ListCommands`**
**`ssm:ListCommandInvocations`**
**`ssm:GetCommandInvocation`**

And the policy must allow for the **AWS-RunShellScript** and **AWS-RunPowerShellScript**.  Below is an example policy document with the minimum required permissions. 
:::warning Heads Up!
Be sure to replace **`<<REMOTE AWS ACCOUNT ID>>`** with the AWS account ID of the _remote_ account:
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
                "arn:aws:ec2:*:<<REMOTE AWS ACCOUNT ID>>:instance/*"
            ]
        },
        {
            "Sid": "VisualEditor1",
            "Effect": "Allow",
            "Action": [
                "ssm:ListCommands",
                "ssm:ListCommandInvocations",
                "ssm:GetCommandInvocation"
            ],
            "Resource": "*"
        }
    ]
}
```
:::tip Tip! Instance Discovery Permissions
In order for Runbook Automation to also be used to discover the EC2 nodes in the remote account, it needs the permissions to list the EC2s. 
If this same IAM Role will be used for instance-discovery, then be sure to add the following policy to the above IAM Role as well:
```
{
   "Effect": "Allow",
   "Action": "ec2:Describe*",
   "Resource": "*"
}
```
The **AmazonEC2ReadOnlyAccess** predefined policy can be used for this purpose, or a custom policy can be defined.
:::

### File Copier & Script Executor Permissions
The SSM policy outlined in the earlier section enables executing commands on the remote instances. 
Use the following steps to set up the ability to execute scripts on, or transfer files to (or between) EC2’s:

Add the following permission to the IAM Policy above: **`arn:aws:ssm:*::document/AWS-RunRemoteScript`**.

1. Create an S3 bucket that has a bucket policy that allows for objects to be _uploaded_ to it by the IAM policy associated with Runbook Automation.
2. Include a permission statement in this policy that allows for the remote EC2 instances to _retrieve_ objects from the bucket.
3. Here is an example **S3 Bucket Policy**:
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
               "Resource": "arn:aws:s3:::<<name of S3 bucket>>/*"
           },
           {
               "Effect": "Allow",
               "Principal": {
                   "AWS": "arn:aws:iam::<<Runbook Automation AWS account ID>>:role/<<ARN associated with Runbook Automation>>"
               },
               "Action": [
                   "s3:PutObject"
               ],
               "Resource": "arn:aws:s3:::<<name of S3 bucket>>/*"
           }
       ]
   }
   ```

:::tip Tip! Multiple ARNs to Access S3
Multiple ARNs can be added to the Principal by using a list:
```
"Principal": 
{
   "AWS":["arn:aws:iam::<AccountBId>:role/<AccountBRole>",  "arn:aws:iam::<AccountCId>:role/<AccountCRole>"]
}
```
:::

Then, in the _remote_ AWS account, modify the IAM Role associated with the EC2s (earlier referenced as **AmazonSSMManagedInstanceCore**) and add the following permissions
```
{
   "Effect": "Allow",
   "Action": [
       "s3:GetObject",
       "s3:ListBucket"
   ],
   "Resource": "arn:aws:s3:::<<name of S3 bucket>>/*"
}
```
Be sure to change **`<<name of S3 bucket>>`** to the name of your S3 Bucket.

:::tip Tip!
You can test that the S3 permissions have been set up correctly by executing a simple script on the remote EC2s through the Systems Manager interface.
Follow the instructions outlined in [this AWS documentation](https://docs.aws.amazon.com/systems-manager/latest/userguide/integration-s3.html) to set up and run the test.
:::

### Add Trust Policy
In order for Process or Runbook Automation to assume the role with the SSM permissions, a Trust Policy must be added to the cross-account role in the remote account. 
First, navigate to the _master account_ and copy the **ARN** of the IAM Role associated with Runbook Automation.

:::tip Master Account Reference
For Runbook Automation (Cloud), the _master account_ is the AWS Account that is integrated through the Project or System using the [AWS PluginGroup](/manual/plugins/aws-plugins-overview.md#aws-integration-for-runbook-automation).

For Runbook Automation Self=Hosted, the _master account_ is the AWS Account where Runbook Automation is hosted - either [on EC2](/manual/plugins/aws-plugins-overview.md#aws-integration-for-process-automation-hosted-on-ec2) or [on ECS](/manual/plugins/aws-plugins-overview.md#process-automation-hosted-on-ecs). 
:::

Navigate back to the _remote_ AWS account where the cross-account role can be modified.  Click on **Trust Relationships** then click on **Edit Trust Policy**. Use the following Trust Policy:

```
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Effect": "Allow",
			"Principal": {
				"AWS": [
					"<<ARN associated with Runbook Automation>>"
				]
			},
			"Action": "sts:AssumeRole",
			"Condition": {}
		}
	]
}
```

Click on **Update Policy** to save the changes.
Copy the ARN of this IAM Role (in the _Remote_ account).

## Update IAM Role in Master Account

Navigate back to the _master account_.  
Find the IAM Role that is associated with Runbook Automation, and navigate to modify this IAM role in the IAM Console.  For Runbook Automation Self-Hosted, see [these instructions for EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html#attach-iam-role), or [these instructions for ECS](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html#specify-task-iam-roles).  
Now add the following policy to this IAM Role and paste in the ARN of the cross-account IAM Role copied from the _remote account_ from the prior section:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "sts:AssumeRole"
            ],
            "Resource": "<<ARN of the cross-account role created in the Remote Account"
        }
    ]
}
```

:::warning IAM Role for ECS
If running Runbook Automation on ECS, then this IAM Policy needs to be attached to the **Task Role**, _not_ the _Task Execution Role_.
:::

## Configure Node Executor in Runbook Automation

### AWS Authentication
Follow the instructions outlined in the [AWS Plugins Overview](/manual/plugins/aws-plugins-overview.md) for Runbook Automation to authenticate with AWS.

### Node Discovery
In order to target the remote EC2 instances, they need to be populated into Runbook Automation's node inventory.
It is recommended to use the [**EC2 Node Source**](/manual/projects/resource-model-sources/aws.md#amazon-ec2-node-source).

Place the ARN of the cross-account role into the **Assume Role** field.

:::warning When not using the EC2 Node Source
If the EC2 Node Source is not used for node discovery, then be sure that the following **node-attributes** are added to the nodes:
1. **`instanceId`** - This is the EC2 instance-id from AWS.
2. **`region`** - This is the AWS region where the EC2 resides.
3. **`osFamily`**  - This is the os Family you need to specify if is a Windows node.
:::

### Enable SSM Node Executor & File Copier

#### Option 1: Individual Nodes and Node Sources Setting
The SSM Node Executor and File Copier can be configured on a per **Node Source** basis. This is the recommended approach when you have _multiple_ remote accounts.<br>

* For the **EC2 Node Source**, this can be done using the **Mapping Params** field.  Add the following, separated by semicolons:<br>
  **`ssm-assume-role.default=true`**<br>
  **`ssm-assume-role-arn.default=<<ARN of the cross-account role created in the Remote Account>>`**<br>
  **`node-executor.default=awsssmexecutor`** - Only required if SSM Node Executor is _not_ the Default Node Executor for the project.<br>
  **`file-copier.default=aws-ssm-copier`** - Only required if SSM Node Executor is _not_ the Default Node Executor for the project.<br>
  **`ssm-copier-bucket.default=<<S3 bucket name>>`**

If the same S3 bucket will be used across multiple Node Sources (thereby serving multiple AWS Accounts), _and_ the **Default File Copier** is not set to use SSM, then this can instead be added as a Project level property: **`project.ssm-copier-bucket=<<S3 bucket name>>`**.

#### Option 2: Project Wide Configuration
The SSM Node Executor can be set as the **Default Node Executor** - thereby making it the standard node executor for the whole project:

1. Navigate to **Project Settings** -> **Edit Configuration** -> **Default Node Executor**.
2. Select the dropdown on the left and select **AWS / SSM / Node Executor**:
   ![](/assets/img/ssm-select-default-node-executor.png)
3. If Runbook Automation is authenticated with AWS through an associated IAM Role, then all the fields can be left as their defaults.
4. Click the check-box for **Assume Role**.
5. Type in the **ARN** of the IAM role in the remote AWS account.
   * If you have more than one remote account, you can leave this blank.
6. See below for using **CloudWatch Logs** for larger log-output.
7. Optionally modify the **Log Filter Delay** property to be the number of seconds to wait before retrieving logs.
   <br>

The SSM File Copier can also be set as the **Default File Copier** for the whole project:
1. Navigate to **Project Settings** -> **Edit Configuration** -> **Default File Copier**.
2. Select the dropdown on the left and select **AWS / SSM / File Copier**.
3. Place the name of the S3 bucket into the **Bucket Name** field.
4. If Runbook Automation is authenticated with AWS through an associated IAM Role, then the Access Key ID and Secret Key fields can be left blank.

:::tip When not using the EC2 Resource Model
Node Attributes can be added when defining a resource-model source [manually](/administration/configuration/plugins/bundled-plugins.md#built-in-resource-model-formats)
or by using the [Attribute Match](/manual/node-enhancers.md#attribute-match) node enhancer. Use the same node-attributes listed above without `default`. For example, `ssm-assume-role=true`.
:::

## Using CloudWatch Logs

The example policies in the prior sections enable Runbook Automation to retrieve logs directly from SSM.  
However, these logs are truncated to 48,000 characters. To view logs that are longer than this limit, CloudWatch logs are used.  

In order to use CloudWatch, specify the CloudWatch Log Group in the Node Executor (therefore to be used across multiple Node Sources) or as a property added to the Mapping Params **`cloudwatch-log-group.default=<<CloudWatch Log Group Name>>`**.

Then, use the policies below for the IAM Roles.  Again, both of these are in the remote account.

**Full policy for Cross-Account-Role:**
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
                "arn:aws:ec2:*:<<REMOTE AWS ACCOUNT ID>>:instance/*"
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

**Policy to add to remote nodes (EC2’s):**
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
