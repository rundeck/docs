# File Transfer Plugins

<!---
Original:
http://download.rundeck.com/plugins/file-transfer-plugin.html
--->

This plugin provides FTP/SFTP/HTTP file transfers via Workflow Steps.
It is available since 2.1.0 (Rundeck Enterprise Version History)

## Configuration

**Source**

- **URL (required)**: URL for the source host. Supported protocols are: file, ftp, sftp, http, https.

- **Username**: Username for the source server. Required only if the protocol is not `file://`.

* **Authentication Type**: Source Authentication Type. Required only if the protocol is not `file://` (Key authentication just enable for SFTP protocol)

* **Password**: Password for the source FTP client. Required only if the protocol is not `file://`.

* **Private Key**: Private Key path for the source FTP client (Just for SFTP protocol).

**Destination**

- **URL (required)**: URL for the destination file. Supported protocols are: file, ftp, sftp.

- **Username**: Username for the destination server. Required only if the protocol is not `file://`.

- **Authentication Type**: Destination Authentication Type. Required only if the protocol is not `file://` (Key authentication just enable for SFTP protocol)

- **Password**: Password for the source FTP client. Required only if the protocol is not `file://`.

- **Private Key**: Private Key path for the destination (Just for SFTP protocol).

**Options**

- **BackUp on Destination file exists?**: Should back up on the Destination file if already exits?.

- **BackUp on Source?**: Should back up on the Source?.

- **Backup on Source Path**: Will use the same protocol, host, and credentials than the source.

- **Delete file after operation?**: Should the file be deleted after complete the operation?.

## SSH Keys settings

### SFTP Host Keys setup.

The SFTP endpoint of this plugin uses the SSH protocol for communication, which needs a trusted base of keys for identifying each host.
This key base is commonly known in the Linux world as the `$HOME/.ssh/known_hosts` file.

This plugin uses the same file format to search for the host's keys, searching them at the `$RDECK_BASE/.ssh/known_hosts` file.
If a server is not specified in this file, SFTP communication will not work. In this case, you will see an error like this in the log:

```
Error [JSchException] creating SFTP endpoint: UnknownHostKey: 10.10.10.4. RSA key fingerprint is 23:7a:96:8f:02:b5:0d:ad:ee:ec:69:ad:b8:c3:1b:30
```

### Installing a host key.

To install a host key you need to retrieve the key first. This is easily done on a Linux server using the following command:

```
ssh-keyscan -t rsa <SERVER ADDRESS>
```

This command will output a text line.

For example, the command `ssh-keyscan -t rsa 10.10.10.4` should output:

```
10.10.10.4 ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDR8LIJso4j+8l5p5Kx4Vm3gZEFzeChihD2nRqJvXZqjpo64bs6AjT8ismwTjAlzJVeFTiRW5/Kj/HAk2ipVTaNbqdwSrKBKewu0BwSWuY84VWZGC4V1R2QUS6+nMeXdi+A0BJFW3rM6uyhb+EgtyOd4ZnwKAoF01FW76zvdY3O0erwcxLZHP8y92C/Qgy+2ii8xfVGrmUNkX+neoNisMllyr+UOXzpPWFmPgyCE7r7Cptishj66XFfQI+xh5HiVL4sbnGP3jX8fC3C802znZ9XgGVENxdwIZqWfc8JzsjfHF6HD7lY/zgS5r/JcxX5Zt4gGjmzy0inJRogWCwXI1+r
```

Copy this line entirely (be very careful to copy all characters) and paste it into the `$RDECK_BASE/.ssh/known_hosts` file.
Ensure each hostkey text is one single line on the file. If the address reported at this text does not match the IP you need on your Rundeck server, you can change the IP address manually.
You must be careful to not modify any text character besides the server address.

### What if my Rundeck server is a windows server?

If Rundeck is running in a windows server, you have a few options:

You can run the above command on a Linux server (even the destination server is useful) and copy the text to your Rundeck’s known_hosts file.
Be sure to set the correct address at the start of the line.

You can a windows SSH client to retrieve the hostkey. Be sure to retrieve the key in the correct “known_hosts” format.
You can install OpenSSH on Windows to provide the `sh-keyscan` command.
Known Issues
When using SFTP protocol, JSCH will search for the host key at `%RDECK_BASE%/.ssh/known_hosts` file, however, the Java JVM and JSCH do not provide the default encryption algorithms used by OpenSSH (ecdsa-sha2-nistp256 as of 07-2016) resulting in failure on finding the server key even if the server is present in the known_hosts file.

As a workaround, be sure to extract the hostkey using the `-t rsa` parameter for `sh-keyscan`:

```
ssh-keyscan -t rsa <SERVER ADDRESS>
```

If you DO need the use of strongest encryption methods (like ecdsa), you must install the Java Cryptography Extension (JCE) Unlimited Strength Jurisdiction Policy Files on your JVM.

More info on this issue [here](http://stackoverflow.com/questions/30846076/jsch-algorithm-negotiation-fail)

## Examples

### Copy from SFTP to Local

This job copy a file from remote machine to the Rundeck server using SFTP

```
- defaultTab: summary
  description: 'Copy a file from SFTP server to rundeck'
  executionEnabled: true
  group: FileTransfer
  loglevel: INFO
  name: FileTransferSftp
  nodeFilterEditable: false
  scheduleEnabled: true
  sequence:
    commands:
    - configuration:
        backupDestinationFile: 'false'
        backupSourceFile: 'false'
        deleteFile: 'false'
        destURLString: file:///var/lib/rundeck/
        sourceAuthentication: password
        sourcePassword: keys/node/user.password
        sourceURLString: sftp://stfp-sever:/home/user/somefile.dat
        sourceUsername: user
      nodeStep: true
      type: filetransfer
    keepgoing: false
    strategy: node-first
```

### Copy from Local to FTP

This job copy a file from the Rundeck server to a remote machine using FTP

```
- defaultTab: summary
  description: 'Copy a file from local to a FTP server'
  executionEnabled: true
  group: FileTransfer
  loglevel: INFO
  name: FileTransferFtp
  nodeFilterEditable: false
  scheduleEnabled: true
  sequence:
    commands:
    - configuration:
        backupDestinationFile: 'false'
        backupSourceFile: 'false'
        deleteFile: 'false'
        destAuthentication: password
        destPassword: keys/node/windows.password
        destURLString: ftp://windows-server/tmp/
        destUsername: Administrator
        sourceURLString: file:///var/lib/rundeck/test.txt
      nodeStep: true
      type: filetransfer
    keepgoing: false
    strategy: node-first

```
