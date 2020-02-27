
### Import/Export Calendars

Projet calendars can be exported on the project’s export archive. If Calendar feature is enabled, you will see a checkbox where you can enable the calendar export.

![Project Export](~@assets/img/calendars-project-export.png)

Also, for import project archive, you will see a checkbox where you can define if you want to import the calendars from an archive file.

![Project Export](~@assets/img/calendars-project-import.png)


### Export Calendar on Job Definition

When you export a job that is associated with a calendar, the job definition will add the list of saved calendars.

When you import the job on another rundeck instance or project, if an existing project calendar doesn’t match with the calendar name, a warning will be displayed. Otherwise, the calendar will be updating adding the new job to its job list.

```xml
<joblist>
  <job>
    <calendars>
      <calendar name='New Calendar' />
      <calendar name='CleanUp March' />
    </calendars>
    <defaultTab>nodes</defaultTab>
    <description></description>
    <executionEnabled>true</executionEnabled>
    <id>553c7ea3-918d-4923-a049-4fe387664715</id>
    <loglevel>INFO</loglevel>
    <name>test-scheduled3</name>
    <nodeFilterEditable>false</nodeFilterEditable>
    <plugins />
    <schedule>
      <month month='*' />
      <time hour='12' minute='50' seconds='0' />
      <weekday day='*' />
      <year year='*' />
    </schedule>
    <scheduleEnabled>true</scheduleEnabled>
    <sequence keepgoing='false' strategy='node-first'>
      <command>
        <exec>ls -lrt</exec>
      </command>
    </sequence>
    <uuid>553c7ea3-918d-4923-a049-4fe387664715</uuid>
  </job>
</joblist>
```
