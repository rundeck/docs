# Builtin Workflow Steps

### Ansible Module

Ansible Module workflow step allows executing any Ansible module directly on any Rundeck workflow, it's also available for Node Steps. To use, add a new step, and selecting "Ansible Module".

![Ansible_Module_0](~@assets/img/ansible_module_0.png)

On Module textbox just put the module name, [here](https://docs.ansible.com/ansible/latest/modules/modules_by_category.html) you can check all Ansible modules.

![Ansible_Module_1](~@assets/img/ansible_module_1.png)

It's possible to pass arguments to modules (for example, any command to execute using the `command` module), just put the name of argument on "Argument" textbox. In the following example, we're passing a command (`pwd`) to `command` module to execute [pwd](https://linux.die.net/man/1/pwd).

![Ansible_Module_2](~@assets/img/ansible_module_2.png)

### Ansible Playbook Inline

Ansible Playbook Inline workflow step allows executing an Ansible playbook definition directly on any Rundeck workflow, it's also available for Node Steps. To use, add a new step, and select "Ansible Playbook".

![Ansible_Inline_0](~@assets/img/ansible_inline_0.png)

In Playbook textbox just put the Ansible Playbook content, it's important to respect the Ansible Playbook YAML [syntax](https://docs.ansible.com/ansible/latest/reference_appendices/YAMLSyntax.html).

![Ansible_Inline_1](~@assets/img/ansible_inline_1.png)

It's possible to pass extra variables to Playbooks. The variable must be defined on Ansible Playbook in this format `"{{ variable_name }}"'`, later, define the format, in the following example we're using a YAML format. Finally, define the variable content on "Extra Variables" textbox (following the format defined on "Syntax Mode"), [options](https://docs.rundeck.com/docs/manual/job-options.html#job-options) and [data](https://docs.rundeck.com/docs/manual/log-filters/key-value-data.html#key-value-data) values are accepted.

![Ansible_Inline_2](~@assets/img/ansible_inline_2.png)

Another way to pass variables to Ansible inline playbooks is to define as an argument on "Extra Ansible arguments" textbox, using the same inline-playbook defined in the example above, you can define the argument using `-e "variable_name:value"`, [options](https://docs.rundeck.com/docs/manual/job-options.html#job-options) and [data](https://docs.rundeck.com/docs/manual/log-filters/key-value-data.html#key-value-data) values are accepted.

![Ansible_Inline_3](~@assets/img/ansible_inline_3.png)

### Ansible Playbook

Ansible Playbook allows to execute Ansible Playbooks files from filesystem, it's also available for Node Step. It's available adding "Ansible Playbook" workflow step on any job.

![Ansible_Playbook_0](~@assets/img/ansible_playbook_0.png)

To reference the playbook file, just put the Ansible Playbook file path at "Playbook" textbox like the following example.

![Ansible_Playbook_1](~@assets/img/ansible_playbook_1.png)

Like Ansible Playbook Inline step, it's possible to use "Extra Variables" textbox to pass any variable defined in your Playbook, it's importaant follow the syntax defined on "Syntax Mode" list. You can use Rundeck [options](https://docs.rundeck.com/docs/manual/job-options.html#job-options) or [data](https://docs.rundeck.com/docs/manual/log-filters/key-value-data.html#key-value-data) values.

![Ansible_Playbook_2](~@assets/img/ansible_playbook_2.png)

Also, it's possible use "Extra Ansible arguments" as the same way of Ansible Playbook Inline step, just define the argument in the following way: `-e "variable_name:value"`, [options](https://docs.rundeck.com/docs/manual/job-options.html#job-options) and [data](https://docs.rundeck.com/docs/manual/log-filters/key-value-data.html#key-value-data) values are accepted.

![Ansible_Playbook_3](~@assets/img/ansible_playbook_3.png)

### Global Variable

#### Working with job references

When a global variable step is defined in a referenced job, it exports values into a data variable that can be used in subsequent steps of the parent job.
![Global Variable Image 1](~@assets/img/global-variable-image1.png)

#### Collecting values for all target nodes

Use the global variable workflow step to collect data across all target nodes into a delimited list. Rundeck executes the steps before the global variable step, collecting values into the variable and then executes any remaining steps. The data variable is available to all subsequent steps in the job.

Note that you can also collect a value from a single node that is available in steps on the other targeted nodes.
![Global Variable Image 2](~@assets/img/global-variable-image2.png)

#### Reference

The global variable step can capture the following groups of variables:
-   [context](https://docs.rundeck.com/docs/manual/job-workflows.html#context-variables) variable, such as project, job, node
-   data variable captured by a [key-value](https://docs.rundeck.com/docs/manual/log-filters/key-value-data.html), Multiline regex, or JQ log filter


| Field name | Syntax                    | Description                                                                                                                                                                                            |
|------------|---------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Value      | ${group.keyname*}         | Captures the value across all nodes into a comma separated list. To change the delimiter add the character after the asterisk. For example to capture values separated by a dash use ${data.status*-}. |
|            | ${group.keyname@nodename} | Captures the value only on a single node. For example. ${data.status@haproxy}.                                                                                                                         |
| Group      |                           | Prefix that identifies the variable group. Note that you cannot add the variable to any context groups such as job or node, however you can use data to add it to the captured group.                  |
| Name       |                           | Key name of variable.  


### Flow Control

### Job State Conditional

Job State Conditional Step allows to verify if a job is running and/or checks the lastest execution status.

![Job State Conditional step](~@assets/img/job-state-conditional-0.png)

This step has many ways of being configured:

![Job State Conditional configuration](~@assets/img/job-state-conditional-1.png)

A. Project name (this is needed only if the job if is an external project).

B. Job Name, you can refer to a job using the *group/name* format, for example: *maintenance/check_status*.

C. You can reference to a job using its *UUID*, example: *b152d59b-7d6d-440c-95ea-23dc9fc1db07*.

D. Is the job running? (*true* or *false* or none).

E. Last execution status (*Succeeded*, *Failed*, *Aborted*, *TimeOut*, *Failed-with-retry* or *Never*).

F. Condition: *Equals* (Match with defined at "Running" and "Execution State" sections) or *Not Equals* (if it doesn't match with defined at "Running" and "Execution State" sections). Basically, this defines the behavior of the step with the rules defined before.

G. If the expected condition is not met, it stops the execution of the current job.

H. If execution is stopped, it will report the current job as failed.

I. Custom status when the current job is halted (overrides *Fail* when *Halted*).

J. Defines any label to the current step.

#### Example:

We need to run the current job only if another was executed successfully (last execution: *Succeeded*). 

![Job State Conditional example](~@assets/img/job-state-conditional-2.png)

At the beginning of the current job, we add a new Job State Conditional Step to verify another job status.

In the Job State Conditional Step, we need to point to the job using *Group/Name* or *UUID* (in the example we are using *UUID*), also, we need to know the latest execution, then, we set Running job as *false* and set Latest execution as *Succeeded*. At this point we have our rules, now we set Condition to *Equals* to match with running status and latest execution defined. 

Clicking on "Halt" and "Fail when Halted" the next steps on the current job don't execute, the job stops and reports as *Failed*.

Finally at the moment of run our job, if the referenced job defines in Job State Conditional Step has run as *Succeeded* in the latest execution all the rules matched and the next steps can be executed.


### Refresh Project Nodes


