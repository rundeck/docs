# Overview of Access Control

# Introduction
Access control is a key element of Rundeck and Runbook/Process Automation. This fundamental component governs the permissions and privileges granted to users, determined by their respective usernames, group memberships or [user classes](/manual/user-management/user-classes.html) (in the case of commercial products). It guarantees that users have access to specific resources and functionalities within the system.

# Access Control List (ACL) policies
Access Control List (ACL) policies are composed of one or more rules that designate a set of permissions for users that match a certain username or group pattern. 

Each rule within a policy has either a project context or a system context.  

Project context rules control access within projects, including access to nodes and jobs.  

System context rules control access to everything that is not specifically contained within projects, including administration of the server, group memberships, credentials that need to be accessed by multiple projects and access to projects themselves.

A policy can be (and often is) composed of both project context and system context rules.
* Policies that contain system context rules can only be created and modified by Full Users and must be stored under System Settings (gear icon at the top right of the screen) even if the policy contains project context rules. 
* Policies containing only project context rules can be created and modified by Full Users and project Administrators.  
    * If managed by project administrators, policies are stored and accessible under Project Settings (gear icon at the bottom left of the screen).
    *  A Full User could store a project-only policy either at the system level or inside a project’s settings
        * If stored inside a specific project, that policy will apply only to that project. 
        * If a project context policy is stored at the system level, it could potentially affect more than one project.
        * Best practice is to manage all project context policies at the project level if a team will be managing access within their own project.
* System context rules must be in place to define at least general access to a project before project context policies are effective. 

Roles are assigned based on [access control policies](/administration/security/authorization.html).  Effectively, an ACL policy assigns or denies system rights based on usernames and group memberships. For example, a user called “jo” might only be able to run Jobs within specific projects based on the fact that she is a member of the “SupportTeam” group.  

New ACL policies can be created through files on the server’s file system or through the access control GUI (the only option with Runbook Automation).  

# ACL Policy Examples
The  ACL policy examples provided in this section can be imported into your system for use. Before importing, make sure to input the correct project names and group names that the policy will affect.  Once imported, the policies can only be modified by a user with Full User or Admin access.

## Variables in ACL Examples
Find and replace these values with your own.
- Project Unique ID: `prj-sandbox`
- Group: `grp-sandbox-exec` 

## System Level
System level policies are created and stored in the System Menu (gear icon) under Access Control.  It's important to note that for project access, system-level configurations must be accompanied by a project-level policy. Examples of project level policies are provided  in the next [section](#Project-Level).

### Example policy to provide members of a group access to a single project
Typically, granting access to a single project is more common than providing access to all projects. This approach allows for a finer level of control by providing the minimum level of access required for a specific project.

```
description: Provide access for members of a specific Group for basic rights in a single Project
context:
  application: 'rundeck'
for:
  resource:
    - equals:
        kind: project
      allow: [read] # allow read for project(s) identified below
    - equals:
        kind: user
      allow: [admin] # allow user to modify their own user profile
    - equals:
        kind: apitoken
      allow: generate_user_token # allow access to create user apitoken
  project:
    - match:
        name: 'prj-sandbox'
      allow: [read] # allow read access to Project named
  project_acl:
    - match:
        name: 'prj-sandbox'
      allow: [read] # allow the ability to see but not edit project-specific ACL files
  storage:
    - allow: [read] # allow read access to keys and passwords stored in key storage
by:
  group: 'grp-sandbox-exec'
```

### Example policy  to provide access to a single Project, including access to all runners (Commercial Only)

```
description: Provide access for members of a specific Group for basic rights in a single Project, including access to all Runners
context:
  application: 'rundeck'
for:
  resource:
    - equals:
        kind: project
      allow: [read] # allow read for project(s) identified below
    - equals:
        kind: user
      allow: [admin] # allow user to modify their own user profile
    - equals:
        kind: apitoken
      allow: generate_user_token # allow access to create user apitoken
  runner:
    - allow: [ping, read, create] # Allow [ping, read, create] for runner
  project:
    - match:
        name: 'prj-sandbox'
      allow: [read] # allow read access to Project named
  project_acl:
    - match:
        name: 'prj-sandbox'
      allow: [read] # allow the ability to see but not edit project-specific ACL files
  storage:
    - allow: [read] # allow read access to keys and passwords stored in key storage
by:
  group: 'grp-sandbox-exec'
```

## Project Level
The ACL Project Level examples in this section apply to a specific project and can be created or modified either at the system level or inside the project, under the project settings menu, under the Access Control section.

It's important to note that project-level policies will only be effective if there is a corresponding system-level policy that grants access to the project. Refer to the system-level policies mentioned [above ](#System-Level) to ensure that the necessary access to the project is provided.

### Example policy to provide access to run jobs in a single project

```
description: Project-level ACL for a specific Group
for:
  resource:
    - equals:
        kind: node
      allow: [read,refresh] # allow refresh node sources
    - equals:
        kind: event
      allow: [read,create] # allows access to execution history
  job:
    - allow: [read,run,kill,killAs] # allow read/run/run/kill of all jobs
  node:
    - allow: [read,run] # allow read/run for nodes
by:
  group: 'grp-sandbox-exec'
```

### Example policy to provide access to modify and run jobs in a single project

```
description: Project-level ACL for a specific Group
for:
  resource:
    - equals:
        kind: node
      allow: [read,refresh] # allow refresh node sources
    - equals:
        kind: event
      allow: [read,create] # allows access to execution history
    - equals:
        kind: job
      allow: '*' #Project-level Access to Create and Delete Jobs
  job:
    - allow: [read,run,kill,killAs] # allow read/run/run/kill of all jobs
  node:
    - allow: [read,run] # allow read/run for nodes
by:
  group: 'grp-sandbox-exec'
```

# User Classes (Commercial Only)
Our commercial products (Runbook Automation and Process Automation) have an additional element used in Access Control, based on the license in use.  User Classes act as a superset of ACLs;  a user cannot be given a role that provides more permissions than the user class that they are assigned.  

Currently, there are two User Classes available for assignment: : `Full User` (known as `AppAdmin` in Runbook Automation) and `Job Runner.`  The `Full User` class is essentially equivalent to the built-in admin user, possessing super-user privileges to perform any action.   The `Job Runner` class is effectively the same as the built-in “user” account , providing standard user capabilities.  The availability of these User Classes in your system and the number you are entitled to depend on your specific commercial license.

[To assign a class to a user](/manual/user-management/user-classes.html#assigning-classes), a Full User can navigate to the system menu (gear icon) and access User Manager | User Classes.  It is important to note that assigning a User Class will not give a user access to anything until they also match an ACL policy that provides the necessary access, such as a combination of those listed above.

# Resources
* [ACL Recipes](/learning/howto/acls/)
* [Setting up Authentication](/administration/security/authentication.html)
* [Getting Started with ACLs](/learning/howto/acl_basic_examples.html)
* [Webinar on ACL Best Practices](https://www.youtube.com/watch?v=i859f1WG3Bo)
* [ACL Policy Documentation](/manual/document-format-reference/aclpolicy-v10.md)