# Workflow Strategies 

Workflow execution is controlled by two important settings: _Handling a
step failure_ and _Strategy_.

![Workflow controls](/assets/img/fig0401.png)

_If a step fails_: This manages what to do if a step incurs an error:

- Stop at the failed step: Fail immediately (default).
- Run remaining steps before failing: Continue to next steps and fail the job at the end.

The default is to fail immediately but depending on the procedure at
hand it is possible to choose to have the execution continue.

_Strategy_: Controls the order of execution of steps and command
dispatch to nodes: _Node-oriented_ and _Step-oriented_.

- _Node First_: Executes the full workflow on each node before the
  next node. (default)
- _Sequential_: Executes each step on all nodes before the next
  step.
- _Parallel_: Run all steps in parallel.

The following illustrations contrast the strategies showing how three
steps proceed across two nodes.

Node First flow illustrated:

```
1.   NodeA    step#1
2.   NodeA    step#2
3.   NodeA    step#3
4.   NodeB    step#1
5.   NodeB    step#2
6.   NodeB    step#3
```

Sequential flow illustrated:

```
1.   NodeA    step#1
2.   NodeB    step#1
3.   NodeA    step#2
4.   NodeB    step#2
5.   NodeA    step#3
6.   NodeB    step#3  
```

The process being automated will determine which strategy is
correct, though the node-oriented flow is more commonplace.

For more complex workflow strategy rules, see [Ruleset Workflow Strategy Plugin](/manual/jobs/workflow-strategies/ruleset.md)