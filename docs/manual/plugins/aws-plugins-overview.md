# AWS

## Overview

Process Automation integrates with Amazon Web Services (AWS) through a variety of plugins listed below. 
By integrating Process Automation with AWS, users can provide a centralized, self-service interface for both simple and complex tasks spanning multiple cloud environments:

[comment]: <> (#### Process Automation AWS Plugins)

[comment]: <> (<table>)

[comment]: <> (<tr>)

[comment]: <> (    <td>Key 1</td>)

[comment]: <> (    <td>Value 1</td>)

[comment]: <> (</tr>)

[comment]: <> (<tr>)

[comment]: <> (    <td>Key 2</td>)

[comment]: <> (    <td>Value 2</td>)

[comment]: <> (</tr>)

[comment]: <> (</table>)

[comment]: <> (|Job Step                                                |                    Node Source                          |                   Node Executor                         |                           Log Storage                   |                       Webhook                           |                         Health Check                     |)

[comment]: <> (---------------------------------------------------------|---------------------------------------------------------|---------------------------------------------------------|---------------------------------------------------------|---------------------------------------------------------|---------------------------------------------------------|)

[comment]: <> (|[Athena - Query]&#40;/manual/workflow-steps/amazon-athena&#41;|[EC2]&#40;/manual/projects/resource-model-sources/aws&#41;|[Systems Manager &#40;SSM&#41;]&#40;/manual/projects/node-execution/aws-ssm&#41;)

[comment]: <> (|[CloudWatch - Query logs]&#40;/manual/workflow-steps/aws-cloudwatch&#41;|[ECS & Fargate]&#40;/manual/projects/resource-model-sources/ecs-fargate&#41;|[ECS & Fargate]&#40;/manual/projects/node-execution/aws-ecs&#41;)

[comment]: <> (|[CloudWatch - Create Log Stream]&#40;/manual/workflow-steps/aws&#41;|)

[comment]: <> (|[EC2 - Start]&#40;/manual/workflow-steps/aws&#41;|)

[comment]: <> (|[EC2 - Start]&#40;/manual/workflow-steps/aws&#41;|)

[comment]: <> (|[EC2 - Restart]&#40;/manual/node-steps/aws&#41;|)

[comment]: <> (|[EC2 - Delete]&#40;/manual/node-steps/aws&#41;|)

[comment]: <> (|[EC2 - Create from Snapshot]&#40;/manual/workflow-steps/aws&#41;|)

[comment]: <> (|[EC2 - Update Autoscale Groups]&#40;/manual/workflow-steps/aws&#41;|)

[comment]: <> (|[ECS & Fargate - Execute Command]&#40;/manual/workflow-steps/aws-ecs-fargate&#41;|)

[comment]: <> (|[ECS & Fargate - Stopped Task Errors]&#40;/manual/workflow-steps/aws-ecs-fargate&#41;|)

[comment]: <> (|[ECS & Fargate - Stop Task]&#40;/manual/workflow-steps/aws-ecs-fargate&#41;|)

[comment]: <> (|[VPC - Configure Flow Logs]&#40;/manual/workflow-steps/aws&#41;|)

[comment]: <> (|[VPC - Enable Network Peering]&#40;/manual/workflow-steps/aws&#41;|)


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