% Using HAProxy as a loadbalancer

<!---
Original:
http://support.rundeck.com/customer/en/portal/articles/2894842-health-check-based-on-execution-mode-for-haproxy-lb
http://support.rundeck.com/customer/en/portal/articles/2894840-enable-cgi-script-on-jetty
--->

### Configure HAPROXY to redirect traffic to Rundeck instances

Adding the following settings to haproxy.cfg. 
This example use `roundrobin` strategy for distributing load amongst the servers.

```
backend default_service
mode http
balance roundrobin
cookie JSESSIONID prefix nocache
server rundeck1 192.168.0.1:4440 cookie rundeck1
server rundeck2 192.168.0.2:4440 cookie rundeck2
server rundeck3 192.168.0.3:4440 cookie rundeck3
```

### Using healtcheck 

To avoid sending traffic to unavailable nodes, HAProxy can check the health of
their downstream services via http or tcp. 

* Add the "httpchk" with the URI of the health check (Rundeck API "system info" endpoint). 
  The token value and the execution mode that you want to use are needed.
* Add the "http-check" with the expected status (in this case 200)
 
```
backend default_service
mode http
balance roundrobin
cookie JSESSIONID prefix nocache
option httpchk get /api/23/system/info?authtoken=<TOKEN_VALUE>
http-check expect status 200
server rundeck1 192.168.0.1:4440 cookie rundeck1 check
server rundeck2 192.168.0.2:4440 cookie rundeck2 check
server rundeck3 192.168.0.3:4440 cookie rundeck3 check
```


### Check if HAProxy redirect to instances

![HAProxy status](../../../figures/haproxy-status.png)