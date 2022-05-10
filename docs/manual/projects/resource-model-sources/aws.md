# Amazon EC2 Node Source
::: enterprise
:::

[Amazon's EC2](https://aws.amazon.com/ec2/) (Elastic Cloud Compute) is a cloud service that provides on-demand and scalable virtual-machines for dynamic infrastructure. 
It is one of the most popular cloud services used for developing, testing and hosting applications for businesses.

In order to automate tasks on EC2's - such as executing commands or rebooting - the instances must be populated into the automation product's [Node Inventory](/manual/projects/resource-model-sources/).

The **EC2 Node Source** bundled into Runbook Automation - and accessible to Community users [here](https://github.com/rundeck-plugins/rundeck-ec2-nodes-plugin) - retrieves the EC2 instances from one or more regions
and allows for targeted automation based off of instance-properties, tags, regions or Account ID's.

[comment]: <> (For Rundeck, we would like to have a way of querying the EC2 service to see what EC2 Instances are available for use as Rundeck Nodes.)

[comment]: <> (Amazon has a well-defined API for communication with their services, which would allow us to pull out the EC2 data, and generate XML if we wanted to. )

[comment]: <> (We could write a script that produces that data and use that script on a server to produce data via a URL, or we could use that script with the [script resource model source plugin]&#40;/manual/projects/resource-model-sources/builtin.md#script-resource-model-source-configuration&#41; to generate it. This would give us complete control of the output, but does require extra work.)

[comment]: <> (However, there is already an Open Source plugin to do this: [Rundeck EC2 Nodes Plugin]&#40;https://github.com/rundeck-plugins/rundeck-ec2-nodes-plugin&#41;.)

[comment]: <> (- [rundeck-ec2-nodes-plugin]&#40;https://github.com/rundeck-plugins/rundeck-ec2-nodes-plugin&#41; project source code on GitHub.)

[comment]: <> (- [Download the binary distribution]&#40;https://github.com/rundeck-plugins/rundeck-ec2-nodes-plugin/downloads&#41;.)

## Configuring

1. Copy the plugin file _rundeck-ec2-nodes-plugin-1.2.jar_ into your `$RDECK_BASE/libext` directory. The plugin contains all of the required dependencies. _(Already installed on Enterprise Edition)_
2. Login to Rundeck with an administrator account, and browse to a project _or_ create a new project.
3. Once inside a Project click **Project Settings** > **Edit Nodes** and choose **Sources** tab.
4. Click **Add a New Node Source** and select the _AWS EC2 Resources_ type.
5. Enter the configuration details (see below) for the plugin and click **Save**.
6. Click **Save** for the full Node Source Configuration.

Minimal configuration details for the plugin includes your AWS access credentials you can find here <https://console.aws.amazon.com/iam/home>

_Access Key ID_
: Specify your AWS Access key.

_Secret Key_
: Specify your AWS Secret Key

Read about the other configuration details in the [readme](https://github.com/rundeck-plugins/rundeck-ec2-nodes-plugin/blob/master/Readme.md) for the rundeck-ec2-nodes-plugin.

## Filtering EC2 Results

It is possible to manage the set of Nodes that gets returned from the plugin by organizing EC2 instances using EC2 Tags, as well as adding EC2 Filters to the plugin configuration.

The EC2 plugin will automatically add tags for the nodes based on an EC2 Instance Tag named "Rundeck-Tags", as well as the Instance's state. Add "Mapping parameters" to the EC2 Plugin configuration to add additional tags.

Add filters to the EC2 Plugin configuration under the "Filter Params" configuration area, with the syntax of: `filter=value;filter2=value2`. The available filter names are listed in [AWS API - DescribeInstances](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeInstances.html).

## Additional Information

More configuration is available for the [rundeck-ec2-nodes-plugin project](https://github.com/rundeck-plugins/rundeck-ec2-nodes-plugin).
