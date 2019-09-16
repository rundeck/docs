# OpenSSH Node Execution Plugins

This plugin provides a node-executor and file-copier using OpenSSH. Use this plugin if you want to access remote servers using SSH/SCP commands (as an alternative to the default SSH plugin of Rundeck, which is a Java Plugin based on JSCH library).

## Requirements

- Password Authentication and Passphrase need `sshpass` installed on the rundeck server.
- For passing passphrase `sshpass` version 1.0.6+ is needed

## Dry run mode

You can configure the plugin to just print the invocation string to the console. This can be useful when defining the configuration properties.

## Plugin Configuration Properties

- Private Key or Password Authentication.
- Private Key can be used with Passphrase
- Both password and private key are taken from the key storage.
- It accepts custom SSH settings
- Attributes can be defined at Project or Node level (eg: ssh-authentication, ssh-password-storage-path, ssh-options, ssh-key-storage-path)
- Dry run? If set true, just print the command invocation that would be used but do not execute the command. This is useful to preview.

## Configuration

The plugin can be configured as a default node executor and file copier for a Project. Use the Simple Configuration tab to see the configuration properties.

![Project Settings](~@assets/img/openssh-project-configuration.png)

Also, you can define the configuration at Node Level, setting the node-executor and file-copier attributes.

```
<node name="RemoteNode"
       description="Remote SSH Node"
       tags="vagrant"
       hostname="192.168.0.1"
       osArch="Linux"
       osFamily="x86_64"
       osName="Linux"
       osVersion="10.12.6"
       username="vagrant"
       node-executor="ssh-exec"
       file-copier="ssh-copier"
       ssh-authentication="password"
       ssh-password-storage-path ="keys/node/user.password"
       ssh-options="-o ConnectTimeout=5000"/>
```
