---
redirectFrom: /administration/runner/runner-intro
---

# Enterprise Runner

::: enterprise
:::

### Orchestrating Automation Across Disparate Environments

The Enterprise Runner allows for dispatching automation to remote environments that Runbook Automation can not reach directly.

This architecture allows for orchestrating various tasks and automation playbooks across multiple environments, including secure and remote environments.

The Runner is equipped with most of the same plugins found in Runbook Automation, making it easy to use the Runner with existing automation.

Tasks can be carried out over multiple environments simultaneously, thereby reducing the time and complexity of orchestrating automation across disparate environments.

### Runner Architecture Overview

![Runners Orchestrate Automation Across All Environment Types](/assets/img/runner-how-it-works.png)<br>

1. The Runner uses a **polling model** to pick up work from Process or Runbook Automation. During each polling cycle the Runner checks for executions that it is responsible for.
2. Communication from the Runner to Runbook Automation happens over **`HTTPS`** and is initiated from the Runner. This implies that no inbound firewall ports need to be open for the Runner. 
3. Tasks come into the Runner's queue from users and tools that are interfacing with Runbook Automation.
4. The Runner retrieves tasks from the response of queries to Runbook Automation and performs them in the remote environment.
5. Output of the task is sent back to Runbook Automation for logging and reporting.
    - The output or result of the tasks can then be used to **trigger subsequent tasks or workflows**.
6. The Runner can use secrets retrieved from a **secrets provider** that is not directly accessible from Runbook Automation.
    - Secrets retrieved this way **stay within the Runner's environment** and are **not sent back to Runbook Automation.**
7. The Runner can use existing automation tools or communicate directly with infrastructure and APIs in the remote environment.
   - The Runner can be used to discover inventory in secure or remote environments. 
8. The Runner can be deployed as a container within Kubernetes clusters to perform actions within the cluster.

## Replicas Overview

Runners are composed of one or more **Replicas**. Each Replica is a separate instance of the Runner that can be deployed on different servers, virtual-machines or containers. 
Replicas can be used to scale the Runner's capacity and provide redundancy.

When a task is assigned to a Runner - such as a Job execution, fetching nodes or retrieving secrets - then any Replica of that Runner can pick up the task. This allows for load balancing and fault tolerance.

![Replicas Architecutre](/assets/img/replicas-architecture.png)<br>

For more details on how Replicas operate, see [Runner Replicas](/administration/runner/concepts.md#runner-replicas).

## Enabling the Latest Runner Features

To use the latest Enterprise Runner features, the following feature-flag must be enabled in **System Configuration** or optionally in the `rundeck-config.properties` file if using the self-hosted software.

1. **`rundeck.feature.runner.enabled`** = **`true`**.  This enables the platform feature of the Runner.
2. **`rundeck.feature.distributedAutomation.enabled`** = **`true`**.  This enables the latest features of the Runner - such as executing plugins on the Runner and managing Runners within Projects. It is **highly recommended** to add this feature-flag as well.

:::tip Enabled by Default for Docker and Runbook Automation SaaS
These features have been enabled on Docker installations since v4.5.0 and is also enabled by default for Runbook Automation SAAS.
If using either Docker or Runbook Automation SAAS, the feature is enabled by default and no further action is required.
:::

:::warning Upgrading from versions prior to 4.11

If using the Enterprise Runner prior to version 4.11 and want to upgrade and enable the latest Runner features, follow these steps:

1. Set **`rundeck.feature.distributedAutomation.enabled`** = **`true`** in **System Configuration**.
2. [Upgrade the Runners](/administration/runner/runner-management/upgrading-runners.md) to the latest version.

It may also be helpful to review the latest Runner features.
* [Project Runner Management](/administration/runner/runner-management/managing-runners.md#managing-runners-within-a-project) allows users to create and manage Runners within Projects.
* [Runner as a Node](/administration/runner/runner-management/node-dispatch.md#runner-as-a-node) provides a native method for representing the Runner as a node in the node inventory.
* [Automatic Runner Selection](/administration/runner/runner-management/project-dispatch-configuration.md#automatic-runner-selection) provides a method for automatically selecting Runners based on node filters.
* [Manual Runner Selection](/administration/runner/runner-management/project-dispatch-configuration.md#manual-runner-selection) provides a method for manually selecting Runners within the Job definition.
:::
