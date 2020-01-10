# Project Archive

The content of a project, jobs, configuration, readme, motd, project ACLs, executions, and webhooks can be exported to an archive file. You might archive a project as a way to:

- transfer project content from one Rundeck instance to another
- add a collection of boiler plate project content when provisioning new projects

## Export Archive

### Graphical Interface

![Figure: Export archive](~@assets/img/fixme.png)

### CLI Usage

Export archive to a file. Without the `--include` flag all content is archived (ie, jobs,executions,configs,readmes,acls)

```bash
rd projects archives export -p MyProject --file MyProject.zip
```

## Import Archive

### Graphical Interface

![Figure: Import archive](~@assets/img/fixme.png)

### CLI Usage

Import archive file.

```bash
rd projects archives import -p MyProject --file MyProject.zip
```
