# AWS Plugins

## Overview

Process Automation integrates with Amazon Web Services (AWS) through a variety of plugins listed below. 
By integrating Process Automation with AWS, users can provide a centralized, self-service interface for both simple and complex tasks spanning multiple cloud environments.

_Click to expand to see the full list of Process Automation plugins for AWS:_
<details><summary> <font size="5">Process Automation AWS Plugins</font> </summary>

|AWS Service Type|Plugin | Plugin Type|
|:---------------------------------------------------------:|---------------------------------------------------------|:---------------------------------------------------------:|
|**Athena**|[Query Athena Table](/manual/workflow-steps/amazon-athena)|Job Step|
|**CloudWatch**|[Query CloudWatch logs On Demand](/manual/workflow-steps/aws-cloudwatch)|Job Step|
|**CloudWatch**|[Execute Saved CloudWatch Logs Query](/manual/workflow-steps/aws-cloudwatch)|Job Step|
|**CloudWatch**|[Create CloudWatch Log Stream](/manual/workflow-steps/aws)|Job Step|
|**EC2**|[Start EC2](/manual/workflow-steps/aws)|Job Step|
|**EC2**|[Restart EC2](/manual/node-steps/aws)|Job Step|
|**EC2**|[Delete EC2](/manual/node-steps/aws)|Job Step|
|**EC2**|[Create EC2 from Snapshot](/manual/workflow-steps/aws)|Job Step|
|**EC2**|[Update EC2 Autoscale Groups](/manual/workflow-steps/aws)|Job Step|
|**EC2**|[EC2 Node Source](/manual/projects/resource-model-sources/aws)|Node Source|
|**ECS**|[ECS & Fargate Node Source](/manual/projects/resource-model-sources/ecs-fargate)|Node Source|
|**ECS**|[ECS & Fargate Node Executor](/manual/projects/node-execution/aws-ecs)|Node Executor|
|**ECS**|[Execute Command](/manual/workflow-steps/aws-ecs-fargate)|Job Step|
|**ECS**|[Stopped Task Errors](/manual/workflow-steps/aws-ecs-fargate)|Job Step|
|**ECS**|[Stop Task](/manual/workflow-steps/aws-ecs-fargate)|Job Step|
|**ELB**|[Unhealthy Target Group Instances](/manual/workflow-steps/aws-elb-workflow-plugin)|Job Step|
|**Lambda**|[Execute Lambda Function](/manual/workflow-steps/aws-lambda.html#execute-lambda-function)|Job Step|
|**Lambda**|[Execute Custom-Code Lambda Function](/manual/workflow-steps/aws-lambda.html#lambda-custom-code-execution)|Job Step|
|**RDS**|[Check Instance Status](/manual/workflow-steps/aws-rds)|Job Step|
|**S3**|[Copy Files from Local to S3 or S3 to local](https://github.com/rundeck-plugins/aws-s3-steps)|Job Step|
|**S3**|[List S3 objects](https://github.com/rundeck-plugins/aws-s3-steps)|Job Step|
|**S3**|[Create an S3 Bucket](https://github.com/rundeck-plugins/aws-s3-steps)|Job Step|
|**S3**|[Move Files from Local to S3 or S3 to local](https://github.com/rundeck-plugins/aws-s3-steps)|Job Step|
|**S3**|[Delete an S3 Bucket](https://github.com/rundeck-plugins/aws-s3-steps)|Job Step|
|**S3**|[Sync Directories and S3 Prefixes](https://github.com/rundeck-plugins/aws-s3-steps)|Job Step|
|**S3**|[S3 Log Storage](/administration/cluster/logstore/s3)|Log Storage|
|**Systems Manager (SSM)**|[SSM Node Executor](/manual/projects/node-execution/aws-ssm)|Node Executor|
|**Systems Manager (SSM)**|[SSM File Copier & Scripts](/manual/projects/node-execution/aws-ssm)|File Copier|
|**VPC**|[Configure Flow Logs](/manual/workflow-steps/aws)|Job Step|
|**VPC**|[Enable Network Peering](/manual/workflow-steps/aws)|Job Step|
</details>

## Setup

Because Process Automation can be self-hosted _and_ has a Cloud offering [Runbook Automation](/about/cloud/#runbook-automation), there are multiple methods for authenticating with
AWS:

[**EC2 IAM Role**](#option-1-ec2-iam-role) - For Process Automation hosted on EC2<br>
[**ECS Task IAM Role**](#option-2-ecs-iam-role) - For Process Automation hosted on ECS<br>
[**Access Key & Secret & Key**](#option-3-access-key-secret-key) - For Process Automation or Runbook Automation

### Option 1: EC2 IAM Role
When self-hosting Process Automation on EC2, the recommended method for integrating with AWS is to assign an IAM role to the EC2 virtual-machines:

1. Go to the AWS Management Console and open the **IAM** console at [https://console.aws.amazon.com/iam/](https://console.aws.amazon.com/iam/).
2. In the navigation pane of the console, click **Roles** and then click **Create New Role**.
3. For the **Trusted Entity Type** select **AWS service**.
4. Under **Common use cases** select **EC2** then click **Next**.
![Select Entity Type](@assets/img/aws-iam-select-entity-type.png)
5. In the **Permissions policies**, select the permission-sets based on the plugins you intend to use.
   - For example, all of the [CloudWatch Logs Plugins](/manual/workflow-steps/aws-cloudwatch) require **`logs:StartQuery`** and **`logs:GetQueryResults`** 
   while the [Execute Saved Query](/manual/workflow-steps/aws-cloudwatch.html#execute-saved-cloudwatch-logs-query) _also_ requires **`logs:DescribeQueryDefinitions`**.
<br>Then click **Next**.
6. Specify a **Role Name** and a **Description**.  Do not change the **Select trusted entities**.
7. Click **Create Role**.
8. Navigate to the **EC2** console and click on **Instances**.
9. Click on the EC2 (or multiple instances if running a clustered setup) and click on **Actions** -> **Security** -> **Modify IAM Role**:
![Modify IAM Role](@assets/img/aws-modify-iam-role.png)
10. Click on **Choose IAM Role** and find the IAM Role you created in **Step 6** then click **Update IAM Role**:
![Update IAM Role](@assets/img/aws-update-ec2-iam-role.png)

Now that the IAM Role is attached to the EC2, use the following steps to define this authentication method in Process Automation:

**System Level**
1. Click on the **System Menu** (gear icon) in the upper right.
2. Click on **System Configuration**.
3. Navigate to the **AWS** section and click on the **Pencil Icon** in the upper right.
4. (Optional) Set a default **Region** to be used for all plugins. 
5. From the **Credential Provider** field dropdown, select **EC2**.
6. Click **Save** in the lower right:
![EC2 Credential Provider - System Level](@assets/img/aws-iam-ec2-system-level.png)

**Project Level**
1. In the specific project, click on **Project Settings** in the lower left.
2. Click on **Edit Configuration** then click on **Plugins**.
3. Click on **+PluginGroup**.
4. Select **AWS** from the list:
![AWS Select PluginGroup Project Level](@assets/img/aws-select-plugingroup-project-level.png)
5. (Optional) Select the default **Region** to be used for all plugins within this project.
6. From the **Credential Provider** field dropdown, select **EC2**.
7. Click **Save** in the lower right.

### Option 2: ECS Task IAM Role

When self-hosting Process Automation on ECS, the recommended method for integrating with AWS is to assign an IAM role to the ECS Task Role:

1. Go to the AWS Management Console and open the **IAM** console at [https://console.aws.amazon.com/iam/](https://console.aws.amazon.com/iam/).
2. In the navigation pane of the console, click **Roles** and then click **Create New Role**.
3. For the **Trusted Entity Type** select **AWS service**.
4. Under **Common use cases** find **Elastic Container Task** in the dropdown under **User cases for other AWS services**:
![ECS IAM Role](@assets/img/aws-ecs-iam-select-use-case.png)
5. In the **Permissions policies**, select the permission-sets based on the plugins you intend to use.
   - For example, all of the [CloudWatch Logs Plugins](/manual/workflow-steps/aws-cloudwatch) require **`logs:StartQuery`** and **`logs:GetQueryResults`**
     while the [Execute Saved Query](/manual/workflow-steps/aws-cloudwatch.html#execute-saved-cloudwatch-logs-query) _also_ requires **`logs:DescribeQueryDefinitions`**.
<br>Then click **Next**.
6. Specify a **Role Name** and a **Description**.  Do not change the **Select trusted entities**.
7. Click **Create Role**.
8. Navigate to the **ECS** console and click on **Task Definitions**.
9. Select the Task Definition used for Process Automation and **Create new revision**.
10. Scroll down to the **Environment** section and select the role you created for the **Task Role** field:
![Assign IAM Role](@assets/img/aws-ecs-assign-task-role.png)

Now that the IAM Role is attached to the ECS Task, use the following steps to define this authentication method in Process Automation:

**System Level**
1. Click on the **System Menu** (gear icon) in the upper right.
2. Click on **System Configuration**.
3. Navigate to the **AWS** section and click on the **Pencil Icon** in the upper right.
4. (Optional) Set a default **Region** to be used for all plugins.
5. From the **Credential Provider** field dropdown, select **ECS**.
6. Click **Save** in the lower right:
   ![EC2 Credential Provider - System Level](@assets/img/aws-iam-ec2-system-level.png)

**Project Level**
1. In the specific project, click on **Project Settings** in the lower left.
2. Click on **Edit Configuration** then click on **Plugins**.
3. Click on **+PluginGroup**.
4. Select **AWS** from the list:
   ![AWS Select PluginGroup Project Level](@assets/img/aws-select-plugingroup-project-level.png)
5. (Optional) Select the default **Region** to be used for all plugins within this project.
6. From the **Credential Provider** field dropdown, select **ECS**.
7. Click **Save** in the lower right.

### Option 3: Access Key & Secret Key

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
![AWS Secrets Config System Level](@assets/img/aws-secret-system-level.png)
7. Click **Save** in the lower right.

**Project Level**
1. In the specific project, click on **Project Settings** in the lower left.
2. Click on **Edit Configuration** then click on **Plugins**.
3. Click on **+PluginGroup**.
4. Select **AWS** from the list:
   ![AWS Select PluginGroup Project Level](@assets/img/aws-select-plugingroup-project-level.png)
5. Click the **Select** button next to **Key Storage Password** and find the AWS Secret that was saved in step 2 above.
6. Place your AWS Access Key into the **Access Key ID** field.
7. (Optional) Select the default **Region** to be used for all plugins within this project.
8. Click **Save** in the lower right.