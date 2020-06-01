# Release 3.2.7

Name: <span style="color: deepskyblue"><span class="glyphicon glyphicon-plane"></span> "nacho deepskyblue plane"</span>

## Overview

Our 3.2.7 release contains some great fixes and enhancements and a special preview of things to come! Read below about everything included.

### Enhanced Event Viewer - BETA

As we get closer to a larger release we are looking for your help and feedback. Some customers brought to our attention that the legacy Event Log Viewer was in need of some enhancements. Our Development team heard them and has answered the call. Enabled by default in this release you will find a Beta version of the new and improved Event Viewer. Here’s a few tid-bits on the benefits:
  - Increases output log loading speed **1000%** over 20k lines.
  - Linear loading performance up to **100k lines**.
  - The log viewer no longer ties up your browser while loading large files.
  - Ability to **share a link** directly to a log output line number.
  - Light and Dark Modes.
  - Persists setting preferences in browser for use between loads.

![A whale of a log!](https://docs.rundeck.com/assets/releases/3_2_7/viewer_moby_load.gif "A whale of a log!")

This is just a beta release. We have tried to catch as many bugs as we can, but if there is something please provide feedback by sending an email to product@rundeck.com. The fully vetted version will be out mid-summer.

::: warning
Note: If you do not want the Beta running in your environment you can add the following settings:
:::

For **war/rpm/deb** add to `rundeck-config.properties`:

`rundeck.feature.betaExecOutputViewer.enabled=false`

For **Docker** set the following environment variables:

`RUNDECK_FEATURE_BETAVIEWER_NAME=betaExecOutputViewer`

`RUNDECK_FEATURE_BETAVIEWER_ENABLED=false`

### Tune Up

Along with the Event Viewer we have done quite the tune up under the hood. Many of the core packages that Rundeck is built on have been updated to more recent versions. With this comes enhanced security and benefits. Spring Security libraries, Docker base components, and Vue packages have all gotten some much needed TLC. Check out the full list below.

### Critical Bug Fix

This release fixes a bug in versions 3.2.4 - 3.2.6 that could have an impact on your jobs. Below are the specific details and how we’ve addressed it in 3.2.7.

If a Project containing Jobs using the Ruleset Workflow Strategy Plugin is imported the ruleset code will be corrupted during the import process and the job will (attempt) to run without applying the ruleset.
  - The bug does not affect Rulesets written directly in the GUI, only imported jobs with Rulesets.
  - Exports within the affected versions function properly, but subsequent imports will corrupt the ruleset code.
  - The Ruleset Workflow Strategy Plugin is only available in the Enterprise version of Rundeck. OpenSource is not affected by this bug.

Good news, your rulesets aren’t lost forever.
  - After upgrading to 3.2.7 any currently corrupted rulesets that exist in the database will be fixed upon start of Rundeck.
  - This version is fixed such that the import process no longer corrupts rulesets.
  - In the rare case that a corrupted ruleset was exported attempting to reimport to 3.2.7 will fail. If you have exported projects/jobs from 3.2.4-6 it is recommended that you overwrite those exports after upgrading to 3.2.7.

## Issues

[Milestone 3.2.7](https://github.com/rundeck/rundeck/milestone/141)

* [Fix execution stats lockmode](https://github.com/rundeck/rundeck/pull/6054)
* [Docker - Fix default value for config storage converter path](https://github.com/rundeck/rundeck/pull/6039)
* [Docker - Refresh base image and update remco](https://github.com/rundeck/rundeck/pull/6038)
* [Update grails spring security plugin to 3.3.1](https://github.com/rundeck/rundeck/pull/6027)
* [Add the ability to refresh the user summary page using the event bus](https://github.com/rundeck/rundeck/pull/6024)
* [Prevent attempt to schedule jobs on a quartz scheduler that is shutdown](https://github.com/rundeck/rundeck/pull/6013)
* [Update user summary menu item to use a spring bean.](https://github.com/rundeck/rundeck/pull/6012)
* [Fixing the job import process where the ruleset strategy was not saved correctly](https://github.com/rundeck/rundeck/pull/6010)
* [Fix imported jobs referenced by UUID instead of name](https://github.com/rundeck/rundeck/pull/6007)
* [Handle tags with null values on parser of node resource files in json format](https://github.com/rundeck/rundeck/pull/6006)
* [Fix asUser on retry job](https://github.com/rundeck/rundeck/pull/6002)
* [Jobs migrated from Rundeck2 to Rundeck 3 have "search by UUID" option set by default.](https://github.com/rundeck/rundeck/issues/6001)
* [Clean up duplicate LogFileStorageRequest entries at startup](https://github.com/rundeck/rundeck/pull/5995)
* [Project storage SPI](https://github.com/rundeck/rundeck/pull/5994)
* [Docker - Refresh image](https://github.com/rundeck/rundeck/issues/5993)
* [Fix #5938 error when logging in with empty credentials.](https://github.com/rundeck/rundeck/pull/5990)
* [resource model Format: resourcejson does not load big files](https://github.com/rundeck/rundeck/issues/5988)
* [Fix #5979 update ui-trellis to support markdown extended property descriptions](https://github.com/rundeck/rundeck/pull/5983)
* [Add an invalid key pattern to avoid characters like space on log filter key](https://github.com/rundeck/rundeck/pull/5981)
* [Remove legacy node config UI](https://github.com/rundeck/rundeck/pull/5980)
* [Docker - Make /etc/passwd group writable](https://github.com/rundeck/rundeck/pull/5944)
* [Rd authorization libs](https://github.com/rundeck/rundeck/pull/5919)
* [Upgrade vue-scrollto from 2.15.0 to 2.17.1](https://github.com/rundeck/rundeck/pull/5825)
* [Upgrade vue-fuse from 2.0.2 to 2.2.0](https://github.com/rundeck/rundeck/pull/5824)
* [Upgrade vue2-filters from 0.3.0 to 0.9.1](https://github.com/rundeck/rundeck/pull/5823)
* [Bugfix: close logread in tailExecutionOutput](https://github.com/rundeck/rundeck/pull/5695)
* [Retry Execution API: api/33/\[JOBID\]/retry/\[EXECID\] requires runAs permission](https://github.com/rundeck/rundeck/issues/5670)
* [Docker - Set uid in passwd for OpenShift support](https://github.com/rundeck/rundeck/pull/5440)
* [Beta Execution output viewer](https://github.com/rundeck/rundeck/pull/5394)

## Contributors

* Christoph Hille (hille721)
* David Terrell (dbt)
* Greg Schueler (gschueler)
* Jaime (jtobard)
* Luis Toledo (ltamaster)
* Greg Zapp (ProTip)
* Stephen Joyner (sjrd218)
* carlos

## Bug Reporters

* ProTip
* carlosrfranco
* cwaltherf
* dbt
* elioe
* gschueler
* hille721
* jairov4
* jtobard
* ltamaster
* sjrd218
