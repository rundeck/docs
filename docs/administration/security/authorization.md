# Access Control Policy

Based on the [Authentication](/administration/security/authentication.md) mechanism, the Container provides Rundeck with a list of "group" or "role" names that the user belongs to. Rundeck uses this list to determine what access rights the user has. For more about the role list, refer to [Authenticating Users - Container authentication and authorization](/administration/security/authentication.md#container-authentication-and-authorization).

A Rundeck _access control policy_ grants users and user groups certain privileges to perform actions against rundeck resources like projects, jobs, nodes, commands and API. Every action requested by a user is evaluated by the Rundeck authorization system and logged for reporting and auditing purposes.

Since Rundeck respects the policy definition, you can define role-based authorization to restrict users to only a subset of actions. This enables a self-service type interface, where some users have access to a limited set of executable actions.

Two dimensions of information dictate authorization inside Rundeck:

- _Group_ memberships assigned to a _user_ login.
- Access control policy that grants access to one or more *policy
  action*s to a _group_ or _user_.

The remainder of this section will describe how to use the access control policy, or watch the video below for an overview:

<VidStack src="youtube/i859f1WG3Bo" poster="https://img.youtube.com/vi/i859f1WG3Bo/maxresdefault.jpg"/>

## Understanding ACL Concepts

Before diving into specific policies, it's important to understand three fundamental concepts:

### The Two-Context Model

Every complete permission set requires rules in BOTH contexts:

1. **Application Context** (`context: application: 'rundeck'`)
   - Controls access TO projects and system resources
   - Answers: "Can this user see this project in the list?"
   - Answers: "Can this user create new projects?"
   - Required even for project-level users

2. **Project Context** (`context: project: 'ProjectName'`)
   - Controls actions WITHIN a specific project
   - Answers: "Can this user run jobs?"
   - Answers: "Can this user view nodes?"

**Key Point**: A user needs Application-level `read` permission on a project just to see it, PLUS Project-level permissions to do anything inside it.

### Generic vs Specific Resources

There are two ways to reference resources:

**Generic Resources** - Use when the resource doesn't exist yet:
- Format: `resource:` section with `kind:` property
- Used for: CREATE and DELETE permissions on resource types
- Example: Creating NEW jobs, deleting ANY job

```yaml
for:
  resource:
    - equals:
        kind: job
      allow: [create]  # Allow creating NEW jobs
```

**Specific Resources** - Use for actions on existing resources:
- Format: Named sections like `job:`, `node:`, `adhoc:`
- Used for: READ, RUN, UPDATE, KILL on specific resources
- Can filter by properties (name, group, uuid, tags, etc.)

```yaml
for:
  job:
    - equals:
        name: 'MyJob'
      allow: [read, run]  # Allow running the specific job "MyJob"
```

**Why Both?** To delete a job, you need:
1. Generic permission: `resource: kind: job allow: [delete]` (permission to delete jobs as a type)
2. Specific permission: `job: ... allow: [delete]` (permission to delete this particular job)

### Actions Depend on Resource Type

Not all actions are available for all resources. The available actions depend on:
- The context (Application vs Project)
- The resource type
- Whether it's generic or specific

This is detailed in the reference tables below, but common patterns are:
- Jobs: `read, view, update, delete, run, kill, create, toggle_schedule, toggle_execution`
- Nodes: `read, run` (in Project context) or `read, create, update, refresh` (as generic resource)
- Projects: `read, configure, delete, import, export, admin`

## Common Access Patterns

These examples show complete, working ACL policies for typical scenarios. You can copy and modify these for your needs:

### Read-Only User (Can View but Not Execute)

**Goal**: User can see the project and jobs but cannot run anything.

```yaml
description: Application - See project in list
context:
  application: 'rundeck'
for:
  project:
    - equals:
        name: 'MyProject'
      allow: [read]
by:
  group: readonly_users

---

description: Project - View jobs and nodes
context:
  project: 'MyProject'
for:
  job:
    - allow: [read, view]  # Can see job definition
  node:
    - allow: [read]  # Can see node list
  resource:
    - equals:
        kind: event
      allow: [read]  # Can see execution history
by:
  group: readonly_users
```

### Job Executor (Can Run but Not Modify)

**Goal**: User can run existing jobs but cannot create, modify, or delete them.

```yaml
description: Application - Project access
context:
  application: 'rundeck'
for:
  project:
    - equals:
        name: 'MyProject'
      allow: [read]
by:
  group: executors

---

description: Project - Run jobs only
context:
  project: 'MyProject'
for:
  job:
    - allow: [read, view, run, kill]  # Can run and stop executions
  node:
    - allow: [read, run]  # Can execute on nodes
  resource:
    - equals:
        kind: event
      allow: [read]  # Can see execution history
by:
  group: executors
```

### Job Developer (Full Job Management)

**Goal**: User can create, modify, run, and delete jobs in a project.

```yaml
description: Application - Project access
context:
  application: 'rundeck'
for:
  project:
    - equals:
        name: 'MyProject'
      allow: [read]
  storage:
    - match:
        path: '(keys/myproject/.*|myproject/.*)'
      allow: [read]  # Access to project-specific keys
by:
  group: developers

---

description: Project - Full job management
context:
  project: 'MyProject'
for:
  resource:
    - equals:
        kind: job
      allow: [create, delete]  # Can create/delete jobs
    - equals:
        kind: node
      allow: [read, refresh]  # Can refresh node sources
    - equals:
        kind: event
      allow: [read, create]
  job:
    - allow: [read, view, update, run, kill, toggle_schedule, toggle_execution]
  node:
    - allow: [read, run]
  adhoc:
    - allow: [read, run, kill]  # Can run ad-hoc commands
by:
  group: developers
```

### Limited by Job Group

**Goal**: User can only see/run jobs in a specific job group path.

```yaml
description: Application - Project access
context:
  application: 'rundeck'
for:
  project:
    - equals:
        name: 'MyProject'
      allow: [read]
by:
  group: app_team

---

description: Project - Limited to /apps/myapp/* jobs
context:
  project: 'MyProject'
for:
  job:
    - match:
        group: 'apps/myapp/.*'  # Only jobs in this path
      allow: [read, view, run]
  node:
    - allow: [read, run]
  resource:
    - equals:
        kind: event
      allow: [read]
by:
  group: app_team
```

**What this user CANNOT do**: They cannot see or run jobs outside the `apps/myapp/` group path.

### Multiple Projects Access

**Goal**: User has access to multiple projects with the same permissions.

```yaml
description: Application - Access to multiple projects
context:
  application: 'rundeck'
for:
  project:
    - match:
        name: '(ProjectA|ProjectB|ProjectC)'
      allow: [read]
by:
  group: multi_project_team

---

description: Project - Run jobs in multiple projects
context:
  project: '(ProjectA|ProjectB|ProjectC)'  # Regex matches all three
for:
  job:
    - allow: [read, view, run, kill]
  node:
    - allow: [read, run]
  resource:
    - equals:
        kind: event
      allow: [read]
by:
  group: multi_project_team
```

## Key Storage Access Control

Key Storage access can be controlled at both the system level (Application context) and the project level (Project context). This allows administrators to isolate key storage access per project, preventing users from accessing keys in other projects.

### Project-Level Key Storage

By default, Key Storage access is defined at the project level. This means each project can have its own set of keys, and project-level ACLs control who can access them. The Key Storage GUI is available in the project configuration menu for project-level key management.

**Example: Granting project-level key storage access**

```yaml
description: Application - Access to project keys
context:
  application: 'rundeck'
for:
  storage:
    - match:
        path: '(keys/MyProject/.*|MyProject/.*)'
      allow: [read, create, update, delete]
by:
  group: developers
```

This grants the `developers` group full access to keys stored under the `keys/MyProject/` or `MyProject/` storage paths.

### System-Level Key Storage (Legacy Behavior)

If you prefer to use the previous system-level key storage behavior (where all keys are defined at the system level rather than per project), you can disable project-level key storage.

**For Enterprise users**: Navigate to **System Menu → System Configuration** and set:
- Configuration Key: `rundeck.feature.projectKeyStorage.enabled`
- Value: `false`

**For Open Source users**: Add this property to `rundeck-config.properties`:

```properties
rundeck.feature.projectKeyStorage.enabled=false
```

When disabled, all Key Storage access control must be defined in Application context ACL policies, and keys are shared across all projects.

**Best Practice**: Use project-level key storage (the default) to maintain better security isolation between projects.

## Access control policy

Access to running or modifying Jobs is managed in an access control policy defined using the aclpolicy YAML document. This file contains a number of policy elements that describe what user
group is allowed to perform which actions.

Please read over this document for information on how to define it, and how to grant access for certain actions to certain resources:

- [aclpolicy](/manual/document-format-reference/aclpolicy-v10.md)

Policies can be organized into more than one file to help organize access by group or pattern of use. The normal Rundeck install will have generated a policy for the "admin" group. Not all users will need to be given "admin" access level to control and modify all Jobs. More typically, a group of users will be given access to just a subset of Jobs.

### Policy File Locations

Rundeck loads ACL Policy definitions from these locations:

- All `*.aclpolicy` files found in the rundeck `etc` dir, which is either `/etc/rundeck` (rpm and debian install defaults),
  or `$RDECK_BASE/etc` (launcher/war configuration).
- System level policies created via the [System ACLs API](/api/index.md#acls)
- Project level policies created via the [Project ACLs API](/api/index.md#project-acls), limited only to project context policies for a specific project.

### Lifecycle

The Rundeck server does not need to be restarted for changes to aclpolicy files to take effect.

The files are loaded at startup and are cached. When an authorization request occurs, the policies may be reloaded if the file was modified. A file's contents are cached for at least 2 minutes before checking if they need to be reloaded. Also, the etc directory is only re-scanned for new/removed files after a 2 minute delay.

If an authorization request occurs in the context of a specific Project (e.g. "does a user have Run access for a specific Job in this project?") then the Project-level policies created via the API area also used to evaluate the authorization request.

Otherwise, only the policies on the filesystem, and uploaded to the System ACLs API are evaluated for the request.

### Enterprise ACL Storage Layer

Rundeck Enterprise includes an optimized ACL Storage Layer that improves application performance when you have many ACL policies. This feature stores ACLs in the database in a format that allows them to be queried more efficiently, significantly improving performance with large numbers of ACLs.

**How it works:**

- The Enterprise ACL Storage Layer is enabled by default
- At startup, ACLs from the Core ACL Storage Layer are automatically transferred to the Enterprise layer if the transfer feature is enabled
- Newly created or modified ACLs automatically use the Enterprise storage layer
- Performance improves as the number of ACLs increases

**Configuration:**

**For Enterprise users**: Navigate to **System Menu → System Configuration** to configure these settings:

- **Enterprise ACL Storage Layer**
  - Configuration Key: `rundeck.feature.enterpriseacl.enabled`
  - Value: `true` (enabled by default)

- **Automatic Transfer Feature**
  - Configuration Key: `rundeck.feature.enterpriseacltransfer.enabled`
  - Value: `true` (enabled by default)

**For Open Source users**: Add these properties to `rundeck-config.properties`:

```properties
rundeck.feature.enterpriseacl.enabled=true
rundeck.feature.enterpriseacltransfer.enabled=true
```

**How the Transfer Feature Works:**

When the Transfer feature is enabled (`enterpriseacltransfer.enabled=true`):

- If Enterprise ACL Storage Layer is **enabled**: ACLs that can be transferred will move from Core to Enterprise storage at startup
- If Enterprise ACL Storage Layer is **disabled**: ACLs will transfer back from Enterprise to Core storage at startup

When the Transfer feature is disabled, no automatic transfers occur. You can enable the Enterprise ACL Storage Layer without enabling automatic transfer—only newly created or modified ACLs will use the new storage layer.

:::warning
If regular expressions are used in the `by:` clause of ACLs, those ACLs cannot be queried efficiently and remain stored only in the Core storage layer.
:::

:::warning
If you disable the Enterprise ACL Storage Layer feature (`enterpriseacl.enabled=false`) but enable the Transfer feature (`enterpriseacltransfer.enabled=true`) and restart, any ACLs in the Enterprise storage layer will be automatically transferred back to the Core storage layer.
:::

### rd-acl

The [rd acl](https://rundeck.github.io/rundeck-cli/) command
can help to create, test, and validate your policy files.

### Complete Admin Policy Example

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

The example policy document above demonstrates the access granted to the users in group "admin".

Both `username` and `group` can use regular expressions to match multiple users or groups.

Two separate policies define two levels of access control. The first is the "project" context, which allows access to actions on resources within a specific project. The second is the "application" level context, which allows access to things like creating projects, access to projects, managing users, and access to system information.

## Specific Resources and Resource Types

As described in the [ACL Policy](/manual/document-format-reference/aclpolicy-v10.md) definition, access is granted or denied to specific "resources". Resources can take two forms:

- A specific resource, with a type and properties
- Resource types, which applies to all resources of a specific type or "kind"

For example, you might want to restrict access to a job or jobs within a certain group. This corresponds to specific "job" resources with a "group" property matching a certain pattern.

You might also want to restrict who can create _new_ jobs. Since a new job does not exist yet, you cannot create a rule for this action to apply to an existing job. Which means this corresponds to a generic resource with a "kind" called "job".

## API Token Authorization Roles

In Rundeck 2.8.x and later, Authentication Tokens are given a set of _Authorization Roles_ at generation time, so the access levels for the Token depend on how it was generated.

See: [API Token](/api/index.md#token-authentication) usage instructions.

See below: [API Token Authorization][].

(**Note:** In Rundeck 2.7.x and earlier, clients of the [Web API](/api/index.md) may use the [Token Authentication](/api/index.md#token-authentication) method. These clients are
placed in the special authorization group called `api_token_group`.)

[api token authorization]: #api-token-authorization

## Rundeck resource authorizations

Rundeck declares a number of actions that can be referenced inside the access control policy document.

The actions and resources are divided into project scope and application scope:

### Application Scope Resources and Actions

**When do you use Application Scope?**
- Granting access TO projects (so they appear in the project list)
- Creating new projects
- System administration (managing ACLs, users, plugins, runners)
- Managing API tokens
- Accessing Key Storage
- System-level execution control (enable/disable all executions)

**Important**: Even users who only work within projects need Application scope rules to:
1. See the project in their project list (`project:` resource with `read` action)
2. Access Key Storage if needed (`storage:` resource)

You define application scope rules in the aclpolicy, by declaring this context:

    context:
      application: 'rundeck'

These are the Application scope actions that can be allowed or denied via the aclpolicy:

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
- Managing Runners
  - Read Runner configuration details. `read`
  - Create new Runner entries. `create`
  - Update existing Runner entries. `update`
  - Delete Runner entries. `delete`
  - Execute the ping command to check Runner status. `ping`
  - Regenerate a new credential package for a Runner. `regenerate_credentials`

The following table summarizes the generic and specific resources and the
actions you can restrict in the application scope:

#### Application Scope: Generic Resources

**Use these for permissions that apply to resource types (e.g., creating new resources)**

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
| "          | `runner`      | none       | `read`                   | Read Runner setup/configuration details        |
| "          | "             |none        | `create`                 | Create new Runner entries                      |
| "          | "             |none        | `update`                 | Update existing Runner entries                 |
| "          | "             |none        | `delete`                 | Delete Runner entries                          |
| "          | "             |none        | `ping`                   | Execute the ping command to check Runner status |
| "          | "             |none        | `regenerate_credentials` | Regenerate a new credential package for a Runner|

#### Application Scope: Specific Resources

**Use these for permissions on specific named resources (e.g., accessing a particular project)**

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

Service Tokens implicitly allow a subset of the user's own authorization roles and username (`generate_service_token` implies `generate_user_token`), so the usernames and roles authorized in the ACL Policy must specify any _extra_ roles. When a Service Token is generated, any requested roles not already allowed by `generate_user_token` will be checked against the ACL Policy. However, it is best to be explicit in the list of roles you want to allow.

**Important:**

The `subset:` match for `roles:` declares that _extra_ roles for the Service Token may only come from this list, but doesn't require the token to have all of the roles. (If you used `contains:` it would be the inverse, and grant access only if the extra Service Token roles contained all of those in the `roles:` list, i.e. a superset vs. a subset.)

### Project Scope Resources and Actions

**When do you use Project Scope?**
- Controlling what users can DO inside a project
- Managing job permissions (create, run, modify, delete)
- Controlling node access
- Managing webhooks
- Running ad-hoc commands

**Important**: Project scope rules are evaluated AFTER a user has accessed the project. Without Application scope `read` permission for the project, these rules never apply.

You define project scope rules in the aclpolicy by declaring this context:

    context:
      project: "(regex)"

The regex can match all projects using ".\*", or you can simply put the project name.

**Critical Note**: For projects not matched by any aclpolicy, NO actions will be granted to users. This means every user needs explicit rules for every project they access.

Note that for projects not matched by an aclpolicy, _no_ actions will be granted to users.

Also note that to hide projects completely from users, you would need to grant or deny the "read" access to the project in the [Application Scope](#application-scope-resources-and-actions).

These are the Project scope actions that can be allowed or denied via the aclpolicy:

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

#### Project Scope: Generic Resources

**Use these for permissions that apply to resource types within a project**

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
| "          | `runner`      | `read`                   | Read Runner setup/configuration details        |
| "          | "             | `create`                 | Create new Runner entries                      |
| "          | "             | `update`                 | Update existing Runner entries                 |
| "          | "             | `delete`                 | Delete Runner entries                          |
| "          | "             | `ping`                   | Execute the ping command to check Runner status |
| "          | "             | `regenerate_credentials` | Regenerate a new credential package for a Runner|

#### Project Scope: Specific Resources

**Use these for permissions on specific resources within a project**

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
| `runner` |  "name", "id", "tags"            | `read`             | Read Runner Listing                                                                 |
| "       |                                   | `create`           | Create new Runner entries                                                           |
| "       |                                   | `update`           | Update existing Runner entries                                                      |
| "       |                                   | `delete`           | Delete Runner entries                                                               |
| "       |                                   | `ping`             | Execute the ping command to check Runner status                                     |
| "       |                                   | `admin`            | Full access to manage Runners                                                       |


_Note_: see [Node resource properties](#node-resource-properties) for more node resource properties for authorization.

_Note_: Jobs can be referenced using "name" and "group" or using "uuid".

_Note_: `runAs` and `killAs` actions only apply to certain API endpoints, and allow running jobs or adhoc executions or killing executions to be performed with a different username attached as the author of the action. See [Rundeck API - Running a Job](/api/index.md#running-a-job).

_Note_:
Job deletion requires allowing the 'delete' action both at the generic type and specific resource levels.

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

Below is an example policy document demonstrating policy actions to create limited access for a group of users. Users in the group "restart_user", are allowed to run three jobs in the "adm" group, Restart, stop and start. By allowing `run` but not `read`, the "stop" and "start" jobs will not be visible. Allowing `view` for the 'Restart' job, but not `read`, means that the users can view the job, but not its workflow definition, nor can they download the Job definition file.

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

Below is an example policy to prevent any user on the "remote" group to execute any command or job on the local rundeck server.

If a job is tried to be executed locally, it will fail. Also, the local rundeck server will not appear on the node filter list.

File listing: remote.aclpolicy

```yaml .numberLines
description: Access for users on remote group
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

## Quick Reference: ACL Checklist

### Minimum ACL for Project Access

Every project user needs at least:

✅ **Application Context:**
```yaml
context:
  application: 'rundeck'
for:
  project:
    - equals:
        name: 'ProjectName'
      allow: [read]
by:
  group: my_group
```

✅ **Project Context:** (minimum to see anything)
```yaml
context:
  project: 'ProjectName'
for:
  job:
    - allow: [read, view]
  node:
    - allow: [read]
by:
  group: my_group
```

### Action Hierarchy

Permissions are additive. To run a job, you need:
1. Application: `project: allow: [read]` (see the project)
2. Project: `job: allow: [read or view]` (see the job)
3. Project: `job: allow: [run]` (run the job)
4. Project: `node: allow: [run]` (execute on nodes)

### Common Action Combinations

| User Role | Application Context | Project Context |
|-----------|-------------------|-----------------|
| **Viewer** | `project: [read]` | `job: [read, view]`, `node: [read]`, `resource: event [read]` |
| **Executor** | `project: [read]` | `job: [read, view, run, kill]`, `node: [read, run]`, `resource: event [read]` |
| **Developer** | `project: [read]`, `storage: [read]` | `resource: job [create, delete]`, `job: [read, view, update, run, kill]`, `node: [read, run]`, `adhoc: [read, run]` |
| **Project Admin** | `project: [read, configure]`, `project_acl: [read, create, update, delete]`, `storage: [read, create]` | `resource: [all types]`, `job: [*]`, `node: [*]`, `adhoc: [*]` |

### Resource Type Quick Reference

| Type | Use In | Purpose | Common Actions |
|------|--------|---------|----------------|
| `resource: kind: job` | Project | CREATE/DELETE jobs | `create`, `delete`, `scm_create`, `scm_delete` |
| `job:` | Project | Actions on SPECIFIC jobs | `read`, `view`, `update`, `run`, `kill`, `toggle_schedule` |
| `resource: kind: node` | Project | CREATE/UPDATE nodes | `create`, `update`, `refresh` |
| `node:` | Project | Actions on SPECIFIC nodes | `read`, `run` |
| `resource: kind: project` | Application | CREATE new projects | `create` |
| `project:` | Application | Actions on SPECIFIC projects | `read`, `configure`, `delete`, `import`, `export` |
| `adhoc:` | Project | Run ad-hoc commands | `read`, `run`, `kill`, `runAs` |
| `storage:` | Application | Access keys/passwords | `read`, `create`, `update`, `delete` |

## Troubleshooting access control policy

### Quick Diagnosis Decision Tree

**User says: "I can't see the project"**
→ Check Application scope: Does user have `project: name: 'ProjectName' allow: [read]`?

**User says: "I can see the project but it's empty/no jobs visible"**
→ Check Project scope: Does user have `job: allow: [read]` or `[view]`?
→ Check if job-specific filters (group, name, uuid) are too restrictive

**User says: "I can see jobs but can't run them"**
→ Check Project scope: Does user have `job: allow: [run]`?
→ Check Project scope: Does user have `node: allow: [run]`? (Required to execute on nodes)

**User says: "I can't create new jobs"**
→ Check you have BOTH:
   1. Project scope: `resource: kind: job allow: [create]` (generic permission)
   2. Project scope: `job: allow: [create]` (specific permission)

**User says: "I can't delete a job"**
→ Check you have BOTH:
   1. Project scope: `resource: kind: job allow: [delete]` (generic permission)
   2. Project scope: `job: allow: [delete]` matching that specific job (specific permission)

**User says: "I get 'Unauthorized' but I have the right ACL"**
→ Check your group membership (User Profile page)
→ Check `rundeck.audit.log` for detailed evaluation
→ Look for DENIED entries (deny rules override allow rules)
→ Verify the `by:` clause uses `group:` and NOT `username:` if using groups

### Diagnostic Steps

To diagnose access issues:

1. **Use Access Level Checks** (Commercial/Enterprise only): The [Access Level Checks](/administration/security/acl-policy-editor.md#access-level-checks-commercial) tool provides a comprehensive view of all permissions applied to a user or group. This is especially helpful when multiple ACL policy documents are used together, as it shows the combined effective permissions.

2. **Verify group membership**: Go to the user's profile page in Rundeck. That page will list the groups the user is a member of.

3. **Check the audit log**: Read the messages inside the `rundeck.audit.log` file. The authorization facility generates detailed messages describing how the policy is matched to the user context.

4. **Validate policy files**: Use the [rd-acl](/manual/command-line-tools/rd-acl.md) tool to test and validate your policy files.

5. **Understand the evaluation order**: For each entry in the audit log, you'll see all decisions leading up to either an AUTHORIZED or a REJECTED message. It's not uncommon to see REJECTED messages followed by AUTHORIZED. The important thing is to look at the LAST decision made.

6. **Remember deny rules win**: If ANY rule denies an action, it's denied, even if other rules allow it.
