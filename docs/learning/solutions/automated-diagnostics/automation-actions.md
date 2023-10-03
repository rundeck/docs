# Automated Diagnostics

## Integrating with Automation Actions

The prebuilt Jobs in the Automated Diagnostics solution are designed to be invoked from [Automation Actions](https://www.pagerduty.com/platform/automation/actions/), though they can be invoked from within the Runbook Automation or Process Automation interface as well.  

:::tip Heads Up
The steps for configuration differ for **Runbook Automation** and **Process Automation** (self-hosted). Be sure to select the correct tab below for the applicable instructions.
:::

:::: tabs
::: tab Runbook Automation

### Create a Runbook Automation API Key

1. Click on the _**User Icon**_ in the upper-right and click on **Profile**.
2. To the right of **User API Tokens**, click **+**:
   ![RD Token](/assets/img/solutions-pd-diag-k8s-rd-token.png)<br><br>
3. Enter a **name** for the API token and click **Generate New Token**.
4. Copy the **User API Token** and keep it in a safe place for later use.

### Create an Action Runner

Next, you will add a new runner in PagerDuty to connect to Runbook Automation.
1. In PagerDuty, navigate to **Automation -> Automation Actions -> Runners tab -> +Add Runner**
2. Select **Runbook Automation** as the type of Runner and click **Next**
   <br>![](/assets/img/rbarun1.png)<br><br>
3. Enter a **Name** and **Description** and click **Next**
   <br>![](/assets/img/rbarun2.png)<br><br>
4. On the following screen, enter your **Runbook Automation Subdomain** and the **API key** you saved previously.  Optionally, associate with specific teams to limit who can use this Runner.
   <br>![](/assets/img/rbarun3.png)<br><br>
5. Click **Create Runner**
6. Check the runner’s status in PagerDuty
   <br>![](/assets/img/rbarun4.png)<br><br>
   A **green checkmark** indicates that the connection to your Runbook Automation instance was configured correctly.  
   A **red circle** indicates that the connection was unsuccessful.  In this case, make sure you typed the subdomain and API Token correctly.
   

### Define an Action
1. In PagerDuty, navigate to **Automation -> Rundeck Actions -> Add Action**:
   <br>![](/assets/img/rbactions1.png)<br><br>
2. Select your Runner and click **Next**
   <br>![](/assets/img/rbactions2.png)<br><br>
3. Select the **Third Party Service Disruptions** job from those listed and click **Next**
   <br>![](/assets/img/rbactions3.png)<br><br>
4. Review and update the **Action Name** and **Description** if desired.
5. Select one or more **Services**.  This controls which incidents will have this action.
6. If desired, select one or more **Teams**.  This limits access for this action to members of those teams.  Leave blank to make universally available in the selected services.
   <br>![](/assets/img/rbactions4.png)<br><br>
7. Click **Next**
8. Insert `-pd_incident_id ${pagerduty.incidentId}` into the **Enter arguments** field.
   <br>![](/assets/img/rbactions5.png)<br><br>
9. Click **Create Action**. This Automated Action can now be invoked from an incident or from [Event Orchestration](https://support.pagerduty.com/docs/event-orchestration):

![**Invoke from Incident**](/assets/img/rbactions6.png)

:::warning Heads Up
Although the Action can be invoked from PagerDuty, the output of the Job will not yet appear on the Incident Timeline.
Continue on to the [next section](/learning/solutions/automated-diagnostics/first-diagnostic-runbook) to complete the setup
:::

::: tab Process Automation
### Create a PagerDuty API Key
In the PagerDuty web app:

1. Navigate to **Integrations ->**  **API Access Keys** and click **Create New API Key**. 
2. Enter a **Description** that will help you identify the key later on. If you would like it to be read-only, check the **Read-only** option. 
3. Click **Create Key**. 
4. A unique **API key** will be generated. Copy it to a safe place, as you will not have access to copy this key again. Once it has been copied, click **Close**. 
   * If you lose a key you will need to delete it and create a new one.

### Create a Process Automation API Key
1. Click on the _**User Icon**_ in the upper-right and click on **Profile**.
2. To the right of **User API Tokens**, click **+**:
   <br>![RD Token](/assets/img/solutions-pd-diag-k8s-rd-token.png)<br><br>
3. Enter a **name** for the API token and click **Generate New Token**.
4. Copy the **User API Token** and keep it in a safe place for later use.

### Create an Action Runner
#### In PagerDuty
Next, you will add a new runner to generate an ID and secret.

1. In PagerDuty, navigate to **Automation -> Automation Actions -> Runners tab -> +Add Runner**
2. Select **Process Automation** as the type of Runner and click **Next**
   <br>![](/assets/img/parunner1.png)<br><br>
3. Enter a **Name** and **Description** and associate with Teams if desired.  Then click **Next**.
   <br>![](/assets/img/parunner2.png)<br><br>
4. On the following screen, click **Download ID & Secret** to download the file **`credentials.pdrunner-creds`**, and click **Create Runner**.
   <br>![](/assets/img/parunner3.png)<br><br>
#### In a text editor
1. Open **`credentials.pdrunner-creds`** in your preferred text editor, replace **`<API_Token>`** with the PagerDuty API key from step 4 above.
5. Add a line **`rundeck_url:`** followed by your Process Automation URL and a line with **`rundeck_token:`** followed by your Process Automation API Token:
```
id:XXXXXXXXXXXXXXXXXXXXXXX3P1C
secret:XXXXXXXXXXXXXXXXXXXX2I4B
token:<PagerDuty_API_TOKEN>
rundeck_url: https://<your_account>.pagerduty.runbook.cloud
rundeck_token: <Your_Saved_Process_Automation_API_TOKEN>
```
#### On your Runner machine
Install Java 11+ on the machine that will host the runner. We recommend Linux (Ubuntu 18) or higher. If the operating system is reasonably new, it is recommended to perform an update:
1. Update the Ubuntu version<br>
   `sudo apt-get update`
2. Install the open source Java version that the runner uses<br>
   `sudo apt install openjdk-11-jre-headless`
3. Create a folder in a preferred directory on your system to place the credentials files<br>
   `mkdir automation_runner`
4. Navigate into the runner’s directory<br>
   `cd automation_runner`
5. Insert the credentials file with your updates<br>
6. Rename the file to .pdrunner-creds<br>
   `mv credentials.pdrunner-creds .pdrunner-creds`
7. Download the latest runner software from PagerDuty<br>
   `wget https://runbook-actions.pagerduty.com/pd-runner.jar`
8. View current directory to see all of the files. You should see two files<br>
   `ls -larths`
9. Launch pd-runner<br>
   `java -jar pd-runner.jar &`
10. [Optional] Verify activity in `runner.log`.<br>
	`tail -f /home/ubuntu/automation_runner/runner/logs/runner.log`
11. Check the runner’s status in PagerDuty.
	<br>![](/assets/img/parunner4.png)<br><br>
	A **green checkmark** indicates that the runner is active and running successfully.
	A **red circle** indicates that the runner is not running or there is a problem with the runner. Please verify your Java 11+ installation and check the local runner logs, or refer to our [FAQ](https://support.pagerduty.com/docs/automation-actions#faq).

### Define an Action
1. In Runbook Automation, click on **Third Party Service Disruptions** in your Jobs list.
2. Click on the clipboard icon next to the job's UUID. This will copy the Job ID to your clipboard:
   <br>![](/assets/img/paactions0.png)<br><br>
3. In PagerDuty, navigate to **Automation -> Rundeck Actions -> Add Action**:
   <br>![](/assets/img/rbactions1.png)<br><br>
4. Select the Runner you installed from the list of installed runners and click **Next**.
   <br>![](/assets/img/paactions5.png)<br><br>
5. Create an Automation Action<br>
	- Type and Category<br>
	  **Select type:** Select Process Automation<br>
	  **Select category:** Diagnostic<br>
	- Define your action<br>
	  **Enter Process Automation Job ID:**<br>
	  Paste the Job UUID you copied from the Process Automation server<br>
	  **Enter Process Automation arguments:**<br>
         **`-pd_incident_id ${pagerduty.incidentId}`**<br>
	- Name and description<br>
	  Enter the desired **Name** (such as Third Party Service Disruptions) and **Description**<br>
	- Associate with Service(s)<br>
	  Select one or more **Services**.  This controls which incidents will have this action.<br>
	- Associate with team(s)<br>
	  If desired, select one or more **Teams**.  This limits access for this action to members of those teams.  Leave blank to make universally available in the selected services.
	  <br>![](/assets/img/paactions3.png)<br><br>
6. Click **Create Action**. This Automated Action can now be invoked from an incident or from [Event Orchestration](https://support.pagerduty.com/docs/event-orchestration):<br>
   ![**Invoke from Incident**](/assets/img/rbactions6.png)
:::warning Heads Up
Although the Action can be invoked from PagerDuty, the output of the Job will not yet appear on the Incident Timeline. 
Continue on to the [next section](/learning/solutions/automated-diagnostics/first-diagnostic-runbook) to complete the setup
:::

::::

[comment]: <> (### **Complete the Automated Diagnostics Solution by integrating one of the [<span style="color:green"><ins>Example Jobs!</ins></span>]&#40;/learning/solutions/automated-diagnostics/linux-diagnostics-example.html&#41;**)