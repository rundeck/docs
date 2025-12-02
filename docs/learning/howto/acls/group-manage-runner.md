---
title: "Group/Runners Manage and Create Runners"
order: 400
---

# Group/Runners Manage and Create Runners

## Use Case Description

Assign a specific Rundeck Group access to manage and create Runners.  Valid for Runbook Automation commercial products only.

## What This User CAN Do
- View Runner configuration and status
- Create new Runner entries
- Ping Runners to check their status
- Full management of all Runner resources

## What This User CANNOT Do
- Update existing Runner entries (not included in current policy)
- Delete Runner entries (not included in current policy)
- Regenerate Runner credentials (not included in current policy)
- Access project-level resources (requires separate project access policies)

**Note**: To grant full Runner management capabilities including update, delete, and credential regeneration, add those actions to the `allow` list in the policy.

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
  - allow:
    - '*'
    equals:
      kind: runner
by:
  group: grp-runner-manage
```