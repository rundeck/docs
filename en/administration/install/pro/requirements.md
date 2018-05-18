% Requirements

FIXME: needs cleanup

Rundeck Pro has the following requirements:

* __Supported Operating Systems:__
	* Red Hat Enterprise Linux
	* CentOS
	* Ubuntu
	* Windows Server
* __A currently supported version of Mozilla Firefox or Google Chrome__
	* Other HTML5 compliant web browsers may work but are not fully tested or supported.
* __2 CPUs__
	* 2 CPUs per member
* __4 GB RAM__
	* other notes about memory sizing
* __20 GB hard disk__
	* other notes about disk sizing
* __Database__
	* Mysql version
	* Mariadb version
	* Postgres version
	* Oracle version
* __Log store__
	* File system
	* S3 compatible object store
* __Amazon EC2__
	* Instance size of m3.medium or larger
	* An instance size of m3.xlarge or larger if there are more than 100 hosts

The following operating systems are known to support Rundeck:

* Linux: Most recent distributions are likely to work 
* Windows: XP, Server and above
* Mac OS X 10.4 or later

Root (or Administrator on Windows) is not required or recommended. We
recommend using a dedicated user account such as "rundeck".

If there is need for root access, please set up the Rundeck user
to have access via [sudo].

[sudo]: http://en.wikipedia.org/wiki/Sudo

#### Java

Rundeck is a Java-Servlet based server and therefore requires the Java
runtime.

The install process requires that the latest version of Java 1.7
be installed. Both the [Open JDK](http://openjdk.java.net/) and [Sun/Oracle](http://java.com/) JVMs can be used.
You must have the JAVA_HOME environment variable defined
in your environment before running the launcher.  The RPM will use the java found on your path. See [Setting JAVA_HOME](startup-and-shutdown.html#setting-java_home) if you want to run a different version of java.

Verify your Java version to check it meets the requirement:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.bash}
$ java -version
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
java version "1.7.0_55"
OpenJDK Runtime Environment (rhel-2.4.7.1.el6_5-x86_64 u55-b13)
OpenJDK 64-Bit Server VM (build 24.51-b03, mixed mode)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 

#### Network access

When the server starts, it binds to several TCP ports by default:

*  4440 (http) 
*  4443 (https)

To check if the ports are free on a Unix host, run:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.bash}
$ netstat -an | egrep '4440|4443' 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If the ports are in use on the server, you will see output similar to below:

    tcp46      0      0  *.4440                 *.*                    LISTEN

The installation procedures describe how to choose different ports, if
there is a conflict.
    
In addition, TCP port 22 (by default) needs to be open on the clients for SSH.
    
Clients should be set up to allow the Rundeck server user to connect to
the clients using SSH via public-key authentication. It should not
prompt for a password. See
[Configure remote machine for SSH](../plugins-user-guide/ssh-plugins.html#configuring-remote-machine-for-ssh)
in the Administration chapter.

There are various ways for installing SSH on Windows; we recommend
[Cygwin].

[Cygwin]: http://www.cygwin.com/
