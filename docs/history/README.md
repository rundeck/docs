# December 2019 Update

[3.2.0 Release Notes](./3_2_x/version-3.2.0.md)

## Upgrading

See [Upgrading to Rundeck 3.2](/upgrading/upgrading-to-rundeck-3.2.md).

## Enhancements

### Job Resume (Enterprise)

The new [Job Resume Plugin \(Enterprise\)](/manual/execution-lifecycle/job-resume.md) allows you to manually or automatically resume an execution at a failed step.

![Execution Plugins](~@assets/img/figure-job-resume-edit-job-execution-plugins.png)

### Node Health Checks (Enterprise)

[Node Health Checks](/manual/healthchecks.md) let you run commands or scripts to check if nodes are healthy. Filter out unhealthy nodes before executing jobs. Capture data and add it to node attributes. See Node Health status in the Node list.

![Health Checks](~@assets/img/healthchecks-health-status-ui.png)	

### Webhooks

[Webhooks](/manual/12-webhooks.md) are now enabled by default (previously incubating).  

Define webhooks in your projects that can trigger one or more jobs.

![Destroy your FOMO, never miss an important event!](https://docs.rundeck.com/assets/releases/3_1_1/webhook_promo_pd_sm.gif "Destroy your FOMO, never miss an important event!")

## Plugins

Four new Plugin Types, see [3.2.0 - Development Updates](/history/3_2_x/version-3.2.0.html#development).

