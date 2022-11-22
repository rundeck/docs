### Automated Diagnostics Examples
---

## Amazon ECS

#### Introduction
Amazon’s Elastic Container Service (ECS) is a high performance container management service that is being used by many companies as an infrastructure that can manage scalable clusters of managed Docker containers.  It is an increasingly popular service for companies already invested in AWS and who need a flexible and scalable solution for hosting custom applications. Runbook Automation and Process Automation both support ECS environments through three plugins: ECS-Fargate Node Source, ECS Node Executor and ECS Workflow Steps.

#### Amazon ECS-Fargate Node Source
AWS Fargate is a serverless compute engine that is compatible with ECS.  This [node source](/manual/projects/resource-model-sources/ecs-fargate.html) retrieves running containers in ECS and adds them to the Node inventory in Automation.  It can be customized as needed to include only a filtered subset of available containers.  Once these containers are in inventory, they can be accessed using the other two ECS plugins.

#### Amazon ECS Node Executor
The [Amazon ECS Node Executor](/manual/projects/node-execution/aws-ecs.html) provides the ability to send commands to one or multiple containers running on ECS.
Sending commands to ECS containers makes it easier to collect diagnostic information and quickly troubleshoot errors. In development, this allows users to easily interact with various processes in your containers and troubleshoot applications. In production scenarios, this enables break-glass access to containers to debug issues.
Once this executor is configured, it is possible to send ad hoc commands to ECS containers as well as execute jobs against one or more of the nodes from the Fargate node source.  To get you started, there are two ECS-specific jobs included in the Auto Diagnostics Solution job library
![](~@assets/img/ecs1.png)

#### Amazon ECS Workflow Steps
There are 3 ECS-specific workflow steps available for PagerDuty Runbook Automation and Process Automation:
* [Send Commands to ECS Containers](/manual/workflow-steps/aws-ecs-fargate.html#send-commands-to-ecs-containers)<br>
    Uses Amazon’s SSM protocol to communicate with containers and issue commands
* [Stopped ECS Tasks Error Messages](/manual/workflow-steps/aws-ecs-fargate.html#stopped-ecs-tasks-error-messages)<br>
    Checks a specified cluster for any Stopped ECS Tasks and provides their associated error messages
* [Stop an ECS Task](/manual/workflow-steps/aws-ecs-fargate.html#stop-an-ecs-task)<br>
    Available as both a workflow and node step, this can be used to stop a specific ECS task by Cluster-ID or Task-ID

These three plugins have configuration options for authentication and region.  Workflow steps will execute once each time a job is run and do not require nodes to run so could be used independent of the ECS node source and node executor.
