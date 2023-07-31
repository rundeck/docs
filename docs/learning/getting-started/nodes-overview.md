# Intro to Nodes

In Rundeck (or Process/Runbook Automation) context, a [Node](/manual/05-nodes.html#overview) typically refers to a target system or a machine that is under management. It represents a specific server, virtual machine, or any other computing resource that Rundeck interacts with during job execution. Nodes can be physical machines, cloud instances, containers, or whatever object a workflow is going to iterate against.

Nodes in Rundeck are typically defined using a Node Source. The Node Source can be created statically (a flat file in one of several industry-standard formats) or dynamically generated from various sources such as databases or cloud provider APIs.

![](~@assets/img/nodes-1.png)

_Some of the Node Sources available in Rundeck_

Each Node in the Node Source has properties associated with it, such as hostname, IP address, username, password, SSH key, or any other information required to connect and manage the Node. These properties define the connection details and credentials needed to execute commands or scripts on the Node.

![](~@assets/img/nodes-2.png)

_An example static yaml file with node data_

Rundeck uses Nodes to execute jobs and workflows. When a job is triggered, Rundeck uses the information from the Node Source to connect to the specified Nodes and perform the specified actions as needed.  A Node Source is a way to share information about your infrastructure to Rundeck as [Nodes](/manual/05-nodes.html#overview).

By [configuring the Node Source](/manual/projects/resource-model-sources/#adding-nodes-to-a-project), you can define where Rundeck should look for the resource model file or specify the parameters needed to dynamically generate the model. Rundeck periodically fetches the model from the specified source, ensuring that it has the most up-to-date information about the Nodes in the environment.

Nodes and Node Sources exist in the context of a specific Project though multiple Projects might use effectively the same Nodes and model sources.
