# How to Use Rundeck Example Jobs

## Overview

A good way to understand different problem solving approaches in Rundeck is by seeing how they’re implemented. The [Community Welcome Project](https://github.com/rundeck/welcome-project-community) has a series of individual [example jobs](https://github.com/rundeck/welcome-project-community/tree/main/runbooks/yaml) that you can download, import into your Rundeck instance, adapt, and test.  The example jobs are written to work with the Welcome Projects, but these steps can be used to import into any project.

The library of example jobs provides examples of job definitions for common use-cases and platform-focused runbooks to help show new users the power of runbook automation and make it easy for existing users to add new job definitions to their Rundeck. Rundeck uses exchangeable formats to share their jobs: XML or/and YAML, making it easy to store on any repository.

This guide covers:
*   How to test individual job definitions in the Community Welcome Project

## Testing the Job Definitions on a Local Rundeck Instance

The job definitions are available to download here: [https://github.com/rundeck/welcome-project-community/tree/main/runbooks/yaml](https://github.com/rundeck/welcome-project-community/tree/main/runbooks/yaml)

Download the zip file from the repository:

1. Navigate to [https://github.com/rundeck/welcome-project-community](https://github.com/rundeck/welcome-project-community)
2. Click on the “latest” release in the right,
3. Download the Source Code (.zip) file.
4. Extract the contents to a folder on your local hard drive.

All runbook job definitions are located in the `runbooks/yaml` folder inside the main repository directory.

1. Click on the **Jobs** page (left menu) of your Project.
1. And click on the **Upload a job definition** button.
    <br><br>![Upload Definition](@assets/img/howto-jobs-uploaddef.png)<br><br>
1. Click on **Browse** to select any YAML file downloaded from the repository.
    <br><br>![Select Job Definition](@assets/img/howto-browse-jobdef.png)<br><br>
1. Scroll down and click on the **Upload** button.
1. Now the job is imported. In the screenshot we chose to upload the _Global Log Filter Usage_ example job.
    <br><br>![Definition Upload Success](@assets/img/howto-jobdef-success.png)<br><br>
1. Run the job by **clicking on the job name** and then on **Run Job Now**
    <br><br>![Run Job Now](@assets/img/howto-jobdefs-runjobnow.png)<br><br>
1. Then, you can see the results.
    <br><br>![Job Results](@assets/img/howto-jobdef-jobresults.png)<br><br>
