---
title: "Runner plugins"
---
# Enterprise Runner - Remote plugins available on the Runner
The following plugins are available in the next generation Runners:
 
::: tabs
@tab Node Executors
- local
- sshj-ssh
- ssh-exec
- com.batix.rundeck.plugins.AnsibleNodeExecutor
- WinRMPython
- docker-container-node-executor
- Kubernetes-node-executor

@tab File Copiers
- ssh-copier
- sshj-scp
- com.batix.rundeck.plugins.AnsibleFileCopier
- WinRMcpPython
- docker-container-file-copier
- Kubernetes-file-copier

@tab Node Steps
- nixy-local-node-step
- nixy-waitfor-dir-exists
- nixy-waitfor-contains
- nixy-waitfor-file-exists
- nixy-waitfor-file-size
- nixy-waitfor-http
- nixy-waitfor-munin
- nixy-waitfor-ping
- nixy-waitfor-port-open
- nixy-waitfor-sleep-workflow-node-step
- nixy-waitfor-local-ping
- nixy-waitfor-local-port-open
- nixy-command-try-until
- nixy-file-contains
- nixy-file-dos2unix
- nixy-file-exists
- nixy-file-not-exists
- nixy-file-rotate
- nixy-file-truncate
- com.batix.rundeck.plugins.AnsiblePlaybookInlineWorkflowNodeStep
- com.batix.rundeck.plugins.AnsiblePlaybookWorflowNodeStep
- edu.ohio.ais.rundeck.HttpWorkflowNodeStepPlugin
- puppet-apply-step
- azure-storage-cp-step
- azure-storage-sync-step
- azure-storage-ls-step
- azure-storage-rm-step
- aws-cli-s3-cp-step
- aws-cli-s3-mv-step
- aws-cli-s3-sync-step
- aws-cli-s3-ls-step
- aws-cli-s3-rm-step
- aws-cli-s3-mb-step
- aws-cli-s3-rb-step
- docker-container-execute-command
- docker-container-inspect-workflow-step
- docker-container-pause-step
- docker-container-unpause-step
- docker-container-kill-step
- docker-container-stats-step
- docker-run-workflow-step
- Kubernetes-Create-Deployment
- Kubernetes-Update-Deployment
- Kubernetes-Delete-Deployment
- Kubernetes-Status-Deployment
- Kubernetes-Wait-Deployment
- Kubernetes-Wait-StatefulSet
- Kubernetes-Create
- Kubernetes-Delete
- Kubernetes-Create-Service
- Kubernetes-Update-Service
- Kubernetes-Delete-Service
- Kubernetes-Create-Job
- Kubernetes-Delete-Job
- Kubernetes-Run-Job
- Kubernetes-Wait-Job
- Kubernetes-Pods-Logs
- Kubernetes-Create-Pod
- Kubernetes-Delete-Pod
- Kubernetes-Wait-Pod
- Kubernetes-Execute-Step
- Kubernetes-InlineScript-Step
- SQLRunnerNodeStepPlugin
- vmware-vm-powerops
- script-file-command
- filetransfer

@tab Workflow Steps
- com.batix.rundeck.plugins.AnsiblePlaybookWorkflowStep
- com.batix.rundeck.plugins.AnsiblePlaybookInlineWorkflowStep
- com.batix.rundeck.plugins.AnsibleModuleWorkflowStep
- nixy-local-workflow-step
- nixy-waitfor-sleep-workflow-step
- nixy-waitfor-sleep
- WinRMCheck
- github-script-step
- vmware-vm-clone
- vmware-vm-clone-template
- vmware-vm-create
- vmware-vm-customize
- vmware-vm-reconfig

@tab Node Source
- Ansible Inventory
- VMware 
- Kubernetes Pods 
- Docker Containers
- File Resource Model
- Script Resource Model
@tab Key Storage
- cyberark-storage
- thycotic-storage
- vault-storage
:::
