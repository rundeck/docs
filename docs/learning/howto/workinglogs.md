# Work With Server Logs

When you debug internal Rundeck activity related to the system, executions, and auditing, it’s important to know where Rundeck stores all internal information.<br>
Logs are text files with all internal behavior printed in. In this article we will demonstrate how to locate different logs depending on the Rundeck installation methods, covering RPM/DEB, WAR-based installation, and Docker container.<br>

## Default Log Location
By default, log files are located at the `/var/log/rundeck` path in the RPM/DEB installations and on WAR-based installations in the `$RDECK_BASE/server/logs` path.<br>

### The `service.log` file

The first place to see anything related to Rundeck is the `service.log` file. This log file stores all the standard input and output generated during runtime, so this is where you will see any problems related to plugins, executions, and Rundeck in general.<br>

#### The `service.log` file is located:

* In the `/var/log/rundeck` path on RPM/DEB installations
* In WAR-based installations, the log file is located at the `$RDECK_BASE/var/log` path (the service needs to be launched using the `$RDECK_BASE/sbin/rundeckd` script, the process is described [here](/administration/maintenance/startup.md#launcher).<br>

For Windows-based instances, the installation process [covers using](/administration/install/windows.md#configuring-rundeck) the standard stdout output to the `service.log` file.<br>

## Service.log content on Docker container

### **Docker Container Installation**

For installations in a Docker container, the service.log content is printed directly in the container log. You can use the `docker logs` command to access that information.<br>
See the current service.log content with:

```
docker logs <container_id>
```

To follow the `service.log` content (equivalent to the command `tail -f /var/log/rundeck/service.log`)

```
docker logs <container_id> –follow
```

![docker-logs](/assets/img/logs_docker.png)

Where `<container_id>` is the Rundeck container ID, you can check with the `docker ps` command, more information [here](https://docs.docker.com/engine/reference/commandline/ps/).

## Other Rundeck Logs

Rundeck stores all activity information in multiples files, those files are:

`rundeck.access.log` stores all user access to the Rundeck instance.
Entry example:

```
[[2m2022-03-28T12:48:03,577[m] [32mINFO [m [36mweb.requests[m "GET /user/login" 127.0.0.1 http  form 148 ? [] (Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:98.0) Gecko/20100101 Firefox/98.0)
```

`rundeck.api.log` stores all Internal API activity.
Entry example:

```
[[2m2022-03-28T12:48:10,466[m] [32mINFO [m [36mapi.requests[m "GET /api/26/system/info" 127.0.0.1 http admin form 189  (Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:98.0) Gecko/20100101 Firefox/98.0)
```

`rundeck.audit.log` contains authorization messages pertaining to ACL policy.
Example:

```
[[2m2022-03-28T12:48:08,860[m] [32mINFO [m [36mauthorization.LoggingAuthorization[m - Evaluating Decision for: res<type:resource, kind:project> subject<Username:admin Group:admin Group:user> action<create> env<rundeck:auth:env:application:rundeck>: authorized: true: GRANTED, reason: GRANTED, evaluations:     ACLRule</Users/variacode/Rundeck/rundeck/3.4/3.4.9/etc/admin.aclpolicy[2][type:resource][rule: 1]>{'Admin, all access.' context={application='rundeck'} type='resource' for: { group='admin'} allow=[*]} GRANTED for action create => GRANTED (2ms)
```

`Rundeck.cleanup.log` contains all Execution History Clean feature activity.
Example:

```
[[2m2022-03-28T22:06:00,018[m] [32mINFO [m [36mquartzjobs.ExecutionsCleanUp[m - Initializing cleaner execution history job
[[2m2022-03-28T22:06:00,023[m] [32mINFO [m [36mquartzjobs.ExecutionsCleanUp[m - Cleaner parameters: Project name: ProjectEXAMPLE
[[2m2022-03-28T22:06:00,023[m] [32mINFO [m [36mquartzjobs.ExecutionsCleanUp[m - Max days to keep: 0
[[2m2022-03-28T22:06:00,024[m] [32mINFO [m [36mquartzjobs.ExecutionsCleanUp[m - Minimum executions to keep: 10
[[2m2022-03-28T22:06:00,024[m] [32mINFO [m [36mquartzjobs.ExecutionsCleanUp[m - Maximum size of deletions: 500
[[2m2022-03-28T22:06:00,046[m] [32mINFO [m [36mquartzjobs.ExecutionsCleanUp[m - found 3 executions
[[2m2022-03-28T22:06:00,059[m] [32mINFO [m [36mquartzjobs.ExecutionsCleanUp[m - minimum executions to keep: 10
[[2m2022-03-28T22:06:00,059[m] [32mINFO [m [36mquartzjobs.ExecutionsCleanUp[m - total exections of project ProjectEXAMPLE: 3
[[2m2022-03-28T22:06:00,059[m] [32mINFO [m [36mquartzjobs.ExecutionsCleanUp[m - total to exclude: 3
[[2m2022-03-28T22:06:00,059[m] [32mINFO [m [36mquartzjobs.ExecutionsCleanUp[m - 10 executions can not be removed
[[2m2022-03-28T22:06:00,059[m] [32mINFO [m [36mquartzjobs.ExecutionsCleanUp[m - 0 executions will be removed
[[2m2022-03-28T22:06:00,059[m] [32mINFO [m [36mquartzjobs.ExecutionsCleanUp[m - 0 executions can not be removed
[[2m2022-03-28T22:06:00,059[m] [32mINFO [m [36mquartzjobs.ExecutionsCleanUp[m - No executions to delete
[[2m2022-03-28T22:06:00,060[m] [32mINFO [m [36mquartzjobs.ExecutionsCleanUp[m - Executions to delete: []
[[2m2022-03-28T22:06:00,061[m] [32mINFO [m [36mquartzjobs.ExecutionsCleanUp[m - Start to delete 0 executions
```

`rundeck.executions.log` contains executions activity.
Entry example:

```
[[2m2022-03-28T12:48:46,664[m] [32mINFO [m [36mexecution.status[m admin start [1:running] ProjectEXAMPLE admin/- "-/HelloWorld  -"[bbddae57-0b20-4fe2-9118-74d124f63943]
[[2m2022-03-28T12:48:47,748[m] [32mINFO [m [36mexecution.status[m admin finish [1:succeeded] ProjectEXAMPLE admin/- "-/HelloWorld  -"[bbddae57-0b20-4fe2-9118-74d124f63943]
```

`rundeck.jobs.log` is a log of all job definition changes.
Example:

```
[[2m2022-03-28T12:48:43,703[m] [32mINFO [m [36mjobs.changes[m admin create [bbddae57-0b20-4fe2-9118-74d124f63943] ProjectEXAMPLE "-/HelloWorld" (save)
[[2m2022-03-28T12:49:13,978[m] [32mINFO [m [36mjobs.changes[m admin modify [bbddae57-0b20-4fe2-9118-74d124f63943] ProjectEXAMPLE "-/HelloWorld" (update)
```

`rundeck.log` has general application messages.
Content example:

```
[[2m2022-03-28T12:48:01,282[m] [33mWARN [m [36mframework.RundeckFilesystemProjectImporter[m [main] - importing existing filesystem projects
[[2m2022-03-28T13:03:18,735[m] [1;31mERROR[m [36mcontrollers.FrameworkController[m [qtp1835671799-69] - Project already exists: ProjectEXAMPLE
[[2m2022-03-28T21:35:01,360[m] [33mWARN [m [36mframework.RundeckFilesystemProjectImporter[m [main] - importing existing filesystem projects
[[2m2022-03-28T22:06:30,025[m] [1;31mERROR[m [36mquartzjobs.ExecutionJob[m [quartzScheduler_Worker-4] - Unable to start Job execution: Job "HelloWorld" {{Job bbddae57-0b20-4fe2-9118-74d124f63943}}: Limit of running executions has been reached.
```

`rundeck.options.log` logs remote HTTP requests for Options JSON data.
Example:

```
[2022-03-28T23:03:08,274] INFO  http.options 200 34B 1626ms 1648519344000 [/HelloWorld] https://url.to.remote.json
```

`rundeck.webhooks.log` logs remote webhooks requests.
Example:

```
[2022-03-28T23:04:06,981] INFO  webhook.events - processing 'New Hook' with plugin 'webhook-run-job' triggered by: 'admin'
