% Install Rundeck Pro

## Requirements

Rundeck cluster environment needs the following shared resources

* A common database
* A common log storage
* A Load Balancer to have a single access point for the cluster environment.
* A common authentication method.
* A common resource model to define nodes for projects. 
  

## Install Rundeck PRO on Linux

* For Debian distributions check [here](../administration/install/ubuntudebian.html#rundeck-pro)

* For Redhat or Centos distributions check [here](../administration/install/centosredhat.html#rundeck-pro)


## Install Rundeck PRO on Windows

Further information [here](../administration/install/windows.html#install-rundeck-pro)

## Database 

Rundeck Pro Cluster requires that all the cluster members share the same DB:
 
[Setting RDB Datasource](http://rundeck.org/docs/administration/setting-up-an-rdb-datasource.html)
 
Also, you must store the keys and project data in the DB (enable by default since 2.4.x):
 
[Configure Project with RDB](http://rundeck.org/docs/administration/setting-up-an-rdb-datasource.html#configure-project-config-in-db)
 

## Load Balancer
 
Use a Load Balancer (LB) in front of the cluster members.
To configure the LB it is necessary: 

* Set the `grails.serverURL` parameter of all cluster members (`rundeck-config.properties`) with the LB URL.
 
* Use Sticky session

Further information [here](../administration/cluster/loadbalancer)


## Log Storage


All Cluster members must share the log storage, this can be achieved in two ways:

* Shared file system: You can set the shared file system path in the `framework.properties` file. (`framework.logs.dir`). This changes must be done in all the cluster members.
 
* Plugins: Using an Execution log storage plugin.
 
So far we have the following plugins for execution log storage:

* [S3 log storage plugin](https://github.com/rundeck-plugins/rundeck-s3-log-plugin). 
  This plugin works with any storage compatible with AWS S3 API, eg: S3, Minio, etc.
* [Azure log storage plugin](https://github.com/rundeck-plugins/rundeck-azure-plugin)


## Authentication

The cluster environment needs a common authentication method, in order all the instances can login with the same list of users/groups
Rundeck PRO has the following options:

* LDAP/AD authentication
* OAuth 2 (preauthentication mode or Okta).
 
Further information [here](../administration/authenticating-users.html)
  
  
## Resource Model

Each project will need a common place where define the list of nodes that the project will use.
This can be reached for example with:
 
 * a shared folder
 * [S3 plugin](https://github.com/rundeck-plugins/aws-s3-model-source)
 * [Azure plugin](https://github.com/rundeck-plugins/rundeck-azure-plugin)
 * [Git plugin](https://github.com/rundeck-plugins/git-resource-model)
 * a script, 
 * a REST endpoint, etc.

Further information [Managing Node Sources](http://rundeck.org/docs/administration/managing-node-sources.html).