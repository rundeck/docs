# Automated Diagnostics - Kubernetes Logs

## Solution Summary
This solution will walk through an example of enriching PagerDuty incidents by retrieving diagnostic data from a single data-source using a Rundeck Job.
At the end of building this solution, when an incident is created in PagerDuty, users will be presented with a button to retrieve recent logs from Kubernetes pods and view those recent logs on the incident timeline.

The design principles outlined in this solution are applicable to most other use-cases for retrieving diagnostic-data or invoking remediation.

### Configuration

::: tip Solution Prerequisites

For this guide, Rundeck Enterprise must be installed and running.

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
6. Click into the **Workflow** tab and then in the **Options** section, select the `k8s_selector` option, and modify the selector to determine which pods to pull logs from:
<br><br>![Edit Selector](@assets/img/solutions-pd-diag-k8s-selector.png)<br>
<br>![Edit Selector2](@assets/img/solutions-pd-diag-k8s-modify-selector.png)<br><br>
7. Click into **Step 2** ("Post Logs to PagerDuty").  Click the **Select** button next to **API Key** to select your API Key from Key Storage. If you used a _User Token API Key_ for PagerDuty, then be sure to modify the email-address as well:
<br><br>![Edit Job2](@assets/img/solutions-pd-diag-k8s-step-2.png)<br><br>
8. Click **Save** on the step as well as **Save** on the Job.

::: tip Note
This Rundeck Job is meant to be invoked from PagerDuty, not through the Rundeck GUI. There is a hidden Job Option for the PagerDuty Incident ID. If you run the Job directly from the Rundeck Interface, the Job will fail on Step 2, as it is expecting to have the PagerDuty incident ID as an input parameter.
:::                                                                                                                                                                                                                                           
                                                        
#### Configure Rundeck Actions 
1. Create a Rundeck User API Token by navigating to **User Icon** -> **Profile** and click the **+** next to **User API Tokens**:
<br><br>![RD Token](@assets/img/solutions-pd-diag-k8s-rd-token.png)
2. Enter a **Name** for the API Token and choose a **Role** that has the correct levels of permissions to invoke the uploaded Job.                                                                                                                                                                                                       
By default, the maximum allowed duration for a Rundeck API Token (before it expires) is 30 days. 
To optionally remove this expiration, so that API Tokens never expire, add a **Custom Config** property with `rundeck.api.tokens.duration.max`as the property name and set the value to `0`:
<br><br>![RD Token Expire](@assets/img/solutions-pd-diag-k8s-token-expiration.png)<br><br>
More details about this property and other configuration properties can be found in the documentation on [Configuration Management](/manual/configuration-mgmt/configmgmt.html#configuration-management-enterprise).
3. Follow the instructions outlined [here](https://support.pagerduty.com/docs/rundeck-actions#create-a-runner) to install and configure the PagerDuty Actions Runner. 
Optionally use the PagerDuty API Token generated earlier for the Rundeck Job, or generate a new API Token - this token needs **Read Only** permissions. 
4. Use the API Token generated in **Step 1** and the Rundeck URL to fill in the `rundeck_token` and `rundeck_url` fields in the `pdrunner-creds` configuration file.
5. In Rundeck, copy the Job ID from the job invocation page:
<br><br>![Job ID](@assets/img/solutions-pd-diag-k8s-job-id.png)<br><br>
6. In PagerDuty, navigate to **Automation -> Rundeck Actions -> Add Action**:
<br><br>![Add Action](@assets/img/solutions-pd-diag-k8s-add-action.png)<br><br>
7. Fill in the Automation Action details with the desired Name and Description. Select **rundeck** as the type of action and **Diagnostic** as the category.  
Paste the jod ID into the **Job ID** field and insert `pd_incident_id ${pagerduty.incidentId}` into the **Rundeck arguments** field:
<br><br>![Action Details](@assets/img/solutions-pd-diag-k8s-pd-action.png)<br><br>
8. Select the Runner that you installed from **Step 3** and then select the same Kubernetes service associated with the Kubernetes Selector from **Step 6** of configuring the Rundeck Job.  

#### Run the Auto-Diagnostics Action from PagerDuty Incident
When incidents are created on the Service associated with the Rundeck Action, there will now be an option in the **Run Actions** dropdown that will trigger the Rundeck Job and post the Kubernetes Logs to the incident timeline:
<br><br>![Run Action](@assets/img/solutions-pd-diag-k8s-run-action.png)<br><br>


