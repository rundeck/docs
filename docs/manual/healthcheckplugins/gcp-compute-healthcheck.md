# Google Cloud Compute Health Check

The Google Cloud Platform(GCP) Compute Health Check can provide health status updates based on whether the Google Compute instance is running or not.

### Authentication & Configuration
Follow the steps outlined in the [**Google Cloud Integration Overview**](/manual/plugins/gcp-plugins-overview) doc to configure credentials for the GCP plugins.
Credentials can be configured on a per Project basis or for the entire Runbook Automation system.

![GCP Compute Health Check](/assets/img/healthcheck-gcp-compute.png)

- **Node Filter:** This is the node filter that determines which nodes to run this health Check against.  The default is `tags: GCPCOMPUTE`. A `GCPCOMPUTE` tag is applied automatically by the Node Source.  
    >If the Project is using more than one EC2 Node Source for multiple regions it would be important to add the region to the Node Filter to the region this Node
    Filter is targeting.

- **Label**: A user friendly label for the Health Check
- **Project ID**: GCP Project ID where the Compute Instances are running.
- **Service Account Key Path**: Path in the Key Storage where the Access Key JSON is stored.
- **Zone**: The GCP Zone where these nodes are running.
