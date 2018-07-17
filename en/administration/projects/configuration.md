% Configuration

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
configured to use an Encryption plugin.  See [Storage Facility - Using Encryption](storage/index.html#using-encryption).

### Configuration file

When using *filesystem* storage type, each Project has a configuration file called
[project.properties](configuration-file-reference.html#project.properties),
located at this path:

* rpm/deb: /var/rundeck/projects/_project_/etc/project.properties
* launcher: $RDECK_BASE/projects/_project_/etc/project.properties

