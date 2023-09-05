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
### Sql Server Configuration

In certain instances, the default configuration of Sql Server has presented challenges in ensuring the seamless operation of Rundeck oss and Process Automation. These challenges include encountering deadlocks within numerous transactions, primarily attributed to Sql Server's distinct approach to managing concurrent data access at the row level, which differs from other database systems. Fortunately, these issues can be addressed through reconfiguration to enhance performance and facilitate smoother operations in such scenarios.

In Microsoft SQL Server (MSSQL), there exists a flag that allows you to modify the behavior of transactions when using the READ_COMMITTED isolation level. This flag is named 'is_read_committed_snapshot_on.' To determine its current status, you can execute the following query on your database:

```conf1
SELECT is_read_committed_snapshot_on, snapshot_isolation_state_desc,snapshot_isolation_state
FROM sys.databases
WHERE name = 'RundeckDBName'
```

Output:
```output
|is_read_committed_snapshot_on|snapshot_isolation_state_desc|snapshot_isolation_state|
|-----------------------------|-----------------------------|------------------------|
|0                            |OFF                          |0                       |
```

This flag can be a valuable tool for mitigating deadlocks by enabling transactions to access the last committed value of a row without waiting for other transactions to release their locks. To enable this feature:

```conf2
ALTER DATABASE RundeckDBName  
SET ALLOW_SNAPSHOT_ISOLATION ON  
  
ALTER DATABASE RundeckDBName  
SET READ_COMMITTED_SNAPSHOT ON  
```

