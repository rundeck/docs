# Instance Health Checks

Monitoring the health of your Rundeck instance helps ensure your automation workflows run smoothly and allows you to quickly identify and address issues before they impact your operations. This guide explains how to check your instance health using available API endpoints.

## Quick Start

**For Support during incidents:** Start with the execution mode check (fastest indicator). If `passive`, the instance is in a degraded or unhealthy state. Then check system health for database and scheduler status.

**For customers:** Use these endpoints to monitor your instance health. Most endpoints require admin-level API access. If you don't have admin access, contact your administrator or Support for assistance.

## Understanding Instance Health

Your Rundeck instance health reflects the operational status of critical components:

- **Database connectivity** - Ensures Rundeck can store and retrieve data
- **Scheduler status** - Verifies jobs can be scheduled and executed
- **Execution mode** - Confirms whether jobs can run (active) or are paused (passive)
- **Runner connectivity** (if using Enterprise Runners) - Checks connection to distributed execution nodes

Regular health checks help you:
- Detect issues early before they affect job execution
- Verify instance status after deployments or configuration changes
- Troubleshoot problems when jobs fail unexpectedly
- Monitor instance availability for your automation workflows

## Health Status Values

When checking instance health, you may encounter these status values:

- **Healthy** - All critical components are operational. Your instance is functioning normally and jobs should execute successfully.
- **Degraded** - Some components show issues but the instance remains functional. You may experience intermittent problems or reduced performance.
- **Unhealthy** - Critical components have failed. The instance may not be operational and jobs may fail to execute.

## Checking Instance Health

The following endpoints allow you to check different aspects of your instance health. Most endpoints require admin-level API access, so you'll need an API token with appropriate permissions.

### Check Execution Mode

The execution mode indicates whether your instance can run jobs. This is the quickest way to verify basic instance functionality.

**Endpoint:** `GET /api/{version}/system/executions/status`

**Required Permissions:** System read permission or admin-level permission

**API Version:** Available since V32

**What it tells you:**
- `active` - Jobs can execute normally
- `passive` - Executions are disabled; jobs will not run

**Example Request:**
```bash
curl -H "X-Rundeck-Auth-Token: YOUR_API_TOKEN" \
  -H "Accept: application/json" \
  https://your-instance.com/api/32/system/executions/status
```

**Example Response:**
```json
{"executionMode":"active"}
```

**What to do:**
- If the response shows `active`, your instance can execute jobs
- If the response shows `passive`, executions are disabled. Check your configuration or contact Support if this is unexpected
- If the request fails or times out, there may be connectivity or authentication issues

**Note:** Prior to API version 36, a `passive` mode would return HTTP 503. As of API v36, it returns HTTP 200. To get a 503 response when in passive mode, add `?passiveAs503=true` to your request.

### Check System Health

The system health endpoint provides detailed information about database connectivity and scheduler status.

**Endpoint:** `GET /api/{version}/metrics/healthcheck`

**Required Permissions:** System read permission or admin-level permission

**API Version:** Available since V25

**What it checks:**
- Database connectivity health
- Quartz scheduler thread pool status

**Example Request:**
```bash
curl -H "X-Rundeck-Auth-Token: YOUR_API_TOKEN" \
  -H "Accept: application/json" \
  https://your-instance.com/api/25/metrics/healthcheck
```

**Example Response:**
```json
{
  "dataSource.connection.time": {
    "healthy": true,
    "message": "Datasource connection healthy with timeout 5 seconds"
  },
  "quartz.scheduler.threadPool": {
    "healthy": true
  }
}
```

**What to look for:**
- `"healthy": true` for both components indicates good health
- `"healthy": false` for database connectivity suggests connection issues
- `"healthy": false` for scheduler indicates thread pool problems
- Check the `message` field for additional details about any issues

**What to do:**
- If both checks show `healthy: true`, your core components are functioning
- If database connectivity shows `healthy: false`, verify your database is running and accessible, check connection settings in your configuration
- If scheduler shows `healthy: false`, review your thread pool configuration and system resources

### Check Runner Status (Enterprise Feature)

If you use Enterprise Runners for distributed job execution, you can check runner connectivity and health.

**Endpoint:** `GET /api/{version}/runnerManagement/runners`

**Required Permissions:** Runner read permissions

**API Version:** Available since V41

**What it checks:**
- Runner health status (`Healthy`, `Unhealthy`, `Down`, `New`)
- Runner check-in times and metadata
- Currently running operations

**Example Request:**
```bash
curl -H "X-Rundeck-Auth-Token: YOUR_API_TOKEN" \
  -H "Accept: application/json" \
  https://your-instance.com/api/41/runnerManagement/runners
```

**What to look for:**
- Runners showing `Healthy` status are operational
- Runners showing `Unhealthy` or `Down` may have connectivity or configuration issues
- Check `lastCheckin` timestamps to ensure runners are actively communicating

**What to do:**
- If all runners show `Healthy`, your runner infrastructure is functioning
- If runners show `Unhealthy` or `Down`, check network connectivity, runner configuration, and runner logs
- Review the `lastCheckin` time to ensure runners are checking in regularly

### Check Node Health (Enterprise Feature)

Node health checks verify connectivity to specific nodes within a project. This is project-scoped, not instance-wide.

**Endpoints:**
- `GET /api/{version}/project/{project}/healthcheck/status?node={nodename}` - Check a specific node
- `GET /api/{version}/project/{project}/healthcheck/status/all?includeChecks={boolean}` - Check all nodes

**Required Permissions:** `app_admin` permissions

**What it checks:**
- Node connectivity and command execution capability
- Node status values: `HEALTHY`, `UNHEALTHY`, `UNKNOWN`

**Limitations:**
- Project-scoped (checks nodes within a specific project, not instance-wide health)
- Requires admin access
- Focuses on node connectivity, not overall instance health

## Quick Reference for Support

When responding to customer incidents, follow this standardized procedure:

### Step 1: Quick Check
Check execution mode first - this is the fastest indicator:
```bash
curl -H "X-Rundeck-Auth-Token: <admin-token>" \
  https://<instance-url>/api/32/system/executions/status
```

**If `passive`:** Instance is in degraded/unhealthy state. Proceed to detailed checks.
**If `active`:** Continue to Step 2.

### Step 2: Detailed Health Check
Check system health for database and scheduler:
```bash
curl -H "X-Rundeck-Auth-Token: <admin-token>" \
  https://<instance-url>/api/25/metrics/healthcheck
```

### Step 3: Determine Status
- **Unhealthy:** Database or scheduler `healthy: false`, or execution mode `passive` and cannot be changed → Escalate immediately
- **Degraded:** Execution mode `active` but some checks show issues → Investigate further, check logs
- **Healthy:** All checks pass → No action needed

### Step 4: Document Findings
- Record all health check results
- Note timestamps
- Check recent deployments or configuration changes
- Review logs if issues found
- Escalate to Engineering if status is `unhealthy` per above criteria

## Interpreting Health Check Results

### Healthy Instance

Your instance is healthy when:
- Execution mode is `active`
- System health checks show `healthy: true` for database and scheduler
- Runners (if used) show `Healthy` status
- Jobs execute successfully

**Action:** No action needed. Continue monitoring regularly.

### Degraded Instance

Your instance may be degraded when:
- Execution mode is `active` but some health checks show issues
- Intermittent database connectivity problems
- Some runners showing `Unhealthy` status
- Occasional job failures

**Action:** 
- Review logs for error patterns (see [Logging](/administration/maintenance/logs.md))
- Check recent configuration changes or deployments
- Verify system resources (CPU, memory, disk)
- Monitor for patterns or trends over time
- If issues persist or worsen, contact Support with health check results and log excerpts

### Unhealthy Instance

Your instance is unhealthy when:
- Execution mode is `passive` and cannot be changed to `active`
- Database connectivity check fails (`healthy: false`)
- Scheduler thread pool check fails (`healthy: false`)
- Multiple critical components showing failures
- Widespread job execution failures

**Action:**
- Check instance logs immediately (see [Logging](/administration/maintenance/logs.md))
- Verify database is running and accessible
- Review recent deployments or configuration changes
- Check system resources (CPU, memory, disk)
- If execution mode is `passive` and cannot be changed to `active`, this indicates a critical issue
- Contact Support for assistance with specific error messages and health check results

## Limitations and Considerations

**Access Requirements:**
- Most health check endpoints require admin-level API access
- Non-admin users cannot perform self-service health checks with current endpoints
- You'll need an API token with appropriate permissions

**Current Limitations:**
- No single aggregate health status endpoint exists
- Health checks are scattered across multiple endpoints
- Results require technical knowledge to interpret
- No built-in monitoring dashboard

**Future Enhancement:**
A customer-accessible health endpoint is planned that will:
- Not require admin permissions
- Return a simple aggregate status (`healthy`, `degraded`, or `unhealthy`)
- Be suitable for monitoring dashboards and automated health checks

## Automating Health Checks

You can integrate these health check endpoints into your monitoring systems:

**Example Monitoring Script:**
```bash
#!/bin/bash
INSTANCE_URL="https://your-instance.com"
API_TOKEN="YOUR_API_TOKEN"
API_VERSION="32"

# Check execution mode
STATUS=$(curl -s -H "X-Rundeck-Auth-Token: $API_TOKEN" \
  -H "Accept: application/json" \
  "$INSTANCE_URL/api/$API_VERSION/system/executions/status")

MODE=$(echo $STATUS | jq -r '.executionMode')

if [ "$MODE" != "active" ]; then
  echo "WARNING: Instance is in $MODE mode"
  exit 1
fi

echo "Instance is healthy (execution mode: $MODE)"
exit 0
```

**Integration Ideas:**
- Set up cron jobs or scheduled tasks to run health checks regularly
- Integrate with monitoring tools like Nagios, Prometheus, or Datadog
- Create alerts based on health check results
- Log health check results for trend analysis

## Related Documentation

- [API Reference - System Execution Status](/api/index.md#get-current-execution-mode)
- [API Reference - Metrics Healthcheck](/api/index.md#metrics-healthcheck)
- [API Reference - Runner Management](/api/index.md#list-available-runners)
- [Troubleshooting Guide](/learning/howto/troubleshooting.md)
- [Logging](/administration/maintenance/logs.md)
