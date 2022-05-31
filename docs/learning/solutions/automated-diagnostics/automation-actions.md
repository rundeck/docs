## Automated Diagnostics

### Integrating with Automation Actions

The prebuilt Jobs in the Automated Diagnostics solution are designed to be invoked from [Automation Actions](https://www.pagerduty.com/platform/automation/actions/), though they can be invoked from within the Runbook Automation interface.

#### Create a PagerDuty API Key
In the PagerDuty web app:

1. Navigate to **Integrations ->**  **API Access Keys** and click **Create New API Key**. 
2. Enter a **Description** that will help you identify the key later on. If you would like it to be read-only, check the **Read-only** option. 
3. Click **Create Key**. 
4. A unique **API key** will be generated. Copy it to a safe place, as you will not have access to copy this key again. Once it has been copied, click **Close**. 
   * If you lose a key you will need to delete it and create a new one.

#### Create a Runbook Automation API Key
In Runbook Automation:

1. Click on the _**User Icon**_ in the upper-right and click on **Profile**. 
2. To the right of **User API Tokens**, click **+**:
![RD Token](@assets/img/solutions-pd-diag-k8s-rd-token.png)<br><br>
3. Enter a **name** for the API token and click **Generate New Token**. 
4. Copy the **User API Token** and keep it in a safe place for later use.

#### Create an Automation Actions Runner
Next, you will add a new runner to generate an ID and secret.

1. In PagerDuty, navigate to **Automation -> Automated Actions -> Runners tab -> +Add Runner** 
2. Enter a **Name and Description** and click **Next, Generate Runner Secret & ID**. 
3. On the following screen, click **Download ID & Secret** to download the file **`credentials.pdrunner-creds`**, and click **Confirm**. 
4. Open **`credentials.pdrunner-creds`** in your preferred text editor, replace **`<API_Token>`** with the PagerDuty API key from step 4 above, and save the file:
```
id:XXXXXXXXXXXXXXXXXXXXXXX3P1C
secret:XXXXXXXXXXXXXXXXXXXX2I4B
token:<PagerDuty_API_TOKEN>
rundeck_url: https://<your_account>.pagerduty.runbook.cloud
rundeck_token: <Your_Saved_Runbook_Automation_API_TOKEN>
```
Install Java 11+ on the machine that will host the runner. We recommend Linux (Ubuntu 18) or higher. If the operating system is reasonably new, it is recommended to perform an update:
1. **`sudo apt-get update`**: Update the Ubuntu version. 
2. **`sudo apt install openjdk-11-jre-headless`**: Install the open source Java version that the runner uses. 
3. **`mkdir automation_runner`**: Create a folder in a preferred directory on your system to place the credentials files. 
4. **`cd automation_runner`**: Navigate into the runner’s directory. 
5. Insert the credentials file that was downloaded from the PagerDuty Runner menu. It should already contain the PagerDuty API key inside the file. 
6. **`mv credentials.pdrunner-creds .pdrunner-creds`**: Rename the file to .pdrunner-creds. 
7. **`wget https://runbook-actions.pagerduty.com/pd-runner.jar`**: Download the latest runner software from PagerDuty. 
8. **`ls -larths`**: View current directory to see all of the files. You should see two files from step 13. 
9. **`java -jar pd-runner.jar &`**: Launch pd-runner. 
10. [Optional] **`tail -f /home/ubuntu/automation_runner/runner/logs/runner.log`** : Verify activity in `runner.log`.

Next, check the runner’s status in PagerDuty. A **green checkmark** indicates that the runner is active and running successfully. 
A **red circle** indicates that the runner is not running or there is a problem with the runner. Please verify your Java 11+ installation and check the local runner logs, or refer to our [FAQ](https://support.pagerduty.com/docs/automation-actions#faq).

#### Define an Action

1. In Runbook Automation, click on a Job - such as **CPU, Memory & Disk to PagerDuty Incident**
2. Click on the **clipboard** icon next to the Job's UUID. This will copy the Job ID to your clipboard:
![Job ID](@assets/img/solutions-auto-diag-job-id.png)<br><br>
3. In PagerDuty, navigate to **Automation -> Rundeck Actions -> Add Action**:
<br>![Add Action](@assets/img/solutions-pd-diag-k8s-add-action.png)<br><br>
4. Fill in the Automation Action details with the desired **Name** and **Description**. 
5. Select **process automation** as the type of action and **Diagnostic** as the category.
6. Paste the jod ID into the **Job ID** field and insert `-pd_incident_id ${pagerduty.incidentId}` into the **Process Automation arguments** field:
![Add Action](@assets/img/solutions-auto-diag-define-action.png)<br><br>
7. Select the Runner you installed from the **_Find a runner_** dropdown.
8. Select one or more Services from the **_Find Services_** dropdown.
9. Select one or more Teams from the **_Find Teams_** dropdown.
10. Click **Create Action**.

This Automated Action can now be invoked from an incident or from Event Orchestration:

![**Invoke from Incident**](@assets/img/solutions-auto-diag-run-action.png)

![**Invoke from Event Orchestration**](@assets/img/solutions-auto-diag-event-orchestration.png)