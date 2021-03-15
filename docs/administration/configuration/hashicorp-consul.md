# HashiCorp Consul (Enterprise)

Rundeck Enterprise users have the option to use HashiCorp Consul as a method to edit Rundeck's configuration properties. By doing so, it allows users to manage the configuration for all of their services in one place. In terms of Rundeck, this feature is very beneficial because it allows users to edit configurations across all of their Rundeck instances. So, instead of having to change a configuration for each instance, change it once in Hashicorp and it will apply to all instances.  

## Getting Started 

To begin, make sure that both Rundeck and HashiCorp Consul are installed. The easiest way to get HashiCorp up and running is using their docker image. The docker image is named "consul." Consul can be found at localhost:8500, but this can also be changed from within Consul. For more information about installing, visit [Consul](https://www.consul.io/docs/install).
Next, make sure that Rundeck knows to use Consul for configuration. There are a couple of different ways to do that:

### RPM, Debian and Docker Users

For RPM, Debian and Docker users, the best way to specify that Rundeck should use Consul, is by defining the environment variable to be true. To do so, add the following to the `/etc/rundeck/profile` file:
```
RUNDECK_CONSUL_ENABLED=true
```

### War Users

For customers who use installed Rundeck using the .war, there are a couple different options.
1. Define the environment variable just like RPM, Debian and Docker users by adding the following to the `/etc/rundeck/profile` file:
2. Pass the property as a flag when starting Rundeck. An example of that would look like the following:
```
java -Xmx4g -Drundeck.consul.enabled=true -jar rundeck-{{{rundeckVersionFull}}}.war
```

### Setting the Consul server in Rundeck

Now that Rundeck knows to use Consul, we can shut down Rundeck and look at the newly created `bootstrap.yml` file, which is located in the ${rdbase}/server/config directory. In there, it will specify the host of Consul. The host property should be set to the ip address or hostname of your Consul server.

## Services in Consul

In HashiCorp, Rundeck may not appear right away as a service. However, once the Rundeck service is fully up and running, it will show up in HashiCorp.

## Adding the Rundeck Configuration in Consul

To create a new Key/Value pair, click on the key/value tab in the top of Consul. Next, create a folder called "config", with another folder called "rundeck" inside of it. Inside of the Rundeck folder is where all the Rundeck configuration will be placed. Begin by creating a key/value pair named "data." Now, copy and paste all the contents in the `rundeck-config.properties` file into the value for that key. After that, comment out the entire `rundeck-config.properties` file. Now, when relaunching Rundeck, it will pull the configuration settings from Consul. 

:::warning
If a key/value pair is defined that conflicts with a setting configured in a file on the server (rundeck-config.properties), then the file on the server will always override the Consul configuration. 
:::

## Example: Using HashiCorp for a Cluster

![Consul - Dispatching to Specific Instance](~@assets/img/rundeck-server-id.png)

If using a cluster of Rundeck Enterprise instances, then you can specify the server id when creating the folder for the config key/values. Looking at the example above, there are two different folders created inside of the config directory. One called Rundeck and one called Rundeck with a long id after it. That is how to specify a server to have all the configuration settings applied to. By just naming the folder Rundeck, we apply the configuration to all members of the cluster. So, in order to apply the configuration to just one instance, we need to create a directory called "rundeck,{server_id}"(as shown in image above). To find the the server id, click on the gears icon in the top right hand corner of Rundeck and select "System Report." On the next page, you will see the following box containing your server UUID: 
![Server ID](~@assets/img/server-id-location.png)

:::warning
If a server ID is specified, those configuration settings will always override the settings specified for all instances in the "rundeck" folder. 
:::

### Levels of Precedence for Clusters
1. A file on the server (rundeck-config.properties)
2. In Consul, specifying the server to be applied to.
3. In Consul, not specifying a server.
