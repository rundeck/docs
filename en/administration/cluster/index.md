% Rundeck Pro Cluster

## Rundeck architecture
![Rundeck architecture](https://docs.rundeck.com/docs/figures/architecture.png)

## Installation
To install a Rundeck Pro Cluster instance, go to the [Installation Guide](https://docs.rundeck.com/docs/administration/install)


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

Go to the: [Loadbalancer Guide](https://docs.rundeck.com/docs/administration/cluster/loadbalancer/index.html) for more details.

### Log Storage
All Cluster members must share the log storage. 

See: [Logstore](https://docs.rundeck.com/docs/administration/cluster/logstore/index.html)


### Authentication
The cluster environment needs a common authentication method, in order all the instances can login with the same list of users/groups
Rundeck PRO has the following options:

* LDAP/AD authentication
* OAuth 2 (preauthentication mode or Okta).

Go to the [Authenticaing Users](https://docs.rundeck.com/docs/administration/security/authenticating-users.html) document for more details.

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
