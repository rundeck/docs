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
|   ![New](/assets/img/runner_new.png)       | New        | Status of newly created runners that have not been connected to the Automation Server at least one time                                                                                                            |
|   ![Healthy](/assets/img/runner_healthy.png)       | Healthy    | Status of runners connected to the Automation Server that has reported a _Last Check-in_ at a reasonable time. Heartbeats are sent every 5 seconds from the runner.                                                |
|    ![Unhealthy](/assets/img/runner_unhealthy.png)      | Unhealthy  | Status of runners connected to the Automation Server but experiencing high workload. This status is set to safeguard the execution times and to not have the Automation server send additional load to the runner. |
|    ![Unknown](/assets/img/runner_unknown.png)      | Unknown    | Status of runners that may have lost connectivity to the Automation Server. The Unknown status is assumed if the runner does not report to the Automation server any heartbeat on the last 30 seconds              |
|    ![Down](/assets/img/runner_down.png)      | Down       | Status of runners unavailable to execute any workload. A runner will assume this status in the event of a graceful shutdown or if the Last Check-in is higher than 120 seconds.                                    |

- An **Unhealthy** state is related to the number of concurrent operations (and tasks) being executed on the runner ( you can check the number of concurrent operations via the API endpoint [Get runner information](/api/rundeck-api.html#get-runner-information) under the variable **runningOperations**
- The maximum number of concurrent executions can be tuned, as stated [here](/docs/administration/runner/runner-advancedsetup.html#:~:text=with%20a%20tunable%20maximum%20number%20of%20simultaneous%20operations%20(default%3A%2050)) - by default the limit is set to 50. It can be tuned using the parameter ` -Drunner.operations.maxRunning=<EXEC_LIMIT>` supplied on the runner command line evocation. However please note the following:
    - The execution limit is linked to the available resources set for the runner process. Although we can establish a maximum number of executions via this parameter, the runner will throttle the number of executions based on the available resources (CPU, Memory, Stack Memory and Heap Space in Java) as well as the number of tasks associated with that execution.
    - A runner will report an **Unhealthy** state to the cluster whenever this limit has been hit. These executions will be queued in the memory rather than being rather than immediately scheduled to a CPU core. The type of work and the amount of work sent to the Runner affect this and also very small, underpowered Runners will not be able to keep up. This mechanism was put in place to guarantee that overloaded runners are not considered to take on additional workload and therefore impact the execution time of your jobs. 
    - Whenever you face an unhealthy runner, we recommend reviewing the allocated resources to the machine and the runner process. My recommendation always goes towards scaling vertically (adding additional resources to a system so that it meets demand) as well as horizontally (increased resilience by adding additional runners within the runner set).

- When considering provisioning resources for the runners, please follow the same allocated resources comparable to a Process Automation On-Prem server and think about resource redundancy - Vertically but more importantly horizontally.

- If setting up Enterprise Runners on virtualized environments, these would be our recommendations:


    |               | **Minimum** | **Medium** | **Large** |
    |---------------|-------------|------------|-----------|
    | **vCPU**      | 4 cores     | 8 cores    | 12 cores  |
    | **Memory**    | 8 GiB       | 16 GiB     | 32 GiB    |
    | **Java Heap** | 6 GiB       | 12 GiB     | 24 GiB    |
    | **Storage**   | 40 GiB      | 40 GiB     | 40 GiB    |