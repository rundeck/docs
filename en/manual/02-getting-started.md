% Getting Started
% Alex Honor; Greg Schueler
% November 20, 2010

This chapter helps new users get started with Rundeck. We will begin
by explaining a few essential Rundeck concepts and
terminology and then discuss installation, project setup and introduce
you to the top level navigation of the interface.

## Essential Concepts

Several fundamental concepts underlie and drive the Rundeck system.
If you are a new user, knowing about them will
help you use or integrate Rundeck into your environment.


* **Role-based Access Control Policies**:   A Rundeck _[access control policy][page:administration/security/authorization.md]_ grants users
and user groups certain privileges to perform actions against rundeck resources
like projects, jobs, nodes, commands and API. 
* **Projects**:  A _[project][page:administration/projects/index.md]_ is a place to separate management activity.
All Rundeck activities occur within the context of a project.
Multiple projects can be maintained on the same Rundeck server.
* **Jobs** : A _job_ encapsulate a sequence of steps, job options and nodes where the steps execute. See [[page:manual/04-jobs.md]] and [[page:manual/creating-jobs.md]].
* **Nodes**: A _[node]_  is a resource that is either a physical or virtual instance
of a network accessible host.
A *resource model* is a representation of Nodes in a project.
* **Commands**: A _[command]_ is a single executable string executed on a Node.
Rundeck invokes commands on nodes via a *node executor*
which evaluates the command string and executes it. 
* **Executions**:  An _[execution]_ is a representation of the activity of a running or completed 
command or job. The data about the execution is used in rundeck to monitor
the progress of a job or command and later for reporting about what happened.
* **Plugins**: Most of what Rundeck does is via one of its _plugins_. Plugins exist
to execute commands on nodes, perform steps in a job, 
send a notification about job status, gather
information about the hosts in your network, copy a file to a remote
server, store and stream logs, or talk to a user directory. See [[page:manual/job-plugins.md]] and [[page:developer/index.md]] and [[page:plugins/index.md]].


## Download and Installation

If a running Rundeck instance isn't already available to you, 
there are a couple ways you can try it.

* You can [download](http://rundeck.org/downloads.html) and 
install the Rundeck software. There are several package formats. 
Choose the one that best suits your infrastructure.
After installation, be sure Rundeck has been started.
See [Startup][page:administration/maintenance/startup.md] to learn how to
startup and shutdown rundeck.
* You can run the [vagrant](https://github.com/rundeck/anvils-demo) demo.
The demo contains a project with tagged nodes, example job workflows with
dynamic options, and a set of users, each with varying degrees of privilege.

The default port for the web interface is `4440`. If you
installed Rundeck on your local machine, go to this URL: <http://localhost:4440>

## Login

Rundeck requires every user to login. The default installation
defines an "admin" user with access to perform all actions.
Use "admin" for username and password.

![Login form](../figures/fig0202.png)

## Project setup

A new installation will not contain any projects so Rundeck will present
you with a dialog to create one. Press the "New Project" button to create
a project. 
Fill the project creation form with a desired name. Project names can
contain letters and numbers but do not use spaces or special characters.
The [[page:administration/projects/index.md]] 
section
will show you how to learn to add Nodes, automate the creation and maintenance of
Rundeck projects.

Once the project has been created you are ready to use your Rundeck instance.

## Rundeck Graphical Console


### Navigation

Most Rundeck navigation is done using the navigation bar on the left side of the page.
Using the left navigation bar you can choose between available projects, and once inside a project you can switch to the project's Dashboard, Jobs, Nodes, Commands and Activity pages.
Project adminstrators will also be able to access the Project Settings pages.

For those with Rundeck administrator access the System settings can be accessed by presing the gear icon in the page header. 

Finally, your user profile and logout functions are found under the User icon.

![Top level navigation](../figures/fig0201.png)

Projects menu

:    Select the desired project. If only one project exists, the menu will
     automatically be selected. You can create new projects from
     this menu, too.

Dashboard

:    View the project description, Readme and executions summary. 
     Rundeck Pro users may see UI plugins that provide visualizations for schedules and execution history.

Jobs

:    From the Jobs page, one can list, create and run Jobs. A
     configurable filter allows a user to limit the Job listing to those
     Jobs matching the filtering criteria. These filter settings can be
     saved to a Users profile. Only authorized jobs will be visible.
     
     See [Jobs][page:manual/04-jobs.md].

Nodes

:    The Nodes page is used to browse your Nodes configured in your
     Project resource model. A filter  control can be used to 
     limit the listing to just the Node resources
     matching the filter criteria. Given the appropriate authorization
     you can also execute ad hoc commands to your filtered node set.
     
     See [Nodes][page:manual/05-nodes.md].

Commands

:    The Commands page lets you execute arbitrary commands against the
     nodes that match the node filter.
     
     See [Commands][page:manual/06-commands.md].

Activity

:    From the Activity page, one can view currently executing commands
     and Jobs or browse execution history. The execution
     history can be filtered based on user selected parameters. Once the
     filter has been set, the matching history is displayed. The current
     filter settings also configure an RSS link, found in the top right of
     the page (see Rundeck Administration to enable RSS). 
     
     See [Activity][page:manual/08-activity.md].

  
System

:    If your login belongs to the "admin" group and therefore granted
     "admin" privileges, a "System" icon will be displayed in
     the top navigation bar. 
     From the System menu you can access the Key Storage, 
     System Configuration, Access Control, System Report, Log Storage,
     List Plugins, Password Utility and Execution model.
     
     See [Configure][page:manual/09-configure.md]

User

:    The User menu lets you logout and view your profile page. 
     Your user profile lists your group memberships and a form to list
     and generate API tokens.
     
     See [User][page:manual/10-user.md]


## Command Line Tools 

Rundeck includes a number of shell tools to dispatch commands, load
and run Job definitions and interact with the dispatcher queue. These
command tools are an alternative to functions accessible in the
graphical console.

See the [Command line tools][page:manpages/man1/index.md].

## API

You can also use the Web API to interface with all aspects of node
and Job execution. 

See the [Rundeck API][page:api/rundeck-api.md] page for a reference on the
endpoints and examples.

## Document Formats

If you prefer to manage job and resource definitions using text files
you can do so using XML or YAML formats.

See the [Document Format Reference][page:manpages/man5/index.md].

[node]: nodes.html
[command]: commands.html
[execution]: executions.html
