# ServiceNow Resource Model Source

This is a Resource Model Source plugin that provides server information from ServiceNow's CMDB.

To obtain the data, the Service Now connection parameters must be passed as parameters to the plugin
(username, password and url), and a list of server types, this can be:

- all : Retrieve al types of servers
- linux : Retrieve only linux machines
- win : Retrieve only Windows machines
- unix : Retrieve only unix machines
- esx: Retrieve only ESX machines
- solaris: Retrieve Solaris linux machines
- aix: Retrieve only AIX machines
- hpux: Retrieve only HPUX machines
- osx: Retrieve only OS X machines
- netware: Retrieve only Netware machines
- comma separated list : as example 'linux,win'

### Mapping and default values

- `mappingParams`: A set of ";" separated mapping entries. This values are going to override the default mapping
  one by one.
  The minimal maping needed is the `username, because Service Now servers lacks a username field to map:

```
username.default=root
```

### Default Mapping

```
nodename.selector=name
hostname.selector=host_name,ip_address,dns_domain
sshport.default=22
description.default=Service Now node instance
description.selector=short_description
osFamily.default=unix
osName.selector=os
osName.default=Linux
osVersion.selector=os_version
ipAddress.selector=ip_address
cpuCoreCount.selector=cpu_core_count
cpuCount.selector=cpu_count
cpuCpeed.selector=cpu_speed
cpuType.selector=cpu_type
osDomain.selector=os_domain
tags.selector=asset_tag
tags.default=servicenow
```

### Configuration of the Mapping

The node requieres at least the nodename, hostname and user.
A selector with a list like this:

```
hostname.selector=host_name,ip_address,dns_domain
```

Are going to search on the result of the query the value of `host_name`, if is not set, the `ip_address` or the
`dns_domain`.

A selector with a defualt value like this example:

```
osName.selector=os
osName.default=Linux
```

Are going to search the `os` value, if not set, are going to use the default value `Linux`.

The special case of the tags, if multiple tags are set using comma, all are going to be searched and used.

```
tags.selector=asset_tag,os
tags.default=servicenow
```

If is none of the `asset_tag` or `os` exists, the default tag are going to be used `servicenow`.

In the case only the default value exists, this fixed value are going to be set.

```
osFamily.default=unix
```
