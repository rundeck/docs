---
title: eMudhra Intermediate CA Compromise
order: 43
---

# Security Advisory: eMudhra Intermediate CA Compromise

::: warning Action required for self-hosted Docker deployments
Upgrade Rundeck or Runbook Automation to [6.3.0](../6_x/version-6.3.0.md) and redeploy using the updated official Docker images. Running `apt-get upgrade` inside a running container is not a durable fix, because the change is lost when the container is recreated.
:::

Runbook Automation SaaS is not affected. If you run the Runner in Docker or Kubernetes, pull the updated image (6.3.0) and recreate the container. A Runner installed on your own host uses that host's trust store.

## Summary

On October 20, 2026, it was publicly disclosed that the private keys of eight intermediate certificate authority (CA) certificates operated by eMudhra had been compromised because of flawed key generation by the CA. The keys can be recovered from the public certificates.

This is not a vulnerability in Runbook Automation or Rundeck code, and no Runbook Automation data or keys were compromised. There is no known exploitation at the time of writing.

## Description

The affected intermediates chain to roots trusted by Mozilla, Microsoft, Apple, and Chrome, including "emSign ECC Root CA - G3" and, through Sectigo cross-signs, "Comodo AAA Services root". An attacker who holds these keys and has a network position between a client and a server (for example, on-path access or a DNS hijack) could impersonate any TLS server to a client that still trusts the intermediates.

Web browsers are already protected through their certificate revocation and Certificate Transparency mechanisms. Non-browser TLS clients, such as Java, Go, Python, Node.js, and curl running on servers and in containers, remain exposed until their CA trust stores are updated.

For more information, see the [public disclosure](https://emudhra.we-have-a-problem.com/) and [Mozilla bug 2083449](https://bugzilla.mozilla.org/show_bug.cgi?id=2083449).

## Impact

* **Affected:** Official Rundeck (open source) and Runbook Automation Docker images prior to 6.3.0. These images ship a CA trust store that still trusts the compromised intermediates.
* **Not affected:** Runbook Automation SaaS.
* **Runner in Docker or Kubernetes:** images built before 6.3.0. Pull the updated image (6.3.0) and recreate the container. A Runner installed on your own host uses that host's trust store.
* **Installs on your own hosts (RPM, DEB, WAR):** These use the CA trust stores of the host operating system and Java runtime, which you manage. Whether they are affected depends on whether those trust stores have been updated.
* **Risk:** An on-path attacker using a certificate issued by a compromised intermediate could, in theory, intercept outbound TLS connections from an affected system. This includes connections to integrations, webhooks, plugins, and remote nodes over HTTPS.

## Remediation

Rundeck and Runbook Automation 6.3.0 were released ahead of schedule with patched official Docker images whose CA trust stores no longer trust the compromised intermediates.

### Docker deployments

1. Pull the 6.3.0 Docker images.
2. Redeploy your Rundeck or Runbook Automation containers from the updated images.

### Installs on your own hosts (RPM, DEB, WAR)

Update the CA trust stores on each host that runs Rundeck or Runbook Automation:

1. Apply your operating system vendor's updated CA certificates package (for example, `ca-certificates`).
2. Update the Java runtime that Rundeck uses so its trust store no longer includes the compromised intermediates. Installing the OS package does not always update the Java trust store, so check your Java vendor's guidance.
3. Restart Rundeck so it loads the updated trust store.

If you manage many hosts, you can use a Rundeck job to apply these updates across your nodes.

## Verification

To confirm that a container or host no longer trusts the compromised intermediates, run the following command from inside the container or on the host:

```bash
curl https://dv-g3b-emudhra.we-have-a-problem.com/
```

A certificate error means the image no longer trusts the compromised intermediates. A successful response means the system still trusts them: redeploy the container from the updated image, or update the host's trust stores.

This check uses curl, which reads the operating system trust store. Java uses its own trust store, so a passing curl check doesn't confirm that the Java runtime is updated on hosts you manage.

## Getting Help

If you have questions about this advisory, contact us using the [Support Instructions](../../about/getting-help.md).
