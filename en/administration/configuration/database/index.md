% Database

### Customize the Datasource

The dataSource is configured in the `rundeck-config.properties` file.

You specify the `dataSource.` configuration properties. 

Here is the default, set up for the default embedded H2 database:

~~~~~~ {.java}
dataSource.dbCreate = update
dataSource.url = jdbc:h2:file:/var/lib/rundeck/data/grailsdb;MVCC=true
~~~~~~ 

`dataSource.dbCreate` specifies how the behavior that Hibernate should take when it
generates the schema for your database.  The default value of `update` means that
it will attempt to create the database schema if it does not exist, and update it
if necessary if it already exists.

`dataSource.url` specifices the connection URL for the data source.

If necessary, you may have to specify other dataSource properties, such as username
and password, depending on the type of database.  See the sections below
for your specific Database type.

### Add the JDBC Driver

Rundeck includes a JDBC driver for Mysql and H2. If you are using another database
copy the appropriate JDBC driver, such as "ojdbc14.jar" for Oracle into the server `lib` dir:

~~~~~~ {.bash}
cp ojdbc14.jar $RDECK_BASE/server/lib
~~~~~~

