# Amazon ECS-Fargate Node Source

::: enterprise
:::

**Amazon ECS** is a fully managed container orchestration service that makes it easy for you to deploy, manage, and scale containerized applications.

AWS **Fargate** is a serverless compute engine that is compatible with both Amazon Elastic Container Service (ECS) and Amazon Elastic Kubernetes Service (EKS).

The **Amazon ECS-Fargate Node Source** retrieves the running containers in ECS and adds them to the Node Inventory in **PagerDuty Process Automation** and **Runbook Automation**:

![ECS Node Attributes](@assets/img/aws-ecs-node-attributes.png)<br>

## Configuration

You can add the **ECS-Fargate Node Source** by navigating to:<br>
**Project Settings** -> **Edit Nodes** -> **Sources**

Click on **Add a new Node Source +** and then select **AWS / ECS-Fargate / Resource Model**:

![ECS Add Node Source](@assets/img/aws-ecs-add-node-source.png)<br>

To retrieve running ECS containers, fill in the following fields:

**Access Key ID**: The Access Key for your AWS account.<br>
**Secret Key Path**: Click the **Select** button to navigate to your AWS Secret in [Key Storage.](/manual/key-storage/key-storage)<br>
**Region**: Select the AWS region where your ECS Cluster resides.<br>
**ECS/Fargate Cluster Name**: The name of the ECS Cluster. This can be found on the **Clusters** main page in the Console (as shown below) or with the AWS CLI: 

    aws ecs list-clusters

![ECS List Clusters](@assets/img/aws-ecs-list-clusters.png)<br><br>

## Viewing ECS Containers

Once configured, the Node Source will retrieve all running tasks in the specified cluster and list them on the **Nodes** page:

![View ECS Containers on Nodes Page](@assets/img/aws-ecs-node-attributes.png)

By clicking on one of the ECS specific node-attributes, you can filter the nodes page to display just ECS containers - thereby removing all other Node types.
For example, click on **Cluster-ARN** will result in the node-filter **ECS:Cluster-ARN:.*** (as shown in the screenshot above).

In order to filter on a specific subset of containers, click on the spyglass to the right of one of the node-attributes.  
This will filter the nodes page to display strictly the ECS containers that match the selected attribute.  For example, select the spyglass 
to the right of **Container-Image** will filter the displayed containers to those with that specific container image:

![ECS Containers Spyglass](@assets/img/aws-ecs-select-spyglass.png)<br><br>
![ECS Filtered Containers](@assets/img/aws-ecs-filtered-containers.png)<br>