# Database Configuration Overview

- [MySQL](/administration/configuration/database/mysql.md)
- [PostgreSQL](/administration/configuration/database/postgres.md)
- [Oracle](/administration/configuration/database/oracle.md)
- [MS SQL Server](/administration/configuration/database/mssql.md)
- [Security Mode for MS SQL Server](/administration/configuration/database/secure_mssql.md)

## Default database (H2)

When you install the vanilla standalone rundeck configuration, it will use H2, an embedded database.
It is convenient to have an embedded database when you are just trying Rundeck or using it for a non-critical purpose. Be aware though that using the H2 database is not considered safe for production because it not resilient if Rundeck is not shutdown gracefully. When shutdown gracefully, Rundeck can write the data (kept in memory) to disk. If Rundeck is forcefully shutdown, the data can not be guaranteed to be written to file on disk and cause truncation and corruption.

Don't use the H2 embedded database for anything except testing and non-production.

Use an external database service like MariaDB, Mysql, Postgres, Amazon Aurora or Oracle.

> Note: For concerns about [CVE-2022-45868](/history/cves/cve-2022-45868.md) please see [the write up why Rundeck is not vulnerable](/history/cves/cve-2022-45868.md).

## Database Architecture and Performance Notes

Runbook Automation Self-Hosted supports only one active DB instance serving queries to the Enterprise Cluster. PAOP only supports reading from and writing to a single database instance from all servers in the same cluster. For optimal performance the  Enterprise Cluster and database instance need to be connected on low latency network (<40ms latency).

### Customize the Datasource

The dataSource is configured in the `rundeck-config.properties` file.

You specify the `dataSource.` configuration properties.

Here is the default, set up for the default embedded H2 database:

```properties
dataSource.url = jdbc:h2:file:/var/lib/rundeck/data/rundeckdb;DB_CLOSE_ON_EXIT=FALSE;NON_KEYWORDS=MONTH,HOUR,MINUTE,YEAR,SECONDS
```

`dataSource.dbCreate` specifies how the behavior that Hibernate should take when it
generates the schema for your database. The default value of `update` means that
it will attempt to create the database schema if it does not exist, and update it
if necessary if it already exists.

`dataSource.url` specifies the connection URL for the data source.

If necessary, you may have to specify other dataSource properties, such as username
and password, depending on the type of database. See the sections below
for your specific Database type.

### Add the JDBC Driver

Rundeck includes a JDBC driver for Mysql, MariaDB, Postgres, MSSQL and H2. If you are using another database or if you want to use an updated driver, copy the appropriate JDBC driver (e.g.,"ojdbc14.jar" for Oracle,or "aws-mysql-jdbc.jar" for Amazon Aurora) into the server `lib` dir:

```bash
cp ojdbc14.jar $RDECK_BASE/server/lib
```
::: tip
For RPM and DEB you should create /var/lib/rundeck/lib folder and place the driver there.
:::

::: warning
You must establish a JDBC connection for every job you expect to be running simultaneously (we suggest for # of connections to equal number of jobs * 2 | 3). So if you expect to have two jobs running simultaneously, we recommend a minimum of 4 connections.
:::
