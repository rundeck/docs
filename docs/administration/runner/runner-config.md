---
redirectFrom: /administration/runner/runner-advancedsetup
title: "Custom Configuration"
---

## Proxying Runner connections

Runners can be configured to connect through a HTTP/HTTPS proxy. Proxies are commonly used to centralize and secure outbound traffic from the datacenter to internet services. The proxy configuration is optional and is added as java command line arguments when the runner process is started.

### Proxy configuration without proxy authentication

The following example will allow the runner to connect through the secure company proxy with address wp.acme.corp.

```
java -Dmicronaut.http.client.proxy-type=http -Dmicronaut.http.client.proxy-address=wp.acme.corp:443 -jar pdrunner.jar
```

1. `-Dmicronaut.http.client.proxy-type` is set to `http`
1. `-Dmicronaut.http.client.proxy-address` is set to the secure proxy company address.

### Proxy configuration with proxy authentication

The following example adds basic auth proxy configuration to the runner. The proxy-type and proxy-address settings are the same as the unauthenticated access example.

```
java -Dmicronaut.http.client.proxy-type=http -Dmicronaut.http.client.proxy-address=wp.acme.corp:443 -Dmicronaut.http.client.proxy-username=proxyUsernameString -Dmicronaut.http.client.proxy-password=proxyPassString -jar pdrunner.jar
```

1. `-Dmicronaut.http.client.proxy-username` is set to the user that is allowed to connect through the secure proxy.
1. `-Dmicronaut.http.client.proxy-password` is set to the secure proxy user password.

## Runner APIs

[Runner APIs](/api#runner-management) are available to create, edit, download, and delete Runners.

## Override temporary directory

To override the temporary directory used by the Runner, add these parameters when starting it.

`runner.rundeck.overrideTempDir:` 'true' to override the temporary directory, or 'false' to retain the default directory. Default value: 'false'

`runner.dirs.tmp:` the new temporary directory. Default value: '/temp'.

Example:
```
java -Drunner.rundeck.overrideTempDir=true -Drunner.dirs.tmp=/your/custom/dir -jar runner.jar
```
