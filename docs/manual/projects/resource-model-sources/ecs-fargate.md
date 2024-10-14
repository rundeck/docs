# Amazon ECS-Fargate Node Source

::: enterprise
:::

**Amazon ECS** is a fully managed container orchestration service that makes it easy for you to deploy, manage, and scale containerized applications.

AWS **Fargate** is a serverless compute engine that is compatible with both Amazon Elastic Container Service (ECS) and Amazon Elastic Kubernetes Service (EKS).

The **Amazon ECS-Fargate Node Source** retrieves the running containers in ECS and adds them to the Node Inventory in **Runbook Automation**:

![ECS Node Attributes](/assets/img/aws-ecs-node-attributes.png)<br>

This plugin is designed to work in tandem with the [ECS Node Executor](/manual/projects/node-execution/aws-ecs) to send commands to containers.

## Configuration

### AWS Permissions
In order for Runbook Automation to discover the ECS Tasks and populate them into the node inventory, proper IAM permission must be provided.
The following permissions are required, but can be restricted in scope:
**`ecs:ListTasks`**
**`ecs:ListServices`**
**`ecs:DescribeTasks`**
**`ecs:ListTagsForResource`**

If you wish to discover ECS Tasks from _all_ ECS clusters, then you will also need:
**`ecs:ListClusters`**

Here is a sample IAM Policy that will allow you to discover Tasks from **_all_ clusters**:
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "ecs:ListServices",
                "ecs:DescribeTasks",
                "ecs:ListTasks",
                "ecs:ListTagsForResource",
                "ecs:ListClusters"
            ],
            "Resource": "*"
        }
    ]
}
```

Here is a sample IAM Policy that will only discover Tasks from **_specific_ clusters**:
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "ecs:ListServices",
                "ecs:DescribeTasks",
                "ecs:ListTasks"
            ],
            "Resource": "*",
            "Condition": {
                "ArnEquals": {
                    "ecs:cluster": "arn:aws:ecs:us-west-1:<<AccountID>>:cluster/<<clusterName>>"
                }
            }
        },
        {
            "Sid": "VisualEditor1",
            "Effect": "Allow",
            "Action": [
                "ecs:ListTagsForResource"
            ],
            "Resource": [
                "arn:aws:ecs:us-west-1:<<AccountID>>:task/*",
                "arn:aws:ecs:us-west-1:<<AccountID>>:cluster/<<clusterName>>"
            ]
        }
    ]
}
```

Once the IAM Policy has been created, attach it to the IAM Role that you have associated with Runbook Automation or the Access Key credentials.

### Authentication
There are multiple ways for Runbook Automation to authenticate with AWS. Follow the instructions outlined in the [AWS Plugins Overview](/manual/plugins/aws-plugins-overview.md) for Runbook Automation to authenticate with AWS.

#### Assume Role ARN

There are cases when it is beneficial to use a different IAM Role than the one used for the [AWS PluginGroup](/manual/plugins/aws-plugins-overview.md#setup) for the integration to retrieve the ECS Tasks and add them to the node inventory.
For example, to target ECS Tasks from across multiple AWS Accounts, then a different IAM Role needs to be "assumed" in order to retrieve tasks from each AWS Account.  

The **Assume Role ARN** field can be populated with an IAM Role ARN that Runbook or Runbook Automation can assume _after_ an authentication method has been provided through the PluginGroup.


### Add Node Source
You can add the **ECS-Fargate Node Source** by navigating to:<br>
**Project Settings** -> **Edit Nodes** -> **Sources**

Click on **Add a new Node Source +** and then select **AWS / ECS / Resource Model**:

![ECS Add Node Source](/assets/img/aws-ecs-add-node-source.png)<br>

### Filtering Clusters, Services, Tasks

Use the following fields to filter the ECS resources that should be added to the node inventory:

#### **ECS Clusters** 
This is a comma-separated list of ECS clusters. If multiple clusters are defined, then by default all Tasks from those clusters will be added to the node inventory.  
Use the filters below to further specify which Tasks should be retrieved.
:::tip Note
Only clusters from the **region** selected in the previous step will be identified. To add clusters from other regions, add multiple ECS Node Sources to the project.
:::

The ECS cluster names can be found on the **Clusters** main page in the Console (as shown below) or with the AWS CLI: 

    aws ecs list-clusters

![ECS List Clusters](/assets/img/aws-ecs-list-clusters.png)<br><br>

#### **Filter Behavior** 
Determine whether to include or exclude ECS Tasks that match the following filter properties.  

For example, if the Filter Behavior is **Include** and the **Service Name**
was set to **`calendar-service`**, then only ECS Tasks associated with the "calendar-service" would be retrieved.  On the other hand, if the Filter Behavior is set to **Exclude**, then all ECS
tasks _except_ those associated with the "calendar-service" would be retrieved.

**Service Name**: A comma-separated list of names of Services in the ECS Clusters.  ECS Tasks associated with these Services will either be included or excluded depending on the **Filter Behavior** selected.

**Task Definition Name**: A comma-separated list of names of Task Definitions used in the ECS Clusters.  ECS Tasks associated with these Task Definitions will either be included or excluded depending on the **Filter Behavior** selected.

**Container Name**: A comma-separated list of names of containers in the ECS Clusters.  ECS Tasks associated with these containers will either be included or excluded depending on the **Filter Behavior** selected.

**Tags**: An individual or comma-separated list of key-value pairs. Enter the key, an equals sign (=), followed by the value for each entry, separated by commas. This will filter by if the task has that key-value pair as a tag. For example:

**`appName=OnlineShopping,serviceComponent=ShoppingCart`**

## Viewing ECS Containers

Once configured, the Node Source will retrieve all ECS Tasks in the specified clusters and list them on the **Nodes** page:

![View ECS Containers on Nodes Page](/assets/img/aws-ecs-node-attributes.png)

By clicking on one of the ECS specific node-attributes, you can filter the nodes page to display just ECS containers - thereby removing all other Node types.
For example, click on **Cluster-ARN** will result in the node-filter **ECS:Cluster-ARN:.*** (as shown in the screenshot above).

In order to filter on a specific subset of containers, click on the spyglass to the right of one of the node-attributes.  
This will filter the nodes page to display strictly the ECS containers that match the selected attribute.  For example, select the spyglass 
to the right of **Container-Image** will filter the displayed containers to those with that specific container image:

![ECS Containers Spyglass](/assets/img/aws-ecs-select-spyglass.png)<br><br>
![ECS Filtered Containers](/assets/img/aws-ecs-filtered-containers.png)<br>

## Executing Commands on ECS Containers

Once the containers have been retrieved as nodes in Runbook Automation, commands can be executed on one or more containers using the [ECS Node Executor](/manual/projects/node-execution/aws-ecs).