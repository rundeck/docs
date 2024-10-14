## AWS S3 Node Steps

AWS S3 provides object storage through a web service interface. The following S3 plugins are available for PagerDuty Runbook Automation:

* [S3 Copy Object (aws / s3 / cp)](#s3-copy-object)
* [S3 Delete Object (aws / s3 / rm)](#s3-delete-object)
* [S3 List Objects (aws / s3 / ls)](#s3-list-objects)
* [S3 Sync Directories (aws / s3 / sync)](#s3-sync-directories)
* [S3 Move Object (aws / s3 / mv)](#s3-move-object)
* [S3 Create Bucket (aws / s3 / mb)](#s3-create-bucket)

:::tip Open Source Plugins
The AWS S3 plugins are open source and available on [GitHub](https://github.com/rundeck-plugins/aws-s3-steps)
:::

### Authentication

Authentication for the AWS S3 plugins is handled by configuring the AWS Credentials within the plugins or by assigning an IAM Role to the Runbook Automation instance or Enterprise Runner.

Details on how to configure the IAM Role for Runbook Automation can be found in the [AWS Plugins Overview](/manual/plugins/aws-plugins-overview.md#aws-integration-for-runbook-automation-hosted-on-ec2).

### S3 Copy Object

The **AWS / S3 / Copy Object** plugin is a Node Step that copies an object from one S3 bucket to another. The plugin requires the following fields:

* **Source**: The S3 URI or local path.
  * Example: `s3://mybucket/myobject` or `/tmp/path/to/local/file`
* **Destination**: The S3 URI or local path.
  * Example: `s3://mybucket/myobject` or `/tmp/path/to/local/file`
* **Include**: Do not exclude files or objects in the command that match the specified pattern.
* **Exclude**: Exclude files or objects in the command that match the specified pattern.
* **Quiet**: Does not display the operations performed from the specified command.
* **Recursive**: Command is performed on all files or objects under the specified directory or prefix.
* **Dry Run**: Displays the operations that would be performed using the specified command without actually running them.
* **Delete**: Files that exist in the destination but not in the source are deleted during sync.

### S3 Delete Object

* **S3 URI**: The URI of the object in S3 to delete. The URI should be in the format `s3://bucket-name/object-key`.
* **Include**: Do not exclude files or objects in the command that match the specified pattern.
* **Exclude**: Exclude files or objects in the command that match the specified pattern.
* **Dry Run**: Displays the operations that would be performed using the specified command without actually running them.
* **Recursive**: Command is performed on all files or objects under the specified directory or prefix.
* **Only Show Errors**: Only show errors and warnings in the log output.
* **Page Size**: The number of results to return in each response to a list operation.

### S3 List Objects

* **S3 URI**: The URI of the object in S3 to list. The URI should be in the format `s3://bucket-name/object-key`.
* **Recursive**: Command is performed on all files or objects under the specified directory or prefix.
* **Human Readable**: Displays file sizes in human-readable format.
* **Summarize**: Displays a summary of the number of files and the total size.
* **Page Size**: The number of results to return in each response to a list operation.

### S3 Sync Directories

* **Source**: The S3 URI or local path.
  * Example: `s3://mybucket/myobject` or `/tmp/path/to/local/file`
* **Destination**: The S3 URI or local path.
  * Example: `s3://mybucket/myobject` or `/tmp/path/to/local/file`
* **Include**: Do not exclude files or objects in the command that match the specified pattern.
* **Exclude**: Exclude files or objects in the command that match the specified pattern.
* **Quiet**: Does not display the operations performed from the specified command.
* **Recursive**: Command is performed on all files or objects under the specified directory or prefix.
* **Dry Run**: Displays the operations that would be performed using the specified command without actually running them.

### S3 Move Object

* **Source**: The S3 URI or local path.
  * Example: `s3://mybucket/myobject` or `/tmp/path/to/local/file`
* **Destination**: The S3 URI or local path.
  * Example: `s3://mybucket/myobject` or `/tmp/path/to/local/file`
* **Include**: Do not exclude files or objects in the command that match the specified pattern.
* **Exclude**: Exclude files or objects in the command that match the specified pattern.
* **Quiet**: Does not display the operations performed from the specified command.
* **Recursive**: Command is performed on all files or objects under the specified directory or prefix.
* **Dry Run**: Displays the operations that would be performed using the specified command without actually running them.

### S3 Create Bucket

* **S3 URI**: The URI of the bucket to create. The URI should be in the format `s3://bucket-name`.