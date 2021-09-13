# Google Cloud Platform - Workflow Steps

## Getting Started

[Google Cloud Platform](https://cloud.google.com) (GCP) is a cloud service in wide use for dynamic infrastructure; it is easy to start up and shut down Node "Instances" in the cloud.  Use these Rundeck steps to automate common GCP Compute VM actions.

To configure Authentication please use this page as a reference to gather the information below. [Creating and Managing Service Account Keys](https://cloud.google.com/iam/docs/creating-managing-service-account-keys).

**Project ID**
: Specify your GCP Project ID.

This setting can be configured using _System Configuration_ using `gcp.projectId` or project specific using `project.gcp.projectId`

**Zone**
: Specify your GCP Secret Key. If using the GCP Node Source it's possible to use `${node.zone}` and the Zone will be dynamically populated with the region for that node.

This setting can be configured using _System Configuration_ using `gcp.zone` or project specific using `project.gcp.zone`

**Access Key Path**
: Path to Key Storage entry containing the Access Key.

This setting can be configured using _System Configuration_ using `gcp.zone` or project specific using `project.gcp.zone`

## Compute VM VM Workflow Steps (Enterprise Only)

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
