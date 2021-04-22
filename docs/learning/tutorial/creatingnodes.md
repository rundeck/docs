# 1 - Creating Nodes

:::tutorial
:::

A Node is a resource that is either a physical or virtual instance of a network accessible host. Nodes have a few basic attributes but a Node's attributes can be extended to include arbitrary named key/value pairs. Attributes typically describe the properties of a node or reflect the state of the node. *(e.g. OSVersion: Ubuntu 18.04)* Tags can also be assigned to ease searching (e.g. `prod` or `dev`)

If this is the first run through of the tutorial there will only be a single node in your Welcome Project, the Rundeck Server.


### Community / Enterprise Exercise

1. Click the `>` next to the server node to see additional attributes of that node.
1. Clicking attribute values will dynamically filter the nodes based on that value.

![Server Node Output](~@assets/img/tutorial-nodes-serveronly.png)

## Adding Nodes

### Node Sources

There are multiple ways to add Nodes to Rundeck. Using the Node Wizard Resource Model is the simplest way to add a node to the project.

### Enterprise Welcome Project Exercise:

Included in Enterprise is the Node Wizard Node Source.  Use that to add a new node by following these steps:

1. Click **Project Settings | Edit Nodes**
1. Click the Modify button under the Node Wizard entry.
1. Click + Add Node.
1. Set the Node Name to node1
1. Set HostName to node1
1. Set OS Family to Unix
1. Click the Authentication Tab at the top.
1. Enter agent for the UserName
1. Click Add Node
1. Click Save button under the list of nodes.

### Community Welcome Project Exercise

-- Need Same steps for Community --

### Testing your Nodes
Use Commands window to run Ad-Hoc commands against nodes and test connectivity.

1. Go to Commands
1. Enter .* for the Node Filter and click **Search**
1. Type `uname -a` as the command and click the **Run on X Node** button


Next let’s test our nodes using the an ad-hoc Command.
