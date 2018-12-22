## Commands

Sometimes the need to execute an arbitrary command comes up.
You might need to check a bunch of systems to find out if they 
are running correctly, see their load, check resources or perhaps
collect information.

You can execute commands via the GUI or using rundeck command line interface.

## Using the GUI
First go to the [Commands page][page:manual/06-commands.md].

### Filter nodes
To filter the nodes type in an expression or choose a saved filter. 
Below, the nodes tagged "www" are filtered:

![Anvils filtered list](../figures/fig0602.png)

Filtering with tags provides an abstraction over hostnames
and lets the administrator think about command execution using formalized
classifications. New nodes can be added, others decommissioned while
others given new purpose, and the procedures stay unchanged because
they are bound to the filtering criteria. 
With tags that describe application role, commands can be targeted
to specific sub sets of nodes without hard coding any
hostnames. 

This simple classification scheme will allow the developers and
administrators to share a common vocabulary when talking about the kinds
of nodes supporting the Anvils application.

### Execute command

To execute a command, type in the command string in text field labeled "Command":

![Command page](../figures/fig0610.png)

The output will appear below:

![Command output](../figures/fig0611.png)

## Using the CLI

The [rd adhoc][rd] command provides a command line interface to run commands.

### Filter nodes

First, you must filter the nodes. The `rd nodes` command uses filter flag: `-F`.

Here, the `tags` keyword is used to include nodes tagged 'www':

~~~~~~~~ {.bash}
rd nodes -p anvils -F tags=www
~~~~~~~~ 

~~~~~~~~
www1.anvils.com www2.anvils.com
~~~~~~~~ 
    
List the nodes tagged "app":

~~~~~~~~ {.bash}
rd nodes -p anvils -F tags=app
~~~~~~~~ 

~~~~~~~~ 
app1.anvils.com app2.anvils.com
~~~~~~~~ 

Use the `+` (AND) operator to list the web and app nodes:

~~~~~~~~ {.bash}
rd nodes -p anvils -F tags=www+app
~~~~~~~~ 

~~~~~~~~ 
www1.anvils.com www2.anvils.com app1.anvils.com app2.anvils.com
~~~~~~~~ 

Exclude the web and app nodes:

~~~~~~~~ {.bash}
rd nodes -p anvils -F '!tags=www+app'
~~~~~~~~ 

~~~~~~~~ 
db1.anvils.com
~~~~~~~~ 


### Execute command

Use `rd adhoc` to execute adhoc commands and scripts.

Specify the command string you wish to execute on the filtered node set after the `--`.
Below the `id` command is dispatched:

~~~~~~~~ {.bash}
rd adhoc -p anvils -F tags=www -- id
~~~~~~~~ 

~~~~~~~~ 
# Immediate execution scheduled (148)
148 running 2016-11-3017:21:10-0800 - http://madmartigan.local:4440/project/deps/execution/show/148 adhoc whoami
~~~~~~~~ 

Typically, you will want to see the output from the running command. 
Add the --follow flag to see the output.

~~~~~~~~ {.bash}
rd adhoc -p anvils --follow -F tags=www -- whoami
~~~~~~~~ 

~~~~~~~~ 
# Started execution 147 running 2016-11-3017:20:43-0800 - http://madmartigan.local:4440/project/deps/execution/show/147 adhoc whoami
greg
~~~~~~~~ 


[rd]: https://rundeck.github.io/rundeck-cli/
