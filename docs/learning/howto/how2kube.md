# Manage Kubernetes with Rundeck

[Kubernetes](https://kubernetes.io/) (K8s) is an open-source platform for managing containerized services. It is used in many environments, but particularly as part of cloud-native applications where it is important to be able to scale up and down at will.  The architecture makes scaling and recycling container based services easy.  

Kubernetes services, support, and tools are widely available and very customizable and can be used in two different ways in the context of Rundeck.  K8s can be used to automate the build and management of Rundeck as a container.  For the purposes of this article, we’ll be focused on the more common way to use Kubernetes and Rundeck together, managing a complete Kubernetes cluster environment.

The article is written assuming use of Rundeck Community, our open-source offering, but can also be done using the commercial version, [PagerDuty Runbook Automation](https://www.pagerduty.com/platform/automation/process-software/).

## Kubernetes and Rundeck

Rundeck uses the [Kubernetes workflow step plugin](https://github.com/rundeck-plugins/kubernetes) to manage K8s.  In this guide, we explain how to configure the plugin, how to manage pods as nodes, and how to use the workflow steps to interact with Kubernetes components.

## Prerequisites for This Tutorial

1. **Minikube as a local Kubernetes cluster**<br>
 Minikube is a local Kubernetes implementation and it’s an easy way to learn Kubernetes using any computer.<br>
 To install Minikube on Linux, download and copy the binary to`/usr/local/bin/` path with the correct permissions:<br>
	```
  	$ curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
  	$ sudo install minikube-linux-amd64 /usr/local/bin/minikube
  	```
 	Click [here](https://minikube.sigs.k8s.io/docs/start/) to learn more about the minikube installation. Minikube can be configured using a specific driver (such as docker, VirtualBox, qemu, etc.). An easy way to get started is to run using Virtualbox on a local machine. After [installing Virtualbox](https://itsfoss.com/install-virtualbox-ubuntu/), you can launch minikube in the following way:<br>
 	```
 	minikube start --driver=virtualbox
 	```
1. Kubectl to interact with minikube<br>
 Kubectl is a command-line tool for interacting with minikube. Click [here](https://kubernetes.io/docs/tasks/tools/#kubectl) to learn how to install Kubectl<br>
1. K9s for cluster monitoring (optional)<br>
 K9s is a tool focused on monitoring and interacting with the cluster. Click [here](https://k9scli.io/topics/install/) to learn how to install K9s<br>
1. Rundeck<br>

## Kubernetes Rundeck Plugin Prerequisites

1. Python3<br>
1. Kubernetes pip module<br>
Can be installed with<br>
	```
	pip3 install kubernetes
	```

## Installing the Kubernetes Plugin in Rundeck

1. Go to the System Menu > Plugins > Upload plugin<br>
![](/assets/img/kube1.png)<br>
1. Put in the latest version .zip file full URL path here.<br>
![](/assets/img/kube2.png)<br>
1. Click on the "install" button.<br>

## Kubernetes Model Source

To manage K8s pods as nodes, it's necessary to add the Kubernetes model source.<br>
1. Go to Project Settings > Edit Nodes<br>
![](/assets/img/kube3.png)<br>
1. Click on the “Add a new Node Source +" button.<br>
![](/assets/img/kube4.png)<br>
1. From the list select "Kubernetes / Pods / Resource model"<br>
1. Save<br>
	![](/assets/img/kube5.png)<br>
	:::tip
	By default and if authentication parameters are not set, the plugin will check the file `~/.kube/config` to get the authentication parameters.<br>
	Otherwise, you can set the following parameters:<br>
	 * **Kubernetes Config File Path**: a custom path for the Kubernetes config file<br>
	 * **Cluster URL**: Kubernetes Cluster URL<br>
	 * **Kubernetes API Token**: Token to connect to the Kubernetes API<br>
	 * **Verify SSL**: Enable/disable the SSL verification<br>
	 * **SSL Certificate Path**: SSL certificate path for SSL connections<br>
	:::
1. Create a file named `deployment.yaml` with the following content:<br>
	```
	apiVersion: apps/v1
	kind: Deployment
	metadata:
 	 name: nginx-deployment
 	 labels:
   	   app: nginx
	spec:
 	 replicas: 1
	 selector:
  	   matchLabels:
     	 app: nginx
 	template:
   	  metadata:
        labels:
          app: nginx
   	  spec:
     	containers:
     	- name: nginx
       	  image: nginx:1.15.4
          ports:
          - containerPort: 80
	```
1. Deploy the test deployment with the following command:<br>
	```
	kubectl apply -f ./deployment.yaml
	```
1. Check if the deployment is running with k9s (just run the `k9s` command).<br>
![](/assets/img/kube6.png)<br>
1. Go back to Rundeck and refresh the Rundeck model source<br>
![](/assets/img/kube7.png)<br>
1. Now go to the Commands section and select the Kubernetes pod in the node filter and put any command.<br>
![](/assets/img/kube8.png)<br>

## Kubernetes Workflow Steps<br>

Next, we’ll simulate a simple deployment using the `Kubernetes / Generic / Create` workflow step, carrying out a MySQL database deployment:<br>
1. Create a new Job and give it a name.<br>
1. Select the first Kubernetes step: `Kubernetes / Generic / Create`.<br>
![](/assets/img/kube9.png)<br>
1. Go to the "YAML String" textbox and add the following YAML content.<br>
	```
	apiVersion: apps/v1
	kind: Deployment
	 metadata:
     	 labels:
       	   app: mysql
   	   spec:
        containers:
        - image: mysqapiVersion: apps/v1
	kind: Deployment
	metadata:
 	 name: mysql
 	 labels:
   	   app: mysql
	spec:
 	 selector:
   		matchLabels:
     	  app: mysql
 	 strategy:
   	  type: Recreate
	 template:
	l:5.6
          name: mysql
          env:
          - name: MYSQL_ROOT_PASSWORD
          value: password
	```
1. Save the job and run.<br>
![](/assets/img/kube10.png)<br>
1. Run k9s to see that the new deployment is available on the minikube cluster:<br>
![](/assets/img/kube11.png)<br>
1. The new deployment is added to the nodes section. Now it's possible to dispatch commands against the pods or create jobs against them.<br>
![](/assets/img/kube11.png)<br>

## Other Available Workflow Steps

The following plugins allow you to deploy/un-deploy applications and run/re-run jobs on Kubernetes. For example, you can create a deployment, services, ingress, etc., and update or delete those Kubernetes resources.<br>
1. _Create / Update / Delete / Check / Wait a Deployment_<br>
These steps manage Kubernetes Deployment resources.  You can create, update or delete a deployment and check its status.<br>
1. _Create / Update / Delete Services_<br>
These steps manage Kubernetes Service resources. You can create, update or delete a service.<br>
1. _Create / Delete / Re-run Jobs_<br>
These steps manage Kubernetes Job resources. You can create or delete a Job.<br>
