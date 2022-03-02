#  Amazon Web Services (AWS) Node Steps

## Getting Started

:::tip
It is helpful to configure the AWS EC2 resource model plugin before using these steps: [AWS EC2 Resource Model](/manual/projects/resource-model-sources/aws.md)
:::

[Amazon's EC2](https://aws.amazon.com/ec2/) (Elastic Cloud Compute) is a cloud service in wide use for dynamic infrastructure; it is easy to start up and shut down Node "Instances" in the cloud.  Use these Rundeck steps to automate common EC2 actions.

**Access Key ID**
: Specify your AWS Access key.

**Secret Key**
: Specify your AWS Secret Key

**Region**
: Specify the region for the node.  If using the EC2 Node Source it's possible to use `${node.region}` and the region will be dynamically populated with the region for that node.

## EC2 VM Node Steps (Enterprise Only)

### AWS / VM / Start

Start the EC2 instance.

### AWS / VM / Stop

Start the EC2 instance.

### AWS / VM / Restart

Start the EC2 instance.

### AWS / VM / Delete

Terminate the EC2 instance.

:::danger
 Be very careful when using this step.  It would be possible to remove a lot of instances by mistake if the node filter is too broad.
:::
