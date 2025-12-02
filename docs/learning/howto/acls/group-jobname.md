---
title: "Group/Project/JobName Execute Only"
order: 500
---

# Group/Project/JobName Execute Only

## Use Case Description

Assign a specific Rundeck Group access to run a single, named Job in a specified project.  It will allow running that job against all nodes in the project.

## What This User CAN Do
- View the specified job
- Run the specified job
- View execution history for the specified job
- View all nodes in the project
- Run the job on all nodes
- Read project-specific key storage entries

## What This User CANNOT Do
- View or run any other jobs in the project
- Create, modify, or delete any jobs
- Run ad-hoc commands
- Create, update, or delete nodes
- Configure project settings
- Manage project ACLs
- Create or modify key storage entries
- Manage webhooks

## Code Description
Find and replace these values with your own.
- Project Unique ID: `prj-sandbox`
- Group: `grp-sandbox-exec`
- Job Name: `jname-sandbox`

Steps to implement are covered in the [overview page](index.md).

## ACL Code

``` yaml
description: in project context, ensure access to run single named with any node
context:
  project: prj-sandbox
for:
  resource:
    - allow: [run,read]
    - equals:
        kind: event
      allow: [read]
  job:
    - equals:
        name: jname-sandbox
      allow: [run,read,view,view_history]
  node:
    - allow: [read,run]
by:
  group: grp-sandbox-exec
---
description: in application context, provide read access to project
context:
  application: 'rundeck'
for:
  project:
    - match:
        name: prj-sandbox
      allow: [read]
  storage:
     - allow: [read]
by:
  group: grp-sandbox-exec
---
description: Allow [read] for key storage access at the project level.
context:
  application: rundeck
for:
  storage:
  - allow:
      - read
    match:
      path: keys/project/prj-sandbox(/.*)?
by:
  group: grp-sandbox-exec
```