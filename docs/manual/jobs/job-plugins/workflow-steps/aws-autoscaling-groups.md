## AWS Autoscaling Group Workflow Steps

:::enterprise
:::

AWS Autoscaling Groups (ASG) are a collection of EC2 instances that are managed by an Auto Scaling group. The ASG ensures that the desired number of instances are running at all times. The ASG also automatically adjusts the number of instances in response to demand or other conditions defined by the user.

The following ASG plugins are available for PagerDuty Runbook Automation:

* [**Update Autoscaling Group** (AWS / Autoscaling / Update / Groups)](#update-autoscaling-group)

![ASG Plugin](/assets/img/aws-update-autoscaling-group.png)<br>

### Authentication

Follow the instructions outlined in the [AWS Plugins Overview](/manual/plugins/aws-plugins-overview.md) for Runbook Automation to authenticate with AWS.

When defining the IAM Role for Runbook Automation, be sure to include the following permissions in the Policy associated with the role:

* **`autoscaling:UpdateAutoScalingGroup`** - Necessary for the _**Update Autoscaling Group**_ plugin.

### Update Autoscaling Group

The **AWS / Autoscaling / Update / Groups** plugin is a workflow step that updates the desired capacity of an existing Autoscaling Group in AWS. The plugin requires the following fields:

* **Region**: AWS region to choose. Leave blank to set it at project (`project.aws.region`) or framework level (`aws.region`).
    * Example: `us-west-2`
* **Auto Scaling Group Name**: Name of the autoscaling group to update.
    * Example: `my-auto-scaling-group`
* **Desired Capacity**: The desired capacity is the initial capacity of the Auto Scaling group after this operation completes and the capacity it attempts to maintain.
    * Example: `3`
* **Max Size**: The maximum size of the Auto Scaling group.
    * Example: `5`
* **Min Size**: The minimum size of the Auto Scaling group.
    * Example: `1`