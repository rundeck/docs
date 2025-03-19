---
title: "5.8.0 Release Notes"
date: 2024-12-05
image: /images/chevron-logo-red-on-white.png
description: "Rundeck | Runbook Automation 5.8.0 Releases New Kubernetes Plugin Suite!"
feed:
 enable: true
 description: "New Kubernetes Plugin Suite!"

---

# 5.8.0 Release Notes

## Overview

The updated Kubernetes Plugin Suite for Rundeck introduces powerful features including dynamic cluster discovery for EKS/AKS/GKE, cloud provider authentication, and native in-cluster support from Runner, all without Python dependencies. These enhancements enable automated cluster management, simplified authentication, and efficient bulk operations across multiple clusters, making it easier for teams to manage Kubernetes infrastructure at scale while reducing manual effort and improving security.

<VidStack src="youtube/WsRWF6P2Kyc" poster="https://img.youtube.com/vi/WsRWF6P2Kyc/maxresdefault.jpg"/>

### Updated Kubernetes Plugin Suite

- **Dynamic Cluster Discovery**: New [EKS](/manual/projects/resource-model-sources/aws-eks.md), [AKS](/manual/projects/resource-model-sources/azure-aks.md) and [GKE](/manual/projects/resource-model-sources/gcp-gke.md) resource-model plugins automatically discover new clusters and add the clusters as nodes to the inventory. This reduces manual effort, minimizes errors, and accelerates the deployment of infrastructure changes, enabling teams to scale efficiently.
- **Cloud Provider Authentication**: AWS, Azure and GCP provide a mechanism to retrieve the kubernetes auth through their API’s. New Job step plugins can use the AWS/Azure/GCP credentials to retrieve the necessary Kubernetes authentication to communicate with the clusters. Teams save time by avoiding manual credential management, improving productivity and compliance.
- **Optimized for Numerous Clusters**: Clusters are added as nodes to the inventory, customers can easily target any number of clusters with a given operation. Now, users can execute bulk operations reliably and consistently, leading to improved operational efficiency and reduced downtime.
- **Native in-cluster Support from Runner**: Customers can now easily place a Runner in their clusters and Runbook Automation can use the Service Account of the pod that the Runner is hosted in as a means for authenticating with the cluster that the pod is in. This native integration reduces complexity, ensures secure access, and enhances the portability of automation workflows across environments.
- **No Python Dependency**: Eliminates the need for Python, reducing dependency risks and setup complexity. This results in faster deployments, fewer compatibility issues, and lower maintenance costs, especially in environments with strict language or package requirements.

In addition to the new resource-model plugins, this release includes the following new Job step plugins:
* [**Kubernetes Clusters - Create Object**](/manual/jobs/job-plugins/node-steps/kubernetes-create-object.md)
* [**Kubernetes Clusters - Delete Object**](/manual/jobs/job-plugins/node-steps/kubernetes-delete-object.md)
* [**Kubernetes Clusters - Describe Object**](/manual/jobs/job-plugins/node-steps/kubernetes-describe-object.md)
* [**Kubernetes Clusters - Update Object**](/manual/jobs/job-plugins/node-steps/kubernetes-update-object.md)
* [**Kubernetes Clusters - List Objects**](/manual/jobs/job-plugins/node-steps/kubernetes-list-objects.md)
* [**Kubernetes Clusters - Object Logs**](/manual/jobs/job-plugins/node-steps/kubernetes-object-logs.md)
* [**Kubernetes Clusters - Run Command**](/manual/jobs/job-plugins/node-steps/kubernetes-run-command.md)
* [**Kubernetes Clusters - Run Script**](/manual/jobs/job-plugins/node-steps/kubernetes-run-script.md)

## Runbook Automation Updates

> Also includes all Open Source updates from below

### Additional Updates

* Update ansible-plugin to 4.0.6 _(See update list below)_
* Secrets cache configurable on AWS Secret Manager Plugin
* Update spring security for CVE-2024-38821
* Update S3 log plugin for CVE-2024-21634
* Add Kubernetes job step plugins to server and to runner


## Rundeck Open Source Product Updates

* [Alternate Plugin Blocklist Enhancement](https://github.com/rundeck/rundeck/pull/9432)
* [UI: Project Dashboard: Fix: activity summary should not be shown for 0 counts](https://github.com/rundeck/rundeck/pull/9428)
* [Update spring security for CVE-2024-38821](https://github.com/rundeck/rundeck/pull/9424)
* [Fix the project export right managing both export and delete action](https://github.com/rundeck/rundeck/pull/9415)
* [Fix: invalid job components are not reported](https://github.com/rundeck/rundeck/pull/9394)
* [Remove build dependency on local Groovy SDK](https://github.com/rundeck/rundeck/pull/9389)
* [Add missing security headers](https://github.com/rundeck/rundeck/pull/9383)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A5.8.0+is%3Aclosed)

## Ansible Plugin Updates
* [Update ansible version](https://github.com/rundeck-plugins/ansible-plugin/pull/403)
* [Fix - Ansible process sub children](https://github.com/rundeck-plugins/ansible-plugin/pull/400)
* [Fix - Ansible YAML parsing error](https://github.com/rundeck-plugins/ansible-plugin/pull/399)
* [Allow custom bin path on gather facts false](https://github.com/rundeck-plugins/ansible-plugin/pull/398)
* [Fix - Ansible plugin - Resource Model Source throws NullPointerException](https://github.com/rundeck-plugins/ansible-plugin/pull/397)

## Links

- Download the Releases: [Open Source](https://www.rundeck.com/community-downloads/5.8.0) | [Self-Hosted](https://www.rundeck.com/enterprise-downloads/5.8.0)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/index.md)
- [Watch the Live Stream Release Recap](https://www.youtube.com/watch?v=WsRWF6P2Kyc)

## Version Info

Name: <span style="color: green"><span class="glyphicon glyphicon-knight"></span> "Fuji green knight"</span>

Release Date: December 5th, 2024

## Community Contributors

Submit your own Pull Requests to get recognition here!

* Stéphane Rondinaud ([clueware](https://github.com/clueware))
* Bruno Dias ([brmdias](https://github.com/brmdias))
* Dan Austin-Merrill ([djaustin](https://github.com/djaustin))
* Rui Melo Amaro ([rmeloamaro](https://github.com/rmeloamaro))
* Naveed Anjum ([nvd01](https://github.com/nvd01))

## Staff Contributors

* Greg Schueler ([gschueler](https://github.com/gschueler))
* Alberto Hormazabal Cespedes ([ahormazabal](https://github.com/ahormazabal))
* Alexander Abarca ([alexander-variacode](https://github.com/alexander-variacode))
* Alexander Grachtchouk ([mrdubr](https://github.com/mrdubr))
* Carlos Eduardo ([carlosrfranco](https://github.com/carlosrfranco))
* Christopher McCarroll-Gilbert ([chrismcg14](https://github.com/chrismcg14))
* Charlie Crawford ([ChuckCrawford](https://github.com/ChuckCrawford))
* Forrest Evans ([fdevans](https://github.com/fdevans))
* Imad Jafir ([imad6639](https://github.com/imad6639))
* Jake Cohen ([jsboak](https://github.com/jsboak))
* Jason Brooks ([jbrookspd](https://github.com/jbrookspd))
* Jesus Osuna ([Jesus-Osuna-M](https://github.com/Jesus-Osuna-M))
* Luis Toledo ([ltamaster](https://github.com/ltamaster))
* Rodrigo Navarro ([ronaveva](https://github.com/ronaveva))
* Sarah Martinelli Benedetti ([smartinellibenedetti](https://github.com/smartinellibenedetti))
* Stephen Joyner ([sjrd218](https://github.com/sjrd218))
