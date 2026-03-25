# Webhook Event Plugins

## Overview

Webhook Event plugins process incoming HTTP webhooks received by Rundeck, enabling powerful integrations with external systems. When external services (CI/CD tools, monitoring systems, chat platforms) send webhooks to Rundeck, your plugin can process the payload and trigger actions.

**Common Use Cases:**
- **CI/CD Integration** - Trigger deployments when builds complete
- **Monitoring & Alerts** - Start remediation workflows when alerts fire
- **Chat Ops** - Execute jobs from Slack, Teams, or other chat platforms
- **Version Control** - Run tests when code is pushed to GitHub/GitLab
- **Incident Response** - Automate responses to PagerDuty/Opsgenie incidents
- **Custom Integrations** - Connect any webhook-capable system to Rundeck

**Real-World Examples:**
- GitHub push triggers automated deployment job
- Jenkins build completion starts integration tests
- Datadog alert triggers diagnostic collection
- Jira ticket creation starts provisioning workflow
- Slack command executes maintenance tasks

**What Webhook Plugins Can Do:**
- Parse incoming webhook payloads (JSON, XML, form data)
- Extract data and pass as job options
- Trigger job executions based on webhook data
- Validate webhook signatures for security
- Send custom responses back to the webhook sender
- Log webhook events for auditing

## How Webhook Plugins Work

### Execution Flow

1. **External System Sends Webhook** - HTTP POST request to Rundeck webhook URL
2. **Rundeck Receives Request** - Validates webhook exists and is enabled
3. **Plugin Initialization** - Your plugin is instantiated with configuration
4. **Event Processing** - `onEvent()` method called with webhook data
5. **Response Sent** - Your responder or default responder sends HTTP response

### Webhook URL Pattern

```
https://rundeck.example.com/api/webhook/[webhook-name]#[auth-token]
```

**Example:**
```
https://rundeck.example.com/api/webhook/github-deploy#abc123xyz
```

### In the Rundeck UI

**1. Administration → Webhooks**
- Create new webhook
- Choose your plugin from dropdown
- Configure plugin properties
- Get webhook URL with auth token

**2. External System Configuration**
- Add Rundeck webhook URL
- Configure when to send (push, pr, alert, etc.)
- Set up any authentication/signing

**3. Webhook Execution**
- External system sends HTTP POST
- Plugin processes payload
- Jobs can be triggered based on data
- Response sent back to sender

## Configuration

Webhook plugins can be configured at multiple levels:

### Webhook-Specific Configuration

When creating a webhook in Rundeck UI, users configure your plugin's properties:

```java
@PluginProperty(title = "Project", description = "Target project name", required = true)
private String project;

@PluginProperty(title = "Job Name", description = "Job to execute", required = true)
private String jobName;
```

These become part of the specific webhook configuration.

### Project-Level Configuration

Shared configuration for all webhooks in a project:

```
# project.properties
project.plugin.WebhookEvent.my-webhook-plugin.default-user=webhook-user
project.plugin.WebhookEvent.my-webhook-plugin.timeout=30
```

### Framework-Level Configuration

Global configuration across all projects:

```
# framework.properties
framework.plugin.WebhookEvent.my-webhook-plugin.api-timeout=60
framework.plugin.WebhookEvent.my-webhook-plugin.retry-attempts=3
```

## Java Plugin Implementation

::: tip Only Java Supported
Webhook Event plugins can **only** be implemented in Java. Script and Groovy plugins are not supported for this service type.
:::

### Plugin Interface

Your plugin implements [WebhookEventPlugin]({{$javaDocBase}}/com/dtolabs/rundeck/plugins/webhook/WebhookEventPlugin.html):

```java
public interface WebhookEventPlugin {
    List<String> getRequestHeadersToCopy();
    WebhookResponder onEvent(WebhookEventContext context, WebhookData data) 
        throws WebhookEventException;
}
```

### Key Components

**[WebhookEventContext]({{$javaDocBase}}/com/dtolabs/rundeck/plugins/webhook/WebhookEventContext.html)**
- Access to Rundeck services (job runner, storage, etc.)
- Project information
- Plugin configuration
- Logger

**[WebhookData]({{$javaDocBase}}/com/dtolabs/rundeck/plugins/webhook/WebhookData.html)**
- Webhook payload as InputStream
- HTTP headers
- Content type
- Webhook metadata (ID, name, project, sender, timestamp)

**[WebhookResponder]({{$javaDocBase}}/com/dtolabs/rundeck/plugins/webhook/WebhookResponder.html)**
- Control HTTP response sent back
- Set status code, content type, body
- Return `null` for default "ok" response

### Basic Structure

```java
import com.dtolabs.rundeck.core.plugins.Plugin;
import com.dtolabs.rundeck.plugins.ServiceNameConstants;
import com.dtolabs.rundeck.plugins.descriptions.*;
import com.dtolabs.rundeck.plugins.webhook.*;

import java.io.InputStream;
import java.util.*;

@Plugin(name = "my-webhook", service = ServiceNameConstants.WebhookEvent)
@PluginDescription(
    title = "My Webhook Handler",
    description = "Processes webhooks from My Service"
)
public class MyWebhookPlugin implements WebhookEventPlugin {
    
    @PluginProperty(title = "Job Name", description = "Job to execute", required = true)
    private String jobName;
    
    @Override
    public List<String> getRequestHeadersToCopy() {
        // Return list of HTTP headers you want to access
        return Arrays.asList("X-GitHub-Event", "X-Hub-Signature");
    }
    
    @Override
    public WebhookResponder onEvent(WebhookEventContext context, WebhookData data)
            throws WebhookEventException {
        
        // Process webhook payload
        InputStream payload = data.getData();
        Map<String, String> headers = data.getHeaders();
        
        // Your processing logic here
        
        // Return responder or null for default
        return null;  // Sends "ok" response
    }
}
``` 

### Complete Example: GitHub Webhook Handler

This plugin processes GitHub push events and triggers a deployment job:

```java
package com.example.rundeck.webhooks;

import com.dtolabs.rundeck.core.plugins.Plugin;
import com.dtolabs.rundeck.core.webhook.WebhookEventException;
import com.dtolabs.rundeck.plugins.ServiceNameConstants;
import com.dtolabs.rundeck.plugins.descriptions.*;
import com.dtolabs.rundeck.plugins.webhook.*;
import com.dtolabs.rundeck.core.jobs.JobReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.InputStream;
import java.util.*;

@Plugin(name = "github-webhook", service = ServiceNameConstants.WebhookEvent)
@PluginDescription(
    title = "GitHub Push Handler",
    description = "Processes GitHub push webhooks and triggers deployment jobs"
)
public class GitHubWebhookPlugin implements WebhookEventPlugin {
    
    @PluginProperty(
        title = "Deployment Job",
        description = "Job to execute when code is pushed",
        required = true
    )
    private String jobName;
    
    @PluginProperty(
        title = "Branch Filter",
        description = "Only trigger for this branch (leave empty for all branches)",
        required = false
    )
    private String branchFilter;
    
    @PluginProperty(
        title = "Verify Signature",
        description = "Verify GitHub webhook signature",
        required = false,
        defaultValue = "true"
    )
    private Boolean verifySignature;
    
    @PluginProperty(
        title = "Secret Token",
        description = "GitHub webhook secret for signature verification",
        required = false
    )
    @RenderingOption(key = "displayType", value = "PASSWORD")
    private String secretToken;
    
    private ObjectMapper objectMapper = new ObjectMapper();
    
    @Override
    public List<String> getRequestHeadersToCopy() {
        return Arrays.asList(
            "X-GitHub-Event",
            "X-Hub-Signature",
            "X-GitHub-Delivery"
        );
    }
    
    @Override
    public WebhookResponder onEvent(WebhookEventContext context, WebhookData data)
            throws WebhookEventException {
        
        try {
            // Get GitHub event type
            String eventType = data.getHeaders().get("X-GitHub-Event");
            
            if (!"push".equals(eventType)) {
                context.getLogger().log(2, "Ignoring non-push event: " + eventType);
                return createResponse(200, "Event ignored");
            }
            
            // Verify signature if enabled
            if (verifySignature != null && verifySignature) {
                String signature = data.getHeaders().get("X-Hub-Signature");
                if (!verifyGitHubSignature(data.getData(), signature, secretToken)) {
                    context.getLogger().log(0, "Invalid GitHub signature");
                    return createResponse(401, "Invalid signature");
                }
            }
            
            // Parse JSON payload
            JsonNode payload = objectMapper.readTree(data.getData());
            String ref = payload.get("ref").asText();
            String branch = ref.replace("refs/heads/", "");
            String repository = payload.get("repository").get("name").asText();
            String pusher = payload.get("pusher").get("name").asText();
            
            // Check branch filter
            if (branchFilter != null && !branchFilter.isEmpty() && 
                !branch.equals(branchFilter)) {
                context.getLogger().log(2, "Branch " + branch + " does not match filter");
                return createResponse(200, "Branch filtered");
            }
            
            // Find and execute job
            JobReference job = findJob(context, data.getProject(), jobName);
            
            if (job == null) {
                throw new WebhookEventException("Job not found: " + jobName);
            }
            
            // Prepare job options
            Map<String, String> options = new HashMap<>();
            options.put("branch", branch);
            options.put("repository", repository);
            options.put("pusher", pusher);
            options.put("webhook.sender", data.getSender());
            
            // Execute job
            context.getJobRunner().runJob(job, options);
            
            context.getLogger().log(2, String.format(
                "Triggered job %s for %s/%s pushed by %s",
                jobName, repository, branch, pusher
            ));
            
            return createResponse(200, "Job triggered: " + job.getId());
            
        } catch (Exception e) {
            context.getLogger().log(0, "Error processing webhook: " + e.getMessage());
            throw new WebhookEventException("Failed to process webhook", e);
        }
    }
    
    private JobReference findJob(WebhookEventContext context, String project, String jobName) {
        // Implementation to find job by name in project
        // Returns JobReference or null
        return context.getJobRunner().findJob(project, jobName);
    }
    
    private boolean verifyGitHubSignature(InputStream data, String signature, String secret) {
        // Implementation of HMAC SHA-256 verification
        // Returns true if signature matches
        return true;  // Simplified for example
    }
    
    private WebhookResponder createResponse(int statusCode, String message) {
        return new WebhookResponder() {
            @Override
            public int getStatusCode() {
                return statusCode;
            }
            
            @Override
            public String getContentType() {
                return "text/plain";
            }
            
            @Override
            public String getBody() {
                return message;
            }
        };
    }
}
```

## Best Practices

### 1. Verify Webhook Signatures

Always verify signatures from external systems:

```java
// GitHub uses HMAC SHA-256
private boolean verifySignature(byte[] payload, String signature, String secret) {
    try {
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(new SecretKeySpec(secret.getBytes(), "HmacSHA256"));
        byte[] hash = mac.doFinal(payload);
        String expected = "sha256=" + bytesToHex(hash);
        return expected.equals(signature);
    } catch (Exception e) {
        return false;
    }
}
```

### 2. Handle Errors Gracefully

```java
@Override
public WebhookResponder onEvent(WebhookEventContext context, WebhookData data) {
    try {
        // Process webhook
    } catch (Exception e) {
        context.getLogger().log(0, "Error: " + e.getMessage());
        return createErrorResponse(500, "Internal error");
    }
}
```

### 3. Validate Input

```java
// Validate required fields exist
if (payload.get("repository") == null) {
    throw new WebhookEventException("Missing required field: repository");
}

// Validate values
String eventType = data.getHeaders().get("X-Event-Type");
if (!SUPPORTED_EVENTS.contains(eventType)) {
    return createResponse(200, "Unsupported event type");
}
```

### 4. Use Appropriate Response Codes

```java
// 200 - Successfully processed
return createResponse(200, "Job triggered");

// 400 - Bad request (invalid payload)
return createResponse(400, "Invalid JSON");

// 401 - Unauthorized (signature failed)
return createResponse(401, "Invalid signature");

// 500 - Server error
return createResponse(500, "Processing failed");
```

## Related Documentation

- [Java Plugin Development](/developer/java-plugin-development.md) - General Java plugin guide
- [Webhooks User Guide](/manual/webhooks.md) - Using webhooks in Rundeck
- [API Documentation](/api/) - Rundeck API reference