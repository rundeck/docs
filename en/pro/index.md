% Rundeck Enterprise

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

See: [Rundeck Enterprise Licensing and Support][page:administration/configuration/license.md]

## General configuration

Rundeck Enterprise supports all properties described in the [OSS version][page:administration/configuration/config-file-reference.md].

## Node Model Sources

Node Sources allow you to import metadata about the nodes you want to run
Rundeck jobs on. Node Sources are configured on Rundeck Enterprise in the same was as
the OSS version, described in [Node Model Sources][page:administration/projects/resource-model-sources/index.md].

## Authentication

Similar to OSS Rundeck, Rundeck Enterprise uses Servlet Container Authentication to
determine the logged in user name and the user's authorized roles.

For more details, see [Authenticating Users][page:administration/security/authentication.md]

## Key storage

Similar to OSS Rundeck, Rundeck Enterprise can securely store private keys that the Rundeck Node Executor and use for sessions.

For momre details, see [Key Storage][page:administration/security/key-storage.md]

## Remote job execution

This feature allows Rundeck Enterprise cluster members to forward job executions to
other cluster members based on a policy configuration. By default, each member
of the cluster executes jobs locally and does not forward them. You can define
multiple profiles and assign different projects to different profiles. If a job
is executed in a project which is not assigned to a specific profile, the
default policy is used.

For more details, see [Remote Job Execution][page:administration/configuration/remote-job-execution.md]

## High availability

### Database

See: [Database Backends][page:administration/configuration/database/index.md].

### Loadbalancer

A loadbalancer allows you to achieve high availability in your Rundeck Enterprise
installation by routing http traffic across several redundant Rundeck Enterprise
instances.

To learn how to set up a loadbalancer for Rundeck Enterprise, see [Loadbalancer][page:administration/cluster/loadbalancer/index.md]

### Autotakeover

If a cluster member goes down, all scheduled jobs on that cluster member must be moved to another cluster node. This process can be performed automatically using the heartbeat and Autotakeover features in Rundeck Enterprise version 2.1.0 and later releases.

To learn how to set up Autotakeover, see [Autotakeover][page:administration/cluster/autotakeover/index.md]

### Logstore

All Cluster members must share the same log storage, this can be achieved in two ways:

* Shared file system: You can set the shared file system path with
`framework.logs.dir` in the `framework.properties` file. This changes must be
done in all the cluster members.
* Plugins: Using an Execution log storage plugin.

Some plugins that can be used:

#### Rundeck Enterprise S3 Log Storage Plugin

This plugin provides Log Storage via Amazon AWS S3, or any storage compatible with AWS S3 API, eg: S3, [Minio], etc.

It is based on the open source [Rundeck S3 Log Storage Plugin](https://github.com/rundeck-plugins/rundeck-s3-log-plugin).

It adds the additional feature:

* *Checkpoint log storage*:  This enables viewing the execution logs while the execution is running.

##### Configuration

Enable the ExecutionFileStorage provider named `com.rundeck.rundeckpro.amazon-s3` in your rundeck-config file:

	rundeck.execution.logs.fileStoragePlugin=com.rundeck.rundeckpro.amazon-s3

The "checkpoint log storage" feature is enabled by default.

If you wish to disable it you can set this in your framework.properties:

	framework.plugin.ExecutionFileStorage.com.rundeck.rundeckpro.amazon-s3.checkpoint=false

Please refer to the [open source plugin](https://github.com/rundeck-plugins/rundeck-s3-log-plugin) for other configuration. **Note**: Be sure to use `com.rundeck.rundeckpro.amazon-s3` in place of `org.rundeck.amazon-s3`.

#### Azure Blob Storage Plugin

See: [Azure Blob Storage](https://github.com/rundeck-plugins/rundeck-azure-plugin)

[minio]: https://minio.io/