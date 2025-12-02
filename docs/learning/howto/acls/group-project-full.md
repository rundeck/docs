---
title: 'Group/Project Full Access'
order: 200
---

# Group/Project Full Access

## Use Case Description

Assign a specified User Group full access to a single project and the related project Key Storage entries.

## What This User CAN Do
- Create, read, update, delete, and run all jobs in the project
- Run ad-hoc commands on all nodes
- View, add, update, and delete nodes
- Configure project settings
- Manage project-specific ACL policies
- Access and manage project-specific key storage entries
- View and manage execution history
- Manage webhooks
- Toggle job schedules and execution status

## What This User CANNOT Do
- Create new projects (requires system-level admin)
- Delete the project (requires additional system-level permissions)
- Access other projects (unless granted separately)
- Manage system-level ACLs
- Manage system-level key storage outside the project path
- Manage users or groups

## Code Description
Find and replace these values with your own.
- Project Unique ID: `prj-sandbox`
- Group: `grp-sandbox-full`

Steps to implement are covered in the [overview page](index.md).

## ACL Code
``` yaml
by:
  group: grp-sandbox-full
description: Allow grp-sandbox-full full access for project prj-sandbox.
for:
  project:
  - allow:
    - read
    - configure
    - delete
    - import
    - export
    - scm_import
    - scm_export
    - delete_execution
    - admin
    equals:
      name: prj-sandbox
  project_acl:
  - allow:
    - read
    - create
    - update
    - delete
    - admin
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
    - read
    - run
    - runAs
    - kill
    - killAs
context:
  project: prj-sandbox
---
by:
  group: grp-sandbox-full
description: Allows grp-sandbox-full group full access to Jobs within the prj-sandbox project.
for:
  job:
  - allow:
    - create
    - read
    - update
    - delete
    - run
    - runAs
    - kill
    - killAs
    - view
    - view_history
    - toggle_schedule
    - toggle_execution
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
#Note: Be sure to update the path statement with the proper project ID.
by:
  group: grp-sandbox-full
description: Allows grp-sandbox-full group full access to all keys the Project specific Key Storage section.
for:
  storage:
  - allow:
    - '*'
    match:
      path: keys/project/prj-sandbox(/.*)?
context:
  application: rundeck

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
