# Using Oracle as a database backend

<!---
Original
http://support.rundeck.com/customer/en/portal/articles/2415681-oracle-setup)
--->

## Simple Guide

- Download the latest oracle driver (eg, ojdbc7.jar version 12.1.0.2):

[http://www.oracle.com/technetwork/database/features/jdbc/default-2280470.html](http://www.oracle.com/technetwork/database/features/jdbc/default-2280470.html)

- Copy the downloaded file `ojdbc7.jar` to the `$RDECK_BASE/server/lib` for war launcher or in `/var/lib/rundeck/lib` (create it) for RPM and DEB installations
- Update `rundeck-config.properties` file according to your installation [layout](https://docs.rundeck.com/docs/administration/configuration/config-file-reference.html#configuration-layout):

```properties
dataSource.driverClassName = oracle.jdbc.driver.OracleDriver
dataSource.url = jdbc:oracle:thin:@oracle.rundeck.local:1521:orcl #orcl is the instance name
dataSource.username = rundeckuser
dataSource.password = rundeckpassword
dataSource.dialect = org.rundeck.hibernate.RundeckOracleDialect
dataSource.properties.validationQuery = SELECT 1 FROM DUAL
```

:::tip
The config properties above are case sensitive.
:::
