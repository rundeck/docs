
# Using SSH on Linux/Unix Nodes

Rundeck allows users to dispatch jobs to remote Linux/UNIX servers to manage and automate any task using Rundeck workflows. The most common protocol for connecting to Linux/Unix servers is SSH. This is an example of how to add a remote node and configure Rundeck to use SSH to connect to it.

_Note: If this is the first time adding remote nodes. It is suggested to review the [Rundeck Tutorial](/learning/tutorial/preparing.md) before adding remote SSH nodes. This exercise assumes some experience with Linux, SSH Keys, and Rundeck basics covered in the Tutorial._


## Generating Keys

First, the SSH remote node must be configured so that it can be accessed using SSH Keys. Login to the remote node’s console and execute the `ssh-keygen` command.

```
$ ssh-keygen
```

By default, a key pair is generated in the following path `/home/USERNAME/.ssh`.

To allow the Rundeck server to access this Remote Node we will add the public key of our Rundeck instance to the /`home/USERNAME/.ssh/authorized_keys` file on the remote SSH node.

The key can be found in the following path:` /home/rundeck/.ssh/id_rsa.pub`

**Note:** On RPM/DEB based installations, this key can be found at `/var/lib/rundeck/.ssh/id_rsa.pub` path. For [WAR-based](/administration/install/jar.md#installing-as-an-executable-war) installations, add the public key content of a previously key pair created with `ssh-keygen -m PEM` command on the remote `authorized_keys` file (`/home/USERNAME/.ssh/authorized_keys`).

## Configuring Rundeck

Rundeck can store the authentication keys necessary to authenticate to our Linux example host in Rundeck’s built-in Key Storage.

1. Click on the System Menu (gear icon) and choose **Key Storage**.
    ![Key Storage Menu](@assets/img/howto-ssh-keystoragemenu.png)
1.  Click on the **Add or Upload a Key** button to create a **New entry** in the Rundeck Key Storage.
    ![Add Key Entry](@assets/img/howto-ssh-addkey.png)
1. For *Key Type* select `Private Key`.
1. Add Rundeck instance private key file content in *Enter text*. The key is located at `/var/lib/rundeck/.ssh/id_rsa`.
1. In the **Storage path** field it’s possible to define specific subfolders for the keys if needed, for this example just leave it blank.
1. In the *Name* textbox enter a key name that corresponds to the Rundeck host, in this example is just `rundeck` (now the Key Storage entry is `keys/rundeck`).
    ![Key Entry](@assets/img/howto-ssh-keyentry.png)

## Adding Nodes
Now, it’s time to add the remote node.

:::: tabs
::: tab Enterprise Exercise

Included in Enterprise is the Node Wizard Node Source. Use that to add a new node by following these steps:

1. Click **Project Settings | Edit Nodes**
    <br>![Key Entry](@assets/img/howto-ssh-editnodes.png)
1. Click the Modify button under the Node Wizard entry.
    <br>![Modify Button](@assets/img/howto-ssh-modifynodesource.png)
1. Click + Add Node.
    <br>![Add Node](@assets/img/howto-ssh-addnode.png)
1. Set the *Node Name* to `node1`
1. Set *HostName* to `node1`
1. Set *OS Family* to `Unix`
    <br>![Wizard Entry](@assets/img/howto-ssh-nodeewizardentry.png)
1. Click the **Authentication Tab** at the top.
1. Enter `agent` for the *UserName*.
    <br><br>![Authentication Tab](@assets/img/howto-ssh-wizardauthtab.png)
1. Click **Add Node** to save that node entry.
1. Click the **Save** button under the list of nodes.
    <br>![Save Node Wizard](@assets/img/howto-ssh-savenodewizard.png)
:::
::: tab Community Exercise
Rundeck Community
1. Click **Project Settings | Edit Nodes**
    ![Key Entry](@assets/img/howto-ssh-editnodes.png)
2. Click on the **Add new Node Source** button.
    <br>![Add Node Source](@assets/img/howto-ssh-addnodesource.png)
3. There will be a list of options, select the **File** Node Source.
    <br>![File Node Source](@assets/img/howto-ssh-filenodesource.png)
4. In the drop-down menu on the right, select **resourceyaml**.
5. In *File Path* choose a path reachable by the Rundeck user - e.g: in the `/var/lib/rundeck/`directory. _It’s important to leave the filename at the end, otherwise, it will not be created._
6. Next, check **Generate**, **Include Server Node** and **Writeable**.
    <br>![alt_text](@assets/img/howto-ssh-filenodesource-filled.png)
7. Finally, click on the **Save** button. The file will be added to the server and ready for a node entry.

Once created, the file can be edited by clicking on the "Modify" button  (Edit tab)  where we can add an extra entry corresponding to our remote SSH server.

Use the following `resources.yaml` file content:

```
remote-node:
  description: Remote SSH server node
  hostname: node1
  nodename: node1
  osArch: amd64
  osFamily: unix
  osName: Linux
  osVersion: 5.11.0-7612-generic
  tags: 'node1'
  username: agent
  ssh-key-storage-path: keys/rundeck
```

In the *hostname* attribute, place the DNS name of our remote node. In *username* the user who is trying to access the SSH server, In *ssh-key-storage-path* specifies the path that was created in key storage earlier.
:::
::::

## Running Commands on Nodes
**Let’s dispatch some commands!**

1. Clicking on the "Nodes" tab (left menu) and using the drop-down to choose _Select All Nodes_  will display all the nodes that have been configured. The screenshot below shows the listing with 2 nodes (the Rundeck node and the node added recently).
    <br>![Two Nodes Shown](@assets/img/howto-ssh-dispatch1.png)
1. To select the node created earlier, put the name in _Nodes_ textbox; In this case, `node1` and press Enter key, now the node is selected.
    <br>![Filter for one node](@assets/img/howto-ssh-dispatch2.png)
1. In the _Enter a command_ textbox put a command, e.g.: `df`, and click on the **Run on 1 Node** green button.
    <br>![Command Output](@assets/img/howto-ssh-dispatch3.png)

**Congratulations!** A remote SSH node to dispatch commands and jobs is setup in Rundeck. Stay tuned to the next blog entry where we build a job to execute on this Node.

## Additional Resources

[ssh-keygen command documentation](https://linux.die.net/man/1/ssh-keygen)
