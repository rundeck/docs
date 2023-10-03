# Transferring Rundeck Jobs
Jobs are a core element of Rundeck and PagerDuty Process Automation.  Often users want to use the same jobs in different Rundeck projects or instances. Consequently, jobs are intended to be portable so that they can be transferred between projects or between instances. Jobs can be exported (or authored) using industry-standard file formats (.yaml, .json and .xml) for easy transfer.<br>
### Projects
A project is a place within Rundeck to separate management activity. All Rundeck activities (such as jobs or commands) occur within the context of a project and multiple projects can be maintained on the same Rundeck instance.<br>
Projects are independent from one another, so can be used to organize unrelated systems within a single Rundeck installation. This is useful for managing different teams, infrastructures, environments or applications.<br>
## Move one or more jobs between projects or servers using import and export
To transfer a single job, a single definition file will be in play, either to upload or download.<br>
### Importing a job
To import a job, go to the Jobs link in the links on the left side and then select Upload Definition under Job Actions.<br>
![](/assets/img/impexp1.png)<br>
Choose the file to upload. The file format will be auto-determined.<br>
Default options will usually work for the remaining options. Those options determine what to do if a job of the same name exists, how to handle job UUIDs, and whether the job should be validated.<br>
![](/assets/img/impexp2.png)<br>
Click the Upload button to trigger the actual import.  Once completed, a success message will be displayed.<br>
![](/assets/img/impexp3.png)<br>
::: warning
Prior to Rundeck 4.12, when a job was exported/imported in XML format, the ValueListDelimiter was always set to a “,”. If you encounter this error while trying to import a job with enforced values:
![](/assets/img/error-xml-import.png)<br>
It can be solved by adding the following flag to the `rundeck-config.properties` file:

`rundeck.jobsImport.xmlValueListDelimiter=,`

This flag overrides the ValueListDelimiter in the imported job, avoiding inconsistencies when the job have enforced values.
:::
### Exporting a job
To export a single job, select the job from the Jobs list and then select the Action button.  Select the format for the job definition file from the list.<br>
![](/assets/img/impexp4.png)<br>
![](/assets/img/impexp5.png)<br>
The file will be downloaded directly in the browser.<br>
## Move all jobs from a project to a new project or another server using import and export
### Export Archive
Instead of handling a single job at a time, it is also possible to export all the jobs in a specific project by exporting an archive of that project. This includes all of the jobs and no other project configuration.<br>
To export an archive, click on Project Settings on the bottom of the left-hand panel and then select Export Archive.<br>
![](/assets/img/impexp6.png)<br>
To keep the size of the archive as small as possible, unselect all of the checkboxes except jobs.<br>
Click Export Archive to download a .jar file containing the project archive.<br>
![](/assets/img/impexp7.png)<br>
#### Exporting to Another Instance
It is also possible to directly export the archive to another instance without saving the file as a middle step. To do this, select the Export to Another Instance button at the bottom right (instead of Export Archive).  To carry out this process, the following fields are required: Server URL, Token and Project Name.<br>
![](/assets/img/impexp8.png)<br>
### Import Archive
To import an existing project archive .jar file, it is necessary to first create a project. From the main Rundeck dashboard, click New Project.<br>
![](/assets/img/impexp9.png)<br>
In the Create a new Project screen, the only required field is the project name, which must not contain any spaces. Once the name is entered, click Create.<br>
![](/assets/img/impexp10.png)<br>
To import an archive, click on Project Settings on the bottom of the left-hand panel and then select Import Archive.<br>
![](/assets/img/impexp11.png)<br>
On the Import Archive screen, click Choose File to select the archive.<br>
Of the remaining options on this page, the only ones that matter for a jobs-only import are Imported Jobs and Referenced Jobs Validation.  Once those have been set, click the green import button at the bottom of the page.<br>
![](/assets/img/impexp12.png)<br>
## Related Resources
[Exporting and importing jobs with the API](https://docs.rundeck.com/docs/api/rundeck-api.html#exporting-jobs)<br>
[SCM Git Plugin](https://docs.rundeck.com/docs/manual/projects/scm/git.html)<br>
[Job YAML file format](https://docs.rundeck.com/docs/manual/document-format-reference/job-yaml-v12.html)<br>
[Job XML file format](https://docs.rundeck.com/docs/manual/document-format-reference/job-v20.html)<br>