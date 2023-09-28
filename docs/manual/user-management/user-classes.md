# User Class Management

## Overview

User Class Management allows Process Automation customers to assign users to User Classes which act as a super-set of ACL enforcement and licensing seat management.  Each class enforces a pre-set collection of restrictions across all customer defined projects.  The Class Management module included as part of the User Management features will allow customers to assign users to classes to fit their use cases.

![User Class Screen](/assets/img/user-classes.png)

## User Classes

User Classes act as a super set of ACLs.  Rundeck uses a lowest privilege model.  These ACLs will allow a certain level of access “at the most”, and customers can apply [customized ACLs](/learning/tutorial/acls.md) to further refine access.

### Full User

This User Class allows full access to the Process Automation environment.

### Job Runner

This User Class, when assigned, will allow a user to run jobs and view output on all projects. They can not modify jobs or other resources.

> Note: Not all licenses include the Job Runner.  Please contact your customer support manager for information.

### Default Class Assignment

By default users are assigned to the Full User class.  This is configurable if customers would like to assign a different class by adding the following entry to the Configuration Management UI.

```
rundeck.license.entitlements.userClass.autoAssignUserClass
```

Possible values are: `[FullUser | JobRunner | None]`

If the setting is not present `FullUser` is used for OnPrem installations, `AppAdmin` is used for Cloud.

>_Note: “None” would represent no access to anything in Process Automation.  The user could login but would have access to nothing.  This is not an assignable class today and will not show up in the management UI.  It is only available for default assignment._

![User Class Screen](/assets/img/user-classes-config.png)

## Assigning Classes

To assign a class to a user:

1. Login to Process Automation as an admin equivalent account.
1. Open the System Menu (gear icon) and select **User Manager**
1. Select the User Classes Tab
1. Click **Assign a New User**
1. Type in the username and select the Class from the **Choose User Class** button.

Note: It is possible to assign users to classes before they have been created as a user or logged in.  The initial release is a free form text field.  There is no validation on the user name field in the initial release.

The “Bulk Assign” button can be used on any existing users by selecting them with the check box next to the accounts and choosing the role to assign.

## Reporting

There is also a new section in the [System Report](/manual/system-report.md) (OnPrem Only) Diagnostics page called “**User Class Usage Audit**”.

### Metrics included are as follows:

* _FullUser.login.count:_ Count of User Logins for class FullUser in the time period.
* _JobRunner.login.count:_ Count of User Logins for class JobRunner in the time period.
* _JobRunner.login.unique.count:_ Count of Unique User Logins for class JobRunner in the time period.
* _FullUser.login.unique.count:_ Count of Unique User Logins for class FullUser in the time period.
* _FullUser.assigned.current:_ Current Count of User Class assignments for FullUser.
* _JobRunner.assigned.current:_ Current Count of User Class assignments for JobRunner.
* _JobRunner.assigned.max:_ Max Count of User Class assignments for JobRunner.
* _FullUser.assigned.max:_ Max Count of User Class assignments for FullUser.
* _FullUser.mapping.current:_ Current Mappings for FullUser. (shown as array of usernames)

This section is also included in the Export Report and may be asked for as part of licensing validation.

## Licensing

The User Classes are enabled on and entitled through an updated license model that includes “entitlements”.  In the graphic shown above the license has been generated with entitlements for (10) Full Users, (10) Job Runners.
