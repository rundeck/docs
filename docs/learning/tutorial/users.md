# 4 - Getting Started - Users

Adding User accounts to Rundeck can be done in many ways. Rundeck Enterprise support [Single Sign-On solutions](/administration/security/sso.md), [LDAP Authentication](/administration/security/authentication.html#ldap) and a variety of other options.

The User Summary tab shows a list of users configured on this Rundeck system.

`admin` This is the default administration account included with all Rundeck installations.
`alice` and `betty` (and some of their friends) are configured by default with more restrictive rights. (the default password for all accounts is admin)

Follow the Exercise below to add your own user:

:::: tabs
::: tab Enterprise Exercise

Our Enterprise product has a User Manager section allows Rundeck admins to create local user accounts using a GUI interface.

:::
::: tab Community Exercise
The Community version will require editing a text file at somewhere and ?restarting?

:::
::::

After following the exercise above confirm using these stesps.
1. Open an New Incognito Browser window. (e.g. File > New Incognito Window)
1. Browse to http://localhost:4440 and login using `alice` and pw: `admin`
1. Notice that the option under the System Menu (Gear Icon) are limited.
1. Open the Welcome Project and Click Jobs. Alice can only run certain jobs indicated with the green play button.

These restrictions are implemented using Access Control Policies.  The nest step in the Tutorial covers ACLs.
