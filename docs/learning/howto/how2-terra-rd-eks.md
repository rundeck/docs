# Deploy Rundeck on AWS EKS

![](/assets/img/terra-eks1.png)

Amazon Elastic Kubernetes Service (Amazon EKS) is a fully-managed Kubernetes service that simplifies the process of building, securing, operating, and maintaining Kubernetes clusters on AWS. Amazon EKS automatically manages the Kubernetes nodes, containers, application availability and stored cluster data.<br>
Deploying Rundeck on EKS takes advantage of Kubernetes capabilities such as auto-scaling, portability and availability.  This makes it a strong choice for cloud deployments.  Consequently, it’s common to see Rundeck implemented on Kubernetes clusters.<br>
This guide explains how to configure different tools that interact with the AWS EKS and how to deploy a basic Rundeck (or commercial Runbook Automation) deployment on an AWS EKS Cluster.<br>

## Requirements

### AWS
* A **valid AWS account** with sufficient access rights to create EKS clusters.<br>
* **AWS CLI**, a tool to interact with the AWS resources. Check the most recent version and instructions for installing it for your OS system [here](https://aws.amazon.com/cli/).<br>
* **K9S**, a tool for monitoring and interacting Kubernetes pods easily, recent version and installation instructions [here](https://k9scli.io/topics/install/).<br>

### Kubernetes
* **Kubectl**, the command line tool for working with Kubernetes clusters. Find installation instructions [here](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/).<br>
* **EKS CTL**,  the command line tool for working with EKS clusters that automates many individual tasks. Find installation instructions [here](https://docs.aws.amazon.com/en_us/eks/latest/userguide/eksctl.html).<br>
* **K9S**,  for monitoring the EKS cluster. This is optional but useful.  Learn how to install it on your operating system by visiting [this](https://k9scli.io/topics/install/) page.<br>

## Environmental Setup

### Configure the AWS CLI tool with the following command

```
aws configure
```

When prompted, provide the AWS access and secret key.<br>

### Create the EKS cluster
EKS CLI is linked to AWS CLI. If AWS CLI was configured successfully in the previous step, create an EKS cluster with the following command.<br>

```
eksctl create cluster --name oss-test-cluster --version 1.23 --region eu-north-1 --nodegroup-name test-workers --node-type t3.xlarge --nodes 3 --nodes-min 1 --nodes-max 4 --managed
```

Included parameters:<br>
`--name`: The cluster name.<br>
`--version`: The Kubernetes version. Where possible, use the latest version.<br>
`--region`: AWS region where the cluster is deployed. The example uses `eu-north-1` (Stockholm).<br>
`--nodegroup-name`: The node group name.  One or more Amazon EC2 instances deployed in an Amazon EC2 Auto Scaling group are referred to as a node group.<br>
`--node-type`: C2 image type. It is crucial to pick a type with enough resources to run.<br>
`--nodes`:  The number of worker nodes (node groups).<br>
`--nodes-mi`: Minimum number of workers (node groups).<br>
`--manage`: Creates managed nodes to use AWS EC2 instances-based nodes, managed nodes are provisioned Amazon EC2 machines that offer Auto Scaling capabilities that are managed by Amazon EKS.<br>

### Configure `kubectl` to interact with the AWS EKS cluster

#### Enter the following AWS CLI command:

```
aws eks update-kubeconfig --region eu-north-1 --name oss-test-cluster
```

### Creating the Rundeck namespace
To avoid interfering with other services, best practice is to create a different namespace than the `default` namespace.  This example used the `bangarang` namespace for the deployment.<br>

#### Create a `bangarang` namespace:

```
kubectl create namespace bangarang
```

### Set the custom namespace as the default namespace

#### Set the `bangarang` namespace as the `kubectl` default:

```
kubectl config set-context --current --namespace=bangarang
```

#### This should be reflected by `oss-test-cluster` (`bangarang` namespace) using `k9s`
![](/assets/img/terra-eks2.png)

## Deployment

### Deploying the Rundeck service

#### Create a text file named `rundeck-svc.yaml`:

```
apiVersion: v1
kind: Service
metadata:
 name: rundeck-svc
 labels:
   env: dev
spec:
 type: LoadBalancer
 ports:
 - port: 4440
 selector:
   env: dev
```

#### Deploy the service using the .yaml file:

```
kubectl apply -f rundeck-svc.yaml
```

#### Check service availability:

```
kubectl get service
```

#### Result should look like this:
![](/assets/img/terra-eks3.png)
Note: The "EXTERNAL-IP" column is the Service URL for the Rundeck deployment. Copy it for use in the next step.<br>

### Deploying Rundeck to EKS

#### Create a text file named `rundeck-deployment.yaml`:

```
apiVersion: apps/v1
kind: Deployment
metadata:
 name: rundeck
 labels:
   env: dev
spec:
 replicas: 1
 selector:
   matchLabels:
     env: dev
 template:
   metadata:
     labels:
       env: dev
   spec:
     containers:
     - name: rundeck
       image: rundeck/rundeck:4.8.0
       env:
       - name: RUNDECK_GRAILS_URL
         value: "http://service_url:4440"
       ports:
       - containerPort: 4440
```

Note: `http://service_url:4440` is the URL taken from the service URL. Use this URL to access the Rundeck instance.<br>

#### Deploy Rundeck in the EKS:

```
kubectl apply -f rundeck-deployment.yaml
```

The deployment should look as follows in `k9`:<br>
![](/assets/img/terra-eks4.png)
Rundeck is available via the service's external URL.<br>

![](/assets/img/terra-eks5.png)
### Uninstalling

#### To uninstall the Rundeck deployment use:

```
kubectl delete deployment rundeck-deployment
```

#### Destroy the Service with:

```
kubectl delete service rundeck-svc
```

## Resources
* AWS EKS [Introduction](https://eksctl.io/introduction/)<br>
* AWS CLI [Documentation](https://aws.amazon.com/cli/)<br>
* EKS CTL [Introduction](https://eksctl.io/introduction/)<br>
* Kubectl [Getting Started](https://kubernetes.io/docs/setup/)<br>
* Rundeck K8s [examples](https://github.com/rundeck/docker-zoo/tree/master/kubernetes) (DockerZoo)<br>
