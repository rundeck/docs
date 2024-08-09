# Node Dispatch

:::warning Early Access Feature
This feature is in early access as of version 5.5.0<br>
To gain access, please [submit this form](https://www.pagerduty.com/early-access/) or contact your Account Manager.
:::

The Node Dispatch settings of a Runner defines which nodes are assigned to a Runner for the dispatch of automation tasks.

**Note:** _Node Dispatch_ settings for Runners is only available for projects that use **Automatic** for **_Runner Selection for Job Execution_**. This can be toggled through the [Project Dispatch Configuration](/administration/runner/runner-management/project-dispatch-configuration) and is the default for all new projects.

## Runner as a Node
Enabling the _**Runner as a Node**_ adds the Runner as a node to the node inventory.  When this node is targeted with a node-step within a Job or with a command from the Commands page,
the Runner will execute the step locally. This is useful for running automation tasks that require the Runner to execute a command or script on the local host.

:::warning Runner Version Requirement
To use the Runner as a Node feature and target the Runner's host with command and script steps, the Runner must be at version 5.5.0 or later.
:::

Nodes that represent Runners are designated with a Runner icon in the node inventory and do not require configuring a node source for the Runner's to be added to the inventory.

![Runner as a Node](/assets/img/runners-as-nodes-inventory.png)<br>

When a Runner is created, it is automatically added as a node to the node inventory.  This can be disabled by unchecking the _**Enable Runner as a Node**_ setting:

1. Navigate to the **Runner Management** page within the Project.
2. Select the Runner by clicking on the Runner's name.
3. Click on the **Node Dispatch** tab.
4. Uncheck the _**Enable Runner as a Node**_ setting:
![Enable Runner as a Node](/assets/img/enable-runner-as-node.png)<br><br>

:::warning Local Node Source Requirement
Nodes that represent Runners are dependent on the **Local** Node Source to be configured.  Removing the Local Node Source will result in the removal of the Runner nodes from the inventory.

![Local node source](/assets/img/local-node-source.png)<br>

To still use the Local Node Source, but prevent the execution of commands and scripts on the Runbook Automation cluster members, set the property **`rundeck.localExecutor.disabled=true`** in the `rundeck-config.properties` file or **`DISABLED_LOCAL_EXECUTOR=true`** for Docker installations.
:::

## Remote Node Dispatch 

Enabling the _**Remote Node Dispatch**_ setting allows the Runner to dispatch commands, scripts and api-calls to _remote_ nodes using protocols such as SSH, WinRM and HTTP/S.  This is necessary for securely dispatching to nodes from Runbook Automation Cloud or to nodes that are not directly accessible from the self-hosted cluster.

The mapping of which nodes a given Runner is responsible for is defined using a [**Node Filter**](/manual/11-node-filters.html).  When the Node Filter is defined for a Runner, then Job steps that target the nodes that match the filter will be dispatched _through_ the Runner for execution.

To define the Node Filter for a Runner:
1. Navigate to the **Runner Management** page within the Project.
2. Select the Runner by clicking on the Runner's name.
3. Click on the **Node Dispatch** tab.
4. Enable the _**Remote Node Dispatch**_ setting.
5. Define the Node Filter using the **Node Filter** field.
6. Click **Save Configuration**.

![Remote Node Dispatch](/assets/img/runner-node-filter.png)
_Runners are dynamically chosen for Job execution based on the Runner's Node Filter_

:::tip Nodes Without a Runner Association
Nodes that do not match the Node Filter of any Runner will be dispatched to using the Runbook Automation cluster (self-hosted).  When using Runbook Automation Cloud, commands and scripts can be dispatched to these nodes using the [AWS Systems Manager](/manual/projects/node-execution/aws-ssm.html) Node Executor. Node Step plugins that target public endpoints - such as AWS or Datadog node step plugins - can also be used through Runbook Automation Cloud when no Runner is assigned to those nodes.

This ensures that all nodes are dispatched for execution, even if they do not match the Node Filter of a Runner.
:::

### Example Remote Dispatch Node Filter

A common use-case for defining a Node Filter for a Runner is to declare a given region or data-center that a Runner is responsible for.

For example, a Runner that is responsible for nodes in the **`us-west-1`** region could have a Node Filter defined as:<br>
```region: "us-west-1"```

![Remote Node Dispatch](/assets/img/remote-node-dispatch-example.png)<br>

Taking this a step further, a Runner could be responsible for only **_Windows_** nodes in `us-west-1`, in which case the Node Filter would be:<br>
```region: "us-west-1" osFamily: "windows"```

![Remote node dispatch windows example](/assets/img/remote-node-dispatch-windows-example.png)<br>

For more information on defining Node Filters, see the [Node Filters](/manual/11-node-filters.html) documentation.

## Overlapping Node Filters

When defining Node Filters for Runners, it is possible to have filters on multiple Runners that overlap their assignments of the node inventory. In other words, a given node may be mapped to more than one Runner.

For example, one Runner may have the node filter ```region: "us-west-1"``` and another Runner may have the node filter ```region: "us-west-1" osFamily: "windows"```.
In this case, Jobs steps that target _Windows_ nodes in the _US-WEST-1_ region could be dispatched through **_either_** Runner.

While this can be useful for redundancy purposes, it requires careful considering that both Runners and their hosts are configured as identically as possible to reduce the likelihood of unpredictable behavior.

Native high-availability and horizontal scaling of Runners is planned for a future release.