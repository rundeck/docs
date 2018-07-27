% Using Microsoft SQL Server as a database backend

<!---
Original: http://support.rundeck.com/customer/en/portal/articles/2819414-install-rundeck-pro-team-launcher-on-windows
--->

Create a database on your backend, plus a user (and assign it the db_owner role)

Download JDBC driver from Microsoft (For example for a Windows 2012 R2 host connecting to a MSSQL 2014 server, use sqljdbc41.jar (572KB, mod date 2015-11-18) ) 

Place it under %RDECK_BASE%\server\lib 

in %RDECK_BASE%\server\config\rundeck-config.properties, set the following: 

```
    rundeck.projectsStorageType=db
    dataSource.dbCreate = update
    dataSource.driverClassName = com.microsoft.sqlserver.jdbc.SQLServerDriver
    dataSource.url = jdbc:sqlserver://myserver;DatabaseName=RUNDECK
    dataSource.username = myusername
    dataSource.password = mypassword
```
