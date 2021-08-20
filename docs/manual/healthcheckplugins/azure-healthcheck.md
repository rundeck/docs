# Azure Health Check (Enterprise Only)

:::enterprise
:::
## Overview

The Azure Health Check plugin checks the status of Azure VMs. If the host is running the plugin will return a "healthy" status.

## Preparation

To configure this plugin some information will be needed from the Azure system.

* Tenant ID
* Client ID
* Subscription ID
* Client Key

## Configuration

**Node Filter**: This is the Node Filter used to determine which nodes the Health Check is run against in this project.

**Label**: Name to reference this instance of the HealthCheck

**Tenant ID**: This is the ID for the trust relationship between the Azure subscription and Azure Active Directory.
1. Sign in to the [Azure portal](https://portal.azure.com).
1. Select _Azure Active Directory_.
1. Select _Properties_.
1. Then, scroll down to the _Tenant ID_ field. Your _Tenant ID_ will be in the box.

**Client ID**: This is also referred to as the _Application ID_
1. Sign in to the [Azure portal](https://portal.azure.com).
1. Select _Azure Active Directory_ in the left sidebar.
1. Click _Enterprise Applications_.
1. Click _All Applications_.
1. Select the application which you have created.
1. Click _Properties_.
1. Copy the _Application ID_ .

**Subscription ID**:
1. Sign in to the [Azure portal](https://portal.azure.com).
1. Select _Subscriptions_ in the left sidebar.
1. Select whichever subscription is needed.
1. Click on _Overview_.
1. Copy the _Subscription ID_.

:::: tabs
::: tab  API Key Authentication (Recommended)

**Generating Azure Client Key**
1. Sign in to the [Azure portal](https://portal.azure.com).
1. Select _Azure Active Directory_ in the left sidebar.
1. Click _App Registrations_.
1. Select the application which you have created. (or create one)
1. Click on _Certificates and Secrets_.
1. Add a new _Client Secret_.
1. Provide a memorable _Key Description_ and choose an _Expiration_.
1. Click _Add_.
1. Copy and store the key value in a temporary location
    >Note: You won't be able to see this value again after you leave this page.

Add the Client Key Key to the [Key Storage](/manual/system-configs.md#key-storage).

> To use key storage path, you need to enable [health-check access control](/manual/healthchecks.md#access-control) by adding two configuration options in Configuration Management.
`rundeck.healthcheck.access.username=system` and `rundeck.healthcheck.access.role=system`.

**API Key Path**: Select the Key Storage entry containing the key material.

:::

::: tab Certificate Authentication
It is also possible to save the certificate as a file on the local server.

**Certificate Path**:  Path to certificate file on local Rundeck server. `/home/rundeck/certs/file.name`

**Certificate Password**: If the certificate is encrypted provide the password to unlock it.

::::
