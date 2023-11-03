---
title: "Group/Project Job Execute Only"
order: 800
---

# Group/Project Job Execute Only

## Use Case Description

Rundeck Admin would like to assign a specific Rundeck Group access to only run jobs in a single project.  It should allow running jobs with Key Storage entries and against all nodes in the project.

## Code Description
Find and replace these values with your own.
- Project Unique ID: `Sandbox`
- Group: `sandbox-exec`


## ACL Code

``` yaml
# Description
by:
  group: sandbox-exec
description: Release Ops Project Access
for:
  project:
  - allow:
    - read
    equals:
      name: devops
context:
  application: rundeck
---
#Description 
by:
  group: sandbox-exec
description: Jobs - Run Only
for:
  job:
  - allow:
    - view
    - view_history
    - read
    - run
context:
  project: devops
---
#Description
by:
  group: sandbox-exec
description: All Nodes
for:
  resource:
  - allow:
    - read
    - refresh
    equals:
      kind: node
context:
  project: devops
---
#Description
by:
  group: sandbox-exec
description: Allow [read, run] for node
for:
  node:
  - allow:
    - read
    - run
context:
  project: devops
---
#Description
by:
  group: sandbox-exec
description: Allow [read] for keys/GitHub storage
for:
  storage:
  - allow:
    - read
    match:
      path: keys/GitHub(/.*)?
context:
  application: rundeck
---
#Description
by:
  group: sandbox-exec
description: Allow [read] for keys folder in storage
for:
  storage:
  - allow:
    - read
    equals:
      path: keys
context:
  application: rundeck

---
#Description
by:
  group: sandbox-exec
description: Allow [read] for (All) event
for:
  resource:
  - allow:
    - read
    equals:
      kind: event
context:
  project: devops
```