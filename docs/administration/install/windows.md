# Installing on Windows

### Prerequisites

Before proceeding to install Rundeck, check all hardware [requirements](https://docs.rundeck.com/docs/administration/install/system-requirements.html) to make sure that our machine can be run Rundeck, also, make sure that the Windows user profile has the sufficient rights to install software in the Operating System.

Also, the main dependency is Java Development Kit 1.8 (JDK 8), you can download it from Oracle [website](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html).

### Installing Rundeck on Windows based systems and first run

The first step is to download Rundeck WAR file and save it on the main work directory, e.g. `C:\rundeck`, you can download [Community](https://www.rundeck.com/open-source/download) version or [Enterprise](https://download.rundeck.com/) and save it on `C:\rundeck` folder, now you will set Rundeck path environment variable, for that set it on a Powershell window and :

```powershell
set RDECK_BASE=C:\rundeck
```

Next, we need to launch Rundeck the first time to generate the configuration files and folders structure, for that you can open a Powershell, go to `c:\rundeck` and execute `java -jar rundeck-3.0.X.war` (in community case) or `java -jar rundeckpro-[edition]-3.0.X.war` for Enterprise; depending of your system the process can take some time, when Rundeck is ready you can see that on Powershell window:

![Windows launcher](~@assets/img/windows-launcher.png)

At this point, all Rundeck structure is ready and you can stop the process with `<Crtl+C>` keyboard combination to proceed to configure.

## Folder Structure

```
+---etc
|       admin.aclpolicy => Administrator access control policy defined with a [aclpolicy] document.
|       apitoken.aclpolicy => Default API ACL policies.
|       cli-log4j.properties => This file defines the logging configuration for the Commandline tools.
|       framework.properties => Configuration file used by shell tools and core Rundeck services.
|       preferences.properties
|       profile
|       profile.bat => Shell environment variables used by the shell tools.
|       project.properties =>Rundeck project configuration file when using Filsystem based project defintions.
+---libext => Plugin folder.
+---projects => Projects data (eg: resource files, project properties, etc)
+---server
|   +---config
|   |       jaas-loginmodule.conf
|   |       log4j.properties => This file defines the logging configuration for rundeck.
|   |       realm.properties => Property file user directory when PropertyFileLoginModule is used.
|   |       rundeck-config.properties => This is the primary Rundeck webapp configuration file. Defines default loglevel, datasource configuration, and GUI customization.
|   |       ssl.properties => To enable SSL access to rundeck.
|   +---data => H2 default database
|   |       grailsdb.mv.db
|   +---lib
|   |       rundeck-core-3.0.X.jar => rundeck core
|   +---logs => Rundeck logging
|   |       rundeck.access.log => access to rundeck.
|   |       rundeck.api.log => API calls
|   |       rundeck.audit.log => Authorization messages pertaining to aclpolicy.
|   |       rundeck.executions.log => Logs of all executions.
|   |       rundeck.jobs.log => Log of all job definition changes.
|   |       rundeck.log=> General Rundeck application messages.
|   |       rundeck.options.log=> Logs remote HTTP requests for Options JSON data.
|   |       rundeck.project.log
|   |       rundeck.storage.log=> Standard input and output generated during runtime.
|   +---sbin
|   \---work
+---tools=> rd-acl client (to manage ACL validation).
\---var   => Executions Logs folder.
```

### Configuring Rundeck

After installing Rundeck, the first run and know the files/folders structure, you need to configure it, basically publish Rundeck to be available in the network and generate a .bat script to launch Rundeck and use some parameters depending on our needs.

To publish Rundeck to be available in your network, open `C:\rundeck\server\config\rundeck-config.properties` with your favorite text editor and change this line:

```properties
server.address=yourhostname
```

by:

```properties
server.address=0.0.0.0
```

Save the file it and now is time to create a .bat script that launch rundeck properly. For that create a file called `start_rundeck.bat` with your favorite text editor and put this in the for Rundeck Community version:

```batch
set CURDIR=%~dp0
call %CURDIR%etc\profile.bat
java %RDECK_CLI_OPTS% %RDECK_SSL_OPTS% -jar rundeck-3.0.X.war --skipinstall -d  >> %CURDIR%\var\logs\service.log  2>&1
```

Or for Rundeck Enterprise version:

```batch
set CURDIR=%~dp0
call %CURDIR%etc\profile.bat
java %RDECK_CLI_OPTS% %RDECK_SSL_OPTS% -jar rundeckpro-[edition]-3.0.X.war --skipinstall -d  >> %CURDIR%\var\logs\service.log  2>&1
```

To launch, execute start_rundeck.bat at Powershell session, to stop Rundeck you can press `<Crtl+C>` keyboard combination.

### Login to the GUI

By default, Rundeck will be installed in TCP port 4440. To access, go to the following URL using your web browser: `http://servername:4440` (when "servername" is the name of your Windows host).

![Login page](~@assets/img/login-page.png)

The default username and password is "admin" with password "admin".

### Run rundeck as a Service

This section will install Rundeck Community or Enterprise as a Service on a Windows based systems.

- [Install](#installing-rundeck-on-windows-systems-and-first-run) Rundeck.
- Download [nssm.exe](http://nssm.cc/)
- Place the executable under `%RDECK_BASE%` (you can place it elsewhere, but for the sake of the example let's use always the root dir)
- Open a prompt and issue these commands (Administrator user profile is required to install a service)

```batch
    cd C:\rundeck
    nssm.exe install RUNDECK
```

- The GUI pops up, set "path" as `%RDECK_BASE%\start_rundeck.bat`, startup directory as `%RDECK_BASE%` (optionally set "low" on the process tab, under priority, to avoid server CPU spike when starting Rundeck)

![NSSM Installer](~@assets/img/nssm-installer.png)

- Go to the Service Management Console (services.msc) and you'll find `rundeck` listed as a service. Starting it will start the `rundeck` process.

![Service Management Console](~@assets/img/service-management-console.png)

- set JVM memory heap on `%RDECK_BASE%\etc\profile.bat`.

Replace the `RDECK_CLI_OPTS` variable with the amount of memory that you need, for example:

```batch
....

set RDECK_CLI_OPTS=-Xms1024m -Xmx4096m
set RD_LIBDIR=%RDECK_BASE%\tools\lib
```

Now, Rundeck is configured as a Service and can be launch it at the moment of start Windows.

### Start-Stop instances

Go to the Service Management Console (services.msc) and you'll find Rundeck listed as a service. You can start, stop or restart `rundeck` service.
