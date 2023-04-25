# Kubernetes Plugins

## Overview

![](@assets/img/kubernetes-icon.png)

Process Automation integrates with Kubernetes through a variety of plugins listed below.
By integrating Process Automation with Kubernetes, users can automate and provide self-service interfaces for operations in their Kubernetes Clusters.
These integrations allow operations teams to provide self-service mechanisms to users throughout the business, as well as setup event-driven automation for workflows with Kubernetes.

## Setup

### Python Dependencies

In order to use the Kubernetes python must be installed on the Process Automation cluster-members or on the [Enterprise Runner](/administration/runner/runner-intro) - depending on where the
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
Once created, save the Token to [Key Storage](/manual/system-configs.html#key-storage) as a **Password** secret type.

## Test Kubernetes Plugins

To test that the dependencies and authentication have been configured correctly, use a Kubernetes Node Step plugin - as this will provide the option to easily
execute the plugin in _debug_ mode.

1. Create a new Job.
2. Navigate to the **Workflow** tab.
3. Click **+ Add a step**.
4. In the **Search step** field type **`Kubernetes`**.
5. Select the **Kubernetes / Pod / Describe** plugin from the list.
6. Type in a pod name into the **Name** field.
![K8s Describe Pod](@assets/img/k8s-describe-pod.png)
7. Type in the namespace of the pod in the **Namespace** field.
8. If the Kube Config file is saved in the directory **`$RDECK_BASE/.kube/config`** (`/var/lib/rundeck/.kube/config`for RPM and Deb), then the authentication fields can be left blank.
   * Otherwise, specify the custom Kube Config location.
9. Optionally chance the **Python Interpreter** if python scripts are not invoked using `python my_script.py` but rather `python2 my_script.py` or `python3 my_script.py`.
10. Click **Save** on the Job Step and then **Save** to save the Job.
11. Click **Run Job Now** to test that the configuration is correct.

Now that configuration is complete, take a look at use-cases for Process Automation with Kubernetes such as 
[Capturing Debug Data from Apps in Kubernetes](/learning/solutions/automated-diagnostics/examples/k8s-app-debug-capture) 
or [Managing Kubernetes with Rundeck](/learning/howto/how2kube.html#managing-kubernetes-with-rundeck).







