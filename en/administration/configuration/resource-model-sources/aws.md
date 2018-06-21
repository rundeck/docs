% Amazon EC2 Resource Model Source


[Amazon's EC2](https://aws.amazon.com/ec2/) (Elastic Cloud Compute) is a cloud service in wide use for dynamic infrastructure; it is easy to start up and shut down Node "Instances" in the cloud.

For Rundeck, we would like to have a way of querying the EC2 service to see what EC2 Instances are available for use as Rundeck Nodes.

Amazon has a well-defined API for communication with their services, which would allow us to pull out the EC2 data, and generate XML if we wanted to. We could write a script that produces that data and use that script on a server to produce data via a URL, or we could use that script with the [script resource model source plugin](built-in-resource-model-source-plugins.html#script-resource-model-source-configuration) to generate it. This would give us complete control of the output, but does require extra work.

However, there is already a plugin to do this for you: the [Rundeck EC2 Nodes Plugin](https://github.com/rundeck-plugins/rundeck-ec2-nodes-plugin).

* [rundeck-ec2-nodes-plugin](https://github.com/rundeck-plugins/rundeck-ec2-nodes-plugin) project source code on github
* [download the binary distribution](https://github.com/rundeck-plugins/rundeck-ec2-nodes-plugin/downloads).

Use is fairly simple:

1. Copy the plugin file "rundeck-ec2-nodes-plugin-1.2.jar" into your `$RDECK_BASE/libext` directory. The plugin contains all of the required dependencies.
2. Login to Rundeck with an administrator account, and click the "Admin" link in the page header for your project then click the "Configure Project" link, *or* create a new project.
3. In the project configuration page, under **Resource Model Sources** click the "Add Source" button.
4. Click "Add" for the "AWS EC2 Resources" type.
5. Enter the configuration details (see below) for the plugin and click "Save".
6. Click "Save" for the Project Configuration.

Minimal configuration details for the plugin includes your AWS access credentials you can find here <https://console.aws.amazon.com/iam/home>

*Access Key*
:    Specify your AWS Access key.

*Secret Key*
:    Specify your AWS Secret Key

Read about the other configuration details in the [readme](https://github.com/rundeck-plugins/rundeck-ec2-nodes-plugin/blob/master/Readme.md) for the rundeck-ec2-nodes-plugin.

Finally, within Rundeck, you can Refresh the Nodes from within the Run tab.  You should see a Node entry for each EC2 Instance that is available.

You can manage the set of Nodes that gets returned from the plugin by organizing your EC2 instances using EC2 Tags, as well as adding EC2 Filters to the plugin configuration.

The EC2 plugin will automatically add tags for the nodes based on an EC2 Instance Tag named "Rundeck-Tags", as well as the Instance's state.  You can also add "Mapping parameters" to the EC2 Plugin configuration to add additional tags.

You can add filters to the EC2 Plugin configuration under the "Filter Params" configuration area, with the syntax of: `filter=value;filter2=value2`. The available filter names are listed in [AWS API - DescribeInstances](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeInstances.html).

You can also configure your EC2 Plugin manually or automatically by creating or modifying the [project.properties] file, and defining a [Resource Model Source] provider, like this:

    resources.source.1.type=aws-ec2
    resources.source.1.config.accessKey=...
    resources.source.1.config.privateKey=...
    resources.source.1.config.filter=...

More configuration is available for the [rundeck-ec2-nodes-plugin project](https://github.com/rundeck-plugins/rundeck-ec2-nodes-plugin).
