---
sidebar: false
---
# Rundeck Plugins

---

This document lists the plugins **distributed with Rundeck and Rundeck Enterprise**.

Also see: [Plugin Development Guide](/developer/index.md).

More plugins can be found via:

* [Rundeck.org plugins listing](https://rundeck.org/plugins/)
* [The official rundeck-plugins](https://github.com/rundeck-plugins/) org on github
* [Github Search: rundeck](https://github.com/search?p=3&q=rundeck&type=Repositories)
* [Github topic: `rundeck`](https://github.com/topics/rundeck)

***Note: We are releasing new plugins all the time. This list may not fully list all included plugins.  If you find one missing let us know!***

Type|Plugin|Description|Availability
----|----|--------|----
Node Step | [Command](/manual/node-steps/builtin.md#command-step) | Calls system commands on remote nodes | Built-in
Node Step | [Script](/manual/node-steps/builtin.md#script-step) | Executes script contents | Built-in
Node Step | [Script File](/manual/node-steps/builtin.md#script-file-step) | Executes script files | Built-in
Node Step | [Script URL](/manual/node-steps/builtin.md#script-url-step) | Downloads and executes scripts from URLs | Built-in
Node Step | [Job Reference](/manual/node-steps/builtin.md#job-reference-step) | Calls other jobs | Built-in
Node Step | [Copy File](/manual/node-steps/builtin.md#copy-file-step) | Copies a file to a remote node | Built-in
Node Step | [Local Command](/manual/node-steps/builtin.md#local-command-step) | Execute system commands locally | Built-in
Node Step | [Data Node](/manual/node-steps/builtin.md#data-node-step) | Produces data values for a node | Built-in
Node Step | [Jira](/manual/node-steps/jira.md) | Creates or updates Jira issues | Enterprise
Node Step | [SQL Runner](/manual/node-steps/sqlrunner.md) | Executes SQL scripts against JDBC URLs | Enterprise
Node Step | [VMware](/manual/node-steps/vmware.md) | Controls VMware VMs' power state | Enterprise
Workflow Step | [Ansible module](/manual/workflow-steps/builtin.md#ansible-module) | Runs Ansible modules | Built-in
Workflow Step | [Ansible playbook inline](/manual/workflow-steps/builtin.md#ansible-playbook-inline) | Runs Ansible playbooks inline | Built-in
Workflow Step | [Ansible playbook](/manual/workflow-steps/builtin.md#ansible-playbook) | Runs Ansible playbooks | Built-in
Workflow Step | [Global variable](/manual/workflow-steps/builtin.md#global-variable) | Defines a global variable that can be used across all job steps | Built-in
Workflow Step | [Flow control](/manual/workflow-steps/builtin.md#flow-control) | Allows you to control the flow of a job by printing a status between job steps or halting | Built-in
Workflow Step | [Job state conditional](/manual/workflow-steps/builtin.md#job-state-conditional) | Allows you to only run a job based on the execution status of another job | Built-in
Workflow Step | [Log data step](/manual/workflow-steps/builtin.md#log-data-step) | Allows you to log all the context data values and view them in a table. | Built-in
Workflow Step | [Refresh project nodes](/manual/workflow-steps/builtin.md#refresh-project-nodes) | Allows you to refresh all of the nodes in a project | Built-in
Workflow Step | [Data step](/manual/workflow-steps/builtin.md#data-step) | produces data values for the current node | Built-in
Workflow Step | [Jira](/manual/workflow-steps/jira.md) | Creates or updates Jira issues | Enterprise
Workflow Step | [File Transfer](/manual/workflow-steps/file-transfer.md) | Transfers files via FTP, SFTP or HTTP | Enterprise
Workflow Step | [Github](/manual/workflow-steps/github.md) | Runs scripts from a GitHub repo | Enterprise
Workflow Step | [Progress Badge](/manual/workflow-steps/progress-badge.md#progress-badge-workflow-step-plugin) | Create graphic badges in log output | Enterprise
Workflow Step | [ServiceNow](/manual/workflow-steps/servicenow.md) | Creates or modifies ServiceNow&reg; cases | Enterprise
Workflow Step | [VMware](/manual/workflow-steps/vmware.md) | Creates or modifies VMware VMs | Enterprise
Notifications | [Email](/manual/notifications/email.md) | Sends emails when a job finishes | Built-in
Notifications | [Webhooks](/manual/notifications/webhooks.md) | Sends HTTP POST data to a URL when a job finishes | Built-in
Notifications | [Jira](/manual/notifications/jira.md) | Creates or modifies Jira issues when a job finishes | Enterprise
Notifications | [ServiceNow](/manual/notifications/servicenow.md) | Comment or Create an Incident on ServiceNow&reg; | Enterprise
Workflow Strategy | [Ruleset](/manual/workflow-strategies/ruleset.md) | Defines rules for when steps in a workflow should run | Enterprise
Node Orchestrator | [Random Subset](/manual/orchestrator-plugins/bundled.md#random-subset) | Selects a maximum number of the target nodes at random | Built-in
Node Orchestrator | [Ranked Tiered](/manual/orchestrator-plugins/bundled.md#ranked-tired) | Processes nodes in a tiered manner, ordered by rank | Built-in
Node Orchestrator | [Max Percentage](/manual/orchestrator-plugins/bundled.md#max-percentage) | Processes at maximum a percentage of the target nodes | Built-in
Node Orchestrator | [Highest/Lowest Attribute Value](/manual/orchestrator-plugins/highest-lowest.md) | Picks one node with either the highest or lowest value of a certain attribute | Enterprise
Log Filter | [Mask Passwords](/manual/log-filters/mask-passwords.md) | Masks secure input option values from being emitted in the logs | Built-in
Log Filter | [Render Formatted Data](/manual/log-filters/render-formatted-data.md) | Allows marking formatted data as a certain data type | Built-in
Log Filter | [Key-Value Data](/manual/log-filters/key-value-data.md) | Captures key/value data | Built-in
Log Filter | [Quiet Output](/manual/log-filters/quiet-output.md) | Supresses patterns of output | Built-in
Log Filter | [Highlight Output](/manual/log-filters/highlight-output.md) | Highlights patterns of output | Built-in
Log Filter | [Progress Badge](/manual/log-filters/progress-badge.md) | Create graphic badges in log output | Enterprise
Content Converter | [HTML Table View](/manual/content-converters/html-table-view.md) | Renders structured data as a HTML tables | Built-in
Content Converter | [HTML View](/manual/content-converters/html-view.md) | Renders embedded HTML | Built-in
Content Converter | [JSON Data](/manual/content-converters/json.md) | Parses JSON into a Java object | Built-in
Content Converter | [Markdown](/manual/content-converters/markdown.md) | Renders Markdown as HTML | Built-in
Content Converter | [Properties](/manual/content-converters/properties.md) | Parses Java style Properties data into a Java object | Built-in
Content Converter | [Tabular Data](/manual/content-converters/tabular-data.md) | Parses Tabular text (csv) into a a Java object | Built-in
Log Storage | [Azure Storage](/administration/cluster/logstore/azure.md) | Stores log files in Azure Storage | Community
Log Storage | [Amazon S3](/administration/cluster/logstore/s3.md) | Stores log files in Amazon S3 | Community
Node Execution | [Node Execution](/manual/projects/node-execution/builtin.md) | | Built-in
Node Execution | [Script](/manual/projects/node-execution/script.md) | Uses a script to execute commands on remote nodes | Built-in
Node Execution | [SSH](/manual/projects/node-execution/ssh.md) | Uses SSH to execute commands on remote nodes | Built-in
Node Execution | [Powershell](/manual/projects/node-execution/powershell.md) | Uses PowerShell to execute commands on remote nodes | Enterprise
Node Execution | [SSH Bastion](/manual/projects/node-execution/bastionssh.md) | Provides a node-executor and file-copier supporting ssh actions through a bastion host | Community
Node Execution | [OpenSSH](/manual/projects/node-execution/openssh.md) | Provides a node-executor and file-copier using OpenSSH | Built-in
Resource Model Source | [Resource Model Source](/manual/projects/resource-model-sources/builtin.md) | Imports nodes from a source | Built-in
Resource Model Source | [Resource Editor](/manual/projects/resource-model-sources/resource-editor.md) | Allows you to edit nodes in a text editor | Built-in
Resource Model Source | [AWS](/manual/projects/resource-model-sources/aws.md) | Populates your nodes from EC2 | Community
Resource Model Source | [Azure](/manual/projects/resource-model-sources/azure.md) | Populates your nodes from Azure | Community
Resource Model Source | [ServiceNow](/manual/projects/resource-model-sources/servicenow.md) | Populates your nodes from ServiceNow's&reg;CMDB | Enterprise
Resource Model Source | [VMware](/manual/projects/resource-model-sources/vmware.md) | Populates your nodes from a VSphere ESXi server or VCenter Server | Enterprise
Resource Format | [XML](/manual/document-format-reference/resource-v13.md) | XML Format for Resource Models | Built-in
Resource Format | [YAML](/manual/document-format-reference/resource-yaml-v13.md) | YAML Format for Resource Models | Built-in
Resource Format | [JSON](/manual/document-format-reference/resource-json-v10.md) | JSON Format for Resource Models | Built-in
SCM | [Git](/manual/projects/scm/git.md) | Imports or exports jobs from a Git repository | Community
SCM | [Job Replication](/manual/projects/scm/job-replication.md) | Replicates job state between Rundeck Cluster instances | Enterprise
SSO | [Okta](/administration/security/sso.md) | Allows you to use Okta to log into Rundeck | Enterprise
Storage Converter | [Encyption](/administration/configuration/plugins/bundled-plugins.md#jasypt-encryption-plugin) | Encrypts Key Storage and Project configuration data | Built-in
Webhook | [Run Job](/manual/webhooks/run-job.md) | Runs a job when a webhook event is received | Built In
Webhook | [Routing Run Job](./webhooks/routing-run-job.md) | Advanced rule processing of webhook event data to run jobs. | Enterprise
