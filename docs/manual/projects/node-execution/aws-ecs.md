#  AWS Elastic Container Service (ECS) Node Executor
::: enterprise
:::

## About Amazon ECS

**Amazon ECS** is a fully managed container orchestration service that makes it easy for users to deploy, manage, and scale containerized applications.

AWS **Fargate** is a serverless compute engine that is compatible with both Amazon Elastic Container Service (ECS) and Amazon Elastic Kubernetes Service (EKS).

## About the ECS Node Executor

The **Amazon ECS Node Executor** provides the ability to send commands to one or multiple containers running on ECS.

Sending commands to ECS containers makes it easier to collect diagnostic information and quickly troubleshoot errors. In development,
this allows users to easily interact with various processes in your containers and troubleshoot applications. In production scenarios,
this enables break-glass access to containers to debug issues.

This plugin is designed to work in conjunction with the [ECS-Fargate Node Source](/manual/projects/resource-model-sources/ecs-fargate).

## Configuration

### Configure ECS Task and Service Definitions

1. Attach a **Task IAM Role** to the **Task Definition** that grants containers the permissions needed for communication between the managed SSM agent (`execute-command` agent) and the SSM service.
   Use the following policy and attach it to the task definition as explained [**here**](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html).
    ```
    {
       "Version": "2012-10-17",
       "Statement": [
           {
           "Effect": "Allow",
           "Action": [
                "ssmmessages:CreateControlChannel",
                "ssmmessages:CreateDataChannel",
                "ssmmessages:OpenControlChannel",
                "ssmmessages:OpenDataChannel"
           ],
          "Resource": "*"
          }
       ]
    }
    ```
2. Enable remote commands by adding the **`--enable-execute-command`** flag to one of the following AWS CLI Commands: `create-service`, `update-service`, `start-task`, or `run-task`.
   For example, with an existing Service:
    ```
     aws ecs create-service \
         --cluster cluster-name \
         --task-definition task-definition-name \
         --enable-execute-command \
         --service-name service-name \
         --desired-count 1
    ```
3. **[Optional]** If the task definition parameter `initProcessEnabled` is set to **`true`**, this starts the init process inside the container,
   which removes any zombie SSM agent child processes found. The following provides an example:
    ```
    {
        "taskRoleArn": "ecsTaskRole",
        "networkMode": "awsvpc",
        "requiresCompatibilities": [
            "EC2",
            "FARGATE"
        ],
        "executionRoleArn": "ecsTaskExecutionRole",
        "memory": ".5 gb",
        "cpu": ".25 vcpu",
        "containerDefinitions": [
            {
                "name": "amazon-linux",
                "image": "amazonlinux:latest",
                "essential": true,
                "command": ["sleep","3600"],
                "linuxParameters": {
                    "initProcessEnabled": true
                }
            }
        ],
        "family": "ecs-exec-task"
    }
    ```
   
### Configure IAM Policy for Process Automation

The following permissions must be provided to the IAM Role that is assigned to Process Automation - 
either through Access Keys or assigning an IAM Role (explained in detail below) to the instance that Process Automation is running on:

**`ecs:ExecuteCommand`**

This IAM policy condition key can be used in tandem with other IAM policy condition keys to limit the access that Process Automation has within ECS:

* **`aws:ResourceTag/clusterTagKey`**
* **`ecs:ResourceTag/clusterTagKey`**
* **`aws:ResourceTag/taskTagKey`**
* **`ecs:ResourceTag/taskTagKey`**
* **`ecs:container-name`**
* **`ecs:cluster`**
* **`ecs:task`**
* **`ecs:enable-execute-command`**

Examples of IAM policies that restrict the access by Process Automation can be found [here](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-exec.html).

### Configure Node Executor within Process Automation

With the IAM policy created in the previous step, there are two methods for providing the IAM role to Process Automation: **Access Keys** _or_ **Instance or Container Profile**.

#### Option 1: Authentication with Access Keys

1. To create an Access Key ID and Secret that is associated with an IAM Role, follow [these instructions](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).<br><br>
2. Once the keys have been downloaded, add the Secret Key into Project or System **Key Storage** using the **Password** key type, following [these instructions](/manual/system-configs.html#key-storage).<br><br>
3. Navigate to **Project Settings -> Edit Configuration -> Default Node Executor**. <br><br>
4. Enter in the **Access Key** to the first field.<br><br>
5. Click on **Select** for the **Secret Key** field. Select the Secret Key that was saved to Key Storage in **Step 2**.<br><br>
6. Click **Save**:
   <img style='border:1px solid #327af6' src="@assets/img/aws-ecs-default-node-executor.png" />

#### Option 2: Authentication with Instance or Container Role

If Process Automation is self-hosted and running on either an EC2 instance or an ECS container, then the Node Executor can leverage the IAM Role that has been associated with the instance or container.
For instructions on how to associate an IAM Role to an EC2, click [here](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html), and for ECS Task Roles, click [here](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html).

1. Navigate to **Project Settings -> Edit Configuration -> Edit Configuration File**.<br><br>
2. If Process Automation is installed on an EC2, then add **`project.aws.credentialProvider=instance`**.  If it is installed on ECS, then add **`project.aws.credentialProvider=container`**.<br><br>
3. Click **Save** to commit the changes to the Project Configuration File.

## Executing Commands

In order to send commands to ECS Containers, first configure the [ECS-Fargate Node Source](/manual/projects/resource-model-sources/ecs-fargate).
This retrieves the ECS containers and presents them as nodes in Process Automation:

<img style='border:1px solid #327af6' src="@assets/img/aws-ecs-node-inventory.png" />

Once the containers have been added as nodes, Process Automation can send commands to them.  This can be done through the **Commands** tab, or using the **Remote Command** Job step:

#### Ad-hoc Commands through the Commands Tab

1. Navigate to the **Commands** tab in the sidebar menu.<br><br>
2. In the Node Filter field, type in a Node Filter to specify the containers that the command should execute on.  For example, **`ECS:Container-Image: spring.*`** filters only the containers
where the container image starts with `spring`:
   <img style='border:1px solid #327af6' src="@assets/img/aws-ecs-node-filter.png" /><br><br>
3. In the **Enter a command** field, provide the command to be executed on the filtered containers. Click on **Run on 1 Node**.
   <img style='border:1px solid #327af6' src="@assets/img/aws-ecs-node-executor-command.png" /><br>

#### Remote Command Job Step

1. In a new or existing Job, click on **Add a step**.<br><br>
2. In the **Node Steps** tab, click on **Command**.<br><br>
3. Provide the command to send to the container and click **Save** to save the Job step:
   <img style='border:1px solid #327af6' src="@assets/img/aws-ecs-remote-command-step.png" /><br><br>
4. Towards the top of the page, click on the **Nodes** tab to modify the target Nodes for the Job.<br><br>
5. The toggle should be set to **Dispatch to Nodes**.<br><br>
6. In the **Node Filter** field, provide a filter that selects the containers that the commands should be executed on. For example, **`ECS:Container-Image: spring.*`**:
   <img style='border:1px solid #327af6' src="@assets/img/aws-ecs-job-node-filter.png" /><br><br>
7. Click **Save** at the bottom of the page to save the Job configuration.

## Example Job: Java Thread Dump from ECS Container
A sample implementation of executing commands on ECS containers can be seen in our [**Automated Diagnostics Solution**](/learning/solutions/automated-diagnostics/solution-overview).