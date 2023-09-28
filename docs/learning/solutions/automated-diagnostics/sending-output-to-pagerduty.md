# Automated Diagnostics

## Sending Automation Output to PagerDuty Incidents

### Introduction
By default, your automated diagnostics jobs will display their results in logging visible in the Automation interface.  There are a few extra steps necessary to transport those logs or some subset over to your PagerDuty incidents.  This section will walk you through steps to simplify output in a job and send it to a PagerDuty incident.  These steps assume that you have already completed **Tour 4: Send Diagnostic Data to PagerDuty**, which ensures that you have connected your Automation interface to your PagerDuty instance at the infrastructure level.

### Example
To carry out these steps, you’ll need a job that we can modify for our purposes.  Since most of the jobs in this Solution already have these steps completed, we’ll start with a fresh job which you can import and work with.  You can download that job [here](http://@assets/text/ssh_status.yaml).

1. In the Jobs section of your project, click **New Job**
   ![](~@assets/img/sending1.png)<br><br>
2. Click **Upload Definition**
   ![](~@assets/img/sending2.png)<br><br>
3. Click **Choose File** to select the downloaded file
   ![](~@assets/img/sending3.png)<br><br>
4. Select **YAML format**
5. Click **Upload**
6. Edit your job using the **Actions** menu at the far right of the jobs list.
   ![](~@assets/img/sending16.png)

#### Add an option for Incident ID
1. Click **Workflow** at the top of the Job Edit page
2. Toward the top of the Workflow section, click **Add an option**.<br>
   ![](~@assets/img/sending5.png)
3. Enter an **Option Name** and **Option Label** as specified in the screenshot.
   ![](~@assets/img/sending6.png)
4. Click **Save** for this option

#### Add a log filter to your job step
1. Using the **gear icon** at the right of the job step, click **Add Log Filter**
   ![](~@assets/img/sending8.png)
2. Choose **Progress Badge** from the available filters<br>
   ![](~@assets/img/sending9.png)

#### Setting your Filter
1. Set the following fields:<br>
   **Regex:** `.*Active: active.*`<br>
   **Text:** Healthy<br>
   **Status Symbol:** Select the Green Checkmark<br>
   **Context Variable:** ssh-status<br>
   ![](~@assets/img/sending10.png)<br><br>
2. **Save** your filter. You should see the log filter visually now as part of your job step.
   ![](@assets/img/sending11.png)<br><br>
3. Click the **+Add** button to add another Progress Badge filter
4. Set the following fields:<br>
   **Regex:**`!.*Active: active.*`<br>
   **Text:** Unhealthy<br>
   **Status Symbol:** Select the Red X<br>
   **Context Variable:** ssh-status<br>
   ![](~@assets/img/sending12.png)

#### Add an Incident Note job step
1. On the **Edit Job** page, click **Add a step**.<br>
   ![](~@assets/img/sending13.png)<br><br>
2. Under **Workflow Steps**, search for and select **PagerDuty Incident Note**    
   ![](~@assets/img/sending14.png)

#### Configure the Incident Note job step
1. Enter or select a PagerDuty **API Key**<br>
   If in keystore, use **Select** button.  Otherwise, you can paste the API Key in this field
2. Enter an **Email** to be used for incident updates.  If you’ve established a project variable, you can use that as specified in screenshot
3. Update the **Incident ID** field as specified in screenshot to use the _pd_incident_id_ variable
4. Update the **Note** field to include variable reference (`${data.variablename}`) as shown in screenshot.
    ```
    SSH Status: ${data.ssh-status*}\n\nClick here for detailed diagnostics: ${job.url}#output
    ```    
   This note will show the resulting progress badge as well as a link to the full log
5. Set a **Step Label** to identify what this job step does
6. Save the job step and job to save your changes<br>
   ![](~@assets/img/sending15.png)