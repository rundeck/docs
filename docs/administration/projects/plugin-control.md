# Plugin Control

By default all plugins are enabled for each project.
You may need to restrict access to plugins for certain projects.

Only enabled plugins are visible to job writers in the Job Edit page.

## Graphical Interface (Enterprise)

The Plugin Control page lets you enable and disable specific plugins.

Go to the "Project Settings" and then choose "Plugins Control" menu item.

Uncheck any plugin you wish to disable.

## CLI Usage

Use the `rd projects configure set` command to define the `disabled.plugins` property.

```bash
rd projects configure set -p MyProject -- \
   --disabled.plugins=pluginA,pluginB
```

## API Usage

Project configuration can be achieved via the [API](/api/rundeck-api.md).

[Project configuration](/api/rundeck-api.md#project-configuration)

    PUT /api/13/project/MyProject/config
    Content-Type: application/json

    {
        "disabled.plugins":"pluginA,pluginB"
    }
