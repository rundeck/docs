# Enterprise Runner

Building and orchestrating automation in complex multi-cloud and remote environments presents several challenges. The first challenge is that DevOps and Operations engineers need an alternative  to run automation in secure application environments that mandate a zero trust architecture where accessing private networks through SSH is deprecated. Next, significant engineering effort is required to deploy and manage automation that performs well across many remote environments and geographical regions. Lastly, creating resilient automation runbooks is time consuming and prone to error when coordinating a variety of complex environments.

We are introducing a next generation architecture to address these challenges. With the new Process Automation architecture,  DevOps and Operations engineers can easily manage automation in a central UI while delegating job execution within different private networks or multi-cloud environments without needing to open SSH ports for accessing those networks. The new architecture separates workflow orchestration from task execution. It offers next generation remote Runners that include common integration plugins like Ansible and Kubernetes that execute locally to the application environment.

![Next generation automation](/assets/img/architecture-nextgen.png)

The Runner, available for both Process Automation and Runbook Automation, securely opens up network/communication between data centers and the Automation Cluster. The Runner is a Remote Execution hub for Node Steps to run on specified endpoints, rather than from the Automation server itself.

## System Architecture

The Runner is a Java based program which uses a polling model to pick up work from the Automation Server. During each polling cycle (every 5 seconds) the Runner checks for executions that it is responsible for. Communication from the Runner to the Automation Server happens over https and is initiated from the Runner. This allows for enhanced firewall security as ports no longer need to be open for the Automation Server to talk to nodes over more sensitive ports. _(e.g. SSH/22)_
![Runner Architecture](/assets/img/runner-arch-diagram.png)

## Example scenario using the runner architecture

With the next generation architecture, automation authors can select which Runners will carry out the tasks for a given job using Runner tags. Authors can also choose if tasks will execute on a Runner or if tasks will be dispatched to nodes through the selected Runner set. There are two types of Runners: Local and Remote. The Local Runner tasks execute from the Rundeck instance. The Remote Runner tasks execute from the Runners installed in the environment.

![Private networks scenario](/assets/img/runner-scenario.png)

In the example below, we have a job that will span three different environments.

1. The 1st step (Check Cloud Services Status) is a reference job that is configured with a Remote Runner which will execute a Kubernetes plugin as a workflow step.
1. Steps 2,3, and 4 are configured to run on the Local Runner.
1. Step 5 (Check System Resources) is also a reference job similar to step 1, but executes an Ansible playbook through the Ansible plugin and targets nodes in the second environment through a separate Remote Runner.
1. Step 7 (Run DB Lock Check) is also a reference job similar to step 1 and 5, but executes a Powershell command through the WinRM plugin and targets nodes in the third environment through a separate Remote Runner.

