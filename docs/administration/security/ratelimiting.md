# Failed Login Rate Limiting (Enterprise)

:::enterprise
:::

The Failed Login Rate Limiting helps provides protection from brute force login attempts on Rundeck.

> Note: This setting is turned off by default on new installations of Rundeck Enterprise but is recommended to be turned on in production use.

To enable Failed Login rate limiting using the following settings in Configuration Management.

![rate-limiting-settings](~@assets/img/login-ratelimiting.png)

or `rundeck-config.properties`

```
rundeck.authRateLimiting.enabled=true
rundeck.authRateLimiting.rate=5
rundeck.authRateLimiting.refillWindowInSeconds=60
```

- **Enabled**: Boolean value ("true"/"false") whether failed logins should be checked for lockout.
- **Limiting Rate**: This is the number of failed attempts allowed within the refill window prior to the account being locked.
- **Refill Window**: The refill window is configured in number of seconds. The bucket will only be refilled when the time window reopens. If a user submits too many requests during the refill window the system will reject any further requests until the next window opens.  

> Note: There is currently no way to clear a failed attempt lockout besides waiting for refill window to expire without any further failed attempts.
