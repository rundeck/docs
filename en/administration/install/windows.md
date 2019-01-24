% Installing on Windows

<!---
Originals:
http://support.rundeck.com/customer/en/portal/articles/2885088-installing-a-single-instance-of-rundeck-pro-cluster-on-windows
http://support.rundeck.com/customer/en/portal/articles/2819414-install-rundeck-pro-team-launcher-on-windows
http://support.rundeck.com/customer/en/portal/articles/2522223-enable-credssp-authentication-windows-
--->


This guide will install Rundeck PRO or Open Source as a Service on a Windows Server. It uses the Rundeck executable war installer.
 
* Download the latest Rundeck war [OSS](http://rundeck.org/downloads.html) or [PRO](http://download.rundeck.com/versions.html)   
* Choose a root directory (e.g. C:\rundeck). This will be your  `%RDECK_BASE%`
* Place `rundeckpro-[edition]-X.X.X.war` in that directory
* Go to the `%RDECK_BASE%` (e.g. `C:\rundeck) folder and launch the installation of rundeck.

```
set RDECK_BASE=C:\rundeck
cd %RDECK_BASE%
java -jar rundeckpro-[edition]-X.X.X.war
```


![Windows launcher](../../figures/windows-launcher.png)


* After Rundeck started, stop the process.
* Create a bat file (e.g. start_rundeck.bat) and place it under `%RDECK_BASE%`


```
set CURDIR=%~dp0
call %CURDIR%etc\profile.bat
java %RDECK_CLI_OPTS% %RDECK_SSL_OPTS% -jar rundeckpro-[edition]-X.X.X.war --skipinstall -d  >> %CURDIR%\var\logs\service.log  2>&1
```

* Download [nssm.exe](http://nssm.cc/)
* Place the executable under `%RDECK_BASE%` (you can place it elsewhere, but for the sake of the example let's use always the root dir)
* Open a prompt and issue these commands (Administrator mode required to install a service)

```
    cd C:\rundeck
    nssm.exe install RUNDECK
```
* the GUI pops up, set "path" as `%RDECK_BASE%\start_rundeck.bat` , startup directory  as `%RDECK_BASE%` (optionally set "low" on the process tab, under priority, to avoid server cpu spike when starting rundeck)

![NSSM Installer](../../figures/nssm-installer.png)


* Go to the service management console (services.msc) and you'll find RUNDECK listed as a service. Starting it will start the rundeck process.

![Service Management Console](../../figures/service-management-console.png) 
 

* set JVM memory heap on `%RDECK_BASE%\etc\profile.bat`. 
Replace the `RDECK_CLI_OPTS` variable with the amount of memory that you need, for example:

```
....

set RDECK_CLI_OPTS=-Xms512m -Xmx2048m
set RD_LIBDIR=%RDECK_BASE%\tools\lib
```
 

### Login to the GUI
 
By default, Rundeck will be installed in port 4440. To access Rundeck, go to the following URL: `ttp://servername:4440`.
 
Normally, it is necessary to modify the `grails.serverURL` property in `%RDECK_BASE%\server\config\rundeck-config.properties` to access the GUI.
Change `grails.serverURL` to the server name or IP. You will need to restart
the Rundeck service for the change to take effect.

After the restart, you can access the GUI at `http://servername:4440/`

![Login page](../../figures/login-page.png)


The default username and password is "admin"

### Start-Stop instances

Use the Service Windows GUI to start/stop/restart the instance
 

## Folder Structure
 
```
+---etc
|       admin.aclpolicy => Administrator access control policy defined with a [aclpolicy] document
|       apitoken.aclpolicy => Default API ACL policies
|       cli-log4j.properties => This file defines the logging configuration for the Commandline tools.
|       framework.properties => Configuration file used by shell tools and core Rundeck services
|       preferences.properties
|       profile
|       profile.bat => Shell environment variables used by the shell tools
|       project.properties =>Rundeck project configuration file when using Filsystem based project defintions.
+---libext => Plugin folder
+---projects => Projects data (eg: resource files, project properties, etc)
+---server
|   +---config
|   |       jaas-loginmodule.conf
|   |       log4j.properties => This file defines the logging configuration for rundeck.
|   |       realm.properties => Property file user directory when PropertyFileLoginModule is used
|   |       rundeck-config.properties => This is the primary Rundeck webapp configuration file. Defines default loglevel, datasource configuration, and GUI customization.
|   |       ssl.properties => To enable SSL access to rundeck
|   +---data => H2 database
|   |       grailsdb.mv.db
|   +---lib
|   |       rundeck-core-3.0.x.jar => rundeck core 
|   +---logs => Rundeck logging 
|   |       rundeck.access.log => access to rundeck
|   |       rundeck.api.log => Api calls
|   |       rundeck.audit.log => Authorization messages pertaining to aclpolicy
|   |       rundeck.executions.log => Logs of all executions
|   |       rundeck.jobs.log => Log of all job definition changes
|   |       rundeck.log=> General Rundeck application messages
|   |       rundeck.options.log=> Logs remote HTTP requests for Options JSON data
|   |       rundeck.project.log
|   |       rundeck.storage.log=> Standard input and output generated during runtime
|   +---sbin
|   \---work
+---tools=> rd-acl client (to manage ACL validation)
\---var   => Executions Logs folder
```
