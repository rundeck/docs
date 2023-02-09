# AWS

## Overview

Process Automation integrates with Amazon Web Services (AWS) through a variety of plugins listed below. 
By integrating Process Automation with AWS, users can provide a centralized, self-service interface for both simple and complex tasks spanning multiple cloud environments:

## Setup

Because Process Automation can be self-hosted _and_ has a Cloud offering [Runbook Automation](/about/cloud/#runbook-automation), there are multiple methods for authenticating with
AWS:

[**EC2 IAM Role**](#option-1-ec2-iam-role)<br>
[**ECS Task IAM Role**](#option-2-ecs-iam-role)<br>
[**Access Key & Secret & Key**](#option-3-access-key-secret-key)

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



### Option 3: Access Key & Secret Key

1. Create an AWS Access Key and Secret Key that is associated with an IAM Role, follow [these instructions](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).
2. Once the keys have been downloaded, add the Secret Key into Project or System Key Storage using the Password key type, following [these instructions](/manual/system-configs.html#key-storage).

If configuring credentials for a particular **Project** - thereby giving AWS access to only the plugins in a specific project - use the following instructions.  Otherwise, see below for configuring AWS credentials in the **System Configuration**.

#### AWS Credentials for a Project