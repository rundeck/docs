# Job plugins

## Node Steps

- [AWS EC2 Node Step Plugin](/manual/node-steps/aws.md)
- [Azure Node Step Plugins (Enterprise)](/manual/node-steps/azure.md)
- [Google Cloud Platform Plugins (Enterprise)](/manual/node-steps/gcp.md)
- [Oracle Cloud Node Steps plugins (Enterprise)](/manual/node-steps/oracle.md)
- [Datadog Node Step Plugins (Enterprise)](/manual/node-steps/datadog.md)
- [Jira Node Step Plugins (Enterprise)](/manual/node-steps/jira.md)
- [Sensu Node Step Plugins (Enterprise)](/manual/node-steps/sensu.md)
- [SQL Runner (Enterprise)](/manual/node-steps/sqlrunner.md)
- [VMWare Operations Node Step Plugin (Enterprise)](/manual/node-steps/vmware.md)
- [Command step](/manual/node-steps/builtin.md#command-step)
- [Script step](/manual/node-steps/builtin.md#script-step)
- [Script file](/manual/node-steps/builtin.md#script-file-step)
- [Script URL](/manual/node-steps/builtin.md#script-url-step)
- [Job reference](/manual/node-steps/builtin.md#job-reference-step)
- [Copy file](/manual/node-steps/builtin.md#copy-file-step)
- [Local command](/manual/node-steps/builtin.md#local-command-step)
- [Data node](/manual/node-steps/builtin.md#data-node-step)
- [HTTP Request](/manual/node-steps/builtin.md#http-node-step)


## Workflow Steps

- [Amazon Web Services(Enterprise)](/manual/workflow-steps/aws.md)
- [Azure Job Steps (Enterprise)](/manual/workflow-steps/azure.md)
- [Google Cloud Platform (Enterprise)](/manual/workflow-steps/gcp.md)
- [Oracle Cloud Infrastructure(Enterprise)](/manual/workflow-steps/oracle.md)
- [Datadog Workflow Step Plugins (Enterprise)](/manual/workflow-steps/datadog.md)
- [File Transfer (Enterprise)](/manual/workflow-steps/file-transfer.md)
- [Github (Enterprise)](/manual/workflow-steps/github.md)
- [Jira Workflow Step Plugins (Enterprise)](/manual/workflow-steps/jira.md)
- [PagerDuty (Enterprise)](/manual/workflow-steps/pagerduty.md#pager-duty-job-steps-enterprise)
- [Progress Badge (Enterprise)](/manual/workflow-steps/progress-badge.md#progress-badge-workflow-step-plugin)
- [Sensu Workflow Step Plugins (Enterprise)](/manual/workflow-steps/sensu.md)
- [ServiceNow (Enterprise)](/manual/workflow-steps/servicenow.md)
- [VMWare Step Plugins (Enterprise)](/manual/workflow-steps/vmware.md)
- [Ansible module](/manual/workflow-steps/builtin.md#ansible-module)
- [Ansible playbook inline](/manual/workflow-steps/builtin.md#ansible-playbook-inline)
- [Ansible playbook](/manual/workflow-steps/builtin.md#ansible-playbook)
- [Global variable](/manual/workflow-steps/builtin.md#global-variable)
- [Flow control](/manual/workflow-steps/builtin.md#flow-control)
- [Job state conditional](/manual/workflow-steps/builtin.md#job-state-conditional)
- [Log data step](/manual/workflow-steps/builtin.md#log-data-step)
- [Refresh project nodes](/manual/workflow-steps/builtin.md#refresh-project-nodes)
- [Data step](/manual/workflow-steps/builtin.md#data-step)

## Notifications

Notification plugins allow Rundeck to communicate changes in job execution state and notify other users of successful or failed runs. For a general explanation on how job notifications work, see [Job Notifications](/manual/creating-jobs.md#job-notifications).

- [Jira Notification Plugins (Enterprise)](/manual/notifications/jira.md)
- [Jenkins Notification Plugin (Enterprise)](/manual/notifications/jenkins.md)
- [Datadog Notification Plugin (Enterprise)](/manual/notifications/datadog.md)
- [PagerDuty Notification Plugin (Enterprise)](/manual/notifications/pagerduty.md)
- [ServiceNow Notification Plugin (Enterprise)](/manual/notifications/servicenow.md)
- [Slack Notification Plugin (Enterprise)](/manual/notifications/slack.md)
- [Email](/manual/notifications/email.md)
- [Webhooks](/manual/notifications/webhooks.md)

For directions on how to use the Notification interface, see [here](/manual/notifications/interface-instructions.md).


## Option Plugins

Option Plugins provide dynamic Allowed Value lists to help choose the proper inputs for your jobs.  For general overview of how Options work see [Job Options](/manual/job-options.md)

- [Jira Option Plugins](/manual/option-plugins/jira.md)


## Workflow Strategy

The Workflow Strategy determines how the steps are processed within a Job's Workflow.

- [Ruleset (Enterprise)](/manual/workflow-strategies/ruleset.md)

## Node Orchestrator

Typically, Rundeck processes nodes in the exact order that they are specified within a Job definition. An *Orchestrator Plugin* allows this run order to be modified by selecting a subset of nodes. This would be useful in order to limit concurrent executions during a deployment or gradually role out a new job to allow for testing.

The Bundled plugins support random selection, ordering by ranked tier, or specifying a percentage of nodes to target. If more logic or specificity is required, the Enterprise edition supports the selection of a single node based upon the value of an attribute.

- [Highest/Lowest Attribute Value (Enterprise)](/manual/orchestrator-plugins/highest-lowest.md)
- [Bundled Orchestrator Plugins](/manual/orchestrator-plugins/bundled.md)

## Log Filters

Log Filters can transform or aggregate output from one or more Workflow states.

- [Mask Passwords](/manual/log-filters/mask-passwords.md)
- [Render Formatted Data](/manual/log-filters/render-formatted-data.md)
- [Key Value Data](/manual/log-filters/key-value-data.md)
- [Quiet Output](/manual/log-filters/quiet-output.md)
- [Highlight Output](/manual/log-filters/highlight-output.md)
- [Progress Badge](/manual/log-filters/progress-badge.md)

## Content Converters

Content Converters are not added directly to Jobs, but can be used by Log Filters and Step plugins to render log output as HTML or Markdown within the Rundeck User Interface.

See [Content Converter Plugins](/manual/content-converters/index.md).

## Execution Lifecycle

See [Execution Lifecycle Plugins](/manual/execution-lifecycle/index.md).
