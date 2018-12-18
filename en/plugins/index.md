% Rundeck Plugins

This document lists the plugins **distributed with Rundeck and Rundeck Pro**.

More plugins can be found via:

* [Rundeck.org plugins listing](https://rundeck.org/plugins/)
* [The official rundeck-plugins](https://github.com/rundeck-plugins/) org on github
* [Github Search: rundeck](https://github.com/search?p=3&q=rundeck&type=Repositories)
* [Github topic: `rundeck`](https://github.com/topics/rundeck)

Type|Plugin|Description|Availability
----|----|--------|----
Node Step | [Command][page:manual/node-steps/builtin.md#command-step] | Calls system commands on remote nodes | Built-in
Node Step | [Script][page:manual/node-steps/builtin.md#script-step] | Executes script contents | Built-in
Node Step | [Script File][page:manual/node-steps/builtin.md#script-file-step] | Executes script files | Built-in
Node Step | [Script URL][page:manual/node-steps/builtin.md#script-url-step] | Downloads and executes scripts from URLs | Built-in
Node Step | [Job Reference][page:manual/node-steps/builtin.md#job-reference-step] | Calls other jobs | Built-in
Node Step | [Copy File][page:manual/node-steps/builtin.md#copy-file-step] | Copies a file to a remote node | Built-in
Node Step | [Local Command][page:manual/node-steps/builtin.md#local-command-step] | Execute system commands locally | Built-in
Node Step | [Data Node][page:manual/node-steps/builtin.md#data-node-step] | Produces data values for a node | Built-in
Node Step | [Jira][page:manual/node-steps/jira.md] | Creates or updates Jira issues | Pro
Node Step | [SQL Runner][page:manual/node-steps/sqlrunner.md] | Executes SQL scripts against JDBC URLs | Pro
Node Step | [VMware][page:manual/node-steps/vmware.md] | Controls VMware VMs' power state | Pro
Workflow Step | [Ansible module][page:manual/workflow-steps/builtin.md#ansible-module] | Runs Ansible modules | Built-in
Workflow Step | [Ansible playbook inline][page:manual/workflow-steps/builtin.md#ansible-playbook-inline] | Runs Ansible playbooks inline | Built-in
Workflow Step | [Ansible playbook][page:manual/workflow-steps/builtin.md#ansible-playbook] | Runs Ansible playbooks | Built-in
Workflow Step | [Global variable][page:manual/workflow-steps/builtin.md#global-variable] | | Built-in
Workflow Step | [Flow control][page:manual/workflow-steps/builtin.md#flow-control] | | Built-in
Workflow Step | [Job state conditional][page:manual/workflow-steps/builtin.md#job-state-conditional] | | Built-in
Workflow Step | [Log data step][page:manual/workflow-steps/builtin.md#log-data-step] | | Built-in
Workflow Step | [Refresh project nodes][page:manual/workflow-steps/builtin.md#refresh-project-nodes] | | Built-in
Workflow Step | [Data step][page:manual/workflow-steps/builtin.md#data-step] | | Built-in
Workflow Step | [Jira][page:manual/workflow-steps/jira.md] | Creates or updates Jira issues | Pro
Workflow Step | [File Transfer][page:manual/workflow-steps/file-transfer.md] | Transfers files via FTP, SFTP or HTTP | Pro
Workflow Step | [Github][page:manual/workflow-steps/github.md] | Runs scripts from a GitHub repo | Pro
Workflow Step | [Progress Badge][page:manual/workflow-steps/progress-badge.md#progress-badge-workflow-step-plugin] | Create graphic badges in log output | Pro
Workflow Step | [ServiceNow][page:manual/workflow-steps/servicenow.md] | Creates or modifies ServiceNow cases | Pro
Workflow Step | [VMware][page:manual/workflow-steps/vmware.md] | Creates or modifies VMware VMs | Pro
Notifications | [Email][page:manual/notifications/email.md] | Sends emails when a job finishes | Built-in
Notifications | [Webhooks][page:manual/notifications/webhooks.md] | Sends HTTP POST data to a URL when a job finishes | Built-in
Notifications | [Jira][page:manual/notifications/jira.md] | Creates or modifies Jira issues when a job finishes | Pro
Workflow Strategy | [Ruleset][page:manual/workflow-strategies/ruleset.md] | Defines rules for when steps in a workflow should run | Pro
Node Orchestrator | [Random Subset][page:manual/orchestrator-plugins/bundled.md#random-subset] | Selects a maximum number of the target nodes at random | Built-in
Node Orchestrator | [Ranked Tiered][page:manual/orchestrator-plugins/bundled.md#ranked-tired] | Processes nodes in a tiered manner, ordered by rank | Built-in
Node Orchestrator | [Max Percentage][page:manual/orchestrator-plugins/bundled.md#max-percentage] | Processes at maximum a percentage of the target nodes | Built-in
Node Orchestrator | [Highest/Lowest Attribute Value][page:manual/orchestrator-plugins/highest-lowest.md] | Picks one node with either the highest or lowest value of a certain attribute | Pro
Log Filter | [Mask Passwords][page:manual/log-filters/mask-passwords.md] | Masks secure input option values from being emitted in the logs | Built-in
Log Filter | [Render Formatted Data][page:manual/log-filters/render-formatted-data.md] | Allows marking formatted data as a certain data type | Built-in
Log Filter | [Key-Value Data][page:manual/log-filters/key-value-data.md] | Captures key/value data | Built-in
Log Filter | [Quiet Output][page:manual/log-filters/quiet-output.md] | Supresses patterns of output | Built-in
Log Filter | [Highlight Output][page:manual/log-filters/highlight-output.md] | Highlights patterns of output | Built-in
Log Filter | [Progress Badge][page:manual/log-filters/progress-badge.md] | Create graphic badges in log output | Pro
Content Converter | [HTML Table View][page:manual/content-converters/html-table-view.md] | Renders structured data as a HTML tables | Built-in
Content Converter | [HTML View][page:manual/content-converters/html-view.md] | Renders embedded HTML | Built-in
Content Converter | [JSON Data][page:manual/content-converters/json.md] | Parses JSON into a Java object | Built-in
Content Converter | [Markdown][page:manual/content-converters/markdown.md] | Renders Markdown as HTML | Built-in
Content Converter | [Properties][page:manual/content-converters/properties.md] | Parses Java style Properties data into a Java object | Built-in
Content Converter | [Tabular Data][page:manual/content-converters/tabular-data.md] | Parses Tabular text (csv) into a a Java object | Built-in
Log Storage | [Azure Storage][page:administration/cluster/logstore/azure.md] | Stores log files in Azure Storage | Community
Log Storage | [Amazon S3][page:administration/cluster/logstore/s3.md] | Stores log files in Amazon S3 | Community
Node Execution | [Node Execution][page:administration/projects/node-execution/builtin.md] | | Built-in
Node Execution | [Script][page:administration/projects/node-execution/script.md] | Uses a script to execute commands on remote nodes | Built-in
Node Execution | [SSH][page:administration/projects/node-execution/ssh.md] | Uses SSH to execute commands on remote nodes | Built-in
Node Execution | [Powershell][page:administration/projects/node-execution/powershell.md] | Uses PowerShell to execute commands on remote nodes | Pro
Node Execution | [SSH Bastion][page:administration/projects/node-execution/bastionssh.md] | Provides a node-executor and file-copier supporting ssh actions through a bastion host | Community 
Node Execution | [OpenSSH][page:administration/projects/node-execution/openssh.md] | Provides a node-executor and file-copier using OpenSSH | Built-in
Resource Model Source | [Resource Model Source][page:administration/projects/resource-model-sources/builtin.md] | | Built-in
Resource Model Source | [Resource Editor][page:administration/projects/resource-model-sources/resource-editor.md] | | Built-in
Resource Model Source | [AWS][page:administration/projects/resource-model-sources/aws.md] | Populates your nodes from EC2 | Community
Resource Model Source | [Azure][page:administration/projects/resource-model-sources/azure.md] | Populates your nodes from Azure | Community
Resource Model Source | [ServiceNow][page:administration/projects/resource-model-sources/servicenow.md] | Populates your nodes from ServiceNow's CMDB | Pro
Resource Model Source | [VMware][page:administration/projects/resource-model-sources/vmware.md] | Populates your nodes from a VSphere ESXi server or VCenter Server | Pro
Resource Format | [XML][page:manpages/man5/resource-v13.md] | XML Format for Resource Models | Built-in
Resource Format | [YAML][page:manpages/man5/resource-yaml-v13.md] | YAML Format for Resource Models | Built-in
Resource Format | [JSON][page:manpages/man5/resource-json-v10.md] | JSON Format for Resource Models | Built-in
SCM | [Git][page:administration/projects/scm/git.md] | Imports or exports jobs from a Git repository | Community
SCM | [Job Replication][page:administration/projects/scm/job-replication.md] | Replicates job state between Rundeck Cluster instances | Pro
SSO | [Okta][page:administration/security/sso.md] | Allows you to use Okta to log into Rundeck | Pro
Storage Converter | [Encyption][page:administration/configuration/plugins/bundled-plugins.md#jasypt-encryption-plugin] | Encrypts Key Storage and Project configuration data | Built-in
