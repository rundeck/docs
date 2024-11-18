## AWS EKS Resource Model Source

The AWS EKS (Elastic Kubernetes Service) Resource Model Source allows you to import your EKS clusters as nodes within Rundeck. This enables you to manage and execute jobs on your Kubernetes clusters directly from Rundeck.

### Configuration

To configure the AWS EKS Resource Model Source:

1. In your Rundeck project, go to "Project Settings" > "Edit Nodes".
2. Click "Add a new Node Source".
3. Select "AWS EKS Clusters" from the list of available node sources.
4. Configure the following settings:

   - **AWS Region**: The AWS region or regions where your EKS clusters are located.
   - **Assume Role ARN**: Optionally specify an IAM Role ARN to assume for retrieving EKS Clusters.
   - **Access Key ID**: The path to your AWS access key in Key Storage.
authentication.

### Authentication

You can configure AWS credentials at three levels:

1. Node Source level
2. Project level
3. System level

To set up credentials:

1. Create a new Key Storage entry for your AWS Secret Access Key.
2. In the plugin configuration, provide:
   - AWS Access Key ID
   - Path to the AWS Secret Access Key in Key Storage

If you encounter a "Key Storage access denied" error, you may need to add an ACL policy:

```yaml
by:
  group: [admin]
for:
  storage:
    - allows: [read]
      match:
        name: 'keys/aws/.*'
description: Allow admin group to read AWS keys
```

### Node Attributes

Each EKS cluster will be represented as a node with the following attributes:

- `nodename`: The name of the EKS cluster
- `hostname`: The endpoint of the EKS cluster
- `gcp-location`: The AWS region/zone of the cluster
- `kubernetes-cluster-endpoint`: The API server endpoint of the cluster
- `kubernetes-use-pod-service-account`: Whether to use pod service account for authentication
- `kubernetes-cloud-provider`: Set to "aws-eks"
- `node-source-uuid`: The UUID of this node source

### Usage

Once configured, you can use these nodes like any other Rundeck nodes. You can target them in your jobs using their attributes, for example:

- To target all EKS nodes: `kubernetes-cloud-provider: aws-eks`
- To target a specific cluster: `nodename: my-cluster-name`

### Troubleshooting

If you encounter issues:

1. Check the Rundeck logs for any error messages.
2. Verify your AWS credentials and permissions.
3. Ensure your EKS cluster is running and accessible.
4. Check network connectivity between Rundeck and your AWS resources.

For more detailed information, refer to the [AWS EKS documentation](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html) and [Rundeck documentation](https://docs.rundeck.com/).

