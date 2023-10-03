---

title: "Use ROI Metric Data"
date: 2023-01-07
image: /images/chevron-logo-red-on-white.png
feed:
  enable: true
  description: "Automation saves time and money with every job execution. Tracking that over time can help provide insight to the value of your automation efforts.  Use the ROI Metrics plugin to store value of each job run.   The ROI Metrics integration tracks user-defined value of each job execution and stores key value pairs against jobs to help you understand the ROI per job execution."

---

# Use ROI Metric Data

::: incubating
:::

**ROI Metrics Data** stores arbitrary key value pairs against your job to help understand your ROI per job execution. The metrics will be stored against the execution of the job, and accessible via API for further analysis.  This article will walk through a setup scenario and provide some helpful example scripts to gather data from the API.

## Configuring the Metrics

### Example Scenario:

Customer X has decided to track how much time is saved with their newly implemented Automation job (uniquely titled `ROI Job`).  They know from historical ticket-data that doing the same work manually - prior to writing this job - took around 75 minutes across all teams, start to finish.  The job now runs in just seconds.  To configure the job follow the steps or download the job definition.

:::: tabs
::: tab Steps to Create


1. Create a new Job.
1. Title job `ROI Job`.
1. On the Workflow Tab add a single `Command` step with the command `sleep 5`.  (Assumes this will be running on Linux host)
1. Choose the _Execution Plugins_ tab.
1. Check the box for **ROI Metrics Data**.<br><br>
    ![ROI Metrics Plugin](/assets/img/roi-metrics-data.png)
1. Click **Add Custom Field**.<br><br>
    ![Add Custom Field](/assets/img/roi-metrics-customfield.png)
1. Enter a value for:
    - ***Field Label***: `Hours Saved`
    - ***Field Key***: `hours`
    - ***Description***: `FTE hours saved each time this job is run.`
1. Click **Add**.
1. Enter a value of `1.25` for the metric in the **Hours Saved** field.
1. Save the job.
1. Run the job and look for the ROI Metrics Data tab.  Confirm that the data is populated.
1. Run the job a few more times so we have multiple executions.

:::
::: tab Download Job Definition

Copy the Job Definition below and paste into a plain text file.  Then import to your Process Automation server.  (Version 4.7.0 minimum)

```
- defaultTab: nodes
  description: This is an example ROI Job as detailed in the Learning Article on our
    [docs.rundeck.com](https://docs.rundeck.com) site.
  executionEnabled: true
  id: 9616fe19-a8a7-4f44-b785-822c81dddeed
  loglevel: INFO
  name: ROI Job
  nodeFilterEditable: false
  plugins:
    ExecutionLifecycle:
      roi-metrics:
        userRoiData: '[{"key":"hours","label":"Hours Saved","value":"1.25","desc":"FTE
          hours saved each time this job is run. (Field key: hours)"}]'
  scheduleEnabled: true
  schedules: []
  sequence:
    commands:
    - exec: sleep 5
    - exec: echo "Saving hours every run"
    keepgoing: false
    strategy: node-first
  uuid: 9616fe19-a8a7-4f44-b785-822c81dddeed

```

:::
::::

## Gathering Data

>This section assumes familiarity with fundamental Rundeck operations like Creating User API Tokens, editing/importing jobs, etc.

:::: tabs
::: tab Setup Steps

- Configure a [User API Key](/manual/10-user.md#user-api-tokens) with the necessary access to gather metrics from the job/project where your data is located.
- Save the User API Key in the Key Storage by going to **Project Settings** > **Key Storage** and adding the key there.
- Copy the job definition (next tab) and import to your project.
- Edit the Job Definition.  Configure the `api-key` Option Input with the API Key entry you created earlier.
- Feel free to update any defaults on the other job options for `rundeck-server`, `project-name`, `job-tags` as needed.

Run the job to gather data and see a list of JSON output for any jobs with ROI data.

:::
::: tab Gather Metrics Job Definition

Copy the Job Definition below and paste into a plain text file.  Then import to your Process Automation server.  (Version 4.7.0 minimum)

>Note: This is only an example job to show the different calls to make to get a list of ROI data.  This script is not officially supported.

```
- defaultTab: output
  description: Script used to gather ROI metrics from job executions.  There is a
    variety of input options need to execute this successfully.  Please see the [documentation](https://docs.rundeck.com)
    for more details. (search for Using ROI Metrics Data)
  executionEnabled: true
  id: 784c58aa-ff9e-4e51-93fe-c68185342f5b
  loglevel: INFO
  name: Get ROI Data
  nodeFilterEditable: false
  options:
  - description: |-
      Provide the URL of the Process Automation server.  Leave off the trailing slash, but include any port number needed.

      e.g. `http://my.rundeck.local.dom:4440`
    label: Rundeck URL
    name: rundeck-server
    required: true
    value: http://localhost:4440
  - description: Must Edit Options in Job Definition to pick your Rundeck API Key
      entry from Key Storage
    label: API Key
    name: api-key
    required: true
    secure: true
    storagePath: keys/project/Sandbox/rundeck-api-key
    valueExposed: true
  - description: |-
      Provide a string to filter jobs out by tag to improve query performance.

      Leave blank for all jobs.  Example String "tag1,tag2".  We find it easy to add the `roi` tag to jobs that we have turned on ROI tracking for.
    label: Job Tags List
    name: job-tags
  - label: Project Name
    name: project-name
    required: true
    value: sandbox
  - description: |-
      Use link below to decide what values to use.

      Note: this script doesn't take into account paging yet. Only returns a max of 100 entries as full JSON.

      [https://docs.rundeck.com/docs/api/rundeck-api.html#execution-query](/api/rundeck-api.md#execution-query)
    label: Time Range for Executions
    name: time-range
    required: true
    value: 30n
    values:
    - 30n
    - 120n
    - 2d
    - 1w
    - 30d
    valuesListDelimiter: ','
  - enforced: true
    label: Debug Output on Script?
    name: script-debug
    required: true
    value: 'false'
    values:
    - 'true'
    - 'false'
    valuesListDelimiter: ','
  - description: 'Unlikely this needs to change, but good pratice meant we made it
      a variable.'
    hidden: true
    label: API Version
    name: api_version
    required: true
    value: '41'
  plugins:
    ExecutionLifecycle: {}
  scheduleEnabled: true
  schedules: []
  sequence:
    commands:
    - script: "#!/bin/bash\n\nrundeckhost=@option.rundeck-server@\napi_key=@option.api-key@\n\
        api_version=@option.api_version@\nproject=@option.project-name@\ntags=@option.job-tags@\
        \ #leave blank to return all jobs\ndebug=@option.script-debug@\nexecution_history=@option.time-range@\n\
        jobIDList=\"\"\n\nlist_jobs_by_tag () {\n  jobs_output=`curl -sS --request\
        \ GET $rundeckhost'/api/'$api_version'/project/'$project'/jobs?tags='$tags\
        \ \\\n  --header 'X-Rundeck-Auth-Token: '$api_key \\\n  --header 'Content-Type:\
        \ application/json' \\\n  --header 'Accept: application/json'`\n\n  if \"\
        $debug\" == \"true\"; then \n   echo \"$jobs_output\"; \n  fi\n  while read\
        \ i; do\n    jobIDList=`echo \"$jobIDList&jobIdListFilter=$i\"`\n  done <<<\
        \ $(echo $jobs_output | jq -r -c '.[] | .id')\n  if \"$debug\" == \"true\"\
        ; then \n   #echo $jobIDList\n   echo \"Ending Loop\"\n  fi\n}\n\n\nlist_executions_from_jobs\
        \ () {\n    executions_list=`curl -sS --request GET $rundeckhost'/api/'$api_version'/project/'$project'/executions?max=1000&statusFilter=succeeded&recentFilter='$execution_history'&'$jobIDList\
        \ \\\n     --header 'X-Rundeck-Auth-Token: '$api_key \\\n     --header 'Content-Type:\
        \ application/json' \\\n     --header 'Accept: application/json'`\n    \n\
        \    if \"$debug\" == \"true\"; then\n      echo $rundeckhost'/api/'$api_version'/project/'$project'/executions?recentFilter='$execution_history$jobIDList\n\
        \      echo \"$executions_list\"\n    fi\n    while read j; do\n      #echo\
        \ \"$j\"\n      get_roi_data $j\n    done <<< $(echo $executions_list | jq\
        \ -r -c '.executions[].id ')\n}\n\nget_roi_data () {\n    execution_id=$1\n\
        \    roi_data=`curl -sS --request GET $rundeckhost'/api/'$api_version'/execution/'$execution_id'/roimetrics/data'\
        \ \\\n     --header 'X-Rundeck-Auth-Token: '$api_key \\\n     --header 'Content-Type:\
        \ application/json' \\\n     --header 'Accept: application/json'`\n     \n\
        \    has_roi_data=`echo \"$roi_data\" | jq -c 'if .job_execution_id then true\
        \ else false end'`\n    if \"$debug\" == \"true\"; then\n      echo \"$execution_id\
        \ ROI Data: $has_roi_data\"\n    fi\n    if [[ \"$has_roi_data\" == \"true\"\
        \ ]] ; then\n      echo \"$roi_data\" ### Can uncomment this part to return\
        \ a specific JSON key ### | jq -r -c '.hours'\n    fi\n}\n\nif \"$debug\"\
        \ == \"true\"; then \necho \"Starting Script\"\necho @globals.dest-server@\n\
        fi\n\nlist_jobs_by_tag\nlist_executions_from_jobs\n\nif \"$debug\" == \"true\"\
        ; then \necho \"Ending Script\"\nfi\n\n\n\n"
    keepgoing: false
    strategy: node-first
  uuid: 784c58aa-ff9e-4e51-93fe-c68185342f5b


```

:::
::::
