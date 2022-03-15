# Rundeck Cloud - Job Execution

## Running scripts/automation behind the firewall

Rundeck Cloud requires the deployment of a Cloud Runner (a small java process) in the customer environment behind the firewall. The Cloud Runner connects to Rundeck Cloud on a secure outbound connection to retrieve a list of automation tasks and scripts, which it will carry out in the customer environment.

## Job execution

Plugin job steps generally execute in Rundeck Cloud. However, job steps that implement local NodeExecutor or FileCopier are delegated to execute on the Runner automatically. If a Runner is not configured these "local" steps will fail. Runners that match the node filter target will assume the role of the local node.  

## APIs available in Rundeck Cloud

The highest privilege access for the APIs will be api keys with AppAdmin access. This means that APIs around content creation will be available (project, job, node etc), while APIs around infrastructure and configuration tasks will not be accessible.

## Key Storage

Currently, Rundeck Cloud can only connect to Cloud based keystore providers (Vault, Thycotic, CyberArk have SaaS solutions) with Rundeck Cloud keystore plugins. Rundeck Cloud keystore plugins have no connectivity to on-premise keystores.

## Runner administration
[Read the Runner docs](docs/administration/runner/index.md) about how to install, configure and manage the Runner  

