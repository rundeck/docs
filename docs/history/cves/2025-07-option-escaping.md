---
title: Command Injection via Job Options
order: 44
---

## **Security Advisory: Command Injection in Job Options Due to Incomplete Escaping**

A security vulnerability has been identified in Rundeck where certain shell control characters in user supplied values for job options are not properly escaped, potentially allowing for command injection. Exploitation requires valid credentials with privilege to run a job that has options with a vulnerable configuration where input restrictions (validation) are either not configured, or are overly permissive.

Rundeck provides multiple ways to control the risk of command injection in job options, including allow-lists, validation with regular expressions, and escaping known shell control characters. The backtick character (`) is missing from the list of known shell control characters for *nix operating systems, and escaping for Windows operating systems is not implemented. We recommend making use of input restrictions (validation) as a preferred option whenever possible.

A fix for the backtick escaping issue will be included in a future Rundeck release.

## **Description**

Rundeck's job option escaping mechanism fails to properly escape backtick characters (`) in quoted job options. This allows command injection/substitution attacks when job options are used directly in command execution without sufficient input validation. The vulnerability can be exploited in certain scenarios:

* **Single Parameter Jobs**: Command injection using backticks when the parameter doesn't contain whitespace
* **Multi-Parameter Jobs**: Payload splitting across parameters to bypass whitespace restrictions 
* **Script-based Jobs**: Command injection in bash scripts using `@option.option1@` syntax with `$(command)` or backtick substitution
* **Windows Environments**: No specific escaping implemented for Windows, allowing potential command injection in batch scripts and environment variable-based whitespace bypasses

The vulnerability may be exploited when jobs are configured without input validation mechanisms such as regex patterns or allowed value lists, or if the regex patterns are overly permissive.


## **Impact**

**Affected Versions:**

* [Currently supported Rundeck versions](/history/release-calendar.md) through 5.13.0
* Unsupported versions from 3.3.0 forward
* Versions prior to 3.3.0 have not been evaluated and may be affected

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

A fix for the escaping issues is being developed and will be included in a future Rundeck release.

**Immediate Mitigation Steps:**

1. **Review Job Configurations**: Audit existing jobs that use job options in command or script execution
2. **Implement Input Validation**: Add regex validation patterns to job options to restrict allowed characters
3. **Use Structured Inputs**: Configure job options with predefined allowed values where possible
4. **Apply Least Privilege**: Ensure Rundeck service accounts have minimal necessary permissions

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

While Rundeck is indeed a command execution platform, the failure to properly escape backticks in quoted job options represents a deviation from expected security behavior. The "quoted" option type is specifically designed to provide escaping, and users should be able to rely on this protection.

**What's the difference between this and the "unquoted" job option feature?**

The unquoted job option feature is intentionally designed to allow command injection and is clearly documented with security warnings. The vulnerability affects the "quoted" job option type, which is expected to provide protection against injection attacks.

:::warning
Note: The "unquoted" job option feature should **only be used when absolutely necessary** and [with full awareness of security implications](/manual/jobs/job-options.html#using-non-escaped-values).

:::

**How can I identify vulnerable job configurations in my environment?**

Look for jobs that:

* Use job options in command execution (`${option.optionname}`)
* Use job options in script templates (`@option.optionname@`)
* Lack regex validation patterns on job options
* Don't use structured input types (allowed values, etc.)

**What permissions are needed to exploit this vulnerability?**

An attacker needs:

* Valid authentication to Rundeck (user account or API token)
* Permission to execute jobs that contain vulnerable option configurations
* The vulnerable jobs must already exist in the system

**How can I monitor for potential exploitation attempts?**

Monitor Rundeck logs for:

* Job executions with unusual option values containing backticks or command substitution syntax
* Failed job executions that might indicate injection attempts
* Unexpected command outputs or system behavior following job executions