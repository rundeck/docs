% Rundeck Pro as a Tomcat servlet

## Installation

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

Note: Replace `$RDECK_BASE` with your rundeck base path and `$CATALINA_BASE` with your tomcat base path.
 

* [Download](http://download.rundeck.com/versions.html) the latest version of Rundeck Pro (war file)
* Install tomcat on linux environment, this could be done using a rpm/deb package (depending on your OS) or just using the binaries.
* Check your tomcat home folder (or Catalina home), eg: `/app/tomcat`.
* Create the following folders on $RDECK_BASE (eg: `/app/rundeckpro`)

```
$RDECK_BASE/etc
$RDECK_BASE/libext
$RDECK_BASE/projects
$RDECK_BASE/var
$RDECK_BASE/var/logs
$RDECK_BASE/var/data
$RDECK_BASE/var/tmp
```

* Edit or create the `$CATALINA_BASE/bin/setenv.sh`:

```
JAVA_OPTS="$JAVA_OPTS -XX:MaxPermSize=256m -Xmx2048m -Xms512m -server  -Drdeck.base=$RDECK_BASE -Drundeck.config.location=$RDECK_BASE/etc/rundeck-config.properties"
```

If you installed rundeck with RPM, the settings should be on `/etc/tomcat/tomcat.conf`
The memory settings depends on your environment.

* Add users to `$CATALINA_BASE/conf/tomcat_users.xml`

```
<tomcat-users>
    <role rolename="user"/>
    <role rolename="admin"/>
    <user username="user" password="user" roles="user"/>
    <user username="admin" password="admin" roles="user,admin"/>
</tomcat-users>
```

* Copy the war file to `$CATALINA_BASE/webapps/rundeckpro.war`
* Extract the war file on `$CATALINA_BASE/webapps/rundeckpro`. This can be done manually (using unzip or tar), or starting tomcat.
* Copy the content of this [log4j.properties](http://support.rundeck.com/customer/portal/articles/2419019-log4j-properties-template) file to:
`$CATALINA_BASE/webapps/rundeckpro/WEB-INF/classes/log4j.properties`

Replacing the paths with `$RDECK_BASE` as necessary.

* Create the following config files on $RDECK_BASE/etc with the content:

rundeck-config.properties

```
#loglevel.default is the default log level for jobs: ERROR,WARN,INFO,VERBOSE,DEBUG
loglevel.default=INFO
rdeck.base=$RDECK_BASE #replace with the real path

#rss.enabled if set to true enables RSS feeds that are public (non-authenticated)
rss.enabled=true
grails.serverURL=http://localhost:8080/rundeckpro  #replace with the real URL

dataSource.dbCreate = update
#it is recommended to use an external DB
dataSource.url = jdbc:h2:file:$RDECK_BASE/var/data/grailsdb;MVCC=true

# Pre Auth mode settings
rundeck.security.authorization.preauthenticated.enabled=false
rundeck.security.authorization.preauthenticated.attributeName=REMOTE_USER_GROUPS
rundeck.security.authorization.preauthenticated.delimiter=,
# Header from which to obtain user name
rundeck.security.authorization.preauthenticated.userNameHeader=X-Forwarded-Uuid
# Header from which to obtain list of roles
rundeck.security.authorization.preauthenticated.userRolesHeader=X-Forwarded-Roles
# Redirect to upstream logout url
rundeck.security.authorization.preauthenticated.redirectLogout=false
rundeck.security.authorization.preauthenticated.redirectUrl=/oauth2/sign_in
```

framework.properties

```
# ----------------------------------------------------------------
# Server connection information
# ----------------------------------------------------------------

framework.server.name = servername
framework.server.hostname = serverhostname
framework.server.port = 8080
framework.server.url = http://localhost:8080/rundeckpro  #replace with the real URL

# ----------------------------------------------------------------
# Installation locations
# ----------------------------------------------------------------

rdeck.base=$RDECK_BASE  #replace with the real path

framework.projects.dir=$RDECK_BASE/projects
framework.etc.dir=$RDECK_BASE/etc
framework.var.dir=$RDECK_BASE/var
framework.tmp.dir=$RDECK_BASE/var/tmp
framework.logs.dir=$RDECK_BASE/var/logs
framework.libext.dir=$RDECK_BASE/libext

# ----------------------------------------------------------------
# SSH defaults for node executor and file copier
# ----------------------------------------------------------------

framework.ssh.keypath = /home/someuser/.ssh/id_rsa
framework.ssh.user = someuser

# ssh connection timeout after a specified number of milliseconds.
# "0" value means wait forever.
framework.ssh.timeout = 0

# ----------------------------------------------------------------
rundeck.server.uuid = XXXXXX #generate with uuidgen

# ----------------------------------------------------------------
# System-wide global variables.
# ----------------------------------------------------------------

# Expands to ${globals.var1}
#framework.globals.var1 = value1

# Expands to ${globals.var2}
#framework.globals.var2 = value2
```

apitoken.aclpolicy

```
description: API project level access control
context:
 project: '.*' # all projects
for:
 resource:
   - equals:
       kind: job
     allow: [create,delete,run] # allow create and delete jobs
   - equals:
       kind: node
     allow: [read,create,update,refresh] # allow refresh node sources
   - equals:
       kind: event
     allow: [read,create] # allow read/create events
 adhoc:
   - allow: [read,run,kill] # allow running/killing adhoc jobs and read output
 job:
   - allow: [create,read,update,delete,run,kill] # allow create/read/write/delete/run/kill of all jobs
 node:
   - allow: [read,run] # allow read/run for all nodes
by:
 group: api_token_group

---

description: API Application level access control
context:
 application: 'rundeck'
for:
 resource:
   - equals:
       kind: system
     allow: [read] # allow read of system info
 project:
   - match:
       name: '.*'
     allow: [read] # allow view of all projects
 storage:
   - match:
       path: '(keys|keys/.*)'
     allow: '*' # allow all access to manage stored keys
by:
 group: api_token_group
```

admin.aclpolicy

```
description: Admin, all access.
context:
 project: '.*' # all projects
for:
 resource:
   - allow: '*' # allow read/create all kinds
 adhoc:
   - allow: '*' # allow read/running/killing adhoc jobs
 job:
   - allow: '*' # allow read/write/delete/run/kill of all jobs
 node:
   - allow: '*' # allow read/run for all nodes
by:
 group: admin

---

description: Admin, all access.
context:
 application: 'rundeck'
for:
 resource:
   - allow: '*' # allow create of projects
 project:
   - allow: '*' # allow view/admin of all projects
 project_acl:
   - allow: '*' # allow admin of all project-level ACL policies
 storage:
   - allow: '*' # allow read/create/update/delete for all /keys/* storage content
by:
 group: admin
```

* Add extra settings to `$RDECK_BASE/etc/rundeck-config.properties`. It is recommended to use an external database, and save the project settings and key storage on this database. Please check: http://rundeck.org/docs/administration/setting-up-an-rdb-datasource.html
* Add a server UUID on `$RDECK_BASE/etc/framework.properties`. Eg:

```
rundeck.server.uuid=XXXXXX.
```

You can generate the server UUID with the `uuidgen` command

* Start or restart tomcat
* Upload a license key

## Upgrading

First, Download the rundeckpro-edition-X.X.X.war file from the download page: http://download.rundeck.com/versions.html

The upgrade procedure should be:

* Back up your `log4j.properties` and `web.xml`, if you have changed anything there: ($CATALINA_BASE/webapps/rundeckpro/WEB-INF/classes/log4j.properties)
* Remove your `rundeckpro` and `rundeckpro.war` webapps directory.
* Back up the `libext` folder located in `$RDECK_BASE` if you have your own plugins, because the new version will load new plugin versions. If you don't have your own plugins, remove `libext`
* Remove the contents of `$RDECK_BASE/var/tmp/pluginJars/`
* If you have your own plugins on the previous `libext` folder, copy them back to the new libext folder.
* If you have setting related with plugins in `$RDECK_BASE/etc/rundeck-config.properties`, comment them in the first deploy. For example something like this: 
http://rundeck.org/docs/plugins-user-guide/bundled-plugins.html#jasypt-encryption-plugin
* Copy the new war file to `$CATALINA_BASE/webapps/`
* unzip the .war file if the autodeploy is not enabled.
* Update your `web.xml` and `log4j.properties` if you changed the default settings.
* Restart Tomcat
* Uncomment the setting in `$RDECK_BASE/etc/rundeck-config.properties` if you commented them out previous, and restart tomcat again.

## Custom JNDI

### Using JNDI Resource Database Connection

This setting allow Rundeck to use JNDI database connections instead of the default grails settings.

* Add the following entry on `$CATALINA_HOME/server.xml` under the `<GlobalNamingResources>` tag:

```
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

<Resource name="jdbc/rundeckdb"
                 global="jdbc/rundeckdb"
                 auth="Container"
                 type="javax.sql.DataSource"
   maxActive="100"
                maxIdle="30"
                maxWait="10000"
                username="rundeckuser"
                password="password"
                driverClassName="com.mysql.jdbc.Driver"
                url="jdbc:mysql://localhost:3306/rundeckdb"/>

</GlobalNamingResources>
```

* Add the Resource link on `$CATALINA_HOME/context.xml`

```
<ResourceLink name="jdbc/rundeckdb"
                        global="jdbc/rundeckdb"
                        type="javax.sql.DataSource"/>
```

* on `$RDECK_HOME/etc/rundeck-config.properties` add the `dataSource.jndiName` entry:

```
dataSource.jndiName=java:/comp/env/jdbc/rundeckdb
```

This will replace the dataSource.* entries

### Using JNDI Database to manage the authentication

To use a custom authentication method using database tables:

* It is necessary to have tables like this:

```
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

* All users needs a default role called "user" by default, if you want to change that you need to edit `$CATALINA_HOME/webapps/rundeckpro/WEB-INF/web.xml`

```
<security-role><role-name>user</role-name></security-role>
```
*change the default role name

* Define the Resource connection in `$CATALINA_HOME/server.xml`:

```
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

* Define the JNDI entry in `$CATALINA_HOME/server.xml`:

```
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

* [https://tomcat.apache.org/tomcat-7.0-doc/realm-howto.html#DataSourceRealm](https://tomcat.apache.org/tomcat-7.0-doc/realm-howto.html#DataSourceRealm)
* [https://tomcat.apache.org/tomcat-7.0-doc/jndi-datasource-examples-howto.html#MySQL_DBCP_Example](https://tomcat.apache.org/tomcat-7.0-doc/jndi-datasource-examples-howto.html#MySQL_DBCP_Example)

## Configure Active Directory (AD) or LDAP Authentication

Edit `$CATALINA_BASE/conf/server.xml` and add the following realm definition.

Replace the "@token@" strings with values corresponding to your Active Directory/LDAP  structure.
 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.xml}
<Realm className="org.apache.catalina.realm.JNDIRealm"
       connectionName="@jndi_connectionName@"
       connectionPassword="@jndi_connectionPassword@"
       connectionURL="@jndi_connectionURL@"
       referrals="follow"
       userBase="@jndi_userBase@"
       userSearch="(sAMAccountName={0})"
       userSubtree="true"
       roleBase="@jndi_roleBase@"
       roleName="cn"
       roleSearch="(member={0})"
       roleSubtree="true"
       roleNested="true"
       commonRole="user"
  />
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Here are the descriptions for each attribute:

* connectionName: The account bind name (eg, cn=user,ou=blah,dc=example,dc=com or eg, * Administrator@sops.local)
* connectionPassword: the connection user's password (eg 'password')
* connectionURL: the URL to the ldap server (eg, 'ldap://192.168.50.11:389' )
* userBase: Base for finding users. (eg, 'dc=example,dc=com'), or
* userPattern: Pattern for finding users. (eg, 'cn={0},dc=example,dc=com')
* userSearch: Filter use to find the user. (eg: (sAMAccountName={0}) or (name={0})
* roleBase: Base for finding roles (eg 'OU=Rundeck,dc=example,dc=com' )

To use both authentication methods, AD/LDAP plus the default users file (conf/tomcat-users.xml), use CombinedRealm:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.xml}
<Realm className="org.apache.catalina.realm.CombinedRealm">
    <Realm className="org.apache.catalina.realm.UserDatabaseRealm"
           resourceName="UserDatabase"/>
    <Realm className="org.apache.catalina.realm.JNDIRealm"
           connectionName="CN=Administrator,CN=Users,DC=Example,DC=local"
           connectionPassword="password"
           connectionURL="ldap://server:389"
           referrals="follow"
           userBase="CN=Users,DC=Domain,DC=local"
           userSearch="(sAMAccountName={0})"
           userSubtree="true"
           roleBase="CN=Roles,DC=Example,DC=local"
           roleName="cn"
           roleSearch="(member={0})"
           roleSubtree="true"
           roleNested="true"
           commonRole="user"
    />
</Realm>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Further information about Realm authentication:

* https://tomcat.apache.org/tomcat-8.0-doc/realm-howto.html#JNDIRealm
* https://tomcat.apache.org/tomcat-8.0-doc/realm-howto.html#CombinedRealm
 
### Enable logging debug for tomcat authentication 

Edit the file `$CATALINA_BASE/conf/logging.properties` and add the following entries:

* Modify the FileHandler.level from FINE to ALL

```
2localhost.org.apache.juli.FileHandler.level = ALL
2localhost.org.apache.juli.FileHandler.directory = ${catalina.base}/logs
2localhost.org.apache.juli.FileHandler.prefix = localhost.
```

* Add the following lines at the end of the file

```
org.apache.catalina.core.ContainerBase.[Catalina].level = ALL
org.apache.catalina.core.ContainerBase.[Catalina].handlers = 2localhost.org.apache.juli.FileHandler
```

The log will be enable on `localhost.YYYY-MM-DD.log` file on `$CATALINA_BASE/logs` folder

## Connect to Active Directory with LDAPS (Windows)

If you need to configure Tomcat to connect to your Active Directory server using LDAPS, this is how to do it.

### Configure LDAPS

Check the follow document to enable LDAPS and create a certificate:
[http://social.technet.microsoft.com/wiki/contents/articles/2980.ldap-over-ssl-ldaps-certificate.aspx](http://social.technet.microsoft.com/wiki/contents/articles/2980.ldap-over-ssl-ldaps-certificate.aspx)

### Export the certificate from Active Directory

* Click **Start**, type **mmc** and then click **OK**.
* Click **File** and then click **Add/Remove Snap-in.**
* Click **Certificates** and then click **Add**.
* Select **Service account** and then click **Next**.

![](../../figures/tomcat-ldaps-service-account.png)

* In the **Select Computer** dialog box, select **Local computer** if you are working on the local computer, or select **Another computer** to find the remote computer.

![](../../figures/tomcat-ldaps-select-computer.png)

* Select **Active Directory Domain Services** and then click **Finish**.

![](../../figures/tomcat-ldaps-ad-domain-services.png)

* Expand **Certificates - Services (Active Directory Domain Services)** and then click **NTDS\Personal**. Right-click **NTDS\Personal**, click **All Tasks**, and then click **Export**

![](../../figures/tomcat-ldaps-cert-export.png)

On the Certificate Export Wizard welcome screen, click Next.

![](../../figures/tomcat-ldaps-cert-export-wizard.png)

Export the certificate in .cer format

![](../../figures/tomcat-ldaps-cert-export-wizard-format.png)

Save the certificate

![](../../figures/tomcat-ldaps-cert-export-wizard-save.png)

### Import the certificate into java keystore

Generate the truststore key in order to use it in the tomcat context.
Run the follow command:

```
keytool  -import -trustcacerts -alias @ALIAS_NAME@  -file @CERTIFICATE_NAME.cer@ -keystore @CERT_PATH@/@KEYSTORE_NAME@
```

Where `@CERTIFICATE_NAME.cer@` is the certificate exported in the previous step

### Add the keystore to tomcat 

Add to `tomcat.conf` or `setenv.sh`, depending on the installation type.

`$CATALINA_BASE/conf/tomcat.conf`  (.rpm install)

```
#Use JAVA_OPTS to set java.library.path for libtcnative.so
#JAVA_OPTS="-Djava.library.path=/usr/lib"
JAVA_OPTS=" -XX:MaxPermSize=256m -Xmx1024m -Xms256m -server -Djavax.net.ssl.trustStore=@CERT_PATH@/@KEYSTORE_NAME@  -Drdeck.base=$RDECK_HOME -Drundeck.config.location=$RDECK_HOME/etc/rundeck-config.properties "
```

`$CATALINA_BASE/bin/setenv.sh` (.deb install)

```
CATALINA_PID="$CATALINA_BASE/logs/catalina.pid"
CATALINA_OPTS="-Drdeck.base=$RDECK_HOME -Drundeck.config.location=$RDECK_HOME/etc/rundeck-config.properties"
JAVA_OPTS="-server -Xmx1024m -Djavax.net.ssl.trustStore=@CERT_PATH@/@KEYSTORE_NAME@"
```
 
### Configure Tomcat JNDI Realm

In the `$CATALINA_BASE/server/conf/server.xml` specify the `connectionURL` using the ldaps address:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.xml}
<Realm className="org.apache.catalina.realm.CombinedRealm">
    <Realm className="org.apache.catalina.realm.UserDatabaseRealm"
           resourceName="UserDatabase"/>
    <Realm className="org.apache.catalina.realm.JNDIRealm"
           connectionName="CN=@USERNAME@,CN=Users,DC=WindowsVirtual,DC=local"
           connectionPassword="@PASSWORD@"
           connectionURL="ldaps://@LDAPSERVER@:636"
           referrals="follow"
           userBase="CN=Users,DC=WindowsVirtual,DC=local"
           userSearch="(sAMAccountName={0})"
           userSubtree="true"
           roleBase="CN=Roles,DC=WindowsVirtual,DC=local"
           roleName="cn"
           roleSearch="(member={0})"
           roleSubtree="true"
           roleNested="true"
           commonRole="user"
    />
</Realm>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This example allow to use both authentication methods, LDAPS and tomcat-users.xml

### Troubleshooting

In order to test the connection with LDAPS server, you can use the SSLPoke utiliy:

* Download SSLPoke:
[https://confluence.atlassian.com/kb/unable-to-connect-to-ssl-services-due-to-pkix-path-building-failed-779355358.html
](https://confluence.atlassian.com/kb/unable-to-connect-to-ssl-services-due-to-pkix-path-building-failed-779355358.html)

* Test the connection using the certificate:

```
java -Djavax.net.ssl.trustStore=cacerts_ldapcertificate  SSLPoke 192.168.0.5 636 
```
