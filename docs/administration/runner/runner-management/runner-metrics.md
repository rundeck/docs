# Runner Metrics Reference

Rundeck 6.0 adds a focused set of metrics for diagnosing and predicting Runner report-delivery problems — in particular the server-side error:

```text
Failed: IOFailure: Runner did not deliver reports in the configured timeout period
```

This error fires when the server receives no status report for an in-flight operation for a consecutive 10-minute (600-second) window. It usually means the Runner is saturated rather than that the operation itself hung. The metrics below let you see the saturation building **before** the timeout occurs (the 540-second / 9-minute thresholds used in the alerts below fire about a minute ahead), and confirm where the time is being spent once it does.

For the configuration properties used to relieve this saturation, see [Performance tuning for high-throughput Runners](/administration/runner/runner-config.md#performance-tuning-for-high-throughput-runners).

## Where metrics are exposed

The report-delivery pipeline spans two processes, so the metrics are split across two exposure points:

| Source | Process | How it's exposed |
|---|---|---|
| Runner-side metrics (`runner.operations.*`, `runner.reporter.*`) | Runner / Replica | JMX MBeans. The Replica has no HTTP metrics endpoint; for Prometheus, attach the `jmx_prometheus_javaagent`. See [Operation and report-delivery metrics](/administration/runner/runner-management/monitoring-runners.md#operation-and-report-delivery-metrics). |
| Server-side metrics (`runner.server.*`, `runner.report.*`) | Rundeck server | The server's modern monitoring endpoint `/monitoring/prometheus`. See [Using monitoring data](/administration/monitoring/monitoring.md). |

:::tip Metric names
Metric names in this page use the dot-separated base form (`runner.operations.running`). The exact series name in your monitoring tool depends on how each metric is exposed — see [Server-side metric names in Prometheus](#server-side-metric-names-in-prometheus) below and the runner-side note about `jmx_prometheus_javaagent` mappings.
:::

## Runner-side metrics

These are emitted by the Runner (Replica) process.

### Operation queue

The Runner executes each operation in a thread from a fixed-size pool. When the pool is full, additional operations wait in an internal queue and emit no status reports until they start.

| Metric | Type | Description |
|---|---|---|
| `runner.operations.running` | Gauge | Operations currently executing on a worker thread. |
| `runner.operations.queued` | Gauge | Operations waiting for a worker thread (executor internal queue). |
| `runner.operations.inflight` | Gauge | Total tracked operations (queued + running + pending state-handler cleanup). |
| `runner.operations.pool.capacity` | Gauge | Maximum worker threads in the pool (set by `runner.operations.maxRunning`). |
| `runner.operations.pool.utilization` | Gauge | `running / capacity`, ranging from `0.0` to `1.0`. |
| `runner.operations.completed_total` | Gauge | Monotonic total of completed operations. |
| `runner.operations.queue_wait_time` | Timer | Time each operation waited in the queue before it began executing. |

### Report delivery

The Runner batches status reports in memory and flushes them to the server on a fixed interval. If the backlog grows faster than it is sent, the server eventually times out waiting for a batch.

| Metric | Type | Description |
|---|---|---|
| `runner.reporter.max_delivery_delay_seconds` | Gauge | **Leading indicator.** Age of the oldest pending report across all active queues. As this approaches `540` a server-side timeout is imminent. |
| `runner.reporter.queue.size.total` | Gauge | Total reports waiting across all operation queues (global backlog). |
| `runner.reporter.batch.size` | Summary | Distribution of batch sizes actually sent. |

## Server-side metrics

These are emitted by the Rundeck server and measure the full delivery pipeline as the server experiences it. They are registered in Rundeck's internal (Dropwizard) metric registry and bridged into Micrometer, so they are available from the modern `/monitoring/prometheus` endpoint that is enabled by default in Rundeck 6.0. (They also appear on the legacy `/metrics/*` endpoints, which are disabled by default in 6.0 — see [Monitoring configuration](/administration/monitoring/configuration.md#legacy-endpoints).)

### Timers

Timers expose a distribution (mean, p50, p95, p99, count).

| Metric | Description |
|---|---|
| `runner.server.report.end_to_end_latency` | Full journey: report creation on the Runner to handler invocation on the server. Covers Runner batching, HTTP transit, and the server-side queue wait. |
| `runner.server.report.runner_network_delay` | Phase A only: report creation on the Runner to receipt by the server. Covers Runner batching and HTTP transit. |
| `runner.report.batch.processing_time` | Batch lifecycle in cluster mode: database poll to delivery. |

### Gauges

| Metric | Description |
|---|---|
| `runner.server.report.end_to_end_latency.max_seconds` | Worst current end-to-end latency across all active operations. Predicts imminent timeouts. |
| `runner.operations.total_queue_size` | Total reports waiting across all server-side processor queues. |
| `runner.operations.active_count` | Total operations currently tracked by the service. |

### Counter

| Metric | Description |
|---|---|
| `runner.server.report.timeout.count` | Hard timeouts surfaced to the user. Each increment corresponds to one "Runner did not deliver reports" failure. |

### Histogram

| Metric | Description |
|---|---|
| `runner.report.batch.size` | Distribution of batch sizes processed in cluster mode. |

### Server-side metric names in Prometheus

The Dropwizard-to-Micrometer bridge expands each metric type into one or more Prometheus series, and dots in the base name become underscores. Knowing this is necessary to write working queries:

| Source type | Prometheus series | Notes |
|---|---|---|
| Gauge | `<name>` | For example `runner_server_report_end_to_end_latency_max_seconds` (value in **seconds**). |
| Counter | `<name>` | Exposed as a plain gauge of the current count — **no `_total` suffix**. For example `runner_server_report_timeout_count`. |
| Timer | `<name>_count`, `<name>_mean`, `<name>_50thpercentile`, `<name>_95thpercentile`, `<name>_99thpercentile` | Percentile/mean values are in **milliseconds**. For example `runner_server_report_end_to_end_latency_95thpercentile`. |
| Histogram | `<name>_count`, `<name>_mean`, `<name>_50thpercentile`, `<name>_95thpercentile`, `<name>_99thpercentile` | Raw value distribution (for example batch sizes). |

## Diagnosing report-delivery timeouts

Use the metrics together to answer three questions:

1. **Is a timeout about to happen?** Watch `runner.reporter.max_delivery_delay_seconds` (Runner) and `runner.server.report.end_to_end_latency.max_seconds` (server). Both track the worst current latency; as either approaches `540` seconds a timeout is imminent.
2. **How often are timeouts actually happening?** `runner.server.report.timeout.count` increments once per user-visible failure.
3. **Where is the time being spent?** Compare `runner.server.report.runner_network_delay` (Runner batching + HTTP) against `runner.server.report.end_to_end_latency` (the full path). A large gap between them points to a backed-up server-side queue; a high `runner_network_delay` with healthy server queues points to a saturated Runner or network.

To distinguish the two Runner-side bottlenecks:

- **Operation queue saturation** — `runner.operations.pool.utilization` at `1.0` with a rising `runner.operations.queue_wait_time` means operations are waiting for a worker thread and have not started reporting yet. Increase [`runner.operations.maxRunning`](/administration/runner/runner-config.md#runner-operations-maxrunning).
- **Report backlog** — a rising `runner.reporter.queue.size.total` and `runner.reporter.max_delivery_delay_seconds` while operations are running means reports are produced faster than they are flushed. Tune [report delivery](/administration/runner/runner-config.md#report-delivery).

## Suggested alerts

Treat the thresholds below as starting points and adjust for your workload.

The **server-side** examples use the series produced by `/monitoring/prometheus` (see [Server-side metric names in Prometheus](#server-side-metric-names-in-prometheus)):

```text
# Timeout imminent — worst current end-to-end latency (gauge, seconds)
runner_server_report_end_to_end_latency_max_seconds > 540   # 9 min: timeout in < 1 min
runner_server_report_end_to_end_latency_max_seconds > 480   # 8 min: warning

# Actual user-visible failures. The counter is bridged as a gauge, so use delta() (not increase()).
delta(runner_server_report_timeout_count[5m]) > 0
```

The **runner-side** indicators are equally useful, but their Prometheus series names depend on how your `jmx_prometheus_javaagent` configuration maps the JMX MBeans. Express these against whatever names your mapping produces:

- `runner.reporter.max_delivery_delay_seconds` (seconds) crossing `540` (critical) or `480` (warning) — the earliest leading indicator, measured on the Runner itself.
- `runner.operations.pool.utilization` sustained at `1.0` together with a rising `runner.operations.queue_wait_time` — the operation queue is saturated and work is waiting to start.
