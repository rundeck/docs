---
title: "Group/Project/Job Group Execute Only"
order: 400
---

# Group/Project/Job Group Execute Only

## Use Case Description

Assign a specific Rundeck Group access to only run jobs in a specific Job Group (folder), in a single project.  It will allow running jobs against all nodes in the project.

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
  job:
    - equals:
        group: jgrp-sandbox
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