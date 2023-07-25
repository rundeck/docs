## AWS RDS Workflow Steps

:::enterprise
:::

Amazon Relational Database Service (RDS) is a collection of managed services that makes it simple to set up, operate, and scale databases in the cloud.

The following RDS plugins are available for PagerDuty Runbook Automation and Process Automation:

* [RDS Instance Status](#rds-instance-status)

### Authentication
Follow the instructions outlined in the [AWS Plugins Overview](/docs/manual/plugins/aws-plugins-overview.html) for Process Automation to authenticate with AWS.

When defining the IAM Role for Runbook Automation or Process Automation, be sure to include the following permissions in the Policy associated with the role:

* **`rds:describeDBInstances`**

### RDS Instance Status

The **AWS / RDS / Status** plugin checks on the status of an existing RDS database instance:

![RDS Plugin Output](@assets/img/aws-rds-status-output.png)<br>

This can be especially useful when your RDS instance has run out of storage capacity, or when there are other issues with the instance availability.

#### Plugin Field Descriptions

* **Target RDS Instance**: The RDS database instance name. In AWS, this is the **DB identifier**.
* **Target RDS Region**: The AWS region where the RDS instance resides.

### See it in Action
This plugin is used in one of the prebuilt Jobs in our [**_Automated Diagnostics Solution_**](/learning/solutions/automated-diagnostics/solution-overview).
Try out the Solution to see how this plugin can be used as part of incident-response workflows.
