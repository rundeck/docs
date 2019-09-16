# Logstore

Rundeck Enterprise Cluster instances must share the same logstore. Job execution output is stored locally to the Rundeck Enterprise instance that ran the job but this output can be loaded into a common storage facility (eg, AWS S3, WebDAV, custom).

With a configured logstore, the executing Rundeck Enterprise instance copies the local output file to the logstore after job completion. If the standby Rundeck Enterprise instance is activated, any request for that output log will cause the standby to retrieve it from the logstore and copy it locally for future access.

Rundeck will make multiple attempts to store a log file if the logstore is unavailable.

All Rundeck Enterprise Cluster members must share the same log storage, this can be achieved in two ways:

## Log storage plugin

So far we have the following plugins for execution log storage:

- [AWS S3](/administration/cluster/logstore/s3.md): This plugin works with any storage compatible with AWS S3 API, eg: S3, Minio, etc.
- [Azure Blob Storage](/administration/cluster/logstore/azure.md)

See [Logging Plugin Development](/developer/06-logging-plugins.md) to learn how to implement your own log storage.

## Shared file system

You can configure your Rundeck instances to share a file system using a NAS/SAN or NFS but those methods are typically less desirable or impossible in a cloud environment. Without a shared logstore, job output files would need to be synchronized across Rundecks via a tool like `rsync`.

You can set the shared file system path with `framework.logs.dir` in the `framework.properties` file. This changes must be done in all the cluster members.
