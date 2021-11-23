# Release 3.3.6

Name: <span style="color: rosybrown"><span class="glyphicon glyphicon-knight"></span> "onion ring rosybrown knight"</span>

- [Download Rundeck](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)

## Overview
### Job Scheduling Improvements
Scheduled business tasks are essential to internal processes that keep the business running (Financial operations, inventory operations, fulfillment requests, etc.) Scheduled operations tasks are essential to keeping infrastructure running (rotating logs, cleaning up temp files, restarting known faulty services, validating configuration and security settings/conditions, etc.). Unknowingly missing either is a business continuity issue. Also unknowingly missing a run and then running again can cause bigger problems (data corruption, bad configuration, runaway processes, etc)

In this release we have included an early access version of our Missed Schedules feature as part of our Enterprise Scheduling package. Scheduled job executions that are not started within a configurable tolerance window will be marked as "Missed".  Use Job Notifications to then trigger an email or integration action to follow-up.  More details on configuration can be [found here.](/manual/schedules/missedjobfires.md).

The Remote Execution Policy feature was originally meant for "run now" job executions. It was later enabled for Jobs at scheduling time. However this only changes the schedule ownership to a different cluster member *at scheduling time*.  With the introduction of Enhanced Scheduling that policy no longer fit the bill.  We have updated the Remote Execution Policy to evaluate load at the *time of execution* and selects the appropriate cluster member.

### Enterprise Plugins
#### PagerDuty
More PagerDuty Plugin Updates!  The Enterprise plugin suite now includes the following:
- [Get Incident Information](/manual/workflow-steps/pagerduty.html#pagerduty-get-incident) (Job Workflow Step)
- [Update Escalation](/manual/workflow-steps/pagerduty.html#pagerduty-update-escalation-policy) (Job Workflow Step)
- [Add Additional Responders](/manual/workflow-steps/pagerduty.html#pagerduty-add-additional-responders) (Job Workflow Step)
- [PagerDuty Generic V3 Webhook Processor](/manual/webhooks/pagerduty-run-job.html#getting-started) (Webhook Plugin)

[Click Here to see a full list of the Enterprise version PagerDuty Plugin features.](https://resources.rundeck.com/plugins/pagerduty-enterprise-plugins/)

#### Sensu
We have also worked with **[Sensu](https://www.sensu.io/)** on a new suite of plugins.  Here is what's included:
- [Sensu Entity Node Source](/manual/projects/resource-model-sources/sensu.md)
- [Sensu Entity Health Check Plugin](/manual/healthcheckplugins/sensu.md)
- [Get Check Info](/manual/node-steps/sensu.html#sensu-get-check-info) (Node Step)
- [Create/Remove Silence for an Entity](/manual/node-steps/sensu.html#sensu-create-silence-entry) (Node Steps)
- [Send Event](/manual/node-steps/sensu.html#sensu-event-create) (Node Step)
- [Run Ad Hoc Check](/manual/node-steps/sensu.html#sensu-run-ad-hoc-check) (Node Step)
- [Create a Check](/manual/workflow-steps/sensu.html#sensu-check-create) (Workflow Step)
- [Create/Delete a Silence entry](/manual/workflow-steps/sensu.html#sensu-create-silence-entry) (Workflow Step)
- [Send Event as Notification](/manual/notifications/sensu.md) (Notification Plugin)

### Additional Improvements

[Enterprise System Report](/manual/system-report.md) continues to improve during **Beta** testing.  This update focused the user interface and some significant performance updates.

There is a new option to select SSHJ as a Node Executor and File Copier. SSHJ supports newer and more secure cryptography algorithms.

:::danger Remember!!
**For MySQL users**: Starting with Rundeck `3.3.4` the MySQL JDBC driver is no longer be
bundled with the distributions. See the [Upgrade Guide](/upgrading/upgrading-to-rundeck-3.3.4.md)
for instructions to ensure your Rundeck installation can still connect to MySQL after upgrading.
:::

## Issues

* [New SSHJ plugin](https://github.com/rundeck/rundeck/pull/6594)
* [Duplicate job options - v1](https://github.com/rundeck/rundeck/pull/6505)
* [Report incomplete status in abort response reason](https://github.com/rundeck/rundeck/pull/6591)
* [Issue/1321 Activity lists not showing on Job page when using oracle database](https://github.com/rundeck/rundeck/pull/6590)
* [Update tomcat-jdbc version to 9.0.39 to address security concerns](https://github.com/rundeck/rundeck/pull/6589)
* [Add ability to mark a schedule as missed.](https://github.com/rundeck/rundeck/pull/6586)
* [Show date in ISO 8601 format in the GUI #6582](https://github.com/rundeck/rundeck/pull/6583)
* [Before/after hooks in scheduler manager, some refactoring](https://github.com/rundeck/rundeck/pull/6579)
* [Fixing GUI to allow select a node clicking at arrow link on matched nodes popup](https://github.com/rundeck/rundeck/pull/6574)
* [Adds an option to run referenced jobs using child's node set](https://github.com/rundeck/rundeck/pull/6573)
* [Request to run referenced Jobs on child nodes ](https://github.com/rundeck/rundeck/issues/6572)
* [Performance: Update ACL list GUI pages to have asynch behavior](https://github.com/rundeck/rundeck/pull/6568)
* [Sending an event to cleanup acl caches If cluster mode is active](https://github.com/rundeck/rundeck/pull/6567)
* [Add rundeck.login.localLogin.enabled to config base class.](https://github.com/rundeck/rundeck/pull/6563)
* [fix #6528 exception in log file storage](https://github.com/rundeck/rundeck/pull/6562)
* [Update nowrunning ajax query to support wildcard value](https://github.com/rundeck/rundeck/pull/6556)
* [Remove vendor.js script tag from base](https://github.com/rundeck/rundeck/pull/6554)
* [Change username check in user gsp template](https://github.com/rundeck/rundeck/pull/6532)
* [HibernateOptimisticLockingFailureException with s3-log-plugin and 3.3.3](https://github.com/rundeck/rundeck/issues/6528)
* [Fix the display of Enterprise plugins when listing plugins](https://github.com/rundeck/rundeck/pull/6525)
* [Changing to consider logged user roles for ACL cache](https://github.com/rundeck/rundeck/pull/6506)
* [Notifications on its own thread](https://github.com/rundeck/rundeck/pull/6494)
* [Applying "if node set empty" config for workflow strategies other than "Node First"](https://github.com/rundeck/rundeck/pull/6477)
* [Update mail plugin to 3.0.0, placeholders for dev mode testing](https://github.com/rundeck/rundeck/pull/6446)

## Contributors

* Carlos Eduardo (carlosrfranco)
* Greg Schueler (gschueler)
* Jaime Tobar (jtobard)
* Nicole Valenzuela (nvalenzuela20)
* Greg Zapp (ProTip)
* Rodrigo Navarro (ronaveva)
* Stephen Joyner (sjrd218)
* carlos
* imad
* ltamaster

## Bug Reporters

* ProTip
* carlosrfranco
* christi3k
* gschueler
* imad6639
* jtobard
* ltamaster
* nvalenzuela20
* ronaveva
* sjrd218
