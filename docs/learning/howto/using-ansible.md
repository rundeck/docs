---

title: "Integrate with Ansible"
date: 2022-09-20
image: /images/chevron-logo-red-on-white.png
feed:
  description: "One popular pairing for Rundeck users is integrating Ansible playbooks into Rundeck to orchestrate and schedule workflows across multiple tools. Like Rundeck, Ansible's straightforward design and learning curve make it Operations friendly. Learn how you can integrate Rundeck with Ansible. "

---

# Integrate with Ansible

It’s common for Rundeck users to integrate Ansible into their Rundeck. Like Rundeck, Ansible's straightforward design and learning curve make it Operations friendly.

What does Rundeck do for Ansible users? Rundeck gives them a great GUI front-end experience and ties together their Ansible automation alongside different tools used by other groups. Rundeck's powerful access control capabilities can be used to safely provide other users and teams with self-service access to run automation (including Ansible playbooks) [https://docs.ansible.com/ansible/latest/user_guide/playbooks.html](https://docs.ansible.com/ansible/latest/user_guide/playbooks.html).

# What is Ansible?

[Ansible](https://github.com/ansible/ansible) is an automation solution developed by RedHat Inc, that handles configuration management, application deployment, cloud provisioning, ad-hoc task execution, network automation, and multi-node orchestration.

The [Ansible basic](https://docs.ansible.com/ansible/latest/user_guide/intro_getting_started.html) configuration is extremely easy. Ansible just needs two files to work: [the configuration file](https://docs.ansible.com/ansible/latest/reference_appendices/config.html) (`ansible.cfg`, usually at `/etc/ansible` path) and [the inventory file](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html)  (where Ansible stores their remote nodes in [this format](https://docs.ansible.com/ansible/2.3/intro_inventory.html), usually at `/etc/ansible` path too).

Ansible uses [playbooks](https://docs.ansible.com/ansible/latest/user_guide/playbooks.html) (essentially a defined blueprint for automation tasks), to manage configurations and deployments to remote machines.

The full Ansible documentation is available here [https://docs.ansible.com/](https://docs.ansible.com/).

## How to Integrate Ansible with Rundeck

> Note: This How To assumes readers are very familiar with Rundeck. It is suggested to review and fully understand the [Tutorial Exercises](/learning/tutorial/index.md) prior to attempting these steps.

Both Rundeck versions (Community and Enterprise) use a [built-in plugin](https://github.com/Batix/rundeck-ansible-plugin) for Ansible integrations. This plugin imports hosts from Ansible's inventory. It includes a bunch of facts and can run modules and playbooks. There is also a node executor and file copier for the project.

This integration enables Rundeck users to:

- Call Ansible playbooks and modules from Rundeck. Rundeck returns output from Ansible's command line, however in an easier to consume format within Rundeck’s GUI and users can utilize the Rundeck API and access control features.
- Use Ansible as the underlying execution framework. Run any command or script and output will be collated by node and step like typical Rundeck output.

### Pre-Requisites
- Rundeck installed with version {{$rundeckVersion}}
- Ansible binaries installed on Rundeck Server based on [Ansible documentation](https://docs.ansible.com/).
- Confirmation that Rundeck can SSH as `rundeck` user to the Ansible endpoints defined in the inventory file.

> Note: It is possible to use the Welcome Project environment with the Project File in the Additional Information section at the bottom of this page.

## Ansible Configuration

Ansible needs two basic files to work, [ansible.cfg](https://docs.ansible.com/ansible/latest/reference_appendices/config.html) (where Ansible configurations are located) and `hosts` (inventory).

In this guide we use three nodes defined as the [Ansible inventory](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html) file: (Note-Your file will be different)

```
[ssh_farm]
192.168.33.20
192.168.33.21
192.168.33.22
```

## Rundeck/Ansible Integration

1. To run commands via the "Commands" menu or the default "Command" node step in a Rundeck job, we can configure a project with the Ansible node executor as a default. **Create a new project**, go to the **Default Node Executor** tab and select _Ansible Ad-hoc Node Executor_.
    <br><br>![ Edit Config ](/assets/img/howto-ansible-editconfig.png)<br><br>
1. In the Ansible Node Executor configuration, set the Executable (usually `/bin/bash`) and define the Ansible config path (usually at `/etc/ansible/ansible.cfg`). Click on the **Generate Inventory** checkbox. Now scroll down and click on the **Save** button.
    <br><br>![ Node Executor Config ](/assets/img/howto-ansible-defaultnodeexec.png)<br><br>
    The Rundeck-Ansible plugin uses the `rundeck` user as the default user to connect to the Ansible remote inventory nodes. At this point, it’s possible to define the SSH authentication method (`privatekey` and `password`) and the specific Ansible SSH user to connect to the remote inventory nodes. You need to define the username in the SSH User textbox. Depending on the auth method you can select the password from the storage path or the ssh key (also from the filesystem path).
    <br><br>![ Node Executor Authentication ](/assets/img/howto-ansible-nodeexecauth.png)<br><br>
1. Add the Ansible inventory nodes by clicking on **Project Settings** > **Edit Nodes...** and then on **Add new Node Source +**.
    <br><br>![ Add Node Source ](/assets/img/howto-ansible-addnodesource.png)<br><br>
1.  Choose **Ansible Resource Model Source** and define the Ansible inventory file path on your Rundeck Server (usually at `/etc/ansible/hosts`) and Ansible config path (usually at `/etc/ansible/ansible.cfg`).
    <br><br>![ Ansible Node Source ](/assets/img/howto-ansible-ansiblenodesource.png)<br><br>
    <br><br>![ Ansible Node Source Config ](/assets/img/howto-ansible-ansiblesourceconfig.png)<br><br>
    Similar to the node executor configuration, in the “SSH Connection” section it’s possible to define the Authentication method (`privatekey` or `password-based`). Depending on the Authentication method, enter the _user_, _ssh password_, or the _key file path_.
    <br><br>![ Ansible Node Source Auth ](/assets/img/howto-ansible-ansiblesourceauth.png)<br><br>
1. Now, scroll down and click on the **Save** button.
1. Click on the **Nodes** option in the left panel to see the nodes defined in the Ansible inventory.
    <br><br>![ Nodes! ](/assets/img/howto-ansible-nodes.png)<br><br>

Time for a quick test.

1. Go to the Commands option in the left panel in the Nodes section, select an Ansible node defined in your Ansible inventory, and run some command (in this example we used “`ls -la`”).
    <br><br>![ Run Test Commands ](/assets/img/howto-ansible-runcommand.png)<br><br>
1. Now you can run any command/playbooks/inline-playbooks over your Ansible inventory.

### First Inline-Playbook Inside a Rundeck Job
1. Create a new Job
1. Give it any name
1. In the Workflow tab select **Ansible Playbook Inline Workflow Node Step**
1. Put the following playbook:
    ``` yaml
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
    <br><br>![  ](/assets/img/howto-ansible-joboutput.png)<br><br>

To see the output you may need to switch to the _Log Output_ view.

## Additional Information

It is possible to use the Welcome Project environment with this [Project File](https://github.com/rundeckpro/welcome-project/raw/main/supplements/ansible.rdproject.jar).

1. Create a new project called `ansible` (or another name if that one is taken)
1. Open the Ansible Project and use _Project Settings_ > _Import Archive_ to import the file.
1. Run the **Install Ansible on Rundeck Server** Job to install Ansible.

The other jobs have descriptions for what they do and are aligned with this tutorial.

## Inventory File
When Gather Facts is false, the inventory file is read as Yaml data. At the moment, it only supports up to 10MB of data, which supports around 19,000 nodes. However, it depends on the operating system.
When the limit is exceeded it throws this error in the rundeck.log file:
```
org.yaml.snakeyaml.error.YAMLException: The incoming YAML document exceeds the limit: 10485760 code points.
```

## Notes
It's advisable to segment extensive inventories into smaller groups or files containing approximately 1000 nodes each. Consequently, for every 1000 nodes, establish a dedicated source node for the respective group.
The information described above is based on the recommendations described in the Ansible documentation.
[Ansible - Intro Inventory](https://docs.ansible.com/ansible/latest/inventory_guide/intro_inventory.html)
