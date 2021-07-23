# Datadog Node Source (Enterprise)

Rundeck Enterprise users have the ability to use this plugin to import their host list in Datadog by creating nodes matching all the hosts. This makes it easy to import nodes from Datadog.

## Configuration

![Datadog Resource Model - Configuration](~@assets/img/resource-config.png)

- **Attribute Prefix**
: This creates an attribute prefix for all the attributes for that host. For example, on attribute is "isMuted" which is a boolean to determine if the host is muted. Instead, it would appear as dd.isMuted is you put "dd" here.

- **Tag Prefix**
: This create a prefix for all the tags for that host. So instead of just the tag, it will now be dd.tag. This helps to organize the different nodes in Rundeck.

## Connection

![Datadog Resource Model - Connection](~@assets/img/resource-connect.png)

:::tip
You will need to have both an API and APP key created in Datadog and ready to use. To create these values in Datadog, navigate to Integrations > APIs and copy and paste the API key. If it doesn't exist yet, create a Rundeck integration and create an API/APP key.
:::

- **API Key**
: This is the API key. To create these values in Datadog, navigate to Integrations > APIs and copy and paste the API key. If it doesn't exist yet, create a Rundeck integration and create an API key.

- **API Key**
: This is the APP key. To create these values in Datadog, navigate to Integrations > APIs and copy and paste the APP key. If it doesn't exist yet, create a Rundeck integration and create an APP key.
