---
title: "Group/Project/JobName Execute Only"
order: 500
---

# Group/Project/JobName Execute Only

## Use Case Description

Assign a specific Rundeck Group access to run a single, named Job in a specified project.  It will allow running that job against all nodes in the project.

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
  ---
description: Allow [read] for key storage access at the project level.  If accessing keys outside the project context, you'll need a comparable system-level rule.
context:
  project: prj-sandbox
for:
  storage:
  - allow: [read]
by:
  group: grp-sandbox-exec
```