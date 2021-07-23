# Sensu Node Source (Enteprise)

:::enterprise
:::

Rundeck Enterprise users have the ability to use this plugin to import their host list in Sensu by creating nodes matching all the hosts. This makes it easy to import nodes from Sensu.

Before creating the job step, have the API key and URL for the account ready. To find them, see [here](https://docs.sensu.io/sensu-go/latest/api/apikeys/#create-a-new-api-key).

## Setup

Before using the Sensu plugins, add the API key and URL to the framework settings To do this, add the API key to Rundeck's key storage and specify the path and the URL value in the framework.

1. In the top right-hand corner of Rundeck, click on the gear icon and select "Key Storage."
2. Select "Add or Upload a Key."
3. For key type, select "Password."
4. Where it says enter text, copy and paste the API key.
5. For storage path, this can be anything (REMEMBER THIS FOR LATER). E.g. keys/sensu/api
6. This can be anything. For example, if  api is the name, the new path would be keys/sensu/api.
7. Now that the keys are created, specify them in the framework. Open the `etc/framework.properties` file and add the following lines:
```bash
sensu.url=value
sensu.api_key_path=/keys/sensu/api
```
Where `path` is the path created above

## Configuration

![Sensu - Node Source](~@assets/img/sensu-node-source.png)

- **IP Pattern**
: If using multiple network addresses, set a pattern to import numerous. All VMs matching the pattern will be imported.

- **API URL**
: This is the endpoint that needs to be hit in order to get node information for a specific Sensu account. For example, `http://sensu:8080/api/core/v2/namespaces/default`. If it is already specified it in project or framework settings, there is no need to add it again here.

- **API Key**
: This is the API key for the account to get node information from. If it is already specified it in project or framework settings, there is no need to add it again here.
