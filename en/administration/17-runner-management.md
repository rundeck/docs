% Runner Management

This guide explains how to manage Runners in Rundeck, including creating, editing, and managing Runner credentials. Runners enable distributed automation by executing jobs across different environments without requiring direct SSH access to target nodes.

### Overview

Runners are lightweight execution agents that connect to your Rundeck instance to execute automation tasks. They provide several key benefits:

1. **Distributed Execution**: Execute jobs in different networks, cloud environments, or security zones
2. **Reduced Network Complexity**: No need for Rundeck to have direct SSH access to all target nodes
3. **Improved Security**: Runners can operate within isolated networks while maintaining secure communication with Rundeck
4. **Scalability**: Deploy multiple runners to handle increased workload across your infrastructure

### Runner Types

Rundeck supports two types of runner replicas:

- **Manual Replicas**: Designed for stable, long-lived runner instances that don't need scaling. These are manually managed, permanent installations suitable for environments where you want predictable, static runner deployment.

- **Ephemeral Replicas**: Designed for dynamic, scalable runners in container orchestration platforms like Kubernetes or Docker Swarm. These runners support auto-scaling and are ideal for cloud-native environments.

### Accessing Runner Management

Runner Management is available at two levels:

- **System-level Runners**: Navigate to **System Menu** → **Runner Management** to manage runners available across all projects
- **Project-level Runners**: Navigate to your project → **Project Settings** → **Runner Management** to manage runners specific to a project

### Creating a Runner

To create a new runner:

1. Navigate to the Runner Management page (system or project level)
2. Click the **Create Runner** button
3. Provide the following information:
   - **Name**: A descriptive name for the runner
   - **Description**: Optional description of the runner's purpose
   - **Tags**: Optional tags for organizing and selecting runners
   - **Platform**: Select the installation platform (Linux, Docker, Kubernetes, Windows)
   - **Replica Type**: Choose between Manual or Ephemeral (if replica feature is enabled)
4. Click **Next** to proceed through the installation wizard
5. Follow the installation instructions provided for your selected platform

The installation instructions will include:

- Download link for the runner binary
- Configuration credentials (Runner ID and Token)
- Platform-specific setup commands
- Service configuration examples

### Editing Runner Details

Rundeck provides an improved single-screen inline editing experience for managing runner information. Instead of navigating to a separate edit page, you can now edit runner details directly on the runner's detail page within the **Basic Information** tab.

#### Accessing Edit Mode

To edit a runner:

1. Navigate to the Runner Management page (system or project level)
2. Click the **Actions** dropdown next to the runner you want to edit
3. Select **Edit Runner**

The runner's detail page opens with the **Basic Information** tab in edit mode, allowing you to modify runner properties without leaving the page.

#### Editable Fields

In edit mode, you can modify the following runner properties:

* **Name**: The runner's display name (required)
* **Description**: Additional information about the runner's purpose
* **Tags**: Labels for organizing runners and controlling job execution targeting

#### Validation

The edit form includes built-in validation:

* **Runner Name is Required**: You cannot save a runner without a name
* Empty or whitespace-only names will display a clear error message
* Invalid inputs are caught before submission to prevent errors

#### Saving Changes

To save your edits:

1. Make your desired changes to the runner details
2. Click **Save** to commit the changes

Upon successful save:

* You'll see a success notification: "Runner updated successfully"
* You are returned to the Runner list page
* Changes are immediately reflected across the system

#### Canceling Edits

To discard your changes:

1. Click **Cancel** in the edit form
2. All changes are discarded
3. The detail page returns to view mode with the original runner data

#### Focused Editing Experience

When in edit mode:

* Non-essential tabs (Node Dispatch, Replicas) are hidden to maintain focus on editing
* Only the **Basic Information** tab is visible with the edit form
* The **Regenerate Credentials** button is hidden during editing (only available in view mode)
* All tabs reappear when you cancel or save

**Note**: The **Node Dispatch** tab settings can be edited separately when viewing a runner (not in edit mode). Node Dispatch has its own independent save workflow.

### Regenerating Runner Credentials

Credentials may need to be regenerated if they are compromised or lost. The **Regenerate Credentials** functionality is only available when viewing a runner's detail page in view mode (not during edit mode).

#### When Regenerate is Available

The **Regenerate Credentials** button visibility depends on runner type and replica configuration:

**View Mode Requirement:**

- The **Regenerate Credentials** button is only visible in view mode (not shown during edit mode to maintain focus on basic information editing)

**When Replicas Feature is Enabled:**

- **Ephemeral Runners**: Can regenerate credentials (designed for dynamic environments)
- **Manual Runners**: Cannot regenerate credentials (use "Add Replica" workflow instead)

**When Replicas Feature is Disabled (Legacy Mode):**

- All runner types can regenerate credentials for backward compatibility

#### Security Note

> **Important**: Regenerating credentials will immediately invalidate the current credentials. Any active runner using the old credentials will no longer be able to connect to Rundeck until you update the runner with the new credentials and restart it.

#### How to Regenerate Credentials

1. Navigate to the runner's detail page (click on a runner name from the table)
2. Ensure you are in **View Mode** (not Edit Mode) - the **Regenerate Credentials** button is only visible in view mode
3. Scroll to the **Regenerate Credentials** section
4. Review the warning message about credential invalidation
5. Click **Regenerate Credentials**
6. Installation instructions will appear with:
   - New Runner Token
   - New Download Token
   - Updated installation commands for your platform

**Note**: The "Download Runner" option has been removed from the actions dropdown. Installation instructions are now displayed directly after clicking **Regenerate Credentials**.

#### Installing Regenerated Credentials

After regenerating credentials:

1. Stop the running runner service on your runner machine
2. Update the runner configuration file with the new token:

~~~~~
RUNDECK_RUNNER_TOKEN=<new-token-value>
~~~~~

3. Restart the runner service
4. Verify the runner reconnects and shows "Healthy" status

For manual runners with replicas enabled, use the **Add Replica** workflow to create new runner instances rather than regenerating credentials.

### Runner Status

Runners report their status to Rundeck:

- **Healthy**: Runner is connected and operating normally
- **Unhealthy**: Runner is connected but experiencing issues
- **Down**: Runner is not connected to Rundeck
- **New**: Runner was just created and has not yet connected

### Project Assignments

System-level runners can be assigned to specific projects:

1. View a runner's detail page
2. Navigate to the **Project Assignments** section
3. Click **Add Project** to associate the runner with additional projects
4. Configure node filters for each project assignment to control which nodes the runner can access
5. Click **Edit** or **Remove** in the actions dropdown to manage existing assignments

### Runner Selection for Jobs

When configuring a job, you can specify how runners are selected for execution:

- **Automatic**: Rundeck automatically selects an available runner based on load and availability
- **Tag-based**: Specify runner tags to target specific runners
- **Direct Selection**: Choose a specific runner by name

Configure runner selection in the job definition under the **Nodes** tab.

### Managing Runner Replicas

When the replica feature is enabled, you can manage multiple instances of a runner:

1. View a runner's detail page
2. Click the **Replicas** tab
3. View all replica instances and their status
4. Use **Add Replica** to create new instances (for manual runners)
5. Use **Delete** to remove replica instances

Ephemeral runners typically auto-scale based on your orchestration platform configuration.

### Node Dispatch Configuration

For project-level runners, you can configure how the runner interacts with nodes. Node Dispatch settings are managed independently from basic runner information editing:

1. View a runner's detail page (click on a runner name from the table)
2. Ensure you are in **View Mode** (not Edit Mode)
3. Click the **Node Dispatch** tab
4. Configure the following settings:
   - **Runner as Node Enabled**: Allow the runner itself to be treated as a node
   - **Remote Node Dispatch**: Enable the runner to dispatch to other nodes
   - **Runner Node Filter**: Specify which nodes the runner can target
5. Click **Save** to apply the configuration

**Note**: Node Dispatch configuration remains editable on the runner detail page and is not affected by the basic information editing workflow. You can modify Node Dispatch settings at any time when viewing a runner's detail page in view mode.

### Deleting a Runner

To remove a runner:

1. Navigate to the Runner Management page
2. Locate the runner in the table
3. Click the **Actions** dropdown
4. Select **Delete Runner**
5. Confirm the deletion in the dialog

> **Warning**: Deleting a runner is permanent and cannot be undone. All associated replicas and configurations will be removed.

### Troubleshooting

#### Runner Shows "Down" Status

- Verify the runner service is running on the runner machine
- Check network connectivity between the runner and Rundeck server
- Verify credentials are correct and have not been regenerated
- Review runner logs for connection errors

#### "Runner Name is Required" Error When Saving

- Ensure the Name field is not empty
- Remove any whitespace-only entries
- Enter a valid alphanumeric name

#### Cannot Regenerate Credentials for Manual Runner

- This is expected behavior when replica feature is enabled
- Manual runners are designed for stable, permanent installations
- Use the **Add Replica** workflow instead to create new runner instances
- If you need to regenerate, contact your Rundeck administrator about replica feature settings

#### Edit Changes Not Saving

- Check for validation errors in the form
- Ensure you have proper permissions to edit runners
- Verify network connectivity
- Check Rundeck server logs for errors

### Best Practices

1. **Use Descriptive Names**: Give runners meaningful names that indicate their purpose and location
2. **Apply Tags Consistently**: Use a standardized tagging scheme for easier runner selection
3. **Document Runner Purpose**: Use the description field to note the runner's intended use and owner
4. **Monitor Runner Health**: Regularly check runner status and investigate unhealthy runners
5. **Secure Credentials**: Store runner credentials securely and regenerate them if compromised
6. **Plan for High Availability**: Deploy multiple runners for critical automation workflows
7. **Use Appropriate Replica Type**: Choose manual for stable environments, ephemeral for dynamic/cloud environments

### See Also

- [Managing Node Sources](04-node-resource-sources.html) - Managing nodes that runners can target
- [Scaling Rundeck](14-scaling-rundeck.html) - Architecture considerations for distributed runner deployments
- [Access Control Policy](10-authorization.html) - Controlling permissions for runner management
