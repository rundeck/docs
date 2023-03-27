# Understanding Workflow Strategies

## Workflow Behavior
The Workflow Strategy that’s assigned as part of each job definition determines how the steps are processed within a Job's Workflow. The strategy will determine whether steps will be executed node by node and/or whether job steps should be executed in parallel or sequentially.<br>
![](~@assets/img/workflow1.png)<br>
The following are the strategies available to Jobs in Rundeck / Process Automation.<br>
### Node First
The default behavior executes all steps defined in the job on a node before proceeding to the next node. Each node will be completed before the next node begins executing the workflow.
Example:
```
1.   NodeA    step#1
2.     "      step#2
3.     "      step#3
4.   NodeB    step#1
5.     "      step#2
6.     "      step#3
```
### Parallel
This strategy runs on more than one node in parallel. Instead of having to complete each node before moving to the next node, this strategy allows working on multiple nodes at the same time (as limited by the Thread Count setting).<br>
#### Thread Count
The Thread Count, on the nodes tab in the job page, designates the maximum number of parallel threads to use. This example uses a job with three nodes in parallel.
Example:
To run a job on multiple nodes in parallel in Rundeck (e.g: against three nodes), set ThreadCount = 3 and dispatch the job against three nodes.
![](~@assets/img/workflow2.gif)
By using a thread count of 3, the job will execute on 3 nodes at any one time, moving on to a new node each time one completes.
![](~@assets/img/workflow3.png)<br>
### Sequential
This strategy runs each step in order so you can execute one step on all nodes before proceeding to the next step.<br>
Example:<br>
```
1.   NodeA    step#1
2.   NodeB      "
3.   NodeA    step#2
4.   NodeB      "
5.   NodeA    step#3
6.   NodeB      "
```
### Ruleset (Process Automation exclusive strategy)
The three strategies listed above are available on Rundeck as well as PagerDuty Process Automation (the commercial products). The fourth strategy is only available to commercial customers. The [Ruleset Workflow Strategy](https://docs.rundeck.com/docs/manual/workflow-strategies/ruleset.html#ruleset-workflow-strategy-plugin) allows commercial users to provide more complex logic around job step execution. For example, a job might have most steps executed sequentially but a few specific ones run in parallel.  For more details on what is available in the Ruleset Strategy, click [here](https://docs.rundeck.com/docs/manual/workflow-strategies/ruleset.html#ruleset-workflow-strategy-plugin).<br>