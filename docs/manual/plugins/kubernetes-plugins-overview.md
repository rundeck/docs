# Kubernetes Plugins

## Overview

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

