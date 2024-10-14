# Audit Trail Log

Starting from version `4.6.0` rundeck provides an audit trail log to record user and system activity.
By default, this file is named `rundeck.audit.events.log` and is located at the [default log directory](/administration/configuration/config-file-reference.md#framework-properties).

This file will record tracked activity events and store relevant data such as origin information, resources involved and action performed.

Example log contents:

```
[2022-08-05T16:59:08,033] INFO  audit.AuditLoggerPlugin - Audit Event: AuditEvent {Timestamp=Fri Aug 05 16:59:07 CLT 2022, ActionType='login_success', UserInfo={username='admin', userRoles=[admin, user]}, RequestInfo={serverHostname='localhost', serverUUID='a0827934-52ae-488a-8863-42c1ddb433d7', sessionID='node01wclkchc6kex33rxkykgiquo70', userAgent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:103.0) Gecko/20100101 Firefox/103.0'}, ResourceInfo={resourceType='user', resourceName='admin'}}
[2022-08-05T16:59:35,515] INFO  audit.AuditLoggerPlugin - Audit Event: AuditEvent {Timestamp=Fri Aug 05 16:59:35 CLT 2022, ActionType='view', UserInfo={username='admin', userRoles=[admin, user]}, RequestInfo={serverHostname='localhost', serverUUID='a0827934-52ae-488a-8863-42c1ddb433d7', sessionID='node018386eveen98r1hpjfapdazne61', userAgent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:103.0) Gecko/20100101 Firefox/103.0'}, ResourceInfo={resourceType='project', resourceName='TestProject'}}
[2022-08-05T17:00:11,908] INFO  audit.AuditLoggerPlugin - Audit Event: AuditEvent {Timestamp=Fri Aug 05 17:00:11 CLT 2022, ActionType='create', UserInfo={username='admin', userRoles=[admin, user]}, RequestInfo={serverHostname='localhost', serverUUID='a0827934-52ae-488a-8863-42c1ddb433d7', sessionID='node018386eveen98r1hpjfapdazne61', userAgent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:103.0) Gecko/20100101 Firefox/103.0'}, ResourceInfo={resourceType='job', resourceName='TestProject:/testjob'}}
[2022-08-05T17:00:17,717] INFO  audit.AuditLoggerPlugin - Audit Event: AuditEvent {Timestamp=Fri Aug 05 17:00:17 CLT 2022, ActionType='run', UserInfo={username='admin', userRoles=[admin, user]}, RequestInfo={serverHostname='localhost', serverUUID='a0827934-52ae-488a-8863-42c1ddb433d7', sessionID='node018386eveen98r1hpjfapdazne61', userAgent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:103.0) Gecko/20100101 Firefox/103.0'}, ResourceInfo={resourceType='job', resourceName='TestProject:testjob'}}
[2022-08-05T17:00:22,593] INFO  audit.AuditLoggerPlugin - Audit Event: AuditEvent {Timestamp=Fri Aug 05 17:00:22 CLT 2022, ActionType='logout', UserInfo={username='admin', userRoles=[admin, user]}, RequestInfo={serverHostname='localhost', serverUUID='a0827934-52ae-488a-8863-42c1ddb433d7', sessionID='node0mtzxxbt1q9ek6uc7b2lnivc12', userAgent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:103.0) Gecko/20100101 Firefox/103.0'}, ResourceInfo={resourceType='user', resourceName='admin'}}
[2022-08-05T17:00:26,840] INFO  audit.AuditLoggerPlugin - Audit Event: AuditEvent {Timestamp=Fri Aug 05 17:00:26 CLT 2022, ActionType='login_failed', UserInfo={username='admin', userRoles=[]}, RequestInfo={serverHostname='localhost', serverUUID='a0827934-52ae-488a-8863-42c1ddb433d7', sessionID='node0mtzxxbt1q9ek6uc7b2lnivc12', userAgent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:103.0) Gecko/20100101 Firefox/103.0'}, ResourceInfo={resourceType='user', resourceName='admin'}}
[2022-08-05T17:00:33,519] INFO  audit.AuditLoggerPlugin - Audit Event: AuditEvent {Timestamp=Fri Aug 05 17:00:33 CLT 2022, ActionType='login_success', UserInfo={username='admin', userRoles=[admin, user]}, RequestInfo={serverHostname='localhost', serverUUID='a0827934-52ae-488a-8863-42c1ddb433d7', sessionID='node0mtzxxbt1q9ek6uc7b2lnivc12', userAgent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:103.0) Gecko/20100101 Firefox/103.0'}, ResourceInfo={resourceType='user', resourceName='admin'}}
[2022-08-05T17:00:35,867] INFO  audit.AuditLoggerPlugin - Audit Event: AuditEvent {Timestamp=Fri Aug 05 17:00:35 CLT 2022, ActionType='view', UserInfo={username='admin', userRoles=[admin, user]}, RequestInfo={serverHostname='localhost', serverUUID='a0827934-52ae-488a-8863-42c1ddb433d7', sessionID='node0hp0hfqhno01lo14wcpv002ll3', userAgent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:103.0) Gecko/20100101 Firefox/103.0'}, ResourceInfo={resourceType='project', resourceName='TestProject'}}
[2022-08-05T17:00:52,083] INFO  audit.AuditLoggerPlugin - Audit Event: AuditEvent {Timestamp=Fri Aug 05 17:00:52 CLT 2022, ActionType='create', UserInfo={username='admin', userRoles=[admin, user]}, RequestInfo={serverHostname='localhost', serverUUID='a0827934-52ae-488a-8863-42c1ddb433d7', sessionID='node0hp0hfqhno01lo14wcpv002ll3', userAgent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:103.0) Gecko/20100101 Firefox/103.0'}, ResourceInfo={resourceType='job', resourceName='TestProject:/testjob2'}}
[2022-08-05T17:00:53,942] INFO  audit.AuditLoggerPlugin - Audit Event: AuditEvent {Timestamp=Fri Aug 05 17:00:53 CLT 2022, ActionType='run', UserInfo={username='admin', userRoles=[admin, user]}, RequestInfo={serverHostname='localhost', serverUUID='a0827934-52ae-488a-8863-42c1ddb433d7', sessionID='node0hp0hfqhno01lo14wcpv002ll3', userAgent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:103.0) Gecko/20100101 Firefox/103.0'}, ResourceInfo={resourceType='job', resourceName='TestProject:testjob2'}}
[2022-08-05T17:01:03,987] INFO  audit.AuditLoggerPlugin - Audit Event: AuditEvent {Timestamp=Fri Aug 05 17:01:03 CLT 2022, ActionType='update', UserInfo={username='admin', userRoles=[admin, user]}, RequestInfo={serverHostname='localhost', serverUUID='a0827934-52ae-488a-8863-42c1ddb433d7', sessionID='node0hp0hfqhno01lo14wcpv002ll3', userAgent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:103.0) Gecko/20100101 Firefox/103.0'}, ResourceInfo={resourceType='job', resourceName='TestProject:hola/testjob2'}}
[2022-08-05T17:01:05,861] INFO  audit.AuditLoggerPlugin - Audit Event: AuditEvent {Timestamp=Fri Aug 05 17:01:05 CLT 2022, ActionType='run', UserInfo={username='admin', userRoles=[admin, user]}, RequestInfo={serverHostname='localhost', serverUUID='a0827934-52ae-488a-8863-42c1ddb433d7', sessionID='node0hp0hfqhno01lo14wcpv002ll3', userAgent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:103.0) Gecko/20100101 Firefox/103.0'}, ResourceInfo={resourceType='job', resourceName='TestProject:hola/testjob2'}}
[2022-08-05T17:01:15,493] INFO  audit.AuditLoggerPlugin - Audit Event: AuditEvent {Timestamp=Fri Aug 05 17:01:15 CLT 2022, ActionType='delete', UserInfo={username='admin', userRoles=[admin, user]}, RequestInfo={serverHostname='localhost', serverUUID='a0827934-52ae-488a-8863-42c1ddb433d7', sessionID='node0hp0hfqhno01lo14wcpv002ll3', userAgent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:103.0) Gecko/20100101 Firefox/103.0'}, ResourceInfo={resourceType='job', resourceName='TestProject:hola/testjob2'}}
[2022-08-05T17:02:06,337] INFO  audit.AuditLoggerPlugin - Audit Event: AuditEvent {Timestamp=Fri Aug 05 17:02:06 CLT 2022, ActionType='update', UserInfo={username='admin', userRoles=[admin, user]}, RequestInfo={serverHostname='localhost', serverUUID='a0827934-52ae-488a-8863-42c1ddb433d7', sessionID='node0hp0hfqhno01lo14wcpv002ll3', userAgent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:103.0) Gecko/20100101 Firefox/103.0'}, ResourceInfo={resourceType='system_acl', resourceName='[SYSTEM] hola.aclpolicy'}}
[2022-08-05T17:02:11,719] INFO  audit.AuditLoggerPlugin - Audit Event: AuditEvent {Timestamp=Fri Aug 05 17:02:11 CLT 2022, ActionType='update', UserInfo={username='admin', userRoles=[admin, user]}, RequestInfo={serverHostname='localhost', serverUUID='a0827934-52ae-488a-8863-42c1ddb433d7', sessionID='node0hp0hfqhno01lo14wcpv002ll3', userAgent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:103.0) Gecko/20100101 Firefox/103.0'}, ResourceInfo={resourceType='system_acl', resourceName='[SYSTEM] hola.aclpolicy'}}
```

## Interpreting the log file

Each log entry contains the following components which identify one event:
* **ResourceInfo**: Information about the resource being acted upon, for example a User, a Job or an ACL file.
* **Action**: The type of action performed on the resource, for example `View`, `Create` or `Update`
* **RequestInfo**: Information about the request which originated the action, including session data and user-agent.
* **UserInfo**: Information about the user which performed the action, including username and its roles.

Taking one example event line for analysis:
```
[2022-08-05T17:00:17,717] INFO  audit.AuditLoggerPlugin - Audit Event: AuditEvent {Timestamp=Fri Aug 05 17:00:17 CLT 2022, ActionType='run', UserInfo={username='admin', userRoles=[admin, user]}, RequestInfo={serverHostname='localhost', serverUUID='a0827934-52ae-488a-8863-42c1ddb433d7', sessionID='node018386eveen98r1hpjfapdazne61', userAgent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:103.0) Gecko/20100101 Firefox/103.0'}, ResourceInfo={resourceType='job', resourceName='TestProject:49a9cb6d-5e2a-4b52-9511-a525756826c8:jobgroup/testjob:15032'}}
```

* The event happened on Fri Aug 05 at 17:00:17 Chilean Time.

* The `ResourceInfo` block: `ResourceInfo={resourceType='job', resourceName='TestProject:49a9cb6d-5e2a-4b52-9511-a525756826c8:jobgroup/testjob:15032'}` is intepreted as:
  - The affected resource (`resourceType`) is a job.
  - Resource Name: Job `testjob` under group `jobgroup` on project `TestProject`
  - The referred job uuid is `49a9cb6d-5e2a-4b52-9511-a525756826c8`
  - As the action is `run`, the corresponding execution id `#15032` is also provided.

* The `Action` block: `ActionType='run'` means this job is being executed.

* The `UserInfo` block: `UserInfo={username='admin', userRoles=[admin, user]}` shows the job was run by user `admin`, who had roles `admin` and `user`.

* The `RequestInfo` block: `RequestInfo={serverHostname='localhost', serverUUID='a0827934-52ae-488a-8863-42c1ddb433d7', sessionID='node0hp0hfqhno01lo14wcpv002ll3', userAgent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:103.0) Gecko/20100101 Firefox/103.0'}` is intepreted as:
    - The hostname of the server where the action ran (`serverHostname`) is `localhost`
    - The UUID of the rundeck server where the action ran (`serverUUID`) is `a0827934-52ae-488a-8863-42c1ddb433d7`
    - The web session ID of the client (`sessionId`) is `node0hp0hfqhno01lo14wcpv002ll3`
    - The `userAgent` field shows the client was using the Mozilla Firefox browser.

## Customizing event data or collecting to other destinations

If you need to collect the audit trail data for other purposes, like forwarding it into a monitoring system, another database, or generate a custom file format,
you can use [Audit Events Listener Plugins](/developer/audit-events-listeners).
