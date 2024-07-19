# Kubernetes Plugins

## Overview

![](/assets/img/kubernetes-icon.png)

Runbook Automation integrates with Kubernetes through a variety of plugins listed below.
By integrating Runbook Automation with Kubernetes, users can automate and provide self-service interfaces for operations in their Kubernetes Clusters.
These integrations allow operations teams to provide self-service mechanisms to users throughout the business, as well as setup event-driven automation for workflows with Kubernetes.

<details><summary> <font size="5">Kubernetes Plugins</font>
</summary>

|Plugin Name| Plugin Type| Description|
|:---------------------------------------------------------|:---------------------------------------------------------:|:---------------------------------------------------------|
|[**Create Deployment**](/manual/node-steps/kubernetes-deployment-plugins.md#kubernetes-deployment-create)|Node Step|Create a new deployment.|
|[**Delete Deployment**](/manual/node-steps/kubernetes-deployment-plugins.md#kubernetes-deployment-delete)|Node Step|Delete an existing deployment.|
|[**Deployment Status**](/manual/node-steps/kubernetes-deployment-plugins.md#kubernetes-deployment-status)|Node Step|Get the status of an existing deployment.|
|[**Update Deployment**](/manual/node-steps/kubernetes-deployment-plugins.md#kubernetes-deployment-update)|Node Step|Update an existing deployment.|
|[**Waitfor Deployment**](/manual/node-steps/kubernetes-deployment-plugins.md#kubernetes-deployment-waitfor)|Node Step|Pause workflow until deployment is complete.|
|[**Create Job**](/manual/node-steps/kubernetes-job-plugins.md#kubernetes-job-create)|Node Step|Create a new Kubernetes job.|
|[**Delete Job**](/manual/node-steps/kubernetes-job-plugins.md#kubernetes-job-delete)|Node Step|Delete an existing Kubernetes job.|
|[**Re-run Job**](/manual/node-steps/kubernetes-job-plugins.md#kubernetes-job-re-run)|Node Step|Re-runs an existing Kubernetes job.|
|[**Waitfor Job**](/manual/node-steps/kubernetes-job-plugins.md#kubernetes-job-waitfor)|Node Step|Pause workflow until Kubernetes job is complete.|
|[**Create Service**](/manual/node-steps/kubernetes-service-plugins.md#kubernetes-service-create)|Node Step|Create a new Kubernetes service.|
|[**Update Service**](/manual/node-steps/kubernetes-service-plugins.md#kubernetes-service-update)|Node Step|Update an existing Kubernetes service.|
|[**Delete Service**](/manual/node-steps/kubernetes-service-plugins.md#kubernetes-service-delete)|Node Step|Delete an existing Kubernetes service.|
|[**Pods Node Source**](/manual/projects/resource-model-sources/kubernetes.md)|Resource Model|Populates node inventory with Kubernetes pods.|
|[**Create Pod**](/manual/node-steps/kubernetes-pod-plugins.md#kubernetes-pod-create)|Node Step|Create a new Kubernetes pod.|
|[**Delete Pod**](/manual/node-steps/kubernetes-pod-plugins.md#kubernetes-pod-delete)|Node Step|Delete an existing Kubernetes pod.|
|[**Describe Pod**](/manual/node-steps/kubernetes-pod-plugins.md#kubernetes-pod-describe)|Node Step|Describe a running Kubernetes pod.|
|[**Execute Command**](/manual/node-steps/kubernetes-pod-plugins.md#kubernetes-pod-execute-command)|Node Step|Execute a command inside a container in a running pod.|
|[**Execute Script**](/manual/node-steps/kubernetes-pod-plugins.md#kubernetes-pod-execute-script)|Node Step|Execute a script inside a container in a running pod.|
|[**Pod Logs**](/manual/node-steps/kubernetes-pod-plugins.md#kubernetes-pod-logs)|Node Step|View the logs of a running pod.|
|[**Waitfor Pod**](/manual/node-steps/kubernetes-pod-plugins.md#kubernetes-pod-waitfor)|Node Step|Pause workflow until pod is in "ready" state.|
|[**Debug Pod**](/manual/node-steps/kubernetes-debug-plugins.md#kubernetes-debug-ephemeral-container)|Node Step|Debug a running container inside an existing pod using an ephemeral container.|
|[**Waitfor StatefulSet**](/manual/node-steps/kubernetes-statefulset-plugins.md#kubernetes-statefulset-waitfor)|Node Step|Pause workflow until StatefulSet has been successfully deployed.|

</details>
<br>
<em>Click to expand to see the full list of Runbook Automation plugins for Kubernetes.</em>

## Setup

### Python Dependencies

In order to use the Kubernetes python must be installed on the Runbook Automation cluster-members or on the [Enterprise Runner](/administration/runner/runner-intro) - depending on where the
connection to Kubernetes is going to originate.  

The Kubernetes plugins will work with both **Python 2.7.x** and **Python 3.x.x**.

Once python is installed, download and install the **`kubernetes`** python client.  For **Python 2.7.x** this can be done with **`pip install kubernetes`** and for **Python 3.x.x** this can be
done with **`pip3 install kubernetes`**.

Optionally test that the Kubernetes client has been installed successfully by executing the following at the command-line: **`python`** followed by **`from kubernetes import client, config`**:

```
ubuntu@ip-172-31-13-91:~$ python
Python 2.7.17 (default, Mar  8 2023, 18:40:28) 
[GCC 7.5.0] on linux2
Type "help", "copyright", "credits" or "license" for more information.
>>> from kubernetes import client, config
>>>
```

### Kubernetes Authentication

By default, the Kubernetes plugins look for a Kube Config file at **`$RDECK_BASE/.kube/config`**.  For **Deb** and **RPM** this would translate to **`/var/lib/rundeck/.kube/config`**.
The Kube Config file can be saved to a different location, just be sure to take note of where it is saved for later steps.

If it is preferred to use a Kubernetes API Token, then follow the instructions outlined [here](https://www.cncf.io/blog/2020/07/31/kubernetes-rbac-101-authentication/) to generate the Service Account Token.
Once created, save the Token to [Key Storage](/manual/system-configs.md#key-storage) as a **Password** secret type.

### Upload Kubernetes Plugins (Rundeck OSS Only)

Rundeck OSS does not come preloaded with the Kubernetes plugins. To install the Kubernetes plugins, use the following steps:

1. Navigate to the [latest plugin release](https://github.com/rundeck-plugins/kubernetes/releases/latest) on Github and download the **`kubernetes-X.X.XX.zip`** file.<br><br>
2. In Rundeck, click the **Gear Icon** and then click the **Plugins > Upload Plugin**:
   ![Upload Plugins Menu](/assets/img/upload-plugins-menu.png)
3. Click **Browse** and select the downloaded **`.zip`** file from Step 2.
4. Click **Install**:
   ![Upload Kubernetes Plugins](/assets/img/upload-k8s-plugins.png)

## Test Kubernetes Plugins

To test that the dependencies and authentication have been configured correctly, use a Kubernetes Node Step plugin - as this will provide the option to easily
execute the plugin in _debug_ mode.

1. Create a new Job.
2. Navigate to the **Workflow** tab.
3. Click **+ Add a step**.
4. In the **Search step** field type **`Kubernetes`**.
5. Select the **Kubernetes / Pod / Describe** plugin from the list.
6. Type in a pod name into the **Name** field.
![K8s Describe Pod](/assets/img/k8s-describe-pod.png)
7. Type in the namespace of the pod in the **Namespace** field.
8. If the Kube Config file is saved in the directory **`$RDECK_BASE/.kube/config`** (`/var/lib/rundeck/.kube/config`for RPM and Deb), then the authentication fields can be left blank.
   * Otherwise, specify the custom Kube Config location.
9. Optionally chance the **Python Interpreter** if python scripts are not invoked using `python my_script.py` but rather `python2 my_script.py` or `python3 my_script.py`.
10. Click **Save** on the Job Step and then **Save** to save the Job.
11. Click **Run Job Now** to test that the configuration is correct.

Now that configuration is complete, take a look at use-cases for Runbook Automation with Kubernetes such as 
[Capturing Debug Data from Apps in Kubernetes](/learning/solutions/automated-diagnostics/examples/k8s-app-debug-capture) 
or [Managing Kubernetes with Rundeck](/learning/howto/how2kube.md#managing-kubernetes-with-rundeck).







