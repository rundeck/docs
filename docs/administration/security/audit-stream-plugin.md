# Audit Stream Plugin

:::enterprise
:::

> **TL;DR**: Automatically send Rundeck user activity, job executions, and security events to Datadog, New Relic, Splunk, or any webhook endpoint. Essential for compliance, security monitoring, and operational visibility.

The Audit Stream Plugin automatically captures and streams **Rundeck audit events** to external systems in real-time. This enables security monitoring, compliance reporting, and operational intelligence by sending detailed event data to your existing observability and SIEM platforms.

**Key Capabilities:**
- Real-time event streaming to 10+ platforms
- Track logins, job runs, permission changes, and more
- Filter events to reduce noise
- Secure authentication (AWS SigV4, Azure SAS, Bearer tokens)
- Zero-code setup via configuration files
- Supports compliance requirements (SOC 2, HIPAA, PCI-DSS) when integrated with appropriate external systems

---

## Why Use This Plugin?

Many organizations need to centralize Rundeck audit events in external systems to:
- **Support compliance requirements** (SOC 2, HIPAA, PCI-DSS, ISO 27001) by streaming audit logs to compliant storage systems
- **Enable security incident investigation** by making Rundeck events available in your SIEM for correlation and analysis
- **Monitor for suspicious activity** by sending events to security monitoring platforms that can detect patterns like failed logins or unexpected deletions
- **Correlate Rundeck activity** with other application logs in a unified monitoring platform
- **Enable alerting** on critical actions by streaming events to systems that can trigger notifications
- **Support audit reporting** by making complete user activity data available to your reporting tools

This plugin streams Rundeck audit events to your external systems in real-time. Without it, Rundeck audit events remain isolated in [local log files](/administration/security/audit-trail.md), making cross-system correlation and automated analysis difficult.

---

## Common Use Cases

### Security & Compliance
- **Audit trail for compliance**: Stream all user actions (login, logout, job runs, resource changes) to a tamper-proof external system for compliance audits
- **Failed login monitoring**: Send `login_failed` events to your SIEM to detect brute force attacks or credential stuffing attempts
- **Privilege escalation detection**: Track when users with admin roles create, modify, or delete critical jobs or ACLs
- **Session tracking**: Monitor user sessions across your infrastructure by correlating Rundeck events with other application logs

### Operational Intelligence
- **Job execution tracking**: Send `run` events to Datadog or New Relic to visualize job frequency, success rates, and execution patterns
- **Change management**: Track all job and ACL modifications to understand what changed, when, and by whom
- **User activity analytics**: Analyze which projects are most accessed, which jobs run most frequently, and identify usage patterns
- **Capacity planning**: Use audit data to understand peak usage times and plan infrastructure scaling

### Troubleshooting
- **Debugging job issues**: Correlate job execution events with application errors in your observability platform
- **Access investigation**: Quickly determine who accessed what resources during a specific timeframe
- **Configuration forensics**: Trace ACL or job changes that may have caused unexpected behavior

---

## What Gets Audited

The plugin captures these event types. You can filter to send only the ones you need:

### Authentication Events
| Event Type | Description | When to Monitor |
|------------|-------------|-----------------|
| `login_success` | User successfully authenticated | Track who's accessing the system |
| `login_failed` | Failed authentication attempt | Detect brute force attacks |
| `logout` | User session ended | Session duration tracking |

### Job Events
| Event Type | Description | When to Monitor |
|------------|-------------|-----------------|
| `run` | Job or ad-hoc command executed | Audit all execution activity |
| `create` | New job created | Track automation growth |
| `update` | Job definition modified | Change management |
| `delete` | Job removed | Track cleanup or potential issues |

### Access Control Events
| Event Type | Description | When to Monitor |
|------------|-------------|-----------------|
| `update` | ACL policy created or modified | Security policy changes |
| `delete` | ACL policy removed | Permission changes |

### Resource Events
| Event Type | Description | When to Monitor |
|------------|-------------|-----------------|
| `view` | Project or resource accessed | Access patterns and user behavior |
| `create` | Resource created (non-job) | Infrastructure changes |
| `update` | Resource modified (non-job) | Configuration changes |
| `delete` | Resource deleted (non-job) | Cleanup tracking |

Each event includes contextual data:
- **User information**: username, roles
- **Resource details**: type, name, project
- **Request metadata**: server UUID, timestamp, IP address, user agent
- **Action details**: what happened and the result

---

## How It Works

- Listens to Rundeck's internal audit event system (the same events recorded in the [local audit log file](/administration/security/audit-trail.md))
- Filters events based on your configuration (optionally send only specific event types)
- Formats payloads for the target system (Datadog, New Relic, generic JSON)
- Sends events via HTTP POST with appropriate authentication
- Operates independently of local log files (events are still written to `rundeck.audit.events.log`)
- Configurable timeout and retry behavior for reliability

---

## Getting Started

### Quick Start Wizard

Answer these questions to jump to the right configuration:

**1. What's your primary goal?**
- **Compliance/Audit Trail** → See [Recipe 1: Complete Compliance Audit Trail](#recipe-1-complete-compliance-audit-trail-soc-2-hipaa-pci-dss)
- **Security Monitoring** → See [Recipe 2: Security Incident Detection](#recipe-2-security-incident-detection)
- **Job Tracking** → See [Recipe 3: Job Execution Monitoring Only](#recipe-3-job-execution-monitoring-only)
- **Detect Brute Force Attacks** → See [Recipe 4: Failed Login Detection](#recipe-4-failed-login-brute-force-detection)
- **Change Management** → See [Recipe 5: Change Management Tracking](#recipe-5-change-management-tracking)

**2. What's your destination platform?**
- **Datadog** → See [Datadog Deep Dive](#datadog-deep-dive)
- **New Relic** → See [New Relic Deep Dive](#new-relic-deep-dive)
- **Splunk** → See [Splunk Deep Dive](#splunk-deep-dive)
- **AWS** → See [AWS Lambda Processing](#aws-lambda-processing) or [AWS API Gateway Example](#aws-api-gateway-example)
- **Azure** → See [Azure Function Example](#azure-function-example)
- **Other/Custom** → See [Bearer Token Example](#bearer-token-example) or [No Authentication Example](#no-authentication)

**3. Standard Setup Steps:**

1. **Choose your destination** - Where do you want audit events sent?
2. **Identify which events you need** - All events, or specific ones like `login_failed` and `run`?
3. **Get API credentials** - Obtain necessary tokens/keys from your destination system
4. **Configure the plugin** - Add settings to System Configuration or `framework.properties`
5. **Restart Rundeck** - Apply the configuration changes
6. **Test the integration** - Perform an action (like logging in) and verify events appear
7. **Set up alerts** - Configure your monitoring platform to alert on critical events
8. **Monitor health** - Track delivery success rates and webhook errors

---

## Audit Stream Plugin vs. Log File Parsing

| Feature | Audit Stream Plugin (Enterprise) | Log File Parsing (All Editions) |
|---------|----------------------------------|----------------------------------|
| **Setup Complexity** | Simple configuration file setup | Requires log shipper setup and parsing rules |
| **Data Format** | Structured JSON | Unstructured log text requiring regex parsing |
| **Real-time** | Instant event streaming | Depends on log shipper polling interval |
| **Filtering** | Built-in event filtering | Requires parsing all events then filtering |
| **Authentication** | Native support for AWS, Azure, Bearer tokens | Depends on log shipper capabilities |
| **Maintenance** | No additional infrastructure | Log shipper software must be maintained |
| **Platform Integration** | Pre-configured for major platforms | Custom parsing configuration for each platform |
| **Local Log File** | Still written (independent operation) | Only option in Community edition |

**When to use the Audit Stream Plugin:**
- You need real-time event streaming
- You're integrating with major observability platforms (Datadog, New Relic, Splunk)
- You want structured JSON without parsing complexity
- You need built-in filtering and authentication

**When to parse log files:**
- Using Rundeck Community Edition
- Existing log shipping infrastructure is already in place
- You need the same log parsing for multiple Rundeck instances
- You're integrating with a system not supported by webhook

---

## Prerequisites

- Rundeck version **5.13.0 or higher** (Enterprise)
- An external system that can receive HTTP webhooks (HTTPS recommended)
- Network access from Rundeck server to your webhook endpoint
- API credentials for your destination system (if required)

---

## Choosing Your Destination

Quick comparison of popular destinations:

| Platform | Best For | Authentication | Setup Complexity | Cost Model |
|----------|----------|----------------|------------------|------------|
| **Datadog** | Full-stack monitoring with built-in Rundeck integration | API Key (custom headers) | Easy | Per-event pricing |
| **New Relic** | Application performance and infrastructure monitoring | Insert Key (custom header) | Easy | Per-event ingestion |
| **Splunk** | Enterprise SIEM and log analysis | HEC Token | Medium | License-based |
| **Sumo Logic** | Cloud-native log analytics | Collector URL | Easy | Volume-based |
| **AWS API Gateway** | Custom processing, Lambda functions, S3 archival | SigV4 signing | Medium | Pay-per-request |
| **Azure Functions** | Serverless event processing | SAS token | Easy | Execution-based |
| **Elasticsearch** | Open-source search and analytics | API Key or basic auth | Medium | Self-hosted or cloud |
| **Custom Endpoint** | Internal systems, data lakes, custom processing | Varies | Varies | Varies |

---

## Supported Authentication Methods

The plugin supports these authentication methods to integrate with various platforms:

| Type        | Description                                                       | Common Use Cases |
|-------------|-------------------------------------------------------------------|------------------|
| `NONE`      | No authentication headers                                         | Internal endpoints, webhook.site testing, pre-authenticated proxies |
| `BEARER`    | Adds `Authorization: Bearer <token>` header                       | Most REST APIs, custom applications, Splunk HEC |
| `AZURE_SAS` | Sends a custom header (e.g. `x-functions-key`) with a token       | Azure Functions, Azure services |
| `AWS_SIGV4` | Signs the request with AWS Signature V4 credentials               | AWS API Gateway, AWS services |

**Custom Headers** can be added to any authentication type for platforms requiring specific API keys (Datadog, New Relic, etc.).

---

## Configuration Guide

Configure the plugin using one of these methods:

1. **System Configuration UI**: Navigate to System Configuration → Plugins → Audit Event Listener → Webhook Audit Listener
2. **Framework Properties**: Add settings to `$RDECK_BASE/etc/framework.properties` file

All examples below use the `framework.properties` format. The property pattern is:
```
framework.plugin.AuditEventListener.WebhookAuditListener.<property_name>
```

### AWS API Gateway Example

```properties
framework.plugin.AuditEventListener.WebhookAuditListener.webhookUrl=https://api-id.execute-api.us-west-2.amazonaws.com/prod/webhook
framework.plugin.AuditEventListener.WebhookAuditListener.securityType=AWS_SIGV4
framework.plugin.AuditEventListener.WebhookAuditListener.awsRegion=us-west-2
framework.plugin.AuditEventListener.WebhookAuditListener.awsService=execute-api
```
- Optional: If you haven’t configured credentials in Rundeck’s Key Storage, you can set them here:

```properties
framework.plugin.AuditEventListener.WebhookAuditListener.awsAccessKey=<your-access-key>
framework.plugin.AuditEventListener.WebhookAuditListener.awsSecretKey=<your-secret-key>
```

### Azure Function Example


```properties
framework.plugin.AuditEventListener.WebhookAuditListener.webhookUrl=https://<your-function-app>.azurewebsites.net/api/rundeckwebhook
framework.plugin.AuditEventListener.WebhookAuditListener.securityType=AZURE_SAS
framework.plugin.AuditEventListener.WebhookAuditListener.azureSasToken=<your-function-key>
framework.plugin.AuditEventListener.WebhookAuditListener.azureHeaderName=x-functions-key
```

### Bearer Token Example


```properties
framework.plugin.AuditEventListener.WebhookAuditListener.webhookUrl=https://api.example.com/secure-audit
framework.plugin.AuditEventListener.WebhookAuditListener.securityType=BEARER
framework.plugin.AuditEventListener.WebhookAuditListener.authToken=<your-bearer-token>
```
### Custom Headers Example (Datadog, New Relic, etc.)

#### Datadog:

```properties
framework.plugin.AuditEventListener.WebhookAuditListener.webhookUrl=https://api.datadoghq.com/api/v2/events
framework.plugin.AuditEventListener.WebhookAuditListener.securityType=NONE
framework.plugin.AuditEventListener.WebhookAuditListener.customHeaders=DD-API-KEY:your_api_key,DD-APPLICATION-KEY:your_app_key,Accept:application/json
```


#### New Relic:

```properties
framework.plugin.AuditEventListener.WebhookAuditListener.webhookUrl=https://insights-collector.newrelic.com/v1/accounts/YOUR_ACCOUNT_ID/events
framework.plugin.AuditEventListener.WebhookAuditListener.securityType=NONE
framework.plugin.AuditEventListener.WebhookAuditListener.customHeaders=X-Insert-Key:your_insert_key      //This key must have type: INGEST - LICENSE
```
> Ensure your insert key is of type INGEST – LICENSE



#### No Authentication:

```properties
framework.plugin.AuditEventListener.WebhookAuditListener.webhookUrl=https://internal.example.com/webhook
framework.plugin.AuditEventListener.WebhookAuditListener.securityType=NONE
```


---

## Configuration Recipes

### Recipe 1: Complete Compliance Audit Trail (SOC 2, HIPAA, PCI-DSS)

Send all events to an immutable storage system for compliance:

```properties
framework.plugin.AuditEventListener.WebhookAuditListener.webhookUrl=https://your-secure-endpoint.com/audit
framework.plugin.AuditEventListener.WebhookAuditListener.securityType=BEARER
framework.plugin.AuditEventListener.WebhookAuditListener.authToken=your_bearer_token
# No includedEvents filter = all events are sent
framework.plugin.AuditEventListener.WebhookAuditListener.timeout=30
```

### Recipe 2: Security Incident Detection

Monitor for suspicious activity and send alerts to your SIEM:

```properties
framework.plugin.AuditEventListener.WebhookAuditListener.webhookUrl=https://siem.company.com/api/events
framework.plugin.AuditEventListener.WebhookAuditListener.securityType=BEARER
framework.plugin.AuditEventListener.WebhookAuditListener.authToken=your_siem_api_key
framework.plugin.AuditEventListener.WebhookAuditListener.includedEvents=login_failed,delete,update,logout
framework.plugin.AuditEventListener.WebhookAuditListener.timeout=20
```

### Recipe 3: Job Execution Monitoring Only

Track job runs for operational intelligence without other noise:

```properties
framework.plugin.AuditEventListener.WebhookAuditListener.webhookUrl=https://insights-collector.newrelic.com/v1/accounts/YOUR_ACCOUNT_ID/events
framework.plugin.AuditEventListener.WebhookAuditListener.securityType=NONE
framework.plugin.AuditEventListener.WebhookAuditListener.customHeaders=X-Insert-Key:your_insert_key
framework.plugin.AuditEventListener.WebhookAuditListener.includedEvents=run
framework.plugin.AuditEventListener.WebhookAuditListener.timeout=15
```

### Recipe 4: Failed Login Brute Force Detection

Send only failed authentication attempts to trigger security alerts:

```properties
framework.plugin.AuditEventListener.WebhookAuditListener.webhookUrl=https://api.datadoghq.com/api/v2/events
framework.plugin.AuditEventListener.WebhookAuditListener.securityType=NONE
framework.plugin.AuditEventListener.WebhookAuditListener.customHeaders=DD-API-KEY:your_api_key,DD-APPLICATION-KEY:your_app_key,Accept:application/json
framework.plugin.AuditEventListener.WebhookAuditListener.includedEvents=login_failed
framework.plugin.AuditEventListener.WebhookAuditListener.timeout=10
```

### Recipe 5: Change Management Tracking

Monitor all modifications to jobs and ACLs for change management processes:

```properties
framework.plugin.AuditEventListener.WebhookAuditListener.webhookUrl=https://your-change-mgmt-system.com/api/rundeck
framework.plugin.AuditEventListener.WebhookAuditListener.securityType=BEARER
framework.plugin.AuditEventListener.WebhookAuditListener.authToken=your_token
framework.plugin.AuditEventListener.WebhookAuditListener.includedEvents=create,update,delete
framework.plugin.AuditEventListener.WebhookAuditListener.timeout=30
```

### Recipe 6: Multi-Destination Setup

**Note**: The plugin supports one webhook endpoint. To send events to multiple destinations, configure an intermediate proxy or event processing service (like AWS Lambda or an API Gateway) that receives events and distributes them to multiple platforms.

---

### Event Filtering

Control which audit events are sent using the `includedEvents` property. If not set, **all events** are sent.

```properties
framework.plugin.AuditEventListener.WebhookAuditListener.includedEvents=run,create,login_success
```

#### Available Event Types

| Type            | What It Captures | Best For |
|-----------------|------------------|----------|
| `run`           | Job or ad-hoc command execution | Job monitoring, execution tracking |
| `create`        | Job or resource creation | Change management, audit trails |
| `update`        | Job, ACL, or resource modification | Change tracking, configuration management |
| `delete`        | Job or resource deletion | Security monitoring, compliance |
| `login_success` | Successful user authentication | Access tracking, usage analytics |
| `login_failed`  | Failed authentication attempts | Security monitoring, intrusion detection |
| `logout`        | User session termination | Session tracking, access analysis |
| `view`          | Project or resource access | Usage patterns, user behavior |

**Tip**: List multiple events separated by commas, with no spaces:
```properties
# Correct
includedEvents=run,create,update,delete

# Incorrect (will not work)
includedEvents=run, create, update, delete
```

---
### Timeout

Configure the HTTP connection timeout (in seconds). Default is 30 seconds:

```properties
framework.plugin.AuditEventListener.WebhookAuditListener.timeout=20
```

---

## Complete Configuration Reference

### All Available Properties

| Property | Required | Description | Default | Example |
|----------|----------|-------------|---------|---------|
| `webhookUrl` | Yes | Target endpoint URL | None | `https://api.example.com/webhook` |
| `securityType` | Yes | Authentication method | `NONE` | `BEARER`, `AWS_SIGV4`, `AZURE_SAS`, `NONE` |
| `authToken` | Conditional | Bearer token (if using BEARER) | None | `your_secret_token` |
| `awsRegion` | Conditional | AWS region (if using AWS_SIGV4) | None | `us-west-2` |
| `awsService` | Conditional | AWS service (if using AWS_SIGV4) | None | `execute-api` |
| `awsAccessKey` | No | AWS access key (optional if using IAM role) | None | `AKIAIOSFODNN7EXAMPLE` |
| `awsSecretKey` | No | AWS secret key (optional if using IAM role) | None | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` |
| `azureSasToken` | Conditional | Azure SAS token (if using AZURE_SAS) | None | `your_function_key` |
| `azureHeaderName` | Conditional | Azure header name (if using AZURE_SAS) | None | `x-functions-key` |
| `customHeaders` | No | Comma-separated custom headers | None | `Header1:value1,Header2:value2` |
| `includedEvents` | No | Comma-separated event types to send | All events | `run,create,login_failed` |
| `timeout` | No | HTTP timeout in seconds | `30` | `20` |

### Property Name Format

All properties follow this pattern:
```
framework.plugin.AuditEventListener.WebhookAuditListener.<property_name>
```

**Example**:
```properties
framework.plugin.AuditEventListener.WebhookAuditListener.webhookUrl=https://example.com
framework.plugin.AuditEventListener.WebhookAuditListener.securityType=BEARER
framework.plugin.AuditEventListener.WebhookAuditListener.authToken=mytoken
```

---

## JSON Payload Format Sent to Webhook Endpoints

### Payload Structure Overview

Every audit event contains these data categories:

| Category | Fields | Description | Example Values |
|----------|--------|-------------|----------------|
| **Event Info** | `timestamp`, `actionType` | When and what happened | `2025-03-03T22:27:48.281Z`, `CREATE` |
| **User Info** | `username`, `userRoles` | Who performed the action | `admin`, `["admin", "user"]` |
| **Resource Info** | `type`, `name`, `project` | What was affected | `job`, `backup-database`, `Production` |
| **Request Info** | `serverUUID`, `userAgent`, `sessionID`, `sourceIP` | Context about the request | Server ID, browser info, client IP |

**Payload Format**: The plugin automatically formats payloads based on your destination. Supported formats:
- **Default/Generic**: Standard JSON with all fields (AWS, Azure, custom endpoints)
- **Datadog**: Wrapped in Datadog Events API format (v1 or v2)
- **New Relic**: Flattened structure for New Relic Events API

### Example Payloads

The following are example JSON payloads sent by the plugin, formatted based on the destination provider. These payloads can be used to test or validate integration.

### Default (e.g. Azure, AWS, or custom)
```json
{
  "timestamp": "2025-03-03T22:27:48.281Z",
  "actionType": "CREATE",
  "userInfo": {
    "username": "admin",
    "userRoles": ["admin", "user"]
  },
  "resourceInfo": {
    "type": "job",
    "name": "backup-database"
  },
  "requestInfo": {
    "serverUUID": "550e8400-e29b-41d4-a716-446655440000",
    "userAgent": "Mozilla/5.0..."
  }
}
```

### Datadog API v1
```json
{
  "title": "Rundeck Audit Event: login_success",
  "text": "{\"timestamp\":1746726668522,\"actionType\":\"login_success\",\"userInfo\":{\"username\":\"admin\",\"userRoles\":[\"admin\",\"user\"]},\"resourceInfo\":{\"type\":\"user\",\"name\":\"admin\"},\"requestInfo\":{\"serverUUID\":\"abc123\",\"userAgent\":\"Mozilla/5.0\"}}",
  "alert_type": "info",
  "tags": ["rundeck", "action:login_success"]
}
```

### Datadog API v2
```json
{
  "data": {
    "type": "event",
    "attributes": {
      "title": "Rundeck Audit Event: login_success",
      "text": "{\"timestamp\":1746726668522,\"actionType\":\"login_success\",\"userInfo\":{\"username\":\"admin\",\"userRoles\":[\"admin\",\"user\"]},\"resourceInfo\":{\"type\":\"user\",\"name\":\"admin\"},\"requestInfo\":{\"serverUUID\":\"abc123\",\"userAgent\":\"Mozilla/5.0\"}}",
      "alert_type": "info",
      "tags": ["rundeck", "action:login_success"]
    }
  }
}
```

### New Relic
```json
{
  "eventType": "RundeckAuditStreamPlugin",
  "timestamp": 1746726668522,
  "actionType": "login_success",
  "userInfo.username": "admin",
  "userInfo.userRoles": ["admin", "user"],
  "resourceInfo.type": "user",
  "resourceInfo.name": "admin",
  "requestInfo.serverUUID": "abc123",
  "requestInfo.userAgent": "Mozilla/5.0"
}
```


## Best Practices

### Event Filtering Strategy

**For Security/Compliance** (send everything):
```properties
# Don't set includedEvents - all events will be sent
```

**For Security Monitoring Only**:
```properties
framework.plugin.AuditEventListener.WebhookAuditListener.includedEvents=login_success,login_failed,logout,delete,update
```

**For Job Execution Tracking Only**:
```properties
framework.plugin.AuditEventListener.WebhookAuditListener.includedEvents=run
```

**For Failed Login Detection**:
```properties
framework.plugin.AuditEventListener.WebhookAuditListener.includedEvents=login_failed
```

### Security Recommendations

1. **Use HTTPS endpoints only** - Never send audit data over unencrypted HTTP
2. **Rotate API keys regularly** - Update tokens in Key Storage, not hardcoded in config files
3. **Use Key Storage for secrets** - Store AWS credentials and API keys in Rundeck's Key Storage instead of `framework.properties`
4. **Restrict network access** - Ensure only Rundeck can reach your webhook endpoint
5. **Test with non-production data first** - Validate your configuration before enabling in production

### Performance Considerations

- **High-volume environments**: If you run hundreds of jobs per minute, consider filtering to reduce webhook traffic
- **Timeout settings**: Set appropriate timeouts based on your network latency (default: 30 seconds)
- **Destination capacity**: Ensure your receiving system can handle the event volume
- **Event batching**: Some destinations support batching - check if your platform provides a batch ingestion endpoint

### Compliance Best Practices

- **Immutable storage**: Send events to systems with append-only storage (WORM compliance)
- **Retention policies**: Configure your destination system's retention to meet compliance requirements (e.g., 7 years for SOX)
- **Multiple destinations**: Consider sending critical events to multiple systems for redundancy
- **Timestamp accuracy**: Events use UTC timestamps - ensure your analysis tools account for timezone conversion

---

## Troubleshooting

### Events Not Appearing in Destination

1. **Check Rundeck logs** for webhook errors:
   ```bash
   tail -f $RDECK_BASE/var/logs/rundeck.log | grep -i webhook
   ```

2. **Verify endpoint connectivity**:
   ```bash
   curl -X POST https://your-webhook-endpoint.com/path
   ```

3. **Test with a simple action**: Log in to Rundeck and check if a `login_success` event appears

4. **Validate your configuration**:
   - Is `webhookUrl` correct and reachable?
   - Are authentication credentials valid?
   - Is the `securityType` appropriate for your endpoint?

### Authentication Failures

**AWS SigV4 Issues**:
- Verify IAM credentials have permission to invoke the endpoint
- Check that `awsRegion` and `awsService` match your API Gateway configuration
- Ensure credentials are not expired (if using temporary credentials)

**Bearer Token Issues**:
- Confirm the token hasn't expired
- Verify the token has the correct permissions in the destination system
- Check for typos in the token value

**Azure SAS Issues**:
- Verify the `azureHeaderName` matches what your Azure Function expects (usually `x-functions-key`)
- Confirm the SAS token is valid and not expired

### Events Are Delayed

- **Check timeout setting**: If set too high, slow responses can cause delays
- **Destination performance**: Your webhook endpoint might be slow to respond
- **Network latency**: Test network connectivity between Rundeck and destination

### Wrong Events Being Sent

- **Review `includedEvents` filter**: Make sure event types are spelled correctly
- **Check actionType in payload**: Verify the events you're receiving match what you expect
- **Case sensitivity**: Event types are case-insensitive in configuration but appear as UPPERCASE in JSON payloads

### Large Payload Issues

- **New Relic limits**: Events over 1MB may be rejected - consider filtering to reduce metadata
- **Custom headers too long**: Some systems limit total header size - keep custom headers concise

### SSL/TLS Errors

- Ensure Rundeck's Java keystore trusts the certificate of your webhook endpoint
- For self-signed certificates, import them into Rundeck's truststore

### Still Having Issues?

1. Enable debug logging for the plugin (check Rundeck logs)
2. Test with a simple webhook testing service (like webhook.site) to isolate the issue
3. Verify the destination system's API documentation for payload format requirements
4. Check if your destination has rate limits that might be throttling requests

### Troubleshooting Decision Tree

```
Are events appearing at your destination?
│
├─ NO → Check Rundeck logs for errors
│   │
│   ├─ Seeing "Connection timeout" or "Connection refused"?
│   │   ├─ YES → Verify webhookUrl is correct and accessible from Rundeck server
│   │   │        Test with: curl -X POST https://your-webhook-url.com
│   │   └─ NO → Continue below
│   │
│   ├─ Seeing "401 Unauthorized" or "403 Forbidden"?
│   │   ├─ YES → Check authentication credentials
│   │   │        - Verify authToken/awsAccessKey/azureSasToken is correct
│   │   │        - Ensure tokens haven't expired
│   │   │        - Check securityType matches endpoint requirements
│   │   └─ NO → Continue below
│   │
│   ├─ Seeing "No logs at all"?
│   │   ├─ YES → Plugin may not be loaded
│   │   │        - Verify Rundeck version >= 5.13.0
│   │   │        - Check if configuration is in correct file (framework.properties)
│   │   │        - Restart Rundeck after configuration changes
│   │   └─ NO → Continue below
│   │
│   └─ Seeing "Successfully sent" in logs but events not appearing?
│       └─ YES → Check destination system
│                - Events may be delayed (check destination status)
│                - Events may be filtered/dropped by destination
│                - Verify you're looking in correct location/index
│
└─ YES → Events are working!
    │
    ├─ Only some events appearing?
    │   └─ Check includedEvents filter configuration
    │       - Verify event types are spelled correctly
    │       - Remove includedEvents to see all events
    │
    ├─ Events are delayed?
    │   └─ Check webhook response times
    │       - Reduce timeout setting if too high
    │       - Check destination system performance
    │       - Consider filtering to reduce volume
    │
    └─ Events are duplicated?
        └─ Check for multiple plugin configurations
            - Only one configuration should be active
            - Check both System UI and framework.properties
```

---

---

## Verifying Your Setup

After configuring the plugin, follow these steps to verify events are being sent:

### Step 1: Restart Rundeck

After adding or modifying configuration:
```bash
sudo systemctl restart rundeckd
# or
sudo service rundeckd restart
```

### Step 2: Generate a Test Event

Perform a simple action that generates an event:
- **Login**: Log out and log back in (generates `login_success`)
- **View Project**: Navigate to any project (generates `view`)
- **Run Job**: Execute any job (generates `run`)

### Step 3: Check Your Destination

**Datadog**: Navigate to Events Explorer and search for `rundeck`

**New Relic**: Query events:
```sql
SELECT * FROM RundeckAuditStreamPlugin SINCE 10 minutes ago
```

**Splunk**: Search for:
```
sourcetype=rundeck_audit
```

**Custom Endpoint**: Check your application logs or webhook receiver

### Step 4: Check Rundeck Logs

If events aren't appearing, check Rundeck logs for errors:
```bash
tail -f $RDECK_BASE/var/logs/rundeck.log | grep -i "webhook\|audit"
```

Look for messages like:
- `Successfully sent webhook` (good)
- `Failed to send webhook` (indicates a problem)
- Connection errors, authentication failures, or timeout messages

---

## Frequently Asked Questions

### Q: Does this plugin impact Rundeck performance?

**A**: The plugin sends events asynchronously, so it has minimal impact on Rundeck operations. However, if your webhook endpoint is very slow to respond, you should:
- Set an appropriate timeout (10-30 seconds)
- Ensure your destination can handle the event volume
- Consider filtering events to reduce volume

### Q: What happens if the webhook endpoint is unavailable?

**A**: Events will fail to send and errors will be logged in Rundeck logs. The plugin does not queue events for retry - if your destination is down, those events will be lost. For critical compliance needs, consider:
- Using highly available endpoints
- Sending events to multiple destinations
- Monitoring webhook health proactively

### Q: Can I send events to multiple destinations?

**A**: The plugin supports one webhook endpoint per configuration. To send events to multiple destinations:
- Use a webhook proxy/gateway service that receives events and fans them out to multiple endpoints
- Configure your primary destination system to forward events to secondary systems
- Deploy an intermediate event processing service (e.g., AWS Lambda, Azure Function) that distributes events to multiple platforms

### Q: Are audit events stored in Rundeck if webhook fails?

**A**: No, events are not queued or retried. Rundeck's local audit logs still capture events, but webhook delivery failures result in lost events at the destination. Ensure your webhook endpoint is reliable and monitored.

### Q: Can I customize the JSON payload format?

**A**: The plugin automatically formats payloads for some destinations (Datadog, New Relic, generic). Custom payload transformation is not currently supported. If you need custom formats, consider:
- Using a webhook transformation proxy
- Requesting custom format support from PagerDuty/Rundeck support

### Q: How do I rotate API keys without downtime?

**A**: 
1. Update the configuration with the new key
2. Restart Rundeck
3. Total downtime for audit event collection will be during the restart (typically < 1 minute)

For zero-downtime rotation, configure your destination to accept multiple valid keys during the transition period.

### Q: What's the difference between this and Rundeck's built-in audit logs?

**A**: Rundeck always maintains local audit logs. This plugin extends that by:
- Sending events to external systems in real-time
- Enabling correlation with other application logs
- Supporting SIEM and observability platform integration
- Providing centralized audit trails across multiple Rundeck instances
- Enabling advanced alerting and analytics

### Q: Does this work with Rundeck Community Edition?

**A**: No, this plugin requires **Rundeck Enterprise** (version 5.13.0 or higher).

### Q: How do I filter events for specific projects only?

**A**: The plugin filters by event type (`actionType`), not by project. All events matching the `includedEvents` filter will be sent regardless of project. If you need project-specific filtering:
- Configure filtering at your destination system (query by project name in the payload)
- Create custom webhook receivers that filter based on `resourceInfo.project` field
- Contact support about advanced filtering requirements

### Q: Can I test this without a real destination?

**A**: Yes! Use a webhook testing service:
1. Go to [webhook.site](https://webhook.site) to get a unique URL
2. Configure the plugin with that URL and `securityType=NONE`
3. Perform actions in Rundeck
4. View the received payloads in webhook.site

This is useful for:
- Understanding the payload format
- Debugging authentication issues
- Validating event filtering configuration

### Q: What if I need events sent to a non-HTTPS endpoint?

**A**: For security reasons, this is not recommended. Audit events contain sensitive information (usernames, resource names, IP addresses). If you must use HTTP:
- Ensure the endpoint is on a private network
- Understand the security implications
- Consider using a local HTTPS proxy that forwards to the HTTP endpoint

---

---

## What's Next?

After successfully configuring the Audit Stream Plugin, consider these next steps:

### Immediate Actions

1. **Create Baseline Alerts**
   - Set up alerts for failed logins (brute force detection)
   - Monitor job deletion events in production
   - Alert on ACL policy changes

2. **Build Initial Dashboards**
   - User activity overview (logins, job runs)
   - Job execution frequency and patterns
   - Security event timeline

3. **Document Your Configuration**
   - Record which events you're sending and why
   - Document alert thresholds and escalation procedures
   - Note the destination system and access information

### Short-Term Improvements

4. **Refine Event Filtering**
   - Review event volume and adjust `includedEvents` if needed
   - Balance between comprehensive auditing and data volume/cost

5. **Set Up Correlation Rules**
   - Correlate Rundeck events with application logs
   - Connect job executions to infrastructure changes
   - Link security events across systems

6. **Establish Incident Response Procedures**
   - Define what triggers investigation (e.g., 5 failed logins)
   - Create runbooks for common security scenarios
   - Test your alert response process

### Long-Term Optimization

7. **Regular Reviews**
   - Quarterly review of event patterns and anomalies
   - Annual review of compliance requirements
   - Periodic testing of webhook health

8. **Advanced Analytics**
   - Use machine learning for anomaly detection
   - Build predictive models for capacity planning
   - Create user behavior baselines

9. **Multi-Instance Correlation**
   - If running multiple Rundeck instances, correlate events across all of them
   - Consider deploying a central event processing pipeline
   - Build unified views across your Rundeck fleet

### Compliance Preparation

10. **Audit Trail Verification**
    - Periodically verify events are being captured completely
    - Test event retrieval for audit scenarios
    - Ensure retention policies meet regulatory requirements

11. **Documentation for Auditors**
    - Prepare reports showing event coverage
    - Document what events are captured and where they're stored
    - Create sample queries for common audit questions

---

## Additional Resources

### Documentation
- [Audit Trail Log](/administration/security/audit-trail.md) - Understanding Rundeck's local audit log file (available in all editions)
- [Audit Events Listener Plugin Development Guide](/developer/audit-events-listeners.md) - Learn about the underlying plugin framework
- [Rundeck Security Overview](/administration/security/default.md) - Understanding Rundeck's security model
- [Key Storage](/administration/security/key-storage.md) - Securely storing API credentials
- [System Configuration](/administration/configuration/system-configuration.md) - Managing plugin settings

### External Resources
- [Datadog Events API Documentation](https://docs.datadoghq.com/api/latest/events/)
- [New Relic Event API Documentation](https://docs.newrelic.com/docs/data-apis/ingest-apis/event-api/)
- [Splunk HTTP Event Collector](https://docs.splunk.com/Documentation/Splunk/latest/Data/UsetheHTTPEventCollector)
- [AWS API Gateway Documentation](https://docs.aws.amazon.com/apigateway/)
- [Azure Functions HTTP Triggers](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-http-webhook)

### Support
- For plugin issues or feature requests, contact [PagerDuty Rundeck Support](https://support.pagerduty.com)
- For integration-specific questions, consult your destination platform's support resources

---

## Monitoring Plugin Health

### Key Metrics to Track

Monitor these indicators to ensure the plugin is working correctly:

1. **Event delivery success rate**: Check destination system for consistent event arrival
2. **Webhook latency**: Monitor response times in Rundeck logs
3. **Error rates**: Track webhook failures in Rundeck logs
4. **Event volume**: Compare expected vs actual event counts

### Rundeck Log Monitoring

Set up alerts on these log patterns:

**Success Pattern** (normal operation):
```
Successfully sent audit event to webhook
```

**Failure Patterns** (needs investigation):
```
Failed to send webhook
Connection timeout
Authentication failed
HTTP 4xx or 5xx response
```

### Destination-Specific Health Checks

**Datadog**: Create a monitor for missing events:
```
sum(last_5m):sum:rundeck.audit.events{*}.as_count() < 1
```

**New Relic**: Alert on event gaps:
```sql
SELECT count(*) FROM RundeckAuditStreamPlugin 
WHERE actionType = 'login_success' 
SINCE 1 hour ago
```
Alert if count is 0 during business hours.

---

## Platform-Specific Integration Guides

### Datadog Deep Dive

**Step 1**: Get your API and App keys from Datadog → Organization Settings → API Keys

**Step 2**: Configure Rundeck:
```properties
framework.plugin.AuditEventListener.WebhookAuditListener.webhookUrl=https://api.datadoghq.com/api/v2/events
framework.plugin.AuditEventListener.WebhookAuditListener.securityType=NONE
framework.plugin.AuditEventListener.WebhookAuditListener.customHeaders=DD-API-KEY:your_api_key,DD-APPLICATION-KEY:your_app_key,Accept:application/json
```

**Step 3**: Create dashboards in Datadog:
- Navigate to Dashboards → New Dashboard
- Add widgets querying for `rundeck` events
- Common visualizations:
  - Timeseries: Event volume over time
  - Top List: Most active users
  - Table: Recent failed logins

**Step 4**: Set up monitors:
- **Brute Force Alert**: 5+ failed logins from same user in 5 minutes
- **Production Job Alert**: Critical jobs executed outside maintenance window
- **Permission Changes**: Any ACL update/delete events

### New Relic Deep Dive

**Step 1**: Get your Insert API key from New Relic → API Keys (ensure type is INGEST - LICENSE)

**Step 2**: Configure Rundeck:
```properties
framework.plugin.AuditEventListener.WebhookAuditListener.webhookUrl=https://insights-collector.newrelic.com/v1/accounts/YOUR_ACCOUNT_ID/events
framework.plugin.AuditEventListener.WebhookAuditListener.securityType=NONE
framework.plugin.AuditEventListener.WebhookAuditListener.customHeaders=X-Insert-Key:your_insert_key
```

**Step 3**: Query events in New Relic:
```sql
-- Dashboard queries
SELECT count(*) FROM RundeckAuditStreamPlugin FACET actionType SINCE 1 day ago
SELECT latest(timestamp) FROM RundeckAuditStreamPlugin FACET `userInfo.username` SINCE 1 hour ago
SELECT count(*) FROM RundeckAuditStreamPlugin WHERE actionType = 'run' TIMESERIES SINCE 7 days ago
```

**Step 4**: Create alert conditions:
- Alert condition: NRQL query returns value
- Query: `SELECT count(*) FROM RundeckAuditStreamPlugin WHERE actionType = 'login_failed' FACET userInfo.username`
- Threshold: > 5 in 5 minutes

### Splunk Deep Dive

**Step 1**: Create HTTP Event Collector (HEC) token:
- Settings → Data Inputs → HTTP Event Collector → New Token
- Name: "Rundeck Audit Stream"
- Source type: `_json` or create custom `rundeck_audit`

**Step 2**: Configure Rundeck:
```properties
framework.plugin.AuditEventListener.WebhookAuditListener.webhookUrl=https://your-splunk-instance.com:8088/services/collector/event
framework.plugin.AuditEventListener.WebhookAuditListener.securityType=BEARER
framework.plugin.AuditEventListener.WebhookAuditListener.authToken=your_hec_token
```

**Step 3**: Create Splunk searches:
```spl
# Failed login attempts
index=rundeck sourcetype=rundeck_audit actionType=login_failed 
| stats count by userInfo.username 
| where count > 3

# Job execution timeline
index=rundeck sourcetype=rundeck_audit actionType=run 
| timechart span=1h count by resourceInfo.name

# Audit trail for specific user
index=rundeck sourcetype=rundeck_audit userInfo.username="admin" 
| table timestamp actionType resourceInfo.type resourceInfo.name
```

**Step 4**: Set up alerts:
- Search: `index=rundeck actionType=delete | stats count`
- Alert condition: Number of results > 0
- Trigger actions: Email, PagerDuty, etc.

### AWS Lambda Processing

Use AWS API Gateway + Lambda to process events and fan out to multiple destinations:

**Step 1**: Create Lambda function:
```python
import json
import boto3

def lambda_handler(event, context):
    # Parse Rundeck audit event
    audit_event = json.loads(event['body'])
    
    # Example: Send to S3 for archival
    s3 = boto3.client('s3')
    s3.put_object(
        Bucket='audit-archive',
        Key=f"rundeck/{audit_event['timestamp']}-{audit_event['actionType']}.json",
        Body=json.dumps(audit_event)
    )
    
    # Example: Send critical events to SNS
    if audit_event['actionType'] in ['login_failed', 'delete']:
        sns = boto3.client('sns')
        sns.publish(
            TopicArn='arn:aws:sns:us-east-1:123456789:rundeck-critical',
            Message=json.dumps(audit_event),
            Subject=f"Rundeck Critical Event: {audit_event['actionType']}"
        )
    
    return {'statusCode': 200, 'body': 'Event processed'}
```

**Step 2**: Create API Gateway endpoint:
- Create REST API
- Create POST method
- Integration: Lambda function
- Deploy to stage

**Step 3**: Configure Rundeck:
```properties
framework.plugin.AuditEventListener.WebhookAuditListener.webhookUrl=https://api-id.execute-api.us-west-2.amazonaws.com/prod/audit
framework.plugin.AuditEventListener.WebhookAuditListener.securityType=AWS_SIGV4
framework.plugin.AuditEventListener.WebhookAuditListener.awsRegion=us-west-2
framework.plugin.AuditEventListener.WebhookAuditListener.awsService=execute-api
```

---

## Example Queries and Alerts

### Datadog Queries

**Failed Login Attempts by User**:
```
action:login_failed
```

**Production Job Executions**:
```
action:run tags:prod
```

**ACL Changes in Last 24 Hours**:
```
(action:update OR action:delete) resourceInfo.type:acl
```

### New Relic NRQL Queries

**Failed Logins in Last Hour**:
```sql
SELECT count(*) FROM RundeckAuditStreamPlugin 
WHERE actionType = 'login_failed' 
SINCE 1 hour ago 
FACET `userInfo.username`
```

**Most Active Users**:
```sql
SELECT count(*) FROM RundeckAuditStreamPlugin 
WHERE actionType = 'run' 
SINCE 1 day ago 
FACET `userInfo.username` 
LIMIT 10
```

**Job Execution Success Rate** (if your jobs send completion events):
```sql
SELECT percentage(count(*), WHERE actionType = 'run') AS 'Execution Rate'
FROM RundeckAuditStreamPlugin 
SINCE 1 day ago 
FACET `resourceInfo.name`
```

### Splunk Queries

**All Job Executions**:
```spl
sourcetype=rundeck_audit actionType=run
```

**ACL Changes**:
```spl
sourcetype=rundeck_audit (actionType=update OR actionType=delete) resourceInfo.type=acl
```

**User Activity Summary**:
```spl
sourcetype=rundeck_audit 
| stats count by userInfo.username actionType 
| sort -count
```

**Failed Logins by Source IP**:
```spl
sourcetype=rundeck_audit actionType=login_failed 
| stats count by requestInfo.sourceIP userInfo.username 
| sort -count
```