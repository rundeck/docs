# Node Wizard (Enterprise)
::: enterprise
:::

The Node Wizard allows Rundeck Enterprise admins to manually create Node entries in the Rundeck database using a graphical interface fill in values.

  ![](~@assets/img/nodewiz-source.png)

## Adding the Node Source
To add the Node Wizard Resource Model source open the Project where the Node Source will be added and follow these steps:

1. Click **Project Setttings** to expand the menu.
2. Click **Edit Nodes**.
3. Click **Sources** tab.
4. Click **Add a new Node Source+** button.
5. Select the **Node Wizard** option.
6. Click Save.

## Creating Nodes

1. Click **Project Setttings** to expand the menu.
2. Click **Edit Nodes**.
3. Click **Modify** button in the _Node Wizard_ entry on the _Edit_ tab.

![](~@assets/img/nodewiz-add-1.png)

**4\.** Click **Add Node**

![](~@assets/img/nodewiz-add-detail.png)

- _Node Name_: This is used as an ID field. Value can be any string. if other sources are added will also be used to tie those entries together with this one.
- _Description_: A user friendly description of the Node.
- _Host Name/IP_: Provide a DNS hostname or IP address that will be used for the Rundeck Server to connect to the node.
- _OS Family_: Select **Windows**, **Unix**, or **Other**.  _Note: this must be set so the proper Node Executor and File Copier are used._
- _Tags_: Can be used to help in search filters.
- _Custom Attributes_: Add custom attributes in java properties format. eg: `myAttribute=myValue`.  One entry per line.


The **Authentication** tab has some optional fields.  If left blank defaults from the project will be used.

![](~@assets/img/nodewiz-add-authentication.png)

- _Username_: Specify the user name used when authenticating to this Node.

Defaults will be pre-populated for the following settings after selecting the OS Family entry on the Detail tab.
- _Node Executor_: Specify a custom Node Executor if needed. [More Details](/manual/projects/node-execution/builtin.html#when-node-executors-are-invoked)
- _File Copier_: Specify a custom File Copier if needed. [More Details](/manual/projects/node-execution/builtin.html#file-copier-destination-directory)

There may be additional selections to select the key entry to use with the authentication mechanism.

After filling in all the fields save that entry and **be sure to click Save** on the main Node List to ensure all changes are written.
