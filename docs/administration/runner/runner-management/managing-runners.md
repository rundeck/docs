# Managing Runners

## Overview

Runners can be managed at the System level as well as at the Project level of Runbook Automation (cloud and self-hosted).
Both the System and Project level management interfaces allow users to create, edit, and delete Runners.  
However, there are specific actions that can only take place depending on whether operating in the System or Project level.

### Managing Runners at the System level

At the System level, in addition to creating, editing, and deleting Runners, users can also assign Runners to Projects.

To access the System level Runner management interface, navigate to the **System menu** and select **Runner Management**:

![Runner Management System Menu](/assets/img/runner-management-system-menu.png)<br>

The Runner Management interface will display a list of all Runners in the system:

![Runner Management System List](/assets/img/system-level-runner-management.png)<br>

From this interface, users can:

- Create a new Runner. For detailed steps, see [Creating a Runner](/administration/runner/runner-installation/create-a-runner).
- Edit an existing Runner. For detailed steps, see [Configuring a Runner](/administration/runner/runner-configuration/runner-config).
- Assign Runners to Projects.  For detailed steps, see [Assigning Runners to Projects](#assign-runners-to-projects).
- Delete Runners.  For detailed steps, see [Deleting a Runner](/administration/runner/runner-installation/delete-a-runner).

#### Assigning Runners to Projects

To assign a Runner to a project, follow these steps:

1. From the System level Runner management interface, click on the name of the Runner.
2. In the **Project Assignments** section, click on the **Add Projects** button.
    ![Add Projects Button](/assets/img/assign-runner-to-project.png)
3. From the popup, select the Projects that should be able to use this Runner
    ![Select Projects](/assets/img/runner-select-projects.png)
4. Click **Add**

The Runner can now be used within the designated projects for various tasks such as job execution, node discovery, and secrets-management integration.

In order to assign a Runner to a Project, the user must have the following ACL permission:

```
by:
  group: my-user-group-name
description: Allow [update] for runner
for:
  runner:
  - allow:
    - update
context:
  application: rundeck
```

### Managing Runners within a Project

:::tip Early Access Feature
The ability to manage Runners at the Project level is an early access feature.  
To gain access, please [submit this form](https://www.pagerduty.com/early-access/) and someone from our team will reach out promptly.
:::

At the Project level, users can create, edit, and delete Runners for that specific Project.
However, Runners created at the Project level are only available for use within that Project and cannot be used in other Projects.

To access the Project level Runner management interface, navigate to a specific Project and then select **Runner Management** from the left navbar.

The Runner Management interface will display a list of all Runners in the Project:

![Project Runners](/assets/img/project-management-runners-list.png)<br>

From this interface, users can:

- Create a new Runner. For detailed steps, see [Creating a Runner](/administration/runner/runner-installation/create-a-runner).
- Edit an existing Runner. For detailed steps, see [Configuring a Runner](/administration/runner/runner-configuration/runner-config).
- Delete Runners.  For detailed steps, see [Deleting a Runner](/administration/runner/runner-installation/delete-a-runner).

#### Removing a Runner from a Project

To remove a Runner from a Project, follow these steps:

1. From the Project level Runner management interface, click on the **Actions** dropdown and select **Remove from project**.
2. From the confirmation popup, select **Ok**.

In order to remove a Runner from a Project, the user must have the following ACL permission:

```
by:
  group: my-user-group-name
description: Allow [delete] for runner
for:
  runner:
  - allow:
    - delete
context:
  project: my-project-name
```

### Changing Runners from Single to Multiple Projects

When a Runner is assigned to a single Project, then users within a Project and with the appropriate permissions can make any changes to the Runner from the Project level interface. This includes the ability to:
- Edit the Runner's Name
- Edit the Runner's Tags
- Delete the Runner
- Regenerate Credentials

![_Changes of any kind can be made to Runners assigned to a single Project_](/assets/img/single-project-runner-abilities.png)

However, when a Runner is assigned to multiple Projects, then users within Projects can only remove the Runner from their Project. They cannot make other changes to the Runner.

![_Users can only remove a Runner from a Project when it is assigned to multiple Projects_](/assets/img/multi-project-runner-abilities.png)

This is because when a Runner spans multiple Projects it is considered a _shared resource_.


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

- An **Unhealthy** state is related to the number of concurrent operations (and tasks) being executed on the runner ( you can check the number of concurrent operations via the API endpoint [Get runner information](/api/#get-runner-information) under the variable **runningOperations**
- The maximum number of concurrent executions can be tuned, as stated [here](/docs/administration/runner/runner-advancedsetup.html#:~:text=with%20a%20tunable%20maximum%20number%20of%20simultaneous%20operations%20(default%3A%2050)) - by default the limit is set to 50. It can be tuned using the parameter ` -Drunner.operations.maxRunning=<EXEC_LIMIT>` when deploying a Runner. However, please note the following:
    - The execution limit is linked to the available resources set for the runner process. Although a maximum number of executions can be established via this parameter, the Runner will throttle the number of executions based on the available resources (CPU, Memory, Stack Memory and Heap Space in Java) as well as the number of tasks associated with that execution.
    - A Runner will report an **Unhealthy** state to Runbook Automation whenever this limit has been hit. Executions will be queued in memory rather than immediately scheduled to a CPU core.
    - It is recommended to review the allocated resources to the machine and the Runner process when a Runner is reporting as **Unhealthy**.  Runners can be scaled vertically by allocating additional compute resources to the Java process, as well as horizontally by deploying additional Runners with the same Tags and Project assignments.

### Resource Allocation

- If setting up Enterprise Runners on virtualized environments, here are baseline recommendations.  These are _general_ guidelines and the actual resource requirements may vary based on the workload and the number of concurrent executions.  It is recommended to monitor the Runner's performance - such as CPU, Memory, and Network Latency - and adjust the resources accordingly.

  |               | **Minimum** | **Medium** | **Large** |
    |---------------|-------------|------------|-----------|
  | **vCPU**      | 4 cores     | 8 cores    | 12 cores  |
  | **Memory**    | 8 GiB       | 16 GiB     | 32 GiB    |
  | **Java Heap** | 6 GiB       | 12 GiB     | 24 GiB    |
  | **Storage**   | 40 GiB      | 40 GiB     | 40 GiB    |