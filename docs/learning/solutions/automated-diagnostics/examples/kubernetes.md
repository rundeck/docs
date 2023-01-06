# Automated Diagnostics

## Kubernetes
Kubernetes is a sophisticated container orchestration system with many moving pieces: Nodes, pods, API server, kube-proxy, scheduler, and many more.  
Because of so many moving components, it is sometimes difficult to pin down the root cause of an issue for an application running on Kubernetes.  
In addition, some organizations only have a handful of Kubernetes experts on staff, resulting in on-call engineers either escalating to these experts frequently or spending extra time trying to diagnose issues.

There are numerous plugins that make it possible to get started quickly with Auto-Diagnostics in Kubernetes:

* [Kubernetes Pods - Resource Model](https://github.com/rundeck-plugins/kubernetes#resource-model)
* [Kubernetes Node Executor](https://github.com/rundeck-plugins/kubernetes#node-executor)
* [Check on a Kubernetes Deployment](https://github.com/rundeck-plugins/kubernetes#create--update--delete--check--wait-a-deployment)

It is also very common for users to want to “wrap around” the Kubernetes command-line **`kubectl`**.

### Sample Job: Recent Pod logs and Kubernetes Events

Here is an example Job that retrieves recent Pod logs and Kubernetes events using **`kubectl`**.  
Right click [here](https://raw.githubusercontent.com/rundeck/docs/4.0.x/docs/assets/text/sample_k8s_job.yaml) and click **`Save Link As...`** to download the Job definition **YAML** and import the Job to your Automation instance.

![Example Kubernetes Job Output](@assets/img/example-k8s-job-output.png)

