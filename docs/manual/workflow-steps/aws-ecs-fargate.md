## AWS Elastic Container Service (ECS) Workflow Steps

:::enterprise
:::

Amazon ECS is a fully managed container orchestration service that makes it easy for you to deploy, manage, and scale containerized applications.

The following plugins are available for PagerDuty Runbook Automation and Process Automation (formerly Rundeck Enterprise):

* [Send Commands to ECS Containers](#send-commands-to-ecs-containers)
* [Stopped ECS Tasks Error Messages](#stopped-ecs-tasks-error-messages)
* [Stop an ECS Task](#stop-an-ecs-task)

These plugins utilize the following properties:

**Access Key ID**
: Specify your AWS Access key.

- **Project setting**: project.aws.access_key
- **Configuration Management**/**Framework Setting**: aws.access_key

**Secret Key**
: Specify the path to your AWS Secret Key in the Rundeck Key Storage

- **Project setting**: project.aws.secret_key_path
- **Configuration Management**/**Framework Setting**: aws.secret_key_path

**Region**
: Specify the region for the node.

- **Project setting**: project.aws.region
- **Configuration Management**/**Framework Setting**: aws.region

### Send Commands to ECS Containers

The **AWS / ECS / Run Command** plugin sends commands to the specified ECS containers:

![ECS Command Example](@assets/img/aws-ecs-command-example.png)<br><br>

Sending commands to ECS containers makes it easier to collect diagnostic information and quickly troubleshoot errors. For example, in development, 
this allows you to easily interact with various processes in your containers and troubleshoot your applications. In production scenarios, 
this enables you to gain break-glass access to your containers to debug issues.

#### Prerequisites
1. This feature requires a Task IAM role to grant containers the permissions needed for communication between the managed SSM agent (execute-command agent) and the SSM service. 
Use the following policy and attach it to your task definition as explained [here](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html).
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


### Stopped ECS Tasks Error Messages

The **AWS / ECS / Stopped Task Details** plugin checks a specified cluster for any **Stopped** ECS Tasks and provides their associated error messages:

![Stopped ECS Error](@assets/img/aws-ecs-stopped-task-errors.png)<br>

In order to use this plugin, you mused specify the **ECS Cluster Name**.

The IAM Policies required to use this plugin are:
* **`ecs:ListTasks`**
* **`ecs:DescribeTasks`**

See [here](https://docs.aws.amazon.com/AmazonECS/latest/userguide/stopped-task-error-codes.html) for more details on the Stopped ECS Tasks error message meanings.

### Stop an ECS Task

The **AWS / ECS / Stop** plugin _stops_ a specific ECS Task. This can assist with auto-remediation of issues with ECS containers. There is both a **Workflow** _and_ a **Node** step of this plugin.

In order to use the _Workflow_ step plugin, you will need to specify the Cluster-ID (or ARN) _and_ the Task-ID (or ARN):

![Stop ECS Task](@assets/img/aws-ecs-stop-task.png)<br>

The IAM Policies required to use this plugin are:
* **`ecs:StopTask`**