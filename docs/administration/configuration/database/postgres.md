# Using Postgres as a database backend

This is a simple guide for setting up PostgreSQL for use with Rundeck.

:::warning
Enterprise DB (EDB), based on Postgres, is not supported for the Process Automation or Rundeck Postgres setup.
:::

## Install PostgreSQL

You can "yum install" or "apt-get install" the server, or you can download rpms manually if you like. See [PostgreSQL installation](https://wiki.postgresql.org/wiki/Detailed_installation_guides)

## Setup Rundeck Database

We have to create the database and user for Rundeck.

If it is not running, start Postgres (with `service postgresql-<version> start` or similar).

Switch to 'postgres' user and use the 'psql' commandline tool to access the db:

```bash
$: su postgres
$: psql
```

Once you have the 'postgres=#'' prompt, enter the following commands to create the rundeck database:

```shell
postgres=# create database rundeck;
```

Now, create a user and grant privileges to connect to this DB.

```shell
postgres=# create user rundeckuser with password 'rundeckpassword';
postgres=# grant ALL privileges on database rundeck to rundeckuser;
postgres=# \c rundeck;
rundeck=# grant ALL privileges on schema public to rundeckuser;
```

You can then exit the psql prompt.

You may also have to add a pg_hba.conf entry for this user. See [pg_hba.conf documentation](https://www.postgresql.org/docs/9.5/static/auth-pg-hba-conf.html)

## Configure Rundeck

Now you need to configure Rundeck to connect to this DB as described in: [Administrator Guide - Rundeck Configuration - Database - Customize the Datasource](/administration/configuration/database/index.md#customize-the-datasource).

Update your `rundeck-config.properties` and configure the datasource:

```properties
dataSource.driverClassName = org.postgresql.Driver
dataSource.url = jdbc:postgresql://pgsql.rundeck.local/rundeck
dataSource.username = rundeckuser
dataSource.password = rundeckpassword
```

With recent Rundeck versions, PostgreSQL connector is bundled.

Now, you can start Rundeck.

## Amazon Aurora PostgreSQL
:::warning
Aurora PostgreSQL databases on versions below 15.3.0, display warnings `unrecognized node type: 378` when processing queries, this is harmless since the queries are executed as expected but can be anoying for some users.
See: [Aurora PostgreSQL 15.3.0 updates page](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraPostgreSQLReleaseNotes/AuroraPostgreSQL.Updates.html#AuroraPostgreSQL.Updates.20180305.1530) 
:::
