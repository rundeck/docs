# Invoking Scripts to Enrich Incidents

## Solution Summary
There are many cases where enriching incidents with "diagnostic data" can be accomplished with existing scripts, but those scripts must be invoked from within your secure environment.
PagerDuty's [Automation Actions](https://www.rundeck.com/rundeck-actions) provides a fast and simple method for invoking commands and scripts from '_behind the firewall_' right from within the PagerDuty user-interface.

This solution provides instructions for setting up Automation Actions to retrieve and invoke a script from Github in order to reduce investigation and troubleshooting time.

## Create Automation Actions Runner
:::tip Prerequisites
In order to install the Automation Actions runner, you must have a server available where you can install Java 11+. Linux is the recommended operating system, though you can optionally run the Automation-Actions Jar in a container.
:::

### Download Runner Credentials File
1. **Create a PagerDuty API Key**
    * In the PagerDuty web app, navigate to **Integrations** -> **API Access Keys** and click **Create New API Key**.
    * Enter a **Description** that will help you identify the key later on. If you would like it to be read-only, check the **Read-only** option.
    * Click **Create Key**
    * A unique **API key** will be generated. Copy it to a safe place, as you will not have access to copy this key again. Once it has been copied, click **Close**.
        * If you lose a key you will need to delete it and create a new one.
2. In PagerDuty, navigate to **Automation** -> **Rundeck Actions** -> **Runners** tab -> **+Add Runner**
3. Enter a **Name** and **Description** and click **Next**, then **Generate Runner Secret & ID**.
4. On the following screen, click **Download ID & Secret** to download the file `credentials.pdrunner-creds`, and click **Confirm**.
5. Open `credentials.pdrunner-creds` in your preferred text editor, replace `<API_Token>` with the PagerDuty API key from step 1 above, and save the file:
    ```
    id:XXXXXXXXXXXXXXXXXXXXXXX3P1C
    secret:XXXXXXXXXXXXXXXXXXXX2I4B
    token:<PagerDuty_API_TOKEN>
    rundeck_url: http://localhost:4440
    rundeck_token: <Your_Saved_RUNDECK_API_TOKEN>
    ```

### Deploy Runner
1. [Optional] Update the machine where you will install the runner `sudo apt-get update` (Debian) or `sudo yum update` (RHEL/CentOS).
2. If you have not installed Java 11+ yet, install it with `sudo apt install openjdk-11-jre-headless`.
3. `mkdir rundeck_runner`: Create a folder in a preferred directory on your system to place the credentials files.
4. `cd rundeck_runner`: Navigate into the runner’s directory.
5. Copy the credentials file that was downloaded from the PagerDuty Runner menu in the last section. It should already contain the PagerDuty API key inside the file.
6. `mv credentials.pdrunner-creds .pdrunner-creds`: This will rename the file to `.pdrunner-creds`. Make sure that this file is in the `rundeck_runner` directory.
7. `wget https://runbook-actions.pagerduty.com/pd-runner.jar`: Download the latest runner software from PagerDuty.
8. `java -jar pd-runner.jar &`: Launch pd-runner in detached mode.
9. [Optional] Verify activity in runner.log:
    * `tail -f /home/ubuntu/rundeck_runner/runner/logs/runner.log`
10. Check the runner’s status in PagerDuty. A green checkmark indicates that the runner is active and running successfully. A red circle indicates that the runner is not running or there is a problem with the runner:
    <br><br>![runner-status](/assets/img/solutions-raw-script-runner-status.png)<br>

## Create Diagnostic Data Automation Action
Once the runner is running successfully, you can add an action.
<br>
1. In PagerDuty, select the **Actions** tab and click **Add Action**
2. Enter the desired values for the **Name** and **Describe the Action** fields.
3. Use the **Script** type for the _Select Type_ dropdown.
4. Use the **Diagnostic** options for the _Type of Action_ dropdown:
   <br>![action-options](/assets/img/solutions-raw-script-action-options.png)<br><br>
5. In the **Define Your Action** field, you have the option to edit and execute a raw script here, or use commands to pull a script (e.g. from Github), then invoke and delete it from the Runner.
   :::warning Notice
   These scripts are sample code to demonstrate the different ways you can implement Automation Actions. They are not meant for use within your production environment.
   :::
   ::::tabs
   ::: tab Raw Script
   ```
   #!/usr/bin/env python3

   import requests

   #Make sure we get 200 from Jira server - confirming VPN is up
   url = https://jira_server.acme_company.com/login
   headers = {}
   response = requests.get(url, headers=headers)
   print(response) 
   ```
   :::
   ::: tab Pull Script from Github
   ```                                                                                                                            
   wget -O validate_synthetic.py https://raw.githubusercontent.com/your_github/internal_ops_scripts/main/validate_vpn_synthetic.py
                                                                                                                                  
   python3 validate_synthetic.py                                                                                                  
                                                                                                                                  
   rm validate_synthetic.py                                                                                                           
   ```
   :::
   ::::
   <br>
6. In the **Identify where this action will be run** section, select the Runner that you configured in the previous section and then select the **Services** that you want this Action to be associated with.
7. In the **Associate with team(s)** section, select the team or teams that will have access to run this action.
8. Click **Update Action**.

## Invoke Diagnostic Data Action
Now that the Runner has been deployed and the Automation Action has been configured, when incidents are created on the Services associated with the Automation Action, there will be an option in the **Run Actions** dropdown that will trigger the automation:
<br><br>![invoke-action](/assets/img/solutions-raw-script-invoke-action.png)<br>
This will produce records on the Incident Timeline showing that this Action was invoked.  Click on **output report**:
<br><br>![timeline-output](/assets/img/solutions-raw-script-timeline-output.png)<br>
This will take you to the output report page where you can view the log-output of the Automation Action:
<br><br>![output-report](/assets/img/solutions-raw-script-view-report.png)