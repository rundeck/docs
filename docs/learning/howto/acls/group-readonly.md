---
title: "Group/Project Read-Only Access"
order: 250
---

# Group/Project Read-Only Access

## Use Case Description

Assign a specific Rundeck Group read-only access to a project. Users can view jobs, nodes, and execution history but cannot execute or modify anything. This is ideal for auditors, managers, or stakeholders who need visibility without operational access.

## What This User CAN Do
- View the project in their project list
- View all jobs and their definitions
- View job execution history
- View all nodes in the project
- View execution logs and output
- View project activity log

## What This User CANNOT Do
- Run any jobs
- Execute ad-hoc commands
- Create, modify, or delete jobs
- Create, update, or delete nodes
- Configure project settings
- Manage project ACLs
- Access key storage
- Manage webhooks
- Stop running executions

## Code Description
Find and replace these values with your own.
- Project Unique ID: `prj-sandbox`
- Group: `grp-sandbox-readonly`

Steps to implement are covered in the [overview page](index.md).

## ACL Code

``` yaml
description: Application - Read access to project
context:
  application: 'rundeck'
for:
  project:
    - equals:
        name: prj-sandbox
      allow: [read]
by:
  group: grp-sandbox-readonly
---
description: Project - Read-only access to jobs, nodes, and events
context:
  project: prj-sandbox
for:
  job:
    - allow: [read, view, view_history]
  node:
    - allow: [read]
  resource:
    - equals:
        kind: event
      allow: [read]
    - equals:
        kind: node
      allow: [read]
by:
  group: grp-sandbox-readonly
```

