## AWS Elastic Container Service (ECS) Workflow Steps

:::enterprise
:::

Amazon ECS is a fully managed container orchestration service that makes it easy for you to deploy, manage, and scale containerized applications.

The following plugins are available for PagerDuty Runbook Automation and Process Automation (formerly Rundeck Enterprise):

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


#### Stopped ECS Tasks Error Messages

The **AWS / ECS / Stopped Task Details** plugin checks a specified cluster for any **Stopped** ECS Tasks and provides their associated error messages:

![Stopped ECS Error](@assets/img/aws-ecs-stopped-task-errors.png)<br>

In order to use this plugin, you mused specify the **ECS Cluster Name**.

The IAM Policies required to use this plugin are:
* **`ecs:ListTasks`**
* **`ecs:DescribeTasks`**

See [here](https://docs.aws.amazon.com/AmazonECS/latest/userguide/stopped-task-error-codes.html) for more details on the Stopped ECS Tasks error message meanings.

#### Stop an ECS Task

The **AWS / ECS / Stop** plugin _stops_ a specific ECS Task. This can assist with auto-remediation of issues with ECS containers. There is both a **Workflow** _and_ a **Node** step of this plugin.

In order to use the _Workflow_ step plugin, you will need to specify the Cluster-ID (or ARN) _and_ the Task-ID (or ARN):

![Stop ECS Task](@assets/img/aws-ecs-stop-task.png)<br>

The IAM Policies required to use this plugin are:
* **`ecs:StopTask`**