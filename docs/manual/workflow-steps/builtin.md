# Builtin Workflow Steps

### Ansible Module

### Ansible Playbook Inline

### Ansible Playbook

### Global Variable

### Flow Control

### Job State Conditional

Job State Conditional Step allows to verify if a job is running and/or checks the lastest execution status.

![Job State Conditional step](~@assets/img/job-state-conditional-0.png)

This step has many ways of being configured:

![Job State Conditional configuration](~@assets/img/job-state-conditional-1.png)

A. Project name (this is needed only if the job if is an external project).

B. Job Name, you can refer to a job using the *group/name* format, for example: *maintenance/check_status*.

C. You can reference to a job using its *UUID*, example: *b152d59b-7d6d-440c-95ea-23dc9fc1db07*.

D. Is the job running? (*true* or *false* or none).

E. Last execution status (*Succeeded*, *Failed*, *Aborted*, *TimeOut*, *Failed-with-retry* or *Never*).

F. Condition: *Equals* (Match with defined at "Running" and "Execution State" sections) or *Not Equals* (if it doesn't match with defined at "Running" and "Execution State" sections). Basically, this defines the behavior of the step with the rules defined before.

G. If the expected condition is not met, it stops the execution of the current job.

H. If execution is stopped, it will report the current job as failed.

I. Custom status when the current job is halted (overrides *Fail* when *Halted*).

J. Defines any label to the current step.

#### Example:

We need to run the current job only if another was executed successfully (last execution: *Succeeded*). 

![Job State Conditional example](~@assets/img/job-state-conditional-2.png)

At the beginning of the current job, we add a new Job State Conditional Step to verify another job status.

In the Job State Conditional Step, we need to point to the job using *Group/Name* or *UUID* (in the example we are using *UUID*), also, we need to know the latest execution, then, we set Running job as *false* and set Latest execution as *Succeeded*. At this point we have our rules, now we set Condition to *Equals* to match with running status and latest execution defined. 

Clicking on "Halt" and "Fail when Halted" the next steps on the current job don't execute, the job stops and reports as *Failed*.

Finally at the moment of run our job, if the referenced job defines in Job State Conditional Step has run as *Succeeded* in the latest execution all the rules matched and the next steps can be executed.

### Log Data Step

### Refresh Project Nodes

### Data Step
