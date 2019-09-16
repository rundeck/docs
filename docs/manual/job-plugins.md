# Job plugins

## Node Steps

- [Jira Node Step Plugins (Enterprise)](/manual/node-steps/jira.md)
- [Command step](/manual/node-steps/builtin.md#command-step)
- [Script step](/manual/node-steps/builtin.md#script-step)
- [Scipt file](/manual/node-steps/builtin.md#script-file-step)
- [Script url](/manual/node-steps/builtin.md#script-url-step)
- [Job reference](/manual/node-steps/builtin.md#job-reference-step)
- [Copy file](/manual/node-steps/builtin.md#copy-file-step)
- [Local command](/manual/node-steps/builtin.md#local-command-step)
- [Data node](/manual/node-steps/builtin.md#data-node-step)
- [SQL Runner (Enterprise)](/manual/node-steps/sqlrunner.md)
- [VMWare Operations Node Step Plugin (Enterprise)](/manual/node-steps/vmware.md)

## Workflow Steps

- [Ansible module](/manual/workflow-steps/builtin.md#ansible-module)
- [Ansible playbook inline](/manual/workflow-steps/builtin.md#ansible-playbook-inline)
- [Ansible playbook](/manual/workflow-steps/builtin.md#ansible-playbook)
- [Global variable](/manual/workflow-steps/builtin.md#global-variable)
- [Flow control](/manual/workflow-steps/builtin.md#flow-control)
- [Job state conditional](/manual/workflow-steps/builtin.md#job-state-conditional)
- [Log data step](/manual/workflow-steps/builtin.md#log-data-step)
- [Refresh project nodes](/manual/workflow-steps/builtin.md#refresh-project-nodes)
- [Data step](/manual/workflow-steps/builtin.md#data-step)
- [File Transfer ()](/manual/workflow-steps/file-transfer.md)
- [Github (Enterprise)](/manual/workflow-steps/github.md)
- [Jira Workflow Step Plugins (Enterprise)](/manual/workflow-steps/jira.md)
- [Progress Badge (Enterprise)](/manual/workflow-steps/progress-badge.md#progress-badge-workflow-step-plugin)
- [ServiceNow (Enterprise)](/manual/workflow-steps/servicenow.md)
- [VMWare Step Plugins (Enterprise)](/manual/workflow-steps/vmware.md)

## Notifications

Notification plugins determine what Rundeck does when a Job Execution
starts or finishes, with either success or failure. For a general
explanation on how job notifications work, see [Creating jobs#Job Notifications](/manual/creating-jobs.md#job-notifications)

- [Email](/manual/notifications/email.md)
- [Jira Notification Plugins (Enterprise)](/manual/notifications/jira.md)
- [Webhooks](/manual/notifications/webhooks.md)

## Workflow Strategy

The Workflow Strategy determines how the steps are processed within a Job's Workflow.

- [Ruleset (Enterprise)](/manual/workflow-strategies/ruleset.md)

## Node Orchestrator

An Orchestrator plugin can determine how to use the Nodes selected by your Job Filter. By default, all of the filtered nodes will be used,
in the order specified in your Job definition.

However an Orchestrator plugin can choose which of the nodes should be used, and when. For example,
to limit concurrent execution to a subset of the nodes, or to skip certain nodes.

- [Bundled Orchestrator Plugins](/manual/orchestrator-plugins/bundled.md)
- [Highest/Lowest Attribute Value (Enterprise)](/manual/orchestrator-plugins/highest-lowest.md)

## Log Filters

Log Filters can filter/process/read output from specific Workflow Steps, or all Workflow Steps of a Job.

- [Mask Passwords](/manual/log-filters/mask-passwords.md)
- [Render Formatted Data](/manual/log-filters/render-formatted-data.md)
- [Key Value Data](/manual/log-filters/key-value-data.md)
- [Quiet Output](/manual/log-filters/quiet-output.md)
- [Highlight Output](/manual/log-filters/highlight-output.md)
- [Progress Badge](/manual/log-filters/progress-badge.md)

## Content Converters

Content Converters are not added directly to Jobs, but can be used by Log Filters and Step plugins.

See [Content Converter Plugins](/manual/content-converters/index.md).
