# Monitor a Runner with Prometheus and Grafana

Rundeck Runners expose operation-queue, report-delivery, and JVM metrics that are invaluable for diagnosing the `Runner did not deliver reports in the configured timeout period` error and for capacity planning. Unlike the Rundeck server, a Runner does **not** serve an HTTP metrics endpoint — its metrics are published as JMX MBeans. To get them into Prometheus and Grafana, run the [Prometheus JMX Exporter](https://github.com/prometheus/jmx_exporter) alongside the Runner.

This guide uses the `jmx_prometheus_javaagent`, which runs in-process and exposes the Runner's metrics on an HTTP port that Prometheus can scrape.

:::warning Validate metric names in your environment
The JMX-to-Prometheus name mapping depends on the exporter rules you use, so the exact Prometheus series names can vary. Treat the names in the example queries below as a starting point and confirm them against your own exporter output (see [Step 4](#step-4-verify-the-exposed-metrics)).
:::

For the full list of Runner metrics and what they mean, see the [Runner Metrics Reference](/administration/runner/runner-management/runner-metrics.md). For a server-side Prometheus + Grafana walkthrough, see [Monitor the Rundeck Server with Prometheus and Grafana](/learning/howto/monitor-server-grafana.md).

## Architecture

```text
  Runner JVM (pd-runner.jar)
    └─ JMX MBeans  ─→  jmx_prometheus_javaagent (:9404)  ─→  Prometheus (:9090)  ─→  Grafana (:3000)
```

The exporter reads the Runner's MBeans from inside the same JVM and serves them in Prometheus format. No JMX remote port needs to be opened.

## Prerequisites

- A running Rundeck Runner (Replica) version 6.0 or later. Metrics export over JMX is enabled by default.
- Access to the Runner's startup command so you can add a JVM argument.
- A Prometheus + Grafana stack. If you do not already have one, follow [Monitor the Rundeck Server with Prometheus and Grafana](/learning/howto/monitor-server-grafana.md) to stand one up, then add the Runner as an extra scrape target.

## Step 1: Download the JMX Exporter

Download the `jmx_prometheus_javaagent` JAR from Maven Central and place it next to the Runner JAR:

```bash
curl -L -o jmx_prometheus_javaagent.jar \
  https://repo1.maven.org/maven2/io/prometheus/jmx/jmx_prometheus_javaagent/1.0.0/jmx_prometheus_javaagent-1.0.0.jar
```

## Step 2: Create the exporter configuration

Create `jmx-config.yml` next to the Runner JAR. This configuration lowercases names, maps standard JVM MBeans to conventional metric names, exposes the Runner's metrics (published under the `metrics` JMX domain), and includes a catch-all so nothing is silently dropped:

```yaml
startDelaySeconds: 0
ssl: false
lowercaseOutputName: true
lowercaseOutputLabelNames: true

rules:
  # JVM heap / non-heap memory
  - pattern: "java.lang<type=Memory><>(HeapMemoryUsage|NonHeapMemoryUsage)"
    name: jvm_memory_bytes
    type: GAUGE
    labels:
      area: "$1"

  # Garbage collection
  - pattern: "java.lang<type=GarbageCollector,name=(.+)><>(CollectionTime|CollectionCount)"
    name: jvm_gc_$2
    type: COUNTER
    labels:
      gc: "$1"

  # Threads
  - pattern: "java.lang<type=Threading><>(ThreadCount|PeakThreadCount|TotalStartedThreadCount)"
    name: jvm_threads_$1
    type: GAUGE

  # Runner application metrics (runner.operations.*, runner.reporter.*) published via Micrometer's JMX registry
  - pattern: 'metrics<name=(.+)><>([A-Za-z0-9_]+)'
    name: runner_$1_$2
    help: "Runner metric $1 $2"
    type: GAUGE

  # Catch-all: expose anything not matched above with auto-generated names
  - pattern: ".*"
```

## Step 3: Start the Runner with the exporter attached

Add the `-javaagent` argument to the Runner's startup command. The `9404` below is the port the exporter will serve metrics on:

```bash
java \
  -javaagent:./jmx_prometheus_javaagent.jar=9404:./jmx-config.yml \
  -jar pd-runner.jar
```

Use your actual Runner JAR name (for example `runner-<uuid>.jar`).

For a Docker-based Runner, mount the exporter JAR and config into the container and append the agent to the Java command (or `JAVA_TOOL_OPTIONS`), and publish port `9404`:

```yaml
runner:
  ports:
    - "9404:9404"
  volumes:
    - ./jmx_prometheus_javaagent.jar:/app/jmx_prometheus_javaagent.jar:ro
    - ./jmx-config.yml:/app/jmx-config.yml:ro
  command: >
    java
    -javaagent:/app/jmx_prometheus_javaagent.jar=9404:/app/jmx-config.yml
    -Drunner.credentials.file=/app/.rdrunner-creds
    -jar pd-runner.jar
```

## Step 4: Verify the exposed metrics

With the Runner running, scrape the exporter directly to confirm metrics are being published and to discover the exact series names produced by your rules:

```bash
curl http://localhost:9404/metrics | grep -i runner
```

You should see the Runner's operation and report-delivery metrics, for example series derived from `runner.operations.pool.utilization`, `runner.operations.running`, `runner.reporter.queue.size.total`, and `runner.reporter.max_delivery_delay_seconds`. Note the exact names returned here — you will use them in your Grafana queries. If a metric you expect is missing, widen the rules in `jmx-config.yml` (the catch-all should surface it under an auto-generated name).

## Step 5: Add a Prometheus scrape target

Add the exporter to your `prometheus.yml`:

```yaml
scrape_configs:
  - job_name: 'rundeck-runner'
    static_configs:
      - targets: ['runner:9404']
        labels:
          service: runner
```

Replace `runner:9404` with the address Prometheus uses to reach the exporter. Reload or restart Prometheus, then confirm the `rundeck-runner` target is **UP** under **Status → Targets**.

## Step 6: Build dashboard panels

In Grafana, add panels using the Prometheus data source. Use the names you confirmed in Step 4 — the queries below assume the example rules from Step 2.

**Operation pool utilization (0–100%):**

```promql
runner_operations_pool_utilization * 100
```

**Running vs. queued operations:**

```promql
runner_operations_running
runner_operations_queued
runner_operations_inflight
runner_operations_pool_capacity
```

**Report backlog and delivery delay (leading timeout indicator):**

```promql
runner_reporter_queue_size_total
runner_reporter_max_delivery_delay_seconds
```

**JVM heap usage:**

```promql
jvm_memory_bytes{area="HeapMemoryUsage"}
```

:::tip Diagnosing report-delivery timeouts
`runner.reporter.max_delivery_delay_seconds` is the earliest warning sign: as it approaches `540` seconds, a server-side timeout (at 600 seconds) is imminent. Pair this Runner dashboard with the server-side `runner_server_report_*` metrics from [Monitor the Rundeck Server with Prometheus and Grafana](/learning/howto/monitor-server-grafana.md#runner-report-delivery-metrics) to see both ends of the pipeline. See the [Runner Metrics Reference](/administration/runner/runner-management/runner-metrics.md#diagnosing-report-delivery-timeouts) for the full diagnostic playbook and suggested alerts.
:::

## Alternative: scrape JMX remotely

If you prefer not to run an in-process agent, you can instead enable JMX remote access on the Runner (see [Status & Monitoring → Monitoring Replicas](/administration/runner/runner-management/monitoring-runners.md#monitoring-replicas)) and run the standalone `jmx_prometheus_httpserver` as a separate process pointed at the Runner's JMX port. The in-process `javaagent` approach in this guide is simpler because it does not require opening a remote JMX port.

## Next steps

- Set [alerting rules](https://prometheus.io/docs/alerting/latest/overview/) on `runner_reporter_max_delivery_delay_seconds` and operation pool utilization.
- If a Runner is regularly saturated, review [Performance tuning for high-throughput Runners](/administration/runner/runner-config.md#performance-tuning-for-high-throughput-runners).
