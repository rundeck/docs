# Single SignOn - Okta

:::enterprise
:::

Runbook Automation can be configured to work with the Okta security platform.

To configure the Okta SSO plugin for Rundeck add a new application to your Okta Applications and then configure Rundeck to authenticate using Okta.

> The Okta subscription must include access to the "Custom Auth Servers" functionality to setup SSO with Rundeck.

### Okta Application Configuration

Login to the Okta web portal and configure a new application.

- Create a new web application.
  - Configure the application with "Authorization Code" Grant type allowed.
  - Add the following URL to `Sign-In Redirect URIs` (it's possible to add more than one):
    `<rundeck base url>/login/oauth2/code/okta`. Example: `http://localhost:4440/login/oauth2/code/okta`
  - Copy the Client ID and Client Secret provided by Okta for use in next section.
- Create groups with the same name as the roles configured on Rundeck. Map users to those groups.
- Under the "Security > API" menu, select the default Authorization server, click the Claims tab. add a new claim with the following information:
  - Name: groups
  - Include in Token Type: `ID Token` with `Userinfo/id_token_request`
  - Value Types: `Groups`
  - Filter: Regex: `.*`

### Rundeck configuration

After setup of the application in Okta, configure Rundeck to use that application.

> Note: All of these settings can be configured using the [Configuration Management](/manual/configuration-mgmt/configmgmt.md) feature (recommended) or `rundeck-config.properties`.

#### Add the login button to Rundeck

```properties
#These properties control the appearance and url of the button on the login page
rundeck.sso.loginButton.enabled=true
rundeck.sso.loginButton.title=Login with Okta
rundeck.sso.loginButton.url=oauth/okta
```

#### Auto Configuration Method (3.3.0 and above)
```properties
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

#This is the default scope setting. You can add additional scopes at the end of the line, separate it by spaces
# rundeck.security.oauth.okta.scope = openid profile email groups my_own_scope
rundeck.security.oauth.okta.scope = openid profile email groups
rundeck.security.oauth.okta.authorityProperty = YOUR_MAPPED_GROUPS_ATTRIBUTE
```

#### Manual Configuration Method

Add the following properties via [Configuration Management](/manual/configuration-mgmt/configmgmt.md) (recommended) or `rundeck-config.properties` file:

```properties
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

#This is the default scope setting. You can add additional scopes at the end of the line, separate it by spaces
# rundeck.security.oauth.okta.scope = openid profile email groups my_own_scope
rundeck.security.oauth.okta.scope = openid profile email groups
rundeck.security.oauth.okta.authorityProperty = YOUR_MAPPED_GROUPS_ATTRIBUTE

```

If setup is done using the `rundeck-config.properties` file, restart Rundeck.

### SSO Login

Upon successful configuration of Okta and Rundeck there will be a new button
on the Rundeck login page that says _Login with Okta_. By clicking this button
users will be redirected to an Okta Login form that will be used to collect the user credentials.
Once the user has logged in with their Okta credentials they will be redirected back to the home
menu page in Rundeck.

### Okta Group Plugin

If Active Directory is integrated into the Okta system, the setup for groups described above may not work. In this case it's possible to configure the Okta user group plugin that is packaged with Rundeck, to pull the user's group information from Okta via the Okta API.

Create an API key in Okta used to to make API requests.

Add the following properties to [Configuration Management](/manual/configuration-mgmt/configmgmt.md) or your `framework.properties` file.

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
