# File Upload Plugins

## About

File Upload plugins are used to receive uploaded files for Job Options that are of type File, store them, and retrieve them when needed by a running Execution.

Each uploaded file is recorded with a "refid", a unique ID that identifies the file.

## Behavior

A File Upload Plugin is configured globally. The default plugin implementation stores received files on the local disk only.

When a user uploads a file to a Job Option value, or the Job File Upload API is called, the plugin is initialized, and the `uploadFile` method is called. Rundeck creates an internal record for the file with the SHA hash of the contents, and generates the unique "refid" for the uploaded file.

The plugin is expected to "retain" the uploaded file until a state transition occurs. The file might be used in an execution, or it might simply be deleted, for example if the execution fails to start due to invalid input, or if a timeout occurs.

If the timeout occurs before an execution uses the file, the `transitionState` method will be called with an state of `Unused`.
The plugin has the option of deleting the stored file, and should return the new Internal state of the file, which can be `Deleted` or `Retained`.

When the execution that uses the file starts, first the internal record for the file is "attached" to the execution.
This means it cannot be used again for another execution, the removal timeout is cancelled, and it has an internal state of "retained".

Then the plugin's `retrieveLocalFile` method will be called. If the plugin has a local copy of the file,
it should be returned, otherwise `null` is expected. If the local file is not available, the `hasFile` method is called to determine if the
plugin is able to retrieve the file. Finally the `retrieveFile(String,OutputStream)` method is called to copy the contents to a local temp file,
and to verify the SHA checksum. The local file path, file name, and SHA are added to the Execution's context variables.

The execution then runs. After the Execution completes, the `transitionState` method will be called with an state of `Used`, allowing the plugin to retain or delete the file.

If an Execution, Job, or Project is deleted, all file records associated with the given entity are also deleted,
and the plugin `transitionState` method is called with a state of `Deleted`.

## Configuration

To enable the plugin, The plugin provider is specified in [rundeck-config.properties](/administration/configuration/config-file-reference.md#rundeck-config.properties):

    rundeck.fileupload.plugin.type=[provider]

"Instance" scoped plugin properties will be configured on each File Option in a Job, and the property values will be pased to the `uploadFile` method.

(Note: currently "Project" scoped properties are not supported.)

"Framework" scoped properties of the plugin you can add configuration values to the framework scope are set in [framework.properties](/administration/configuration/config-file-reference.md#framework-properties)

    framework.plugin.FileUpload.[provider].[property]=value

## Java Plugin Type

Plugins must implement the [FileUploadPlugin] interface, and declare as a provider of service `FileUpload`.

Methods:

- `void initialize();`: Initialize the plugin.
- `String uploadFile(final InputStream content,final long length,final String refid,Map<String, String> config)`: upload a file for a job option, specifies the refid, and instance configuration properties.
- `boolean hasFile(String ref)`: return true if the file with given refid can be retrieved
- `void retrieveFile(String ref, OutputStream out)`: retrieve the file content to the output stream
- `removeFile(String refid)`: (unused) may be called to remove the file
- `InternalState transitionState(String reference, ExternalState state)`: plugin should retain or delete the file

[fileuploadplugin]: {{{javaDocBase}}}/com/dtolabs/rundeck/plugins/file/FileUploadPlugin.html
