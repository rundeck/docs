# User Manager - Password Reset

:::enterprise
:::

Password Reset is an optional setting for the local [User Manager](/manual/user-management/user-mgmt.md) which allows admins to reset end user passwords by sending the end user a link to change their password.

## Setup

Turn on the following setting in either `rundeck-config.properties` or *Configuration Management*

  `rundeck.password.reset.enabled=true`

## Performing a Reset

There are two options for performing a password reset.

### GUI

Perform a Reset using the Actions drop-down menu in User Management.

> Note: This feature requires eMail functionality configured and a valid email address on the user's Rundeck account.  The rest link is not returned in the UI.

### API

Perform an HTTP POST to `/api/${v}/secure/generatepasswordreset/${username}`.  The user posting to the API must be an admin.

## Notifying Users
When email is configured for the Rundeck server, [as described here](/administration/configuration/email-settings.md), the feature will send the user an email containing a reset link. The user will click the link and be able to set their own password.

If email is not configured, use the API to reset the user’s password, then take the output link that comes from the API response and send it to the user using another process.


## Additional Configs

If email is configured the reset email is configured with the following config options:

- `rundeck.password.email.from` - Set the from email address for the email that will go out when the password reset is triggered
- `rundeck.password.email.subject` - The subject of the email
- `rundeck.password.email.body` - The HTML body of the email that will be sent to the user. You must include the text `${resetLink}` somewhere in the body of the email so that the user will receive the generated reset link. When they click on the link or copy and paste it into their browser they will be taken to the Rundeck server to reset the password.
