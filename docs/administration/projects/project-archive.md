# Project Archive

The content of a project, jobs, configuration, readme, motd, project ACLs, executions, and webhooks can be exported to an archive file. You might archive a project as a way to:

- transfer project content from one Rundeck instance to another
- add a collection of boiler plate project content when provisioning new projects

## Export Archive

### Graphical Interface

![Export archive](~@assets/img/export_archive.png)

This allows you to totally customize what is included in the exported project archive. You can either check "all" and have all the project configurations exported, or you could go through and select just the areas that you wish to export. So, say you already have a project on Rundeck but you want to move it to another instance. You don't love your current ACL policy so you could select all the checkboxes except "ACL Policies". Then, when you import it into a new instance of Rundeck, you will get all the areas except the ACL Policies which you can recreate for the new instance. 

### CLI Usage

Export archive to a file. Without the `--include` flag all content is archived (ie, jobs,executions,configs,readmes,acls)

```bash
rd projects archives export -p MyProject --file MyProject.zip
```

## Import Archive

Importing projects with Rundeck is very beneficial when you dont want to rebuild a project from the ground up. Now, you can create a new project based off of another project on a different Rundeck instance. 

### Graphical Interface

![Import archive](~@assets/img/import_archive.png)

When importing a project with Rundeck, there are some things to consider:

- **Imported Jobs**
: This allows you to edit how the jobs are imported. You can either preserve the UUIDs or remove them. If you choose to preserve the imported job UUIDs, if a job with the same UUID exist in another project, the new job will not be imported.

- **Executions**
: This allows you to choose whether or not you existing executions and their history to be imported. If "import all" is selected, it will create new executions and history reports from the archive.

- **Configuration**
: This allows you to specify whether you want to import the configuration properties of the project. If "import project configuration" is chosen, the project configuration will be overwritten with the properties stored in the archive. If not, the configurations will not be used. 

- **ACL Policies**
: This allows you to specify whether or not you want to import the ACL policies. If you choose "import policies," policies with the same name will be overwitten. 

![Import Archive - Continued](~@assets/img/import_archive2.png)

- **Scm**
: This allows tou to specify whether or not you want to import the SCM (Software Configuration Management) configuration. 

- **Referenced Jobs Validation**
: This allows you to choose how to deal with job references. If you choose "Validate Referenced Jobs," then it will throw errors when you use a referenced job that doesn't exist. 

- **Tours**
: This allows you to choose whether or not you wish to import the tours that you had in the old porject you exported. If you select "import tours" then the tours you had before will get imported. 

- **Webhooks**
: This allows you to choose whether or not to import webhooks. If you choose "import webhooks," then all the webhooks will be imported. Below, there is a checkbox that says "Regenerate Webhook Auth Tokens." If this is checked, the all webhook auth tokens will be regenerated. If not, only webhooks without defined auth tokens will have their auth tokens regenerated. 

- **Calendars**
: This allows you to choose whether or not to import calendars. If you choose "import calendars," then all calendars in the archive will be imported into the project. If not, no calendars will be imported.

![Import Archive - Continued](~@assets/img/import_archive3.png)

- **Schedule Definitions**
: This allows you to choose whether or not to import schedule definitions from the archive. If "import schedule definitions" is selected, then all schedule definitions in the archive will be imported. If not, then no schedule definitions will be imported and jobs will not run on a schedule.

- **Nodes**
: This allows you to choose whether or not to import the nodes from the archive. If "Import Nodes" is selected, then all of the nodes from the project archive will be imported. If not, then no nodes will be imported and there will just be one (default Rundeck node).

### CLI Usage

Import archive file.

```bash
rd projects archives import -p MyProject --file MyProject.zip
```

::: tip
Note: Some options like Tours, Calendars, Schedules, etc are only available in Rundeck Enterprise.
:::
