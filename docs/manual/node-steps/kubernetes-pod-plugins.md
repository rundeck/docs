# Kubernetes Pod Plugins

## Setup

Follow the steps outlined in the [**Kubernetes Plugins Overview**](/manual/plugins/kubernetes-plugins-overview) to configure authentication for Kubernetes Job steps.
Credentials can be configured on a per Job Step basis, Project basis, or for the entire Process Automation system.

To see property syntax for configuring properties at the Project or System level, navigate to **System Menu** (gear icon in the upper-right) -> **Plugins** -> **Installed Plugins**.
Locate the specific plugin and click on the **i** icon.  All of the plugin properties will be listed.

## Kubernetes / Pod / Create

This plugin creates a new Kubernetes pod.

## Kubernetes / Pod / Delete

This plugin deletes an existing Kubernetes pod.

## Kubernetes / Pod / Describe

This plugin retrieves and logs the description of a running pod.

## Kubernetes / Pod / Execute Command

This plugin executes a command inside a container in a running pod.

## Kubernetes / Pod / Execute Script

This plugin executes a script inside a container in a running pod.

## Kubernetes / Pod / Logs

This plugin retrieves logs from a specific pod.

## Kubernetes / Pod / Waitfor

This plugin pauses the workflow until a pod has a status of "ready."