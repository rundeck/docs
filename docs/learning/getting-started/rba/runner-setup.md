# Create a Runner to connect to remote nodes

[Runners](/administration/runner/runner-intro.html) are a recent addition to the PagerDuty Process Automation and Runbook Automation architecture. They are primarily used to automate tasks in secure, remote environments where direct access to infrastructure and services is restricted. This is accomplished by using a "reverse proxy" architecture. Runners regularly query (outbound only) the Runbook Automation instance for tasks. Runners are assigned to specific  projects, and then [jobs](/learning/getting-started/jobs/what-is-a-job.html) within those projects can be sent to the Runner to execute in the remote environment.  
![](~@assets/img/running1.png)  
_Example showing Runner architecture (Each remote Runner could be multiple Runners)_  
When Runners are enabled for a job, the execution of Job steps will be delegated to a specific Runner for management. This model offers resiliency as multiple Runners could be enabled for a particular Project so that each Job can be assigned to a specific Runner during high usage windows.  
The first step in using Runners is to create one in the Runbook Automation interface.  

1. Click the gear in the top right corner of the screen and select **Runner Management** from the menu  
![](/assets/img/running2.png)
2. Click the blue **Create Runner** button  
![](/assets/img/running3.png)  
3. Enter in details for the new Runner  
	Ensure that you are using a clear and concise name for the Runner.  It is also necessary to provide at least one tag for the Runner in order to later associate it with jobs and nodes.  
![](/assets/img/running4.png)  
	After entering in Runner details, click the green **Next** button in the bottom right  
4. Associate Runner with Project(s)  
	Find the Welcome project (by searching if necessary and select the **Assigned** button and then click **Next**  
![](/assets/img/running5.png)  
5. Download Runner package  
![](/assets/img/running6.png)  
6. Install Runner package on a server in remote network  
	Follow the [documented instructions](https://docs.rundeck.com/docs/administration/runner/runner-install.html) to install the Runner software on a machine that will act as Runner in the network segment where nodes will be targeted.  
7. Verify that new Runner is connecting to Runbook Automation  
	From the Runner Management area, there should be a green check mark if a Runner is successfully connecting back to Runbook Automation.  
![](/assets/img/running7.png)  
Next Step: [Add and connect to a node through your Runner](/learning/getting-started/rba/node-setup.html)
