# PagerDuty Incidents - Kubernetes Diagnostics

## Solution Summary
This solution will walk through an example of enriching PagerDuty incidents by retrieving diagnostic data from a single data-source using a Rundeck Job.
At the end of building this solution, when an incident is created in PagerDuty, users will be presented with a button to retrieve recent logs from Kubernetes pods and view those recent logs on the incident timeline.

The design principles outlined in this solution are applicable to most other use-cases for retrieving diagnostic-data or invoking remediation.

### Configuration

::: tip Solution Prerequisites

For this guide, Rundeck Enterprise must be installed and running. The provided Rundeck Job depends on the Kubernetes Plugins. 
You can install the most recent version of these plugins from [here](https://github.com/rundeck-plugins/kubernetes/releases). 
Download the `kubernetes-plugin-x.x.x.zip` file and then upload to your Rundeck instance. These plugins require the Kubernetes python library. 
You can read more about the plugin requirements [here](https://github.com/rundeck-plugins/kubernetes#requirements).

A PagerDuty account with the Rundeck Actions add-on enabled is also required.
Rundeck Actions are available as an add-on for Business and Digital Operations pricing plans. Please [contact us](https://www.pagerduty.com/contact-us/rundeck-actions-long/) if you would like to upgrade your plan or trial Rundeck Actions. 

This solution is meant to demonstrate design principles, and therefore the steps outlined in this Rundeck Job may not be applicable to your specific environment.
:::

#### Configure Rundeck Job
1. **In PagerDuty**, generate an API Access Key with (at minimum) _Responder_ permissions. 
This can either be a [General Access API Key](https://support.pagerduty.com/docs/api-access-keys#section-generate-a-general-access-rest-api-key)
or a [User Token API Key](https://support.pagerduty.com/docs/api-access-keys#section-generate-a-user-token-rest-api-key).
2. Copy the PagerDuty API Key into Rundeck's [Key Storage](/manual/system-configs.html#key-storage) as a Password or into your secrets-manager that is integrated with Rundeck.
3. Download the sample Rundeck Job YAML from this [link](https://raw.githubusercontent.com/jsboak/rundeck_sandbox_scm/master/33ef389a-d45c-42d1-af56-3360ff0dade5.yaml?token=GHSAT0AAAAAABQRZMTKT4CBTPXLMNWR2FSIYQENPQA). (Right click and select **Save Link As...** and be sure to append `.yaml` to the file name).                                                                                                                             
4. Upload the sample job to your Rundeck Enterprise instance by navigating to the **Jobs** tab, selecting **Job Actions** in the upper-right, then selecting **Upload Definition**. 
You can find more detailed instructions for upload a Job Definition [here](/manual/creating-jobs.html#importing-job-definitions).
<br><br>![Upload Job](@assets/img/solutions-pd-diag-k8s-upload-job.png)<br><br>
5. Edit the Job by clicking **Edit This Job**:
<br><br>![Edit Job](@assets/img/solutions-pd-diag-k8s-edit-job.png)<br><br>
6. Click into the **Workflow** tab and then click into **Step 3** ("Post Logs to PagerDuty").
7. Click the **Select** button next to **API Key** to select your API Key from Key Storage. If you used a _User Token API Key_ for PagerDuty, then be sure to modify the email-address as well:
<br><br>![Edit Job2](@assets/img/solutions-pd-diag-k8s-step-3.png)<br><br>
8. Click **Save** on the step as well as **Save** on the Job.

#### Configure Kubernetes Node Source
In order for the Rundeck Job to target Kubernetes Pods, the Pods should be added into the Rundeck inventory.
1. Navigate to 

::: tip Note                                                                                                                                                                                                                
This Rundeck Job is meant to be invoked from PagerDuty, not through the Rundeck GUI. There is a hidden Job Option for the PagerDuty Incident ID. If you run the Job directly from the Rundeck Interface, the Job will fail on Step 3, as it is expecting to have the PagerDuty incident ID as an input parameter.                                                                                                                                                                                                                                              
:::                                                                                                                                                                                                                                           

#### Configure Rundeck Actions 
1. Create a Rundeck User API Token by navigating to **User Icon** -> **Profile** and click the **+** next to **User API Tokens**:
<br><br>![RD Token](@assets/img/solutions-pd-diag-k8s-rd-token.png)
2. Enter a **Name** for the API Token and choose a **Role** that has the correct levels of permissions to invoke the uploaded Job.                                                                                                                                                                                                       
By default, the maximum allowed duration for a Rundeck API Token (before it expires) is 30 days. 
To optionally remove this expiration, so that API Tokens never expire, add a **Custom Config** property with `rundeck.api.tokens.duration.max`as the property name and set the value to `0`:
<br><br>![RD Token Expire](@assets/img/solutions-pd-diag-k8s-token-expiration.png)<br><br>
More details about this property and other configuration properties can be found in the documentation on [Configuration Management](/manual/configuration-mgmt/configmgmt.html#configuration-management-enterprise).
3. Go to download the Rundeck Actions Runner
4. 





