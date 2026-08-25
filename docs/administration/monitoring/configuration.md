# Monitoring Configuration

Rundeck 6.0 provides modern monitoring endpoints that are enabled by default. This guide covers how to configure both modern and legacy monitoring endpoints.

## Modern Endpoints (Default)

Modern monitoring endpoints are **enabled by default** in Rundeck 6.0 and require no configuration to use. These endpoints provide industry-standard formats compatible with Prometheus, Grafana, and other modern monitoring tools.

### Endpoints Available

The following endpoints are available at the `/monitoring/*` path:

- `/monitoring/prometheus` - Prometheus text format (recommended for monitoring systems)
- `/monitoring/metrics` - List of available metrics in JSON format
- `/monitoring/metrics/{name}` - Specific metric with values
- `/monitoring/health` - Application health status (`{"status":"UP"}`)
- `/monitoring/info` - Application information (`{"app":{"name":"rundeckapp","version":"..."}}`)
- `/monitoring/threaddump` - JVM thread dump for debugging

### Configuration

Modern endpoints are controlled by the `rundeck.metrics.monitoring.enabled` property:

```properties
# Enable modern monitoring endpoints (default: true)
rundeck.metrics.monitoring.enabled=true
```

This property can be set in:
- `rundeck-config.properties` file
- System Config UI (Settings → System Configuration)

Changes take effect immediately without requiring a restart.

### Disabling Modern Endpoints

If you need to disable modern endpoints (not recommended), set:

```properties
rundeck.metrics.monitoring.enabled=false
```

When disabled, all `/monitoring/*` endpoints will return HTTP 404 with a JSON error message indicating the endpoint is disabled.

## Legacy Endpoints (Opt-in)

Legacy endpoints use the older Dropwizard Metrics format and are **disabled by default** in Rundeck 6.0. These endpoints are deprecated and will be removed in Rundeck 7.0.

:::warning Deprecation Notice
Legacy endpoints (`/metrics/*`) are deprecated and disabled by default. They will be completely removed in Rundeck 7.0. If you're currently using legacy endpoints, plan to migrate to the modern endpoints before upgrading to Rundeck 7.0.
:::

### Enabling Legacy Endpoints

If you need to use legacy endpoints during migration, enable them with:

```properties
# Enable legacy endpoints (default: false)
rundeck.metrics.legacy.enabled=true
```

This enables the following endpoints:
- `/metrics/metrics` - Dropwizard JSON format metrics
- `/metrics/ping` - Simple "pong" text response
- `/metrics/healthcheck` - Legacy health check format
- `/metrics/threads` - Legacy thread dump format

### Migration from Legacy Endpoints

If you're currently using legacy endpoints, consider migrating to modern endpoints:

| Legacy Endpoint | Modern Equivalent | Notes |
|----------------|-------------------|-------|
| `/metrics/metrics` | `/monitoring/prometheus` | Prometheus format recommended for monitoring systems |
| `/metrics/metrics` | `/monitoring/metrics` | JSON format for API integration |
| `/metrics/ping` | `/monitoring/health` | Returns `{"status":"UP"}` instead of "pong" |
| `/metrics/healthcheck` | `/monitoring/health` | Modern health check format |
| `/metrics/threads` | `/monitoring/threaddump` | Same thread dump data, different format |

**Migration considerations:**
- Modern endpoints use different data formats (Prometheus vs Dropwizard JSON)
- Update your monitoring tools to scrape from `/monitoring/prometheus` instead of `/metrics/metrics`
- Update health check configurations to use `/monitoring/health` instead of `/metrics/ping` or `/metrics/healthcheck`
- Test your monitoring dashboards with the new endpoint formats before disabling legacy endpoints

## JMX Export

Rundeck can export metrics as JMX MBeans for monitoring tools that support JMX (such as Prometheus JMX Exporter, Nagios, or JConsole).

### Enabling JMX Export

JMX export is **disabled by default** and requires two configuration properties:

```properties
# Master switch for metrics (required)
rundeck.metrics.enabled=true

# Enable JMX export of metrics
rundeck.metrics.jmxEnabled=true
```

Both properties can be set in:
- `rundeck-config.properties` file
- System Config UI (Settings → System Configuration)

:::warning JMX Requires Restart
Unlike HTTP endpoints which check configuration on every request, JMX export starts when the application starts. After enabling `rundeck.metrics.jmxEnabled=true`, you must restart Rundeck for JMX export to begin working.
:::

### Using JMX Metrics

Once enabled, Rundeck exposes metrics as JMX MBeans under the `com.codahale.metrics` domain. You can connect to these MBeans using:

- **JConsole** (included with JDK) - Connect to local or remote JVM
- **VisualVM** (included with JDK) - Browse and monitor MBeans
- **Monitoring tools** - Prometheus JMX Exporter, Nagios, Datadog, etc.

The MBeans expose Rundeck's internal metrics including:
- Counters (job execution counts, error counts)
- Gauges (current values like active jobs, queue size)
- Histograms (distribution of values like execution times)
- Meters (rate of events like requests per second)
- Timers (duration and rate of operations)

### JMX Remote Access

For monitoring tools to connect to JMX remotely (such as DataDog), you must also configure JVM-level JMX settings. This is separate from Rundeck's metrics configuration and requires adding Java options to your Rundeck startup configuration.

**Example JVM options for remote JMX access:**
```bash
-Dcom.sun.management.jmxremote
-Dcom.sun.management.jmxremote.port=9010
-Dcom.sun.management.jmxremote.authenticate=false
-Dcom.sun.management.jmxremote.ssl=false
-Djava.rmi.server.hostname=your-hostname
```

:::tip JMX Independence
JMX export is completely independent of HTTP endpoints. You can use JMX without enabling HTTP endpoints, or use HTTP endpoints without JMX. They both read from the same underlying metrics data, but export it through different mechanisms.
:::

:::tip JMX vs JVM Monitoring
Rundeck's JMX metrics export is separate from JVM-level JMX monitoring. The `rundeck.metrics.jmxEnabled` property controls export of Rundeck's application metrics (jobs, executions, etc.), not JVM metrics (memory, threads, GC). For JVM-level monitoring, you would configure JVM JMX options separately in your startup configuration.
:::

## Security Considerations

### Endpoint Access

Modern and legacy monitoring endpoints (`/monitoring/*` and `/metrics/*`) are **unauthenticated by default** to support:
- Load balancer health checks
- Prometheus scraping
- External monitoring tools

### Security Recommendations

If your Rundeck instance is exposed to untrusted networks, consider:

1. **Network-level restrictions**: Use firewall rules to restrict access to monitoring endpoints from only your monitoring infrastructure
2. **Reverse proxy**: Place Rundeck behind a reverse proxy that can add authentication or IP whitelisting for monitoring endpoints
3. **Internal network**: Deploy monitoring tools on the same internal network as Rundeck to avoid exposing endpoints publicly

The monitoring endpoints expose operational metrics but do not expose sensitive data like job definitions, credentials, or execution logs.

## Configuration Reference

| Property | Default | Description |
|----------|---------|-------------|
| `rundeck.metrics.monitoring.enabled` | `true` | Enable modern monitoring endpoints at `/monitoring/*` |
| `rundeck.metrics.legacy.enabled` | `false` | Enable legacy endpoints at `/metrics/*` (deprecated) |
| `rundeck.metrics.enabled` | `true` | Master switch for metrics collection (required for all metrics features) |
| `rundeck.metrics.jmxEnabled` | `false` | Enable JMX export of metrics as MBeans (requires restart) |
| `rundeck.metrics.execution.job.dimension.enabled` | `false` | Add `job_id`/`job_name` tags to execution metrics. See [Execution Metrics Reference](/administration/monitoring/execution-metrics.md) for details |

**Configuration Notes:**
- HTTP endpoint properties (`monitoring.enabled`, `legacy.enabled`) take effect immediately without restart
- JMX export (`jmxEnabled`) requires application restart to take effect
- The master switch (`metrics.enabled`) must be `true` for any metrics features to work
- All properties can be configured via `rundeck-config.properties` file or System Config UI


