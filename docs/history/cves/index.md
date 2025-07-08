---
order: 10
---

# Security Notices

Below is a collection of security notices previously filed for Rundeck and Runbook Automation.  Also included is a list of false positives that vulnerability scanners may find with explanations about why we consider it a false positive.  If there are any concerns about the security of Rundeck or questions about a new finding please reach out to us using the [Support Instructions](/about/getting-help.md).

[Download the latest version here](https://download.rundeck.com).

## Rundeck/Runbook Automation CVEs

These are the Security Advisories Rundeck has issued in the past.  It is always recommended to upgrade to the current version of Rundeck ({{$rundeckVersion}}) for the latest security updates.

* [Runner Security Issue - June 2025](2025-06-runner-security.md)<br>
    Password Masking Failure Exposing Secrets in Enterprise Runner Log Output.
* [CVE-2023-48222](cve-2023-48222.md)<br>
    Authenticated users can view or delete jobs for which they do not have authorization.
* [CVE-2023-47112](cve-2023-47112.md)<br>
    Authenticated users can view job names and groups for which they do not have read authorization.
* [CVE-2022-31044](cve-2022-31044.md)<br>
    Key Storage converter plugin mechanism were not enabled correctly in Rundeck 4.2.0 and 4.2.1.
* [CVE-2022-29186](cve-2022-29186.md)<br>
    Key Pair Misconfiguration may expose systems.
* [CVE-2021-41112](cve-2021-41112.md)<br>
    Authenticated users can modify Calendars without appropriate authorization.
* [CVE-2021-41111](cve-2021-41111.md)<br>
    Webhook data and tokens can be revealed to an unauthorized user.
* [CVE-2021-39133](cve-2021-39133.md)<br>
    Cross-Site Request Forgery (CSRF) can run untrusted code on Rundeck server.
* [CVE-2021-39132](cve-2021-39132.md)<br>
    YAML deserialization can run untrusted code.
* [CVE-2020-11009](cve-2020-11009.md)<br>
    IDOR can reveal execution data and logs to unauthorized user.

## Additional CVE Notes

* Log4j / Log4Shell will flag a false positive vulnerability related to our JIRA plugins. [More Details on this page](log4j.md)
* [CVE-2016-1000027 Spring Unsafe Java deserialization](cve-2016-1000027.md).
* [CVE-2020-0187 Android 10 Finding](cve-2020-0187.md).
* [CVE-2022-45868 H2 DB false positive](cve-2022-45868.md).
* [CVE-2022-1471 SnakeYAML false positive](cve-2022-1471.md).
* [CVE-2023-34034 Spring Security False Positive](cve-2023-34034.md).
* [CVE-2024-1597 Postgres JDBC Driver Vulnerability](cve-2024-1597.md).
* [CVE-2024-6104 go-retryablehttp can leak basic auth credentials to log files](cve-2024-6104.md).
* [CVE-2024-22257 Spring Security False Finding](cve-2024-22257.md).
* [CVE-2023-39017 Quartz Scheduler false positive](cve-2023-39017.md).
* [CVE-2024-24786 Protobuf finding in Remco](cve-2024-24786.md).
* [CVE-2024-38807 Spring Boot false positive](cve-2024-38807.md).
* [CVE-2024-38816 Path traversal vulnerability in functional web frameworks](cve-2024-38816.md).
* [CVE-2024-38819 Path traversal vulnerability in functional web frameworks #2](cve-2024-38819.md).
* [CVE-2024-38820 Spring Framework's DataBinder false positive](cve-2024-38820.md).
* [CVE-2024-38827 Locale-sensitive string case conversion methods](cve-2024-38827.md).
* [CVE-2024-45338 golang/x/net 0.20.0](cve-2024-38819.md).