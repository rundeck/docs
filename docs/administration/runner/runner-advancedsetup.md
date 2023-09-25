---
title: "Advanced Setup"
---


# Enterprise Runner - Advanced Setup

## Troubleshooting

Runner Logs are located in the `./runner/logs` folder under the folder where the jar was executed from.  The `runner.log` file contains operational and important messages about the runner.  `operations.log` tracks an operation starts and if it succeeds or fails.  [Read more about logging and setting up custom logging](runner-logging.md).

## High availability Runner execution

The Runners poll for available work, and retrieve all available work items for the Rundeck instance. The tasks are then queued locally (the queue is persistent on disk) to the Runner and executed, with a tunable maximum number of simultaneous operations (default: 50). If a Runner is restarted in the middle of an operation, it will resume executing from the local work queue.

If multiple Runners match the tags set for a Job in the runner filter, then the “best” Runner is selected. Currently the “best” evaluation simply takes into account whether a Runner is Healthy based on the last checkin timestamp, and sorts them by the number of in-flight operations. The runner with least number of running operations, or if there is a tie, the most recent checkin is selected to execute the job. This behavior may be changed in the future.

## Dynamic Runner selection through job options

Runner matching and filtering supports Job Options - `${option.NAME}`, which allows changing the Runners for the job based on dynamic input through API calls or the rundeck-cli. The Job Options behavior is the same for Runner selection as with using it with commands or other workflow steps.  For example: 
- A job is configured with a Runner filter value set to `${option.runnerTagParameter}`
- At runtime (through cli or API calls) we are providing a job option named `runnerTagParameter=myRunnerXYZ`, which will parameterize the Job Option with `myRunnerZYZ` for that job execution.
- The job will be effectively executed with the Runner that is tagged with `myRunnerZYZ`

Here's an example of a job option and runner filter configurations:

![Job Option](@assets/img/dynamic_runner_selection_jobOption.png)

![Runner Filter](@assets/img/Dynamic_runner_selection_runnerFilter.png)

## Restricting plugin execution

The new architecture introduces a new configuration option that controls where plugins are allowed to run. This is desirable in some environments that need to limit what plugins execute in the central Rundeck instance while allowing plugins to the Remote Runners. The following needs to be set in the System Configuration as a custom setting :
`rundeck.plugins.remoteRunnerAllowedPluginsFile=/path/allowed-remote-plugin-list.yaml`

The contents of the allowed-remote-plugin-list.yaml follow the same configuration schema as the plugin blocklist. Plugins are referenced by their provider name which can be looked up in the Plugins list under System. For example the following configuration will restrict  WinRM and Docker plugins to only execute on the Remote Runners:
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
If a job is configured to run any of the listed plugins on a Local Runner, a runtime error will be raised as illustrated below:
![Runtime error with a plugin restricted to run Remote only](@assets/img/runner-error-remote-only.png)

## Proxying Runner connections

Runners can be configured to connect through a HTTP/HTTPS proxy. Proxies are commonly used to centralize and secure outbound traffic from the datacenter to internet services. The proxy configuration is optional and is added as java command line arguments when the runner process is started.

### Proxy configuration without proxy authentication

The following example will allow the runner to connect through the secure company proxy with address wp.acme.corp.

```
java -Dmicronaut.http.client.proxy-type=http -Dmicronaut.http.client.proxy-address=wp.acme.corp:443 -jar pdrunner.jar
```

1. `-Dmicronaut.http.client.proxy-type` is set to `http`
1. `-Dmicronaut.http.client.proxy-address` is set to the secure proxy company address.

### Proxy configuration with proxy authentication

The following example adds basic auth proxy configuration to the runner. The proxy-type and proxy-address settings are the same as the unauthenticated access example.

```
java -Dmicronaut.http.client.proxy-type=http -Dmicronaut.http.client.proxy-address=wp.acme.corp:443 -Dmicronaut.http.client.proxy-username=proxyUsernameString -Dmicronaut.http.client.proxy-password=proxyPassString -jar pdrunner.jar
```

1. `-Dmicronaut.http.client.proxy-username` is set to the user that is allowed to connect through the secure proxy.
1. `-Dmicronaut.http.client.proxy-password` is set to the secure proxy user password.

## Runner APIs

[Runner APIs](/api/rundeck-api.md) are available to create,edit,download, and delete Runners. 
