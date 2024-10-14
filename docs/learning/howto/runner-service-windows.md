# Enterprise Runner as Windows Service

Hosting the [Enterprise Runner](/administration/runner/index.md) as a service offers several key advantages. 
First and foremost, it ensures the reliability and availability of your automation processes. 
By transforming Enterprise Runner into a Windows service, it becomes a persistent, background application that starts automatically with the system, even if no user is logged in. 
This not only enhances system resilience but also facilitates unattended operation, allowing your automated tasks to execute without human intervention.

This guide will walk through the process of installing the Enterprise Runner as a Windows service through two methods:

* [Apache Commons tool](#installing-the-enterprise-runner-service-through-apache-commons-daemon)<br>
* [NSSM tool](#an-alternative-way-installing-the-enterprise-runner-service-through-nssm)

Both methods ensure that users can leverage the full potential of this essential component of the Runbook Automation platform.

## Enterprise Runner Installation for Runbook Automation Self-Hosted

:::tip Note
Skip this section if you have already installed an Enterprise Runner on a Windows host.
:::

1. Stop the Runbook Automation server instance service.

2. Edit the `rundeck-config.properties` file and add the following line:

```
rundeck.feature.runner.enabled=true
```

This line enables the Enterprise Runner functionality on Runbook Automation Self-Hosted. Runbook Automation SaaS includes this feature out of the box.

Check the `grails.serverURL` property on the `rundeck-config.properties` file (must be configured with the external Runbook Automation URL/IP, e.g. `grails.serverURL=http://my_rundeck_server:4440`) to ensure that your Runbook Automation instance is accessible by the remote node.

Also, set the `server.address` parameter to receive connections from any network location; for testing purposes, set it to `server.address=0.0.0.0` (to receive connections from any LAN node).

3. Save the file and start the Runbook Automation Instance.

4. Log in and then, create a new test project called ProjectRUNNER.

5. Click on the Gear Icon (up to right) and then on the "Runner Management" link.<br>

![Runner Management](/assets/img/raas7.png)<br>

6. Click on "+ Create Runner" button.

![Creating a Enterprise Runner](/assets/img/raas10.png)<br>

7. Give it a name and an optional description, then click the "Next" button.

![Runner Name and Description](/assets/img/raas14.png)<br>

8. Click the switch to associate the Enterprise Runner with a "ProjectRUNNER" created in step 4. Click the "Next" button.

![Runner Project Association](/assets/img/raas9.png)<br>

9. Click the "Download" button to get the Enterprise Runner `.jar` file, this file must be run on the Windows host. Click the "Close and Complete" button.

![Confirmation Screen](/assets/img/raas6.png)<br>

10. Now go to Project Settings > Edit Nodes.

![Edit Nodes](/assets/img/raas12.png)<br>

11. On the Local model source, click the "Edit" button.

![Local Model Source](/assets/img/raas4.png)<br>

12. Scroll down and put "windows" on the "OS Family" field, then save.

![Runner OS Family](/assets/img/raas1.png)<br>

The runner was configured on our Project, now, let's test the runner from the Windows machine.

## Preparing and Testing the Enterprise Runner on the Windows Host

Before configuring the Enterprise Runner as a service, a good starting point could be to test the connection between the Enterprise Runner and the Runbook Automation instance. To do so, check the following steps:

1. Review the Enterprise Runner requirements, the major need being Java 11 JRE and the `JAVA_HOME` environment variable configured.

2. Make a new folder, such as `C:\runner\` in this example.

3. Place the `.jar` file created in the previous section in the folder `C:\runner\`.

4. Rename the file as `runner.jar`.

5. Now, open a Powershell terminal and manually start the Enterprise Runner to test connectivity: `java -jar runner.jar`. You must see the message Runner started. Version: 0.1.52. The Enterprise Runner is running and listening.

6. Back to the Rundeck instance web interface.

7. Go to your project, select the Gear Icon (up to right), and then the "Runner Management" link.

![Enterprise Runner list](/assets/img/raas11.png)<br>

8. When you see your Enterprise Runner created in the previous section, click the "Actions" button and select "Ping".

![Runner Ping test](/assets/img/raas13.png)<br>

9. You will see the ping response at the top of the screen, this means the connectivity between Runbook Automation instance and Enterprise Runner is OK.

![Ping test successfully](/assets/img/raas3.png)<br>

10. Back to the Windows remote node and stop the Enterprise Runner with the following key combination: `Ctrl+C` on the CMD terminal.

Now let's see two ways of installing Enterprise Runner as a service.

## Installing the Enterprise Runner service through Apache Commons Daemon

Apache Commons Daemon, often referred to simply as Commons Daemon, is a set of Java libraries and utilities provided by the Apache Software Foundation. Its primary purpose is to facilitate the development of cross-platform Java applications that can be run as background services or daemons on various operating systems, including Windows.

To register the Enterprise Runner as a service, check the following steps:

1. Download Apache Commons Daemons binaries from [this](https://dlcdn.apache.org//commons/daemon/binaries/windows/) location.

2. Uncompress the file and copy the `prunmgr.exe` and `prunsrv.exe` files to the `C:\runner\` folder.

3. Rename the `prunsrv.exe` as `runner.exe`, and `prunmgr.exe` as `runnerw.exe`.

4. Open a new CMD terminal with Administrative rights.

5. Go to the `C:\runner\` folder.

6. Execute the following command (you can copy and paste it directly on the CMD terminal to execute it):

```
runner.exe //IS/runner ^
 --DisplayName=Runner ^
 --LogLevel=Debug ^
 --LogPath=C:\runner ^
 --ServiceUser=LocalSystem ^
 --Startup=auto ^
 --StartMode=java ^
 --StartPath=C:\runner ^
 --StartParams=-jar#runner.jar ^
 --StopMode=exe ^
 --StopPath=C:\runner ^
 --StopImage=TASKKILL.exe ^
 --StopTimeout=30 ^
 --PidFile=rundeck.pid ^
 --JvmMs=1024 --JvmMx=2048 ^
 --StdOutput=C:\runner\runner.log ^
 --StdError=C:\runner\runner.log
```

You will see the following messages:

```
[2023-10-04 13:12:51] [info]  ( prunsrv.c:2018) [ 5164] Apache Commons Daemon procrun (1.3.4.0 32-bit) started.
[2023-10-04 13:12:51] [debug] ( prunsrv.c:774 ) [ 5164] Installing service...
[2023-10-04 13:12:51] [info]  ( prunsrv.c:831 ) [ 5164] Installing service 'runner' name 'Runner'.
[2023-10-04 13:12:51] [debug] ( prunsrv.c:865 ) [ 5164] Setting service user 'LocalSystem'.
[2023-10-04 13:12:51] [info]  ( prunsrv.c:882 ) [ 5164] Service 'runner' installed.
[2023-10-04 13:12:51] [info]  ( prunsrv.c:2102) [ 5164] Apache Commons Daemon procrun finished.
```

7. Now press the Windows key + R key combination, then type `services.msc` and press the Enter key.

8. Scroll down the Service list and locate the "Runner" service.

![Launching services.msc](/assets/img/raas2.png)<br>

9. Click the right button and select "Start", after a couple of seconds, the service must be shown as "Running" status.

![Windows Services](/assets/img/raas5.png)<br>

### How to remove the service

To stop and remove the Enterprise Runner service check the following steps:

1. Open a new CMD terminal with Administrative rights.

2. Go to the `C:\runner\` folder.

3. Execute `runner.exe //DS/Runner`. This process could take around 30 seconds.

Now, the service is down and unregistered from Windows Services.

## An alternative way: Installing the Enterprise Runner service through NSSM

NSSM is a program used to register and manage services in Windows. It provides a user-friendly interface for creating and configuring Windows services without the need for complex command-line instructions. NSSM is particularly useful for running applications or scripts as services, ensuring that they start automatically with Windows, and can run in the background without user interaction. NSSM simplifies the process of working with Windows services, making it accessible for both experienced administrators and users who may not be familiar with the intricacies of service management on Windows.

NOTE: NSSM is an inactive project, the last build was released in 2014.

1. Download NSSM from this link.

2. Uncompress the `.zip` file.

3. Open a new PowerShell terminal with Administrator rights and go to the uncompressed NSSM folder.

4. Execute `./nssm.exe install "Runner"`. A new window will appear.

![NSSM Service Editor](/assets/img/raas8.png)<br>

5. On the "Path" field put the Java 11 JRE binary path (including the `java.exe` at the end).

6. On the "Startup directory" put the Enterprise Runner folder, e.g. `C:\runner\`.

7. On the Arguments field put `-jar runner.jar`, then click on the "Install service" button.

8. Now press the `Windows key + R` key combination, type `services.msc`, and press the `Enter` key.

9. Scroll down the Service list and locate the "Runner" service.

10. Click the right button and select "Start", after a couple of seconds, the service must be shown as "Running" status.

### How to remove the service

1. Open a new PowerShell terminal with Administrator rights and go to the uncompressed NSSM folder.

2. Stop the service with the following command: `nssm stop "Runner"`.

3. Then, remove the service with the `nssm remove "Runner" confirm` command.

The service is down and unregistered from Windows Services.

## Resources

[Enterprise Runner](/administration/runner/pre-4-11-runners.md#runner)<br>
[Apache Commons Daemon Documentation](https://commons.apache.org/proper/commons-daemon/)<br>
[NSSM Documentation](https://nssm.cc/usage)
