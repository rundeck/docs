---
title: Password Exposure in Runner Logs
order: 70
---

## Security Advisory: Password Masking Failure Exposing Secrets in Enterprise Runner Log Output

A security vulnerability has been identified in the Enterprise Runner component (not affecting Open Source Rundeck or the Process Automation server itself) where certain password patterns containing regex special characters _(such as multiple '+' characters)_ can bypass the password masking mechanism, resulting in the exposure of sensitive information in error logs.

### Description

The Enterprise Runner's password masking functionality is bypassed when processing passwords or secrets containing invalid regex sequences (particularly patterns like `"+++"`). When this occurs, the error handling mechanism may expose sensitive information in the log output, including:

* Job Option secrets (Password type inputs)
* Key storage values (such as SSH keys)
* Environment variables containing sensitive information (matching patterns like "token", "key", "pass", "password", "secret" - case insensitive)

This vulnerability is triggered when a secret value contains specific regex special characters, particularly sequences like "+++" which may commonly appear in base64-encoded content such as PGP ASCII-armored keys.

### Impact

* **Affected Versions**:
    * Enterprise Runner versions used with Process Automation 4.14.0 through 5.12.0
    * Note: This issue does not affect Open Source Rundeck or the Process Automation server itself
* **Scope**:
    * Process Automation SaaS customers using Enterprise Runners
    * Process Automation Self-Hosted customers using Enterprise Runners
* **Exposure**: The vulnerability only exposes secrets that are:
    * Sent to the Enterprise Runner for specific step execution
    * Present in Enterprise Runner environment variables

**Note:** This bug does NOT expose all secrets stored in the Process Automation server or Runner, only those used in the running job and only in cases where the trigger condition, described previously, is present.

### Patches

The vulnerability has been remedied in Process Automation version 5.13.0. To fully resolve this issue:

1. Upgrade Process Automation server to version 5.13.0 or later. 
    1. This step is only for Self Hosted Customers.  Runbook Automation SaaS portals are already updated to the latest version.
    2. Updating the server ensures that the messages that may contain a password are not shown in the GUI.
    3. This is also a pre-requisite to Step 2 as the server will then provide the updated Runner software.
2. Ensure all Enterprise Runners are upgraded to version 5.13.0 or later.
    4. This remediates the issue at the Runner from happening and ensures those steps successfully complete.

### Workarounds

Currently, there are no complete workarounds available. The server-side "Mask Passwords" log filter does not fully prevent the exposure of secrets in these error logs.

### Interim Security Measures

Until both upgrade steps are completed:

1. Review your Enterprise Runner error logs for any potential exposure of sensitive information.
2. Monitor job executions that involve sensitive data, particularly those using SSH keys or base64-encoded secrets.
3. If possible, temporarily avoid using secrets containing multiple '+' characters or similar special characters.

### For More Information

If you have any questions or comments about this advisory:

* Enterprise Customers can open a[ Support ticket](https://support.rundeck.com)
* Open Source versions of the product are not affected by this issue.


### FAQ (for docs web page)

_What if I can’t update my Runners immediately?_

  Fixes were provided in both the Server and Runner code bases.  To help mitigate exposure at the Server Side any runner that emits the error message will have that message blocked by the Server.

_How can I know if the error has happened in my environment previously?_

  Searching logs for the following will highlight any potential exposure.

  * Searching for log messages containing both these strings: 
      * `Sidecar StackTrace: java.util.regex.PatternSyntaxException`
      * and `RunnerMaskPasswordPlugin.generateRegEx`
  * You can also simply search for `RunnerMaskPasswordPlugin.generateRegEx` but be aware of an earlier bug that may emit an error message with that text as well. This bug was fixed in 5.9.0, so any runners older than 5.9.0 would not have the message

_How can I monitor or check for older versions of the Runner?_

A Runbook Automation administrator can login and navigate to the Runner Management panel.  Any version older than `5.13-RBA-20250617` (SaaS) / `5.13.0-20250625` (Self-Hosted) should be updated.  Use the Actions dropdown and click “Download Runner” and follow the prompts to Regenerate Credentials and download a new Runner instance.
