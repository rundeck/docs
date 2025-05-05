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

Since any Replica can pick up a task for a Runner, it is important to **ensure that Replica hosts are configured to be as identical as possible**. Doing so results in consistent behavior as tasks are picked up by the Replicas.

Runbook Automation does provide some built-in consistency guardrails, such as:
* When a Runner is created and "Windows" is selected as the Deployment Type, then all Replicas for that Runner must be deployed on Windows hosts. The same is true for Linux.
* When Replicas for a given Runner differ in agent version, then a warning is shown in the GUI informing the user that it is best practice to keep Replicas in aligned with the same version.


### Advantages of Replicas

* **Scalability**
* **Fault Tolerance**
* **Consistency & Predictability Guardrails**

## Ephemeral vs. Persistent Replicas

## Affinity & Reference Jobs

## Local Runner

## Example Architectures

### Disparate Cloud Environments

### Hybrid Cloud

### Physical & Remote Locations

### Multi-Team Segmentation