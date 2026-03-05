---

title: "5.20.0 Release Notes"
date: 2026-03-XX
image: /images/chevron-logo-red-on-white.png
description: "Rundeck | Runbook Automation 5.20.0 release introduces Early Access Conditional Logic workflow steps, enabling dynamic workflow execution based on runtime conditions."
feed:
 enable: true
 description: "Rundeck | Runbook Automation 5.20.0 release introduces Early Access Conditional Logic workflow steps, enabling dynamic workflow execution based on runtime conditions."

---

# 5.20.0 Release Notes

## Overview

This release introduces **Conditional Logic** workflow steps as an Early Access feature, enabling dynamic workflow execution based on runtime conditions. Jobs can now make intelligent decisions during execution by evaluating job options, node attributes, and captured data, executing substeps only when conditions are met. This release also includes [FILL IN: other major features/fixes].

<VidStack src="youtube/[VIDEO_ID]" poster="https://img.youtube.com/vi/[VIDEO_ID]/maxresdefault.jpg"/>

## Runbook Automation Updates

##### ::circle-dot:: Conditional Logic Workflow Steps (Early Access)

Introduces a new workflow step type that enables dynamic conditional execution based on runtime conditions. Workflows can now branch and make decisions without requiring external scripts or complex logic, evaluating conditions against job options, node attributes, job context, and captured data.

**Key Capabilities:**
- **Two step types**: Node Conditional Logic (executes per-node) and Workflow Conditional Logic (executes once per job)
- **Flexible condition logic**: Combine up to 5 condition sets with AND/OR grouping, supporting operators like equals, not equals, contains, regex matching, and numeric comparisons
- **Context-aware evaluation**: Reference job options (`${option.environment}`), node attributes (`${node.osFamily}`), job context (`${job.project}`), and data captured via log filters
- **Nested substeps**: Add multiple substeps that execute only when conditions are met
- **Debug mode**: View detailed condition evaluation in execution logs to troubleshoot and verify logic

**Requirements:**
- Workflow strategy must be Sequential or Parallel (not compatible with Node First or Ruleset strategies)
- Requires JSON or YAML job definition format (XML not supported)
- Feature flag: `rundeck.feature.earlyAccessJobConditional.enabled=true`

**Limitations (Current Release):**
- No nested conditionals. To achieve multi-level conditional logic, use Job Reference steps to call other jobs that contain conditionals.
- Substeps must match parent type (node substeps for node conditionals, workflow substeps for workflow conditionals)
- Error handlers and log filters only supported on root-level steps, not on substeps within conditionals

**Example Use Cases:**
- Run Linux-specific commands only on Unix nodes: Field `${node.osFamily}` equals `unix`
- Execute production-specific steps: Field `${option.environment}` equals `production`
- Target nodes by hostname pattern: Field `${node.hostname}` matches `^web[0-9]+$`
- Filter execution by node tags: Field `${node.tags}` contains `database`

**Documentation:**
- [Conditional Logic Steps User Guide](/manual/jobs/conditional-logic.md)

**Related PRs:**
- [#4595](https://github.com/rundeckpro/rundeckpro/pull/4595) - Frontend UI for conditional logic steps
- [#4598](https://github.com/rundeckpro/rundeckpro/pull/4598) - Backend execution services for conditional workflow logic

---

[FILL IN: Additional release notes for other features/fixes]

---

## Rundeck Open Source Product Updates

[FILL IN: OSS updates for 5.20.0]

[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A5.20.0+is%3Aclosed)

## Links

- Download the Releases: [Open Source](https://www.rundeck.com/community-downloads/5.20.0) | [Self-Hosted](https://www.rundeck.com/enterprise-downloads/5.20.0)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/index.md)
- [Catch us on LinkedIn for the Live Stream Release Videos](https://www.linkedin.com/company/pagerduty/events)

## Version Info

Name: <span style="color: [COLOR]"><span class="glyphicon glyphicon-[ICON]"></span> "[NAME] [COLOR] [ICON]"</span>

Release Date: [DATE], 2026
