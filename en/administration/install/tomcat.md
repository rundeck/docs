% Rundeck Pro as a Tomcat servlet

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

* Install Tomcat on your environment, as a service or just using the binaries (as for this example).
* [Download](https://rundeck.org/downloads.html) the latest version of Rundeck war file and place it in $tomcat.base/webapps/ as e.g. rundeck.war
* Create $tomcat.base/bin/setenv.sh

```
$ cat setenv.sh
   JAVA_OPTS="$JAVA_OPTS -XX:MaxPermSize=512m -Xmx2048m -Xms512m -server -Drdeck.base=/path/to/rundeck.base -Drundeck.config.location=/path/to/rundeck.base/server/config/rundeck-config.properties"
```

* Create /path/to/rundeck.base
* Start Tomcat
* Go to http://localhost:8080/rundeck, then at login screen: stop Tomcat
* Edit $rdeck.base/server/config/rundeck-config.properties to match Tomcat's url:

```
grails.serverURL=http://localhost:8080/rundeck
```

* Start Tomcat
* Go to http://localhost:8080/rundeck and login.


## Installation on Windows

* Install Tomcat on your environment, as a service or just using the binaries (as for this example).
* [Download](https://rundeck.org/downloads.html) the latest version of Rundeck war file and place it in tomcat.base\webapps\ as e.g. rundeck.war
* Create tomcat.base\bin\setenv.bat

```
setenv.bat content:
   set "JRE_HOME=C:\Program Files\Java\jre1.8.0_181"
   set "JAVA_OPTS=-XX:MaxPermSize=512m -Xmx2048m -Xms512m -server -Drdeck.base=C:\path\to\rundeck.base -Drundeck.config.location=C:\path\to\rundeck.base\server\config\rundeck-config.properties"
```

* Create C:\path\to\rundeck.base
* Start Tomcat
* Go to http://localhost:8080/rundeck, then at login screen: stop Tomcat
* Edit rdeck.base\server\config\rundeck-config.properties to match Tomcat's url:
```
grails.serverURL=http://localhost:8080/rundeck
```
* Start Tomcat
* Go to http://localhost:8080/rundeck and login.


## Users authentication

Note for Linux and Windows installations: users are no longer in Tomcat's configuration files, at this point, users should be configured as in a [launcher installation](https://rundeck.org/docs/administration/security/authenticating-users.html) and java options should be append to the setenv.sh or setenv.bat file:


## Known issue

If ldap/AD authentication is configured, you will need to copy below file (use proper path on Windows) and then restart Tomcat:
```
cp $tomcat.base/webapps/rundeck/WEB-INF/lib-provided/jetty-util-9.4.11.v20180605.jar $tomcat.base/webapps/rundeck/WEB-INF/lib/
```
