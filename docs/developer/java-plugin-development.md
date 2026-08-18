# Java Plugin Development

## Overview

Java plugins provide the most powerful and flexible way to extend Rundeck. They offer:

- **Full Access** to Rundeck's internal APIs
- **Best Performance** for complex operations
- **Type Safety** with compile-time checking
- **Professional IDE Support** for development and debugging
- **Rich Ecosystem** of Java libraries and frameworks
- **Support for All Plugin Types**

Java plugins are distributed as `.jar` files containing one or more service providers and their dependencies.

## Quick Start

### 1. Set Up Development Environment

**Requirements:**
- JDK 17 or later
- Maven or Gradle build tool
- IDE (IntelliJ IDEA, Eclipse, or VS Code recommended)

### 2. Add Rundeck Dependencies

**For Gradle:**

```groovy
dependencies {
    implementation(group:'org.rundeck', name: 'rundeck-core', version: '{{$rundeckVersionFull}}')
}
```

**For Maven:**

```xml
<dependencies>
   <dependency>
      <groupId>org.rundeck</groupId>
      <artifactId>rundeck-core</artifactId>
      <version>{{$rundeckVersionFull}}</version>
      <scope>compile</scope>
   </dependency>
</dependencies>
```

**For Storage Plugins:**

Also add `rundeck-storage-api`:

```groovy
implementation(group:'org.rundeck', name: 'rundeck-storage-api', version: '{{$rundeckVersionFull}}')
```

Rundeck's jars are published to Maven Central:
- [org.rundeck:rundeck-core](https://search.maven.org/artifact/org.rundeck/rundeck-core/{{$rundeckVersionFull}}/jar)
- [org.rundeck:rundeck-storage-api](https://search.maven.org/artifact/org.rundeck/rundeck-storage-api/{{$rundeckVersionFull}}/jar)

### 3. Create Provider Class

```java
package com.example.rundeck.plugin;

import com.dtolabs.rundeck.core.plugins.Plugin;
import com.dtolabs.rundeck.plugins.ServiceNameConstants;
import com.dtolabs.rundeck.plugins.step.StepPlugin;
import com.dtolabs.rundeck.plugins.step.PluginStepContext;
import com.dtolabs.rundeck.plugins.descriptions.*;

@Plugin(name = "my-plugin", service = ServiceNameConstants.WorkflowStep)
@PluginDescription(title = "My Plugin", description = "Does something useful")
public class MyPlugin implements StepPlugin {
    
    @PluginProperty(
        title = "Message",
        description = "Message to display",
        required = true
    )
    private String message;
    
    @Override
    public void executeStep(PluginStepContext context, 
                          Map<String, Object> configuration) 
                          throws StepException {
        
        context.getLogger().log(2, "Message: " + message);
    }
}
```

### 4. Build and Package

Configure your build to create a plugin JAR with the proper manifest. The JAR must include specific metadata in `META-INF/MANIFEST.MF`.

**Example Gradle configuration:**

```groovy
jar {
    manifest {
        attributes(
            'Rundeck-Plugin-Version': '1.2',
            'Rundeck-Plugin-Archive': 'true',
            'Rundeck-Plugin-Classnames': 'com.example.rundeck.plugin.MyPlugin',
            'Rundeck-Plugin-File-Version': '1.0',
            'Rundeck-Plugin-Author': 'Your Name',
            'Rundeck-Plugin-URL': 'https://example.com',
            'Rundeck-Plugin-Date': new Date().format("yyyy-MM-dd'T'HH:mm:ssZ")
        )
    }
}
```

### 5. Deploy

Copy the JAR file to Rundeck's plugin directory:
- Launcher: `$RDECK_BASE/libext`
- RPM/DEB: `/var/lib/rundeck/libext`

Restart Rundeck or use dynamic plugin loading if enabled.

## JAR Manifest Requirements

Your plugin JAR must have these entries in `META-INF/MANIFEST.MF`:

### Required Entries

| Manifest Entry | Description |
|----------------|-------------|
| `Rundeck-Plugin-Version` | Plugin mechanism version (use `1.2`) |
| `Rundeck-Plugin-Archive` | Must be `true` |
| `Rundeck-Plugin-Classnames` | Comma-separated list of provider class names |

**Example:**

```
Rundeck-Plugin-Version: 1.2
Rundeck-Plugin-Archive: true
Rundeck-Plugin-Classnames: com.example.MyPlugin,com.example.MyOtherPlugin
```

### Optional Entries

| Manifest Entry | Description |
|----------------|-------------|
| `Rundeck-Plugin-File-Version` | Your plugin version (e.g., `1.0`, `2.1.3`) |
| `Rundeck-Plugin-Author` | Author name |
| `Rundeck-Plugin-URL` | Website URL |
| `Rundeck-Plugin-Date` | Publication date (ISO8601 format) |
| `Rundeck-Plugin-Libs` | Space-separated list of bundled dependencies |

### Plugin Version

`Rundeck-Plugin-Version: 1.2` indicates the plugin mechanism version:

- `1.2` - Current version, enables localization and custom icons
- `1.1` - Previous version
- `1.0` - Original version

### Plugin File Version

`Rundeck-Plugin-File-Version` is used to load only the newest plugin file when multiple providers of the same name and type are present.

## Including Dependencies

If your plugin requires external libraries not included with Rundeck, you can bundle them in your JAR.

### Check Available Libraries

Look in `/var/lib/rundeck/lib` to see third-party JARs already available at runtime.

### Bundle Dependencies

**1. Add to Manifest:**

```
Rundeck-Plugin-Libs: lib/somejar-1.2.jar lib/anotherjar-1.3.jar
```

**2. Include in JAR structure:**

```
META-INF/
META-INF/MANIFEST.MF
com/
com/mycompany/
com/mycompany/rundeck/
com/mycompany/rundeck/plugin/
com/mycompany/rundeck/plugin/MyPlugin.class
lib/
lib/somejar-1.2.jar
lib/anotherjar-1.3.jar
```

## Provider Classes

A "Provider Class" is a Java class that:
- Implements a specific Rundeck service interface
- Has the `@Plugin` annotation
- Declares its service type and provider name

### Basic Structure

```java
@Plugin(name="myprovider", service="NodeExecutor")
public class MyProvider implements NodeExecutor {
    // Implementation
}
```

### Naming Your Plugin

Choose a unique but simple name for your provider:
- Use lowercase with hyphens: `my-custom-plugin`
- Avoid generic names: ❌ `step` ✅ `custom-api-step`
- Be descriptive: `aws-s3-uploader`, `jira-ticket-creator`

### Constructors

Your provider class must have at least a zero-argument constructor:

```java
public MyProvider() {
    // Initialize
}
```

Optionally, you can have a single-argument constructor that receives the Framework:

```java
public MyProvider(com.dtolabs.rundeck.core.common.Framework framework) {
    this.framework = framework;
}
```

### Logging

Log messages using the ExecutionListener:

```java
context.getExecutionListener().log(2, "Processing item: " + item);
```

Or write to standard output/error (will be captured):

```java
System.out.println("Processing...");
System.err.println("Warning: something happened");
```

## Available Service Types

Java plugins can implement any of these services:

### Node Execution

- **[NodeExecutor](/developer/node-executor-plugins.md)** - Execute commands on nodes
- **[FileCopier](/developer/file-copier-plugins.md)** - Copy files to nodes

### Workflow Steps

- **[WorkflowStep](/developer/step-plugins.md)** - Workflow-level step
- **[WorkflowNodeStep](/developer/step-plugins.md)** - Node-level step
- **[RemoteScriptNodeStep](/developer/step-plugins.md)** - Generate remote scripts

### Resource Model

- **[ResourceModelSource](/developer/resource-model-source-plugins.md)** - Provide node inventory
- **[ResourceFormatParser](/developer/resource-model-format-plugins.md)** - Parse resource documents
- **[ResourceFormatGenerator](/developer/resource-model-format-plugins.md)** - Generate resource documents

### Notifications and Events

- **[Notification](/developer/notification-plugins.md)** - Send notifications on job events
- **[WebhookEventPlugin](/developer/webhook-plugins.md)** - Process webhooks

### Logging

- **[ExecutionFileStorage](/developer/logging-plugins.md)** - Store/retrieve execution files
- **[StreamingLogWriter](/developer/logging-plugins.md)** - Write log events
- **[StreamingLogReader](/developer/logging-plugins.md)** - Read log events
- **[LogFilterPlugin](/developer/log-filter-plugins.md)** - Filter/transform log output

### Storage

- **[Storage](/developer/storage-plugins.md)** - Backend storage for data
- **[StorageConverter](/developer/storage-converter-plugins.md)** - Encrypt/decrypt stored content

### Orchestration

- **[Orchestrator](/developer/orchestrator-plugins.md)** - Control node execution order

### Configuration

- **[PluginGroup](/developer/plugin-groups.md)** - Define shared properties
- **[OptionValuesPlugin](/developer/option-values-plugins.md)** - Provide dynamic option values
- **[FileUploadPlugin](/developer/file-upload-plugins.md)** - Handle file uploads
- **[UserGroupSourcePlugin](/developer/user-group-source-plugins.md)** - Integrate authentication

### Lifecycle

- **[ExecutionLifecyclePlugin](/developer/execution-lifecycle.md)** - Hook execution lifecycle
- **[JobLifecyclePlugin](/developer/job-lifecycle.md)** - Hook job lifecycle
- **[AuditEventListenerPlugin](/developer/audit-events-listeners.md)** - Listen to audit events

### User Interface

- **[UIPlugin](/developer/ui-plugins.md)** - Add custom UI components
- **[ContentConverterPlugin](/developer/content-converter-plugins.md)** - Render content as HTML

## Plugin Annotations

Annotations provide a declarative way to define plugin metadata and configuration properties.

::: warning Limitation
ResourceModelSource, NodeExecutor, and FileCopier plugins currently do not support description annotations. Use the interface-based approach for these plugin types.
:::

### @Plugin Annotation

Required for all provider classes:

```java
@Plugin(name="myplugin", service=ServiceNameConstants.WorkflowStep)
public class MyPlugin implements StepPlugin {
    // ...
}
```

### @PluginDescription Annotation

Define display name and description:

```java
@Plugin(name="myplugin", service=ServiceNameConstants.WorkflowStep)
@PluginDescription(title="My Plugin", description="Performs a custom step")
public class MyPlugin implements StepPlugin {
    // ...
}
```

**Attributes:**
- `title` - Display name shown in GUI
- `description` - Descriptive text shown next to the display name

If not provided, the plugin display name will be the same as the provider name.

### @PluginMetadata Annotation

Provide additional metadata like icons:

```java
@Plugin(name="myplugin", service=ServiceNameConstants.WorkflowStep)
@PluginMetadata(key="faicon", value="check-circle")
public class MyPlugin implements StepPlugin {
    // ...
}
```

**For multiple metadata entries:**

```java
@Plugin(name="myplugin", service=ServiceNameConstants.WorkflowStep)
@PluginMeta({
    @PluginMetadata(key="faicon", value="check-circle"),
    @PluginMetadata(key="glyphicon", value="ok-sign")
})
public class MyPlugin implements StepPlugin {
    // ...
}
```

**Available metadata keys:**
- `glyphicon` - Glyphicon icon name
- `faicon` - Font Awesome icon name
- `fabicon` - Font Awesome brand icon name

See [Provider Metadata](#provider-metadata) for details.

## Plugin Properties

Properties allow users to configure your plugin. Annotate class fields to define configuration properties.

### Supported Field Types

- `String`
- `Boolean` / `boolean`
- `Integer` / `int`
- `Long` / `long`
- `Set`, `List`, `String[]` (with `@SelectValues(multiOption = true)`)

### @PluginProperty Annotation

Basic property definition:

```java
@PluginProperty(
    name = "endpoint",
    title = "API Endpoint",
    description = "The API endpoint URL",
    required = true,
    defaultValue = "https://api.example.com"
)
private String endpoint;
```

**Attributes:**

| Attribute | Type | Description |
|-----------|------|-------------|
| `name` | String | Property identifier |
| `title` | String | Display name in GUI |
| `description` | String | Help text |
| `required` | boolean | Whether value is required (default: false) |
| `defaultValue` | String | Default value |
| `scope` | PropertyScope | Resolution scope. **The default when omitted depends on the service type** — `WorkflowStep`, `WorkflowNodeStep`, and `RemoteScriptNodeStep` default to `InstanceOnly` (no fallback to Project/System config), while `NodeExecutor`, `FileCopier`, `ResourceModelSource`, and `Notification` default to `Instance`. Always set `scope = PropertyScope.Instance` explicitly if the property should be configurable above the individual job/step level. See [Default Scope When `scope` Is Omitted](/developer/plugin-properties.md#default-scope-when-scope-is-omitted) |

### Property Types

**String Property:**

```java
@PluginProperty(title = "Name", description = "Your name", required = true)
private String name;
```

**Integer Property:**

```java
@PluginProperty(title = "Timeout", description = "Timeout in seconds", defaultValue = "30")
private int timeout;
```

**Boolean Property:**

```java
@PluginProperty(title = "Enable Logging", description = "Enable detailed logging")
private boolean enableLogging;
```

### @SelectValues Annotation

Create dropdown or multi-select properties:

**Single Select:**

```java
@PluginProperty(title = "Environment", description = "Target environment")
@SelectValues(values = {"dev", "staging", "production"})
private String environment;
```

**Free Select (with custom values allowed):**

```java
@PluginProperty(title = "Region", description = "AWS region")
@SelectValues(values = {"us-east-1", "us-west-2", "eu-west-1"}, freeSelect = true)
private String region;
```

**Multi-Select:**

```java
@PluginProperty(title = "Tags", description = "Select tags")
@SelectValues(values = {"web", "database", "cache", "storage"}, multiOption = true)
private Set<String> tags;
```

**Attributes:**
- `values` (String[]) - Available options
- `freeSelect` (boolean) - Allow custom values (default: false)
- `multiOption` (boolean) - Allow multiple selections (default: false)

::: tip
When `multiOption` is used with a String field, values are joined with commas.
:::

### @TextArea Annotation

Render as multi-line text area:

```java
@PluginProperty(title = "Script Content", description = "Enter script")
@TextArea
private String scriptContent;
```

### Property Scopes

Control where property values are resolved from:

```java
@PluginProperty(
    title = "API Key",
    scope = PropertyScope.Project
)
private String apiKey;
```

**Available scopes:**
- `InstanceOnly` - Only from instance configuration (default)
- `Instance` - Instance and all earlier levels
- `Framework` - Only framework properties
- `ProjectOnly` - Only project properties
- `Project` - Project and framework properties

See [Property Scopes](/developer/plugin-properties.md#property-scopes) for complete documentation.

### Advanced Property Options

Use rendering options for advanced display:

```java
@PluginProperty(title = "Password", description = "API password", required = true)
@PluginRenderingOptions({
    @PluginRenderingOption(key = StringRenderingConstants.DISPLAY_TYPE_KEY, 
                          value = "PASSWORD"),
    @PluginRenderingOption(key = StringRenderingConstants.SELECTION_ACCESSOR_KEY,
                          value = StringRenderingConstants.SELECTION_ACCESSOR_STORAGE_PATH)
})
private String password;
```

For complete rendering options, see [Property Rendering Options](/developer/plugin-properties.md#property-rendering-options).

## Plugin Descriptions (Non-Annotation Approach)

For plugin types that don't support annotations, or when you need more control, implement one of these interfaces:

### Describable Interface

Build the Description object yourself:

```java
public class MyPlugin implements NodeExecutor, Describable {
    
    @Override
    public Description getDescription() {
        return DescriptionBuilder.builder()
            .name("myplugin")
            .title("My Plugin")
            .description("Custom node executor")
            .property(PropertyUtil.string("endpoint", "Endpoint", 
                                         "API endpoint URL", true, null))
            .property(PropertyUtil.integer("timeout", "Timeout", 
                                          "Timeout in seconds", false, "30"))
            .build();
    }
    
    // Implementation methods...
}
```

### Collaborator Interface

Modify the builder:

```java
public class MyPlugin implements NodeExecutor, 
                                 DescriptionBuilder.Collaborator {
    
    @Override
    public void buildWith(DescriptionBuilder builder) {
        builder.property(PropertyUtil.string("endpoint", "Endpoint",
                                            "API endpoint URL", true, null));
    }
    
    // Implementation methods...
}
```

### Using PropertyBuilder

For fine-grained control:

```java
Property property = PropertyBuilder.builder()
    .string("apiKey")
    .title("API Key")
    .description("Your API key")
    .required(true)
    .renderingOption(StringRenderingConstants.DISPLAY_TYPE_KEY,
                    StringRenderingConstants.DisplayType.PASSWORD)
    .build();
```

## Provider Lifecycle

### Instantiation and Reuse

- Provider classes are instantiated when needed by the Framework
- Instances are retained and reused across multiple executions
- The Framework object may exist across multiple executions
- Provider instances may be used by multiple threads

### Thread Safety

::: warning Important
Your provider class should:
- Avoid instance fields (use parameters passed to methods)
- Be thread-safe in all operations
- Not maintain state between invocations
:::

**Bad (not thread-safe):**

```java
public class BadPlugin implements StepPlugin {
    private String lastResult;  // ❌ Instance field
    
    @Override
    public void executeStep(PluginStepContext context, 
                          Map<String, Object> config) {
        lastResult = process();  // ❌ Not thread-safe
    }
}
```

**Good (thread-safe):**

```java
public class GoodPlugin implements StepPlugin {
    
    @Override
    public void executeStep(PluginStepContext context,
                          Map<String, Object> config) {
        String result = process();  // ✅ Local variable
        context.getLogger().log(2, "Result: " + result);
    }
}
```

## Failure Handling

Some plugin methods return a "Result" interface indicating success or failure.

### Failure Reasons

Use `FailureReason` to indicate why an operation failed:

```java
return new NodeStepResultImpl(
    NodeStepFailureReason.ConnectionFailure,
    "Failed to connect to " + hostname,
    node
);
```

**Common Failure Reasons:**

From [NodeStepFailureReason]({{$javaDocBase}}/com/dtolabs/rundeck/core/execution/workflow/steps/node/NodeStepFailureReason.html):
- `ConnectionFailure` - Connection failed
- `AuthenticationFailure` - Authentication failed
- `HostNotFound` - Host not found
- `IOFailure` - I/O error
- `NonZeroResultCode` - Non-zero exit code

From [StepFailureReason]({{$javaDocBase}}/com/dtolabs/rundeck/core/execution/workflow/steps/StepFailureReason.html):
- `ConfigurationFailure` - Configuration error
- `PluginFailed` - Plugin-specific failure

### Creating Custom Failure Reasons

Define an enum implementing `FailureReason`:

```java
public enum CustomFailureReason implements FailureReason {
    ApiCallFailed("API call failed"),
    InvalidResponse("Invalid API response"),
    RateLimitExceeded("Rate limit exceeded");
    
    private String message;
    
    CustomFailureReason(String message) {
        this.message = message;
    }
    
    @Override
    public String toString() {
        return message;
    }
}
```

Use in your plugin:

```java
return new StepExecutionResultImpl(
    CustomFailureReason.ApiCallFailed,
    "API returned error code: " + errorCode
);
```

## Localization and Icons

Java plugins support internationalization and custom icons.

### Enable Localization

Set manifest entry:
```
Rundeck-Plugin-Version: 1.2
```

Include message files in your JAR:
```
resources/
└── i18n/
    ├── messages.properties
    ├── messages_es.properties
    ├── messages_fr.properties
    └── WorkflowNodeStep.myplugin.messages.properties
```

See [Plugin Localization](/developer/plugin-properties.md#plugin-localization) for complete documentation.

### Add Icons

Include icon files in your JAR:

```
resources/
├── icon.png
└── WorkflowNodeStep.myplugin.icon.png
```

Or use metadata for CSS icons:

```java
@PluginMetadata(key="faicon", value="check-circle")
```

See [Plugin Icons](/developer/plugin-properties.md#plugin-icons) for details.

## Complete Example

Here's a complete example of a Java plugin that calls an external API:

```java
package com.example.rundeck.plugin;

import com.dtolabs.rundeck.core.plugins.Plugin;
import com.dtolabs.rundeck.plugins.ServiceNameConstants;
import com.dtolabs.rundeck.plugins.step.PluginStepContext;
import com.dtolabs.rundeck.plugins.step.StepException;
import com.dtolabs.rundeck.plugins.step.StepPlugin;
import com.dtolabs.rundeck.plugins.descriptions.*;

import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import java.time.Duration;

@Plugin(name = "api-caller", service = ServiceNameConstants.WorkflowStep)
@PluginDescription(
    title = "API Caller",
    description = "Calls an external REST API"
)
@PluginMetadata(key = "faicon", value = "cloud")
public class ApiCallerPlugin implements StepPlugin {
    
    @PluginProperty(
        title = "API Endpoint",
        description = "The API endpoint URL",
        required = true
    )
    private String endpoint;
    
    @PluginProperty(
        title = "Method",
        description = "HTTP method",
        defaultValue = "GET",
        required = true
    )
    @SelectValues(values = {"GET", "POST", "PUT", "DELETE"})
    private String method;
    
    @PluginProperty(
        title = "Timeout (seconds)",
        description = "Request timeout in seconds",
        defaultValue = "30"
    )
    private int timeout;
    
    @PluginProperty(
        title = "API Key",
        description = "API authentication key",
        required = false,
        scope = PropertyScope.Project
    )
    @SelectValues(values = {})
    @PluginRenderingOptions({
        @PluginRenderingOption(
            key = StringRenderingConstants.DISPLAY_TYPE_KEY,
            value = "PASSWORD"
        ),
        @PluginRenderingOption(
            key = StringRenderingConstants.SELECTION_ACCESSOR_KEY,
            value = StringRenderingConstants.SELECTION_ACCESSOR_STORAGE_PATH
        )
    })
    private String apiKey;
    
    @Override
    public void executeStep(PluginStepContext context,
                          Map<String, Object> configuration)
                          throws StepException {
        
        context.getLogger().log(2, "Calling API: " + endpoint);
        
        try {
            HttpClient client = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(timeout))
                .build();
            
            HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
                .uri(URI.create(endpoint))
                .timeout(Duration.ofSeconds(timeout));
            
            if (apiKey != null && !apiKey.isEmpty()) {
                requestBuilder.header("Authorization", "Bearer " + apiKey);
            }
            
            HttpRequest request = requestBuilder.method(method,
                HttpRequest.BodyPublishers.noBody()).build();
            
            HttpResponse<String> response = client.send(request,
                HttpResponse.BodyHandlers.ofString());
            
            context.getLogger().log(2, 
                "Response code: " + response.statusCode());
            context.getLogger().log(3, 
                "Response body: " + response.body());
            
            if (response.statusCode() >= 400) {
                throw new StepException(
                    "API call failed with status: " + response.statusCode(),
                    StepFailureReason.PluginFailed
                );
            }
            
        } catch (Exception e) {
            throw new StepException(
                "Failed to call API: " + e.getMessage(),
                e,
                StepFailureReason.PluginFailed
            );
        }
    }
}
```

## Best Practices

### Error Handling

Always provide meaningful error messages:

```java
try {
    // Operation
} catch (IOException e) {
    throw new StepException(
        "Failed to read file " + filename + ": " + e.getMessage(),
        e,
        StepFailureReason.IOFailure
    );
}
```

### Logging

Use appropriate log levels:

```java
context.getLogger().log(0, "ERROR: Critical failure");
context.getLogger().log(1, "WARN: Something unexpected");
context.getLogger().log(2, "INFO: Normal operation");
context.getLogger().log(3, "VERBOSE: Detailed info");
context.getLogger().log(4, "DEBUG: Debug information");
```

### Resource Cleanup

Always clean up resources:

```java
HttpClient client = null;
try {
    client = HttpClient.newHttpClient();
    // Use client
} finally {
    if (client != null) {
        // Cleanup if needed
    }
}
```

### Configuration Validation

Validate configuration early:

```java
@Override
public void executeStep(PluginStepContext context,
                      Map<String, Object> config) throws StepException {
    
    if (endpoint == null || endpoint.trim().isEmpty()) {
        throw new StepException(
            "Endpoint is required",
            StepFailureReason.ConfigurationFailure
        );
    }
    
    if (!endpoint.startsWith("http")) {
        throw new StepException(
            "Endpoint must be a valid URL",
            StepFailureReason.ConfigurationFailure
        );
    }
    
    // Continue with execution...
}
```

## Development Tools

### Plugin Bootstrap Tool (Recommended)

The [Plugin Bootstrap Tool](/developer/plugin-bootstrap.md) generates complete Java plugin projects with one command, saving hours of setup time.

**Quick Start:**

```bash
# Generate a Workflow Step plugin
rundeck-plugin-bootstrap -n MyPlugin -t java -s WorkflowStep -d ~/projects

# Generated structure includes:
# - Complete Gradle project with Rundeck dependencies
# - Template plugin class with annotations
# - Test scaffolding
# - Build configuration
```

**Supported Java Plugin Types:**
- WorkflowStep, WorkflowNodeStep
- Notification
- ResourceModelSource
- NodeExecutor
- LogFilter
- Orchestrator
- Option (OptionValues)

See [Plugin Bootstrap Tool](/developer/plugin-bootstrap.md) for complete documentation and examples.

### Maven Archetype

Use the [Rundeck Plugin Archetype](https://github.com/rundeck/rundeck-plugin-archetype) for Maven projects.

### Testing

Test your plugins locally before deployment:

```java
@Test
public void testPluginExecution() throws StepException {
    MyPlugin plugin = new MyPlugin();
    plugin.endpoint = "https://api.example.com";
    plugin.timeout = 30;
    
    PluginStepContext context = mock(PluginStepContext.class);
    when(context.getLogger()).thenReturn(mock(PluginLogger.class));
    
    plugin.executeStep(context, new HashMap<>());
    
    verify(context.getLogger()).log(eq(2), anyString());
}
```

## Related Documentation

- [Plugin Properties Reference](/developer/plugin-properties.md) - Complete property documentation
- [Script Plugin Development](/developer/script-plugin-development.md) - Alternative approach
- [Plugin Development Overview](/developer/) - Compare all approaches
- [Step Plugins](/developer/step-plugins.md) - Workflow and node steps
- [Notification Plugins](/developer/notification-plugins.md) - Job notifications
- [Java API Documentation](https://javadoc.io/doc/org.rundeck/rundeck-core/) - JavaDoc
