# Intro to Nodes

In Rundeck (or Process/Runbook Automation) context, a [Node](/manual/05-nodes.md#overview) typically refers to a target system or a machine that is under management. It represents a specific server, virtual machine, or any other computing resource that Rundeck interacts with during job execution. Nodes encompass physical machines, cloud instances, containers, or whatever object a workflow is going to iterate against.

Nodes in Rundeck are typically defined through a node source.  The node source can be created statically (a flat file in one of several industry-standard formats) or dynamically generated from various sources such as databases or cloud provider APIs. Basically a node source is a resource that defines one node or a collection of nodes.

You can add any number of node sources to a project in rundeck.   Available sources for a specific project are listed when you choose to add or edit a node source for that project.
Some common node sources are shown in the graphic below:

![](/assets/img/nodes-1.png)

Each node in a node source has properties associated with it, such as hostname, IP address, username, password, SSH key, and/or other information required to connect to  and manage the node. These properties define the connection details and credentials needed to execute commands or scripts on the Node.  

Node data is stored in a configuration file.    Below is an example of a static YAML configuration file:

![](/assets/img/nodes-2.png)

Rundeck uses nodes to execute jobs and workflows. When a job is triggered, Rundeck uses the information from the node source to connect to the specified Nodes and perform the specified actions as needed.  A node source is a method of sharing  information about your infrastructure with Rundeck as [Nodes](/manual/05-nodes.md#overview).

By [configuring the Node Source](/manual/projects/resource-model-sources/#adding-nodes-to-a-project), you can define where Rundeck should find the resource model file or specify the parameters needed to dynamically generating the model. Rundeck periodically fetches the resource model from the specified source, ensuring that it has the most up-to-date information about the nodes in the environment.

Nodes and node sources are associated with a specific project in Rundeck. While different projects might effectively use the same nodes and model sources, they are still defined within the context of individual projects.