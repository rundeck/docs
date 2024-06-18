# Kubernetes Deployment Plugins

## Setup

Follow the steps outlined in the [**Kubernetes Plugins Overview**](/manual/plugins/kubernetes-plugins-overview) to configure authentication for Kubernetes Job steps.
Credentials can be configured on a per Job Step basis, Project basis, or for the entire Runbook Automation system.

To see property syntax for configuring properties at the Project or System level, navigate to **System Menu** (gear icon in the upper-right) -> **Plugins** -> **Installed Plugins**.
Locate the specific plugin and click on the **i** icon.  All of the plugin properties will be listed.

## Kubernetes / Deployment / Create

This plugin creates a Kubernetes Deployment. 

**Required Properties**:
1. API Version: Kubernetes API Version.
2. Name: This will be the name of the Kubernetes deployment.
3. Namespace: Namespace where the deployment will be created.

## Kubernetes / Deployment / Delete

This plugin deletes an existing Kubernetes Deployment. 

## Kubernetes / Deployment / Status

This plugin retrieves the status of an existing Kubernetes Deployment. 

## Kubernetes / Deployment / Update

This plugin updates the configuration of an existing Kubernetes Deployment. 

## Kubernetes / Deployment / Waitfor

This plugin pauses the workflow until a deployment is complete.

