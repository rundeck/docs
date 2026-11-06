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

:::enterprise
:::

Webhook Trigger Rate Limiting counts `POST /api/<version>/webhook/<token>`. Every webhook token on the instance spends the same ceiling. It does not count the webhook administration API under `/api/<version>/project/<project>/webhook`.

The API token ceiling, `rundeck.apiRateLimiting.rate`, is not used for webhook triggers. Webhook triggers use `rundeck.apiRateLimiting.webhook.rate`. The refill window and the cache size stay on the shared API rate-limit settings.

The limiter is off unless all of the following are true:

- `rundeck.apiRateLimiting.enabled=true`
- `rundeck.apiRateLimiting.include` contains `rundeckpro.security.rateLimit.WebhookTokenApiRateLimiter`
- `rundeck.apiRateLimiting.webhook.rate` is a positive integer

If the webhook rate is missing or not a positive integer, webhook triggers are not limited. There is no default ceiling.

Example, 30 webhook trigger requests per 60 seconds for the whole instance:

```
rundeck.apiRateLimiting.enabled=true
rundeck.apiRateLimiting.refillWindowInSeconds=60
rundeck.apiRateLimiting.cacheSize=1000
rundeck.apiRateLimiting.include=rundeckpro.security.rateLimit.AuthTokenApiRateLimiter;rundeckpro.security.rateLimit.WebhookTokenApiRateLimiter
rundeck.apiRateLimiting.webhook.rate=30
```

`30` in that example is not a recommended production value. Choose the ceiling for the instance.

Over the limit, the filter returns HTTP 429 and a `Retry-After` header. The window is fixed. Requests are accepted again when `rundeck.apiRateLimiting.refillWindowInSeconds` elapses.

The path is percent-decoded once before it is matched. `POST /api/60/web%68ook/<token>` is the same trigger as `POST /api/60/webhook/<token>`. A `#name` suffix on the token is not a separate webhook and does not get its own ceiling.

Set the properties in `rundeck-config.properties`, or add `rundeck.apiRateLimiting.webhook.rate` as a custom property in System Configuration. There is no dedicated field for it. The `include` list is read when the rate-limit filter starts, so restart after adding `WebhookTokenApiRateLimiter`. After that restart, a System Configuration save can change `rundeck.apiRateLimiting.webhook.rate` without another restart.
