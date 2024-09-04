# Node Discovery

Runners can be used to discover nodes in environments that are not directly accessible from the from Runbook Automation Self-Hosted or SaaS:

![Node Source Runner](/assets/img/node-source-runner-selector.png)<br>
Instructions on how to discover nodes using the Enterprise Runner, click [here](/manual/projects/resource-model-sources/index.md#adding-nodes-to-a-project).

As of version **`4.16.0`**, the following Node Sources are available to use through the Enterprise Runner:
* **Ansible Inventory**
* **VMware**
* **Kubernetes**
* **Docker**
* **File**
* **Script**

:::warning Node Sources Available on Runner
If a Node Source is selected that is not in this list, the following error will appear after the node source tries to gather resources: `Reason: The datadog-resource-model plugin was not found on Runner ID = US-WEST-1-QA. You may need to upgrade your Runner or select a different Runner.` In a future version, the Node Source configuration will dynamically know which runners support which Node Source plugins.
:::