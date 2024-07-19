---
redirectFrom: /administration/runner/runner-intro
---

# Enterprise Runner

::: enterprise
:::

### Orchestrating Automation Across Disparate Environments

The Enterprise Runner allows for dispatching automation to remote environments that Runbook Automation can not reach directly.

This architecture allows for orchestrating various tasks and automation playbooks across multiple environments, including secure and remote environments.

The Runner is equipped with most of the same plugins Runbook Automation, making it easy to use the Runner with existing automation.

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


[//]: # (#### Providing Teams with Autonomy & Flexibility)

[//]: # ()
[//]: # ()
[//]: # ()
[//]: # (![Runners for Distributed Teams]&#40;/assets/img/runners-for-distributed-teams.png&#41;<br>)


[//]: # (Building and orchestrating automation in complex multi-cloud and remote environments presents several challenges. The first challenge is that DevOps and Operations engineers need an alternative  to run automation in secure application environments that mandate a zero trust architecture where accessing private networks through SSH is deprecated. Next, significant engineering effort is required to deploy and manage automation that performs well across many remote environments and geographical regions. Lastly, creating resilient automation runbooks is time consuming and prone to error when coordinating a variety of complex environments.)

[//]: # ()
[//]: # (We are introducing a next generation architecture to address these challenges. With the new Runbook Automation architecture,  DevOps and Operations engineers can easily manage automation in a central UI while delegating job execution within different private networks or multi-cloud environments without needing to open SSH ports for accessing those networks. The new architecture separates workflow orchestration from task execution. It offers next generation remote Runners that include common integration plugins like Ansible and Kubernetes that execute locally to the application environment.)

[//]: # ()
[//]: # (![Next generation automation]&#40;/assets/img/architecture-nextgen.png&#41;)

[//]: # ()
[//]: # (The Runner, available for both Runbook Automation, securely opens up network/communication between data centers and the Automation Cluster. The Runner is a Remote Execution hub for Node Steps to run on specified endpoints, rather than from the Automation server itself.)

[//]: # ()
[//]: # (## System Architecture)

[//]: # ()
[//]: # (The Runner is a Java based program which uses a polling model to pick up work from the Automation Server. During each polling cycle &#40;every 5 seconds&#41; the Runner checks for executions that it is responsible for. Communication from the Runner to the Automation Server happens over https and is initiated from the Runner. This allows for enhanced firewall security as ports no longer need to be open for the Automation Server to talk to nodes over more sensitive ports. _&#40;e.g. SSH/22&#41;_)

[//]: # (![Runner Architecture]&#40;/assets/img/runner-arch-diagram.png&#41;)

[//]: # ()
[//]: # (## Example scenario using the runner architecture)

[//]: # ()
[//]: # (With the next generation architecture, automation authors can select which Runners will carry out the tasks for a given job using Runner tags. Authors can also choose if tasks will execute on a Runner or if tasks will be dispatched to nodes through the selected Runner set. There are two types of Runners: Local and Remote. The Local Runner tasks execute from the Rundeck instance. The Remote Runner tasks execute from the Runners installed in the environment.)

[//]: # ()
[//]: # (![Private networks scenario]&#40;/assets/img/runner-scenario.png&#41;)

[//]: # ()
[//]: # (In the example below, we have a job that will span three different environments.)

[//]: # ()
[//]: # (1. The 1st step &#40;Check Cloud Services Status&#41; is a reference job that is configured with a Remote Runner which will execute a Kubernetes plugin as a workflow step.)

[//]: # (1. Steps 2,3, and 4 are configured to run on the Local Runner.)

[//]: # (1. Step 5 &#40;Check System Resources&#41; is also a reference job similar to step 1, but executes an Ansible playbook through the Ansible plugin and targets nodes in the second environment through a separate Remote Runner.)

[//]: # (1. Step 7 &#40;Run DB Lock Check&#41; is also a reference job similar to step 1 and 5, but executes a Powershell command through the WinRM plugin and targets nodes in the third environment through a separate Remote Runner.)

## Enabling the Latest Runner Features

:::tip Enabled by Default for Docker and Runbook Automation SaaS
This feature has been enabled on Docker installations since v4.5.0 and is also enabled by default for Runbook Automation. 
If using either Docker or Runbook Automation, the feature is enabled by default and no further action is required.
:::

To use the latest Enterprise Runner features, the following feature-flags must be enabled in **System Configuration** or optionally in the `rundeck-config.properties` file if using the self-hosted software.

`rundeck.feature.runner.enabled=true`

`rundeck.feature.distributedAutomation.enabled = true`