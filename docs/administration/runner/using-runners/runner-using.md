---
title: "Job Execution with Enterprise Runners"
---

# Using Enterprise Runners in Jobs

## Automatic Runner Selection for Job Execution

When a Project is configured to use **Automatic** for the [**Project Dispatch Configuration**](/administration/runner/runner-management/project-dispatch-configuration.md), the system will automatically select the Runners to use for Job execution based on the mapping of nodes to Runners as configured in the [Node Dispatch](/administration/runner/runner-management/node-dispatch.md) settings.
This means that the Job definition does not require selecting a Runner, as the system will automatically choose the Runner based on the nodes that are targeted by the Job.

For example, if the Node Filter for a Job is defined as `region: "us-west-1,us-east-1"` and there are two Runners within this Project, one with a Node Filter of `region: "us-west-1"` and the other with a Node Filter of `region: "us-east-1"`, the system will automatically select the Runner with the `us-west-1` Node Filter for nodes that are targeted within US-WEST-1 and similarly for US-EAST-1. 

## Manual Runner Selection for Job Execution

When a Project is configured to use **Manual** for the [**Project Dispatch Configuration**](/administration/runner/runner-management/project-dispatch-configuration.md), users must explicitly specify the Runners that can be used for the Job within the Job definition.

:::warning Single Environment per Execution Constraint
When **Manual** is selected, only a single Runner will be utilized for a given Job execution. This can be prohibitive when attempting to target multiple environments where those environments can only be accessed by using a Runner deployed in each environment.
:::

#### Creating jobs with Manual Runner Selection

When the **Manual** is selected within the **Project Dispatch Configuration**, the Job edit menu will display a “Nodes & Runners” tab where Node and Runner selection is configured for the job. When creating a job or editing a job, Runners can be selected based on tags with the following options:

![Options to select runners by tags](/assets/img/runner-use-options.png)<br>

- Selecting Runners with “Choose Tags” option from the drop-down list:
    ![Selecting runners by tags selection](/assets/img/runner-use-options-checkbox.png)
- Selecting Runners by “Enter a Tag Filter” option and typing the Runner Tag name:
    ![Selecting remote runners with tag search ](/assets/img/runner-use-options-textinput.png)
- Selecting the  “Local Runner” option and choosing the Local runner:
    ![Select the local runner](/assets/img/runner-use-options-local.png)

#### Running Jobs with Manual Runner Selection

The “Runnerset Can be Changed at Runtime” option controls if the Runnerset selection can be changed when running a Job. If selected, a list of Runnersets will be presented in the Job invocation screen otherwise the Runnerset selected in the job definition during edit time will be used for job execution.<br>
![Allow runner selection at runtime](/assets/img/runner-use-options-changeatruntime.png)

A user can change which Runner will execute the job with the “Change the Target Runner”. This option is useful if you want to target different environments with the same job, for example running the same job in Dev or Staging environments that are setup with different Runners.
This is possible only If the “Runnerset Can be Changed at Runtime” option was picked for this Job definition. If you check “Change the Target Runner” the same Runner selection UI as in the “Editing Job” will let you pick the Runner set.<br>
![Run job and pick a runner](/assets/img/runner-use-run-changeatruntime.png)

#### Dispatching to Nodes with Manual Runner Selection

Once you have picked a Runnerset for the Job, you can choose how the Runner should behave by selecting a Dispatch mode: “Run on Runner” or “Dispatch to Nodes through Runner”. If you select “Dispatch to Nodes through Runner”, the nodes related options will display and those are identical to previous versions of Runbook Automation.<br>
![Dispatching jobs through runners](/assets/img/runner-use-dispatch-nodes.png)

#### Job Output with Manual Runner Selection

The runner carrying out the job execution is displayed at the top of the Job execution activity. Example below: The job below was executed through the “Ansible-Runner”<br>
![View runner in a job execution](/assets/img/runner-use-view-activity.png)

#### Manual Runner Selection through Job options

Runner matching and filtering supports Job Options - `${option.NAME}`, which allows changing the Runners for the job based on dynamic input through API calls or the rundeck-cli. The Job Options behavior is the same for Runner selection as with using it with commands or other workflow steps.  For example:
- A job is configured with a Runner filter value set to `${option.runnerTagParameter}`
- At runtime (through cli or API calls) we are providing a job option named `runnerTagParameter=myRunnerXYZ`, which will parameterize the Job Option with `myRunnerZYZ` for that job execution.
- The job will be effectively executed with the Runner that is tagged with `myRunnerZYZ`

Here's an example of a job option and runner filter configurations:

![Job Option](/assets/img/dynamic_runner_selection_jobOption.png)

![Runner Filter](/assets/img/Dynamic_runner_selection_runnerFilter.png)                                                                                                                     

#### Migrating Jobs to use Runners with Manual Runner Selection
When **Manual** is selected in [**Project Dispatch Configuration**](/administration/runner/runner-management/project-dispatch-configuration.md), existing jobs will default to the Local Runner even if no Runner selection is made in the job definition. The Local Runner operates with an execution context equivalent to that of the Runbook Automation service.

