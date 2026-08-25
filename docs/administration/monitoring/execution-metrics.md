# Execution Metrics Reference

Rundeck 6.0 adds native, tagged execution metrics on the modern monitoring endpoint (`/monitoring/prometheus`), so per-project and per-job execution counts, durations, and in-flight counts are queryable directly from Prometheus and Grafana.

These metrics are registered directly on the Micrometer registry (not bridged from the legacy Dropwizard registry), so they follow standard Prometheus naming: dots become underscores, and counters get a `_total` suffix.

## Where these metrics are exposed

All metrics on this page are served at `/monitoring/prometheus`, the same endpoint documented in [Using monitoring data](/administration/monitoring/monitoring.md). No separate endpoint or exporter is required.

## Metrics

### Counter

| Metric | Tags | Description |
|---|---|---|
| `rundeck_executions_total` | `project`, `status` (`succeeded`, `failed`, `aborted`, `timedout`), and optionally `job_id`, `job_name` | Incremented once per execution, when the execution reaches its final persisted state. The `status` tag always reflects the final outcome — this metric never reports an in-progress execution. |

### Timer

| Metric | Tags | Description |
|---|---|---|
| `rundeck_execution_duration_seconds_count` | `project`, `status`, optionally `job_id`, `job_name` | Number of executions recorded. |
| `rundeck_execution_duration_seconds_sum` | same | Total execution duration. Divide by `_count` to get the average. |
| `rundeck_execution_duration_seconds_max` | same | Largest execution duration observed since the process started. |

### Gauges

| Metric | Tags | Description |
|---|---|---|
| `rundeck_executions_running` | `project`, optionally `job_id`, `job_name` | Executions currently running, tracked in memory (incremented when an execution starts, decremented when it finishes). This is an **event-driven, per-instance** count — it reflects only executions started by the Rundeck process being scraped, not the whole cluster. In a cluster, aggregate across instances with `sum by (project) (rundeck_executions_running)`. |
| `rundeck_system_info` | `version`, `build`, `node_uuid` | Constant `1` gauge exposing build metadata as labels (the value itself carries no information — a standard Prometheus "info metric" pattern). Registered once at startup. Useful for joining other metrics against version/build, or for tracking per-node rollout status with `count by (version) (rundeck_system_info)`. |
| `rundeck_execution_mode_active` | none | `1` when the instance is in active execution mode, `0` when passive (see [cluster mode](/administration/cluster/)). |

## The `job_id`/`job_name` dimension

By default, `rundeck_executions_total`, `rundeck_execution_duration_seconds_*`, and `rundeck_executions_running` are tagged only with `project` and `status`. You can opt in to an additional `job_id`/`job_name` tag pair to get per-job breakdowns directly in Prometheus, instead of falling back to the executions API or database for per-job statistics.

Enable it with:

```properties
rundeck.metrics.execution.job.dimension.enabled=true
```

This can also be set from **System Configuration** in the admin UI (Execution category) and takes effect immediately, no restart required.

Ad-hoc (non-scheduled) executions never receive a `job_id`/`job_name` tag, even when this flag is enabled — they have no stable job identity to tag.

When a job is deleted, its `job_id`-tagged series are removed from the live registry so they don't accumulate as unused ("zombie") series in the running process. This only affects what future scrapes report — any history already scraped into Prometheus is retained for as long as Prometheus's own retention policy keeps it, independent of the job's lifecycle in Rundeck.

## Example queries

**Execution success rate over the last 5 minutes:**
```promql
sum(rate(rundeck_executions_total{status="succeeded"}[5m]))
/
sum(rate(rundeck_executions_total[5m]))
```

**Average execution duration by project:**
```promql
rate(rundeck_execution_duration_seconds_sum[5m])
/
rate(rundeck_execution_duration_seconds_count[5m])
```

**Executions currently running, by project (cluster-wide):**
```promql
sum by (project) (rundeck_executions_running)
```

**Top 10 jobs by failure count** (requires `rundeck.metrics.execution.job.dimension.enabled=true`):
```promql
topk(10, sum by (job_id, job_name) (rundeck_executions_total{status="failed"}))
```

**Rundeck version rollout across a cluster:**
```promql
count by (version) (rundeck_system_info)
```
