
# Running Jobs on Windows Nodes

Rundeck allows users to execute jobs to remote Windows nodes to manage and automate tasks using Rundeck workflows. This article shows how to add a Windows node and execute Rundeck jobs and commands with windows-based systems.

To communicate with Windows nodes, Rundeck uses an out-of-the-box [Node Execution/ File Copier plugin](https://github.com/rundeck-plugins/py-winrm-plugin) that uses the [WinRM](https://docs.microsoft.com/en-us/windows/win32/winrm/portal) (Windows Remote Management) protocol.

>Note: If this is the first time adding remote nodes, we suggest reviewing the [Rundeck Tutorial](/learning/tutorial/preparing.md) before adding Windows nodes. This exercise assumes some experience with Windows and Rundeck basics covered in the Tutorial.

## Basic pywinrm Plugin Requirements

The [pywinrm plugin](https://github.com/rundeck-plugins/py-winrm-plugin) needs the following requirements on the Rundeck server to work properly.  It is supported on Rundeck running on Linux, Mac OS X, or Windows operating systems.

### Requirements:

The [pywinrm plugin](https://github.com/rundeck-plugins/py-winrm-plugin) uses the python [WinRM Library](https://github.com/diyan/pywinrm/) to provide the WinRM implementation.

* Python 3.3-3.5 or PyPy2 installed on Rundeck server. _(Python 3 strongly recommended)_
* Pywinrm library (It can be installed with the following command: `pip install pywinrm`)
    * `requests-kerberos` and `requests-credssp` are optional.

Note: Due to networking complexity issues this exercise will not work with the Welcome Projects.  These steps assume you have Rundeck installed [using these instructions](/administration/install/installing-rundeck.md).  For more information see the [Additional Information](#additional-information) section.

## Basic Windows Requirements

To follow this How to Guide, your Windows system needs the following requirements:

* A Windows node in the same network as the Rundeck instance
* Windows Server 2008 R2 or above
* PowerShell 2.0 or above

## Windows Configuration

The first step is to configure the Windows machine. To do this, go to the Windows instance and follow the these steps:

1. Open a PowerShell terminal as an admin user profile.
1. Enable the WinRM protocol on Windows:
    ```
    winrm qc
    ```
1. Define the authentication type:
    ```
    winrm set winrm/config/service/Auth '@{Basic="true"}'
    ```
1. Define the client authentication type:
    ```
    winrm set winrm/config/client/Auth '@{Basic="true"}'
    ```
1. Allow unencrypted SOAP messages:
    ```
    winrm set winrm/config/service '@{AllowUnencrypted="true"}'
    ```

:::warning
It's important to allow access to the 5985 port via Windows Firewall (any between the Rundeck server and the node), to receive the remote requests.
:::

>Note: These settings are for Exercise purposes only and do not represent the most secure method of implementing.  Please follow your own security guidelines for production implementations.

## Rundeck Configuration

Create a Windows-based project on the Rundeck instance.

1. Create a new project: **Name** `windows`, and  **Label` Windows Jobs`**
    <br><br>![Create Project](@assets/img/howto-winnode-createproject.png)<br><br>
1. Go to the Default Node Executor tab and then select **WinRM Node Executor Python**. It may be necessary to set the Python interpreter textbox to `python3` interpreter as the command/path.
    <br><br>![Node Executor](@assets/img/howto-winnode-nodeexec.png)<br><br>
1. Go to the **Default File Copier** tab and select the **WinRM Python File Copier**. Similar to the previous step, it may be necessary to define the Python interpreter textbox as `python3` interpreter for the command/path.
    <br><br>![File Copier](@assets/img/howto-winnode-filecopy.png)<br><br>
1. Click on the **Create** button.

## Adding a Windows Test Node

Now Rundeck should ask about the model source. Let's start with the Windows node definition.
:::: tabs
::: tab Enterprise Steps
1. Click on the **Add a new Node Source +** button.
1. Select **Node Wizard**.
    <br><br>![Node Wizard](@assets/img/howto-winnode-nodewizardsource.png)<br><br>
1. Click **Save** on the _Node Wizard Source_.
1. Click **Save** on the _Sources_ tab.
1. Switch to the _Edit_ tab.
1. Click the Modify button under the Node Wizard entry.
    <br><br>![Modify Wizard](@assets/img/howto-winnode-modifynodesource.png)<br><br>
1. Set the *Node Name* to `mywindows`
1. Set *HostName* to the IP address of your Windows Host.
1. Set *OS Family* to `Windows`
   <br><br>![Wizard Detail](@assets/img/howto-winnode-wizarddetail.png)<br><br>
1. Click the **Authentication Tab** at the top.
1. Enter your user name for the *UserName*. (e.g. _Administrator_)
    <br><br>![Wizard Authentication](@assets/img/howto-winnode-wizardauth.png)<br><br>
1. Set the _Password Storage Path_ to `keys/project/windows/windows.password`
1. Click **Add Node** to save that node entry.
1. Click the **Save** button under the list of nodes.

:::
::: tab Community Steps
1. Click on the **Add a new Node Source +** button.
1. Select **File**
    <br><br>![File Source Logo](@assets/img/howto-winnode-filesource.png)<br><br>
1. In the _Format_ section, click on the right list and select the **resourceyaml** option.
1. Put the file's desired path including the file name and extension. (e.g. `~/windows-nodes.yaml`)
1. Select check boxes for **Generate**, **Include Server Node** and **Writeable** checkboxes, and then click on the **Save** buttons (_there are two_).
    <br><br>![File Source Details](@assets/img/howto-winnode-filesourcedetails.png)<br><br>
1. Now click on the _Edit_ tab, and click on the **Modify** button.
    <br><br>![File Source Code](@assets/img/howto-winnode-modifyfilesource.png)<br><br>
1. Add the following node definition in the node definition text area.  Make sure you use your own nodes IP Address for _hostname_ and login name for _username_
    ```
    mywindows:
      description: Windows Server.
      tags: windows
      hostname: 192.168.1.10
      osArch: amd64
      osFamily: windows
      username: Administrator
      winrm-password-storage-path: "keys/windows.password"
    ```
1. **Save the entry.<br>The node is available now by clicking on the "Nodes" section in the left sidebar and setting the filter to `.*`
:::
::::

Don't forget to add the Windows user password to the Rundeck key storage.

1. Go to the _System Menu(Gear Icon) > Key Storage_.
    <br><br>![Key Storage](@assets/img/howto-winnode-keystorage.png)<br><br>
1. Click on the **+ Add or Upload a Key** button.
1. Enter the Windows password as shown in the image and save.
    <br><br>![Key Storage Entry](@assets/img/howto-winnode-keystorageentry.png)<br><br>
>Enterprise Users may need to add `project/windows` to the Storage Path line.



### Testing the New Windows Remote Node

Now it's time to send some commands against the windows remote machine.

1. Click on the **Commands** section on the left sidebar.
1. On the **Nodes** section use a filter to dispatch only to the Windows machine, type:
    ```
    name: mywindows
    ```
1. On the _Enter a command_ textbox type: `dir` (listing directories and files).
1. Click on the **Run on 1 Node** button.
    <br><br>![Success](@assets/img/howto-winnode-commandsuccess.png)<br><br>


And now your Windows node is ready to receive PowerShell commands from the Rundeck instance.


## Additional Information

Using Linux? Read the [Using SSH on Linux/Unix Nodes](/learning/howto/ssh-on-linux-nodes.md) article to learn more.


### Networking Issues

Docker Desktop has some limitations to how it handles networking. [Check out this information](/learning/howto/connect-local-nodes.md) about how to get the Rundeck Welcome Projects to connect to a single host on your local network.
