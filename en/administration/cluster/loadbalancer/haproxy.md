% Using HAProxy as a loadbalancer

<!---
Original:
http://support.rundeck.com/customer/en/portal/articles/2894842-health-check-based-on-execution-mode-for-haproxy-lb
http://support.rundeck.com/customer/en/portal/articles/2894840-enable-cgi-script-on-jetty
--->

To avoid sending traffic to unavailable nodes, HAProxy can check the health of
their downstream services via http or tcp. This document explains how to create
a custom health check for Rundeck.

### On HAProxy, add the following settings

The web load balancer serving traffic to the Rundeck instance should be configured with the health check.

* Add the "httpchk" with the URI of the health check. The token value is needed.
* Add the "http-check" with the expected string (in this case, escaping the executionMode='active' response)
 
```
backend default_service
cookie JSESSIONID prefix nocache
option httpchk GET /api/31/system/info?authtoken=<TOKEN_VALUE>
http-check expect string executionMode=\'active\'
server rundeck1 192.168.0.1:4440 cookie rundeck1 check inter 2000 rise 2 fall 3
server rundeck2 192.168.0.2:4440 cookie rundeck2 check inter 2000 rise 2 fall 3
server rundeck3 192.168.0.3:4440 cookie rundeck3 check inter 2000 rise 2 fall 3
```

### Check if HAProxy redirect to the active instance

Once the web load balancer has been configured with the health check, any instance that is not in "active" mode will not be passed traffic.

![HAProxy status](../../../figures/haproxy-status.png)
