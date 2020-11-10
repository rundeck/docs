# Sensu Node Source (Enteprise Only)

:::enterprise
:::

Rundeck Enterprise users have the ability to use this plugin to import their host list in Sensu by creating nodes matching all the hosts. This makes it easy to import nodes from Sensu.

Before creating the job step, have the API key and URL for the account ready. To find them, see [here](https://docs.sensu.io/sensu-go/latest/api/apikeys/#create-a-new-api-key).

![Sensu - Node Source](~@assets/img/sensu-node-source.png)

- **IP Pattern**
: If using multiple network addresses, set a pattern to import numerous. All VMs matching the pattern will be imported.

- **API URL**
: This is the endpoint that needs to be hit in order to get node information for a specific Sensu account. For example, `http://sensu:8080/api/core/v2/namespaces/default`. If it is already specified it in project or framework settings, you don't need to add it again here.
  
- **API Key**
: This is the API key for the account to get node information from. If it is already specified it in project or framework settings, you don't need to add it again here.