# Runner connection to a Process Automation using self signed certificate

We recommend the usage of real certificates, but we also know that there are situations when you need to test using self signed certificates.
If Process Automation is configured to use a self signed certificate, here is how to launch the Runner for a successful connectivity.

:::tip Note
Below steps work also when Process Automation is behind a Load Balancer using self signed certificate.
:::

There are several ways to set the Process Automation's certificate where the Runner will be launched.

## Cacerts file
Add the `process_automation.crt` certificate to the OS's cacerts file.
```sh
sudo keytool -import -alias MYALIAS -file process_automation.crt -cacerts -storepass changeit
```
To verify it is imported:
```sh
sudo keytool -list -cacerts -storepass changeit | grep MYALIAS
```
## Other truststore
:::tip Tip
Keep in mind the `file:` part in the path field.
:::

### Directly from command line
```sh
java -Dmicronaut.ssl.trust-store.path=file:/path/to/truststore -Dmicronaut.ssl.trust-store.password=PASSWORD -jar runner.jar
```
### Using environment variables
```sh
export MICRONAUT_HTTP_CLIENT_SSL_TRUST_STORE_PATH=file:/path/to/truststore
export MICRONAUT_HTTP_CLIENT_SSL_TRUST_STORE_PASSWORD=PASSWORD
java -jar runner.jar
```
### From a config file
Config file:
```sh
cat application.yaml
micronaut:
  http:
    client:
      ssl:
        enabled: true
        trust-store:
          path: file:/path/to/truststore
          password: PASSWORD
```
```sh
java -Dmicronaut.config.files=/path/to/application.yaml -jar runner.jar
```
### Docker env vars
```
MICRONAUT_HTTP_CLIENT_SSL_TRUST_STORE_PATH=file:/path/to/truststore
MICRONAUT_HTTP_CLIENT_SSL_TRUST_STORE_PASSWORD=PASSWORD
```
Truststore file must be in the proper path in the image.

## Resources

[Enterprise Runner](/administration/runner/pre-4-11-runners.md#runner)<br>
[Micronaut](https://micronaut-projects.github.io/micronaut-docs-mn2/2.0.3/guide/configurationreference.html#io.micronaut.http.ssl.ClientSslConfiguration$DefaultTrustStoreConfiguration)
