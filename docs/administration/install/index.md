# Installing Rundeck

Installing Rundeck is a straightforward and efficient way to enhance your organization's workflow automation and streamline your IT operations. Rundeck is an open-source, web-based platform that provides a centralized interface for managing and executing tasks across multiple systems. With its intuitive design and robust features, Rundeck empowers users to create and schedule jobs, run ad-hoc commands, and orchestrate complex workflows with ease. Whether you're a system administrator, developer, or operations team member, installing Rundeck can significantly improve your team's productivity and operational efficiency. In this guide, we will explore the step-by-step process of installing Rundeck, ensuring you have all the necessary components and configuration to unleash the full potential of this powerful tool.

1. [Review the system requirements](/administration/install/system-requirements.md)
2. [Install Rundeck with chosen method](#installation)
3. [Configure database](#database-configuration)
4. [Configure Rundeck](#rundeck-configuration)

## Installation
:::tip
Docker is fastest way to try out Rundeck
:::

::: tabs


@tab Docker

### Quick Start

```bash
docker run --rm -it -p 4440:4440 rundeckpro/enterprise:{{$rundeckVersion}}
```

### Docker Compose
**Check out the [Docker Zoo](https://github.com/rundeck/docker-zoo) for configuration examples
in Docker Compose!** These examples cover common configuration scenarios including
connecting to each supported database.

[Detailed Docker instructions can be found here.](/administration/install/docker.md)  


@tab Deb
### Quick Install
```bash
curl https://raw.githubusercontent.com/rundeck/packaging/main/scripts/deb-setup.sh 2> /dev/null | sudo bash -s rundeckpro
sudo apt-get install rundeckpro-enterprise
```

### Manual Install

Import the repo signing key:
```bash
curl -L https://packages.rundeck.com/pagerduty/rundeckpro/gpgkey | sudo apt-key add -
```

Add the following to `/etc/apt/sources.list.d/rundeck.list` replacing existing entries:
```bash
deb https://packages.rundeck.com/pagerduty/rundeckpro/any/ any main
deb-src https://packages.rundeck.com/pagerduty/rundeckpro/any/ any main
```

Update apt cache and install:
```bash
sudo apt-get update
sudo apt-get install rundeckpro-enterprise
```

[Detailed deb instructions can be found here.](/administration/install/linux-deb.md)  


@tab Rpm
### Quick Install
```bash
curl https://raw.githubusercontent.com/rundeck/packaging/main/scripts/rpm-setup.sh 2> /dev/null | sudo bash -s rundeckpro
sudo yum install java rundeckpro-enterprise
```

### Manual Install

Remove `bintray-rundeckpro-rpm.repo` if it exists.

Add the following entries to `/etc/yum.repos.d/rundeck.repo` replacing any existing entries:
```properties
[rundeckpro]
name=rundeckpro
baseurl=https://packages.rundeck.com/pagerduty/rundeckpro/rpm_any/rpm_any/$basearch
repo_gpgcheck=1
gpgcheck=0
enabled=1
gpgkey=https://packages.rundeck.com/pagerduty/rundeckpro/gpgkey
sslverify=1
sslcacert=/etc/pki/tls/certs/ca-bundle.crt
metadata_expire=300
```

```bash
sudo yum install java rundeckpro-enterprise
```

[Detailed rpm instructions can be found here.](/administration/install/linux-rpm.md)  




@tab Tomcat
[Check here for detailed Tomcat installation instructions.](/administration/install/tomcat.md)  


@tab Windows
[Check here for detailed Windows installation instructions.](/administration/install/windows.md)


:::

## Database Configuration
Rundeck requires a backend database to store and manage various types of data that are integral to its operation. The backend database serves as a repository for critical information such as job definitions, execution history, project configurations, and user accounts. By leveraging a database, Rundeck ensures data integrity, persistence, and scalability, allowing multiple users to collaborate seamlessly and access the platform's features concurrently.

The backend database plays a crucial role in enabling advanced functionalities within Rundeck, such as job scheduling, execution tracking, and historical data analysis. It allows users to define and store job definitions, which consist of instructions, scripts, and parameters necessary for performing tasks. Moreover, the database records execution history, including timestamps, execution statuses, and output logs, enabling users to review and troubleshoot job runs.

Furthermore, the backend database stores project configurations, which encompass project-specific settings, resource definitions, access controls, and notifications. This central storage ensures consistency and facilitates easy management of project-related data.

Overall, the backend database acts as a reliable foundation for Rundeck's core functionalities, providing a structured and efficient means of storing, retrieving, and organizing data essential for effective workflow automation and orchestration.

:::warning
Rundeck will initialize an on-disk database using the embedded H2 database
on first start using the stock configurations. Production installations of
Rundeck running H2 are not supported! Choose a supported database below
to configure a production installation.
:::

### Edit Database Config

:::tip
The Rundeck database(or schema) should be setup in advance. The following
assumes the database is named `rundeck`.
:::

Update your `rundeck-config.properties` file with settings from the following database list and restart
Rundeck.
This file is located in different locations depending on your installation method:
* **RPM/DEB**: `/etc/rundeck/rundeck-config.properties`
* **WAR/Custom**: `$RDECK_BASE/server/config/rundeck-config.properties`
* **Docker**: Check out the [Docker Zoo](https://github.com/rundeck/docker-zoo) for configuration examples
of each database using Docker Compose!

Replace the following tokens in the instructions for each database:
* `<host>`: The database server hostname.
* `<rundeckuser>`: The database user with permissions on the `rundeck` database.
* `<rundeckpassword>`: The password for the Rundeck database user.

::: tabs

@tab MySQL
```properties
dataSource.url = jdbc:mysql://<host>/rundeck?autoReconnect=true&useSSL=false
dataSource.username = <rundeckuser>
dataSource.password = <rundeckpassword>
dataSource.driverClassName = org.mariadb.jdbc.Driver
```

[Detailed MySQL instructions.](/administration/configuration/database/mysql.md)


@tab PostgreSQL
```properties
dataSource.driverClassName = org.postgresql.Driver
dataSource.url = jdbc:postgresql://<host>/rundeck
dataSource.username=<rundeckuser>
dataSource.password=<rundeckpassword>
```

[Detailed PostgreSQL instructions.](/administration/configuration/database/postgres.md)


@tab SQL Server
```properties
dataSource.driverClassName = com.microsoft.sqlserver.jdbc.SQLServerDriver
dataSource.url = jdbc:sqlserver://<host>;DatabaseName=RUNDECK
dataSource.username = <rundeckuser>
dataSource.password = <rundeckpassword>
```

[Detailed SQL Server instructions.](/administration/configuration/database/mssql.md)



@tab Oracle
```properties
dataSource.url = jdbc:oracle:thin:@<host>:1521:orcl # (change server name and instance name)
dataSource.driverClassName = oracle.jdbc.OracleDriver
dataSource.username = <rundeckuser>
dataSource.password = <rundeckpassword>
dataSource.dialect = org.rundeck.hibernate.RundeckOracleDialect
dataSource.properties.validationQuery = SELECT 1 FROM DUAL
```

[Detailed Oracle instructions.](/administration/configuration/database/oracle.md)


:::

:::warning
When using passwords with **special characters**, ensure there are **no spaces** between the equal sign and the value provided: `dataSource.password=<rundeckpassword>`
:::

## Rundeck Configuration

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
[Docker](/administration/configuration/docker.md)  
[Configuration file reference](/administration/configuration/config-file-reference.md)  
