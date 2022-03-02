# Rundeck Key Storage

Rundeck Key Storage is a mechanism for Rundeck Admins to implement or utilize existing storage of sensitive private key/password data ("keys") that can be used throughout Rundeck.  These keys can be used to configure plugins, node executors, and other aspects of the automation environment.

The Key Storage UI is accessible from either the System Menu _(gear icon in upper right)_, or through the Project Settings menu.  

The recommended structure/hierarchy used for organizing Keys is by project.  Keys organized by project allow access to be isolated from other contexts at the System level and streamlines providing access to the proper resources by project.

Project scope defined keys should be stored using this formula `keys/project/[project-name]/[key-name]`.  Additional subfolders under the `[project-folders]` are allowed and can help organize larger sets of keys.  _(example: `keys/project/project1/default.pem`)_

## Storage Plugins

Rundeck offers users the option to use a storage plugin to store key store data in a third party password manager such as HashiCorp Vault, Thycotic Secret Server and Cyberark.

Rundeck currently supports storage plugins for the following providers:

- [Thycotic Secret Server](/manual/key-storage/storage-plugins/thycotic-storage.md)
- [Vault Storage](/manual/key-storage/storage-plugins/vault.md)
- [Cyberark Storage](/manual/key-storage/storage-plugins/cyberark-storage.md)

### Configuring Storage Plugins

See [Plugins User Guide - Configuring Storage Plugins](/administration/configuration/plugins/configuring.md#storage-plugins).


## Key Data Storage Converter

Keys can be encrypted in the storage backend by use of a [Storage Converter plugin](/developer/08-storage-converter-plugins.md). A typical plugin would encrypt any private-key data at write time, and decrypt it at read time.

The Storage Converter Plugin handles reading and writing the content for any matching resources. The subsequent data is stored in the storage backend (on-disk or in a database) alongside the metadata for the file. If necessary, the metadata content can also be encrypted by modifying the data map that is provided.

Converter plugins do not have to manage storing the data, that will be handled by the Storage backend.

### Configuring Storage Converter Plugins

See [Plugins User Guide - Configuring Storage Converter Plugins](/administration/configuration/plugins/configuring.md#storage-converter-plugins).

## Using Keys via Rundeck Node Executors

### Built-in JschNodeExecutor

The provided java-based JschNodeExecutor, which is the default used for Node execution, uses Node attributes to determine the type of authentication used when connecting to the Node via SSH. To select private-key based authentication the Node attribute `ssh-authentication` is used:

- `ssh-authentication="privateKey"` (default value)

The default and typical usage is to use a private key stored on the local file system specified via the `ssh-keypath` attribute.

Use the following attribute to select one of the stored Keys for authentication.

Attribute
: `ssh-key-storage-path`

Value
: `/keys/{path}/{name}` - the storage path to the key. Currently all keys are stored under the `/keys` top-level path.

The value of the `ssh-key-storage-path` attribute can embed values taken from the execution context of the Rundeck job or execution, for example the username of the user running the job. This would be embedded as `${job.username}`, so to specify use of a key named "default.pem" stored in a path with the username of the executing user, the attribute might be set as:

    ssh-key-storage-path="/keys/users/${job.username}/default.pem"

When resolved, this will evaluate to `/keys/users/bob/default.pem` (for example).

## Additional Information

### ACL Policies

Access to the Keys in the Storage facility are restricted by use of [ACL policies](/administration/security/authorization.md#).

Access to the `keys` path requires an [Project scope](/administration/security/authorization.md#application-scope-resources-and-actions) authorization.

The access to the `keys` can be changed to the [Application scope](/administration/security/authorization.md#application-scope-resources-and-actions) by setting the feature flag:
```yaml
     rundeck.feature.projectKeyStorage.enabled=false
```
Define access with a `for` entry of `storage`.

Authorization can be granted for these actions:

- `create` - create keys
- `update` - modify keys
- `read` - list directories and view and read keys
- `delete` - delete keys

#### Examples

```yaml
description: authorize keys/ storage files
by:
  group: admin
for:
  storage:
    - match:
        path: 'keys/project/${name}.*'
      allow: [read]
    - equals:
        path: 'keys/project/${name}/test1.pub'
      allow: [read,create,update,delete]
    - match:
        path: 'keys/project/scratch/.*'
      allow: [read,create,update,delete]
```


### Storage backends

The location of stored Key data can be either on the filesystem, the database, or some external system via usage of a **Storage Plugin**.

Rundeck provides these built-in implementations:

- `db` - stores file data as BLOBs in the database (default)
- `file` - stores files locally on the filesystem



### API Details

The [Key Storage API](/api/rundeck-api.md#key-storage) is provided through the standard Rundeck HTTP API. Rundeck should be configured to use HTTPS, and all API access requires either an authentication token, or username and password authentication.

> For users who want overwrite the project defined key storage structure and allow key access at the system level would have to set the configuration property:
```yaml
     rundeck.feature.projectKeyStorage.enabled=false
```
