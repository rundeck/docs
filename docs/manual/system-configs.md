# System Menu

The Rundeck GUI has a menu which lets you view and manage system wide configuration settings.

Users with `admin` role access will see the "System Menu" icon in the header:

![System Menu Icon](/assets/img/fig0701.png)

This page contains links to manage Project configuration as well as system level configuration information.

![System Menu](/assets/img/fig0702.png)

:::tip
Some settings and screenshots show Enterprise version features and may not be available in the open source version.
:::

## Key Storage

The Key Storage facility provides a GUI and [API](/api/index.md#key-storage) to manage public keys, private keys, and passwords. These stored keys are used by plugins, node executors, and can be referenced in Job definitions as secure value inputs.

Key Storage features include:
- Secure storage of SSH keys, passwords, and other credentials
- Integration with external secret managers (HashiCorp Vault, AWS Secrets Manager, Azure Key Vault, etc.)
- Project-scoped access control
- File or text-based key upload
- Storage backend options (database or filesystem)

For complete documentation including UI instructions, storage plugins, ACL configuration, and API details, see [Key Storage](/manual/key-storage/index.md).

## System Configuration (Enterprise Only)

This section will allow configuration of Rundeck configuration settings from within the GUI.  [Check out the full feature documentation here](/manual/configuration-mgmt/configmgmt.md).

Open Source Rundeck will display key configuration settings as shown in the screen shot below.

![System settings](/assets/img/fig0715.png)

## Access Control

System security is managed through configuration files. This page describes the current settings the files to change them.

![Security settings](/assets/img/fig0716.png)

## System Report

The System Report page provides a breakdown of some of the Rundeck server's system statistics and information.  
There is an Enterprise version of this page that includes the ability to view and export important configuration
information for sharing with our support team.  More details are on the [Enterprise System Report](system-report.md) page.

![System Report Page](/assets/img/fig0703.png)

This information is also available via the API: [API > System Info](/api/index.md#system-info)

## Log Storage

See [Logstore](/administration/cluster/logstore/index.md)

## Plugins

Rundeck is built on a pluggable core.  Plugins can add functionality to connect to 3rd party systems, update the Rundeck UI, etc.
Use these menus to find, install, and manage the plugins on your Rundeck instance.

### Find Plugins

Search plugins from the online Rundeck plugin repository.

### Installed Plugins

See what plugins are currently installed.

### Upload Plugin

Use the [Developer Docs](/api/rundeck-api) to write your own plugin!  Upload it here to use it on your instance.

## Password Utility

## Users
Use this section to see a summary of User accounts and, with Enterprise, manage local user accounts with a GUI based editor.

[More details about the Users section can be found here](/manual/user-management/user-mgmt.md).

## Licenses

This page lists the Rundeck and third party library licenses.
