# Health Checks

### Health Checks(3.3.4+)
The web load balancer serving traffic to the Rundeck instance should be configured with a health check.

The default path for unauthenticated health checks is /health.

```
$host:$port/health
localhost:4440/health
node1.mydomain.com:4440/health
node2.mydomain.com:4440/health
172.31.5.111:4440/health
```

### Authenticated Health Checks
It is recommend to use unauthenticated health checks to reduce security exposure from load-balancer configurations.  If you wish to use authenticated checks please ensure you are using the least privilege principle.

Please reference the documentation for more information about [API Token Authorization Roles](/administration/security/authorization.html#api-token-authorization-roles).

```
$host:$port/api/32/system/executions/status?authtoken=<TOKEN_VALUE>

$host:$port//api/32/system/executions/status?authtoken=<TOKEN_VALUE>
localhost:4440//api/32/system/executions/status?authtoken=<TOKEN_VALUE>
node1.mydomain.com:4440//api/32/system/executions/status?authtoken=<TOKEN_VALUE>
node2.mydomain.com:4440//api/32/system/executions/status?authtoken=<TOKEN_VALUE>
172.31.5.111:4440//api/32/system/executions/status?authtoken=<TOKEN_VALUE>
```