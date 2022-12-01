# Amazon ECS-Fargate Node Source

::: enterprise
:::

**Amazon ECS** is a fully managed container orchestration service that makes it easy for you to deploy, manage, and scale containerized applications.

AWS **Fargate** is a serverless compute engine that is compatible with both Amazon Elastic Container Service (ECS) and Amazon Elastic Kubernetes Service (EKS).

The **Amazon ECS-Fargate Node Source** retrieves the running containers in ECS and adds them to the Node Inventory in **PagerDuty Process Automation** and **Runbook Automation**:

![ECS Node Attributes](@assets/img/aws-ecs-node-attributes.png)<br>

This plugin is designed to work in tandem with the [ECS Node Executor](/manual/projects/node-execution/aws-ecs) to send commands to containers.

## Configuration

You can add the **ECS-Fargate Node Source** by navigating to:<br>
**Project Settings** -> **Edit Nodes** -> **Sources**

Click on **Add a new Node Source +** and then select **AWS / ECS / Resource Model**:

![ECS Add Node Source](@assets/img/aws-ecs-add-node-source.png)<br>

### Authentication

The plugin can integrate with AWS using either Access Key and Secret Key, or by leveraging the IAM Role associated with the EC2 instance or ECS container that Process Automation is running on.

#### Option 1: Authentication with Access Keys

1. To create an Access Key ID and Secret that is associated with an IAM Role, follow [these instructions](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).<br><br>
2. Once the keys have been downloaded, add the Secret Key into Project or System **Key Storage** using the **Password** key type, following [these instructions](/manual/system-configs.html#key-storage).<br><br>
3. Place the **Access Key** to the first field.<br><br>
4. Click on **Select** for the **Secret Key** field. Select the Secret Key that was saved to Key Storage in **Step 2**.<br><br>
   <img style='border:1px solid #327af6' src="@assets/img/aws-ecs-node-source-access-keys.png" />

#### Option 2: Authentication with Instance or Container Role

If Process Automation is self-hosted and running on either an EC2 instance or an ECS container, then the plugin can leverage the IAM Role that has been associated with the instance or container.
For instructions on how to associate an IAM Role to an EC2, click [here](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html), and for ECS Task Roles, click [here](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html).

Once the IAM Role has been associated with the Instance or Container, simply select **instance** or **container** from the **Credential Provider** property:
<img style='border:1px solid #327af6' src="@assets/img/aws-ecs-node-source-cred-provider.png" />

:::tip Note
If using the Credential Provider, then the Access Key and Secret key properties do **not** need to be filled.
:::

**Region**: Select the AWS region where your ECS Cluster resides.

### Filtering Clusters, Services, Tasks

Use the following fields to filter the ECS resources that should be added to the node inventory:

#### **ECS Clusters** 
This is a comma-separated list of ECS clusters. If multiple clusters are defined, then by default all Tasks from those cluster will be added to the node inventory.  
Use the filters below to further specify which Tasks should be retrieved.
:::tip Note
Only clusters from the **region** selected in the previous step will be identified. To add clusters from other regions, add multiple ECS Node Sources to the project.
:::

The ECS cluster names can be found on the **Clusters** main page in the Console (as shown below) or with the AWS CLI: 

    aws ecs list-clusters

![ECS List Clusters](@assets/img/aws-ecs-list-clusters.png)<br><br>

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

![View ECS Containers on Nodes Page](@assets/img/aws-ecs-node-attributes.png)

By clicking on one of the ECS specific node-attributes, you can filter the nodes page to display just ECS containers - thereby removing all other Node types.
For example, click on **Cluster-ARN** will result in the node-filter **ECS:Cluster-ARN:.*** (as shown in the screenshot above).

In order to filter on a specific subset of containers, click on the spyglass to the right of one of the node-attributes.  
This will filter the nodes page to display strictly the ECS containers that match the selected attribute.  For example, select the spyglass 
to the right of **Container-Image** will filter the displayed containers to those with that specific container image:

![ECS Containers Spyglass](@assets/img/aws-ecs-select-spyglass.png)<br><br>
![ECS Filtered Containers](@assets/img/aws-ecs-filtered-containers.png)<br>

## Executing Commands on ECS Containers

Once the containers have been retrieved as nodes in Process Automation, commands can be executor on one or more containers using the [ECS Node Executor](/manual/projects/node-execution/aws-ecs).