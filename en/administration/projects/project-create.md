% Project Create

A project can be created either from the graphical console or using the
[rd] shell tool.

## Graphical Interface

In the graphical console, you will notice a Project
menu in the navigation bar. If no projects exist, you will be prompted to
create a new project.

Press the "New Project" button to create a project.

![Figure: Create project prompt](../../figures/fig0203-a.png)

*Basic information*

Name

:   This is the unique identifier for the project. Project names can contain letters and numbers but do not use spaces or special characters.

Label

:   You may wish to use a more user friendly display name for the project. The project label can contain spaces and other characters.

Description

:   A brief explanation about the project. Normally, this is just one phrase or sentence explaining the project purpose. If you have large amounts of text, consider creating a project README.


*Execution Mode*

Disable Execution

:   Turn off the ability to execute jobs and ad-hoc commands.

Disable Schedule

:   Turn off the job scheduling feature.

*User Interface*

Job Group Expansion Level

:   In the Jobs page, how should the job groups be collapsed? A `1` is default and shows one group level opened. Use `0` to collapse all. Use `-1` to expand all.

Display the Readme

:   Show the Readme in the project list and/or home page.


Display the MOTD

:   Show the Readme in the project list and/or home page.


*Default Node Executor*

The Node Executor is responsible for executing commands and scripts on remote nodes. On Linux machines, SSH will be default.

*Default File Copier*

The File Copier is responsible for copying scripts as files to remote nodes before they are executed. On Linux machines, SCP will be default.


*Create*

After filling in the project create form, Rundeck initializes it and returns
you to the default page (eg, "Jobs").

Projects can be created at any time by going back to the Project menu
and selecting the "Create a new project..." item.



The project setup process generates Project configuration in the server, and
a local resource model containing information about the rundeck server node.


## Automating



### CLI Usage
The [rd projects][rd] command can be used to script the creation for projects. See the `rd projects create help` output for syntax usage.

Execute the `rd projects create` command and
specify a project name, here we use "MyProject":

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.bash}
rd projects create -p MyProject
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can also declare configuration properties when you create the project.

Here a project label and the default SSH key properties are declared as command line options:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.bash}
rd projects create -p MyProject -- \
   --project.label="My Project" \
   --project.ssh-keypath=/home/rundeck/.ssh/id_rsa
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can specify a resource model source by specifying keys as command line options, too.
Here a Directory model source is also defined.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.bash}
rd projects create -p MyProject -- \
  --project.label="My Project" \
  --project.ssh-keypath=/home/rundeck/.ssh/id_rsa \
  --resources.source.2.type=directory \
  --resources.source.2.config.directory=/home/rundeck/projects/MyProject/resources.d
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


[rd]: https://rundeck.github.io/rundeck-cli/

### API Usage

Project creation can be achieved via the [API](../../api/index.html).

[Create projects](../../api/index.html#project-creation):

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
POST /api/13/projects
Content-Type: application/json

{ "name": "MyProject", "config": { "project.label":"My Project" } }
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~




