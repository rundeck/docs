# Plugin Groups

## Overview

Plugin Groups provide a way to define shared configuration properties across multiple related plugins. Instead of duplicating the same properties (like credentials, API URLs, or connection settings) in every plugin, you define them once in a Plugin Group and reference them from your plugins.

**Common Use Cases:**
- **Service Integrations** - Multiple plugins that interact with the same external service (Jira, Slack, AWS, etc.)
- **Shared Credentials** - Common authentication across notification, node executor, and step plugins
- **Connection Configuration** - Shared API endpoints, timeouts, retry settings
- **Environment Settings** - Common configuration that varies by environment (dev/staging/prod)

**Benefits:**
- **Reduce Duplication** - Define common properties once, use everywhere
- **Easier Configuration** - Users configure shared settings in one place
- **Consistency** - Ensures all related plugins use the same credentials/settings
- **Centralized Updates** - Change shared config without updating individual plugins
- **Better Organization** - Groups related plugins logically in the UI

**Example Scenario:**

You have three plugins that all interact with Jira:
- A Notification plugin to create tickets
- A Node Step plugin to update ticket status
- An Option Values plugin to load ticket types

Instead of configuring Jira URL, credentials, and project key three separate times, you create a "Jira Connection" Plugin Group that all three plugins share.

## How Plugin Groups Work

### Configuration Flow

1. **Define Plugin Group** - Create a PluginGroup class with shared properties
2. **Reference from Plugins** - Other plugins implement `ConfiguredBy<YourGroup>`
3. **User Configures Group** - In Rundeck UI, user configures the group once at project or framework level
4. **Rundeck Injects Group** - When your plugin runs, Rundeck provides a configured group instance
5. **Plugin Uses Shared Config** - Your plugin accesses group properties via the injected instance

### In the Rundeck UI

When you install a Plugin Group and plugins that use it:

1. **System Configuration Page** - Plugin Group appears as a configurable plugin
2. **Project Configuration** - Group can be configured per-project
3. **Plugin Selection** - Plugins that use the group automatically inherit its configuration
4. **Single Configuration Point** - Users configure shared settings once, all plugins use them

::: tip
Plugin Groups are configured separately from the plugins that use them. Think of them as "configuration templates" that multiple plugins reference.
:::

## Defining a Plugin Group

Plugin Groups are Java plugins that implement the [PluginGroup]({{$javaDocBase}}/com/dtolabs/rundeck/plugins/config/PluginGroup.html) interface.

### Basic Structure

```java
import com.dtolabs.rundeck.core.plugins.Plugin;
import com.dtolabs.rundeck.plugins.ServiceNameConstants;
import com.dtolabs.rundeck.plugins.config.PluginGroup;
import com.dtolabs.rundeck.plugins.descriptions.PluginDescription;
import com.dtolabs.rundeck.plugins.descriptions.PluginProperty;

@Plugin(name="my-service-config", service=ServiceNameConstants.PluginGroup)
@PluginDescription(
    title = "My Service Configuration",
    description = "Shared connection settings for My Service integrations"
)
public class MyServicePluginGroup implements PluginGroup {
    
    @PluginProperty(
        title = "API URL",
        description = "Base URL for the service API",
        required = true,
        defaultValue = "https://api.myservice.com"
    )
    private String apiUrl;
    
    @PluginProperty(
        title = "API Token",
        description = "Authentication token for API access",
        required = true
    )
    private String apiToken;
    
    @PluginProperty(
        title = "Timeout (seconds)",
        description = "Connection timeout in seconds",
        defaultValue = "30"
    )
    private Integer timeout;
    
    // Getters for plugins to access configuration
    public String getApiUrl() {
        return apiUrl;
    }
    
    public String getApiToken() {
        return apiToken;
    }
    
    public Integer getTimeout() {
        return timeout;
    }
}
```

### Key Points

- **Service Name**: Must be `ServiceNameConstants.PluginGroup`
- **Plugin Name**: Use descriptive names (e.g., `jira-connection`, `aws-config`)
- **Properties**: Define all shared configuration using `@PluginProperty`
- **Getters**: Provide getter methods for consuming plugins to access values
- **Interface**: Only needs to implement `PluginGroup` (marker interface, no methods)

### Complete Example: Jira Integration Plugin Group

```java
package com.example.rundeck.jira;

import com.dtolabs.rundeck.core.plugins.Plugin;
import com.dtolabs.rundeck.plugins.ServiceNameConstants;
import com.dtolabs.rundeck.plugins.config.PluginGroup;
import com.dtolabs.rundeck.plugins.descriptions.PluginDescription;
import com.dtolabs.rundeck.plugins.descriptions.PluginProperty;
import com.dtolabs.rundeck.plugins.descriptions.SelectValues;
import com.dtolabs.rundeck.plugins.descriptions.RenderingOption;
import com.dtolabs.rundeck.plugins.descriptions.RenderingOptions;

import static com.dtolabs.rundeck.core.plugins.configuration.StringRenderingConstants.*;

@Plugin(name = "jira-connection", service = ServiceNameConstants.PluginGroup)
@PluginDescription(
    title = "Jira Connection",
    description = "Shared connection and authentication settings for Jira integration plugins"
)
public class JiraConnectionGroup implements PluginGroup {
    
    @PluginProperty(
        title = "Jira URL",
        description = "Base URL of your Jira instance (e.g., https://company.atlassian.net)",
        required = true
    )
    @RenderingOptions({
        @RenderingOption(key = GROUP_NAME, value = "Connection")
    })
    private String jiraUrl;
    
    @PluginProperty(
        title = "Username/Email",
        description = "Jira username or email address",
        required = true
    )
    @RenderingOptions({
        @RenderingOption(key = GROUP_NAME, value = "Authentication")
    })
    private String username;
    
    @PluginProperty(
        title = "API Token",
        description = "Jira API token or password",
        required = true
    )
    @RenderingOptions({
        @RenderingOption(key = DISPLAY_TYPE_KEY, value = "PASSWORD"),
        @RenderingOption(key = GROUP_NAME, value = "Authentication")
    })
    private String apiToken;
    
    @PluginProperty(
        title = "Project Key",
        description = "Default Jira project key (e.g., PROJ)",
        required = false
    )
    @RenderingOptions({
        @RenderingOption(key = GROUP_NAME, value = "Defaults")
    })
    private String projectKey;
    
    @PluginProperty(
        title = "Connection Timeout",
        description = "HTTP connection timeout in seconds",
        defaultValue = "30"
    )
    @RenderingOptions({
        @RenderingOption(key = GROUP_NAME, value = "Advanced")
    })
    private Integer connectionTimeout;
    
    @PluginProperty(
        title = "Verify SSL",
        description = "Verify SSL certificates",
        defaultValue = "true"
    )
    @RenderingOptions({
        @RenderingOption(key = GROUP_NAME, value = "Advanced")
    })
    private Boolean verifySsl;
    
    // Getters
    public String getJiraUrl() {
        return jiraUrl;
    }
    
    public String getUsername() {
        return username;
    }
    
    public String getApiToken() {
        return apiToken;
    }
    
    public String getProjectKey() {
        return projectKey;
    }
    
    public Integer getConnectionTimeout() {
        return connectionTimeout != null ? connectionTimeout : 30;
    }
    
    public Boolean getVerifySsl() {
        return verifySsl != null ? verifySsl : true;
    }
}
```

## Using a Plugin Group

To use a Plugin Group in your plugin, implement the [ConfiguredBy]({{$javaDocBase}}/com/dtolabs/rundeck/plugins/config/ConfiguredBy.html) interface.

### Implementation Steps

1. **Add ConfiguredBy interface** - Specify your Plugin Group type
2. **Implement setPluginGroup()** - Store the injected group instance
3. **Use group properties** - Access shared configuration via the stored instance

### Basic Example

```java
import com.dtolabs.rundeck.core.plugins.Plugin;
import com.dtolabs.rundeck.plugins.ServiceNameConstants;
import com.dtolabs.rundeck.plugins.config.ConfiguredBy;
import com.dtolabs.rundeck.plugins.step.StepPlugin;
import com.dtolabs.rundeck.plugins.step.PluginStepContext;
import com.dtolabs.rundeck.plugins.descriptions.PluginDescription;
import com.dtolabs.rundeck.core.execution.workflow.steps.StepException;

import java.util.Map;

@Plugin(name = "my-step", service = ServiceNameConstants.WorkflowStep)
@PluginDescription(title = "My Step", description = "Example step using plugin group")
public class MyStepPlugin implements StepPlugin, ConfiguredBy<MyServicePluginGroup> {
    
    private MyServicePluginGroup config;
    
    @Override
    public void setPluginGroup(MyServicePluginGroup pluginGroup) {
        this.config = pluginGroup;
    }

    @Override
    public void executeStep(PluginStepContext context, Map<String, Object> configuration)
            throws StepException {
        // Access shared configuration from the group
        String apiUrl = config.getApiUrl();
        String apiToken = config.getApiToken();
        Integer timeout = config.getTimeout();
        
        // Use the configuration
        makeApiCall(apiUrl, apiToken, timeout);
    }
    
    private void makeApiCall(String url, String token, int timeout) {
        // Implementation...
    }
}
```

### Complete Example: Jira Notification Plugin

This notification plugin uses the `JiraConnectionGroup` to create Jira tickets:

```java
package com.example.rundeck.jira;

import com.dtolabs.rundeck.core.plugins.Plugin;
import com.dtolabs.rundeck.plugins.ServiceNameConstants;
import com.dtolabs.rundeck.plugins.config.ConfiguredBy;
import com.dtolabs.rundeck.plugins.notification.NotificationPlugin;
import com.dtolabs.rundeck.plugins.descriptions.PluginDescription;
import com.dtolabs.rundeck.plugins.descriptions.PluginProperty;

import java.util.Map;
import java.io.IOException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import java.time.Duration;
import java.util.Base64;

@Plugin(name = "jira-create-issue", service = ServiceNameConstants.Notification)
@PluginDescription(
    title = "Jira Create Issue",
    description = "Creates a Jira issue when job execution fails"
)
public class JiraCreateIssuePlugin implements NotificationPlugin, ConfiguredBy<JiraConnectionGroup> {
    
    private JiraConnectionGroup jiraConfig;
    
    @PluginProperty(
        title = "Issue Type",
        description = "Type of Jira issue to create",
        required = true,
        defaultValue = "Bug"
    )
    private String issueType;
    
    @PluginProperty(
        title = "Summary Template",
        description = "Issue summary template. Use ${job.name}, ${execution.id}, etc.",
        required = true,
        defaultValue = "Job ${job.name} failed - Execution #${execution.id}"
    )
    private String summaryTemplate;
    
    @Override
    public void setPluginGroup(JiraConnectionGroup pluginGroup) {
        this.jiraConfig = pluginGroup;
    }

    @Override
    public boolean postNotification(String trigger, Map executionData, Map config) {
        try {
            // Use shared Jira configuration from the plugin group
            String jiraUrl = jiraConfig.getJiraUrl();
            String username = jiraConfig.getUsername();
            String apiToken = jiraConfig.getApiToken();
            String projectKey = jiraConfig.getProjectKey();
            Integer timeout = jiraConfig.getConnectionTimeout();
            
            // Build issue payload
            String summary = expandTemplate(summaryTemplate, executionData);
            String description = buildDescription(executionData);
            
            String jsonPayload = String.format(
                "{\"fields\":{\"project\":{\"key\":\"%s\"},\"summary\":\"%s\"," +
                "\"description\":\"%s\",\"issuetype\":{\"name\":\"%s\"}}}",
                projectKey, summary, description, issueType
            );
            
            // Create HTTP client with timeout from config
            HttpClient client = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(timeout))
                .build();
            
            // Build request with authentication from config
            String auth = username + ":" + apiToken;
            String encodedAuth = Base64.getEncoder().encodeToString(auth.getBytes());
            
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(jiraUrl + "/rest/api/2/issue"))
                .header("Authorization", "Basic " + encodedAuth)
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
                .build();
            
            HttpResponse<String> response = client.send(
                request,
                HttpResponse.BodyHandlers.ofString()
            );
            
            if (response.statusCode() >= 200 && response.statusCode() < 300) {
                System.out.println("Successfully created Jira issue");
                return true;
            } else {
                System.err.println("Failed to create Jira issue: " + response.body());
                return false;
            }
            
        } catch (IOException | InterruptedException e) {
            System.err.println("Error creating Jira issue: " + e.getMessage());
            return false;
        }
    }
    
    private String expandTemplate(String template, Map executionData) {
        // Expand ${...} variables from execution data
        String result = template;
        result = result.replace("${job.name}", (String) executionData.get("job").get("name"));
        result = result.replace("${execution.id}", String.valueOf(executionData.get("id")));
        return result;
    }
    
    private String buildDescription(Map executionData) {
        return String.format(
            "Job: %s\\nExecution ID: %s\\nStatus: %s\\nUser: %s",
            executionData.get("job").get("name"),
            executionData.get("id"),
            executionData.get("status"),
            executionData.get("user")
        );
    }
}
```

### Multiple Plugins Using Same Group

All these plugins can use the same `JiraConnectionGroup`:

```java
// Notification plugin
@Plugin(name = "jira-create-issue", service = ServiceNameConstants.Notification)
public class JiraCreateIssuePlugin 
    implements NotificationPlugin, ConfiguredBy<JiraConnectionGroup> {
    // Creates issues when jobs fail
}

// Node Step plugin
@Plugin(name = "jira-update-status", service = ServiceNameConstants.WorkflowNodeStep)
public class JiraUpdateStatusPlugin 
    implements NodeStepPlugin, ConfiguredBy<JiraConnectionGroup> {
    // Updates issue status during job execution
}

// Option Values plugin
@Plugin(name = "jira-issue-types", service = ServiceNameConstants.OptionValues)
public class JiraIssueTypesPlugin 
    implements OptionValuesPlugin, ConfiguredBy<JiraConnectionGroup> {
    // Loads issue types for job option dropdowns
}

// Workflow Step plugin
@Plugin(name = "jira-attach-file", service = ServiceNameConstants.WorkflowStep)
public class JiraAttachFilePlugin 
    implements StepPlugin, ConfiguredBy<JiraConnectionGroup> {
    // Attaches files to Jira issues
}
```

All four plugins share the same Jira URL, credentials, and connection settings configured once in the Plugin Group.

## Best Practices

### 1. Use Descriptive Names

**Good naming:**
```java
@Plugin(name = "aws-connection", ...)       // Clear service reference
@Plugin(name = "slack-config", ...)         // Obvious purpose
@Plugin(name = "database-connection", ...)  // Self-documenting
```

**Avoid:**
```java
@Plugin(name = "config", ...)      // Too generic
@Plugin(name = "group1", ...)      // Not descriptive
@Plugin(name = "plugin-group", ...)// Redundant
```

### 2. Secure Sensitive Data

Use appropriate rendering options for credentials:

```java
@PluginProperty(title = "API Token", required = true)
@RenderingOptions({
    @RenderingOption(key = DISPLAY_TYPE_KEY, value = "PASSWORD")
})
private String apiToken;

@PluginProperty(title = "AWS Secret Key", required = true)
@RenderingOptions({
    @RenderingOption(key = DISPLAY_TYPE_KEY, value = "PASSWORD")
})
private String secretKey;
```

Or use Key Storage:

```java
@PluginProperty(
    title = "API Key Path",
    description = "Path to API key in Key Storage"
)
@RenderingOptions({
    @RenderingOption(key = SELECTION_ACCESSOR_KEY, value = "STORAGE_PATH"),
    @RenderingOption(key = VALUE_CONVERSION_KEY, value = "STORAGE_PATH_AUTOMATIC_READ"),
    @RenderingOption(key = STORAGE_PATH_ROOT_KEY, value = "keys"),
    @RenderingOption(key = STORAGE_FILE_META_FILTER_KEY, value = "Rundeck-data-type=password")
})
private String apiKeyPath;
```

### 3. Provide Sensible Defaults

```java
@PluginProperty(
    title = "Connection Timeout",
    description = "Timeout in seconds",
    defaultValue = "30"
)
private Integer timeout;

@PluginProperty(
    title = "Max Retries",
    description = "Maximum number of retry attempts",
    defaultValue = "3"
)
private Integer maxRetries;
```

### 4. Group Related Properties

Use `@RenderingOptions` to organize properties in the UI:

```java
@RenderingOptions({
    @RenderingOption(key = GROUP_NAME, value = "Connection")
})
private String url;

@RenderingOptions({
    @RenderingOption(key = GROUP_NAME, value = "Authentication")
})
private String username;

@RenderingOptions({
    @RenderingOption(key = GROUP_NAME, value = "Advanced")
})
private Integer timeout;
```

### 5. Validate Configuration

Provide clear error messages when configuration is invalid:

```java
public String getApiUrl() {
    if (apiUrl == null || apiUrl.trim().isEmpty()) {
        throw new IllegalStateException("API URL is required");
    }
    if (!apiUrl.startsWith("http://") && !apiUrl.startsWith("https://")) {
        throw new IllegalStateException("API URL must start with http:// or https://");
    }
    return apiUrl.trim();
}
```

### 6. Document Dependencies

In your plugin's description, mention the required Plugin Group:

```java
@PluginDescription(
    title = "Jira Create Issue",
    description = "Creates Jira issues on job failure. " +
                  "Requires 'Jira Connection' plugin group to be configured."
)
```

### 7. Handle Null Values

Always provide null-safe getters:

```java
public Integer getTimeout() {
    return timeout != null ? timeout : 30;  // Default if null
}

public Boolean getVerifySsl() {
    return verifySsl != null ? verifySsl : true;
}
```

### 8. Keep Groups Focused

**Good - Focused group:**
```java
// JiraConnectionGroup - Only connection/auth settings
- jiraUrl
- username
- apiToken
- timeout
```

**Bad - Too broad:**
```java
// ServiceConnectionGroup - Mixing concerns
- jiraUrl
- slackWebhook
- email Server
- awsAccessKey
```

Create separate groups for different services.

## Packaging and Deployment

### Project Structure

```
my-jira-plugins/
├── build.gradle
└── src/
    └── main/
        ├── java/
        │   └── com/example/rundeck/jira/
        │       ├── JiraConnectionGroup.java        # The plugin group
        │       ├── JiraCreateIssuePlugin.java      # Notification plugin
        │       ├── JiraUpdateStatusPlugin.java     # Node step plugin
        │       └── JiraIssueTypesPlugin.java       # Option values plugin
        └── resources/
            └── resources/
                └── icon.png
```

### Single JAR Deployment

Package the Plugin Group and all related plugins in one JAR:

```gradle
jar {
    manifest {
        attributes 'Rundeck-Plugin-Classnames': 
            'com.example.rundeck.jira.JiraConnectionGroup,' +
            'com.example.rundeck.jira.JiraCreateIssuePlugin,' +
            'com.example.rundeck.jira.JiraUpdateStatusPlugin,' +
            'com.example.rundeck.jira.JiraIssueTypesPlugin'
    }
}
```

**Benefits:**
- One file to install
- All related plugins deployed together
- Group and plugins always in sync

### Separate JARs (Advanced)

You can package the Plugin Group separately:

```
jira-connection-group-1.0.jar      # Just the group
jira-notification-plugin-1.0.jar   # Uses the group
jira-node-step-plugin-1.0.jar      # Uses the group
```

**Use when:**
- Group is shared across multiple plugin projects
- Plugins are developed independently
- You want to update plugins without redeploying the group

**Note:** The Plugin Group JAR must be installed first!

## Configuration in Rundeck

### Framework Level (Global)

Configure once for all projects:

1. Navigate to **System** → **System Configuration**
2. Find your Plugin Group in the plugins list
3. Configure the shared settings
4. All projects inherit these settings

### Project Level (Per-Project)

Configure separately for each project:

1. Navigate to **Project Settings** → **Edit Configuration**
2. Scroll to **Plugins** section
3. Find your Plugin Group
4. Configure project-specific settings

**Example:**
- Dev project uses `https://dev-jira.company.com`
- Prod project uses `https://prod-jira.company.com`

### Precedence

Project-level configuration **overrides** framework-level configuration.

## Troubleshooting

### Plugin Group Not Appearing

**Problem:** Your Plugin Group doesn't show in System/Project configuration.

**Check:**
- JAR is in `$RDECK_BASE/libext/` or `/var/lib/rundeck/libext/`
- Rundeck has been restarted
- Plugin class name is in JAR manifest `Rundeck-Plugin-Classnames`
- Service is `ServiceNameConstants.PluginGroup`
- Class implements `PluginGroup` interface

**Verify in logs:**
```bash
grep "PluginGroup" /var/log/rundeck/service.log
```

### Plugins Not Receiving Group Configuration

**Problem:** Plugin runs but can't access group properties (null values).

**Check:**
- Plugin Group is configured (System or Project level)
- Plugin implements `ConfiguredBy<YourGroupType>`
- `setPluginGroup()` method is correctly implemented
- You're storing the group instance in a field
- Group name matches what your plugin references

**Debug:**
```java
@Override
public void setPluginGroup(JiraConnectionGroup pluginGroup) {
    System.out.println("Received plugin group: " + (pluginGroup != null));
    if (pluginGroup != null) {
        System.out.println("Jira URL: " + pluginGroup.getJiraUrl());
    }
    this.jiraConfig = pluginGroup;
}
```

### NullPointerException in Plugin

**Problem:** Getting NPE when accessing group properties.

**Check:**
- Plugin Group is actually configured (not just installed)
- User has configured the required properties
- Your getters handle null values properly

**Fix with defensive coding:**
```java
public void executeStep(PluginStepContext context, Map<String, Object> config) 
        throws StepException {
    if (jiraConfig == null) {
        throw new StepException(
            "Jira Connection plugin group is not configured. " +
            "Please configure it in Project Settings → Plugins.",
            StepFailureReason.ConfigurationFailure
        );
    }
    
    String url = jiraConfig.getJiraUrl();
    if (url == null || url.isEmpty()) {
        throw new StepException(
            "Jira URL is not configured in the Jira Connection plugin group.",
            StepFailureReason.ConfigurationFailure
        );
    }
    
    // Safe to proceed...
}
```

### Wrong Configuration Being Used

**Problem:** Plugin uses wrong environment's config (dev credentials in prod).

**Check:**
- Which configuration level is active (Framework vs Project)
- Project-level configuration overrides framework-level
- Multiple plugin groups with same name aren't conflicting

**Verify configuration:**
```java
public void executeStep(PluginStepContext context, Map<String, Object> config) {
    String url = jiraConfig.getJiraUrl();
    context.getLogger().log(2, "Using Jira URL: " + url);  // Log for verification
    // ...
}
```

## When to Use Plugin Groups

### ✅ Good Use Cases

**Multiple Plugins, One Service:**
- 3+ plugins that all talk to the same API
- Shared authentication across plugin types
- Common connection pooling or retry logic

**Environment-Specific Settings:**
- Dev/staging/prod configurations
- Region-specific endpoints
- Multi-tenant scenarios

**Consistent Configuration:**
- Want to ensure all plugins use same credentials
- Centralize timeout and retry settings
- Simplify user configuration

### ❌ When NOT to Use Plugin Groups

**Single Plugin:**
- Only one plugin uses the config
- Just define properties in the plugin itself

**Plugin-Specific Settings:**
- Configuration that only one plugin needs
- Not shared across multiple plugins

**Highly Dynamic Settings:**
- Values that change per job execution
- User-provided input that varies
- Use regular plugin properties instead

## Related Documentation

- [Java Plugin Development](/developer/java-plugin-development.md) - General plugin development guide
- [Plugin Properties](/developer/plugin-properties.md) - Property configuration and annotations
- [Plugin Annotations](/developer/java-plugin-development.md#plugin-annotations) - Complete annotation reference
- [Notification Plugins](/developer/notification-plugins.md) - Notification plugin specifics
- [Step Plugins](/developer/step-plugins.md) - Step plugin development

## Example Implementations

Real-world examples of Plugin Groups in use:

- [PagerDuty Plugin](https://github.com/rundeck-plugins/pagerduty) - Shared PagerDuty configuration
- [ServiceNow Plugin](https://github.com/rundeck-plugins/servicenow) - ServiceNow connection group

For more examples, browse the [Rundeck Plugins Repository](https://github.com/rundeck-plugins/).