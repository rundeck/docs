# Configuring Enterprise Runners to access remote Nodes

::: enterprise
:::
[Enterprise Runners](/administration/runner/pre-4-11-runners.md#runner) are a recent addition to the PagerDuty Runbook Automation architecture. They are primarily used as a method for orchestrating automation in secure, remote environments where direct access to infrastructure and services is restricted.  This is accomplished by using a "reverse proxy" architecture: Runners regularly query (outbound only) the Runbook Automation Cluster (or Runbook Automation instance) for tasks. Runners are assigned to one or more Projects, and then [Jobs](/learning/getting-started/jobs/what-is-a-job.md) within those Projects can use the Runner to dispatch the Job steps to be executed through the Runner in the remote environment.<br>
![](/assets/img/runnerarch1.png)<br>
_Example showing Runner architecture (Each remote Runner could be a Runner set)_<br>
When Runners are enabled for a job, the execution of Job steps will be delegated to a specific Runner for management. This model offers resiliency as multiple Runners could be enabled for a particular Project so that each Job can be assigned to a specific Runner during high usage windows.<br>
To utilize Runners, there are a few steps to carry out:<br>
## System Configuration
1. [Enable Runners at the system level](/administration/runner/runner-setup.md)<br>
    Though Runners will primarily be used and managed in the context of projects, a system admin does need to enable them initially.<br>
2. [Create new Runners at the system level](/administration/runner/runner-config.md)<br>
    For each Runner, you will be prompted for three things:<br>
		* A name<br>
        	Using clear naming can help with Runner management as the number of Runners increases.<br>
		* Define one or more tags<br>
        	Tags determine which Runner set will execute which Jobs.<br>
		* Associate Runners with Projects<br>
        	Each Runner must be associated with at least one Project in order to be used.<br>
## Runner Installation
3. [Install Runner software in remote networks for each Runner that has been created](/administration/runner/runner-install.md).<br>
    Though Runners have been defined by this point, it is still necessary to install software in each of the remote locations.<br>
## Configure Jobs for Runners
4. [Add Runner tags to Jobs](/administration/runner/runner-using.md)<br>
    New jobs will prompt authors to choose tags which represent Runners or Runner sets by tags.  It is important to review existing Jobs to ensure that they have appropriate tags selected as well.
<img src="/assets/img/runnerarch2.png" width="100%" height="100%" /><br>
_Jobs are assigned to remote Runners based on tags.  Jobs on nodes in the cluster’s local network can be handled through the Local Runner._<br>
# Resources
[Advanced Runner Setup Options](/administration/runner/runner-advancedsetup.md)<br>
[Runner Custom Logging](/administration/runner/runner-logging.md)<br>
[Runner FAQ](/administration/runner/runner-faq.md)<br>