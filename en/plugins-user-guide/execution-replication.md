% Execution Replication File Storage Plugin (Pro)

The Execution Replication File Storage Plugin included with Rundeck Pro creates a Rundeck formatted Project Archive for each execution, and uploads it to a remote
Rundeck server, to replicate the execution data

Enable the plugin in rundeck-config.properties:

    rundeck.execution.logs.fileStoragePlugin=ExecutionReplicationPlugin

Configuration will be defined in framework.properties/project.properties:

    framework.plugin.ExecutionFileStorage.ExecutionReplicationPlugin.rundeckUrl=http://host
    framework.plugin.ExecutionFileStorage.ExecutionReplicationPlugin.apiToken=...
    framework.plugin.ExecutionFileStorage.ExecutionReplicationPlugin.outputDir=/tmp
    framework.plugin.ExecutionFileStorage.ExecutionReplicationPlugin.project=${execution.project}
    framework.plugin.ExecutionFileStorage.ExecutionReplicationPlugin.timeout=30
