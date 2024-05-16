# Managing Runners

## Overview

Runners can be managed at the System level as well as at the Project level of Runbook Automation (cloud and self-hosted).
Both the System and Project level management interfaces allow users to create, edit, and delete Runners.  
However, there are specific actions that can only take place depending on whether operating in the System or Project level.

### Managing Runners at the System level

At the System level, in addition to creating, editing, and deleting Runners, users can also assign Runners to Projects.

To access the System level Runner management interface, navigate to the **System menu** and select **Runner Management**:

![Runner Management System Menu](/assets/img/runner-management-system-menu.png)<br>

The Runner Management interface will display a list of all Runners in the system:

![Runner Management System List](/assets/img/system-level-runner-management.png)<br>

From this interface, users can:

- Create a new Runner. For detailed steps, see [Creating a Runner](/administration/runner/runner-installation/create-a-runner).
- Edit an existing Runner. For detailed steps, see [Configuring a Runner](/administration/runner/runner-configuration/runner-config).
- Assign Runners to Projects.  For detailed steps, see [Assigning Runners to Projects](#assign-runners-to-projects).
- Delete Runners.  For detailed steps, see [Deleting a Runner](/administration/runner/runner-installation/delete-a-runner).

#### Assigning Runners to Projects

To assign a Runner to a project, follow these steps:

1. From the System level Runner management interface, click on the name of the Runner.
2. In the **Project Assignments** section, click on the **Add Projects** button.
    ![Add Projects Button](/assets/img/assign-runner-to-project.png)
3. From the popup, select the Projects that should be able to use this Runner
    ![Select Projects](/assets/img/runner-select-projects.png)
4. Click **Add**

The Runner can now be used within the designated projects for various tasks such as job execution, node discovery, and secrets-management integration.

### Managing Runners within a Project

At the Project level, users can create, edit, and delete Runners for that specific Project.
However, Runners created at the Project level are only available for use within that Project and cannot be used in other Projects.

To access the Project level Runner management interface, navigate to a specific Project and then select **Runner Management** from the left navbar.

The Runner Management interface will display a list of all Runners in the Project:

![Project Runners](/assets/img/project-management-runners-list.png)<br>

From this interface, users can:

- Create a new Runner. For detailed steps, see [Creating a Runner](/administration/runner/runner-installation/create-a-runner).
- Edit an existing Runner. For detailed steps, see [Configuring a Runner](/administration/runner/runner-configuration/runner-config).
- Delete Runners.  For detailed steps, see [Deleting a Runner](/administration/runner/runner-installation/delete-a-runner).

### Changing Runners from Single to Multiple Projects

When a Runner is assigned to a single Project, then users within a Project and with the appropriate permissions can make any changes to the Runner from the Project level interface. This includes the ability to:
- Edit the Runner's Name
- Edit the Runner's Tags
- Delete the Runner
- Regenerate Credentials

![_Changes of any kind can be made to Runners assigned to a single Project_](/assets/img/single-project-runner-abilities.png)

However, when a Runner is assigned to multiple Projects, then users within Projects can only remove the Runner from their Project. They cannot make other changes to the Runner.

![_Users can only remove a Runner from a Project when it is assigned to multiple Projects_](/assets/img/multi-project-runner-abilities.png)

This is because when a Runner spans multiple Projects it is considered a _shared resource_.