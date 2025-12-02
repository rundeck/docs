---
title: "Group/Project Node-Filtered Execute"
order: 320
---

# Group/Project Node-Filtered Execute

## Use Case Description

Assign a specific Rundeck Group access to run jobs in a project, but only against specific target nodes. This is useful for restricting access based on environments (dev/prod), node ownership, security zones, or application boundaries.

Users can view all nodes in the project but can only execute jobs on nodes matching specific criteria (tags, hostname patterns, custom attributes, etc.).

## What This User CAN Do
- View all jobs in the project
- Run jobs, but ONLY on nodes matching the filter criteria
- View all nodes in the project (including restricted ones)
- View execution history for jobs they run
- Read project-specific key storage entries

## What This User CANNOT Do
- Run jobs on nodes that don't match the filter
- Run ad-hoc commands (unless explicitly allowed with node filters)
- Create, modify, or delete jobs
- Create, update, or delete nodes
- Configure project settings
- Manage project ACLs
- Execute on production/restricted nodes (if filtered out)

## Common Node Filter Examples

Choose the filter pattern that matches your use case:

| Use Case | Node Filter Property | Example Value |
|----------|---------------------|---------------|
| Development servers only | `tags` (contains) | `dev` or `development` |
| Specific hostname pattern | `hostname` (match regex) | `app-dev-.*` |
| Non-production nodes | `tags` (contains) | `non-prod` |
| Specific application | `tags` (contains) | `app-billing` |
| Exclude rundeck server | `rundeck_server` (equals) | `false` |
| Specific OS family | `osFamily` (equals) | `unix` |
| Custom attribute | `environment` (equals) | `development` |

## Code Description

### Basic Example: Filter by Tag
Find and replace these values with your own.
- Project Unique ID: `prj-sandbox`
- Group: `grp-sandbox-devonly`
- Node Tag: `dev`

### Advanced Examples Below
See additional examples for different filtering scenarios.

Steps to implement are covered in the [overview page](index.md).

## ACL Code

### Example 1: Execute Only on Nodes with "dev" Tag

``` yaml
description: Application - Read access to project
context:
  application: 'rundeck'
for:
  project:
    - equals:
        name: prj-sandbox
      allow: [read]
  storage:
    - allow: [read]
      match:
        path: keys/project/prj-sandbox(/.*)?
by:
  group: grp-sandbox-devonly
---
description: Project - Run jobs only on dev-tagged nodes
context:
  project: prj-sandbox
for:
  job:
    - allow: [read, view, view_history, run]
  node:
    - contains:
        tags: [dev]
      allow: [read, run]
  resource:
    - equals:
        kind: event
      allow: [read]
    - equals:
        kind: node
      allow: [read]
by:
  group: grp-sandbox-devonly
```

### Example 2: Execute Only on Non-Production Nodes

Use this to exclude production servers from user access.

``` yaml
description: Application - Read access to project
context:
  application: 'rundeck'
for:
  project:
    - equals:
        name: prj-sandbox
      allow: [read]
  storage:
    - allow: [read]
      match:
        path: keys/project/prj-sandbox(/.*)?
by:
  group: grp-nonprod-team
---
description: Project - Execute on non-production nodes only
context:
  project: prj-sandbox
for:
  job:
    - allow: [read, view, view_history, run]
  node:
    # Allow on nodes with non-prod tag
    - contains:
        tags: [non-prod]
      allow: [read, run]
    # OR allow on nodes with dev tag
    - contains:
        tags: [dev]
      allow: [read, run]
    # OR allow on nodes with test tag
    - contains:
        tags: [test]
      allow: [read, run]
  resource:
    - equals:
        kind: event
      allow: [read]
    - equals:
        kind: node
      allow: [read]
by:
  group: grp-nonprod-team
```

### Example 3: Execute on Specific Hostname Pattern

Useful for application-specific servers or environment naming conventions.

``` yaml
description: Application - Read access to project
context:
  application: 'rundeck'
for:
  project:
    - equals:
        name: prj-sandbox
      allow: [read]
  storage:
    - allow: [read]
      match:
        path: keys/project/prj-sandbox(/.*)?
by:
  group: grp-app-team
---
description: Project - Execute only on app-specific servers
context:
  project: prj-sandbox
for:
  job:
    - allow: [read, view, view_history, run]
  node:
    - match:
        hostname: 'myapp-.*'
      allow: [read, run]
  resource:
    - equals:
        kind: event
      allow: [read]
    - equals:
        kind: node
      allow: [read]
by:
  group: grp-app-team
```

### Example 4: Exclude Rundeck Server Node

Prevent users from executing on the Rundeck server itself.

``` yaml
description: Application - Read access to project
context:
  application: 'rundeck'
for:
  project:
    - equals:
        name: prj-sandbox
      allow: [read]
  storage:
    - allow: [read]
      match:
        path: keys/project/prj-sandbox(/.*)?
by:
  group: grp-remote-only
---
description: Project - Execute on all nodes except Rundeck server
context:
  project: prj-sandbox
for:
  job:
    - allow: [read, view, view_history, run]
  node:
    - equals:
        rundeck_server: 'false'
      allow: [read, run]
  resource:
    - equals:
        kind: event
      allow: [read]
    - equals:
        kind: node
      allow: [read]
by:
  group: grp-remote-only
```

### Example 5: Multiple Filter Criteria (AND Logic)

Require nodes to match ALL criteria (e.g., must have BOTH tags).

``` yaml
description: Application - Read access to project
context:
  application: 'rundeck'
for:
  project:
    - equals:
        name: prj-sandbox
      allow: [read]
  storage:
    - allow: [read]
      match:
        path: keys/project/prj-sandbox(/.*)?
by:
  group: grp-app-dev
---
description: Project - Execute only on nodes with both required tags
context:
  project: prj-sandbox
for:
  job:
    - allow: [read, view, view_history, run]
  node:
    # Node must have BOTH tags
    - contains:
        tags: [app-billing, dev]
      allow: [read, run]
  resource:
    - equals:
        kind: event
      allow: [read]
    - equals:
        kind: node
      allow: [read]
by:
  group: grp-app-dev
```

### Example 6: Custom Node Attributes

Use custom attributes defined in your node sources.

``` yaml
description: Application - Read access to project
context:
  application: 'rundeck'
for:
  project:
    - equals:
        name: prj-sandbox
      allow: [read]
  storage:
    - allow: [read]
      match:
        path: keys/project/prj-sandbox(/.*)?
by:
  group: grp-app-owners
---
description: Project - Execute only on nodes owned by specific team
context:
  project: prj-sandbox
for:
  job:
    - allow: [read, view, view_history, run]
  node:
    # Using custom 'owner' attribute
    - equals:
        owner: 'billing-team'
      allow: [read, run]
    # Or using custom 'environment' attribute
    - equals:
        environment: 'development'
      allow: [read, run]
  resource:
    - equals:
        kind: event
      allow: [read]
    - equals:
        kind: node
      allow: [read]
by:
  group: grp-app-owners
```

## Understanding Node Filters in ACLs

### Available Node Properties

You can filter on any node attribute. Common properties include:

| Property | Description | Example Values |
|----------|-------------|----------------|
| `nodename` | Node name | `server01`, `web-.*` |
| `hostname` | Hostname | `app-prod-01.example.com` |
| `tags` | Node tags (use `contains`) | `[prod, web]` |
| `osFamily` | OS family | `unix`, `windows` |
| `osName` | OS name | `Linux`, `Windows Server` |
| `osVersion` | OS version | `20.04`, `2019` |
| `osArch` | Architecture | `amd64`, `x86_64` |
| `rundeck_server` | Is Rundeck server | `true`, `false` |
| Custom attributes | Your custom fields | `owner`, `application`, `datacenter` |

### Filter Types

| Filter Type | Usage | Example |
|-------------|-------|---------|
| `equals` | Exact match | `hostname: 'server01'` |
| `match` | Regex pattern | `hostname: 'app-.*'` |
| `contains` | Set membership (for tags) | `tags: [dev, app1]` |

### Multiple Rules = OR Logic

Multiple node rules in the same policy create OR logic:

```yaml
node:
  - contains:
      tags: [dev]
    allow: [read, run]
  - contains:
      tags: [test]
    allow: [read, run]
```
This allows execution on nodes with EITHER `dev` OR `test` tag.

### Multiple Criteria in Same Rule = AND Logic

Multiple criteria in the same rule create AND logic:

```yaml
node:
  - contains:
      tags: [app-billing, dev]
    allow: [read, run]
```
This requires nodes to have BOTH `app-billing` AND `dev` tags.

## What Happens When Filter Doesn't Match?

When a user tries to run a job on a node they don't have access to:

1. **In Job Execution UI**: Filtered nodes won't appear in the node selection list
2. **If Job Has Pre-defined Nodes**: Job execution will fail with "Unauthorized" error
3. **Ad-hoc Commands**: User won't be able to execute on filtered-out nodes

## Best Practices

### 1. Use Tags for Flexibility
Tags are easier to manage than hardcoded hostnames:
```yaml
node:
  - contains:
      tags: [myapp]
    allow: [read, run]
```

### 2. Always Allow Node Read for All
Users should see all nodes (for awareness) but only execute on allowed ones:
```yaml
resource:
  - equals:
      kind: node
    allow: [read]  # See all nodes
node:
  - contains:
      tags: [dev]
    allow: [read, run]  # Execute only on dev nodes
```

### 3. Document Your Node Tagging Strategy
Maintain clear documentation of your node tags:
- `prod` = Production servers
- `dev` = Development servers  
- `test` = Test/QA servers
- `app-billing` = Billing application servers
- `app-inventory` = Inventory application servers

### 4. Test Before Deploying
Always test ACL policies in a non-production environment first:
1. Create the policy
2. Try running a job on allowed nodes (should work)
3. Try running on disallowed nodes (should fail)
4. Verify node list shows correct visibility

### 5. Combine with Job-Level Restrictions
For maximum control, combine node filters with job filters:
```yaml
job:
  - equals:
      group: 'dev-jobs'
    allow: [read, view, run]
node:
  - contains:
      tags: [dev]
    allow: [read, run]
```
This ensures dev team can only run dev jobs on dev nodes.

## Troubleshooting

**Problem**: User sees nodes but cannot execute on them
- **Check**: Node filter in ACL matches the target nodes
- **Verify**: Node has the expected tags/attributes
- **Test**: Use `rundeck.audit.log` to see authorization decisions

**Problem**: User cannot see any nodes
- **Check**: `resource: kind: node allow: [read]` is present
- **Check**: Application context has `project: allow: [read]`

**Problem**: Job fails with "Unauthorized" error
- **Check**: Pre-configured job nodes match user's node filter
- **Solution**: Either update job node filter or expand user's node access

**Problem**: All nodes show up in node list
- **Check**: Using `resource: kind: node` for read vs `node:` for execute
- **Note**: This is correct - users should see all nodes but can only execute on filtered ones

## Related Documentation

- [Node Resource Properties](/administration/security/authorization.md#node-resource-properties) - Complete list of node properties for filtering
- [Prevent Local Execution](/administration/security/authorization.md#prevent-local-execution-on-the-rundeck-server) - Example of excluding Rundeck server
- [Authorization Documentation](/administration/security/authorization.md#understanding-acl-concepts) - Deep dive on ACL concepts

