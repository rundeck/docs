# HashiCorp Consul (Enterprise)

Rundeck Enterprise users have the option to use HashiCorp Consul as a method to edit Rundeck's configuration properties. By doing so, it allows users to manage the configuration for all of their services in one place. In terms of Rundeck, this feature is very beneficial because it allows users to edit configurations across all of their Rundeck instances. So, instead of having to change a configuration for each instance, you can change it once in Hashicorp and it will apply to all instances.  

## Getting Started 

To begin, we need to make sure that we have both Rundeck and HashiCorp Consul installed. The easiest way to get HashiCorp up and running is using their docker image. The docker image is named "consul." Consul can be found at localhost:8500, but this can also be changed from within Consul. 
We also need to make sure that Rundeck knows to use Consul for configuration. There are a couple of different ways to do that:

### RPM, Debian and Docker Users

For RPM, Debian and Docker users, the best way to specify that Rundeck should use Consul, is by defining the environment variable to be true. To do so, we need to add the following to the `/etc/rundeck/profile` file:
```
RUNDECK_CONSUL_ENABLED=true
```

### War Users

For customers who use installed Rundeck using the .war, there are a couple different options.
1. You could define the environment variable just like RPM, Debian and Docker users by adding the following to the `/etc/rundeck/profile` file:
2. You could pass the property as a flag when starting Rundeck. An example of that would look like the following:
```
java -Xmx4g -Drundeck.consul.enabled=true -jar rundeck-{{{rundeckVersionFull}}}.war
```

### Updating the Server Name

Now that you have specified to use Consul, we can shut down Rundeck and look at the newly created `bootstap.yml` file. In there, it will specify the host of Consul. This should be updated to the IP address or domain name you are using. 

## Services

In HashiCorp, you will notice that Rundeck may not appear right away as a service. However, once the Rundeck service is fully up and running, it will show up in HashiCorp.

## Key/Value

This is where you can specify the various configurations for Rundeck. To begin, you need to create a folder called "config", with another folder called "rundeck" inside of it. Inside of the Rundeck folder is where all the Rundeck configuration will be placed. Begin by creating a key value named "data." Now, copy and paste all the contents in the `rundeck-config.properties` file into the value for that key. After that, comment out the entire `rundeck-config.properties` file. Now, when we relaunch Rundeck, it will pull the configuration settings from Consul. 

:::warning
If you define a key/value pair that conflicts with a setting configured in a file on the server (rundeck-config.properties), then the file on the server will always override the Consul configuration. 
:::

## Example: Using HashiCorp for a Cluster

![Consul - Dispatching to Specific Instance](~@assets/img/rundeck-server-id.png)

If you have a cluster of Rundeck Enterprise instances, then you can specify the server id when creating the folder for the config key/values. Looking at the example above, we see that there are two different folders created inside of the config directory. One called Rundeck and one called Rundeck with a long id after it. That is how we specify a specific server to have all the configuration settings applied to. By just naming the folder Rundeck, we apply the configuration to all members of the cluster. So, in order to apply the configuration to just one instance, we need to create a directory called "rundeck,{server_id}."
:::warning
If you specify a server ID, those configuration settings will always override the settings specified for all instances in the "rundeck" folder. 
:::