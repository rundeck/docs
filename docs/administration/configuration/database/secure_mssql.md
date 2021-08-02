# Security mode for Microsoft&reg; SQL Server

Tested version

- Rundeck 3.0.6 TEAM
- SQL Server 2017 Express
- Windows 2012 R2
- Java 1.8

To enable security mode with SQL Server when executing rundeck.

Copy the "sqljdbc_auth.dll" file to correct folder

32 Bit: `\JDBC_SQL_Server\sqljdbc_4.1\enu\auth\x86\sqljdbc_auth.dll`

64 Bit: `\JDBC_SQL_Server\sqljdbc_4.1\enu\auth\x64\sqljdbc_auth.dll`

If is java 32 bits, the dll ( 32 bits ) should be copied to `c:\windows\`

If is java 64 bits, the dll ( 64 bits ) should be copied to `c:\windows\system32`

Some common errors may occur like the following

1.- Library not found

```log
com.microsoft.sqlserver.jdbc.SQLServerException: This driver is not configured for integrated authentication. ClientConnectionId:9dee6baf-4f79-4b42-984b-7f623e310e1d
```

2.- If Rundeck was started from a different domain than the database server this error may occurs.

```log
com.microsoft.sqlserver.jdbc.SQLServerException: Login failed. The login is from an untrusted domain and cannot be used with Integrated authentication. ClientConnectionId:933d902b-1a74-429c-974c-5c20d9a588d0
        at com.microsoft.sqlserver.jdbc.SQLServerException.makeFromDatabaseError(SQLServerException.java:259)
```

One solution is to use "localhost" in the jdbc connection

3.- Different arquitecture error

```log
Configuring Spring Security Core ...
... finished configuring Spring Security Core

2018-10-12 23:54:37.224  WARN --- [           main] c.m.s.jdbc.internals.AuthenticationJNI   : Failed to load the sqljdbc_auth.dll cause : C:\Windows\sqljd
bc_auth.dll: Can't load AMD 64-bit .dll on a IA 32-bit platform
2018-10-12 23:54:51.724 ERROR --- [           main] o.a.tomcat.jdbc.pool.ConnectionPool      : Unable to create initial connections of pool.
```

Example configuration in rundeck.config

```properties
dataSource.driverClassName = com.microsoft.sqlserver.jdbc.SQLServerDriver
dataSource.url = jdbc:sqlserver://mssql.rundeck.local;integratedSecurity=true;DatabaseName=rundeck
dataSource.username = rundeckuser
dataSource.password = rundeckpassword
```
