# Troubleshooting Runners

## Runner Logs

Runner Logs are located in the `./runner/logs` folder under the folder where the jar was executed from.  The `runner.log` file contains operational and important messages about the runner.  `operations.log` tracks an operation starts and if it succeeds or fails.  [Read more about logging and setting up custom logging](/administration/runner/runner-management/runner-logging.md).

## SSL Handshake error on the Runner startup

### **Error message**
```
MM-DD-YYYY 14:23:47.445 [main] ERROR io.micronaut.retry.intercept.RecoveryInterceptor - Type [com.rundeck.sidecar.agent.server.RESClient$Intercepted] executed with error: javax.net.ssl.SSLHandshakeException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target reactor.core.Exceptions$ReactiveException: javax.net.ssl.SSLHandshakeException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
```

### Why does this happen?

- The RBA-SH cluster is using a certificate that is **not trusted** by the default Java truststore (e.g., self-signed, or signed by a private/internal CA). In other words, the certificate chain can’t be validated using the Java truststore.
    
- The Runner (Java process) doesn’t have the CA certificate in its truststore.
    
- This is super common with **internal CAs** or **self-signed certs**—admins often add these to the OS trust store, but forget about Java’s.
    

### How to fix it

1. Download the certificate chain from your Rundeck cluster
    
2. Transfer this file to your Runner VM
    
3. Import the CA cert into the Java truststore
    

The default truststore is usually at:  
`$JAVA_HOME/lib/security/cacerts`
The default password is `changeit`.

**Please confirm that** `$JAVA_HOME` **is correctly configured in your VM!**

Example command:

```bash
keytool -import -alias rundeck-ca -file /path/to/ca.crt -keystore $JAVA_HOME/lib/security/cacerts
```

- It will prompt for the password (`changeit` by default).
    
- Say “yes” to trust the certificate.
    

4. Restart the Runner service.
