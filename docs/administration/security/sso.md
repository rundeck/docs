# Rundeck SSO Security (Enterprise)

::: enterprise
:::

Rundeck Single SignOn is available in both Process Automation and Runbook Automation.  This feature allows for streamlined and centralized access management of Rundeck users.

There are 3 supported SSO solutions available:

- [Okta](sso/okta.md)
- [Ping](sso/ping.md)
- [Azure Active Directory](sso/azure-sso.md)

It is possible to connect other OpenID Connect based solutions, but functionality may be limited.


## Introduced in version 3.3.0

:::warning
When Upgrading, you must change the redirect url configured with your OAuth provider.
The Login Redirect URI has changed.  
Change it from `/user/oauth/` to `/login/oauth2/code/`

See vendor specific details for [Okta](sso/okta.md) and [Ping](sso/ping.md).
:::

:::warning
In order to enhance the security of the communication between your OAuth provider and Rundeck, you must supply
an additional `jwkSetUri` property. This allows Rundeck to obtain the signing keys necessary to verify the jwt tokens
sent from your OAuth provider.
:::

:::tip
The Rundeck OAuth2 configuration now has support for auto configuration from your OIDC compliant provider.
To use the auto configuration you only need to supply the base url to your OAuth provider endpoint, your client id and client secret, and Rundeck will do the rest.
Please see the documentation links above for detailed instructions.
:::


## Generic SSO login using OpenID Connect

It is also possible to configure Single Sign-On with providers that support the OAuth2 or OpenID Connect protocol,
using the [Authorization Code Flow](https://oauth.net/2/grant-types/authorization-code/). Adapt
the following configuration options to your provider's specific requirements:

:::tip Note
All the configuration properties below can be set in the [Configuration Management](/manual/configuration-mgmt/configmgmt.md) interface or in the `rundeck-config.properties` file.
:::

### Configure the OpenID provider using autodiscovery

To configure the OpenID provider using its autodiscovery endpoint, set the following properties:

```properties
# OpenID discovery endpoint URL of the OpenID provider
rundeck.security.oauth.PROVIDER_NAME.autoConfigUrl=https://my-oidc-provider.com/.well-known/openid-configuration

# Client ID defined by the OpenID provider
rundeck.security.oauth.PROVIDER_NAME.clientId=<CLIENT_ID>

# Client Secret defined by the OpenID provider
rundeck.security.oauth.PROVIDER_NAME.clientSecret=<CLIENT_SECRET>

# Scopes to request from the OpenID provider. Default is 'openid profile email'.
# If supported by your provider, adding the 'groups' scope is also recommended.
rundeck.security.oauth.PROVIDER_NAME.scope = openid profile email

# OAuth token attribute containing the user authorization groups. Default is 'groups'.
rundeck.security.oauth.PROVIDER_NAME.authorityProperty = YOUR_MAPPED_GROUPS_ATTRIBUTE
```

### Manual OpenID configuration

To configure the provider manually, set the following properties:

```properties
# Client ID defined by the OpenID provider
rundeck.security.oauth.PROVIDER_NAME.clientId = <CLIENT_ID>

# Client Secret defined by the OpenID provider
rundeck.security.oauth.PROVIDER_NAME.clientSecret = <CLIENT_SECRET>

# OAuth token endpoint URL of the OpenID provider
rundeck.security.oauth.PROVIDER_NAME.accessTokenUri = <okta service url>/v1/token

# OAuth authorization endpoint URL of the OpenID provider
rundeck.security.oauth.PROVIDER_NAME.userAuthorizationUri = <okta service url>/v1/authorize

# OAuth user info endpoint URL of the OpenID provider
rundeck.security.oauth.PROVIDER_NAME.userInfoUri = <okta service url>/v1/userinfo

# OAuth JWK set endpoint URL of the OpenID provider
rundeck.security.oauth.PROVIDER_NAME.jwkSetUri = <okta service url>/v1/keys

# Scopes to request from the OpenID provider. Default is 'openid profile email'.
# If supported by your provider, adding the 'groups' scope is also recommended.
rundeck.security.oauth.PROVIDER_NAME.scope = openid profile email

# Name of the token attribute or scope containing the list of authorization groups, if supported by the provider. Default is 'groups'.
rundeck.security.oauth.PROVIDER_NAME.authorityProperty = groups

# Comma-separated list of attributes to search for the user's principal name.
rundeck.security.oauth.PROVIDER_NAME.principleKeys = "user,username,userid,user_id,login,id,name,sub"

# Client HTTP Authentication method - Options are 'basic' or 'post'. Default is 'post'
rundeck.security.oauth.PROVIDER_NAME.clientAuthenticationMethod = post
```


### Configure the SSO Login Button

```properties
# Show the SSO login button on the login screen.
rundeck.sso.loginButton.enabled=true

# Login button label
rundeck.sso.loginButton.title=Login with SSO

# Url to the provider oauth entrypoint. Use the same key used to identify your provider above.
rundeck.sso.loginButton.url=oauth/PROVIDER_NAME
```

### Sync User Profile From OAuth2

Information provided by your OAuth2 provider can be synced with the profile information inside Runbook Automation using the following properties:

```properties
rundeck.security.syncOauthUser=true
```
On SSO login, the token sent by the Oauth2 provider will be examined for the `email` `given_name` and `family_name` attributes
which should be populated when using the default scopes (`openid email profile`).
Runbook Automation will save this information to the appropriate fields in the user's profile.

If the token sent by your Oauth2 provider does not use the standard attributes for passing user information you can specify
the attributes in your token that carry the email, first, and last names using the following properties.

```properties
rundeck.ssoSyncAttribNames.firstname=custom-firstname-attrib
rundeck.ssoSyncAttribNames.lastname=custom-lastname-attrib
rundeck.ssoSyncAttribNames.email=custom-email-attrib
```

## Enabling OAuth Resource Server and JWT Token Authentication Support

**Starting from Runbook Automation 5.1.0**, the platform can act as an OAuth2 Resource Server and validate JWT tokens issued
by an external OAuth2 or OIDC provider. This can be used to leverage [SSO logins on the API](/api/#jwt-token-authentication-enterprise).

General steps to make use of this feature are:

* Follow your OIDC provider documentation to configure a new client application using the `client_credentials` grant type.
Make sure to obtain its client id, client secret, and endpoint URLs.
  * [Azure Documentation](https://learn.microsoft.com/en-us/azure/active-directory-b2c/client-credentials-grant-flow?pivots=b2c-user-flow)
  * [Okta Documentation](https://developer.okta.com/docs/guides/implement-grant-type/clientcreds/main/#next-steps)
  * [Ping Documentation](https://docs.pingidentity.com/r/en-us/pingone/pingone_edit_application_oidc)

* Enable the Runbook Automation Oauth resource server adding the needed properties to [Configuration Management](/manual/configuration-mgmt/configmgmt.md) or your `rundeck-config.properties` file.

### Simple Configuration

```properties
# Enable OAuth2 Resource Server support, default is false.
rundeck.security.oauth.PROVIDER_NAME.resourceserver.enabled=true

# Issuer URI supplied by the OAuth2 provider to fetch the public key to validate the JWT token.
# URI that can either be an OpenID Connect discovery endpoint or an OAuth 2.0 Authorization Server Metadata endpoint defined by RFC 8414.
# It is recommended that this URL matches the 'iss' claim within the provided JWT tokens.
# If no 'issuer-uri', 'jwkSetUri' or 'publicKeyLocation' is provided, the value of 'rundeck.security.oauth.PROVIDER_NAME.autoConfigUrl' will be used.
rundeck.security.oauth.PROVIDER_NAME.resourceserver.jwt.issuer-uri=https://my.oidc.provider.jwt.issuer.uri/
```

### Obtain a Token from the OAuth2 Provider

Once the client application within the OIDC provider has been configured,
a token can be obtained using the variation of the [OAuth access token API](https://www.oauth.com/oauth2-servers/access-tokens/) with the `client_credentials` grant type.

A typical `curl` request to the access token endpoint looks like this:

```shell
curl --request POST --location "https://my.oidc-provider.endpoint.com/token" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -H "Accept: application/json" \
    -d "grant_type=client_credentials" \
    -d "client_id=<client_id>" \
    -d "client_secret=<client_secret>" \
    -d "scope=<requested_scope>"
    
```

The response obtained will contain the JWT token that can be used to authenticate with Runbook Automation.

```json
{
  "token_type": "Bearer",
  "expires_in": 3599,
  "ext_expires_in": 3599,
  "access_token": "the_provided_access_token_value"
}
```

### Using the JWT Token to Authenticate with Rundeck

With the token obtained from the OIDC provider, authenticate with Runbook Automation using the `Authorization` header with the `Bearer` scheme:

```shell
curl -X GET --location "http://my.rundeck.com/api/42/projects" \
    -H "Authorization: Bearer the_provided_access_token_value" \
    -H "Accept: application/json"
```

### Full JWT Configuration Options

```properties
# Enable OAuth2 Resource Server support, default is false.
rundeck.security.oauth.PROVIDER_NAME.resourceserver.enabled=true

# Issuer URI supplied by the OAuth2 provider to fetch the public key to validate the JWT token.
# URI that can either be an OpenID Connect discovery endpoint or an OAuth 2.0 Authorization Server Metadata endpoint defined by RFC 8414.
# It is recommended that this URL matches the 'iss' claim within the provided JWT tokens.
# If no 'issuer-uri', 'jwkSetUri' or 'publicKeyLocation' is provided, the value of 'rundeck.security.oauth.PROVIDER_NAME.autoConfigUrl' will be used.
rundeck.security.oauth.PROVIDER_NAME.resourceserver.jwt.issuer-uri=https://my.oidc.provider.jwt.issuer.uri/

# URI to fetch the JSON Web Key (JWK) Set from the OAuth2 provider to validate the JWT token.
# This will override the configuration obtainer by the 'issuer-uri' property.
rundeck.security.oauth.PROVIDER_NAME.resourceserver.jwt.jwkSetUri=https://my.oauth2.provider.com/.well-known/jwks.json

# Location of the RSA public key to validate the JWT token. This can be a file path or a URL.
# Only used if both 'issuer-uri' and 'jwkSetUri' are not provided.
rundeck.security.oauth.PROVIDER_NAME.resourceserver.jwt.publicKeyLocation=file:///local/file/path/to/rsa-public-key.pem

# (Optional) List of audiences that the JWT token must contain. This is used to validate the 'aud' claim in the JWT token.
rundeck.security.oauth.PROVIDER_NAME.resourceserver.jwt.audiences=audience_defined_in_provider

# List of additional claim names to be used as authorities (groups).
# Default is "scope,scp,roles" 
rundeck.security.oauth.PROVIDER_NAME.resourceserver.jwt.authorities-claim-names=scope,scp,roles

# (Optional) Prefix to attach to the authorities (groups) extracted from the JWT token.
rundeck.security.oauth.PROVIDER_NAME.resourceserver.jwt.authority-prefix=PREFIX_

# List of JWS algorithms to use to validate the JWT token. Default is "RS256"
rundeck.security.oauth.PROVIDER_NAME.resourceserver.jwt.jws-algorithms=RS256

# Name of the claim in the JWT token that contains the principal name. Default is "sub"
rundeck.security.oauth.PROVIDER_NAME.resourceserver.jwt.principalClaimName=sub
```


### JWT Auth Token Request Examples

#### Azure Entra ID

```shell
curl -X POST --location "https://sts.windows.net/TENANT_ID/oauth2/v2.0/token" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -H "Accept: application/json" \
    -d "grant_type=client_credentials" \
    -d "client_id=<client_id>" \
    -d "client_secret=<client_secret>" \
    -d "scope=<API id uri>/.default"
```

#### Okta

```shell
curl -X POST --location "https://my-okta-instance.okta.com/oauth2/default/v1/token" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -H "Accept: application/json" \
    -d "grant_type=client_credentials" \
    -d "client_id=<client_id>" \
    -d "client_secret=<client_secret>" \
    -d "scope=<requested_scope>"
```

#### Ping

```shell
curl -X POST --location "https://auth.pingone.com/TENANT_ID/as/token" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -H "Accept: application/json" \
    -d "grant_type=client_credentials" \
    -d "client_id=<client_id>" \
    -d "client_secret=<client_secret>" \
    -d "scope=<requested_scope>"

```

#### Example JWT Token
Use a JWT token decoder to inspect the contents of the token and check its information matches the expected 
configuration.  [jwt.io](https://jwt.io/) is a popular choice.

A typical JWT token would look like this:

```json
{
  "header": {
    "typ": "JWT",
    "alg": "RS256",
    "x5t": "XRvko8P7A3sdf3nU7bM9nT0MjhA",
    "kid": "XRvssd37A3UaWSnU7bM9nT0MjhA"
  },
  "payload": {
    "aud": "token_audience",
    "iss": "https://my.oidc.provider.jwt.issuer.uri/",
    "iat": 1710962871,
    "exp": 1710966771,
    "appid": "be5ac621-3877-47c2-9928-7c647c367e65",
    "scp": [
      "authorization.role.1",
      "authorization.role.2"
    ],
    "sub": "principal_name",
    "ver": "1.0"
  }
}
```

It is recommended that the value in the `iss` claim matches the `issuer-uri` configuration.


## Troubleshooting

If you are having trouble with SSO integration, these additional entries in `rundeck-config.properties` will generate helpful debugging information:
```properties
logging.level.rundeckpro.security=DEBUG
logging.level.org.springframework.security.oauth2=DEBUG
```

