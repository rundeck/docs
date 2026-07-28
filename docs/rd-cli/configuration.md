# Rundeck CLI - Configuration

Export environment variables in your shell, or in a `~/.rd/rd.conf`
file (unix only), or by specifying the file location:

```shell
export RD_CONF=/path/to/rd.conf
```

If you want the conf file values to let you override them with any vars
you have exported in your shell, you can define config values like:

```shell
export RD_URL=${RD_URL:-http://server:4440}
```

Which will default the value unless you have already exported `RD_URL`.

**Note**: Using RD_CONF or the default `~/.rd/rd.conf` file requires invoking `rd` via the script included in the zip/deb/rpm installation.  If you invoke it via `java -jar rd-cli.jar` directly, the environment variables in the rd.conf file will not be used.  You will have to export those variables into your shell first.

## Connection Info

```shell
export RD_URL=http://rundeck:4440`
```

Define a specific API version to use, by using the complete API base:

```shell
export RD_URL=http://rundeck:4440/api/12
```

All requests will be made using that API version.

Alternatively, set the API version without modifying `RD_URL`:

```shell
export RD_API_VERSION=29
```

If a version is not specified via either method, the CLI uses its default supported API version.

## Project

You can set a default project to use when a command's `-p/--project` option is not specified:

```shell
export RD_PROJECT=myproject
```

## Credentials

Define access credentials as user/password or Token value:

```shell
export RD_TOKEN=yourtokenhere`
```

__or__

```shell
export RD_USER=username
export RD_PASSWORD=password
```

## Prompting

If you do not define the credentials as environment variables,
you will be prompted to enter a username/password or token in
the shell if a TTY is avaliable.

You can disable automatic prompting:

```shell
export RD_AUTH_PROMPT=false
```

## ANSI color

`rd` auto-detects whether to print output using ANSI escapes for colorized output: it is enabled automatically
when your terminal's `TERM` value contains `color`.

You can force it on:

```shell
export RD_COLOR=1
```

Or force it off:

```shell
export RD_COLOR=0
```

`rd` also honors the [`NO_COLOR`](https://no-color.org/) convention: setting `NO_COLOR` to any non-empty value
disables colorized output (unless `RD_COLOR=1` is also set).

## Date Format

You can modify the Date format used when displaying dates:

```shell
export RD_DATE_FORMAT=<format>
```

Where `<format>` is a Java [Simple Date Format](#).

The default format is ISO-8601: `yyyy-MM-dd'T'HH:mm:ssXX`

[Simple Date Format]: https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html

## Bypass an external URL

If your Rundeck server has a different *external URL* than the one you are accessing,
you can tell the `rd` tool to treat redirects to that external URL as
if they were to the original URL you specified.

```shell
export RD_URL=http://internal-rundeck:4440/rundeck
export RD_BYPASS_URL=https://rundeck.mycompany.com
```

This will rewrite any redirect to `https://rundeck.mycompany.com/blah`
as `http://internal-rundeck:4440/rundeck/blah`.

Note: if you include the API version in your `RD_URL`, e.g. `http://internal-rundeck:4440/rundeck/api/12` then
the `RD_BYPASS_URL` will be replaced by `http://internal-rundeck:4440/rundeck`.

## HTTP/connect timeout

### sets connection timeout (default: 2 Minutes)
```shell
export RD_HTTP_CONN_TIMEOUT=120
```
### sets write timeout (default: 10 Seconds)
```shell
export RD_HTTP_WRITE_TIMEOUT=10
```
### sets read timeout (default: 10 Minutes)
```shell
export RD_HTTP_READ_TIMEOUT=600
```
### sets call* timeout (default: none)
```shell
export RD_HTTP_CALL_TIMEOUT=240
```
### Sets the timeout for READ, CONNECT, and WRITE. This overrides any settings above.
```shell
export RD_HTTP_TIMEOUT=30
```

*\* Call Timeout*: This is sets a timeout on the entire request/response sequence including DNS resolution and redirect following.

Note: if the timeout seems longer than you specify, it is because the [connection retry](#connection-retry) is set to true
by default.

## Connection Retry

Retry in case of recoverable connection issue (e.g. failure to connect):

Use `RD_CONNECT_RETRY` (default `true`):

### don't retry
```shell
export RD_CONNECT_RETRY=false
```

## API Version Downgrade

If the server does not support the requested API version, `rd` can automatically retry the request using a lower,
supported API version. This is disabled by default:

```shell
export RD_API_DOWNGRADE=true
```

## Cross-Origin Redirects

By default, `rd` will not follow HTTP redirects to a different origin than the configured `RD_URL`, to prevent
credentials from being sent to an unexpected host. To allow cross-origin redirects to be followed with credentials:

```shell
export RD_ALLOW_CROSS_ORIGIN_REDIRECT=true
```

## Debug HTTP

Use the `RD_DEBUG` env var to turn on HTTP debugging:

### basic http request debug
```shell
export RD_DEBUG=1 
```
### http headers
```shell
export RD_DEBUG=2 
```
### http body
```shell
export RD_DEBUG=3 
```

## SSL Configuration

See [SSL Configuration](./ssl.md)

## Insecure SSL

To disable __all__ SSL certificate checks, and hostname verifications:

```shell
export RD_INSECURE_SSL=true
```

When enabled, a value of `RD_DEBUG=2` will also report SSL certificate
information.

To suppress the warning that is printed when insecure SSL is enabled:

```shell
export RD_INSECURE_SSL_NO_WARN=true
```

## Insecure SSL Hostname Verification

To retain SSL certificate verification, but allow *any* hostname to be
allowed for the certificate:

```shell
RD_INSECURE_SSL_HOSTNAME=true
```

## Alternate SSL Hostname Verification

Similar to [Bypass an external URL](#bypass-an-external-url), this
allows you to retain SSL certificate verification, but set an
alternate hostname to accept from the remote server certificate, if
it does not match the hostname you are using in your request:

```shell
RD_ALT_SSL_HOSTNAME=hostname
```

## YAML Output Format

When using `RD_FORMAT=yaml` (see [Scripting](./scripting.md)), you can control the YAML output style:

```shell
# BLOCK (default) or FLOW
export RD_YAML_FLOW=BLOCK
# pretty-print flow style, default: true
export RD_YAML_PRETTY=true
```

## Extensions

Loading external [extension jars](./extensions.md) is disabled by default. To enable it:

```shell
export RD_EXT_DISABLED=false
```

See [Extensions](./extensions.md) for details.
