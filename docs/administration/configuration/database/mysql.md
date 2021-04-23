# Using MySQL as a database backend
::: warning
MySQL 5.7 or greater is recommended
:::

## Install MySQL

You can "yum install" or "apt-get install" the server, you can find installation guides for other OS [here](https://dev.mysql.com/doc/refman/5.7/en/installing.html)

## Configure MySQL

After install, run the [mysql_secure_installation script](https://dev.mysql.com/doc/refman/5.7/en/mysql-secure-installation.html). This will let prompt you to set the root password for mysql, as well as disable anonymous access.

Set an appropriate [innodb_buffer_pool_size](https://dev.mysql.com/doc/refman/5.7/en/innodb-buffer-pool-resize.html). MySQL, like many databases, manages
its own page cache and the buffer pool size determines how much RAM it can use! Setting this to 80% of the system memory is the common wisdom for dedicated
servers, however you may want go higher if your server has more than 32G of RAM.

### MySQL 5.6, 5.7

`5.6.3` or greater is required if using `utf8mb4` character set as the server default, and upgrading or installation may require an extra step.

Configuration:

```properties
innodb_file_format=barracuda
innodb_file_per_table=true
innodb_large_prefix=true
```

After first Rundeck start run the following SQL queries:

```sql
use <rundeck_database>;
ALTER TABLE `event_subscription` ROW_FORMAT=dynamic;
ALTER TABLE `reaction` ROW_FORMAT=dynamic;
ALTER TABLE `reaction_event` ROW_FORMAT=dynamic;
```

Restart Rundeck!

### MySQL 8.0

`8.0.0` or greater is using `utf8mb4` character set as the server default.

It also has newer default configuration which reflected [MySQL 5.6, 5.7](#MySQL-5.6_-5.7) conf.

Configuration:

```properties
innodb_file_per_table=true  # default value is ture
```

The following InnoDB file format configuration options ware [removed on 8.0.0](https://dev.mysql.com/doc/relnotes/mysql/8.0/en/news-8-0-0.html):

- innodb_file_format
- innodb_file_format_check
- innodb_file_format_max
- innodb_large_prefix

On 8.0, Barracuda is default file format and all table's ROW_FORMAT is dynamic.


## Setup Rundeck Database

Now you want to create a database and user access for the Rundeck server.

If it is not running, start mysqld with "service mysqld start"

Use the 'mysql' commandline tool to access the db as the root user:

    $ mysql -u root -p

Enter your root password to connect. Once you have the mysql> prompt, enter the following commands to create the rundeck database:

    mysql> create database rundeck;
    Query OK, 1 row affected (0.00 sec)

Then "grant" access for a new user/password, and specify the hostname the Rundeck server will connect from. if it is the same server, you can use "localhost".

    mysql> grant ALL on rundeck.* to 'rundeckuser'@'localhost' identified by 'rundeckpassword';
    Query OK, 1 row affected (0.00 sec)

You can then exit the mysql prompt.

Test access (if it's from localhost) by running:

    $ mysql -u rundeckuser -p

You can verify you can see the "rundeck" database with:

    mysql> show databases;
    +--------------------+
    | Database           |
    +--------------------+
    | information_schema |
    | rundeck            |
    +--------------------+
    2 rows in set (0.00 sec)

## Configure Rundeck

Now you need to configure Rundeck to connect to this DB.

Update your `rundeck-config.properties` and configure the datasource:

- RPM/Debian location: `/etc/rundeck/rundeck-config.properties`
- Launcher location: `$RDECK_BASE/server/config/rundeck-config.properties`

Contents:
```properties
dataSource.url = jdbc:mysql://myserver/rundeck?autoReconnect=true&useSSL=false
dataSource.username = rundeckuser
dataSource.password = rundeckpassword
dataSource.driverClassName = org.mariadb.jdbc.Driver
```

Finally you can start rundeck. If you see a startup error about database access, make sure that the hostname that the Mysql server sees from the client is the same one you granted access to.

NB: `myserver` , `rundeckuser` and `rundeckpassword` should be match your environment and mysql configuration.
If you install rundeck & MySQL-server on one server, `myserver` is localhost.
If you install rundeck & MySQL-server on different servers, `myserver` should be IP address or hostname of server which installed MySQL-server.

NB: `autoReconnect=true` will fix a common problem where the Rundeck server's connection to Mysql is dropped after a period of inactivity, resulting in an error message: "Message: Can not read response from server. Expected to read 4 bytes, read 0 bytes before connection was unexpectedly lost."

See more about [configuring the Mysql JDBC Connector/J URL](https://dev.mysql.com/doc/connector-j/5.1/en/connector-j-reference-configuration-properties.html).

# Mysql migration guide

This section describes how to migrate a set of Rundeck projects from
the built-in H2 database, to use Mysql.

## Project export all projects

For each project you want to retain, Export the archive via the GUI:

- Navigate to Configure page for the project
  - Either click the cog icon in the header, then choose your project from the list
  - OR click the Configure button next to the project name in the home page
- Click on the "Export Archive" tab
- Click "Export project.rdproject.jar"
- Wait for export process to complete
- Click the link to download the file

Note: make sure to click the final link that is presented to download the file.

Save each project archive file (named "[project name]-XXXX.rdproject.jar")
in a place you can upload it later.

## Backup your Rundeck data

- Make a backup of your Projects
  - RPM/Debian install location: `/var/rundeck/projects`
  - Launcher location: `$RDECK_BASE/projects`
- Make a backup of your H2 database, which you can revert back to in case of error,
  - RPM/Debian install location: `/var/lib/rundeck/data`
  - Launcher location: `$RDECK_BASE/server/data`

## Stop rundeck

Unix:

    sudo service rundeckd stop

## Setup mysql

Install Mysql according to the instructions for your platform.

## Prepare Mysql database

Perform this command to log in as root:

    mysql -u root -p

Then execute this sql:

    > create database rundeck
    > grant ALL on rundeck.* to 'rundeckuser'@'localhost' identified by 'rundeckpassword'

## Configure rundeck-config.properties

Set the datasource URL to point to your Mysql host, with appropriate database name,
username and password.

See [Configure Rundeck](#configure-rundeck) above.

## Configure project config in DB

Enable DB storage for Project configurations, and Key Storage. Optionally enable encryption.

For more info refer to:

- [Security - Key Storage](/administration/security/key-storage.md)
- [Configuring Plugins - Bundled Plugins - Jasypt Encryption Plugin](/administration/configuration/plugins/bundled-plugins.md#jasypt-encryption-plugin)
- [Storage Facility](/administration/configuration/storage-facility.md)

## Start up Rundeck

Start the Rundeck server again.

Unix:

    sudo service rundeckd start

View the "/var/log/rundeck/service.log" file for any error messages.

- Project definitions/configs will be imported to DB automatically
- Resources.xml remain in the same location

## Import archives

For each project you wish to import, go to the Configure page for the project:

- Click the "Import Archive" tab
- Upload the project archive with the corresponding name
- Optionally choose to Import All Executions
- Click Import

## MySQL JDBC Driver

This guide configures Rundeck to use the [MariaDB Connector/J driver](https://mariadb.com/kb/en/about-mariadb-connector-j/).
It is compatible with MySQL and has a more permissive, LGPL, license.

If you would like to use the Oracle MySQL driver you must download it and copy it
to the `$RDECK_BASE/server/lib` for war launcher or in `/var/lib/rundeck/lib` 
(create it) for RPM and DEB installations.

The driver can be obtained from the [MySQL Website](https://www.mysql.com/products/connector/), or directly from
Maven:
```bash
MYSQLJ_VERS=8.0.21
curl -L -o https://repo1.maven.org/maven2/mysql/mysql-connector-java/${MYSQLJ_VERS}/mysql-connector-java-${MYSQLJ_VERS}.jar`
```
