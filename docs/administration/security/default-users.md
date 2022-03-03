# Built-In Users/Roles

Rundeck supports a number of user directory configurations.

See [Authentication](/administration/security/authentication.md).

The Rundeck installation process will have defined a set of temporary
logins useful during the getting started phase.

- `admin`: Belongs to the "admin" group and is automatically granted
  the "admin" and "user" role privileges. Password: `admin` Role: `admin`
- `user`: Has access to run commands and jobs but unable to modify job
  definitions. Password: `user` Role: `user`

These two accounts are configured with the `realm.properties` option [described here](/administration/security/authentication.md#propertyfileloginmodule).

:::warning
It is strongly recommended to configure additional, user specific administration accounts through your preferred Authentication method and secure these two accounts by editing the `realm.properties` file appropriately or turning off the property file login method.
:::

## Default Roles

With the introduction of Rundeck 4.0 there are new built-in User Roles that can be used in ACLs.  

> Note: Roles correspond to a set of actions within the ACL language and are not the same thing as "groups".

Using a least privilege model the new roles enforce specific limitations even if the user assigned the role is provided more access via ACLs.  The Ops Admin and App Admin are inverse roles allowing for separate duties to be assigned for "keeping Rundeck running" and "using Rundeck to Automate"

### Full Admin
The Full Admin role (`admin`) allows the user access to all areas of Rundeck.

### Ops Admin Role

The Ops Admin role (`ops_admin`) is designed to allow Rundeck System Administration tasks without access to Rundeck Project or usage content.  Users with this role are restricted to specific areas of Rundeck detailed here that focus on system administration tasks.

- No Access allowed to Projects
- No Access allowed to Users
- No Access to System Tours
- No Access to System Calendars
- No Access to System Schedule Forecast
- No Access to manage System ACLs
- No Access to Key Storage
- Allow access to License Details
- Allow access to Cluster Manager

Access to [Configuration Management](/manual/configuration-mgmt/configmgmt.md) entries is limited to items relating to operationally running Rundeck including.
- Database settings
- File Storage settings
- Server names/urls/ports/etc.
- Cluster Management

### App Admin Role

The App Admin role (`app_admin`) is designed to manage Rundeck Content comprehensively without the ability to impact settings or configurations that would impact the system operations of Rundeck.  Users with this role are restricted to areas of Rundeck that relate to running automation with Rundeck.

- Minimal Access to License details
- No Access to Cluster Manager
- Full Access to Projects
- Full Access allowed to Users
- Full Access to System Tours
- Full Access to System Calendars
- Full Access to System Schedule Forecast
- Full Access to manage System ACLs
- Full Access to Key Storage

Access to [Configuration Management](/manual/configuration-mgmt/configmgmt.md) entries is limited to items relating to operationally running Rundeck including.
- Plugin Configuration Settings for Job Steps, Node Steps, SSO, Key Storage etc.
- Mail Settings
- GUI Customization Settings
