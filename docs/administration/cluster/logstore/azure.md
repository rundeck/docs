# Azure Log Storage Plugin

The Azure Storage plugin uses Azure Storage to store execution log files, for backup or for a cluster environment behavior.

The source code lives at [https://github.com/rundeck-plugins/rundeck-azure-plugin](https://github.com/rundeck-plugins/rundeck-azure-plugin).

### Enable the plugin

Enable the ExecutionFileStorage provider named azure-storage in your `rundeck-config.properties` file:

`rundeck.execution.logs.fileStoragePlugin=azure-storage`

### Configuration

To configure the Azure Storage Account credentials you can set these property values:

- **storageAccount**: Azure Storage Account
- **accessKey**: Azure Storage Access Key
- **path**: The path in the bucket to store a log file.

  You can use these expansion variables:

  - `${job.execid}` = execution ID
  - `${job.project}` = project name
  - `${job.id}` = job UUID (or blank).
  - `${job.group}` = job group (or blank).
  - `${job.name}` = job name (or blank)

You can define the configuration values in `framework.properties` by prefixing the property name with the stem: `framework.plugin.ExecutionFileStorage.azure-storage`. Or in a project's `project.properties` file with the stem `project.plugin.ExecutionFileStorage.azure-storage`.

For example:

```properties
#storage.storageAccount and storage.accessKey
framework.plugin.ExecutionFileStorage.azure-storage.storageAccount=<ACCOUNT-NAME>
framework.plugin.ExecutionFileStorage.azure-storage.accessKey=<ACCESS-KEY>

#path to store the logs
framework.plugin.ExecutionFileStorage.azure-storage.path=logs/${job.project}/${job.execid}.log

```
