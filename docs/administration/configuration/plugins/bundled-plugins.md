# Bundled Plugins

Rundeck comes with several plugins out of the box. _Built-in_ plugins are part of the core installation, and do not
have an associated plugin file. _Bundled_ plugins come packaged in a plugin file,
and are installed in the `libext` dir automatically at installation time.

## SSH Plugins

Defines SSH Node Executor and SCP File Copier.

- See [SSH Plugins](/manual/projects/node-execution/ssh.md)

File: _none_ (built-in)

## Built-in Resource Model Sources

Rundeck comes with four built-in Resource Model Source providers, see [Resource Model Source Plugins](/manual/projects/resource-model-sources/builtin.md):

- File: Parses a file in one of the supported [Model Source Formats](#built-in-resource-model-formats)
- Directory: Scans all files in a directory in one of the supported formats
- URL: Loads a file from a URL in one of the supported formats

File: _none_ (built-in)

## Built-in Resource Model Formats

Rundeck comes with three Resource Model Format plugins, see [Resource Model Source Plugins](/manual/projects/resource-model-sources/builtin.md#resource-model-document-formats):

- XML: the [resourcexml](/manual/document-format-reference/resource-v13.md) format
- YAML: the [resourceyaml](/manual/document-format-reference/resource-yaml-v13.md) format
- JSON: the [resourcejson](/manual/document-format-reference/resource-json-v10.md) format

File: _none_ (built-in)

## Script Plugin

Defines Script Node Executor and Script File Copier.

For more detail see [Script Plugin](/manual/projects/node-execution/script.md).

Executes an external script file to perform the command, useful for developing your own plugin with the [Script Plugin Development](/developer/script-plugin-development.md) model.

File: `rundeck-script-plugin-{{$rundeckVersionFull}}.jar`

## Stub Plugin

Provides a Node Executor, File Copier, and Resource Model Source. This plugin can be used for testing.

The `stub-plugin` includes these providers:

- `stub` for the NodeExecutor service
- `stub` for the FileCopier service
- `stub` for the ResourceModelSource service

(Refer to [Configuring - Node Execution](/administration/configuration/plugins/configuring.md#node-execution) to enable them.)

This plugin does not actually perform any remote file copy or command execution,
instead it simply echoes the command that was supposed to be executed, and
pretends to have copied a file.

This is intended for use in testing new Nodes, Jobs or Workflow sequences without
affecting any actual runtime environment.

You can also test some failure scenarios by configuring the following node attributes:

`stub-exec-success`="true/false"

: If set to false, the stub command execution will simulate command failure

`stub-result-code`

: Simulate the return result code from execution

You could, for example, disable or test an entire project's workflows or jobs by
simply setting the `project.properties` node executor provider to `stub`.

File: `rundeck-stub-plugin-{{$rundeckVersionFull}}.jar`

## Local Execution Plugin

A Node Step plugin which executes a command locally instead of on a target node.

File: `rundeck-localexec-plugin-{{$rundeckVersionFull}}.jar`

## Job State Plugin

Provides a Workflow Step:

- Job State Conditional: Can query and assert the state of another Job, such as running, succeeded, failed, etc, and optionally halt the current execution.

File: `rundeck-job-state-plugin-{{$rundeckVersionFull}}.jar`

## Flow Control Plugin

Provides a Workflow Step:

- Flow Control: Can halt the execution with a custom status, useful as an Error handler.

File: `rundeck-flow-control-plugin-{{$rundeckVersionFull}}.jar`

## AES-GCM Encryption Plugin

Provides an encryption [storage converter](/administration/configuration/storage-facility.md#storage-converters) for the Storage facility. Can be used to encrypt the contents of Key Storage,
and Project Configuration stored in the DB or on disk.

This plugin provides password-based authenticated encryption using AES-256-GCM with PBKDF2 key derivation via [Bouncycastle][]. It can also transparently decrypt data encrypted by the previous Jasypt-based plugin, enabling seamless upgrades.

[bouncycastle]: https://www.bouncycastle.org/

Password can be specified directly, or via environment variables (the `*EnvVarName` properties), or Java System properties (the `*SysPropName` properties).

To enable it, see [Configuring - Storage Converter Plugins](/administration/configuration/plugins/configuring.md#storage-converter-plugins).

See also: [Key Storage](/manual/key-storage/index.md)

Provider type: `aes-gcm-encryption`

:::tip Backward Compatibility
The legacy provider name `jasypt-encryption` is still supported as an alias. Existing configurations do not need to be changed after upgrade.
:::

The following encryption properties marked with `*` can be set directly,
using the property name shown,
but they can all also be set dynamically using either an Environment variable,
or a Java System Property.
Append either `EnvVarName` for the environment variable,
or `SysPropName` to use the Java System Property.
If a System Property is specified: it is read in once and used by the initialization of the converter plugin,
then the Java System Property is set to null so it cannot be read again.

#### Configuration properties

`password*`
: The encryption password. This is the only required property.

Example configuration for **new installations**:

```properties
rundeck.storage.converter.1.type=aes-gcm-encryption
rundeck.storage.converter.1.path=keys
rundeck.storage.converter.1.config.password=YOUR_ENCRYPTION_PASSWORD
```

```properties
rundeck.config.storage.converter.1.type=aes-gcm-encryption
rundeck.config.storage.converter.1.path=projects
rundeck.config.storage.converter.1.config.password=YOUR_ENCRYPTION_PASSWORD
```

#### Legacy properties (only needed when upgrading from a previous version)

The following properties are only needed if you are upgrading from a Rundeck version that used the old `jasypt-encryption` plugin and you have existing encrypted data in your database. They tell the plugin how to **decrypt** that old data. New encryptions always use AES-256-GCM regardless of these settings.

:::info
If you are upgrading from a standard Rundeck installation (default settings), just add `encryptorType=custom` and use the same password you had before. No other legacy properties are needed.
:::

`encryptorType`
: Identifies the legacy encryptor format used on existing data. Either `basic` or `custom`. Default: 'custom'.

    * `custom` — decrypts using algorithm `PBEWITHSHA256AND128BITAES-CBC-BC` with BC provider (the Rundeck default since 2014)
    * `basic` — decrypts using algorithm `PBEWithMD5AndDES`

`algorithm`
: (optional) Only needed if you previously configured a non-default algorithm. Overrides the legacy algorithm for decrypting existing data.

`provider`
: (optional) Only needed if you previously used a non-default JCE provider. Default: 'BC' (Bouncycastle).

`keyObtentionIterations`
: (optional) Only needed if you previously changed this from the default. Default: 1000.

Example configuration for an **upgrade** from a standard Rundeck installation:

```properties
rundeck.storage.converter.1.type=aes-gcm-encryption
rundeck.storage.converter.1.path=keys
rundeck.storage.converter.1.config.password=YOUR_EXISTING_PASSWORD
rundeck.storage.converter.1.config.encryptorType=custom
```

```properties
rundeck.config.storage.converter.1.type=aes-gcm-encryption
rundeck.config.storage.converter.1.path=/
rundeck.config.storage.converter.1.config.password=YOUR_EXISTING_PASSWORD
rundeck.config.storage.converter.1.config.encryptorType=custom
```

File: `rundeck-aes-gcm-encryption-plugin-{{$rundeckVersionFull}}.jar`

:::tip
Note: the specific PBE algorithms available for use with the `encryptorType=custom` come from installed JCE providers.  BouncyCastle is included but others are provided by the specific JDK you use.  Here is a sample list of PBE providers using BouncyCastle and OpenJDK 1.8:
:::

<details>
   <summary>Sample list of PBE providers</summary>

PBE ALGORITHMS:      
* PBEWITHHMACSHA1ANDAES_128
* PBEWITHHMACSHA1ANDAES_256
* PBEWITHHMACSHA224ANDAES_128
* PBEWITHHMACSHA224ANDAES_256
* PBEWITHHMACSHA256ANDAES_128
* PBEWITHHMACSHA256ANDAES_256
* PBEWITHHMACSHA384ANDAES_128
* PBEWITHHMACSHA384ANDAES_256
* PBEWITHHMACSHA512ANDAES_128
* PBEWITHHMACSHA512ANDAES_256
* PBEWITHMD2ANDDES
* PBEWITHMD5AND128BITAES-CBC-OPENSSL
* PBEWITHMD5AND192BITAES-CBC-OPENSSL
* PBEWITHMD5AND256BITAES-CBC-OPENSSL
* PBEWITHMD5ANDDES
* PBEWITHMD5ANDRC2
* PBEWITHMD5ANDTRIPLEDES
* PBEWITHSHA1ANDDES
* PBEWITHSHA1ANDDESEDE
* PBEWITHSHA1ANDRC2
* PBEWITHSHA1ANDRC2_128
* PBEWITHSHA1ANDRC2_40
* PBEWITHSHA1ANDRC4_128
* PBEWITHSHA1ANDRC4_40
* PBEWITHSHA256AND128BITAES-CBC-BC
* PBEWITHSHA256AND192BITAES-CBC-BC
* PBEWITHSHA256AND256BITAES-CBC-BC
* PBEWITHSHAAND128BITAES-CBC-BC
* PBEWITHSHAAND128BITRC2-CBC
* PBEWITHSHAAND128BITRC4
* PBEWITHSHAAND192BITAES-CBC-BC
* PBEWITHSHAAND2-KEYTRIPLEDES-CBC
* PBEWITHSHAAND256BITAES-CBC-BC
* PBEWITHSHAAND3-KEYTRIPLEDES-CBC
* PBEWITHSHAAND40BITRC2-CBC
* PBEWITHSHAAND40BITRC4
* PBEWITHSHAANDIDEA-CBC
* PBEWITHSHAANDTWOFISH-CBC

</details>

## Git Plugin

- See [SCM Git Plugin](/manual/projects/scm/git.md)

Provides SCM Export and SCM Import providers for Git.

File: `rundeck-git-plugin-{{$rundeckVersionFull}}.jar`

## Copy File Plugin

Provides a Node Step that can copy a file to a node, using the Node's File Copier.

File: `rundeck-copyfile-plugin-{{$rundeckVersionFull}}.jar`
