# Google Cloud Platform - Workflow Steps

## Getting Started

[Google Cloud Platform](https://cloud.google.com) (GCP) is a cloud service in wide use for dynamic infrastructure; it is easy to start up and shut down Node "Instances" in the cloud.  Use these Rundeck steps to automate common GCP Compute VM actions.

### Authentication & Configuration
Follow the steps outlined in the [**Google Cloud Integration Overview**](/manual/plugins/gcp-plugins-overview) doc to configure credentials for the GCP plugins.
Credentials can be configured on a per Project basis or for the entire Runbook Automation system.

**Project ID**
: Specify your GCP Project ID.

This setting can be configured using _System Configuration_ using `gcp.projectId` or project specific using `project.gcp.projectId`

**Zone**
: Specify your GCP Secret Key. If using the GCP Node Source it's possible to use `${node.zone}` and the Zone will be dynamically populated with the region for that node.

This setting can be configured using _System Configuration_ using `gcp.zone` or project specific using `project.gcp.zone`

**Access Key Path**
: Path to Key Storage entry containing the Access Key.

This setting can be configured using _System Configuration_ using `gcp.zone` or project specific using `project.gcp.zone`

## Compute VM Workflow Steps (Enterprise Only)

For each of these steps an **Instance Name** will need to be included for the instance to be acted on.

### GCP / VM / Start

Start the Compute VM instance.

### GCP / VM / Stop

Start the Compute VM instance.

### GCP / VM / Restart

Start the Compute VM instance.

### GCP / VM / Delete

Terminate the Compute VM instance.

:::danger
 Be very careful when using this step.
:::

### GCP / SQLInstance / Restart

Restart a GCP SQL Instance.

### GCP / VM / Capture Snapshot

Capture a snapshot of the GCP VM. The snapshot name cannot include spaces. 

### GCP / VM / Update / Autoscaling Policy

- Update the autoscaling policy of GCP managed compute machine using below parameters:
- instanceName
- projectId
- zone
- Cool down period (Optional- in seconds)
- CPU utilization target (Optional- Must be between 0-1 i.e 0.6)
- Maximum number of replicas you want to create for Compute Machine
- Minimum number of replicas you want to create for Compute Machine (Optional)
- Policy Mode( Optional i.e. ON, OFF)

### GCP / Enable / VPC / Network / Peering

Allow VPC connections between one another using peer network, network, and connection name.

### GCP / Create / Resource

Create a new instance using an existing disk which uses instance name, disk name, and machine type.

### GCP / Configure / Vpc-Log

Enable flow log for GCP cloud instance.
