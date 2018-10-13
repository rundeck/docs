Tested version
* Rundeck 3.0.6 TEAM
* SQL Server 2017 Express
* Windows 2012 R2
* Java 1.8


To enable security mode with SQL Server when executing rundeck.

Copy the "sqljdbc_auth.dll" file to windows folder

Example (32 bits )
\JDBC_SQL_Server\sqljdbc_4.1\enu\auth\x86\sqljdbc_auth.dll

to folder c:\windows\


Some common errors may occur like the following



1.- Library not found
----------
com.microsoft.sqlserver.jdbc.SQLServerException: This driver is not configured for integrated authentication. ClientConnectionId:9dee6baf-4f79-4b42-984b-7f623e310e1d
----------

2.- If Rundeck was started from a different domain than the database server this error may occurs. 
---------
com.microsoft.sqlserver.jdbc.SQLServerException: Login failed. The login is from an untrusted domain and cannot be used with Integrated authentication. ClientConnectionId:933d902b-1a74-429c-974c-5c20d9a588d0
        at com.microsoft.sqlserver.jdbc.SQLServerException.makeFromDatabaseError(SQLServerException.java:259)
-----------

One solution is to use "localhost" in the jdbc connection 


3.- Different arquitecture error 

-----------
Configuring Spring Security Core ...
... finished configuring Spring Security Core

2018-10-12 23:54:37.224  WARN --- [           main] c.m.s.jdbc.internals.AuthenticationJNI   : Failed to load the sqljdbc_auth.dll cause : C:\Windows\sqljd
bc_auth.dll: Can't load AMD 64-bit .dll on a IA 32-bit platform
2018-10-12 23:54:51.724 ERROR --- [           main] o.a.tomcat.jdbc.pool.ConnectionPool      : Unable to create initial connections of pool.
-----------
To fix, copy the correct library to c:\windows folder

32 Bit: \JDBC_SQL_Server\sqljdbc_4.1\enu\auth\x86\sqljdbc_auth.dll

64 Bit: \JDBC_SQL_Server\sqljdbc_4.1\enu\auth\x64\sqljdbc_auth.dll




Example configuration in rundeck.config 

##############Config BD SQL Server Example ###########

   rundeck.projectsStorageType=db
    dataSource.dbCreate = update
    dataSource.driverClassName = com.microsoft.sqlserver.jdbc.SQLServerDriver

# Non Secure mode
#    dataSource.url = jdbc:sqlserver://<IP_Address>;DatabaseName=rundeckdb

# Secure mode 
    dataSource.url = jdbc:sqlserver://localhost;integratedSecurity=true;DatabaseName=rundeckdb

    dataSource.username = rundeckuser
    dataSource.password = rundeckpass
#################################
