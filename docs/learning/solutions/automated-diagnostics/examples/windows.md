# Automated Diagnostics

## Windows OS & Applications
When responding to incidents related to Windows servers, there are many sorts of diagnostics that can be run. 
Unlike some cloud diagnostics, connecting to servers will involve using [node executors](/manual/projects/node-execution/builtin.md) to connect. 
Node executors will be utilized by [Runners](/administration/runner/#runner-on-windows-os) with Runbook Automation or directly by servers with Runbook Automation Self-Hosted.
Node executors are configured as part of node definitions at the project level or per-node and then used as needed at job run-time by the Runner or server.  

Often, Windows diagnostics are jobs composed of one or more [command](/manual/node-steps/builtin.md#command-step) or [script](/manual/node-steps/builtin.md#script-step) steps that gather data from the node about resources or services on that node.

### Examples:
* Check the health of a Windows service such as a web server or database using PowerShell
* Parse server logs for common error messages
* Check health of components of a custom application across one or more servers
* Collect resource diagnostics from the server, such as memory utilization, cpu resources or available disk space

### Node executors commonly used in connecting with Windows nodes:
* [PowerShell](/manual/projects/node-execution/powershell.md)
* [WinRM](/learning/howto/configuring-windows-nodes.md#running-jobs-on-windows-nodes)
* [SSH](/manual/projects/node-execution/ssh.md)
* [OpenSSH](/manual/projects/node-execution/openssh.md)
* [SSM on AWS](/manual/projects/node-execution/aws-ssm.md)
* [ECS container nodes](/manual/projects/node-execution/aws-ecs.md)
* [OpenSSH using Bastion Hosts](/manual/projects/node-execution/bastionssh.md)