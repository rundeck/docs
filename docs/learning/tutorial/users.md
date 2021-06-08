# 4. Getting Started - Users

:::tutorial
:::

Adding User accounts to Rundeck can be done in many ways. Rundeck Enterprise supports [Single Sign-On solutions](/administration/security/sso.md), [LDAP Authentication](/administration/security/authentication.html#ldap) and a variety of other options.

The User Summary tab shows a list of users configured on the Rundeck system.

`admin` This is the default administration account included with all Rundeck installations.
`alice` and `betty` (and some of their friends) are configured by default with more restrictive rights. (the default password for all accounts is admin)

Follow the Exercise below to add your own user:

:::: tabs
::: tab Enterprise Exercise

Our Enterprise product has a User Manager section that allows Rundeck admins to create local user accounts using a GUI interface.

To manage existing users or add an new one:_[optional]_

1. Click **System Settings** (gear menu) > **User Manager**
1. Choose **Manage Local Users**
1. Edit/Add users as needed.

:::
::: tab Community Exercise

Manually adding users for the Community Project is not recommended for these exercises.  More details [how to configure users is located here](/administration/security/authentication.md).

:::
::::

After following the exercise above, confirm using these steps.
1. Open a New Incognito Browser window. (e.g. File > New Incognito Window)
1. Browse to [http://localhost:4440](http://localhost:4440) and login using `alice` and pw: `admin`
1. Notice that the options under the System Menu (Gear Icon) are limited.
1. Open the Welcome Project and Click Jobs. Alice can only run certain jobs indicated with the green play button.

These restrictions are implemented using Access Control Policies.  The next step in the Tutorial covers ACLs.
