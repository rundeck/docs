# Status & Monitoring

## Runners Status

The status of a Runner is displayed in the **Runners** page. The status is represented by an icon and a description. The following table describes the different statuses:

| **Icon** | **Status** | **Description**                                                                                                                                                                                                    |
|----------|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|   ![New](/assets/img/runner_new.png)       | New        | Runner has been downloaded but it has not yet sent a first status signal to Runbook Automation.                                                                                                            |
|   ![Healthy](/assets/img/runner_healthy.png)       | Healthy    | Runner has connected to Runbook Automation and has reported a _Last Check-in_ at a reasonable time. Heartbeats are sent every 5 seconds from the Runner.                                                |
|    ![Unhealthy](/assets/img/runner_unhealthy.png)      | Unhealthy  | Runner has connected to Runbook Automation but experiencing a high workload. This status is set to safeguard the execution times and tells Runbook Automation to utilize another Runner - if available. |
|    ![Unknown](/assets/img/runner_unknown.png)      | Unknown    | Runner may have lost connectivity to Runbook Automation. The Unknown status is assumed if the Runner does not report a heartbeat to Runbook Automation within the last 30 seconds.  |
|    ![Down](/assets/img/runner_down.png)      | Down       | Runner is unavailable to execute any workload. A Runner will assume this status in the event of a graceful shutdown or if the Last Check-in is greater than 120 seconds.                                    |

- An **Unhealthy** state is related to the number of concurrent operations (and tasks) being executed on the runner ( you can check the number of concurrent operations via the API endpoint [Get runner information](/api/index.md#get-runner-information) under the variable **runningOperations**
- The maximum number of concurrent executions can be tuned, as stated. By default, the limit is set to 50. It can be tuned using the parameter ` -Drunner.operations.maxRunning=<EXEC_LIMIT>` when deploying a Runner. However, please note the following:
    - The execution limit is linked to the available resources set for the runner process. Although a maximum number of executions can be established via this parameter, the Runner will throttle the number of executions based on the available resources (CPU, Memory, Stack Memory and Heap Space in Java) as well as the number of tasks associated with that execution.
    - A Runner will report an **Unhealthy** state to Runbook Automation whenever this limit has been hit. Executions will be queued in memory rather than immediately scheduled to a CPU core.
    - It is recommended to review the allocated resources to the machine and the Runner process when a Runner is reporting as **Unhealthy**.  Runners can be scaled vertically by allocating additional compute resources to the Java process, as well as horizontally by deploying additional Runners with the same Tags and Project assignments.

## Replica Status

The status of a Runner replica is displayed on the list of Replicas for a specific Runner. The status is represented by an icon and a description. The following table describes the different statuses:



## Ping Runners

Users can check that a Runner is available via an ad hoc "ping" operation:

1. When managing a Runner - either at the Project or System level - click on the **Ping** button in the upper right:
   ![Ping Runner](/assets/img/ping-runner.png)<br>
2. After a few seconds, the response will appear in the upper right.
3. If the Runner is available, the response show that the message was received:
   ![Ping Runner Response](/assets/img/runner-ping-response.png)<br>
4. If the Runner is unavailable, the response will show that the ping response timed out:
   ![Ping Runner Unavailable](/assets/img/runner-ping-unavailable.png)<br>

## Monitoring Runners

The Enterprise Runner is a lightweight JVM process.  It can therefore be monitored with standard JMX monitoring tools.  

The Runner exposes a number of JMX MBeans that can be used to monitor the Runner's health and performance.

To expose the JMX Mbeans, you can start the Runner with the following Java options:

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
