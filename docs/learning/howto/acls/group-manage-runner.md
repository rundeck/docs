---
title: "Group/Runners Manage and Create Runners"
order: 400
---

# Group/Runners Manage and Create Runners

## Use Case Description

Assign a specific Rundeck Group access to manage and create Runners.  Valid for Process Automation and Runbook Automation only

## Code Description
Find and replace these values with your own.
- Group: `grp-runner-manage`

Steps to implement are covered in the [overview page](index.md).

## ACL Code

``` yaml
description: Provide access to create Runners
context:
  application: rundeck
for:
  runner:
  - allow: [read,ping,create]
by:
  group: grp-runner-manage
---
description: Allow [admin, read] for Runners as a resource
context:
  application: rundeck
for:
  resource:
  - allow: [admin,read]
    equals:
      kind: runner
by:
  group: grp-runner-manage
```