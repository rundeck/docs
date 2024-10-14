# Overview of Projects
### Introduction
Projects are a core element of Rundeck and Runbook Automation.  Most of the elements that you interact with, such as [Jobs](/learning/getting-started/jobs/index.md), [Nodes](/learning/getting-started/jobs/node-sources.md) and [Commands](/learning/tutorial/commands.md#_2-getting-started-commands) will be contained within the context of a Project.  Individual Projects are created to serve the needs of a particular team or to contain a set of related Jobs or Nodes. Access to each Project can be controlled through [Access Control.](/learning/howto/acl_basic_examples.md#getting-started-with-access-control-examples)<br>
## Steps for Getting Started with a new Project
### Step 1: [Create a new Project](/manual/projects/project-create.md#project-create) 
To get started, the first step is to create a new Project. To do so, you need to be logged in as admin or a Full User. In addition to jobs and nodes, the project contains specific configurations like node executor and file copier.<br>
### Step 2: [Add your first node](/learning/howto/ssh-on-linux-nodes.md#adding-nodes)
The next step is to add a remote node on the Project to dispatch commands and jobs against them. Generally, nodes are added by defining [node sources](https/learning/getting-started/jobs/node-sources.html) which might gather information from existing sources like AWS, Ansible or Service Now’s CMDB.<br>
### Step 3: [Add a key to Rundeck Key Storage](/learning/howto/ssh-on-linux-nodes.md#configuring-rundeck)
To access remote Linux nodes, the server needs a private SSH key to trust the Rundeck server.  This step adds the private key to Rundeck Key Storage.  Over time, passwords and keys needed for target nodes should be added to Key Storage in this same way.<br>
### Step 4: [Create a new job dispatched to example remote node](/learning/getting-started/jobs/creating-a-job.md#creating-a-rundeck-job)
Create a new job with an example command step (e.g: `whoami`), go to "nodes" section and enter the node name as a filter, then save the job and run it.<br>
### Step 5: [Add a new user](/administration/security/default-users.md#built-in-users-roles)
By default, Rundeck creates an `admin` user. A good practice is to add new users to run jobs and limit some Rundeck functions.<br>
### Step 6: Add a new user/role based ACL focused on the new Project
The new user is full restricted by default, now let's create an [ACL](/manual/document-format-reference/aclpolicy-v10.md#aclpolicy) focused on that user to access and execute the Project's jobs. The Following ACL definition illustrates this:<br>
```
description: project context.
context:
 project: ProjectEXAMPLE
for:
 resource:
   - allow: [run,read]
 job:
   - allow: [read,view,update,run]
 node:
   - allow: [read,run]
by:
 username: my_new_user
---

description: app context.
context:
 application: 'rundeck'
for:
 project:
 - allow: read
   match:
     name: ProjectEXAMPLE
 storage:
    - allow: [read]
by:
 username: my_new_user
```
Now enter using the new user's credentials and you can run jobs contained in this Project.