# Log Events Webhook Plugin

All Rundeck users have access to the Log Events Webhook plugin. The log events plugin allows users to log incoming webhook events to the log4j2 logger rundeck.webhooks.log file. Users can post any data they might want to the webhook and it will be logged. Because of this, it can act as a debug endpoint. For example, maybe you don't exactly know what data the source will be sending. Using the log events plugin, you could log it and analyze it before using a different plugin to handle it.

![Log Events - Webhook Plugin](~@assets/img/wh-log-events.png)

- **Name**
: This is the name you want the log events webhook to be called.

- **User**
: The authorization username assumed when running this webhook. All ACL policies matching this username will apply.

- **Roles**
: The authorization roles assumed when running this webhook (comma separated). All ACL policies matching these roles will apply.

- **Enabled**
: This needs to be checked in order for the webhook to be function and write to the log.
