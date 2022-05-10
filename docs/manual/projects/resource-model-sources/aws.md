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

### Basic Configuration

::: warning Note
If using Rundeck Community, then you will first need to download the plugin JAR from the [Github repository](https://github.com/rundeck-plugins/rundeck-ec2-nodes-plugin/releases).
Copy the plugin file _rundeck-ec2-nodes-plugin-1.2.jar_ into your `$RDECK_BASE/libext` directory. 
The plugin contains all of the required dependencies.
:::

1. Navigate to **Project Settings** -> **Edit Nodes** and select the **Sources** tab.
2. Click on **Add a new Node Source** and select **AWS EC2 Resources**.
3. Provide AWS Credentials into the **Access Key** and **Secret Key** fields. The only permissions required for the credentials is `ec2:DescribeInstances`
4. To specify the region (or multiple regions) to integrate with, fill in the **Endpoint** field with the associated regional endpoint. All endpoints are of the syntax **https:ec2.aws-region.amazonaws.com**.
For example, the **us-west-1** endpoint is **`https://ec2.us-west-1.amazonaws.com`**. See below for defining multiple regions.
5. Toggle **Only Running Instances** to determine whether both Running and Stopped instances should be retrieved, or just Running instances.
6. Click **Save** on the Node Source and then click **Save** again on the Sources configuration page.
::: tip
If self-hosting Rundeck in AWS and an IAM Role is assigned to the infrastructure that Rundeck is running on, then you do not need to fill in the **Access Key** and **Secret Key** fields.
:::

### Advanced Configuration Options

* **Assume Role ARN**: Specify an IAM Role that Rundeck should use when authenticating with AWS.<br><br>
* **Synchronous Loading**: Do not use internal async loading behavior. Rundeck 2.6.3+ uses an asynchronous nodes cache by default. You should enable this if you are using the Rundeck nodes cache.<br><br>
* **Async Refresh Interval**: Unless using Synchronous Loading, minimum time in seconds between API requests to AWS (default is 30).<br><br>
* **Filter Params**: Filter which EC2 instances are populated in the Node Inventory using the following syntax: **`filter=value;filter2=value2`**. 
You can specify multiple filters by separating them with `;`, and you can specify multiple values by separating them with `,`.<br>
For example: `tag:MyTag=My_Tag_Value;instance-type=m1.small,m1.large`<br>
The available filter names are listed in [AWS API - DescribeInstances](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeInstances.html).<br><br>
* **HTTP Proxy Host**: If hosting Rundeck behind a proxy-host, define the proxy hostname here.<br><br>
* **HTTP Proxy Port**: If hosting Rundeck behind a proxy-host, define the proxy host port here.<br><br>
* **HTTP Proxy User**: If hosting Rundeck behind a proxy-host with authentication, define the proxy host username here.<br><br>
* **HTTP Proxy Password**: If hosting Rundeck behind a proxy-host with authentication, define the proxy host password here.<br><br>
* **Mapping Params**: Node attributes are configured by mapping EC2 instances properties via a mapping configuration. 
The mapping declares the node attributes that will be set, and what their values will be set to using a "selector" on properties of the EC2 Instance object.
Here is the default mapping:
```
description.default=EC2 node instance
editUrl.default=https://console.aws.amazon.com/ec2/home#s=Instances&selectInstance=${node.instanceId}
hostname.selector=publicDnsName,privateIpAddress
sshport.default=22
sshport.selector=tags/ssh_config_Port
instanceId.selector=instanceId
nodename.selector=tags/Name,instanceId
osArch.selector=architecture
osFamily.default=unix
osFamily.selector=platform
osName.default=Linux
osName.selector=platform
privateDnsName.selector=privateDnsName
privateIpAddress.selector=privateIpAddress
state.selector=state.name
tag.pending.selector=state.name=pending
tag.running.selector=state.name=running
tag.shutting-down.selector=state.name=shutting-down
tag.stopped.selector=state.name=stopped
tag.stopping.selector=state.name=stopping
tag.terminated.selector=state.name=terminated
tags.default=ec2
tags.selector=tags/Rundeck-Tags
username.default=ec2-user
username.selector=tags/Rundeck-User
```
::: tip
You can configure the mapping source to start with the above default mapping with the **Use Default Mapping** property.
Then, selectively change it either by setting the mappingParams or pointing to a new properties file with mappingFile.

For example, you can put this in the mappingParams field in the GUI to change the default tags for your nodes:<br>
**`tags.default=mytag, mytag2;tag.stopping.selector=;ami_id.selector=imageId`**<br>
This would remove the "stopping" tag selector, and add a new "ami_id" selector.
:::
<br>

* **Mapping File**: Filepath to a mapping property-mapping file.<br><br>
* **Use Default Mapping**: Start with default mapping definition. (Defaults will automatically be used if no others are defined).<br><br>
* **Max API Results**: Limit the number of instances retrieved per API call.<br>
<br>

### Integrating with Multiple Regions
In the **Endpoint** field, enter a comma-separated list of endpoints to integrate with multiple regions.  For example:<br> 
`https://ec2.us-west-1.amazonaws.com, https://ec2.us-east-1.amazonaws.com, https://ec2.eu-west-1.amazonaws.com` would integrate with the **us-west-1**, **us-east-1**, and **eu-west-1** regions.<br><br>
You can also input **`ALL_REGIONS`** and this will retrieve instances from all the regions that the provided credentials have access to. 
See [Amazon EC2 Regions and Endpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html#ec2_region) for the full list of endpoints.

### 

It is possible to manage the set of Nodes that gets returned from the plugin by organizing EC2 instances using EC2 Tags, as well as adding EC2 Filters to the plugin configuration.

The EC2 plugin will automatically add tags for the nodes based on an EC2 Instance Tag named "Rundeck-Tags", as well as the Instance's state. Add "Mapping parameters" to the EC2 Plugin configuration to add additional tags.

Add filters to the EC2 Plugin configuration under the "Filter Params" configuration area, with the syntax of: `filter=value;filter2=value2`. The available filter names are listed in [AWS API - DescribeInstances](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeInstances.html).

## Additional Information

More configuration is available for the [rundeck-ec2-nodes-plugin project](https://github.com/rundeck-plugins/rundeck-ec2-nodes-plugin).
