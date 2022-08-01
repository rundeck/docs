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
