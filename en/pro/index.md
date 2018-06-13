% Rundeck Pro

## Overview

Rundeck is a server application you host on a system you designate 
a central administrative control point. Internally, Rundeck stores job
definitions and execution history in a relational database. Output
from command and job executions is saved on disk but can be forwarded
to remote stores like S3 or Logstash. 

Rundeck distributed command execution is performed using a pluggable
node execution layer that defaults to SSH but plugins allow you
to use other means like MCollective, Salt, WinRM, or your custom method. 
Rundeck server configuration includes settings to define the outbound
user allowed by the remote hosts. Remote machines
are not required to make connections back to the server.

![Rundeck architecture](../figures/architecture.png)

The Rundeck application itself is a Java-based webapp. The application provides both
graphical interface and network interfaces used by the Rundeck shell
tools. 

Access to the Rundeck application requires a login and
password. The default Rundeck installation uses a flat file user
directory containing a set of default logins. Logins are defined in
terms of a username and password as well as one or more user
groups. An alternative configuration to the flat file user directory,
is LDAP (e.g., ActiveDirectory) but Rundeck authentication and authorization
is customizable via [JAAS](http://en.wikipedia.org/wiki/Java_Authentication_and_Authorization_Service).
Users must also be authorized to perform actions like define a job
or execute one. This is controlled by an access control facility that reads
policy files defined by the Rundeck administrator. Privilege is
granted if a user's group membership meets the requirements of the policy.

## License

[License](../administration/configuration/license-pro.html)

## General configuration

Rundeck Pro supports all properties described in the [OSS version](http://rundeck.org/docs/administration/configuration-file-reference.html).

## Node Sources

Node Sources allow you to import metadata about the nodes you want to run
Rundeck jobs on. Node Sources are configured on Rundeck Pro in the same was as
the OSS version, described in [Managing Node Sources](http://rundeck.org/docs/administration/managing-node-sources.html).

## Authentication

Similar to OSS Rundeck, Rundeck Pro uses Servlet Container Authentication to
determine the logged in user name and the user's authorized roles.

For more details, see [Authenticating Users](../administration/security/authenticating-users.html)

## Key storage

Similar to OSS Rundeck, Rundeck Pro can securely store private keys that the Rundeck Node Executor and use for sessions.

For momre details, see [Key Storage](http://rundeck.org/docs/administration/key-storage.html)

## Remote job execution (Pro-only)

This feature allows Rundeck Pro cluster members to forward job executions to
other cluster members based on a policy configuration. By default, each member
of the cluster executes jobs locally and does not forward them. You can define
multiple profiles and assign different projects to different profiles. If a job
is executed in a project which is not assigned to a specific profile, the
default policy is used.

For more details, see [Remote Job Execution](../administration/configuration/remote-job-execution-pro.html)

## High availability

### Database

* [mysql](../administration/scaling/storage/mysql-setup-guide.html)
* [postgres](../administration/scaling/storage/postgresql-setup-guide.html)
* [oracle](../administration/scaling/storage/using-oracle-as-a-database-backend.html)
* [mssql](../administration/scaling/storage/using-microsoft-sql-server-as-a-database-backend.html)

### Loadbalancer (Pro-only)

A loadbalancer allows you to achieve high availability in your Rundeck Pro
installation by routing http traffic across several redundant Rundeck Pro
instances.

To learn how to set up a loadbalancer for Rundeck Pro, see [Loadbalancer](../administration/scaling/cluster/loadbalancer/index.html)

### Autotakeover (Pro-only)

If a cluster member goes down, all scheduled jobs on that cluster member must be moved to another cluster node. This process can be performed automatically using the heartbeat and Autotakeover features in Rundeck Pro version 2.1.0 and later releases.

To learn how to set up Autotakeover, see [Autotakeover](../administration/scaling/cluster/autotakeover/index.html)

### Logstore (Pro-only)

All Cluster members must share the same log storage, this can be achieved in two ways:

* Shared file system: You can set the shared file system path with
`framework.logs.dir` in the `framework.properties` file. This changes must be
done in all the cluster members.
* Plugins: Using an Execution log storage plugin.

So far we have the following plugins for execution log storage:

* [AWS S3](https://github.com/rundeck-plugins/rundeck-s3-log-plugin): This plugin works with any storage compatible with AWS S3 API, eg: S3, Minio, etc.
* [Azure Blob Storage](https://github.com/rundeck-plugins/rundeck-azure-plugin)
