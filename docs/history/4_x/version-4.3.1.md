# Release 4.3.1

Name: <span style="color: violet"><span class="glyphicon glyphicon-leaf"></span> "Manticore violet leaf"</span>
Release Date: June 15, 2022

- [Download Rundeck](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/)

## Overview

This release fixes a critical issue with versions 4.2.0 and 4.2.1 of both Rundeck Open Source and Process Automation OnPrem (formerly Rundeck Enterprise).

For more details about the issue please read our [CVE-2022-31044](/history/CVEs/CVE-2022-31044.md) page.

Upon upgrading to this version any Key Storage entries that may have been written as plain text will be re-encrypted automatically.

> Note: 4.3.0 does not have the vulnerability, but does not include the patch to re-encrypt plain text values if 4.2.0 or 4.2.1 were used.
