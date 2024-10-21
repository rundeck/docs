## AWS RDS Workflow Steps

:::enterprise
:::

Amazon Relational Database Service (RDS) is a collection of managed services that makes it simple to set up, operate, and scale databases in the cloud.

The following RDS plugins are available for PagerDuty Runbook Automation:

* [**RDS Instance Status** (AWS / RDS / Status)](#rds-instance-status)
* [**Start RDS Instance** (AWS / RDS / Cluster / Start)](#start-rds-cluster)
* [**Stop RDS Instance** (AWS / RDS / Cluster / Stop)](#stop-rds-cluster)
* [**Capture RDS Instance Snapshot** (AWS / RDS / Instance / Capture / Snapshot)](#capture-rds-instance-snapshot)
* [**Start RDS Instance** (AWS / RDS / Instance / Start)](#start-rds-instance)
* [**Stop RDS Instance** (AWS / RDS / Instance / Stop)](#stop-rds-instance)

### Authentication
Follow the instructions outlined in the [AWS Plugins Overview](/manual/plugins/aws-plugins-overview.md) for Runbook Automation to authenticate with AWS.

When defining the IAM Role for Runbook Automation, be sure to include the following permissions in the Policy associated with the role:

* **`rds:describeDBInstances`**

### RDS Instance Status

The **AWS / RDS / Status** plugin checks on the status of an existing RDS database instance:

![RDS Plugin Output](/assets/img/aws-rds-status-output.png)<br>

This can be especially useful when your RDS instance has run out of storage capacity, or when there are other issues with the instance availability.

#### Plugin Field Descriptions

* **Target RDS Instance**: The RDS database instance name. In AWS, this is the **DB identifier**.
* **Target RDS Region**: The AWS region where the RDS instance resides.

#### See it in Action
This plugin is used in one of the prebuilt Jobs in our [**_Automated Diagnostics Solution_**](/learning/solutions/automated-diagnostics/index.md).
Try out the Solution to see how this plugin can be used as part of incident-response workflows.

### Start RDS Cluster

The **AWS / RDS / Start** plugin starts an existing RDS database instance.

![RDS Start Plugin Output](/assets/img/rds-start-cluster.png)<br>

#### Plugin Field Descriptions

* **Cluster Name**: The RDS database cluster name. In AWS, this is the **DB identifier**.
* **Region**: The AWS region where the RDS cluster resides.

### Stop RDS Cluster

The **AWS / RDS / Stop** plugin stops an existing RDS database cluster.

![RDS Stop Cluster](/assets/img/rds-stop-cluster.png)<br>

#### Plugin Field Descriptions

* **Cluster Name**: The RDS database cluster name. In AWS, this is the **DB identifier**.
* **Region**: The AWS region where the RDS cluster resides.

### Capture RDS Instance Snapshot

The **AWS / RDS / Instance / Capture / Snapshot** plugin captures a snapshot of an existing RDS database instance.

![RDS Snapshot Plugin Output](/assets/img/rds-capture-snapshot.png)<br>

#### Plugin Field Descriptions

* **Instance Name**: The RDS database instance name. In AWS, this is the **DB identifier**.
* **Snapshot Name**: The name of the snapshot to be created.

### Start RDS Instance

The **AWS / RDS / Instance / Start** plugin starts an existing RDS database instance.

#### Plugin Field Descriptions

* **Instance Name**: The RDS database instance name. In AWS, this is the **DB identifier**.
* **Region**: The AWS region where the RDS instance resides.

### Stop RDS Instance

The **AWS / RDS / Instance / Stop** plugin stops an existing RDS database instance.

#### Plugin Field Descriptions

* **Instance Name**: The RDS database instance name. In AWS, this is the **DB identifier**.
* **Region**: The AWS region where the RDS instance resides.