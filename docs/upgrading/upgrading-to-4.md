# Rundeck 4.0 Upgrade Notes

::: tip
This document highlights changes for users upgrading _from_ Rundeck 3.4. See other [Upgrading](https://docs.rundeck.com/docs/upgrading/) Documents if you are upgrading from 3.3 or earlier.
:::

## Result Data GA

In Rundeck 3.4.2 we released an incubating feature for Result Data.  With Rundeck 4.0 the plugins were updated with new provider names to better represent the feature name.  Any job definitions that were using the incubating version will need to update their job definitions with the new provider name.

When editing a job with previously configured incubating Result Data template or export Rundeck 4.0 will present an error message. If this is encountered it’s recommended to Cancel editing the job and follow one of the following steps.

### Ways to Update the Jobs

* Export the Job Definition and search for the string `job-data` and replace it with `result-data` and re-import the job.
* Export the Job Definition and copy the Result Data template or setting from the export and paste it into the  job definition in the UI and save the job.

## JSON Event Data Errors

After an upgrade there may be errors in logs during boot.  These are not an issue, but do create unnecessary noise in the logs.** **To clear up these errors, move the `rundeckpro-json-event-format-plugin-3.4.x.jar` from the `libext` directory to another directory. Restart Rundeck and confirm everything is functioning correctly. This plugin is no longer needed, but during an upgrade, previous plugins are not removed to maintain any custom plugins that may be installed.
