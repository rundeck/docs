# Custom Plugins on the Enterprise Runner

Enterprise Runners allow remote execution and workflow orchestration close to target infrastructure. To extend Runbook Automation functionality, customers can [develop their own custom plugins](/developer/). The Enterprise Runner supports the following plugin types:

* Node Step
* Workflow Step
* Node Source
* Key Storage
* Node Executor
* File Copier

The installation process varies depending on how the Runner is deployed: on a virtual machine, in a Docker container, or in Kubernetes. This article provides clear instructions for each deployment model.

:::warning Only Available on Runbook Automation Self-Hosted
The custom plugin feature is only available on the self-hosted version of Runbook Automation. It is not available on the cloud version.
:::

## Prerequisites

1. In order for the plugin to be configurable in the GUI, the plugin must also be uploaded to the server.  This can be done through the GUI ([example](/learning/howto/how2kube.md#installing-the-kubernetes-plugin-in-rundeck)) or manually [copying the plugin artifacts](/administration/configuration/plugins/installing.md) to the plugins directory.
2. The server and Runner must be on version `5.0.0` or later.

**Currently this is only supported on Self-Hosted versions of Runbook Automation.**

## Adding Plugins to a Runner Deployed on a Virtual Machine

When the Enterprise Runner is installed on a virtual machine (VM) or traditional server platform:

1. Locate the Runner Installation Directory. This is the directory where the Runner JAR was initialized.
2. Copy Your Plugin to the `plugins` Directory
   * Place your `.jar` or `.zip` plugin file into the following directory: `/runner/plugins`

Example:
**`cp my-custom-plugin.zip /runner/plugins/`**

3. Verify Plugin Upload: 
   * For Job step plugins: create a simple Job that uses your custom-plugin and that targets the Runner’s host node. The Job output should indicate that the step was executed on the Runner and the logs should be the logs from your custom plugin.

## Adding Plugins to a Runner Deployed in Docker
   
When running the Enterprise Runner as a Docker container, plugin management involves volume mounts or custom image builds.

#### Manual Injection Using docker cp

Start the Runner container normally using your `docker-compose.yml` or `docker run`.
Copy the plugin into the container:

`docker cp ./my-custom-plugin.zip <container-name>:/app/runner/plugins/`

#### Custom Docker Image

Create a Dockerfile:
```
FROM rundeckpro/runner:5.10-RBA-<your-version> # Replace <your-version> with the appropriate version identifier for your deployment.
COPY my-custom-plugin.zip /app/runner/plugins/
```

Build the image:
`docker build -t my-custom-runner .`
Update your `docker-compose.yml`:
`image: my-custom-runner`
Deploy your container with the custom image.

#### Adding Plugins to a Runner Deployed in Kubernetes

Kubernetes requires a more declarative and orchestrated approach. The best pattern is to use an init container to copy your plugin into the Runner's plugins directory.

**Prerequisites**: 
* You have your plugin file - such as `my-custom-plugin.zip` or `my-custom-plugin.jar`.
* Your Runner is deployed as a Pod or Deployment.

Step-by-Step (Init Container Approach):
1. Create a ConfigMap from Your Plugin:
    ```
   kubectl create configmap my-plugin-configmap \
    --from-file=my-plugin.zip=./my-plugin.zip
   ```
2. Modify Your Pod or Deployment YAML
    ```yaml
    apiVersion: v1
    kind: Pod
    metadata:
      name: rundeck-runner
    spec:
      volumes:
        - name: plugin-volume
          emptyDir: {}
        - name: plugin-source
          configMap:
            name: my-plugin-configmap
    
      initContainers:
        - name: plugin-init
          image: busybox
          command: ["/bin/sh", "-c"]
          args:
            - cp /plugin-src/my-plugin.zip /plugins/
          volumeMounts:
            - name: plugin-source
              mountPath: /plugin-src
            - name: plugin-volume
              mountPath: /plugins
    
      containers:
        - name: rundeck-runner
          image: rundeckpro/runner:5.10-RBA-<your-version>
          env:
            - name: RUNNER_RUNDECK_SERVER_TOKEN
              value: "<your-token>"
            - name: RUNNER_RUNDECK_SERVER_URL
              value: "https://your.rundeck.server"
            - name: RUNNER_RUNDECK_CLIENT_ID
              value: "<client-id>"
            - name: RUNNER_LOG_OUTPUT
              value: "console"
          volumeMounts:
            - name: plugin-volume
              mountPath: /app/runner/plugins    
    ```

This setup ensures your plugin is present before the main Runner container starts.
Alternate: Build a Custom Runner Image for Kubernetes
Use this if you manage images via CI/CD or need to version-control plugin sets.
```
FROM rundeckpro/runner:5.10-RBA-<your-version>
COPY my-custom-plugin.zip /app/runner/plugins/
```

Then push to your container registry and update your Kubernetes deployment to use the new image.

