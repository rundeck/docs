# Restricting Plugin Execution on Runners

The latest Runners have a new configuration option that controls where plugins are allowed to run. This is desirable in some environments that need to limit what plugins execute in the central Rundeck instance while allowing plugins to the Remote Runners. The following needs to be set in the System Configuration as a custom setting :
`rundeck.plugins.remoteRunnerAllowedPluginsFile=/path/allowed-remote-plugin-list.yaml`

There are two lists within the configuration file:

* `allowedPlugins` - This section lists the plugins that are restricted to always run on the remote Runners.
* `localExecutionPlugins` - This section lists the plugins that are restricted to always run on the "central" Process Automation server.

Both lists are optional and therefore the file can include one section and not the other. Plugins are referenced by their provider name which can be looked up in the Plugins list under System.
For example the following configuration will restrict WinRM and Docker plugins to only execute on the Remote Runners:

### Example: Restrict plugins to remote Runners
```
allowedPlugins:
  NodeExecutor:
    - WinRMPython
    - docker-container-node-executor
   
  FileCopier:
    - WinRMcpPython
    - docker-container-file-copier

  WorkflowNodeStep:
    - docker-container-execute-command
    - docker-container-inspect-workflow-step
    - docker-container-pause-step
    - docker-container-unpause-step
    - docker-container-kill-step
    - docker-container-stats-step
    - docker-run-workflow-step

  WorkflowStep:
    - WinRMCheck
```
If a job is configured to run on the **Local Runner** and that Job uses one of these plugins, a runtime error will be raised as illustrated below:
![Runtime error with a plugin restricted to run Remote only](/assets/img/runner-error-remote-only.png)

### Example: Restrict plugins to central server

The following example restricts the AWS Virtual Machine plugins to always execute on the **Local Runner** (central server) and not on the Remote Runners:

```
localExecutionPlugins:
  WorkflowNodeStep:
    - aws-vm-start-step
    - aws-vm-stop-step
    - aws-vm-restart-step
    - aws-vm-delete-step
  WorkflowStep:
    - aws-vm-start-step
    - aws-vm-stop-step
    - aws-vm-delete-step
    - aws-vm-capture-snapshot-step
```

### Example: Combined configuration for plugin execution

The following example restricts the AWS Virtual Machine plugins to always execute on the **Local Runner** (central server) and restricts the WinRM and Docker plugins to only execute on the Remote Runners:

```
allowedPlugins:
  NodeExecutor:
    - WinRMPython
    - docker-container-node-executor
  FileCopier:
    - WinRMcpPython
    - docker-container-file-copier
  WorkflowNodeStep:
    - docker-container-execute-command
    - docker-container-inspect-workflow-step
    - docker-container-pause-step
    - docker-container-unpause-step
    - docker-container-kill-step
    - docker-container-stats-step
    - docker-run-workflow-step
  WorkflowStep:
    - WinRMCheck
localExecutionPlugins:
  WorkflowNodeStep:
    - aws-vm-start-step
    - aws-vm-stop-step
    - aws-vm-restart-step
    - aws-vm-delete-step
  WorkflowStep:
    - aws-vm-start-step
    - aws-vm-stop-step
    - aws-vm-delete-step
    - aws-vm-capture-snapshot-step
```