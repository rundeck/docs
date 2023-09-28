# System Calendars

Go to the system menu and select the option `Calendars`

![System Menu](~@assets/img/calendars-system-menu.png)


You will see a list of existing calendars and you will have the option to add calendars.

![Calendars System Home](~@assets/img/calendars-system-home.png)



### Create Calendar

Click on `+ Add Calendar` button and you will see form to add a new calendar

![Create Calendar](~@assets/img/calendars-create-form.png)

* **Name**: Name  of the calendar
* **Description**: (Optional) Description of the calendar
* **Enabled**: define if the calendar is enabled
* **Mode**: Blackout, Allowed
* **Type**: Date, Daily, Monthly, Range

If the required fields are not set, the form will display the errors.



#### Types

There are different types of calendars to define how to set the target days/hours that the calendar will cover.

**Calendar Dates**
:   Pick up a list of days where the calendar will be used, eg: 12/25/2020, 12/31/2020

	**Repeat dates yearly**: if this box is checked, the calendar will be triggered every year on the selected dates.  If the box is *not* checked, the selected dates will apply only to the selected year.

	![Calendar Dates](~@assets/img/calendars-date-type.png)


**Times of Day**
:   Defines the times of day when the calendar will be applied, eg: `08:00 - 17:00`

	![Times of Day](~@assets/img/calendars-date-daily.png)


**Days of the Month**
:   List of days of the month where the calendar will be applied, eg: 30,31

	![Days of the Month](~@assets/img/calendars-date-monthly.png)


**Date Range**
:   Range of days where the calendar will be applied: `24/11/2020 -  26/11/2020`

	**Repeat dates yearly**: if this box is checked, the calendar will be triggered every year on the selected dates.  If the box is *not* checked, the selected dates will apply only to the selected year.

	![Date Range](~@assets/img/calendars-date-range.png)

**Days of the Week**
:   Choose multiple days of the week

	![Days of the Week](~@assets/img/calendars-days-of-the-week.png)

#### Related projects

In the **Projects** section you can define if the calendar will be used for all Projects or specific Project. By default, the calendar will not be assigned to any projects.

Select a project from the list and click the "Add Project" button.

![Project Selector](~@assets/img/calendars-system-project-selector.png)

Or, check the "Apply this Calendar to all Projects" checkbox, and it will be assigned to all Projects.

![Projects Section](~@assets/img/calendars-system-selector.png)

Finally, click "Save", and the Calendar will be created and shown in the list.

![Calendar Saved](~@assets/img/calendars-create-form-saved.png)

Now, on the jobs page inside a project, new icons will be displayed for the scheduled jobs that has been modified for a calendar.

![Job List](~@assets/img/calendars-job-list.png)

For each job you can review the list of calendars that are related with it.

![Job Detail](~@assets/img/calendars-job-detail.png)
