# AWS Secrets Manager

:::enterprise
:::

AWS Secrets Manager provides users with a service to manage, retrieve, and rotate database credentials, application credentials, OAuth tokens, API keys, and other secrets throughout their lifecycles. Many AWS services store and use secrets in Secrets Manager.

This integration allows users to retrieve secrets from the AWS Secrets Manager service and use those secrets for connecting to resources such as VMs, databases, other tools, and much more.

**_Basic architecture diagram_**

## Setup

Use the following steps to configure the AWS Secrets Manager integration. 

### Authentication
The integration uses authentication set through the AWS Plugin within System Configuration. If this already configured, continue on to the next section. 

Otherwise, follow the instructions [here](/manual/plugins/aws-plugins-overview.html#setup) in the section that aligns with your Runbook Automation deployment type.

### Configuration
1. Navigate to the **System Menu** (gear icon in the upper right)
2. Click on **Key Storage**
![Key Storage Menu](/assets/img/key-storage-menu.png)
3. Navigate to the **Configure** tab
4. Click on **Add Storage Plugin +**
5. Click on **AWS Secrets Manager** from the popup list.
![AWS Secrets Plugin](/assets/img/aws-secrets-manager-plugin.png)
6. In the **Key Storage Path**, type in a directory name to be the "root" for the secrets retrieved from AWS. For example, `keys/aws-secrets` would create a directory called `aws-secrets` within the base `keys` directory of the Key Storage tree.
7. Click the checkbox for **Remove Path Prefix**
8. Optionally set an IAM Role ARN in the **Assume Role ARN** field.
    :::info When to set Assume Role ARN
    By default, the AWS Secrets Manager integration authenticates with AWS through the credentials set in the AWS plugin within System Configuration.
    This means that secrets will be retrieved from the AWS account that is configured through the AWS plugin. 
    In order to retrieve AWS Secrets from multiple AWS accounts, then place the IAM ARN from the "external" account into the **Assume Role ARN** field.
    :::
9. 