### Automated Diagnostics Examples
---

## OS & Apps on Linux
#### Introduction
When responding to incidents related to Linux servers, there are many sorts of diagnostics that can be run. Unlike some cloud diagnostics, connecting to Linux servers will involve using [node executors](/manual/projects/node-execution/builtin.html) to connect. Node executors will be utilized by [Runners](/administration/runner/#installation) with Runbook Automation or directly by servers with Process Automation (on-premise).  Node executors are configured as part of node definitions at the project level or per-node and then used as needed at job run-time by the Runner or server.  Often, Linux diagnostics are jobs composed of one or more [command](/manual/node-steps/builtin.html#command-step) or [script](/manual/node-steps/builtin.html#script-step) steps that gather data from the node about resources or services on that node.

#### Some examples of Linux diagnostics:
* Check the health of a Linux service such as a web server or database
![](~@assets/img/linux1.png)
* Parse server logs for common error messages
![](~@assets/img/linux2.png)
* Checking health of components of a custom application across one or more servers
![](~@assets/img/linux3.png)
* Collecting resource diagnostics from the server
![](~@assets/img/linux4.png)

#### Node executors commonly used in connecting with Linux nodes:
* [SSH](/manual/projects/node-execution/ssh.html)
* [OpenSSH](/manual/projects/node-execution/openssh.html)
* [Ansible inventory](/learning/howto/using-ansible.html#how-to-integrate-ansible-with-rundeck)
* [SSM on AWS](/manual/projects/node-execution/aws-ssm.html)
* [ECS container nodes](/manual/projects/node-execution/aws-ecs.html) 
* [OpenSSH using Bastion Hosts](/manual/projects/node-execution/bastionssh.html)