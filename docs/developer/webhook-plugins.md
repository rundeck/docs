# Webhook Event Plugins

## About

Webhook event plugins allow you to process a webhook event received by Rundeck.

## Use

Create a webhook event plugin and install it like other Rundeck plugins.
Go to the webhook administration page and create a new webhook. You will see your
plugin in the list of Webhook Event Plugins. Choose your plugin and if your plugin
specified plugin properties they will be presented to the user.

## Configuration

By default, your plugin will use the configuration values supplied by the user 
when they configure the webhook.

Project and Framework properties can also be used to configure the plugin.

_Framework scope property definition in `framework.properties`_

    framework.plugin.WebhookEvent.[your_plugin_name].[property]=value

_Project scope property definition in `project.properties`_

    project.plugin.WebhookEvent.[your_plugin_name].[property]=value
    
## Plugin Types

At this time only Java plugins are supported.

Your Java plugin will receive a `WebhookEventContext` object and a `WebhookData` object.
The event context supplies Rundeck services that you might need in your plugin processing code, such as
the job runner service.

The `WebhookData` object contains the event payload itself as an InputStream plus contextual information
such as the event sender, data content type, owning project, and pertinent HTTP headers your plugin might need.

:::tip
You can control the response sent back to the service that called the webhook by implementing a WebhookResponder.
::: 

A WebhookResponder class must be returned from the plugin's onEvent method. If you return a `null` the DefaultWebhookResponder will be used, which sends a plain text `ok` message to the webhook caller. 

```java
import com.dtolabs.rundeck.core.plugins.Plugin;
import com.dtolabs.rundeck.core.webhook.WebhookEventException;
import com.dtolabs.rundeck.plugins.ServiceNameConstants;
import com.dtolabs.rundeck.plugins.descriptions.PluginDescription;
import com.dtolabs.rundeck.plugins.webhook.WebhookData;
import com.dtolabs.rundeck.plugins.webhook.WebhookEventContext;
import com.dtolabs.rundeck.plugins.webhook.WebhookEventPlugin;
import org.apache.log4j.Logger;
import java.util.stream.Collectors;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;

@Plugin(name = "log-webhook-event",service= ServiceNameConstants.WebhookEvent)
@PluginDescription(title="Log Webhook Events",description = "Can be used to log any incoming webhook events to log4j logger 'org.rundeck.webhook.events'")
class LogWebhookEventPlugin implements WebhookEventPlugin {
    private static final Logger LOG = Logger.getLogger("org.rundeck.webhook.events");

    @Override
    List<String> getRequestHeadersToCopy() {
        return Arrays.asList("X-My-Custom_header","X-My-Other-Custom_hdr");
    }

    @Override
    WebhookResponder onEvent(final WebhookEventContext context, final WebhookData data) throws WebhookEventException {
        LOG.info("Log Webhook Event Plugin - Webhook event information:");
        LOG.info("id: " + data.getId());
        LOG.info("name: " + data.webhook);
        LOG.info("project: " + data.project);
        LOG.info("sender: " + data.sender);
        LOG.info("contentType: " + data.contentType);
        LOG.info("custom header: " + data.getHeaders().get("X-My-Custom_header"));
        LOG.info("data:");
        LOG.info(new BufferedReader(new InputStreamReader(data.getData()))
                   .lines().collect(Collectors.joining("\n")));
        return null; //will cause the default responder to respond to the webhook caller
    }
}
```