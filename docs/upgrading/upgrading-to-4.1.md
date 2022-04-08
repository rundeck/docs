# Rundeck 4.1 Upgrade Notes

## H2 database upgraded

In release 4.1 the lib version of the h2 database was updated to 2.1.210. Some compatibility issues needed to be fixed.
For more information about the change to fix it follow [this GitHub Link](https://github.com/rundeck/rundeck/pull/7577).)

:::danger
Warning: The old version of the h2 database is not compatible with the newer version. As there is no mechanism to migrate a database in the version automatically by Rundeck, the process must be done manually following the instructions [in the official H2 database instructions link](http://www.h2database.com/html/migration-to-v2.html) or just removing the old database so that a new one is created in the recent version.
:::
