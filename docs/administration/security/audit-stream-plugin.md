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

- Set the Webhook URL:

![](/assets/img/audit-stream-aws-url.png)

- Set the Security Type to AWS_SIGV4

![](/assets/img/audit-stream-aws-sigv4.png)

- Set the AWS Region:

![](/assets/img/audit-stream-aws-region.png)

- Set the AWS Service Name:

![](/assets/img/audit-stream-aws-service.png)

- Optional: If you haven’t configured credentials in Rundeck’s Key Storage, you can set them here:

![](/assets/img/audit-stream-aws-access-key.png)
![](/assets/img/audit-stream-aws-secret-key.png)


### Azure Function Example

- Set the Webhook URL:

![](/assets/img/audit-stream-azure-url.png)

- Set the Security Type to AZURE_SAS:

![](/assets/img/audit-stream-azure-sas.png)

- Set the Azure SAS Header Name (e.g., x-functions-key):

![](/assets/img/audit-stream-azure-header.png)

- Set the Azure SAS Token

![](/assets/img/audit-stream-azure-token.png)

### Bearer Token Example

- Set the Webhook URL:

![](/assets/img/audit-stream-bearer-url.png)

- Set the Security Type to BEARER

![](/assets/img/audit-stream-bearer.png)

- Set the Bearer Token

![](/assets/img/audit-stream-bearer-token.png)


### Custom Headers Example (Datadog, New Relic, etc.)

Datadog:

- Set the Webhook URL:

![](/assets/img/audit-stream-datadog-url.png)


- Set the required custom headers

![](/assets/img/audit-stream-datadog-headers.png)


New Relic:

- Set the Webhook URL:

![](/assets/img/audit-stream-newrelic-url.png)


- Set the X-Insert-Key custom header(Ensure the key is of type INGEST – LICENSE):

![](/assets/img/audit-stream-newrelic-headers.png)



### Event Filtering

You can filter which audit events are sent by listing specific actionType values:

![](/assets/img/audit-stream-included-events.png)

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

![](/assets/img/audit-stream-timeout.png)

## Sample JSON Payloads

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