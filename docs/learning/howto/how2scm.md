# Manage Jobs as Code (Source Control Management)

![](/assets/img/scm1.png)

[The Rundeck Git plugin](/manual/projects/scm/git.md) allows organizations to manage Rundeck jobs as source code by versioning, exporting, or importing their definitions using a remote Git repository. Managing jobs in this way takes advantage of your existing code review processes to ensure that only approved job code is allowed in production projects or instances. Users can backup, manage, and approve changes to their Rundeck jobs using any Git solution like Github/Gitlab/BitBucket, centralizing the job code in one place.

Enable SCM (Source Control Management) for managing Job definitions on a per-project basis. The SCM plugin can be configured to either import or export.  This approach can be applied in any way that matches an organization’s code review processes but is often configured with a development project where jobs can be modified and developed for export to an experimental branch in Git and a production project that imports jobs from the approved and stable branch.

# Background

There are two integration modes for the SCM Plugin, _import,_ and _export_, which are managed separately.  A Project can be configured with a single SCM plugin to either import or export. After setting up the plugin, the Project and Job level "status" can be read. Changes to Jobs within a project affect the status of import or export.  

For example, if the project is set to import, there will be indicators where jobs are out of sync with the source and could be imported.

The Git plugin provides "actions" which are available based on the Project or Job status. For example, a plugin can provide a "commit" action for a Job, which allows a user to save the changes for the job.

# Prerequisites

To follow this tutorial you need to have Docker installed on your computer. Go [here](https://docs.docker.com/get-docker/) to install Docker Desktop depending on your Operating System.

# Example Docker Environment
This Docker-compose file contains both Rundeck and GitBucket servers to test the Git plugin functionality.

```
version: "3"
services:
 rundeck:
   container_name: rundeck_oss
   image: rundeck/rundeck:4.5.0
   ports:
     - 4440:4440
   environment:
     RUNDECK_GRAILS_URL: http://localhost:4440
 gitbucket:
   container_name: git_bucket
   image: gitbucket/gitbucket
   ports:
     - 8080:8080
```

To run use:

```
docker-compose up
```

## Exporting Jobs

1. Enter GitBucket server<br>
	```
	http://localhost:8080`, user: `root`, password: `root`
	```
1. Once logged in, create a new repository, by clicking on the "+" top icon and then on "New Repository".<br>
![](/assets/img/scm2.png)<br>
1. Put a name in the "Repository name" textbox and select "Initialize this repository with a README".<br>
     The new repository should now contain the "master" branch by default.<br>
1. Click on the "Create repository" button. That's all you need to complete in GitBucket.<br>
![](/assets/img/scm3.png)<br>
1. Log in to Rundeck<br>
    ```
    http://localhost:4440, user: admin, password: admin
    ```
1. Add a new password in the key storage.<br>
<br>
 **Key Type:** Password<br>
 **Enter text:** The password for the Git repository<br>
 **Storage path:** Can be left blank<br>
 **Name:** gitbucket_passwd<br>
<br>
![](/assets/img/scm4.png)<br>


:::tip
If you're using GitHub, it doesn't allow passwords to connect to the repositories via HTTPS. Instead of a password, GitHub accepts personal tokens. To create a token, follow these steps:<br>

1.  Go to your User Icon (up to right) and select "Settings".<br>
1.  Scroll down and click "Developer settings" at the end of the left menu.<br>
1.  Now click on "Personal access tokens".<br>
1.  Click the "Generate new token" button and then create a new token.<br>
1.  The token value could be used as a password in the SCM configuration.<br>
:::

## Exporting Jobs, continued

1.  Now, configure SCM in a Rundeck project. Go to the left navigation and click on "Project Settings" and select the "SETUP SCM" option from the menu.<br>
	![](/assets/img/scm5.png)<br>
1.  Click on "Setup" in the “Git Export” section.<br>
	![](/assets/img/scm6.png)<br>
1. In the "Project" section, add the Git repository username and a valid committer/author email.<br>
	![](/assets/img/scm7.png)<br>
1. Scroll and check the "Git Repository" section. The Git URL must be filled in using the following format to connect via the HTTPS method:<br>
    	`http(s)://user@git_hostname:port/git/user/repo.git`. In this example we used: `http://root@gitbucket:8080/git/root/rdeck_jobs.git`. Additionally, make sure to fill the "Branch" with the first branch created in step 2, "master".<br>
	![](/assets/img/scm8.png)<br>
1. Job Source Files (XML or YAML)<br>
 **Format** yaml<br>
 **Authentication** Enter key storage password path created in the third step.<br>
![](/assets/img/scm9.png)<br>
1. Save the config.<br>
![](/assets/img/scm10.png)<br>
1. Create a couple of jobs. You should see a green exclamation icon next to each, which signals the job is available in Rundeck and ready to export to the GitBucket repository configured above.<br>
![](/assets/img/scm11.png)<br>
1. To export both jobs to the GitBucket repo, click on "Job Actions" and select "Commit Changes to Git".<br>
![](/assets/img/scm12.png)<br>
1. In the "Commit Message" put a friendly commit message, which is mandatory.  Click on the "Commit" button.<br>
![](/assets/img/scm13.png)<br>
1. "Remote push result: OK" should appear at the top<br>
![](/assets/img/scm14.png)<br>
1. To verify, go to GitBucket and look at the repository. You should see both jobs.<br>
![](/assets/img/scm15.png)<br>
1. Test further by editing a job in Rundeck and adding a description. The job structure will change and the SCM plugin will detect this change to export it.<br>
![](/assets/img/scm16.png)<br>
1. After saving, the blue "Modified" message appears.<br>
![](/assets/img/scm17.png)<br>
1. A blue exclamation icon will appear in the job list as well.<br>
![](/assets/img/scm18.png)<br>
1. An additional way to see the job change is by clicking on the job "Actions" button and then on "Diff Changes”.<br>
![](/assets/img/scm19.png)<br>
1. To commit changes to GitBucket, click on the "Commit Changes to Git" blue button.<br>
![](/assets/img/scm20.png)<br>
1. Add a comment on the last change and click on the green "Commit" button.<br>
![](/assets/img/scm21.png)<br>
![](/assets/img/scm22.png)<br>
1. Now go back to the GitBucket repository. The changes should be uploaded with the new comment attached.<br>
![](/assets/img/scm23.png)<br>
:::tip
Note: The SCM plugin should be used either for Import or Export on a single project, not both.  To test importing, you should use or create a different project than you used for the export section above.<br>
:::

## Importing Jobs

1. In your import project, select "Projects Settings" from the left navigation and click on "SETUP SCM".<br>
	![](/assets/img/scm24.png)<br>
1. Scroll to the "Import" section and click on "Setup".<br>
	![](/assets/img/scm25.png)<br>
1. Git Repository section<br>
    **Git URL**<br>
    Must be filled in the following format to connect via HTTPS method: `http(s)://user@git_hostname:port/git/user/repo.git`. We used: `http://root@gitbucket:8080/git/root/rdeck_jobs.git`.<br>    
![](/assets/img/scm26.png)<br>
1. Setup section<br>
    **Regular Expression** .*\yaml<br>
1. Job Source/Files section<br>
    **Format** Select "yaml"<br>
1. Authentication section<br>
    **Password Storage Path** Add the key storage path for the GitBucket account user password<br>
 	![](/assets/img/scm27.png)<br>
1. Click on the "Setup" button. Now the configuration is saved.<br>
 	![](/assets/img/scm28.png)<br>
1. Click on Jobs in the left navigation. If the repository contains jobs, you will see a blue banner. Scroll over the banner and you will see the number of jobs available to import to the Rundeck instance.<br>
	![](/assets/img/scm29.png)<br>
	![](/assets/img/scm30.png)<br>
1. Rundeck shows the available jobs to import. Click on the "Import" button.<br>
	![](/assets/img/scm31.png)<br>
1. The jobs should be imported from the Rundeck instance to the GitBucket repository.<br>
	![](/assets/img/scm32.png)<br>

### Resources

[About the Git Plugin](/manual/projects/scm/git.md#git-plugin) (Rundeck Documentation)<br>
