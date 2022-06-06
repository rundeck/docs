## AWS RDS Workflow Steps

:::enterprise
:::

Amazon Relational Database Service (RDS) is a collection of managed services that makes it simple to set up, operate, and scale databases in the cloud.

The following RDS plugins are available for PagerDuty Runbook Automation and Process Automation (formerly Rundeck Enterprise):

* [RDS Instance Status](#rds-instance-status)

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

### RDS Instance Status

The **AWS / RDS / Status** plugin checks on the status of an existing RDS database instance:

![RDS Plugin Output](@assets/img/aws-rds-status-output.png)<br>

This can be especially useful when your RDS instance has run out of storage capacity, or when there are other issues with the instance availability.

#### Plugin Field Descriptions

* **Target RDS Instance**: The RDS database instance name. In AWS, this is the **DB identifier**
* **Target RDS Region**: The AWS region where the RDS instance resides.

#### See it in Action
This plugin is used in one of the prebuilt Jobs in our [**_Automated Diagnostics Solution_**](/learning/solutions/automated-diagnostics/solution-overview). 
Try out the Solution to see how this plugin can be used as part of incident-response workflows.