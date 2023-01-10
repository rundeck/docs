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

### Plugin Suite Configuration (Beta)

:::warning Enable Beta Feature
Configuring plugin-suites with an enhanced user-experience is a Beta feature - meaning that it is still in active development.  To enable this feature, add **`rundeck.feature.pluginGroups.enabled=true`** to the `framework.properties` file,
or add the following **_Custom Config_** to [Configuration Management](/manual/configuration-mgmt/configmgmt):<br>
**Property Name** = **`rundeck.feature.pluginGroups.enabled`**<br>
**Property Value** = **`true`**
:::

A **_Plugin Suite_** is a group of plugins that share a set of the same properties.  Most often, this is a group of plugins that are built to integrate with a third-party product - such as the [PagerDuty Plugins](/manual/workflow-steps/pagerduty).

#### Project Level Plugin Suite Settings

To configure a plugin-suite for a project, navigate to **Project Settings** -> **Edit Configuration** -> **Plugins**:

![Plugin Suite Project Settings](@assets/img/plugin-groups-project-settings.png)<br>

Click on **PluginGroup+** and select the desired Plugin Suite from the list.

The properties for the chosen plugin-suite will now be available to configure.  Once the properties are filled in, click **Save** for that plugin-suite.  Then click **Save** at the bottom of the page:

![Saving pluing suite settings](@assets/img/saving-plugin-suite-settings.png)<br>

When the configuration is saved, all plugins for the given suite in that project will default to these properties. 

#### System Level Plugin Groups

To configure a plugin-suite for the system - thereby spanning all projects - click on the **Gear Icon** (upper right) -> **System Configuration**.

Navigate to the plugin-suite name - such as PagerDuty - and click the **Pencil Icon** in the upper right:

![Edit Plugin Suite Sysytem Level](@assets/img/edit-plugin-suite-system-level.png)<br>

Place the properties into their associated fields then click **Save**.