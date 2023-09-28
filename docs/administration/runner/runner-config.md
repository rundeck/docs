---
title: "Configuration"
---

# Enterprise Runner - Configuration

## Creating new Runners

Please review [the Runner intro, architecture and communication framework](/administration/runner/runner-intro.md) before creating and deploying runners in your environment. Please verify [the Runner feature is enabled](/administration/runner/runner-setup.md)  before you can follow the steps below. 

Once the feature is enabled, a new Runner can be created through the Runner Management UI under the System menu.

![Create a runner](@assets/img/runner-config-start.png)

### Add Tags

The new architecture Runners are referenced by Tags in the job definitions, and you can create more than one Runner using the same tags. This abstract addressing allows more flexibility in managing multiple Runners in the environment, and also provides for higher availability: if a single Runner goes offline or changes, the job definitions will not need to be updated as other Runners with the same tags will be able to execute jobs.

A new Tag input field is added to the first step. The tag can be typed in or chosen from a drop-down list if there are any tags containing the word typed in. Tag names must be unique, the same tag cannot be added twice. Special characters e.g. , ; space return will trigger entering the tag name.

![Enter runner tags](@assets/img/runner-config-add-tags.png)

### Project Assignment

At the next step we will assign the new Runner to a set of projects. Runners will listen for tasks only for the projects they are assigned to. The search feature now can let users search projects by name and label. Clicking next will create the new Runner and if the operation succeeds, the Confirmation dialog will be presented.

![Assign projects](@assets/img/runner-config-assign-projects.png)

### Download a Runner

The confirmation screen contains a button to download the new Runner. Once the jar file is downloaded, clicking on the “Close and complete” button will  close the wizard dialog.

![Download binary](@assets/img/runner-config-download.png)

### Viewing Runner details

A new section Tags is available  at the bottom of the Runner information page. Like in the summary page, a list of associated tags are displayed.

![View details](@assets/img/runner-config-viewdetails.png)

### Editing Runners

A new Tags input field was added to allow a adding or removing tags after a Runner has been created.

![Edit Runners](@assets/img/runner-config-edit.png)

### Listing Runners

The Runner summary page has a new Tags column added to the list. The column shouldn’t display if the feature is disabled. Runner tags are listed if available.

![List Runners](@assets/img/runner-config-list.png)

