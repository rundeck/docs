# Creating Runners

The Enterprise Runner can be used to dispatch automation to remote environments and to give teams flexibility with their automation with Projects.

To learn more about the Runner architecture and use-cases, see the [Runner Overview](/administration/runner/index.md).

## Prerequisites

Before creating a Runner, ensure that you have read the [prerequisites](/administration/runner/index.md#enabling-the-latest-runner-features) section of the Runner Overview.

* Runners can be installed on Windows, Linux or in containers.
  * The operating systems that we officially support for the Runner are listed [here](/administration/install/system-requirements.md).
  * Note that the Runner can be installed on a *different* operating system than the self-hosted cluster.
* Java 11 or Java 17 JRE installed on the Runner's host.
* The Runner binary size is 164MB.
* The Runner requires a network path to reach the Runbook Automation cluster or SaaS instance over port 443.  This is an outbound connection.

### Resource Allocation

If setting up Enterprise Runners on virtualized environments, here are baseline recommendations.  These are _**general**_ guidelines and the actual resource requirements may vary based on the workload and the number of concurrent executions.  It is recommended to monitor the Runner's performance - such as CPU, Memory, and Network Latency - and adjust the resources accordingly.

|               | **Minimum** | **Medium** | **Large** |
  |---------------|-------------|------------|-----------|
| **vCPU**      | 2 core      | 4 cores    | 8 cores   |
| **Memory**    | 4 GiB       | 8 GiB      | 16 GiB    |
| **Java Heap** | 2 GiB       | 6 GiB      | 12 GiB    |
| **Storage**   | 8 GiB       | 20 GiB     | 20 GiB    |

### Permissions

<details>
    <summary> ACL Permissions for Creating Runners at <strong>System</strong> level</summary>

To create a Runner at the **System level**, users will need the following ACL permissions:

```acl
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
---
by:
group: my-user-group-name
description: Allow creation of apitokens (general)
for:
apitoken:
- allow:
    - create
      context:
      application: rundeck
---
by:
group: my-user-group-name
description: Restrict apitoken creation to only generate_service_token to be used for Runners
for:
resource:
- allow:
    - generate_service_token
      equals:
      kind: apitoken
      context:
      application: rundeck
```

* Change **`my-user-group-name`** in the above ACL policy to the name of the user group that needs to have these permissions.

</details> 
<br>
<details>
    <summary> ACL Permissions for Creating Runners at <strong>Project</strong> level</summary>

To create a Runner within a Project, users will need the following ACL permissions:

```acl
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
---
by:
  group: runneradmin
description: Allow creation of apitokens (general)
for:
  apitoken:
  - allow:
    - create
context:
  application: rundeck
---
by:
  group: runneradmin
description: Restrict apitoken creation to only generate_service_token to be used for Runners
for:
  resource:
  - allow:
    - generate_service_token
    equals:
      kind: apitoken
context:
  application: rundeck
```

* Change **`my-user-group-name`** in the above ACL policy to the name of the user group that needs to have these permissions.

</details>


:::warning Error Without API Permissions
If the user does not have the necessary API permissions, the following error will be displayed when attempting to create a Runner:

**`Error: Failed to create runner due to server side error: Unauthorized: generate API token`**

To resolve this error, ensure that the user has the necessary API permissions.
:::

## Creating Runners at System Level

Creating Runners at the System level provides the flexibility of associating the Runner with multiple Projects.

To create a Runner through at the System level:

1. Navigate to the **System** menu (gear icon in the upper-right).
2. Click **Runner Management**.
3. Click **Create Runner**.
4. Give the Runner a **Name** and a **Description.**
    :::warning Unique Runner Names
    Ensure that the Runner name is unique. If a Runner with the same name already exists, the system will not allow the creation of a new Runner with the same name.
    :::
![Create a Runner](/assets/img/runner-wizard-step-1-system.png)<br>

5. Define **Tags** for the Runner. Tags are used to select the Runner for use within Jobs in the [Manual mode](/administration/runner/runner-management/project-dispatch-configuration.md#manual-runner-selection) or if the Runner will be used for node discovery. Tags can always be added later.
6. **Platform**: Select the platform that the Runner will be hosted on.  Options include:
   * **`Linux`**
   * **`Windows`**
   * **`Docker`**
   * **`Kubernetes`**
   :::warning Platform Selection
   Once a platform is selected, it cannot be changed for a given Runner. If the platform needs to be changed in the future, a new Runner will need to be created.
   :::
7. **Treat Replicas as Ephemeral**: When enabled,  this Runner will still appear as healthy when some replicas are no longer sending a signal. Treating replicas as ephemeral is recommended when replicas will be added and removed dynamically through external orchestration such as Kubernetes or Auto-Scaling Groups. If enabled, Replicas cannot be manually added or removed through the Web interface or API.
   :::warning Ephemeral Replicas Selection 
   Once a Runner is configured for _Ephemeral_ vs _Persistent_, this cannot be changed for a given Runner. If this setting needs to be changed in the future, a new Runner will need to be created.
   ::: 
8. Click **Next**.
9. In the **Project Association** step, select the Projects that can make use of this Runner. When a Runner is associated with a given Project, it will be visible in the **Runner Management** tab of that Project and users with Runner management permissions within that Project can specify how that Runner will be used for that particular Project.
    ![Create a Runner](/assets/img/runner-wizard-step-2-system.png)
10. Click **Create Runner** to proceed to the installation step.
11. Depending on the **Platform** chosen earlier, the instructions for installing the Runner will vary on the **Install Runner** screen:
:::tabs
@tab Linux
 There are two options for the **Download Artifact**: copy and paste the `curl` command or download the `.jar` file locally. The `curl` can be executed on the host that the Runner will be installed on.

  * :::warning Note that the `curl` command requires an **API Token**. Click [here](/manual/10-user.md#user-api-tokens) for steps to create an API Token.
     :::
     ![Install Linux Runner](/assets/img/install-linux-runner.png)<br>
  
@tab Windows
  There are two options for the **Download Artifact**: copy and paste the `Invoke-WebRequest` command or download the `.jar` file locally. The `Invoke-WebRequest` can be executed on the host that the Runner will be installed on.

  * :::warning Note that the `Invoke-WebRequest` command requires an **API Token**. Click [here](/manual/10-user.md#user-api-tokens) for steps to create an API Token.
    
   ![Install Windows Runner](/assets/img/install-windows-runner.png)<br>
    
@tab Docker
  The code snippet for installing and starting the Runner as a Docker container with **`docker-compose`** is provided:
    ![Install Docker Runner](/assets/img/install-docker-runner.png)<br>

@tab Kubernetes
  The code snippet for installing the Runner as a Kubernetes deployment is provided:
     ![Install Kubernetes Runner](/assets/img/install-kubernetes-runner.png)<br>
    
   * :::tip Kubernetes Replicas & Runner Replicas
        When deploying multiple replicas of the Runner in Kubernetes, the number of replicas specified in the Kubernetes deployment will be used to determine the number of replicas for the Runner.
     
:::

  Copy and paste the code snippet into the terminal of the host where the Runner will be installed.
   
12. Click **Close and Complete**.

On the subsequent screen, the new Runner will be listed along with any other Runners that have been created:

![System Runners List](/assets/img/system-level-runners-list.png)<br>

## Creating Runners within a Project

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
   :::warning Unique Runner Names
   Ensure that the Runner name is unique. If a Runner with the same name already exists, the system will not allow the creation of a new Runner with the same name.
   :::
   ![Create a Runner](/assets/img/runner-wizard-step-1-project.png)<br>
5. Define **Tags** for the Runner. Tags are used to select the Runner for use within Jobs in the [Manual mode](/administration/runner/runner-management/project-dispatch-configuration.md#manual-runner-selection) or if the Runner will be used for node discovery. Tags can always be added later.
6. **Platform**: Select the platform that the Runner will be hosted on.  Options include:
    * **`Linux`**
    * **`Windows`**
    * **`Docker`**
    * **`Kubernetes`**
      :::warning Platform Selection Implications
      Once a platform is selected, it cannot be changed for a given Runner. If the platform needs to be changed in the future, a new Runner will need to be created.
      :::
7. **Treat Replicas as Ephemeral**: When enabled,  this Runner will still appear as healthy when some replicas are no longer sending a signal. Treating replicas as ephemeral is recommended when replicas will be added and removed dynamically through external orchestration such as Kubernetes or Auto-Scaling Groups. If enabled, Replicas cannot be manually added or removed through the Web interface or API.
   :::warning Ephemeral Replicas Selection
   Once a Runner is configured for _Ephemeral_ vs _Persistent_, this cannot be changed for a given Runner. If this setting needs to be changed in the future, a new Runner will need to be created.
   :::
8. Click **Next**.
9. On the **Node Dispatch** step, select whether this Runner should be added as a Node to the Node Inventory. Doing so allows you to target the Runner's host in Jobs and commands, scripts and plugins will execute locally on that node rather than use a remote-execution protocol - such as SSH or WinRM.
10. Also on the **Node Dispatch** step, select whether this Runner should be used to target remote nodes and use the **Node Filter** to define the assignment of the subset of the node-inventory for this Runner:
    ![Node Dispatch](/assets/img/runner-wizard-step-2-project.png)
11. Click **Create Runner** to proceed to the installation step.
12. Depending on the **Platform** chosen earlier, the instructions for installing the Runner will vary on the **Install Runner** screen:
:::tabs
@tab Linux
There are two options for the **Download Artifact**: copy and paste the `curl` command or download the `.jar` file locally. The `curl` can be executed on the host that the Runner will be installed on.

* :::warning Note that the `curl` command requires an **API Token**. Click [here](/manual/10-user.md#user-api-tokens) for steps to create an API Token.
    :::
      
  ![Install Linux Runner](/assets/img/install-linux-runner.png)<br>

@tab Windows
There are two options for the **Download Artifact**: copy and paste the `Invoke-WebRequest` command or download the `.jar` file locally. The `Invoke-WebRequest` can be executed on the host that the Runner will be installed on.

* :::warning Note that the `Invoke-WebRequest` command requires an **API Token**. Click [here](/manual/10-user.md#user-api-tokens) for steps to create an API Token.

![Install Windows Runner](/assets/img/install-windows-runner.png)<br>

@tab Docker
The code snippet for installing and starting the Runner as a Docker container with **`docker-compose`** is provided:
![Install Docker Runner](/assets/img/install-docker-runner.png)<br>

@tab Kubernetes
The code snippet for installing the Runner as a Kubernetes deployment is provided:
![Install Kubernetes Runner](/assets/img/install-kubernetes-runner.png)<br>

* :::tip Kubernetes Replicas & Runner Replicas
  When deploying multiple replicas of the Runner in Kubernetes, the number of replicas specified in the Kubernetes deployment will be used to determine the number of replicas for the Runner.

:::

13. Click **Close and Complete** to finish the Runner creation process. 

On the subsequent screen, the new Runner will be listed along with any other Runners that have been created:

![Project Runners List](/assets/img/runner-list-project.png)<br>