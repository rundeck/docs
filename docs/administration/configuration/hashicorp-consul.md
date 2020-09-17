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

## Services

In HashiCorp, you will notice that Rundeck may not appear right away as a service. However, once the Rundeck service is fully up and running, it will show up in HashiCorp.

## Key/Value

This is where you can specify the various configurations for Rundeck. To begin, you need to create a folder called "config", with another folder called "rundeck" inside of it. Inside of the Rundeck folder is where all the Rundeck configuration will be placed. The following is an example of defining the Rundeck welcome message in consul:

![HashiCorp Consul - Key/Value](~@assets/img/key-value-consul.png)

Now, when we return to the Rundeck Login page, we will see the following:

![Rundeck Welcome Message](~@assets/img/rundeck-welcome-message.png)

:::warning
If you define a key/value pair that conflicts with a setting configured in a file on the server (rundeck-config.properties), then the file on the server will always override the Consul configuration. 
:::

## Example: Using HashiCorp for a Cluster

When setting up a cluster, you need to specify your key storage and configuration storage to all of the members of the cluster. That would look something like the following for each member of the cluster:

```bash
# Encryption for key storage
rundeck.storage.provider.1.type=db
rundeck.storage.provider.1.path=keys
rundeck.storage.converter.1.type=jasypt-encryption
rundeck.storage.converter.1.path=keys
rundeck.storage.converter.1.config.encryptorType=custom
rundeck.storage.converter.1.config.password=bompd87463c3fec
rundeck.storage.converter.1.config.algorithm=PBEWITHSHA256AND128BITAES-CBC-BC
rundeck.storage.converter.1.config.provider=BC
# Encryption for project config storage
rundeck.projectsStorageType=db
rundeck.config.storage.converter.1.type=jasypt-encryption
rundeck.config.storage.converter.1.path=projects
rundeck.config.storage.converter.1.config.encryptorType=custom
rundeck.config.storage.converter.1.config.password=bompd87463c3fec
rundeck.config.storage.converter.1.config.algorithm=PBEWITHSHA256AND128BITAES-CBC-BC
rundeck.config.storage.converter.1.config.provider=BC
rundeck.config.storage.converter.1.config.loggerName=config.storage
```

Instead of doing this for each instance, you could just specify the configuration within Consul and it would be applied to all the different members of the cluster. 

To begin, select the "Key/Value" tab in Consul. 

:::warning
All key-values must be saved in the following directory: `/config/rundeck`. If those folders do not exist yet, create them now. 
:::


![HashiCorp - Create a Key/Value](~@assets/img/hashicorp-create.png)

After confirming that we are in the Rundeck config directory, we can create a new key/value pair. We can do this by clicking "Create," as shown in the picture above. 


![HashiCorp - Create a Key/Value](~@assets/img/hashicorp-key-value-create.png)

Now we are going to create our first Key/Value. Since the first property we see in the example storage configuration above is `rundeck.storage.provider.1.type`, we will create that first. We will put the property in the entry box that says "Key or Folder" and we will put the value in the entry box that says "Value", as shown above. After saving that key/value, we will continue down the list, property by property until we have made it through the entire configuration. 

## Starting Rundeck Using Consul

Since we have created all the key/value pairs that we need to, we now need to start Rundeck. When we start Rundeck, we need to specify we want to use Consul for configuration. There are a [couple different ways](#getting-started) to do that. 


