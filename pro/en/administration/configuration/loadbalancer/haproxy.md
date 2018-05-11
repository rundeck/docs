% Using HAProxy as a loadbalancer

<!---
Original:
http://support.rundeck.com/customer/en/portal/articles/2894842-health-check-based-on-execution-mode-for-haproxy-lb
http://support.rundeck.com/customer/en/portal/articles/2894840-enable-cgi-script-on-jetty
--->

To avoid sending traffic to unavailable nodes, HAProxy can check the health of
their downstream services via http or tcp. This document explains how to create
a custom health check for Rundeck.

### Enable CGI Scripts for Rundeck

The first step is to enable the CGI Script access on the embedded Jetty
container.

Note: These settings are valid for the rpm/deb or launcher install.

#### Edit the web.xml
 
In the launcher, the file `web.xml` is located on
`$RDECK_BASE/server/exp/webapp/WEB-INF`

For deb/rpm installers, the `web.xml` is located in `/var/lib/rundeck/server/exp/webapp/WEB-INF`

Add the following attributes before the last "security-constraint" label (the one that contains the auth-constraint attribute). This will avoid the redirect to the login page if you are not logged in Rundeck.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.xml}
<security-constraint>
    <web-resource-collection>
        <web-resource-name>cgi</web-resource-name>
        <url-pattern>/cgi-bin/*</url-pattern>
    </web-resource-collection>
</security-constraint>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

After the last servlet attribute, add the following settings. A folder called
`WEB-INF/cgi-bin` must be created (the name of the folder can be defined by the user)

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.xml}
<servlet>
    <servlet-name>CGI</servlet-name>
    <servlet-class>org.eclipse.jetty.servlets.CGI</servlet-class>
    <init-param>
        <param-name>Path</param-name>
        <param-value>/bin:/usr/bin:/usr/local/bin</param-value>
    </init-param>
    <init-param>
        <param-name>cgibinResourceBaseIsRelative</param-name>
        <param-value>true</param-value>
    </init-param>      
    <init-param> 
        <param-name>commandPrefix</param-name> 
        <param-value>/usr/bin/python</param-value> 
    </init-param>         
    <init-param>
        <param-name>cgibinResourceBase</param-name>
        <param-value>WEB-INF/cgi-bin</param-value>
    </init-param>
    <async-supported>true</async-supported>
    <load-on-startup>1</load-on-startup>
</servlet>
```
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Add the following settings after the last "servlet-mapping" attribute. The "cgi-bin" name must match with the settings defined on the servlet. 

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.xml}
<servlet-mapping>
    <servlet-name>CGI</servlet-name>
    <url-pattern>/cgi-bin/*</url-pattern>
</servlet-mapping>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#### Run the Script

With this settings, any script added to `$RDECK_BASE/server/exp/webapp/WEB-INF/cgi-bin`,
can be called as an endpoint. For example, the URL: `http://localhost:4440/cgi-bin/somescript` will call the script  `$RDECK_BASE/server/exp/webapp/WEB-INF/cgi-bin/somescript`

### Create the health check script on each instance

The health check uses a Rundeck API to get system information. A health check could factor in other information like scheduler thread ratio, CPU load or memory utilization. For an active/standby configuration, the health check should check the execution mode. When the execution mode is set to "passive" the load balancer should route around it.

The example below uses a python script to demonstrate this.

Create the following script on `$RDECK_BASE/server/exp/webapp/WEB-INF/cgi-bin/status`
 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.python}
#!/usr/bin/python

import sys
import os
import cgi

from cgi import escape
import requests
import json

form = cgi.FieldStorage()
token = form.getvalue("token")
executionMode= form.getvalue("executionMode")

url = 'http://localhost:4440/api/20/system/info?format=json&authtoken=' + token

response = requests.post(url)
info = json.loads(response.text)
currentExecutionMode = info["system"]["executions"]["executionMode"]

if currentExecutionMode == executionMode:
    status = "200"
else:
    status = "403"


print "Content-type: text/html"
print 'Status:' + status + ' '

print
print "<!doctype html>"
print "<html>"
print "<body>"

print 'Current Execution Mode:' + currentExecutionMode
print "<br>"
print 'Expected Execution Mode:' + executionMode
print "</body>"
print "</html>"
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

After the script has been deployed use your browser to visit the new health check page.

The URL accepts a parameter called "executionMode" which takes one of two values: active or passive. If specified mode matches the actual mode the page will return HTTP response code 200 otherwise it will return 403.

For example: `http://localhost:4440/cgi-bin/status?token=<token>&executionMode=active`

![Example health check](../../../figures/haproxy-health-check.png)

### On HAProxy, add the following settings

The web load balancer serving traffic to the Rundeck instance should be configured with the health check.

* Add the "httpchk" with the URI of the health check. The token value and the execution mode that you want to use are needed.
* Add the "http-check" with the expected status (in this case 200)
 
```
backend default_service
cookie JSESSIONID prefix nocache
option httpchk get /cgi-bin/status?token=<TOKEN_VALUE>&executionMode=active
http-check expect status 200
server rundeck1 192.168.0.1:4440 cookie rundeck1 check inter 2000 rise 2 fall 3
server rundeck2 192.168.0.2:4440 cookie rundeck2 check inter 2000 rise 2 fall 3
server rundeck3 192.168.0.3:4440 cookie rundeck3 check inter 2000 rise 2 fall 3
```

### Check if HAProxy redirect to the active instance

Once the web load balancer has been configured with the health check, any instance that is not in "active" mode will not be passed traffic.

![HAProxy status](../../../figures/haproxy-status.png)