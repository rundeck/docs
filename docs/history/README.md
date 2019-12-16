# December 2019 Update

[3.2.0 Release Notes](./3_2_x/version-3.2.0.md)

## Upgrading

See [Upgrading to Rundeck 3.2](/upgrading/upgrading-to-rundeck-3.2.md).

## Enhancements

### Webhooks 
Much anticipated and maximally useful.. Webhooks have landed in Rundeck! This new incubating feature
empowers Rundeck to receive JSON events and direct them to jobs.
Check out the [Webhook Docs](/manual/12-webhooks.md) for
instructions on enabling the feature and full details.

![Destroy your FOMO, never miss an important event!](https://docs.rundeck.com/assets/releases/3_1_1/webhook_promo_pd_sm.gif "Destroy your FOMO, never miss an important event!")


### Job Options
Job options display has been enhanced in the activities list and execution view. This should
provide better visual separation between the option names and option values.

![Contrasty!](https://docs.rundeck.com/assets/releases/3_1_1/job_opts.png "Contrasty!")

### Development

* Allow notification to use workflow exported variables [#5139](https://github.com/rundeck/rundeck/pull/5139)
* API to list installed plugins [#5259](https://github.com/rundeck/rundeck/pull/5259)
* Externalize Vue in webpack builds [#5217](https://github.com/rundeck/rundeck/pull/5217)

### Docker

* Added ldap nestedGroups setting to remco template [#5100](https://github.com/rundeck/rundeck/pull/5100)

### Misc

* 🌈 Upgrade font awesome to 5.10.2 [#5269](https://github.com/rundeck/rundeck/pull/5269)
* Execution log parsing has been speed up to improve log loading speed [#5253](https://github.com/rundeck/rundeck/pull/5253)
* New `scm_import` and `scm_export` ACLs for job writers [#5176](https://github.com/rundeck/rundeck/pull/5176)

## Bug Fixes

* Fix exception on average duration exceeded notification [#5153](https://github.com/rundeck/rundeck/pull/5153)
* Plugin uninstaller can now uninstall manually installed plugins [#5258](https://github.com/rundeck/rundeck/pull/5258)
* Fix error when editing jobs option with enforced values [#5146](https://github.com/rundeck/rundeck/pull/5146)
* Display correct time on job activity page [#5125](https://github.com/rundeck/rundeck/issues/5125)
