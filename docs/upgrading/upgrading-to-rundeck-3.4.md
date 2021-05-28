# Upgrading to Rundeck 3.4


::: tip
This document highlights changes for users upgrading **_from_ Rundeck 3.3**.
See other [Upgrading](/upgrading/) Documents if you are upgrading from 3.2 or earlier.
:::

## Package Repositories

Package repositories have moved! Please read [the new instructions for downloading Rundeck](/learning/howto/migrate-to-rundeck-packages-repo.md) from our new package repositories.

## DB Migration

## API v11 (New Minimum Version)

Version 3.4.0 removed support for API v10 and below. The minimum API version is now v11. This is a potential breaking change for customers automating Rundeck via the API.  It is recommended to check any automation and confirm that all API calls are using API version 11 or higher.

`http://localhost:4440/api/<APIVERSION>/projects`

In the example above make sure the value at `<APIVERSION>` is 11 or higher.

## Project ACLs for Key Storage
Project ACLs for Key Storage implements a new dynamic within the Key Storage component.  If the existing Key Storage (from version 3.3 and previous) is organized by project name (e.g. `keys/project-name/folder/key) `care should be taken to ensure that rights are properly granted.  [More information about this feature can be found here](/administration/security/project-acl.md).

## Enterprise ACL Storage Layer

Rundeck Enterprise 3.4.0 adds a more efficient Enterprise ACL Storage Layer, which improves application performance if you have many ACLs. This feature is enabled by default and will automatically transfer ACLs from the Core ACL Storage Layer at startup if they exist. Newly added or changed ACLs will use the new Enterprise ACL Storage Layer. The new storage layer stores ACLs in the database in a format that allows them to be queried more efficiently, and improves performance when there are many ACLs. A caveat is that if regular expressions are used in the `by:` clause of ACLs, those ACLs cannot be queried efficiently, and remain stored only in the Core storage layer. Regular expressions are detected by a simple check for characters common to regular expressions such as `+`, `.`, `*` etc. If you have a `.` in usernames or group names, and do not want it to be treated as a regular expression, you should use a [URN in the by clause explicitly](/manual/document-format-reference/aclpolicy-v10.md#by).

This feature can be toggled with these two feature flags:

- Enable or disable the Enterprise ACL Storage Layer:
    `rundeck.feature.enterpriseacl.enabled=false`
- Enable or disable automatic Transfer between the Core and Enterprise Storage layers at startup:
    `rundeck.feature.enterpriseacltransfer.enabled=false`

The Transfer feature flag will determine whether to automatically transfer ACLs between the Enterprise and Core ACL Storage Layers at Rundeck startup. When the Enterprise ACL Storage Layer feature is enabled, any ACLs that can be transferred will be transferred out of Core and into the Enterprise storage layer. Conversely, when the Transfer feature flag is disabled, ACLs will be transferred back to the Core storage layer.

If the Transfer feature flag is disabled, no ACLs will be automatically transferred. You can choose to enable the Enterprise ACL Storage Layer while not enabling the automatic transfer, and only newly created or modified ACLs will use the new storage layer.

Note: if you **disable** the Enterprise ACL Storage Layer feature, but **enable** the Transfer feature and restart, any ACLs in the new storage layer will be automatically transferred back to the Core storage layer.

## Removed Support for File System Based project definitions

The configuration value `rundeck.projectsStorageType=filesystem` or file is no longer supported. This mode was a legacy mode where Project definitions were stored on the filesystem in a directory with a `project.properties` file. The Rundeck projects storage type `db` has been the default since Rundeck 3.0, and is required for any clustering behavior. This change may only affect you if you are upgrading a legacy configuration of a solo Rundeck server.

If you are using this mode, you will see a warning at startup, and projects will be converted to DB storage automatically.

Known file resources stored in each project's directory, such as readme/motd and aclpolicy files, will be imported to the DB storage automatically.

You can remove the `rundeck.projectsStorageType` configuration key from your rundeck-config.properties file

## JIRA Plugins
