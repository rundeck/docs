## AWS VPC Workflow Steps

:::enterprise
:::

AWS VPC (Virtual Private Cloud) is a service that contains AWS resources in a virtual network. Users define their own network topology, configure their own IP address range, and create subnets.

The following VPC plugins are available for PagerDuty Runbook Automation:

* [**Configure VPC Flow Logs** (AWS / Configure / VPC / Logs)](#configure-vpc-flow-logs)
* [**Enable VPC Network Peering** (AWS / Enable VPC / Network Peering)](#enable-vpc-network-peering)

### Authentication

Follow the instructions outlined in the [AWS Plugins Overview](/manual/plugins/aws-plugins-overview.md) for Runbook Automation to authenticate with AWS.

When defining the IAM Role for Runbook Automation, be sure to include the following permissions in the Policy associated with the role:

* **`ec2:CreateFlowLogs`** - Necessary for the _**Configure VPC Flow Logs**_ plugin.
* **`ec2:CreateVpcPeeringConnection`** - Necessary for the _**Enable VPC Network Peering**_ plugin.

Optionally authenticate within the Workflow Step itself by configuring the AWS Credentials.

### Configure VPC Flow Logs

The VPC Flow Log plugin provides a workflow step to create flow logs for VPC, Subnet, or Network Interface in AWS.

![VPC Flow Logs Plugin](/assets/img/vpc-flow-logs-plugin.png)<br>

The plugin requires the following fields:

* **Region**: AWS region to choose. Leave blank to set it at project (`project.aws.region`) or framework level (`aws.region`).
    * Example: `us-west-2`
* **Resource ID**: The ID of the subnet, network interface, or VPC for which you want to create a flow log.
    * Example: `subnet-12345678`
* **Resource Type**: Enter the resource type (VPC, Subnet, NetworkInterface).
    * Example: `VPC`
* **Traffic Type**: Enter the traffic type (Accept, Reject, All).
    * Example: `All`
* **Arn**: The ARN for the IAM role that permits Amazon EC2 to publish flow logs to a CloudWatch Logs log group in your account.
    * Example: `arn:aws:iam::123456789012:role/flow-log-role`
* **Log Group Name**: The name of a new or existing CloudWatch Logs log group where Amazon EC2 publishes your flow logs.
    * Example: `my-flow-logs`

### Enable VPC Network Peering

![VPC Network Peering Plugin](/assets/img/aws-vpc-peering-plugin.png)<br>

The **AWS / VPC / Enable Peering** plugin is a Node Step that enables VPC network peering between two VPCs in AWS. The plugin requires the following fields:

* **Region**: AWS region to choose. Leave blank to set it at project (`project.aws.region`) or framework level (`aws.region`).
    * Example: `us-west-2`
* **VPC ID**: Enter the VPC ID.
    * Example: `vpc-12345678`
* **Peer VPC ID**: Enter the Peer VPC ID.
    * Example: `vpc-87654321`
