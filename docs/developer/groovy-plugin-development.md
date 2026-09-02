# Groovy Plugin Development

## Overview

Groovy plugins provide a middle ground between Script and Java plugins, offering:

- **Simple Development** - Create plugins in a single `.groovy` file
- **Dynamic Scripting** - Groovy's powerful scripting features
- **Java Ecosystem Access** - Use Java libraries and classes
- **Hot Reloading** - Optionally reload plugin changes without restarting Rundeck (after initial load)
- **DSL Syntax** - Simplified domain-specific language for plugin definition

**Limitations:**
- Currently supports only **Notification** and **Logging** plugin types
- For other plugin types, use [Java](/developer/java-plugin-development.md) or [Script](/developer/script-plugin-development.md) plugins

## Supported Plugin Types

Groovy plugins currently support these service types:

- **[Notification Plugin](/developer/notification-plugins.md#groovy-plugin-type)** - Send notifications on job events
- **[Streaming Log Reader](/developer/logging-plugins.md#groovy-streaminglogreader)** - Read execution logs
- **[Streaming Log Writer](/developer/logging-plugins.md#groovy-streaminglogwriter)** - Write execution logs
- **[Execution File Storage](/developer/logging-plugins.md#groovy-executionfilestorage)** - Store execution files
- **[Log Filter](/developer/log-filter-plugins.md#groovy-logfilter)** - Filter/transform log output
- **[Content Converter](/developer/content-converter-plugins.md#groovy-contentconverter)** - Render content as HTML

## Quick Start

### 1. Create Plugin File

Create a file named `MyPlugin.groovy` in Rundeck's plugins directory:
- Launcher: `$RDECK_BASE/libext`
- RPM/DEB: `/var/lib/rundeck/libext`

### 2. Define Plugin

```groovy
import com.dtolabs.rundeck.plugins.notification.NotificationPlugin

rundeckPlugin(NotificationPlugin) {
    title = 'My Notification'
    description = 'Sends custom notifications'
    version = '1.0'
    author = 'Your Name'
    
    configuration {
        webhook_url(
            title: 'Webhook URL',
            description: 'URL to send notification',
            required: true
        )
        message(
            title: 'Message',
            description: 'Custom message',
            defaultValue: 'Job ${job.name} completed'
        )
    }
    
    onstart { Map executionData, Map config ->
        println("Job starting: ${executionData.job.name}")
        true
    }
    
    onsuccess { Map executionData, Map config ->
        def url = config.webhook_url
        def message = config.message
        // Send notification
        sendWebhook(url, message, executionData)
        true
    }
    
    onfailure { Map executionData, Map config ->
        def url = config.webhook_url
        sendWebhook(url, "Job failed: ${executionData.job.name}", executionData)
        true
    }
}

def sendWebhook(String url, String message, Map data) {
    // Implementation here
    println("Sending to ${url}: ${message}")
}
```

### 3. Deploy and Use

1. Save the `.groovy` file to the plugins directory
2. **Restart Rundeck** (required for first-time load)
3. Configure the plugin in your Job's notifications
4. After the initial load, you can update the `.groovy` file without restarting

## Groovy DSL Syntax

### rundeckPlugin Method

The `rundeckPlugin` method defines your plugin. It takes two arguments:

1. The plugin interface class
2. A closure containing the plugin definition

```groovy
import com.dtolabs.rundeck.plugins.notification.NotificationPlugin

rundeckPlugin(NotificationPlugin) {
    // Plugin definition
}
```

::: tip Important
Always import the necessary types used in your Groovy script.
:::

## Plugin Properties

### Basic Properties

Set these properties to configure how your plugin appears in the Rundeck GUI:

```groovy
rundeckPlugin(NotificationPlugin) {
    title = 'My Plugin'              // Display name
    description = 'Does something'    // Description text
    version = '1.0.0'                 // Plugin version
    url = 'https://example.com'       // Documentation URL
    author = '© 2026, Your Name'      // Author information
    metadata = [                      // Provider metadata
        faicon: 'bell',
        glyphicon: 'bell'
    ]
}
```

### Provider Metadata

The `metadata` property is a map defining additional metadata:

```groovy
metadata = [
    faicon: 'check-circle',      // Font Awesome icon
    fabicon: 'github',           // Font Awesome brand icon
    glyphicon: 'ok-sign'         // Glyphicon icon
]
```

See [Plugin Icons](/developer/plugin-properties.md#plugin-icons) for available options.

## Configuration Properties

Use the `configuration` closure to define user-configurable properties:

```groovy
configuration {
    // Property definitions
}
```

::: warning Note
Not all plugin types support the `configuration` closure. Check the specific plugin type documentation.
:::

### Property Definition Syntax

There are two ways to define properties:

**1. Method Call Form** (Recommended for full control):

```groovy
property_name(
    title: 'Display Name',
    description: 'Help text',
    type: 'String',
    required: true,
    defaultValue: 'default'
)
```

**2. Assignment Form** (Quick and simple):

```groovy
// String property with default
property_name = 'default value'
// Equivalent to:
// property_name(defaultValue: 'default value', type: 'String')

// Free select with values
property_list = ['value1', 'value2', 'value3']
// Equivalent to:
// property_list(type: 'FreeSelect', values: ['value1', 'value2', 'value3'])
```

### Property Attributes

| Attribute | Required | Description |
|-----------|----------|-------------|
| `name` | Yes | Unique identifier (automatically derived from property name) |
| `type` | No | Data type (default: `String`) |
| `title` | No | User-readable label |
| `description` | No | Help text for users |
| `required` | No | Whether value is required (default: false) |
| `defaultValue` | No | Default value |
| `scope` | No | Property scope (default: `Instance`) |
| `values` | For Select | List of selectable values |

### Property Types

| Type | Description | User Experience |
|------|-------------|-----------------|
| `String` | Text input | Single-line text field |
| `Integer` | Whole number | Numeric input |
| `Long` | Large number | Numeric input |
| `Boolean` | True/false | Checkbox |
| `Select` | Choose from list | Dropdown (strict) |
| `FreeSelect` | Choose or enter | Dropdown (allows custom) |

### Property Examples

**Simple string:**

```groovy
api_endpoint(
    title: 'API Endpoint',
    description: 'The API URL',
    required: true,
    defaultValue: 'https://api.example.com'
)
```

**Integer with default:**

```groovy
timeout(
    title: 'Timeout (seconds)',
    type: 'Integer',
    defaultValue: '30'
)
```

**Boolean checkbox:**

```groovy
enable_debug(
    title: 'Enable Debug Logging',
    type: 'Boolean',
    defaultValue: 'false'
)
```

**Select dropdown:**

```groovy
environment(
    title: 'Environment',
    type: 'Select',
    values: ['dev', 'staging', 'production'],
    defaultValue: 'dev'
)
```

**Free select (allows custom values):**

```groovy
region(
    title: 'Region',
    type: 'FreeSelect',
    values: ['us-east-1', 'us-west-2', 'eu-west-1'],
    description: 'Select or enter AWS region'
)
```

**Using assignment form:**

```groovy
configuration {
    // Quick string property
    message = 'Default message'
    
    // Quick select property
    priority = ['low', 'medium', 'high']
    
    // Detailed property with validation
    timeout(
        title: 'Timeout',
        type: 'Integer',
        required: true
    )
}
```

### Property Validation

Add custom validation by providing a closure. The `it` variable contains the property value:

```groovy
phone_number(
    title: 'Phone Number',
    description: 'Enter 10-digit phone number'
) {
    it.replaceAll(/[^\d]/, '') ==~ /^\d{10}$/
}
```

**More validation examples:**

```groovy
// Email validation
email(title: 'Email Address') {
    it ==~ /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/
}

// URL validation
webhook_url(title: 'Webhook URL') {
    it.startsWith('http://') || it.startsWith('https://')
}

// Range validation
port(title: 'Port Number', type: 'Integer') {
    def portNum = it as Integer
    portNum >= 1 && portNum <= 65535
}
```

### Property Scopes

Control where property values are resolved from:

```groovy
api_key(
    title: 'API Key',
    scope: PropertyScope.Project,  // Or just 'Project'
    required: true
)
```

**Available scopes:**
- `Instance` (default) - Job-level configuration
- `Project` - Project properties
- `Framework` - Framework properties
- `ProjectOnly` - Only project (no framework)
- `InstanceOnly` - Only instance (no project/framework)

See [Property Scopes](/developer/plugin-properties.md#property-scopes) for complete documentation.

::: tip Validation and Scopes
Properties with `Instance` scope show validation errors when saving the Job. Properties with `Project` or `Framework` scope are not shown in the GUI, so validation only occurs when the plugin executes.
:::

## Plugin Implementation

### Notification Plugin Example

Complete notification plugin with configuration and event handlers:

```groovy
import com.dtolabs.rundeck.plugins.notification.NotificationPlugin
import groovy.json.JsonOutput
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse
import java.net.URI

rundeckPlugin(NotificationPlugin) {
    title = 'Slack Notifier'
    description = 'Sends notifications to Slack'
    version = '1.0'
    author = 'Ops Team'
    
    metadata = [
        faicon: 'slack'
    ]
    
    configuration {
        webhook_url(
            title: 'Slack Webhook URL',
            description: 'Your Slack incoming webhook URL',
            required: true
        )
        channel(
            title: 'Channel',
            description: 'Slack channel (optional)',
            required: false
        )
        username(
            title: 'Bot Username',
            defaultValue: 'Rundeck'
        )
        notify_on_start(
            title: 'Notify on Start',
            type: 'Boolean',
            defaultValue: 'false'
        )
    }
    
    onstart { Map executionData, Map config ->
        if (config.notify_on_start == 'true') {
            def message = "Job *${executionData.job.name}* started"
            return sendSlackMessage(config, message, 'good')
        }
        true
    }
    
    onsuccess { Map executionData, Map config ->
        def duration = executionData.execution.dateEnded.time - 
                      executionData.execution.dateStarted.time
        def message = "Job *${executionData.job.name}* succeeded in ${duration}ms"
        sendSlackMessage(config, message, 'good')
    }
    
    onfailure { Map executionData, Map config ->
        def message = "Job *${executionData.job.name}* failed!"
        sendSlackMessage(config, message, 'danger')
    }
    
    onavgduration { Map executionData, Map config ->
        def message = "Job *${executionData.job.name}* exceeded average duration"
        sendSlackMessage(config, message, 'warning')
    }
}

def sendSlackMessage(Map config, String message, String color) {
    try {
        def payload = [
            text: message,
            username: config.username,
            attachments: [[
                color: color,
                text: message
            ]]
        ]
        
        if (config.channel) {
            payload.channel = config.channel
        }
        
        def client = HttpClient.newHttpClient()
        def request = HttpRequest.newBuilder()
            .uri(URI.create(config.webhook_url))
            .header('Content-Type', 'application/json')
            .POST(HttpRequest.BodyPublishers.ofString(JsonOutput.toJson(payload)))
            .build()
        
        def response = client.send(request, HttpResponse.BodyHandlers.ofString())
        
        if (response.statusCode() == 200) {
            println("Notification sent successfully")
            return true
        } else {
            System.err.println("Failed to send notification: ${response.statusCode()}")
            return false
        }
    } catch (Exception e) {
        System.err.println("Error sending notification: ${e.message}")
        e.printStackTrace()
        return false
    }
}
```

### Log Filter Plugin Example

```groovy
import com.dtolabs.rundeck.plugins.logs.LogFilterPlugin

rundeckPlugin(LogFilterPlugin) {
    title = 'Metric Extractor'
    description = 'Extracts metrics from log output'
    version = '1.0'
    
    configuration {
        pattern(
            title: 'Metric Pattern',
            description: 'Regex pattern to match metrics',
            required: true,
            defaultValue: 'METRIC: (\\w+)=(\\d+)'
        )
    }
    
    // Initialize the filter
    def metrics = [:]
    
    // Process each log line
    handleEvent { event ->
        def matcher = event.message =~ config.pattern
        if (matcher) {
            def name = matcher[0][1]
            def value = matcher[0][2] as Integer
            metrics[name] = value
        }
        // Pass through the event
        event
    }
    
    // Called when complete
    complete {
        if (metrics) {
            println("Collected metrics: ${metrics}")
            // Export to data context
            outputContext.metrics = metrics
        }
    }
}
```

## Accessing Execution Data

### Available Data in Notification Plugins

The `executionData` map contains:

```groovy
executionData.job.name           // Job name
executionData.job.group          // Job group
executionData.job.project        // Project name
executionData.execution.id       // Execution ID
executionData.execution.status   // Status (succeeded, failed, etc.)
executionData.execution.user     // User who ran the job
executionData.execution.dateStarted   // Start time
executionData.execution.dateEnded     // End time (if finished)
```

### Accessing Configuration

Configuration values are available in the `config` map:

```groovy
onsuccess { Map executionData, Map config ->
    def url = config.webhook_url
    def channel = config.channel
    def enableDebug = config.enable_debug == 'true'
    
    // Use configuration values
}
```

## Best Practices

### Error Handling

Always handle errors gracefully:

```groovy
onsuccess { Map executionData, Map config ->
    try {
        sendNotification(config, executionData)
        return true  // Success
    } catch (Exception e) {
        System.err.println("Failed to send notification: ${e.message}")
        e.printStackTrace()
        return false  // Failure
    }
}
```

### Logging

Use `println` for info and `System.err.println` for errors:

```groovy
println("Sending notification to ${config.webhook_url}")
System.err.println("ERROR: Failed to connect")
```

### Return Values

Notification methods should return:
- `true` for success
- `false` for failure

```groovy
onsuccess { executionData, config ->
    def success = performAction()
    return success  // Return boolean
}
```

### Validation

Validate configuration early:

```groovy
onsuccess { executionData, config ->
    if (!config.webhook_url) {
        System.err.println("ERROR: Webhook URL not configured")
        return false
    }
    
    if (!config.webhook_url.startsWith('http')) {
        System.err.println("ERROR: Invalid webhook URL")
        return false
    }
    
    // Continue with valid config
}
```

### Resource Cleanup

Clean up resources properly:

```groovy
def client = null
try {
    client = createHttpClient()
    // Use client
} finally {
    if (client) {
        client.close()
    }
}
```

## Development Workflow

### Initial Development

1. Create your `.groovy` file in the plugins directory
2. Restart Rundeck to load the plugin
3. Test the plugin in a Job

### Iterative Development

After the initial load:

1. Edit the `.groovy` file
2. **Enable hot reloading** (see below) - or restart Rundeck to pick up the change
3. Test your changes

::: tip Hot Reloading
Groovy plugins support hot reloading after the initial load, but it's **opt-in** - you must set the `plugin.refreshDelay` JVM system property first. See below to enable it.
:::

#### Enabling Hot Reloading

`plugin.refreshDelay` sets, in milliseconds, how often Rundeck checks the `.groovy` file for changes. Set it via `RDECK_JVM_OPTS` (see [System Properties Configuration](/administration/configuration/system-properties.md) for how to set JVM system properties for your installation type):

```bash
# /etc/sysconfig/rundeckd (RPM) or /etc/default/rundeckd (DEB)
RDECK_JVM_OPTS="-Dplugin.refreshDelay=5000"
```

For Docker, add `-Dplugin.refreshDelay=5000` to the container's `command`.

::: warning Hot Reloading Caveat
Enabling `plugin.refreshDelay` makes Rundeck watch every Groovy plugin in `libext`, not just the one you're editing. If any of those files is empty or fails to evaluate, the application can fail to start. Verify your `libext` directory doesn't contain broken or empty `.groovy` files before enabling this in a shared environment.
:::

### Debugging

Add debug logging:

```groovy
if (config.enable_debug == 'true') {
    println("DEBUG: Configuration: ${config}")
    println("DEBUG: Execution data: ${executionData}")
}
```

Test with simple executions first:

```groovy
// Add a simple test handler
onstart { executionData, config ->
    println("Plugin loaded successfully!")
    println("Config: ${config}")
    true
}
```

## Limitations

Groovy plugins currently have some limitations:

**Supported Plugin Types:**
- ✅ Notification
- ✅ Logging (StreamingLogWriter, StreamingLogReader, ExecutionFileStorage)
- ✅ Log Filter
- ✅ Content Converter
- ❌ Node Steps
- ❌ Workflow Steps
- ❌ Node Executors
- ❌ File Copiers
- ❌ Resource Model Sources
- ❌ And others...

**Workarounds:**
- For unsupported types, use [Java plugins](/developer/java-plugin-development.md) or [Script plugins](/developer/script-plugin-development.md)
- For simple use cases, Script plugins are often easier
- For complex logic, Java plugins provide full control

## Related Documentation

- [Plugin Properties Reference](/developer/plugin-properties.md) - Property configuration details
- [Notification Plugins](/developer/notification-plugins.md#groovy-plugin-type) - Groovy notification plugins
- [Logging Plugins](/developer/logging-plugins.md) - Groovy logging plugins
- [Log Filter Plugins](/developer/log-filter-plugins.md#groovy-logfilter) - Groovy log filters
- [Java Plugin Development](/developer/java-plugin-development.md) - For unsupported types
- [Script Plugin Development](/developer/script-plugin-development.md) - Alternative approach
