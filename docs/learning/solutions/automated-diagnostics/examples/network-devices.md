### Automated Diagnostics Examples
---

## Network Devices

One of the often-overlooked elements of Runbook Automation is that any sort of element can be targeted in jobs as nodes.  
Most commonly, nodes are servers or workstations but nodes could also represent other objects in the computing world such as network devices.  
Most common network devices can be accessed over SSH in a similar way to Linux nodes but how the devices process commands can vary from device to device.  
A very common approach to managing network devices as nodes is to use built-in integration with Ansible, which takes advantage of Ansible’s own inventory mechanism to define nodes and connectivity.

## Examples

### BGP Route Flapping
BGP route flapping occurs when an adjacent network continuously sends updates regarding changes to IP address routing, causing instability in the network. 
This can occur due to hardware or software failures, misconfigured BGP filters, or issues with ISP networks.
When troubleshooting BGP route flapping, the first step is identifying whether the problem is local or external.
Running the following BGP commands can provide information about neighboring networks and routing activity: 

**`show ip bgp neighbors`**<br>
**`show ip bgp summary`** 

### Spanning Tree
Spanning-tree prevents loops in a Layer 2 switched network.  To avoid unexpected network instability users must be intentional in spanning-tree design.  
To verify that spanning-tree is working as expected, use the following command:

**`show spanning-tree`**

### Duplex Mismatch
Duplex mismatch occurs when a switch port and an attached server (or computer) are not configured to use the same duplex setting or both ends are not configured to auto negotiate the setting. 
The settings for the connection may appear to work fine at low traffic levels, particularly for ping packets. But as the traffic level grows, the errors increase, affecting network throughput.
The following commands are useful for troubleshooting duplex issues:

**`show interfaces`**
**`show interfaces status`**

## Mechanisms for Automated Diagnostics

### Ansible Integration
Ansible is a popular configuration management solution often used for managing network devices. 
Many customers use PagerDuty Runbook Automation as an intuitive graphical-user-interface (GUI) on top of Ansible, or as a way to integrate Ansible with other tools in their worksflows.
As with many other integrations, configuration of Ansible is handled through a built-in [plugin](/learning/howto/using-ansible.md#rundeck-and-ansible-integration) that assumes Ansible is installed on the same server as Runbook Automation.

The Ansible integration is configured on a per-project basis and is composed of 3 main pieces:
* **Ansible Resource Model Source**<br>
    Once configured to point at the Ansible inventory file and config path, nodes will be imported from Ansible inventory to Runbook Automation inventory 
* **Ansible Node Executor**<br>
    This node executor is used to connect to Ansible nodes in place of the SSH or WinRM executor that might be used for other nodes
* **Ansible Playbook Inline Workflow Node Step**<br>
    Once the model source and executor have been configured, it is possible to run any Ansible playbooks as job steps.  These steps can be used inline alongside other workflow and node steps to create something that accomplishes more than just what Ansible could on its own.
