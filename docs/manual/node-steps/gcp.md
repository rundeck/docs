#  Google Cloud Platform Node Steps

## Getting Started

:::tip
It is helpful to configure the GCP Compute VM resource model plugin before using these steps: [GCP Compute VM Resource Model](/manual/projects/resource-model-sources/gcp.md)
:::

### Authentication & Configuration
Follow the steps outlined in the [**Google Cloud Integration Overview**](/manual/plugins/gcp-plugins-overview) doc to configure credentials for the GCP plugins.
Credentials can be configured on a per Project basis or for the entire Runbook Automation system.

## Compute VM Node Steps (Enterprise Only)

### GCP / VM / Start

Start the Compute VM instance.

### GCP / VM / Stop

Start the Compute VM instance.

### GCP / VM / Restart

Start the Compute VM instance.

### GCP / VM / Delete

Terminate the Compute VM instance.

:::danger
 Be very careful when using this step.  It would be possible to remove a lot of instances by mistake if the node filter is too broad.
:::
