% Storage Plugin
% Greg Schueler
% March 29, 2014

## About 

Storage plugins provide the backend for storing file contents uploaded to the [Key Storage](../administration/security/key-storage.html) via the [Key Storage API](../api/index.html#key-storage).

The Storage facility stores **Resources** in a **Path-oriented** tree structure.  Each **Resource** has a set of key-value *metadata*, and a stream of binary data (the *content*).

Rundeck provides two built-in providers, `db` and `file`, which store the contents in the database or on the filesystem.

When installed, Storage Plugins can be configured to apply to all storage, or for everything below a certain Path.

## Configuring

See: [Configuring the Storage Plugins](../administration/security/key-storage.html#configuring-the-storage-plugins).

## Java Plugin Type

* *Note*: Refer to [Java Development](plugin-development.html#java-plugin-development) for information about developing a Java plugin for Rundeck.

The plugin interface is [StoragePlugin](${javadocbase}/com/dtolabs/rundeck/plugins/storage/StoragePlugin.html).  This simply extends [Tree](${javadocbase}/org/rundeck/storage/api/Tree.html) to store resource of type [ResourceMeta](${javadocbase}/com/dtolabs/rundeck/core/storage/ResourceMeta.html).

Refer to the [Rundeck Storage API javadocs](${javadocbase}/org/rundeck/storage/api/package-frame.html) for more information about the underlying storage API.

The service name is [`Storage`](${javadocbase}/com/dtolabs/rundeck/plugins/ServiceNameConstants.html#Storage).
