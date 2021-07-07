# Authenticating Users

Rundeck can be configured to use several mechanisms
to authenticate a user, and determine the user's authorized roles.

Primarily these are:

- [Single Sign On](#single-sign-on)
- [JAAS](#jetty-and-jaas-authentication)
- [Container Authentication](#container-authentication-and-authorization)
- [Preauthenticated Mode](#preauthenticated-mode)

For the default installation (Executable War, RPM, Deb),
the Servlet Container is Jetty,
and the default security mechanism is JAAS,
so you are free to use what ever JAAS provider
you feel is suitable for your environment.
See [JAAS](https://en.wikipedia.org/wiki/Java_Authentication_and_Authorization_Service)
and specifically for Jetty,
[JAAS for Jetty](https://wiki.eclipse.org/Jetty/Feature/JAAS).

If you use the Rundeck war file with a different container, such as Tomcat, refer to [Container authentication and authorization](#container-authentication-and-authorization) below.

# Single Sign On

See [Security > Single Sign On](/administration/security/sso.md).

# Require Roles For Sign On

By default, when users who are not granted access to any projects try to login, they are directed to a page that says they don't have any roles at the moment. However, if you would like to require roles to even get passed the login screen, that is possible. If you require roles for sign on, then if a user without a role tries to login, they will not be able to get into the Rundeck portal. In order to require roles for sign on, add the following line to the rundeck-config.properties file:
```bash
rundeck.security.requiredRole=Your_Role_Name
```
where Your_Role_Name is the name of the group you wish to grant access to.

# Jetty and JAAS authentication

Rundeck has three basic JAAS modules.

1. [PropertyFileLoginModule](#propertyfileloginmodule)
2. [LDAP](#ldap)
3. [PAM](#pam)

By default a new installation uses the realm.properties method.

Each method determines whether the user is authenticated, and what _roles_ they have.

The list of roles can be accepted as-is (default), or you can add a prefix to them using the following config in rundeck-config.properties:

    rundeck.security.jaasRolePrefix=PREFIX_

## PropertyFileLoginModule

:::warning
It is recommended to use `BCRYPT` encrypted passwords with `realm.properties` as it is the most secure option available. Avoid `plain`, `MD5`, and `CRYPT`.
:::

- NOTE: The `org.eclipse.jetty.jaas.spi.PropertyFileLoginModule` JAAS module will automatically add the username as a role to the login credentials.  
If you do not want this behavior please use the `org.rundeck.jaas.jetty.ReloadablePropertyFileLoginModule` module.*

These instructions explain how to manage user credentials for
Rundeck using a text file containing usernames, passwords and role definitions.
Usually this file is called <code>realm.properties</code>.

The default Rundeck installation handles user authentication via
JAAS using the realm.properties file.
This file is created at the time that you install the server.

Location:

- Executable War: `$RDECK_BASE/server/config/realm.properties`
- RPM/DEB: `/etc/rundeck/realm.properties`

Assuming it wasn't modified, your realm.properties file will
probably look something like this:

```bash .numberLines 
#
# This file defines users passwords and roles for a HashUserRealm
#
# The format is
#  <username>: <password>[,<rolename> ...]
#
# Passwords may be clear text, obfuscated or checksummed.
#
# This sets the default user accounts for the Rundeck apps
#
admin:admin,user,admin
user:user,user
```

_Adding additional users_

You may wish to have additional users with various privileges rather
than giving out role accounts to groups. You may also want to avoid
having the passwords in plaintext within the configuration file.

To accomplish this, you'll need a properly hashed or encrypted
password to use in the config. Rundeck has a built in command line utility to
encrypt passwords. The default encryption service is the Jetty password utility.

In this example,
we'll setup a new user named "jsmith", with a password of "mypass":

```
$ java -jar rundeck-{{{rundeckVersionFull}}}.war --encryptpwd Jetty
Required values are marked with: *
Username (Optional, but necessary for Crypt encoding):
jsmith    <-----Type this value
*Value To Encrypt (The text you want to encrypt):
mypass    <-----Type this value

==ENCRYPTED OUTPUT==
obfuscate: OBF:1xfd1zt11uha1ugg1zsp1xfp
md5: MD5:a029d0df84eb5549c641e04a9ef389e5
crypt: CRYPT:jsnDAc2Xk4W4o
bcrypt: BCRYPT:a029d0df84eb5549c641e04a9ef389e5
```

:::warning
Some salt revisions for BCRYPT are security concerns in our spring security, so `$2a$` works but `$2y$` does not. 
:::

Then add this to the `realm.properties` file with a line like so:

    jsmith: BCRYPT:a029d0df84eb5549c641e04a9ef389e5,user,admin

Then restart Rundeck to ensure it picks up the change and you're done.

There is also a password encrypter utility user interface in the Rundeck application that
can be used to generate encrypted passwords. Click the gear icon and then "Password Utility" to use that interface.

**Warning**

The use of `CRYPT` comes with limitations. Only the first 8 characters of the
provided password will be validated when authenticating. This encryption scheme
should be avoided if possible.

#### Hot Reloading the `realm.properties` file

If you want your changes to the `realm.properties` file to be picked up without having to restart Rundeck change the module specified in the JAAS config file from `org.eclipse.jetty.jaas.spi.PropertyFileLoginModule` to `org.rundeck.jaas.jetty.ReloadablePropertyFileLoginModule`

The refresh interval for checking the file is 5 seconds. This is not configurable.

For example, the following configuration uses the non-reloadable `realm.properties`

    RDpropertyfilelogin {
        org.eclipse.jetty.jaas.spi.PropertyFileLoginModule required
        debug="true"
        file="/etc/rundeck/server/config/realm.properties";
    };

This configuration would enable hot reloading:

    RDpropertyfilelogin {
        org.rundeck.jaas.jetty.ReloadablePropertyFileLoginModule required
        debug="true"
        file="/etc/rundeck/server/config/realm.properties";
    };

## LDAP

LDAP and Active Directory configurations are created in the same way, but your LDAP structure may be different than Active Directory's structure.

Rundeck includes two JAAS login modules you can use for LDAP directory authentication:

- `JettyCachingLdapLoginModule` Performs LDAP authentication and looks up user roles based on LDAP group membership
- `JettyCombinedLdapLoginModule` Performs LDAP authentication, and can use "shared authentication credentials" to allow another module to provide authorization lookup for user roles. See [Login module configuration](#login-module-configuration) and [JettyRolePropertyFileLoginModule](#jettyrolepropertyfileloginmodule) and [Multiple Authentication Modules](#multiple-authentication-modules) below.

These are an enhanced version of the default Jetty JAAS Ldap login module that caches authorization results for a period of time.

JAAS supports evaluating `MD5`, `BCRYPT` and `CRYPT` password hashes.

You must change some configuration values to change the authentication module to use.

### Configuration

Configuring LDAP consists of defining a JAAS config file (e.g. "jaas-ldap.conf"), and changing the server startup script to use this file and use the correct Login Module configuration inside it.

#### Sync Rundeck profile from LDAP user attributes

You can use LDAP user attributes to update the email, first name, and last name properties of your Rundeck users.
To enable this feature, add the property: `rundeck.security.syncLdapUser=true` to your `rundeck-config.properties` file.

In your JAAS LDAP login module you can specify the ldap user attributes used to source the email, and name properties.
The properties are:

    userLastNameAttribute="sn"
    userFirstNameAttribute="givenName"
    userEmailAttribute="mail"

These LDAP attributes will be checked when a user logs in, and their Rundeck user profile will be updated from them.

**Note**: By default, all users can log into Rundeck. However, if they do not have the proper authorization, they will not be able to access any projects. If you want to prevent them from even being able to login to rundeck, you can include the following JVM parameter:
`rundeck.security.requiredRole=Your_Role_Name`

#### Step 1: Setup the LDAP login module configuration file

Create a `jaas-ldap.conf` file in the same directory as the `jaas-loginmodule.conf` file.

- RPM/Deb install: `/etc/rundeck/`
- Executable War install: `$RDECK_BASE/server/config`

Make sure the name of your Login Module configuration is the same as you use in the next step. The Login Module configuration is defined like this (e.g. "jaas-ldap.conf" file):

```c 
    ldap {
        // comment line
        ...
    }
```

Where "ldap" is the module name.

#### Step 2: Specify login module

To override the default JAAS configuration file, you will need to supply the Rundeck server with the proper path to the new one, and a `loginmodule.name` Java system property to identify the new login module by name.

The JAAS configuration file location is specified differently between the Executable War and the RPM/Deb.

**For the Executable War**: the `loginmodule.conf.name` Java system property is used to identify the _name_ of the config file, which must be located in the `$RDECK_BASE/server/config` dir.

You can simply specify the system properties on the java commandline:

```bash
java -Drundeck.jaaslogin=true \
     -Dloginmodule.name=ldap \
     -Dloginmodule.conf.name=jaas-ldap.conf \
     -jar rundeck-{{{rundeckVersionFull}}}.war
```

Otherwise, if you are starting the Executable War via the supplied `rundeckd` script, you can modify the `RDECK_JVM` value in the `$RDECK_BASE/etc/profile` file to add two JVM arguments:

```sh
export RDECK_JVM="-Drundeck.jaaslogin=true \
    -Dloginmodule.name=ldap \
    -Dloginmodule.conf.name=jaas-ldap.conf"
```

Note: more information about using the Executable War and useful properties are under [Getting Started - Executable War Options](/administration/install/jar.md#launcher-options).

**For the RPM/DEB installation**:

Declare variables (as the ones from /etc/rundeck/profile) in `/etc/sysconfig/rundeckd` (rpm) or `/etc/default/rundeckd` (deb):

Example:
```
$ cat /etc/sysconfig/rundeckd
JAAS_LOGIN=true
LOGIN_MODULE=ldap
JAAS_CONF=/etc/rundeck/jaas-ldap.conf
```

#### Step 3: Restart rundeckd

RPM/DEB
```bash
service rundeckd restart
```

#### Step 4: Attempt to logon

If everything was configured correctly, you will be able to access Rundeck using your AD credentials. If something did not go smoothly, look at `/var/log/rundeck/service.log` for stack traces that may indicate what is wrong.
To make troubleshooting easier, you may want to add the `-Dcom.dtolabs.rundeck.jetty.jaas.LEVEL=DEBUG` Java system property to the `RDECK_JVM` environment variable above, or as `RDECK_JVM_OPTS="$RDECK_JVM_OPTS -Dcom.dtolabs.rundeck.jetty.jaas.LEVEL=DEBUG"` in /etc/sysconfig/rundeckd for RPM or /etc/default/rundeck for DEB to have enable DEBUG logging for the authentication module.

### Login module configuration

Here is an example configuration file for the `JettyCachingLdapLoginModule`:

```c .numberLines
ldap {
    com.dtolabs.rundeck.jetty.jaas.JettyCachingLdapLoginModule required
      debug="true"
      contextFactory="com.sun.jndi.ldap.LdapCtxFactory"
      providerUrl="ldap://server:389"
      bindDn="cn=Manager,dc=example,dc=com"
      bindPassword="secret"
      authenticationMethod="simple"
      forceBindingLogin="false"
      userBaseDn="ou=People,dc=test1,dc=example,dc=com"
      userRdnAttribute="uid"
      userIdAttribute="uid"
      userPasswordAttribute="userPassword"
      userObjectClass="account"
      userLastNameAttribute="sn"
      userFirstNameAttribute="givenName"
      userEmailAttribute="mail"
      roleBaseDn="ou=Groups,dc=test1,dc=example,dc=com"
      roleNameAttribute="cn"
      roleUsernameMemberAttribute="memberUid"
      roleMemberAttribute="memberUid"
      roleObjectClass="posixGroup"
      cacheDurationMillis="300000"
      reportStatistics="true"
      timeoutRead="10000"
      timeoutConnect="20000"
      nestedGroups="false";
};
```

The `JettyCachingLdapLoginModule` has these configuration properties:

`debug`
: "true/false" - turn on or off debug output

`contextFactory`
: The LDAP context factory class, e.g. "com.sun.jndi.ldap.LdapCtxFactory"

`providerUrl`
: ldap URL for the server, e.g. "ldap://server:389"

`bindDn`
: Optional. If not using "binding" authentication, set this to the root DN that should bind, e.g. "cn=Manager,dc=example,dc=com"

`bindPassword`
: password for root DN. **Note**: The `bindDn` and `bindPassword` must escape any special characters with `\` character. Special characters include `\` (backslash), as well as `!` (exclamation).

`authenticationMethod`
: Authentication method, e.g. "simple"

`forceBindingLogin`
: "true/false" - if true, bind as the user that is authenticating, otherwise bind as the manager and perform a search to verify user password. NOTE: This module can only verify passwords hashed with `MD5` or `CRYPT`. If your LDAP directory contains other hashes you'll likely need to set this to true to be able to authenticate.

`forceBindingLoginUseRootContextForRoles`
: "true/false" - if true and forceBindingLogin is true, then role membership searches will be performed in the root context, rather than in the bound user context.

`userBaseDn`
: base DN to search for users, example: "ou=People,dc=test1,dc=example,dc=com"

`userRdnAttribute`
: Attribute name for username, used when searching for user role membership by DN, default "uid".

`userIdAttribute`
: Attribute name to identify user by username, default "cn".

`userPasswordAttribute`
: Attribute name for user password, default "userPassword".

`userObjectClass`
: Attribute name for user object class, default "inetOrgPerson".

`userLastNameAttribute`
: Attribute name for user's last name, default "sn".

`userFirstNameAttribute`
: Attribute name for user's first name, default "givenName".

`userEmailAttribute`
: Attribute name for user's email address, default "mail".

`roleBaseDn`
: Base DN for role membership search, e.g. "ou=Groups,dc=test1,dc=example,dc=com".

`roleNameAttribute`
: Attribute name for role name, default "roleName".

`roleMemberAttribute`
: Attribute name for a role that would contain a user's DN, default "uniqueMember".

`roleUsernameMemberAttribute`
: Attribute name for a role that would contain a user's username. If set, this overrides the `roleMemberAttribute` behavior.

`roleObjectClass`
: Object class for role, default "groupOfUniqueNames".

`rolePrefix`
: Prefix string to remove from role names before returning to the application, e.g. "rundeck\_".

`cacheDurationMillis`
: Duration that authorization should be cached, in milliseconds. Default "0". A value of "0" indicates no caching should be used.

`reportStatistics`
: "true/false" - if true, output cache statistics to the log.

`supplementalRoles`
: Comma-separated list of role names. All of the given role names will be automatically added to authenticated users. You can use this to provide a "default" role or roles for all users.

`timeoutRead`
: Read timeout value (ms). Default: 0 (no timeout)

`timeoutConnect`
: Connect timeout value (ms). Default: 0 (no timeout)

`nestedGroups`
: "true/false" - Default: false. If true, will resolve all nested groups for authenticated users. For the first user to login after a fresh start it will take a couple of seconds longer, this is when the cache of all nested groups is built. This will happen as often as the cache is refreshed. Uses the cacheDurationMillis for cache timeout. The groups recognized as nested will depend on the `roleBaseDn`, any other role outside of this will not be taken.

The `JettyCombinedLdapLoginModule` is extends the previous module, so is configured in almost exactly the same way, but adds these additional configuration options:

```c .numberLines
ldap {
    com.dtolabs.rundeck.jetty.jaas.JettyCombinedLdapLoginModule required
      ...
      ignoreRoles="true"
      storePass="true"
      clearPass="true"
      useFirstPass="false"
      tryFirstPass="false";
};
```

`ignoreRoles`
: Do not look up role membership via LDAP. May be used with `storePass` and combined with another login module for authorization roles. (See [JettyRolePropertyFileLoginModule](#jettyrolepropertyfileloginmodule))

`storePass`
: Store the user/password for use by subsequent login module.

`clearPass`
: Clear the user/password that was stored after login is successful. (This would prevent any subsequent login modules from re-using the stored credentials. Set it to `false` if you want to continue using the credentials.)

`useFirstPass`
: Use the stored user/password for authentication, and do not attempt to use other mechanism (e.g. login callback).

`tryFirstPass`
: Try to use the stored user/password for authentication, if it fails then proceed with normal mechanism.

### Combining LDAP with other modules

Use the `JettyCombinedLdapLoginModule` to do LDAP authentication, then combine it with the [JettyRolePropertyFileLoginModule](#jettyrolepropertyfileloginmodule) (or some other module) to supply the authorization roles.

The first module should set `storePass="true"`, and the second module should set `useFirstPass="true"` or `tryFirstPass="true"`.

Finally, see the section [Multiple Authentication Modules](#multiple-authentication-modules) about the appropriate configuration Flag to use.

The [PAM](#pam) section is a useful comparison as it uses the same method to combine modules.

### Active Directory

Here is an example configuration for Active Directory. The string _sAMAccountName_ refers to the short user name and is valid in a default Active Directory installation, but may vary in some environments.

```c .numberLines
activedirectory {
    com.dtolabs.rundeck.jetty.jaas.JettyCachingLdapLoginModule required
    debug="true"
    contextFactory="com.sun.jndi.ldap.LdapCtxFactory"
    providerUrl="ldap://localhost:389"
    bindDn="cn=Manager,dc=rundeck,dc=com"
    bindPassword="secret"
    authenticationMethod="simple"
    forceBindingLogin="true"
    userBaseDn="ou=users,dc=rundeck,dc=com"
    userRdnAttribute="sAMAccountName"
    userIdAttribute="sAMAccountName"
    userPasswordAttribute="unicodePwd"
    userObjectClass="user"
    roleBaseDn="ou=roles,dc=rundeck,dc=com"
    roleNameAttribute="cn"
    roleMemberAttribute="member"
    roleObjectClass="group"
    cacheDurationMillis="300000"
    reportStatistics="true";
};
```

### Communicating over secure ldap (ldaps://)

The default port for communicating with active directory is 389, which is insecure. The secure port is 636, but the LoginModule describe above requires that the AD certificate or organizations CA certificate be placed in a truststore. The truststore provided with rundeck `/etc/rundeck/ssl/truststore` is used for the local communication between the cli tools and the rundeck server.

Before you can establish trust, you need to get the CA certificate. Typically, this would require a request to the organization's security officer to have them send you the certificate. It's also often found publicly if your organization does secure transactions.

Another option is to interrogate the secure ldap endpoint with openssl. The example below shows a connection to paypal.com on port 443. The first certificate is the machine and that last is the CA. Pick the last certificate.

_note_ that for Active Directory, the host would be the Active Directory server and port 636.
_note_ Certificates are PEM encoded and start with -----BEGIN CERTIFICATE----- end with -----END CERTIFICATE----- inclusive.

```bash
$ openssl s_client -showcerts -connect paypal.com:443
```

```
CONNECTED(00000003)
depth=1 C = US, O = "VeriSign, Inc.", OU = VeriSign Trust Network, OU = Terms of use at https://www.verisign.com/rpa (c)09, CN = VeriSign Class 3 Secure Server CA - G2
verify error:num=20:unable to get local issuer certificate
verify return:0
---
Certificate chain
 0 s:/C=US/ST=California/L=San Jose/O=PayPal, Inc./OU=Information Systems/CN=paypal.com
   i:/C=US/O=VeriSign, Inc./OU=VeriSign Trust Network/OU=Terms of use at https://www.verisign.com/rpa (c)09/CN=VeriSign Class 3 Secure Server CA - G2
-----BEGIN CERTIFICATE-----
MIIFDjCCA/agAwIBAgIQL0NdM6l74HplIwrcygDcCTANBgkqhkiG9w0BAQUFADCB
tTELMAkGA1UEBhMCVVMxFzAVBgNVBAoTDlZlcmlTaWduLCBJbmMuMR8wHQYDVQQL
ExZWZXJpU2lnbiBUcnVzdCBOZXR3b3JrMTswOQYDVQQLEzJUZXJtcyBvZiB1c2Ug
YXQgaHR0cHM6Ly93d3cudmVyaXNpZ24uY29tL3JwYSAoYykwOTEvMC0GA1UEAxMm
VmVyaVNpZ24gQ2xhc3MgMyBTZWN1cmUgU2VydmVyIENBIC0gRzIwHhcNMTAwNTAz
MDAwMDAwWhcNMTIwNjExMjM1OTU5WjB/MQswCQYDVQQGEwJVUzETMBEGA1UECBMK
Q2FsaWZvcm5pYTERMA8GA1UEBxQIU2FuIEpvc2UxFTATBgNVBAoUDFBheVBhbCwg
SW5jLjEcMBoGA1UECxQTSW5mb3JtYXRpb24gU3lzdGVtczETMBEGA1UEAxQKcGF5
cGFsLmNvbTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEArlvu+86iVb4RXdX+
8MjmGynNSl+Hu2/ZJ7nU1sj5O2jASWwFH7PFUv10qlRtL+gi3Rjw+zFN958iUetz
ef4CxQYf52PA7Uj9YlFEzLz7f8UDotu4WNLM3QGbLrqS28pPb2qKyyOQDvwNpI1c
Jt4JDa0ofVnCdICZEnf+cJB121MCAwEAAaOCAdEwggHNMAkGA1UdEwQCMAAwCwYD
VR0PBAQDAgWgMEUGA1UdHwQ+MDwwOqA4oDaGNGh0dHA6Ly9TVlJTZWN1cmUtRzIt
Y3JsLnZlcmlzaWduLmNvbS9TVlJTZWN1cmVHMi5jcmwwRAYDVR0gBD0wOzA5Bgtg
hkgBhvhFAQcXAzAqMCgGCCsGAQUFBwIBFhxodHRwczovL3d3dy52ZXJpc2lnbi5j
b20vcnBhMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAW
gBSl7wsRzsBBA6NKZZBIshzgVy19RzB2BggrBgEFBQcBAQRqMGgwJAYIKwYBBQUH
MAGGGGh0dHA6Ly9vY3NwLnZlcmlzaWduLmNvbTBABggrBgEFBQcwAoY0aHR0cDov
L1NWUlNlY3VyZS1HMi1haWEudmVyaXNpZ24uY29tL1NWUlNlY3VyZUcyLmNlcjBu
BggrBgEFBQcBDARiMGChXqBcMFowWDBWFglpbWFnZS9naWYwITAfMAcGBSsOAwIa
BBRLa7kolgYMu9BSOJsprEsHiyEFGDAmFiRodHRwOi8vbG9nby52ZXJpc2lnbi5j
b20vdnNsb2dvMS5naWYwDQYJKoZIhvcNAQEFBQADggEBADbOGDkzZy22y+fW4OR7
wkx+1E3BxnRMZYx89OOykzTEUt2UV5DVuccUbqxTxg9/4pKMYJLywYn9UIOPHpwx
fbvMQNpdqV3JSuGMTwpROrMvC3bT13aCxxDnozeCjd/lH74m6G5ef2EUd3m5Y+iC
fMPo2NMrVyQYOCtpJurh9Tre1gQFHUYAXw8ty0YxfMoR/7FwYbd4spiZJwL2Mvfn
9gn24dWuKY7JaFutomwOM78rGzBDZZ/spEx9rcNa3OuVHcqBamnnXQZlZJilj4LE
buMBx8ti5Oqy4z1u1vzA8HalseiZerqFtBGOIakXdto8qLnwYEHQvVa/ih5iTsi3
Ja8=
-----END CERTIFICATE-----
 1 s:/C=US/O=VeriSign, Inc./OU=VeriSign Trust Network/OU=Terms of use at https://www.verisign.com/rpa (c)09/CN=VeriSign Class 3 Secure Server CA - G2
   i:/C=US/O=VeriSign, Inc./OU=Class 3 Public Primary Certification Authority - G2/OU=(c) 1998 VeriSign, Inc. - For authorized use only/OU=VeriSign Trust Network
-----BEGIN CERTIFICATE-----
MIIGLDCCBZWgAwIBAgIQbk/6s8XmacTRZ8mSq+hYxDANBgkqhkiG9w0BAQUFADCB
wTELMAkGA1UEBhMCVVMxFzAVBgNVBAoTDlZlcmlTaWduLCBJbmMuMTwwOgYDVQQL
EzNDbGFzcyAzIFB1YmxpYyBQcmltYXJ5IENlcnRpZmljYXRpb24gQXV0aG9yaXR5
IC0gRzIxOjA4BgNVBAsTMShjKSAxOTk4IFZlcmlTaWduLCBJbmMuIC0gRm9yIGF1
dGhvcml6ZWQgdXNlIG9ubHkxHzAdBgNVBAsTFlZlcmlTaWduIFRydXN0IE5ldHdv
cmswHhcNMDkwMzI1MDAwMDAwWhcNMTkwMzI0MjM1OTU5WjCBtTELMAkGA1UEBhMC
VVMxFzAVBgNVBAoTDlZlcmlTaWduLCBJbmMuMR8wHQYDVQQLExZWZXJpU2lnbiBU
cnVzdCBOZXR3b3JrMTswOQYDVQQLEzJUZXJtcyBvZiB1c2UgYXQgaHR0cHM6Ly93
d3cudmVyaXNpZ24uY29tL3JwYSAoYykwOTEvMC0GA1UEAxMmVmVyaVNpZ24gQ2xh
c3MgMyBTZWN1cmUgU2VydmVyIENBIC0gRzIwggEiMA0GCSqGSIb3DQEBAQUAA4IB
DwAwggEKAoIBAQDUVo9XOzcopkBj0pXVBXTatRlqltZxVy/iwDSMoJWzjOE3JPMu
7UNFBY6J1/raSrX4Po1Ox/lJUEU3QJ90qqBRVWHxYISJpZ6AjS+wIapFgsTPtBR/
RxUgKIKwaBLArlwH1/ZZzMtiVlxNSf8miKtUUTovStoOmOKJcrn892g8xB85essX
gfMMrQ/cYWIbEAsEHikYcV5iy0PevjG6cQIZTiapUdqMZGkD3pz9ff17Ybz8hHyI
XLTDe+1fK0YS8f0AAZqLW+mjBS6PLlve8xt4+GaRCMBeztWwNsrUqHugffkwer/4
3RlRKyC6/qfPoU6wZ/WAqiuDLtKOVImOHikLAgMBAAGjggKpMIICpTA0BggrBgEF
BQcBAQQoMCYwJAYIKwYBBQUHMAGGGGh0dHA6Ly9vY3NwLnZlcmlzaWduLmNvbTAS
BgNVHRMBAf8ECDAGAQH/AgEAMHAGA1UdIARpMGcwZQYLYIZIAYb4RQEHFwMwVjAo
BggrBgEFBQcCARYcaHR0cHM6Ly93d3cudmVyaXNpZ24uY29tL2NwczAqBggrBgEF
BQcCAjAeGhxodHRwczovL3d3dy52ZXJpc2lnbi5jb20vcnBhMDQGA1UdHwQtMCsw
KaAnoCWGI2h0dHA6Ly9jcmwudmVyaXNpZ24uY29tL3BjYTMtZzIuY3JsMA4GA1Ud
DwEB/wQEAwIBBjBtBggrBgEFBQcBDARhMF+hXaBbMFkwVzBVFglpbWFnZS9naWYw
ITAfMAcGBSsOAwIaBBSP5dMahqyNjmvDz4Bq1EgYLHsZLjAlFiNodHRwOi8vbG9n
by52ZXJpc2lnbi5jb20vdnNsb2dvLmdpZjApBgNVHREEIjAgpB4wHDEaMBgGA1UE
AxMRQ2xhc3MzQ0EyMDQ4LTEtNTIwHQYDVR0OBBYEFKXvCxHOwEEDo0plkEiyHOBX
LX1HMIHnBgNVHSMEgd8wgdyhgcekgcQwgcExCzAJBgNVBAYTAlVTMRcwFQYDVQQK
Ew5WZXJpU2lnbiwgSW5jLjE8MDoGA1UECxMzQ2xhc3MgMyBQdWJsaWMgUHJpbWFy
eSBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eSAtIEcyMTowOAYDVQQLEzEoYykgMTk5
OCBWZXJpU2lnbiwgSW5jLiAtIEZvciBhdXRob3JpemVkIHVzZSBvbmx5MR8wHQYD
VQQLExZWZXJpU2lnbiBUcnVzdCBOZXR3b3JrghB92f4Hz6getxB5Z/uniTTGMA0G
CSqGSIb3DQEBBQUAA4GBAGN0Lz1Tqi+X7CYRZhr+8d5BJxnSf9jBHPniOFY6H5Cu
OcUgdav4bC1nHynCIdcUiGNLsJsnY5H48KMBJLb7j+M9AgtvVP7UzNvWhb98lR5e
YhHB2QmcQrmy1KotmDojYMyimvFu6M+O0Ro8XhnF15s1sAIjJOUFuNWI4+D6ufRf
-----END CERTIFICATE-----
---
Server certificate
subject=/C=US/ST=California/L=San Jose/O=PayPal, Inc./OU=Information Systems/CN=paypal.com
issuer=/C=US/O=VeriSign, Inc./OU=VeriSign Trust Network/OU=Terms of use at https://www.verisign.com/rpa (c)09/CN=VeriSign Class 3 Secure Server CA - G2
---
No client certificate CA names sent
---
SSL handshake has read 3039 bytes and written 401 bytes
---
New, TLSv1/SSLv3, Cipher is DES-CBC3-SHA
Server public key is 1024 bit
Secure Renegotiation IS NOT supported
Compression: NONE
Expansion: NONE
SSL-Session:
    Protocol  : TLSv1
    Cipher    : DES-CBC3-SHA
    Session-ID: A8AAA4F22E9A4B3F12F76303464643525178846D96CA0BC0B81F35368BF55B89
    Session-ID-ctx:
    Master-Key: 9F767B91FC2450E291CBB21E3438CA9A73FE8D5B825AD98F821F5EB912C088DFB66FCBF2D53591E2D1ED77E9B6A22504
    Key-Arg   : None
    PSK identity: None
    PSK identity hint: None
    Start Time: 1295242116
    Timeout   : 300 (sec)
    Verify return code: 20 (unable to get local issuer certificate)
---
^C
```

Once a certificate has been obtained. There are two options for adding the certificate. The first involves updating the truststore for the JRE. If that is not possible or not desirable, then one can set the truststore to be used by the jvm, using any arbitrary truststore that contains the appropriate certificate.

Both options require importing a certificate. The following would import a certificate called, AD.cert into the `/etc/rundeck/ssl/truststore`.

```bash
keytool -import -alias CompanyAD -file AD.cert -keystore  /etc/rundeck/ssl/truststore -storepass adminadmin
```

To add the certificate to the JRE, locate the file \$JAVA_HOME/lib/security/cacerts and run

```bash
keytool -import -alias CompanyAD -file AD.cert -keystore $JAVA_HOME/lib/security/cacerts -storepass changeit
```

To verify your CA has been added, run keytool list and look for CompanyAD in the output.

```bash
keytool -list -keystore $JAVA_HOME/lib/security/cacerts -storepass changeit
```

Refer to: https://docs.oracle.com/javase/1.5.0/docs/tooldocs/solaris/keytool.html for more information how how to import a certificate.

Finally, in your `ldap-activedirectory.conf` be sure to change the _providerUrl_ to be `ldaps://ad-server`. Including the port is optional as the default is 686.


### Communicating over secure ldap using Windows(ldaps://)
1. Download certificate from remote site 
```bash
c:\>  openssl s_client -connect ldaps_server.example:636 > C:\rundeck\certs.out
```
2. Import the file to keystore in Java home  . 
```bash
c:\> keytool -importcert -file "C:\rundeck\certs.out" -storepass changeit -keystore "C:\Program Files\Java\jre1.8.0_xxx\lib\security\cacerts" -alias host_ext
```
3. Import in rundeck (Optional if using Rundeck with SSL)
```bash
c:\> keytool -importcert -file "C:\rundeck\certs.out" -storepass adminadmin -keystore "C:\rundeck\etc\truststore" -alias ldapsserver
```


## PAM

Rundeck includes a [PAM](https://en.wikipedia.org/wiki/Pluggable_authentication_module) JAAS login module, which uses [libpam4j](https://github.com/kohsuke/libpam4j) to authenticate.

In order for Rundeck to have the necessary permissions to check user credentials, the user that runs the Rundeck process must be in the `shadow` group.
This can be done with the command:

    $ sudo addgroup rundeck shadow

On debian based systems you need to install libpam4j :

```bash
apt install libpam4j-java
```

This module can work with existing properties-file based authorization roles by enabling shared credentials between the modules, and introducing a Property file module that can be used only for authorization.

Modules:

- `org.rundeck.jaas.jetty.JettyPamLoginModule` authenticates via PAM, can add a default set of roles to authenticated users, and can use local unix group membership for role info.
- `org.rundeck.jaas.jetty.JettyAuthPropertyFileLoginModule` authenticates via property file, but does not supply user authorization information.
- `org.rundeck.jaas.jetty.JettyRolePropertyFileLoginModule` does not authenticate and only uses authorization roles from a property file. Can be combined with previous modules.

sample jaas config:

```c .numberLines
RDpropertyfilelogin {
  org.rundeck.jaas.jetty.JettyPamLoginModule requisite
        debug="true"
        service="sshd"
        supplementalRoles="readonly"
        storePass="true";

    org.rundeck.jaas.jetty.JettyRolePropertyFileLoginModule required
        debug="true"
        useFirstPass="true"
        file="/etc/rundeck/realm.properties";

};
```

When combining the two login modules, note that the `storePass` and
`useFirstPass` are set to true, allowing the two modules to share the user information necessary for the second module to load the user roles.

**Common configuration properties:**

These JAAS configuration properties are used by all of the Jetty PAM modules:

- `useFirstPass`
- `tryFirstPass`
- `storePass`
- `clearPass`
- `debug`

### JettyPamLoginModule

Configuration properties:

- `serviceName` - name of the PAM service configuration to use. (Required). Example: "sshd".
- `useUnixGroups` - true/false. If true, the unix Groups defined for the user will be included as authorization roles. Default: false.
- `supplementalRoles` - a comma-separated list of additional user roles to add to any authenticated user. Example: 'user,readonly'

## JettyRolePropertyFileLoginModule

This module does not authenticate, and requires that `useFirstPass` or `tryFirstPass` is set to `true`, and that a previous module has `storePass` set to `true`.

It then looks the username up in the Properties file, and applies any roles for the matching user, if found.

Configuration properties:

- `hotReload` - `hotReload="true"` enables the ability to modify the user list specified by `file` without having to restart Rundeck. The refresh interval for checking the file is 5 seconds. This is not configurable.
- `file` - path to a Java Property formatted file in the format defined under [realm.properties](#PropertyFileLoginModule)
- `caseInsensitive` - true/false. If true, usernames are converted to lowercase before being looked up in the property file, otherwise they are compared as entered. Default: true.

Note that since the user password is not used for authentication, you can have a dummy value in the password field of the file, but _some value is required_ in that position.

Example properties file with dummy passwords and roles:

    admin: -,user,admin
    user1: -,user,readonly

## JettyAuthPropertyFileLoginModule

This module provides authentication in the same way as the [realm.properties](#PropertyFileLoginModule) mechanism, but does not use any of the role names found in the file. It can be combined with `JettyRolePropertyFileLoginModule` by using `storePass=true`.

Configuration properties:

- `hotReload` - `hotReload="true"` enables the ability to modify the user list specified by `file` without having to restart Rundeck. The refresh interval for checking the file is 5 seconds. This is not configurable.
- `file` - path to a Java Property formatted file in the format defined under [realm.properties](#realm.properties)

## Multiple Authentication Modules

JAAS configurations can contain multiple LoginModule definitions, which are processed in order and according to the logic of the configuration Flag.

In your config file, separate the LoginModule definitions with a `;` and be sure to select the appropriate Flag for the module, one of `required`, `requisite`, `sufficient`, or `optional`.

The full syntax and the description of how these Flags work is described in more detail under the [JAAS Configuration Documentation](https://docs.oracle.com/javase/6/docs/api/javax/security/auth/login/Configuration.html).

Here is an example combining an LDAP module flagged as `sufficient`, and a flat file realm.properties config flagged as `required`:

```c .numberLines
multiauth {

  com.dtolabs.rundeck.jetty.jaas.JettyCachingLdapLoginModule sufficient
    debug="true"
    contextFactory="com.sun.jndi.ldap.LdapCtxFactory"
    providerUrl="ldap://server:389"
    bindDn="cn=Manager,dc=example,dc=com"
    bindPassword="secret"
    authenticationMethod="simple"
    forceBindingLogin="false"
    userBaseDn="ou=People,dc=test1,dc=example,dc=com"
    userRdnAttribute="uid"
    userIdAttribute="uid"
    userPasswordAttribute="userPassword"
    userObjectClass="account"
    roleBaseDn="ou=Groups,dc=test1,dc=example,dc=com"
    roleNameAttribute="cn"
    roleUsernameMemberAttribute="memberUid"
    roleMemberAttribute="memberUid"
    roleObjectClass="posixGroup"
    cacheDurationMillis="300000"
    reportStatistics="true";

  org.eclipse.jetty.jaas.spi.PropertyFileLoginModule required
    debug="true"
    file="/etc/rundeck/realm.properties";
};
```

Based on the flags, JAAS would attempt the following for authentication:

1. Check username/pass against LDAP
1. If auth succeeds, finish with successful authentication
1. If auth fails, continue to the next module
1. Check username/pass against the properties file
1. If auth succeeds, finish with successful authentication
1. If auth fails, finish with failed authentication

# Jaas Authorization Testing

If you would like to test your Jaas configuration without restarting Rundeck every time you make a change to your Jaas configuration, you can add the `--testauth` option:

ldap example:

```sh
$ java -Drundeck.jaaslogin=true -Dloginmodule.conf.name=jaas-ldap.conf -Dloginmodule.name=ldap -jar rundeck-{{{rundeckVersionFull}}}.war --testauth
Checking file: $RDECK_BASE/server/config/jaas-ldap.conf
Checking login module: ldap
Enter user name: ldapuser
Enter password ldapuserPASSWORD <-- This is masked in actual use
Login Succeeded!
```

The Jaas configuration file you are testing against will be printed out, along with the name of the login module you are testing.
You will be prompted to enter a username and password. These will be compared against your current Jaas configuration.
If the login is successful you will see: `Login Succeeded!`
If the login fails a stacktrace will be printed out which will contain the details about the failure.

# Container authentication and authorization

Container Authentication provides the Servlet context used by Rundeck
with a few mechanisms to determine what roles the user has.

`containerPrincipal`

: JAAS authentication modules define a "Principal"
that represents the authenticated user,
and which can list the "roles" the user has.

`container`
: The Container also provides a query mechanism `isUserInRole`.

Both of these methods are used by default, although they can be disabled with the following configuration flags in `rundeck-config.properties`:

```properties
rundeck.security.authorization.containerPrincipal.enabled=false
rundeck.security.authorization.container.enabled=false
```

# Preauthenticated Mode

## Preauthenticated Mode using AJP with apache and tomcat

`preauthenticated`

: "Preauthenticated" means that the Servlet Container (e.g. Tomcat)
is not being used for authentication/authorization.
The user name and role list are provided to Rundeck
from another system, usually a reverse proxy set up "in front"
of the Rundeck web application, such as Apache HTTPD.
Rundeck accepts the "REMOTE_USER" as the username,
and allows a configurable Request Attribute to contain
the list of user roles.

**Note**: If you use this method, make sure that _only_ your proxy
has direct access to the ports Rundeck is listening on
(e.g. firewall them),
otherwise you are opening access to rundeck
without requiring authentication.

This method can be enabled with this config in `rundeck-config.properties`:

```properties
rundeck.security.authorization.preauthenticated.enabled=true
rundeck.security.authorization.preauthenticated.attributeName=REMOTE_USER_GROUPS
rundeck.security.authorization.preauthenticated.delimiter=:
```

This configuration requires some additional setup to enable:

1. Apache HTTPD and Tomcat must be configured to communicate so that a list of User Roles is sent to Tomcat as a request Attribute with the given "attributeName".

For Tomcat and Apache HTTPd with `mod_proxy_ajp`, here are some additional instructions:

1.  Modify the tomcat server.xml, and make sure to set `tomcatAuthentication="false"` on the AJP connector:

```xml
<Connector port="8009" protocol="AJP/1.3" redirectPort="4440" tomcatAuthentication="false"/>
```

2.  Configure Apache to perform the necessary authentication, and to pass an environment variable named "REMOTE_USER_GROUPS", the value should be all colon-separated e.g.: "user:admin:ops" (or using the `delimiter` you have configured.)

Here is an example using just `mod_proxy_ajp`, and passing a static list of roles. A real solution should use [mod_lookup_identity](https://www.adelton.com/apache/mod_lookup_identity/):

```
<Location /rundeck>
    ProxyPass  ajp://localhost:8009/rundeck

    AuthType basic
    AuthName "private area"
    AuthBasicProvider file

    AuthUserFile /etc/httpd/users.htpasswd
    SetEnv AJP_REMOTE_USER_GROUPS "admin:testrole1:testrole2"
    Require valid-user
</Location>
```

**Note**: `mod_proxy_ajp` requires prefixing the environment variable with "AJP\_", but `mod_jk` can pass the environment variable directly.

Once authenticated via Apache, you should be able to access rundeck.
You might see a page saying "You have no authorized access to projects",
and then "(User roles: role1, role2, ...)"
with a list of all of the user roles seen by Rundeck.
This page just means that there are no aclpolicy files
that match those roles,
but the apache->tomcat authorization is still working correctly.
At this point, move on to [Access Control Policy](/administration/security/authorization.md)
to set up access control for the listed roles.

If the "User roles: " part is blank, then it may not be working correctly.

## Preauthenticated Mode using headers

If you have a proxy sitting in front of your Rundeck installation that authenticates your users, you can send the authenticated user and groups to Rundeck via HTTP headers. Set the following properties in your `rundeck-config.properties` file.

```properties
rundeck.security.authorization.preauthenticated.enabled=true
rundeck.security.authorization.preauthenticated.attributeName=REMOTE_USER_GROUPS
rundeck.security.authorization.preauthenticated.delimiter=,
rundeck.security.authorization.preauthenticated.userNameHeader=X-Forwarded-Uuid
rundeck.security.authorization.preauthenticated.userRolesHeader=X-Forwarded-Roles

#sync user info headers
rundeck.security.authorization.preauthenticated.userSyncEnabled=true
#these are the default headers for passing user details
rundeck.security.authorization.preauthenticated.userFirstNameHeader=X-Forwarded-User-FirstName
rundeck.security.authorization.preauthenticated.userLastNameHeader=X-Forwarded-User-LastName
rundeck.security.authorization.preauthenticated.userEmailHeader=X-Forwarded-User-Email
```

The `attributeName` property is the name of the request attribute which stores the user groups for the request. The forwarded headers will be put into this attribute. This attribute must be set for this method to work properly.

The `userNameHeader` property is the name of the header from which to obtain the authenticated user name.

The `userRolesHeader` property is the name of the header from which to obtain the list of user roles. The roles should be delimited by
the delimiter specified in the `delimiter` property.

The `userSyncEnabled` property will enable the use of preauthentication headers to pass the user's first and last name and email
The default headers that will be read for the user details are:  
```
X-Forwarded-User-FirstName
X-Forwarded-User-LastName
X-Forwarded-User-Email
```
To customize the headers used set the following properties
```
rundeck.security.authorization.preauthenticated.userFirstNameHeader=X-Forwarded-User-FirstName
rundeck.security.authorization.preauthenticated.userLastNameHeader=X-Forwarded-User-LastName
rundeck.security.authorization.preauthenticated.userEmailHeader=X-Forwarded-User-Email
```

## Preauthenticated mode logout redirection

If you are running preauthenticated mode and wish to redirect to a custom logout url on user logout, set the following properties:

```properties
# Redirect to upstream logout url
rundeck.security.authorization.preauthenticated.redirectLogout=true
rundeck.security.authorization.preauthenticated.redirectUrl=/customlogouturl
```
