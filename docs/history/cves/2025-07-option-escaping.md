---
title: Command Injection via Job Options
order: 44
---

## **Security Advisory: Command Injection in Job Options Due to Incomplete Escaping**

A security vulnerability has been identified in Rundeck where shell control characters in user supplied values for job options are not properly escaped when used with `${option.name}` syntax in exec commands, potentially allowing for command injection. Exploitation requires valid credentials with privilege to run a job that has options with a vulnerable configuration where input restrictions (validation) are either not configured, or are overly permissive.

Rundeck provides multiple ways to control the risk of command injection in job options, including allow-lists, validation with regular expressions, and escaping known shell control characters. However, the quoting logic was checking for property references AFTER variable replacement, which meant shell control characters (including backticks, pipes, command substitution, and others) were not being escaped even when they should have been.

This vulnerability has been fixed in Rundeck 5.20.0.

## **Description**

Rundeck's job option escaping mechanism failed to properly escape shell control characters when job options were used with `${option.name}` syntax in exec commands. The root cause was that the quoting decision was made AFTER variable replacement, which meant the code checked if the replaced string contained `${...}` (which it didn't, since it was already replaced). This caused the quoting logic to be skipped entirely, allowing shell control characters to be interpreted by the shell.

**Vulnerable Characters:**

All shell control characters were exploitable:
- `|` (pipe)
- `&&` `||` (logical operators)
- `$()` (command substitution)
- `;` (command separator)
- `>` `>>` `<` (redirection)
- `` ` `` (backticks)
- `&` (background)
- `*` (wildcards)
- `{` `}` (brace expansion)

**Exploitation Scenarios:**

* **Exec Commands**: Command injection using any shell control character in option values with `${option.name}` syntax
* **Script-based Jobs**: Command injection in bash scripts using `@option.option1@` syntax with `$(command)` or backtick substitution
* **Windows Environments**: No specific escaping implemented for Windows, allowing potential command injection in batch scripts

The vulnerability could be exploited when jobs were configured without input validation mechanisms such as regex patterns or allowed value lists, or if the regex patterns were overly permissive.

## **Technical Details**

**Root Cause:**

The vulnerability was introduced in Rundeck v3.4.1 when quoting logic was changed. The critical flaw was that the quoting decision was made AFTER variable replacement:

1. Command is tokenized: `["echo", "Scanning port: ${option.port}"]`
2. Variables are replaced: `["echo", "Scanning port: 80 | whoami"]`
3. Code checks if replaced string contains `${...}` → NO (because it's already replaced)
4. `shouldQuote = false` → No quoting applied
5. Shell interprets `| whoami` as a pipe command → **Command injection successful**

**The Correct Fix (v5.20.0):**

Track which arguments contain property references BEFORE replacement, then use those flags AFTER replacement:

1. Command is tokenized: `["echo", "Scanning port: ${option.port}"]`
2. **Track property references**: `[false, true]` (second argument contains `${...}`)
3. Variables are replaced: `["echo", "Scanning port: 80 | whoami"]`
4. Use tracked flag: `shouldQuote = true` (because original had `${...}`)
5. Quoting applied: `echo 'Scanning port: 80 | whoami'` → **Shell treats as literal string**

**Example Attack:**

Before the fix, an authenticated user could execute arbitrary commands:

```bash
# Job definition
exec: echo "Scanning port: ${option.port}"

# Attacker provides option value
port: 80 | whoami

# Executed command (vulnerable)
echo Scanning port: 80 | whoami
# Result: "Scanning port: 80" echoed, then whoami executed

# After fix (v5.20.0)
echo 'Scanning port: 80 | whoami'
# Result: Entire string "Scanning port: 80 | whoami" echoed literally
```

## **Impact**

**Affected Versions:**

* Rundeck versions 3.4.1 through 5.19.0
* The vulnerability was introduced in v3.4.1 when quoting logic was changed
* Fixed in version 5.20.0

**Scope:**

* Rundeck Open Source and Runbook Automation Commercial versions
* Both Linux and Windows node environments
* Jobs using quoted job options without sufficient input validation
* Those input variables are used in a [Command](/manual/jobs/job-plugins/node-steps/builtin.md#command-step) or [Script step](/manual/jobs/job-plugins/node-steps/builtin.md#script-step)

**Exposure:** The vulnerability allows authenticated users with job execution permissions on a job using [Command](/manual/jobs/job-plugins/node-steps/builtin.md#command-step) or [Script](/manual/jobs/job-plugins/node-steps/builtin.md#script-step) steps that do not perform sufficient input validation to Job Options to:

* Execute arbitrary commands on Rundeck nodes
* Potentially escalate privileges if the Rundeck service account has elevated permissions
* Move laterally within the network depending on the Rundeck deployment's access scope

**Note:** This vulnerability requires an authenticated user with API token access or job execution permissions. The impact is limited by the permissions of the Rundeck service account and the specific job configurations in use.

## **Patches**

This vulnerability has been fixed in **Rundeck 5.20.0** (released March 2026).

**The Fix:**

The fix correctly tracks which command arguments contain property references (`${option.name}`) BEFORE variable replacement, then uses those tracked flags to determine which arguments need shell escaping AFTER replacement. This ensures that shell control characters in option values are properly escaped.

**Feature Flag:**

A feature flag `rundeck.feature.exec.quoting.enabled` has been added for backwards compatibility. By default, quoting is **enabled** (secure by default). To disable quoting (not recommended - leaves system vulnerable):

```properties
# In framework.properties (NOT RECOMMENDED)
rundeck.feature.exec.quoting.enabled=false
```

**Breaking Change Risk:** Very low. Only affects jobs that intentionally use shell features in option values (e.g., wildcards, command substitution), which are security anti-patterns themselves.

**Upgrade Recommendation:**

Upgrade to Rundeck 5.20.0 or later immediately. After upgrading:

1. **Review Job Configurations**: Audit existing jobs that use job options in command or script execution
2. **Test Critical Jobs**: Verify jobs work as expected with the new escaping behavior
3. **Update Anti-patterns**: If any jobs intentionally used shell features in option values, move that logic to Script steps with proper input validation

## **Workarounds**

**Primary Workaround - Input Validation:** Configure job options with appropriate regex validation patterns to prevent injection:

**Alternative Approaches:**

* Use structured job option inputs (dropdown lists, checkboxes) instead of free-form text
* Implement server-side validation in job scripts before processing user input

## **Interim Security Measures**

Until patches are applied and job configurations are updated:

1. **Audit API Token Access**: Review who has API tokens and their associated permissions
2. **Review Job Option Usage**: Identify jobs that use options in command execution without validation

## **For More Information**

If you have any questions or comments about this advisory:

* **Enterprise Customers**: [Open a Support ticket](https://support.rundeck.com/)
* **Open Source Users**: Report issues via the [official Rundeck GitHub repository](https://github.com/rundeck/rundeck/issues/)
* **Documentation**: Review the [Job Options security documentation](/manual/jobs/job-options.html#using-non-escaped-values) for relevant features and guidance

## **FAQ**

**Is this really a vulnerability if Rundeck is designed for command execution?**

While Rundeck is indeed a command execution platform, the failure to properly escape shell control characters in job option values represents a security vulnerability. When users provide option values through the UI or API, they expect those values to be treated as data, not executable code. The vulnerability allowed authenticated users to break out of the intended command structure and execute arbitrary commands.

**What's the difference between this and the "unquoted" job option feature?**

The unquoted job option feature is intentionally designed to allow shell expansion and is clearly documented with security warnings. This vulnerability affected the default behavior where option values should be treated as literal data, not as shell commands.

:::warning
Note: The "unquoted" job option feature should **only be used when absolutely necessary** and [with full awareness of security implications](/manual/jobs/job-options.html#using-non-escaped-values).

:::

**How can I identify vulnerable job configurations in my environment?**

If you are running Rundeck versions 3.4.1 through 5.19.0, look for jobs that:

* Use job options in exec command execution (`${option.optionname}`)
* Use job options in script templates (`@option.optionname@`)
* Lack regex validation patterns on job options
* Don't use structured input types (allowed values, etc.)

These jobs are vulnerable to command injection. Upgrade to 5.20.0 or later to fix the vulnerability.

**What permissions are needed to exploit this vulnerability?**

An attacker needs:

* Valid authentication to Rundeck (user account or API token)
* Permission to execute jobs that contain vulnerable option configurations
* The vulnerable jobs must already exist in the system

**How can I monitor for potential exploitation attempts?**

If running vulnerable versions (3.4.1 through 5.19.0), monitor Rundeck logs for:

* Job executions with unusual option values containing shell control characters (pipes, backticks, command substitution syntax, etc.)
* Failed job executions that might indicate injection attempts
* Unexpected command outputs or system behavior following job executions

**What was the timeline for fixing this vulnerability?**

* **July 2025**: Vulnerability initially reported
* **March 5, 2026**: First fix attempt merged (PR #10003) - but did not actually fix the vulnerability due to checking for property references after replacement
* **March 11, 2026**: Correct fix merged (PR #10010) - properly tracks property references before replacement
* **March 2026**: Fixed version 5.20.0 released

The initial fix attempt failed because it checked whether the replaced string contained `${...}` patterns, but after replacement those patterns were already gone, so no quoting was applied. The correct fix tracks which arguments originally contained property references before replacement occurs.