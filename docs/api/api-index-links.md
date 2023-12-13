
[/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/plugins]:/api/index.md#list-scm-plugins
[/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/plugin/\[TYPE\]/input]:/api/index.md#get-scm-plugin-input-fields
[/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/plugin/\[TYPE\]/setup]:/api/index.md#setup-scm-plugin-for-a-project
[/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/plugin/\[TYPE\]/enable]:/api/index.md#enable-scm-plugin-for-a-project
[/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/plugin/\[TYPE\]/disable]:/api/index.md#disable-scm-plugin-for-a-project
[/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/status]:/api/index.md#get-project-scm-status
[/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/config]:/api/index.md#get-project-scm-config
[/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/action/\[ACTION_ID\]]:/api/index.md#perform-project-scm-action
[/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/action/\[ACTION_ID\]/input]:/api/index.md#get-project-scm-action-input-fields

[/api/V/project/\[PROJECT\]/sources]:/api/index.md#list-resource-model-sources-for-a-project
[/api/V/project/\[PROJECT\]/source/\[INDEX\]]:/api/index.md#get-a-resource-model-source-for-a-project
[/api/V/project/\[PROJECT\]/source/\[INDEX\]/resources]:/api/index.md#list-resources-of-a-resource-model-source
[GET /api/V/project/\[PROJECT\]/source/\[INDEX\]/resources]:/api/index.md#list-resources-of-a-resource-model-source
[POST /api/V/project/\[PROJECT\]/source/\[INDEX\]/resources]:/api/index.md#update-resources-of-a-resource-model-source

[/api/V/job/\[ID\]/scm/\[INTEGRATION\]/status]:/api/index.md#get-job-scm-status
[/api/V/job/\[ID\]/scm/\[INTEGRATION\]/action/\[ACTION_ID\]]:/api/index.md#perform-job-scm-action
[/api/V/job/\[ID\]/scm/\[INTEGRATION\]/action/\[ACTION_ID\]/input]:/api/index.md#get-job-scm-action-input-fields


[/api/V/config/refresh]:/api/index.md#config-refresh

[/api/V/execution/\[ID\]]:/api/index.md#execution-info

[/api/V/execution/\[ID\]/abort]:/api/index.md#aborting-executions

[/api/V/execution/\[ID\]/input/files]:/api/index.md#list-input-files-for-an-execution

[/api/V/execution/\[ID\]/output/state]:/api/index.md#execution-output-with-state

[/api/V/execution/\[ID\]/output/step/\[STEPCTX\]]:/api/index.md#execution-output

[/api/V/execution/\[ID\]/output/node/\[NODE\]/step/\[STEPCTX\]]:/api/index.md#execution-output

[/api/V/execution/\[ID\]/output/node/\[NODE\]]:/api/index.md#execution-output

[/api/V/execution/\[ID\]/output]:/api/index.md#execution-output

[/api/V/execution/\[ID\]/state]:/api/index.md#execution-state

[/api/V/executions/delete]:/api/index.md#bulk-delete-executions


[/api/V/executions/metrics]:/api/index.md#execution-query-metrics

[/api/V/feature/]:/api/index.md#get-all-system-feature-status
[/api/V/feature/\[FEATURE\]]:/api/index.md#get-a-system-feature-status

[/api/V/job/\[ID\]]:/api/index.md#getting-a-job-definition
[DELETE /api/V/job/\[ID\]]:/api/index.md#deleting-a-job-definition

[/api/V/job/\[ID\]/executions]:/api/index.md#getting-executions-for-a-job

[/api/V/job/\[ID\]/execution/enable]:/api/index.md#enable-executions-for-a-job

[/api/V/job/\[ID\]/execution/disable]:/api/index.md#disable-executions-for-a-job

[POST /api/V/job/\[ID\]/executions]:/api/index.md#running-a-job
[DELETE /api/V/job/\[ID\]/executions]:/api/index.md#delete-all-executions-for-a-job

[/api/V/job/\[ID\]/retry/\[EXECID\]]:/api/index.md#retry-a-job-based-on-execution
[POST /api/V/job/\[ID\]/retry/\[EXECID\]]:/api/index.md#retry-a-job-based-on-execution

[/api/V/job/\[ID\]/info]:/api/index.md#get-job-metadata
[GET /api/V/job/\[ID\]/info]:/api/index.md#get-job-metadata
[/api/V/job/\[ID\]/input/file]:/api/index.md#upload-a-file-for-a-job-option
[POST /api/V/job/\[ID\]/input/file]:/api/index.md#upload-a-file-for-a-job-option
[/api/V/job/\[ID\]/input/files]:/api/index.md#list-files-uploaded-for-a-job
[/api/V/job/\[ID\]/meta]:/api/index.md#get-job-ui-metadata

[/api/V/job/\[ID\]/forecast]:/api/index.md#get-job-forecast
[GET /api/V/job/\[ID\]/forecast]:/api/index.md#get-job-forecast

[/api/V/job/\[ID\]/schedule/enable]:/api/index.md#enable-scheduling-for-a-job

[/api/V/job/\[ID\]/schedule/disable]:/api/index.md#disable-scheduling-for-a-job

[/api/V/job/\[ID\]/run]:/api/index.md#running-a-job
[/api/V/job/\[ID\]/tags]:/api/index.md#get-job-tags-enterprise
[/api/V/job/\[ID\]/workflow]:/api/index.md#get-job-workflow

[/api/V/jobs/delete]:/api/index.md#bulk-job-delete
[/api/V/jobs/execution/enable]:/api/index.md#bulk-toggle-job-execution
[/api/V/jobs/execution/disable]:/api/index.md#bulk-toggle-job-execution
[/api/V/jobs/file/\[ID\]]:/api/index.md#get-info-about-an-uploaded-file
[/api/V/jobs/schedule/enable]:/api/index.md#bulk-toggle-job-schedules
[/api/V/jobs/schedule/disable]:/api/index.md#bulk-toggle-job-schedules


[/api/V/metrics]:/api/index.md#list-metrics

[/api/V/metrics/healthcheck]:/api/index.md#metrics-healthcheck

[/api/V/metrics/metrics]:/api/index.md#metrics-data

[/api/V/metrics/ping]:/api/index.md#metrics-ping

[/api/V/metrics/threads]:/api/index.md#metrics-threads

[/api/V/project/\[PROJECT\]]:/api/index.md#getting-project-info
[DELETE /api/V/project/\[PROJECT\]]:/api/index.md#project-deletion

[/api/V/project/\[PROJECT\]/acl/*]:/api/index.md#project-acls

[/api/V/project/\[PROJECT\]/config]:/api/index.md#get-project-configuration
[PUT /api/V/project/\[PROJECT\]/config]:/api/index.md#put-project-configuration


[/api/V/project/\[PROJECT\]/config/\[KEY\]]:/api/index.md#get-project-configuration-key
[PUT /api/V/project/\[PROJECT\]/config/\[KEY\]]:/api/index.md#put-project-configuration-key
[DELETE /api/V/project/\[PROJECT\]/config/\[KEY\]]:/api/index.md#delete-project-configuration-key


[/api/V/project/\[PROJECT\]/executions]:/api/index.md#execution-query


[/api/V/project/\[PROJECT\]/executions/metrics]:/api/index.md#execution-query-metrics

[/api/V/project/\[PROJECT\]/executions/running]:/api/index.md#listing-running-executions


[/api/V/project/\[PROJECT\]/export]:/api/index.md#project-archive-export
[/api/V/project/\[PROJECT\]/export/async]:/api/index.md#project-archive-export-async
[/api/V/project/\[PROJECT\]/export/status/\[TOKEN\]]:/api/index.md#project-archive-export-async-status
[/api/V/project/\[PROJECT\]/export/download/\[TOKEN\]]:/api/index.md#project-archive-export-async-download


[/api/V/project/\[PROJECT\]/\[FILE.md\]]:/api/index.md#get-readme-file
[PUT /api/V/project/\[PROJECT\]/\[FILE.md\]]:/api/index.md#put-readme-file
[DELETE /api/V/project/\[PROJECT\]/\[FILE.md\]]:/api/index.md#delete-readme-file

[/api/V/project/\[PROJECT\]/history]:/api/index.md#listing-history

[/api/V/project/\[PROJECT\]/import]:/api/index.md#project-archive-import

[/api/V/project/\[PROJECT\]/jobs]:/api/index.md#listing-jobs

[/api/V/project/\[PROJECT\]/jobs/browse]:/api/index.md#project-job-group-browse

[/api/V/project/\[PROJECT\]/jobs/export]:/api/index.md#exporting-jobs

[/api/V/project/\[PROJECT\]/jobs/import]:/api/index.md#importing-jobs

[/api/V/project/\[PROJECT\]/jobTags/query]:/api/index.md#query-project-job-tags-enterprise

[/api/V/project/\[PROJECT\]/meta]:/api/index.md#get-project-ui-metadata

[/api/V/project/\[PROJECT\]/resources]:/api/index.md#listing-resources

[/api/V/project/\[PROJECT\]/resource/\[NAME\]]:/api/index.md#getting-resource-info

[/api/V/projects]:/api/index.md#listing-projects

[POST /api/V/projects]:/api/index.md#project-creation

[/api/V/project/\[PROJECT\]/run/command]:/api/index.md#running-adhoc-commands

[/api/V/project/\[PROJECT\]/run/script]:/api/index.md#running-adhoc-scripts

[/api/V/project/\[PROJECT\]/run/url]:/api/index.md#running-adhoc-script-urls

[/api/V/project/\[PROJECT\]/scm/toggle]:/api/index.md#toggle-scm-for-a-project

[/api/V/scheduler/takeover]:/api/index.md#takeover-schedule-in-cluster-mode

[/api/V/scheduler/jobs]:/api/index.md#list-scheduled-jobs-for-this-cluster-server

[/api/V/scheduler/server/\[UUID\]/jobs]:/api/index.md#list-scheduled-jobs-for-a-cluster-server

[/api/V/storage/keys/\[PATH\]/\[FILE\]]:/api/index.md#list-keys
[PUT /api/V/storage/keys/\[PATH\]/\[FILE\]]:/api/index.md#upload-keys
[DELETE /api/V/storage/keys/\[PATH\]/\[FILE\]]:/api/index.md#delete-keys


[/api/V/system/acl/*]:/api/index.md#acls
[/api/V/system/info]:/api/index.md#system-info
[/api/V/system/executions/enable]:/api/index.md#set-active-mode
[POST /api/V/system/executions/enable]:/api/index.md#set-active-mode
[/api/V/system/executions/disable]:/api/index.md#set-passive-mode
[POST /api/V/system/executions/disable]:/api/index.md#set-passive-mode
[/api/V/system/executions/status]:/api/index.md#get-current-execution-mode

[/api/V/system/logstorage]:/api/index.md#log-storage-info
[/api/V/system/logstorage/incomplete]:/api/index.md#list-executions-with-incomplete-log-storage
[/api/V/system/logstorage/incomplete/resume]:/api/index.md#resume-incomplete-log-storage
[POST /api/V/system/logstorage/incomplete/resume]:/api/index.md#resume-incomplete-log-storage

[/api/V/tokens]:/api/index.md#list-tokens
[/api/V/tokens/\[USER\]]:/api/index.md#list-tokens
[POST /api/V/tokens/\[USER\]]:/api/index.md#create-a-token
[/api/V/token/\[ID\]]:/api/index.md#get-a-token
[DELETE /api/V/token/\[ID\]]:/api/index.md#delete-a-token


[/api/V/user/list]:/api/index.md#list-users
[/api/V/user/info]:/api/index.md#get-user-profile
[POST /api/V/user/info]:/api/index.md#modify-user-profile
[/api/V/user/info/\[USER\]]:/api/index.md#get-another-user-profile
[POST /api/V/user/info/\[USER\]]:/api/index.md#modify-another-user-profile
[/api/V/user/roles]:/api/index.md#list-roles

[/api/V/project/\[PROJECT\]/webhooks]:/api/index.md#list-project-webhooks
[/api/V/plugin/list]:/api/index.md#list-installed-plugins
[GET /api/V/plugin/list]:/api/index.md#list-installed-plugins

[/api/V/webhook/\[AUTH_TOKEN\]]:/api/index.md#send-webhook-event

[/api/V/project/\[PROJECT\]/webhook/]:/api/index.md#add-a-webhook
[/api/V/project/\[PROJECT\]/webhook/\[ID\]]:/api/index.md#get-a-webhook

[POST /api/V/enterprise/cluster/executions/enable]:/api/index.md#set-active-mode-for-a-cluster-member-enterprise
[POST /api/V/enterprise/cluster/executions/disable]:/api/index.md#set-passive-mode-for-a-cluster-member-enterprise


[/api/V/enterprise/license]:/api/index.md#view-license
[GET /api/V/enterprise/license]:/api/index.md#view-license
[POST /api/V/enterprise/license]:/api/index.md#set-license-key



[/api/V/project/\[PROJECT\]/calendars]:/api/index.md#list-project-calendars
[GET /api/V/project/\[PROJECT\]/calendars]:/api/index.md#list-project-calendars
[POST /api/V/project/\[PROJECT\]/calendars]:/api/index.md#create-update-project-calendar
[DELETE /api/V/project/\[PROJECT\]/calendars/\[ID\]]:/api/index.md#delete-project-calendar

[/api/V/system/calendars]:/api/index.md#list-system-calendars
[GET /api/V/system/calendars]:/api/index.md#list-system-calendars
[POST /api/V/system/calendars]:/api/index.md#create-update-system-calendar
[DELETE /api/V/system/calendars/\[ID\]]:/api/index.md#delete-system-calendar

[GET /api/V/feature/\[featureName\]]:/api/index.md#system-feature

[GET /api/V/runnerManagement/checkPing/\[TOKEN\]]:/api/index.md#check-a-ping-response
[GET /api/V/runnerManagement/download/\[TOKEN\]]:/api/index.md#download-runner-jar
[POST /api/V/runnerManagement/runner/\[ID\]/ping]:/api/index.md#ping-the-runner
[POST /api/V/runnerManagement/runner/\[ID\]/regenerateCreds]:/api/index.md#regenerate-credentials-for-the-runner
[GET /api/V/runnerManagement/runner/\[ID\]/tags]:/api/index.md#list-tags-for-the-runner
[GET /api/V/runnerManagement/runner/\[RUNNERID\]]:/api/index.md#get-runner-information
[POST /api/V/runnerManagement/runner/\[RUNNERID\]]:/api/index.md#update-the-runner
[DELETE /api/V/runnerManagement/runner/\[RUNNERID\]]:/api/index.md#delete-the-specified-runner
[GET /api/V/runnerManagement/runners]:/api/index.md#list-available-runners
[POST /api/V/runnerManagement/runners]:/api/index.md#create-a-new-runner
[GET /api/V/runnerManagement/tags]:/api/index.md#list-all-known-tags
[GET /api/V/runnerManagement/ui]:/api/index.md#get-ui-info-for-runner-management
[GET /api/V/runnerTag/searchTags]:/api/index.md#list-tags-for-the-runner
