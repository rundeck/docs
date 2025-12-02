---
title: "ACL Recipes Overview"
order: 100
---

# ACL Recipes Overview

Access Control Lists (ACLs) are incredibly powerful.  The engine is very flexible for many different use cases.  This HowTo section is dedicated to helping share ACL use cases to jump start providing proper access to users.  If you are just getting started with ACLs it is recommended to **[read this article](/learning/howto/acl_basic_examples.md) first** to get an understanding of the ACL system.

Below there are instructions how to use the ACL recipes shared in this section.  If you have requests for a specific recipe please feel free to [submit a request on our Forums](https://community.pagerduty.com/forum/c/runbook-automation-process-automation).

### Before You Start: Understanding Key Concepts

Before using these recipes, it's important to understand some key ACL concepts that often cause confusion:

**Two-Context Requirement**: Most recipes include BOTH Application and Project context rules. This is required because:
- **Application context** = Access TO the project (makes it appear in project list)
- **Project context** = Actions WITHIN the project (run jobs, view nodes, etc.)

Without Application context `read` permission on a project, users won't even see it in their project list, and Project context rules won't apply.

**Generic vs Specific Resources**: You'll see two patterns in these recipes:
- `resource: kind: job` = Generic (for CREATE/DELETE permissions on resource types)
- `job:` = Specific (for actions on individual jobs like RUN/UPDATE/VIEW)

Both are often needed. For example, to delete a job requires BOTH generic `resource: kind: job allow: [delete]` AND specific `job: allow: [delete]`.

**Storage is Always Application Context**: Key Storage (`storage:`) rules must always be in Application context, never Project context. This is a common mistake.

**For Detailed Explanation**: See the [Authorization documentation](/administration/security/authorization.md#understanding-acl-concepts) for a complete guide to ACL concepts, common patterns, and troubleshooting.

### Conventions

Some conventions we have adopted in the examples to make reading them and finding/replacing a bit easier.  It is not required to use these same conventions in your environment.

- Project unique names are prefixed with `prj-`
- User Group names are prefixed with `grp-`

> Note: The examples are built to teach and help users become familiar with the possiblities of ACLs. Due to the power of the ACL engine, it may be possible that some of the solutions here can be implemented in different and more efficient ways.  [Feedback is welcome in our Forums](https://community.pagerduty.com/forum/c/runbook-automation-process-automation).
 
::: tabs
@tab Enterprise

To use the examples in this section in your Runbook Automation solution follow these steps:

1. Open the System Menu (gear icon) and choose **Access Control**.
2. Click on **Create ACL Policy**
3. Give the policy a unique name.  (The name can only contain the following characters `a-zA-Z0-9,.+_-` so no spaces or wildly special characters)
4. Find/Replace the values as specified on each use case page in your favorite text editor.
5. Click on the **Editor** tab and paste the example policy into the editor.
6. Click Save and test thoroughly.

@tab Community

To use the examples in this section in your Runbook Automation solution follow these steps:

1. Open the System Menu (gear icon) and choose **Access Control**.
2. Click on **Create ACL Policy**
3. Give the policy a unique name.  (The name can only contain the following characters `a-zA-Z0-9,.+_-` so no spaces or wildly special characters)
4. Find/Replace the values as specified on each use case page in your favorite text editor.
5. Paste the example policy into the editor.
6. Click Save and test thoroughly.

:::
