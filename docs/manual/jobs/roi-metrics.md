# ROI Metrics Data (Commercial)

::: enterprise
:::

::: incubating
:::

Automation provides value with each execution of a job.  A job can save time, dollars, and most likely a combination of both.  The ROI (return on investment) Metrics integration will help track the user-defined value of each job execution. **ROI Metrics Data** stores arbitrary key value pairs against your job to help understand your ROI per job execution. The metrics will be stored against the each execution of the job, and accessible via API for further analysis. There is also relevant default execution data to help you further understand your savings.

::: tip Configuration Tip
Currently, the data for this feature is stored as file based logs.  To ensure resiliency please be sure that a [LogStore](/administration/cluster/logstore/) is configured to backup the files.
:::

## Configuring ROI Metrics

The values stored are unique entries chosen by the user.  The values are abstracted from a specific metric type (hours, dollars, etc.) to allow customers to define their own ROI metrics.  Follow these steps when editing a job to configure ROI Metrics:

1. Choose the _Execution Plugins_ tab.
1. Check the box for **ROI Metrics Data**.<br><br>
    ![ROI Metrics Plugin](/assets/img/roi-metrics-data.png)
1. Click **Add Custom Field**.<br><br>
    ![Add Custom Field](/assets/img/roi-metrics-customfield.png)
1. Enter a value for:
    - ***Field Label***: This is the friendly name of the field that will be shown when picking a value
    - ***Field Key***: This is the name of the field used in the programmatic output.
    - ***Description***: (Optional) A description of the field value.
    ::: warning Heads Up
    _For simplified gathering later we suggest no spaces or special characters in the "Field Key"._
    :::
1. Click **Add**.
1. Enter a value for the metric as an integer or decimal in the field shown.
1. Save the job.

## Gathering ROI Metrics

When the Job is Executed a new Log Output screen called _ROI Metrics Data_ will be shown when the job is complete.

![ROI Metrics New Log Entry](/assets/img/roi-metrics-log-listing.png)

Selecting that tab will show a table view of the ROI Metrics.  In the example shown we can see the value provided along with the following metrics included by default:

![ROI Metrics Output](/assets/img/roi-metrics-output.png)

- Job Duration (in seconds)
- Job Execution Time (UTC)
- Job ID
- Execution ID

The data is also available in JSON format both in the UI and from an API endpoint.  Use our [API Guide](/api/index.md) to access the data.

![ROI Metrics JSON](/assets/img/roi-metrics-json.png)

For a walk-through of how the ROI Metrics Data may be used and an example job that will help in gathering ROI metric data check out this [Learning Article](/learning/howto/use-roi-metrics.md).
