# Cluster Overview

::: enterprise
:::

## Process Automation Architecture
![Process Automation architecture](~@assets/img/SingleCluster.png)

## Installation
To install a new Process Automation instance, download the latest version from [here](https://www.rundeck.com/downloads), and review requirements and deployment steps in the <a href="/docs/files/pa-deployment-guide.pdf" download>Cluster Deployment Guide</a>.

## Requirements
The Process Automation environment needs the following shared resources:

### Database
- All the cluster instances must share the same DB:

  See: [Database Backends](/administration/configuration/database/index.md).

- The keys and project data must be stored in the DB (enabled by default since 2.4.x):

  See: [Storage Facility](/administration/configuration/storage-facility.md)

### Load Balancer
A load balancer allows you to achieve high availability in your Process Automation installation by routing http traffic across several redundant Process Automation instances.

- Set the `grails.serverURL` parameter of all cluster members (`rundeck-config.properties`) with the LB URL.

- Use Sticky session

See: [Loadbalancer](/administration/cluster/loadbalancer/index.md)

### Log Storage
All Cluster instances must share the same storage location for execution logs.

See: [Logstore](/administration/cluster/logstore/index.md)

**Note**: If you use the [S3 Log Storage Plugin](/administration/cluster/logstore/s3.md) Be sure to use `com.rundeck.rundeckpro.amazon-s3` in place of `org.rundeck.amazon-s3`. It adds the additional feature:

- _Checkpoint log storage_: This enables viewing the execution logs while the execution is running.

### Authentication
The cluster environment needs a common authentication method. All the instances must have access to the same list of users/groups

See: [Authenticating Users](/administration/security/authentication.md)

### Resource Model
Projects need a common resource model that can be accessed from all cluster members. These are some of the alternatives to achieve this:

- A shared file system
- A script
- A REST endpoint

See: [Node Model Sources](/manual/projects/resource-model-sources/index.md)

## Features:

### Autotakeover
Scheduled jobs are owned by the last cluster member who modified them. Jobs can also be controlled using Cluster Manager. If a cluster member goes down, all scheduled jobs on that cluster member must be moved to another cluster node. This process can be performed automatically using the heartbeat and Autotakeover features in Process Automation version 2.1.0 and later releases.

See: [Autotakeover](/administration/cluster/autotakeover/index.md)

### Cluster Remote Execution Policy
This feature allows Process Automation cluster members to forward job executions to other cluster members based on a policy configuration.

See: [Remote Job Execution](/administration/configuration/remote-job-execution.md)

### Process Automation Replication
This plugin is used for an active/passive configuration. Each cluster member can have its own database.

See [Process Automation Replication](/administration/cluster/replication/index.md)

<a href="/docs/files/pa-deployment-guide2.pdf" download>2</a> <a href="/files/pa-deployment-guide.pdf" download>1</a>