# RSS Feed Plugin (Enterprise)
::: enterprise
:::

This new plugin allows users to query and parse RSS feeds for events from SaaS and public-cloud providers.  
When these providers have any service degradation, updates are posted to their status-page RSS feeds.
This plugin helps surface these events for their customers - thereby answering the questions of whether an incident is due to an internal issue or a third party.

![RSS Feed Events](@assets/img/rss-feed-output.png)<br>

## Configuration

1. In the **Workflow** tab of a job configuration, click on **+ Add a step**.
2. Click into the **Workflow Steps** tab.
3. Search for **RSS Feed** and then select **RSS Feed / Retrieve Events**:
![Find Plugin](@assets/img/rss-feed-find-plugin.png)<br>
4. In the **RSS Feed Address** field, either select a value from the dropdown, or enter another RSS Feed URL.
5. For **Time Range**, specify the number of hours or days as the historical period for the RSS events.
6. Select either **Hours** or **Days** from the **Time Unit** field.
7. Optionally use the **Limit Events** field to restrict the number of RSS events to only a specific number of the most recent events.

## Example
In the example below, the job step will query for the **10** most recent events from within the last **2 hours** from the **AWS Events** RSS Feed:
![AWS Example](@assets/img/rss-feed-aws-example.png)<br>