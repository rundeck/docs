# Rundeck Cloud

## What is Rundeck Cloud?
Rundeck Cloud is a fully managed SaaS providing online secure access to the latest commercial Rundeck featureset.
## Who is Rundeck Cloud for?
Companies adopting cloud are looking for ways to stay nimble while improving system availability, quality of operations, and keeping control over costs. This is leading companies to centralize their cloud infrastructure operations into platform engineering and SRE teams that standardize and automate procedures for provisioning infrastructure and collaboration between teams.
## What problem does Rundeck Cloud solve?
Cloud engineering and SRE teams prefer consuming tooling and automation as a Service so they can be focused on building and managing core mission critical applications and systems. Rundeck Cloud eliminates the work required for managing automation infrastructure.
## What are the key values of Rundeck Cloud?
- **Easy integration with Cloud Services**
Receiving events from external providers into Rundeck do not have to open their firewalls for inbound notifications.
- **Start in minutes**
Immediate access to a dedicated Rundeck without needing to provision, install or manage infrastructure or software.
- **Automatic Updates**
Rundeck Cloud will be updated without any effort. No need to worry about coordinating and verifying upgrades.
- **Built for Availability**  
Rundeck Cloud will manage all aspects of high availability and reliability. You don’t have to invest time in configuring the redundancy, load balancing, data layer or monitoring the Rundeck Cluster environment. Rundeck Cloud is built upon PagerDuty’s decade of experience in providing a resilient SaaS environment.
- **Scale on demand**
Rundeck Cloud will manage resources for you. Accounts can be scaled horizontally or vertically ondemand, without needing to manage or change the infrastructure.
- **Hardened Security**
Rundeck Cloud will take care of security patching,protection, monitoring, and ensuring compliance with industry standards.
## How is Rundeck Cloud different than Rundeck Enterprise?
Rundeck Cloud and Rundeck Enterprise are 99% the same in terms of their software featureset. However, there are differences stemming from the different deployment architectures. The following are key differences to be aware of:
- **User Roles**
In Rundeck Cloud the Opsadmin and FullAdmin roles are not available to the user account. The highest privileged user role is the AppAdmin which allows full access to manage content (like projects, jobs, node sources etc) but cannot change any infrastructure configuration for the customer account instance.
- **Job Execution**
Job Execution is carried out through the Cloud Runner, which is a component (small java process) that is deployed in the environment behind the firewall. Local execution inside Rundeck Cloud is disabled.
- **Plugins**
Rundeck Cloud ships with a fixed set of plugins that we deem safe to run in SaaS. At the moment, users are not able to deploy custom plugins or any additional community plugins. Some of the Rundeck Enterprise plugins are not available as well. The Enterprise plugins that are disabled include:
* Rundeck-ansible
* Rundeckpro-cyberark
* Openssh-node-execution
* Rundeck-copyfile-plugin
* Rundeck-localexec
* Rundeck-script-plugin
* NodeExecutor:
  - Local
* FileCopier:
  - Ssh-copier
  - Jsch-scp
  - Script-copy
* WorkflowNodeStep:
  - Nixy-waitfor-local-ping
  - Nixy-waitfor-local-port-open
  - Filetransfer
* ResourceModelSource:
  - File
  - Directory
  - Script
  - Local
* WorkflowStep:
  - github-script-step
