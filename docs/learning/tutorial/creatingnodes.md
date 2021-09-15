# 1. Getting Started - Nodes

:::tutorial
:::

A Node is a resource that is either a physical or virtual instance of a network accessible host. Nodes have a few basic attributes, but a Node's attributes can be extended to include arbitrary named key/value pairs. Attributes typically describe the properties of a node or reflect the state of the node. _(e.g. OSVersion: Ubuntu 18.04)._ Tags can also be assigned to a node for easy searching (e.g. `prod` or `dev`).

If this is the first run through of the tutorial there will be a single node in your Welcome Project (the Rundeck Server).

### Enterprise/Community Exercise

1. Click the `>` next to the server node to see additional attributes of that node.
1. Clicking attribute values will dynamically filter the nodes based on that value.

![Server Node Output](~@assets/img/tutorial-nodes-serveronly.png)

## Adding Nodes

### Node Sources

There are multiple ways to add Nodes to Rundeck. Using the Node Wizard Resource Model is the simplest way to add a node to the project.

:::: tabs
::: tab Enterprise Exercise:

Included in Enterprise is the Node Wizard Node Source.  Use that to add a new node by following these steps:

1. Click **Project Settings | Edit Nodes**
1. Click the Modify button under the **Node Wizard** entry.
1. Click + Add Node.
1. Set the Node Name to `node1`
1. Set HostName to `node1`
1. Set OS Family to `Unix`
1. Click the Authentication Tab at the top.
1. Enter `agent` for the UserName
1. Click Add Node
1. Repeat the steps above for **node2**
1. Click the Save button under the list of nodes.

:::
::: tab Community Exercise

1. Click **Project Settings | Edit Nodes**
1. Click the Modify button under the `File /home/rundeck/resources.yml` entry.
1. Copy and paste the code below into the edit window:
    ```yml
    node1:
      nodename: node1
      hostname: node1
      description: ''
      username: agent
      osFamily: unix
    ```
1. Duplicate that entry again changing all the `node1` values to `node2`.

>YAML is specific about indentation so be sure to check your formatting.  (tip: use **two spaces** not a _tab_)

:::
::::
### Checking your Nodes

1. Click the **Nodes** entry in the Project Menu
1. Enter `.*` in the filter and click Search. <br>_(if the node doesn't show up right away wait a few seconds and try again)_

Next let’s test our nodes using an ad-hoc [Command](/learning/tutorial/commands.md).
