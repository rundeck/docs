# 4.2.3 Release Notes

Name: <span style="color: salmon"><span class="glyphicon glyphicon-grain"></span> "Liger salmon grain"</span>
Release Date: July 14, 2022

- [Download Rundeck](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/)

## Overview

This release supersedes version `4.2.2` due to issues found with the re-encryption of certain types of keys from a critical issue with versions `4.2.0` and `4.2.1` of both Rundeck Open Source and Runbook Automation Self-Hosted (formerly Rundeck Enterprise).

For more details about the issue please read our [CVE-2022-31044](/history/cves/cve-2022-31044.md) page.

Upon upgrading to this version any Key Storage entries that may have been written as plain text will be re-encrypted automatically.
