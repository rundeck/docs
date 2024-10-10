# Kubernetes Debug Plugin

## Overview

This plugin adds an ephemeral container to a pod to help with troubleshooting other containers in the pod.  There are instances when it is necessary to debug a container using 
utilities such as `jstack` (to retrieve a java thread dump or java memory dump) or `tcpdump`, but these utilities are not shipped with the container image. Ephemeral container enable
users to attach a new container to an already-running pod _and_ have the new container share the processes-namespace with another container in the pod. From here, users can execute commands 
in the ephemeral container that interact with the existing container - thereby enabling for deeper debugging. 

To learn more about debugging in Kubernetes with ephemeral containers, see the [official Kubernetes documentation](https://kubernetes.io/docs/tasks/debug/debug-application/debug-running-pod/#ephemeral-container).

## Setup

Follow the steps outlined in the [**Kubernetes Plugins Overview**](/manual/plugins/kubernetes-plugins-overview) to configure authentication for Kubernetes Job steps.
Credentials can be configured on a per Job Step basis, Project basis, or for the entire Runbook Automation system.

To see property syntax for configuring properties at the Project or System level, navigate to **System Menu** (gear icon in the upper-right) -> **Plugins** -> **Installed Plugins**.
Locate the specific plugin and click on the **i** icon.  All of the plugin properties will be listed.

## Kubernetes / Debug / Ephemeral Container

The following fields are **required** when using this plugin:

* Pod Name: Name of the running pod that the ephemeral container will get attached to.
* Namespace: Cluster namespace of where the existing pod is running.
* Name for Ephemeral Container: This is the name for the ephemeral container that will be added to the running pod.
* Container Image: This is the image for the ephemeral container to be added to the running pod.

The following fields are **optional**:
* Name of a container within the running pod that the ephemeral container should target. The ephemeral container will be run in the namespaces (IPC, PID, etc) of the Target Container. If not set then the ephemeral container uses the namespaces configured in the Pod spec. See the official Kubernetes documentation [here](https://kubernetes.io/docs/tasks/debug/debug-application/debug-running-pod/#ephemeral-container) for further details.
* Print Pod Spec: This will print the pod details to the log output after the ephemeral container has been added.

All of the fields in the **Authentication** section are outlined in the [**Kubernetes Plugins Overview**](/manual/plugins/kubernetes-plugins-overview).