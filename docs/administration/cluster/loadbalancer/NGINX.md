# Using NGINX as loadbalancer


[NGINX Open Source](https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/)
[NGINX Plus](https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-plus/)

### NGINX Open Source config example

```
events {
  worker_connections  1024;
}
http {
    upstream rdlb {
        ip_hash;
        server 172.31.10.111:4440 max_fails=3 fail_timeout=30s;
        server 172.31.10.112:4440 max_fails=3 fail_timeout=30s;
        server rundeckcn1:4440 max_fails=3 fail_timeout=30s;
        server rundeckcn2:4440 max_fails=3 fail_timeout=30s;
        server node1.mydomain.internal:4440 max_fails=3 fail_timeout=30s;
        server node2.mydomain.internal:4440 max_fails=3 fail_timeout=30s;
    }
    server {
      server_name rundeck.mydomain.com;
      access_log  /var/log/rundeck.log;
        location / {
            proxy_pass http://rdlb;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Host $host:$server_port;
            proxy_set_header X-Forwarded-Server $host;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_set_header User-Agent $http_user_agent;
        }
    }
}
```

### NGINX Plus config example

```
events {
  worker_connections  1024;
}
http {
    upstream rdlb {
        server 172.31.10.111:4440 max_fails=3 fail_timeout=30s slow_start=30;
        server 172.31.10.112:4440 max_fails=3 fail_timeout=30s slow_start=30;
        server rundeckcn1:4440 max_fails=3 fail_timeout=30s slow_start=30;
        server rundeckcn2:4440 max_fails=3 fail_timeout=30s slow_start=30;
        server node1.mydomain.internal:4440 max_fails=3 fail_timeout=30s slow_start=30;
        server node2.mydomain.internal:4440 max_fails=3 fail_timeout=30s slow_start=30;
        sticky cookie srv_id expires=24h domain=.mydomain.com path=/;
    }
    server {
      server_name rundeck.mydomain.com;
      access_log  /var/log/rundeck.log;
        location / {
            proxy_pass http://rdlb;
            health_check interval=10 fails=3 passes=2 uri=/health;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Host $host:$server_port;
            proxy_set_header X-Forwarded-Server $host;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_set_header User-Agent $http_user_agent;
        }
    }
}
```

### Health Checks - NGINX Open Source
For passive health checks, NGINX monitors transactions as they happen, and try to resume failed connections. If the transaction still cannot be resumed, NGINX Open Source and NGINX Plus mark the server as unavailable and temporarily stop sending requests to it until it is marked active again.

```
upstream backend {
    server backend1.example.com;
    server backend2.example.com max_fails=3 fail_timeout=30s;
}
```

Note that if there is only a single server in a group, the fail_timeout and max_fails parameters are ignored and the server is never marked unavailable.

For additional resources please reference the [NGINX health check](https://docs.nginx.com/nginx/admin-guide/load-balancer/http-health-check/) documentation.

### Health Checks - NGINX Plus

NGINX Plus can periodically check the health of upstream servers by sending special health‑check requests to each server and verifying the correct response.


```
    server {
      server_name rundeck.mydomain.com;
      access_log  /var/log/rundeck.log;
        location / {
            proxy_pass http://rdlb;
            health_check port=4440 interval=10 fails=3 passes=2 uri=/health;
        }
```

For additional resources please reference the [NGINX health check](https://docs.nginx.com/nginx/admin-guide/load-balancer/http-health-check/) documentation.

### IMPORTANT! STICKY SESSIONS MUST BE ENABLED.

NGINX Open Source provides sessions persistence via the ip_hash and hash directives as shown below.  Please note it is recommended on high load applications to use NGINX + HAProxy as ip_hash and hash session persistence are known to provide poor load balancing intelligence and will not actively balance the load to low session nodes until a session expires.


Please see the [NGINX Sticky Cookie](https://nginx.org/en/docs/http/ngx_http_upstream_module.html?&_ga=2.125193738.1644249770.1602702997-1610148742.1602702997#sticky_cookie) documentation for more details.


```
    upstream rdlb {
        ip_hash;
        server 172.31.10.111:4440 max_fails=3 fail_timeout=30s;
        server 172.31.10.112:4440 max_fails=3 fail_timeout=30s;
    }

```


NGINX Plus

NGINX Plus adds a session cookie to the first response from the upstream group and identifies the server that sent the response. The client’s next request contains the cookie value and NGINX Plus route the request to the upstream server that responded to the first request:


```
    upstream rdlb {
        server 172.31.10.111:4440 max_fails=3 fail_timeout=30s slow_start=30;
        server 172.31.10.112:4440 max_fails=3 fail_timeout=30s slow_start=30;
        sticky cookie srv_id expires=24h domain=.example.com path=/;
    }
```

In the example, the srv_id parameter sets the name of the cookie. The optional expires parameter sets the time for the browser to keep the cookie (here, 1 hour). The optional domain parameter defines the domain for which the cookie is set, and the optional path parameter defines the path for which the cookie is set. This is the simplest session persistence method.

Please see the [NGINX Plus Sticky Cookie](https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/#sticky) documentation for more details.