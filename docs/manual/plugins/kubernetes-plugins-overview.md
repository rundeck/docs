# Kubernetes Integration Overview
:::enterprise
:::
![](/assets/img/kubernetes-icon.png)

Runbook Automation integrates with Kubernetes through a variety of plugins. By integrating Runbook Automation with Kubernetes, users can automate and provide self-service interfaces for operations in their Kubernetes Clusters.

## Kubernetes Plugins Available in Runbook Automation

| Plugin Name                                                                                              |                                        Plugin Type                                         | Description                                                                                   |
|:---------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------|
| [**Amazon EKS Node Source**](/manual/projects/resource-model-sources/aws-eks.md)                         |                                        Node Source                                         | Imports Amazon Web Services EKS Clusters as Nodes.                                            |
| [**Azure AKS Node Source**](/manual/projects/resource-model-sources/azure-aks.md)                        |                                        Node Source                                         | Imports Azure AKS Clusters as Nodes.                                                          |
| [**Google Cloud GKE Node Source**](/manual/projects/resource-model-sources/gcp-gke.md)                   |                                        Node Source                                         | Imports Google Cloud GKE Clusters as Nodes.                                                   |
| [**Kubernetes Cluster Create Object**](/manual/jobs/job-plugins/node-steps/kubernetes-create-object)     |                                         Node Step                                          | This plugin creates an object of a selected kind within a Kubernetes cluster.                 |
| [**Kubernetes Cluster Delete Object**](/manual/jobs/job-plugins/node-steps/kubernetes-delete-object)     |                                         Node Step                                          | This plugin deletes an object of a selected kind within a Kubernetes cluster.                 |
| [**Kubernetes Cluster Describe Object**](/manual/jobs/job-plugins/node-steps/kubernetes-describe-object) |                                         Node Step                                          | This plugin describes an object of a selected kind within a Kubernetes cluster.               |
| [**Kubernetes Cluster List Objects**](/manual/jobs/job-plugins/node-steps/kubernetes-list-objects)       |                                         Node Step                                          | This plugin lists objects of a selected kind within a Kubernetes cluster.                     |
| [**Kubernetes Cluster Object Logs**](/manual/jobs/job-plugins/node-steps/kubernetes-object-logs)         | Node Step| This plugin allows you to view the logs of an object within a Kubernetes cluster.             |
| [**Kubernetes Cluster Run Command**](/manual/jobs/job-plugins/node-steps/kubernetes-run-command)         |                                         Node Step                                          | This plugin allows you to execute a command in a pod within a Kubernetes cluster.             |
| [**Kubernetes Cluster Run Script**](/manual/jobs/job-plugins/node-steps/kubernetes-run-script)           |                                         Node Step                                          | This plugin executes a script using a predefined container image within a Kubernetes cluster. |
| [**Kubernetes Cluster Update Object**](/manual/jobs/job-plugins/node-steps/kubernetes-update-object)     |                                         Node Step                                          | This plugin updates a specified object of a selected kind within a Kubernetes cluster.        |



:::warning Commercial Plugins
This document covers the plugins available in the **commercial Runbook Automation products**.  For a list of Kubernetes plugins available for **Rundeck Community (open-source)**, see documentation for the [**Open Source Kubernetes plugins**](/manual/plugins/kubernetes-open-source.md).
:::
