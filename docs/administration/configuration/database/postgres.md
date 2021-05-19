# Using Postgres as a database backend

This is a simple guide for setting up PostgreSQL for use with Rundeck.

## Install PostgreSQL

You can "yum install" or "apt-get install" the server, or you can download rpms manually if you like. See [PostgreSQL installation](https://wiki.postgresql.org/wiki/Detailed_installation_guides)

## Setup Rundeck Database

We have to create the database and user for Rundeck.

If it is not running, start Postgres (with `service postgresql-<version> start` or similar).

Switch to 'postgres' user and use the 'psql' commandline tool to access the db:

    $ su postgres
    $ psql

Once you have the 'postgres=#'' prompt, enter the following commands to create the rundeck database:

    postgres=# create database rundeck;

Now, create a user and grant privileges to connect to this DB.

    postgres=# create user rundeckuser with password 'rundeckpassword';
    postgres=# grant ALL privileges on database rundeck to rundeckuser;

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
