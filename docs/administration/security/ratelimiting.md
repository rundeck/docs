# Rate Limiting (Enterprise)

:::enterprise
:::

## Failed Login Rate Limiting (Enterprise)

The Failed Login Rate Limiting helps provides protection from brute force login attempts on Rundeck.

> Note: This setting is turned off by default on new installations of Process Automation but is recommended to be turned on in production use.

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


## API Endpoints Rate Limiting (Enterprise)

:::enterprise
:::

API Endpoints Rate Limiting provides system admin a tool to protect rundeck RESTFul APIs from client-side abuse. 

> Notes: This feature is not enabled by default. When enabled, configured rate limiters will be applied on the any requests to API endpoint URL `<rundeck context path>/api/**`

To enable Failed Login rate limiting using the following settings in Configuration Management.

![rate-limiting-settings](~@assets/img/login-ratelimiting.png)

or `rundeck-config.properties`, e.g.:

```
rundeck.apiRateLimiting.enabled = true
rundeck.apiRateLimiting.rate = 20
rundeck.apiRateLimiting.refillWindowInSeconds = 10
rundeck.apiRateLimiting.cacheSize = 100
rundeck.apiRateLimiting.include = rundeckpro.security.rateLimit.SessionApiRateLimiter;rundeckpro.security.rateLimit.ClientIPApiRateLimiter
```

Configuration Parameters:

1. `rundeck.apiRateLimiting.enabled` - A boolean value to switch the feature on/off. Default to false

2. `rundeck.apiRateLimiting.rate` - A number defines how many requests per time frame allowed. Default to 100 requests.

3. `rundeck.apiRateLimiting.refillWindowInSeconds` - A number defines the time frame size in seconds. Default to 10 seconds.

4. `rundeck.apiRateLimiting.cacheSize` - defines the size of the cache that holds the rate-limit bucket for the AuthToken-based rate limiter. Since there is no session for Auth Token authentication, we need a server-side in-memory cache to hold a rate-limit bucket for every unique token. The cache size to used to set the maximum bucket size to avoid server resources being used out. The default value is 100, for a production deployment system admin must evaluate the right cache size based on the token numbers and deployment scenarios. To monitor the cache overflow event, we added a new JMX metrics `rundeckpro.security.rateLimit.GuavaLoadingCacheBucketHolder.rateLimitCacheOverflowCount`
   ![rate-limiting-jmx-monitor](~@assets/img/rate-limiting-jmx-monitor.png)
System admin can use their monitor tools to capture the Cache overflow event.

5. `rundeck.apiRateLimiting.include` - A string of semicolon separated Rate Limiter algorithm names. It defines which Rate Limitter algorithm will be applied. We have three different Rate Limiter algorithms: Session-Based, AuthToken-Based and Client IP Based, we use this parameter to let system admin choose the desired Rate Limiter algorithm. The valid algorithm names are:
   
    - `rundeckpro.security.rateLimit.AuthTokenApiRateLimiter` - This rate limiter will apply rate limiting on requests per Auth Token. 
    - `rundeckpro.security.rateLimit.SessionApiRateLimiter` - This rate limiter will apply rate limiting on requests per authenticated user session
    - `rundeckpro.security.rateLimit.ClientIPApiRateLimiter` - This rate limiter will apply rate limiting on requests per client IP address

    Here are some samples of valid settings:
    ```
    # Enable a single Rate Limiter "rundeckpro.security.rateLimit.AuthTokenApiRateLimiter"

    rundeck.apiRateLimiting.include = rundeckpro.security.rateLimit.AuthTokenApiRateLimiter
    ``` 
    or

    ```
    # Enable two rate limiters: "rundeckpro.security.rateLimit.AuthTokenApiRateLimiter" and "rundeckpro.security.rateLimit.SessionApiRateLimiter"

    rundeck.apiRateLimiting.include = rundeckpro.security.rateLimit.AuthTokenApiRateLimiter;rundeckpro.security.rateLimit.SessionApiRateLimiter
    ```
