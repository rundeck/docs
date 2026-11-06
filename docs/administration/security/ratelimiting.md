# Rate Limiting (Commercial)

:::enterprise
:::

## Failed Login Rate Limiting (Commercial)

The Failed Login Rate Limiting helps provides protection from brute force login attempts on Rundeck.

> Note: This setting is turned off by default on new installations of Runbook Automation but is recommended to be turned on in production use.

To enable Failed Login rate limiting using the following settings in Configuration Management.

![rate-limiting-settings](/assets/img/login-ratelimiting.png)

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


## API Endpoints Rate Limiting (Commercial)

:::enterprise
:::

API Endpoints Rate Limiting provides system admin a tool to protect rundeck RESTFul APIs from client-side abuse. 

> Notes: This feature is not enabled by default. When enabled, configured rate limiters will be applied on the any requests to API endpoint URL `<rundeck context path>/api/**`

To enable Failed Login rate limiting using the following settings in Configuration Management.

![rate-limiting-settings](/assets/img/login-ratelimiting.png)

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
   ![rate-limiting-jmx-monitor](/assets/img/rate-limiting-jmx-monitor.png)
System admin can use their monitor tools to capture the Cache overflow event.

5. `rundeck.apiRateLimiting.include` - A string of semicolon separated Rate Limiter algorithm names. It defines which Rate Limiter algorithm will be applied. We have four different Rate Limiter algorithms: Session-Based, AuthToken-Based, Client IP Based, and Webhook Trigger. Use this parameter to choose the desired Rate Limiter algorithm. The valid algorithm names are:
   
    - `rundeckpro.security.rateLimit.AuthTokenApiRateLimiter` - This rate limiter will apply rate limiting on requests per Auth Token. 
    - `rundeckpro.security.rateLimit.SessionApiRateLimiter` - This rate limiter will apply rate limiting on requests per authenticated user session
    - `rundeckpro.security.rateLimit.ClientIPApiRateLimiter` - This rate limiter will apply rate limiting on requests per client IP address
    - `rundeckpro.security.rateLimit.WebhookTokenApiRateLimiter` - This rate limiter counts webhook trigger requests. See [Webhook Trigger Rate Limiting](#webhook-trigger-rate-limiting).

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

## Webhook Trigger Rate Limiting

Counts `POST /api/<version>/webhook/<token>`. All webhook tokens share one bucket. The webhook admin API is not counted. `rundeck.apiRateLimiting.rate` does not apply here.

The limiter stays off until `rundeck.apiRateLimiting.enabled=true`, `include` lists `rundeckpro.security.rateLimit.WebhookTokenApiRateLimiter`, and `rundeck.apiRateLimiting.webhook.rate` is a positive integer. Unset or `0` means no webhook limit. The window is `rundeck.apiRateLimiting.refillWindowInSeconds`. Over the limit the response is HTTP 429 with `Retry-After`.

```
rundeck.apiRateLimiting.enabled=true
rundeck.apiRateLimiting.refillWindowInSeconds=60
rundeck.apiRateLimiting.include=rundeckpro.security.rateLimit.AuthTokenApiRateLimiter;rundeckpro.security.rateLimit.WebhookTokenApiRateLimiter
rundeck.apiRateLimiting.webhook.rate=30
```

`30` is an example: 30 trigger calls per window for the whole instance. Restart after adding the class to `include`. A later change to `webhook.rate` in System Configuration applies without another restart.

`/api/60/web%68ook/<token>` counts as `/api/60/webhook/<token>`. A `#name` suffix is not a separate token.
