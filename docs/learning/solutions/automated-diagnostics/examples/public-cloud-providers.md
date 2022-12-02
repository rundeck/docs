# Automated Diagnostics


## Public Cloud Providers

For individuals responding to incidents in the public cloud, useful diagnostics can be retrieved from the public-cloud provider about the health of the platform services as well as from the infrastructure and applications running on the public cloud provider.
This section outlines methods for retrieving diagnostics from the public cloud providers’ platform services.
If you’re looking for details on retrieving diagnostics from the OS, applications and databases, refer to their respective sections.

### AWS
For AWS users, some examples of diagnostics would be:
* Check the health of all EC2 instances behind an Application Load Balancer (ALB) or Elastic Load Balancer (ELB).
* Retrieve reasons for stopped ECS tasks.
* Look in CloudWatch logs for operating-system and application errors.

There are multiple plugins that allow users to pull diagnostics from common AWS Services:

* [Query CloudWatch Logs](/manual/workflow-steps/aws-cloudwatch.html#amazon-cloudwatch-logs-workflow-step-plugins)
![Query CloudWatch Logs](@assets/img/aws-cloudwatch-logs-query-string.png)
* [Query Athena tables](/manual/workflow-steps/amazon-athena.html#amazon-athena-query-workflow-step)
* [Check ELB Targets Status](/manual/workflow-steps/aws-elb-workflow-plugin.html#target-group-instance-statuses)
* [Retrieve failed ECS container messages](/manual/workflow-steps/aws-ecs-fargate.html#stopped-ecs-tasks-error-messages)
* [Invoke script via Lambda](/manual/workflow-steps/aws-lambda.html#aws-lambda-workflow-steps) 
![Lambda Function Job Step](@assets/img/aws-custom-lambda-code.png)

In addition to using the AWS Plugins, it is also possible to harness the AWS CLI within your Automation Instance:
                                                                                 
![AWS CLI in a Job Step](@assets/img/aws-cli-job-step.png)

If using Process Automation (on-premise), or a [**Runner**](/administration/runner), then you can also execute scripts that leverage the AWS SDK, such as Boto3 for python.
 
These multiple methods of communication with AWS allow you to be flexible in your approach for retrieving Diagnostics or managing your AWS environments.
                    
### Azure

For users of Azure, the most common method of retrieving diagnostics from the public cloud platform is by “wrapping around” the Azure CLI using the Command Job Step plugin.
As an example, you may want to retrieve the health of a Function App:

```
az monitor metrics list --resource myresource --resource-group myresourcegroup --resource-type "Microsoft.Web/sites" --metric "HealthCheckStatus" --interval 5m
```

![Azure CLI checks health of Function App](@assets/img/azure-cli-health-function-app.png)

Another example would be to check the health of an Azure container registry:

![Azure CLI checks errors in Container Registry](@assets/img/azure-cli-container-registry-health.png)

:::tip Point of Interest
Azure has a full article [here](https://learn.microsoft.com/en-us/azure/container-registry/container-registry-check-health) dedicated to diagnosing Container Registry behavior.  
A diagnostic runbook could incorporate the <br>**`az acr check-health`** command and translate the output using the error codes found in [this article](https://learn.microsoft.com/en-us/azure/container-registry/container-registry-health-error-reference).
:::

There are multiple plugins that allow users to pull diagnostics from Azure services:

* [**Azure Node Source**](/manual/projects/resource-model-sources/azure.html#azure-node-source)
* [**Azure Node Health Checks**](/manual/healthcheckplugins/azure-healthcheck.html#azure-health-check-enterprise-only)

### Google Cloud Platform (GCP)                                                   

For users of Google Cloud Platform (GCP), the most common method of retrieving diagnostics from the public cloud platform is by “wrapping around” the **gcloud CLI** using the **Command** Job Step plugin.
As an example, you can retrieve the current health status of instances in a backend service:

![Gcloud CLI checks backend instances health](@assets/img/gcloud-check-instances-health.png)

:::tip Point of Interest
This blog from Google Cloud on [**Debugging Health Checks in Load Balancing**](https://cloudplatform.googleblog.com/2015/07/Debugging-Health-Checks-in-Load-Balancing-on-Google-Compute-Engine.html) on Google Compute Engine outlines a number of steps for diagnosing Health Check failures.  
These steps can be treated as a runbook and “transposed” into your Automation instance using the Remote Command
:::

 There are multiple plugins that allow users to pull diagnostics from Azure services:
* [**GCP Compute Engine - Node Source**](/manual/projects/resource-model-sources/gcp.html)
* [**GCP Compute Engine - Health Check**](/manual/healthcheckplugins/gcp-compute-healthcheck.html)
