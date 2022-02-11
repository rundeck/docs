# PagerDuty Incidents - Kubernetes Diagnostics

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
3. Download the sample Rundeck Job YAML from this [link](https://raw.githubusercontent.com/jsboak/rundeck_sandbox_scm/master/33ef389a-d45c-42d1-af56-3360ff0dade5.yaml?token=GHSAT0AAAAAABQRZMTKT4CBTPXLMNWR2FSIYQENPQA).
4. (Right click and select **Save Link As...** and be sure to append `.yaml` to the file name).                                                                                                                             
5. Upload the sample job to your Rundeck Enterprise instance following the instructions [here](/manual/creating-jobs.html#importing-job-definitions).
6. Edit the Job by clicking Edit This Job:
<br><br>![Edit Job](@assets/img/solutions-pd-diag-k8s-edit-job.png)<br><br>
7. Click into **Workflow** and then click into step 3 ("Post Logs to PagerDuty").
8. Click the **Select** button next to **API Key** to select your API Key from Key Storage. If you used a _User Token API Key_ for PagerDuty, then be sure to modify the email-address as well:
<br><br>![Edit Job2](@assets/img/solutions-pd-diag-k8s-step-3.png)<br><br>
9. Click **Save** on the step as well as **Save** on the Job.

::: tip Note                                                                                                                                                                                                                
This Rundeck Job is meant to be invoked from PagerDuty, not through the Rundeck GUI. There is a hidden Job Option for the PagerDuty Incident ID. If you run the Job directly from the Rundeck Interface, the Job will fail on Step 3, as it is expecting to have the PagerDuty incident ID as an input parameter.                                                                                                                                                                                                                                              
:::                                                                                                                                                                                                                                           

#### Configure Rundeck Actions                                                                                                                                                                                                           