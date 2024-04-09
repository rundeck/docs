# AWS Secrets Manager

:::enterprise
:::

AWS Secrets Manager provides users with a service to manage, retrieve, and rotate database credentials, application credentials, OAuth tokens, API keys, and other secrets throughout their lifecycles. Many AWS services store and use secrets in Secrets Manager.

This integration allows users to retrieve secrets from the AWS Secrets Manager service and use those secrets for connecting to resources such as VMs, databases, other tools, and much more.

## Setup

### Authentication
The AWS Secrets integration uses authentication set through the AWS Plugin within System Configuration. If this is already configured, continue on to the next section.<br>
Otherwise, follow the instructions [**here**](/manual/plugins/aws-plugins-overview.html#setup) and choose the auth type that aligns with your Runbook Automation deployment type.

### IAM Permissions 

The following permissions are required for the AWS Secrets Manager integration to _retrieve_ secrets:

* **`secretsmanager:ListSecrets`**
* **`secretsmanager:GetSecretValue`** 

Here is an example IAM policy that can be attached to the IAM Role that is used for the AWS Secrets Manager integration:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "secretsmanager:GetSecretValue",
                "secretsmanager:ListSecrets"
            ],
            "Resource": "*"
        }
    ]
}
```

Optionally, also use the following permissions to _add_, _update_ or _delete_ secrets:

* **`secretsmanager:PutSecretValue`**
* **`secretsmanager:UpdateSecret`**
* **`secretsmanager:DeleteSecret`**


### Configuration
1. Navigate to the **System Menu** (gear icon in the upper right).
2. Click on **Key Storage**.
![Key Storage Menu](/assets/img/key-storage-menu.png)
3. Navigate to the **Configure** tab.
4. Click on **Add Storage Plugin +**.
5. Click on **AWS Secrets Manager** from the popup list.
![AWS Secrets Plugin](/assets/img/aws-secrets-manager-plugin.png)
6. In the **Key Storage Path** field, type in a directory name to be the "root" for the secrets retrieved from AWS. For example, `keys/aws-secrets` would create a directory called `aws-secrets` within the base `keys` directory of the Key Storage tree.
7. Click the checkbox for **Remove Path Prefix**
![Path config](/assets/img/aws-secrets-path-config.png)
8. Optionally set an IAM Role ARN in the **Assume Role ARN** field.
    :::info When to set Assume Role ARN
    By default, the AWS Secrets Manager integration authenticates with AWS through the credentials set in the AWS plugin within System Configuration.
    This means that secrets will be retrieved from the AWS account that is configured through the AWS plugin. 
    In order to retrieve AWS Secrets from multiple AWS accounts, then place the IAM ARN from the "external" account into the **Assume Role ARN** field.
    :::
9. Optionally use the **Access Key** and **Secret Key** for authentication.
    :::warning Not Recommended for Production
    Amazon firmly states that the **Access Key** and **Secret Key** method of authentication should only be used for testing purposes and should not be used for any production use-cases.
    For more information, click [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/security-creds.html#sec-alternatives-to-long-term-access-keys).
    :::
10. Select the **Regions** where the secrets are stored in AWS Secrets Manager.
    * If multiple regions are selected, then the integration will retrieve secrets from all selected regions.
11. Optionally choose to include or exclude secrets that contain a specific substring.
12. Click **Save** to commit changes for the integration.
13. Click **Save** to add this integration to the Key Storage configuration.
![Save config](/assets/img/aws-secrets-save-config.png)

Within the **Keys** tab, refresh the browser page and the new directory path specified in **Step 6** should appear:

![Secrets Folder](/assets/img/aws-secrets-folder.png)<br>

Click into this directory and begin to navigate the secrets retrieved from AWS Secrets Manager.

## Usage

Once the integration is configured, the secrets from AWS Secrets Manager can be used by the various functions of the Runbook Automation product that require secrets.

:::info Directories within Key Storage
In order to make it easier to browse the secrets from AWS Secrets Manager, keys with forward-slashes **`/`** will be grouped into directories.
For example, if there is a secret in AWS with the name <br> **`kubernetes/clusters/api-token-12345`**, then in Runbook Automation this will result in a directory **`kubernetes`**
with a sub-directory **`clusters`** and then a key with the name **`api-token-12345`**.
:::

When multiple key-values pairs reside in a single AWS Secret, all keys are available within Key Storage in Runbook Automation:<br>
![RDS Key Value Pairs](/assets/img/rds-key-value-pairs-key-storage.png)<br>

## Example Use Cases

### Example: SSH Key for Connecting to Nodes

In this example, there is an SSH Key in AWS Secrets Manager:
<br>![SSH Key](/assets/img/aws-secrets-ssh-key.png)

To use this secret and the SSH Key for connecting to nodes:

1. Within the Project inside Runbook Automation, navigate to **Project Settings** -> **Edit Configuration**:
![Edit Config](/assets/img/project-edit-config.png)
2. Click on the **Default Node Executor** tab.
3. From the dropdown, select **SSHJ-SSH**:
![SSHJ](/assets/img/sshj-node-executor.png)
4. Click **Select...** next to the **SSH Key Storage Path** field:
![Key Selector](/assets/img/ssh-key-storage-selector.png)
5. From within the popup, click on the folder that was configured for AWS Secrets Manager (in the prior section, the example used was **`aws-secrets`**):
![Secrets Folder](/assets/img/aws-secrets-folder-popup.png)
6. Within this folder, select the SSH Key for the Node Executor.
7. Click **Choose Selected Key**.
8. Click **Save** at the bottom of the Node Executor configuration.

### Example: Database Password for RDS Instance

In AWS Secrets Manager, secrets can have multiple key-value pairs. This is the case for the **RDS Credentials** type of secret:
![RDS Secret](/assets/img/rds-secret-type.png)<br>

This example assumes that you already have an [**Enterprise Runner**](/administration/runner/runner-intro.html) installed in a security group that can connect to the RDS database _or_ that the self-hosted software has a direct path to the RDS database.

1. Within the Project inside Runbook Automation, navigate to **Jobs**.
2. Click **+ New Job**.
3. Give the Job a name - such as **_Query RDS Database_**.
4. Click into the **Workflow Tab**.
5. In the **Search Step field**, type in **`SQL`**.
6. Click on **SQL Run Step**.
7. In the **SQL Command(s)** box, type in the SQL query to execute against the database:
![SQL Query](/assets/img/sql-run-step-example.png)
8. Type in the JDBC Driver class name that matches the type of RDS instance:
   * MySQL or MariaDB: `org.mariadb.jdbc.Driver` (also Aurora compatible) 
   * MS SQL: `com.microsoft.sqlserver.jdbc.SQLServerDriver`
   * Postgres: `org.postgresql.Driver` (also Aurora compatible)
   * Oracle: `oracle.jdbc.OracleDriver`
9. In the **JDBC url** field, type in the connection string with the following format:<br> `jdbc:mysql://db-name.cj3ixhryi3fb.us-west-2.rds.amazonaws.com:3306/db-name`
10. Type in the **username** to connect to the database. 
11. Click **Select...** next to the **Password from key storage** field.
12. Navigate through the directories of the RDS keys in AWS Secrets manager.
13. Select the **password** key from the list of secrets:
![RDS Password](/assets/img/select-rds-password.png)
14. Click **Choose Selected Key**.
15. Click **Save** for the step. 
16. Navigate into the **Node & Runners** tab and use the **Runner Set** selector to choose the Runner that is installed in the AWS Security group with access to the RDS database.