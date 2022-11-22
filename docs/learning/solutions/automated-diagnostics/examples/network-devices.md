### Automated Diagnostics Examples
---

## Network Devices

#### Introduction
One of the often-overlooked elements of Runbook Automation and Process Automation is that any sort of element can be targeted in jobs as nodes.  Most commonly, nodes are servers or workstations but nodes could also represent other objects in the computing world such as network devices.  Most common network devices can be accessed over SSH in a similar way to Linux nodes but how the devices process commands can vary from device to device.  A very common approach to managing network devices as nodes is to use built-in integration with Ansible,  which takes advantage of Ansible’s own inventory mechanism to define nodes and connectivity.

#### What is Ansible?
Ansible is a very popular configuration management solution developed by RedHat, Inc..  Though it is a very powerful tool, many customers use PagerDuty Process Automation as a GUI front-end that takes advantage of Ansible’s capabilities but makes Ansible more accessible for less technical users.  As with many other integrations, configuration of Ansible is handled through a built-in [plugin](https://docs.rundeck.com/docs/learning/howto/using-ansible.html#rundeck-and-ansible-integration) that assumes Ansible is installed on the same server as Process Automation.

#### Integration Points

Ansible integration is configured on a per-project basis and is composed of 3 main pieces:
* **Ansible Resource Model Source**<br>
    Once configured to point at the Ansible inventory file and config path, nodes will be imported from Ansible inventory to Process Automation inventory 
* **Ansible Node Executor**<br>
    This node executor is used to connect to Ansible nodes in place of the SSH or WinRM executor that might be used for other nodes
* **Ansible Playbook Inline Workflow Node Step**<br>
    Once the model source and executor have been configured, it is possible to run any Ansible playbooks as job steps.  These steps can be used inline alongside other workflow and node steps to create something that accomplishes more than just what Ansible could on its own.
