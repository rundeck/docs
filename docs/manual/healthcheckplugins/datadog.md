# Datadog Health Check (Enterprise Only)

:::enterprise
:::
## Overview

The DataDog Health Check plugin allow Rundeck to check status of DataDog hosts to determine if they are healthy. The plugin checks if the host is up according to the DataDog system and returns "healthy/unhealthy".  Optionally, the plugin can check the status of the DataDog Agent process.

## Preparation

Gather the API Key and APP Key from your DataDog portal.  [Click here for more information from DataDog documentation](https://docs.datadoghq.com/account_management/api-app-keys/).

## Configuration

![DataDog HealthCheck Config](@assets/img/healthcheck-datadog-config.png)

**Node Filter**: This is the Node Filter used to determine which nodes the HealthCheck is run against.

**Label**: Name to reference this instance of the HealthCheck

**API Key**: The DataDog API Key used to authenticate.

**APP Key**: The DataDog APP Key used to authenticate.

**Health Check Agent**: Check the status of the DataDog Agent on these nodes. If the agent is not running it will return an "unhealthy" status.
