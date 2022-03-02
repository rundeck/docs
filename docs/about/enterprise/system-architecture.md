# System Architecture

Rundeck Enterprise is a server application hosted in your local environment as
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

![Rundeck architecture](~@assets/img/fig0001.png)

The Rundeck application itself is a Java-based webapp. The application provides both
graphical interface and network interfaces used by the Rundeck shell
tools.

Access to the Rundeck application requires a login and
password. The default Rundeck installation uses a flat file user
directory containing a set of default logins. Logins are defined in
terms of a username and password as well as one or more user
groups. An alternative configuration to the flat file user directory,
is LDAP (e.g., ActiveDirectory) but Rundeck authentication and authorization
is customizable via [JAAS](https://en.wikipedia.org/wiki/Java_Authentication_and_Authorization_Service).
Users must also be authorized to perform actions like define a job
or execute one. This is controlled by an access control facility that reads
policy files defined by the Rundeck administrator. Privilege is
granted if a user's group membership meets the requirements of the policy.

Two installation methods are supported:

- System package: RPM and Debian packaging is intended for managed installation and provides
  robust tools that integrate with your environment, man pages, shell
  tool set in your path, init.d startup and shutdown.

- Launcher: The launcher is intended for quick setup, to get you
  running right away. Perfect for bootstrapping a project or trying
  a new feature.

Rundeck can also install as a WAR file into an external container like Tomcat.

Assuming the system requirements are met, Rundeck can be installed
either from source, system package or via the launcher.
