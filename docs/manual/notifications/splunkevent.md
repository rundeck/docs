# SplunkEvent Notification (Enterprise)

## Splunk HTTP Event collector JSON notification plugin
This notification plugin sends JSON data to Splunk.

![SplunkEvent JSON](~@assets/img/splunk_json.png)

- **Scheme**
: This is the type of scheme that you would like to use for the splunk instance. The options are HTTP or HTTPS.

- **Hostname**
: This is the hostname that you would like the data to be sent to.

- **Port**
: This is the splunk port you would like the data to be sent to. 

- **API Token**
: This is the API token for SplunkEvent. For instructions on how to create an Event Collector token, visit [Splunk](https://docs.splunk.com/Documentation/Splunk/8.0.5/Data/UsetheHTTPEventCollector)

- **Server**
:  This is the server that you would like to be sent. You can reference the server the job ran on by using `${job.serverUrl}`.

- **Source**
: This is the source you would like for the event. You can use the job id by using `${job.id}`.

- **Sourcetype**
: This is the source type. By default, it is rundeck-notification. 

- **Index**
: This is the type of index you would like to use. 

- **Raw**
: This is the event data that you would like to be sent. You can use execution variables such as `${execution.id}` or `${execution.status}.`

- **Channel**
: This is the channel that you want the event to be set up as. 


## Splunk HTTP Event collector RAW notification plugin
This notification plugin sends RAW data to Splunk.

![SplunkEvent RAW](~@assets/img/splunk_raw.png)


- **Scheme**
: This is the type of scheme that you would like to use for the splunk instance. The options are HTTP or HTTPS.

- **Hostname**
: This is the hostname that you would like the data to be sent to.

- **Port**
: This is the splunk port you would like the data to be sent to. 

- **API Token**
: This is the API token for SplunkEvent. For instructions on how to create an Event Collector token, visit [Splunk](https://docs.splunk.com/Documentation/Splunk/8.0.5/Data/UsetheHTTPEventCollector)

- **Server**
:  This is the server that you would like to be sent. You can reference the server the job ran on by using `${job.serverUrl}`.

- **Source**
: This is the source you would like for the event. You can use the job id by using `${job.id}`.

- **Sourcetype**
: This is the source type. By default, it is rundeck-notification. 

- **Index**
: This is the index where you want the HTTP Event Collector events to be stored. If you specify one that does not exist, it will not work. It has to already 

- **Raw**
: This is the raw data that you would like to be sent. It can be anything you want. You can use execution variables such as `${execution.id}` or `${execution.status}.`

- **Channel**
: This is the channel that you want the data to be sent to.