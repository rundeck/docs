---
title: 'Group/Project Full Access'
order: 200
---

# Group/Project Full Access

## Use Case Description

Assign a specified User Group full access to a single project and the related project Key Storage entries.

## Code Description
Find and replace these values with your own.
- Project Unique ID: `prj-sandbox`
- Group: `grp-sandbox-full`

Steps to implement are covered in the [overivew page](index.md).

## ACL Code
``` yaml
by:
  group: grp-sandbox-full
description: Allow grp-sandbox-full full access for project prj-sandbox.
for:
  project:
  - allow:
    - '*'
    equals:
      name: prj-sandbox
context:
  application: rundeck
---
by:
  group: grp-sandbox-full
description: Allows grp-sandbox-full group full access to run AdHoc commands within the prj-sandbox project.
for:
  adhoc:
  - allow:
    - '*'
context:
  project: prj-sandbox
---
by:
  group: grp-sandbox-full
description: Allows grp-sandbox-full group full access to Jobs within the prj-sandbox project.
for:
  job:
  - allow:
    - '*'
context:
  project: prj-sandbox

---
by:
  group: grp-sandbox-full
description: Allows grp-sandbox-full group full access to Jobs within the prj-sandbox project.
for:
  resource:
  - allow:
    - '*'
    equals:
      kind: job
context:
  project: prj-sandbox

---
#Note: Be sure to update the path statement with the proper project ID along with the context/project entry.
by:
  group: grp-sandbox-full
description: Allows grp-sandbox-full group full access to all keys the Project specific Key Storage section.
for:
  storage:
  - allow:
    - '*'
    equals:
      path: keys/project/prj-sandbox
      name: .*
context:
  project: prj-sandbox

---
by:
  group: grp-sandbox-full
description: Allows grp-sandbox-full group full access to all Nodes within the prj-sandbox project.
for:
  node:
  - allow:
    - '*'
context:
  project: prj-sandbox

---
by:
  group: grp-sandbox-full
description: Allows grp-sandbox-full group full access to all Nodes within the prj-sandbox project.
for:
  resource:
  - allow:
    - '*'
    equals:
      kind: node
context:
  project: prj-sandbox

---
by:
  group: grp-sandbox-full
description: Allows grp-sandbox-full group full access to manage Activity entries within the prj-sandbox project.
for:
  resource:
  - allow:
    - '*'
    equals:
      kind: event
context:
  project: prj-sandbox

---
by:
  group: grp-sandbox-full
description: Allows grp-sandbox-full group full access to manage Webhook entries within the prj-sandbox project.
for:
  resource:
  - allow:
    - '*'
    equals:
      kind: webhook
context:
  project: prj-sandbox

```