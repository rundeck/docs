# Security Advisories

**April 4th, 2022**

The Rundeck / Process Automation team has released a hotfix version `4.0.1` to address the [vulnerabilities in Spring Framework announced here](https://spring.io/blog/2022/03/31/spring-framework-rce-early-announcement).

All future releases will also include this fix.

[Download the latest version here](https://download.rundeck.com).


## Past Rundeck CVEs

These are the Security Advisories Rundeck has issued in the past.  It is always recommended to upgrade to the current version of Rundeck ({{{rundeckVersion}}}) for the latest security updates.

* [CVE-2021-41112](CVE-2021-41112.md)<br>
    Authenticated users can modify Calendars without appropriate authorization.
* [CVE-2021-41111](CVE-2021-41111.md)<br>
    Webhook data and tokens can be revealed to an unauthorized user.
* [CVE-2021-39133](CVE-2021-39133.md)<br>
    Cross-Site Request Forgery (CSRF) can run untrusted code on Rundeck server.
* [CVE-2021-39132](CVE-2021-39132.md)<br>
    YAML deserialization can run untrusted code.
* [CVE-2020-11009](CVE-2020-11009.md)<br>
    IDOR can reveal execution data and logs to unauthorized user.

[For information about Log4j / Log4Shell please see this page.](log4j.md)
