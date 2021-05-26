# 2. Getting Started - Commands

:::tutorial
:::

A command is a single executable string executed on a Node. Rundeck invokes commands on nodes via a node executor which evaluates the command string and executes it. Node executors evaluate the command string in a data context containing information about the Node resource. Command strings can reference this data and thus avoid hard coding node or environment specific values.

The Rundeck graphical console provides the ability to execute commands to a set of filtered Node resources. The Command page can accept any command string you might run via on the node's console.  In the previous step we confirmed our new nodes were in our Nodes List.  Use the exercise below to run a command against the new nodes.

:::: tabs
::: tab Enterprise Exercise:

1. Click on the **Commands** link in the project navigation menu.
1. In the Nodes Line enter `.*` and click **Search**.<br>_(if the node doesn't show up right away wait a few seconds and try again)_
1. Enter the following where it says **Enter a Command**: `uname -a`
1. Click **Run on _X_ Node**.

:::
::: tab Community Exercise:

1. Click on the **Commands** link in the project navigation menu.
1. In the Nodes Line enter `.*` and click **Search**.<br>_(if the node doesn't show up right away wait a few seconds and try again)_
1. Enter the following where it says **Enter a Command**: `uname -a`
1. Click **Run on _X_ Node**.

::::

This will execute the command against your Linux based Rundeck Server and return the Operating System information.  There should be a line for each node you have configured.
