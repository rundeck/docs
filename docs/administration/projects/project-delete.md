# Project Delete

## Graphical Interface

From the navigation bar choose "Project Settings" and then "Delete Project". You will be asked confirmation before the project is removed.

## CLI Usage

Use the `rd projects delete` command to remove the project.
The `--confirm` flag avoids an interactive check.

```bash
rd projects delete -p MyProject --confirm
```

## API Usage

Project deletion can be achieved via the [API](/api/rundeck-api.md).

[Delete projects](/api/rundeck-api.md#project-deletion):

    DELETE /api/13/project/MyProject
