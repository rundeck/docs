# Datadog Node Source

:::enterprise
:::

Process Automation users have the ability to use this plugin to import their host list in Datadog by creating nodes matching all the hosts. This makes it easy to import nodes from Datadog.

## Connection

![Datadog Resource Model - Connection](/assets/img/resource-connect.png)

Follow the instructions outlined in the [**Datadog Integration Overview**](/manual/plugins/datadog-plugins-overview) to set up authentication with Datadog.

## Configuration

![Datadog Resource Model - Configuration](/assets/img/resource-config.png)

- **Attribute Prefix**
: This creates an attribute prefix for all the attributes for that host. For example, on attribute is "isMuted" which is a boolean to determine if the host is muted. Instead, it would appear as dd.isMuted is you put "dd" here.

- **Tag Prefix**
: This create a prefix for all the tags for that host. So instead of just the tag, it will now be dd.tag. This helps to organize the different nodes in Rundeck.