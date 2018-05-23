% Logstore

All Rundeck Pro Cluster members must share the same log storage, this can be achieved in two ways:

* Shared file system: You can set the shared file system path with
`framework.logs.dir` in the `framework.properties` file. This changes must be
done in all the cluster members.
* Plugins: Using an Execution log storage plugin.

So far we have the following plugins for execution log storage:

* [AWS S3](https://github.com/rundeck-plugins/rundeck-s3-log-plugin): This plugin works with any storage compatible with AWS S3 API, eg: S3, Minio, etc.
* [Azure Blob Storage](https://github.com/rundeck-plugins/rundeck-azure-plugin)