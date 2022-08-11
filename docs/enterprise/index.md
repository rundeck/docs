# Process Automation

## Overview

Rundeck is a server application hosted on a system designated as a central administrative control point. Internally, Rundeck stores job definitions and execution history in a relational database. Output from command and job executions is saved on disk but can be forwarded to remote stores like S3 or Logstash.

Rundeck distributed command execution is performed using a pluggable node execution layer that defaults to SSH but plugins expand use-cases to other means like AWS SSM, Salt, WinRM, or a custom method. Rundeck server configuration includes settings to define the outbound user allowed by the remote hosts. Remote machines are not required to make connections back to the server.

![Rundeck architecture](~@assets/img/architecture.png)

The Rundeck application itself is a Java-based web application. The application provides both graphical interface and network interfaces used by the Rundeck shell tools.

## License

See: [Process Automation Licensing and Support](/administration/configuration/license.md)

## Features
All of the Process Automation features that are not included in our Open Source offering are covered on our [Why Process Automation?](https://www.rundeck.com/enterprise) page.
