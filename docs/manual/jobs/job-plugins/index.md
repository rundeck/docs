# Job Step Plugins

Jobs are composed of _steps_ that define the actions to be taken against target nodes, tools or data.

## Understanding Step Types

There are two fundamental types of steps in Runbook Automation Jobs, and understanding the distinction is critical for building effective workflows:

### Node Steps

**Node Steps** are designed to iterate across one or more target endpoints and execute once for each matched node.

**Characteristics:**
- Execute on each node that matches the Job's node filter
- Run in a **Node Context** with access to node-specific variables (`node.hostname`, `node.name`, etc.)
- Capture data in **Node Scope**, meaning each node can have different values for the same variable
- Examples: Commands, scripts, file operations, node-specific API calls

**Common Node Steps:**
- Execute a command on multiple servers
- Run a script against a database cluster
- Copy files to remote nodes
- Query node-specific metrics

**Variable Scoping:**
When a Node Step captures data (via log filters), that data is stored in the Node's scope. To reference data from a specific node, use: `${data.variable@nodename}`. To collect values from all nodes, use: `${data.variable*}`.

See [Job Variables Reference - Node Scope](/manual/jobs/job-variables.md#node-scope) for more details.

### Workflow Steps

**Workflow Steps** execute exactly once per Job invocation and do not operate in a node context.

**Characteristics:**
- Execute only once, regardless of how many nodes are targeted
- Run on the Rundeck server (not dispatched to remote nodes)
- Run in a **Global Context** without access to node-specific variables
- Can access data from Node Steps, but must specify which node's data to use
- Examples: Orchestration logic, global state changes, API integrations

**Common Workflow Steps:**
- Update a load balancer configuration
- Send notifications
- Refresh the project's node cache
- Export captured data from multiple nodes
- Make decisions based on aggregate node results

**Variable Scoping:**
Workflow Steps capture data in Global Scope, making it available to all subsequent steps. To access Node Scope data from a Workflow Step, you must explicitly reference it: `${data.variable@nodename}` or collect all values: `${data.variable*}`.

See [Job Variables Reference - Global Scope](/manual/jobs/job-variables.md#global-scope) for more details.

### Execution Order

The order in which steps execute is determined by the [Workflow Strategy](/manual/jobs/workflow-strategies/index.md):

- **Node-First Strategy** (default): Each node runs all steps before moving to the next node
- **Sequential Strategy**: Each step runs on all nodes before moving to the next step  
- **Parallel Strategy**: Steps run simultaneously across nodes

When mixing Node Steps and Workflow Steps (which is common):
- Node Steps may execute multiple times (once per node)
- Workflow Steps execute only once
- The execution order follows the workflow strategy
- Workflow Steps can access aggregated data from all Node Steps that executed before them

**Example Workflow:**

```
Step 1: Node Step - Check disk space on all web servers
Step 2: Workflow Step - Determine which server has the most free space
Step 3: Node Step - Deploy application to the server with most space
Step 4: Workflow Step - Update load balancer to include new deployment
```

For more information on building workflows, see [Job Workflows](/manual/jobs/job-workflows.md).

## Node Steps

- [AWS Node Steps](/manual/jobs/job-plugins/node-steps/aws.md)
- [Azure Node Step Plugins (Commercial)](/manual/jobs/job-plugins/node-steps/azure.md)
- [Google Cloud Platform Plugins (Commercial)](/manual/jobs/job-plugins/node-steps/gcp.md)
- [Oracle Cloud Node Steps plugins (Commercial)](/manual/jobs/job-plugins/node-steps/oracle.md)
- [Datadog Node Step Plugins (Commercial)](/manual/jobs/job-plugins/node-steps/datadog.md)
- [Jira Node Step Plugins (Commercial)](/manual/jobs/job-plugins/node-steps/jira.md)
- [Sensu Node Step Plugins (Commercial)](/manual/jobs/job-plugins/node-steps/sensu.md)
- [SQL Runner (Commercial)](/manual/jobs/job-plugins/node-steps/sqlrunner.md)
- [VMWare Operations Node Step Plugin (Commercial)](/manual/jobs/job-plugins/node-steps/vmware.md)
- [Command step](/manual/jobs/job-plugins/node-steps/builtin.md#command-step)
- [Script step](/manual/jobs/job-plugins/node-steps/builtin.md#script-step)
- [Script file](/manual/jobs/job-plugins/node-steps/builtin.md#script-file-step)
- [Script URL](/manual/jobs/job-plugins/node-steps/builtin.md#script-url-step)
- [Job reference](/manual/jobs/job-plugins/node-steps/builtin.md#job-reference-step)
- [Copy file](/manual/jobs/job-plugins/node-steps/builtin.md#copy-file-step)
- [Local command](/manual/jobs/job-plugins/node-steps/builtin.md#local-command-step)
- [Data node](/manual/jobs/job-plugins/node-steps/builtin.md#data-node-step)
- [HTTP Request](/manual/jobs/job-plugins/node-steps/builtin.md#http-node-step)
- [Loop Script Plugins (Commercial)](/manual/jobs/job-plugins/node-steps/loop-plugins.md)


## Workflow Steps
* **Amazon Web Services (Enterprise Only)**
  - [Athena Query](/manual/jobs/job-plugins/workflow-steps/amazon-athena.md)
  - [CloudWatch Logs](/manual/jobs/job-plugins/workflow-steps/aws-cloudwatch.md)
  - [ECS & Fargate](/manual/jobs/job-plugins/workflow-steps/aws-ecs-fargate.md)
  - [Elastic Cloud Compute (EC2)](/manual/jobs/job-plugins/workflow-steps/aws.md)
  - [Elastic Load Balancer (ELB)](/manual/jobs/job-plugins/workflow-steps/aws-elb-workflow-plugin.md)
  - [Lambda](/manual/jobs/job-plugins/workflow-steps/aws-lambda.md)
  - [RDS](/manual/jobs/job-plugins/workflow-steps/aws-rds.md)
- [Azure Job Steps (Commercial)](/manual/jobs/job-plugins/workflow-steps/azure.md)
- [Google Cloud Platform (Commercial)](/manual/jobs/job-plugins/workflow-steps/gcp.md)
- [Oracle Cloud Infrastructure(Commercial)](/manual/jobs/job-plugins/workflow-steps/oracle.md)
- [Datadog Workflow Step Plugins (Commercial)](/manual/jobs/job-plugins/workflow-steps/datadog.md)
- [File Transfer (Commercial)](/manual/jobs/job-plugins/workflow-steps/file-transfer.md)
- [Github (Commercial)](/manual/jobs/job-plugins/workflow-steps/github.md)
- [Jira Workflow Step Plugins (Commercial)](/manual/jobs/job-plugins/workflow-steps/jira.md)
- [PagerDuty (Commercial)](/manual/jobs/job-plugins/workflow-steps/pagerduty.md#pager-duty-job-steps-enterprise)
- [Progress Badge (Commercial)](/manual/jobs/job-plugins/workflow-steps/progress-badge.md#progress-badge-workflow-step-plugin)
- [Sensu Workflow Step Plugins (Commercial)](/manual/jobs/job-plugins/workflow-steps/sensu.md)
- [ServiceNow (Commercial)](/manual/jobs/job-plugins/workflow-steps/servicenow.md)
- [VMWare Step Plugins (Commercial)](/manual/jobs/job-plugins/workflow-steps/vmware.md)
- [Ansible module](/manual/jobs/job-plugins/workflow-steps/builtin.md#ansible-module)
- [Ansible playbook inline](/manual/jobs/job-plugins/workflow-steps/builtin.md#ansible-playbook-inline)
- [Ansible playbook](/manual/jobs/job-plugins/workflow-steps/builtin.md#ansible-playbook)
- [Global variable](/manual/jobs/job-plugins/workflow-steps/builtin.md#global-variable)
- [Flow control](/manual/jobs/job-plugins/workflow-steps/builtin.md#flow-control)
- [Job state conditional](/manual/jobs/job-plugins/workflow-steps/builtin.md#job-state-conditional)
- [Log data step](/manual/jobs/job-plugins/workflow-steps/builtin.md#log-data-step)
- [Refresh project nodes](/manual/jobs/job-plugins/workflow-steps/builtin.md#refresh-project-nodes)
- [Data step](/manual/jobs/job-plugins/workflow-steps/builtin.md#data-step)
- [Sumo Logic (Commercial)](/manual/jobs/job-plugins/workflow-steps/sumo-logic.md)
- [Loop Script Plugins (Commercial)](/manual/jobs/job-plugins/workflow-steps/loop-plugins.md)
- [RSS Feed Plugin (Commercial)](/manual/jobs/job-plugins/workflow-steps/rss-feed-plugin.md)
- [MongoDB Command Runner](/manual/jobs/job-plugins/workflow-steps/mongodb.md)

## Notifications

Notification plugins allow Rundeck to communicate changes in job execution state and notify other users of successful or failed runs. For a general explanation on how job notifications work, see [Job Notifications](/manual/jobs/creating-jobs.md#job-notifications).

- [Jira Notification Plugins (Commercial)](/manual/notifications/jira.md)
- [Datadog Notification Plugin (Commercial)](/manual/notifications/datadog.md)
- [PagerDuty Notification Plugin (Commercial)](/manual/notifications/pagerduty.md)
- [ServiceNow Notification Plugin (Commercial)](/manual/notifications/servicenow.md)
- [Slack Notification Plugin (Commercial)](/manual/notifications/slack.md)
- [Email](/manual/notifications/email.md)
- [Webhooks](/manual/notifications/webhooks.md)

For directions on how to use the Notification interface, see [here](/manual/notifications/interface-instructions.md).


## Option Plugins

Option Plugins provide dynamic Allowed Value lists to help choose the proper inputs for your jobs.  For general overview of how Options work see [Job Options](/manual/jobs/job-options.md)

- [Jira Option Plugins](/manual/option-plugins/jira.md)


## Workflow Strategy

The Workflow Strategy determines how the steps are processed within a Job's Workflow.

- [Ruleset (Commercial)](/manual/jobs/workflow-strategies/ruleset.md)

## Node Orchestrator

Typically, Rundeck processes nodes in the exact order that they are specified within a Job definition. An *Orchestrator Plugin* allows this run order to be modified by selecting a subset of nodes. This would be useful in order to limit concurrent executions during a deployment or gradually role out a new job to allow for testing.

The Bundled plugins support random selection, ordering by ranked tier, or specifying a percentage of nodes to target. If more logic or specificity is required, the Enterprise edition supports the selection of a single node based upon the value of an attribute.

- [Highest/Lowest Attribute Value (Commercial)](/manual/orchestrator-plugins/highest-lowest.md)
- [Bundled Orchestrator Plugins](/manual/orchestrator-plugins/bundled.md)

## Log Filters

Log Filters can transform or aggregate output from one or more Workflow states.

- [Mask Passwords](/manual/log-filters/mask-passwords.md)
- [Render Formatted Data](/manual/log-filters/render-formatted-data.md)
- [Key Value Data](/manual/log-filters/key-value-data.md)
- [Quiet Output](/manual/log-filters/quiet-output.md)
- [Highlight Output](/manual/log-filters/highlight-output.md)
- [Progress Badge](/manual/log-filters/progress-badge.md)
- [Store and Validate JSON (Commercial)](/manual/log-filters/loop-plugins.md)

## Content Converters

Content Converters are not added directly to Jobs, but can be used by Log Filters and Step plugins to render log output as HTML or Markdown within the Rundeck User Interface.

See [Content Converter Plugins](/manual/content-converters/index.md).

## Execution Lifecycle

See [Execution Lifecycle Plugins](/manual/execution-lifecycle/index.md).
