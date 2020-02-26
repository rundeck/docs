# Calendars

This feature allows Rundeck to use blackout and allowed calendars for scheduled jobs.

`Blackout calendars` defines a period of time where the scheduled jobs won’t run, while `Allowed Calendars` defines the range of days where the scheduled jobs are allowed to run.

Calendars can be defined at system level (`System Calendars`) or project level (`Project Calendars`). At system level, the calendars will be applied for all jobs on Rundeck, or to the selected projects. Also, calendars can be created at project level, where will be applied for all jobs on the project or for selected jobs.

### Enable Calendars feature

:::tip
Calendars are available from  `3.2.3` version.
:::

To enable the calendars, add the following settings to rundeck-config.properties

```properties
rundeckpro.feature.incubator.calendar=true
```
