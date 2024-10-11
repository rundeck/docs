# Delinea Storage Plugin (Commercial)

:::enterprise
:::

Delinea (formerly Thycotic) is a leader in Privileged Access Management solutions providing cloud ready, easy to use security solutions across the complete privileged access surface.  A centralized password management system provides visibility and control to protect privileges from attack.  Delinea's solution is built for the Enterprise to enforce strong password business policies and prevent data breaches.  [Read more about their solution here](https://delinea.com/products/secret-server).

Runbook Automation users have access to the Delinea Storage Plugin which can be used to access password/key data stored in a Delinea Secret Server.

## Configuration

::: tabs
@tab GUI Config

Use the following steps to configure the Delinea plugin for key storage:

1. Navigate to the System Menu (gear icon in the upper right).
2. Click on **Key Storage**:
![Key Storage Menu](/assets/img/key-storage-menu.png)
3. Navigate to the **Configure** tab.
4. Click on **Add Storage Plugin +**.
5. Click on **Thycotic storage** from the popup list.

Fill in the fields for the integration as necessary:

* **Key Storage Path**: The path in the Runbook Automation storage tree to apply the plugin. If `keys` is specified, then all keys and directories added to Key Storage will also be added to Delinea.
* **Remove Path Prefix**: By default, the storage plugin will be invoked using the full path that is requested. If set to true, the path used when invoking the storage plugin would not include the prefix. It is **recommended to set this to true**. If set to false, keys will not be displayed unless an existing directory is specified in Runbook Automation.
* **Username** (Required): Username for an account in Delinea with access to the secrets that will be used into Runbook Automation.
* **Password** (Required): The password for the account in Delinea with access to the secrets that will be used into Runbook Automation.
* **Address** (Required): The base URL for the secret server account where the secrets should be saved. For example, `https://example.secretservercloud.com`. If using Delinea on-premises, the address must be appended with `/SecretServer`, so your full URL will be `https://example.yourdomain.com/SecretServer`. 
* **Allow Self Signed Certificate**: Set to true if a self-signed certificate will be used to access the Delinea server. 
* **Maximum resources allowed to retrieve** This value allows the user to customize the number of resources to retrieve from Delinea.
* **Domain**: Fully qualified domain name is using an Active Directory account for integrating with Delinea.

Below is an example configuration, which can be configured using the *System Configuration* module. Add each setting as a configuration entry.

![Delinea Configuration](/assets/img/keystorage-thycotic-config.png)<br>

Once the configuration is set, click on **Save** to add it to the list of configured storage integrations.

Click on **Save** to commit the configuration.

In the **Keys** tab, the directory defined in the **Path Prefix** should now be visible. Click into this directory to begin navigating the secrets from Delinea.

@tab rundeck-config.properties

Alternatively the settings can be placed in `rundeck-config.properties`. 

```
rundeck.storage.provider.[index].type=thycotic-storage
rundeck.storage.provider.[index].path=keys/thycotic
rundeck.storage.provider.[index].removePathPrefix=true
rundeck.storage.provider.[index].config.username=<username>
rundeck.storage.provider.[index].config.password=<password>
rundeck.storage.provider.[index].config.address=https://<domain>.secretservercloud.com
rundeck.storage.provider.[index].config.allowSelfSignedCert=true
```

> Note: Replace ```index``` in your configuration, make sure doesn't override others storage configuration's index.

:::

## Delinea through Enterprise Runner

The [Enterprise Runner](/administration/runner/runner-intro.md) can be used to integrate with Delinea Secret Server. This is useful when Delinea is hosted in an environment that is not directly accessible from Runbook Automation.

The following provides examples of how to configure the Enterprise Runner to connect to Secret Server:

#### YAML Configuration File
Custom properties for the Runner can be set through a `.yaml` file:

```
runner:
  rundeck:
      storage:
        thycotic:
          type: "thycotic-storage"
          pathBehavior: "predefined"
          configuration:
            username: "username@company.com"
            password: "mythycoticpassword"
            address: "https://mycompany.secretservercloud.com"
            allowSelfSignedCert: "true"
            maximumResources: 30
```

Save this file in the directory where the Runner `.jar` is located and then invoke the Runner with the following command:

```
java -Dmicronaut.config.files=runner-props.yaml -jar runner-{{unique-runner-id}}.jar
```

#### Environment Variables

These custom properties can also be set as environment variables on the system where the Runner will be invoked:
```
export RUNNER_RUNDECK_STORAGE_THYCOTIC_TYPE="thycotic-storage"
export RUNNER_RUNDECK_STORAGE_THYCOTIC_PATH_BEHAVIOR="predefined"
export RUNNER_RUNDECK_STORAGE_THYCOTIC_CONFIGURATION_USERNAME="username@company.com"
export RUNNER_RUNDECK_STORAGE_THYCOTIC_CONFIGURATION_PASSWORD="mythycoticpassword"
export RUNNER_RUNDECK_STORAGE_THYCOTIC_CONFIGURATION_ADDRESS="https://mycompany.secretservercloud.com"
export RUNNER_RUNDECK_STORAGE_THYCOTIC_CONFIGURATION_ALLOW_SELF_SIGNED_CERT="true"
export RUNNER_RUNDECK_STORAGE_THYCOTIC_CONFIGURATION_MAXIMUM_RESOURCES="30"
```
When using environment variables, the Runner can be invoked with just:
```
java -jar runner-{{unique-runner-id}}.jar
```

#### Docker

Here is an example `docker-compose` for the Runner with the configuration properties:

```
version: '3'
services:
    runner:
      image: ${RUNNER_IMAGE}
      environment:
        RUNNER_RUNDECK_STORAGE_THYCOTIC_TYPE="thycotic-storage"
        RUNNER_RUNDECK_STORAGE_THYCOTIC_PATH_BEHAVIOR="predefined"
        RUNNER_RUNDECK_STORAGE_THYCOTIC_CONFIGURATION_USERNAME="username@company.com"
        RUNNER_RUNDECK_STORAGE_THYCOTIC_CONFIGURATION_PASSWORD="mythycoticpassword"
        RUNNER_RUNDECK_STORAGE_THYCOTIC_CONFIGURATION_ADDRESS="https://mycompany.secretservercloud.com"
        RUNNER_RUNDECK_STORAGE_THYCOTIC_CONFIGURATION_ALLOW_SELF_SIGNED_CERT="true"
        RUNNER_RUNDECK_STORAGE_THYCOTIC_CONFIGURATION_MAXIMUM_RESOURCES="30"
```