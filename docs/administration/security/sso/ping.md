# Single SignOn - Ping

Rundeck can be configured to work with Ping Identity services.

### Ping Configuration

Please refer to the Ping documentation to set up an OpenId Connect(OIDC) application in your Ping Environment.
The Ping products purchased will determine how the application is set up inside Ping.

#### Ping OIDC Application Setup
When setting up the OIDC Application be sure to choose to generate a client secret, and choose the grant type: Authorization Code.
The Redirect callback url will be: `https://{your-rundeck-host}/login/oauth2/code/ping` (Ping requires this to be an https endpoint)
Specify the `openid`, `profile`, and `email` scopes for the application.

_Note:_ The following Attribute Mappings must be set up in the Ping OIDC Application.

- The `sub` property needs to map to the value that will be used to identify the user in Rundeck.
- Define a property mapping that will map the Ping user's groups to an attribute that is sent in the oauth token.

After setup of the OIDC application in Ping note the following properties when for setting up the Rundeck side of the SSO:

- Client Id
- Client Secret

### Rundeck Configuration

Once the Ping Application setup is complete use the following to configure Rundeck.

> Note: All of these settings can be configured using the [Configuration Management](/manual/configuration-mgmt/configmgmt.md) feature (recommended) or `rundeck-config.properties`.

#### SSO Login button

```properties
#These properties control the appearance and url of the SSO login button on the login page
rundeck.sso.loginButton.enabled=true
rundeck.sso.loginButton.title=Login with Ping
rundeck.sso.loginButton.url=oauth/ping
```

#### Auto Configuration (3.3.0 and above)

```properties
rundeck.security.oauth.ping.clientId = YOUR_CLIENT_ID_HERE
rundeck.security.oauth.ping.clientSecret = YOUR_CLIENT_SECRET_HERE
rundeck.security.oauth.ping.autoConfigUrl = https://sso.connect.pingidentity.com
rundeck.security.oauth.ping.authorityProperty = YOUR_MAPPED_GROUPS_ATTRIBUTE
```

#### Manual Configuration

Example:

```properties
rundeck.security.oauth.ping.clientId = YOUR_CLIENT_ID_HERE
rundeck.security.oauth.ping.clientSecret = YOUR_CLIENT_SECRET_HERE
rundeck.security.oauth.ping.accessTokenUri = 	https://sso.connect.pingidentity.com/sso/as/token.oauth2
rundeck.security.oauth.ping.userAuthorizationUri = https://sso.connect.pingidentity.com/sso/as/authorization.oauth2
rundeck.security.oauth.ping.userInfoUri = 	https://sso.connect.pingidentity.com/sso/idp/userinfo.openid
rundeck.security.oauth.ping.jwkSetUri = 	https://sso.connect.pingidentity.com/sso/as/jwks
rundeck.security.oauth.ping.principleKeys=sub

#Only override if you need additional scopes
#rundeck.security.oauth.ping.scope = openid profile email

#The name of the attribute that hold's the users groups
rundeck.security.oauth.ping.authorityProperty = YOUR_MAPPED_GROUPS_ATTRIBUTE

#Client Authentication method - default is 'post'
#NOTE: Only set this if you have 'basic' authentication selected in Ping
#rundeck.security.oauth.ping.clientAuthenticationMethod = basic

```

After completing the configuration, restart Rundeck and attempt to login with Ping.

## Redirect URL Override

If Rundeck is set up behind an SSL terminating proxy, it may be necessary to specify the redirect url rather that use the
automatically generated one. Rundeck tells the OAuth2 system where to redirect after authentication by sending a redirect
url to the OAuth2 provider with the first authentication redirect. Most of the time Rundeck
will send the correct url, but in some cases it is necessary to specify the redirect url manually.

This can be done by setting the following properties in Configuration Management or `rundeck-config.properties`.

```properties
rundeck.security.oauth.YOUR_OAUTH2_PROVIDER.customRedirectUri=https://YOUR_RUNDECK_SERVER/login/oauth2/code/PROVIDER
#example
rundeck.security.oauth.okta.customRedirectUri=https://ssl_terminating_proxy.com/login/oauth2/code/okta
rundeck.security.oauth.ping.customRedirectUri=https://ssl_terminating_proxy.com/login/oauth2/code/ping
```

## Sync User Profile From OAuth2

With Rundeck 3.3.0 Rundeck can sync the information provided by your OAuth2 provider with the profile information inside Rundeck.

Add the following property to your `rundeck-config.properties` file

```properties
rundeck.security.syncOauthUser=true
```

On SSO login, the jwt token sent by the Oauth2 provider will be examined for the `email` `given_name` and `family_name` attributes
which should be populated when using the default scopes (`openid email profile`).
Rundeck will save this information to the appropriate fields in the user's Rundeck profile.

#### Alternative user detail attributes

If the token sent by your Oauth2 provider does not use the standard attributes for passing user information you can specify
the attributes in your token that carry the email, first, and last names using the following properties.

```properties
rundeck.ssoSyncAttribNames.firstname=custom-firstname-attrib
rundeck.ssoSyncAttribNames.lastname=custom-lastname-attrib
rundeck.ssoSyncAttribNames.email=custom-email-attrib
```
