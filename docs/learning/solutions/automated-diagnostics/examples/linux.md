# Automated Diagnostics

## Linux OS & Applications

When responding to incidents related to Linux servers, there are many sorts of diagnostics that can be run. 
Unlike some cloud diagnostics, connecting to Linux servers will involve using [node executors](/manual/projects/node-execution/builtin.md) to connect. 
Node executors will be utilized by [Runners](/administration/runner/#installation) with Runbook Automation or directly by servers with Runbook Automation Self-Hosted.  
Node executors are configured as part of node definitions at the project level or per-node and then used as needed at job run-time by the Runner or server.  

Often, Linux diagnostics are jobs composed of one or more [command](/manual/node-steps/builtin.md#command-step) or [script](/manual/node-steps/builtin.md#script-step) steps that gather data from the node about resources or services on that node.

### Examples:

The following examples are included in our **Automated Diagnostics Project**, which can be downloaded [**here**](https://github.com/rundeckpro/automated-diagnostics-project/releases/latest/download/automated-diagnostics.jar).

#### Check the health of a Linux service such as a web server or database
![](/assets/img/linux1.png)<br>

#### Parse server logs for common error messages
![Syslog Queries For Common Errors](/assets/img/linux2.png)

#### Collecting resource diagnostics from the server
![](/assets/img/linux3.png)<br>

## Node Executors for Linux:
**Runbook Automation** offer multiple methods of communicating with Linux servers through the multiple **Node Executors**, 
such as these:

* [SSH](/manual/projects/node-execution/ssh.md)
* [OpenSSH](/manual/projects/node-execution/openssh.md)
* [Ansible inventory](/learning/howto/using-ansible.md#how-to-integrate-ansible-with-rundeck)
* [SSM on AWS](/manual/projects/node-execution/aws-ssm.md)
* [ECS container nodes](/manual/projects/node-execution/aws-ecs.md) 
* [OpenSSH using Bastion Hosts](/manual/projects/node-execution/bastionssh.md)