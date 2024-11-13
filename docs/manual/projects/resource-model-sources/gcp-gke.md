> :warning: **WARNING**>> Only add one Node Source at a time. Adding multiple Node Sources simultaneously can cause UUID duplication conflicts.

## GCP GKE Resource Model Source

The GCP GKE (Google Kubernetes Engine) Resource Model Source allows you to import your GKE clusters as nodes within Rundeck. This plugin provides node source functionality for managing and executing jobs on your Google Cloud Platform Kubernetes clusters directly from Rundeck.

### Configuration

To configure the GCP GKE Resource Model Source:

1. In your Rundeck project, go to "Project Settings" > "Edit Nodes".
2. Click "Add a new Node Source".
3. Select "GCP Kubernetes Engine Clusters (Beta)" from the list of available node sources.
4. Configure the following settings:

  - **Project ID**: The GCP Project ID to use for accessing the GKE clusters.
  - **Region or Zone**: The GCP region or zone where your GKE clusters are located. You can use `*` to include all regions or zones.
  - **Access Key Path**: The Key Storage path for the GCP Access Key credentials.
  - **Use Pod Service Account for Node Steps**: Choose whether to authenticate with the Pod Service Account for Job steps. Set to `True` if Runbook Automation or a Runner is executing within the targeted cluster.

### Authentication

You can configure GCP credentials at three levels:

1. Node Source level
2. Project level
3. System level

To set up credentials:

1. Create a new Key Storage entry of type 'private key' and upload the gcp-key-file for your GCP credentials file.
2. In the plugin configuration, provide:
  - GCP Project ID
  - Path to the GCP credentials in Key Storage
  - Region/Zone specification

### Installation

To manually build and install the plugin:

1. Build the plugin:
  ```bash
  ./gradlew :plugins:gcp-plugins:build
  ```
  Or skip tests with:
  ```bash
  ./gradlew :plugins:gcp-plugins:build -x test -x integrationTest
  ```

2. Install the plugin by copying the JAR to the `libext` directory:
  ```bash
  cp /<path_to_repository>/rundeckpro/plugins/cloud-aws-plugins/build/libs/rundeckpro-gcp-plugins-5.7.0-SNAPSHOT.jar ~/rundeck/libext/
  ```

### Node Attributes

Each GKE cluster will be represented as a node with the following attributes:

- `nodename`: The name of the GKE cluster
- `hostname`: The endpoint of the GKE cluster
- `gcp-project-id`: The GCP project ID containing the cluster
- `gcp-location`: The GCP region/zone of the cluster
- `kubernetes-cluster-endpoint`: The API server endpoint of the cluster
- `kubernetes-use-pod-service-account`: Whether to use pod service account for authentication
- `kubernetes-cloud-provider`: Set to "gcp-gke"
- `node-source-uuid`: A unique identifier for the node source

### Usage

Once configured, you can use these nodes like any other Rundeck nodes. You can target them in your jobs using their attributes, for example:

- To target all GKE nodes: `kubernetes-cloud-provider: gcp-gke`
- To target nodes in a specific project: `gcp-project-id: my-project`
- To target a specific cluster: `nodename: my-cluster-name`

### Authentication Modes

The plugin supports two authentication modes:

1. **GCP API Authentication**: Default mode when `Use Pod Service Account` is set to `false`. Uses GCP credentials for authentication.
2. **Pod Service Account**: When set to `true`, uses the Kubernetes service account of the pod for authentication. Ideal when Rundeck is running within the same cluster.

### Troubleshooting

If you encounter issues:

1. Check the Rundeck logs for any error messages.
2. Verify your GCP credentials and permissions:
  - Ensure the service account has the necessary GKE permissions
  - Verify the credentials file is properly stored in Key Storage
3. Ensure your GKE cluster is running and accessible.
4. Check network connectivity between Rundeck and your GCP resources.
5. Verify the correct Project ID and Region/Zone settings.

### Additional Resources

For more detailed information, refer to:
- [Google Kubernetes Engine documentation](https://cloud.google.com/kubernetes-engine/docs)
- [Rundeck documentation](https://docs.rundeck.com/)
- [GCP IAM documentation](https://cloud.google.com/iam/docs)
