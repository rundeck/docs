#### Automated Diagnostics
---

# Template Job: Recent Pod logs and Kubernetes Events

When an issue arises with applications deployed in Kubernetes, one of the first common actions taken by engineers is to check the health of Pods.
If any pods are "unhealthy," then the engineer will look at recent logs and Kubernetes Events pertaining to the unhealthy pods.

To do this troubleshooting effectively not only requires the right set of permissions, but also involves multiple commands that require a decent familiarity with Kubernetes.

Here is an example Job that retrieves recent Pod logs and Kubernetes events - specifically for unhealthy pods - using **`kubectl`**:
Right click [here](https://raw.githubusercontent.com/rundeck/docs/4.0.x/docs/assets/text/sample_k8s_job.yaml) and click **`Save Link As...`** to download the Job definition **YAML** and import the Job to your Automation instance.

![Example Kubernetes Job Output](/assets/img/example-k8s-job-output.png)
