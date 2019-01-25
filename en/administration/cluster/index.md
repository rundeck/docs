% Rundeck Pro Cluster

## Rundeck Pro Cluster Architecture
![Rundeck architecture](https://docs.rundeck.com/docs/figures/architecture.png)

## Installation
To install a Rundeck Pro Cluster instance, download the lastest version from [here](https://download.rundeck.com/versions.html), and follow the steps in the [Installation Guide](https://docs.rundeck.com/docs/administration/install)

## Requirements
Rundeck cluster environment needs the following shared resources:


### Database 
* Rundeck Pro Cluster requires that all the cluster members share the same DB:

  See: [Database Backends](https://docs.rundeck.com/docs/administration/configuration/database/index.html)

* The keys and project data must be stored in the DB (enabled by default since 2.4.x):

  See: [Storage Facility](https://docs.rundeck.com/docs/administration/configuration/storage-facility.html)


### Load Balancer
A loadbalancer allows you to achieve high availability in your Rundeck Pro installation by routing http traffic across several redundant Rundeck Pro instances.

* Set the `grails.serverURL` parameter of all cluster members (`rundeck-config.properties`) with the LB URL.

* Use Sticky session

See: [Loadbalancer Guide](https://docs.rundeck.com/docs/administration/cluster/loadbalancer/index.html)

### Log Storage
All Cluster members must share the log storage. 

See: [Logstore](https://docs.rundeck.com/docs/administration/cluster/logstore/index.html)


### Authentication
The cluster environment needs a common authentication method. All the instances must have access to the same list of users/groups

See: [Authenticating Users](https://docs.rundeck.com/docs/administration/security/authenticating-users.html) 

### Resource Model
Projects need a common resource model that can be accessed from all cluster members. These are some of the alternatives to achieve this: 

 * A shared file system
 * A script 
 * A REST endpoint

See: [Node Model Sources](http://rundeck.org/docs/administration/managing-node-sources.html)

## Features:

### Autotakeover
Scheduled jobs are owned by the last cluster member who modified them. Jobs can also be controlled using Cluster Manager. If a cluster member goes down, all scheduled jobs on that cluster member must be moved to another cluster node. This process can be performed automatically using the heartbeat and Autotakeover features in Rundeck Pro version 2.1.0 and later releases.

See: [Autotakeover Configuration](https://docs.rundeck.com/docs/administration/cluster/autotakeover/index.html)

### Cluster Remote Execution Policy
This feature allows Rundeck Pro cluster members to forward job executions to other cluster members based on a policy configuration.

See: [Cluster Remote Execution Policy](https://docs.rundeck.com/docs/administration/configuration/remote-job-execution-pro.html)
