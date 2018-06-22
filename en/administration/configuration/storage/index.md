% Storage Facility

This document describes the Rundeck Storage Facility which is used both for Key Storage, and for Project Definition Storage.

## Storage Facility

The Storage facility provides a filesystem-like structure for storing files.  Each file is located with a "/"-separated "path" and a name, similar to a file system path.

Currently the Storage Facility is split into two separate containers:

* [Key Storage](#key-storage)
* [Project Storage](#project-storage)

Both containers use the same storage mechanisms, but they can be configured independently of each other,
 and have different APIs for modification.

## Key Storage

The Key Storage container allows storing public keys, private keys, and passwords securely.  The
contents of these files can be accessed by Node Execution plugins for authenticating to remote nodes.
The contents can be written via the Rundeck API, but only public keys can be read via the API.

See the chapter: [Key Storage](../../security/key-storage.html).

When configuring Key Storage providers, the configuration entries in `rundeck-config.properties` start with:

    rundeck.storage.provider.[index]

And converter plugins start with:

    rundeck.storage.converter.[index]

## Project Storage

Similar to Key Storage, the Project Storage container keeps files related to Rundeck Projects:

* contents of `etc/project.properties` - the Project configuration
* contents of `readme.md` and `motd.md` - Readme and MOTD files

Access to these contents can be made via the Rundeck API.

See the chapter: [Project Setup](../project-setup.html)

When configuring Project Storage providers, the configuration entries in `rundeck-config.properties` start with:

    rundeck.config.storage.provider.[index]

And converter plugins start with:

    rundeck.config.storage.converter.[index]

## Storage backends

The location of stored data can be either on the filesystem, the database, or some external system via usage of a **Storage Plugin**.

Rundeck provides these built-in implementations:

* `filesystem` - stores files locally on the filesystem
* `db` - stores file data as BLOBs in the database

It is highly recommended that you configure Rundeck to use a relational database instead of the default file-based data storage.

You must modify the `server/config/rundeck-config.properties` file, to change the `dataSource` configuration, and you will have to add the appropriate JDBC driver JAR file to the lib directory.

For database-specific instructions:

* [MySQL](using-mysql-as-a-database-backend.html)
* [Postgres](using-postgres-as-a-database-backend.html)
* [Oracle](using-oracle-as-a-database-backend.html)
* [SQL Server](using-microsoft-sql-server-as-a-database-backend.html)

To develop your own storage plugin, see:

* [Storage Plugin Development](../../../developer/storage-plugin.html).
* [Storage Converter Plugin Development](../../../developer/storage-converter-plugin.html).

### Customize the Datasource

The default dataSource is configured for filesystem storage using HSQLDB:

~~~~~~ {.java}
dataSource.url = jdbc:hsqldb:file:/var/lib/rundeck/data/grailsdb;shutdown=true
~~~~~~ 

Here is an example configuration to use an Oracle backend:

~~~~~~ {.java .numberLines }
dataSource.url = jdbc:oracle:thin:@localhost:1521:XE
dataSource.driverClassName = oracle.jdbc.driver.OracleDriver
dataSource.username = dbuser
dataSource.password = dbpass
dataSource.dialect = org.hibernate.dialect.Oracle10gDialect
~~~~~~~~

Here is an example configuration to use Mysql:

~~~~~~ {.java .numberLines }
dataSource.url = jdbc:mysql://myserver/rundeckdb?autoReconnect=true
dataSource.username = dbuser
dataSource.password = dbpass
~~~~~~

NB: for Mysql, the `autoReconnect=true` will fix a common problem where the Rundeck server's connection to Mysql is dropped after a period of inactivity, resulting in an error message: "Message: Can not read response from server. Expected to read 4 bytes, read 0 bytes before connection was unexpectedly lost."

See the [Mysql Setup Guide](#mysql-setup-guide) for
instructions on creating the rundeck database and granting access.

See more about [configuring the Mysql JDBC Connector/J URL](https://dev.mysql.com/doc/connector-j/5.1/en/connector-j-reference-configuration-properties.html).

### Add the JDBC Driver

Rundeck includes a JDBC driver for Mysql and H2. If you are using another database
copy the appropriate JDBC driver, such as "ojdbc14.jar" for Oracle into the server `lib` dir:

~~~~~~ {.bash}
cp ojdbc14.jar $RDECK_BASE/server/lib
~~~~~~

### Configuring Storage Plugins

See [Plugins User Guide - Configuring Storage Plugins](../plugins/configuring.html#storage-plugins).

## Storage Converters

Files can be encrypted in the storage backend by use of a [Storage Converter plugin](../../../developer/storage-converter-plugin.html). A typical plugin would encrypt data at write time, and decrypt it at read time.

The Storage Converter Plugin handles reading and writing the content for any matching resources.  The subsequent data is stored in the storage backend (on-disk or in a database) alongside the metadata for the file.

Converter plugins do not have to manage storing the data, that will be handled by the Storage backend.

### Configuring Storage Converter Plugins

See [Plugins User Guide - Configuring Storage Converter Plugins](../plugins/configuring.html#storage-converter-plugins).
