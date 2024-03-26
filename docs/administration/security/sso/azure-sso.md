# Single SignOn (SSO) - Azure Active Directory

Rundeck can be configured to use Azure Active Directory authentication by registering a new application in Azure Active Directory and configuring PagerDuty Process Automation to use it.

## Configuring Azure Active Directory

### Azure - Create a new app registration

The first thing to do is create a new application registration in Azure.

![](/assets/img/sso-azure-01-appreg1.jpg)

1. Begin by opening Azure Active Directory in a browser
2. Select **"App registrations"** on the left
3. Select **"+ New registration"** near the top

![](/assets/img/sso-azure-02-appreg2.jpg)

1. Enter **"PagerDuty Process Automation On-Prem"** for the Name (or any name you like)
2. Leave the default selection for the Support account types
3. Select **"Web"** for the Redirect URI type
4. Enter **"https://*<paop.company.com>*/login/oauth2/code/azure"** for the Redirect URI  
    *Note: This URL should be your PagerDuty Process Automation URL*
5. Select **"Register"** at the bottom

### Azure - Add the required application permissions

Next, add the required permissions in Azure.

![](/assets/img/sso-azure-03-apiperm1.jpg)

1. Select **"API permissions"** on the left
2. Select **"+ Add a permission"**
3. Select **"Microsoft Graph"** as the permission type
4. Select **"Delegated permissions"**
5. Select **"email"** to enable the permission
6. Select **"openid"** to enable the permission
7. Select **"profile"** to enable the permission
8. Select **"Add permission"** at the bottom

![](/assets/img/sso-azure-04-apiperm2.jpg)

1. Select **"API permissions"** on the left
2. Select **"+ Add a permission"**
3. Select **"Microsoft Graph"** as the permission type
4. Select **"Application permissions"**
5. Enter **"Directory.Read.All"** in the search box
6. Select **"Directory"** to expand it
7. Select **"Directory.Read.All"** under Directory to enable the permission
8. Select **"Add permission"** at the bottom

### Azure - Create the Application Secret

Next, create an application secret (ID & password) that will be used in the Rundeck configuration.  Note, if you lose the secret value/password, you can delete the existing secret and create a new one.

![](/assets/img/sso-azure-05-secret1.jpg)

1. Select **"Certificates & secrets"** on the left
2. Select **"+ New client secret"**
3. Enter **"PagerDuty Process Automation On-Prem"** for the Description (or any name you choice)
4. Select **"Add"** at the bottom

![](/assets/img/sso-azure-06-secret3.png)

1. Copy the **Value** and store it someplace. You will use it as the clientSecret (password) when configuring Rundeck. (Hint: use the Copy to clipboard button)

### Azure - Get the **"Directory (tenant) ID"**

Last, capture the Directory (tenant) ID to use in configuring Rundeck.

![](/assets/img/sso-azure-07-dirid2.png)

1. Click **"Overview"** on the left
2. Copy the **"Directory (tenant) ID"** and store it someplace.  You will use it in the URL when configuring Rundeck. (Hint: use the Copy to clipboard button)
3. Copy the **Client ID** and store it someplace. You will use it as the clientID when configuring Rundeck. (Hint: use the Copy to clipboard button)

## Configure Rundeck to use Azure Active Directory for Authentication

Azure Active Directory integration is configured mainly within the `rundeck-config.properties` file.  Below are the required and optional settings to be added. Be sure to substitute your DIRECTORY_TENANT_ID, CLIENT_ID and SECRET_VALUE (Password) that you previously saved. After making the changes to the config file, a server restart is required.

```properties
# rundeck-config.properties: Azure SSO
rundeck.sso.loginButton.enabled=true
rundeck.sso.loginButton.title=Login with Azure
rundeck.sso.loginButton.url=oauth/azure
rundeck.security.oauth.azure.autoConfigUrl=https://login.microsoftonline.com/<DIRECTORY_TENANT_ID>/v2.0
rundeck.security.oauth.azure.clientId=<CLIENT_ID>
rundeck.security.oauth.azure.clientSecret=<SECRET_VALUE>
rundeck.security.syncOauthUser=true

# Define the Azure scopes to map
rundeck.security.oauth.azure.scope=openid email profile https://graph.microsoft.com/Directory.Read.All

# Map Azure user detail attributes
rundeck.ssoSyncAttribNames.firstname=given_name
rundeck.ssoSyncAttribNames.lastname=family_name
rundeck.ssoSyncAttribNames.email=preferred_username

# Optional: The follow can be used to make the Azure AD email address as the username
# which enables you to use the email address as the username in ACL policies
#rundeck.security.oauth.azure.principleKeys=preferred_username
```


### Important: First Login Approval

Upon first login to Rundeck using Azure SSO an Azure Admin level user will need to consent to the `Directory.Read.All` permission. Make sure to click the checkbox that asks to consent for the **whole organization**.

<img width="517" alt="image" src="https://github.com/rundeck/docs/assets/58412426/185bf972-577f-4e15-8367-d29fccaae578">

## Note: Azure Groups

By default, Azure does not send group information in the SSO token. You can configure Azure to send group information by adding a groups claim to the token configuration in Azure, however **this method only supports using the group OID as group identifier, but not the group name**.

![](/assets/img/sso-azure-08-token.png)


**If you need to sync user groups by group name**, you need to enable the Rundeck plugin that uses the MS Graph API to get user/group information. Using this requires additional API permissions that were setup in the App Registration.

To enable this plugin, enable the *Enable Azure UserGroupSource Plugin* setting in the **System Configuration** page (config key `framework.plugin.UserGroupSource.AzureGroupSource.enabled`), or add the following to the `framework.properties` file:

```properties
# framework.properties: Azure SSO
# Map Azure groups by default (can be commented out if not mapping group permissions)
framework.plugin.UserGroupSource.AzureGroupSource.enabled=true
```

## Note: firstname, lastname and email attribute mapping

If your Azure Active Directory attributes are non-standard, you can specify the correct attribute values to use.  You can verify the values by selecting the person icon in the upper right corner after logging in, and selecting **Profile**.  If you see **NOT SET** for any fields, you will need to correct the attribute mappings to your custom settings.

## Note: Debugging tips

If you are having trouble with the Azure SSO integration, these additional config file entries will generate helpful debugging information.  Adding the following lines to the `log4j2.propertie`* file will produce additional debugging output in the `services.log` file.

```properties
logger.spring_security_oauth.name = org.springframework.security.oauth2
logger.spring_security_oauth.level = debug
logger.spring_security_oauth.additivity = false
logger.spring_security_oauth.appenderRef.stdout.ref = STDOUT
```

## Note: Azure Government

The Azure Groups plugin uses the MS Graph API endpoint to gather the groups.  By default it will use the endpoint `https://graph.microsoft.com/v1.0/users/`.  For some Azure environments (Government, etc.) a different endpoint may be needed. ([more info](https://docs.microsoft.com/en-us/answers/questions/434905/microsoft-graph-api-for-azure-us-government-plan.html))  

The endpoint can be changed using the following setting using Configuration Management or the `framework.properties` file:

```properties
# framework.properties: Change the default endpoint
framework.plugin.UserGroupSource.AzureGroupSource.baseApiEndpoint=<NEW_URL>
```
