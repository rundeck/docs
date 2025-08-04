# Monitoring Runners

The Enterprise Runner is a lightweight JVM process.  It can therefore be monitored with standard JMX monitoring tools.  

The Runner exposes a number of JMX MBeans that can be used to monitor the Runner's health and performance.

To expose the JMX Mbeans, you can start the Runner with the following Java options:

- `-Dcom.sun.management.jmxremote` - This enables remote JMX monitoring.
- `-Dcom.sun.management.jmxremote.port` - This sets the port that the JMX Mbeans will be exposed on.
- `-Dcom.sun.management.jmxremote.authenticate` - This enables or disables authentication for the JMX connection.
- `-Dcom.sun.management.jmxremote.ssl` - This enables or disables SSL for the JMX connection.
- `-Djava.rmi.server.hostname` - This sets the hostname that the JMX Mbeans will be associated with.
- `-Dcom.sun.management.jmxremote.local.only` - This enables or disables local-only access to the JMX Mbeans.

For example, to start the Runner with JMX monitoring enabled on port 9010, you would use the following command:

```bash
java -Dcom.sun.management.jmxremote \
  -Dcom.sun.management.jmxremote.port=9010 \
  -Dcom.sun.management.jmxremote.local.only=false \
  -Dcom.sun.management.jmxremote.authenticate=false \
  -Dcom.sun.management.jmxremote.ssl=false \
  -Djava.rmi.server.hostname=localhost \
  -jar runner-6281cf48-37a2-4659-93c9-907539177022.jar
```

Once the Runner is running with JMX monitoring enabled, you can connect to it using a monitoring tool.

For example, the **Datadog** agent can be configured to monitor the Runners JVM metrics following [these steps](https://docs.datadoghq.com/integrations/java/?tab=host#configuration).

The JVM metrics will then be associated with the Runner's host in Datadog:

![Datadog Monitoring Runner](/assets/img/datadog-monitoring-runner.png)<br>
