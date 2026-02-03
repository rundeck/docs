# Notification Plugin

## Overview

Notification plugins allow you to send alerts and notifications when job events occur. They integrate Rundeck with external systems like chat platforms, ticketing systems, monitoring tools, and custom notification services.

When a job starts, succeeds, fails, or meets other conditions, Rundeck triggers your notification plugin to send information to external systems, enabling real-time awareness of job execution status across your organization.

## What Notification Plugins Do

Notification plugins can:

- **Send alerts** - Notify teams in Slack, Teams, Discord, or other chat platforms
- **Create tickets** - Open or update tickets in JIRA, ServiceNow, PagerDuty, etc.
- **Update dashboards** - Push metrics and status to monitoring systems
- **Trigger workflows** - Initiate follow-up actions in other automation systems
- **Log events** - Record job events in external logging or analytics platforms
- **Send custom messages** - Format and deliver notifications with specific content and structure

## When to Create a Notification Plugin

Create a notification plugin when you need to:

- **Integrate with an unsupported service** - Your team uses a notification system without an existing plugin
- **Customize message formatting** - You need specific message templates, formats, or rich content
- **Implement complex logic** - Advanced routing, filtering, aggregation, or conditional notifications
- **Add authentication** - Your notification service requires special authentication or API keys
- **Aggregate metrics** - Push execution data to analytics, monitoring, or reporting platforms
- **Create tickets automatically** - Generate support tickets or incident records based on job failures

## Built-in Notification Types

Rundeck includes two built-in notification types:

1. **Email** - Send email notifications to specified addresses
2. **Webhook** - POST JSON or XML to URLs

**Consider creating a plugin if you need:**
- Custom message formatting or templates
- Service-specific authentication
- Retry logic or error handling
- Rich content (embeds, attachments, formatting)
- Complex integrations beyond simple HTTP POST
- Service-specific features (threading, reactions, etc.)

## Notification Triggers

Notifications can be triggered on five job events:

| Trigger | When It Fires | Available Data |
|---------|---------------|----------------|
| `onstart` | Job started execution | Job details, user, start time (no end time/results) |
| `onsuccess` | Job completed successfully | Job details, execution results, duration, node results |
| `onfailure` | Job failed or was aborted | Job details, failure reason, failed nodes, duration |
| `onavgduration` | Execution exceeded average duration | Job details, execution time, average duration |
| `onretryablefailure` | Job failed but will be retried | Job details, failure reason, retry information |

::: tip
Your plugin can implement handlers for any or all of these triggers. Each trigger receives different execution data based on what's available at that point in the job lifecycle.
:::

## Notification Plugin vs. Other Plugin Types

**Not a Notification Plugin if you're:**
- ❌ Executing tasks or commands on nodes (use [Step Plugin](/developer/step-plugins.md) instead)
- ❌ Discovering or providing node inventory (use [Resource Model Source](/developer/resource-model-source-plugins.md) instead)
- ❌ Receiving and processing incoming webhooks (use [Webhook Plugin](/developer/webhook-plugins.md) instead)
- ❌ Transforming log output (use [Log Filter Plugin](/developer/log-filter-plugins.md) instead)

**Use a Notification Plugin if you're:**
- ✅ Sending alerts about job events
- ✅ Integrating with external notification/messaging services
- ✅ Creating tickets or records based on job outcomes
- ✅ Pushing job metrics to monitoring systems
- ✅ Triggering follow-up workflows in external systems

## Plugin Execution Context

When a notification trigger fires, your plugin receives two parameters:

1. **`executionData`** (Map) - Information about the job execution and job itself
2. **`config`** (Map) - User-configured properties for your plugin

### Execution Data Reference

The `executionData` map contains comprehensive information about the job execution. Key fields include:

**Execution Information:**
- `execution.id` - Execution ID
- `execution.href` - URL to execution page
- `execution.status` - Status: 'running', 'succeeded', 'failed', 'aborted'
- `execution.user` - User who started the job
- `execution.project` - Project name
- `execution.loglevel` - Log level: 'ERROR', 'WARN', 'INFO', 'VERBOSE', 'DEBUG'

**Timing Information:**
- `execution.dateStarted` - Start time (java.util.Date)
- `execution.dateStartedUnixtime` - Start time as milliseconds since epoch
- `execution.dateStartedW3c` - Start time as W3C formatted string
- `execution.dateEnded` - End time (available after completion)
- `execution.dateEndedUnixtime` - End time as milliseconds since epoch
- `execution.dateEndedW3c` - End time as W3C formatted string

**Job Information:**
- `job.id` - Job ID
- `job.name` - Job name
- `job.group` - Job group
- `job.project` - Project name
- `job.description` - Job description
- `job.href` - URL to job page
- `job.averageDuration` - Average duration in milliseconds (if available)

**Node Results** (available after job completion, not on `onstart`):
- `execution.succeededNodeList` - List of node names that succeeded
- `execution.succeededNodeListString` - Comma-separated list of succeeded nodes
- `execution.failedNodeList` - List of node names that failed
- `execution.failedNodeListString` - Comma-separated list of failed nodes
- `execution.nodestatus` - Map with counts: `[succeeded: int, failed: int, total: int]`

**Context Variables:**
- `execution.context.option` - Map of all job option key/values
- `execution.context.secureOption` - Map of secure option key/values
- `execution.context.*` - All context variables from [Job Variables Reference](/manual/jobs/job-variables.md)

::: tip Accessing Data
In Java, access nested values: `(String) ((Map) executionData.get("execution")).get("status")`

In Groovy, use GPath: `execution.status` or `execution.context.option.myoption`
:::

### Configuration Properties

Configuration properties are defined by your plugin and allow users to customize behavior. Users can embed [Job Variable references](/manual/jobs/job-variables.md) in string properties (e.g., `${option.myoption}`) which are resolved before being passed to your plugin.

When implementing custom validation, allow for property references by checking for `${` sequences:

```java
@PluginProperty(title = "Message Template")
private String messageTemplate; // Can contain ${option.name}, ${job.name}, etc.
```

Notification plugins support [property scopes](/developer/plugin-properties.md#property-scopes), allowing configuration at project or instance level.

## Advanced Configuration

### Asynchronous Notifications

By default, notifications run synchronously. Enable asynchronous execution in `rundeck-config.properties`:

**`rundeck.feature.notificationsOwnThread.enabled`** (true/false)
- When `true`, notifications run on a separate thread
- Prevents notification delays from blocking job completion

**`rundeck.notification.threadTimeOut`** (milliseconds, default: 120000)
- Maximum time for notification thread execution
- Notifications exceeding this timeout will be terminated

**Example configuration:**
```properties
rundeck.feature.notificationsOwnThread.enabled=true
rundeck.notification.threadTimeOut=60000
```

::: tip When to Use Async
Enable async notifications if:
- Notifications call slow external services
- You don't want notification failures to delay job completion reporting
- Multiple notifications are configured per job
:::

## Plugin Implementation Types

Rundeck supports two types of Notification plugins:

### Java Plugins
- **Best for:** Complex integrations, production use, reusable libraries
- **Deployment:** JAR file in `libext` directory
- **Features:** Full access to Java ecosystem, type safety, IDE support
- **See:** [Java Plugin Implementation](#java-plugin-type) below

### Groovy Plugins
- **Best for:** Quick development, simple integrations, prototyping
- **Deployment:** Single `.groovy` file in `libext` directory
- **Features:** Simplified DSL, hot-reload (after initial load), less boilerplate
- **See:** [Groovy Plugin Implementation](#groovy-plugin-type) below

::: warning Script Plugins Not Supported
Shell script-based plugins are **not supported** for notifications. Use Java or Groovy plugins instead.
:::

## Example code

See the source directory `examples/example-groovy-notification-plugins` for
examples of Notification plugins written in Groovy.

- On github: [example-groovy-notification-plugins](https://github.com/rundeck/rundeck/tree/development/examples/example-groovy-notification-plugins)

See the source directory `examples/example-java-notification-plugin` for
Java examples.

- On github: [example-java-notification-plugin](https://github.com/rundeck/rundeck/tree/development/examples/example-java-notification-plugin)

## Java Plugin Type

### Interface

Java notification plugins implement the [NotificationPlugin]({{$javaDocBase}}/com/dtolabs/rundeck/plugins/notification/NotificationPlugin.html) interface:

```java
public interface NotificationPlugin {
    /**
     * Post a notification for the given trigger, dataset, and configuration
     * @param trigger event type causing notification (onstart, onsuccess, onfailure, etc.)
     * @param executionData execution and job data
     * @param config user-provided configuration for the plugin
     * @return true if notification succeeded, false otherwise
     */
    public boolean postNotification(String trigger, Map executionData, Map config);
}
```

**Method Parameters:**
- `trigger` - The event that triggered the notification (`onstart`, `onsuccess`, `onfailure`, `onavgduration`, `onretryablefailure`)
- `executionData` - Map containing execution and job information (see [Execution Data](#execution-data) above)
- `config` - Map containing user-configured properties for this notification

**Return Value:**
- `true` - Notification sent successfully
- `false` - Notification failed (will be logged as an error)

### Basic Example

```java
import com.dtolabs.rundeck.core.plugins.Plugin;
import com.dtolabs.rundeck.plugins.notification.NotificationPlugin;
import com.dtolabs.rundeck.plugins.descriptions.*;

@Plugin(service = "Notification", name = "example")
@PluginDescription(title = "Example Notification", 
                  description = "Sends notifications to an example service")
public class ExampleNotificationPlugin implements NotificationPlugin {

    @PluginProperty(title = "Webhook URL", description = "URL to send notifications", required = true)
    private String webhookUrl;
    
    @PluginProperty(title = "Channel", description = "Notification channel")
    private String channel;

    @Override
    public boolean postNotification(String trigger, Map executionData, Map config) {
        try {
            // Extract execution data
            Map execution = (Map) executionData.get("execution");
            Map job = (Map) executionData.get("job");
            
            String jobName = (String) job.get("name");
            String status = (String) execution.get("status");
            String user = (String) execution.get("user");
            
            // Build notification message
            String message = String.format(
                "Job '%s' %s by %s (trigger: %s)",
                jobName, status, user, trigger
            );
            
            // Send notification (your implementation)
            sendToWebhook(webhookUrl, channel, message);
            
            return true; // Success
            
        } catch (Exception e) {
            System.err.println("Failed to send notification: " + e.getMessage());
            e.printStackTrace();
            return false; // Failure
        }
    }
    
    private void sendToWebhook(String url, String channel, String message) {
        // Your notification sending logic here
    }
}
```

### Complete Example with Error Handling

```java
import com.dtolabs.rundeck.core.plugins.Plugin;
import com.dtolabs.rundeck.plugins.notification.NotificationPlugin;
import com.dtolabs.rundeck.plugins.descriptions.*;
import java.net.http.*;
import java.net.URI;

@Plugin(service = "Notification", name = "slack-notifier")
@PluginDescription(title = "Slack Notifier", 
                  description = "Sends job notifications to Slack")
@PluginMetadata(key = "faicon", value = "slack")
public class SlackNotificationPlugin implements NotificationPlugin {

    @PluginProperty(title = "Webhook URL", 
                   description = "Slack webhook URL", 
                   required = true)
    @SelectValues(values = {})
    @PluginRenderingOptions({
        @PluginRenderingOption(key = StringRenderingConstants.DISPLAY_TYPE_KEY,
                              value = "PASSWORD"),
        @PluginRenderingOption(key = StringRenderingConstants.SELECTION_ACCESSOR_KEY,
                              value = StringRenderingConstants.SELECTION_ACCESSOR_STORAGE_PATH)
    })
    private String webhookUrl;
    
    @PluginProperty(title = "Channel", 
                   description = "Slack channel (optional)")
    private String channel;
    
    @PluginProperty(title = "Notify on Start", 
                   description = "Send notification when job starts",
                   defaultValue = "false")
    private boolean notifyOnStart;

    @Override
    public boolean postNotification(String trigger, Map executionData, Map config) {
        // Skip onstart if not enabled
        if ("onstart".equals(trigger) && !notifyOnStart) {
            return true;
        }
        
        try {
            Map execution = (Map) executionData.get("execution");
            Map job = (Map) executionData.get("job");
            
            // Build Slack message
            String color = getColorForTrigger(trigger);
            String message = buildSlackMessage(trigger, execution, job);
            
            // Send to Slack
            HttpClient client = HttpClient.newHttpClient();
            String payload = String.format(
                "{\"text\":\"%s\",\"channel\":\"%s\",\"attachments\":[{\"color\":\"%s\",\"text\":\"%s\"}]}",
                "Job Notification", 
                channel != null ? channel : "",
                color,
                message
            );
            
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(webhookUrl))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(payload))
                .build();
            
            HttpResponse<String> response = client.send(request, 
                HttpResponse.BodyHandlers.ofString());
            
            return response.statusCode() == 200;
            
        } catch (Exception e) {
            System.err.println("Slack notification failed: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }
    
    private String getColorForTrigger(String trigger) {
        switch (trigger) {
            case "onsuccess": return "good";
            case "onfailure": return "danger";
            case "onavgduration": return "warning";
            default: return "#439FE0";
        }
    }
    
    private String buildSlackMessage(String trigger, Map execution, Map job) {
        String jobName = (String) job.get("name");
        String status = (String) execution.get("status");
        String user = (String) execution.get("user");
        String href = (String) execution.get("href");
        
        return String.format(
            "Job *%s* %s by %s\\n<%s|View Execution>",
            jobName, status, user, href
        );
    }
}
```

### Configuration Properties

Define configuration properties using [Plugin Annotations](/developer/java-plugin-development.md#plugin-annotations). See [Java Plugin Development - Plugin Properties](/developer/java-plugin-development.md#plugin-properties) for complete documentation.

**Common notification properties:**
- Webhook URLs or API endpoints
- Authentication tokens (use Key Storage)
- Channel or destination identifiers
- Message templates
- Trigger-specific settings (notify on start, etc.)

## Groovy Plugin Type

Groovy notification plugins provide a simplified DSL for quick development without the overhead of Java compilation and packaging.

### Setup

1. Create a file named `MyNotificationPlugin.groovy` in Rundeck's plugins directory (`libext`)
2. Restart Rundeck to load the plugin initially
3. After initial load, you can update the file without restarting (hot-reload)

See [Groovy Plugin Development](/developer/groovy-plugin-development.md) for complete Groovy plugin documentation.

### Groovy DSL

Define your plugin using the `rundeckPlugin` method with the `NotificationPlugin` interface:

```groovy
import com.dtolabs.rundeck.plugins.notification.NotificationPlugin

rundeckPlugin(NotificationPlugin) {
    title = 'My Notification'
    description = 'Sends notifications to my service'
    version = '1.0'
    
    configuration {
        // Define properties here
    }
    
    // Define trigger handlers
    onstart { execution, config ->
        // Handle job start
        true
    }
    
    onsuccess { execution, config ->
        // Handle job success
        true
    }
    
    onfailure { execution, config ->
        // Handle job failure
        true
    }
}
```

### Notification Handlers

Define handlers for each notification trigger. Each handler receives two parameters:

- `execution` - Map containing execution and job data
- `config` - Map containing user-configured properties

**Available Handlers:**
- `onstart` - Job started
- `onsuccess` - Job succeeded
- `onfailure` - Job failed or was aborted
- `onavgduration` - Job exceeded average duration
- `onretryablefailure` - Job failed but will be retried

**Return Value:**
- `true` - Notification succeeded
- `false` - Notification failed (logged as error)

**Basic Handler Example:**

```groovy
onstart { execution, config ->
    println "Job ${execution.job.name} started by ${execution.user}"
    true
}

onsuccess { execution, config ->
    println "Success! Job ${execution.job.name} completed"
    true
}

onfailure { execution, config ->
    println "Failed! Job ${execution.job.name} did not complete"
    true
}

onavgduration { execution, config ->
    println "Job ${execution.job.name} exceeded average duration"
    true
}

onretryablefailure { execution, config ->
    println "Job ${execution.job.name} failed but will be retried"
    true
}
```

**Accessing Execution Data:**

```groovy
onsuccess { execution, config ->
    // Job information
    def jobName = execution.job.name
    def jobGroup = execution.job.group
    
    // Execution information
    def user = execution.user
    def status = execution.status
    def executionId = execution.id
    def href = execution.href
    
    // Duration (available after completion)
    def started = execution.dateStarted
    def ended = execution.dateEnded
    
    // Node results (if applicable)
    def succeededNodes = execution.succeededNodeList
    def failedNodes = execution.failedNodeList
    
    println "Job ${jobName} completed by ${user}"
    true
}
```

### Complete Example

Here's a complete Groovy notification plugin that sends messages to a webhook:

**WebhookNotificationPlugin.groovy**:

```groovy
import com.dtolabs.rundeck.plugins.notification.NotificationPlugin
import groovy.json.JsonOutput

rundeckPlugin(NotificationPlugin) {
    title = 'Webhook Notifier'
    description = 'Sends job notifications to a webhook endpoint'
    version = '1.0'
    author = 'Ops Team'
    
    metadata = [
        faicon: 'bell'
    ]
    
    configuration {
        webhook_url(
            title: 'Webhook URL',
            description: 'URL to send notifications',
            required: true
        )
        
        channel(
            title: 'Channel',
            description: 'Notification channel (optional)',
            required: false
        )
        
        notify_on_start(
            title: 'Notify on Start',
            type: 'Boolean',
            defaultValue: 'false',
            description: 'Send notification when job starts'
        )
    }
    
    onstart { execution, config ->
        if (config.notify_on_start == 'true') {
            def message = [
                event: 'start',
                job: execution.job.name,
                user: execution.user,
                execution_id: execution.id,
                href: execution.href
            ]
            return sendWebhook(config.webhook_url, config.channel, message)
        }
        true
    }
    
    onsuccess { execution, config ->
        def duration = execution.dateEnded.time - execution.dateStarted.time
        def message = [
            event: 'success',
            job: execution.job.name,
            user: execution.user,
            execution_id: execution.id,
            duration_ms: duration,
            href: execution.href,
            succeeded_nodes: execution.succeededNodeList?.size() ?: 0
        ]
        sendWebhook(config.webhook_url, config.channel, message)
    }
    
    onfailure { execution, config ->
        def message = [
            event: 'failure',
            job: execution.job.name,
            user: execution.user,
            execution_id: execution.id,
            href: execution.href,
            failed_nodes: execution.failedNodeList ?: [],
            status: execution.status
        ]
        sendWebhook(config.webhook_url, config.channel, message)
    }
    
    onavgduration { execution, config ->
        def duration = execution.dateEnded.time - execution.dateStarted.time
        def avgDuration = execution.job.averageDuration
        def message = [
            event: 'avg_duration_exceeded',
            job: execution.job.name,
            duration_ms: duration,
            average_duration_ms: avgDuration,
            href: execution.href
        ]
        sendWebhook(config.webhook_url, config.channel, message)
    }
    
    onretryablefailure { execution, config ->
        def message = [
            event: 'retryable_failure',
            job: execution.job.name,
            execution_id: execution.id,
            href: execution.href,
            status: 'Will be retried'
        ]
        sendWebhook(config.webhook_url, config.channel, message)
    }
}

def sendWebhook(String url, String channel, Map message) {
    try {
        if (channel) {
            message.channel = channel
        }
        
        def json = JsonOutput.toJson(message)
        def connection = new URL(url).openConnection()
        connection.setRequestMethod('POST')
        connection.setRequestProperty('Content-Type', 'application/json')
        connection.setDoOutput(true)
        
        connection.outputStream.withWriter { writer ->
            writer.write(json)
        }
        
        def responseCode = connection.responseCode
        println("Webhook response: ${responseCode}")
        
        return responseCode >= 200 && responseCode < 300
        
    } catch (Exception e) {
        System.err.println("Failed to send webhook: ${e.message}")
        e.printStackTrace()
        return false
    }
}
```

### Minimal Example

For a simple notification plugin:

**MinimalNotificationPlugin.groovy**:

```groovy
import com.dtolabs.rundeck.plugins.notification.NotificationPlugin

rundeckPlugin(NotificationPlugin) {
    title = 'Simple Logger'
    description = 'Logs job events to console'
    
    onstart {
        println("Job ${execution.job.name} started by ${execution.user}")
        true
    }
    
    onsuccess {
        println("Job ${execution.job.name} succeeded")
        true
    }
    
    onfailure {
        println("Job ${execution.job.name} failed")
        true
    }
}
```

Here is a full example showing plugin GUI metadata, configuration properties, and
alternate closure parameter lists:

**MyNotificationPlugin.groovy**:

```java
import com.dtolabs.rundeck.plugins.notification.NotificationPlugin;

rundeckPlugin(NotificationPlugin) {
    title="Example Plugin"
    description="An example"

    configuration{

        test1 title:"Test1", description:"Simple string"

        //Validation can be added with a closure
        test2(title:'Test2',description:"Matches a regex"){
            it=~/^\d+$/
        }

        //required select value, becomes a Select type
        test3 values: ["a","b","c"], required:true

        //if not required, becomes a FreeSelect
        test4 values: ["a","b","c"]

        //If type is not specified, the defaultValue will be used to guess
        test5 defaultValue: 3 //becomes Integer type
        test6 defaultValue:true //becomes Boolean type

        //these properties are assigned default values and automatically typed
        test7=123
        test8="abc"
        test9=true
        test10=false
        test11=["x","y","z"] //becomes a FreeSelect

        //redefining the same property will modify it
        test11 title:"My Select Field", description:"Free Select field", defaultValue:"y", required:true

        //the scope indicates the property will not show up in the GUI when configuring the Notification, but must be defined in the project.properties or framework.properties at runtime
        test11 required:true, scope: 'Project'

    }

    onstart { Map executionData,Map config ->
        println("script, start: data ${executionData}, config: ${config}")
        true
    }

    onfailure { Map executionData ->
        //Single argument, the configuration properties are available automatically
        println("script, failure: data ${executionData}, test1: ${test1}, test2: ${test2} test3: ${test3}")
        true
    }

    onsuccess {
        //with no args, there is a "configuration" and an "execution" variable in the context
        println("script, success: data ${execution}, test1: ${configuration.test1}, test2: ${configuration.test2} test3: ${configuration.test3}")
        true
    }

    onavgduration { Map executionData,Map config ->
        println("script, exceeded average duration: data ${executionData}, config: ${config}")
        true
    }

    onretryablefailure { Map executionData,Map config ->
        println("script, retryable failure: data ${executionData}, config: ${config}")
        true
    }
}

```

## Best Practices

### Error Handling

Always wrap notification logic in try-catch blocks:

```groovy
onsuccess { execution, config ->
    try {
        sendNotification(execution, config)
        return true
    } catch (Exception e) {
        System.err.println("Notification failed: ${e.message}")
        e.printStackTrace()
        return false
    }
}
```

### Logging

Use appropriate logging levels:
- `println()` for info messages
- `System.err.println()` for errors
- Include context (job name, execution ID) in log messages

### Configuration Validation

Validate configuration early:

```groovy
onsuccess { execution, config ->
    if (!config.webhook_url) {
        System.err.println("ERROR: Webhook URL not configured")
        return false
    }
    // Continue with valid config
}
```

### Timeouts

Implement timeouts for external calls to prevent hanging:

```java
HttpClient client = HttpClient.newBuilder()
    .connectTimeout(Duration.ofSeconds(10))
    .build();
```

### Secure Credentials

Use Key Storage for sensitive data like API keys and tokens:

```java
@PluginProperty(title = "API Key")
@SelectValues(values = {})
@PluginRenderingOptions({
    @PluginRenderingOption(key = StringRenderingConstants.DISPLAY_TYPE_KEY,
                          value = "PASSWORD"),
    @PluginRenderingOption(key = StringRenderingConstants.SELECTION_ACCESSOR_KEY,
                          value = StringRenderingConstants.SELECTION_ACCESSOR_STORAGE_PATH)
})
private String apiKey;
```

## Related Documentation

- [Job Notifications (User Guide)](/manual/jobs/job-notifications.md) - Configuring notifications in jobs
- [Java Plugin Development](/developer/java-plugin-development.md) - General Java plugin development
- [Groovy Plugin Development](/developer/groovy-plugin-development.md) - General Groovy plugin development
- [Plugin Properties](/developer/plugin-properties.md) - Configuration property reference
- [Webhook Plugins](/developer/webhook-plugins.md) - For receiving webhooks (opposite direction)
- [Job Variables Reference](/manual/jobs/job-variables.md) - Available context variables
