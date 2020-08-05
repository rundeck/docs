# Planning for the project

The administrator decides to create a project called "Anvils."
to manage the activities of the Anvils restart.
The Anvils project will contain definitions about the nodes used
by the Anvils application, as well as, a set a jobs
that reference these nodes. The administrator will use Rundeck
access control policies to govern which teams have access to
perform each of the procedures.

The administrator decides to formalize the role of each node in
the application stack by introducing tags. Tags will be used within
the Jobs to target each kind of node rather than reference
specific hosts names or IP addresses. This makes the jobs reusable
across different environments.

Executing Jobs on the nodes will use the built in
[SSH node executor](/administration/projects/node-execution/ssh.md) for
the project since SSH is already used to execute remote commands.

## Create the project

The first step is to create the project using the GUI.
Upon first Login this window will be displayed.
![Initial Login Project Creation](~@assets/img/tutorial-createproject.png)

Click the "New Project+" button and fill in the fields as shown below.

![Anvils Project Settings](~@assets/img/tutorial-createproject2.png)

This initializes the "Anvils" project in Rundeck.

The project has been created, and by default, contains no jobs and only
one node definition, the entry for the Rundeck server node.

## Declare node definitions

Modeling the Anvils nodes deployed in the live environment is
administrator's next step.

The Anvils application environment has several components spread
across different servers. Anvils is a three tier
application and has web, application and database components,
each component installed on a separate host.

Additionally, the administrator decides to incorporate a recent
convention to use different unix logins to execute commands
to control each functional application component.
Each component will run using under a separate unix login
to help isolate each component at the system level.

With this information in hand, the administrator prepares the project
resource model using the Node Wizard (Rundeck Enterprise 3.3.0+). The steps
below define the first node with the Node Wizard.

1. Open the Anvils project.
1. Click _Project Settings_ > _Edit Nodes_...
1. Click the _Sources_ tab then click the "Add new Node Source+" button:
  ![Add Node Source](~@assets/img/tutorial-addNodeSource.png)
1. Add the _Node Wizard_ source option and click Save ___twice___.  
  ![Node Wizard](~@assets/img/tutorial-nodewizardsource.png)  
1. Return to the Edit Tab and click the Modify button on the Node Wizard entry.  
  ![Modify Node Wizard Entries](~@assets/img/tutorial-nodewiz-modify.png)  
1. Click the _Add Node_ button  
1. Fill out the details as shown in the image below:  
  ![First Node Entry](~@assets/img/tutorial-node1.png)  
1. Click Save.

The full environment uses five node entries.  To simplify the setup copy and paste
the text below into the Editor window of the Node Wizard to add all five entries.  
(Replacing any content from previous steps)
::: details Click to get the code
```yml .numberLines
www1.anvils.com:
  nodename: www1.anvils.com
  hostname: 192.168.50.2
  description: A www server node.
  username: www1
  osFamily: unix
  node-executor: jsch-ssh
  file-copier: jsch-scp
  tags: www
  osName: Linux
  anvils-location: US-East
  anvils-customer: acme.com
www2.anvils.com:
  nodename: www1.anvils.com
  hostname: 192.168.50.2
  description: A www server node.
  username: www2
  osFamily: unix
  node-executor: jsch-ssh
  file-copier: jsch-scp
  tags: www
  osName: Linux
  anvils-location: US-East
  anvils-customer: acme.com
app1.anvils.com:
  nodename: app1.anvils.com
  hostname: 192.168.50.2
  description: An app server node.
  username: app1
  osFamily: unix
  node-executor: jsch-ssh
  file-copier: jsch-scp
  tags: app
  osName: Linux
  anvils-location: US-East
  anvils-customer: acme.com
app2.anvils.com:
  nodename: app1.anvils.com
  hostname: 192.168.50.2
  description: An app server node.
  username: app2
  osFamily: unix
  node-executor: jsch-ssh
  file-copier: jsch-scp
  tags: app
  osName: Linux
  anvils-location: US-East
  anvils-customer: acme.com
db1.anvils.com:
  nodename: db1.anvils.com
  hostname: 192.168.50.2
  description: A db server node.
  username: db1
  osFamily: unix
  node-executor: jsch-ssh
  file-copier: jsch-scp
  tags: db
  osName: Linux
  anvils-location: US-East
  anvils-customer: acme.com
```
:::

A logical name for each node is defined
with the `nodename` attribute (eg nodename="www1.anvils.com").
The address used by SSH is set with `hostname` while the login
used to execute commands has been specified with the
`username` attribute (username="www1" vs
username="db"). The value for the `tags` attribute
reflects the server role (tags="web" vs tags="app").

::: tip
This tutorial is a trivial sized example so to conserve space (and VMs) the nodes are located on the same VM (each node uses the same hostname but a different username).
:::

A node in rundeck can model a single host on the
network and represents a single management endpoint. In the end,
the ssh node executor plugin formulates an ssh command string similar to:
"ssh username@hostname command". The ssh identity is resolved via configuration
at run time. For more info see [ssh-plugins guide](/administration/projects/node-execution/ssh.md#configuring-remote-machine-for-ssh)
to learn about configuring remote machines for ssh.

This example uses the built in ssh plugin but you are not restricted to using
ssh. There are other node executor plugins available that invoke remote actions via
other tools (eg, salt, mcollective, winrm, chef knife, etc).

## Configuring Nodes on Rundeck Open Source version

The Node Wizard shown above is an Enterprise version feature.  If you are working through this tutorial
using the Open Source version use these step variations to add the same nodes.

- Instead of the Node Wizard Source, add the _File_ Source.
  * For format choose `resourceyaml` from the dropdown
  * File path use something local to your server.  (i.e. `/home/rundeck/anvilnodes.yml`)
  * Check the Generate Box
  * Check the Writeable Box

You should be able to use the same code from above to add the nodes.
