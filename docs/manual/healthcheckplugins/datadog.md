# Datadog Health Check (Enterprise Only)

:::enterprise
:::
## Overview

The DataDog Health Check plugin allow Rundeck to check status of DataDog hosts. The plugin checks if the host is up according to DataDog and returns "healthy/unhealthy".

## Configuration

![DataDog HealthCheck Config](@assets/img/healthcheck-datadog-config)

**Node Filter**: This is the Node Filter used to determine which nodes the HealthCheck is run against.

**Label**: Name to reference this instance of the HealthCheck

**API Key**: The DataDog API Key used to authenticate.

**APP Key**: The DataDog APP Key used to authenticate.
