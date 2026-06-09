# Monitor the Rundeck Server with Prometheus and Grafana

Rundeck 6.0 exposes application metrics natively in Prometheus format at the [`/monitoring/prometheus`](/administration/monitoring/index.md) endpoint, which is enabled by default. This means you no longer need a third-party exporter to build a metrics dashboard — Prometheus can scrape Rundeck directly.

This guide walks through a working Prometheus + Grafana stack pointed at a Rundeck server, with example queries for the most useful health and performance metrics.

:::tip Looking for the older exporter guide?
The community `rundeck_exporter` approach is now deprecated for Rundeck 6.0+. See [Monitor a Rundeck Instance Using Prometheus and Grafana (legacy exporter)](/learning/howto/rundeck-exporter.md) only if you are running an older version.
:::

For the underlying endpoint reference (formats, available metrics, configuration, and authentication), see [Monitoring overview](/administration/monitoring/index.md), [Monitoring configuration](/administration/monitoring/configuration.md), and [Using monitoring data](/administration/monitoring/monitoring.md). To monitor Runners as well, see the [Runner Metrics Reference](/administration/runner/runner-management/runner-metrics.md).

## Architecture

```text
  Rundeck server                 Prometheus              Grafana
  :4440/monitoring/prometheus  →  :9090 (scrapes)     →  :3000 (dashboards)
```

Prometheus scrapes the Rundeck endpoint on an interval and stores the time series; Grafana queries Prometheus to render dashboards.

## Prerequisites

- Rundeck 6.0 or later, reachable on its HTTP port (default `4440`).
- Docker and Docker Compose (this guide runs Prometheus and Grafana as containers; you can also install them directly).
- The modern monitoring endpoints enabled (the default). If they return HTTP 404, confirm `rundeck.metrics.enabled=true` and `rundeck.metrics.monitoring.enabled=true` — see [Monitoring configuration](/administration/monitoring/configuration.md).

## Step 1: Confirm Rundeck is exposing metrics

Before wiring up Prometheus, verify the endpoint returns Prometheus-format text:

```bash
curl http://localhost:4440/monitoring/prometheus
```

You should see output beginning with metric definitions such as `# HELP jvm_memory_used_bytes ...`. If you get a 404, the endpoints are disabled — see the configuration reference linked above.

:::warning Secure the endpoint
The `/monitoring/*` endpoints are unauthenticated by default so that scrapers and health checks can reach them. On production deployments, restrict access to these paths (for example at your reverse proxy or network layer) so they are only reachable by your monitoring system. See [Monitoring configuration](/administration/monitoring/configuration.md#security-considerations).
:::

## Step 2: Configure the Prometheus scrape target

Create `prometheus/prometheus.yml`:

```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'rundeck'
    metrics_path: /monitoring/prometheus
    static_configs:
      - targets: ['rundeck:4440']
        labels:
          service: rundeck
```

Replace `rundeck:4440` with the address Prometheus should use to reach your server. When Prometheus and Rundeck run in the same Docker network, the service name (`rundeck`) resolves automatically; otherwise use the host and port (for example `rundeck.example.com:4440`).

## Step 3: Provision the Grafana data source

Create `grafana/provisioning/datasources/prometheus.yaml` so Grafana connects to Prometheus automatically on startup:

```yaml
apiVersion: 1

datasources:
  - name: Prometheus
    uid: prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true
    editable: true
```

## Step 4: Provision a dashboards folder (optional)

To load dashboard JSON files from disk automatically, create `grafana/provisioning/dashboards/dashboard.yaml`:

```yaml
apiVersion: 1

providers:
  - name: 'rundeck dashboards'
    orgId: 1
    folder: 'Rundeck'
    type: file
    disableDeletion: false
    updateIntervalSeconds: 10
    options:
      path: /var/lib/grafana/dashboards
```

Place any exported dashboard JSON files in `grafana/dashboards/`. You can also skip provisioning and build panels directly in the Grafana UI (Step 6), then export them later.

## Step 5: Run the stack

Create `docker-compose.yml`:

```yaml
services:
  prometheus:
    image: prom/prometheus:latest
    container_name: rundeck-prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
    command:
      - "--config.file=/etc/prometheus/prometheus.yml"
    restart: unless-stopped

  grafana:
    image: grafana/grafana:latest
    container_name: rundeck-grafana
    ports:
      - "3000:3000"
    environment:
      GF_SECURITY_ADMIN_USER: admin
      GF_SECURITY_ADMIN_PASSWORD: admin
    volumes:
      - ./grafana/provisioning/:/etc/grafana/provisioning/
      - ./grafana/dashboards/:/var/lib/grafana/dashboards/
      - grafana-data:/var/lib/grafana
    depends_on:
      - prometheus
    restart: unless-stopped

volumes:
  grafana-data:
```

Start it:

```bash
docker compose up -d
```

Then open:

- Prometheus at `http://localhost:9090` — under **Status → Targets**, the `rundeck` target should be **UP**.
- Grafana at `http://localhost:3000` (default login `admin` / `admin`).

:::tip Networking
If your Rundeck server runs outside this Compose project, make sure the Prometheus container can reach it (shared Docker network, or a routable host/IP in the scrape target). For a quick local test against a Rundeck on the Docker host, you can target `host.docker.internal:4440`.
:::

## Step 6: Build dashboard panels

In Grafana, create a dashboard and add panels using the Prometheus data source. The following queries cover the most useful server health signals. Metric names are the native Micrometer names exposed at `/monitoring/prometheus`; use **Status → Targets** in Prometheus or the [`/monitoring/metrics`](/administration/monitoring/monitoring.md) endpoint to discover the full set.

**JVM heap usage:**

```promql
sum(jvm_memory_used_bytes{area="heap"})
sum(jvm_memory_max_bytes{area="heap"})
```

**Live threads:**

```promql
jvm_threads_live_threads
```

**Garbage collection pause (mean over 5m):**

```promql
rate(jvm_gc_pause_seconds_sum[5m]) / rate(jvm_gc_pause_seconds_count[5m])
```

**Process and system CPU:**

```promql
process_cpu_usage
system_cpu_usage
```

**HTTP request rate by status:**

```promql
sum(rate(http_server_requests_seconds_count[5m])) by (status)
```

**HTTP error rate (4xx/5xx):**

```promql
sum(rate(http_server_requests_seconds_count{status=~"[45].."}[5m]))
```

### Runner report-delivery metrics

If you use [Runners](/administration/runner/index.md), the server also publishes report-delivery pipeline metrics (for example `runner_server_report_end_to_end_latency_max_seconds` and `runner_server_report_timeout_count`) on the same `/monitoring/prometheus` endpoint. These are bridged from Rundeck's internal metric registry, so their series names follow a specific naming pattern. See the [Runner Metrics Reference](/administration/runner/runner-management/runner-metrics.md#server-side-metric-names-in-prometheus) for the exact names, units, and suggested alerts.

## Next steps

- Import or build richer dashboards; many community Grafana dashboards exist for JVM/Micrometer applications and can be adapted.
- Add [alerting rules](https://prometheus.io/docs/alerting/latest/overview/) in Prometheus or Grafana for the signals above.
- Use [`/monitoring/health`](/administration/monitoring/monitoring.md#load-balancer-health-checks) for load-balancer health checks.
- Monitor your Runners — see the [Runner Metrics Reference](/administration/runner/runner-management/runner-metrics.md) and [Status & Monitoring](/administration/runner/runner-management/monitoring-runners.md).
