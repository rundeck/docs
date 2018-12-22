% Project Configuration

## Storage types

In Rundeck 2.4 and earlier, all project definitions and configuration files were stored
on the filesystem.

Starting in Rundeck 2.5, you have the option to store project definitions and
configuration files in the database.

Starting in Rundeck 2.11, the default storage mechanism is the database.

The storage type can be changed by a configuration flag in the `rundeck-config.properties` file:

    rundeck.projectsStorageType=db

or

    rundeck.projectsStorageType=filesystem

If you wish to use *filesystem* storage you must add this configuration entry.

If you have existing filesystem-based projects, and you start Rundeck
with the `db` storage type, those projects will be automatically imported to the Database.
The import process copies the contents of `etc/project.properties`, `readme.md` and `motd.md` (if they exist).
Finally, the `etc/project.properties` file will be renamed on disk to `etc/project.properties.imported`.

The DB storage type also uses the Rundeck **Storage Facility** to store the file contents, which can be
configured to use an Encryption plugin.  See [Storage Facility - Using Encryption][page:administration/configuration/storage-facility.md#using-encryption].

## Graphical Interface

Under the Project Settings menu, select the "Edit Configuration" item. 
This page provides the same controls used when [creating a project][page:administration/projects/project-create.md].

Alternatively, you may might want to edit the raw configuration keys. 
Click the "Edit Configuration File" button to open a text editor letting you view and
change all property keys.

## CLI Usage

The `rd projects configure set` command allows you to set configuration properties.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.bash}
rd projects configure set -p MyProject -- \
   --project.ssh-keypath":"/home/rundeck/.ssh/id_rsa
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


## API Usage

Project configuration can be achieved via the [API][page:api/rundeck-api.md].

[Project configuration][page:api/rundeck-api.md#project-configuration]

    PUT /api/13/project/MyProject/config
    Content-Type: application/json

    {
        "project.ssh-keypath":"/home/rundeck/.ssh/id_rsa",
        "resources.source.2.type":"directory",
        "resources.source.2.config.directory":"/home/rundeck/projects/MyProject/resources.d"
    }

## Filesystem

When using *filesystem* storage type, each Project has a configuration file called
[project.properties][page:administration/configuration/config-file-reference.md#project.properties],
located at this path:

* rpm/deb: /var/rundeck/projects/_project_/etc/project.properties
* launcher: $RDECK_BASE/projects/_project_/etc/project.properties


