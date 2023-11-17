# 4.3.2 Release Notes

Name: <span style="color: violet"><span class="glyphicon glyphicon-leaf"></span> "Manticore violet leaf"</span>
Release Date: July 14, 2022

- [Download Rundeck](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/)

## Overview

This release supersedes version `4.3.1` due to issues found with the re-encryption of certain types of keys from a critical with versions `4.2.0` and `4.2.1` of both Rundeck Open Source and Process Automation OnPrem (formerly Rundeck Enterprise).

For more details about the issue please read our [CVE-2022-31044](/history/cves/cve-2022-31044.md) page.

Upon upgrading to this version any Key Storage entries that may have been written as plain text will be re-encrypted automatically.

> Note: 4.3.0 and 4.3.1 do not have the vulnerability, but does not include the patch to fully re-encrypt plain text values if 4.2.0 or 4.2.1 were used.
