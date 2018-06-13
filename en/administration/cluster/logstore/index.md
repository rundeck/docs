% Logstore

Rundeck Pro Cluster instances must share the same logstore. Job execution output is stored locally to the Rundeck Pro instance that ran the job but this output can be loaded into a common storage facility (eg, AWS S3, WebDAV, custom).

With a configured logstore, the executing Rundeck Pro instance copies the local output file to the logstore after job completion. If the standby Rundeck Pro instance is activated, any request for that output log will cause the standby to retrieve it from the logstore and copy it locally for future access.

Rundeck will make multiple attempts to store a log file if the logstore is unavailable.

All Rundeck Pro Cluster members must share the same log storage, this can be achieved in two ways:

## Log storage plugin

So far we have the following plugins for execution log storage:

* [AWS S3](https://github.com/rundeck-plugins/rundeck-s3-log-plugin): This plugin works with any storage compatible with AWS S3 API, eg: S3, Minio, etc.
* [Azure Blob Storage](https://github.com/rundeck-plugins/rundeck-azure-plugin)

See [Logging Plugin Development](../../../developer/logging-plugin.html) to learn how to implement your own log storage.

## Shared file system

You can configure your Rundeck instances to share a file system using a NAS/SAN or NFS but those methods are typically less desirable or impossible in a cloud environment. Without a shared logstore, job output files would need to be synchronized across Rundecks via a tool like `rsync`.

You can set the shared file system path with `framework.logs.dir` in the `framework.properties` file. This changes must be done in all the cluster members.
