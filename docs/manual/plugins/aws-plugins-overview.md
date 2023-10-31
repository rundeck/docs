# AWS Plugins

## Overview

Process Automation integrates with Amazon Web Services (AWS) through a variety of plugins listed below. 
By integrating Process Automation with AWS, users can provide a centralized, self-service interface for both simple and complex tasks spanning multiple cloud environments.

_Click to expand to see the full list of Process Automation plugins for AWS:_
<details><summary> <font size="5">Process Automation AWS Plugins</font> </summary>

|AWS Service Type|Plugin | Plugin Type|
|:---------------------------------------------------------:|---------------------------------------------------------|:---------------------------------------------------------:|
|**Athena**|[Query Athena Table](/manual/workflow-steps/amazon-athena.md)|Job Step|
|**CloudWatch**|[Query CloudWatch logs On Demand](/manual/workflow-steps/aws-cloudwatch.md)|Job Step|
|**CloudWatch**|[Execute Saved CloudWatch Logs Query](/manual/workflow-steps/aws-cloudwatch.md)|Job Step|
|**CloudWatch**|[Create CloudWatch Log Stream](/manual/workflow-steps/aws.md)|Job Step|
|**EC2**|[Start EC2](/manual/workflow-steps/aws.md)|Job Step|
|**EC2**|[Restart EC2](/manual/node-steps/aws.md)|Job Step|
|**EC2**|[Delete EC2](/manual/node-steps/aws.md)|Job Step|
|**EC2**|[Create EC2 from Snapshot](/manual/workflow-steps/aws.md)|Job Step|
|**EC2**|[Update EC2 Autoscale Groups](/manual/workflow-steps/aws.md)|Job Step|
|**EC2**|[EC2 Node Source](/manual/projects/resource-model-sources/aws.md)|Node Source|
|**ECS**|[ECS & Fargate Node Source](/manual/projects/resource-model-sources/ecs-fargate.md)|Node Source|
|**ECS**|[ECS & Fargate Node Executor](/manual/projects/node-execution/aws-ecs.md)|Node Executor|
|**ECS**|[Execute Command](/manual/workflow-steps/aws-ecs-fargate.md)|Job Step|
|**ECS**|[Stopped Task Errors](/manual/workflow-steps/aws-ecs-fargate.md)|Job Step|
|**ECS**|[Stop Task](/manual/workflow-steps/aws-ecs-fargate.md)|Job Step|
|**ELB**|[Unhealthy Target Group Instances](/manual/workflow-steps/aws-elb-workflow-plugin.md)|Job Step|
|**Lambda**|[Execute Lambda Function](/manual/workflow-steps/aws-lambda.html#execute-lambda-function.md)|Job Step|
|**Lambda**|[Execute Custom-Code Lambda Function](/manual/workflow-steps/aws-lambda.html#lambda-custom-code-execution.md)|Job Step|
|**RDS**|[Check Instance Status](/manual/workflow-steps/aws-rds.md)|Job Step|
|**S3**|[Copy Files from Local to S3 or S3 to local](https://github.com/rundeck-plugins/aws-s3-steps.md)|Job Step|
|**S3**|[List S3 objects](https://github.com/rundeck-plugins/aws-s3-steps.md)|Job Step|
|**S3**|[Create an S3 Bucket](https://github.com/rundeck-plugins/aws-s3-steps.md)|Job Step|
|**S3**|[Move Files from Local to S3 or S3 to local](https://github.com/rundeck-plugins/aws-s3-steps.md)|Job Step|
|**S3**|[Delete an S3 Bucket](https://github.com/rundeck-plugins/aws-s3-steps.md)|Job Step|
|**S3**|[Sync Directories and S3 Prefixes](https://github.com/rundeck-plugins/aws-s3-steps.md)|Job Step|
|**S3**|[S3 Log Storage](/administration/cluster/logstore/s3.md)|Log Storage|
|**Systems Manager (SSM)**|[SSM Node Executor](/manual/projects/node-execution/aws-ssm.md)|Node Executor|
|**Systems Manager (SSM)**|[SSM File Copier & Scripts](/manual/projects/node-execution/aws-ssm.md)|File Copier|
|**VPC**|[Configure Flow Logs](/manual/workflow-steps/aws.md)|Job Step|
|**VPC**|[Enable Network Peering](/manual/workflow-steps/aws.md)|Job Step|
</details>

## Setup

The steps for integrating with AWS will vary depending on the product you are using:

[**Runbook Automation**](#aws-integration-for-runbook-automation) - Integration steps for Runbook Automation (Cloud) product.

[**Process Automation on EC2**](#aws-integration-for-process-automation-hosted-on-ec2) - For Process Automation hosted on EC2<br>
[**Process Automation on ECS**](#process-automation-hosted-on-ecs) - For Process Automation hosted on ECS<br>

[**Access Key & Secret Key**](#alternative-aws-authentication-access-key-secret-key) - For Process Automation or Runbook Automation when Access Keys are permitted. 
   :::warning Warning
   Using the **Access Key and Secret Key** method is the **_least_** recommended approach for integrating with AWS and is the **_least secure_**. 
   The other methods of integration are highly recommended in place of using Access Key and Secret Key.
   :::

### AWS Integration for Runbook Automation
Runbook Automation can be integrated with one or more AWS Accounts using an IAM role with a **`Trust Relationship`**. More details on this authentication mechanism can be found in [this AWS documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html).
Here is a diagram that outlines this setup process:

![RBA Authentication Process with AWS](/assets/img/aws-iam-auth-diagram.png)


Steps for setting up the integration for the entire Runbook Automation instance or for individual projects are outlined below:

**Part 1: In Runbook Automation:**<br>
To configure the AWS integration for the whole Runbook Automation instance:
1. Click on the **System Menu** (gear icon) in the upper right.
2. Click on **System Configuration**.
3. Navigate to the **AWS** section and click on the **Pencil Icon** in the upper right.
4. In the **IAM Role Delegation** section, copy the **Account ID** and **External ID** so that they may be used in subsequent steps:
![IAM AWS Auth](/assets/img/aws-iam-auth-rba-highlights.png)<br>
5. Leave open this page so that the **`Role ARN`** can be filled in later.

To configure the AWS integration for an individual project:
1. Navigate to **Project Configuration** within the specific project.
2. Click on **Edit Configuration** then click on **Plugins**.
3. Click on **+ Plugin Config** and select **AWS**
4. In the **IAM Role Delegation** section, copy the **Account ID** and **External ID** so that they may be used in subsequent steps.
![IAM AWS Auth](/assets/img/aws-iam-auth-rba-highlights.png)<br>
5. Leave open this page so that the **`Role ARN`** can be filled in later.


**Part 2: In AWS Console:**<br>
1. Go to the AWS Management Console and open the **IAM** console at [https://console.aws.amazon.com/iam/](https://console.aws.amazon.com/iam/).
2. In the navigation pane of the console, click **Roles** and then click **Create New Role**.
3. For the **Trusted Entity Type** select **AWS Account** and then select **Another AWS Account**.
![Another AWS Account](/assets/img/another-aws-account.png)
4. Paste in the AWS Account ID that was copied from **Step 4** in the prior section into the **Account ID** field.
5. Click on **Require External ID**.
6. Paste in the **External ID** that was copied from **Step 4** in the prior section into the **External ID** field.
7. Click **Next**
8. Select the _**Permissions Policies**_ to attach to the role.
   :::tip Policy Selection
   The selection should align with the specific automation use-case tasks for Runbook Automation.  For example, if Runbook Automation
   will be used to retrieve and push data to S3, then be sure to include a policy that include the `s3:GetObject` and `s3:PutObject` permissions. 
   :::
9. Assign the **Role Name** and optionally add a description. Do **not** modify the `Select trusted entities` section.
10. Click **Create Role**.
11. In the IAM Roles list, find and select the newly created IAM Role.
12. Copy the **`ARN`** to be used in subsequent steps:
![IAM ARN](/assets/img/aws-copy-iam-arn.png)

**Part 3: In Runbook Automation:**<br>
1. Paste the **`ARN`** copied from the prior section into the **`Role ARN`** field.
2. Click **Save** to add this plugin configuration.
3. Click **Save** to commit the configuration changes to the proejct.

The AWS authentication can be tested using the **Validate Credentials** Job step plugin. Otherwise, being using the rest of the AWS plugins
that align with the permissions allocated to the IAM Role.

### AWS Integration for Process Automation hosted on EC2
When self-hosting Process Automation on EC2, the recommended method for integrating with AWS is to assign an IAM role to the EC2 virtual-machines:

1. Go to the AWS Management Console and open the **IAM** console at [https://console.aws.amazon.com/iam/](https://console.aws.amazon.com/iam/).
2. In the navigation pane of the console, click **Roles** and then click **Create New Role**.
3. For the **Trusted Entity Type** select **AWS service**.
4. Under **Common use cases** select **EC2** then click **Next**.
![Select Entity Type](/assets/img/aws-iam-select-entity-type.png)
5. In the **Permissions policies**, select the permission-sets based on the plugins you intend to use.
   - For example, all of the [CloudWatch Logs Plugins](/manual/workflow-steps/aws-cloudwatch) require **`logs:StartQuery`** and **`logs:GetQueryResults`** 
   while the [Execute Saved Query](/manual/workflow-steps/aws-cloudwatch.html#execute-saved-cloudwatch-logs-query) _also_ requires **`logs:DescribeQueryDefinitions`**.
<br>Then click **Next**.
6. Specify a **Role Name** and a **Description**.  Do not change the **Select trusted entities**.
7. Click **Create Role**.
8. Navigate to the **EC2** console and click on **Instances**.
9. Click on the EC2 (or multiple instances if running a clustered setup) and click on **Actions** -> **Security** -> **Modify IAM Role**:
![Modify IAM Role](/assets/img/aws-modify-iam-role.png)
10. Click on **Choose IAM Role** and find the IAM Role you created in **Step 6** then click **Update IAM Role**:
![Update IAM Role](/assets/img/aws-update-ec2-iam-role.png)

Now that the IAM Role is attached to the EC2, use the following steps to define this authentication method in Process Automation:

**System Level**
1. Click on the **System Menu** (gear icon) in the upper right.
2. Click on **System Configuration**.
3. Navigate to the **AWS** section and click on the **Pencil Icon** in the upper right.
4. (Optional) Set a default **Region** to be used for all plugins. 
5. From the **Credential Provider** field dropdown, select **EC2**.
6. Click **Save** in the lower right:
![EC2 Credential Provider - System Level](/assets/img/aws-iam-ec2-system-level.png)

**Project Level**
1. In the specific project, click on **Project Settings** in the lower left.
2. Click on **Edit Configuration** then click on **Plugins**.
3. Click on **+PluginGroup**.
4. Select **AWS** from the list:
![AWS Select PluginGroup Project Level](/assets/img/aws-select-plugingroup-project-level.png)
5. (Optional) Select the default **Region** to be used for all plugins within this project.
6. From the **Credential Provider** field dropdown, select **EC2**.
7. Click **Save** in the lower right.


### Process Automation hosted on ECS

When self-hosting Process Automation on ECS, the recommended method for integrating with AWS is to assign an IAM role to the ECS Task Role:

1. Go to the AWS Management Console and open the **IAM** console at [https://console.aws.amazon.com/iam/](https://console.aws.amazon.com/iam/).
2. In the navigation pane of the console, click **Roles** and then click **Create New Role**.
3. For the **Trusted Entity Type** select **AWS service**.
4. Under **Common use cases** find **Elastic Container Task** in the dropdown under **User cases for other AWS services**:
![ECS IAM Role](/assets/img/aws-ecs-iam-select-use-case.png)
5. In the **Permissions policies**, select the permission-sets based on the plugins you intend to use.
   - For example, all of the [CloudWatch Logs Plugins](/manual/workflow-steps/aws-cloudwatch) require **`logs:StartQuery`** and **`logs:GetQueryResults`**
     while the [Execute Saved Query](/manual/workflow-steps/aws-cloudwatch.html#execute-saved-cloudwatch-logs-query) _also_ requires **`logs:DescribeQueryDefinitions`**.
<br>Then click **Next**.
6. Specify a **Role Name** and a **Description**.  Do not change the **Select trusted entities**.
7. Click **Create Role**.
8. Navigate to the **ECS** console and click on **Task Definitions**.
9. Select the Task Definition used for Process Automation and **Create new revision**.
10. Scroll down to the **Environment** section and select the role you created for the **Task Role** field:
![Assign IAM Role](/assets/img/aws-ecs-assign-task-role.png)

Now that the IAM Role is attached to the ECS Task, use the following steps to define this authentication method in Process Automation:

**System Level**
1. Click on the **System Menu** (gear icon) in the upper right.
2. Click on **System Configuration**.
3. Navigate to the **AWS** section and click on the **Pencil Icon** in the upper right.
4. (Optional) Set a default **Region** to be used for all plugins.
5. From the **Credential Provider** field dropdown, select **ECS**.
6. Click **Save** in the lower right:
   ![EC2 Credential Provider - System Level](/assets/img/aws-iam-ec2-system-level.png)

**Project Level**
1. In the specific project, click on **Project Settings** in the lower left.
2. Click on **Edit Configuration** then click on **Plugins**.
3. Click on **+PluginGroup**.
4. Select **AWS** from the list:
   ![AWS Select PluginGroup Project Level](/assets/img/aws-select-plugingroup-project-level.png)
5. (Optional) Select the default **Region** to be used for all plugins within this project.
6. From the **Credential Provider** field dropdown, select **ECS**.
7. Click **Save** in the lower right.

### Alternative AWS Authentication: Access Key & Secret Key

1. Create an AWS Access Key and Secret Key that is associated with an IAM Role, follow [these instructions](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).
2. Once the keys have been downloaded, add the Secret Key into Project or System Key Storage using the Password key type, following [these instructions](/manual/system-configs.html#key-storage).
   :::tip Tip
   If using a third party credential-store, such as [Hashicorp Vault](/learning/howto/vault-integration), then skip step 2.
   :::

Now that the AWS Secret Key has been added to Key Storage, use the following steps to configure authentication for either the entire system or for a specific project:

**System Level**
1. Click on the **System Menu** (gear icon) in the upper right.
2. Click on **System Configuration**.
3. Navigate to the **AWS** section and click on the **Pencil Icon** in the upper right.
4. Click the **Select** button next to **Key Storage Password** and find the AWS Secret that was saved in step 2 above.
5. Place your AWS Access Key into the **Access Key ID** field.
6. (Optional) Set a default **Region** to be used for all plugins
![AWS Secrets Config System Level](/assets/img/aws-secret-system-level.png)
7. Click **Save** in the lower right.

**Project Level**
1. In the specific project, click on **Project Settings** in the lower left.
2. Click on **Edit Configuration** then click on **Plugins**.
3. Click on **+PluginGroup**.
4. Select **AWS** from the list:
   ![AWS Select PluginGroup Project Level](/assets/img/aws-select-plugingroup-project-level.png)
5. Click the **Select** button next to **Key Storage Password** and find the AWS Secret that was saved in step 2 above.
6. Place your AWS Access Key into the **Access Key ID** field.
7. (Optional) Select the default **Region** to be used for all plugins within this project.
8. Click **Save** in the lower right.
