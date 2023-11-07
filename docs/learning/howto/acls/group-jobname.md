---
title: "Group/Project/JobName Execute Only"
order: 500
---

# Group/Project/JobName Execute Only

## Use Case Description

Assign a specific Rundeck Group access to run a single named job in a single project.  It will allow running that job against all nodes in the project.

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
  job:
    - equals:
        name: jname-sandbox
      allow: [run,read]
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
```