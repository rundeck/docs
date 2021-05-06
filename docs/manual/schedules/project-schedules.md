# Project Schedules (Enterprise)

::: enterprise
:::

Project Schedules allow you to define Schedules independently of Jobs.  Schedules can apply to any Jobs in the Project. Schedule definitions can be exported into, and imported from, Project Archives.
:::tip
Currently only project admins will be able to access the Schedules module.  In a future release there will be more granular ACL based access assigned.
:::

## Usage

In the Project Sidebar navigation there is now a link called **Schedules**:


![Project Schedules Sidebar](~@assets/img/project-schedules-sidebar.png)

You can click **New Schedule** to create a new Schedule:

![New Schedule](~@assets/img/project-schedules-create-form.png)

Enter a **Name**, and optional **Description**.

Under **Schedule** you can choose *Simple* or *Crontab*, exactly like Job Schedules.

![Schedule Crontab](~@assets/img/project-schedules-create-crontab.png)

:::tip
For crontab format, see [this tutorial][crontab]

There is also a helpful crontab expression builder [here ][cronbuilder]
:::

Optionally enter a **Time Zone**.

Click **Save**.

The Schedule will appear in the list:


![Schedule List](~@assets/img/project-schedules-list.png)

## Schedule Actions

The Actions menu for a Schedule will show these options:

![Action Menu](~@assets/img/project-schedules-action-menu.png)

### Edit Schedule

Select **Edit Schedule** to modify the definition.

### Assign to Job

Select **Assign To Job** to choose jobs that the Schedule applies to.

![Assign Jobs to Schedule](~@assets/img/project-schedules-assign-jobs.png)

Assigned jobs will be shown on the left, and available jobs will be shown on the right.  You can search for jobs using the search fields to search by name or group.

Click on a Job to assign it to the Schedule.  

Click **Unassign** to unassign an assigned Job.

Click **Set Job Options...** on an assigned Job to enter Option values to run the Job.

![Set Job Options](~@assets/img/project-schedules-set-job-options.png)

You can enter options in the form `-optname value` separated by spaces. Click **Save** to save the Job option values.

These values will be used when the schedule is triggered, instead of the default option values set in the Job Options.

Click **Save** to save the Job assignments.

The Schedule List will indicate how many Jobs are assigned to the Schedule.  You can click on the Schedule to see the list of assigned Jobs.

![Assigned Job List](~@assets/img/project-schedules-assigned-job-list.png)

### Download Schedule

Select **Download Schedule** to download a YAML formatted file containing the Schedule Definition.

See [Schedule Definition](#schedule-definition).

### Delete Schedule

Select **Delete Schedule** to delete the Schedule.

## Upload Schedule

Click **Upload Schedule** to upload a YAML schedule definition.

![Upload Schedule](~@assets/img/project-schedules-upload-schedule.png)

## Bulk Delete

If you want to delete multiple schedules, you can click the **Bulk Delete** button above the Schedule List.

Select one or more schedules and choose **Delete Selected Schedules**.

![Bulk Delete](~@assets/img/project-schedules-bulk-delete.png)

## Schedule Definition

Schedules can be defined in YAML format as shown below. Multiple schedules can be included in a single file.


```yaml
- description: every day at noon
  id: 166
  name: Noon refresh
  project: schedules-demo
  schedule:
    dayOfWeek: MON,TUE,WED,THU,FRI
    hour: '12'
    minute: '00'
    month: JAN,APR
  timeZone: ''
  type: SIMPLE
- crontabString: 0 */5 * ? * * *
  description: every 5 minutes
  id: 167
  name: Test
  project: schedules-demo
  timeZone: ''
  type: CRON
```

`name`

:   Schedule name (required)

`description`

:   Description (optional)

`timeZone`

:   Time Zone string (optional). Either an abbreviation such as "PST", a full name such as "America/Los_Angeles", or a custom ID such as "GMT-8:00".

`type`

:   either `CRON` or `SIMPLE`.


`crontabString`

:   Required if the `type` is `CRON`, specifies the [crontab format][crontab]


`schedule`

:   Required if the `type` is `SIMPLE`, specifying `hour`,`minute`,`month`, and `dayOfWeek`:

	`hour`
	:   Hour of day

	`minute`
	:   Minutes in hour

	`dayOfWeek`

	:   Either `*` for all days, or comma separated list of three-letter day abbreviations. `SUN,MON,TUE,WED,THU,FRI,SAT`

	`month`

	:   Either `*` for all months, or comma separated list of three-letter month abbreviations. `JAN,FEB,MAR,APR,MAY,JUN,JUL,AUG,SEP,OCT,NOV,DEC`


  ## Feature Flag

  To disabled the Project Schedules feature, add the following settings to rundeck-config.properties

  ```properties
  rundeck.feature.projectSchedules.enabled=false
  ```

[crontab]: http://www.quartz-scheduler.org/documentation/quartz-2.2.2/tutorials/tutorial-lesson-06.html
[cronbuilder]: https://www.freeformatter.com/cron-expression-generator-quartz.html
