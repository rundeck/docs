% Job plugins

## Node Steps

* [[page:manual/node-steps/jira.md]]
* [Command step](node-steps/builtin-node-steps.html#command-step)
* [Script step](node-steps/builtin-node-steps.html#script-step)
* [Scipt file](node-steps/builtin-node-steps.html#script-file-step)
* [Script url](node-steps/builtin-node-steps.html#script-url-step)
* [Job reference](node-steps/builtin-node-steps.html#job-reference-step)
* [Copy file](node-steps/builtin-node-steps.html#copy-file-step)
* [Local command](node-steps/builtin-node-steps.html#local-command-step)
* [Data node](node-steps/builtin-node-steps.html#data-node-step)
* [SQL Runner (Pro)](node-steps/sqlrunner-plugin-pro.html)
* [[page:manual/node-steps/vmware.md]]


## Workflow Steps

* [Ansible module](workflow-steps/builtin-workflow-steps.html#ansible-module)
* [Ansible playbook inline](workflow-steps/builtin-workflow-steps.html#ansible-playbook-inline)
* [Ansible playbook](workflow-steps/builtin-workflow-steps.html#ansible-playbook)
* [Global variable](workflow-steps/builtin-workflow-steps.html#global-variable)
* [Flow control](workflow-steps/builtin-workflow-steps.html#flow-control)
* [Job state conditional](workflow-steps/builtin-workflow-steps.html#job-state-conditional)
* [Log data step](workflow-steps/builtin-workflow-steps.html#log-data-step)
* [Refresh project nodes](workflow-steps/builtin-workflow-steps.html#refresh-project-nodes)
* [Data step](workflow-steps/builtin-workflow-steps.html#data-step)
* [File Transfer (Pro)](workflow-steps/file-transfer-plugins.html)
* [Github (Pro)](workflow-steps/github-script-plugin-pro.html)
* [[page:manual/workflow-steps/jira.md]]
* [Progress Badge (Pro)](workflow-steps/progress-badge-plugin-pro.html#progress-badge-workflow-step-plugin)
* [ServiceNow (Pro)](workflow-steps/servicenow-plugins.html)
* [[page:manual/workflow-steps/vmware.md]]

## Notifications

Notification plugins determine what Rundeck does when a Job Execution
starts or finishes, with either success or failure. For a general
explanation on how job notifications work, see [Creating jobs#Job Notifications](creating-jobs.html#job-notifications)

* [Email](notifications/email.html)
* [[page:manual/notifications/jira.md]]
* [Webhooks](notifications/webhooks.html)

## Workflow Strategy

The Workflow Strategy determines how the steps are processed within a Job's Workflow.

* [Ruleset (Pro)](workflow-strategies/ruleset-workflow-strategy-plugin.html)

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
