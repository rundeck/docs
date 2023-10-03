## AWS ELB Workflow Steps

:::enterprise
:::

Elastic Load Balancing (ELB) is an AWS service that automatically distributes incoming application traffic across multiple targets and virtual appliances in one or more Availability Zones (AZs).

The following ELB plugins are available for PagerDuty Runbook Automation and Process Automation:

* [Target Group Instance Statuses](#target-group-instance-statuses)

### Authentication
Follow the instructions outlined in the [AWS Plugins Overview](/docs/manual/plugins/aws-plugins-overview.html) for Process Automation to authenticate with AWS.

When defining the IAM Role for Runbook Automation or Process Automation, be sure to include the following permissions in the Policy associated with the role:

* **`loadBalancing:describeLoadBalancers`**
* **`loadBalancing:describeTargetGroups`**
* **`loadBalancing:describeTargetHealth`**

### Target Group Instance Statuses
The **AWS / ELB / Target Unhealthy** plugin is a Workflow Step that checks to see if any instances within the Target Groups of a particular ELB are reporting _unhealthy_:

![ELB Status Plugin](/assets/img/aws-elb-status-check-plugin.png)<br>

Identifying unhealthy instances for a given load balancer can be a challenge because there can be multiple target-groups associated with a given load balancer, and multiple instances associated within a Target Group.
This plugin checks all instances for all Target Groups "within" a given ELB and returns any that are "unhealthy."

#### Plugin Field Descriptions

* **Target Load Balancer**: The name of the Elastic Load Balancer (ELB) that routes traffic to the Target Group instances.
* **Target Load Balancer Region**: The AWS region where the ELB resides.

### See it in Action
This plugin is used in one of the prebuilt Jobs in our [**_Automated Diagnostics Solution_**](/learning/solutions/automated-diagnostics/solution-overview).
Try out the Solution to see how this plugin can be used as part of incident-response workflows.
