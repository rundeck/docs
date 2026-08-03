# Google Cloud Platform - Compute VM Node Source

[Google Cloud Platform](https://cloud.google.com) (GCP) is a cloud service in wide use for dynamic infrastructure; it is easy to start up and shut down Node "Instances" in the cloud.


## Configuring the Node Source

### Authentication & Configuration
Follow the steps outlined in the [**Google Cloud Integration Overview**](/manual/plugins/gcp-plugins-overview) doc to configure credentials for the GCP plugins.
Credentials can be configured on a per Project basis or for the entire Runbook Automation system.

**Project ID**
: Specify your GCP Project ID.

**Zone**
: Specify your GCP Secret Key. If using the GCP Node Source it's possible to use `${node.zone}` and the Zone will be dynamically populated with the region for that node.

**Access Key Path**
: Path to Key Storage entry containing the Access Key.

**Hostname Source**
: Which value to use as the node hostname (connection string): `Instance Name` (default, requires the Rundeck server to resolve it via DNS), `Internal IP` (the instance's primary internal IP, useful across peered VPCs or different GCP projects), or `External IP` (the instance's external/NAT IP). If the selected IP is not available for an instance, the instance name is used as a fallback.

**Username**
: Default username to set on discovered nodes. Leave blank to keep it empty and rely on node enhancers or project defaults.

> Note: This node source does not support pulling these settings from the System Configuration.

Discovered nodes also expose their internal IP and external IP as the `internalIP` and `natIP` node attributes, regardless of the selected Hostname Source, making it easier to connect to instances across peered VPCs or different GCP projects.

## Filtering Nodes

**Just running instances**
: Will return only running instances to populate the Node listing.
