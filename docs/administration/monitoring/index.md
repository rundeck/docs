# Metrics and Monitoring

## Overview

Rundeck 6.0 introduces modern monitoring endpoints that provide comprehensive visibility into your Rundeck instance's performance, health, and operational metrics. These endpoints enable integration with popular monitoring tools like Prometheus, Grafana, and other time-series monitoring systems.

The monitoring system provides real-time metrics about:
- Application health and availability
- Job execution performance
- HTTP request handling
- JVM resource usage (memory, CPU, threads)
- System resource utilization
- Database connection pools
- Thread pool statistics

## Why Monitor Rundeck?

Monitoring your Rundeck instance helps you:

- **Ensure availability**: Track application health to detect issues before they impact users
- **Optimize performance**: Identify bottlenecks in job execution, database queries, or resource usage
- **Plan capacity**: Understand resource consumption patterns to plan for growth
- **Troubleshoot issues**: Access detailed metrics and thread dumps when investigating problems
- **Meet SLAs**: Monitor job execution times and success rates to ensure service level agreements are met

## Available Endpoints

Rundeck 6.0 provides two sets of monitoring endpoints:

**Modern endpoints** (recommended, enabled by default):
- `/monitoring/prometheus` - Metrics in Prometheus format for scraping
- `/monitoring/metrics` - List of available metrics in JSON format
- `/monitoring/metrics/{name}` - Specific metric values
- `/monitoring/health` - Application health status
- `/monitoring/info` - Application information (name, version)
- `/monitoring/threaddump` - JVM thread dump for debugging

**Legacy endpoints** (deprecated, opt-in only):
- `/metrics/metrics` - Legacy Dropwizard format metrics
- `/metrics/ping` - Simple ping/pong response
- `/metrics/healthcheck` - Legacy health check format
- `/metrics/threads` - Legacy thread dump format

:::warning Legacy Endpoints Deprecated
Legacy endpoints are disabled by default in Rundeck 6.0. They will be removed entirely in a future release. If you're using legacy endpoints, you should migrate to the modern endpoints. See [Configuration](/administration/monitoring/configuration.md#legacy-endpoints) for details on enabling legacy endpoints if needed during migration.
:::

## Monitoring Options

Rundeck supports multiple ways to access monitoring data:

1. **HTTP Endpoints**: Direct access to metrics via REST endpoints (no authentication required, enabled by default)
2. **JMX Export**: Expose metrics as JMX MBeans for monitoring tools that support JMX (requires explicit configuration)
3. **API Endpoints**: Access metrics through the Rundeck API (requires authentication, forwards to HTTP endpoints)

All three methods read from the same underlying metrics data, so you can use any combination that fits your monitoring infrastructure. HTTP endpoints and JMX export are independent - you can enable one without the other.

For details on configuring these options, see [Configuration](/administration/monitoring/configuration.md).

## Next Steps

- [Configure monitoring endpoints](/administration/monitoring/configuration.md) - Set up modern and legacy endpoints
- [Use monitoring data](/administration/monitoring/monitoring.md) - Learn how to consume and interpret metrics
- [API Documentation](/api/index.md) - Access metrics via the Rundeck API
