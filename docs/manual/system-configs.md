# System Menu

The Rundeck GUI has a menu which lets you view and manage system wide configuration settings.

Users with `admin` role access will see the "System Menu" icon in the header:

![System Menu Icon](~@assets/img/fig0701.png)

This page contains links to manage Project configuration as well as system level configuration information.

![System Menu](~@assets/img/fig0702.png)

:::tip
Some settings and screenshots show Enterprise version features and may not be available in the open source version.
:::

## Key Storage

The Key Storage facility provides GUI backed by an [API](/api/rundeck-api.md#key-storage) to manage public, private keys and passwords.
These stored keys are used by many different types of Rundeck plugins.  The Key Storage entries can also be used in Job definitions as secure value inputs.

Keys can be stored either using an uploaded file or as text input.

### Key store organization

Key Storage organizes keys similar to how files are organized in a file system. Keys can be organized into a folder structure.
Here's an example convention that uses three fields to manage keys.

    keys/projects/{project}/nodes/{node}/{identity}.pem convention

The fields in the pattern provide slots to allow multiple projects and users.

- project: project name
- node: might be a specific node or could be a class name like 'www'.
- identity: the name of the user.

### Add Private Key with text

The Key Store page provides a simple browser to navigate the folders and perform actions on the keys.

Press the "Add or Upload a Key" button.

![Key Storage browser](~@assets/img/fig0720.png)

Next, choose "Private Key" for the Key type.

![Key Type menu](~@assets/img/fig0722.png)

Key data can be added using the content of an uploaded file or as text input.

Choose the "Enter text" option. Paste the key content here.

Enter the storage path and give the key a name.

![Add a key and enter text](~@assets/img/fig0721.png)

Here's the form with all the input.

Press the "Save" button.

![Key Storage UI](~@assets/img/fig0724.png)

After the key has been saved, the browser will be updated.

![Key Storage page listing](~@assets/img/fig0725.png)

### Add Private Key with file

![Key Storage file upload](~@assets/img/fig0728.png)

### Add a password

![Key Storage UI](~@assets/img/fig0726.png)

### Delete a key

![Key Storage UI](~@assets/img/fig0727.png)

## System Configuration (Enterprise Only)

This section will allow configuration of Rundeck configuration settings from within the GUI.  [Check out the full feature documentation here](/manual/configuration-mgmt/configmgmt.md).

Open Source Rundeck will display key configuration settings as shown in the screen shot below.

![System settings](~@assets/img/fig0715.png)

## Access Control

System security is managed through configuration files. This page describes the current settings the files to change them.

![Security settings](~@assets/img/fig0716.png)

## System Report

The System Report page provides a breakdown of some of the Rundeck server's system statistics and information.  
There is an Enterprise version of this page that includes the ability to view and export important configuration
information for sharing with our support team.  More details are on the [Enterprise System Report](system-report.md) page.

![System Report Page](~@assets/img/fig0703.png)

This information is also available via the API: [API > System Info](/api/rundeck-api.md#system-info)

## Log Storage

See [Logstore](/administration/cluster/logstore/)

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

[More details about the Users section can be found here](/manual/user-management/user-mgmt.html).

## Licenses

This page lists the Rundeck and third party library licenses.
