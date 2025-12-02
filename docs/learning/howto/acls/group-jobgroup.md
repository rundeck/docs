---
title: "Group/Project/Job Group Execute Only"
order: 400
---

# Group/Project/Job Group Execute Only

## Use Case Description

Assign a specific Rundeck Group access to only run jobs in a specific Job Group (folder), in a specified project.  It will allow running jobs against all nodes in the project.

## What This User CAN Do
- View jobs in the specified job group (folder)
- Run jobs in the specified job group
- View execution history for jobs in the group
- View all nodes in the project
- Run jobs on all nodes
- Read project-specific key storage entries

## What This User CANNOT Do
- View or run jobs outside the specified job group
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
- Job Group: `jgrp-sandbox`

Steps to implement are covered in the [overview page](index.md).

## ACL Code

``` yaml
description: in project context, ensure access to run jobs in a job group with any node
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
        group: jgrp-sandbox
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