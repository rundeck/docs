# Amazon Web Services EC2 - Workflow Steps

Amazon EC2 (Elastic Cloud Compute) is a cornerstone service of AWS that provides scalable computing capacity in the cloud. These workflow steps enable automated management of your EC2 infrastructure through Runbook Automation, allowing you to programmatically control instance lifecycles, networking, monitoring, and scaling operations.

## Benefits

- Automate routine infrastructure management tasks
- Standardize operational procedures
- Reduce human error in cloud operations
- Enable consistent deployment and management practices
- Streamline scaling and resource optimization

## Authentication

Follow the instructions outlined in the [AWS Plugins Overview](/manual/plugins/aws-plugins-overview.md) for Runbook Automation to authenticate with AWS.

When defining the IAM Role for Runbook Automation, be sure to include the following permissions in the Policy associated with the role:

**Core Instance Management:**

`ec2:StartInstances`
`ec2:StopInstances`
`ec2:terminateInstances`
`ec2:runInstances`
`ec2:createSnapshot`
`Networking and Monitoring:`

**Networking and Monitoring:**

`ec2:createFlowLogs`
`ec2:createVPCPeeringConnection`
`logs:createLogStream`
`Scaling Operations:`

**Scaling Operations**

`autoScaling:updateAutoScalingGroup`

## EC2 VM Workflow Steps (Enterprise Only)

For most of these steps an **Instance ID** will need to be included for the instance to be acted on.  

::: tip
Since these are workflow steps, the node inventory is not used as part of these steps.   [More details on the AWS node-steps here](/manual/jobs/job-plugins/node-steps/aws.md).
:::

### AWS / VM / Start

This step initiates and boots up a specified EC2 instance, bringing it online and ready for use. This is crucial for businesses that need to dynamically scale their computing resources during peak hours or need to start pre-configured instances for specific workloads

### AWS / VM / Stop

This step safely shuts down a specified EC2 instance, ensuring all processes are properly terminated. This capability is essential for cost optimization by stopping unused instances during off-hours and managing resource utilization effectively.

### AWS / VM / Delete

This step permanently terminates and removes an EC2 instance from your AWS environment, freeing up associated resources. This is important for cleaning up unused resources to reduce costs and maintain a clean infrastructure, though it should be used with extreme caution as the action is irreversible.

:::danger
 Be very careful when using this step.
:::

## AWS / VM / CaptureSnapshot

This step creates a point-in-time backup copy of an EC2 instance's volume, preserving its data and configuration. Snapshots are vital for disaster recovery, creating backup copies before major changes, or creating new instances with the same configuration.

Provide a **Snapshot Name** for the newly created Snapshot, and **Volume ID** that the snapshot will be taken from.

## AWS / Cloud / Audit / Trail / Logs

This step establishes a log stream within CloudWatch for tracking and monitoring AWS resource activities. Having proper logging is essential for security compliance, troubleshooting issues, and maintaining audit trails of infrastructure changes.

Include the **Log Group Name** and **Log Stream Name**

## AWS / Configure / Vpc / Logs / Instance / Groups

This step sets up VPC flow logs to monitor network traffic patterns across your AWS infrastructure components. This visibility is crucial for security monitoring, network troubleshooting, and ensuring compliance with network policies.

## AWS / Create / Resource

This step provisions new EC2 instances using existing snapshots as templates, allowing for consistent deployment of pre-configured environments. This capability is valuable for quickly deploying standardized environments and maintaining consistency across your infrastructure.

## AWS / EnableVpc / NetworkPeering

This step establishes secure connectivity between two VPCs, enabling resources in different VPCs to communicate as if they were on the same network. Network peering is essential for businesses running multiple VPCs that need to share resources or data while maintaining network isolation.

## AWS / Autoscaling / Update / Groups

This step modifies the configuration of Auto Scaling groups, allowing you to adjust how your application scales in response to demand. Proper auto-scaling configuration is critical for maintaining application performance while optimizing costs by automatically adjusting resource capacity based on actual usage.
