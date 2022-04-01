# Security Advisories

The Rundeck / Process Automation team is aware of the [emerging Spring vulnerabilities](https://spring.io/blog/2022/03/31/spring-framework-rce-early-announcement) and is working on the necessary fixes.  Updates will be provided below as we are able to make progress.

Updates:

_Friday April 1st, 2022_ - Still working on integrating the new fixes/packages with Grails.


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
