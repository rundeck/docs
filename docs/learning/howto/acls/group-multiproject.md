---
title: "Group/Multiple Projects Execute Access"
order: 350
---

# Group/Multiple Projects Execute Access

## Use Case Description

Assign a specific Rundeck Group access to run jobs across multiple projects with the same permissions. This is useful for teams that work across several projects or for applications that span multiple environments.

## What This User CAN Do
- View all specified projects in their project list
- View and run all jobs in each specified project
- View execution history across all projects
- View nodes in all specified projects
- Run jobs on nodes in all specified projects
- Read project-specific key storage entries for each project

## What This User CANNOT Do
- Create, modify, or delete jobs in any project
- Run ad-hoc commands
- Create, update, or delete nodes
- Configure any project settings
- Manage project ACLs
- Create or modify key storage entries
- Access projects not explicitly listed
- Manage webhooks

## Code Description
Find and replace these values with your own.
- Project Unique IDs: `prj-dev`, `prj-test`, `prj-prod`
- Group: `grp-multiproject-exec`

You can modify the regex pattern to match your project naming convention. Examples:
- Three specific projects: `(prj-dev|prj-test|prj-prod)`
- All projects starting with "app-": `app-.*`
- All development projects: `.*-dev`

Steps to implement are covered in the [overview page](index.md).

## ACL Code

``` yaml
description: Application - Read access to multiple projects
context:
  application: 'rundeck'
for:
  project:
    - match:
        name: '(prj-dev|prj-test|prj-prod)'
      allow: [read]
  storage:
    - allow: [read]
      match:
        path: keys/project/(prj-dev|prj-test|prj-prod)(/.*)?
by:
  group: grp-multiproject-exec
---
description: Project - Execute access to jobs in multiple projects
context:
  project: '(prj-dev|prj-test|prj-prod)'
for:
  job:
    - allow: [read, view, view_history, run]
  node:
    - allow: [read, run]
  resource:
    - equals:
        kind: event
      allow: [read]
    - equals:
        kind: node
      allow: [read]
by:
  group: grp-multiproject-exec
```

## Advanced: Different Permissions Per Project

If you need different permissions for different projects (e.g., read-only in production but full access in development), create separate policies for each project instead of using a single regex pattern.

**Example:**
```yaml
# Full access to development
description: Application - Dev project access
context:
  application: 'rundeck'
for:
  project:
    - equals:
        name: prj-dev
      allow: [read]
by:
  group: grp-dev-team
---
description: Project - Full job management in dev
context:
  project: prj-dev
for:
  resource:
    - equals:
        kind: job
      allow: [create, delete]
  job:
    - allow: [read, view, update, run, kill]
  node:
    - allow: [read, run]
by:
  group: grp-dev-team
---
# Read-only access to production
description: Application - Prod project read access
context:
  application: 'rundeck'
for:
  project:
    - equals:
        name: prj-prod
      allow: [read]
by:
  group: grp-dev-team
---
description: Project - Read-only in production
context:
  project: prj-prod
for:
  job:
    - allow: [read, view, view_history]
  node:
    - allow: [read]
  resource:
    - equals:
        kind: event
      allow: [read]
by:
  group: grp-dev-team
```

