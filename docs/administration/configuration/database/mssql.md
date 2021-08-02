# Using Microsoft&reg; SQL Server as a database backend

<!---
Original: http://support.rundeck.com/customer/en/portal/articles/2819414-install-rundeck-pro-team-launcher-on-windows
--->

Create a database on your backend, plus a user (and assign it the db_owner role)

In %RDECK_BASE%\\server\\config\\rundeck-config.properties, set the following:

```properties
dataSource.driverClassName = com.microsoft.sqlserver.jdbc.SQLServerDriver
dataSource.url = jdbc:sqlserver://mssql.rundeck.local;DatabaseName=rundeck
dataSource.username = rundeckuser
dataSource.password = rundeckpassword
```
