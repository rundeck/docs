# Rundeck Cloud - Job Execution

## Running scripts/automation behind the firewall

Rundeck Cloud requires the deployment of a Cloud Runner (a small java process) in the customer environment behind the firewall. The Cloud Runner connects to Rundeck Cloud on a secure outbound connection to retrieve a list of automation tasks and scripts, which it will carry out in the customer environment.

## Local execution

Local job and command execution is disabled along with any plugins that require it.

## APIs available in Rundeck Cloud

The highest privilege access for the APIs will be users/api keys with AppAdmin access. This means that APIs around content creation will be available (project, job, node etc), while APIs around infrastructure and configuration tasks will not be accessible.

## Key Storage

Currently, Rundeck Cloud can only connect to Cloud based keystore providers (Vault, Thycotic, CyberArk have SaaS solutions) with Rundeck Cloud keystore plugins. Rundeck Cloud keystore plugins have no connectivity to on-premise keystores.

## Cloud Runner operation

- **Rundeck Cloud Runner output and logs management**
The Cloud Runner will log locally on the machine where it is installed. There are also logs and output that are logged in the Rundeck Cloud account. The Cloud Runner caches log output locally until it can be  forwarded to Rundeck Cloud.
- **How frequently are the Cloud Runners updated?**
Customers will need a plan to keep Cloud Runner binaries up to date and not lag more than 6 months behind the Rundeck Cloud release. Rundeck Cloud is being updated once a month and we plan to maintain compatibility with the previous and current major version of the Cloud Runners. Older versions of the Cloud Runner may work with Rundeck Cloud but will not be supported. For example: If Rundeck Cloud is on version 4.1.2, we will support and maintain compatibility with Cloud Runner version 4.x.x and 3.8.10 (assuming this is the last version released under the - 3.x major version).
- **Can the Rundeck Cloud Runner participate in node discovery?**
Not out of the box, but it is possible with some custom scripting and using the APIs https://docs.rundeck.com/docs/api/rundeck-api.html#updating-and-listing-resources-for-a-project it is possible to update the node lists remotely in Rundeck Cloud. Currently Node Discovery is managed by Rundeck Cloud and not the Cloud Runner.
- **Can we run multiple Cloud Runners on the same machine?**
Yes, multiple runners can be configured for the same project. If multiple runners have the same node scope, they race to retrieve the relevant task list. Multiple runners can be used to increase scale or add more redundancy in the automation architecture.
