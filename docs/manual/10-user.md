# Profile Menu

The Profile menu contains items to view your Profile and log out.

![user menu](~@assets/img/fig1001.png)

## Profile

The User Profile page shows user details, Authorization Roles, API Tokens, and preferred language.

### Language

You can choose a Language preference from the select menu. Currently English is the primary application language, with partial internationalization in Spanish, French and Chinese.

### User Email and Name

You can modify the email address, first name, and last name, for your own User Profile.

Click "Edit" to edit the values.

![Edit profile](~@assets/img/user-edit-profile.png)

The email address can be referenced as a [context variable](/manual/job-workflows.md#context-variables)
from Job notifications as `${job.user.email}`.

The email address and name will also be used by SCM plugins for commit identification.  (See: [Git Plugin - Committer Configuration](/manual/projects/scm/git.md#committer-configuration)).

### User Groups

The "Groups" section lists the user groups (aka Roles) that are granted to the user. This are used for checking ACL policies for allowed actions in Rundeck.  User Groups are provided by the authentication system, such as LDAP or Active Directory.

For information on configuring Authentication see [Administration Guide - Authenticating Users](/administration/security/authentication.html#authenticating-users).

### User API Tokens

The User API Tokens section lists the API Tokens you are able to manage. You can generate or remove API Tokens on this page.  

*Admin*-level users can manage and view API Tokens for *all* users.  Non-admin users can only manage their own API Tokens.

Each API Token's expiration date will be shown in the list, and whether it has already expired or not. 
You can remove expired tokens by clicking "Delete Expired Tokens". 
If you are an *admin* user, you will be prompted whether to delete only your own expired Tokens, 
or expired Tokens for all users.

Delete an individual Token by clicking the "Delete" button next to the Token.

Versions which store tokens securely will also allow to provide a token name for identification, and tokens will only be available at creation time.

![user profile](~@assets/img/fig-user-api-tokens.png)

Older versions which use unsecured tokens provide a "Show Token" button to view/copy a token.


### Generate API Token

You can create a new API Token by clicking the "+" button.

![Generate Token](~@assets/img/fig-user-generate-token.png)

You can provide a name to easily identify this token.

If you have *admin* authorization, you can specify the User, and list of Roles to store in the Token. If you leave the list of Roles blank, it will have the same authorization roles as the list of Groups that are currently granted to your profile. If you specify a list of roles, only those roles roles you have been granted will be allowed.

You can also specify the duration of the token, or use blank or `0` to have it set to the maximum allowed duration.

Click "Generate New Token" to create the Token and the token value will appear. **Be sure to save your token. This is the only moment in which you can see the token value.**

![Token Value](~@assets/img/fig-user-tokens-onetime-display.png)
