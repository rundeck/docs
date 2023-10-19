# Project Archive

The content of a project, jobs, configuration, readme, motd, project ACLs, executions, and webhooks can be exported to an archive file. You might archive a project as a way to:

- transfer project content from one Rundeck instance to another
- add a collection of boiler plate project content when provisioning new projects
- keep a backup of the project's content at a specific point in time

## Export Archive

### Graphical Interface

![Export archive](~@assets/img/export_archive.png)

This allows you to totally customize what is included in the project archive. You can either check "all" (all project configurations will be exported) or select just the areas that you wish to export. If you already have a project on Rundeck but you want to move it to another instance without the ACL policies, when you import it without that option selected, all items will be imported except the ACL Policies which can be recreated on the new instance.

::: warning
Depending on the length of execution history associated with the project, including "Executions" as part of the archive can increase the size of the archive file considerably and slow down the archive/import process.  Best practice would be to only include execution history if truly necessary.  
:::

### CLI Usage

Export archive to a file. Without the `--include` flag all content is archived (ie, jobs,executions,configs,readmes,acls)  

```bash
rd projects archives export -p MyProject --file MyProject.zip
```

## Import Archive

Importing projects with Rundeck is very beneficial when you don't want to rebuild a project from the ground up. In this way, you can create a new project based off of another project from a different Rundeck instance.

### Graphical Interface

![Import archive](~@assets/img/import_archive.png)

When importing a project with Rundeck, there are some things to consider:

- **Imported Jobs**: This allows you to edit how the jobs are imported. You can either preserve the UUIDs or remove them. If you choose to preserve the imported job UUIDs, the new job will not be imported if a job with the same UUID exist in another project.

- **Executions**: This allows you to choose whether or not you want to include existing executions and their history to be imported. If "import all" is selected, it will create new executions and history reports from the archive.

- **Configuration**: This allows you to specify whether you want to import the configuration properties of the project. If "import project configuration" is chosen, the project configuration will be overwritten with the properties stored in the archive. If not, the configurations will not be used.

- **ACL Policies**: This allows you to specify whether or not you want to import the ACL policies. If you choose "import policies," policies with the same name will be overwitten.

![Import Archive - Continued](~@assets/img/import_archive2.png)

- **Scm**: This allows you to specify whether or not to import the SCM (Software Configuration Management) configuration.

- **Referenced Jobs Validation**: This allows you to choose how to deal with job references. If you choose "Validate Referenced Jobs," then it will throw errors when you use a referenced job that doesn't exist.

- **Tours**: This allows you to choose whether or not you wish to import the tours that you had in the old project you exported. If you select "import tours," tours you had before will get imported.

- **Webhooks**: This allows you to choose whether or not to import webhooks. If you choose "import webhooks," then all the webhooks will be imported. Below, there is a checkbox that says "Regenerate Webhook Auth Tokens." If this is checked, the all webhook auth tokens will be regenerated. If not, only webhooks without defined auth tokens will have their auth tokens regenerated.

- **Calendars**: This allows you to choose whether or not to import calendars. If you choose "Import Calendars," all calendars in the archive will be imported into the project. If not, no calendars will be imported.

![Import Archive - Continued](~@assets/img/import_archive3.png)

- **Schedule Definitions**: This allows you to choose whether or not to import schedule definitions from the archive. If "import schedule definitions" is selected, all schedule definitions in the archive will be imported. If not, no schedule definitions will be imported and jobs will not run on a schedule.

- **Nodes**: This allows you to choose whether or not to import the nodes from the archive. If "Import Nodes" is selected, all nodes from the project archive will be imported. If not, no nodes will be imported and there will just be one (the default server or Runner node).

### CLI Usage

Import archive file.

```bash
rd projects archives import -p MyProject --file MyProject.zip
```

::: tip
Note: Some options like Tours, Calendars, Schedules, etc are only available in Process Automation.
:::
