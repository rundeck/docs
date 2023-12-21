# SCM

Projects can enable SCM for managing Job definitions.

SCM Management is performed by SCM Plugins
which can be configured to perform Import or Export behaviors, or both.

Rundeck includes a Git plugin for SCM management of Jobs.

To develop a SCM Plugin, see [Plugin Developer Guide - SCM Plugins](/developer/10-scm-plugins.md).

Project SCM can be configured in the GUI, or via the [API](/api/rundeck-api.md#scm).

In the GUI:

- First, choose the project to manage
- In the sidebar, select the "Project Settings > Setup SCM"
- Choose a SCM Export or SCM Import plugin and click "Setup" to begin configuring the plugin.
