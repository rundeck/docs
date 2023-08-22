# Use Apache 2.4 as a Reverse Proxy with custom URL and GSSAPI

This section summarizes one possible configuration setup that can be used to expose Rundeck
from an apache2 reverse proxy with a custom url path and GSSAPI authentication (with delegated headers).
In this way Rundeck can be hosted together with other applications in the same url structure.

The final goal is to expose to the outside world Rundeck as `http://srv.example.com/rundeck/`
while the actual server (in this example) is running in the same VM but bound locally as `http://127.0.0.1:4440/rundeck/`.

In addition authentication will be transparently handled by apache2 via GSSAPI,
which is an easy way to implement SSO where Active Directory (or Kerberos) is available.

The proposed approach for looking up user roles is very simple and perhaps suitable only for a small user base
and should be hardened in case of peculiar characters in users principals (e.g. `..`, `/`, etc).


# Prerequisites

We assume that inside the VM:
* Rundeck has been already set up with all the necessary configuration options for DB, logging, etc.
* Apache2 is running with the necessary modules enabled (proxy, gssapi, etc)
* A valid keytab has been generated and contains the correct principal keys (in this case HTTP/srv.example.com@EXAMPLE.COM)

Please refer the relevant documentation for more details:
*   [apache2 proxy balancer](https://httpd.apache.org/docs/2.4/mod/mod_proxy_balancer.html)
*   [apache2 gssapi](https://github.com/gssapi/mod_auth_gssapi)

It is important to test the correct behavior of the GSSAPI configuration before attempting to apply it to Rundeck.



# Configuration Steps

The configuration on apache2 for exposing Rundeck can be set up in different ways, in this case we will  use the proxy balancer module.
The configuration is straightforward, however particular care must be applied to absence of an ending `/` in the various urls.


The `GSSAPI` (and related `RequestHeader`) configuration is of course optional
and if applied should be customized with the actual location of the keytab files and domain name `EXAMPLE.COM`.
In addition the stripping of the domain name `EXAMPLE.COM` from the `Uiid` field should be updated as well, if needed.

Last but not least, the look up of user roles, necessary for the correct execution of the authorization process on Rundeck side,
is implemented by reading one file named as the user principal and located under the folder `/etc/apache2/rundeck-roles/`.
The file contains one row with the list of roles specific to the user, for example `admin,user`.


```
<Proxy balancer://rundeck>
    BalancerMember http://127.0.0.1:4440/rundeck
    ProxySet lbmethod=bytraffic
</Proxy>

<Location /rundeck>
    AuthType GSSAPI
    AuthName "GSSAPI Single Sign On Login"
    GssapiCredStore keytab:/etc/http.keytab
    Require valid-user

    RequestHeader set X-Forwarded-Uuid expr=%{REMOTE_USER}
    RequestHeader edit X-Forwarded-Uuid "\@EXAMPLE.COM$" ""

    RequestHeader set X-Forwarded-User-Email expr=%{REMOTE_USER}

    RequestHeader set X-Forwarded-Roles expr=%{file:/etc/apache2/rundeck-roles/%{REMOTE_USER}}
    RequestHeader edit X-Forwarded-Roles "\n" ""

    ProxyPass "balancer://rundeck"
    ProxyPassReverse "balancer://rundeck"
</Location>
```

In addition to the configuration of apache2, it is necessary to tune also Rundeck configuration
so that the actual server can bind to a local port and serve contents under `/rundeck` path, instead of the default root `/`.

The first configuration file to update is `etc/profile` where we modify the context path of the servlet container:
```
export RDECK_JVM=".... -Dserver.servlet.context-path=/rundeck ...."
```

The second configuration file to update is `server/config/rundeck-config.properties`:
```
grails.serverURL=http://srv.example.com/rundeck
server.contextPath=/rundeck
server.servlet.context-path=/rundeck
```

If delegated authentication is needed the following additional options need to be added to `server/config/rundeck-config.properties`:
```
rundeck.security.authorization.preauthenticated.enabled=true
rundeck.security.authorization.preauthenticated.attributeName=REMOTE_USER_GROUPS
rundeck.security.authorization.preauthenticated.delimiter=,
rundeck.security.authorization.preauthenticated.userNameHeader=X-Forwarded-Uuid
rundeck.security.authorization.preauthenticated.userRolesHeader=X-Forwarded-Roles

rundeck.security.authorization.preauthenticated.userFirstNameHeader=X-Forwarded-User-FirstName
rundeck.security.authorization.preauthenticated.userLastNameHeader=X-Forwarded-User-LastName
rundeck.security.authorization.preauthenticated.userEmailHeader=X-Forwarded-User-Email

#sync user info headers at each login
rundeck.security.authorization.preauthenticated.userSyncEnabled=true
```
