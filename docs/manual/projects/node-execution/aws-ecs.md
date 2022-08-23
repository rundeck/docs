#  AWS Elastic Container Service (ECS) Node Executor
::: enterprise
:::

## About Amazon ECS

**Amazon ECS** is a fully managed container orchestration service that makes it easy for you to deploy, manage, and scale containerized applications.

AWS **Fargate** is a serverless compute engine that is compatible with both Amazon Elastic Container Service (ECS) and Amazon Elastic Kubernetes Service (EKS).

## About the ECS Node Executor

The **Amazon ECS Node Executor** provides the ability to send commands to one or multiple containers running on ECS.

Sending commands to ECS containers makes it easier to collect diagnostic information and quickly troubleshoot errors. For example, in development,
this allows you to easily interact with various processes in your containers and troubleshoot your applications. In production scenarios,
this enables you to gain break-glass access to your containers to debug issues.

This plugin is designed to work in conjunction with the [ECS-Fargate Node Source](/manual/projects/resource-model-sources/ecs-fargate).

## Using the ECS Node Executor

### Configuration Prerequisites

#### Configuring ECS Task and Service Definitions

1. Attach a **Task IAM Role** to the **Task Definition** that grants them the permissions needed for communication between the managed SSM agent (`execute-command` agent) and the SSM service.
   Use the following policy and attach it to your task definition as explained [**here**](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html).
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
3. **[Optional]** If you set the task definition parameter `initProcessEnabled` to **`true`**, this starts the init process inside the container,
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
   
#### Configuring Process Automation Permissions

The following permissions must be provided to the IAM Role that is assigned to Process Automation - 
either through Access Key and Secret or assigning an IAM Role to the instance that Process Automation is running on:

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

#### Configure the ECS Node Source within Process Automation

### Executing Commands

In order to send commands to ECS Containers, first configure the [ECS-Fargate Node Source](/manual/projects/resource-model-sources/ecs-fargate).
This retrieves the ECS containers and presents them as nodes in Process Automation:


