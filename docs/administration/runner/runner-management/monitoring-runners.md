# Status & Monitoring

## Runners Status

The status of a Runner is displayed in the **Runners** page. The following table describes the different statuses:

| **Runner Status** | **Description**                                                                                                                 |
|-------------------|---------------------------------------------------------------------------------------------------------------------------------|
| **New**           | A new Replica has been created for this Runner but has not yet been installed or sent a heartbeat.                              |
| **Healthy**       | All Replicas for this Runner are sending heartbeats and are available for tasks                                                 |
| **Busy**          | All available Replicas for this Runner are running at or near their maximum concurrent-operation capacity. The Runner is still working, but — like **Unhealthy** — new executions are directed to other Runners while it is saturated. |
| **Unhealthy**     | At least one or more Replicas are unavailable for Down, but there is still at least one Replicas that _is_ available for tasks. |
| **Unknown**       | All Replicas of the Runner have not sent a heartbeat in over 30 seconds, but have not yet been declared Down.                   |
| **Down**          | All Replicas of the Runner are declared Down and therefore have not sent a heartbeat in the past 120 seconds.                   |

## Replica Status

The status of Replicas can be seen by navigating to the **Replicas** tab of the Runner. The status of each Replica is shown in the **Last Active** column. The status can be one of the following:
| **Replica Status** | **Description**|
|-------------------|---------------------------------------------------------------------------------------------------------------------------------|
| **New** | The Replica has been created but not yet started. Heartbeats are sent from the Replica every 2 seconds.|
| **Healthy** | The Replica is currently running and available for tasks.|
| **Busy** | The Replica is running at or near its maximum concurrent-operation capacity. It is still healthy, but new tasks are directed to other Replicas while it is saturated.|
| **Unhealthy** | The Replica has connected to Runbook Automation but is experiencing a high workload. This status is set to safeguard the execution times and tells Runbook Automation to utilize another Replica - if available.|
| **Unknown** | The server has not heard from the Replica in 30 seconds. Tasks will not be assigned to this Replica.|
| **Down** | The Replica has not been heard from in 120 seconds. Tasks will not be assigned to this Replica.|

## Runner Load & Operation Metrics

::: enterprise
:::

Rundeck 6.1 surfaces each Runner's operational load directly in the **Runner Management** interface, so you can see how heavily a Runner is working without attaching an external monitoring tool.

### Load column

The Runner and Replica tables include a **Load** column that shows a utilization bar for each row. The bar represents the ratio of currently running operations to the Runner's maximum concurrent capacity (`running / max`) and is colour-coded to match the Runner status:

- **Green** — operating comfortably within capacity.
- **Orange** — the Runner is [**Busy**](#runners-status): running at or near capacity.
- **Red** — the Runner is **Unhealthy** or **Down**.

An idle Runner shows an empty (0%) bar rather than a blank cell, so the column is always readable at a glance.

### Operation metrics panel

Click a Runner or Replica row to expand a panel with a detailed breakdown of the operations processed by that agent:

| Metric | Description |
|---|---|
| **Utilization** | Percentage of maximum concurrent capacity currently in use (`running / max`). High values indicate heavy load. |
| **Running** | Operations currently executing concurrently on the agent. |
| **Max** | Maximum concurrent operations allowed, as configured by [`runner.operations.maxRunning`](/administration/runner/runner-config.md#runner-operations-maxrunning). |
| **Queued** | Operations waiting in the agent's internal queue for a free worker thread. |
| **Completed** | Total operations finished since the agent last started. |

The same panel is available from the **Runner Summary** page and from the **Replicas** tab of a Runner.

![Expanded Runner operation metrics panel showing Utilization, Running, Max, Queued, and Completed cards](/assets/img/runner-load-metrics.png)

### Auto-refresh

The Runner and Replica tables include an **Auto-refresh** control (No Refresh, 10s, 30s, or 60s). When an interval is selected the load metrics refresh automatically, and an **Updated:** timestamp confirms the most recent refresh. The chosen interval is remembered across visits.

### Version requirement

::: warning Runners must be upgraded to report metrics
Operation metrics are reported by the Runner agent itself, so they are only available once a Runner has been upgraded. **Only Runners (and Replicas) running version 6.1 or later report the full set of operation metrics.** Runners on earlier versions continue to work normally but display the following notice in place of the metrics panel:

> This agent does not report full operation metrics. Update to the latest version for detailed metrics.

To enable the metrics for an existing Runner, [upgrade it](/administration/runner/runner-management/upgrading-runners.md) to 6.1 or later.
:::

## Tuning Replicas

Replicas are equipped to execute multiple tasks concurrently - such as executing multiple Job simultaneously or targeting multiple nodes within a Job in parallel. By default, a Replica can handle 50 concurrent task executions. 

- An **Unhealthy** status for a Replica is declared when that Replica can not longer accept new tasks because it has reached the concurrency threshold. You can check the number of concurrent operations via the API endpoint [Get runner information](/api/index.md#get-runner-information) under the variable **runningOperations**
- The maximum number of concurrent executions can be tuned using the parameter ` -Drunner.operations.maxRunning=<EXEC_LIMIT>` when deploying a Replica. However, please note the following:
    - The execution limit is linked to the available resources set for the Replica process. Although a maximum number of executions can be established via this parameter, the Replica will throttle the number of executions based on the available resources (CPU, Memory, Stack Memory and Heap Space in Java) as well as the number of tasks associated with that execution.
    - It is recommended to review the allocated resources to the machine and the Replica process when it is reporting as **Unhealthy**.  While Replicas can be scaled vertically by allocating additional compute resources to the Java process, note that the Runner feature is intentionally designed to scale horizontally by deploying additional Replicas.

## Ping Replicas

Users can check that a Replica is available via an ad hoc "ping" operation:

1. When managing a Runner - either at the Project or System level - click on the **Replicas** tab.
2. Select the **Actions** menu and click on **+ Ping**:
    ![Ping Runner](/assets/img/ping_replica.png)<br>
3. After a few seconds, the response will appear in the upper right.
4. If the Runner is available, the response show that the message was received:
   ![Ping Runner Response](/assets/img/runner-ping-response.png)<br>
5. If the Runner is unavailable, the response will show that the ping response timed out:
   ![Ping Runner Unavailable](/assets/img/runner-ping-unavailable.png)<br>

## Monitoring Replicas

The Enterprise Runner is a lightweight JVM process.  It can therefore be monitored with standard JMX monitoring tools.  

The Replica exposes a number of JMX MBeans that can be used to monitor the Replicas's health and performance.

To expose the JMX Mbeans, you can start the Replica with the following Java options:

- `-Dcom.sun.management.jmxremote` - This enables remote JMX monitoring.
- `-Dcom.sun.management.jmxremote.port` - This sets the port that the JMX Mbeans will be exposed on.
- `-Dcom.sun.management.jmxremote.authenticate` - This enables or disables authentication for the JMX connection.
- `-Dcom.sun.management.jmxremote.ssl` - This enables or disables SSL for the JMX connection.
- `-Djava.rmi.server.hostname` - This sets the hostname that the JMX Mbeans will be associated with.
- `-Dcom.sun.management.jmxremote.local.only` - This enables or disables local-only access to the JMX Mbeans.

For example, to start the Runner with JMX monitoring enabled on port 9010, you would use the following command:

```bash
java -Dcom.sun.management.jmxremote \
  -Dcom.sun.management.jmxremote.port=9010 \
  -Dcom.sun.management.jmxremote.local.only=false \
  -Dcom.sun.management.jmxremote.authenticate=false \
  -Dcom.sun.management.jmxremote.ssl=false \
  -Djava.rmi.server.hostname=localhost \
  -jar runner-6281cf48-37a2-4659-93c9-907539177022.jar
```

Once the Runner is running with JMX monitoring enabled, you can connect to it using a monitoring tool.

For example, the **Datadog** agent can be configured to monitor the Runners JVM metrics following [these steps](https://docs.datadoghq.com/integrations/java/?tab=host#configuration).

The JVM metrics will then be associated with the Runner's host in Datadog:

![Datadog Monitoring Runner](/assets/img/datadog-monitoring-runner.png)<br>

## Operation and report-delivery metrics

Rundeck 6.0 adds operation-queue and report-delivery metrics that help diagnose and predict the server-side `Runner did not deliver reports in the configured timeout period` error. On the Replica these are exposed through the **same JMX MBeans** described above — no extra configuration beyond enabling JMX is required.

The Replica does **not** expose an HTTP metrics endpoint and does not bind to a network port for monitoring. To consume the Runner metrics with Prometheus, attach the [`jmx_prometheus_javaagent`](https://github.com/prometheus/jmx_exporter) as a Java agent and point it at a JMX config:

```bash
java -javaagent:/path/to/jmx_prometheus_javaagent.jar=9404:/path/to/jmx-config.yml \
  -jar runner-6281cf48-37a2-4659-93c9-907539177022.jar
```

The agent then exposes the JMX MBeans (including JVM and Runner metrics) in Prometheus format on its own port (`9404` in the example above).

The Runner-side metrics are only part of the report-delivery picture; the matching server-side metrics are exposed on the Rundeck server's [`/monitoring/prometheus`](/administration/monitoring/monitoring.md) endpoint. For the full list of metrics across both processes and guidance on interpreting them, see the [Runner Metrics Reference](/administration/runner/runner-management/runner-metrics.md).
