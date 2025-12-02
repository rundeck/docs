---
title: "Group/Project Execute Only"
order: 300
---

# Group/Project Job Execute Only

## Use Case Description

Assign a specific Rundeck Group access to only run all jobs in a specified project.  This policy also allows read access to the project Key Storage entries and against all nodes in the project.

## What This User CAN Do
- View all jobs in the project
- Run all jobs in the project
- View execution history for jobs they run
- View all nodes in the project
- Run jobs on all nodes
- Refresh node sources
- Read project-specific key storage entries

## What This User CANNOT Do
- Create, modify, or delete jobs
- Run ad-hoc commands
- Create, update, or delete nodes
- Configure project settings
- Manage project ACLs
- Create or modify key storage entries
- Manage webhooks
- Delete executions
- Toggle job schedules or execution status

## Code Description
Find and replace these values with your own.
- Project Unique ID: `prj-sandbox`
- Group: `grp-sandbox-exec`

Steps to implement are covered in the [overview page](index.md).

## ACL Code

``` yaml
by:
  group: grp-sandbox-exec
description: Allows grp-sandbox-exec the ability to read the prj-sandbox project.
for:
  project:
  - allow:
    - read
    equals:
      name: prj-sandbox
context:
  application: rundeck
---
by:
  group: grp-sandbox-exec
description: Allows grp-sandbox-exec the ability to view/read/run Jobs in the prj-sandbox project.
for:
  job:
  - allow:
    - view
    - view_history
    - read
    - run
context:
  project: prj-sandbox
---
#This entry allows the group permissions to read the nodes in the project.
by:
  group: grp-sandbox-exec
description: Allows grp-sandbox-exec the ability to read and refresh Nodes in the prj-sandbox project.
for:
  resource:
  - allow:
    - read
    - refresh
    equals:
      kind: node
context:
  project: prj-sandbox
---
# Combined with the entry above, this entry allows the group access do specific actions on the nodes returned from the list in the entry above.
by:
  group: grp-sandbox-exec
description: Allows grp-sandbox-exec the ability to read details from and run jobs against Nodes available in the prj-sandbox project.
for:
  node:
  - allow:
    - read
    - run
context:
  project: prj-sandbox
---
by:
  group: grp-sandbox-exec
description: Allows grp-sandbox-exec the ability to read Project Key Storage entries in the prj-sandbox folder and any subfolders.
for:
  storage:
  - allow:
    - read
    match:
      path: keys/project/prj-sandbox(/.*)?
context:
  application: rundeck
---
by:
  group: grp-sandbox-exec
description: Allows grp-sandbox-exec the ability to read the prj-sandbox Activity Log.
for:
  resource:
  - allow:
    - read
    equals:
      kind: event
context:
  project: prj-sandbox
```