# Instance System Requirements
|| Process Automation OnPrem | Rundeck |
| --- | ---------- | --- |
| Operating Systems | **Supported**:<br>[Red Hat Enterprise 7+/Amazon/Oracle Linux](/administration/install/linux-rpm.html)<br>[Ubuntu/Debian](/administration/install/linux-deb.html)<br>[Windows Server](/administration/install/windows.html) | **Recommended**:<br>[Red Hat Enterprise 7+/Amazon/Oracle Linux](/administration/install/linux-rpm.html)<br>[Ubuntu/Debian](/administration/install/linux-deb.html)<br>[Windows Server](/administration/install/windows.html) |
| Server Profile | **Recommended**:<br>32GB RAM<br>(24GB JVM Heap)<br>8 CPUs per instance<br>*Equivalent to m4.2xlarge in AWS EC2*<br><br>**Minimum**:<br>16GB RAM<br>(12GB JVM Heap)<br>4 CPUs per instance<br>*Equivalent to m4.xlarge in AWS EC2* | <br><br><br><br><br><br><br>**Minimum**:<br>8GB RAM<br>(4GB JVM Heap)<br>2 CPUs per instance<br>*Equivalent to m4.large in AWS EC2*  |
| [Database](#database) | **Supported**:<br>[MariaDB 10.9+/MySQL 8+](/administration/configuration/database/mysql.html)<br>[PostgreSQL 15.5+](/administration/configuration/database/postgres.html) | **Recommended**:<br>[MariaDB 10.9+/MySQL 8+](/administration/configuration/database/mysql.html)<br> [PostgreSQL 15.5+](/administration/configuration/database/postgres.html) |
| [Java](#java) | [Java 11](#java) installed on each instance | [Java 11](#java) installed on each instance |
| [Log Store](#logstore) | **Recommended**:<br>[S3-compatible object store](/learning/howto/S3-minio.html#s3-or-minio-for-execution-logs) | File system or <br>[S3-compatible object store](/learning/howto/S3-minio.html#s3-or-minio-for-execution-logs) |
| Install Method | [.rpm](/administration/install/linux-rpm.html)<br> [.deb](/administration/install/linux-deb.html)<br>[Java servlet (.war)](/administration/install/jar.html)<br>[Docker](/administration/install/docker.html) | [.rpm](/administration/install/linux-rpm.html)<br>[.deb](/administration/install/linux-deb.html)<br>[Java servlet (.war)](/administration/install/jar.html)<br>[Docker](/administration/install/docker.html) |
| [Network Ports](#network-access) | 4443 (https)<br>4440 (http)<br>22 (Linux machines over SSH)<br>5985 (Windows machines over http)<br>5986 (Windows machines over https) | 4443 (https)<br>4440 (http)<br>22 (Linux machines over SSH)<br>5985 (Windows machines over http)<br>5986 (Windows machines over https) |
| Admin Access | Root (or Administrator on Windows) is not [required or recommended](#adminaccess). | Root (or Administrator on Windows) is not [required or recommended](#adminaccess). |
| Browser | Accessing automation typically requires an HTML5 compliant browser. Currently supported version of Mozilla Firefox or Google Chrome are recommended. | Accessing automation typically requires an HTML5 compliant browser. Currently supported version of Mozilla Firefox or Google Chrome are recommended. |

## Java

Rundeck is a Java-Servlet based server and therefore requires the Java runtime.

As of version 5.x, Java 11 is required. Java must be installed prior to running the install process. [Open JDK](http://openjdk.java.net/) and [Sun/Oracle](https://java.com/) JVMs are supported. Ensure the JAVA\_HOME environment variable is defined properly in your environment before running the launcher. Installers will use the java found on your path. See [Setting JAVA\_HOME](/administration/maintenance/startup.html#setting-java_home) if you want to run a different version of java.

Verify your Java version to check it meets the requirement:

```
$ java -version
```

Example output (actual version numbers can vary)

```
java version "11.0.7" 2020-04-14 LTS
Java(TM) SE Runtime Environment 18.9 (build 11.0.7+8-LTS)
Java HotSpot(TM) 64-Bit Server VM 18.9 (build 11.0.7+8-LTS, mixed mode)
```
## Network access

When the server starts, it binds to several TCP ports by default:

- 4440 (http)
- 4443 (https)

To check if the ports are free on a Unix host, run:

```
$ netstat -an | egrep '4440|4443'
```

If the ports are in use on the server, you will see output similar to below:

```
tcp46 0 0 \*.4440 \*.\* LISTEN
```

The installation procedures describe how to choose different ports if there is a conflict.

In addition, TCP port 22 (by default) needs to be open on the clients for SSH.

Clients should be set up to allow the Rundeck server user to connect to the clients using SSH via public-key authentication. It should not prompt for a password. See [Configure remote machine for SSH](/manual/projects/node-execution/ssh.html#configuring-remote-machine-for-ssh) for configuration details.

There are various ways for installing SSH on Windows; we recommend [Cygwin (opens new window)](https://www.cygwin.com/).

## Database

When you install the default Rundeck (Or PagerDuty Process Automation) configuration, it will use H2, an embedded database. It is convenient to have an embedded database when testing or using it for a non-critical purpose. Using the H2 database is not considered safe for production because it is not resilient if Rundeck is not shutdown gracefully. When shutdown gracefully, Rundeck can write the data (kept in memory) to disk. If Rundeck is forcefully shutdown, the data is not guaranteed to be written to file on disk and will likely cause truncation and corruption.

Don't use the H2 embedded database for anything except testing and non-production.

For production instances, use an external database like [MariaDB/MySQL](/administration/configuration/database/mysql.html) or [PostgreSQL](/administration/configuration/database/postgres.html).

Also, be sure to locate your external database on a host with sufficient capacity and performance. Don't create a downstream bottleneck!

For more about setting the datasource see: [Configuration/Database](/administration/configuration/database/).

## Logstore<br>
Rundeck records all job execution data into the Logstore. By default, Rundeck is configured to use the local file system. Normally, that is defined by the framework.logs.dir system setting found in framework.properties.

For clustered setups with Process Automation, see: [Configuration/Logstore](/administration/cluster/logstore/).

## Admin Access<br>
Using a dedicated user account such as "rundeck" is recommended. If there is a need for root access, please set up the Rundeck user to have access via [sudo](https://en.wikipedia.org/wiki/Sudo).