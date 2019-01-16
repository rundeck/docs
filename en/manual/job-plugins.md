% Job plugins

## Node Steps

* [[page:manual/node-steps/jira.md]]
* [Command step][page:manual/node-steps/builtin.md#command-step]
* [Script step][page:manual/node-steps/builtin.md#script-step]
* [Scipt file][page:manual/node-steps/builtin.md#script-file-step]
* [Script url][page:manual/node-steps/builtin.md#script-url-step]
* [Job reference][page:manual/node-steps/builtin.md#job-reference-step]
* [Copy file][page:manual/node-steps/builtin.md#copy-file-step]
* [Local command][page:manual/node-steps/builtin.md#local-command-step]
* [Data node][page:manual/node-steps/builtin.md#data-node-step]
* [SQL Runner (Pro)][page:manual/node-steps/sqlrunner.md]
* [[page:manual/node-steps/vmware.md]]


## Workflow Steps

* [Ansible module][page:manual/workflow-steps/builtin.md#ansible-module]
* [Ansible playbook inline][page:manual/workflow-steps/builtin.md#ansible-playbook-inline]
* [Ansible playbook][page:manual/workflow-steps/builtin.md#ansible-playbook]
* [Global variable][page:manual/workflow-steps/builtin.md#global-variable]
* [Flow control][page:manual/workflow-steps/builtin.md#flow-control]
* [Job state conditional][page:manual/workflow-steps/builtin.md#job-state-conditional]
* [Log data step][page:manual/workflow-steps/builtin.md#log-data-step]
* [Refresh project nodes][page:manual/workflow-steps/builtin.md#refresh-project-nodes]
* [Data step][page:manual/workflow-steps/builtin.md#data-step]
* [File Transfer (Pro)][page:manual/workflow-steps/file-transfer.md]
* [Github (Pro)][page:manual/workflow-steps/github.md]
* [[page:manual/workflow-steps/jira.md]]
* [Progress Badge (Pro)][page:manual/workflow-steps/progress-badge.md#progress-badge-workflow-step-plugin]
* [ServiceNow (Pro)][page:manual/workflow-steps/servicenow.md]
* [[page:manual/workflow-steps/vmware.md]]

## Notifications

Notification plugins determine what Rundeck does when a Job Execution
starts or finishes, with either success or failure. For a general
explanation on how job notifications work, see [Creating jobs#Job Notifications][page:manual/creating-jobs.md#job-notifications]

* [Email][page:manual/notifications/email.md]
* [[page:manual/notifications/jira.md]]
* [Webhooks][page:manual/notifications/webhooks.md]

## Workflow Strategy

The Workflow Strategy determines how the steps are processed within a Job's Workflow.

* [Ruleset (Pro)][page:manual/workflow-strategies/ruleset.md]

## Node Orchestrator

An Orchestrator plugin can determine how to use the Nodes selected by your Job Filter. By default, all of the filtered nodes will be used,
in the order specified in your Job definition.

However an Orchestrator plugin can choose which of the nodes should be used, and when.  For example,
to limit concurrent execution to a subset of the nodes, or to skip certain nodes.

* [[page:manual/orchestrator-plugins/bundled.md]]
* [[page:manual/orchestrator-plugins/highest-lowest.md]]

## Log Filters

Log Filters can filter/process/read output from specific Workflow Steps, or all Workflow Steps of a Job.

* [[page:manual/log-filters/mask-passwords.md]]
* [[page:manual/log-filters/render-formatted-data.md]]
* [[page:manual/log-filters/key-value-data.md]]
* [[page:manual/log-filters/quiet-output.md]]
* [[page:manual/log-filters/highlight-output.md]]
* [[page:manual/log-filters/progress-badge.md]]

## Content Converters

Content Converters are not added directly to Jobs, but can be used by Log Filters and Step plugins.

See [[page:manual/content-converters/index.md]].
