# Monitor a Rundeck Instance Using Prometheus and Grafana

Using Rundeck [metrics](/api/index.md#metrics-data) users can monitor the health of any Rundeck instance (workload, CPU usage, memory amount, scheduled jobs, running jobs, etc). Some users find it helpful to display these metrics on a dashboard. Using a combination of Prometheus, Grafana, and a custom Prometheus exporter (rundeck_exporter) these metrics can be shown on a dashboard for a glance viewing.

The Rundeck Community team has developed an easy way to see how the Rundeck, rundeck_exporter, Prometheus, and Grafana integration works [using this Docker demo project](https://github.com/rundeck/rundeck-exporter-demo). In this article, we will describe how the Docker demo is configured to help users understand how this integration works.

## Prometheus

[Prometheus](https://prometheus.io/) is an open-source monitoring and alerting platform originally created by SoundCloud. Prometheus collects and stores metrics and data from any source.

## Grafana

[Grafana](https://grafana.com/oss/) OSS is an open-source visualization platform. Using Grafana, it’s possible to design custom dashboards to display information in real-time using any data source. These data sources can be a backend database, a file, or as you will see in this article, Prometheus.

## Rundeck_exporter project

Rundeck Community contributor, [Phillipe Smith](https://github.com/phsmith), created the rundeck_exporter to monitor the internal behavior of a Rundeck instance. rundeck_exporter is a [Prometheus exporter](https://prometheus.io/docs/instrumenting/exporters/) written in Python that takes Rundeck metrics information and displays it in Grafana (through Prometheus).

Find the rundeck_exporter Github repository [here](https://github.com/phsmith/rundeck_exporter).

## Rundeck Exporter Demo environment

[Download the Rundeck Exporter Demo environment here.](https://github.com/rundeck/rundeck-exporter-demo)

## Rundeck Configuration

First, you need an API token belonging to a user who has access to the Rundeck instance metrics. Using the API token, the rundeck_exporter image will take Rundeck metrics and expose them using Prometheus.

In the Docker demonstration project, a static token API called `rundecktoken` was defined.

In [this link](/manual/10-user.md#generate-api-token) you can see how to create an API token. In [this link](/administration/configuration/config-file-reference\.md#framework-properties) you can see how to create it statically on the `tokens.properties` file and then referenced on the `framework.properties` file.


## rundeck_exporter Configuration

rundeck_exporter is a Python Prometheus exporter (`rundeck_exporter.py`) that needs a series of parameters to receive the information from the Rundeck instance and be collected by Prometheus.

The demonstration project uses the following environment variables:

* `RUNDECK_URL` is used where the URL of the Rundeck instance is referenced
* `RUNDECK_TOKEN` to store the Rundeck token API
* `RUNDECK_PROJECTS_EXECUTIONS` to collect the information of all the executions
* `RUNDECK_CPU_STATS` for the CPU load statistics
* `RUNDECK_MEMORY_STATS` for information related to RAM memory load

rundeck_exporter project listens on TCP port 9620 by default.

## Prometheus Configuration

On the Prometheus side, a rundeck_exporter reference is needed.

To do this, add the host and port of rundeck_exporter in the `prometheus.yaml` file located in `/etc/prometheus` (in the `static_config` section) as follows:

```
	static_configs:
  	- targets: ["rundeck_exporter: 9620"]
```

[Here](https://github.com/rundeck/rundeck-exporter-demo/blob/main/prometheus/data/prometheus.yml) you can see what the complete file looks like.

Prometheus platform listens on 9090 TCP port by default.

## Grafana Configuration

First, you need to define the data source in Grafana, in this case, it is Prometheus. The `datasources.yml` file contains this information, specifically the Prometheus HTTP URL on the datasource section:

```
​​url: http://prometheus:9090
```

this file must go in the `/etc/grafana/provisioning/datasources/` path.

[Here](https://github.com/rundeck/rundeck-exporter-demo/blob/main/grafana/data/datasources.yml) you can see an example of what it looks like.

It is also necessary to define the dashboard in Grafana, this is done in the `rundeck.yml` file (in the `/etc/grafana/provisioning/dashboards/`path), it takes the Dashboard rundeck.json from the filesystem, here is the config line on the dashboard section of the Prometheus data source:

```
path: /var/lib/grafana/dashboards
```

[Here](https://github.com/rundeck/rundeck-exporter-demo/blob/main/grafana/data/rundeck.yml) is the demonstration `rundeck.yaml `for the full example.

## Grafana Dashboard

The final objective of this integration is to be able to see all of the information from the Rundeck instance in a custom dashboard. The definition of Grafana dashboards is in JSON format, usually at the `/var/lib/grafana/dashboards` path.

![Grafana Dashboard](/assets/img/howto-exporter-dashboard.jpg)

The rundeck_exporter project includes a complete dashboard available [here](https://github.com/phsmith/rundeck_exporter/tree/main/examples/grafana), but of course, custom dashboards can be [designed](https://grafana.com/grafana/resources/#create-a-dashboard).

Grafana listens to 3000 TCP port by default.

## Testing the Demonstration environment.

1. Clone or download the repository:
    ```
    git clone https://github.com/rundeck/rundeck-exporter-demo

    ```
2. Go to the cloned repository directory and build the environment with the `docker-compose build`, then run with `docker-compose up`.
3. Open the http://localhost:3000 URL in your web browser (user `admin`, password `admin`) and then select the "Rundeck" dashboard.
4. Open a new tab with the `http://localhost:4440` Rundeck URL (user `admin`, password `admin`) and create a new project with a couple of scheduled jobs, and wait for some executions.
5. If you check the Grafana tab (you will see all Rundeck instance metrics updated on the Grafana dashboard).

Thanks to our community contributor, Phillipe Smith, for creating the rundeck_exporter!
