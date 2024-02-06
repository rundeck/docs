# Rundeck Community Incident Response Basic Scenario
Incident response refers to the systematic approach organizations employ to detect, analyze, and mitigate incidents effectively. An incident is a problem or an issue that needs to be addressed and resolved.  As the digital landscape becomes more complex, the need for swift and efficient response to failures has led to the development and implementation of automated incident response tools.

Rundeck streamlines the detection and resolution process by employing predefined workflows, orchestration, and automated actions. By leveraging it, IT teams can enhance their capacity to identify and address incidents promptly, minimizing the potential impact on systems and data.

## The monitoring tool: CIAO
CIAO is a comprehensive web monitoring tool designed to assess the status of HTTP(S) URL endpoints by scrutinizing their HTTP status codes or detecting errors at the lower TCP stack level.  In this example, CIAO acts as a monitoring tool that launches a Rundeck webhook to check the Apache 2 service and can trigger an Apache 2 service job checker via Rundeck Webhook. This is the Docker Compose CIAO definition:

```
ciao:
   image: brotandgames/ciao
   ports:
     - '3000:3000'
   environment:
     BASIC_AUTH_USERNAME: "admin"
     BASIC_AUTH_PASSWORD: "admin"
     CIAO_WEBHOOK_ENDPOINT_RUNDECK: "http://rundeck:4440/api/46/webhook/7TtPtj3frl1ZC3C8fyMJYNSM1WJMFIZA#CheckApache2"
```

As you see, port `3000` is the CIAO web console, and the `CIAO_WEBHOOK_ENDPOINT_RUNDECK` is the variable that points to the Rundeck Instance webhook URL.

## The target service: Apache 2 Web Server
The Apache HTTP Server, commonly known as Apache, is an open-source web server software developed and maintained by the Apache Software Foundation. Apache 2, the second major version of this server, is widely utilized for serving web content on the internet.  In this example, Apache is the service being monitored and is a Rundeck remote node.

## Rundeck Job
On the Rundeck instance, we need two jobs: the first one checks if the Apache job service is up, and the second job is to start the web service. Both jobs are pointing to the Apache Web server remote node.

Apache 2 Service checker job definition:

```
- defaultTab: nodes
 description: ''
 executionEnabled: true
 id: 1efdffc2-875f-423b-afab-f6316762e3bc
 loglevel: INFO
 name: check_apache
 nodeFilterEditable: false
 nodefilters:
   dispatch:
     excludePrecedence: true
     keepgoing: false
     rankOrder: ascending
     successOnEmptyNodeFilter: false
     threadcount: '1'
   filter: 'name: webserver '
 nodesSelectedByDefault: true
 plugins:
   ExecutionLifecycle: null
 scheduleEnabled: true
 sequence:
   commands:
   - configuration:
       adhocLocalString: |
         status=$(service apache2 status | cut -d ' ' -f 5-)
         echo "status=$status"

         if [[ "$status" == "running" ]]; then
             echo "All good, Apache 2 is running."
         else
             echo "Apache 2 is stopped, launching the Error Handler..."
             exit 1
         fi
       fileExtension: .sh
       interpreterArgsQuoted: 'false'
       scriptInterpreter: /bin/bash
     errorhandler:
       jobref:
         group: apache_actions
         name: start_apache
         nodeStep: 'true'
         uuid: a966e410-90df-4113-a0a1-5ba28939fc83
     nodeStep: true
     type: script-inline
   keepgoing: false
   strategy: node-first
 uuid: 1efdffc2-875f-423b-afab-f6316762e3bc
 ```

If this check fails, then launch an error handler calling a job that starts the Apache 2 service:


```
- defaultTab: nodes
 description: ''
 executionEnabled: true
 group: apache_actions
 id: a966e410-90df-4113-a0a1-5ba28939fc83
 loglevel: INFO
 name: start_apache
 nodeFilterEditable: false
 nodefilters:
   dispatch:
     excludePrecedence: true
     keepgoing: false
     rankOrder: ascending
     successOnEmptyNodeFilter: false
     threadcount: '1'
   filter: 'name: webserver '
 nodesSelectedByDefault: true
 plugins:
   ExecutionLifecycle: null
 scheduleEnabled: true
 sequence:
   commands:
   - configuration:
       adhocRemoteString: service apache2 start
     nodeStep: true
     type: exec-command
   keepgoing: false
   strategy: node-first
 uuid: a966e410-90df-4113-a0a1-5ba28939fc83
```

## Rundeck Webhooks
Webhooks serve as a widely adopted method for facilitating communication between internet applications. In the realm of automation with Rundeck, Webhooks serve as the initial gateway. They can be seamlessly configured to receive incoming payloads, subsequently triggering Rundeck Job(s) in response. The orchestration of Webhook events is efficiently managed through dedicated Webhook Event Rundeck plugins, providing a structured and extensible framework for handling various types of events within the Rundeck automation ecosystem. 

This integration enhances the flexibility and responsiveness of Rundeck, allowing for seamless coordination and execution of tasks through the integration of Webhooks.

The pivotal element in this scenario lies in the "Run Job" Rundeck Webhook. Once this Webhook is [created](https://docs.rundeck.com/docs/manual/webhooks/run-job.html), its corresponding URL becomes essential for CIAO to initiate the Apache 2 service checker job effectively. The integration of the "Run Job" Webhook serves as a crucial link, enabling seamless communication between CIAO and Rundeck to trigger the specified job, ultimately facilitating efficient monitoring of the Apache 2 service.

## Running the Incident Response Scenario
1. Navigate to the CIAO web console.<br>
![](/assets/img/incidents1.png)
2. Click on the green "+ Check" button located at the top.
3.  In the "Name_" field, specify the check name. For the "Url_" field, enter the HTTP service address (e.g., `http://service:80`). Set the frequency of the service check in the "Cron_*" field (e.g., _* * * * *_ for every minute).<br> 
![](/assets/img/incidents2.png)
4. Ensure the "Active" option is selected, and then click the "Create Check" button.
5. Click the "Checks" button to view the Apache 2 check.<br>
![](/assets/img/incidents3.png)
6. Navigate to the Apache 2 service node and stop the Apache 2 service using the command `service apache2 stop`.
7. Return to the CIAO web console and verify that the service is now reported as down.
![](/assets/img/incidents4.png)
8. Visit the Rundeck Activity page to observe the "Apache 2 Service Checker" job running.
9. Once the Apache 2 service is restored, confirm its online status through the CIAO web console.<br>
![](/assets/img/incidents5.png)
![](/assets/img/incidents6.png)

## Resources
* [CIAO Project](https://github.com/brotandgames/ciao) 
* [Apache 2 Documentation](https://httpd.apache.org/docs/2.4/) 
* [Rundeck Webhooks](https://docs.rundeck.com/docs/manual/webhooks.html) 