# Single SignOn - Azure Active Directory

Rundeck Enterprise can be configured to authenticate using Azure Active Directory.

To configure your Rundeck with SSO from Azure Active Directory you will need to register a new application and gather some configuration information.

## Configuring Azure Active Diretory

1. Navigate to the Azure Active Directory page
1. Click on the **App Registrations** link
    ![app reg link](~@assets/img/sso-azure-appreg.jpg)
1. Click **New Registration**
1. Supply the _Application Name_ and _Redirect url_.
    The redirect url will follow the format: `https://[your.rundeck.domain]/login/oauth2/code/azure`
    ![app reg fields](~@assets/img/sso-azure-registerapp.jpg)
1. After the application is created, click on it to view the configuration.
1. Click on the Certificates & Secrets sidebar item, then in the Client Secrets section, click **New Client Secret**.
    ![app client secret](~@assets/img/sso-azure-clientsecret.jpg)
1. This is the client secret used to configure Rundeck.
1. Gather, from the _Overview_ page click _Endpoints_, the Client ID and Auto Config URL to use in the Rundeck config.
    ![app client secret](~@assets/img/sso-azure-configvalues.jpg)

## Configuring Rundeck

Azure SSO can be configured using Configuration Management or the `rundeck-config.properties` file.

Configuration Management Example Config:

`image TBD`

`rundeck-config.properties` Example:

```
rundeck.security.oauth.enabled=true  
rundeck.sso.loginButton.enabled=true  
rundeck.sso.loginButton.title=Login with Azure  
rundeck.sso.loginButton.url=oauth/azure  
rundeck.security.oauth.azure.autoConfigUrl = AUTO_CONFIG_URL_HERE  
rundeck.security.oauth.azure.clientId = CLIENT_ID_HERE  
rundeck.security.oauth.azure.clientSecret = CLIENT_SECRET_HERE  
```

## Azure Groups

By default Microsoft does not send usable group information in the SSO token. To get a user’s groups Rundeck has bundled a plugin that uses the MS Graph API to get user/group information. Using this requires extra permission for the App Registration set up previously.

1. Click back into the App Registration and go to the _API Permissions_ screen.
1. Give the app the ability to _read directory data_.
    - For this permission you may also select type Application which is a narrower level of access.
    [Azure App permissions](~@assets/img/sso-azure-groupspermissions.jpg)
1. Add the following lines to Configuration Management or `rundeck-config.properties`
    ```
    framework.plugin.UserGroupSource.AzureGroupSource.enabled=true  
    rundeck.security.oauth.azure.scope = openid email profile https://graph.microsoft.com/Directory.Read.All
    ```

Upon first login to Rundeck using Azure SSO an Azure Admin level user will need to consent to the `Directory.Read.All` permission. Make sure to click the checkbox that asks to consent for the _whole organization_.
