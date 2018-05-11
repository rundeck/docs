% Installing on Window

<!---
Originals:
http://support.rundeck.com/customer/en/portal/articles/2885088-installing-a-single-instance-of-rundeck-pro-cluster-on-windows
http://support.rundeck.com/customer/en/portal/articles/2819414-install-rundeck-pro-team-launcher-on-windows
http://support.rundeck.com/customer/en/portal/articles/2522223-enable-credssp-authentication-windows-
--->

Note: these instructions are for installing a single instance "cluster" (one cluster member only) for evaluation or standalone usage. 

## Install Rundeck Pro

This guide will install Rundeck PRO as a Service on a Windows Server. It uses the Rundeck Pro launcher installer (Jar file).
 
* Download the latest version of Rundeck PRO Cluster launcher here:  http://download.rundeck.com/versions.html
* Choose a root directory (e.g. C:\rundeck). 
* Place rundeckpro-launcher-cluster-X.X.X.jar in that directory
* Go to the RDECK_BASE (e.g. C:\rundeck) folder and launch the installation of rundeck.

```
cd C:\rundeck
java -jar rundeckpro-launcher-cluster-X.X.X.jar
```

![Windows launcher](../../figures/windows-launcher.png)

* After Rundeck PRO started, stop the process.
* Create a bat file (e.g. start_rundeck.bat) and place it under %RDECK_BASE%

```
set CURDIR=%~dp0
call %CURDIR%etc\profile.bat
java %RDECK_CLI_OPTS% %RDECK_SSL_OPTS% -jar    
rundeckpro-launcher-cluster-X.X.X.jar --skipinstall -d  >> %CURDIR%\var\logs\service.log  2>&1
```

* Download nssm.exe from http://nssm.cc/
* Place the executable under %RDECK_BASE% (you can place it elsewhere, but for the sake of the example let's use always the root dir)
* Open a prompt and issue these commands (Administrator mode required to install a service)

```
    cd C:\rundeck
    nssm.exe install RUNDECK
```
* the GUI pops up, set "path" as %RDECK_BASE%\start_rundeck.bat , startup directory  as %RDECK_BASE% (optionally set "low" on the process tab, under priority, to avoid server cpu spike when starting rundeck)

![NSSM Installer](../../figures/nssm-installer.png)

* Go to the service management console (services.msc) and you'll find RUNDECK listed as a service. Starting it will start the rundeck process.

![Service Management Console](../../service-management-console.png) 
 
### Login to the GUI
 
By default, Rundeck will be installed in port 4440. To access Rundeck, go to the following URL: http://servername:4440.
 
Normally, it is necessary to modify the `grails.serverURL` property in `%RDECK_BASE%\server\config\rundeck-config.properties` to access the GUI.
Change `grails.serverURL` to the server name or IP. You will need to restart
the Rundeck service for the change to take effect.

After the restart, you can access the GUI at http://servername:4440/

![Login page](../../figures/login-page.png)

The default username and password is "admin"

### Start-Stop instances

Use the Service Windows GUI to start/stop/restart the instance
 
### Install License File

Go to the GUI and click on the "No License Key File is installed" button

![No license key](../../figures/no-license-key.png)

Then click on "Upload License File"

![Upload license](../../figures/upload-license.png)

Then select the license file (.key file)  and press "Update License File"

![License](../../figures/license.png)

Finally, it is necessary to change the "Passive Mode" to "Active"

![Active mode](../../figures/active-mode.png)

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
|   |       realm.properties => Property file user directory when PropertyFileLoginModule is used
|   |       rundeck-config.properties => This is the primary Rundeck webapp configuration file. Defines default loglevel, datasource configuration, and GUI customization.
|   |       ssl.properties => To enable SSL access to rundeck
|   |      
|   +---data => H2 database
|   |       grailsdb.mv.db
|   +---exp
|   +---lib
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

## Enable CREPSSP Authentication On Windows Domain

### On the Rundeck server

#### Enable CredSSP

Open a powershell windows and run:

```
Enable-WSManCredSSP -Role "Client" -DelegateComputer "*.something.com"
```

Where `something.com` is the DNS domain of the target computer

or

```
Enable-WSManCredSSP -Role "Client" -DelegateComputer "*"
```


#### Allow Delegating Fresh Credentials

* Click **Start**, type **mmc** and then click **OK**.
* Click **File and then click **Add/Remove Snap-in**.
* Click **Group Policy Object** and then click **Add**.
* Select **Local Computer** and then click **Finish**.
* Go to **Computer Policy\Administrative Templates\System\Credentials Delegation\Allow Delegating Fresh Credentials** → Set to **enabled** 

![Enable delegating fresh credentials](../../figures/allow-delegating-fresh-credentials-1.png)

* Add **WSMAN/*** to list of computers and check the box for **Concatenate OS defaults with input above**.

![Add servers to list](../../figures/allow-delegating-fresh-credentials-2.png)

#### Enable CredSSP authentication on Winrm Client

Open a CMD Prompt as an Administrator user and execute:

```
winrm set winrm/config/client/auth @{CredSSP="true"}
```

You need to have winrm service configured and running.


### On the remote node

#### Enable CredSSP

Open a powershell windows and run:

```
Enable-WSManCredSSP -Role "Server"
```

#### Make sure that you enable the CredSSP on WinRM Service settings

To get the WinRm Service config:

```
winrm get winrm/config/service
```

To enable the CredSSP:

```
winrm set winrm/config/service/auth @{CredSSP="true"}
```

### Troubleshooting

If you are using a non-administrator user (or a not- domain-administrator user) to execute command to remote nodes, you need to set up the access on the remote machine ( to the user or some of its groups, eg: Domain User group).

To add permissions to non-administrator user to execute remote commands:

```
Set-PSSessionConfiguration Microsoft.Powershell -ShowSecurityDescriptorUI
```
