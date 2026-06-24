---
redirectFrom: /administration/runner/runner-advancedsetup
title: "Custom Configuration"
---

## Proxying Runner connections

Runners can be configured to connect through a HTTP/HTTPS proxy. Proxies are commonly used to centralize and secure outbound traffic from the datacenter to internet services. The proxy configuration is optional and is added as java command line arguments when the runner process is started.

### Proxy configuration without proxy authentication

The following example will allow the runner to connect through the secure company proxy with address wp.acme.corp.

```
java -Dmicronaut.http.client.proxy-type=http -Dmicronaut.http.client.proxy-address=wp.acme.corp:443 -jar pd-runner.jar
```

1. `-Dmicronaut.http.client.proxy-type` is set to `http`
1. `-Dmicronaut.http.client.proxy-address` is set to the secure proxy company address.

### Proxy configuration with proxy authentication

The following example adds basic auth proxy configuration to the runner. The proxy-type and proxy-address settings are the same as the unauthenticated access example.

```
java -Dmicronaut.http.client.proxy-type=http -Dmicronaut.http.client.proxy-address=wp.acme.corp:443 -Dmicronaut.http.client.proxy-username=proxyUsernameString -Dmicronaut.http.client.proxy-password=proxyPassString -jar pd-runner.jar
```

1. `-Dmicronaut.http.client.proxy-username` is set to the user that is allowed to connect through the secure proxy.
1. `-Dmicronaut.http.client.proxy-password` is set to the secure proxy user password.

## Configure Java Heap Size

To configure the Java heap size for the Runner, add these parameters when starting it.

`-Xms` sets the initial Java heap size.

`-Xmx` sets the maximum Java heap size.

Example:
```
java -Xms4g -Xmx6g -jar pd-runner.jar
```

In this example, the Runner will start with an initial heap size of 4GB and can use a maximum of 6GB.

## Override temporary directory

To override the temporary directory used by the Runner, add these parameters when starting it.

`runner.rundeck.overrideTempDir:` 'true' to override the temporary directory, or 'false' to retain the default directory '/temp'.

`runner.dirs.tmp:` the new temporary directory.

Example:
```
java -Drunner.rundeck.overrideTempDir=true -Drunner.dirs.tmp=/your/custom/dir -jar pd-runner.jar
```

## Performance tuning for high-throughput Runners

When a Runner handles a large volume of concurrent operations or produces a large volume of log output, the default configuration may not be sufficient. In that case, the server can emit the error:

```
Failed: IOFailure: Runner did not deliver reports in the configured timeout period
```

This error means the server did not receive any status report from the Runner for a consecutive 10-minute window for an in-flight operation. It typically indicates that the Runner is saturated, not that the operation itself hung.

The properties below are the main levers available to increase capacity and avoid this class of error. All of them are JVM system properties — pass them with `-D` on the Runner command line (or via `command:` in Docker Compose).

### Operation concurrency

The Runner runs each operation in a thread from a fixed-size pool. When the pool is full, additional operations wait in an unbounded queue, and no status reports are emitted for queued operations.

#### `runner.operations.maxRunning`

* **Default:** `50`
* **Purpose:** Maximum number of operations the Runner will execute in parallel.
* **When to increase:** If you regularly submit bursts of more than 50 operations and see operations sitting "Queued" for a long time, or if the server reports timeouts for operations that were sitting in the queue.
* **Caveats:** More concurrency means more threads, more memory and more concurrent log streams. Increase [`-Xmx`](#configure-java-heap-size) proportionally.

Example — double the default concurrency:

```
java -Drunner.operations.maxRunning=100 -Xmx8g -jar pd-runner.jar
```

### Report delivery

The Runner batches status reports in memory and flushes them to the server on a fixed interval. Under high log volume, the batch may fill before the interval elapses; if the flush rate is too slow, the in-memory queue grows and the server eventually times out waiting for a batch.

:::warning
Changing these values increases the rate and/or size of HTTP requests that reach the server. On busy deployments this can significantly raise CPU, memory and database load on the Rundeck server. **The default values are recommended.** Only tune these properties after confirming the Runner is the bottleneck, and validate the server's resource usage after each change.
:::

#### `runner.reporter.sendRate`

* **Default:** `2s`
* **Purpose:** How often the Runner flushes queued reports to the server.
* **When to decrease:** When operations produce heavy log output and reports accumulate in memory faster than they are sent. A lower value (e.g. `1s`) flushes more often but increases HTTP request rate.

#### `runner.reporter.sendBatchSize`

* **Default:** `1000`
* **Purpose:** Maximum number of reports sent in a single HTTP request.
* **When to increase:** When you see the Runner hitting the batch cap repeatedly (reports accumulate because each flush can only drain 1000 at a time). Larger batches are more efficient per request but produce larger payloads.

Example — flush faster with bigger batches:

```
java -Drunner.reporter.sendRate=1s -Drunner.reporter.sendBatchSize=2000 -jar pd-runner.jar
```

### HTTP client tuning

The Runner uses a Micronaut HTTP client to deliver reports and poll for new operations. Under load, the default connection pool and timeouts may be too small.

#### `micronaut.http.client.pool.max-connections`

* **Default:** `50`
* **Purpose:** Size of the HTTP connection pool used by the Runner to talk to the server.
* **When to increase:** When the Runner is running many concurrent operations (`runner.operations.maxRunning` increased) and you also increase the polling / reporting frequency. A good rule of thumb is to keep this greater than or equal to `maxRunning`.

#### `micronaut.http.client.pool.acquire-timeout`

* **Default:** `10s`
* **Purpose:** Maximum time a thread will wait for a free connection in the pool before failing.
* **When to increase:** When you see intermittent `HttpClientException` or "connection not available" errors under load. Increase together with `max-connections`.

#### `micronaut.http.client.read-timeout`

* **Default:** `60s`
* **Purpose:** Maximum time to wait for a single HTTP response from the server.
* **When to increase:** Only when the network path to the server is slow or the server is under heavy load and legitimately takes longer to acknowledge batched reports.

#### `micronaut.http.client.connect-timeout`

* **Default:** `10s`
* **Purpose:** Maximum time to establish a TCP connection to the server.

Example — expand the HTTP pool for a high-concurrency Runner:

```
java \
  -Drunner.operations.maxRunning=100 \
  -Dmicronaut.http.client.pool.max-connections=120 \
  -Dmicronaut.http.client.pool.acquire-timeout=30s \
  -Xmx8g \
  -jar pd-runner.jar
```

## Server-side report processing (rundeck-config.properties)

The Rundeck server includes an optional compact processor that consolidates incoming runner reports into a single, compressed database row per operation, rather than expanding each report item into a separate row. This significantly reduces database transaction pressure and improves log update responsiveness, especially under high report load.

These are server-side properties that go in `rundeck-config.properties`. They complement the runner-client performance settings above, and are most impactful when runners produce high volumes of log output.

### `rundeck.runner.compactProcessor.enabled`

* **Default:** `false`
* **Purpose:** Enables the compact report processing mode on the server. When set to `true`, the server stores each runner's complete report message in a single compressed row (zlib) instead of one row per data object. This greatly reduces the number of database write transactions and can noticeably improve log update speed in the UI under high load.
* **When to enable:** When runners handle jobs with large log volumes and you observe elevated database load, slow log updates in the UI, or the error `Runner did not deliver reports in the configured timeout period` despite the runner being responsive.

Add to `rundeck-config.properties`:

```
rundeck.runner.compactProcessor.enabled=true
```

### `rundeck.runner.compactProcessor.maxReportDataSize`

* **Default:** `1gb`
* **Purpose:** Sets the maximum amount of runner report data that the server will store in the database per operation. Once the limit is reached, older report data for that operation is pruned. This acts as a safeguard against unbounded data growth from long-running or highly verbose jobs.
* **When to adjust:** Increase this value if jobs regularly produce output that exceeds 1 GB. Decrease it if you want a more conservative limit to protect database storage.
* **Accepted values:** Size strings — for example, `500mb`, `1gb`, `2gb`.

Add to `rundeck-config.properties`:

```
rundeck.runner.compactProcessor.maxReportDataSize=1gb
```

**Example — enable compact processing with a custom data limit:**

```
rundeck.runner.compactProcessor.enabled=true
rundeck.runner.compactProcessor.maxReportDataSize=2gb
```

## Using custom YAML configuration

In addition to passing configuration via JVM system properties (`-D` flags), you can place a custom `application.yml` file alongside the Runner JAR. This file allows you to define all settings in a structured format, which can be easier to maintain than long command lines.

### Creating a custom YAML file

1. Create an `application.yml` file in the same directory as `pd-runner.jar`.
2. Add any configuration properties in YAML format:

```yaml
runner:
  operations:
    maxRunning: 100

micronaut:
  http:
    client:
      pool:
        max-connections: 120
      read-timeout: 60s
      connect-timeout: 10s
```

3. Start the Runner with the `-Dmicronaut.config.files` flag pointing to your YAML file:

```bash
java -Dmicronaut.config.files=application.yml -jar pd-runner.jar
```

:::tip
You can combine YAML configuration with command-line properties. Command-line properties (`-D` flags) take precedence over values in `application.yml`, which is useful for overriding specific settings without modifying the file.
:::

### Docker configuration with environment variables

For Docker deployments, it's easier to use environment variables instead of mounting YAML files. Micronaut automatically maps environment variables to configuration properties using the following convention:

- Replace `.` with `_`
- Use uppercase letters
- Nested properties use `_` as separator

**Docker compose file**

```yaml
version: '3.9'
services:
  runner:
    image: 'rundeckpro/runner:5.20.0'
    environment:
      - RUNNER_RUNDECK_CLIENT_ID=<your-runner-id>
      - 'RUNNER_RUNDECK_SERVER_URL=https://<your-subdomain>.runbook.pagerduty.cloud'
      - RUNNER_RUNDECK_SERVER_TOKEN=<your-api-token>
      # Operation concurrency
      - RUNNER_OPERATIONS_MAXRUNNING=100
      # HTTP client pool
      - MICRONAUT_HTTP_CLIENT_POOL_MAX_CONNECTIONS=120
```

**Docker run command**

```bash
docker run \
  --name runner \
  -e RUNNER_RUNDECK_CLIENT_ID=<your-runner-id> \
  -e RUNNER_RUNDECK_SERVER_URL=https://<your-subdomain>.runbook.pagerduty.cloud \
  -e RUNNER_RUNDECK_SERVER_TOKEN=<your-api-token> \
  -e RUNNER_OPERATIONS_MAXRUNNING=100 \
  -e MICRONAUT_HTTP_CLIENT_POOL_MAX_CONNECTIONS=120 \
  rundeckpro/runner:5.20.0
```

## Configuring logging levels

You can adjust log levels in the `application.yml` file to increase visibility during troubleshooting or reduce noise in production.

Add a `logger.levels` section to your `application.yml`:

```yaml
---
# Custom configuration for Runner

# Logging configuration
logger:
  levels:
    # HTTP Client logging to monitor requests/responses
    io.micronaut.http.client: DEBUG
    io.micronaut.http.client.netty: DEBUG
    io.micronaut.http.client.netty.DefaultHttpClient: TRACE

    # Reporter logging
    com.rundeck.sidecar.agent.server.RESClient: DEBUG
    com.rundeck.sidecar.agent.operations.reporting.InMemoryOperationReporter: DEBUG
    com.rundeck.sidecar.agent.operations.reporting: INFO
    com.rundeck.sidecar.agent.operations.OperationService: INFO

# Runner configuration
runner:
  operations:
    maxRunning: 100
  reporter:
    sendRate: 1s
    sendBatchSize: 2000
```

Start the Runner with the configuration file:

```bash
java -Dmicronaut.config.files=application.yml -jar pd-runner.jar
```

### Common logging scenarios

**Debug HTTP requests to Rundeck server**

See all HTTP requests, responses, headers and bodies between Runner and server:

```yaml
logger:
  levels:
    io.micronaut.http.client: TRACE
    io.micronaut.http.client.netty.DefaultHttpClient: TRACE
```

**Debug operation execution and reporting**

```yaml
logger:
  levels:
    com.rundeck.sidecar.agent.operations: DEBUG
    com.rundeck.sidecar.agent.operations.OperationService: TRACE
    com.rundeck.sidecar.agent.operations.reporting: DEBUG
```

**Reduce noise in production**

```yaml
logger:
  levels:
    root: WARN
    com.rundeck.sidecar: INFO
```

### Quick command-line log level override

For quick testing, you can set log levels via system properties without modifying the YAML file:

```bash
# Set specific package to DEBUG
java -Dlogger.levels.io.micronaut.http.client=DEBUG -jar pd-runner.jar

# Multiple loggers
java \
  -Dlogger.levels.root=WARN \
  -Dlogger.levels.com.rundeck.sidecar=DEBUG \
  -Dlogger.levels.io.micronaut.http.client=TRACE \
  -jar pd-runner.jar
```

### Docker logging configuration

Use environment variables to set log levels in Docker:

**Docker compose file**

```yaml
version: '3.9'
services:
  runner:
    image: 'rundeckpro/runner:5.20.0'
    environment:
      - RUNNER_RUNDECK_CLIENT_ID=<your-runner-id>
      - 'RUNNER_RUNDECK_SERVER_URL=https://<your-subdomain>.runbook.pagerduty.cloud'
      - RUNNER_RUNDECK_SERVER_TOKEN=<your-api-token>
      # Enable HTTP client debug logging
      - LOGGER_LEVELS_IO_MICRONAUT_HTTP_CLIENT=DEBUG
      - LOGGER_LEVELS_IO_MICRONAUT_HTTP_CLIENT_NETTY=DEBUG
      # Enable reporter debug logging
      - LOGGER_LEVELS_COM_RUNDECK_SIDECAR_AGENT_OPERATIONS_REPORTING=DEBUG
```

**Docker run command**

```bash
docker run \
  --name runner \
  -e RUNNER_RUNDECK_CLIENT_ID=<your-runner-id> \
  -e RUNNER_RUNDECK_SERVER_URL=https://<your-subdomain>.runbook.pagerduty.cloud \
  -e RUNNER_RUNDECK_SERVER_TOKEN=<your-api-token> \
  -e LOGGER_LEVELS_IO_MICRONAUT_HTTP_CLIENT=DEBUG \
  -e LOGGER_LEVELS_COM_RUNDECK_SIDECAR_AGENT_OPERATIONS_REPORTING=DEBUG \
  rundeckpro/runner:5.20.0
```

## Runner APIs

[Runner APIs](/api/index.md#runner-management) are available to create, edit, download, and delete Runners.

## Runner configuration in a Docker container

You can configure java command line arguments properties by using the 'command' property in a docker compose file or docker run command.

This will override the default command on the container startup (`java -jar pd-runner.jar``) to the java command with the appropriated arguments.

Here is an example for a Proxy configuration on a Runner container:

**Docker compose file**

```
version: '3.9'
services:
    runner:
        image: 'rundeckpro/runner:5.20.0'
        environment:
            - RUNNER_RUNDECK_CLIENT_ID=<your-runner-id>
            - 'RUNNER_RUNDECK_SERVER_URL=https://<your-subdomain>.runbook.pagerduty.cloud'
            - RUNNER_RUNDECK_SERVER_TOKEN=<your-api-token>
        command: "java -Dmicronaut.http.client.proxy-type=http -Dmicronaut.http.client.proxy-address=proxysrv:443 -jar pd-runner.jar"
```

**Docker run command**

```
docker run \
  --name runner \
  -e RUNNER_RUNDECK_CLIENT_ID=<your-runner-id> \
  -e RUNNER_RUNDECK_SERVER_URL=https://<your-subdomain>.runbook.pagerduty.cloud \
  -e RUNNER_RUNDECK_SERVER_TOKEN=<your-api-token> \
  rundeckpro/runner:5.20.0 \
  java -Dmicronaut.http.client.proxy-type=http -Dmicronaut.http.client.proxy-address=proxysrv:443 -jar pd-runner.jar
```
