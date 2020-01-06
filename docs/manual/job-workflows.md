# Job Workflows

The Job's most basic feature is its ability to execute one or more
steps. This sequence of steps is called a _workflow_.

The steps of the Job workflow are displayed when viewing a Job's
detail from a Job listing or within the Job editor form.

## Workflow definition

Workflows can be defined within the Rundeck graphical console or as an
XML or YAML document that is loaded to the server.

The graphical console provides an authoring environment where steps
can be added, edited, removed or reordered.

Users preferring to define Jobs in a text format should refer to the two format definitions:

- XML: [job-xml](/manual/document-format-reference/job-v20.md)
- YAML: [job-yaml](/manual/document-format-reference/job-yaml-v12.md)

It is also possible to author Jobs inside the graphical console
and then export the definition as a file using the
`rd` CLI tool ([rd]), or via the API.

See [Command Line Tools and API Acccess][1].

[1]: #command-line-tools-and-api-access

## Workflow control settings

Workflow execution is controlled by two important settings: _Handling a
step failure_ and _Strategy_.

![Workflow controls](~@assets/img/fig0401.png)

_If a step fails_: This manages what to do if a step incurs an error:

- Stop at the failed step: Fail immediately (default).
- Run remaining steps before failing: Continue to next steps and fail the job at the end.

The default is to fail immediately but depending on the procedure at
hand you can choose to have the execution continue.

<!--- Out of date? Node First, Parallel, Sequential, Ruleset Workflow Strategy --->

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
2.     "      step#2
3.     "      step#3
4.   NodeB    step#1
5.     "      step#2
6.     "      step#3
```

Sequential flow illustrated:

```
1.   NodeA    step#1
2.   NodeB      "
3.   NodeA    step#2
4.   NodeB      "
5.   NodeA    step#3
6.   NodeB      "
```

The process you are automating will determine which strategy is
correct, though the node-oriented flow is more commonplace.

For more complex workflow strategy rules, see [Ruleset Workflow Strategy Plugin](/manual/workflow-strategies/ruleset.md)

## Workflow steps

The following sections describe how to construct a workflow as a set
of steps of different types.

When creating a new Job definition, the Workflow form will be set with
defaults and have no workflow steps defined. The workflow editor will
have a form open asking to choose a step type to add.

![Add a step](~@assets/img/fig0402.png)

To add new steps simply press the "Add a step" link inside the workflow
editor form. This will prompt you with a dialog asking which kind of
step you would like to add. Each kind of step has its own
form. When you are done filling out the form, press "Save" to add it
to the sequence. Pressing "Cancel" will close the form and leave the
sequence unchanged.

![Add a step form](~@assets/img/fig0403.png)

New steps are always added to the end of the sequence. See
[Reordering steps](#reordering-steps)
for directions on moving steps into a new order.

Each step can have a "Description" to give it a more logical name or description to be displayed in the Rundeck GUI.

The next several sections describe the specification of each kind of
workflow step.

**Types of Steps**

Steps in a workflow can be either _Node Steps_ or _Workflow Steps_.

- Node Steps operate once on each Node, which could be multiple times within a workflow. For a full list of Node Steps, see [Job Plugins - Node Steps](/manual/job-plugins.md#node-steps)
- Workflow Steps operate only once in the workflow. For a full list of Workflow Steps, see [Workflow Steps](/manual/job-plugins.md#workflow-steps)

## Reordering steps

The order of the Workflow steps can be modified by hovering over any
step and then clicking and dragging the double arrow icon to the
desired position. 

![Job step reorder](~@assets/img/fig0408.png)

A blue horizontal bar helps highlight the position
where the Job will land.

![Job step reorder](~@assets/img/fig0408a.png)

After releasing the select Job, it will land in the desired position
and the step order will be updated.

If you wish to Undo the step reordering, press the "Undo" link above
the steps.

The "Redo" button can be pressed to reapply the last undone change.

Press the "Revert All Changes" button to go back to the original step order.

## Error Handlers

Each step in a Workflow can have an associated "Error Handler" action. This handler
is a secondary step of any of the available types that will execute if the Workflow
step fails. Error Handler steps can be used to recover the workflow from failure, or
simply to execute a secondary action.

This provides a few different ways to deal with a step's failure:

- Print additional information about a failure
- Roll back a change
- Recover the workflow from failure, and continue normally

When a Workflow step has a failure, the behavior depends on whether it has an Error Handler or not,
and the value of the "keepgoing" setting for the Workflow, and the value of the "keepgoingOnSuccess" for the Error Handler.

- When a step fails **without an Error Handler**
  1. the Workflow is marked as "failed"
  2. If `keepgoing="false"`
     1. then the entire Workflow stops
  3. Otherwise, the remaining Workflow steps are executed in order
  4. the Workflow ends with a "failed" result status

If you define an Error Handler for a step, then the behavior changes. The handler can recover the step's failure by executing successfully, and a secondary option "keepgoingOnSuccess" will
let you override the Workflow's "keepgoing" value if it is false.

- When a step fails **with an Error Handler**
  1. The Error Handler is executed
  2. If the Error Handler was successful and has `keepgoingOnSuccess="true"`
     1. The workflow `keepgoing` is ignored,
     2. The Workflow failure status is _not_ marked, and it will continue to the next step
  3. Else if `keepgoing="false"`
     1. The Workflow is marked as "failed"
     2. Then the entire Workflow stops
  4. Else if `keepgoing="true"`
     1. If the Error Handler failed then the Workflow is marked as "failed"
     2. Otherwise, the Workflow is _not_ additionally marked
  5. the remaining Workflow steps are executed in order (including other triggered Error Handlers)
  6. when the Workflow ends, its status depends on if it is marked

Essentially, the result status of the Error Handler becomes the result status of its Step, if the Workflow
has `keepgoing="true"` or if the Error Handler overrides it with `keepgoingOnSuccess="true"`. If the Error Handler succeeds, then the step is not considered to have failed. This
includes scripts, commands, job references, etc. (Scripts and commands must have an exit status of `0` to
return success.)

It is a good practice, when you are defining Error Handlers, to **always** have them fail (e.g. scripts/commands return a non-zero exit-code), unless you specifically want them to be used for Recovery.

::: tip
Error-handlers can be attached to either Node Steps or Workflow Steps, and the type of step and the Strategy of the Workflow determines what type of Error-handler steps can be attached to a step. The only restriction is in the case that the Workflow is "Node-oriented", which means that the workflow is executed independently for each node. In this case, Node Steps can only have other Node steps as Error Handlers. In other cases, the Error Handler can be other Workflow steps.
:::

To add an error handler press the "settings" button on the step you want to handle.

![Adding an error handler](~@assets/img/fig0410.png)

The form presented includes the normal set of steps you can add to a workflow.

![Adding an error handler](~@assets/img/fig0410a.png)

<!---
The example below shows an error handler that calls a script by URL.

![Example error handler](~@assets/img/fig0411.png)
--->
### Context information

When the Error-handler step is executed, its execution context will contain some information about the nature
of the failure that occurred for the original step.

In the case where a Node Step has a Workflow Step as an Error Handler, then the failure data for multiple nodes is rolled up into a single failure reason to be used by the Workflow Step.

See the section on [Context Variables](#context-variables) for more information.

## Save the changes

Once the Workflow steps have been defined and order, changes are
permanently saved after pressing the "Create" button if new or the
"Update" button if the Job is being modified.

## Context Variables

When a Job step is executed, it has a set of "context" variables that you can access in the Job step. There are several sets of context variables, including: the Job context `job`, the Node context `node`, and the Option context `option`.

Job context variables:

- `job.name`: Name of the Job
- `job.group`: Group of the Job
- `job.id`: ID of the Job
- `job.execid`: ID of the current Execution
- `job.executionType` : Execution type, can be `user`, `scheduled` or `user-scheduled` for `Run Job Later` executions
- `job.username`: Username of the user executing the Job
- `job.project`: Project name
- `job.loglevel`: Logging level, one of: 'ERROR','WARN','INFO','VERBOSE','DEBUG'
- `job.user.email`: Executing user's email address set in [User profile](/manual/10-user.md).
- `job.retryAttempt`: A number indicating the attempt, if this execution is a [retry](#retry).
- `job.wasRetry`: `true` if this execution is a retry, otherwise `false`. See: [retry](#retry).
- `job.threadcount`: Threadcount (number of nodes run at once) of the Job
- `job.filter`: The filter used to select the nodes for this job (if applicable)

Node context variables:

- `node.name`: Name of the Node being executed on
- `node.hostname`: Hostname of the Node
- `node.username`: Username of the remote user
- `node.description`: Description of the node
- `node.tags`: Comma-separated list of tags
- `node.os-*`: OS properties of the Node: `name`,`version`,`arch`,`family`
- `node.*`: All Node attributes defined on the Node.

Execution context variables:

The execution data is included as a Map called execution containing the following keys and values:

- `execution.id`: ID of the execution
- `execution.href`: URL to the execution output view
- `execution.status`: Execution state ('running','failed','aborted','succeeded')
- `execution.user`: User who started the job
- `execution.dateStarted`: Start time (java.util.Date)
- `execution.dateStartedUnixtime`: Start time as milliseconds since epoch (long)
- `execution.dateStartedW3c`: Start time as a W3C formatted String
- `execution.description`: Summary string for the execution
- `execution.argstring`: Argument string for any job options
- `execution.project`: Project name
- `execution.loglevel`: Loglevel string ('ERROR','WARN','INFO','VERBOSE','DEBUG')
The following values may be available after the job is finished (not available for onstart trigger):
- `execution.failedNodeListString`: Comma-separated list of any nodes that failed, if present
- `execution.failedNodeList`: Java List of any node names that failed, if present
- `execution.succeededNodeListString`: Comma-separated list of any nodes that succeeded, if present
- `execution.succeededNodeList`: Java List of any node names that succeeded, if present
- `execution.nodestatus`: Java Map containing summary counts of node success/failure/total, in the form: [succeeded: int, failed: int, total: int]
- `execution.dateEnded`: End time (java.util.Date)
- `execution.dateEndedUnixtime`: End time as milliseconds since epoch (long)
- `execution.dateEndedW3c`: End time as W3C formatted string
- `execution.abortedby`: User who aborted the execution

Additional Error-handler context variables:

- `result.reason`: A code indicating the reason the step failed
  - Common reason code strings used by node execution of commands or scripts:
    - `NonZeroResultCode` - the execution returned a non-zero code
    - `SSHProtocolFailure` - SSH protocol failure
    - `HostNotFound` - host not found
    - `ConnectionTimeout` - connection timeout
    - `ConnectionFailure` - connection failure (e.g. refused)
    - `IOFailure` - IO error
    - `AuthenticationFailure` - authentication was refused or incorrect
  - Reason code strings used by Job references
    - `JobFailed` - referenced Job workflow failed
    - `NotFound` - referenced Job not found
    - `Unauthorized` - referenced Job not authorized
    - `InvalidOptions` - referenced Job input options invalid
    - `NoMatchedNodes` - referenced Job node dispatch filters had no match
  - Reason code used from a failed Node Step if the handler is a Workflow Step
    - `NodeDispatchFailure` - one or more nodes failed the step
- `result.message`: A string describing the failure
- `result.resultCode`: Exit code from an execution (if available)
- `result.failedNodes`: Comma-separated list of node names that failed for a `NodeDispatchFailure`

Option context variables are referred to as `option.NAME` (more about [Job Options](/manual/job-options.md).)

### Context Variable Usage

Context variables can be used in a few ways in a Job step, with slightly different syntaxes:

- Commands, Script Arguments and Job Reference Arguments

  : \${ctx.name}

- Inline Script Content (_see note_)

  : @ctx.name@

::: tip
Note, The "Inline Script Content" variable expansion is **not** available for "Script File" steps. The Script File is not rewritten at all when used for execution.
:::

::: tip
This can be disabled, see [Administrator Guide > Configuration File Reference > framework.properties](/administration/configuration/config-file-reference.md#framework-properties).
:::

- Environment Variables (_see note_)

  : \$RD_CTX_NAME

  The syntax for Environment variables is that all letters become uppercase, punctuation is replaced with underscore, and the name is prefixed with `RD_`.

::: tip
See the chapter [Configuring Remote Machine for SSH](/administration/projects/node-execution/ssh.md#configuring-remote-machine-for-ssh) for information about requirements of the SSH server.
:::

### Command Line Tools and API access

Jobs can be exported or imported in XML or Yaml format using the API or the `rd` CLI tool.

- [Exporting Jobs](/api/rundeck-api.md#exporting-jobs)
- [Importing Jobs](/api/rundeck-api.md#importing-jobs)
- [RD CLI Tool][rd]

[quartz scheduler crontrigger]: http://www.quartz-scheduler.org/api/2.2.1/org/quartz/CronTrigger.html
[rd]: https://rundeck.github.io/rundeck-cli/

