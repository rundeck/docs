# Using MySQL as a database backend
::: warning
MySQL 5.6 is now End of Life.  Rundeck will offer limited support on that version. The current recommendation is MySQL 8 for long term support.
:::

## Install MySQL

Install MySQL using their installation guides [here](https://dev.mysql.com/doc/refman/8.0/en/installing.html)

## Configure MySQL

After install, run the [mysql_secure_installation script](https://dev.mysql.com/doc/refman/8.0/en/mysql-secure-installation.html). This will prompt to set the root password for mysql, as well as disable anonymous access.

Set an appropriate [innodb_buffer_pool_size](https://dev.mysql.com/doc/refman/8.0/en/innodb-buffer-pool-resize.html). MySQL, like many databases, manages
its own page cache and the buffer pool size determines how much RAM it can use! Setting this to 80% of the system memory is the common wisdom for dedicated
servers, maybe even higher if the server has more than 32G of RAM.

### MySQL 8.0

### MySQL 5.7

### MySQL 5.6

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

Be sure to restart Rundeck after making these changes!

## Setup Rundeck Database

Next create a database and user access for the Rundeck server.

Use the 'mysql' command line tool to access the db as the root user:

    $ mysql -u root -p

Enter the root password to connect. At the *mysql>* prompt, enter the following commands to create the rundeck database:

  mysql> create database rundeck;
  Query OK, 1 row affected (0.00 sec)

Then "grant" access for a new user/password, and specify the hostname the Rundeck server will connect from. if it is the same server, use "localhost".

    mysql> grant ALL on rundeck.* to 'rundeckuser'@'localhost' identified by 'rundeckpassword';
    Query OK, 1 row affected (0.00 sec)

Exit the mysql prompt.

Test access (if it's from localhost) by running:

    $ mysql -u rundeckuser -p

Verify the "rundeck" database is present using:

    mysql> show databases;
    +--------------------+
    | Database           |
    +--------------------+
    | information_schema |
    | rundeck            |
    +--------------------+
    2 rows in set (0.00 sec)

## Configuring Rundeck

To configure Rundeck to connect to this DB.

Locate and edit the `rundeck-config.properties` to configure the datasource:

- RPM/Debian location: `/etc/rundeck/rundeck-config.properties`
- Launcher location: `$RDECK_BASE/server/config/rundeck-config.properties`

Contents:

```properties
dataSource.driverClassName = org.mariadb.jdbc.Driver
dataSource.url = jdbc:mysql://mysql.rundeck.local/rundeck?autoReconnect=true&useSSL=false
dataSource.username = rundeckuser
dataSource.password = rundeckpassword
```

Start rundeck. If there is a startup error about database access, ensure that the hostname that the Mysql server sees from the client is the same one granted access in step X.

NB: `myserver` , `rundeckuser` and `rundeckpassword` should be match the environment and mysql configuration.
When Rundeck & MySQL-server are installed on one server, `myserver` is localhost.
When Rundeck & MySQL-server are on different servers, `myserver` should be IP address or hostname of server which installed MySQL-server.

NB: `autoReconnect=true` will fix a common problem where the Rundeck server's connection to Mysql is dropped after a period of inactivity, resulting in an error message: "Message: Can not read response from server. Expected to read 4 bytes, read 0 bytes before connection was unexpectedly lost."

See more about [configuring the Mysql JDBC Connector/J URL](https://dev.mysql.com/doc/connector-j/5.1/en/connector-j-reference-configuration-properties.html).


## MySQL JDBC Driver

This guide configures Rundeck to use the [MariaDB Connector/J driver](https://mariadb.com/kb/en/about-mariadb-connector-j/).
It is compatible with MySQL and has a more permissive, LGPL, license.

To use the Oracle MySQL driver download it and copy it to the `$RDECK_BASE/server/lib` for war launcher or in `/var/lib/rundeck/lib`
(create it) for RPM and DEB installations.

The driver can be obtained from the [MySQL Website](https://www.mysql.com/products/connector/), or directly from
Maven:
```bash
MYSQLJ_VERS=8.0.21
curl -L -o https://repo1.maven.org/maven2/mysql/mysql-connector-java/${MYSQLJ_VERS}/mysql-connector-java-${MYSQLJ_VERS}.jar
```

### Additional Articles

Check out our [Migrating to MySQL from H2 article](/learning/howto/migrate-to-mysql) in our Learning Section.
