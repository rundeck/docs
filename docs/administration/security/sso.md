# Rundeck SSO Security (Enterprise)

::: enterprise
:::

## New in version 3.3.0

:::warning
When Upgrading, you must change the redirect url configured with your OAuth provider.
The Login Redirect URI has changed.  
Change it from `/user/oauth/` to `/login/oauth2/code/`

See vendor specific details below for [Okta](#okta) and [Ping](#ping).
:::

:::warning
In order to enhance the security of the communication between your oauth provider and Rundeck, you must supply
an additional `jwkSetUri` property. This allows Rundeck to obtain the signing keys necessary to verify the jwt tokens
sent from your oauth provider.
:::

:::tip
The Rundeck Oauth2 configuration now has support for auto configuration from your OIDC compliant provider.
To use the auto configuration you only need to supply the base url to your oauth provider endpoint, your client id and client secret, and Rundeck will do the rest.
Please see the documentation below for detailed instructions.
:::

## Okta

Rundeck Enterprise can be configured to work with the Okta security platfom.

To configure the Okta SSO plugin for your Rundeck installation
you will need to add a new application to your Okta Applications,
and then add some properties to your rundeck-config.properties file.




### Okta Application Configuration

Log into your Okta web portal and configure a new application.

- Create a new web application.
  - Configure the application with "Authorization Code" Grant type allowed.
  - Add the following URL to `Login Redirect URIs` (you can add more than one):
    `<rundeck base url>/login/oauth2/code/okta`. Example: `http://localhost:4440/login/oauth2/code/okta`
  - Copy the Client ID and Client Secret provided by Okta so that you can use them for the rundeck configuration.
- Create groups with the same name as the roles configured on Rundeck. Map users to those groups.
- Under the API menu, open the Authorization Servers configuration and add a new claim with the following information:
  - Name: groups
  - Include in Token Type: `ID Token` with `Userinfo/id_token_request`
  - Value Types: `Groups`
  - Filter: Regex: `.*`

### Rundeck configuration

Once you've set up the application in Okta you can configure Rundeck to use that
application.

#### Add the login button to Rundeck

```properties
#These properties control the appearance and url of the button on the login page
rundeck.sso.loginButton.enabled=true
rundeck.sso.loginButton.title=Login with Okta
rundeck.sso.loginButton.url=oauth/okta
```

#### Auto Configuration Method (3.3.0 and above)
```properties
#Enable the OAuth SSO feature
rundeck.security.oauth.enabled=true
#The first two come from the Client Credentials section on your Application configuration page in Okta
rundeck.security.oauth.okta.clientId = (Okta Client ID)
rundeck.security.oauth.okta.clientSecret = (Okta Secret Key)

#Auto Configuration Url
#This is a url that will be appended with /.well-known/openid-configuration to retrieve the information needed to configure the OAuth2 connection
rundeck.security.oauth.okta.autoConfigUrl = <okta service url>
#example
#rundeck.security.oauth.okta.autoConfigUrl = https://dev-877856.oktapreview.com

# or if you are using a custom authorization server
#rundeck.security.oauth.okta.autoConfigUrl = <okta service url>/oauth2/<authServerId>
#example
#rundeck.security.oauth.okta.autoConfigUrl = https://dev-877856.oktapreview.com/oauth2/default
```

#### Manual Configuration Method

Add the following properties to your rundeck-config.properties file:

```properties
#Enable the OAuth SSO feature
rundeck.security.oauth.enabled=true

#The first two come from the Client Credentials section on your Application configuration page in Okta
rundeck.security.oauth.okta.clientId = (Okta Client ID)
rundeck.security.oauth.okta.clientSecret = (Okta Secret Key)

#This group of properties requires you to replace the <okta service url> with the url provided by Okta for making api authorization calls
#<okta service url> might look something like: https://dev-877856.oktapreview.com/oauth2/default
#In your Okta web portal check API/Authorization Servers/Settings/Issuer to get this value
rundeck.security.oauth.okta.accessTokenUri = <okta service url>/v1/token
rundeck.security.oauth.okta.userAuthorizationUri = <okta service url>/v1/authorize
rundeck.security.oauth.okta.userInfoUri = <okta service url>/v1/userinfo
rundeck.security.oauth.okta.jwkSetUri = <okta service url>/v1/keys

#This is the default scope setting. Only add it if you need to customize the scopes
#rundeck.security.oauth.okta.scope = openid profile email my_custom_scope
```

After completing the configuration of your rundeck-config.properties file, restart Rundeck.

### SSO Login

If you have successfully configured Okta and Rundeck you will see a new button
on the rundeck login page that says _Login with Okta_. By clicking this button
you will be redirected to an Okta Login form that will be used to collect the user credentials.
Once you have logged in with your Okta credentials you will be redirected back to the home
menu page in Rundeck.

Congratulations, you now have a working Okta/Rundeck SSO setup.

### Okta Group Plugin

If you have Active Directory integrated into your Okta system, the setup for groups described above may not work. In this case you
may configure the Okta user group plugin that is packaged with Rundeck, to pull the user's group information from Okta via the Okta API.

First, you will need to create an API key in Okta that you can use to make API requests.

Then you will need to add the following properties to your `framework.properties` file.

```properties
framework.plugin.UserGroupSource.OktaGroupSource.apiToken=<api key>

framework.plugin.UserGroupSource.OktaGroupSource.oktaHostName=<okta host name>
#example:
#framework.plugin.UserGroupSource.OktaGroupSource.oktaHostName=dev-877856.oktapreview.com

framework.plugin.UserGroupSource.OktaGroupSource.includedGroupTypes=APP_GROUP
#APP_GROUP is the way Okta denotes AD groups, if you want to also include Okta groups
#you could do the following:
#framework.plugin.UserGroupSource.OktaGroupSource.includedGroupTypes=APP_GROUP,OKTA_GROUP
framework.plugin.UserGroupSource.OktaGroupSource.enabled=true
```

If the plugin is enabled, when the user logs in, it will attempt to use the Okta user id out of the SSO token to pull that user's groups from Okta.

## Ping

Rundeck can be configured to work with Ping Identity services.

### Ping Configuration

You will need to refer to the Ping documentation to set up an OpenId Connect(OIDC) application in your Ping Environment.
The Ping products you have purchased will determine how the application is set up inside Ping.

#### Ping OIDC Application Setup
When setting up the OIDC Application be sure to choose to generate a client secret, and choose the grant type: Authorization Code.
The Redirect callback url will be: `https://{your-rundeck-host}/login/oauth2/code/ping` (Ping requires this to be an https endpoint)
Specify the `openid`, `profile`, and `email` scopes for the application.

_Note:_ The following Attribute Mappings must be set up in Ping on your OIDC Application.

- The `sub` property needs to map to the value that will be used to identify the user in Rundeck.
- You will need to define a property mapping that will map the Ping user's groups to an attribute that is sent in the oauth token.

After you have set up the OIDC application in Ping you will need the following properties when you set up the Rundeck side of the SSO:

- Client Id
- Client Secret

### Rundeck Configuration

From the values you recorded above populate your `rundeck-config.properties` file.

#### SSO Login button

```properties
#These properties control the appearance and url of the SSO login button on the login page
rundeck.sso.loginButton.enabled=true
rundeck.sso.loginButton.title=Login with Ping
rundeck.sso.loginButton.url=oauth/ping
```

#### Auto Configuration (3.3.0 and above)

```properties
#Enable the OAuth SSO feature
rundeck.security.oauth.enabled=true

rundeck.security.oauth.ping.clientId = YOUR_CLIENT_ID_HERE
rundeck.security.oauth.ping.clientSecret = YOUR_CLIENT_SECRET_HERE
rundeck.security.oauth.ping.autoConfigUrl = https://sso.connect.pingidentity.com
rundeck.security.oauth.ping.authorityProperty = YOUR_MAPPED_GROUPS_ATTRIBUTE
```

#### Manual Configuration

Example:

```properties
#Enable the OAuth SSO feature
rundeck.security.oauth.enabled=true

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

If you have Rundeck set up behind an SSL terminating proxy, you may need to specify the redirect url rather that use the
automatically generated one. Rundeck tells the OAuth2 system where to redirect after authentication by sending a redirect
url to the OAuth2 provider with the first authentication redirect. Most of the time Rundeck
will send the correct url, but in some cases you will need to specify the redirect url manually.

This can be done by setting the following property in your Rundeck configuration file.

```properties
rundeck.security.oauth.YOUR_OAUTH2_PROVIDER.customRedirectUri=https://YOUR_RUNDECK_SERVER/login/oauth2/code/PROVIDER
#example
rundeck.security.oauth.okta.customRedirectUri=https://ssl_terminating_proxy.com/login/oauth2/code/okta
rundeck.security.oauth.ping.customRedirectUri=https://ssl_terminating_proxy.com/login/oauth2/code/ping
```

## Sync User Profile From OAuth2

With Rundeck 3.3.0 you can set Rundeck to sync the information provided by your OAuth2 provider with the profile information inside Rundeck.

Add the following property to your `rundeck-config.properties` file

```properties
rundeck.security.syncOauthUser=true
```

On SSO login, the jwt token sent by your Oauth2 provider will be examined for the `email` `given_name` and `family_name` attributes
which should be populated if you are using the default scopes (`openid email profile`).
Rundeck will save this information to the appropriate fields in the user's Rundeck profile.

#### Alternative user detail attributes

If the token sent by your Oauth2 provider does not use the standard attributes for passing user information you can specify
the attributes in your token that carry the email, first, and last names using the following properties.

```properties
rundeck.ssoSyncAttribNames.firstname=custom-firstname-attrib
rundeck.ssoSyncAttribNames.lastname=custom-lastname-attrib
rundeck.ssoSyncAttribNames.email=custom-email-attrib
```