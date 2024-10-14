# Kubernetes Node Source

## Overview 

The Kubernetes Resource Model populates the Runbook Automation or Rundeck node-inventory with Kubernetes pods.  By populating the node inventory, 
pods can be targeted with node-steps thereby enabling users to iterate operations across each pod.  For example, users my leverage the [Pod Logs](/manual/node-steps/kubernetes-pod-plugins.md#kubernetes-pod-logs)
step to retrieve the last 10 log-lines from all pods that have specific labels.

## Setup

### Authentication

Follow the steps outlined in the [**Kubernetes Plugins Overview**](/manual/plugins/kubernetes-plugins-overview) to configure authentication for Kubernetes Job steps.
Credentials can be configured on a per Job Step basis, Project basis, or for the entire Runbook Automation system.

To see property syntax for configuring properties at the Project or System level, navigate to **System Menu** (gear icon in the upper-right) -> **Plugins** -> **Installed Plugins**.
Locate the specific plugin and click on the **i** icon.  All of the plugin properties will be listed.

### Add Node Source

Now that authentication has been set up, add the Kubernetes Node Source by following these steps:

1. With a specific project, navigate to **Project Settings** -> **Edit Nodes** -> **Sources** -> **Add a new Node Source**.
2. Select **Kubernetes / Pods / Resource Model**.
3. **Default Attributes** (Optional): This is a list of key-value pairs that can be added to the pods. For example, `username=root`.
4. **Custom Mapping** (Optional): By default, the plugin generates a list of pod's attributes in order to reference them on the custom config parameters of the plugin (eg: default:status, default:image). The following list are the default available attributes:
    ```
    default:pod_id: Pod ID,
    default:host_id: Host ID,
    default:started_at: started At,
    default:name: Pod Name,
    default:namespace: Pod namespace,
    default:labels: Deployments labels,
    default:image: Image,
    default:status: Pod Status,
    default:status_message: Pod Status message,
    default:container_id: Container ID,
    default:container_name: Container Name
    ```
   These properties can be modified by using the **Custom Mapping** field. For example: `nodename.selector=default:Name,hostname.selector=default:pod_id`
5. **Tags** (Optional): Add static and custom tags to the pods. For example `tag.selector=default:image`.
6. **Namespace** (Optional): Filter the pods that are discovered and populated into the node-inventory by Kubernetes namespace. By default, all namespaces are discovered.
7. **Field Selector** (Optional): Filter the pods discovered by a specific field. For example `metadata.uid=123` will show only the pod with UID 123. For further information, check the SDK docs [here](https://github.com/kubernetes-client/python/blob/fd5a0c49259e83d928535dd66ab083ddb92ccecf/kubernetes/docs/CoreV1Api.md#return-type-116).
8. **Label Selector** (Optional): Filter the pods discovered by a specific label.
9. **Just Running Pods** (Optional): Filter the pods discovered to be only those that are running. This will exclude pods that are stopped.
10. **Enable Emoticons on Nodes** (Optional): Selecting this will show an emoticons next to the pods in the Nodes tab based on their status.
11. Instructions for **Authentication** can be found [here](/manual/plugins/kubernetes-plugins-overview).
12. Click **Save** on the Node Source.  Click **Save** again to commit the changes.