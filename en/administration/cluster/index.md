% Rundeck Pro Cluster

![Rundeck architecture](https://docs.rundeck.com/docs/figures/architecture.png)

## Installation

To install a Rundeck Pro Cluster instance see the [Installation guide](https://docs.rundeck.com/docs/administration/install)


## Requirements

Rundeck cluster environment needs the following shared resources


### Database 

Rundeck Pro Cluster requires that all the cluster members share the same DB:

[Setting RDB Datasource](https://docs.rundeck.com/docs/administration/configuration/database/index.html)

Also, the keys and project data must be stored in the DB (enabled by default since 2.4.x):

See [Storage Facility](https://docs.rundeck.com/docs/administration/configuration/storage-facility.html)


### Load Balancer

To configure the LB it is necessary: 

* Set the `grails.serverURL` parameter of all cluster members (`rundeck-config.properties`) with the LB URL.

* Use Sticky session

Further information [here](https://docs.rundeck.com/docs/administration/cluster/loadbalancer/index.html)

https://docs.rundeck.com/docs/administration/cluster/loadbalancer/index.html

### Log Storage

All Cluster members must share the log storage see

https://docs.rundeck.com/docs/administration/cluster/logstore/index.html

[Logstore](https://docs.rundeck.com/docs/administration/cluster/logstore/index.html)


### Authentication

The cluster environment needs a common authentication method, in order all the instances can login with the same list of users/groups
Rundeck PRO has the following options:

* LDAP/AD authentication
* OAuth 2 (preauthentication mode or Okta).

Further information [here](https://docs.rundeck.com/docs/administration/security/authenticating-users.html)


### Resource Model

Each project will need a common place where define the list of nodes that the project will use.
This can be reached for example with:

 * a shared folder
 * [S3 plugin](https://github.com/rundeck-plugins/aws-s3-model-source)
 * [Azure plugin](https://github.com/rundeck-plugins/rundeck-azure-plugin)
 * [Git plugin](https://github.com/rundeck-plugins/git-resource-model)
 * a script, 
 * a REST endpoint, etc.

Further information [Managing Node Sources](http://rundeck.org/docs/administration/managing-node-sources.html).

## Features:

### Autotakeover

https://docs.rundeck.com/docs/administration/cluster/autotakeover/index.html

### Cluster Remote Execution Policy

https://docs.rundeck.com/docs/administration/configuration/remote-job-execution-pro.html
