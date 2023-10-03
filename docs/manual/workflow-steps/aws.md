# Amazon Web Services EC2 - Workflow Steps


## Getting Started

[Amazon's EC2](https://aws.amazon.com/ec2/) (Elastic Cloud Compute) is a cloud service in wide use for dynamic infrastructure; it is easy to start up and shut down Node "Instances" in the cloud.  Use these Job steps to automate common EC2 actions.

### Authentication
Follow the instructions outlined in the [AWS Plugins Overview](/manual/plugins/aws-plugins-overview.html) for Process Automation to authenticate with AWS.

When defining the IAM Role for Runbook Automation or Process Automation, be sure to include the following permissions in the Policy associated with the role:

* **`ec2:StartInstances`** - For the **AWS / VM / Start** step.
* **`ec2:StopInstances`** - For the **AWS / VM / Stop** step.
* **`ec2:terminateInstances`** - For the **AWS / VM / Delete** step.
* **`ec2:createSnapshot`** - For the **AWS / VM / CaptureSnapshot** step.
* **`logs:createLogStream`** - For the **AWS / Cloud / Audit / Trail / Logs** step.
* **`ec2:createFlowLogs`** - For the **AWS / Configure / Vpc / Logs / Instance / Groups** step.
* **`ec2:runInstances`** - For the **AWS / Create / Resource** step.
* **`ec2:createVPCPeeringConnection`** - For the **AWS / EnableVPC / NetworkPeering** step.
* **`autoScaling:updateAutoScalingGroup`** - For the **AWS / Autoscaling / Update / Groups** step.


## EC2 VM Workflow Steps (Enterprise Only)

For most of these steps an **Instance ID** will need to be included for the instance to be acted on.

### AWS / VM / Start

Start the EC2 instance.

### AWS / VM / Stop

Stop the EC2 instance.

### AWS / VM / Delete

Terminate the EC2 instance.

:::danger
 Be very careful when using this step.  It would be possible to remove a lot of instances by mistake if the node filter is too broad.
:::

## AWS / VM / CaptureSnapshot

Captures a Snapshot of the specified instance.

Provide a **Snapshot Name** for the newly created Snapshot, and **Volume ID** that the snapshot will be taken from.

## AWS / Cloud / Audit / Trail / Logs

Creates a log stream for the specified log group using log group name and log stream name.

Include the **Log Group Name** and **Log Stream Name**

## AWS / Configure / Vpc / Logs / Instance / Groups

Creates one or more flow logs to capture information about IP traffic for a specific network interface, subnet, or VPC.

## AWS / Create / Resource

Create EC2 resource from existing snapshots

## AWS / EnableVpc / NetworkPeering

Requests a VPC peering connection between two VPCs.

## AWS / Autoscaling / Update / Groups

Updates the configuration for the specified Auto Scaling group.
