# Using Monitoring Data

This guide explains how to use Rundeck's monitoring endpoints to collect metrics, check application health, and integrate with monitoring systems.

## Endpoint Overview

Rundeck provides several monitoring endpoints that serve different purposes:

### Prometheus Format (`/monitoring/prometheus`)

The Prometheus endpoint provides metrics in the standard Prometheus text format, ideal for:
- Prometheus scraping
- Grafana dashboards
- Other Prometheus-compatible monitoring tools

**Example request:**
```bash
curl http://localhost:4440/monitoring/prometheus
```

**Example output:**
```
# HELP http_server_requests_total Total HTTP server requests
# TYPE http_server_requests_total counter
http_server_requests_total{method="GET",status="200",uri="/api/14/projects"} 1234.0
# HELP jvm_memory_used_bytes Used JVM memory in bytes
# TYPE jvm_memory_used_bytes gauge
jvm_memory_used_bytes{area="heap",id="PS Survivor Space"} 1.2345678E8
```

### Metrics List (`/monitoring/metrics`)

Returns a JSON array of available metric names. Use this to discover what metrics are available.

**Example request:**
```bash
curl http://localhost:4440/monitoring/metrics
```

**Example output:**
```json
{
  "names": [
    "http.server.requests",
    "jvm.memory.used",
    "jvm.threads.live",
    "executor.completed",
    ...
  ]
}
```

### Specific Metric (`/monitoring/metrics/{name}`)

Retrieve values for a specific metric by name.

**Example request:**
```bash
curl http://localhost:4440/monitoring/metrics/jvm.memory.used
```

**Example output:**
```json
{
  "name": "jvm.memory.used",
  "measurements": [
    {
      "statistic": "VALUE",
      "value": 1.2345678E8
    }
  ],
  "availableTags": [
    {
      "tag": "area",
      "values": ["heap", "nonheap"]
    }
  ]
}
```

### Health Check (`/monitoring/health`)

Simple health status endpoint, ideal for load balancer health checks.

**Example request:**
```bash
curl http://localhost:4440/monitoring/health
```

**Example output:**
```json
{"status":"UP"}
```

The status can be:
- `UP` - Application is healthy and ready to serve requests
- `DOWN` - Application is not healthy (should not receive traffic)

### Application Info (`/monitoring/info`)

Returns basic application information including name and version.

**Example request:**
```bash
curl http://localhost:4440/monitoring/info
```

**Example output:**
```json
{
  "app": {
    "name": "rundeckapp",
    "version": "6.0.0"
  }
}
```

### Thread Dump (`/monitoring/threaddump`)

Returns a JVM thread dump in text format, useful for debugging thread-related issues.

**Example request:**
```bash
curl http://localhost:4440/monitoring/threaddump
```

**Example output:**
```
"main" #1 prio=5 os_prio=31 tid=0x00007f8b8b800000 nid=0x1a03 runnable [0x0000700008b00000]
   java.lang.Thread.State: RUNNABLE
	at java.net.SocketInputStream.socketRead0(Native Method)
	...
```

## Common Metrics

Rundeck exposes a wide variety of metrics. Some commonly monitored metrics include:

### Application Metrics
- `application.ready.time` - Time for application to become ready
- `application.started.time` - Application startup time

### HTTP Metrics
- `http.server.requests` - Total HTTP requests (counter)
- `http.server.requests.active` - Active HTTP requests (gauge)

### JVM Metrics
- `jvm.memory.used` - JVM memory usage
- `jvm.memory.max` - Maximum JVM memory
- `jvm.threads.live` - Number of live threads
- `jvm.gc.pause` - Garbage collection pause times
- `jvm.classes.loaded` - Number of loaded classes

### System Metrics
- `system.cpu.usage` - System CPU usage percentage
- `system.load.average.1m` - System load average
- `process.cpu.usage` - Process CPU usage percentage

### Executor Metrics
- `executor.active` - Active executor threads
- `executor.completed` - Completed tasks
- `executor.queued` - Queued tasks

:::tip Discovering Metrics
Use `/monitoring/metrics` to get a complete list of available metrics for your Rundeck instance. Metric names may vary slightly between versions as new metrics are added.
:::

## Prometheus Integration

### Basic Scrape Configuration

To scrape Rundeck metrics with Prometheus, add a scrape configuration to your `prometheus.yml`:

```yaml
scrape_configs:
  - job_name: 'rundeck'
    scrape_interval: 30s
    metrics_path: '/monitoring/prometheus'
    static_configs:
      - targets: ['rundeck.example.com:4440']
```

### Example Prometheus Queries

Once Prometheus is scraping Rundeck metrics, you can query them:

**HTTP request rate:**
```promql
rate(http_server_requests_total[5m])
```

**JVM memory usage percentage:**
```promql
jvm_memory_used_bytes / jvm_memory_max_bytes * 100
```

**Active threads:**
```promql
jvm_threads_live_threads
```

**System CPU usage:**
```promql
system_cpu_usage
```

## Grafana Dashboards

You can create Grafana dashboards using the Prometheus metrics. Common visualizations include:

- **Application Health**: Status panel showing `up` status
- **Request Rate**: Graph of HTTP requests per second
- **Memory Usage**: Graph of JVM memory consumption over time
- **Thread Count**: Graph of active threads
- **CPU Usage**: Graph of system and process CPU usage
- **Error Rate**: Graph of HTTP error responses

## Load Balancer Health Checks

Use the `/monitoring/health` endpoint for load balancer health checks. The endpoint returns HTTP 200 with `{"status":"UP"}` when healthy, making it ideal for:

- HAProxy `httpchk` configuration
- AWS Application Load Balancer target health checks
- NGINX upstream health checks
- Other load balancers that support HTTP health checks

**Example HAProxy configuration:**
```
backend rundeck_backend
    option httpchk GET /monitoring/health
    http-check expect status 200
    server rundeck1 192.168.1.10:4440 check
    server rundeck2 192.168.1.11:4440 check
```

## JMX Monitoring

If you've enabled JMX export (see [Configuration](/administration/monitoring/configuration.md#jmx-export)), you can access metrics via JMX tools.

### Using JConsole

1. Start JConsole (included with JDK)
2. Connect to your Rundeck JVM (local or remote)
3. Navigate to the MBeans tab
4. Expand `com.codahale.metrics` to see Rundeck metrics
5. Browse counters, gauges, histograms, meters, and timers

### Using VisualVM

1. Start VisualVM (included with JDK)
2. Connect to your Rundeck JVM
3. Open the MBeans tab
4. Navigate to `com.codahale.metrics` to view metrics

### Prometheus JMX Exporter

You can use the Prometheus JMX Exporter to scrape JMX metrics and convert them to Prometheus format:

1. Download the JMX Exporter JAR
2. Configure `jmx_prometheus_httpserver` or `jmx_prometheus_javaagent`
3. Point it at your Rundeck JMX endpoint
4. Scrape the exporter's HTTP endpoint with Prometheus

### DataDog Integration

DataDog uses JMX to scrape metrics from Rundeck instances. To use DataDog monitoring:

1. Enable JMX export in Rundeck (`rundeck.metrics.enabled=true` and `rundeck.metrics.jmxEnabled=true`)
2. Configure JVM-level JMX remote access (add JVM options for JMX remote)
3. Configure the DataDog agent to connect to your Rundeck JMX endpoint
4. Restart Rundeck after enabling JMX export

See the DataDog documentation for configuring JMX monitoring with Java applications.

## Troubleshooting

### Endpoint Returns 404

If monitoring endpoints return 404:

1. Verify `rundeck.metrics.monitoring.enabled=true` in your configuration
2. Check that you're using the correct endpoint path (`/monitoring/*` for modern endpoints)
3. Ensure you're running Rundeck 6.0 or later

### Metrics Not Updating

If metrics appear stale:

1. Verify `rundeck.metrics.enabled=true` (master switch - required for all metrics)
2. Check application logs for metrics-related errors
3. Ensure the application is receiving traffic (some metrics only update on activity)
4. For JMX metrics: Verify `rundeck.metrics.jmxEnabled=true` and restart Rundeck if you just enabled it

### Health Check Shows DOWN

If `/monitoring/health` returns `{"status":"DOWN"}`:

1. Check application logs for errors
2. Verify database connectivity
3. Check system resources (memory, disk space)
4. Review thread dump (`/monitoring/threaddump`) for deadlocks or issues

## API Access

Metrics are also available through the Rundeck API (requires authentication). The API provides forwarding endpoints that route to the monitoring endpoints:

- `/api/25/metrics/*` - Forwards to legacy `/metrics/*` endpoints
- `/api/25/monitoring/*` - Forwards to modern `/monitoring/*` endpoints

See the [API Documentation](/api/index.md) for details on accessing metrics via API endpoints.


