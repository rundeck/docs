# User Manager

![User Manager Button](@assets/img/usermgr-menu-button.png)

## User Summary

This is a listing of all the users that have logged in to Rundeck regardless of the source of users.

## Manage Local Users (Enterprise)
::: enterprise
:::

Enterprise users can leverage the built-in GUI based management and centralized storage of local Rundeck user accounts.

![User Manager Screen](@assets/img/usermgr-manage-users.png)

### Adding Users

Click the **Add User** button in the main window.  Fill out the fields.

  - ___Username:___ Unique value used to login to the system.  This is also the value used to merge with other user sources. (LDAP/Active Directory)
  - ___Password:___ By default there are no password policies enforced.  It is strongly encouraged to use something secure!
  - _First Name:_ What you call someone informally.
  - _Last Name:_ What you use when it's time to get a bit more formal.
  - _Email:_ How to reach someone.
  - _Notes:_ A nice description of this person that makes them smile.
  - ___Groups:___ Provide at least one role for them to login. See [Groups Section](#manage-local-groups) below

  ___Bold/Italics___ are minimum required fields.

![Add User Screen](@assets/img/usermgr-add-user.png)

## Manage Local Groups (Enterprise)
::: enterprise
:::

GUI based management of groups (also sometimes referred to as Roles).

![Group Manager Screen](@assets/img/usermgr-manage-groups.png)

### Adding Groups

Click the ***Add Group*** button in the main window.  Fill out the fields and select users for the new group.

  - ___Group Name:___ Unique name of the group.  Reference this value in ACL policies.
  - _Description:_ A nice description of this group of users.
  - _Users:_ Click the green plus sign to add the user to the group.  Click the red minus sign to remove them from the group.

![Group Add Screen](@assets/img/usermgr-add-group.png)


## Appendix

### Including Admin Users
By default the Rundeck admin user is not listed in the User Manager.  There are some options available in `rundeck-config.properties` to configure whether admin accounts are available in this module.  [They are documented here](/administration/configuration/config-file-reference.html#rundeck-config-properties) and prefixed with `rundeck.security.dblogin.`
