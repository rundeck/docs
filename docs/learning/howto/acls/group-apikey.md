---
title: "Group/API Key Create User API Key"
order: 600
---

# Group/API Key Create User API Ke

## Use Case Description
Users who don't have admin access may not have the ability to create API tokens.  To create tokens for yourself, add this snippet to your ACL policies for and appropriate group.
Assign members of a specific Rundeck Group access to create API keys associated with their username.

## Code Description
Find and replace these values with your own.
- Group: `grp-api-access`

Steps to implement are covered in the [overview page](index.md).

## ACL Code

``` yaml
description: Provide access to create user API tokens
context:
  application: rundeck
for:
  resource:
  - allow:
    - generate_user_token
    equals:
      kind: apitoken
by:
  group: grp-api-access
```