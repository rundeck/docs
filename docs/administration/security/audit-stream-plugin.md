# Audit Stream Plugin

:::enterprise
:::

This plugin streams **Rundeck audit events** to external systems via secure, configurable webhooks. It's useful for sending specific event logs to tools like **Datadog**, **New Relic**, **Sumo Logic**, or custom endpoints.

---

## What It Does

- Sends audit events as JSON via HTTP POST requests
- Supports authentication methods required by major observability providers
- Offers advanced filtering to control which events are sent
- Can enrich payloads with contextual metadata (user, resource, request)

---

## Prerequisites

- Rundeck version **4.17.0 or higher**
- An external system that can receive and process HTTP webhooks
- HTTPS endpoint access from the Rundeck server

---

## Supported Authentication Methods

| Type        | Description                                                       |
|-------------|-------------------------------------------------------------------|
| `NONE`      | No authentication headers                                         |
| `BEARER`    | Adds `Authorization: Bearer <token>` header                       |
| `AZURE_SAS` | Sends a custom header (e.g. `x-functions-key`) with a token       |
| `AWS_SIGV4` | Signs the request with AWS Signature V4 credentials               |

---

## Configuration Guide

Access these properties via the System Configuration menu under Plugins → Audit Stream.

Rundeck must be restarted after applying changes.

### AWS API Gateway Example

- Set these configurations:
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

- Set these configurations:

```properties
framework.plugin.AuditEventListener.WebhookAuditListener.webhookUrl=https://<your-function-app>.azurewebsites.net/api/rundeckwebhook
framework.plugin.AuditEventListener.WebhookAuditListener.securityType=AZURE_SAS
framework.plugin.AuditEventListener.WebhookAuditListener.azureSasToken=<your-function-key>
framework.plugin.AuditEventListener.WebhookAuditListener.azureHeaderName=x-functions-key
```

### Bearer Token Example

- Set these configurations:

```properties
framework.plugin.AuditEventListener.WebhookAuditListener.webhookUrl=https://api.example.com/secure-audit
framework.plugin.AuditEventListener.WebhookAuditListener.securityType=BEARER
framework.plugin.AuditEventListener.WebhookAuditListener.authToken=<your-bearer-token>
```
### Custom Headers Example (Datadog, New Relic, etc.)

Datadog:

- Set these configurations:

```properties
framework.plugin.AuditEventListener.WebhookAuditListener.webhookUrl=https://api.datadoghq.com/api/v2/events
framework.plugin.AuditEventListener.WebhookAuditListener.securityType=NONE
framework.plugin.AuditEventListener.WebhookAuditListener.customHeaders=DD-API-KEY:your_api_key,DD-APPLICATION-KEY:your_app_key,Accept:application/json
```

New Relic:

- Set these configurations:

```properties
framework.plugin.AuditEventListener.WebhookAuditListener.webhookUrl=https://insights-collector.newrelic.com/v1/accounts/YOUR_ACCOUNT_ID/events
framework.plugin.AuditEventListener.WebhookAuditListener.securityType=NONE
framework.plugin.AuditEventListener.WebhookAuditListener.customHeaders=X-Insert-Key:your_insert_key      //This key must have type: INGEST - LICENSE
```

- Set the X-Insert-Key custom header (Ensure the key is of type INGEST – LICENSE):

No Authentication:

```properties
framework.plugin.AuditEventListener.WebhookAuditListener.webhookUrl=https://internal.example.com/webhook
framework.plugin.AuditEventListener.WebhookAuditListener.securityType=NONE
```

### Event Filtering

You can filter which audit events are sent by listing specific actionType values:

```properties
framework.plugin.AuditEventListener.WebhookAuditListener.includedEvents=run,create,login_success
```

#### Common `actionType` Values

| Type            | Meaning                          |
|-----------------|----------------------------------|
| `run`           | Job or command executed          |
| `create`        | Job or resource created          |
| `update`        | Resource updated (e.g. job, ACL) |
| `delete`        | Resource deleted                 |
| `login_success` | User logged in                   |
| `login_failed`  | Failed login attempt             |
| `logout`        | User logged out                  |
| `view`          | Resource viewed                  |

---
### Timeout

You can configure the HTTP connection timeout (in seconds). The default is 30:

```properties
framework.plugin.AuditEventListener.WebhookAuditListener.timeout=20
```

## JSON Payload Format Sent to Webhook Endpoints

The following are example JSON payloads sent by the plugin, formatted based on the destination provider (e.g., Datadog, New Relic, etc). These payloads can be used to test or validate integration.

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


## Troubleshooting Tips

- Check that your webhook endpoint is reachable from the Rundeck host.
- If using AWS SIGV4, make sure the IAM role or access keys have permissions.