# Kubernetes Debug Plugin

## Setup

Follow the steps outlined in the [**Kubernetes Plugins Overview**](/manual/plugins/kubernetes-plugins-overview) to configure authentication for Kubernetes Job steps.
Credentials can be configured on a per Job Step basis, Project basis, or for the entire Process Automation system.

To see property syntax for configuring properties at the Project or System level, navigate to **System Menu** (gear icon in the upper-right) -> **Plugins** -> **Installed Plugins**.
Locate the specific plugin and click on the **i** icon.  All of the plugin properties will be listed.

## Kubernetes / Debug / Ephemeral Container

This plugin adds an ephemeral container to a pod to help with troubleshooting other containers in the pod.