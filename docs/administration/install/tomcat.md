# Rundeck as a Tomcat servlet

## Installation on Linux

<!---
Originals:

http://support.rundeck.com/customer/en/portal/articles/2798971-install-rundeck-pro-with-tomcat-on-linux
http://support.rundeck.com/customer/en/portal/articles/1817834-install-rundeck-pro-as-a-war-tomcat-on-windows
http://support.rundeck.com/customer/en/portal/articles/2471602-upgrade-rundeck-pro-as-a-war-tomcat-
http://support.rundeck.com/customer/en/portal/articles/2799547-enable-ssl-tomcat
http://support.rundeck.com/customer/en/portal/articles/2539313-jndi-custom-settings-on-tomcat)


Should these be part of the OSS docs?

http://support.rundeck.com/customer/en/portal/articles/2433205-configuring-tomcat-for-ldaps
http://support.rundeck.com/customer/en/portal/articles/2859551-authentication-with-ad-or-ldap-on-tomcat

--->

:::warning
Rundeck 3.3.x requires a new system property to define the destination for your Rundeck logs to be set in your Tomcat launch JAVA_OPTS.  
Ensure you have set the `rundeck.server.logDir` to the directory that will hold your Rundeck logs. 
:::

- Install Tomcat on your environment, as a service or just using the binaries (as for this example).
- [Download](https://rundeck.org/downloads.html) the latest version of Rundeck war file and place it in `$tomcat.base/webapps/` as e.g. rundeck.war
- Create `$tomcat.base/bin/setenv.sh`

```bash
$ cat setenv.sh
   JAVA_OPTS="$JAVA_OPTS -XX:MaxPermSize=512m -Xmx2048m -Xms512m -server -Drdeck.base=/path/to/rundeck.base -Drundeck.config.location=/path/to/rundeck.base/server/config/rundeck-config.properties -Drundeck.server.logDir=/path/to/rundeck.base/server/logs"
```

- Create `/path/to/rundeck.base`
- Start Tomcat
- Go to `http://localhost:8080/rundeck`, then at login screen: stop Tomcat
- Edit `$rdeck.base/server/config/rundeck-config.properties` to match Tomcat's url:

```properties
grails.serverURL=http://localhost:8080/rundeck
server.servlet.context-path=/rundeck
```

- Edit `$rdeck.base/etc/framework.properties` to match Tomcat's url:

```properties
framework.server.name = localhost
framework.server.hostname = localhost
framework.server.port = 8080
framework.server.url = http://localhost:8080/rundeck
```

- Start Tomcat
- Go to `http://localhost:8080/rundeck` and login.

## Installation on Windows

- Install Tomcat on your environment, as a service or just using the binaries (as for this example).
- [Download](https://rundeck.org/downloads.html) the latest version of Rundeck war file and place it in `tomcat.base\\webapps\\` as e.g. rundeck.war
- Create `tomcat.base\\bin\\setenv.bat`

```bash
setenv.bat content:
   set "JRE_HOME=C:\Program Files\Java\jre1.8.0_181"
   set "JAVA_OPTS=-XX:MaxPermSize=512m -Xmx2048m -Xms512m -server -Drdeck.base=C:\path\to\rundeck.base -Drundeck.config.location=C:\path\to\rundeck.base\server\config\rundeck-config.properties -Drundeck.server.logDir=C:\path\to\rundeck.base\server\logs"
```

- Create `C:\\path\\to\\rundeck.base`
- Start Tomcat
- Go to `http://localhost:8080/rundeck`, then at login screen: stop Tomcat
- Edit `rdeck.base\\server\\config\\rundeck-config.properties` to match Tomcat's url:

```properties
grails.serverURL=http://localhost:8080/rundeck
server.contextPath=/rundeck
```

- Edit `rdeck.base\\etc\\framework.properties` to match Tomcat's url:

```properties
framework.server.name = localhost
framework.server.hostname = localhost
framework.server.port = 8080
framework.server.url = http://localhost:8080/rundeck
```

- Start Tomcat
- Go to `http://localhost:8080/rundeck` and login.

## Custom JNDI

### Using JNDI Resource Database Connection

This setting allow Rundeck to use JNDI database connections instead of the default grails settings.

- Add the Resource link on `$tomcat.base/conf/context.xml`

```xml
  <Resource name="jdbc/rundeckdb" auth="Container" type="javax.sql.DataSource"
               maxActive="100" maxIdle="30" maxWait="10000"
               username="rundeckuser" password="rundeckpassword" driverClassName="org.mariadb.jdbc.Driver"
               url="jdbc:mariadb://mysql.rundeck.local:3306/rundeck"/>
```

- on `$rundeck.base/server/config/rundeck-config.properties` add the `dataSource.jndiName` entry:

```properties
dataSource.jndiName=java:/comp/env/jdbc/rundeckdb
```

This will replace the dataSource.\* entries

### Using JNDI Database to manage the authentication

To use a custom authentication method using database tables:

- It is necessary to have tables like this:

```sql
create table users (
user_name varchar(15) not null primary key,
user_pass varchar(15) not null
);

create table user_roles (
user_name varchar(15) not null,
role_name varchar(15) not null,
primary key (user_name, role_name)
);

insert into users('samuel','samuel');
insert into user_roles values('samuel','user');
insert into user_roles values('samuel','admin');
```

- Define the Resource connection in `$tomcat.base/conf/server.xml`:

```xml
<!-- Global JNDI resources
      Documentation at /docs/jndi-resources-howto.html
 -->
 <GlobalNamingResources>
   <!-- Editable user database that can also be used by
        UserDatabaseRealm to authenticate users
   -->
   <Resource name="UserDatabase" auth="Container"
             type="org.apache.catalina.UserDatabase"
             description="User database that can be updated and saved"
             factory="org.apache.catalina.users.MemoryUserDatabaseFactory"
             pathname="conf/tomcat-users.xml" />

    <Resource name="jdbc/testDB"
                       auth="Container"
                       type="javax.sql.DataSource"
                       maxActive="100"
                       maxIdle="30"
                       maxWait="10000"
                       username="rundeckauth"
                       password="password"
                       driverClassName="com.mysql.jdbc.Driver"
                       url="jdbc:mysql://localhost:3306/userauthdb?autoReconnect=true"/>

  </GlobalNamingResources>
```

- Define the JNDI entry in `$tomcat.base/conf/server.xml`:

```xml
<!-- Use the LockOutRealm to prevent attempts to guess user passwords
     via a brute-force attack -->
<Realm className="org.apache.catalina.realm.LockOutRealm">
  <!-- This Realm uses the UserDatabase configured in the global JNDI
       resources under the key "UserDatabase".  Any edits
       that are performed against this UserDatabase are immediately
       available for use by the Realm.  -->
  <Realm className="org.apache.catalina.realm.UserDatabaseRealm"
         resourceName="UserDatabase"/>
</Realm>
 <Realm className="org.apache.catalina.realm.DataSourceRealm"
             dataSourceName="jdbc/testDB"
userTable="users"
userNameCol="user_name"
userCredCol="user_pass"
userRoleTable="user_roles"
roleNameCol="role_name"/>
```

Further information:

- [https://tomcat.apache.org/tomcat-7.0-doc/realm-howto.html#DataSourceRealm](https://tomcat.apache.org/tomcat-7.0-doc/realm-howto.html#DataSourceRealm)
- [https://tomcat.apache.org/tomcat-7.0-doc/jndi-datasource-examples-howto.html#MySQL_DBCP_Example](https://tomcat.apache.org/tomcat-7.0-doc/jndi-datasource-examples-howto.html#MySQL_DBCP_Example)

## Users authentication

Note for Linux and Windows installations: users are no longer in Tomcat's configuration files, at this point, users should be configured as in a [launcher installation](/administration/security/authentication.md#authenticating-users) and java options should be append to the setenv.sh or setenv.bat file.
