---
title: "ACL Recipes Overview"
order: 100
---

# ACL Recipes Overview

Access Control Lists (ACLs) are incredibly powerful.  The engine is very flexible for many different use cases.  This HowTo section is dedicated to helping share ACL use cases to jump start providing proper access to users.  If you are just getting started with ACLs it is recommended to **[read this article](/learning/howto/acl_basic_examples.md) first** to get an understanding of the ACL system.

Below there are instructions how to use the ACL recipes shared in this section.  If you have requests for a specific recipe please feel free to [submit a request on our Forums](https://community.pagerduty.com/forum/c/runbook-automation-process-automation).

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
5. Click on the **Editor** tab and paste the example policy into the edtior.
6. Click Save and test thoroughly.

@tab Community

To use the examples in this section in your Runbook Automation solution follow these steps:

1. Open the System Menu (gear icon) and choose **Access Control**.
2. Click on **Create ACL Policy**
3. Give the policy a unique name.  (The name can only contain the following characters `a-zA-Z0-9,.+_-` so no spaces or wildly special characters)
4. Find/Replace the values as specified on each use case page in your favorite text editor.
5. Paste the example policy into the edtior.
6. Click Save and test thoroughly.

:::
