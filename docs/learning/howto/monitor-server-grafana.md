# Monitor the Rundeck Server with Prometheus and Grafana

Rundeck 6.0 exposes application metrics natively in Prometheus format at the [`/monitoring/prometheus`](/administration/monitoring/index.md) endpoint, which is enabled by default. This means you no longer need a third-party exporter to build a metrics dashboard — Prometheus can scrape Rundeck directly.

This guide walks through a working Prometheus + Grafana stack pointed at a Rundeck server, with example queries for the most useful health and performance metrics. It then shows how to ship the container **logs** into the same Grafana with Loki — see [Ship container logs to Grafana with Loki](#ship-container-logs-to-grafana-with-loki).

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

## Step 2: Configure the Prometheus scrape target

Create `prometheus/prometheus.yml`:

```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'rundeck-server'
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

:::tip Start from the ready-made dashboard
Rather than building every panel by hand, import the pre-built **Rundeck Overview** dashboard from the [docker-zoo monitoring example](https://github.com/rundeck/docker-zoo/tree/master/monitoring) — [`grafana/dashboards/Rundeck-Overview.json`](https://github.com/rundeck/docker-zoo/blob/master/monitoring/grafana/dashboards/Rundeck-Overview.json). In Grafana use **Dashboards → New → Import**, or drop the JSON into `grafana/dashboards/` and let the provider in that example auto-load it. It binds to a Prometheus data source with uid `prometheus`, and its **Instance** filter expects the scrape job to be named `rundeck-server` (as in [Step 2](#step-2-configure-the-prometheus-scrape-target)). The panels below explain the individual queries if you prefer to build your own.
:::

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

## Ship container logs to Grafana with Loki

Metrics tell you *what* is happening; logs tell you *why*. When Rundeck runs in Docker, the simplest way to get its logs into the same Grafana is the [Loki Docker logging driver](https://grafana.com/docs/loki/latest/send-data/docker-driver/): Docker itself ships each container's stdout and stderr straight to [Loki](https://grafana.com/oss/loki/), with no extra agent, collector, or access to the Docker socket. Only Loki and Grafana are added to the stack.

```text
  Rundeck container ─(Docker loki log driver)→ Loki ─→ Grafana (:3000)
```

### Step 1: Install the Loki Docker driver plugin

Install the plugin on the Docker host once, then confirm it is enabled:

```bash
docker plugin install grafana/loki-docker-driver:latest --alias loki --grant-all-permissions
docker plugin ls | grep loki   # ENABLED should be "true"
```

### Step 2: Add Loki and its Grafana data source

Add a Loki service to the `docker-compose.yml` from [Step 5](#step-5-run-the-stack):

```yaml
  loki:
    image: grafana/loki:3.0.0
    command: -config.file=/etc/loki/loki-config.yml
    ports: ["3100:3100"]
    volumes:
      - ./loki/loki-config.yml:/etc/loki/loki-config.yml:ro
    healthcheck:
      test: ["CMD-SHELL", "wget -q -O- http://localhost:3100/ready | grep -q ready || exit 1"]
      interval: 5s
      timeout: 3s
      retries: 20
```

Create `loki/loki-config.yml` (single-binary, filesystem storage):

```yaml
auth_enabled: false
server:
  http_listen_port: 3100
common:
  instance_addr: 127.0.0.1
  path_prefix: /loki
  storage:
    filesystem:
      chunks_directory: /loki/chunks
      rules_directory: /loki/rules
  replication_factor: 1
  ring:
    kvstore: { store: inmemory }
schema_config:
  configs:
    - from: 2020-10-24
      store: tsdb
      object_store: filesystem
      schema: v13
      index: { prefix: index_, period: 24h }
limits_config:
  volume_enabled: true   # lets Grafana's "Logs Drilldown" app list services
```

Alongside the Prometheus data source from [Step 3](#step-3-provision-the-grafana-data-source), add a Loki data source (`grafana/provisioning/datasources/loki.yaml`):

```yaml
apiVersion: 1
datasources:
  - name: Loki
    uid: loki
    type: loki
    access: proxy
    url: http://loki:3100
```

### Step 3: Route the Rundeck container's logs to Loki

Add a `logging` block to the Rundeck service — and to any other service whose logs you want in Grafana. Because the driver needs Loki reachable before other containers start, gate them on Loki's health:

```yaml
  rundeck:
    logging:
      driver: loki
      options:
        loki-url: "http://localhost:3100/loki/api/v1/push"
        loki-retries: "5"
        loki-batch-size: "400"
        mode: "non-blocking"
    depends_on:
      loki:
        condition: service_healthy
```

The `loki-url` is resolved by the Docker daemon on the host, so it uses `localhost:3100` (Loki's published port) — not the compose service name. `mode: "non-blocking"` keeps the container from stalling if Loki is briefly unavailable.

### Step 4: Explore logs in Grafana

Restart the stack (`docker compose up -d`). In Grafana, open **Explore**, select the **Loki** data source, and query by the labels the driver attaches automatically:

- `{compose_service="rundeck"}` — logs from the Rundeck container.
- `{compose_project="<your-project>"}` — every container in the stack.

:::tip Browse without writing queries: Logs Drilldown
Grafana's **Logs Drilldown** app (**Drilldown → Logs** in the left menu) lists each service and lets you filter and drill into logs visually, no LogQL required. It relies on Loki's volume endpoint, which is why the `loki-config.yml` above sets `limits_config.volume_enabled: true`. Services appear by their `service_name` label — with the Docker driver that defaults to the container name (for example `<project>-rundeck-1`).
:::

You can confirm logs are arriving without Grafana, too:

```bash
curl -s 'http://localhost:3100/loki/api/v1/label/compose_service/values'
# → {"status":"success","data":["prometheus","rundeck"]}
```

:::tip Not running in Docker?
The logging driver only applies to containers. If Rundeck runs as a plain process (the executable WAR), point a log shipper such as [Grafana Alloy](https://grafana.com/docs/alloy/latest/) or [Promtail](https://grafana.com/docs/loki/latest/send-data/promtail/) at its log file instead.
:::

A complete, runnable version of this stack — Rundeck, Prometheus, Grafana, and Loki wired exactly as above — is published as an example in [docker-zoo](https://github.com/rundeck/docker-zoo/tree/master/monitoring).


## Next steps

- Import or build richer dashboards; many community Grafana dashboards exist for JVM/Micrometer applications and can be adapted.
- Add [alerting rules](https://prometheus.io/docs/alerting/latest/overview/) in Prometheus or Grafana for the signals above.
- Use [`/monitoring/health`](/administration/monitoring/monitoring.md#load-balancer-health-checks) for load-balancer health checks.
- Monitor your Runners — see the [Runner Metrics Reference](/administration/runner/runner-management/runner-metrics.md) and [Status & Monitoring](/administration/runner/runner-management/monitoring-runners.md).
