# How to Run a Rundeck Job

Having already covered [what a Job](/learning/howto/jobs/what-is-a-job.md) is and [the pieces of a Job](/learning/howto/jobs/pieces-of-a-job.md), this article covers how to run a Rundeck Job. There are two ways to run a Rundeck Job interactively: from the project page and from the job itself. Though not covered directly in this article, Jobs could also be triggered through the [API](/api/rundeck-api.md) or [CLI](/rd-cli/).


## From the Project page
The most common place to run a Job is from the Jobs list page under a Project.
To get there, select the Project, select Jobs on the left and then click on the green "triangle" button to the left of the Job name.
![](/assets/img/how2runajob1.png)
Click on the "Run Job Now" button when prompted.
<img src="/assets/img/how2runajob2.png" width="60%" height="60%" /><br>
If the job contains a Node filter defined in the Nodes section and has an option to  "Change the Target Nodes,” you will see a list of nodes available to dispatch before launching the job.
<img src="/assets/img/how2runajob3.png" width="80%" height="80%" /><br>

### Activity / Executions
The Activity window shows execution history for commands and jobs. By default, the Activity page lists the running executions and history of previous executions. Clicking on any execution shows the details and the job output result.

## From the Job itself
It is also possible to execute a Job from the Job page itself though it requires a few more clicks if you aren’t already looking at the job.  Click on any job in the Project Jobs list page and click on the "Run Job Now" button.
<img src="/assets/img/how2runajob4.png" width="80%" height="80%" /><br>

The Job execution will display as follows: 
<img src="/assets/img/how2runajob5.png" width="80%" height="80%" /><br>

## Debug Output mode
In both options described above, it is possible to run the job in debug mode. Just click on the list drop down button (on the right of the "Run Job Now" button) and then select "Run with Debug Output".
<img src="/assets/img/how2runajob6.png" width="80%" height="80%" /><br>
This is useful to increase the Job Output verbosity and identify problems in case of error.

## The Welcome Projects
If the concept of Jobs is new to you, the [Welcome Projects](/learning/#getting-started) are a good starting point to learn and test more Jobs concepts. They provide an educational environment to deploy Rundeck and Remote nodes in the same place. 
The Welcome Projects are not intended for use in actual production. Instead, they serve to demonstrate Rundeck's functionality to users.
