# Rundeck and Ansible Integration

It’s common for Rundeck users to integrate Ansible into their Rundeck. Like Rundeck, Ansible's straightforward design and learning curve make it Operations friendly.

What does Rundeck do for Ansible users? Rundeck gives them a great GUI front-end experience and ties together their Ansible automation alongside different tools used by other groups. Rundeck's powerful access control capabilities can be used to safely provide other users and teams with self-service access to run automation (including Ansible playbooks) https://docs.ansible.com/ansible/latest/user_guide/playbooks.html.

# What is Ansible?

[Ansible](https://github.com/ansible/ansible) is an automation solution developed by RedHat Inc, that handles configuration management, application deployment, cloud provisioning, ad-hoc task execution, network automation, and multi-node orchestration.

The [Ansible basic](https://docs.ansible.com/ansible/latest/user_guide/intro_getting_started.html) configuration is extremely easy. Ansible just needs two files to work: [the configuration file](https://docs.ansible.com/ansible/latest/reference_appendices/config.html) (`ansible.cfg`, usually at `/etc/ansible` path) and [the inventory file](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html)  (where Ansible stores their remote nodes in this https://docs.ansible.com/ansible/2.3/intro_inventory.html format, usually at `/etc/ansible` path too).

Ansible uses [playbooks](https://docs.ansible.com/ansible/latest/user_guide/playbooks.html) (essentially a defined blueprint for automation tasks), to manage configurations and deployments to remote machines.

The full Ansible documentation is available here [https://docs.ansible.com/](https://docs.ansible.com/).

## How to Integrate Ansible with Rundeck

> Note: This How To assumes readers are very familiar with Rundeck. It is suggested to review and fully understand thee [Tutorial Exercises](/learning/tutorial/preparing.md) prior to attempting these steps.

Both Rundeck versions (Community and Enterprise) use a [built-in plugin](https://github.com/Batix/rundeck-ansible-plugin) for Ansible integrations. This plugin imports hosts from Ansible's inventory. It includes a bunch of facts and can run modules and playbooks. There is also a node executor and file copier for the project.

This integration enables Rundeck users to:

- Call Ansible playbooks and modules from Rundeck. Rundeck returns output from Ansible's command line, however in an easier to consume format within Rundeck’s GUI and users can utilize the Rundeck API and access control features.
- Use Ansible as the underlying execution framework. Run any command or script and output will be collated by node and step like typical Rundeck output.

## Ansible Configuration

Ansible needs two basic files to work, [ansible.cfg](https://docs.ansible.com/ansible/latest/reference_appendices/config.html) (where Ansible configurations are located) and hosts (inventory).

In this guide we use three nodes defined at the [Ansible inventory](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html)file:

```
[ssh_farm]
192.168.33.20
192.168.33.21
192.168.33.22
```

## Rundeck/Ansible Integration

1. To run commands via the "Commands" menu or the default "Command" node step in a Rundeck job, we can configure a project with the Ansible node executor. **Create a new project**, go to the **Default Node Executor** tab and select _Ansible Ad-hoc Node Executor_.
    <br><br>![ Edit Config ](@assets/img/howto-ansible-editconfig.png)<br><br>
1. In the Ansible Node Executor configuration, set the Executable (usually `/bin/bash`) and define the Ansible config path (usually at `/etc/ansible/ansible.cfg`). Click on the **Generate Inventory** checkbox. Now scroll down and click on the **Save** button.
    <br><br>![ Node Executor Config ](@assets/img/howto-ansible-defaultnodeexec.png)<br><br>
    The Rundeck-Ansible plugin uses the `rundeck` user as the default user to connect to the Ansible remote inventory nodes. At this point, it’s possible to define the SSH authentication method (`privatekey` and `password`) and the specific Ansible SSH user to connect to the remote inventory nodes. You need to define the username in the SSH User textbox. Depending on the auth method you can select the password from the storage path or the ssh key (also from the filesystem path).
    <br><br>![ Node Executor Authentication ](@assets/img/howto-ansible-nodeexecauth.png)<br><br>
1. Is time to add the Ansible inventory nodes, for that click on **Project Settings**, click on **Edit Nodes...** and then on **Add new Node Source +**.
    <br><br>![ Add Node Source ](@assets/img/howto-ansible-addnodesource.png)<br><br>
1.  Choose **Ansible Resource Model Source** and define the Ansible inventory file path (usually at `/etc/ansible/hosts`) and Ansible config path (usually at `/etc/ansible/ansible.cfg`).
    <br><br>![ Ansible Node Source ](@assets/img/howto-ansible-ansiblenodesource.png)<br><br>
    <br><br>![ Ansible Node Source Config ](@assets/img/howto-ansible-ansiblesourceconfig.png)<br><br>
    Similar to the node executor configuration, in the “SSH Connection” section it’s possible to define the Authentication method (`privatekey` or `password-based`). Depending on the Authentication method, enter the _user_, _ssh password_, or the _key file path_.
    <br><br>![ Ansible Node Source Auth ](@assets/img/howto-ansible-ansiblesourceauth.png)<br><br>
1. Now, scroll down and click on the **Save** button.
1. Click on the **Nodes** option in the left panel to see the nodes defined in the Ansible inventory.
    <br><br>![ Nodes! ](@assets/img/howto-ansible-nodes.png)<br><br>

Time for a quick test.

1. Go to the Commands option in the left panel in the Nodes section, select an Ansible node defined in your Ansible inventory, and run some command (in this example we used “`ls -la`”).
    <br><br>![ Run Test Commands ](@assets/img/howto-ansible-runcommand.png)<br><br>
1. Now you can run any command/playbooks/inline-playbooks over your Ansible inventory.

### First Inline-Playbook Inside a Rundeck Job
1. Create a new Job
1. Give it any name
1. In the Workflow tab select **Ansible Playbook Inline Workflow Node Step**
1. Put the following playbook:
    ```
    - name: test playbook
      hosts: all
      tasks:
      	- shell: uname -a
        	ignore_errors: yes
        	register: uname_result
      	- debug: msg="{{ uname_result.stdout }}"
    ```
1. Go to the **Nodes tab** in the Job Definition and type the name of an Ansible node as a _Node Filter_.
1. **Save** the Job
1. **Run the job**
    <br><br>![  ](@assets/img/howto-ansible-joboutput.png)<br><br>
