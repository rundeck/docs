% Rundeck Pro Cluster

## Rundeck Pro Cluster Architectur
![Rundeck architecture](../../figures/architecture.png)

## Installation
To install a Rundeck Pro Cluster instance, download the lastest version from [here](https://download.rundeck.com/versions.html), and follow the steps in the [Installation Guide][page:/en/administration/install/index.md]

## Requirements
Rundeck cluster environment needs the following shared resources:

### Database 
* Rundeck Pro Cluster requires that all the cluster members share the same DB:

  See: [Database Backends][page:administration/configuration/database/index.md].

* The keys and project data must be stored in the DB (enabled by default since 2.4.x):

  See: [Storage Facility][page:/administration/configuration/storage-facility.md]

### Load Balancer
A loadbalancer allows you to achieve high availability in your Rundeck Pro installation by routing http traffic across several redundant Rundeck Pro instances.

* Set the `grails.serverURL` parameter of all cluster members (`rundeck-config.properties`) with the LB URL.

* Use Sticky session

See: [Loadbalancer][page:administration/cluster/loadbalancer/index.md]

### Log Storage
All Cluster members must share the log storage. 

See: [Logstore][page:administration/cluster/logstore/index.md]

**Note**: If you use the [S3 Log Storage Plugin][administration/cluster/logstore/s3.md] Be sure to use `com.rundeck.rundeckpro.amazon-s3` in place of `org.rundeck.amazon-s3`. It adds the additional feature:

* *Checkpoint log storage*:  This enables viewing the execution logs while the execution is running.

### Authentication
The cluster environment needs a common authentication method. All the instances must have access to the same list of users/groups

See: [Authenticating Users][page:administration/security/authentication.md]

### Resource Model
Projects need a common resource model that can be accessed from all cluster members. These are some of the alternatives to achieve this: 

 * A shared file system
 * A script 
 * A REST endpoint

See: [Node Model Sources][page:docs/en/administration/projects/resource-model-sources/index.md]

## Features:

### Autotakeover
Scheduled jobs are owned by the last cluster member who modified them. Jobs can also be controlled using Cluster Manager. If a cluster member goes down, all scheduled jobs on that cluster member must be moved to another cluster node. This process can be performed automatically using the heartbeat and Autotakeover features in Rundeck Pro version 2.1.0 and later releases.

See: [Autotakeover][page:administration/cluster/autotakeover/index.md]

### Cluster Remote Execution Policy
This feature allows Rundeck Pro cluster members to forward job executions to other cluster members based on a policy configuration.

See: [Remote Job Execution][page:administration/configuration/remote-job-execution.md]
