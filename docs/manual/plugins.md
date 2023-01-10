# Plugins

## Overview

Process Automation is a sophisticated orchestration platform that has numerous types of integrations called _plugins_. 

The functionality of plugins ranges from executing commands on nodes, performing steps in a workflow, sending a notifications about job status, gathering information about the hosts in your network, copying a file to a remote server, storing and streaming logs, and much more.

This section provides the basics for understanding the various types of plugins and how they're configured.

:::tip Advanced Users & Developers
For administrators and advanced-users, here is additional documentation on Installing Plugins and [advanced configuration settings](/administration/configuration/plugins/configuring).

For developers interested in developing new plugins or contributing to open-source plugins, click [here](/developer/).
:::

For a detailed list of the various types of plugins, click [here](/administration/configuration/plugins/plugin-types.html#types-of-plugins)

## Plugins Configuration

All plugins are configured by defining plugin properties - such as credentials and endpoints.  These properties can be defined on a per-plugin, project, or system basis.

Plugin properties are prioritized for usage in the following order:
1. **Individual Plugin**
2. **Project**
3. **System**

For example, if credentials for integrating with Jira are defined both in the _**Project**_ configuration _and_ in a specific Jira Job Step plugin, then the credentials defined in the Job Step will be used.

### Plugin Groups (Beta)

A **_Plugin Group_** is the set of properties for a _suite_ of plugins that is defined in the Project or System configuration. 
Properties that are defined within a given Plugin Group can then be utilized by all plugins associated with that plugin suite - regardless of the type of plugin.

#### Project Level Plugin Groups

#### System Level Plugin Groups