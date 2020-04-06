# Release 3.2.5

Name: <span style="color: coral"><span class="glyphicon glyphicon-phone"></span> "nacho coral phone"</span>

## Overview
This release represents a smaller set of fixes that are setting up for some very big things to come!  Along with the list of bugs and fixes below we are working on some new plugins that bring awesome functionality to Rundeck.  Stay tuned for future releases.

One significant update in this release is an update to the AWS SDK version used by the AWS plugins.  They are now on a version which includes `aws-java-sdk-sts`. This allows the default credential provider chain to resolve web identity roles(IAM for service accounts).

## Upgrading

See [Upgrading to Rundeck 3.2](/upgrading/upgrading-to-rundeck-3.2.html).

## Issues

[Milestone 3.2.5](https://github.com/rundeck/rundeck/milestone/139)

* [Fix #5933 wf strategy change saved without changing workflow contents](https://github.com/rundeck/rundeck/pull/5934)
* [Workflow strategy not saved](https://github.com/rundeck/rundeck/issues/5933)
* [Fixes #5928 - Updating ACL doc links in app](https://github.com/rundeck/rundeck/pull/5929)
* [Fix job scheduling transaction errors](https://github.com/rundeck/rundeck/pull/5923)
* [Adds media query to backdrop](https://github.com/rundeck/rundeck/pull/5915)
* [upgrade py-winrm plugin version](https://github.com/rundeck/rundeck/pull/5914)
* [Remove tabulation and line break from the content of text area](https://github.com/rundeck/rundeck/pull/5912)
* [Problem with WebHook Notification URL when the values is \> 100](https://github.com/rundeck/rundeck/issues/5911)
* [Add a directory for addon features](https://github.com/rundeck/rundeck/pull/5908)
* [Update AWS plugins to include STS SDK](https://github.com/rundeck/rundeck/pull/5905)
* [Fix: job actions menu position for long descriptions](https://github.com/rundeck/rundeck/pull/5904)
* [Verirfy list of listeners to avoid an exception thrown before handle result](https://github.com/rundeck/rundeck/pull/5902)
* [Fix job query group/paging](https://github.com/rundeck/rundeck/pull/5897)
* [job query enhancement](https://github.com/rundeck/rundeck/pull/5896)
* [Modal Backdrop overlays content](https://github.com/rundeck/rundeck/issues/5893)
* [Update AWS SDK to 1.11.743](https://github.com/rundeck/rundeck/pull/5882)
* [Fix #5872 broken link to remote option usage docs](https://github.com/rundeck/rundeck/pull/5873)
* [Fix: delete all executions checkbox doesn't work in job delete form from upload page](https://github.com/rundeck/rundeck/pull/5839)
* [Update API archive import error response](https://github.com/rundeck/rundeck/pull/5833)
* [Docker: Set the max filesize in fileUploadService with shared upload size key](https://github.com/rundeck/rundeck/pull/5411)

## Contributors

* Carlos Eduardo (carlosrfranco)
* Greg Schueler (gschueler)
* Jaime Tobar (jtobard)
* Jesse Marple (jessemarple)
* Luis Toledo (ltamaster)
* Greg Zapp (ProTip)
* Stephen Joyner (sjrd218)
* Sylvia van Os (TheLastProject)
* carlos
* ronaveva

## Bug Reporters

* ProTip
* TheLastProject
* carlosrfranco
* gschueler
* jessemarple
* jtobard
* ltamaster
* ronaveva
* sjrd218
