# VMWare Node Source (Enterprise)
::: enterprise
:::

The VMWare resource model plugin gets the VMs from a VSphere ESXi server or VCenter Server as Rundeck Nodes.

### Configuration Options:

- **Custom Mapping**:

The custom mapping option allows you to get custom/default node attribute based on Vmware API values.
Add custom mappings in the form `attributeName.selector=vmAttribute` or `attributeName.default=value`, separated by new line.

For example, to add a `status` attribute based on a VM's attribute, you can use `status.selector=guest.guestState`

To create an attribute based on concatenated fields, used comma to concatenated them: `nodename.selector=vm.name,vm.dataCenter`

Custom tags can be added based on VM's attributes, for example `tags.selector=guest.guestState,guest.toolsStatus`

Default values can be added using `attributeName.default=format`.

Also, the default values can be used per `osFamily` value, for example: `username.windows.default=Administrator`, `username.linux.default=root`

Example of a custom mapping:

```
username.default=rundeck
username.windows.default=Administrator
username.linux.default=root
node-executor.windows.default=WinRMPython
file-copier.windows.default=WinRMcpPython
winrm-password-storage-path.windows.default=keys/vwmare/windows.password
nodename.selector=vm.name,vm.dataCenter
```

In case you work on multiples Data-Center environment, you can use the Data-Center name as part of the node name, to avoid duplicate nodes from VMs that has the same name.
For example, add this on the custom mapping: `nodename.selector=vm.name,vm.dataCenter`

- **Just Running VMs.**: Filter by running vms
- **DataCenter**: (Optional) filter by DataCenter. Leave it blank for all DataCenters
- **Ip Address Selector**: Filter Multiples IP Address. In case the Vms has more that one IP address, you can select one of them using a IP pattern like `192.168.0.*`
- **Display attribute with subgroups**: Display node attribute with subgroups (format group.subgroup)
- **Attributes group**: List attributes group to display of the VMs. Options are: Guest,Config,Runtime,Summary

### Authentication Options:

- **URL Server**: URL of the Server, eg: https://vmware-server
- **Username**: Login Username
- **Password**: Username Password
- **Ignore SSL certificate**: Connecting with the server ignoring the SSL certificate. If this is false, you will need to add the certificate to the truststore.

### Connecting using Certificate

For now, to verify the certificate you need to add it to the truststore of Rundeck or Java:

- get the certificate from VSphere/VCenter Server:

```
openssl s_client -showcerts -connect server:443
```

- put the certificate on a file, for example: `vmware-vm.cert`

Certificates are PEM encoded and start with `-BEGIN CERTIFICATE--` end with `--END CERTIFICATE--` inclusive.

- Add the certificate to the truststore

```
keytool -import -alias WmWare-cert -file vmware-vm.cert -keystore  $RDECK_BASE/etc/truststore -storepass adminadmin

```

For Rundeck launcher, the truststore file will be located on `$RDECK_BASE/etc/`, for deb/rpm package will be located on `/etc/rundeck/ssl/`

- (Optional) You can also add the certificate to the JVM

```
keytool -import -alias WmWare-cert -file vmware-vm.cert -keystore $JAVA_HOME/lib/security/cacerts -storepass changeit

```
