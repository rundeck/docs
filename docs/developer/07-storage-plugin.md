# Storage Plugin

## About

Storage plugins provide the backend for storing file contents uploaded to the [Key Storage](/manual/key-storage/key-storage.md) via the [Key Storage API](/api/rundeck-api.md#key-storage).

The Storage facility stores **Resources** in a **Path-oriented** tree structure. Each **Resource** has a set of key-value _metadata_, and a stream of binary data (the _content_).

Rundeck provides two built-in providers, `db` and `file`, which store the contents in the database or on the filesystem.

When installed, Storage Plugins can be configured to apply to all storage, or for everything below a certain Path.

## Configuring

See: [Configuring the Storage Plugins](/manual/key-storage/key-storage.md#configuring-the-storage-plugins).

## Java Plugin Type

- _Note_: Refer to [Java Development](/developer/01-plugin-development.md#java-plugin-development) for information about developing a Java plugin for Rundeck.

**Plugin Interface**

- [StoragePlugin]({{{javaDocBase}}}/com/dtolabs/rundeck/plugins/storage/StoragePlugin.html)

This simply extends [Tree]({{{javaDocBase}}}/org/rundeck/storage/api/Tree.html) to store resource of type [ResourceMeta]({{{javaDocBase}}}/com/dtolabs/rundeck/core/storage/ResourceMeta.html).

Refer to the [Rundeck Storage API javadocs]({{{javaDocStorageApiBase}}}) for more information about the underlying storage API.

**Service Name**

- [`Storage`]({{{javaDocBase}}}/com/dtolabs/rundeck/plugins/ServiceNameConstants.html#Storage)

**Additional Compile-time Dependency**

Your build tool will need to include `org.rundeck:rundeck-storage-api:{{{rundeckVersionFull}}}` as a dependency.

See: [org.rundeck:rundeck-storage-api:\{{{rundeckVersionFull}}}](https://search.maven.org/artifact/org.rundeck/rundeck-storage-api/{{{rundeckVersionFull}}}/jar)
