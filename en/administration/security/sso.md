% Rundeck SSO Security (Pro Only)

Rundeck PRO can be configured to work with the Okta security platfom.

To configure the Okta SSO plugin for your Rundeck installation
you will need to add a new application to your Okta Applications,
and then add some properties to your rundeck-config.properties file.

### Okta Application Configuration
Log into your Okta web portal and configure a new application.

  - Create a new web application.
    - Configure the application with "Authorization Code" Grant type allowed.
    - Add the following URL to `Login Redirect URIs` (you can add more than one):
   `<rundeck base url>/user/oauth/okta`. Example: `http://localhost:4440/user/oauth/okta`
    - Copy the Client ID and Client Secret provided by Okta so that you can use them for the rundeck configuration.
  - Create groups with the same name as the roles configured on Rundeck. Map users to those groups.
  - Under the API menu, open the Authorization Servers configuration and add a new claim with the following information:
    - Name: groups
    - Include in Token Type: `ID Token` with `Userinfo/id_token_request`
    - Value Types: `Groups`
    - Filter: Regex: .*

### Rundeck configuration

Once you've set up the application in Okta you can configure Rundeck to use that
application.

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

#Copy These verbatim
rundeck.security.oauth.okta.clientAuthenticationScheme = form
rundeck.security.oauth.okta.scope = openid profile email

#These properties control the appearance and url of the button on the login page
rundeck.sso.loginButton.enabled=true
rundeck.sso.loginButton.title=Login with Okta
rundeck.sso.loginButton.url=oauth/okta
```

After completing the configuration of your rundeck-config.properties file, restart Rundeck.

### SSO Login

If you have successfully configured Okta and Rundeck you will see a new button
on the rundeck login page that says *Login with Okta*. By clicking this button
you will be redirected to an Okta Login form that will be used to collect the user credentials.
Once you have logged in with your Okta credentials you will be redirected back to the home
menu page in Rundeck.

Congratulations, you now have a working Okta/Rundeck SSO setup.

### Okta Group Plugin

If you have Active Directory integrated into your Okta system, the setup for groups described above may not work. In this case you
may configure the Okta user group plugin that is packaged with Rundeck, to pull the user's group information from Okta via the Okta API.

First, you will need to create an API key in Okta that you can use to make API requests.

Then you will need to add the following properties to your `framework.properties` file.

~~~ {.properties}
framework.plugin.UserGroupSource.OktaGroupSource.apiToken=<api key>

framework.plugin.UserGroupSource.OktaGroupSource.oktaHostName=<okta host name>
#example:
#framework.plugin.UserGroupSource.OktaGroupSource.oktaHostName=dev-877856.oktapreview.com

framework.plugin.UserGroupSource.OktaGroupSource.includedGroupTypes=APP_GROUP
#APP_GROUP is the way Okta denotes AD groups, if you want to also include Okta groups
#you could do the following:
#framework.plugin.UserGroupSource.OktaGroupSource.includedGroupTypes=APP_GROUP,OKTA_GROUP
framework.plugin.UserGroupSource.OktaGroupSource.enabled=true
~~~

If the plugin is enabled, when the user logs in, it will attempt to use the Okta user id out of the SSO token to pull that user's groups from Okta.
