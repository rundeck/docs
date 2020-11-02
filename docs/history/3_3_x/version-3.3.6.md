# Release 3.3.6

Name: <span style="color: rosybrown"><span class="glyphicon glyphicon-knight"></span> "onion ring rosybrown knight"*</span>

[Download this release](https://download.rundeck.com/3.3.6/index.html)

:::danger Remember!!
**For MySQL users**: Starting with Rundeck `3.3.4` the MySQL JDBC driver will no longer be
bundled with the distributions. See the [Upgrade Guide](/upgrading/upgrading-to-rundeck-3.3.4.md)
for instructions to ensure your Rundeck installation can still connect to MySQL after
the upgrading.
:::

## Overview



## Issues

[Milestone 3.3.6](https://github.com/rundeck/rundeck/milestone/155)

* [new sshj plugin](https://github.com/rundeck/rundeck/pull/6594)
* [Report incomplete status in abort response reason](https://github.com/rundeck/rundeck/pull/6591)
* [Issue/1321 Activity lists not showing on Job page when using oracle database](https://github.com/rundeck/rundeck/pull/6590)
* [Update tomcat-jdbc version to 9.0.39](https://github.com/rundeck/rundeck/pull/6589)
* [Add ability to mark a schedule as missed.](https://github.com/rundeck/rundeck/pull/6586)
* [Show date in ISO 8601 format in the GUI #6582](https://github.com/rundeck/rundeck/pull/6583)
* [before/after hooks in scheduler manager, some refactoring](https://github.com/rundeck/rundeck/pull/6579)
* [Fixing GUI to allow select a node clicking at arrow link on matched nodes popup](https://github.com/rundeck/rundeck/pull/6574)
* [Adds an option to run referenced jobs using child's node set](https://github.com/rundeck/rundeck/pull/6573)
* [Request to run referenced Jobs on child nodes ](https://github.com/rundeck/rundeck/issues/6572)
* [performance: Update ACL list GUI pages to have asynch behavior](https://github.com/rundeck/rundeck/pull/6568)
* [Sending an event to cleanup acl caches If cluster mode is active](https://github.com/rundeck/rundeck/pull/6567)
* [Add rundeck.login.localLogin.enabled to config base class.](https://github.com/rundeck/rundeck/pull/6563)
* [fix #6528 exception in log file storage](https://github.com/rundeck/rundeck/pull/6562)
* [Update nowrunning ajax query to support wildcard value](https://github.com/rundeck/rundeck/pull/6556)
* [Remove vendor.js script tag from base](https://github.com/rundeck/rundeck/pull/6554)
* [Change username check in user gsp template](https://github.com/rundeck/rundeck/pull/6532)
* [HibernateOptimisticLockingFailureException with s3-log-plugin and 3.3.3](https://github.com/rundeck/rundeck/issues/6528)
* [Fix the display of Enterprise plugins when listing plugins](https://github.com/rundeck/rundeck/pull/6525)
* [Changing to consider logged user roles for ACL cache](https://github.com/rundeck/rundeck/pull/6506)
* [duplicate job options](https://github.com/rundeck/rundeck/pull/6505)
* [UI Next](https://github.com/rundeck/rundeck/pull/6504)
* [Notifications on its own thread](https://github.com/rundeck/rundeck/pull/6494)
* [Applying "if node set empty" config for workflow strategies other than "Node First"](https://github.com/rundeck/rundeck/pull/6477)
* [update mail plugin to 3.0.0, placeholders for dev mode testing](https://github.com/rundeck/rundeck/pull/6446)

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