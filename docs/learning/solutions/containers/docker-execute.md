# Executing Commands in Docker Containers

Executing a coommand in a Docker Container can be beneficial in many ways to DevOps teams.  Docker can dynamically provide very specific environments which allow for controlled testing and execution of commands.  In this solution example we will run a simple command in a Docker Image.

## Pre-requisites & Environment Setup

- For ease of testing, have an [Enterprise Runner](/administration/runner/runner-overview.md) running on the same host that is running Docker and use the A[utomatic Runner Dispatch](/administration/runner/runner-management/project-dispatch-configuration.md) setup.
- Must setup Docker Node Source before running this job.
- The example job assumes the base OS of Docker image is Linux based.


#### Setting up Docker Node Source

1. Open the `Example Content` project.
2. Navigate to *Project Settings* > *Edit Nodes*
3. Click **Add A Node Source**
4. Choose the `docker / container / model` entry.
5. Specify your Runner and **Save**.

[More specifics about setting up this Node Source can be found on it's documenation page here.](/manual/projects/resource-model-sources/docker.md)

#### Running the Job

:::tip
To find the Docker jobs quickly in the job lising click on the `docker` tag at the top of the list.
:::

![Select Job Image](/assets/img/solutions-docker-selectjob.png)

The default node filter for this job is `tags: "docker"`.  Nodes discovered by the Docker node source above will automatically get this tag assigned to them.  If you'd like to run the job on a particular container select it from the list.

The default command will run `ls -last` on any container in the target list along with the other steps in the job definition.

![Run Job Screen](/assets/img/solutions-docker-runjob.png)


Here is some example output

![Example Output](/assets/img/solutions-docker-output.png)