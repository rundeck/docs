# Access Control Policy

Based on the [Authentication](/administration/security/authentication.md) mechanism,
the Container provides Rundeck
with a list of "group" or "role" names
that the user belongs to.
Rundeck uses this list to determine what access rights the user has.
For more about the role list,
refer to [Authenticating Users - Container authentication and authorization](/administration/security/authentication.md#container-authentication-and-authorization).

A Rundeck _access control policy_ grants users
and user groups certain
privileges to perform actions against rundeck resources
like projects, jobs, nodes, commands and API.
Every action requested by a user is evaluated by the
Rundeck authorization system and logged for
reporting and auditing purposes.

Since Rundeck respects the policy definition, you can define role-based
authorization to restrict users to only a subset of actions. This
enables a self-service type interface, where some users have
access to a limited set of executable actions.

Two dimensions of information dictate authorization inside Rundeck:

- _group_ memberships assigned to a _user_ login.
- access control policy that grants access to one or more *policy
  action*s to a _group_ or _user_.

The remainder of this section will describe how to use the access
control policy.

## Access control policy

Access to running or modifying Jobs is managed in an access control
policy defined using the aclpolicy YAML document.
This file contains a number of policy elements that describe what user
group is allowed to perform which actions.

Please read over this document for information on how to define it, and how to
grant access for certain actions to certain resources:

- [aclpolicy](/manual/document-format-reference/aclpolicy-v10.md)

Policies can be organized into more than one file to help organize
access by group or pattern of use. The normal Rundeck install will
have generated a policy for the "admin" group. Not all users will need
to be given "admin" access level to control and modify all Jobs. More
typically, a group of users will be given access to just a subset of
Jobs.

### Policy File Locations

Rundeck loads ACL Policy definitions from these locations:

- All `*.aclpolicy` files found in the rundeck `etc` dir, which is either `/etc/rundeck` (rpm and debian install defaults),
  or `$RDECK_BASE/etc` (launcher/war configuration).
- System level policies created via the [System ACLs API](/api/rundeck-api.md#acls)
- Project level policies created via the [Project ACLs API](/api/rundeck-api.md#project-acls), limited only to project context policies for a specific project.

### Lifecycle

The Rundeck server does not need to be restarted for changes to aclpolicy files to take effect.

The files are loaded at startup and are cached.
When an authorization request occurs, the policies may be reloaded if the file was modified.
A file's contents are cached for at least 2 minutes before checking if they need to be reloaded.
Also, the etc directory is only re-scanned for new/removed files after a 2 minute delay.

If an authorization request occurs in the context of a specific Project
(e.g. "does a user have Run access for a specific Job in this project?")
then the Project-level policies created via the API area also used to evaluate the authorization request.

Otherwise, only the policies on the filesystem, and uploaded to the System ACLs API are evaluated for the request.

### rd-acl

The [rd acl](https://rundeck.github.io/rundeck-cli/) command
can help to create, test, and validate your policy files.

### Example

File listing: admin.aclpolicy example

```yaml .numberLines
description: Admin project level access control. Applies to resources within a specific project.
context:
  project: '.*' # all projects
for:
  resource:
    - equals:
        kind: job
      allow: [create] # allow create jobs
    - equals:
        kind: node
      allow: [read,create,update,refresh] # allow refresh node sources
    - equals:
        kind: event
      allow: [read,create] # allow read/create events
  adhoc:
    - allow: [read,run,runAs,kill,killAs] # allow running/killing adhoc jobs
  job:
    - allow: [create,read,update,delete,run,runAs,kill,killAs] # allow create/read/write/delete/run/kill of all jobs
  node:
    - allow: [read,run] # allow read/run for nodes
by:
  group: admin

---

description: Admin Application level access control, applies to creating/deleting projects, admin of user profiles, viewing projects and reading system information.
context:
  application: 'rundeck'
for:
  resource:
    - equals:
        kind: project
      allow: [create] # allow create of projects
    - equals:
        kind: system
      allow: [read,enable_executions,disable_executions,admin] # allow read of system info, enable/disable all executions
    - equals:
        kind: system_acl
      allow: [read,create,update,delete,admin] # allow modifying system ACL files
    - equals:
        kind: user
      allow: [admin] # allow modify user profiles
  project:
    - match:
        name: '.*'
      allow: [read,import,export,configure,delete,promote,admin] # allow full access of all projects or use 'admin'
  project_acl:
    - match:
        name: '.*'
      allow: [read,create,update,delete,admin] # allow modifying project-specific ACL files
  storage:
    - allow: [read,create,update,delete] # allow access for /ssh-key/* storage content

by:
  group: admin
```

The example policy document above demonstrates the access granted to
the users in group "admin".

Both `username` and `group` can use regular expressions to match multiple users or groups.

Two separate policies define two levels of access control. The first is the "project"
context, which allows access to actions on resources within a specific project.
The second is the "application" level context, which allows access to things
like creating projects, access to projects, managing users, and access to system
information.

## Specific Resources and Resource Types

As described in the [ACL Policy](/manual/document-format-reference/aclpolicy-v10.md) definition, access
is granted or denied to specific "resources". Resources can take two forms:

- A specific resource, with a type and properties
- Resource types, which applies to all resources of a specific type or "kind"

For example, you might want to restrict access to a job or jobs within a certain
group. This corresponds to specific "job" resources with a "group" property
matching a certain pattern.

You might also want to restrict who can create _new_ jobs. Since a new job does
not exist yet, you cannot create a rule for this action to apply to an existing
job. Which means this corresponds to a generic resource with a "kind" called "job".

## API Token Authorization Roles

In Rundeck 2.8.x and later, Authentication Tokens are given a set of _Authorization Roles_ at generation time,
so the access levels for the Token depend on how it was generated.

See: [API Token](/api/rundeck-api.md#token-authentication) usage instructions.

See below: [API Token Authorization][].

(**Note:** In Rundeck 2.7.x and earlier, clients of the [Web API](/api/rundeck-api.md) may use the [Token Authentication](/api/rundeck-api.md#token-authentication) method. These clients are
placed in the special authorization group called `api_token_group`.)

[api token authorization]: #api-token-authorization

## Rundeck resource authorizations

Rundeck declares a number of actions that can be referenced inside the access control policy document.

The actions and resources are divided into project scope and application scope:

### Application Scope Resources and Actions

You define application scope rules in the aclpolicy, by declaring this context:

    context:
      application: 'rundeck'

These are the Application scope actions that can be allowed or denied via the
aclpolicy:

- Creating Projects (`create` action on a resource type with kind 'project')
- Reading system information (`read` action on a resource type with kind 'system')
- Reading enterprise cluster view (`view_cluster` action on a resource type with kind 'system'. Enterprise only)
- Managing System level ACL Policies (actions on a resource type with kind 'system_acl')
  - Reading `read`
  - Creating `create`
  - Updating `update`
  - Deleting `delete`
  - Full access `admin`
- Disabling executions (`disable_executions` action on a resource type with kind 'system')
- Managing executions
  - Enabling executions (`enable_executions` action on a resource type with kind 'system')
  - Disabling executions (`disable_executions` action on a resource type with kind 'system')
  - Full control (`admin` action on a resource type with kind 'system')
- Administering user profiles (`admin` action on a resource type of kind 'user')
- Accessing SSH Keys (`create`,`update`,`read`, or `delete` action on a specific path within the storage 'storage' type)
- Actions on specific projects by name (actions on a `project` type)
  - Reading `read`
  - Deleting `delete`
  - Configuring `configure`
  - Importing archives `import`
  - Exporting archives `export`
  - Use SCM import plugin on GUI or API without having access to other import archive actions `scm_import`
  - Use SCM export plugin on GUI or API calls without having access to other export archive actions `scm_export`
  - Deleting executions `delete_execution`
  - Export project to another Rundeck instance `promote`
  - Full access `admin`
- Managing Project level ACL Policies on specific projects by name (actions on a `project_acl` type)
  - Reading `read`
  - Creating `create`
  - Updating `update`
  - Deleting `delete`
  - Full access `admin`
- Generating API Tokens (actions on a resource type of kind `apitoken`)
  - Creating User tokens `generate_user_token`
  - Creating Service tokens `generate_service_token`
  - Full access `admin`
- Create Service Tokens with specified Roles (actions on a `apitoken` type)
  - Creating Service tokens `create`
- Managing plugins (actions on resource with kind 'plugin')
  - Listing installed and available plugins `read`
  - Installing plugins `install`
  - Uninstalling plugins `uninstall`
  - Full access `admin`    

The following table summarizes the generic and specific resources and the
actions you can restrict in the application scope:

| Type       | Resource Kind | Properties | Actions                  | Description                                    |
|------------|---------------|------------|--------------------------|------------------------------------------------|
| `resource` | `project`     | none       | `create`                 | Create a new project                           |
| "          | `system`      | none       | `read`                   | Read system information                        |
| "          | "             | none       | `view_cluster`                | Read only view of enterprise cluster view |
| "          | "             | none       | `enable_executions`      | Enable executions                              |
| "          | "             | none       | `disable_executions`     | Disable executions                             |
| "          | "             | none       | `admin`                  | Enable or disable executions                   |
| "          | `system_acl`  | none       | `read`                   | Read system ACL policy files                   |
| "          | "             | none       | `create`                 | Create system ACL policy files                 |
| "          | "             | none       | `update`                 | Update system ACL policy files                 |
| "          | "             | none       | `delete`                 | Delete system ACL policy files                 |
| "          | "             | none       | `admin`                  | All access to system ACL policy files          |
| "          | `user`        | none       | `admin`                  | Modify user profiles                           |
| "          | `job`         | none       | `admin`                  | Manage job schedules                           |
| "          | `apitoken`    | none       | `generate_user_token`    | Create a "user" token                          |
| "          | "             | none       | `generate_service_token` | Create a "service" token                       |
| "          | "             | none       | `admin`                  | Full access                                    |
| "          | `plugin`      | none       | `read`                   | List installed and available plugins           |
| "          | "             | none       | `install`                | Install plugins                                |
| "          | "             | none       | `uninstall`              | Uninstall plugins                              |
| "          | "             | none       | `admin`                  | Full access                                    |

Table: Application scope generic type actions

| Type          | Properties         | Actions            | Description                                             |
|---------------|--------------------|--------------------|---------------------------------------------------------|
| `project`     | "name"             | `read`             | View a project in the project list                      |
| "             | "                  | `configure`        | View and modify project configuration                   |
| "             | "                  | `delete`           | Delete project                                          |
| "             | "                  | `import`           | Import archive contents to the project                  |
| "             | "                  | `export`           | Export the project as an archive                        |
| "             | "                  | `scm_import`       | Use SCM import plugin                                   |
| "             | "                  | `scm_export`       | Use SCM export plugin                                   |
| "             | "                  | `delete_execution` | Delete executions                                       |
| "             | "                  | `admin`            | Full access to project                                  |
| `project_acl` | "name"             | `read`             | Read project ACL Policy files                           |
| "             | "                  | `create`           | Create project ACL Policy files                         |
| "             | "                  | `update`           | Update project ACL Policy files                         |
| "             | "                  | `delete`           | Delete project ACL Policy files                         |
| "             | "                  | `admin`            | All access to project ACL Policy files                  |
| `storage`     | "path","name"      | `create`           | Create files in the storage facility                    |
| "             | "                  | `update`           | Modify files in the storage facility                    |
| "             | "                  | `read`             | Read files and list directories in the storage facility |
| "             | "                  | `delete`           | Delete files in the storage facility                    |
| `apitoken`    | "username","roles" | `create`           | Create an API Token with specified roles or username    |

---

Table: Application scope specific resource actions

#### API Token Authorization

API Tokens can be generated if the user has the appropriate authorization on the `apitoken` generic resource type.

"User Token"
: An API Token with the owner's username, and a subset of the owner's authorization roles.

"Service Token"
: An API Token which may have a different username than the owner, and may have a different set of authorization roles.

This distinction allows administrators to let some users generate API Tokens which cannot increase their access levels (User Tokens), and other users to generate API Tokens with different access levels in a controlled way.

The authorizations levels are:

- `generate_user_token`: allows the user to generate a User Token.
- `generate_service_token`: allows a user to generate a Service Token (see below).
- `admin`: allows the user to generate a Token with any username and roles.

Example to generate a User Token:

```yaml
description: Allow "ops_team" members to generate User Tokens
for:
  resource:
  - equals:
      kind: apitoken
    allow: generate_user_token
context:
  application: rundeck
by:
  group: ops_team
```

To specify what roles and usernames are allowed for a Service Token,
the user must _also_ be authorized to `create` an `apitoken` resource type for a declared set of usernames and roles.

Example to generate a Service Token:

```yaml
description: Allow "sec_ops" members to generate Service Tokens, for specific usernames and additional roles
for:

  resource:
  - equals:
      kind: apitoken
    allow: generate_service_token

  apitoken:
  - allow: create
    match:
      username: '(mysql|myservice)'
    subset:
      roles:
      - mysql_api_access
      - myservice_api_access
context:
  application: rundeck
by:
  group: sec_ops
```

Service Tokens implicitly allow a subset of the user's own authorization roles and username
(`generate_service_token` implies `generate_user_token`), so the usernames and roles authorized in the
ACL Policy must specify any _extra_ roles. When a Service Token is generated, any requested roles not
already allowed by `generate_user_token` will be checked against the ACL Policy. However,
it is best to be explicit in the list of roles you want to allow.

**Important:**

The `subset:` match for `roles:` declares that _extra_ roles for the Service Token may only
come from this list, but doesn't require the token to have all of the roles.
(If you used `contains:` it would be the inverse, and grant access only if
the extra Service Token roles contained all of those in the `roles:` list, i.e. a superset vs. a subset.)

### Project Scope Resources and Actions

You define project scope rules in the aclpolicy by declaring this context:

    context:
      project: "(regex)"

The regex can match all projects using ".\*", or you can simply put the project
name.

Note that for projects not matched by an aclpolicy, _no_ actions will be granted
to users.

Also note that to hide projects completely from users, you would need to grant
or deny the "read" access to the project in the [Application Scope](#application-scope-resources-and-actions).

These are the Project scope actions that can be allowed or denied via the
aclpolicy:

- Create Jobs ('create' action on a resource type with kind 'job')
- Delete Jobs ('delete' action on a resource type with kind 'job')
- Create or delete jobs using the SCM plugin only ('scm_create' and 'scm_delete' on a resource type with kind 'job')
- Read Node data ('read' action on a resource type with kind 'node')
- Update/Refresh node data ('create','update','refresh' action on a resource type with kind 'node')
- Read history events ('read' action on a resource type with kind 'event')
- Create history events ('create' action on a resource type with kind 'event')
- Run adhoc jobs ('run' action on 'adhoc' resources)
- Kill adhoc jobs ('kill' action on 'adhoc' resources)
- Any Action on Jobs (actions on 'job' resources, see below)
- Managing Webhooks (action on a resource with the kind 'webhook')
  - Reading `read`
  - Creating `create`
  - Updating `update`
  - Deleting `delete`
  - Full access `admin`
  - Post to a webhook `post`

The following table summarizes the generic and specific resources and the
actions you can restrict in the project scope:

| Type       | Resource Kind | Actions      | Description                                   |
|------------|---------------|--------------|-----------------------------------------------|
| `resource` | `job`         | `create`     | Create a new Job                              |
| "          | "             | `delete`     | Delete jobs                                   |
| "          | "             | `scm_create` | Create a new job only using SCM import plugin |
| "          | "             | `scm_delete` | Delete jobs only using SCM import plugin      |
| "          | `node`        | `read`       | Read node information                         |
| "          | "             | `create`     | Create new node entries                       |
| "          | "             | `update`     | Modify node entries                           |
| "          | "             | `refresh`    | Refresh node entry from a URL                 |
| "          | `event`       | `read`       | Read history event information                |
| "          | "             | `create`     | Create arbitrary history event entries        |
| "          | `webhook`     | `admin`      | Full access                                   |
| "          | "             | `read`       | Read access                                   |
| "          | "             | `create`     | Create access                                 |
| "          | "             | `update`     | Update access                                 |
| "          | "             | `delete`     | Delete access                                 |
| "          | "             | `post`       | Post to webhook access                        |

Type Properties Actions Description

| Type    | Properties                        | Actions            | Description                                                                         |
|---------|-----------------------------------|--------------------|-------------------------------------------------------------------------------------|
| `adhoc` |                                   | `read`             | Read adhoc execution output                                                         |
| "       |                                   | `run`              | Run an adhoc execution                                                              |
| "       |                                   | `runAs`            | Run an adhoc execution as another user                                              |
| "       |                                   | `kill`             | Kill an adhoc execution                                                             |
| "       |                                   | `killAs`           | Kill an adhoc execution as another user                                             |
| `job`   | "name","group","uuid"             | `read`             | View a Job, its executions, and read its definition                                 |
| "       |                                   | `view`             | View a Job and its executions                                                       |
| "       |                                   | `update`           | Modify a job                                                                        |
| "       |                                   | `delete`           | Delete a job                                                                        |
| "       |                                   | `run`              | Run a job                                                                           |
| "       |                                   | `runAs`            | Run a job as another user                                                           |
| "       |                                   | `kill`             | Kill a running job                                                                  |
| "       |                                   | `killAs`           | Kill a running job as another user                                                  |
| "       |                                   | `create`           | Create the matching job                                                             |
| "       |                                   | `toggle_schedule`  | Enable/disable the job's schedule                                                   |
| "       |                                   | `toggle_execution` | Enable/disable the job for execution                                                |
| "       |                                   | `scm_create`       | Create a Job only using SCM import plugin                                           |
| "       |                                   | `scm_update`       | Import changes to a job using SCM import plugin                                     |
| "       |                                   | `scm_delete`       | Delete a job only using SCM import plugin                                           |
| "       |                                   | `view_history`     | View job executions history                                                         |
| `node`  | "rundeck_server", "nodename", ... | `read`             | View the node in the UI (see [Node resource properties](#node-resource-properties)) |
| "       |                                   | `run`              | Run jobs/adhoc on the node                                                          |


_Note_: see [Node resource properties](#node-resource-properties) for more node resource properties for authorization.

_Note_: Jobs can be referenced using "name" and "group" or using "uuid".

_Note_: `runAs` and `killAs` actions only apply to certain API endpoints, and allow running jobs or adhoc executions or killing executions to be performed with a different username attached as the author of the action. See [Rundeck API - Running a Job](/api/rundeck-api.md#running-a-job).

_Note_:
Job deletion requires allowing the 'delete' action
both at the generic type
and specific resource levels.

Recall that defining rules for a generic resource type is done in this way:

```yaml
for:
  resource:
    - equals:
        kind: 'project'
      allow: [create]
```

Whereas defining rules for specific resources of a certain type is done in this
way:

```yaml
for:
  job:
    - equals:
        name: bob
      allow: [run]
```

Or

```yaml
for:
  job:
    - equals:
        uuid: baad57ad-1e0b-4452-b1e3-0cbcd10a7bec
      allow: [run]
```

### Node resource properties

The properties available are the attributes that are defined on the node, so you can apply authorizations based on tag, osName, hostname, etc. The special `rundeck_server` property will be set to "true" for the Rundeck server node only, and "false" for all other nodes.

Any custom attributes can be used as well.

Pre-defined Node resource properties for authorization filters
| Name             | Description                                                  |
|------------------|--------------------------------------------------------------|
| `nodename`       | Name of the node                                             |
| `username`       | Authentication username                                      |
| `hostname`       | Hostname of the node                                         |
| `description`    | Description of the node                                      |
| `tags`           | Set of tags.  Can use with the `contains:` filter.           |
| `osName`         | Operating System name                                        |
| `osFamily`       | Operating System family, e.g. "unix" or "windows"            |
| `osVersion`      | Operating System version                                     |
| `osArch`         | Operating System architecture                                |
| `rundeck_server` | A value set to "true" if the node is the Rundeck server node |

### Access control policy actions example

Below is an example policy document demonstrating policy actions
to create limited access for a group of users.
Users in the group "restart_user", are allowed to run three jobs in the "adm"
group, Restart, stop and start. By allowing `run` but not `read`,
the "stop" and "start" jobs will not be visible.
Allowing `view` for the 'Restart' job, but not `read`,
means that the users can view the job,
but not its workflow definition,
nor can they download the Job definition file.

File listing: restart_user.aclpolicy example

```yaml .numberLines
description: Limited user access for adm restart action
context:
  project: '.*'
for:
  job:
    - equals:
        group: 'adm'
        name: 'Restart'
      allow: [run,view]
    - equals:
        group: 'adm'
        name: 'stop'
      allow: [run]
    - equals:
        group: 'adm'
        name: 'start'
      allow: [run]
by:
  group: [restart_user]

---

description: Limited user access for adm restart action.
context:
  application: 'rundeck'
for:
  resource:
    - equals:
        kind: system
      allow: [read] # allow read of system info
  project:
    - match:
        name: '.*'
      allow: [read] # allow view of all projects
by:
  group: [restart_user]
```

## Prevent Local Execution on the Rundeck Server

Below is an example policy to prevent any user on the "remote" group to
execute any command or job on the local rundeck server.

If a job is tried to be executed locally, it will fail. Also, the local
rundeck server will not appear on the node filter list.

File listing: remote.aclpolicy

```yaml .numberLines
description: Acess for users on remote group
context:
  project: '.*'
for:
  resource:
    - allow: '*'
  job:
    - allow: '*'
  adhoc:
    - allow: '*'
  node:
    - equals:
        rundeck_server: 'false'
      allow: [read, run]
by:
  group: remote
```

## Troubleshooting access control policy

After defining an aclpolicy file to grant access to a particular group
of users, you may find them getting "unauthorized" messages or
complaints that certain actions are not possible.

To diagnose this, begin by checking two bits:

1. The user's group membership. This can be done by going to the
   user's profile page in Rundeck. That page will list the groups the
   user is a member.
2. Read the messages inside the `rundeck.audit.log` log file. The
   authorization facility generates fairly low level messages describing
   how the policy is matched to the user context.
3. Use the [rd-acl](/manual/command-line-tools/rd-acl.html) tool to test and validate your policy files

For each entry in the audit log, you'll see all decisions leading up to either a
AUTHORIZED or a REJECTED message. It's not uncommon to see REJECTED
messages followed by AUTHORIZED. The important thing is to look at
the last decision made.
