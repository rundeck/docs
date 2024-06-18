# RSS Feed Plugin (Enterprise)
::: enterprise
:::

This new plugin allows users to query and parse RSS feeds for events from SaaS and public-cloud providers.  
When these providers have any service degradation, updates are posted to their status-page RSS feeds.

This plugin helps surface these events for customers of the SaaS and Cloud providers - thereby answering the questions of whether an incident is due to an internal issue or a third party.

![RSS Feed Events](/assets/img/rss-feed-output.png)<br>

## Configuration

1. In the **Workflow** tab of a job configuration, click on **+ Add a step**.
2. Click into the **Workflow Steps** tab.
3. Search for **RSS Feed** and then select **RSS Feed / Retrieve Events**:
![Find Plugin](/assets/img/rss-feed-find-plugin.png)<br>
4. In the **RSS Feed Address** field, either select a value from the dropdown, or enter another RSS Feed URL.
5. For **Time Range**, specify the number of hours or days as the historical period for the RSS events.
6. Select either **Hours** or **Days** from the **Time Unit** field.
7. Optionally use the **Limit Events** field to restrict the number of RSS events to only a specific number of the most recent events.

#### Sample Configuration
In the example below, the job step will query for the **10** most recent events from within the last **2 hours** from the **AWS Events** RSS Feed:
![AWS Example](/assets/img/rss-feed-aws-example.png)<br>

## Example Job

This example Job will query for recent AWS events.  Depending on whether there has been an unresolved event in the past 3 hours, the [**Progress Badge**](/manual/log-filters/progress-badge.html)
will display a message indicating whether there have been recent events.  This message is then posted to the Incident Timeline of a PagerDuty Incident:

![Output in Runbook Automation](/assets/img/rss-feed-output-in-rba.png)

<br>

![Output in PagerDuty Slack App](/assets/img/rss-feed-output-in-slack.png)

<br>

1. Copy the YAML below and save to a **`.yaml`** file.  
2. Upload the Job definition to your Runbook Automation instance.
3. [Optional] Fill in the **API Key** and **Email** fields for the **PagerDuty Incident Note** step to post the output to the PagerDuty Incident timeline.

```
- defaultTab: nodes
  description: ''
  executionEnabled: true
  id: bbffec54-fc9d-4085-8b6b-d70e0c3f4617
  loglevel: INFO
  name: Retrieve AWS Events
  nodeFilterEditable: false
  options:
  - label: PagerDuty Incident ID
    name: pd_incident_id
  plugins:
    ExecutionLifecycle: {}
  scheduleEnabled: true
  schedules: []
  sequence:
    commands:
    - configuration:
        rssUrl: https://status.aws.amazon.com/rss/all.rss
        timeRange: '3'
        timeUnit: Hours
      description: Retrieve AWS Events
      nodeStep: false
      plugins:
        LogFilter:
        - config:
            contextVariable: aws-incidents
            doNothing: 'true'
            mute: 'false'
            regex: 'specified time range: 0'
            statusSymbol: ✅
            text: No recent AWS incidents
          type: progress-badges
        - config:
            contextVariable: aws-incidents
            doNothing: 'true'
            mute: 'false'
            regex: \[RESOLVED\]
            statusSymbol: ✅
            text: Recent AWS incidents have been resolved
          type: progress-badges
        - config:
            contextVariable: aws-incidents
            doNothing: 'true'
            mute: 'false'
            regex: 'specified time range: [^0]\n.*((?!RESOLVED).)*$'
            statusSymbol: ❌
            text: Active AWS incident
          type: progress-badges
      type: rss-feed-retrieve-events
    - configuration:
        api_token: keys/pd-api-token
        incident_id: ${option.pd_incident_id}
        note: '${data.aws-incidents}\n Click here for more details: ${job.url}'
      description: Send Diagnostics to PagerDuty
      errorhandler:
        configuration:
          fail: 'false'
          halt: 'true'
          status: 'Please provide PagerDuty API token, User Email, and Incident ID
            to send diagnostics to Incident.'
        keepgoingOnSuccess: true
        nodeStep: false
        type: flow-control
      nodeStep: false
      type: pd-note-step
    keepgoing: false
    strategy: node-first
  uuid: bbffec54-fc9d-4085-8b6b-d70e0c3f4617
```
