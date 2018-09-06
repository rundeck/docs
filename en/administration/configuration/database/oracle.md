% Using Oracle as a database backend

<!---
Original
http://support.rundeck.com/customer/en/portal/articles/2415681-oracle-setup)
--->

## Simple Guide

* Download the latest oracle driver (eg, ojdbc7.jar version 12.1.0.2): 

[http://www.oracle.com/technetwork/database/features/jdbc/default-2280470.html](http://www.oracle.com/technetwork/database/features/jdbc/default-2280470.html)

* Copy the downloaded file `ojdbc7.jar` to the `$RDECK_BASE/server/lib` for war launcher or in /var/lib/rundeck/lib (create it) for RPM and DEB installations
* Update `$RDECK_BASE/etc/rundeck-config.properties`:

```

dataSource.url = jdbc:oracle:thin:@127.0.0.1:1521:orcl # (change server name and instance name)
dataSource.driverClassName = oracle.jdbc.driver.OracleDriver
dataSource.username = XXXXXX
dataSource.password = XXXXXXX
dataSource.dialect = org.rundeck.hibernate.RundeckOracleDialect
dataSource.properties.validationQuery = SELECT 1 FROM DUAL
```
