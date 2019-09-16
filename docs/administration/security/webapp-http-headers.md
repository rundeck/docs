# Webapp HTTP Headers

Rundeck adds these HTTP headers to responses by default:

```
X-Frame-Options: deny
X-XSS-Prevention: 1
X-Content-Type-Options: nosniff
Content-Security-Policy: ...
```

You can configure these, or add additional custom headers with the configuration settings described in
[Rundeck Configuration - Configuration File Reference - Security Http Headers](/administration/configuration/config-file-reference.md#security-http-headers).

(Since 3.0.13)
