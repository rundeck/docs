---
title: "Group/API Key Create User API Key"
order: 600
---

# Group/API Key Create User API Key

## Use Case Description
Users who don't have admin access may not have the ability to create API tokens.  To create tokens for yourself, add this snippet to your ACL policies for and appropriate group.
Assign members of a specific Rundeck Group access to create API keys associated with their username.

## What This User CAN Do
- Generate API tokens for themselves (User Tokens)
- Create tokens with their own username and authorization roles

## What This User CANNOT Do
- Generate Service Tokens with different usernames
- Generate tokens with elevated permissions beyond their own roles
- View or manage other users' API tokens
- Access admin-level API token management

**Note**: This policy should be combined with appropriate project and resource access policies. This alone only grants the ability to create tokens, not access to any projects or resources.

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