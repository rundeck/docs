# PagerDuty Incidents - Kubernetes Diagnostics

## Solution Summary
This solution will walk through an example of enriching PagerDuty incidents by retrieving diagnostic data from a single data-source using a Rundeck Job.
At the end of building this solution, when an incident is created in PagerDuty, users will be presented with a button to retrieve recent logs from Kubernetes pods and view those recent logs on the incident timeline.

The design principles outlined in this solution are applicable to most other use-cases for retrieving diagnostic-data or invoking remediation.

### Configuration

::: tip Solution Prerequisites

For this guide, Rundeck Enterprise must be installed and running.

A PagerDuty account with the Rundeck Actions add-on enabled is also required.
Rundeck Actions are available as an add-on for Business and Digital Operations pricing plans. Please [contact us](https://www.pagerduty.com/contact-us/rundeck-actions-long/) if you would like to upgrade your plan or trial Rundeck Actions. 

This solution is meant to demonstrate design principles, and therefore the steps outlined in this Rundeck Job may not be applicable to your specific environment.

:::

#### Configure Rundeck Job
1. Download the sample Rundeck Job YAML from this [link](https://raw.githubusercontent.com/jsboak/rundeck_sandbox_scm/master/33ef389a-d45c-42d1-af56-3360ff0dade5.yaml?token=GHSAT0AAAAAABQRZMTKT4CBTPXLMNWR2FSIYQENPQA) 
(Right click and select **Save Link As...** and be sure to append `.yaml` to the file name).
2. Upload the sample job to your Rundeck Enterprise instance following the instructions [here](/manual/creating-jobs.html#importing-job-definitions).
3. **In PagerDuty**, generate an API Access Key with (at minimum) _Responder_ permissions. 
This can either be a [General Access API Key](https://support.pagerduty.com/docs/api-access-keys#section-generate-a-general-access-rest-api-key)
or a [User Token API Key](https://support.pagerduty.com/docs/api-access-keys#section-generate-a-user-token-rest-api-key).
4. 

    

#### Configure Rundeck Actions

