# Runner Concepts & Architecture

The **Enterprise Runner** is a critical component of Runbook Automation that allows for dispatching workflows into secure environments - whether using Self-Hosted or Runbook Automation SaaS.

## Runner Tasks & Queuing

There are various "tasks" that can be queued for a Runner to execute. These tasks include:
* **Job Execution**: Execute a Job step through a Runner.
* **Node Discovery**: Discover nodes in a remote environment.
* **Secrets Retrieval**: Retrieve secrets from a secrets provider that is not directly accessible from Runbook Automation.
* **Command Execution**: Execute commands on a remote node.

These tasks are initiated by the "server" and added to a queue, with an assignment to a given Runner.  
For example, when a Job is executed, if the nodes targeted by that Job are assigned to a Runner, then the node-steps of that Job will be added to that Runner's queue.

Runners, specifically **Runner Replicas**, are regularly polling this queue for tasks to execute.

## Runner Replicas

The **Runner** is composed of one or more **Replicas**. Each Replica is a separate instance of the Runner that can be deployed on different servers, virtual machines, or containers. Replicas can be used to scale the Runner's capacity and provide redundancy.

When a task is assigned to a Runner - such as a Job execution, fetching nodes, or retrieving secrets - any Replica of that Runner can pick up the task. This allows for load balancing and fault tolerance.

### Runner Replicas Configuration

:::note Self-hosted Runner replicas
Runner Replicas are available in Runbook Automation Self-Hosted **5.16.0** and later. **Rundeck 6.0+** enables **`rundeck.feature.runnerReplicas.enabled`** by **default**. On **5.x**, the feature was **off** until you set:

```properties
rundeck.feature.runnerReplicas.enabled=true
```
:::

![](/assets/img/replicas-architecture.png)
<p style="text-align: center;"><em>A single Replica is assigned to a given task, but any Replica can pick up the task.</em></p>

Since any Replica can pick up a task for a Runner, it is important to **ensure that Replica hosts are configured to be as identical as possible**. Doing so results in consistent behavior as tasks are picked up by the Replicas.

Runbook Automation does provide some built-in consistency guardrails, such as:
* **Operating System Alignment**: When a Runner is created and "Windows" is selected as the Deployment Type, then all Replicas for that Runner must be deployed on Windows hosts. The same is true for Linux.
* **Version Alignment**: When Replicas for a given Runner differ in agent version, then a warning is shown in the GUI informing the user that it is best practice to keep Replicas in aligned with the same version.

:::tip Example

## Runner & Replica Operations Example

In this example, a Job is executed that targets nodes that span two different environments - such as **`US-WEST`** and **`US-EAST`**.

![](/assets/img/runner-job-example-node-filter.png)<br>

Two Runners are configured in the Project where this Job is executed: one that is assigned to nodes in **`US-WEST`** and another that is assigned to nodes **`US-EAST`**.
This is configured through the [Node Filter](/administration/runner/runner-management/node-dispatch.md#remote-node-dispatch) of each Runner:

![](/assets/img/runner-node-filters-example.png)<br>

When this Job is invoked, the system identifies which Runners are responsible for the nodes that are targeted by the Job. In this case, the system will select the Runner that is assigned to **`US-WEST`** for nodes in **`US-WEST`** and the Runner that is assigned to **`US-EAST`** for nodes in **`US-EAST`**.

Next, the system will also identify an individual Replica per Runner that should be used for this Job execution. The selection of the Replica is based on the current load of the Replicas - as determined by the number of active tasks assigned to the Replicas.

![](/assets/img/us-west-replicas.png)
<p style="text-align: center;"><em>A single Replica is assigned to a Job execution on a per-Runner basis.</em></p>

In other words, the Replica with the fewest current operations from the **`US-WEST`** Runner will be selected and assigned the node-steps for the nodes in **`US-WEST`**. The same selection process will take place for the **`US-EAST`** Runner:

![](/assets/img/replicas-architecture.png)

As the Job executes, the log-output of the node-steps for the Job will show the Runner that was used for the step, and clicking on the Runner name will show the specific Replica ID that was used for the step:

![](/assets/img/replica-job-exec-output.png)<br>

:::

### Advantages of Replicas

There are many advantages to using multiple Replicas for a Runner:

* **Scalability**: By adding more Replicas, the Runner can handle more tasks and scale to meet demand.
* **Fault Tolerance**: If one Replica goes offline, the other Replicas can continue to pick up tasks, ensuring that the Runner remains operational.
* **Consistency & Predictability Guardrails**: Rather than creating multiple Runners and manually ensuring they are configured identically, Replicas allow for a single Runner to be deployed across multiple hosts. This allows for consistent behavior and predictable task execution.

## Ephemeral vs. Persistent Replicas

A Runner can be configured to treat its Replicas as either **Ephemeral** or **Persistent**.

![Ephemeral Replicas Toggle](/assets/img/ephemeral-replicas-toggle.png)
_When creating a Runner, the **Treat Replicas as Ephemeral** toggle can be enabled or disabled._

### Ephemeral Replicas

Enable the **Treat Replicas as Ephemeral** option when Replicas will be dynamically created and destroyed through container or VM orchestration - such as Kubernetes or VM auto-scaling-groups. 

When enabled, the system will automatically remove Replicas that are no longer available after 10 minutes. As such, the Runner's overall health is only changed when _no_ Replicas are available - but not changed when individual Replicas are no longer available.

Replicas cannot be manually added or removed by the GUI or API when this option is enabled, rather they must be managed through the third-party orchestration tool - such as Kubernetes or VM auto-scaling-groups.

## Affinity & Reference Jobs

When a Job is initiated, a Runner's Replica is selected to execute the Job steps that target nodes - when those nodes are assigned to a Runner via the [Runner's Node Filter](/administration/runner/runner-management/node-dispatch.md#remote-node-dispatch).
In order to handle stateful operations - such as temporarily saving files on the Replica's host - the Runner's Replica that is chosen for a given Job execution is the same Replica that is used for all node-steps within that Job. Similarly, if a Job Reference step is used, then the steps within the referenced Job (that target the same nodes as the "Parent" Job) will be executed on the same Replica.

## Local Runner

The **Local Runner** refers to the Runbook Automation cluster or SaaS instance itself. When using the [Manual Runner Selection](/administration/runner/runner-management/project-dispatch-configuration.md#manual-runner-selection), the Local Runner can be selected which will result in the Job being executed on the Runbook Automation cluster itself.

[//]: # (## Example Architectures)

[//]: # ()
[//]: # (The following are example architectures that can be implemented using the Enterprise Runner. These examples are not exhaustive, but rather a starting point for understanding how the Runner can be used in various environments.)

[//]: # ()
[//]: # (### Disparate Cloud Environments)

[//]: # ()
[//]: # (### Hybrid Cloud)

[//]: # ()
[//]: # (### Physical & Remote Locations)

[//]: # ()
[//]: # (### Multi-Team Segmentation)