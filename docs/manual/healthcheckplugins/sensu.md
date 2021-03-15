# Sensu Health Check (Enterprise)

:::enterprise
:::

Before creating the health check, have the API key and URL for the account ready. To find them, see [here](https://docs.sensu.io/sensu-go/latest/api/apikeys/#create-a-new-api-key).

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

![Sensu - Health Check](~@assets/img/sensu-health.png)

- **Node Filter**
: Specify a node filte here, and only the nodes matching the filter will use the health check.

- **Label**
: The label for the health check being created. Can be anything.

- **API URL**
: This is the endpoint that needs to be hit in order to use health check for an account. For example, `http://sensu:8080/api/core/v2/namespaces/default`. If it is already specified it in project or framework settings, there is no need to add it again here.

- **API Key**
: This is the API key for the account to get node information from. If it is already specified it in project or framework settings, there is no need to add it again here.



