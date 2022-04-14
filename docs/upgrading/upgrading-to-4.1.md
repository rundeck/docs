# Rundeck 4.1 Upgrade Notes

> Note: If you are using one of the **[supported production databases](/administration/install/installing-rundeck.html#database-configuration)** these upgrade steps can be ignored.

## H2 Database Upgrade

In release 4.1 the lib version of the h2 database was updated to `2.1.210`.  The old version of the H2 database is not compatible with the newer library. Since the old library has a critical security vulnerability we have not included it in the release and there is no mechanism to migrate the 1.x database in the version automatically by Rundeck.  When attempting an in-place upgrade from a previous version to 4.1 using H2 Rundeck startup will fail.

```
[2022-04-14T16:06:22,414] ERROR pool.HikariPool - HikariPool-1 - Exception during pool initialization.
org.h2.jdbc.JdbcSQLNonTransientException: General error: "The write format 1 is smaller than the supported format 2 [2.1.210/5]" [50000-210]
	at org.h2.message.DbException.getJdbcSQLException(DbException.java:573) ~[h2-2.1.210.jar!/:?]
	at org.h2.message.DbException.getJdbcSQLException(DbException.java:496) ~[h2-2.1.210.jar!/:?]
```

### H2 Migration Options

**If you don't need to keep the data in your old H2 database:**

1. Remove the files from `{RUNDECK_HOME}/server/data`.
1. Restart Rundeck.  A new blank database will be created on bootstrap.

> Note: This will wipe out all data in your Rundeck instance.  At a minimum we suggest backing up the files using the first steps below just in case you change your mind later.


**If you need to keep the data in the old H2 database follow the steps below**

_Working on steps..._
