---
title: 'Group/Project Full Access'
order: 200
---

# Group/Project Full Access

## Use Case Description

Rundeck Admin would like to assign a specific Rundeck Group full access to a single project and it's related Key Storage entries.

## Code Description
Find and replace these values with your own.
- Project Unique ID: `Sandbox`
- Group: `sandbox-full`


## ACL Code
``` yaml
# Let's add comments to each entry to help the learning process.
by:
  group: sandbox-full
description: Allow [export, delete_execution, configure, read] for project
for:
  project:
  - allow:
    - read
    - delete_execution
    - configure
    - export
    equals:
      name: Sandbox
context:
  application: rundeck
---
# Allows sandbox-full group full access to run AdHoc commands within the Sandbox project.
by:
  group: sandbox-full
description: Commands
for:
  adhoc:
  - allow:
    - '*'
context:
  project: Sandbox
---
# Describe
by:
  group: sandbox-full
description: Jobs
for:
  job:
  - allow:
    - '*'
context:
  project: Sandbox

---
# Describe
by:
  group: sandbox-full
description: Allow [*] for storage
for:
  storage:
  - allow:
    - '*'
    equals:
      path: keys/project/Sandbox
      name: .*
context:
  project: Sandbox

---
# Describe
by:
  group: sandbox-full
description: Nodes
for:
  node:
  - allow:
    - '*'
context:
  project: Sandbox

---
# Describe
by:
  group: sandbox-full
description: Nodes (All)
for:
  resource:
  - allow:
    - '*'
    equals:
      kind: node
context:
  project: Sandbox

---
# Describe
by:
  group: sandbox-full
description: Jobs (All)
for:
  resource:
  - allow:
    - '*'
    equals:
      kind: job
context:
  project: Sandbox

---
# Describe
by:
  group: sandbox-full
description: Events
for:
  resource:
  - allow:
    - '*'
    equals:
      kind: event
context:
  project: Sandbox

---
# Describe
by:
  group: sandbox-full
description: Webhooks
for:
  resource:
  - allow:
    - '*'
    equals:
      kind: webhook
context:
  project: Sandbox

```