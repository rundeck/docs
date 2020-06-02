# Rundeck Enterprise

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

![Rundeck architecture](~@assets/img/architecture.png)

The Rundeck application itself is a Java-based web application. The application provides both
graphical interface and network interfaces used by the Rundeck shell
tools.

## License

See: [Rundeck Enterprise Licensing and Support](/administration/configuration/license.md)

## Features
All of the Enterprise features that are not included in our Open Source offering are covered on our [Why Rundeck Enterprise?](https://www.rundeck.com/enterprise) page.
