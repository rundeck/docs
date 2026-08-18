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

## Adding Clusters & Authenticating with Kubernetes API
There are multiple methods for adding Kubernetes clusters to Runbook Automation:

1. [**Runners with Pod-based Service Account**](#runners-with-pod-based-service-account): Install a Runner in each cluster (or namespace), and target the Runner as the cluster or particular namespace. The Runner uses the Service Account of the pod that it is hosted in to authenticate with the Kubernetes API.
2. [**Cloud Provider Integration**](#cloud-provider-integration): Use the cloud provider's API to dynamically retrieve all clusters and add them as nodes to the inventory. The cloud provider's API can also optionally be used to retrieve the necessary Kubernetes authentication to communicate with the clusters.
3. [**Manual Authentication Configuration**](#manual-authentication-configuration): Clusters are added to the inventory either manually or through method 1 or 2. The Kubernetes API Token or Kube Config file is manually added to Key Storage and configured as node-attributes.

:::tip Prerequisite Configuration
Note that all of these methods require the use of the **Automatic** mode for the Project's use of Runners. See [this documentation](/administration/runner/runner-management/project-dispatch-configuration.md) to confirm that your project is configured correctly.
:::

### Runners with Pod-based Service Account

With this method, clusters are added to the inventory by installing a Runner in the cluster and adding the Runner as a node to the inventory. The Runner uses the Service Account of the pod that it is hosted in to authenticate with the Kubernetes API.

This method is recommended if you want to have a 1:1 relationship between Runners and Kubernetes clusters or between Runners and namespaces within clusters, or if you are unable to use the Cloud Provider Integration method outlined in the next section.

Follow these steps to set up a Runner in a Kubernetes cluster:

1. Create a new Runner within your Project using the API. Replace **`URL`** with your Runbook Automation instance URL, **`PROJECT`** with the project name, and **`API_TOKEN`** with your API Token:
   ```bash
   curl --location --request POST 'https://[URL]/api/42/project/[PROJECT]/runnerManagement/runners' \
   --header 'Accept: application/json' \
   --header 'X-Rundeck-Auth-Token: [API_TOKEN]' \
   --header 'Content-Type: application/json' \
   --data-raw '{
      "name": "K8s Runner US-WEST-1 Cluster 1",
      "description": "Runner installed in US-WEST-1 Cluster 1",
      "tagNames": ["K8S-RUNNER", "us-west-1", "cluster-1"],
      "installationType": "kubernetes",
      "replicaType": "ephemeral"
     }'
      ```
   :::tip Tip
      It is recommended to add at least one **Tag** through the `tagNames` field to the Runner, as this simplifies adding the Node Enhancer in step 4.
   :::
   The response will provide the following. Be sure to capture the **`runnerId`** and the **`token`**:
   ```
   {"description":"Runner installed in US-WEST-1 Cluster 1",
   "downloadTk":"fbc12393-3454-426d-9dd0-6e72ce53b9d5",
   "name":"K8s Runner","projectAssociations":{"network-infra":".*"},
   "runnerId":"acc00df8-fbb8-497a-8f7f-07eaaa0c5b78","token":"6Y4bHjk4TCU1MUGBaso9Ak7sHOokwRkw"}
   ```
2. Create a deployment YAML for the Runner. Be sure to replace **`[namespace]`**, **`[runnerId]`** with the value from the previous step, **`[token]`**, and **`[Runbook Automation Instance URL]`**:
   ```
   apiVersion: v1
   kind: Pod
   metadata:
     namespace: [namespace]
     name: rundeck-runner
     labels:
       app: rundeck-runner
   spec:
     containers:
     - image: rundeckpro/runner
       imagePullPolicy: IfNotPresent
       name: rundeck-runner
       env:
       - name: RUNNER_RUNDECK_CLIENT_ID
         value: "[runnerId]"
       - name: RUNNER_RUNDECK_SERVER_TOKEN
         value: "[token]"
       - name: RUNNER_RUNDECK_SERVER_URL
         value: "https://[Runbook Automation Instance URL]"
       lifecycle:
         postStart:
           exec:
             command:
             - /bin/sh
             - -c
             - touch this_is_from_rundeck_runner
     restartPolicy: Always
   ```
3. Create the deployment: **`kubectl apply -f deployment.yml`**.
4. Add a Node Attribute to the Runner's node in the inventory through an  [**Attribute Match Node Enhancer**](/manual/node-enhancers.md#attribute-match).
   - Set the **Attribute Match** to use one of the tags set in **Step 1**: **`tags=~.*K8S-RUNNER.*`**
   - Set the **Attributes to Add** as: **`kubernetes-use-pod-service-account=true`**
   :::tip Tip
   This step is only required one time if you use the same tag for all Runners that are deployed into Kubernetes clusters and use the Pod-based Service Account method.
   :::

The Runner will now be able to authenticate with the Kubernetes API using the Service Account of the pod that it is hosted in. 

### Cloud Provider Integration

The Cloud Provider Integration method can be used to dynamically retrieve all clusters from the cloud provider's API and add them as nodes to the inventory. 
The cloud provider's API can _also_ be used to retrieve the necessary Kubernetes authentication to communicate with the clusters.

:::tip Cloud Provider for Discovery and Pod Service Account for Authentication
It is possible to use the Cloud Provider Integration method for cluster discovery and the Pod-based Service Account method for authentication. This is useful when you want to dynamically discover clusters but have a 1:1 relationship between Runners and clusters or do not have the option to use the cloud provider for retrieving cluster credentials.
To take this approach, be sure to select the **Use Pod Service Account for Node Steps** when configuring the Node Source plugins.
:::

### Cloud Provider for Cluster Discovery

Use the Node Source plugins for the cloud provider to add the clusters to the Node Inventory:

- [**Amazon EKS Node Source**](/manual/projects/resource-model-sources/aws-eks.md)
- [**Azure AKS Node Source**](/manual/projects/resource-model-sources/azure-aks.md)
- [**Google Cloud GKE Node Source**](/manual/projects/resource-model-sources/gcp-gke.md)

Note that a Runner does _not_ need to be installed to configure these Node Source plugins.

### Cloud Provider for Kubernetes Authentication

Runbook Automation can use its integration with the public cloud providers to retrieve credentials to authenticate with the Kubernetes clusters.

This method of authentication is useful when:
1. Installing a Runner inside the clusters is not an option
2. There are numerous clusters and it is preferred to have a one-to-many relationship between the Runner and the clusters

With this approach, a single Runner is installed in either a VM or a container that has a path to communicate with the clusters. The Runner uses the cloud provider's API to retrieve the necessary Kubernetes authentication to communicate with the clusters:

![The Runner can retrieve cluster credentials from the EKS service](/assets/img/k8s-cloud-provider-architecture.png)

### AWS EKS Authentication

To authenticate with EKS clusters using the AWS APIs:

1. Install a Runner in an EC2 instance or a container that has access to the EKS clusters.<br>

2. Assign permissions to the IAM role of this EC2 or container to allow the Runner to retrieve the necessary EKS cluster credentials:
   - **`eks:DescribeCluster`**
3. Add the **EKS API** as an authentication mode and add the IAM Role of the Runner's host (EC2 or container) to the target clusters:

   :::info Repeat for each target cluster
   This process must be repeated for each target cluster so that the Runner can authenticate with each cluster.
   :::
   :::tabs
   @tab AWS Console
   1. Navigate to the **EKS Console**.
   2. Select the target cluster and click on the **Access** tab and click **Manage Access**.
      ![EKS API Access Configuration](/assets/img/eks-api-access-configuration.png)
   3. Select either **EKS API** or **EKS API and ConfigMap**.
   4. Click **Save Changes**.
   5. Now in the **IAM access entries** section, click on **Create access entry**:
      ![Create Access Entry](/assets/img/eks-create-access-entry.png)
   6. In the **IAM principal** section, select the IAM Role of the Runner's host (EC2 or container).
   7. Select **Standard** for the **Type**.
   8. On the next screen, assign the desired **Policy Name** and **Access Scope** for this entry.
   9. On the next screen, click **Create**.
   
   @tab CLI
   1. Install the AWS CLI as described [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
   2. Run the following command to add the **EKS API** as an access mode:
      ```
      aws eks update-cluster-config --name my-cluster --access-config authenticationMode=API_AND_CONFIG_MAP
      ```
   3. Create an access entry for the IAM Role of the Runner's host (EC2 or container).  Here is an example command, but additional examples can be found in the [official AWS documentation](https://docs.aws.amazon.com/eks/latest/userguide/creating-access-entries.html):
      ```
      aws eks create-access-entry --cluster-name my-cluster --principal-arn arn:aws:iam::111122223333:role/EKS-my-cluster-self-managed-ng-1 --type STANDARD
      ```
      Replace **`arn:aws:iam::111122223333:role/EKS-my-cluster-self-managed-ng-1`** with the IAM Role of the Runner's host.
   :::tabs
   
Now when the Runner targets the EKS clusters using the Kubernetes node-step plugins, it will be able to authenticate with the clusters using credentials fetched from AWS.

### Azure AKS Authentication

To authenticate with AKS clusters using the Azure APIs:

1. Install a Runner in a VM or container that has a network path to the target AKS clusters.<br>

2. Follow the instructions in the [Azure Plugins Overview](/manual/plugins/azure-plugins-overview.md) to create a Service Principal and add the credentials for this Service Principal to Runbook Automation.
   :::info Pre-existing Service Principal
   If Runbook Automation has already been integrated with Azure, then you may not need to create a new Service Principal.  Instead, add these permissions to the existing Service Principal.
   :::
3. A assign permissions that allow this Service Principal to retrieve AKS cluster credentials:
   - **`Microsoft.ContainerService/managedClusters/listClusterUserCredential`**
   - Azure provides pre-built roles that have this permission, such as **Azure Kubernetes Service Cluster User Role**.
   :::tip Role Assignment Scope
    The role assignment of these permissions can be assigned at the **Subscription**, **Resource Group** or even on an individual cluster basis.
    Regardless of the chosen scope, navigate to the **Access Control (IAM)** section and add the role assignment.
   :::

Now when the Runner targets the AKS clusters using the Kubernetes node-step plugins, it will be able to authenticate with the clusters using credentials fetched from Azure.

### Google Cloud GKE Authentication

To authenticate with GKE clusters using the Google Cloud APIs:

1. Install a Runner in a VM or container that has a network path to the target GKE clusters.<br>

2. Follow the instructions in the [Google Cloud Plugins Overview](/manual/plugins/gcp-plugins-overview.md) to create a Service Account and add the credentials for this Service Account to Runbook Automation.
   :::info Pre-existing Service Account
   If Runbook Automation has already been integrated with Google Cloud, then you may not need to create a new Service Account.  Instead, add these permissions to the existing Service Account.
   :::
3. Add a Role to the Service Account that has the permissions to retrieve the cluster credentials from the GKE service:
   - **`container.clusters.get`**
   - A predefined role, such as **Kubernetes Engine Developer**, can be used for this purpose.

Now when the Runner targets the GKE clusters using the Kubernetes node-step plugins, it will be able to authenticate with the clusters using credentials fetched from Google Cloud.


### Manual Authentication Configuration

If you do not have the option to place the Runner inside the target cluster or use the Cloud Provider Integration method, you can manually configure the Kubernetes authentication.

1. Create an API token for a service account following the steps outlined [here](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/#manually-create-a-long-lived-api-token-for-a-serviceaccount).
2. Retrieve the `token` and the `ca.crt` from the secret created in the previous step: **`kubectl get secret/[secret-name] -o yaml`**.
3. Add both the `token` and the `ca.crt` to Key Storage.
4. Next, retrieve the cluster's API endpoint.  This can be found by running **`kubectl cluster-info`**.
5. Add a node to the inventory and add the following as node attributes:
   ```
   kubernetes-cloud-provider=self-hosted
   kubernetes-cluster-endpoint=<<cluster endpoint>>
   kubernetes-token-path=<<path to token in key storage>>
   kubernetes-ca-cert-path=<<path to CA cert in key storage>>
   ```

This node can now be targeted by the Kubernetes node-step plugins.
