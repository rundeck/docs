# Automated Diagnostics - Kubernetes Logs

## Solution Summary
This solution will walk through an example of enriching PagerDuty incidents by retrieving diagnostic data from a single data-source using a Rundeck Job.
At the end of building this solution, when an incident is created in PagerDuty, users will be presented with a button to retrieve recent logs from Kubernetes pods and view those logs from within the PagerDuty user-interface.

The design principles outlined in this solution are applicable to most other use-cases for retrieving diagnostic-data or invoking remediation.

::: tip Solution Prerequisites

For this guide, Runbook Automation or Rundeck Community must be installed and running. Instructions for both products are provided below.

A PagerDuty account with the **Automation Actions** add-on enabled is also required.
Automation Actions is available as an add-on for Business and Digital Operations pricing plans. Please [contact us](https://www.pagerduty.com/contact-us/rundeck-actions-long/) if you would like to upgrade your plan or to trial Automation Actions.

This solution is meant to demonstrate design principles, and therefore the steps outlined in this Rundeck Job may not be applicable to your specific environment.
:::


### Configure Rundeck Job
::: tabs
@tab Runbook Automation
1. **In PagerDuty**, generate an API Access Key with (at minimum) _Responder_ permissions.
This can either be a [General Access API Key](https://support.pagerduty.com/docs/api-access-keys#section-generate-a-general-access-rest-api-key)
or a [User Token API Key](https://support.pagerduty.com/docs/api-access-keys#section-generate-a-user-token-rest-api-key).
2. Copy the PagerDuty API Key into Rundeck's [Key Storage](/manual/system-configs.html#key-storage) as a Password or into your secrets-manager that is integrated with Rundeck.
3. Download the sample Rundeck Job YAML from this [link](https://raw.githubusercontent.com/rundeckpro/welcome-project/main/runbooks/yaml/solutions/Auto-Diagnostics__-_Kubernetes_Logs.yaml).
(Right click and select **Save Link As...** and be sure to append `.yaml` to the file name). **Note** that this Job definition will only work with Rundeck _Enterprise_. Click the **Rundeck Community** tab if you are using Rundeck Community.                                                                                                                             
4. Upload the sample job to your Runbook Automation instance by navigating to the **Jobs** tab, selecting **Job Actions** in the upper-right, then selecting **Upload Definition**.
You can find more detailed instructions for uploading a Job Definition [here](/manual/creating-jobs.html#importing-job-definitions).
<br><br>![Upload Job](/assets/img/solutions-pd-diag-k8s-upload-job.png)<br><br>
5. Edit the Job by clicking **Edit This Job**:
<br><br>![Edit Job](/assets/img/solutions-pd-diag-k8s-edit-job.png)<br><br>
6. Click into the **Workflow** tab and then in the **Options** section, select the `k8s_selector` option, and modify the selector to determine which pods to pull logs from:
<br><br>![Edit Selector](/assets/img/solutions-pd-diag-k8s-selector.png)<br>
<br>![Edit Selector2](/assets/img/solutions-pd-diag-k8s-modify-selector.png)<br><br>
7. Click into **Step 2** ("Post Logs to PagerDuty").  Click the **Select** button next to **API Key** to select your API Key from Key Storage. If you used a _User Token API Key_ for PagerDuty, then be sure to modify the email-address as well:
<br><br>![Edit Job2](/assets/img/solutions-pd-diag-k8s-step-2.png)<br><br>
8. Click **Save** on the step as well as **Save** on the Job.
::: tip Note
This Rundeck Job is meant to be invoked from PagerDuty, not through the Rundeck GUI. There is a hidden Job Option for the PagerDuty Incident ID.
If you run the Job directly from the Rundeck Interface, the Job will fail on Step 2, as it is expecting to have the PagerDuty incident ID as an input parameter.
@tab Rundeck Community
9. Download the sample Rundeck Job YAML from this [link](https://raw.githubusercontent.com/rundeck/welcome-project-community/main/runbooks/yaml/Solutions/Auto-Diagnostics_-_Kubernetes_Logs.yaml).
   (Right click and select **Save Link As...** and be sure to append `.yaml` to the file name). You can find more detailed instructions for uploading a Job Definition [here](/manual/creating-jobs.html#importing-job-definitions).
10. Edit the Job by clicking **Edit This Job**:
<br><br>![Edit CMNTY Job](/assets/img/solutions-pd-diag-k8s-edit-cmnty-job.png)<br><br>
11. Click into the **Workflow** tab and then in the **Options** section, select the `k8s_selector` option, and modify the selector to determine which pods to pull logs from:
<br><br>![Edit Selector CMNTY](/assets/img/solutions-pd-diag-k8s-modify-selector-cmnty.png)<br>
<br>![Edit Selector2](/assets/img/solutions-pd-diag-k8s-modify-selector.png)<br><br>
12. Optionally change the Kubernetes Namespace Job Option if the pods are running in a namespace other than "default".
13. Click **Save** on the Job-Options as well as **Save** on the Job.
14. Navigate to the **Webhooks** tab, and click **Create Webhook** in the upper-right:
<br>![Create webhook](/assets/img/solutions-pd-diag-k8s-webhook.png)<br>
15. Provide a **Name** for this webhook - such as _Kubernetes Auto-Diagnostics_
16. In the **Handler Configuration** tab, click **Choose Webhook Plugin** -> **Run Job**.
17. Click on **Choose a Job** -> **Auto-Diagnostics - Kubernetes Logs** and then click **Save**:
<br>![Webhook Config](/assets/img/solutions-pd-diag-k8s-webhook-config.png)<br>
<br>![Save Webhook](/assets/img/solutions-pd-diag-k8s-save-webhook.png)<br>
:::

### Configure PagerDuty Automation Actions
:::tip PagerDuty Automation Actions Architecture
The PagerDuty Automation Actions Runner is installed in your environment and requires **outbound-only** access to the PagerDuty SaaS platform as well as bi-directional communication with your Rundeck instance.
You do not need to allow for any inbound protocols from PagerDuty to your infrastructure.
:::tabs
@tab Runbook Automation
1. Create a Rundeck User API Token by navigating to **User Icon** -> **Profile** and click the **+** next to **User API Tokens**:
<br><br>![RD Token](/assets/img/solutions-pd-diag-k8s-rd-token.png)
2. Enter a **Name** for the API Token and choose a **Role** that has the correct levels of permissions to invoke the uploaded Job.
3. Follow the instructions outlined [here](https://support.pagerduty.com/docs/rundeck-actions#create-a-runner) to install and configure the PagerDuty Actions Runner.
Optionally use the PagerDuty API Token generated earlier for the Rundeck Job, or generate a new API Token - this token needs **Read Only** permissions.
4. Use the API Token generated in **Step 1** and the Rundeck URL to fill in the `rundeck_token` and `rundeck_url` fields in the `pdrunner-creds` configuration file.
5. In Rundeck, copy the Job ID from the job invocation page:
<br><br>![Job ID](/assets/img/solutions-pd-diag-k8s-job-id.png)<br><br>
6. In PagerDuty, navigate to **Automation -> Rundeck Actions -> Add Action**:
<br><br>![Add Action](/assets/img/solutions-pd-diag-k8s-add-action.png)<br><br>
7. Fill in the Automation Action details with the desired Name and Description. Select **rundeck** as the type of action and **Diagnostic** as the category.  
Paste the job ID into the **Job ID** field and insert `-pd_incident_id ${pagerduty.incidentId}` into the **Rundeck arguments** field:
<br><br>![Action Details](/assets/img/solutions-pd-diag-k8s-pd-action.png)<br><br>
8. Select the Runner that you installed from **Step 3** and then select the same Kubernetes service associated with the Kubernetes Selector from **Step 6** of configuring the Rundeck Job.  
@tab Rundeck Community
9. Create a Rundeck User API Token by navigating to **User Icon** -> **Profile** and click the **+** next to **User API Tokens**:
   <br><br>![RD Token](/assets/img/solutions-pd-diag-k8s-rd-token.png)
10. Enter a **Name** for the API Token and choose a **Role** that has the correct levels of permissions to invoke the uploaded Job.
11. Follow the instructions outlined [here](https://support.pagerduty.com/docs/rundeck-actions#create-a-runner) to install and configure the PagerDuty Actions Runner.
    Optionally use the PagerDuty API Token generated earlier for the Rundeck Job, or generate a new API Token - this token needs **Read Only** permissions.
12. Create a file named `rundeck_api_token` in the `rundeck_runner` folder you created as part of installing the PagerDuty Actions runner (in step 3) and paste the Rundeck API Token from Step 1 into this file.
13. In PagerDuty, navigate to **Automation -> Rundeck Actions -> Add Action**:
<br><br>![Add Action](/assets/img/solutions-pd-diag-k8s-add-action.png)<br><br>
14. Fill in the Automation Action details with the desired Name and Description. Select **script** as the type of action and **Diagnostic** as the category.
<br><br>![Action Config](/assets/img/solutions-pd-diag-k8s-add-script-action.png)<br><br>
15. Copy and paste the following script into the text-box for the **Define your action**:
    :::warning Notice
    This script is for demonstrating the design-principles of integrating PagerDuty's Automation Actions with Rundeck Community. It is not officially supported by PagerDuty or Rundeck.
    :::
    ```
    token=$(cat ~/rundeck_runner/rundeck_api_token)

    #CHANGE URL: change the URL below with the webhook URL copied from the previous section.
    webhookURL="http://localhost:4440/api/40/webhook/deSakGriNINKz91hnfOQYrGsEZNUekFs#Kubernetes_Auto-Diagnostics"

    execId=$(curl -s -X POST $webhookURL |  jq -r '.executionId')

    #change "localhost" here as well if the Actions Runner is not running on the same host as Rundeck Community.
    responseURL="http://localhost:4440/api/40/execution/$execId/output?authtoken=$token"

    sleep 2

    curl -s -H "Accept: text/plain"  $responseURL
    ```
16. Copy the **Post URL** from the Webhook created in the **Configure Rundeck Job** section, and replace it as the `webhookURL` variable in the script above:
<br>![Webhook URL](/assets/img/solutions-pd-diag-k8s-webhook-url.png)<br>
17. In the **Identify where this action will be run** section, select the Runner that you installed in Step 3.
18. Select the PagerDuty Services and Teams that should be associated with this action.
The PagerDuty Service selected here will ideally align with the `k8s_selector` you defined in the **Configure Rundeck Job** section.
<br><br>![Action Runner Config](/assets/img/solutions-pd-diag-k8s-script-location.png)<br><br>
19. Click **Create Action**.
:::

### Run the Auto-Diagnostics Action from PagerDuty Incidents
When incidents are created on the Service associated with the Rundeck Action, there will now be an option in the **Run Actions** dropdown that will trigger the automation configured in the prior sections to retrieve Kubernetes Logs:
::::tabs
@tab Enterprise
1. Click on the **Run Actions** dropdown, and then click the automation-action configured in the prior section:
<br><br>![Run Action](/assets/img/solutions-pd-diag-k8s-run-action.png)<br><br>
This will post the diagnostic-data to the PagerDuty incident timeline:
<br><br>![Timeline Output](/assets/img/solutions-pd-diag-k8s-timeline-output.png)<br><br>
@tab Community
2. Click on the **Run Actions** dropdown, you are now presented with the option to invoke the shell-script you configured in this solution.
<br><br>![Run Script](/assets/img/solutions-pd-diag-k8s-run-script.png)<br><br>
3. This will present you with a popup to run the specified script-actions. Click **Run Script**:
<br><br>![Confirm Run Script](/assets/img/solutions-pd-diag-k8s-confirm-run-script.png)<br><br>
4. On the Incident Timeline, click on the **output report** hyperlink to watch the progress of the script-action and view the subsequent output:
<br><br>![View Report](/assets/img/solutions-pd-diag-k8s-view-report.png)<br>
<br>![View Output](/assets/img/solutions-pd-diag-k8s-view-output.png)<br><br>
:::
