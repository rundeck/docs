# Intro to Managing Users

## Overview
User management in Rundeck plays a pivotal role in ensuring secure access, maintaining control over resources, and fostering collaboration among team members. It encompasses the process of defining user roles, permissions, and access levels, granting and revoking privileges, and establishing proper authentication mechanisms.

By implementing a comprehensive user management strategy, organizations can not only enhance security but also optimize operational efficiency and drive productivity.

Effective user management allows administrators to assign appropriate roles and permissions, ensuring only authorized personnel can perform specific actions within the Rundeck environment. This helps mitigate the risk of unauthorized access, data breaches, and potential disruptions to critical operations.

### What is a [User](/learning/tutorial/users.html#_4-getting-started-users)?

A Rundeck user is an individual or entity who interacts with ~~the ~~ Rundeck to perform certain tasks or access specific features. Users are identified and distinguished from each other through unique credentials, such as a local username and password, or other authentication methods like the OKTA SSO authentication method.

### What is a [Role](/manual/10-user.html#user-groups)?

A Role is a grouping or categorization of users with similar permissions and access rights. Roles are defined to simplify the management of user permissions and provide a structured approach to controlling access to different features and resources.

Out of the box Rundeck stores users and roles in a file called `realm.properties` (see the "[Managing Users Locally in a File](#Managing-Users-Locally-in-a-File)" section).

### The [Admin](/administration/security/default-users.html#full-admin) User and Role
A Rundeck instance includes a default full administrative user called `admin` (with an `admin` role). See the following section to see how to change the default user name and password.

## Different Authentication Options

### [Managing Users Locally in a File](/administration/security/authentication.html#propertyfileloginmodule)
Out of the Box, Rundeck uses a local file to manage users, this file is the `realm.properties` and it's located at `/etc/rundeck` path (RPM/DEB based installations) or `$RDECK_BASE/server/config` path (WAR launcher-based installations).

On Runbook Automation, local users can be managed via [the web-based User Manager](/manual/user-management/user-mgmt.html#manage-local-users-enterprise).

### LDAP  / Active Directory Integration

#### [LDAP](/administration/security/authentication.md#ldap)
With LDAP,  Rundeck administrators can easily create, modify, and delete user accounts, assign roles and permissions, and control user access to various resources. This centralized solution streamlines user management processes, improves security, and enhances operational efficiency by providing a unified interface for managing user accounts across multiple systems and applications.


#### [Microsoft Active Directory](/administration/security/authentication.md#active-directory)
Rundeck offers seamless integration with Microsoft Active Directory, enabling efficient management of user accounts within an organization. By integrating with Active Directory, Rundeck leverages its robust user management capabilities, including user creation, modification, and deletion. 

Administrators can easily synchronize user accounts from Active Directory into Rundeck, ensuring consistency and eliminating the need for duplicate user management. This integration also allows for fine-grained access control, where administrators can assign permissions and roles to users based on their Active Directory groups or attributes. 

Rundeck's integration with Microsoft Active Directory streamlines user management processes, enhances security, and provides a centralized platform for managing user access to various resources within the organization.

### Multiple Authentication Modules Capability
Rundeck configurations can include several LoginModule definitions, which are processed in the order specified by the configuration Flag. Refer to [Multiple Authentication Modules](/administration/security/authentication.html#multiple-authentication-modules) in the [Security](/administration/security/default-users.md) section of the Rundeck Administration Guide for more information on setting the configuration Flag.

### SSO (Runbook Automation)
Runbook Automation offers seamless Single Sign-On (SSO) integration for managing user accounts and authentication. With SSO integration, Rundeck leverages existing identity providers such as Okta, Azure Active Directory, and Ping. This eliminates the need for users to remember multiple usernames and passwords, as they can log in to Rundeck using their existing SSO credentials. 

SSO integration with Runbook Automation enhances security, simplifies user management, and provides a unified authentication experience across various systems and applications, ensuring a streamlined and efficient user access control process.

Runbook Automation offers several ways to configure SSO:

* [Okta](/administration/security/sso/okta.html#okta-application-configuration)
* [Ping Identity](/administration/security/sso/ping.html#single-signon-ping)
* [Azure Active Directory](/administration/security/sso/azure-sso.html#configuring-azure-active-directory)

## [Access Control](/administration/security/authorization.html#access-control-policy-2)
After understanding the users and roles another crucial topic is about ACL.  An ACL (Access Control List) policy effectively grants or denies system rights depending on a user's username or group memberships. As an example, the user "admin" is a member of the "admin" group and has been assigned the "admin" role, as described above.

New ACL policies can be set by editing files on the server's file system or in the GUI or by choosing options in the access control GUI (only available on Runbook Automation).  Each policy is made up of a set of rules that specify a set of rights for users who match a specific username pattern or are members of matching groups.

Check the ACL overview [here](/learning/getting-started/acl-overview.html).

## Resources
* [Rundeck + OpenLDAP Docker demo environment](https://github.com/rundeck/docker-zoo/tree/master/ldap)
* [Apache Directory Studio website](https://directory.apache.org/studio/)
* [OpenLDAP Documentation](https://www.openldap.org/doc/admin26/quickstart.html)
* [Active Directory Documentation](https://learn.microsoft.com/en-us/troubleshoot/windows-server/identity/active-directory-overview)
* [OKTA Documentation](https://help.okta.com/en-us/Content/index.htm?cshid=csh-index)
* [Ping Documentation](https://docs.pingidentity.com/)
* [Azure Active Directory Documentation](https://learn.microsoft.com/en-us/azure/active-directory/fundamentals/)
* [Rundeck Docs](/)
