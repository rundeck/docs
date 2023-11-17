---
title: "Configuration"
---

# Enterprise Runner - Configuration

## Creating new Runners

Please review [the Runner intro, architecture and communication framework](/administration/runner/runner-intro.md) before creating and deploying runners in your environment. Please verify [the Runner feature is enabled](/administration/runner/runner-setup.md)  before you can follow the steps below. 

Once the feature is enabled, a new Runner can be created through the Runner Management UI under the System menu.

![Create a runner](/assets/img/runner-config-start.png)

### Add Tags

The new architecture Runners are referenced by Tags in the job definitions, and you can create more than one Runner using the same tags. This abstract addressing allows more flexibility in managing multiple Runners in the environment, and also provides for higher availability: if a single Runner goes offline or changes, the job definitions will not need to be updated as other Runners with the same tags will be able to execute jobs.

A new Tag input field is added to the first step. The tag can be typed in or chosen from a drop-down list if there are any tags containing the word typed in. Tag names must be unique, the same tag cannot be added twice. Special characters e.g. , ; space return will trigger entering the tag name.

![Enter runner tags](/assets/img/runner-config-add-tags.png)

### Project Assignment

At the next step we will assign the new Runner to a set of projects. Runners will listen for tasks only for the projects they are assigned to. The search feature now can let users search projects by name and label. Clicking next will create the new Runner and if the operation succeeds, the Confirmation dialog will be presented.

![Assign projects](/assets/img/runner-config-assign-projects.png)

### Download a Runner

The confirmation screen contains a button to download the new Runner. Once the jar file is downloaded, clicking on the “Close and complete” button will  close the wizard dialog.

![Download binary](/assets/img/runner-config-download.png)

### Viewing Runner details

A new section Tags is available  at the bottom of the Runner information page. Like in the summary page, a list of associated tags are displayed.

![View details](/assets/img/runner-config-viewdetails.png)

### Editing Runners

A new Tags input field was added to allow a adding or removing tags after a Runner has been created.

![Edit Runners](/assets/img/runner-config-edit.png)

### Listing Runners

The Runner summary page has a new Tags column added to the list. The column shouldn’t display if the feature is disabled. Runner tags are listed if available.

![List Runners](/assets/img/runner-config-list.png)

### Runners Status

| **Icon** | **Status** | **Description**                                                                                                                                                                                                    |
|----------|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|   ![New](/assets/img/runner_new.png)       | New        | Runner has been downloaded but it has not yet sent a first status signal to Runbook Automation.                                                                                                            |
|   ![Healthy](/assets/img/runner_healthy.png)       | Healthy    | Runner has connected to Runbook Automation and has reported a _Last Check-in_ at a reasonable time. Heartbeats are sent every 5 seconds from the Runner.                                                |
|    ![Unhealthy](/assets/img/runner_unhealthy.png)      | Unhealthy  | Runner has connected to Runbook Automation but experiencing a high workload. This status is set to safeguard the execution times and tells Runbook Automation to utilize another Runner - if available. |
|    ![Unknown](/assets/img/runner_unknown.png)      | Unknown    | Runner may have lost connectivity to Runbook Automation. The Unknown status is assumed if the Runner does not report a heartbeat to Runbook Automation within the last 30 seconds.  |
|    ![Down](/assets/img/runner_down.png)      | Down       | Runner is unavailable to execute any workload. A Runner will assume this status in the event of a graceful shutdown or if the Last Check-in is greater than 120 seconds.                                    |

- An **Unhealthy** state is related to the number of concurrent operations (and tasks) being executed on the runner ( you can check the number of concurrent operations via the API endpoint [Get runner information](/api/rundeck-api.html#get-runner-information) under the variable **runningOperations**
- The maximum number of concurrent executions can be tuned, as stated [here](/docs/administration/runner/runner-advancedsetup.html#:~:text=with%20a%20tunable%20maximum%20number%20of%20simultaneous%20operations%20(default%3A%2050)) - by default the limit is set to 50. It can be tuned using the parameter ` -Drunner.operations.maxRunning=<EXEC_LIMIT>` when deploying a Runner. However, please note the following:
    - The execution limit is linked to the available resources set for the runner process. Although a maximum number of executions can be established via this parameter, the Runner will throttle the number of executions based on the available resources (CPU, Memory, Stack Memory and Heap Space in Java) as well as the number of tasks associated with that execution.
    - A Runner will report an **Unhealthy** state to Runbook Automation whenever this limit has been hit. Executions will be queued in memory rather than immediately scheduled to a CPU core. 
    - It is recommended to review the allocated resources to the machine and the Runner process when a Runner is reporting as **Unhealthy**.  Runners can be scaled vertically by allocating additional compute resources to the Java process, as well as horizontally by deploying additional Runners with the same Tags and Project assignments.
    
### Resource Allocation

- If setting up Enterprise Runners on virtualized environments, here are baseline recommendations:

    |               | **Minimum** | **Medium** | **Large** |
    |---------------|-------------|------------|-----------|
    | **vCPU**      | 4 cores     | 8 cores    | 12 cores  |
    | **Memory**    | 8 GiB       | 16 GiB     | 32 GiB    |
    | **Java Heap** | 6 GiB       | 12 GiB     | 24 GiB    |
    | **Storage**   | 40 GiB      | 40 GiB     | 40 GiB    |