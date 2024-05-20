# Creating Runners

The Enterprise Runner can be used to dispatch automation to remote environments and to give teams flexibility with their automation with Projects.

To learn more about the Runner architecture and use-cases, see the [Runner Overview](/administration/runner).

## Prerequisites

Before creating a Runner, ensure that you have read the [prerequisites](/administration/runner/#enabling-the-latest-runner-features) section of the Runner Overview.


## Creating Runners from System Level

Creating Runners at the System level provides the flexibility of associating the Runner with multiple Projects.

To create a Runner through at the System level:

1. Navigate to the **System** menu.
2. Click **Runner Management**.
3. Click **Create Runner**.
4. Give the Runner a **Name** and a **Description.**
5. Define **Tags** for the Runner so that it can be selected for use within Jobs.
    ![Create a Runner](/assets/img/create-runner-step-1.png)
6. Click **Next**.
7. In the **Project Association** step, select the Projects that can make use of this Runner.
    ![Create a Runner](/assets/img/create-runner-step-2.png)
8. On the **Confirmation Screen** click **Download**. This downloads the Runner **`.jar`** file.
9. Click **Close and Complete**.

On the subsequent screen, the new Runner will be listed along with any other Runners that have been created:

![System Runners List](/assets/img/system-level-runners-list.png)<br>

#### Permissions
To create a Runner at the System level, users will need the following ACL permissions:
```
by:
  group: my-user-group-name
description: Allow creating of Runners at the System level
for:
  runner:
  - allow:
    - create
context:
  application: rundeck

---
by:
  group: my-user-group-name
description: Allow "write" access within Runner management at the System level
for:
  resource:
  - allow:
    - admin
    equals:
      kind: runner
context:
  application: rundeck
```

## Creating Runners within a Project

:::tip Early Access Feature
The ability to manage Runners at the Project level is an early access feature.  
To gain access, please [submit this form](https://www.pagerduty.com/early-access/) and someone from our team will reach out promptly.
:::

Runners created within a project are associated with that project only. This means that users within other projects will not be able to use this Runner for their automation tasks.

:::tip Changing Runners from Single to Multi Project Association
A Runner that is created within a project will not be visible to users within other projects.
**However**, a user at the System level can change the association of a Runner from a single project to multiple projects.
When this happens, then the Runner will be visible to users within the other projects.
:::

To create a Runner within a Project:

1. Navigate into the specific project.
2. Click **Runner Management**.
3. Click **Create Runner**.
4. Give the Runner a **Name** and a **Description.**
5. Define **Tags** for the Runner so that it can be selected for use within Jobs.
    ![Create a Runner](/assets/img/create-runner-step-1.png)
6. Click **Next**.
7. On the **Confirmation Screen** click **Download**. This downloads the Runner **`.jar`** file.
8. Click **Close and Complete**.
9. The new Runner will be listed along with any other Runners that have been created within the project.

#### Permissions

To create a Runner within a Project, users will need the following ACL permissions:
```
by:
  group: my-user-group-name
description: Allow "write" for runner feature within specific project
for:
  resource:
  - allow:
    - admin
    equals:
      kind: runner
context:
  project: my-project-name

---
by:
  group: my-user-group-name
description: Allow [create, read] for runners within specific project
for:
  runner:
  - allow:
    - create
    - read
context:
  project: my-project-name
```