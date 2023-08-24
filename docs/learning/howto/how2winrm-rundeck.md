# Configure WinRM on Windows remote nodes
<table>
  <tr>
   <td>
   
![](~@assets/img/winrm1.png)

   </td>
   <td>
   
![](~@assets/img/winrm2.png)

   </td>
  </tr>
</table>

Rundeck is a popular automation tool and  many organizations use it to manage their IT infrastructure. It can easily manage and automate tasks on various operating systems including Windows. In this tutorial, we'll walk through the process of configuring Windows nodes on Rundeck Open Source and how to dispatch commands and Powershell scripts on them.

By the end of this tutorial, you'll have a good understanding of how to set up and manage Windows nodes on Rundeck Open Source and how to leverage its powerful features to automate various tasks on your Windows infrastructure.  These instructions would also work for PagerDuty Process Automation, the commercial counterpart to Rundeck.

## The WinRM Protocol
WinRM (Windows Remote Management) is a protocol developed by Microsoft that enables administrators to remotely manage computers running Windows operating systems.

This protocol uses Windows PowerShell as its command-line interface, which allows administrators to run commands and scripts on remote computers using a familiar syntax. PowerShell also includes a number of built-in cmdlets (command-line utilities) that are designed specifically for remote management.

### Why WinRM over Windows based systems?
Rundeck can work with many different protocols but in the case of Windows servers, WinRM is often used because it is natively available on Windows, so nothing needs to be downloaded to make it work.   Additionally, WinRM may already be configured in the environment, making setup that much easier.

## WinRM and Rundeck
Rundeck can dispatch commands and jobs to nodes through the WinRM protocol.  Historically, this was done using the "Overthere WinRM" plugin. That has since been replaced by the "PyWinRM" [plugin](https://github.com/rundeck-plugins/py-winrm-plugin).

The Overthere WinRM plugin was originally developed by the Rundeck community and included as an official plugin in Rundeck versions up to 3.0. However, the plugin is no longer actively maintained or supported by the Rundeck development team. This means that while the Overthere WinRM plugin may still work with older versions of Rundeck, users should not expect to receive updates from the Rundeck team. Instead, users may need to rely on community resources or alternative plugins to achieve similar functionality.

Users who require WinRM functionality in Rundeck are encouraged to use the PyWinRM plugin, which has active development and community support.

The PyWinRM plugin is included out of the box with Rundeck and Process Automation and does not require extra steps to install it on any Rundeck/Process Automation instance.

## Configuration Steps
The following section explains how to configure Windows to use WinRM and Rundeck to dispatch commands and scripts over WinRM against Windows nodes.


### Configuring WinRm on Windows nodes
Here are the steps to enable the WinRM service on Windows using the basic authentication method:

1. Open the Windows PowerShell console with administrative privileges.<br>
2. Configure WinRM to allow basic authentication:<br>
	```
	winrm set winrm/config/service/Auth '@{Basic="true"}'
	```
3. Configure WinRM to allow unencrypted SOAP messages:<br>
	```
	winrm set winrm/config/service '@{AllowUnencrypted="true"}'
	```
4. Configure WinRM to provide enough memory to the commands that you are going to run, e.g. 1024 MB:<br>
	```
	winrm set winrm/config/winrs '@{MaxMemoryPerShellMB="1024"}'
	```
5. Once the command completes, type the following command to verify that WinRM is running on the machine:<br>
	```
	Test-WSMan
	```
6. To test a WinRM connection from another WinRM machine:<br>
	```
	Test-WSMan -ComputerName TargetMachineName
	```
If these tests were successful, you can use WinRM to remotely manage the computer using PowerShell and configure the Rundeck instance to connect to the Windows node.<br>

_Note that the WinRM service requires that the Windows Firewall be configured to allow incoming connections on TCP port 5985 (HTTP) or 5986 (HTTPS). If the Windows Firewall is enabled, you may need to create a new inbound rule to allow WinRM traffic._<br>

### Enable PyWinRM on Rundeck server
In order to connect exclusively to Windows nodes using WinRM from a particular project, enable PYWinRM as the default node executor.

1. Create a new project and give it a name. 
![](~@assets/img/winrm3.png)
2. Click on the "Default Node Executor" tab and select "WinRM Node Executor Python" from the Node Executor selector list (the default value is "SSH"). 
3. Pick the correct version of Python from the "Python Interpreter" list. (Note: some Linux distributions use "Python" to indicate the Python 3 interpreter by default).
![](~@assets/img/winrm4.png)
4. Click on the "Default File Copier" tab and select "WinRM Python File Copier". 
5. Pick the appropriate Python version as an interpreter. This enables dispatching scripts against Windows systems. 
![](~@assets/img/winrm5.png)
6. Scroll down and save the project.


### Adding a Node Source
Nodes are the servers or other devices that are managed by Rundeck.  Since we don’t have any nodes in this project yet (other than the server itself), we need to set one up by adding a Node Source and entering details about the node.  This is a static method of defining nodes but nodes could also come from an existing source, such as Ansible inventory or AWS EC2.
1. Add a new node source by clicking on the "Add a new Node Source" button.<br>
![](~@assets/img/winrm6.png)<br>
2. Select "File" and choose "Resourcexml" from the left dropdown menu under the "Format" section.<br>
3. Create a full file path that is reachable by the rundeck user, such as `/var/lib/rundeck/resources.xml`. <br>
4. Select "Generate" and "Writeable" checkboxes and click on the "Save" button.<br>
5. Click on the "Save" button again.<br>
![](~@assets/img/winrm7.png)<br>

### Entering Node Details
1. Go to the "Edit" tab and click on the "Modify" button.<br>
![](~@assets/img/winrm8.png)<br>
The XML editor should appear, showing a nodeless XML file as follows:<br>
	```
	<?xml version="1.0" encoding="UTF-8"?>
	<project/>
	```
2. Replace that default XML content with the following:<br>
	```
	<?xml version="1.0" encoding="UTF-8"?>
	<project>
	<node name="MyWindows"
     	description="Windows Server"
     	tags="windows"
     	hostname="192.168.1.13"
     	osArch="amd64"
     	osFamily="windows"
     	osName="Windows Server"
     	osVersion="6.3"
     	username="winuser"
     	winrm-password-storage-path="keys/winpassword"
     	winrm-authtype="basic"/>
	</project>
	```
3. Click Save to add the node to the project.<br>


Note that the `hostname` attribute should match the hostname or IP address of the Windows remote node. The `username` corresponds to the Windows user, and the `winrm-password-storage-path` attribute refers to the Rundeck key storage path for the Windows user password. (We’ll be adding the actual password in a moment.)<br>

### Adding a Password to Key Storage
1. Go to the Gear icon on the top right and select "Key Storage".
2. Click on the "Add or Upload a Key" button.
3. Select "Password" from the Key Type dropdown menu. 
4. Enter the Windows user password for the test machine in the "Enter a password" field.
5. Enter "winpassword" in the "Specify a name" textbox.
6. Save the password.
![](~@assets/img/winrm9.png)
7. Now the Windows user password is stored at the `keys/winpassword` Key Storage path (referenced previously by the `winrm-password-storage-path` attribute).

That's it! A Windows node is now available to dispatch commands and jobs.

## Dispatching commands and scripts against Windows nodes
Once Nodes have been properly configured, it is possible to run commands or Jobs against those Nodes.  This is a the clearest way to confirm that everything is configured correctly

### To dispatch ad-hoc commands to your Windows node
1. From the left-hand menu, navigate to the "Commands" section.<br>
2. Enter the name of the Windows machine in the "Nodes Filter" field, then press "Enter." The node should now be marked as "Node Matched".<br>
3. Enter a specific Windows command, such as "dir," then click the "Run on 1 Node" button.<br>
![](~@assets/img/winrm10.png)<br>

If a user has the ability to run commands in the project, this is a way to get details from a node without logging in directly or building a full job.  It is also possible to take a command that has been run and use it to start job creation.  Whether or not a user can run ad hoc commands and which nodes can be targeted are controlled by access control policies.<br>

### To dispatch Powershell scripts
1. Navigate to Jobs in the left hand menu<br>
2. Click create a new job and provide the job with a name<br>
![](~@assets/img/winrm11.png)<br>
3. Click on the "Nodes" tab, then select the "Dispatch to Nodes" radio button.<br>
4. Enter the name of the Windows node in the "Node Filter" field, then press "Enter."<br>
The node should now be reflected in the "Matched Nodes" section.<br>
![](~@assets/img/winrm12.png)<br>
5. Switch to the "Workflow" tab, then scroll down and click the "Script" step ("Script - Execute an inline script").<br>
6. Enter the Powershell command you wish to execute in the "Enter the entire script to execute" field (e.g., "Get-Process").<br>
7. Click the "Advanced" link. This will display two additional options: "Invocation String" and "File Extension."<br>
8. In the "Invocation String" field, enter powershell.exe. In the "File Extension" field, enter .ps1.<br>
![](~@assets/img/winrm13.png)<br>
9. Save the job, then run it.<br>
![](~@assets/img/winrm14.png)<br>

## Resources
* PyWinRM plugin Github [space](https://github.com/rundeck-plugins/py-winrm-plugin).
* WinRM protocol [documentation](https://learn.microsoft.com/en-us/windows/win32/winrm/portal).