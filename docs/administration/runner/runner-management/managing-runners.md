---
redirectFrom: /administration/runner/management
---

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

- Create a new Runner. For detailed steps, see [Creating a Runner](/administration/runner/runner-installation/creating-runners.md).
- Edit an existing Runner. For detailed steps, see [Configuring a Runner](/administration/runner/runner-configuration/runner-config.md).
- Assign Runners to Projects.  For detailed steps, see [Assigning Runners to Projects](#assign-runners-to-projects).

[//]: # (- Delete Runners.  For detailed steps, see [Deleting a Runner]&#40;/administration/runner/runner-installation/delete-a-runner&#41;.)

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

- Create a new Runner. For detailed steps, see [Creating a Runner](/administration/runner/runner-installation/creating-runners.md).
- Edit an existing Runner. For detailed steps, see [Configuring a Runner](/administration/runner/runner-configuration/runner-config.md).

[//]: # (- Delete Runners.  For detailed steps, see [Deleting a Runner]&#40;/administration/runner/runner-installation/delete-a-runner&#41;.)

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

:::tip Upgrading from Earlier Self Hosted product versions
If using the self-hosted product and upgrading a version earlier than 5.3.0, the AppAdmin ACL policy stored on the local filesystem may need to be updated.

The following permissions must be **added** to it in order to manage Runners at the Project level:
```
runner:
  - allow: '*' # allow read/write/delete for all Runners
```
Therefore, the AppAdmin ACL Policy should look like this:
```
description: Admin, all access.
context:
  project: '.*' # all projects
for:
  resource:
    - allow: '*' # allow read/create all kinds
  adhoc:
    - allow: '*' # allow read/running/killing adhoc jobs
  job: 
    - allow: '*' # allow read/write/delete/run/kill of all jobs
  node:
    - allow: '*' # allow read/run for all nodes
  runner:
    - allow: '*' # allow read/write/delete for all Runners
by:
  group: admin
---
description: Admin, all access.
context:
  application: 'rundeck'
for:
  resource:
    - allow: '*' # allow create of projects
  project:
    - allow: '*' # allow view/admin of all projects
  project_acl:
    - allow: '*' # allow admin of all project-level ACL policies
  storage:
    - allow: '*' # allow read/create/update/delete for all /keys/* storage content
by:
  group: admin
```
:::

### Changing Runners from Single to Multiple Projects

When a Runner is assigned to a single Project, then users within a Project and with the appropriate permissions can make any changes to the Runner from the Project level interface. This includes the ability to:
- Edit the Runner's Name
- Edit the Runner's Tags
- Delete the Runner
- Regenerate Credentials

![_Changes of any kind can be made to Runners assigned to a **single** Project_](/assets/img/single-project-runner-abilities.png)

However, when a Runner is assigned to multiple Projects, then users within Projects can only remove the Runner from their Project. They cannot make other changes to the Runner.

![_Users can only remove a Runner from a Project when it is assigned to **multiple** Projects_](/assets/img/multi-project-runner-abilities.png)

This is because when a Runner spans multiple Projects it is considered a _shared resource_.


### Viewing Runner details

A new section Tags is available  at the bottom of the Runner information page. Like in the summary page, a list of associated tags are displayed.

![View details](/assets/img/runner-config-viewdetails.png)<br>

### Runner Tags

Runner Tags are used to select on or more Runners for specific operations - such as for Job execution when using [**Manual Runner Dispatch Configuration**](/administration/runner/runner-management/project-dispatch-configuration.html#manual-runner-selection) or when using [Runners for Node Source](/administration/runner/using-runners/runners-for-node-discovery.html) plugins.

Tag selection within the **Runner Selector** uses _and_ logic to define the inclusive set of Runners. For example, if a Job is configured to run on Runners with the tags `LINUX` and `DEV`, then only Runners that have _both_ tags will be listed as usable for the Job.

![Edit Runners](/assets/img/runner-config-edit.png)<br>

### Listing Runners

The Runner summary page has a new Tags column added to the list. The column shouldn’t display if the feature is disabled. Runner tags are listed if available.

![List Runners](/assets/img/runner-config-list.png)<br>

### Runners Status

| **Icon** | **Status** | **Description**                                                                                                                                                                                                    |
|----------|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|   ![New](/assets/img/runner_new.png)       | New        | Runner has been downloaded but it has not yet sent a first status signal to Runbook Automation.                                                                                                            |
|   ![Healthy](/assets/img/runner_healthy.png)       | Healthy    | Runner has connected to Runbook Automation and has reported a _Last Check-in_ at a reasonable time. Heartbeats are sent every 5 seconds from the Runner.                                                |
|    ![Unhealthy](/assets/img/runner_unhealthy.png)      | Unhealthy  | Runner has connected to Runbook Automation but experiencing a high workload. This status is set to safeguard the execution times and tells Runbook Automation to utilize another Runner - if available. |
|    ![Unknown](/assets/img/runner_unknown.png)      | Unknown    | Runner may have lost connectivity to Runbook Automation. The Unknown status is assumed if the Runner does not report a heartbeat to Runbook Automation within the last 30 seconds.  |
|    ![Down](/assets/img/runner_down.png)      | Down       | Runner is unavailable to execute any workload. A Runner will assume this status in the event of a graceful shutdown or if the Last Check-in is greater than 120 seconds.                                    |

- An **Unhealthy** state is related to the number of concurrent operations (and tasks) being executed on the runner ( you can check the number of concurrent operations via the API endpoint [Get runner information](/api/index.md#get-runner-information) under the variable **runningOperations**
- The maximum number of concurrent executions can be tuned, as stated. By default, the limit is set to 50. It can be tuned using the parameter ` -Drunner.operations.maxRunning=<EXEC_LIMIT>` when deploying a Runner. However, please note the following:
    - The execution limit is linked to the available resources set for the runner process. Although a maximum number of executions can be established via this parameter, the Runner will throttle the number of executions based on the available resources (CPU, Memory, Stack Memory and Heap Space in Java) as well as the number of tasks associated with that execution.
    - A Runner will report an **Unhealthy** state to Runbook Automation whenever this limit has been hit. Executions will be queued in memory rather than immediately scheduled to a CPU core.
    - It is recommended to review the allocated resources to the machine and the Runner process when a Runner is reporting as **Unhealthy**.  Runners can be scaled vertically by allocating additional compute resources to the Java process, as well as horizontally by deploying additional Runners with the same Tags and Project assignments.

### Ping Runners

Users can check that a Runner is available via an ad hoc "ping" operation: 

1. When managing a Runner - either at the Project or System level - click on the **Ping** button in the upper right:
    ![Ping Runner](/assets/img/ping-runner.png)<br>
2. After a few seconds, the response will appear in the upper right.
3. If the Runner is available, the response show that the message was received:
    ![Ping Runner Response](/assets/img/runner-ping-response.png)<br>
4. If the Runner is unavailable, the response will show that the ping response timed out:
    ![Ping Runner Unavailable](/assets/img/runner-ping-unavailable.png)<br>