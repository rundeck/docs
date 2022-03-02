# Project Configuration

## Storage types

:::tip Note
Rundeck 3.4 no longer supports the `rundeck.projectsStorageType` configuration property.
:::

If you are upgrading from Rundeck 3.3 or earlier, any Projects that existed with a previous value of `filesystem` 
will be automatically imported to the Database.
The import process copies the contents of `etc/project.properties`, `readme.md` and `motd.md` (if they exist), and any ACLs within `acls/`.

Finally, all imported files will be renamed on disk to add an extension of `.imported`.

The DB storage type also uses the Rundeck **Storage Facility** to store the file contents, which can be
configured to use an Encryption plugin. See [Storage Facility - Using Encryption](/administration/configuration/storage-facility.md#using-encryption).

## Graphical Interface

Under the Project Settings menu, select the "Edit Configuration" item.
This page provides the same controls used when [creating a project](/manual/projects/project-create.md).

Alternatively, you may might want to edit the raw configuration keys.
Click the "Edit Configuration File" button to open a text editor letting you view and
change all property keys.

## CLI Usage

The `rd projects configure set` command allows you to set configuration properties.

```bash
rd projects configure set -p MyProject -- \
   --project.ssh-keypath":"/home/rundeck/.ssh/id_rsa
```

## API Usage

Project configuration can be achieved via the [API](/api/rundeck-api.md).

[Project configuration](/api/rundeck-api.md#project-configuration)

    PUT /api/13/project/MyProject/config
    Content-Type: application/json

    {
        "project.ssh-keypath":"/home/rundeck/.ssh/id_rsa",
        "resources.source.2.type":"directory",
        "resources.source.2.config.directory":"/home/rundeck/projects/MyProject/resources.d"
    }

## Filesystem

When using _filesystem_ storage type, each Project has a configuration file called
[project.properties](/administration/configuration/config-file-reference.md#project.properties),
located at this path:

- rpm/deb: /var/rundeck/projects/_project_/etc/project.properties
- launcher: \$RDECK*BASE/projects/\_project*/etc/project.properties
