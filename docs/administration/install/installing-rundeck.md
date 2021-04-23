# Installing Rundeck

## Quick Start
* [Review the system requirements](/administration/install/system-requirements)
* [Install Rundeck with chosen method](#installation-method)
* [Configure database](#database-configuration)
* [Setup Rundeck](#rundeck-setup)

## Installation Method
:::tip
Docker is fastest way to try out Rundeck.
:::

Select your installation method for further instructions:  
[Docker](/administration/install/docker)  
[DEB](/administration/install/linux-deb)  
[RPM](/administration/install/linux-rpm)  
[Windows](/administration/install/windows)  
[Tomcat](/administration/install/tomcat)  

## Database Configuration
:::warning
Rundeck will initialize an on-disk database using the embedded H2 database
on first start using the stock configurations. Production installations of
Rundeck running H2 are not supported! Choose a supported database below
to configure a production installation.
:::
Select your database for configuration instructions:  
[MySQL](/administration/configuration/database/mysql)  
[PostgreSQL](/administration/configuration/database/postgres)  
[MS SQL Server](/administration/configuration/database/mssql)  
[Oracle](/administration/configuration/database/oracle)  

## Rundeck Setup

### Server URL
:::warning
The configuration option `grails.serverUrl` **must** be set properly. The
value should match the URL *users* would use to access Rundeck(ie the URL
they would enter into the browser).
:::

For **Docker** this should be configured with the `RUNDECK_GRAILS_URL` environment variable.

For **deb, rpm, and war** this will be set as `grails.serverUrl=` in the `rundeck-config.properties`
file.

### Configuration Reference
[Docker](/administration/configuration/docker)  
[Configuration file reference](/administration/configuration/config-file-reference)  